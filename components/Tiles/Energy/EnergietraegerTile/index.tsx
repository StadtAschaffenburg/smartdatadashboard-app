import getTileData from '@/lib/api/getTileData'
import EnergyTile from '../EnergyTile'
import EnergietraegerChart from './EnergietraegerChart'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'

export default async function EnergietraegerTile() {
  const data = await getTileData('energy-energietraeger')
  const infoText = data?.info ?? ''

  return (
    <EnergyTile
      dataRetrieval="02.03.2023"
      dataSource="Stadt Aschaffenburg &ndash; Stabsstelle Klima"
      embedId="energy-energietraeger"
      subtitle={'Anteile verschiedener Energieträger'}
      title={'Stromerzeugung'}
    >
      <div className="h-[350px] md:h-[600px]">
        <EnergietraegerChart />
      </div>
      <Spacer />
      <Title as="h5" variant={'dark'}>
        {infoText}
      </Title>
    </EnergyTile>
  )
}
