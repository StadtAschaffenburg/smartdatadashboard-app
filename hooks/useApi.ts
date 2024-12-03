'use client'

import { useEffect, useRef, useState } from 'react'
import getLiveData from '@/lib/api/getLiveData'

const fetchData = async (key: string, lifetime: number) => {
  try {
    const payload = await getLiveData(key, lifetime)
    return payload !== null ? payload : false
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export default function useApi<T>(key: string, lifetime: number = 30) {
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const isFetching = useRef(false)

  useEffect(() => {
    if (isFetching.current) {return}

    isFetching.current = true
    setStatus('loading')

    fetchData(key, lifetime)
      .then(result => {
        if (result) {
          setData(result)
          setStatus('success')
        } else {
          setData(null)
          setStatus('error')
        }
      })
      .catch(() => {
        setData(null)
        setStatus('error')
      })
      .finally(() => {
        isFetching.current = false
      })
  }, [key, lifetime])

  return { data, status }
}
