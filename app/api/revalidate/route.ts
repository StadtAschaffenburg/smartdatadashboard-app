import revalidateCache from '@/app/actions/revalidateCache'

export async function GET() {
  await revalidateCache()
  return Response.json({ revalidated: true })
}
