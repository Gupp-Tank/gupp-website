import { Route, Routes } from 'react-router'
import { SiteLayout } from '../components/layout/SiteLayout'
import { HomePage } from '../pages/HomePage'
import { LegalPage } from '../pages/LegalPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { UnsubscribePage } from '../pages/UnsubscribePage'
import { LocaleRoute } from './LocaleRoute'
import { RootRedirect } from './RootRedirect'

// The route table. Router-agnostic on purpose: main wires BrowserRouter, tests
// wire MemoryRouter.
export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<RootRedirect />} />
      <Route path=":locale" element={<LocaleRoute />}>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="privacy" element={<LegalPage document="privacy" />} />
          <Route path="terms" element={<LegalPage document="terms" />} />
          <Route path="unsubscribe" element={<UnsubscribePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
