import Title from '@/components/Elements/Title'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import getTileData from '@/lib/api/getTileData'
import ClimateTile from '../../Climate/ClimateTile'
import { MsKlimadashboardIconsDatenkachel } from '@/components/Icons/Klima'

export default async function DataCountTile() {
  const data = await getTileData('climate-data')
  const infoText = data?.info ?? ''

  return (
    <ClimateTile
      dataRetrieval="05.06.2023"
      dataSource="Stadt Aschaffenburg - Stabsstelle Smart City"
      embedId={'climate-data'}
      title={
        <>
          <AnimatedNumber>{12}</AnimatedNumber> Datenquellen
        </>
      }
    >
      <div>
        <div className="flex flex-row justify-center gap-6">
          <span className="flex flex-col justify-center">
            <MsKlimadashboardIconsDatenkachel className="h-20 text-primary md:h-44" />
          </span>
          <Title as={'subtitle'}>{infoText}</Title>
        </div>
      </div>
    </ClimateTile>
  )
}
