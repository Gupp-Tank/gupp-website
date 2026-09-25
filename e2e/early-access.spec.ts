import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page, type Route } from '@playwright/test'

const API = 'https://api.gupp.app/api/v1/early-access'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type,accept', 'Access-Control-Allow-Methods': 'POST,OPTIONS' }

// The build points at https://api.gupp.app, and every spec answers it with a mock: no real API is called.
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
const json = (status: number, body: unknown) => (route: Route) => route.fulfill({ status, headers: { ...CORS, 'Content-Type': 'application/json' }, json: body })

const COPY = {
  es: {
    path: '/es', email: 'Correo electrónico', submit: 'Avisarme del lanzamiento', success: 'Listo, te avisaremos.',
    terms: 'términos y condiciones', privacy: 'política de privacidad',
    emailRequired: 'Escribe tu correo.', emailInvalid: 'Revisa el correo: parece incompleto.',
    consentRequired: 'Para registrarte debes aceptar los términos y la política de privacidad.',
    rateLimited: 'Demasiados intentos. Espera un momento e intenta de nuevo.',
    network: 'No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.',
    server: 'Nuestros servidores tuvieron un problema. Intenta más tarde.',
    validation: 'Alguno de los datos no es válido. Revísalos.',
  },
  en: {
    path: '/en', email: 'Email', submit: 'Notify me at launch', success: 'Done, we will let you know.',
    terms: 'terms and conditions', privacy: 'privacy policy',
    emailRequired: 'Enter your email.', emailInvalid: 'Check the email: it looks incomplete.',
    consentRequired: 'To sign up you need to accept the terms and the privacy policy.',
    rateLimited: 'Too many attempts. Please wait a moment and try again.',
    network: 'We couldn\'t reach the server. Check your connection and try again.',
    server: 'Our servers had a problem. Please try again later.',
    validation: 'Some of the information is not valid. Please review it.',
  },
} as const

for (const [locale, t] of Object.entries(COPY)) {
  test.describe(`early-access form (${locale})`, () => {
    const form = (page: Page) => page.locator('#cta').getByRole('form')
    const open = async (page: Page) => {
      await page.goto(t.path)
      await expect(form(page)).toBeVisible()
    }
    const fill = async (page: Page, email = 'Ana@Example.com', consent = true) => {
      await form(page).getByLabel(t.email).fill(email)
      if (consent) await form(page).getByRole('checkbox').check()
    }

    test('the consent checkbox is unchecked by default and blocks submission (no request is made)', async ({ page }) => {
      const bodies = await mockApi(page, json(201, { registered: true }))
      await open(page)
      await expect(form(page).getByRole('checkbox')).not.toBeChecked()
      await fill(page, 'ana@example.com', false)
      await form(page).getByRole('button', { name: t.submit }).click()
      await expect(form(page).getByText(t.consentRequired)).toBeVisible()
      expect(bodies).toHaveLength(0)
    })

    test('client validation explains an empty or malformed email', async ({ page }) => {
      const bodies = await mockApi(page, json(201, { registered: true }))
      await open(page)
      await form(page).getByRole('button', { name: t.submit }).click()
      await expect(form(page).getByText(t.emailRequired)).toBeVisible()
      await form(page).getByLabel(t.email).fill('ana@')
      await form(page).getByRole('checkbox').check()
      await form(page).getByRole('button', { name: t.submit }).click()
      await expect(form(page).getByText(t.emailInvalid)).toBeVisible()
      expect(bodies).toHaveLength(0)
    })

    test('a valid sign-up sends the contract body with the accepted document version and shows success', async ({ page }) => {
      const bodies = await mockApi(page, json(201, { registered: true }))
      await open(page)
      await fill(page)
      await form(page).getByRole('combobox').selectOption('reef')
      await form(page).getByRole('button', { name: t.submit }).click()
      await expect(page.locator('#cta').getByRole('status')).toContainText(t.success)
      expect(bodies).toEqual([{ email: 'ana@example.com', locale, tankType: 'reef', consent: { accepted: true, documentsVersion: '2026-09-24' } }])
    })

    test('an email already on the list gets the same success (nothing is revealed)', async ({ page }) => {
      await mockApi(page, json(201, { registered: true }))
      await open(page)
      await fill(page, 'already@registered.com')
      await form(page).getByRole('button', { name: t.submit }).click()
      await expect(page.locator('#cta').getByRole('status')).toContainText(t.success)
    })

    for (const [name, respond, message] of [
      ['rate limited', json(429, { statusCode: 429, code: 'RATE_LIMITED', message: 'raw server text' }), t.rateLimited],
      ['a server error', json(500, { statusCode: 500, code: 'INTERNAL_ERROR', message: 'raw server text' }), t.server],
      ['a validation error', json(400, { statusCode: 400, code: 'VALIDATION_ERROR', message: 'raw server text' }), t.validation],
      ['a network failure', (route: Route) => route.abort('failed'), t.network],
    ] as const) {
      test(`${name}: shows the localized message, never the server text, and keeps the form`, async ({ page }) => {
        await mockApi(page, respond)
        await open(page)
        await fill(page)
        await form(page).getByRole('button', { name: t.submit }).click()
        await expect(form(page).getByRole('alert')).toHaveText(message)
        await expect(form(page).getByRole('alert')).not.toContainText('raw server text')
        await expect(form(page).getByLabel(t.email)).toHaveValue('Ana@Example.com')
        await expect(form(page).getByRole('button', { name: t.submit })).toBeEnabled()
      })
    }

    test('the consent links resolve in the active language', async ({ page }) => {
      await open(page)
      await form(page).getByRole('link', { name: t.terms }).click()
      await expect(page).toHaveURL(new RegExp(`/${locale}/terms$`))
      await page.goBack()
      await form(page).getByRole('link', { name: t.privacy }).click()
      await expect(page).toHaveURL(new RegExp(`/${locale}/privacy$`))
    })

    for (const theme of ['light', 'dark'] as const) {
      test(`axe is clean: idle, with errors, and after success (${theme})`, async ({ page }) => {
        await page.addInitScript((value) => value === 'dark' && localStorage.setItem('gupp-theme', 'dark'), theme)
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await mockApi(page, json(201, { registered: true }))
        await open(page)
        const scan = async () => (await new AxeBuilder({ page }).include('#cta').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations.map((v) => `${v.id}: ${v.nodes[0]?.target.join(' ')}`)
        expect(await scan()).toEqual([])
        await form(page).getByRole('button', { name: t.submit }).click()
        await expect(form(page).getByText(t.emailRequired)).toBeVisible()
        expect(await scan()).toEqual([])
        await fill(page)
        await form(page).getByRole('button', { name: t.submit }).click()
        await expect(page.locator('#cta').getByRole('status')).toBeVisible()
        expect(await scan()).toEqual([])
      })
    }
  })
}

test('a double click sends one request', async ({ page }) => {
  let calls = 0
  await mockApi(page, async (route) => {
    calls += 1
    await new Promise((resolve) => setTimeout(resolve, 400))
    await json(201, { registered: true })(route)
  })
  await page.goto('/es')
  const form = page.locator('#cta').getByRole('form')
  await form.getByLabel('Correo electrónico').fill('ana@example.com')
  await form.getByRole('checkbox').check()
  await form.getByRole('button', { name: 'Avisarme del lanzamiento' }).dblclick()
  await expect(page.locator('#cta').getByRole('status')).toBeVisible()
  expect(calls).toBe(1)
})
