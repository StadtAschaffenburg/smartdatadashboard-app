import React, { useEffect, useRef, useState } from 'react'
import Title from '@/components/Elements/Title'
import getGlobalData from '@/lib/api/getGlobalData'

export default function SectionText() {
  const [infotext, setInfotext] = useState<string | null>(null)
  const isFetching = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) {
        return
      }
      isFetching.current = true

      try {
        const data = await getGlobalData('infotext')
        setInfotext(data)
      } catch (error) {
      } finally {
        isFetching.current = false
      }
    }

    fetchData()
  }, [])

  if (infotext) {
    return (
      <div className="lg:w-2/3 2xl:w-1/3">
        <Title as={'h5'} variant={'inverse'}>
          {infotext}
        </Title>
      </div>
    )
  }

  return <p>Lade...</p>
}
