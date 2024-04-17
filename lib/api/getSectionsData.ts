import axios from 'axios'

export default async function getSectionsData(default_value: any = []) {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'
  const request = await axios(`${host}content?collection=sections`) as any

  return request?.data || default_value

}