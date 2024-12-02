import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import RadarChart, { AvgTempData } from './RadarChart'
import { ClimateHistoryRecord } from './dt'
import useSourceFile from '@/hooks/useSourceFile'

export default function Tile({ type, tile_payload }: TileProps) {
  const climateHistoryData: ClimateHistoryRecord[] = useSourceFile(
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
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <div className="h-[316px] w-full md:h-[528px]">
        <div className="h-full w-full">
          <RadarChart data={climateYears} />
        </div>
      </div>
    </BaseTile>
  )
}
