import Title from '@/components/Elements/Title'
import EnergyTile from '../EnergyTile'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'

// interface PVDataType {
//   ZEIT: string
//   AnzahlAnlagen: number
//   AnzahlSolarModule: number
//   Bruttoleistung: number
//   Nettonennleistung: number
// }

export default function LanternsTile() {
  // const [data] = PVData as PVDataType[]

  return (
    <EnergyTile
      dataRetrieval={format(new Date('2023-05-30T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'Stadtwerke Münster'}
      embedId="energy-lanterns"
      title={
        <>
          <AnimatedNumber>{8850}</AnimatedNumber> LED-Leuchtmittel
        </>
      }
    >
      <div>
        <Title as={'subtitle'}>
          schenken Münsters Straßen bereits klimafreundliches Licht. Die
          Stadtnetze Münster rüsten nach und nach alle rund{' '}
          <span className="text-energy">
            <AnimatedNumber>{29000}</AnimatedNumber> Straßenlaternen
          </span>{' '}
          im Stadtgebiet mit der Technologie aus.
        </Title>
      </div>
    </EnergyTile>
  )
}
