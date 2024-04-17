import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'

import BaseView from '@/components/Views/BaseView'
import Columns from '@/components/Layout/Columns'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import BusTile from '@/components/Tiles/Mobility/Bus'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import PVAnlagenTile from '@/components/Tiles/Energy/PVAnlagenTile'
import PhotovoltTile from '@/components/Tiles/Energy/PhotovoltTile'
import EnergyComsumptionTile from '@/components/Tiles/Buildings/EnergyConsumption'

export default async function Home() {
  return (
    <div className="-translate-y-52">
      <AnimatedPage>
        <Container>
          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="climate"
          >
            <Columns>
              <WeatherTile />
              <ClimateDevelopmentTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="energy"
          >
            <Columns>
              <PhotovoltTile />
              <PVAnlagenTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="mobility"
          >
            <Columns>
              <BusTile />
              <BicycleChartTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="building"
          >
            <EnergyComsumptionTile />
          </BaseView>
        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 10
