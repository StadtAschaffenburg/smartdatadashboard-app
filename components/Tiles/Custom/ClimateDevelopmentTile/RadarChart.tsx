'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Title from '@/components/Elements/Title'
import { useEffect, useRef, useState } from 'react'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { useApi } from '@schleegleixner/react-statamic-api'
import { AvgTempData, ClimateHistoryRecord, YearMonthDeviation } from './dt'

export default function RadarChart() {
  const [years, setYears] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [counter, setCounter] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(isPaused)

  const { data, status } = useApi<ClimateHistoryRecord[]>(
    'climate_history',
    3600,
    false,
  )

  const [climateYears, setClimateYears] = useState<YearMonthDeviation | null>(
    null,
  )

  useEffect(() => {
    if (data) {
      setClimateYears(
        data.reduce((a: AvgTempData, o) => {
          const year = new Date(o.timestamp).getFullYear()
          const month = new Date(o.timestamp).getMonth()
          return {
            ...a,
            [year]: {
              ...a[year],
              [month]: o.temperature_deviation,
            },
          }
        }, {}),
      )
    }
  }, [data])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setCounter(prevCounter => prevCounter + 1)
      }
    }, 200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!climateYears) {
      return
    }

    const allYears = Object.keys(climateYears)
    if (counter >= allYears.length) {
      setCounter(0)
      setYears([])
      return
    }
    const newYear = allYears[counter]
    setYears([...years, newYear])
  }, [counter, climateYears])

  useEffect(() => {
    if (!climateYears) {
      return
    }

    const mySeriesData = years?.slice(-10).map(y => {
      const year = climateYears[Number(y)] as any
      const values = Object.keys(year).map(m => year[Number(m)])
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length

      let color = ''

      const intensity = Math.min(1, avg / 5)
      const red = Math.round(255 * intensity)
      const green = Math.round(255 * (0.5 - intensity * 0.5))
      const blue = Math.round(255 * (1 - intensity))
      color = `rgb(${red},${green},${blue})`

      return {
        value: values.reverse(),
        name: y,
        areaStyle: {
          color,
          opacity: 0.25,
        },
        lineStyle: {
          width: 0,
          color,
        },
        itemStyle: {
          opacity: 0,
        },
      }
    })
    setSeriesData(mySeriesData)
  }, [years, data])

  // gatekeeper
  if (!climateYears || status !== 'success') {
    return (
      <div className="align-center flex h-full w-full justify-center">
        <RequestIndicator failed={status === 'error'} />
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full"
      onClick={() => setCounter(prevCounter => prevCounter + 1)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <Title as="h3" className="z-10 text-white" weight="bold">
          {years[years.length - 1]}
        </Title>
      </div>
      <ReactECharts
        option={{
          animation: false,
          radar: {
            splitNumber: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: [
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ff0000', // Null-Linie
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                ],
                width: 1,
              },
            },
            axisLabel: {
              fontSize: '20px',
            },
            splitArea: {
              areaStyle: {
                color: ['#fff'],
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            shape: 'circle',
            indicator: [
              { name: 'JAN', min: -5, max: 5 },
              { name: 'FEB', min: -5, max: 5 },
              { name: 'MÄR', min: -5, max: 5 },
              { name: 'APR', min: -5, max: 5 },
              { name: 'MAI', min: -5, max: 5 },
              { name: 'JUN', min: -5, max: 5 },
              { name: 'JUL', min: -5, max: 5 },
              { name: 'AUG', min: -5, max: 5 },
              { name: 'SEP', min: -5, max: 5 },
              { name: 'OKT', min: -5, max: 5 },
              { name: 'NOV', min: -5, max: 5 },
              { name: 'DEZ', min: -5, max: 5 },
            ].reverse(),
          },
          series: [
            {
              name: 'Climate',
              type: 'radar',
              data: [
                // zero,
                ...seriesData,
              ],
            },
          ],
        }}
        renderer="svg"
      />
    </div>
  )
}
