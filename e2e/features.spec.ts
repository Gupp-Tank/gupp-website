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

test('the FAQ opens with the keyboard', async ({ page }) => {
  await page.goto('/es')
  const trigger = page.getByRole('button', { name: '¿Qué es Gupp Tank?' })
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('region', { name: '¿Qué es Gupp Tank?' })).toBeVisible()
})
