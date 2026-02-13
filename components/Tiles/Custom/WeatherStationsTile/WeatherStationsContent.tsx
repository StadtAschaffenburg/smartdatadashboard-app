'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Entry from './WeatherStationsEntry'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { useApi } from '@schleegleixner/react-statamic-api'
import { StationsResult } from './dt'
import { TileSplitView } from '../../Base/TileSplitView'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'
import CityMap from '@/assets/images/stadt_ab_map.jpg'
import Image from 'next/image'
import { TilePayloadType } from '@schleegleixner/react-statamic-api'

const map_dimensions = {
  lat_start: 50.008889877698266,
  lat_end: 49.93574670873378,
  long_start: 9.051106278835075,
  long_end: 9.233342108624324,
}

const position_corrections = { x: -1.5, y: 0 }

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const ZOOM_STEP = 0.5

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

function getZoomLevel(
  min_lat: number,
  max_lat: number,
  min_lng: number,
  max_lng: number,
) {
  const width_percent = getLongitude(max_lng) - getLongitude(min_lng)
  const height_percent = getLatitude(min_lat) - getLatitude(max_lat)

  const span_x = Math.abs(width_percent)
  const span_y = Math.abs(height_percent)

  if (span_x <= 0 || span_y <= 0) {
    return 1
  }

  const scale_x = 80 / span_x
  const scale_y = 80 / span_y

  return Math.min(scale_x, scale_y, MAX_ZOOM)
}

function getMapCenter(stations: StationsResult[]) {
  const latitudes = stations.map(station => station.position.lat)
  const longitudes = stations.map(station => station.position.lng)

  const center_lat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2
  const center_lng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2

  const zoomLevel = getZoomLevel(
    Math.min(...latitudes),
    Math.max(...latitudes),
    Math.min(...longitudes),
    Math.max(...longitudes),
  )

  return { center_lat, center_lng, zoomLevel }
}

function getInitialMapTransform(stations: StationsResult[]) {
  const { center_lat, center_lng, zoomLevel } = getMapCenter(stations)
  const x_percent = getLongitude(center_lng)
  const y_percent = getLatitude(center_lat)

  return {
    scale: zoomLevel,
    translateX: 50 - x_percent,
    translateY: 50 - y_percent,
  }
}

// Clamp translation to prevent panning beyond map boundaries
function clampTranslation(
  translateX: number,
  translateY: number,
  scale: number,
) {
  // Maximum translation allowed based on zoom level
  // At scale=1: no translation (0%), at scale=5: max ~40%
  const maxTranslate = 50 * (1 - 1 / scale)

  return {
    translateX: Math.max(-maxTranslate, Math.min(maxTranslate, translateX)),
    translateY: Math.max(-maxTranslate, Math.min(maxTranslate, translateY)),
  }
}

