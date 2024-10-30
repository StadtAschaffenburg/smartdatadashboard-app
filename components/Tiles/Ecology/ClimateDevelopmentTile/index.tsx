import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'

import RadarChart, { AvgTempData } from './RadarChart'
import getSourceData from '@/lib/api/getSourceData'
import { ClimateHistoryRecord } from './dt'

export default async function ClimateDevelopmentTile() {
  const tile_id = `${TilePrefix}-climateDevelopment`

  const climateHistoryData: ClimateHistoryRecord[] = await getSourceData(
    'climate_history.json',
  )

  const climateYears = climateHistoryData.reduce((a: AvgTempData, o) => {
    const year = new Date(o.timestamp).getFullYear()
    const month = new Date(o.timestamp).getMonth()
    return {
      ...a,
      [year]: {
        ...a[year],
        [month]: o.temperature_deviation,
      },
    }
  }, {})

  return (
    <BaseTile embedId={tile_id}>
      <div className="h-[316px] w-full md:h-[528px]">
        <div className="h-full w-full">
          <RadarChart data={climateYears} />
        </div>
      </div>
    </BaseTile>
  )
}
