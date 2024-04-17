'use client'

import InsightsTile from './InsightsTile'
import useDevice from '@/hooks/useDevice'
import Carousel from '../Elements/Carousel'
import { useWindowSize } from 'react-use'

const pages = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
}

const padding = {
  desktop: '0px',
  tablet: '16px',
  mobile: '16px',
}

type Insight = {
  image: string
  slug?: string | undefined
  title: string
}

export default function InsightsCarousel({
  insights,
}: {
  insights: Insight[]
}) {
  const device = useDevice()
  const { width } = useWindowSize()

  return (
    <Carousel
      arrows={device != 'desktop'}
      options={{
        gap: '1.5rem',
        // sorry for this quick and dirty hack
        padding:
          width < 1440 && width > 1024
            ? '2.5rem'
            : width >= 1920
            ? '82px'
            : padding[device],
        perPage: pages[device],
      }}
    >
      {insights?.map(({ slug, title, image }) => (
        <InsightsTile
          image={''}
          key={slug}
          link={`/sammlung/${slug}`}
          title={title}
        />
      ))}
    </Carousel>
  )
}
