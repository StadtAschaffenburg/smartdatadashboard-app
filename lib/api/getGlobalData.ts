import getContent from '@/lib/cms'

export default async function getGlobalData(id: string, default_value: any = '') {
  const data = await getContent('global', id);

  return data || default_value;
}