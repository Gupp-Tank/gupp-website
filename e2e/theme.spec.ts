import { expect, test, type Page } from '@playwright/test'

const theme = (page: Page) => page.evaluate(() => document.documentElement.dataset.theme ?? 'light')
const toggle = (page: Page) => page.getByRole('banner').getByRole('button', { name: /modo (oscuro|claro)/ })
const bg = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor)

test.describe('an OS in dark mode', () => {
  test.use({ colorScheme: 'dark' })
  test('does not change the default: light is the default', async ({ page }) => {
    await page.goto('/es')
    expect(await theme(page)).toBe('light')
    expect(await bg(page)).toBe('rgb(242, 247, 251)')
  })
})

test('toggling switches to dark, remembers it across reloads, and can go back', async ({ page }) => {
  await page.goto('/es')
  await toggle(page).click()
  expect(await theme(page)).toBe('dark')
  expect(await bg(page)).toBe('rgb(20, 25, 27)')
  await page.reload()
  expect(await theme(page)).toBe('dark')
  await toggle(page).click()
  expect(await theme(page)).toBe('light')
})

test('a saved dark theme is applied before React runs (no flash)', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('gupp-theme', 'dark')
    document.addEventListener('DOMContentLoaded', () => {
      ;(window as unknown as { __early: string[] }).__early = [document.documentElement.dataset.theme ?? '', getComputedStyle(document.body).backgroundColor]
    })
  })
  await page.goto('/es', { waitUntil: 'domcontentloaded' })
  expect(await page.evaluate(() => (window as unknown as { __early: string[] }).__early)).toEqual(['dark', 'rgb(20, 25, 27)'])
})

test('the header shows the right logo for each theme', async ({ page }) => {
  await page.goto('/es')
  const brand = page.locator('.site-header__brand')
  await expect(brand.locator('.logo--light')).toBeVisible()
  await expect(brand.locator('.logo--dark')).toBeHidden()
  await toggle(page).click()
  await expect(brand.locator('.logo--dark')).toBeVisible()
  await expect(brand.locator('.logo--light')).toBeHidden()
})

test('switching theme moves nothing on the page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/es')
  await page.waitForTimeout(500)
  const snap = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('h1,h2,h3,p,a,button,img,li,footer,header')]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => {
          const r = e.getBoundingClientRect()
          return [r.left, r.top + scrollY, r.width, r.height].map((v) => Math.round(v * 2) / 2)
        }),
    )
  const before = await snap()
  await toggle(page).click()
  await page.waitForTimeout(300)
  const after = await snap()
  expect(after.length).toBe(before.length)
  expect(after.filter((r, i) => r.some((v, k) => Math.abs(v - before[i][k]) > 0.5))).toHaveLength(0)
})
