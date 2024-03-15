import EnergyTile from '../EnergyTile'

// @ts-ignore
import PVData from '@/assets/data/pv-anlagen.csv'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import PVAnlagenContent from './PVAnlagenContent'

export interface PVAnlagenDataType {
  AnzahlAnlagen: number
  Leistung: number
}

export default function PVAnlagenTile() {
  const [data] = PVData as PVAnlagenDataType[]

  return (
    <EnergyTile
      dataRetrieval="12.04.2023"
      dataSource={'Stadt Aschaffenburg'}
      embedId="energy-PVAnlagen"
      live
      title={
        <>
          <AnimatedNumber>{data.AnzahlAnlagen}</AnimatedNumber> PV-Anlagen
        </>
      }
    >
      <PVAnlagenContent></PVAnlagenContent>
    </EnergyTile>
  )
}
