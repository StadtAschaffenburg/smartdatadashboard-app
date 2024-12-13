import { sanitizeLocalizedValue } from '@/utils/sanitize'
import { TableRow } from '@/types/tiles'
import { TileVariants } from '@/utils/variants/TileVariants'

export interface DataValue {
  current: number | null
  previous: number | null
}

export type RowDataType = DataValue & {
  label: string
  unit: string | null
  icon: string | null
  variant?: keyof typeof TileVariants.variant | null
}

export type RowDataCollection = Record<string, RowDataType>

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

function checkValue(value: any, multiplier: number = 1): number | null {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return sanitizeLocalizedValue(value) * multiplier
}

export function getReducedValue(
  values: Record<string, DataValue>,
  keys: string[],
): DataValue {
  return Object.keys(values)
    .filter(key => keys.includes(key))
    .reduce(
      (acc, key) => {
        acc.current += values[key].current ?? 0

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
): RowDataCollection {
  if (!rows || rows.length === 0 || !data || data.length === 0) {
    return {}
  }

  const current = data[yearIndex] ?? null
  const previous = yearIndex > 0 ? (data[yearIndex - 1] ?? null) : null

  if (current === null || typeof current !== 'object') {
    return {}
  }

  const new_values: RowDataCollection = {}

  rows.forEach(row => {
    const keys = row.key.split(';').map(key => key.trim())
    const multiplier = row.multiplier ?? 1

    let aggregated_current: number | null = null
    let aggregated_previous: number | null = null

    keys.forEach(key => {
      const is_negative = key.startsWith('-')
      key = is_negative ? key.slice(1) : key
      const effective_multiplier = is_negative ? -multiplier : multiplier

      const current_value =
        current && key in current
          ? checkValue(current[key], effective_multiplier)
          : null

      if (current_value !== null) {
        aggregated_current = (aggregated_current ?? 0) + current_value
      }

      const previous_value =
        previous && key in previous
          ? checkValue(previous[key], effective_multiplier)
          : null

      if (previous_value !== null) {
        aggregated_previous = (aggregated_previous ?? 0) + previous_value
      }
    })

    new_values[row.key] = {
      current: aggregated_current,
      previous: aggregated_previous,
      label: row.label ?? row.key,
      unit: row.unit ?? null,
      icon: row.icon ?? null,
      variant: row.variant ?? null,
    }
  })

  return new_values
}
