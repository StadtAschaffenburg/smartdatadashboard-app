import Title from '@/components/Elements/Title'
// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'
import MobilityTile from '../MobilityTile'
import { MsKlimadashboardIconsMMasterplanV1 } from '@/components/Icons/Mobilitaet'

export default function MasterplanTile() {
  return (
    <MobilityTile
      dataRetrieval={format(new Date('2023-01-18T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'Stadt Münster - Amt für Mobilität und Tiefbau'}
      embedId="mobility-masterplan"
      title={<>Der „Masterplan</>}
    >
      <div>
        <div className="flex flex-row justify-center gap-6">
          <span className="flex flex-col justify-center">
            <MsKlimadashboardIconsMMasterplanV1 className="h-20 text-primary lg:h-44" />
          </span>
          <Title as={'subtitle'}>
            Mobilität Münster 2035+“ wird aktuell entwickelt. Dabei wurden über
            verschiedene Formate Münsteraner Bürger*innen beteiligt, die so{' '}
            <span className="text-mobility">
              <AnimatedNumber>{967}</AnimatedNumber> Ideen
            </span>{' '}
            einbringen konnten.
          </Title>
        </div>
      </div>
    </MobilityTile>
  )
}
