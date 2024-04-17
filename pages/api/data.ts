import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/lib/cms'

interface DataResponse {
  content?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataResponse>) {
  const route = req.query.route as string;

  const data = await client.getAPI(route);
  
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ });
  }
}