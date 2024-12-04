'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Container from '@/components/Layout/Container'
import { scrollToElement } from '@/utils/scroll'

function SearchComponent() {
  const [is_open, setIsOpen] = useState(false)
  const [search_term, setSearchTerm] = useState('')
  const input_field = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const search_query = searchParams?.get('suche') || null

  useEffect(() => {
    if (search_query) {
      setSearchTerm(search_query)
      setIsOpen(true)

      scrollToElement('tile-collection', -100)
    }
  }, [search_query])

  useEffect(() => {
    if (is_open && input_field.current) {
      input_field.current.focus()
    }
  }, [is_open])

  const updateQueryString = (key: string, value: string | null) => {
    const url = new URL(window.location.href)
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
    window.history.pushState({}, '', url.toString())
  }

  const handleToggle = () => {
    if (is_open && search_term.length > 0) {
      handleSearch(new Event('submit') as unknown as React.FormEvent)
    } else {
      setIsOpen(!is_open)
    }
  }

  const handleBlur = () => {
    if (search_term.trim() === '') {
      setIsOpen(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search_term.length > 0 && search_term.length <= 32) {
      updateQueryString('suche', search_term)
    } else if (search_term.length === 0) {
      updateQueryString('suche', null)
    }

    scrollToElement('tile-collection', -100)
  }

  const clearSearch = () => {
    if (search_query) {
      setSearchTerm('')
      updateQueryString('suche', null)
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-30 transition-all [.cookie-consent_&]:bottom-40">
      <Container className={'flex justify-end'} variant={'flat'}>
        <div className="group pointer-events-auto z-50 flex cursor-pointer items-center gap-4 overflow-hidden rounded bg-white shadow">
          {!is_open ? (
            <button
              className="pl-4 text-lg font-medium text-neutral-500 transition-all group-hover:pl-6 group-hover:pr-2"
              onClick={handleToggle}
            >
              Suche
            </button>
          ) : (
            <form
              className="align-center flex h-full items-center rounded-full py-2 pl-6 text-lg font-medium"
              onSubmit={handleSearch}
            >
              <input
                className="transition-all placeholder:text-neutral-500 focus:outline-none"
                maxLength={32}
                onBlur={handleBlur}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Suchbegriff..."
                ref={input_field}
                type="text"
                value={search_term}
              />
              {search_query && (
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={clearSearch}
                  type="button"
                >
                  <XMarkIcon className="w-10 stroke-neutral-500 p-2 transition-all hover:stroke-primary" />
                </button>
              )}
            </form>
          )}
          <div
            className="align-center flex w-14 bg-primary p-3"
            onClick={handleToggle}
          >
            <MagnifyingGlassIcon className="w-8 stroke-white group-hover:stroke-primary-light" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SearchComponent
