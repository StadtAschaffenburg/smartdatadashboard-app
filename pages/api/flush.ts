import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret } from '@/utils/api'
import { flushCache } from '@/lib/cache'
import { getCollection, getContent, getSourceFile } from '@/lib/cms'

type Data = {
  message: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!checkSecret(req)) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  await flushCache()

  // rebuild collections
  const collections = ['tiles', 'sources', 'pages', 'sections']
  const data: any = {}

  for (const collection of collections) {
    data[collection] = await getCollection(collection)
  }

  // rebuild content (TBD)
  for (const tile of data.tiles) {
    const data = getContent('tile', tile.tile_id)
  }
  for (const page of data.pages) {
    const data = getContent('page', page.slug)
  }
  for (const source of data.sources) {
    const data = getSourceFile(source.file_name)
  }

  return res.status(200).json({ message: 'Cache cleared' })
}
