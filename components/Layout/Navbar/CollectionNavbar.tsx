import Title from '@/components/Elements/Title'
import BaseNavbar from './BaseNavbar'
import Back from '@/components/Elements/Back'

type Props = {
  title: string
  description: string
}

export default function CollectionNavbar({ title, description }: Props) {
  return (
    <BaseNavbar actionComponent={<Back />} variant="secondary">
      <div className="flex w-full flex-col-reverse gap-2 md:flex-row">
        <Title as={'h5'} className="flex-[2_2_0%]" variant="primary">
          {description}
        </Title>
        <div className="hidden flex-1 md:block" />
        <Title as={'h2'} className="flex-1" variant="secondary">
          {title}
        </Title>
      </div>
    </BaseNavbar>
  )
}
