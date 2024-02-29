'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { cva, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import Link from 'next/link'

const backStyle = cva('flex items-center space-x-2', {
  variants: {
    variant: {
      primary: 'text-primary',
      inverse: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface BackProps extends VariantProps<typeof backStyle> {}

export default function Back({ variant }: BackProps) {
  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      initial={{ x: -50, opacity: 0 }}
    >
      <Link className={backStyle({ variant })} href="/">
        <ArrowLeftIcon className="h-5"></ArrowLeftIcon>
        <span className="underline">Zurück</span>
      </Link>
    </motion.div>
  )
}
