import Title from '@/components/Elements/Title'
import Markdown from '@/components/Elements/Markdown'
import Background from '@/components/Layout/Background'
import Link from 'next/link'
import { Button } from './Button'

export default async function LinkTile({
  headline,
  content,
  link,
}: {
  headline?: string | null
  content?: string | null
  link?: string | null
}) {
  return (
    <Background light rounded>
      <div className="flex w-full flex-col justify-between gap-6 px-4 py-8 lg:px-12 lg:py-8">
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
            <Button size={'lg'} variant={'primary'}>
              Mehr Erfahren
            </Button>
          </Link>
        )}
      </div>
    </Background>
  )
}
