'use client'

import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useTransition } from '@react-spring/web'
import EmbedOverlay from './EmbedOverlay'
import ShareOverlay from './ShareOverlay'
import MoreInfoOverlay from './MoreInfoOverlay'
import TileFooter from './TileFooter'
import { TileType } from '@/types/tiles'
import ReactMarkdown from 'react-markdown'
import Title from '@/components/Elements/Title'
import remarkGfm from 'remark-gfm'
import {
  BackgroundDefaultVariants,
  BackgroundLightVariants,
} from '@/utils/variants/BackgroundVariants'

const baseTileStyle = cva(
  'relative flex flex-col md:flex-row h-fit overflow-hidden rounded',
  {
    variants: BackgroundLightVariants,
    defaultVariants: BackgroundDefaultVariants,
  },
)

export type ImageProps =
  | { startImage: React.ReactElement; endImage?: never }
  | { endImage: React.ReactElement; startImage?: never }
  | { endImage?: undefined; startImage?: undefined }

export type EmbedTileProps = { embedId?: TileType }

export type BaseTileProps = VariantProps<typeof baseTileStyle> &
  EmbedTileProps &
  ImageProps & {
    children: React.ReactElement | React.ReactElement[]
    className?: string
    footerCenterElement?: React.ReactElement
    moreInfo?: React.ReactNode
    isFullWidth?: boolean
    dataUrl?: string
  }

const transitionOpts = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

/**
 * A basic configruable tile
 * @param BaseTileProps basic properties of the tile
 * @returns BaseTile
 */
export function BaseTile({
  children,
  variant,
  className = '',
  startImage,
  endImage,
  footerCenterElement,
  embedId,
  moreInfo,
  isFullWidth,
  dataUrl,
}: BaseTileProps) {
  const [showEmbedOverlay, setShowEmbedOverlay] = useState(false)
  const [showShareOverlay, setShowShareOverlay] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const embedTransitions = useTransition(showEmbedOverlay, transitionOpts)
  const shareTransitions = useTransition(showShareOverlay, transitionOpts)

  const moreInfoTransitions = useTransition(showMoreInfo, transitionOpts)

  const openShareDialog = async () => {
    if (navigator && navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Data Dashboard Aschaffenburg',
          url: `${window.location.origin}/share/${embedId}`,
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Could not share', e)
      } finally {
        return
      }
    }

    setShowShareOverlay(true)
  }

  return (
    <div className="pb-4 md:pb-8">
      <div className={cx(baseTileStyle({ variant }), className)}>
        {startImage}
        <div className="z-0 flex w-full flex-col justify-between px-6 py-4 xs:p-8 md:p-12 lg:px-8 lg:py-6 xl:px-16 xl:py-12">
          <div>{children}</div>
          <TileFooter
            dataURL={dataUrl ?? null}
            hasMoreDetails={!!moreInfo}
            onEmbedClick={() => setShowEmbedOverlay(true)}
            onMoreInfoClick={() => setShowMoreInfo(true)}
            onShareClick={openShareDialog}
            variant={variant === 'data' ? 'inverse' : 'primary'}
          >
            {footerCenterElement}
          </TileFooter>
        </div>
        {endImage}
        {embedId &&
          embedTransitions(
            (styles, render) =>
              render && (
                <EmbedOverlay
                  embedId={embedId}
                  onClose={() => setShowEmbedOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {embedId &&
          shareTransitions(
            (styles, render) =>
              render && (
                <ShareOverlay
                  embedId={embedId}
                  onClose={() => setShowShareOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {moreInfoTransitions(
          (styles, render) =>
            render && (
              <MoreInfoOverlay
                isFullWidth={isFullWidth}
                onClose={() => setShowMoreInfo(false)}
                style={styles}
                variant={variant}
              >
                {typeof moreInfo === 'string' ? (
                  <ReactMarkdown
                    components={{
                      h1: props => <Title as={'h2'} {...props} />,
                      h2: props => <Title as={'h3'} {...props} />,
                      h3: props => <Title as={'h4'} {...props} />,
                      h4: props => <Title as={'h5'} {...props} />,
                      h5: props => <Title as={'h6'} {...props} />,
                      h6: props => <Title as={'h7'} {...props} />,
                      ul: props => <ul className="list-disc px-6" {...props} />,
                      p: props => <p className="mb-2" {...props} />,
                      a: props => (
                        <a
                          className="underline"
                          {...props}
                          rel="noopener noreferrer"
                          target="_blank"
                        />
                      ),
                      table: props => <table className="my-8" {...props} />,
                      th: props => <th className="pr-4" {...props} />,
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {moreInfo}
                  </ReactMarkdown>
                ) : (
                  <div>{moreInfo}</div>
                )}
              </MoreInfoOverlay>
            ),
        )}
      </div>
    </div>
  )
}
