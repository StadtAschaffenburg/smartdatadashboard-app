import axios from 'axios'

export default async function getLiveData(route: string, lifetime: number = 30, default_value: any = '') {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'

  try {
    const response = await axios(`${host}data?route=${route}&lifetime=${lifetime}`, { timeout: 1000 }) as any
    return response.data || default_value;
  } catch (error) {
    return default_value;
  }
}