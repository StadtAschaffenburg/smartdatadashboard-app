import axios from 'axios'

export default async function getGlobalData(id: string, default_value: any = '') {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'
  const request = await axios(`${host}content?collection=global&id=${id}`) as any

  return request?.data || default_value;
}