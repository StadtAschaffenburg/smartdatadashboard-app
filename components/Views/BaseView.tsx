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

const categoryID = {
  climate: '8f6f89ac-d6bf-4e6c-8445-d1503075963a',
  mobility: '4fa0c731-13d7-4ce9-8407-91a8a71da1cb',
  energy: '0c7620c0-7d0c-45e7-b801-0bc44715f731',
  building: '84ff5cfe-184a-41dd-885d-ff9c2c8c9dcf',
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
