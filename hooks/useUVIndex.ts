'use client'

import { useEffect, useState } from 'react'
import { getJSON } from '@/lib/cms'

const getUVIndex = async () => {
  const api = (process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/') + 'uvi'
  const data = await getJSON(api)

  if (data?.status === 'success') {
    return data?.payload
  }

  return undefined
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
