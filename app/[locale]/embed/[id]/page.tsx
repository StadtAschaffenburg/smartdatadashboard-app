import Text from '@/components/Elements/Title'
import Link from 'next/link'
import StadtLogo from '@/assets/logos/logo_ab.jpg'
import { TileType } from '@schleegleixner/react-statamic-api'
import Image from 'next/image'
import ShareTemplate from '@/components/Templates/ShareTemplate'
import Title from '@/components/Elements/Title'

export const revalidate = false

export default async function Embed(props: {
  params: Promise<{ id: TileType; locale: string }>
}) {
  const params = await props.params
  const { id, locale: site_id } = params

  return (
    <div>
      <ShareTemplate site_id={site_id} tile_id={id} />

      <div className="mt-4 flex h-full w-full flex-col justify-end gap-4 md:flex-row md:items-center">
        <Image
          alt="Logo der Stadt Aschaffenburg"
          className="h-10 w-fit"
          src={StadtLogo}
        />
        <Title as="h7" className="leading-normal" variant={'primary'}>
          Mehr Daten zum Klimaschutz und zur Klimaanpassung
          <br />
          in Aschaffenburg gibt es auf{' '}
          <Link
            className="underline"
            href="https://dashboard.aschaffenburg.de"
            target="_blank"
          >
            dashboard.aschaffenburg.de
          </Link>
        </Title>
      </div>
    </div>
  )
}
