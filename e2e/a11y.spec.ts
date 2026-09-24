import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Every route, in both languages and both themes. WCAG 2.1 A + AA rules.
const ROUTES = ['/es', '/en', '/es/no-existe', '/fr']
const THEMES = ['light', 'dark'] as const
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

async function open(page: Page, path: string, theme: 'light' | 'dark') {
  await page.addInitScript((t) => t === 'dark' && localStorage.setItem('gupp-theme', 'dark'), theme)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(path)
  await expect(page.locator('h1')).toBeVisible()
  await page.waitForTimeout(400)
}

const summarize = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(' ')}`)

// The phone mockup is an illustration of the app: an image (role="img" with a text
// alternative) whose inner text WCAG 1.4.3 exempts as part of a picture. So the page is
// scanned twice: contrast everywhere except the illustration, and every other rule everywhere.
async function scan(page: Page) {
  const contrast = await new AxeBuilder({ page }).withTags(TAGS).exclude('.hero-visual').analyze()
  const rest = await new AxeBuilder({ page }).withTags(TAGS).disableRules(['color-contrast']).analyze()
  return [...summarize(contrast.violations), ...summarize(rest.violations)]
}

for (const theme of THEMES) {
  for (const route of ROUTES) {
    test(`no axe violations: ${route} (${theme})`, async ({ page }) => {
      await open(page, route, theme)
      expect(await scan(page)).toEqual([])
    })
  }
}

test('no axe violations with the mobile menu open', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'the menu only exists on narrow screens')
  await open(page, '/es', 'light')
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  expect(await scan(page)).toEqual([])
})
