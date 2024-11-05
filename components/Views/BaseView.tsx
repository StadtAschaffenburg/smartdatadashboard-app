import { GoToButton } from '../Elements/GoToButton'
import { Spacer } from '../Elements/Spacer'

interface ViewProps {
  type: 'climate' | 'mobility' | 'energy' | 'building'
  children: React.ReactNode | React.ReactNode[]
  showSuccessStories?: boolean
  showSurveys?: boolean
  showGoToButton?: boolean
}

// <SectionHeader variant={type} />

export default async function BaseView({
  type,
  children,
  showGoToButton = false,
}: ViewProps) {
  return (
    <>
      {children}
      {showGoToButton && (
        <>
          <Spacer size={'sm'} />
          <GoToButton type={type} />
        </>
      )}
      <Spacer size={'xl'} />
    </>
  )
}
