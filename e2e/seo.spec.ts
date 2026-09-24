import { expect, test, type Page } from '@playwright/test'

test.describe('without JavaScript (what a crawler or a text browser gets)', () => {
  test.use({ javaScriptEnabled: false })
  for (const [path, headline, lang] of [['/es', 'acuarismo', 'es'], ['/en', 'Fishkeeping', 'en']] as const) {
    test(`${path} already has its content`, async ({ page }) => {
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(headline)
      await expect(page.getByRole('banner')).toBeVisible()
      await expect(page.getByRole('contentinfo')).toBeVisible()
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://gupp.app${path}`)
    })
  }
})

test('the head has hreflang alternates, Open Graph, a Twitter card and valid JSON-LD', async ({ page, request }) => {
  await page.goto('/es')
  await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', 'https://gupp.app/es')
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://gupp.app/en')
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://gupp.app/')
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
  const image = await page.locator('meta[property="og:image"]').getAttribute('content')
  const shared = await request.get(new URL(image!).pathname)
  expect(shared.status()).toBe(200)
  expect(shared.headers()['content-type']).toBe('image/jpeg')
  const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)['@type']))
  expect(types).toEqual(['Organization', 'WebSite', 'FAQPage'])
})

test('sitemap, robots and the security headers are served', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('<loc>https://gupp.app/es</loc>')
  expect(sitemap).toContain('<loc>https://gupp.app/en</loc>')
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://gupp.app/sitemap.xml')
  const headers = (await request.get('/es')).headers()
  expect(headers['content-security-policy']).toContain("default-src 'self'")
  expect(headers['strict-transport-security']).toBeTruthy()
  expect(headers['x-content-type-options']).toBe('nosniff')
})

// The page ships under a strict CSP and is hydrated from prerendered HTML: any hydration
// mismatch, console error or blocked resource shows up here.
async function watch(page: Page) {
  const problems: string[] = []
  await page.addInitScript(() => document.addEventListener('securitypolicyviolation', (e) => console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`)))
  page.on('console', (m) => m.type() === 'error' && problems.push(m.text()))
  page.on('pageerror', (e) => problems.push(e.message))
  return problems
}

for (const path of ['/es', '/en']) {
  for (const theme of ['light', 'dark'] as const) {
    test(`hydrates ${path} (${theme}) with no errors and no CSP violations`, async ({ page }) => {
      const problems = await watch(page)
      await page.addInitScript((t) => t === 'dark' && localStorage.setItem('gupp-theme', 'dark'), theme)
      await page.goto(path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(800)
      await page.getByRole('banner').getByRole('button', { name: /(modo|mode)/i }).last().click()
      await page.getByRole('contentinfo').scrollIntoViewIfNeeded()
      expect(problems.filter((p) => !/GL Driver|WebGL|GPU stall/i.test(p))).toEqual([])
    })
  }
}
