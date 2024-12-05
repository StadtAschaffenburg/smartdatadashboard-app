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
  if (!data || data.length === 0) {
    return []
  }

  return (
    data
      .map(e => e[key])
      .filter((year): year is number => year !== undefined) ?? []
  )
}

export function getReducedValue(
  values: Record<string, DataValue>,
  keys: string[],
): DataValue {
  return Object.keys(values)
    .filter(key => keys.includes(key))
    .reduce(
      (acc, key) => {
        acc.current += values[key].current

        // Wenn ein "previous" null ist, wird der gesamte Wert null
        if (values[key]?.previous === null) {
          acc.previous = null
        } else if (acc.previous !== null) {
          acc.previous += values[key].previous ?? 0
        }

        return acc
      },
      { current: 0, previous: 0 as number | null },
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
