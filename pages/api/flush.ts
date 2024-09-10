import { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import path from 'path'

type Data = {
  message: string
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { secret } = req.query

  // Typüberprüfung für das Secret (string sicherstellen)
  if (
    typeof secret !== 'string' ||
    secret !== process.env.NEXT_PUBLIC_FLUSH_SECRET
  ) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const cacheDir = path.join(process.cwd(), 'assets/cache/content')

  try {
    if (fs.existsSync(cacheDir)) {
      fs.rmdirSync(cacheDir, { recursive: true })
    }

    fs.mkdirSync(cacheDir)

    console.log('🗑️ Cache cleared')

    return res.status(200).json({ message: 'Cache cleared' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error clearing cache', error: String(error) })
  }
}
