import axios from 'axios'

export default async function getSectionsData(default_value: any = []) {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'
  
  try {
    const response = await axios(`${host}content?collection=sections`, { timeout: 1000 }) as any
    return response.data || default_value;
  } catch (error) {
    return default_value;
  }
}