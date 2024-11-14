import { FeatureCollection, Point } from 'geojson'
import { useEffect, useState } from 'react'

export type AirQualityStationData = {
  ozon: number
  stickstoffdioxid: number
  feinstaub_250: number
  feinstaub_1000: number
  air_quality_index: number
}

type AirQualityFeatureCollection = FeatureCollection<
  Point,
  AirQualityStationData
>

export default function useAirquality() {
  const [data, setData] = useState<AirQualityFeatureCollection | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://www.muenster01.de/luftqualitaet/data/luftqualitaet_muenster.geojson',
    )
      .then(res => res.json())
      .then(airQualityData => {
        setData(airQualityData)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { data, isLoading }
}
