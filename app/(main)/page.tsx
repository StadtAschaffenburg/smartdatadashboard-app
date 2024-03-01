import InsightsContainer from '@/components/Insights/InsightsContainer'
import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'

import BaseView from '@/components/Views/BaseView'
import Columns from '@/components/Layout/Columns'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import PhotovoltTile from '@/components/Tiles/Energy/PhotovoltTile'
import EnergietraegerTile from '@/components/Tiles/Energy/EnergietraegerTile'
import WindEnergyTile from '@/components/Tiles/Energy/WindEnergyTile'
import TrafficloadTile from '@/components/Tiles/Mobility/TrafficloadTile'
import BusTile from '@/components/Tiles/Mobility/Bus'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
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
            <CO2EmissionsTile />
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
              <WindEnergyTile />
              <EnergietraegerTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="mobility"
          >
            <TrafficloadTile />
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
