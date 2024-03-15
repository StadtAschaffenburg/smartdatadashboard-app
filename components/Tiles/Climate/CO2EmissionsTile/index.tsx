import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import ClimateTile from '../ClimateTile'
import CO2EmissionsContent from './CO2EmissionsContent'
import getTileData from '@/lib/api/getTileData'
import { TileSplitView } from '../../Base/TileSplitView'
import { MsKlimadashboardIconsKCo2 } from '@/components/Icons/Klima'

export default async function CO2EmissionsTile() {
  const data = await getTileData('climate-co2')
  const infoText = data?.info ?? ''

  return (
    <ClimateTile
      dataRetrieval="02.03.2023"
      dataSource="Stadt Aschaffenburg - Stabsstelle Klima"
      embedId="climate-co2"
      subtitle="So viel wird in Aschaffenburg ausgestoßen"
      title={
        <>
          CO<sub>2</sub>
        </>
      }
    >
      <TileSplitView>
        <TileSplitView.Left>
          <CO2EmissionsContent />
        </TileSplitView.Left>
        <TileSplitView.Right>
          <div className="flex flex-col items-center justify-between">
            <Title as="h5" variant={'dark'}>
              {infoText}
            </Title>
            <Spacer />
            <MsKlimadashboardIconsKCo2 className="mx-auto w-40" />
          </div>
        </TileSplitView.Right>
      </TileSplitView>
    </ClimateTile>
  )
}
