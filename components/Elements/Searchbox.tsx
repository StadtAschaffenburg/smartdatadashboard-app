'use client'

import { useEffect, useState } from 'react'
import { removeParameter, setTerm } from '@/utils/search'

interface SearchComponentProps {
  search_query?: string
}

function SearchComponent({ search_query = '' }: SearchComponentProps) {
  const [is_open, setIsOpen] = useState(false)
  const [search_term, setSearchTerm] = useState('')

  useEffect(() => {
    if (search_query) {
      setSearchTerm(search_query)
      setIsOpen(true)
    }
  }, [search_query])

  const handleToggle = () => {
    setIsOpen(!is_open)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search_term.length > 0 && search_term.length <= 32) {
      window.location.href = setTerm(search_term)
    }
    if (search_term.length === 0) {
      removeParameter()
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!is_open ? (
        <button
          className="rounded-full bg-blue-500 p-3 text-white shadow-lg transition duration-200 hover:bg-blue-600"
          onClick={handleToggle}
        >
          🔍
        </button>
      ) : (
        <form
          className="flex items-center rounded-full bg-white p-2 shadow-lg"
          onSubmit={handleSearch}
        >
          <input
            className="rounded-full border-none px-4 py-2 focus:outline-none"
            maxLength={32}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Suchbegriff..."
            type="text"
            value={search_term}
          />

          {search_term && (
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={clearSearch}
              type="button"
            >
              ✖️
            </button>
          )}

          <button
            className="ml-2 rounded-full bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
            type="submit"
          >
            Suchen
          </button>
        </form>
      )}
    </div>
  )
}

export default SearchComponent
