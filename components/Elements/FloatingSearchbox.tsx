'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Container from '@/components/Layout/Container'
import { scrollToElement } from '@/utils/scroll'
import { useSearch } from '@schleegleixner/react-statamic-api'

function SearchComponent() {
  const { searchTerm, setSearchTerm, clearSearch } = useSearch()
  const [is_open, setIsOpen] = useState(false)
  const [is_hidden, setIsHidden] = useState(false)
  const search_ref = useRef<HTMLDivElement>(null)
  const input_field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true)
      scrollToElement('tile-collection', -100)
    }
  }, [searchTerm])

  useEffect(() => {
    if (is_open && input_field.current) {
      input_field.current.focus()
    }
  }, [is_open])

  useEffect(() => {
    const handleScroll = () => {
      const tileCollection = document.getElementById('tile-collection')
      if (!tileCollection || !search_ref.current) {
        return
      }

      const collectionBottom = tileCollection.getBoundingClientRect().bottom
      const searchTop = search_ref.current.getBoundingClientRect().top

      // Check if the search field is below the tile collection
      if (searchTop > collectionBottom) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleToggle = () => {
    if (is_open && searchTerm.length > 0) {
      scrollToElement('tile-collection', -100)
    } else {
      setIsOpen(!is_open)
    }
  }

  const handleBlur = () => {
    if (searchTerm.trim() === '') {
      setIsOpen(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    scrollToElement('tile-collection', -100)
  }

  const handleClearSearch = () => {
    clearSearch()
    setIsOpen(false)
  }

  return (
    <div
      className={`pointer-events-none fixed bottom-8 left-0 right-0 z-30 transition-all ${
        is_hidden ? 'pointer-events-none opacity-0' : ''
      }`}
      ref={search_ref}
    >
      <Container className={'flex justify-end'} variant={'flat'}>
        <div className="group pointer-events-auto z-50 flex cursor-pointer items-center gap-4 overflow-hidden rounded bg-white shadow">
          {!is_open ? (
            <button
              className="pl-4 text-lg font-medium text-neutral-500 transition-all group-hover:pl-6 group-hover:pr-2"
              onClick={handleToggle}
            >
              Kacheln durchsuchen
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
                value={searchTerm}
              />
              {searchTerm && (
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={handleClearSearch}
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
