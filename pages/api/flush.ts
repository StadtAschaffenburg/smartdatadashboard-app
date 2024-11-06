'use server'

import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret } from '@/utils/api'
import { flushCache } from '@/lib/cache'
import { getCollection, getContent, getSourceFile } from '@/lib/cms'
import { getCacheEndpoint } from '@/utils/api'

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
  try {
    for (const tile of data.tiles) {
      getContent('tile', tile.tile_id)
    }
    for (const page of data.pages) {
      getContent('page', page.slug)
    }
    for (const source of data.sources) {
      getSourceFile(source.file_name)
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error rebuilding content', error: String(error) })
  }

  // revalidate all pages
  try {
    const response = await fetch(getCacheEndpoint('revalidate'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: 'Revalidation failed' })
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error triggering revalidation', error: String(error) })
  }

  return res
    .status(200)
    .json({ message: 'Cache cleared, content rebuild & revalidated' })
}
