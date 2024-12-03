'use client'

import PollenEntry from './PollenEntry'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import useApi from '@/hooks/useApi'
import { PollenResult } from './dt'

export default function PollenContent() {
  const { data: readings, status } = useApi<PollenResult[]>('dwd/pollen', 10)

  if (!readings || status !== 'success') {
    return <RequestIndicator failed={status === 'error'} />
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
