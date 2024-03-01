import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getCollections } from '@/utils/ContentFactory'

export async function GET() {
  const { data } = await getCollections()

  if (!data) {
    return NextResponse.json({ msg: 'No data' })
  }

  const revalidatedPaths: string[] = []

  data.forEach(({ slug }: { slug: string }) => {
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
