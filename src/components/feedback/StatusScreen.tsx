import type { ReactNode } from 'react'
import './StatusScreen.css'

interface StatusScreenProps {
  title: string
  message: string
  /** `alert` for failures that interrupt the user; omit for calm states like a 404. */
  role?: 'alert'
  children?: ReactNode
}

export function StatusScreen({ title, message, role, children }: StatusScreenProps) {
  return (
    <main className="status-screen" role={role}>
      <h1 className="status-screen__title">{title}</h1>
      <p className="status-screen__message">{message}</p>
      {children}
    </main>
  )
}
