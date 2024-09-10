import axios from 'axios'
import * as fs from 'fs'
import https from 'https'
import url from 'url'

const agent = new https.Agent({
  rejectUnauthorized: false,
})

class APIClient {
  private static instance: APIClient
  private use_versioned_folders: boolean = false
  private fallback_folder: string = 'fallback'
  private content_folder: string = 'content'
  private contentVersionPromise: Promise<boolean> | null = null

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient()
    }
    return APIClient.instance
  }

  public async getContent(
    collection: string = 'tile',
    id: string | number | boolean = false,
    use_cache: boolean = true,
  ): Promise<any> {
    // get the content from the cache or the API
    const endpoint = `${this.getAPIEndpoint()}content/${collection}${
      id ? `/${id}` : ''
    }`
    const cache_data = (await this.readFile(id, collection)) || null

    if (cache_data && use_cache) {
      return cache_data // return the cached data
    }

    const payload = await this.fetchJSON(endpoint) // fetch the data from the API

    if (payload && payload?.status === 'success') {
      // save the data to the cache
      this.saveFile(id, collection, payload)
      return payload
    }

    const fallback = this.readFile(id, collection, true) // return the fallback data if the API request failed

    return fallback || null // return null if no data is available
  }

  public async getAPI(
    api: string,
    use_cache: boolean = true,
    lifetime: number = 6 * 60,
  ): Promise<any> {
    const file_name = api.replace(/\//g, '_')
    const endpoint = `${this.getAPIEndpoint()}${api}`
    const cache_data = (await this.readFile(file_name, 'api')) || null
    const stale = Date.now() > (cache_data?.expiry || 0)

    if (cache_data?.payload && !stale && use_cache) {
      return cache_data.payload
    }

    const payload = await this.fetchJSON(endpoint)

    if (payload !== null) {
      // save the data to the cache
      this.saveFile(file_name, 'api', {
        payload,
        expiry: Date.now() + lifetime * 60 * 1000,
      })
      return payload
    }

    return cache_data?.payload || false
  }

  // request data from the cache (if available)
  public async getCachedData(api: string): Promise<any> {
    const host =
      process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'

    // server side rendering
    if (typeof window === 'undefined') {
      try {
        const parsedUrl = url.parse(api, true)
        const { collection, id } = parsedUrl.query

        const response = (await this.getContent(
          collection as string,
          id as string,
        )) as any
        return response || null
      } catch (error) {
        return null
      }
    }

    // client request
    try {
      const response = (await this.fetchJSON(host + api)) as any

      return response || null
    } catch (error) {
      return null
    }
  }

  // fetch the JSON data from the API
  // return null if the request failed or the data is not available
  private async fetchJSON(endpoint: string): Promise<any> {
    const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

    try {
      const response = await axios.get(endpoint.replace(/([^:]\/)\/+/g, '$1'), {
        timeout,
        httpsAgent: agent,
      })

      if (response?.data?.status === 'success' || response?.status === 200) {
        return response?.data?.payload ?? response?.data
      }

      return null
    } catch (error) {
      return null
    }
  }

  // get the API endpoint
  private getAPIEndpoint(): string {
    return (
      process.env.NEXT_PUBLIC_SSD_API ||
      'https://dashboard-cms.aschaffenburg.de/api/'
    )
  }

  // get the file path for the cache
  private getFilePath(
    id: string | number | boolean,
    folder: string = '',
    fallback: boolean = false,
  ) {
    return [this.getFolderPath(folder, fallback), `${id}.json`]
      .filter(Boolean)
      .join('/')
  }

  private getCachedDataPath() {
    return [process.cwd(), 'assets', 'cache'].filter(Boolean).join('/')
  }

  private getFolderPath(folder: string = '', fallback: boolean = false) {
    // if api folder, save directly to the cache folder
    // otherwise, save to the content folder (or the fallback folder)
    const storage_folder =
      folder !== 'api'
        ? !fallback
          ? this.content_folder
          : this.fallback_folder
        : false

    return [this.getCachedDataPath(), storage_folder, folder]
      .filter(Boolean)
      .join('/')
  }

  // read the data from the cache
  private async readFile(
    id: string | number | boolean = false,
    folder: string,
    fallback: boolean = false,
  ) {
    if (!id) {
      id = 'default'
    }

    try {
      const json_data = fs.readFileSync(
        this.getFilePath(id, folder, fallback),
        'utf8',
      )
      return JSON.parse(json_data)
    } catch (err) {
      return null
    }
  }

  // save the data to the cache
  // the data will be saved to the current version and the fallback folder
  // the fallback folder is used if the current version is not available and the API request failed
  private async saveFile(
    id: string | number | boolean = false,
    folder: string,
    data: any,
  ) {
    if (!id) {
      id = 'default'
    }

    this.writeFile(this.getFolderPath(folder), id, data)

    if (folder !== 'api') {
      // also save the data to the fallback folder
      this.writeFile(this.getFolderPath(folder, true), id, data)
    }

    return true
  }

  private async writeFile(
    folder_path: string,
    id: string | number | boolean,
    data: any,
  ) {
    const file_path = folder_path + '/' + id + '.json'

    try {
      fs.mkdirSync(folder_path, { recursive: true })
      fs.writeFileSync(file_path, JSON.stringify(data, null, 2))

      console.log('💾 Saved file:', file_path)
      return true
    } catch (err) {
      console.error('🚫 Error saving file:', file_path)
      return false
    }
  }
}

export const client = APIClient.getInstance()
