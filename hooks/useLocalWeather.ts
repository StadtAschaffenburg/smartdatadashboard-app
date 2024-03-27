'use client'

import { useEffect, useState } from 'react'
import { Weather } from '@/types/brightsky'

const getLocalWeather = async () => {
  const api = (process.env.PUBLIC_SSD_API || 'https://smartcitydashboard-cms.preview.schleegleixner.de/api/') + 'thingsboard/weather'
  const res = await fetch(api)
  const data = await res.json()

  const payload = Object.entries(data.payload)
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

export default function useLocalWeather() {
  const [data, setData] = useState<Weather[]>([])

  useEffect(() => {
    getLocalWeather().then(e => setData(e as Weather[]))
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }
  }, [data])

  return data
}
