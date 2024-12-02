import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { cva, cx } from 'class-variance-authority'
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
import { getVariantType, TileVariantTypes } from '@/utils/payload'

const iconTileTitleStyle = cva('', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})

export type DataSourceProps = {
  dataRetrieval?: string
}

export type IconTileProps = DataSourceProps &
  EmbedTileProps & {
    variant?: TileVariantTypes
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
  if (!tile_payload) {
    return <></>
  }

  // if live (live-tag) is not set, use tile_payload.live
  live = live ?? tile_payload?.live
  variant = variant ?? getVariantType(tile_payload)

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
      isFullWidth={full_width}
      moreInfo={tile_payload?.details}
      variant={variant}
    >
      <div className="mb-4 flex flex-col gap-2">
        <div className="relative flex items-stretch gap-4">
          <div className="flex flex-grow flex-wrap items-center justify-start gap-x-4">
            <Title
              as={'h1'}
              className={cx('min-w-fit', iconTileTitleStyle({ variant }))}
              font={'normal'}
            >
              {title ?? tile_payload?.title ?? '...'}
            </Title>
          </div>
          <div className="min-w-12 lg:min-w-16">
            {
              <Icon
                className={cx(
                  'w-auto opacity-40',
                  iconTileTitleStyle({ variant }),
                )}
              />
            }
          </div>
        </div>
        <div>
          {(tile_payload?.subtitle || subtitle) && (
            <>
              <Title as={'subtitle'} className="2xl:max-w-[85%]" color={'dark'}>
                {tile_payload?.subtitle ?? subtitle}
              </Title>
            </>
          )}
        </div>
      </div>
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
