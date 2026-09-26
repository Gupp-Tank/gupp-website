import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page, type Route } from '@playwright/test'

const API = 'https://api.gupp.app/api/v1/early-access/unsubscribe'
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type,accept',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
}

async function mockApi(page: Page, respond: (route: Route) => Promise<void> | void) {
  const bodies: unknown[] = []
  await page.route(API, async (route) => {
    const request = route.request()
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS })
    bodies.push(request.postDataJSON())
    return respond(route)
  })
  return bodies
}

const json = (status: number, body: unknown) => (route: Route) =>
  route.fulfill({ status, headers: { ...CORS, 'Content-Type': 'application/json' }, json: body })

const COPY = {
  es: {
    locale: 'es',
    path: '/es/unsubscribe',
    loading: 'Cancelando suscripción',
    successTitle: 'Suscripción cancelada',
    successMessage: 'Eliminamos tu correo de la lista de aviso de lanzamiento. No recibirás más mensajes.',
    invalidTitle: 'Enlace no válido',
    invalidMessage: 'Este enlace de baja no es válido o ya venció.',
    errorTitle: 'Algo salió mal',
    retry: 'Intentar de nuevo',
    home: 'Volver al inicio',
  },
  en: {
    locale: 'en',
    path: '/en/unsubscribe',
    loading: 'Unsubscribing',
    successTitle: 'Unsubscribed',
    successMessage: 'We have removed your email from the launch notice list. You will not receive any more messages.',
    invalidTitle: 'Invalid link',
    invalidMessage: 'This unsubscribe link is not valid or has expired.',
    errorTitle: 'Something went wrong',
    retry: 'Try again',
    home: 'Back to home',
  },
} as const

for (const [locale, t] of Object.entries(COPY)) {
  test.describe(`unsubscribe page (${locale})`, () => {
    test('missing token shows invalid link state without calling API', async ({ page }) => {
      let called = false
      await mockApi(page, () => {
        called = true
      })
      await page.goto(t.path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.invalidTitle)
      await expect(page.getByText(t.invalidMessage)).toBeVisible()
      await expect(page.getByRole('link', { name: t.home })).toHaveAttribute('href', `/${t.locale}`)
      expect(called).toBe(false)
    })

    test('valid token successfully unsubscribes and is idempotent on reload', async ({ page }) => {
      let count = 0
      await mockApi(page, async (route) => {
        count += 1
        await json(200, { unsubscribed: true })(route)
      })

      await page.goto(`${t.path}?token=sample-token-123`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.successTitle)
      await expect(page.getByText(t.successMessage)).toBeVisible()
      await expect(page.getByRole('link', { name: t.home })).toBeVisible()
      expect(count).toBe(1)

      await page.reload()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.successTitle)
      await expect(page.getByText(t.successMessage)).toBeVisible()
      expect(count).toBe(2)
    })

    test('forged or expired token shows invalid link state', async ({ page }) => {
      await mockApi(page, json(400, { code: 'INVALID_UNSUBSCRIBE_TOKEN', message: 'invalid token' }))
      await page.goto(`${t.path}?token=forged-token`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.invalidTitle)
      await expect(page.getByText(t.invalidMessage)).toBeVisible()
      await expect(page.getByRole('link', { name: t.home })).toBeVisible()
    })

    test('server error shows error state with retry option', async ({ page }) => {
      let fail = true
      await mockApi(page, async (route) => {
        if (fail) {
          await json(500, { code: 'SERVER_ERROR', message: 'internal error' })(route)
        } else {
          await json(200, { unsubscribed: true })(route)
        }
      })

      await page.goto(`${t.path}?token=retry-token`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.errorTitle)
      const retryBtn = page.getByRole('button', { name: t.retry })
      await expect(retryBtn).toBeVisible()

      fail = false
      await retryBtn.click()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.successTitle)
      await expect(page.getByText(t.successMessage)).toBeVisible()
    })

    for (const theme of ['light', 'dark'] as const) {
      test(`is axe clean in ${theme} mode`, async ({ page }) => {
        await page.addInitScript((th) => {
          localStorage.setItem('gupp-theme', th)
        }, theme)
        await mockApi(page, json(200, { unsubscribed: true }))
        await page.goto(`${t.path}?token=a11y-token`)
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.successTitle)

        const results = await new AxeBuilder({ page }).analyze()
        expect(results.violations).toEqual([])
      })
    }
  })
}
