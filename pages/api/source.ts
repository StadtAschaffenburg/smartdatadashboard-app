import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret, getCMSEndpoint } from '@/utils/api'
import { fetchFile } from '@/lib/cms'
import { writeFile } from '@/lib/cache'
import { getDataPath } from '@/utils/filesystem'
import path from 'path'

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

  // security: sanitize file_name (no directory traversal)
  const sanitized_file_name = path.basename(file_name)

  const endpoint = getCMSEndpoint(path.join('source', sanitized_file_name))
  const content = await fetchFile(endpoint)

  if (!content) {
    return res.status(404).json({ message: 'File not found' })
  }

  await writeFile(getDataPath(sanitized_file_name), content)

  return res.status(200).json({ message: 'Source updated' })
}
