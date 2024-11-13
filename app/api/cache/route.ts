import * as fs from 'fs'
import { getCachePath } from '@/utils/filesystem'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const content_type = searchParams.get('content_type')
  let folder = searchParams.get('folder') || false
  let id = searchParams.get('id') || false

  if (folder === 'false') {
    folder = false
  }
  if (id === 'false') {
    id = false
  }

  const ignore_stale = searchParams.get('ignore_stale') === 'true'

  try {
    const cache_path = getCachePath(content_type, folder, id)
    const cache_data = fs.readFileSync(cache_path, 'utf8')
    const json_data = JSON.parse(cache_data)

    const stale = json_data.expiry
      ? Date.now() > (json_data?.expiry || 0)
      : false
    if (stale && !ignore_stale) {
      return new Response(JSON.stringify({ data: null }), { status: 200 })
    }

    return new Response(JSON.stringify(json_data.payload ?? json_data), {
      status: 200,
    })
  } catch (err: any) {
    return new Response(JSON.stringify(null), {
      status: 200,
    })
  }
}
