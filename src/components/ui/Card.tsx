import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import './Card.css'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  radius?: 'md' | 'lg'
  elevation?: 'card' | 'float'
  children: ReactNode
}

export function Card({ as: Tag = 'div', radius = 'lg', elevation = 'card', className, children, ...rest }: CardProps) {
  const classes = ['card', `card--r-${radius}`, `card--${elevation}`, className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
