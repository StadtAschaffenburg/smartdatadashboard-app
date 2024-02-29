// @ts-ignore
import CO2Data from '@/assets/data/CO2_Emissionen_Sektoren.csv'
// @ts-ignore
import Endenergieverbrauch from '@/assets/data/endenergie.csv'

type InputDataType = {
  ZEIT: number
  'Endenergieverbrauch nach Sektoren  - Gesamt': number
  'Endenergieverbrauch nach Sektoren  - Gewerbe + Sonstiges': number
  'Endenergieverbrauch nach Sektoren  - Industrie': number
  'Endenergieverbrauch nach Sektoren  - Private Haushalte': number
  'Endenergieverbrauch nach Sektoren  - Verkehr': number
  'Endenergieverbrauch nach Sektoren  - Zielwert 2030 - Gesamt': number
  'Endenergieverbrauch nach Sektoren - Zielwert 2030 - Private Haushalte': number
}

type CO2Data = {
  Jahr: number
  'Private Haushalte': number
  'Gewerbe + Sonstiges': number
  Industrie: number
  Verkehr: number
  Gesamt: number
}

export default function useCO2Data(series: 'endenergie' | 'co2'): CO2Data[] {
  if (series === 'endenergie') {
    return Endenergieverbrauch.map((d: InputDataType) => ({
      Jahr: d.ZEIT,
      'Private Haushalte':
        d['Endenergieverbrauch nach Sektoren  - Private Haushalte'],
      'Gewerbe + Sonstiges':
        d['Endenergieverbrauch nach Sektoren  - Gewerbe + Sonstiges'],
      Industrie: d['Endenergieverbrauch nach Sektoren  - Industrie'],
      Verkehr: d['Endenergieverbrauch nach Sektoren  - Verkehr'],
      Gesamt: d['Endenergieverbrauch nach Sektoren  - Gesamt'],
    }))
  }
  return CO2Data
}
