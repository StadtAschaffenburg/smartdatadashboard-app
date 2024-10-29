import * as fs from 'fs'
import path from 'path'
import { getFilePath } from '@/utils/filesystem'

// read the data from the cache
export async function readCache(
  id: string | number | boolean = false,
  folder: string,
  fallback: boolean = false,
  ignore_stale: boolean = false,
) {
  try {
    const cache_data = fs.readFileSync(
      getFilePath(id, folder, fallback),
      'utf8',
    )
    const json_data = JSON.parse(cache_data)

    // check if the data is stale
    const stale = json_data.expiry
      ? Date.now() > (json_data?.expiry || 0)
      : false
    if (stale && !ignore_stale) {
      return null
    }

    return json_data.payload ?? json_data
  } catch (err) {
    return null
  }
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
  folder_path: string,
  id: string | number | boolean,
  data: any,
) {
  await writeCache(getFilePath(id, folder_path), data) // write the data to the cache
  await writeCache(getFilePath(id, folder_path, true), data) // and write it to the fallback cache
}

// write API data to the cache
export async function writeApiCache(
  file_name: string,
  data: any,
  lifetime: number = 6 * 60,
) {
  await writeCache(getFilePath(file_name, 'api'), data, lifetime) // write the data to the cache
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

    console.log('💾 Saved file:', file_path)

    return true
  } catch (error) {
    console.error('🚫 Error saving file:', error)
    return false
  }
}

// clear the content cache
export async function flushContentCache() {
  const cache_dir = path.join(process.cwd(), 'assets/cache/content')

  if (fs.existsSync(cache_dir)) {
    fs.rmdirSync(cache_dir, { recursive: true })
  }

  fs.mkdirSync(cache_dir)

  return true
}
