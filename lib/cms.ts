import axios from 'axios'
import * as fs from 'fs'
import https from 'https'
import url from 'url';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

interface CacheEntry {
  payload: any
  version?: string
  expiry?: number
}

class APIClient {
  private static instance: APIClient
  private cache: Map<string, CacheEntry> = new Map()
  private use_named_folders: boolean = false
  private fallback_folder: string = 'fallback'
  private content_folder: string = 'content'
  private version_cms: string = this.fallback_folder
  private id: string
  private contentVersionPromise: Promise<boolean> | null = null

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
    await this.updateContentVersion() // check if the content version has changed

    // get the content from the cache or the API
    const endpoint = `${this.getAPIEndpoint()}content/${collection}${id ? `/${id}` : ''}`
    const cache_data = await this.readFile(id, collection, this.version_cms) || null

    if (cache_data && use_cache) {
      return cache_data // return the cached data
    }

    const payload = await this.fetchJSON(endpoint) // fetch the data from the API

    if (payload !== null && payload?.status === 'success') {
      // save the data to the cache
      this.saveFile(id, collection, payload)
      return payload
    }

    const fallback = this.readFile(id, collection) // return the fallback data if the API request failed

    return fallback || null // return null if no data is available
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

  // update the content version
  // if the version has changed, the cache will be cleared
  private async updateContentVersion(): Promise<boolean> {
    if (!this.contentVersionPromise) {
      // promise to get the current version of the content
      this.contentVersionPromise = (async () => {
        const lifetime = Number(process.env.NEXT_PUBLIC_CMS_CACHE_DURATION) || 50;
        const current_version = await this.getAPI('content/version', true, lifetime);
  
        if (current_version && current_version !== this.version_cms) {
          // eslint-disable-next-line no-console
          console.log('💾 New content version:', this.version_cms, '=>', current_version);
  
          try {
            if (this.version_cms !== this.fallback_folder) {
              fs.rmSync(this.getFolderPath(), { recursive: true, force: true }); // remove old cache
            }
    
            fs.renameSync(this.getFolderPath('', this.version_cms), this.getFolderPath());
            fs.mkdirSync(this.getFolderPath('', current_version), { recursive: true });
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('🚫 Error updating content version:', err);
          }
  
          this.version_cms = current_version;
          return true;
        }
  
        return false;
      })().finally(() => {
        this.contentVersionPromise = null; // reset the promise
      });
    }

    return this.contentVersionPromise;
  }

  // request data from the cache (if available)
  public async getCachedData(api: string): Promise<any> {
    const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'

    // server side rendering
    if (typeof window === 'undefined') {
      try {
        const parsedUrl = url.parse(api, true);
        const { collection, id } = parsedUrl.query;

        const response = await this.getContent(collection as string, id as string) as any
        return response || null
      } catch (error) {
        return null;
      }
    }
    
    // client request
    try {
      const response = await this.fetchJSON(host + api) as any

      return response || null
    } catch (error) {
      return null;
    }
  }

  private async fetchJSON(endpoint: string): Promise<any> {
    const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

    try {
      const response = await axios.get(endpoint.replace(/([^:]\/)\/+/g, '$1'), { 
        timeout, 
        httpsAgent: agent 
      });

      if (response?.data?.status === 'success' || response?.status === 200) {
        return response?.data?.payload ?? response?.data
      }

      return null
    } catch (error) {
      return null
    }
  }

  private getAPIEndpoint(): string {
    return process.env.NEXT_PUBLIC_SSD_API || 'https://dashboard-cms.aschaffenburg.de/api/'
  }

  private getFilePath(
    id: string | number | boolean,
    folder: string = '',
    version: string = this.fallback_folder,
  ) {
    return [
      this.getFolderPath(folder, version),
      `${id}.json`,
    ].filter(Boolean).join('/')
  }

  private getCachedDataPath() {
    return [
      process.cwd(),
      'assets',
      'cache'
    ].filter(Boolean).join('/')
  }

  private getFolderPath(
    folder: string = '',
    version: string = this.fallback_folder
  ) {
    // use named folders for the cache
    if (!this.use_named_folders && version !== this.fallback_folder) {
      version = this.content_folder
    }

    return [
      this.getCachedDataPath(),
      folder !== 'api' ? version : false,
      folder,
    ].filter(Boolean).join('/')
  }

  private async readFile(id: string | number | boolean = false, folder: string, version: string = this.fallback_folder) {
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
    const file_path = this.getFolderPath(folder, this.version_cms) + '/' + id + '.json'

    try {
      fs.mkdirSync(folder_path, { recursive: true })
      fs.writeFileSync(file_path, JSON.stringify(data, null, 2))

      console.log('💾 Saved file:', file_path)
    } catch (err) {
      console.error('🚫 Error saving file:', file_path)
    }

    return true
  }
}

export const client = APIClient.getInstance()