import { StadtteilMapRowProps } from './dt'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'
import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'

export default function StadtteilMapRow({
  destict_data,
  anchor_class,
  entry_class,
  variant,
}: StadtteilMapRowProps) {
  return (
    <div className="flex h-full w-1/3 flex-col justify-between gap-4">
      {destict_data.map((item, index) => (
        <div className={cx('flex', entry_class)} key={item.id}>
          <div className={'relative inline-block min-w-32'} key={index}>
            <Title as="h5" className={'flex flex-col gap-2'} variant={variant}>
              <div>{item.title ?? item.id}</div>{' '}
              <AnimatedNumber
                className="text-2xl"
                previous_value={item.value.previous}
              >
                {item.value.current}
              </AnimatedNumber>
            </Title>
            <div
              className={cx('absolute top-1/2 h-0 w-0', anchor_class)}
              id={`entry-${item.id}`}
            ></div>
            <div
              className={cx(
                'absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2',
                BackgroundStyle({ variant }),
              )}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
