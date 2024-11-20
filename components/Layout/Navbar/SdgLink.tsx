import Link from 'next/link'
import Image from 'next/image'

const sdgImages = [
  require('@/assets/icons/SDG/SDG-icon-DE-01.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-02.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-03.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-04.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-05.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-06.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-07.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-08.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-09.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-10.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-11.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-12.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-13.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-14.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-15.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-16.jpg').default.src,
  require('@/assets/icons/SDG/SDG-icon-DE-17.jpg').default.src,
]

export type SdgLinkProps = {
  index: number
  link: string
  active: boolean
  onClick?: () => void
}

export default function SdgLink({
  index,
  link,
  active,
  onClick,
}: SdgLinkProps) {
  const imageSrc = sdgImages[index]
  const alt = `Nachhaltigkeitsziel Nummer ${index}`

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault() // Prevent link navigation
      onClick()
    }
  }

  return (
    <Link
      className={active ? 'active' : ''}
      href={link}
      onClick={handleClick} // Attach the click handler
    >
      <div className="aspect-square w-32 border-4 border-white bg-white shadow transition-all hover:scale-110 [.active_&]:scale-110 [.active_&]:border-secondary">
        <Image
          alt={alt}
          className="aspect-square w-32"
          height={256}
          src={imageSrc}
          width={256}
        />
      </div>
    </Link>
  )
}
