import { useRef } from 'react'
import { useWaterCaustics } from '../../hooks/useWaterCaustics'
import './WaterCaustics.css'

interface WaterCausticsProps {
  className?: string
}

export function WaterCaustics({ className }: WaterCausticsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useWaterCaustics(canvasRef)

  return <canvas ref={canvasRef} className={['water-caustics', className].filter(Boolean).join(' ')} aria-hidden />
}
