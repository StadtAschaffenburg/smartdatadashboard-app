import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret } from '@/utils/api'
import { getSourceFile } from '@/lib/cms'

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

  // get file_name from post
  const { file_name } = req.body

  if (!file_name || typeof file_name !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid file name' })
  }

  const result = getSourceFile(file_name)

  if (!result) {
    return res.status(404).json({ message: 'Source not found' })
  }

  return res.status(200).json({ message: 'Source updated' })
}
