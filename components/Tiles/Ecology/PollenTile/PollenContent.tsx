'use client'

import PollenEntry from './PollenEntry'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import useApi from '@/hooks/useApi'
import { PollenResult } from './dt'

export default function PollenContent() {
  const readings = useApi('dwd/pollen', 60 * 2) as PollenResult[]

  if (!readings || !readings.length) {
    return <RequestIndicator />
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {readings.map(
            ({ key, label, value, integer }) =>
              value !== null && (
                <PollenEntry
                  integer={integer}
                  key={key}
                  title={label}
                  value={value}
                />
              ),
          )}
        </div>
      </div>
    </div>
  )
}
