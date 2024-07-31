import { isEqual } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import getLiveData from '@/lib/api/getLiveData'

const getBicycleData = async () => {
  const limit = 7

  try {
    const payload = await getLiveData(`ecocounter?step=day&limit=${limit}`)
    return payload !== null ? payload : false
  } catch (error) {
    return false;
  }
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

  const isFetching = useRef(false);

  useEffect(() => {
    if (isFetching.current) { return };
    isFetching.current = true;
    
    getBicycleData().then(result => {
      setData(result);
    }).catch(() => {
    }).finally(() => {
      isFetching.current = false;
    });
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
