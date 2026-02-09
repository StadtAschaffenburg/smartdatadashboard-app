import Markdown from '@/components/Elements/Markdown'
import ContentBox from '@/components/Layout/ContentBox'
import ClientLink from './ClientLink'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'

export interface ContentTileProps {
  title: string
  url: string
  image?: string
  description?: string
  headline?: string | null
  content?: string | null
  label?: string | null
  link?: string | null
  colspan?: number
}

function getClassesForColspan(colspan?: number) {
  switch (colspan) {
    case 1:
      return 'xl:col-span-1'
    case 2:
      return 'xl:col-span-2'
    case 3:
      return 'xl:col-span-3'
    case 4:
      return 'xl:col-span-4'
    case 5:
      return 'xl:col-span-5'
    case 6:
      return 'xl:col-span-6'
    case 7:
      return 'xl:col-span-7'
    case 8:
      return 'xl:col-span-8'
    case 9:
      return 'xl:col-span-9'
    case 10:
      return 'xl:col-span-10'
    case 11:
      return 'xl:col-span-11'
    case 12:
      return 'xl:col-span-12'
    default:
      return 'col-span-full'
  }
}

export default function ContentTile({
  headline,
  content,
  label,
  link,
  colspan,
}: ContentTileProps) {
  return (
    <div className={cx('col-span-full', getClassesForColspan(colspan))}>
      <ContentBox>
        <div className="flex flex-col gap-4">
          {headline && (
            <Title as="h3" margin="none">
              {headline}
            </Title>
          )}

          {content && (
            <div className="">
              <Markdown content={content} />
            </div>
          )}
        </div>

        {link && <ClientLink label={label ?? 'Mehr Erfahren'} link={link} />}
      </ContentBox>
    </div>
  )
}
