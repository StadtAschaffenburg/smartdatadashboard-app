import { StationsValue } from './dt'
import Phenomenon from '@/components/Elements/Phenomenon'
import Background from '@/components/Layout/Background'
import Title from '@/components/Elements/Title'
import IconFactory from '@/utils/IconFactory'

export type WeatherStationsProps = {
  icon?: string
  title: string
  values: StationsValue[]
}

export default function WeatherStationsEntry({
  icon,
  title,
  values,
}: WeatherStationsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Background
        className={'w-full overflow-hidden'}
        rounded
        variant={'white'}
      >
        <div className="">
          <div className="flex items-center justify-between gap-4 bg-primary px-6 py-4 text-white">
            <div className="">
              <div className="text-primary-light">Wetterstation</div>
              <Title as={'h4'} variant={'white'}>
                {title}
              </Title>
            </div>
            {icon && (
              <IconFactory className="w-12" type={icon} variant="white" />
            )}
          </div>
          <div className="flex flex-col gap-4 px-6 py-4">
            {values.map(({ id, value }) => (
              <Phenomenon
                animate={false}
                key={id}
                phenomenon={id}
                size="md"
                value={value as number}
              />
            ))}
          </div>
        </div>
      </Background>
    </div>
  )
}
