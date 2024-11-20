import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import Markdown from '@/components/Elements/Markdown'
import LiveBadge from './LiveBadge'
import { ActionFieldsIconMap } from '@/types/dimensionMapping'
import {
  TextDefaultVariants,
  TextVariants,
} from '@/utils/variants/TextVariants'
import { TilePayloadType } from '@/types/tiles'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'

const iconTileTitleStyle = cva('', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})

export type DataSourceProps = {
  dataRetrieval?: string
}

export type IconTileProps = VariantProps<typeof iconTileTitleStyle> &
  DataSourceProps &
  EmbedTileProps & {
    children?: React.ReactElement | React.ReactElement[]
    title?: string | React.ReactElement
    subtitle?: string | React.ReactElement
    dataSource?: string
    icon?:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    live?: boolean | null
    tile_payload?: TilePayloadType
  }

/**
 * A tile that has an icon on top right
 * @param IconTileProps properties of the Icon tile
 * @returns Mobility Tile
 */
export default function IconTile({
  children,
  live,
  title,
  subtitle,
  icon,
  variant,
  dataRetrieval,
  dataSource,
  embedId,
  tile_payload,
}: IconTileProps) {
  // if category "ab_live" is set, use live tile variant, else use action_dimension
  if (tile_payload?.tags?.category === 'ab_live') {
    variant = 'live'
  } else if (!variant && tile_payload?.tags?.action_dimension) {
    variant = tile_payload.tags.action_dimension
  }
  // if live (live-tag) is not set, use tile_payload.live
  live = live ?? tile_payload?.live

  const Icon =
    icon ||
    ActionFieldsIconMap[
      tile_payload?.tags?.action_field as keyof typeof ActionFieldsIconMap
    ] ||
    (() => <></>)
  const full_width = tile_payload?.layout === 'full'

  return (
    <BaseTile
      embedId={embedId}
      footerCenterElement={
        live ? <LiveBadge variant={variant as BackgroundVariant} /> : undefined
      }
      icon={icon}
      isFullWidth={full_width}
      moreInfo={tile_payload?.details}
      source={tile_payload?.source}
      variant={variant}
    >
      <div className="n:px-2.5">
        <div className="absolute right-16 top-16 hidden lg:block">
          <Icon
            className={cx(
              'h-[29px] w-auto flex-shrink-0 opacity-40 md:h-[50px]',
              iconTileTitleStyle({ variant }),
            )}
          />
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex flex-wrap items-center justify-start gap-x-4 lg:max-w-[87%]">
            <Title
              as={'h1'}
              className={cx('mb-4 min-w-fit', iconTileTitleStyle({ variant }))}
              font={'normal'}
            >
              {tile_payload?.title ?? title ?? '...'}
            </Title>
            {(tile_payload?.subtitle || subtitle) && (
              <Title as={'subtitle'} className="2xl:max-w-[85%]" color={'dark'}>
                {tile_payload?.subtitle ?? subtitle}
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

        {(tile_payload?.title || title) && <Spacer />}
      </div>
      <>
        {!title && !subtitle && (
          <div className={cx('relative', iconTileTitleStyle({ variant }))}>
            <Icon className="absolute right-0 top-0 hidden h-[50px] w-auto opacity-40 2xl:block" />
          </div>
        )}
      </>

      <>{children}</>
      <Spacer />

      {tile_payload?.copy && <Markdown content={tile_payload.copy} />}

      <>{tile_payload?.copy && <Spacer />}</>

      <div className="flex gap-8 text-sm text-primary">
        <div className="">
          <span className="font-semibold">Datenstand:</span>{' '}
          {tile_payload?.retrieval ??
            dataRetrieval ??
            (live ? 'live' : new Date().getFullYear())}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Quelle:</span>{' '}
          {tile_payload?.source ?? dataSource ?? 'Stadt Aschaffenburg'}
        </div>
      </div>
    </BaseTile>
  )
}
