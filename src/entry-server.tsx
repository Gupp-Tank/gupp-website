import { Writable } from 'node:stream'
import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppErrorBoundary } from './components/feedback/AppErrorBoundary'
import { AppRoutes } from './routes/AppRoutes'

// Server render for the prerender step (scripts/prerender.ts). It runs only at build
// time, in Node, and waits for lazy chunks (the hero's WebGL canvas) so the HTML
// matches exactly what the browser will hydrate.
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString()
        done()
      },
      final(done) {
        resolve(html)
        done()
      },
    })

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <AppErrorBoundary>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </AppErrorBoundary>
      </StrictMode>,
      { onAllReady: () => pipe(sink), onShellError: reject, onError: reject },
    )
  })
}
