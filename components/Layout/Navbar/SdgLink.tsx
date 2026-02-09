import Link from 'next/link'
import Image from 'next/image'
import { SdgImageMap } from '@/mapping/SdgMapping'
import { trackEvent } from 'fathom-client'

export type SdgLinkProps = {
  link: string
  active: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void
  preventDefault?: boolean
  title: string
  target: string
}

export default function SdgLink({
  link,
  active,
  onClick,
  preventDefault,
  title,
  target,
}: SdgLinkProps) {
  const image_src: string | null = SdgImageMap[target] ?? null
  const alt = `Nachhaltigkeitsziel ${title}`

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(`Link clicked: ${title || link}`)

    if (preventDefault) {
      event.preventDefault()
    }
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <Link
      className={active ? 'active' : '' + ' id-' + target}
      href={link}
      onClick={handleClick} // attach the click handler
    >
      <div className="aspect-square w-32 border-4 border-white bg-white shadow transition-all hover:scale-110 [.active_&]:scale-110 [.active_&]:border-secondary">
        {image_src && (
          <Image
            alt={alt}
            className="aspect-square w-32"
            height={256}
            src={image_src}
            width={256}
          />
        )}
      </div>
    </Link>
  )
}
