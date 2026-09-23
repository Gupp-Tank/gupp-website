import { useMemo } from 'react'
import './Sparkline.css'

interface SparklineProps {
  points: number[]
  width?: number
  height?: number
  label: string
  className?: string
}

const PADDING = 4

export function Sparkline({ points, width = 120, height = 36, label, className }: SparklineProps) {
  const coords = useMemo(() => {
    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min || 1
    const step = (width - PADDING * 2) / Math.max(points.length - 1, 1)
    return points.map((p, i) => ({
      x: PADDING + i * step,
      y: PADDING + (height - PADDING * 2) * (1 - (p - min) / range),
    }))
  }, [points, width, height])

  const d = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
  const last = coords.at(-1)

  return (
    <svg
      className={['sparkline', className].filter(Boolean).join(' ')}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
    >
      <path className="sparkline__line" d={d} pathLength={1} />
      {last && <circle className="sparkline__dot" cx={last.x} cy={last.y} r={3.5} />}
    </svg>
  )
}
