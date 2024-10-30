import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { useEffect, useState } from 'react'

export default function LongTermAverageDiff() {
  const [difference, setDifference] = useState<number>()

  async function getData() {
    try {
      /*const request = await fetch(
        'https://long-term-average.klimadashboard-ms.reedu.de/',
      )
      const data = await request.json()
      setDifference(data.value)*/
      setDifference(0)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Couldn't fetch long term average difference", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (!difference) {
    return null
  }

  return (
    <Title as={'h4'}>
      <span className="text-climate">
        <AnimatedNumber decimals={2}>{Math.abs(difference)}</AnimatedNumber>{' '}
        Grad {difference > 0 ? 'wärmer' : 'kälter'}
      </span>{' '}
      ist der{' '}
      <span className="text-climate">
        {format(new Date(), 'LLLL', { locale: de })}
      </span>{' '}
      bisher im Vergleich zum langjährigen Mittel (1961-1990).
    </Title>
  )
}
