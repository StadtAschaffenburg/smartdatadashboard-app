import path from 'path'
import fs from 'fs'
import Papa from 'papaparse'

export default async function getDataFile(file: string) {
  const file_path = path.join(process.cwd(), 'assets/data', file)

  if (!fs.existsSync(file_path)) {
    throw new Error(`Data source not found: ${file}`)
  }

  const file_data = fs.readFileSync(file_path, 'utf8')

  if (!file_data) {
    return false
  }

  const ext = path.extname(file).toLowerCase()

  if (ext === '.csv') {
    return Papa.parse(file_data, { header: true }).data
  } else if (ext === '.json') {
    return JSON.parse(file_data)
  }

  return false
}
