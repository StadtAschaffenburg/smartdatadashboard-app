'use client'

import Spinner from '@/components/Elements/Spinner'
import { useEffect, useState } from 'react'

interface LoadingWithTimeoutProps {
  failed?: boolean
  timeoutMs?: number
  onTimeoutMessage?: string
}

export default function RequestIndicator({
  failed = false,
  timeoutMs = 5000,
  onTimeoutMessage = 'Es sind aktuell keine Daten verfügbar.',
}: LoadingWithTimeoutProps) {
  const [isTimeout, setIsTimeout] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimeout(true)
    }, timeoutMs)

    return () => clearTimeout(timeout)
  }, [timeoutMs])

  if (isTimeout || failed) {
    return (
      <div className="w-full rounded border-2 border-secondary p-3 text-center font-bold text-secondary">
        {onTimeoutMessage}
      </div>
    )
  }

  return <Spinner />
}
