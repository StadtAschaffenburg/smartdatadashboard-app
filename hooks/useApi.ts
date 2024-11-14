'use client'

import { useEffect, useRef, useState } from 'react'
import getLiveData from '@/lib/api/getLiveData'

const fetchData = async (key: string) => {
  try {
    const payload = await getLiveData(key)
    return payload !== null ? payload : false
  } catch (error) {
    return false
  }
}

export default function useApi(key: string) {
  const [data, setData] = useState([])
  const isFetching = useRef(false)

  useEffect(() => {
    if (isFetching.current) {
      return
    }
    isFetching.current = true

    fetchData(key)
      .then(result => {
        setData(result)
      })
      .catch(() => {})
      .finally(() => {
        isFetching.current = false
      })
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }
  }, [data])

  return data
}
