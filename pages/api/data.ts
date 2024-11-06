import type { NextApiRequest, NextApiResponse } from 'next'
import { getAPI } from '@/lib/cms'
import NextCors from 'nextjs-cors'

interface DataResponse {
  content?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>,
) {
  const route = req.query.route as string
  const lifetime = parseInt(req.query.lifetime as string, 10)

  if (!route) {
    return res.status(404).json({ content: 'Not found' })
  }

  const data = await getAPI(route, true, lifetime)

  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })

  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({})
  }
}
