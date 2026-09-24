import { expect, test, type Page } from '@playwright/test'

async function open(page: Page, path = '/es', theme: 'light' | 'dark' = 'light', reduced = true) {
  await page.addInitScript((t) => t === 'dark' && localStorage.setItem('gupp-theme', 'dark'), theme)
  if (reduced) await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(path)
  await expect(page.locator('h1')).toBeVisible()
}

test('landmarks: one banner, one main, one contentinfo, navs are labelled', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('banner')).toHaveCount(1)
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.getByRole('contentinfo')).toHaveCount(1)
  for (const nav of await page.getByRole('navigation').all()) {
    expect(await nav.getAttribute('aria-label'), 'every <nav> needs a label').toBeTruthy()
  }
})

test('headings: a single h1 and no skipped levels outside the app illustration', async ({ page }) => {
  await open(page)
  const levels = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => !h.closest('.hero-visual')).map((h) => Number(h.tagName[1])),
  )
  expect(levels.filter((l) => l === 1)).toHaveLength(1)
  levels.slice(1).forEach((level, i) => expect(level - levels[i], `heading order ${levels.join('>')}`).toBeLessThanOrEqual(1))
})

test('the page declares its language and a title', async ({ page }) => {
  await open(page, '/en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle(/Gupp Tank/)
})

test.describe('skip link', () => {
  test('is the first tab stop, appears on focus, and moves focus into main', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard-only interaction')
    await open(page)
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Saltar al contenido' })
    await expect(skip).toBeFocused()
    const box = await skip.boundingBox()
    expect(box!.y, 'visible on screen while focused').toBeGreaterThanOrEqual(0)
    await page.keyboard.press('Enter')
    await expect(page.locator('main#main')).toBeFocused()
  })

  test('is off-screen until focused', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard-only interaction')
    await open(page)
    const box = await page.getByRole('link', { name: 'Saltar al contenido' }).boundingBox()
    expect(box!.y + box!.height).toBeLessThanOrEqual(0)
  })
})

for (const theme of ['light', 'dark'] as const) {
  test(`keyboard: every stop has a visible focus indicator (${theme})`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard-only interaction')
    await open(page, '/es', theme)
    const labels: string[] = []
    const problems: string[] = []
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab')
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement
        if (!el || el === document.body) return null
        // Identify the real element (not its text): the header and footer logos share a name.
        const seen = ((window as unknown as { __seen?: WeakSet<Element> }).__seen ??= new WeakSet())
        if (seen.has(el)) return { wrapped: true } as const
        seen.add(el)
        const cs = getComputedStyle(el)
        const visible = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2
        return { wrapped: false, key: `${el.tagName} ${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30)}`, visible } as const
      })
      if (!info || info.wrapped) break
      labels.push(info.key)
      if (!info.visible) problems.push(info.key)
    }
    const stops = { size: labels.length }
    expect(stops.size, `walked through: ${labels.join(' | ')}`).toBeGreaterThan(12)
    expect(problems, 'elements without a >=2px focus outline').toEqual([])
  })
}

test('reduced motion: nothing keeps animating', async ({ page }) => {
  await open(page, '/es', 'light', true)
  await page.waitForTimeout(600)
  const running = await page.evaluate(() =>
    document.getAnimations().filter((a) => a.playState === 'running' && (a.effect?.getComputedTiming().iterations ?? 1) === Infinity).map((a) => (a as CSSAnimation).animationName ?? 'anim'),
  )
  expect(running).toEqual([])
})
