'use client'

import Title from '@/components/Elements/Title'
import useWeather from '@/hooks/useWeather'
import useLocalWeather from '@/hooks/useLocalWeather'
import { conditionMapping, conditionMappingIcon } from '@/lib/brightsky'
import LongTermAverageDiff from './LongTermAverageDiff'
import Phenomenon from './Phenomenon'
import {
  MsKlimadashboardIconsWetterWindgeschw,
  MsKlimadashboardIconsWetterWolkendichte,
} from '@/components/Icons/Klima'

export default function WeatherTileContent() {
  const weather = useWeather({ lat: 49.98, lng: 9.15 }, new Date())
  const local_weather = useLocalWeather()

  function getWindDirection(degrees: number): string {
    const directions: string[] = ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW']
    const index: number =
      Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8
    return directions[index]
  }

  function updateWeatherValue<T>(weather: T, localWeather: any, key: keyof T) {
    const localValue = localWeather[key]
    if (typeof localValue === 'number') {
      weather[key] = localValue as T[keyof T]
    }
  }

  if (weather) {
    const Icon = conditionMappingIcon[weather?.condition]

    // merge weather data
    if (local_weather) {
      Object.keys(weather).forEach((key: string) => {
        updateWeatherValue(weather, local_weather, key as keyof typeof weather)
      })
    }

    return (
      <div>
        {weather && (
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex flex-1 items-center gap-6 md:gap-2">
              <Icon className="h-20 text-primary md:mr-12 md:h-36" />
              <Title as={'h4'} className="my-4 w-3/4 md:w-1/2">
                In Aschaffenburg ist es gerade{' '}
                <span className="text-climate">
                  {conditionMapping[weather?.condition]}
                </span>
              </Title>
            </div>

            <div className="mb-4 flex flex-row items-start md:items-center">
              <div className="flex-1">
                <Phenomenon
                  phenomenon="temperature"
                  size="xl"
                  value={weather?.temperature}
                />
              </div>

              <div className="flex flex-1">
                <div className="flex h-full w-full flex-1 flex-col justify-between gap-2.5 md:gap-6">
                  <Phenomenon
                    phenomenon="precipitation"
                    value={weather?.precipitation}
                  />
                  <Phenomenon
                    phenomenon="cloudcover"
                    value={weather?.cloud_cover}
                  />
                  <Phenomenon phenomenon="sunhours" value={weather?.sunshine} />
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-row items-start md:items-center">
              <div className="w-32">
                <MsKlimadashboardIconsWetterWindgeschw className="h-10 fill-primary stroke-primary text-primary md:h-14" />
              </div>
              <div className="flex-1">
                <Phenomenon
                  hide_icon={true}
                  phenomenon="windspeed"
                  value={weather?.wind_speed}
                />
              </div>
              <div className="flex-1">
                <Phenomenon
                  hide_icon={true}
                  meta={'(' + getWindDirection(weather?.wind_direction) + ')'}
                  phenomenon="winddirection"
                  value={weather?.wind_direction}
                />
              </div>
            </div>

            <div className="mb-4 flex flex-row items-start md:items-center">
              <div className="w-32">
                <MsKlimadashboardIconsWetterWolkendichte className="h-10 fill-primary stroke-primary text-primary md:h-14" />
              </div>
              <div className="flex-1">
                <Phenomenon
                  hide_icon={true}
                  phenomenon="humidity"
                  value={weather?.relative_humidity}
                />
              </div>
              <div className="flex-1">
                <Phenomenon
                  hide_icon={true}
                  phenomenon="pressure"
                  value={weather?.pressure_msl}
                />
              </div>
            </div>
          </div>
        )}
        <LongTermAverageDiff />
      </div>
    )
  }

  return <p>Lade...</p>
}
