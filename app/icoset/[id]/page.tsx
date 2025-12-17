import IconFactory from '@/utils/factories/IconFactory'

export default async function IconPage({ params }: any) {
  const { id } = await params

  return (
    <div
      className="flex h-80 w-80 items-center justify-center overflow-hidden bg-primary"
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
    >
      <div
        style={{
          height: '80%',
          width: '80%',
        }}
      >
        <IconFactory
          className="h-full w-full object-contain"
          type={id}
          variant={'white'}
        />
      </div>
    </div>
  )
}
