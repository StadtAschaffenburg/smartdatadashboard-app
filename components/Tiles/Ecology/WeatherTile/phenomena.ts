import { PhenomenaType } from './dt'

import {
  IconWeatherNiederschlag,
  IconWeatherSonnig,
  IconWeatherTemperatur,
  IconWeatherWindgeschw,
  IconWeatherWolkendichte,
} from '@/components/Icons/Weather'

const phenomena: PhenomenaType = {
  temperature: {
    title: 'Temperatur',
    unit: '°C',
    icon: IconWeatherTemperatur,
    decimals: 0,
  },
  perceived_temperature: {
    title: 'Gefühlte Temperatur',
    unit: '°C',
    icon: IconWeatherTemperatur,
    decimals: 0,
  },
  precipitation: {
    title: 'Niederschlag',
    unit: 'mm',
    icon: IconWeatherNiederschlag,
  },
  cloudcover: {
    title: 'Wolken&shy;bedeckung',
    shortTitle: 'Wolkenbed.',
    unit: '%',
    icon: IconWeatherWolkendichte,
  },
  windspeed: {
    title: 'Wind&shy;geschwindigkeit',
    shortTitle: 'Windgeschw.',
    unit: 'km/h',
    icon: IconWeatherWindgeschw,
    decimals: 1,
  },
  winddirection: {
    title: 'Wind&shy;richtung',
    shortTitle: 'Windricht.',
    unit: '°',
    icon: IconWeatherWindgeschw,
  },
  sunhours: {
    title: 'Sonnenstunden',
    unit: 'h',
    icon: IconWeatherSonnig,
  },
  solar_radiation: {
    title: 'Sonneneinstrahlung',
    unit: 'W/m²',
    icon: IconWeatherSonnig,
  },
  humidity: {
    title: 'Luft&shy;feuchtigkeit',
    unit: '%',
    icon: IconWeatherSonnig,
  },
  pressure: {
    title: 'Luft&shy;druck',
    unit: 'hPa',
    icon: IconWeatherSonnig,
  },
  stickstoffdioxid: {
    title: 'Stickstoffdioxid (NO<sub>2</sub>)',
    unit: 'μg/m³',
    icon: IconWeatherSonnig,
  },
  feinstaub_1000: {
    title: 'Feinstaub (PM<sub>10</sub>)',
    unit: 'μg/m³',
    icon: IconWeatherSonnig,
  },
  ozon: {
    title: 'Ozon (O<sub>3</sub>)',
    unit: 'μg/m³',
    icon: IconWeatherSonnig,
  },
  feinstaub_250: {
    title: 'Feinstaub (PM<sub>2.5</sub>)',
    unit: 'μg/m³',
    icon: IconWeatherSonnig,
  },
}

export default phenomena
