import { NextApiRequest, NextApiResponse } from 'next'
import getDataSource from '@/lib/api/getDataSource'

type Data = {
  message: string
  result?: any
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // get file_name from post
  const { file_name } = req.body

  if (!file_name || typeof file_name !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid file name' })
  }

  const result = await getDataSource(file_name)

  if (!result) {
    return res.status(404).json({ message: 'Source not found' })
  }

  return res.status(200).json(result)
}
