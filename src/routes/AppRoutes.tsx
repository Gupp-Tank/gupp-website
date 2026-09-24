import { Route, Routes } from 'react-router'
import { SiteLayout } from '../components/layout/SiteLayout'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
