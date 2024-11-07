'use server'

import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret } from '@/utils/api'
import { flushCache, revalidateContent } from '@/lib/cache'
import { rebuildCache } from '@/lib/cms'

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

  if (!(await flushCache())) {
    return res.status(500).json({ message: 'Error flushing cache' })
  }

  if (!(await rebuildCache())) {
    return res.status(500).json({ message: 'Error rebuilding cache' })
  }

  if (!(await revalidateContent())) {
    return res.status(500).json({ message: 'Error revalidating content' })
  }

  return res
    .status(200)
    .json({ message: 'Cache cleared, content rebuild & revalidated' })
}
