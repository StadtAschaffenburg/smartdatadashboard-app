import 'server-only'

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import LiveBadge from './LiveBadge'
import getTileData from '@/lib/api/getTileData'

const iconTileTitleStyle = cva('', {
  variants: {
    variant: {
      primary: 'text-primary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
      data: 'text-secondary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type DataSourceProps = {
  dataRetrieval?: string
}

export type IconTileProps = VariantProps<typeof iconTileTitleStyle> &
  DataSourceProps &
  EmbedTileProps & {
    children: React.ReactElement | React.ReactElement[]
    title?: string | React.ReactElement
    subtitle?: string | React.ReactElement
    dataSource?: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    live?: boolean
  }

/**
 * A tile that has an icon on top right
 * @param IconTileProps properties of the Icon tile
 * @returns Mobility Tile
 */
export default async function IconTile({
  children,
  live,
  title,
  subtitle,
  icon,
  variant,
  dataRetrieval,
  dataSource,
  embedId,
}: IconTileProps) {
  const Icon = icon

  const data = await getTileData(embedId!)

  return (
    <BaseTile
      embedId={embedId}
      footerCenterElement={live ? <LiveBadge variant={variant} /> : undefined}
      isFullWidth={data?.full_width}
      moreInfo={data?.details}
      source={data?.data_url}
      variant={variant}
    >
      <div className="px-2.5">
        <div className="absolute right-16 top-16 hidden lg:block">
          <Icon
            className={cx(
              'h-[29px] w-auto flex-shrink-0 opacity-40 md:h-[50px]',
              iconTileTitleStyle({ variant }),
            )}
          />
        </div>
        {title && (
          <div className="relative flex items-center justify-between">
            <div className="flex flex-wrap items-center justify-start gap-x-4 lg:max-w-[87%]">
              <Title
                as={'h1'}
                className={cx('min-w-fit', iconTileTitleStyle({ variant }))}
                font={'normal'}
              >
                {data?.title || title}
              </Title>
              {(data?.subtitle || subtitle) && (
                <Title
                  as={'subtitle'}
                  className="2xl:max-w-[85%]"
                  color={'dark'}
                >
                  {data?.subtitle || subtitle}
                </Title>
              )}
            </div>

            {/* <Icon
              className={cx(
                'absolute right-0 top-0 hidden h-[29px] w-auto flex-shrink-0 opacity-40 md:h-[50px] 2xl:block',
                iconTileTitleStyle({ variant }),
              )}
            /> */}
          </div>
        )}
        {(title || subtitle) && <Spacer />}
      </div>
      <>
        {!title && !subtitle && (
          <div className={cx('relative', iconTileTitleStyle({ variant }))}>
            <Icon className=" absolute right-0 top-0 hidden h-[50px] w-auto opacity-40 2xl:block" />
          </div>
        )}
      </>

      <>{children}</>
      <Spacer />

      <>{data?.copy && <Title as="h5">{data?.copy}</Title>}</>
      <>{data?.copy && <Spacer />}</>

      <div className="flex space-x-2 text-xs">
        <Title as="h7" font="semibold" variant={'primary'}>
          Datenstand:{' '}
          {dataRetrieval
            ? data?.retrieval ?? dataRetrieval
            : live
            ? 'live'
            : 'unbekannt'}
        </Title>
        <Title as="h7" font="normal" variant={'primary'}>
          Quelle: {data?.source ?? dataSource ?? 'Stadt Aschaffenburg'}
        </Title>
      </div>
    </BaseTile>
  )
}
