import Toggle from './Toggle'
import { cx } from 'class-variance-authority'
import { useContentWidth } from '@schleegleixner/react-statamic-api'

export interface IndiciesToggleProps {
  className?: string
  indices: Record<string, any>
  onToggle: (_key: string, _checked: boolean) => void
}

export default function IndiciesToggle({
  className = '',
  indices,
  onToggle,
}: IndiciesToggleProps) {
  const limit = 520
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const toggled_count = Object.keys(indices).filter(
    key => indices[key].visible,
  ).length

  return (
    <div
      className={cx(
        className,
        contentWidth < limit ? 'flex' : 'grid grid-cols-2',
        'align-center w-full max-w-[720px] flex-col justify-center gap-x-4 gap-y-2 lg:p-4',
      )}
      ref={elRef}
    >
      {Object.keys(indices).map(key => (
        <Toggle
          checked={indices[key].visible}
          disabled={indices[key].visible && toggled_count <= 1}
          icon={indices[key].icon}
          key={key}
          onChange={checked => onToggle(key, checked)}
          title={indices[key].title}
          type={key}
          variant={indices[key].variant}
        />
      ))}
    </div>
  )
}
