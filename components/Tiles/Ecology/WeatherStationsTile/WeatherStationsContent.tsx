'use client'

import { useEffect, useState } from 'react'
import Entry from './WeatherStationsEntry'
import { Spinner } from '@/components/Elements/Spinner'
import useApi from '@/hooks/useApi'
import { StationsResult } from './dt'
import { TileSplitView } from '../../Base/TileSplitView'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'
import CityMap from '@/assets/images/map.png'
import Image from 'next/image'

export default function WeatherStationsContent() {
  const weatherstations = useApi(
    'thingsboard/weatherstations',
    10,
  ) as StationsResult[]

  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)

  useEffect(() => {
    if (weatherstations.length > 0 && autoRotate) {
      const interval = setInterval(() => {
        setSelectedIndex(prevIndex => (prevIndex + 1) % weatherstations.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [weatherstations, autoRotate])

  if (!weatherstations || !weatherstations.length) {
    return <Spinner />
  }

  const selectedStation = weatherstations[selectedIndex]

  function getLatitute(latitute: number) {
    const lat_start = 100
    const lat_end = 200
    return ((latitute - lat_start) / (lat_end - lat_start)) * 100
  }

  function getLongitute(longitute: number) {
    const long_start = 100
    const long_end = 200
    return ((longitute - long_start) / (long_end - long_start)) * 100
  }

  function handleStationClick(index: number) {
    setSelectedIndex(index)
    setAutoRotate(false) // Stop automatic rotation when a station is manually selected
  }

  return (
    <TileSplitView>
      <TileSplitView.Left>
        <div className="relative overflow-hidden rounded">
          <Image
            alt="Karte der Stadt Aschaffenburg"
            className="w-full"
            src={CityMap}
          />

          <div className="absolute bottom-0 left-0 right-0 top-0 border">
            {weatherstations.map(({ label, position }, index) => (
              <div
                className="absolute -translate-x-4 -translate-y-4 cursor-pointer"
                key={label}
                onClick={() => handleStationClick(index)}
                style={{
                  top: getLongitute(position.lng) + '%',
                  left: getLatitute(position.lat) + '%',
                }}
              >
                <div
                  className={`h-8 w-8 transition-all hover:scale-110 ${
                    selectedIndex === index ? 'scale-110' : ''
                  }`}
                >
                  <PulsatingCircle
                    className={`h-full w-full fill-primary stroke-primary ${
                      selectedIndex === index
                        ? 'fill-secondary stroke-secondary'
                        : 'fill-primary stroke-primary'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </TileSplitView.Left>
      <TileSplitView.Right>
        <div className="flex min-w-80 flex-col gap-4">
          {selectedStation && (
            <Entry
              key={selectedStation.label}
              title={selectedStation.label}
              values={selectedStation.values}
            />
          )}
        </div>
      </TileSplitView.Right>
    </TileSplitView>
  )
}
