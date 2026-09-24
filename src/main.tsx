import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import { AppErrorBoundary } from './components/feedback/AppErrorBoundary'

const tree = (
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
)

const root = document.getElementById('root')!
// Prerendered pages (/es, /en) arrive with their markup: hydrate it so the DOM (and its
// running animations) is kept. Anything else (the / redirect, unknown paths) renders fresh.
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
