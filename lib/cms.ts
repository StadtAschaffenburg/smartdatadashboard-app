import axios from 'axios'

interface CacheEntry {
  payload: any
  version?: string
  expiry?: number
}

class APIClient {
  private static instance: APIClient
  private cache: Map<string, CacheEntry> = new Map()
  private version_cms: string = 'v0'
  private id: string

  private constructor() {
    this.id = Math.random().toString(36).substring(2, 15)
    console.log(`Creating new APIClient instance with ID: ${this.id}`)
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient()
    }
    return APIClient.instance
  }

  public async getContent(collection: string = 'tile', id: string | number | boolean = false, use_cache: boolean = true): Promise<any> {
    await this.updateContentVersion()
    const endpoint = `${this.getAPIEndpoint()}content/${collection}${id ? `/${id}` : ''}`
    const cacheData = this.cache.get(endpoint) || null
    const stale = this.version_cms !== this.cache.get(endpoint)?.version

    if (cacheData?.payload && !stale && use_cache) {
      return cacheData.payload
    }

    const payload = await this.fetchJSON(endpoint)

    if (payload !== null) {
      this.cache.set(endpoint, { payload, version: this.version_cms })
      return payload
    }

    return cacheData?.payload || false
  }

  public async getAPI(api: string, use_cache: boolean = true, lifetime: number = 6 * 60): Promise<any> {
    const endpoint = `${this.getAPIEndpoint()}${api}`
    const cacheData = this.cache.get(endpoint) || null
    const stale = Date.now() > (this.cache.get(endpoint)?.expiry || 0)

    if (cacheData?.payload && !stale && use_cache) {
      return cacheData.payload
    }

    const payload = await this.fetchJSON(endpoint)

    if (payload !== null) {
      this.cache.set(endpoint, { payload, expiry: Date.now() + lifetime * 60 * 1000 })
      return payload
    }

    return cacheData?.payload || false
  }

  private async updateContentVersion(): Promise<boolean> {
    const lifetime = Number(process.env.NEXT_PUBLIC_CMS_CACHE_DURATION) || 50
    const current_version = await this.getAPI('content/version', true, lifetime)

    if (current_version !== null && current_version !== this.version_cms) {
      console.log('💾 New content version:', this.version_cms, '=>', current_version)
      this.version_cms = current_version
      return true
    }

    return false
  }

  private async fetchJSON(endpoint: string): Promise<any> {
    const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

    try {
      const response = await axios.get(endpoint, { timeout })
      const data = response.data

      if (data?.status === 'success' && data?.payload) {
        return data.payload
      }

      return null
    } catch (error) {
      return null
    }
  }

  private getAPIEndpoint(): string {
    return process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/'
  }
}

export const client = APIClient.getInstance()