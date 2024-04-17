import axios from 'axios'

export default async function getGlobalData(id: string, default_value: any = '') {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'

  try {
    const response = await axios(`${host}content?collection=global&id=${id}`, { timeout: 1000 }) as any
    return response.data || default_value;
  } catch (error) {
    return default_value;
  }
}