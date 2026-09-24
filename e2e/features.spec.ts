import { expect, test } from '@playwright/test'

test('the features showcase swaps the phone screen with the selected module', async ({ page }) => {
  await page.goto('/es')
  const showcase = page.locator('#modules')
  await expect(showcase.getByRole('tab', { selected: true })).toHaveText(/Perfil del acuario/)

  await showcase.getByRole('tab', { name: 'Agua + diagnóstico' }).click()
  await expect(showcase.getByRole('tabpanel').getByRole('img').first()).toHaveAttribute('aria-label', /posible ich/i)

  await showcase.getByRole('tab', { name: 'Chequeo antes de comprar' }).press('ArrowUp')
  await expect(showcase.getByRole('tab', { selected: true })).toHaveText(/Dosis y alimentación/)
})

test('a footer link to a module opens that tab', async ({ page }) => {
  await page.goto('/en')
  await page.getByRole('contentinfo').getByRole('link', { name: 'Pre-purchase check' }).click()
  await expect(page.locator('#modules').getByRole('tab', { selected: true })).toHaveText(/Pre-purchase check/)
})
