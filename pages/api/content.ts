import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/lib/cms'
import NextCors from 'nextjs-cors';

interface DataResponse {
  content?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataResponse>) {
  const id = req.query.id as string;
  const collection = req.query.collection as string;

  const data = await client.getContent(collection, id);

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  });
  
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ });
  }
}