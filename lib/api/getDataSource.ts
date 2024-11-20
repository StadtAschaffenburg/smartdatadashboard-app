import path from 'path'
import fs from 'fs'
import Papa from 'papaparse'

export default async function getDataSource(file: string) {
  const paths = ['assets/data', 'assets/cache/source']

  for (const p of paths) {
    const file_path = path.join(process.cwd(), p, file)

    if (!fs.existsSync(file_path)) {
      continue
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
  }

  return false
}
