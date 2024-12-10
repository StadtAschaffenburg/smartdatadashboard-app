import Title from '@/components/Elements/Title'
import Markdown from '@/components/Elements/Markdown'
import Background from '@/components/Layout/Background'
import Link from 'next/link'
import { Button } from './Button'

export default async function LinkTile({
  headline,
  content,
  label,
  link,
}: {
  headline?: string | null
  content?: string | null
  label?: string | null
  link?: string | null
}) {
  return (
    <div>
      <Background light rounded>
        <div className="flex w-full flex-col justify-between gap-8 p-6 lg:px-12 lg:py-8">
          {headline && (
            <Title as="h3" font="normal" variant="primary">
              {headline}
            </Title>
          )}

          {content && (
            <div className="">
              <Markdown content={content} />
            </div>
          )}

          {link && (
            <Link href={link}>
              <Button className={'w-full'} size={'lg'} variant={'primary'}>
                {label ?? 'Mehr Erfahren'}
              </Button>
            </Link>
          )}
        </div>
      </Background>
    </div>
  )
}
