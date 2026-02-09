import { cx } from 'class-variance-authority'

export type GridProps = {
  columns?: number
  children?: React.ReactNode | React.ReactNode[]
}

function getGridColumnClass(columns?: number) {
  switch (columns) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-1 md:grid-cols-2'
    case 3:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    default:
      return 'w-full'
  }
}

export default function Grid({ columns = 12, children }: GridProps) {
  return (
    <div className={cx('grid gap-4', getGridColumnClass(columns))}>
      {children}
    </div>
  )
}
