import { expect, test } from '@playwright/test'

for (const [locale, privacy, terms] of [
  ['es', 'Política de privacidad', 'Términos y condiciones'],
  ['en', 'Privacy policy', 'Terms and conditions'],
] as const) {
  test(`the footer opens the legal pages in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`)
    const footer = page.getByRole('contentinfo')
    await footer.getByRole('link', { name: privacy }).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/privacy$`))
    await expect(page.getByRole('heading', { level: 1, name: privacy })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', locale)
    await expect(page.getByRole('link', { name: 'privacidad@gupp.app' }).first()).toHaveAttribute('href', 'mailto:privacidad@gupp.app')

    await page.getByRole('contentinfo').getByRole('link', { name: terms }).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/terms$`))
    await expect(page.getByRole('heading', { level: 1, name: terms })).toBeVisible()
  })
}

test('the table of contents jumps to a section and the language switch keeps the page', async ({ page, isMobile }) => {
  await page.goto('/es/privacy')
  await page.getByRole('navigation', { name: 'En esta página' }).getByRole('link', { name: 'Tus derechos' }).click()
  await expect(page).toHaveURL(/#rights$/)
  await expect(page.locator('#rights')).toBeInViewport()
  test.skip(isMobile, 'the language switch is inside the menu on phones')
  await page.getByRole('banner').getByRole('button', { name: 'English' }).click()
  await expect(page).toHaveURL(/\/en\/privacy#rights$/)
})

test('the legal pages are indexable and listed in the sitemap', async ({ page, request }) => {
  await page.goto('/en/terms')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://gupp.app/en/terms')
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('https://gupp.app/es/privacy')
  expect(sitemap).toContain('https://gupp.app/en/terms')
})

test('the header and footer anchors still work from a legal page', async ({ page, isMobile }) => {
  await page.goto('/en/privacy')
  await page.getByRole('contentinfo').getByRole('link', { name: 'Tank profile' }).click()
  await expect(page).toHaveURL(/\/en#module-tank-profile$/)
  await expect(page.locator('#module-tank-profile')).toBeInViewport()
  test.skip(isMobile, 'the header links are behind the menu on phones')
  await page.goto('/en/terms')
  await page.getByRole('banner').getByRole('link', { name: 'How it works' }).click()
  await expect(page).toHaveURL(/\/en#how-it-works$/)
})
