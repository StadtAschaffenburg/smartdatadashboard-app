const api_folder = 'api'
const content_folder = 'content'
const fallback_folder = 'fallback'

function getCachedContentPath() {
  return [process.cwd(), 'assets', 'cache'].filter(Boolean).join('/')
}

export function getDataPath(filename: string | boolean = false) {
  return [process.cwd(), 'assets', 'data', filename].filter(Boolean).join('/')
}

export function getFolderPath(folder: string = '', fallback: boolean = false) {
  // if api folder, save directly to the cache/api folder
  // otherwise, save to the content sub-folder
  const storage_folder =
    folder !== api_folder
      ? !fallback
        ? content_folder
        : fallback_folder
      : false

  return [getCachedContentPath(), storage_folder, folder]
    .filter(Boolean)
    .join('/')
}

// get the file path for the cache
export function getFilePath(
  id: string | number | boolean,
  folder: string = '',
  fallback: boolean = false,
) {
  return [getFolderPath(folder, fallback), `${id || 'default'}.json`]
    .filter(Boolean)
    .join('/')
}
