import Text from '@/components/Elements/Text'
import { StationsValue } from './dt'

export type WeatherStationsProps = {
  title: string
  values: StationsValue[]
}

export default function WeatherStationsEntry({
  title,
  values,
}: WeatherStationsProps) {
  return (
    <div className="">
      <div>
        <Text as={'h4'} tag={'span'}>
          {title}
        </Text>
        {values.map(({ id, value }) => (
          <div key={id}>
            {id}: {value} °C
          </div>
        ))}
      </div>
    </div>
  )
}
