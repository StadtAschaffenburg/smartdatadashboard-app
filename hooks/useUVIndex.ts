'use client'

import { useEffect, useState } from 'react'
import getLiveData from '@/lib/api/getLiveData'

const getUVIndex = async () => {
  try {
    const payload = await getLiveData('uvi')
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
