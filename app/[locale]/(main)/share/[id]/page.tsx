import { TileType } from '@schleegleixner/react-statamic-api'
import ShareTemplate from '@/components/Templates/ShareTemplate'

export const revalidate = false

export default async function Share(props: {
  params: Promise<{ id: TileType; locale: string }>
}) {
  const params = await props.params
  const { id, locale: site_id } = params

  return <ShareTemplate site_id={site_id} tile_id={id} />
}
