import BuildingTile from '../BuildingsTile'

import EcoProfitData from '@/assets/data/ecoprofit.json'
import { format } from 'date-fns'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'

interface IEcoProfitData {
  companiesTotal: number
  savingsEuro: number
  savingsCO2: number
  companiesStartupConsulting: number
  updatedAt: string
}

console.log(EcoProfitData);

export default function EcoProfitTile() {
  const {
    companiesTotal,
    savingsEuro,
    savingsCO2,
    companiesStartupConsulting,
    updatedAt,
  } = EcoProfitData as IEcoProfitData

  return (
    <BuildingTile
      dataRetrieval={format(new Date(updatedAt), 'dd.MM.yyyy')}
      dataSource="Stadt Münster"
      embedId={'building-ecoProfit'}
    >
      <Title as={'h1'} font={'normal'} variant={'building'}>
        <AnimatedNumber>{companiesTotal}</AnimatedNumber> Unternehmen
      </Title>
      <Spacer />
      <Title as="subtitle">
        haben bereits am Ökoprofit-Projekt teilgenommen und gemeinsam{' '}
        <span className="text-buildings">
          <AnimatedNumber decimals={1}>{savingsEuro}</AnimatedNumber> Millionen
          Euro
        </span>{' '}
        und{' '}
        <span className="text-buildings">
          <AnimatedNumber>{savingsCO2}</AnimatedNumber> Tonnen CO<sub>2</sub>
        </span>{' '}
        eingespart.
      </Title>
      <Spacer size={'xl'} />
      <Title as={'h1'} font={'normal'} variant={'building'}>
        <AnimatedNumber>{companiesStartupConsulting}</AnimatedNumber>{' '}
        Unternehmen
      </Title>
      <Spacer />
      <Title as="subtitle">
        haben bereits die „Startberatung Energieeffizienz“ genutzt und
        Maßnahmen zur Energieeinsparung entwickelt.
      </Title>
    </BuildingTile>
  )
}
