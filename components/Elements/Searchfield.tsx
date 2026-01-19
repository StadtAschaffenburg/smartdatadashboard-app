'use client'

import React, { useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { cx } from 'class-variance-authority'

function SearchfieldComponent({
  catchCursor = false,
  classes = '',
  clearSearch,
  handleChange,
  handleSubmit,
  name = 'suche',
  search_term,
}: {
  catchCursor?: boolean
  classes?: string
  clearSearch?: (() => void) | null
  handleChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit?: (_event: React.FormEvent<HTMLFormElement>) => void
  name?: string
  search_term?: string
}) {
  const input_field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!catchCursor) {
      return
    }
    input_field.current?.focus()
  }, [])

  return (
    <div
      className={cx(
        classes,
        'pointer-events-auto flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded bg-white focus:border-secondary',
      )}
    >
      <form
        action="suche"
        className="align-center flex h-full flex-grow items-center text-lg font-medium"
        onSubmit={handleSubmit || (() => {})}
      >
        <input
          autoComplete="off"
          className="placeholder:text-grey-700 w-full py-2 pl-6 transition-all focus:outline-none md:pl-12 lg:pl-8 xl:pl-12"
          name="suche"
          onChange={handleChange || (() => {})}
          placeholder="Wonach suchen Sie?"
          ref={input_field}
          type="text"
          value={search_term}
        />
        {search_term && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={clearSearch || (() => {})}
            type="button"
          >
            <XMarkIcon className="w-10 stroke-neutral-500 p-2 transition-all hover:stroke-primary" />
          </button>
        )}
        <button
          aria-label="Suche"
          className="flex w-14 p-3 hover:opacity-80"
          type="submit"
        >
          <MagnifyingGlassIcon className={'w-8 stroke-primary'} />
        </button>
      </form>
    </div>
  )
}

export default SearchfieldComponent
