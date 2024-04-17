import { client } from '@/lib/cms'

export default async function getTileData(id: string, default_value: any = []) {
  const data = await client.getContent('page', id);

  return data || default_value;
}