interface ViewProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function BaseView({ children }: ViewProps) {
  return <>{children}</>
}
