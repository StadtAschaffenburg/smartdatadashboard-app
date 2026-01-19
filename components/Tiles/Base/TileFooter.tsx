import Link from 'next/link'
import MoreDetails from '@/components/Elements/MoreDetails'
import { cva, VariantProps } from 'class-variance-authority'
import {
  MsKlimadashboardIconsNaviDownload,
  MsKlimadashboardIconsNaviKachelImplementieren,
  MsKlimadashboardIconsNaviTeilen,
} from '@/components/Icons/Navigation'

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
  children?: React.ReactElement<any>
  dataURL?: string | null
  hasMoreDetails?: boolean
  title?: string
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
  title = '',
}: TileFooterProps) {
  function IconButtons() {
    return (
      <div className={tileFooterStyle({ variant })}>
        <button
          className="fill-inherit transition-all hover:fill-secondary"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onEmbedClick?.()
          }}
          title={`Kachel ${title} einbetten`}
        >
          <MsKlimadashboardIconsNaviKachelImplementieren className="h-6 cursor-pointer stroke-2" />
        </button>

        <button
          className="fill-inherit transition-all hover:fill-secondary"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onShareClick?.()
          }}
          title={`Kachel ${title} teilen`}
        >
          <MsKlimadashboardIconsNaviTeilen className="h-6 cursor-pointer stroke-2" />
        </button>

        {dataURL && (
          <Link
            className="fill-inherit transition-all hover:fill-secondary"
            href={dataURL}
            target="_blank"
            title={`Daten für ${title} herunterladen`}
          >
            <MsKlimadashboardIconsNaviDownload className="h-6 stroke-2" />
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="mt-6">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <IconButtons />
        <div className="flex flex-[2_2_0%] justify-center">{children}</div>
        {hasMoreDetails && (
          <div className="flex flex-1 justify-end" onClick={onMoreInfoClick}>
            <MoreDetails variant={variant} />
          </div>
        )}
        {!hasMoreDetails && <div className="flex flex-1 justify-end"></div>}
      </div>
    </div>
  )
}
