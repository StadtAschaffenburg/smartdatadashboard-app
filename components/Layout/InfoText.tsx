import React, { useEffect, useState } from 'react'
import Title from '@/components/Elements/Title'
import { getJSON } from '@/utils/ContentFactory'

export default function SectionText() {
  const [infotext, setInfotext] = useState(null)

  useEffect(() => {
    const fetchInfotext = async () => {
      const api =
        (process.env.NEXT_PUBLIC_SSD_API ||
          'http://smartcitydashboard-cms.test/api/') + 'content/global/infotext'
      const data = await getJSON(api)

      if (data?.status === 'success') {
        setInfotext(data?.payload)
      }
    }

    fetchInfotext()
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
