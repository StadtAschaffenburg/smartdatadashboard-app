import Link from 'next/link'
import * as React from 'react'

import { Button } from './Button'

interface ButtonProps {
  type: 'climate' | 'mobility' | 'energy' | 'building'
}

export function GoToButton({ type }: ButtonProps): JSX.Element {
  if (type === 'climate') {
    return (
      <Link href="/klima">
        <Button size={'link'} variant={'goToClimate'}>zu den Klimadaten</Button>
      </Link>
    )
  }
  if (type === 'mobility') {
    return (
      <Link href={'/mobilitaet'}>
        <Button size={'link'} variant={'goToMobility'}>zu den Mobilitätsdaten</Button>
      </Link>
    )
  }
  if (type === 'energy') {
    return (
      <Link href={'/energie'}>
        <Button size={'link'} variant={'goToEnergy'}>zu den Energiedaten</Button>
      </Link>
    )
  }
  if (type === 'building') {
    return (
      <Link href={'/gebaeude'}>
        <Button size={'link'} variant={'goToBuildings'}>zu den Gebäudedaten</Button>
      </Link>
    )
  }

  // this should never be reached
  return <Button>zu den Daten</Button>
}
