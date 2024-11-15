import Title from '@/components/Elements/Title'
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
        <Title as={'h4'} tag={'span'}>
          {title}
        </Title>
        {values.map(({ id, value }) => (
          <div key={id}>
            {id}: {value} °C
          </div>
        ))}
      </div>
    </div>
  )
}
