// Serves dist/ the way Vercel serves it, so E2E and Lighthouse test what production does:
//   /             dist/index.html
//   /es           dist/es/index.html (prerendered, no trailing slash)
//   /es/          308 -> /es
//   unknown path  dist/404.html with a real 404
// plus the headers from vercel.json. Usage: node scripts/serve-dist.mjs [--port 4173]
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import http from 'node:http'
import { extname, join, normalize } from 'node:path'
import { createBrotliCompress, createGzip } from 'node:zlib'

const port = Number(process.argv[process.argv.indexOf('--port') + 1]) || 4173
const dist = 'dist'
const config = JSON.parse(readFileSync('vercel.json', 'utf8'))
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
}
const rules = (config.headers ?? []).map((r) => ({ re: new RegExp(`^${r.source.replace('(.*)', '.*')}$`), headers: r.headers }))
const isFile = (p) => existsSync(p) && statSync(p).isFile()
// Vercel compresses text assets (brotli, else gzip); without this, transfer sizes (and any
// throttled performance measurement) would be several times larger than in production.
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.xml', '.txt'])

function send(req, res, status, file, headers) {
  const type = TYPES[extname(file)] ?? 'application/octet-stream'
  const accepts = String(req.headers['accept-encoding'] ?? '')
  const encoding = COMPRESSIBLE.has(extname(file)) ? (accepts.includes('br') ? 'br' : accepts.includes('gzip') ? 'gzip' : null) : null
  res.writeHead(status, { 'Content-Type': type, Vary: 'Accept-Encoding', ...(encoding && { 'Content-Encoding': encoding }), ...headers })
  const stream = createReadStream(file)
  if (encoding === 'br') stream.pipe(createBrotliCompress()).pipe(res)
  else if (encoding === 'gzip') stream.pipe(createGzip()).pipe(res)
  else stream.pipe(res)
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])
    const rel = normalize(url).replace(/^(\.\.[/\\])+/, '')
    const headers = {}
    for (const { re, headers: hs } of rules) if (re.test(url)) for (const { key, value } of hs) headers[key] = value

    if (url.length > 1 && url.endsWith('/')) {
      res.writeHead(308, { Location: url.slice(0, -1), ...headers })
      return res.end()
    }
    const candidates = [join(dist, rel), join(dist, rel, 'index.html')]
    const file = candidates.find(isFile)
    if (file) return send(req, res, 200, file, headers)
    send(req, res, 404, join(dist, '404.html'), headers)
  })
  .listen(port, () => console.log(`Serving dist/ on http://localhost:${port}`))
