import { isEqual } from 'date-fns'
import { useEffect, useState } from 'react'

const getBicycleData = async () => {
  const limit = 7
  const api = (process.env.PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/') + 'ecocounter?step=day&limit=' + limit
  const res = await fetch(api)
  const data = await res.json()

  return data.payload
}

type BicycleAPIResponse = {
  name: string
  id: string
  interval: number
  visible: boolean
  data: {
    counts: number
    date: string
  }[]
}

type BicycleStationData = {
  count: number
  id: string
  name: string
}

export function useBicycleCount(timestamp: Date) {
  timestamp.setUTCHours(0)
  timestamp.setUTCMinutes(0)
  timestamp.setUTCSeconds(0)
  timestamp.setUTCMilliseconds(0)

  const [data, setData] = useState<BicycleAPIResponse[]>()

  const [filteredData, setFilteredData] = useState<BicycleStationData[]>()

  const [totalMin, setTotalMin] = useState(0)
  const [totalMax, setTotalMax] = useState(0)

  useEffect(() => {
    getBicycleData().then(e => setData(e))
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    const filtered = data.map(e => ({
      id: e.id,
      name: e.name,
      count:
        e.data.find(m => isEqual(new Date(m.date), timestamp))?.counts || 0,
    }))

    setFilteredData(filtered)
  }, [timestamp, data])

  useEffect(() => {
    if (!data) {
      return
    }

    const min = Math.min(
      ...data.map(e =>
        Math.min(...e.data.map(x => x.counts).filter(y => y !== null)),
      ),
    )

    const max = Math.max(
      ...data.map(e =>
        Math.max(...e.data.map(x => x.counts).filter(y => y !== null)),
      ),
    )

    setTotalMin(min)
    setTotalMax(max)
  }, [data])

  return {
    min: totalMin,
    max: totalMax,
    data: filteredData,
    stationCount: 2,
  }
}
