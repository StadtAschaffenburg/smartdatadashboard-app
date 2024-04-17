import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

interface CacheEntry {
  payload: any
  version?: string
  expiry?: number
}

class APIClient {
  private static instance: APIClient
  private cache: Map<string, CacheEntry> = new Map()
  private version_cms: string = 'fallback'
  private id: string

  private constructor() {
    this.id = Math.random().toString(36).substring(2, 15)
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
    const cache_data = await this.readFile(id, collection, this.version_cms) || null

    if (cache_data && use_cache) {
      return cache_data
    }

    const payload = await this.fetchJSON(endpoint)

    if (payload !== null) {
      this.saveFile(id, collection, payload)
      return payload
    }

    const fallback = this.readFile(id, collection)

    return fallback || null
  }

  public async getAPI(api: string, use_cache: boolean = true, lifetime: number = 6 * 60): Promise<any> {
    const file_name = api.replace(/\//g, '_')
    const endpoint = `${this.getAPIEndpoint()}${api}`
    const cache_data = await this.readFile(file_name, 'api') || null
    const stale = Date.now() > (cache_data?.expiry || 0)

    if (cache_data?.payload && !stale && use_cache) {
      return cache_data.payload
    }

    const payload = await this.fetchJSON(endpoint)

    if (payload !== null) {
      this.saveFile(file_name, 'api', { payload, expiry: Date.now() + lifetime * 60 * 1000 })
      return payload
    }

    return cache_data?.payload || false
  }

  private async updateContentVersion(): Promise<boolean> {
    const lifetime = Number(process.env.NEXT_PUBLIC_CMS_CACHE_DURATION) || 50
    const current_version = await this.getAPI('content/version', true, lifetime)

    if (current_version && current_version !== this.version_cms) {
      console.log('💾 New content version:', this.version_cms, '=>', current_version)

      if (this.version_cms !== 'fallback') {
        fs.rmSync(this.getFolderPath(), { recursive: true, force: true }) // remove old cache
      }

      fs.renameSync(this.getFolderPath('', this.version_cms), this.getFolderPath())
      fs.mkdirSync(this.getFolderPath('', current_version), { recursive: true })

      this.version_cms = current_version

      return true
    }

    return false
  }

  public async getCache(api: string): Promise<any> {
    const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'
    
    try {
      const response = this.fetchJSON(host + '/' + api) as any
      return response?.data || null
    } catch (error) {
      return null;
    }
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

  private getFilePath(
    id: string | number | boolean,
    folder: string = '',
    version: string = 'fallback',
  ) {
    return [
      this.getFolderPath(folder, version),
      `${id}.json`,
    ].filter(Boolean).join('/')
  }

  private getCachePath() {
    return [
      process.cwd(),
      'assets',
      'cache'
    ].filter(Boolean).join('/')
  }

  private getFolderPath(
    folder: string = '',
    version: string = 'fallback'
  ) {
    return [
      this.getCachePath(),
      folder !== 'api' ? version : false,
      folder,
    ].filter(Boolean).join('/')
  }

  private async clearCache() {
    fs.readdir(this.getCachePath(), (err, files) => {
      if (err) {
        throw err
      }
    
      files.forEach((file: string) => {
        const full_path: string = path.join(this.getCachePath(), file)
        fs.stat(full_path, (err, stats) => {
          if (err) {
            throw err
          }
    
          if (stats.isDirectory() && file !== 'fallback') {
            fs.rm(full_path, { recursive: true }, (err) => {
              if (err) {
                throw err
              }
            })
          }
        })
      })
    })
  }

  private async readFile(id: string | number | boolean = false, folder: string, version: string = 'fallback') {
    if (!id) {
      id = 'default'
    }

    try {
      const json_data = fs.readFileSync(this.getFilePath(id, folder, version), 'utf8')
      return JSON.parse(json_data)
    } catch (err) {
      return null
    }
  }
  
  private async saveFile(id: string | number | boolean = false, folder: string, data: any) {
    if (!id) {
      id = 'default'
    }

    const folder_path = this.getFolderPath(folder, this.version_cms)
    console.log('folder_path', folder_path)

    fs.mkdirSync(folder_path, { recursive: true })
    fs.writeFileSync(folder_path + '/' + id + '.json', JSON.stringify(data, null, 2))

    console.log('💾 Save file:', folder_path + '/' + id + '.json')

    return true
  }
}

export const client = APIClient.getInstance()