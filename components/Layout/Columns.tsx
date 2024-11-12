export type ColumnsProps = {
  columns?: number
  children?: React.ReactNode | React.ReactNode[]
}

export default function Columns({ columns = 2, children }: ColumnsProps) {
  // switch statement
  const classes = (() => {
    switch (columns) {
      case 3:
        return 'columns-1 gap-4 md:columns-2 md:gap-8 lg:columns-3 xl:columns-3'
      case 2:
        return 'columns-1 gap-4 lg:columns-2 md:gap-8'
      default:
        return 'w-full'
    }
  })()
  return <div className={classes}>{children}</div>
}
