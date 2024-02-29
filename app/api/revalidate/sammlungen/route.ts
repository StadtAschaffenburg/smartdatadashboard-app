import directus, {
  collectionsName,
  ENV_DIRECTUS_ITEM_STATUS,
} from '@/lib/directus'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['slug'],
    filter: {
      status: ENV_DIRECTUS_ITEM_STATUS,
    },
  })

  if (!data) {
    return NextResponse.json({ msg: 'No data' })
  }

  const revalidatedPaths: string[] = []

  data.forEach(({ slug }) => {
    const path = `/sammlung/${slug}`
    revalidatedPaths.push(path)
    revalidatePath(path)
  })

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    paths: revalidatedPaths,
  })
}
