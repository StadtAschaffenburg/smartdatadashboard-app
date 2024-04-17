import axios from 'axios'

export default async function getLiveData(route: string, lifetime: number = 30, default_value: any = '') {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'
  const request = await axios(`${host}data?route=${route}&lifetime=${lifetime}`) as any

  return request?.data || default_value;
}