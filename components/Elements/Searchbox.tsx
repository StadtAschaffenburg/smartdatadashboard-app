'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Container from '@/components/Layout/Container'
import Searchfield from '@/components/Elements/Searchfield'

function SearchComponent() {
  const [search_term, setSearchTerm] = useState('')

  const searchParams = useSearchParams()
  const search_query = searchParams?.get('suche') || null

  useEffect(() => {
    if (search_term.length > 2 && search_term.length <= 128) {
      updateQueryString('suche', search_term)
    } else {
      updateQueryString('suche', null)
    }
  }, [search_term])

  useEffect(() => {
    if (search_query) {
      setSearchTerm(search_query)
    }
  }, [search_query])

  const updateQueryString = (key: string, value: string | null) => {
    const url = new URL(window.location.href)
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
    window.history.pushState({}, '', url.toString())
  }

  const clearSearch = () => {
    if (search_query) {
      setSearchTerm('')
      updateQueryString('suche', null)
    }
  }

  return (
    <div className={'group w-full'}>
      <Container className={'flex'} variant={'flat'}>
        <Searchfield
          catchCursor={true}
          classes="mt-8 border-2 border-primary"
          clearSearch={clearSearch}
          handleChange={e => setSearchTerm(e.target.value)}
          handleSubmit={e => e.preventDefault()}
          search_term={search_term}
        />
      </Container>
    </div>
  )
}

export default SearchComponent
