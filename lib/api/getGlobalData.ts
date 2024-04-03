import getContent from '@/lib/cms'

export default async function getGlobalData(id: string, default_value: any = '') {
  const data = await getContent(id, 'global');

  return data || default_value;
}