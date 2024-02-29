import Link from 'next/link'

import MoreDetails from '@/components/Elements/MoreDetails'
import { cva, VariantProps } from 'class-variance-authority'
import { MsKlimadashboardIconsNaviDownload, MsKlimadashboardIconsNaviKachelImplementieren, MsKlimadashboardIconsNaviTeilen } from '@/components/Icons/Misc/Navi'

const tileFooterStyle = cva('flex flex-1 gap-4', {
  variants: {
    variant: {
      primary: 'text-primary fill-primary',
      inverse: 'text-white fill-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type TileFooterProps = VariantProps<typeof tileFooterStyle> & {
  onEmbedClick?: () => void
  onMoreInfoClick?: () => void
  onShareClick?: () => void
  children?: React.ReactElement
  dataURL?: string
  hasMoreDetails?: boolean
}

/**
 * A footer for all tiles with sharing, export and embed button as well as a more information link
 * @returns TileFooter
 */
export default function TileFooter({
  onEmbedClick,
  onMoreInfoClick,
  onShareClick,
  children,
  variant,
  dataURL,
  hasMoreDetails,
}: TileFooterProps) {
  function IconButtons() {
    return (
      <div className={tileFooterStyle({ variant })}>
        <MsKlimadashboardIconsNaviKachelImplementieren
          className="h-6 cursor-pointer stroke-2 px-1"
          onClick={onEmbedClick}
        />
        <MsKlimadashboardIconsNaviTeilen
          className="h-6 cursor-pointer stroke-2 px-1"
          onClick={onShareClick}
        />
        {dataURL && (
          <Link className='fill-inherit' href={dataURL} target="_blank">
            <MsKlimadashboardIconsNaviDownload className="h-6 stroke-2 px-1" />
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="mt-6">
      <div className="hidden w-full flex-row items-center justify-between gap-2 lg:flex">
        <IconButtons />
        <div className="flex flex-[2_2_0%] justify-center">{children}</div>
        {hasMoreDetails && (
          <div className="flex flex-1 justify-end" onClick={onMoreInfoClick}>
            <MoreDetails variant={variant} />
          </div>
        )}
        {!hasMoreDetails && <div className="flex flex-1 justify-end"></div>}
      </div>
      <div className="flex flex-col gap-2 lg:hidden">
        {/* <IconButtons /> */}

        <div className="flex w-full items-center justify-between">
          {hasMoreDetails && (
            <div
              className="flex flex-1 justify-start"
              onClick={onMoreInfoClick}
            >
              <MoreDetails variant={variant} />
            </div>
          )}
          {!hasMoreDetails && <div className="flex flex-1 justify-start"></div>}
          <div className="flex flex-1 justify-end">{children}</div>
        </div>
      </div>
    </div>
  )
}
