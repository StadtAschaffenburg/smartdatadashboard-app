export type GridProps = {
  columns?: number
  children?: React.ReactNode | React.ReactNode[]
}

export default function Grid({ columns = 2, children }: GridProps) {
  // switch statement
  const classes = (() => {
    switch (columns) {
      case 3:
        return 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3'
      case 2:
        return 'grid gap-4 grid-cols-1 md:gap-8 lg:grid-cols-2'
      default:
        return 'w-full'
    }
  })()
  return <div className={classes}>{children}</div>
}
