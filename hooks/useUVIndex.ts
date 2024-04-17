'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/cms'

const getUVIndex = async () => {
  try {
    const payload = await client.getAPI('uvi')
    return payload !== null ? payload : false
  } catch (error) {
    return false;
  }
}

type UVDataProps = number[]

export default function useUVIndex() {
  const [data, setData] = useState<UVDataProps[]>([])

  useEffect(() => {
    getUVIndex().then(e => setData(e as UVDataProps[]))
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }
  }, [data])

  return data
}
