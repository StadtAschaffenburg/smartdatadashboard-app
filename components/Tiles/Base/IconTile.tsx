import 'server-only'

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import LiveBadge from './LiveBadge'
import getTileData from '@/lib/api/getTileData'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
              className={cx('min-w-fit', iconTileTitleStyle({ variant }))}
              font={'normal'}
            >
              {data?.title ?? title ?? 'Lade...'}
            </Title>
            {(data?.subtitle || subtitle) && (
              <Title as={'subtitle'} className="2xl:max-w-[85%]" color={'dark'}>
                {data?.subtitle ?? subtitle}
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

        {(data?.title || title) && <Spacer />}
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

      {data?.copy && (
        <ReactMarkdown
          components={{
            h1: props => <Title as={'h2'} {...props} />,
            h2: props => <Title as={'h3'} {...props} />,
            h3: props => <Title as={'h4'} {...props} />,
            h4: props => <Title as={'h5'} {...props} />,
            h5: props => <Title as={'h6'} {...props} />,
            h6: props => <Title as={'h7'} {...props} />,
            ul: props => <ul className="list-disc px-6" {...props} />,
            p: props => (
              <p
                className="mb-2 text-base font-medium lg:text-xl lg:leading-6 lg:tracking-wide"
                {...props}
              />
            ),
            a: props => (
              <a
                className="underline"
                {...props}
                rel="noopener noreferrer"
                target="_blank"
              />
            ),
          }}
          remarkPlugins={[remarkGfm]}
        >
          {data?.copy}
        </ReactMarkdown>
      )}
      <>{data?.copy && <Spacer />}</>

      <div className="flex space-x-2 text-xs">
        <Title as="h7" font="semibold" variant={'primary'}>
          Datenstand:{' '}
          {data?.retrieval ?? dataRetrieval ?? (live ? 'live' : 'unbekannt')}
        </Title>
        <Title as="h7" font="normal" variant={'primary'}>
          Quelle: {data?.source ?? dataSource ?? 'Stadt Aschaffenburg'}
        </Title>
      </div>
    </BaseTile>
  )
}
