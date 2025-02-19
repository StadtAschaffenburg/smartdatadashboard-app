'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { useState } from 'react'

// @ts-ignore
import StromerzeugungBereitstellung from '@/assets/data/verbrauch-erzeugung-strom.csv'
// @ts-ignore
import Stromemissionen from '@/assets/data/emissionen-strom.csv'
import { Spacer } from '@/components/Elements/Spacer'
import MobileSlider from '@/components/Inputs/MobileSlider'
import { useWindowSize } from 'react-use'

type StromVerbrauchErzeugung = {
  ZEIT: number
  'Stromerzeugung/-bereitstellung nach Energieträgern - Anteil EE (%)': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - BHKW (Biomethan)': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - BHKW (Erdgas)': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - Biogas': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - GUD (Erdgas)': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - HKW (Kohle)': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - Klär-Deponiegas': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - PV': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - Stromverbrauch ges.': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - Wasserkraft': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - Windkraft': number
  'Stromerzeugung/-bereitstellung nach Energieträgern - reg. Bezug (Bundesmix)': number
}

type StromEmissionen = {
  ZEIT: number
  'Strom-Emissionen nach Energieträgern (t) - Windkraft': number
  'Strom-Emissionen nach Energieträgern - Anteil EE an Gesamtemissionen (%)': number
  'Strom-Emissionen nach Energieträgern - BHKW (Biomethan)': number
  'Strom-Emissionen nach Energieträgern - BHKW (Erdgas)': number
  'Strom-Emissionen nach Energieträgern - Biogas': number
  'Strom-Emissionen nach Energieträgern - Emissionen ges.': number
  'Strom-Emissionen nach Energieträgern - GUD (Erdgas)': number
  'Strom-Emissionen nach Energieträgern - Klär-Deponiegas': number
  'Strom-Emissionen nach Energieträgern - PV': number
  'Strom-Emissionen nach Energieträgern - Wasserkraft': number
  'Strom-Emissionen nach Energieträgern - reg. Bezug (Bundesmix)': number
}

export default function EnergietraegerChart() {
  const [mode, setMode] = useState<'stromerzeugung' | 'stromemissionen'>(
    'stromerzeugung',
  )

  const data: (StromVerbrauchErzeugung | StromEmissionen)[] =
    mode === 'stromerzeugung' ? StromerzeugungBereitstellung : Stromemissionen

  const [yearIndex, setYearIndex] = useState(data.length - 1)

  const unit = mode === 'stromerzeugung' ? 'MWh' : 't'

  const { width } = useWindowSize()

  return (
    <div className="flex h-full flex-col">
      <div className="z-10 w-full">
        <ToggleGroup
          items={[
            {
              element: (
                <Title as="h5" className="2xl:mx-auto">
                  Anteilige Stromerzeugung
                </Title>
              ),
              value: 'stromerzeugung',
            },
            {
              element: (
                <Title as="h5" className="2xl:mx-auto">
                  CO₂ pro Quelle
                </Title>
              ),
              value: 'co2',
            },
          ]}
          onChange={val => setMode(val as typeof mode)}
          variant={'primary'}
        />
      </div>
      <div className="flex h-full w-full flex-1 -translate-y-4 flex-col">
        <div className="flex-1">
          <ReactECharts
            option={{
              // @ts-ignore
              tooltip: {
                formatter: params => {
                  const percent =
                    // @ts-ignore
                    params.value / params.treeAncestors[0].value

                  if (percent === 1) {
                    return undefined
                  }

                  // @ts-ignore
                  return `<p>${params.name}<p>
                  <p>${new Intl.NumberFormat('de-DE', {
                    maximumFractionDigits: 0,
                    // @ts-ignore
                  }).format(params.value)}${unit}<p>
                  <p>${(percent * 100).toFixed(1)}%<p>`
                },
              },
              series: [
                {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  type: 'treemap',
                  breadcrumb: {
                    show: false,
                  },
                  itemStyle: {
                    gapWidth: 4,
                  },
                  label: {
                    position: ['0%', '100%'],
                    offset: [0 + 8, -70 - 8],
                    distance: 10,
                    formatter(params) {
                      const percent =
                        // @ts-ignore
                        params.value / params.treeAncestors[0].value

                      if (percent < 0.05) {
                        return ''
                      }

                      return `{name|${params.name}}\n{value|${(
                        percent * 100
                      ).toFixed(0)}%}`
                    },
                    rich: {
                      name: {
                        padding: [0, 0, 4, 0],
                      },
                      value: {
                        fontSize: 40,
                      },
                    },
                  },
                  roam: false,
                  nodeClick: undefined,
                  levels: [
                    {
                      itemStyle: {
                        color: '#f28443',
                      },
                    },
                  ],
                  data: Object.keys(data[yearIndex])
                    .filter(
                      k =>
                        ![
                          'ZEIT',
                          'Stromerzeugung/-bereitstellung nach Energieträgern - Stromverbrauch ges.',
                          'Strom-Emissionen nach Energieträgern - Emissionen ges.',
                          'Stromerzeugung/-bereitstellung nach Energieträgern - Anteil EE (%)',
                          'Strom-Emissionen nach Energieträgern - Anteil EE an Gesamtemissionen (%)',
                          'Stromerzeugung/-bereitstellung nach Energieträgern - reg. Bezug (Bundesmix)',
                          'Strom-Emissionen nach Energieträgern - reg. Bezug (Bundesmix)',
                        ].includes(k),
                    )
                    .map(key => ({
                      name: key
                        .replace(
                          'Stromerzeugung/-bereitstellung nach Energieträgern - ',
                          '',
                        )
                        .replace('Strom-Emissionen nach Energieträgern - ', ''),
                      value:
                        data[yearIndex][
                          key as keyof (
                            | StromVerbrauchErzeugung
                            | StromEmissionen
                          )
                        ],
                    })),
                },
              ],
            }}
          />
        </div>
        <Spacer size={'xs'} />
        {width < 1800 && (
          <MobileSlider
            defaultValue={[data.length - 1]}
            firstValueMobile={data.length - 1}
            labels={data.map(e => e.ZEIT.toString())}
            max={data.length - 1}
            min={0}
            onValueChange={([index]) => setYearIndex(index)}
            variant={'energy'}
          />
        )}
        {width >= 1800 && (
          <Slider
            defaultValue={[data.length - 1]}
            firstValueMobile={data.length - 1}
            labels={data.map(e => e.ZEIT.toString())}
            max={data.length - 1}
            min={0}
            onValueChange={([index]) => setYearIndex(index)}
            variant={'energy'}
          />
        )}
      </div>
    </div>
  )
}
