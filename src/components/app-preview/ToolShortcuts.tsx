import type { ToolShortcut } from '../../types/appPreview'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

interface ToolShortcutsProps {
  tools: ToolShortcut[]
}

export function ToolShortcuts({ tools }: ToolShortcutsProps) {
  return (
    <Card radius="md" className="tool-shortcuts">
      {tools.map((tool) => (
        <span key={tool.label} className={`tool-shortcut tool-shortcut--${tool.tone}`}>
          <Icon name={tool.icon} size={20} />
          <span className="app-caption">{tool.label}</span>
        </span>
      ))}
    </Card>
  )
}
