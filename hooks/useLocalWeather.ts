'use client'

import { useEffect, useState } from 'react'
import getLiveData from '@/lib/api/getLiveData'

interface LocalWeather {
  cloud_cover: number;
  humidity: number;
  irradiation: number;
  precipitation: number;
  pressure: number;
  avgrain: number;
  rain_amount: number;
  relative_humidity: number;
  avgsolar_radiation: number;
  temperature: number;
  wind_direction: number;
  wind_speed: number;
  solar_radiation: number;
}

const getLocalWeather = async () => {
  const response = await getLiveData('thingsboard/weather', 30)

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
  const [data, setData] = useState<LocalWeather | null>(null)

  useEffect(() => {
    getLocalWeather().then(weatherData => {
      if (weatherData) {
        setData(weatherData as LocalWeather);
      }
    });
  }, []);

  return data;
}