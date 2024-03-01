import Link from 'next/link'

import { cva, cx, VariantProps } from 'class-variance-authority'

import { ForwardRefExoticComponent, SVGProps } from 'react'
import { MsKlimadashboardIconsNaviDownload, MsKlimadashboardIconsNaviKachelImplementieren, MsKlimadashboardIconsNaviTeilen } from '@/components/Icons/Misc/Navi'

const iconTileTitleStyle = cva('', {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
      inverse: 'text-white',
      data: 'text-secondary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type TileHeaderProps = VariantProps<typeof iconTileTitleStyle> & {
  onEmbedClick?: () => void
  onMoreInfoClick?: () => void
  onShareClick?: () => void
  children?: React.ReactElement
  dataURL?: string
  hasMoreDetails?: boolean
  icon?:
  | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
  | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
}

/**
 * A footer for all tiles with sharing, export and embed button as well as a more information link
 * @returns TileHeader
 */
export default function TileHeader({
  onEmbedClick,
  onShareClick,
  variant,
  dataURL,
  icon,
}: TileHeaderProps) {
  function IconButtons() {
    const Icon = icon
    return (
      <div
        className={cx(
          'flex items-center gap-4',
          variant === 'secondary'
            ? 'fill-white text-white'
            : 'fill-primary text-primary',
        )}
      >
        <div>
          <MsKlimadashboardIconsNaviKachelImplementieren
            className="h-6 w-6 cursor-pointer stroke-2"
            onClick={onEmbedClick}
          />
        </div>
        <div>
          <MsKlimadashboardIconsNaviTeilen
            className="h-6 w-6 cursor-pointer stroke-2"
            onClick={onShareClick}
          />
        </div>
        {dataURL && (
          <Link className='fill-inherit' href={dataURL} target="_blank">
            <MsKlimadashboardIconsNaviDownload className="h-6 stroke-2" />
          </Link>
        )}
        {Icon && (
          <div className="flex w-full justify-end lg:hidden">
            <Icon
              className={cx(
                'h-[29px] w-auto flex-shrink-0 opacity-40  lg:h-[50px]',
                iconTileTitleStyle({ variant }),
              )}
            />
          </div>
          //   <Icon
          //     className={cx(
          //       'absolute right-0 top-0 h-[29px] w-auto flex-shrink-0 opacity-40 md:block md:h-[50px]',
          //     )}
          //   ></Icon>
        )}
      </div>
    )
  }

  return (
    <div className="">
      <div className="relative flex flex-col gap-2 px-2.5 pb-10 lg:hidden">
        <IconButtons />
      </div>
    </div>
  )
}
