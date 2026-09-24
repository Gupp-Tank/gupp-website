// Facts about the site as a whole, shared by the SEO tags, the sitemap and the prerender.
export const site = {
  /** Canonical origin, no trailing slash. */
  url: 'https://gupp.app',
  name: 'Gupp Tank',
  /** Open Graph locale codes per language. */
  ogLocale: { es: 'es_LA', en: 'en_US' },
  /** 1200x630 share image per language, served from /public. */
  ogImage: { es: '/og/og-es.jpg', en: '/og/og-en.jpg' },
  logo: '/branding/icon.png',
} as const
