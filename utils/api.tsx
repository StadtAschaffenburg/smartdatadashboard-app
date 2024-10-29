import { NextApiRequest } from 'next'

const default_cms = 'https://dashboard-cms.aschaffenburg.de/api/'

// checkSecret with req parameter
export function checkSecret(req: NextApiRequest): boolean {
  const { secret } = req.query
  const api_secret = process.env.NEXT_PUBLIC_API_SECRET

  if (!api_secret) {
    return false
  }

  return typeof secret === 'string' && secret === api_secret
}

// getCMSEndpoint with url parameter (default: '')
export function getCMSEndpoint(url = ''): string {
  const api = process.env.NEXT_PUBLIC_SSD_API || default_cms
  return api + url
}

// getCMSEndpoint with url parameter (default: '')
export function getCacheEndpoint(url = ''): string {
  const api = process.env.NEXT_PUBLIC_CACHE_ROUTE || default_cms
  return api + url
}
