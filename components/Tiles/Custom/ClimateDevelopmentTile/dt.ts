export type ClimateHistoryRecord = {
  observation_type: string
  dwd_station_id: number
  wmo_station_id: any
  timestamp: string
  monthly_temperature: number
  temperature_deviation: number
}

export type AvgTempData = {
  [x: string]: {
    [key: number]: number
  }
}

export type YearMonthDeviation = {
  [year: number]: {
    [month: number]: number
  }
}