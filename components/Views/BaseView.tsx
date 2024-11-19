interface ViewProps {
  children: React.ReactNode | React.ReactNode[]
}

export default async function BaseView({ children }: ViewProps) {
  return <>{children}</>
}
