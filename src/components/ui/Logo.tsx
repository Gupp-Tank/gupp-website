import { useTheme } from '../../hooks/useTheme'

interface LogoProps {
  height?: number
}

// The light wordmark is dark navy and disappears on the dark background,
// so dark mode must swap to the dedicated asset (gupp-docs CLAUDE.md).
export function Logo({ height = 40 }: LogoProps) {
  const { theme } = useTheme()
  const src = theme === 'dark' ? '/branding/logotype-dark.png' : '/branding/logotype.png'

  return <img src={src} alt="Gupp" height={height} width={height * 2} fetchPriority="high" decoding="async" />
}