export default function WeatherStationsContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const { data: weatherstations, status } = useApi<StationsResult[]>(
    'thingsboard/weatherstations',
    10,
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapTransform, setMapTransform] = useState({
    scale: MIN_ZOOM,
    translateX: 0,
    translateY: 0,
  })

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [initialTransform, setInitialTransform] = useState({
    translateX: 0,
    translateY: 0,
  })

  useEffect(() => {
    if (
      !weatherstations ||
      weatherstations.length === 0 ||
      !mapContainerRef.current
    ) {
      return
    }

    setMapTransform(getInitialMapTransform(weatherstations))
  }, [weatherstations])

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setMapTransform(prev => {
      const newScale = Math.min(prev.scale + ZOOM_STEP, MAX_ZOOM)
      const clamped = clampTranslation(prev.translateX, prev.translateY, newScale)
      return {
        scale: newScale,
        translateX: clamped.translateX,
        translateY: clamped.translateY,
      }
    })
  }, [])

  const handleZoomOut = useCallback(() => {
    setMapTransform(prev => {
      const newScale = Math.max(prev.scale - ZOOM_STEP, MIN_ZOOM)
      const clamped = clampTranslation(prev.translateX, prev.translateY, newScale)
      return {
        scale: newScale,
        translateX: clamped.translateX,
        translateY: clamped.translateY,
      }
    })
  }, [])

  const handleResetView = useCallback(() => {
    if (weatherstations && weatherstations.length > 0) {
      setMapTransform(getInitialMapTransform(weatherstations))
    }
  }, [weatherstations])

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
      setInitialTransform({
        translateX: mapTransform.translateX,
        translateY: mapTransform.translateY,
      })
    },
    [mapTransform.translateX, mapTransform.translateY],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !mapContainerRef.current) return

      const containerRect = mapContainerRef.current.getBoundingClientRect()
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      // Convert pixel movement to percentage of container
      const deltaXPercent = (deltaX / containerRect.width) * 100
      const deltaYPercent = (deltaY / containerRect.height) * 100

      // Scale the movement inversely to zoom level for consistent feel
      const scaledDeltaX = deltaXPercent / mapTransform.scale
      const scaledDeltaY = deltaYPercent / mapTransform.scale

      const newTranslateX = initialTransform.translateX + scaledDeltaX
      const newTranslateY = initialTransform.translateY + scaledDeltaY

      // Clamp translation to map boundaries
      const clamped = clampTranslation(
        newTranslateX,
        newTranslateY,
        mapTransform.scale,
      )

      setMapTransform(prev => ({
        ...prev,
        translateX: clamped.translateX,
        translateY: clamped.translateY,
      }))
    },
    [isDragging, dragStart, initialTransform, mapTransform.scale],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (weatherstations && weatherstations.length > 0 && autoRotate) {
      const interval = setInterval(() => {
        setSelectedIndex(prevIndex => (prevIndex + 1) % weatherstations.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [weatherstations, autoRotate])

  // gatekeeper
  if (!weatherstations || !Array.isArray(weatherstations) || weatherstations.length === 0 || status !== 'success') {
    return <RequestIndicator failed={status === 'error'} />
  }

  console.log('weatherstations', weatherstations)

  const selectedStation = weatherstations[selectedIndex]

  function handleStationClick(index: number) {
    setSelectedIndex(index)
    setAutoRotate(false)
  }

  return (
    <TileSplitView>
      <TileSplitView.Left>
        <div className="relative">
          {/* Map Container */}
          <div
            className={`relative overflow-hidden rounded ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={mapContainerRef}
          >
            <div
              className={`relative ${isDragging ? '' : 'transition-all duration-500'}`}
              style={{
                transform: `scale(${mapTransform.scale}) translate(${mapTransform.translateX}%, ${mapTransform.translateY}%)`,
                transformOrigin: 'center',
              }}
            >
              <Image
                alt="Karte der Stadt Aschaffenburg"
                className="pointer-events-none w-full select-none"
                draggable={false}
                loading="lazy"
                src={CityMap}
                width={2560}
              />

              <div className="absolute bottom-0 left-0 right-0 top-0">
                {weatherstations.map(({ label, position }, index) => (
                  <div
                    className="absolute -translate-x-3 -translate-y-3 scale-50 cursor-pointer"
                    key={label}
                    onClick={e => {
                      e.stopPropagation()
                      handleStationClick(index)
                    }}
                    style={{
                      left: getLongitude(position.lng) + '%',
                      top: getLatitude(position.lat) + '%',
                    }}
                  >
                    <div
                      className={`h-6 w-6 transition-all hover:scale-110 ${
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

          {/* Zoom Controls */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-1">
            <button
              aria-label="Vergrößern"
              className="flex h-8 w-8 items-center justify-center rounded bg-white/90 text-lg font-bold text-gray-700 shadow-md transition-all hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              disabled={mapTransform.scale >= MAX_ZOOM}
              onClick={handleZoomIn}
              type="button"
            >
              +
            </button>
            <button
              aria-label="Verkleinern"
              className="flex h-8 w-8 items-center justify-center rounded bg-white/90 text-lg font-bold text-gray-700 shadow-md transition-all hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              disabled={mapTransform.scale <= MIN_ZOOM}
              onClick={handleZoomOut}
              type="button"
            >
              −
            </button>
            <button
              aria-label="Ansicht zurücksetzen"
              className="flex h-8 w-8 items-center justify-center rounded bg-white/90 text-xs font-bold text-gray-700 shadow-md transition-all hover:bg-white hover:shadow-lg"
              onClick={handleResetView}
              type="button"
            >
              ⟲
            </button>
          </div>
        </div>
      </TileSplitView.Left>
      <TileSplitView.Right>
        <div className="flex min-w-80 flex-col gap-4">
          {selectedStation && (
            <Entry
              icon={tile_payload.icon ?? undefined}
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
