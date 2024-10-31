export type ColumnsProps = {
  columns: number
  children: React.ReactNode | React.ReactNode[]
}

export default function Columns({ columns = 1, children }: ColumnsProps) {
  const classes =
    columns === 2
      ? 'columns-1 gap-3 md:columns-2 md:gap-6 lg:columns-1 xl:columns-2'
      : 'w-full'
  return <div className={classes}>{children}</div>
}
