import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { ReactElement } from 'react'

export type ChartProps = {
  tile_payload: TilePayloadType
  switch?: ReactElement<any>
  datasource: TileDatasourceType
}