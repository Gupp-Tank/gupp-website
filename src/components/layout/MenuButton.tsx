import { Icon } from '../ui/Icon'

interface MenuButtonProps {
  open: boolean
  controls: string
  openLabel: string
  closeLabel: string
  onClick: () => void
  ref?: React.Ref<HTMLButtonElement>
}

export function MenuButton({ open, controls, openLabel, closeLabel, onClick, ref }: MenuButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className="menu-button"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? closeLabel : openLabel}
      onClick={onClick}
    >
      <Icon name={open ? 'close' : 'menu'} size={22} strokeWidth={2.2} />
    </button>
  )
}
