'use client'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import { SeriesOption } from 'echarts'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

import MobileSlider from '@/components/Inputs/MobileSlider'
import { useWindowSize } from 'react-use'
import Slider from '@/components/Inputs/Slider'
import { ReactECharts } from '@/components/Charts/ReactECharts'

// @ts-ignore
import GarbageData from '@/assets/data/awm-abfallaufkommen-pro-kopf.csv'
import {
  MsKlimadashboardIconsKAbfallGesamt,
  MsKlimadashboardIconsKAbfallRest,
  MsKlimadashboardIconsKAbfallWertstoffe,
} from '@/components/Icons/Klima'

const { theme } = resolveConfig(tailwindConfig)

interface GarbageDataProps {
  ZEIT: number
  'Abfallaufkommen pro Kopf in kg - Gesamt': number
  'Abfallaufkommen pro Kopf in kg - Restmüll': number
  'Abfallaufkommen pro Kopf in kg - Wertstoffe': number
}

function getSeries(name: string, data: any[], color: string): SeriesOption {
  return {
    name,
    type: 'line',
    areaStyle: {
      color,
      opacity: 0.23,
    },
    lineStyle: {
      color,
      width: 4,
    },
    itemStyle: {
      opacity: 0,
    },
    emphasis: {
      focus: 'series',
    },
    data,
  }
}

const data = GarbageData as GarbageDataProps[]
const years = data.map(e => e.ZEIT.toString())

/**
 *
 * @returns The Garbage Chart
 */
export default function GarbageChart() {
  const { width } = useWindowSize()

  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )

  return (
    <div className="flex h-full w-full flex-col-reverse items-center 2xl:flex-row">
      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex h-full w-full flex-1 items-center">
          <ReactECharts
            option={{
              grid: {
                top: 20,
                left: 60,
                bottom: 20,
                right: 20,
              },
              series: [
                getSeries(
                  'Gesamt',
                  data.map(e => e['Abfallaufkommen pro Kopf in kg - Gesamt']),
                  // @ts-ignore
                  theme?.colors?.mobility.DEFAULT || '#34c17b',
                ),
                getSeries(
                  'Wertstoffe',
                  data.map(
                    e => e['Abfallaufkommen pro Kopf in kg - Wertstoffe'],
                  ),
                  // @ts-ignore
                  theme?.colors?.energy.DEFAULT || '#f28443',
                ),
                getSeries(
                  'Restmüll',
                  data.map(e => e['Abfallaufkommen pro Kopf in kg - Restmüll']),
                  // @ts-ignore
                  theme?.colors?.climate.DEFAULT || '#14b3d9',
                ),
              ],
              xAxis: [
                {
                  type: 'category',
                  data: years,
                  show: false,
                  axisLabel: {
                    fontSize: 20,
                  },
                },
              ],
              yAxis: {
                type: 'value',
                interval: 100,
                axisLabel: {
                  fontSize: 20,
                },
              },
              animation: true,
            }}
            settings={{
              notMerge: true,
            }}
            style={{
              height: width < 1024 ? '200px' : '100%',
              width: '100%',
            }}
          />
        </div>
        <div className="mt-4 flex w-full gap-4 py-4 md:gap-12 md:pl-4 md:pr-16">
          <Title as={'h5'} className="hidden 2xl:block" variant={'primary'}>
            Jahr
          </Title>
          <div className="flex-1">
            {width < 1800 && (
              <MobileSlider
                defaultValue={[years.length - 1]}
                firstValueMobile={years.length - 1}
                labels={years}
                max={years.length - 1}
                min={0}
                onValueChange={([e]) => {
                  setYearIndex(e)
                }}
                variant={'climate'}
              />
            )}
            {width >= 1800 && (
              <Slider
                defaultValue={[years.length - 1]}
                firstValueMobile={years.length - 1}
                labels={years}
                max={years.length - 1}
                min={0}
                onValueChange={([e]) => {
                  setYearIndex(e)
                }}
                variant={'climate'}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex h-fit flex-row flex-wrap justify-evenly gap-4 overflow-hidden pb-8 pt-2 md:gap-0 2xl:h-full 2xl:flex-col 2xl:pb-0 2xl:pt-0">
        <div className="flex h-fit items-center gap-2 md:w-48">
          <MsKlimadashboardIconsKAbfallGesamt className="h-10 md:h-14" />
          <div>
            <Title as={'h5'} variant={'primary'}>
              Gesamt
            </Title>
            <Title as={'h3'} variant={'primary'}>
              <AnimatedNumber>
                {data.find(e => e.ZEIT.toString() === years[yearIndex])?.[
                  'Abfallaufkommen pro Kopf in kg - Gesamt'
                ] ?? 0}
              </AnimatedNumber>
              kg
            </Title>
          </div>
        </div>
        <div className="flex h-fit items-center gap-2 md:w-48">
          <MsKlimadashboardIconsKAbfallWertstoffe className="h-10 stroke-energy md:h-14" />
          <div>
            <Title as={'h5'} variant={'primary'}>
              Wertstoffe
            </Title>
            <Title as={'h3'} variant={'primary'}>
              <AnimatedNumber>
                {data.find(e => e.ZEIT.toString() === years[yearIndex])?.[
                  'Abfallaufkommen pro Kopf in kg - Wertstoffe'
                ] ?? 0}
              </AnimatedNumber>
              kg
            </Title>
          </div>
        </div>
        <div className="flex h-fit items-center gap-2 md:w-48">
          <MsKlimadashboardIconsKAbfallRest className="h-10 stroke-climate md:h-14" />
          <div>
            <Title as={'h5'} variant={'primary'}>
              Restmüll
            </Title>
            <Title as={'h3'} variant={'primary'}>
              <AnimatedNumber>
                {data.find(e => e.ZEIT.toString() === years[yearIndex])?.[
                  'Abfallaufkommen pro Kopf in kg - Restmüll'
                ] ?? 0}
              </AnimatedNumber>
              kg
            </Title>
          </div>
        </div>
      </div>
    </div>
  )
}
