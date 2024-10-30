'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Title from '@/components/Elements/Title'
import { useEffect, useRef, useState } from 'react'

export type AvgTempData = {
  [x: string]: {
    [key: number]: number
  }
}

export default function RadarChart({ data }: { data: AvgTempData }) {
  const [years, setYears] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [counter, setCounter] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(isPaused)

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
    const allYears = Object.keys(data)
    if (counter >= allYears.length) {
      setCounter(0)
      setYears([])
      return
    }
    const newYear = allYears[counter]
    setYears([...years, newYear])
  }, [counter])

  useEffect(() => {
    const mySeriesData = years?.slice(-10).map(y => {
      const year = data[y]
      return {
        value: Object.keys(year)
          .map(m => year[Number(m)])
          .reverse(),
        name: y,
        areaStyle: {
          color: '#14b3d9',
          opacity: 0.1,
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          opacity: 0,
        },
      }
    })
    setSeriesData(mySeriesData)
  }, [years])

  return (
    <div
      className="relative h-full w-full"
      onClick={() => setCounter(prevCounter => prevCounter + 1)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <Title as={'h4'} className="z-10 text-2xl">
          {years[years.length - 1]}
        </Title>
      </div>
      <ReactECharts
        option={{
          animation: false,
          radar: {
            axisLabel: {
              fontSize: '20px',
            },
            splitLine: {
              show: true,
            },
            splitArea: {
              areaStyle: {
                color: ['#14b3d91f'],
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
