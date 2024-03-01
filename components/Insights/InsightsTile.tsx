import Image from 'next/image'
import Link from 'next/link'
import Title from '../Elements/Title'

type InsightsTileProps = {
  title: string
  link: string
  image: string
}

export default function InsightsTile({
  title,
  link,
  image,
}: InsightsTileProps) {
  return (
    <div className="h-full overflow-hidden rounded-[36px] bg-white md:rounded-[56px]">
      <Link href={link}>
        <div className="group flex h-full w-full flex-col  bg-secondary transition-all hover:bg-[#f6f7e6]">
          <div className="flex w-full flex-1 justify-between gap-2 py-[33px] pl-[52px] pr-12">
            <Title
              as="h6"
              className="mt-2 flex-[2_2_0%] underline group-hover:text-secondary"
              variant={'inverse'}
            >
              Kacheln filtern
            </Title>
            <Title
              as={'h4'}
              className="flex-[3_3_0%] group-hover:text-secondary"
              variant="inverse"
            >
              {title}
            </Title>
          </div>
          <div className="relative h-44 overflow-hidden">
            <Image
              alt={'Image'}
              className="object-cover transition-all group-hover:scale-105"
              fill
              src={image}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
