'use client'

import React, { JSX, useEffect, useRef, useState } from 'react'
import { getInstanceByDom, init } from 'echarts'
import type { CSSProperties } from 'react'
import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts'

import useDevice from '@/hooks/useDevice'

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
  renderer?: 'svg' | 'canvas'
}

export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
  renderer = 'svg',
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const device = useDevice()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.5, // start animation when 50% of the element is visible
      },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) {return}

    // Initialize chart
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme, {
        renderer,
      })
    }

    // Add chart resize listener
    function resizeChart() {
      chart?.resize()
    }
    window.addEventListener('resize', resizeChart)

    // Cleanup
    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [theme, isVisible])

  useEffect(() => {
    if (!isVisible) {return}

    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      const myOption: EChartsOption = {
        textStyle: {
          ...option.textStyle,
          fontFamily: 'Verdanda, sans-serif',
          color: '#005096',
          fontSize: device === 'mobile' ? 12 : 20,
        },
        ...option,
      }
      chart!.setOption(myOption, settings)
    }
  }, [option, settings, theme, isVisible])

  useEffect(() => {
    if (!isVisible) {return}

    // Show loading or update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      loading === true ? chart!.showLoading() : chart!.hideLoading()
    }
  }, [loading, theme, isVisible])

  return <div className="h-full w-full" ref={chartRef} style={{ ...style }} />
}
