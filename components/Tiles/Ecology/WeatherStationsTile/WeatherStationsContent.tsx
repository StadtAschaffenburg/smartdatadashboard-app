'use client'

import Entry from './WeatherStationsEntry'
import { Spinner } from '@/components/Elements/Spinner'
import useApi from '@/hooks/useApi'
import { StationsResult } from './dt'

export default function WeatherStationsContent() {
  const weatherstations = useApi(
    'thingsboard/weatherstations',
    10,
  ) as StationsResult[]

  if (!weatherstations || !weatherstations.length) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {weatherstations.map(({ label, values }) => (
          <Entry key={label} title={label} values={values} />
        ))}
      </div>
    </div>
  )
}
