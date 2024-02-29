'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function AnimatedPage({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      initial={{ y: 50, opacity: 0 }}
      key={pathname}
    >
      {children}
    </motion.div>
  )
}
