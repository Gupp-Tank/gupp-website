import { expect, test } from '@playwright/test'

test.describe('desktop navigation', () => {
  test.beforeEach(({ isMobile }) => test.skip(isMobile, 'the header links are behind the menu on phones'))

  test('the header link scrolls to the section and highlights while it is in view', async ({ page }) => {
    await page.goto('/es')
    const link = page.getByRole('banner').getByRole('link', { name: 'Cómo funciona' })
    await expect(link).not.toHaveAttribute('aria-current', 'location')
    await link.click()
    await expect(page).toHaveURL(/#how-it-works$/)
    await expect(link).toHaveAttribute('aria-current', 'location')
    const top = await page.locator('#how-it-works').evaluate((el) => el.getBoundingClientRect().top)
    expect(top, 'the section is not hidden under the sticky header').toBeGreaterThanOrEqual(70)
  })
})

test('the footer links jump to their module card', async ({ page }) => {
  await page.goto('/es')
  const footer = page.getByRole('contentinfo')
  for (const [name, id] of [['Perfil del acuario', 'module-tank-profile'], ['Chequeo antes de comprar', 'module-pre-purchase-check']]) {
    await footer.getByRole('link', { name }).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.locator(`#${id}`)).toBeInViewport()
  }
})

test('the logo takes you to the home page of the current language', async ({ page }) => {
  await page.goto('/en/nothing-here')
  await page.getByRole('banner').getByRole('link', { name: 'Gupp Tank home' }).click()
  await expect(page).toHaveURL(/\/en$/)
})

test.describe('404 pages', () => {
  test('an unknown path is a real 404 with the localized page and a way back', async ({ page }) => {
    const response = await page.goto('/es/no-existe')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('No encontramos esa página')
    await expect(page.getByRole('banner')).toBeVisible()
    await page.getByRole('link', { name: 'Ir al inicio' }).click()
    await expect(page).toHaveURL(/\/es$/)
  })

  test('an unsupported language is a 404 without the site header', async ({ page }) => {
    const response = await page.goto('/fr')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('banner')).toHaveCount(0)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })
})

test.describe('mobile menu', () => {
  test.beforeEach(({ isMobile }) => test.skip(!isMobile, 'the menu only exists on narrow screens'))

  test('opens, traps focus, closes on Escape and returns focus to its button', async ({ page }) => {
    await page.goto('/es')
    const open = page.getByRole('button', { name: 'Abrir menú' })
    await open.click()
    const close = page.getByRole('button', { name: 'Cerrar menú' })
    await expect(close).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('main')).toHaveAttribute('inert', '')
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      expect(await page.evaluate(() => document.querySelector('header')!.contains(document.activeElement))).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(open).toBeFocused()
    await expect(page.locator('main')).not.toHaveAttribute('inert', '')
  })

  test('choosing a link closes it and lands on the section', async ({ page }) => {
    await page.goto('/es')
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await page.locator('.site-panel').getByRole('link', { name: 'Cómo funciona' }).click()
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
    await expect(page).toHaveURL(/#how-it-works$/)
  })

  test('language and theme stay reachable without opening the menu', async ({ page }) => {
    await page.goto('/es')
    await expect(page.getByRole('banner').getByRole('button', { name: 'English' })).toBeVisible()
    await expect(page.getByRole('banner').getByRole('button', { name: /modo oscuro/ })).toBeVisible()
  })
})
