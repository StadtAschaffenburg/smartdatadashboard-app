'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { useState } from 'react'
import styles from './Collapsible.module.css'

type CollapsibleProps = {
  trigger: React.ReactElement
  children: React.ReactElement
}

export default function Collapsible({ trigger, children }: CollapsibleProps) {
  const [open, setOpen] = useState(false)

  return (
    <CollapsiblePrimitive.Root onOpenChange={setOpen} open={open}>
      <CollapsiblePrimitive.Trigger asChild>
        {trigger}
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className={styles.CollapsibleContent}>
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}
