import './Logo.css'

interface LogoProps {
  height?: number
}

// The light wordmark is dark navy and disappears on the dark background, so dark mode
// needs its own asset (gupp-docs CLAUDE.md). Both images are in the markup and CSS shows
// the right one for the theme: it works before any JavaScript runs (prerendered HTML,
// first paint) and never flashes the wrong logo.
export function Logo({ height = 40 }: LogoProps) {
  const size = { height, width: height * 2 }
  return (
    <>
      <img className="logo logo--light" src="/branding/logotype.png" alt="Gupp" {...size} fetchPriority="high" decoding="async" />
      <img className="logo logo--dark" src="/branding/logotype-dark.png" alt="Gupp" {...size} fetchPriority="high" decoding="async" />
    </>
  )
}
