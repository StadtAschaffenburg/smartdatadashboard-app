import React, { useState } from 'react'

type DimensionSelectorProps = {
  onSelect: (dimension: 'ecology' | 'society' | 'economy') => void
}

export default function DimensionSelector({
  onSelect,
}: DimensionSelectorProps) {
  const [selected_dimension, setSelectedDimension] = useState<
    'ecology' | 'society' | 'economy' | null
  >(null)

  const handleSelect = (dimension: 'ecology' | 'society' | 'economy') => {
    setSelectedDimension(dimension)
    onSelect(dimension)
  }

  return (
    <div className="flex gap-4">
      <button
        className={`rounded px-4 py-2 text-white ${
          selected_dimension === 'ecology' ? 'bg-green-700' : 'bg-green-500'
        }`}
        onClick={() => handleSelect('ecology')}
      >
        Ecology
      </button>
      <button
        className={`rounded px-4 py-2 text-white ${
          selected_dimension === 'society' ? 'bg-blue-700' : 'bg-blue-500'
        }`}
        onClick={() => handleSelect('society')}
      >
        Society
      </button>
      <button
        className={`rounded px-4 py-2 text-white ${
          selected_dimension === 'economy' ? 'bg-yellow-700' : 'bg-yellow-500'
        }`}
        onClick={() => handleSelect('economy')}
      >
        Economy
      </button>
    </div>
  )
}
