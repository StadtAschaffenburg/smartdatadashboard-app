'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { TileDatasourceType } from '@schleegleixner/react-statamic-api'

export default function SourceToggle({
  datasources,
  onChange,
  variant = 'primary',
}: {
  datasources: TileDatasourceType[] | null
  onChange: (_id: number) => void
  variant: string
}) {
  if (!datasources || datasources.length < 2) {
    return null
  }

  return (
    <div className="mb-4 w-full">
      <ToggleGroup
        items={datasources.map((ds, index) => ({
          element: ds.label ?? ds.file_name,
          value: index.toString(),
        }))}
        label="Datenquellen auswählen"
        onChange={(value: string) => {
          const index = parseInt(value, 10)
          if (!isNaN(index)) {
            onChange(index)
          }
        }}
        variant={variant}
      />
    </div>
  )
}
