import { sanitizeLocalizedValue } from '@/utils/sanitize'
import { TableRow } from '@/types/tiles'

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

export function getRows(
  data: InputDataType[],
  yearIndex: number,
  rows: TableRow[] | null,
): Record<string, DataValue & { label: string; unit: string | null }> {
  if (!rows || rows.length === 0) {
    return {}
  }

  const current = data[yearIndex]
  const previous = yearIndex > 0 ? data[yearIndex - 1] : null

  const new_values: Record<
    string,
    DataValue & { label: string; unit: string | null }
  > = {}

  rows.forEach(row => {
    const key = row.key
    const multiplier = row.multiplier ?? 1
    const label = row.label ?? key
    const unit = row.unit

    if (key in current) {
      new_values[key] = {
        current:
          current[key] !== undefined
            ? sanitizeLocalizedValue(current[key] ?? 0) * multiplier
            : 0,
        previous:
          previous && previous[key] !== undefined
            ? sanitizeLocalizedValue(previous[key] ?? 0) * multiplier
            : null,
        label: label,
        unit: unit,
      }
    }
  })

  return new_values
}
