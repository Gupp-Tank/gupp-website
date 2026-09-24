import type { ReactNode } from 'react'
import './PhoneFrame.css'

interface PhoneFrameProps {
  children: ReactNode
  className?: string
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={['phone', className].filter(Boolean).join(' ')}>
      <div className="phone__screen">
        <div className="phone__status" aria-hidden>
          <span>9:41</span>
          <span className="phone__island" />
          <span className="phone__battery" />
        </div>
        {children}
      </div>
    </div>
  )
}
