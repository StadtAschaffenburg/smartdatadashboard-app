'use client'

import { useEffect, useRef, useState } from 'react'
import Entry from './WeatherStationsEntry'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import useApi from '@/hooks/useApi'
import { StationsResult } from './dt'
import { TileSplitView } from '../../Base/TileSplitView'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'
import CityMap from '@/assets/images/stadt_ab_map.jpg'
import Image from 'next/image'

const ZOOM_LEVEL = 3

const map_dimensions = {
  lat_start: 50.008889877698266,
  lat_end: 49.93574670873378,
  long_start: 9.051106278835075,
  long_end: 9.233342108624324,
}

const position_corrections = {
  x: -1.5,
  y: 0,
}

function getLatitude(lat: number) {
  return (
    ((lat - map_dimensions.lat_start) /
      (map_dimensions.lat_end - map_dimensions.lat_start)) *
      100 +
    position_corrections.y
  )
}

function getLongitude(lng: number) {
  return (
    ((lng - map_dimensions.long_start) /
      (map_dimensions.long_end - map_dimensions.long_start)) *
      100 +
    position_corrections.x
  )
}

function getMapCenter(stations: StationsResult[]) {
  const latitudes = stations.map(station => station.position.lat)
  const longitudes = stations.map(station => station.position.lng)

  const center_lat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2
  const center_lng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2

  return { center_lat, center_lng }
}

function getMapTransform(stations: StationsResult[], zoomLevel: number) {
  const { center_lat, center_lng } = getMapCenter(stations)
  const x_percent = getLongitude(center_lng)
  const y_percent = getLatitude(center_lat)

  return {
    scale: zoomLevel,
    translateX: `${50 - x_percent}%`,
    translateY: `${50 - y_percent}%`,
  }
}

export default function WeatherStationsContent() {
  const { data: weatherstations, status } = useApi<StationsResult[]>(
    'thingsboard/weatherstations',
    10,
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const mapContainerRef = useRef(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    if (
      !weatherstations ||
      weatherstations.length === 0 ||
      !mapContainerRef.current
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setZoomLevel(ZOOM_LEVEL)
        } else {
          setZoomLevel(1)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(mapContainerRef.current)

    return () => observer.disconnect()
  }, [weatherstations])

  useEffect(() => {
    if (weatherstations && weatherstations.length > 0 && autoRotate) {
      const interval = setInterval(() => {
        setSelectedIndex(prevIndex => (prevIndex + 1) % weatherstations.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [weatherstations, autoRotate])

  // gatekeeper
  if (!weatherstations || !weatherstations.length || status !== 'success') {
    return <RequestIndicator failed={status === 'error'} />
  }

  const selectedStation = weatherstations[selectedIndex]
  const mapTransform = getMapTransform(weatherstations, zoomLevel)

  function handleStationClick(index: number) {
    setSelectedIndex(index)
    setAutoRotate(false)
  }

  return (
    <TileSplitView>
      <TileSplitView.Left>
        <div className="relative overflow-hidden rounded" ref={mapContainerRef}>
          <div
            className="relative transition-all duration-1000"
            style={{
              transform: `scale(${mapTransform.scale}) translate(${mapTransform.translateX}, ${mapTransform.translateY})`,
              transformOrigin: 'center',
            }}
          >
            <Image
              alt="Karte der Stadt Aschaffenburg"
              className="w-full"
              loading="lazy"
              src={CityMap}
              width={2560}
            />

            <div className="absolute bottom-0 left-0 right-0 top-0">
              {weatherstations.map(({ label, position }, index) => (
                <div
                  className="absolute -translate-x-4 -translate-y-4 scale-50 cursor-pointer"
                  key={label}
                  onClick={() => handleStationClick(index)}
                  style={{
                    left: getLongitude(position.lng) + '%',
                    top: getLatitude(position.lat) + '%',
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
