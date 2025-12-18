'use client'

import QualityBar from '@/components/Charts/QualityBar/QualityBar'
import Title from '@/components/Elements/Title'
import {
  IconLuftqualitaet,
  IconLuftqualitaetMittel,
  IconLuftqualitaetNegativ,
  IconLuftqualitaetPositiv,
} from '@/components/Icons/Airquality'
import Phenomenon from '@/components/Elements/Phenomenon'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { useApi } from '@schleegleixner/react-statamic-api'
import { AirQualityReading } from './dt'
import { useEffect, useState } from 'react'

const qualityMapping: Record<number, string> = {
  0: 'sehr gut',
  1: 'gut',
  2: 'mäßig',
  3: 'schlecht',
  4: 'sehr schlecht',
}

const qualityToIcon = (quality: number) => {
  if (quality <= 1) {
    return IconLuftqualitaetPositiv
  }
  if (quality <= 3) {
    return IconLuftqualitaetMittel
  }
  return IconLuftqualitaetNegativ
}

const getMaxQualityIndex = (readings: AirQualityReading[]): number | null => {
  const validReadings = readings.filter(reading => reading.value !== null)

  if (validReadings.length === 0) {
    return null
  }

  return Math.max(...validReadings.map(reading => reading.quality_index))
}

export default function AirqualityChart() {
  const { data: readings, status } = useApi<AirQualityReading[]>(
    'airquality/latest',
    10,
  )

  const [air_quality_index, setAirQualityIndex] = useState<number | null>(null)

  useEffect(() => {
    if (Array.isArray(readings) && readings.length > 0) {
      setAirQualityIndex(getMaxQualityIndex(readings))
    }
  }, [readings])

  // gatekeeper
  if (!Array.isArray(readings) || status !== 'success') {
    return <RequestIndicator failed={status === 'error'} />
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 items-center gap-6 md:gap-2">
          <IconLuftqualitaet className="h-20 text-primary md:mr-12 md:h-36" />
          <div className="my-4 grow">
            <Title as={'h4'}>
              Die Luftqualität in Aschaffenburg ist aktuell{' '}
              <span className="text-mosque">
                {air_quality_index !== null
                  ? qualityMapping[air_quality_index]
                  : 'unbekannt'}
              </span>
            </Title>
            {air_quality_index !== null && (
              <div className="pt-4">
                <QualityBar
                  progress={(air_quality_index / 5) * 100}
                ></QualityBar>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {readings.map(
            ({ id, value, quality_index }) =>
              value !== null && (
                <Phenomenon
                  icon={qualityToIcon(quality_index)}
                  key={id}
                  phenomenon={id}
                  size="md"
                  value={value}
                />
              ),
          )}
        </div>
      </div>
    </div>
  )
  /*

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 items-center gap-6 md:gap-2">
          <IconLuftqualitaet className="h-20 text-primary md:mr-12 md:h-36" />
          <div className="my-4 grow">
            <Title as={'h3'}>
              Die Luftqualität in Frankfurt ist aktuell{' '}
              <span className="text-primary">
                {air_quality_index !== null
                  ? qualityMapping[air_quality_index]
                  : 'unbekannt'}
              </span>
              .
            </Title>
            {air_quality_index !== null && (
              <div className="pt-4">
                <QualityBar
                  progress={(air_quality_index / 5) * 100}
                ></QualityBar>
              </div>
            )}
          </div>
        </div>
        <Divider title="Einzelwerte" />
        <div className="grid grid-cols-2 gap-4">
          {readings.map(
            ({ id, value, quality_index }) =>
              value !== null && (
                <Phenomenon
                  icon={qualityToIcon(quality_index)}
                  key={id}
                  phenomenon={id}
                  size="md"
                  value={value}
                />
              ),
          )}
        </div>
      </div>
    </div>
  )*/
}
