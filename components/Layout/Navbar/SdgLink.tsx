import Link from 'next/link'
import Image from 'next/image'
import { SdgImageMap } from '@/mapping/SdgMapping'

export type SdgLinkProps = {
  link: string
  active: boolean
  onClick?: () => void
  target: string
  title: string
  slug: string
}

export default function SdgLink({
  link,
  active,
  onClick,
  target,
  title,
  slug
}: SdgLinkProps) {
  const image_src: string | null = SdgImageMap[target] ?? null
  const alt = `Nachhaltigkeitsziel ${title}`

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault() // prevent link navigation
      onClick()
    }
  }

  return (
    <Link
      className={active ? 'active' : '' + ' id-' + slug}
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
