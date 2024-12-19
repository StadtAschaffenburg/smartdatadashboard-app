import * as fs from 'fs'
import path from 'path'
import { getCachePath } from '@/utils/filesystem'
import { getCacheEndpoint } from '@/utils/api'

// read the data from the cache
export async function readCache(
  content_type: string,
  folder: string | boolean = false,
  id: string | number | boolean = false,
  ignore_stale: boolean = false,
) {
  try {
    const response = await fetch(
      getCacheEndpoint('cache') +
        `?content_type=${content_type}&folder=${folder}&id=${id}&ignore_stale=${ignore_stale}`,
      { next: { tags: ['cached_data'] } },
    )
    const cache_data = await response.text()
    const json_data = JSON.parse(cache_data)

    return json_data.payload ?? json_data
  } catch (err) {
    return null
  }
}

export async function readApiCache(file_name: string) {
  return readCache('api', false, file_name)
}

// write data to the cache
async function writeCache(
  file_path: string,
  data: any,
  lifetime: number | boolean = false,
) {
  interface CachePayload {
    payload: any
    expiry: number | false
  }

  const payload: CachePayload = {
    payload: data,
    expiry: false,
  }

  if (lifetime && typeof lifetime === 'number') {
    payload.expiry = Date.now() + lifetime * 60 * 1000
  }

  await writeFile(file_path, payload)
}

// write content data to the cache
export async function writeContentCache(
  content_type: string,
  folder_path: string | boolean = false,
  id: string | number | boolean = false,
  data: any,
  lifetime: number | boolean = false,
) {
  await writeCache(getCachePath(content_type, folder_path, id), data, lifetime) // write the data to the cache
}

// write API data to the cache
export async function writeApiCache(
  file_name: string,
  data: any,
  lifetime: number = 6 * 60,
) {
  writeContentCache('api', false, file_name, data, lifetime)
}

// write data to a file
export async function writeFile(file_path: string, data: any) {
  try {
    // ensure the directory exists, create if it doesn't
    await fs.promises.mkdir(path.dirname(file_path), { recursive: true })

    // convert data to string if it's not already
    const file_data = typeof data === 'string' ? data : JSON.stringify(data)

    // write data to the file
    await fs.promises.writeFile(file_path, file_data, 'utf8')

    // eslint-disable-next-line no-console
    console.log('💾 Saved file:', file_path.split('/assets/')[1])

    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('🚫 Error saving file:', error)
    return false
  }
}

// clear the content cache
export async function flushCache() {
  const wipe_dirs = [
    'cache/api',
    'cache/collection',
    'cache/content',
    'cache/source',
    'cache/global',
  ]

  for (const dir of wipe_dirs) {
    const cache_dir = path.join(process.cwd(), 'assets', dir)

    if (fs.existsSync(cache_dir)) {
      fs.rmdirSync(cache_dir, { recursive: true })
    }

    fs.mkdirSync(cache_dir)
  }

  return true
}

type RevalidateResult = {
  success: boolean
  error?: string
}

export async function revalidateContent(): Promise<RevalidateResult> {
  try {
    const response = await fetch(getCacheEndpoint('revalidate'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to revalidate. Status: ${response.status}`,
      }
    }

    return { success: true }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
