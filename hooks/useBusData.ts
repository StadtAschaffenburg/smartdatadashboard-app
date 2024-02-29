'use client'

import { useEffect, useState } from 'react'

const getBusData = async () => {
  const res = await fetch('https://rest.busradar.conterra.de/prod/fahrzeuge')
  const data = await res.json()

  return data
}

type BusProps = {
  linienid: string
  richtungsid: string
  akthst: string
  delay: number
  nachhst?: string
  richtungstext: string
  starthst: string
  betriebstag: string
  sequenz: number
  linientext: string
  fahrzeugid: string
  fahrtstatus: string
  fahrtbezeichner: string
  abfahrtstart: string
  visfahrplanlagezst: number
  ankunftziel: string
  zielhst: string
}

export function useBusData() {
  const [data, setData] =
    useState<GeoJSON.FeatureCollection<GeoJSON.Point, BusProps>>()

  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      getBusData().then(e => setData(e))
    }, 60000)
    getBusData().then(e => setData(e))

    return clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    const eCount = data.features.filter(bus => {
      const id = bus.properties.fahrzeugid.substring(0, 2)

      const start15 = id.startsWith('15')

      return start15 || (parseInt(id) > 18 && parseInt(id) < 26)
    }).length

    setElectroCount(eCount)
    setCombustionCount(data.features.length - eCount)
  }, [data])

  return { data, electroCount, combustionCount }
}
