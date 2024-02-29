import getWeather from '@/lib/brightsky'
import { Weather } from '@/types/brightsky'
import { isEqual } from 'date-fns'
import { useEffect, useState } from 'react'

type stationId = string
type coordinates = { lat: number; lng: number }

export default function useWeather(
  location: stationId | coordinates,
  timestamp: Date,
) {
  const [weatherCache, setWeatherCache] = useState<Weather[]>([])

  useEffect(() => {
    const match = weatherCache?.find(w =>
      isEqual(new Date(w.timestamp), timestamp),
    )
    if (match) {
      return
    }

    async function getData() {
      const { weather, sources: _sources } = await getWeather(
        location,
        timestamp,
      )

      const weatherMap = new Map<string, Weather>()

      // Concating arrays with duplicates
      const newWeather: Weather[] = [...weatherCache, ...weather]

      // Removing duplicates items
      newWeather.forEach(w => {
        if (!weatherMap.has(w.timestamp)) {
          weatherMap.set(w.timestamp, w)
        }
      })

      const newWeatherCache = Array.from(weatherMap.values()).sort(
        (a, b) =>
          new Date(a.timestamp).getDate() - new Date(b.timestamp).getDate(),
      )

      setWeatherCache(newWeatherCache)
    }

    getData()
  }, [location, timestamp])

  timestamp.setMinutes(0)
  timestamp.setSeconds(0)
  timestamp.setMilliseconds(0)

  const match = weatherCache?.find(w =>
    isEqual(new Date(w.timestamp), timestamp),
  )

  if (match) {
    return match
  }
}
