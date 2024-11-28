import { sanitizeLocalizedValue } from '@/utils/sanitize'

export interface DataValue {
  current: number
  previous: number | null
}

export type InputDataType = {
  ZEIT: number
  [key: string]: number | undefined
}

export function getYears(
  data: InputDataType[],
  key: string = 'ZEIT',
): number[] {
  return (
    data
      .map(e => e[key])
      .filter((year): year is number => year !== undefined) ?? []
  )
}

export function getRow(
  data: InputDataType[],
  yearIndex: number,
  keys: string[] = [],
  modifier: number = 1,
): Record<string, DataValue> {
  const current = data[yearIndex]
  const previous = yearIndex > 0 ? data[yearIndex - 1] : null

  const newValues: Record<string, DataValue> = {}
  Object.keys(current).forEach(key => {
    if (key === 'ZEIT') {
      return
    }
    newValues[key] = {
      current:
        current && current[key] !== undefined
          ? sanitizeLocalizedValue(current[key] ?? 0) * modifier
          : 0,
      previous:
        previous && previous[key] !== undefined
          ? sanitizeLocalizedValue(previous[key] ?? 0) * modifier
          : null,
    }
  })

  if (keys.length > 0) {
    Object.keys(newValues).forEach(key => {
      if (!keys.includes(key)) {
        delete newValues[key]
      }
    })
  }

  return newValues
}
