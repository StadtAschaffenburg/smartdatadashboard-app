export type Condition =
  | 'dry'
  | 'fog'
  | 'rain'
  | 'sleet'
  | 'snow'
  | 'hail'
  | 'thunderstorm'

export interface BrightSkyResponse {
  weather: Weather[]
  sources: Source[]
}

export interface Weather {
  timestamp: string
  source_id: number
  precipitation: number
  pressure_msl: number
  sunshine: number
  temperature: number
  wind_direction: number
  wind_speed: number
  cloud_cover: number
  dew_point: number
  relative_humidity: any
  visibility: number
  wind_gust_direction: any
  wind_gust_speed: number
  condition: Condition
  icon:
    | 'clear-day'
    | 'clear-night'
    | 'partly-cloudy-day'
    | 'partly-cloudy-night'
    | 'cloudy'
    | 'fog'
    | 'wind'
    | 'rain'
    | 'sleet'
    | 'snow'
    | 'hail'
    | 'thunderstorm'
}

export interface Source {
  id: number
  dwd_station_id: any
  observation_type: string
  lat: number
  lon: number
  height: number
  station_name: string
  wmo_station_id: string
  first_record: string
  last_record: string
  distance: number
}
