'use client'

import { StadtteilMapProps } from './dt'
import Title from '@/components/Elements/Title'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default function StadtteilMapMobile({
  destict_data,
}: StadtteilMapProps) {
  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2">
        {destict_data.map(item => (
          <div className={'flex'} key={item.id}>
            <Title
              as="h5"
              className={
                'flex w-full items-center justify-between gap-2 leading-tight'
              }
              variant={'society'}
            >
              <div>{item.title ?? item.id}</div>{' '}
              <AnimatedNumber
                className="text-2xl"
                previous_value={item.value.previous}
              >
                {item.value.current}
              </AnimatedNumber>
            </Title>
            <div
              className={'absolute top-1/2 h-0 w-0'}
              id={`entry-${item.id}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
