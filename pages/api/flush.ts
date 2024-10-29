import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret } from '@/utils/api'
import { flushContentCache } from '@/lib/cache'

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

  await flushContentCache()

  return res.status(200).json({ message: 'Cache cleared' })
}
