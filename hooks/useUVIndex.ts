'use client'

import { useEffect, useRef, useState } from 'react'
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
  const isFetching = useRef(false)

  useEffect(() => {
    if (isFetching.current) { return }
    isFetching.current = true
    
    getUVIndex().then(result => {
      setData(result as UVDataProps[]);
    }).catch(() => {
    }).finally(() => {
      isFetching.current = false
    });
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }
  }, [data])

  return data
}
