import { GoToButton } from '../Elements/GoToButton'
import { Spacer } from '../Elements/Spacer'
import SectionHeader from '../Layout/SectionHeader'

interface ViewProps {
  type: 'climate' | 'mobility' | 'energy' | 'building'
  children: React.ReactNode | React.ReactNode[]
  showSuccessStories?: boolean
  showSurveys?: boolean
  showGoToButton?: boolean
}

export default async function BaseView({
  type,
  children,
  showGoToButton = false,
}: ViewProps) {
  return (
    <>
      <SectionHeader variant={type} />
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
