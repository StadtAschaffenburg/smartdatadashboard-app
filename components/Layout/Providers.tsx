'use client'

import { AnimatePresence } from 'framer-motion'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  )
}
