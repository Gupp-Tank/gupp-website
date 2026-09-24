import { expect, test, type Page } from '@playwright/test'

const saved = (page: Page, locale: string) => page.addInitScript((l) => localStorage.setItem('gupp-locale', l), locale)

test.describe('detection at /', () => {
  test.describe('browser in Spanish', () => {
    test.use({ locale: 'es-CR' })
    test('goes to /es', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL(/\/es$/)
      await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    })
    test('a saved English choice wins over the browser language', async ({ page }) => {
      await saved(page, 'en')
      await page.goto('/')
      await expect(page).toHaveURL(/\/en$/)
    })
  })

  test.describe('browser in English', () => {
    test.use({ locale: 'en-US' })
    test('goes to /en', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL(/\/en$/)
    })
  })

  test.describe('browser in an unsupported language', () => {
    test.use({ locale: 'fr-FR' })
    test('falls back to Spanish, the default', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL(/\/es$/)
    })
  })
})

test('the URL wins over the saved language, and is remembered', async ({ page }) => {
  // Saved once (not with an init script, which would rewrite it on every navigation).
  await page.goto('/es')
  await page.evaluate(() => localStorage.setItem('gupp-locale', 'es'))
  await page.goto('/en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  expect(await page.evaluate(() => localStorage.getItem('gupp-locale'))).toBe('en')
  await page.goto('/')
  await expect(page).toHaveURL(/\/en$/)
})

test('the prerendered HTML already carries the right language (no JavaScript needed)', async ({ request }) => {
  expect(await (await request.get('/en')).text()).toContain('<html lang="en"')
  expect(await (await request.get('/es')).text()).toContain('<html lang="es"')
})

test.describe('switching language', () => {
  test('changes the URL keeping query and hash, and works with back and forward', async ({ page }) => {
    await page.goto('/es?ref=1#modules')
    const header = page.getByRole('banner')
    await header.getByRole('button', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/en\?ref=1#modules$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Fishkeeping')

    await page.goBack()
    await expect(page).toHaveURL(/\/es\?ref=1#modules$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('acuarismo')
    await page.goForward()
    await expect(page).toHaveURL(/\/en\?ref=1#modules$/)
  })

  test('updates the document title, canonical and description', async ({ page }) => {
    await page.goto('/es')
    await page.getByRole('banner').getByRole('button', { name: 'English' }).click()
    await expect(page).toHaveTitle(/Fishkeeping/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://gupp.app/en')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Water, fish and dosing/)
    expect(await page.locator('link[rel="canonical"]').count()).toBe(1)
  })

  test('a 404 keeps the language of its prefix', async ({ page }) => {
    const response = await page.goto('/en/nothing-here')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText("We couldn't find that page")
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })
})
