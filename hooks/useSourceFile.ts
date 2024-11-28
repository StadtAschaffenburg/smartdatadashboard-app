'use client'

import { useEffect, useRef, useState } from 'react'
import { getCacheEndpoint } from '@/utils/api'

// Einzelne Datei abrufen
export const fetchData = async (file_name: string) => {
  try {
    const endpoint = getCacheEndpoint('source')
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_name }),
    })

    if (!response.ok) {
      return false
    }

    const payload = await response.json()
    return payload || false
  } catch (error) {
    console.error('Error fetching file:', file_name, error)
    return false
  }
}

// Mehrere Dateien abrufen
export const fetchAllFiles = async (file_names: string[]) => {
  const results: { [key: string]: any[] } = {}

  for (const file_name of file_names) {
    try {
      const data = await fetchData(file_name)
      if (data) {
        results[file_name] = data
      } else {
        console.warn(`No data for file: ${file_name}`)
      }
    } catch (error) {
      console.error(`Error fetching file: ${file_name}`, error)
    }
  }

  return results
}

// Hook für eine einzelne Datei
export default function useSourceFile(file_name: string) {
  const [data, setData] = useState<any[]>([])
  const isFetching = useRef(false)

  useEffect(() => {
    if (isFetching.current) {
      return
    }

    isFetching.current = true

    fetchData(file_name)
      .then(result => {
        if (result) {
          setData(result)
        }
      })
      .catch(error => {
        console.error(`Error fetching file: ${file_name}`, error)
      })
      .finally(() => {
        isFetching.current = false
      })
  }, [file_name])

  return data
}
