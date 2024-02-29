export type ColumnsProps = {
  children: React.ReactNode | React.ReactNode[]
}

export default function Columns({ children }: ColumnsProps) {
  return (
    <div className="columns-1 gap-3 md:columns-2 md:gap-6 lg:columns-1 xl:columns-2">
      {children}
    </div>
  )
}
