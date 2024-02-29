'use client'

import monatsmittelwerte from '@/assets/data/monatsmittelwerte.json'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Carousel from '@/components/Elements/Carousel'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { useState } from 'react'
import TrafficMap from './TrafficMap'
import TrafficMapMobile from './TrafficMapMobile'

function Toggle({ onChange }: { onChange: (_val: string) => void }) {
  return (
    <ToggleGroup
      defaultValue="2023"
      items={[
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2013
            </Title>
          ),
          value: '2013',
        },
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2019
            </Title>
          ),
          value: '2019',
        },
        {
          element: (
            <Title as="h6" className="2xl:w-max">
              2023
            </Title>
          ),
          value: '2023',
        },
      ]}
      onChange={onChange}
      variant={'mobility'}
    />
  )
}

export default function TrafficloadContent() {
  const [monthIndex, setMonthIndex] = useState(4)
  const [mode, setMode] = useState<'2013' | '2019' | '2023'>('2023')

  const [mobileActive, setMobileActive] = useState<
    'albersloher' | 'warendorfer' | 'weseler' | 'rishon' | 'steinfurter'
  >('albersloher')

  const data = monatsmittelwerte.features.filter(f => {
    // const year = mode === 'current' ? new Date().getFullYear().toString() : mode
    const year = mode
    return (
      f.properties.year.toString() === year &&
      f.properties.month === monthIndex + 1
    )
  })

  const albersloher = data.find(d => d.properties.amknotennr === 10010750)
  const warendorfer = data.find(d => d.properties.amknotennr === 10011170)
  const weseler = data.find(d => d.properties.amknotennr === 10022200)
  const rishon = data.find(d => d.properties.amknotennr === 10024088)
  const steinfurter = data.find(d => d.properties.amknotennr === 20000723)

  const streetData = {
    'Albersloher Weg / Heumannsweg':
      albersloher?.properties.mittelwert.toFixed(0) ?? 0,
    'Warendorfer Str. / Schifffahrter Damm':
      warendorfer?.properties.mittelwert.toFixed(0) ?? 0,
    'Weseler Str. / Inselbogen': weseler?.properties.mittelwert.toFixed(0) ?? 0,
    'Rishon-le-Zion-Ring / Einsteinstr.':
      rishon?.properties.mittelwert.toFixed(0) ?? 0,
    'Steinfurter Str. / Austermannstr.':
      steinfurter?.properties.mittelwert.toFixed(0) ?? 0,
  }

  const mapping = new Map([
    ['Albersloher Weg / Heumannsweg', 'albersloher'],
    ['Warendorfer Str. / Schifffahrter Damm', 'warendorfer'],
    ['Weseler Str. / Inselbogen', 'weseler'],
    ['Rishon-le-Zion-Ring / Einsteinstr.', 'rishon'],
    ['Steinfurter Str. / Austermannstr.', 'steinfurter'],
  ])

  return (
    <>
      <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute -top-4 left-0 w-full md:-top-6 md:w-auto">
          <Toggle onChange={val => setMode(val as typeof mode)} />
        </div>
        <div className="absolute bottom-5 left-0 hidden h-[80%] w-full justify-center lg:flex">
          <TrafficMap
            albersloher={streetData['Albersloher Weg / Heumannsweg'] as number}
            className="h-full"
            rishon={streetData['Rishon-le-Zion-Ring / Einsteinstr.'] as number}
            steinfurter={
              streetData['Steinfurter Str. / Austermannstr.'] as number
            }
            warendorfer={
              streetData['Warendorfer Str. / Schifffahrter Damm'] as number
            }
            weseler={streetData['Weseler Str. / Inselbogen'] as number}
          />
        </div>
        <div className="absolute -bottom-10 left-0 flex h-full w-full justify-center lg:hidden">
          <TrafficMapMobile
            active={mobileActive}
            albersloher={streetData['Albersloher Weg / Heumannsweg'] as number}
            className="h-full"
            rishon={streetData['Rishon-le-Zion-Ring / Einsteinstr.'] as number}
            steinfurter={
              streetData['Steinfurter Str. / Austermannstr.'] as number
            }
            warendorfer={
              streetData['Warendorfer Str. / Schifffahrter Damm'] as number
            }
            weseler={streetData['Weseler Str. / Inselbogen'] as number}
          />
        </div>
      </div>
      <div className="bg-white px-4 pb-4 lg:hidden">
        <Carousel
          arrows
          onMove={e =>
            setMobileActive(
              (mapping.get(
                Object.keys(streetData)[e.index],
              ) as typeof mobileActive) ?? 'albersloher',
            )
          }
          variant={'mobility'}
        >
          {Object.keys(streetData).map((key, index) => {
            const val = parseInt(
              streetData[key as keyof typeof streetData] as string,
            )
            return (
              <div key={index}>
                <Title as="h5" variant={'primary'}>
                  {key}
                </Title>
                <Title
                  as="h3"
                  style={{
                    color: '#34c17b',
                  }}
                >
                  {val === 0 ? (
                    'Keine Daten'
                  ) : (
                    <AnimatedNumber>{val}</AnimatedNumber>
                  )}
                </Title>
              </div>
            )
          })}
        </Carousel>
      </div>
      <Slider
        defaultValue={[monthIndex]}
        firstValueMobile={4} // MONAT MAI NUR FÜR DEMO
        labels={[
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAI',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OKT',
          'NOV',
          'DEZ',
        ]}
        max={11}
        min={0}
        onValueChange={([e]) => {
          setMonthIndex(e)
        }}
        variant={'mobility'}
      />
    </>
  )
}
