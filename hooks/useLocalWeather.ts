'use client'

import { useEffect, useState } from 'react'
import { getAPI } from '@/lib/cms'

interface LocalWeather {
  humidity: number;
  irradiation: number;
  precipitation: number;
  pressure: number;
  rain: number;
  rain_amount: number;
  relative_humidity: number;
  solar_radiation: number;
  temperature: number;
  wind_direction: number;
  wind_speed: number;
}

const getLocalWeather = async () => {
  const response = await getAPI('thingsboard/weather', true, 30)

  if (response !== null) {
    const payload = Object.entries(response)
    .map(([key, value]) => ({
      key,
      value: isNaN(Number(value)) ? value : Number(value),
    }))
    .sort((a, b) => {
      if (typeof a.value === 'number' && typeof b.value === 'number') {
        return a.value - b.value;
      } else if (typeof a.value === 'string' && typeof b.value === 'string') {
        return a.value.localeCompare(b.value);
      } 
        return typeof a.value === 'number' ? -1 : 1;
      
    })
    .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

    return { ...payload }
  }

  return false
}

export default function useLocalWeather() {
  const [data, setData] = useState<LocalWeather[]>([])

  useEffect(() => {
    getLocalWeather().then(e => setData(e as LocalWeather[]))
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }
  }, [data])

  return data
}
