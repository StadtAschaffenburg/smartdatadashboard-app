import { PhenomenaType } from './dt'

import * as Icons from '@/components/Icons/Weather'
import IconPlaceholder from '@/components/Icons/Placeholder'

const Phenomena: PhenomenaType = {
  temperature: {
    title: 'Temperatur',
    unit: '°C',
    icon: Icons.IconWeatherTemperatur,
    decimals: 1,
  },
  perceived_temperature: {
    title: 'Gefühlte Temperatur',
    unit: '°C',
    icon: Icons.IconWeatherTemperatur,
    decimals: 1,
  },
  precipitation: {
    title: 'Niederschlag',
    unit: 'mm',
    icon: Icons.IconWeatherNiederschlag,
  },
  cloudcover: {
    title: 'Wolken&shy;bedeckung',
    shortTitle: 'Wolkenbed.',
    unit: '%',
    icon: Icons.IconWeatherWolkendichte,
  },
  windspeed: {
    title: 'Wind&shy;geschwindigkeit',
    shortTitle: 'Windgeschw.',
    unit: 'km/h',
    icon: Icons.IconWeatherWindgeschw,
    decimals: 1,
  },
  winddirection: {
    title: 'Wind&shy;richtung',
    shortTitle: 'Windricht.',
    unit: '°',
    icon: Icons.IconWeatherWindgeschw,
  },
  sunhours: {
    title: 'Sonnenstunden',
    unit: 'h',
    icon: Icons.IconWeatherSonnig,
  },
  solar_radiation: {
    title: 'Sonneneinstrahlung',
    unit: 'W/m²',
    icon: Icons.IconWeatherSonnig,
  },
  humidity: {
    title: 'Luft&shy;feuchtigkeit',
    unit: '%',
    icon: Icons.IconWeatherAtmosphaere,
  },
  pressure: {
    title: 'Luft&shy;druck',
    unit: 'hPa',
    icon: Icons.IconWeatherAtmosphaere,
  },
  stickstoffdioxid: {
    title: 'Stickstoffdioxid (NO<sub>2</sub>)',
    unit: 'μg/m³',
    icon: IconPlaceholder,
  },
  feinstaub_100: {
    title: 'Feinstaub (PM<sub>10</sub>)',
    unit: 'μg/m³',
    icon: IconPlaceholder,
  },
  ozon: {
    title: 'Ozon (O<sub>3</sub>)',
    unit: 'μg/m³',
    icon: IconPlaceholder,
  },
  feinstaub_250: {
    title: 'Feinstaub (PM<sub>2.5</sub>)',
    unit: 'μg/m³',
    icon: IconPlaceholder,
  },
}

export default Phenomena
