import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// A clean browser: no choice made yet.
test.use({ storageState: { cookies: [], origins: [] } })

const stored = (page: Page) => page.evaluate(() => localStorage.getItem('gupp-consent'))
const banner = (page: Page, name: string) => page.getByRole('region', { name })

test('nothing non-essential runs before a choice: no third-party request and nothing stored', async ({ page }) => {
  const foreign: string[] = []
  page.on('request', (request) => {
    if (!request.url().startsWith('http://localhost:4173') && !request.url().startsWith('data:')) foreign.push(request.url())
  })
  await page.goto('/es')
  await expect(banner(page, 'Preferencias de cookies')).toBeVisible()
  expect(await stored(page)).toBeNull()
  expect(foreign).toEqual([])
})

test('accepting saves the choice with its version and it persists across reloads', async ({ page }) => {
  await page.goto('/es')
  await banner(page, 'Preferencias de cookies').getByRole('button', { name: 'Aceptar analítica' }).click()
  await expect(banner(page, 'Preferencias de cookies')).toBeHidden()
  expect(JSON.parse((await stored(page))!)).toMatchObject({ version: '1', analytics: true })
  await page.reload()
  await expect(banner(page, 'Preferencias de cookies')).toBeHidden()
})

test('rejecting is stored as analytics off and also persists', async ({ page }) => {
  await page.goto('/en')
  await banner(page, 'Cookie preferences').getByRole('button', { name: 'Reject' }).click()
  expect(JSON.parse((await stored(page))!)).toMatchObject({ analytics: false })
  await page.reload()
  await expect(banner(page, 'Cookie preferences')).toBeHidden()
})

test('customizing opens a dialog that traps focus, saves the switch and closes with Escape', async ({ page }) => {
  await page.goto('/es')
  await banner(page, 'Preferencias de cookies').getByRole('button', { name: 'Personalizar' }).click()
  const dialog = page.getByRole('dialog', { name: 'Preferencias de cookies' })
  await expect(dialog).toBeVisible()
  const toggle = dialog.getByRole('switch', { name: 'Permitir analítica' })
  await expect(toggle).not.toBeChecked()

  for (let i = 0; i < 8; i++) await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null)).toBe(true)

  await toggle.check()
  await dialog.getByRole('button', { name: 'Guardar preferencias' }).click()
  await expect(dialog).toBeHidden()
  expect(JSON.parse((await stored(page))!)).toMatchObject({ analytics: true })

  await page.getByRole('contentinfo').getByRole('button', { name: 'Preferencias de cookies' }).click()
  await expect(dialog.getByRole('switch', { name: 'Permitir analítica' })).toBeChecked()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('the choice can be changed from the footer at any time', async ({ page }) => {
  await page.goto('/es')
  await banner(page, 'Preferencias de cookies').getByRole('button', { name: 'Aceptar analítica' }).click()
  await page.getByRole('contentinfo').getByRole('button', { name: 'Preferencias de cookies' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Rechazar todo' }).click()
  expect(JSON.parse((await stored(page))!)).toMatchObject({ analytics: false })
})

for (const theme of ['light', 'dark'] as const) {
  test(`axe is clean with the banner and with the preferences open (${theme})`, async ({ page }) => {
    await page.addInitScript((t) => t === 'dark' && localStorage.setItem('gupp-theme', 'dark'), theme)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/es')
    await expect(banner(page, 'Preferencias de cookies')).toBeVisible()
    await page.waitForTimeout(300)
    const scan = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).exclude('.hero-visual').exclude('.showcase__phone').analyze()
    expect((await scan()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target.join(' ')}`)).toEqual([])
    await banner(page, 'Preferencias de cookies').getByRole('button', { name: 'Personalizar' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    expect((await scan()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target.join(' ')}`)).toEqual([])
  })
}
