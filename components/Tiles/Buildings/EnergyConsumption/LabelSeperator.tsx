import Title from '@/components/Elements/Title'

interface Props {
  children: string
}

export default function LabelSeperator({ children }: Props) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex-none">
        <Title as={'h5'} className="w-fit" variant={'primary'}>
          {children}
        </Title>
      </div>
      <hr className="flex-1 border-[#707070]" />
    </div>
  )
}
