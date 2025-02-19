'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { useState } from 'react'
import styles from './Collapsible.module.css'

type CollapsibleProps = {
  trigger?: React.ReactElement
  children: React.ReactElement
  isOpen?: boolean
  onOpenChange?: (_open: boolean) => void
}

export default function Collapsible({
  trigger,
  children,
  isOpen,
  onOpenChange,
}: CollapsibleProps) {
  const [open, setOpen] = useState(isOpen ?? false)

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen)
    } else {
      setOpen(newOpen)
    }
  }

  const trigger_class = isOpen ? 'collapsible-open' : 'collapsible-closed'

  return (
    <div className={trigger_class}>
      <CollapsiblePrimitive.Root
        onOpenChange={handleOpenChange}
        open={isOpen ?? open}
      >
        <CollapsiblePrimitive.Trigger asChild>
          {trigger}
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content className={styles.CollapsibleContent}>
          {children}
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    </div>
  )
}
