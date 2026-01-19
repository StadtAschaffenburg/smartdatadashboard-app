'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { useEffect, useState } from 'react'
import styles from './Collapsible.module.css'

type TailwindBp = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type CollapsibleProps = {
  alwaysOpenAbove?: TailwindBp
  children: React.ReactElement<any>
  isOpen?: boolean
  onOpenChange?: (_open: boolean) => void
  trigger?: React.ReactElement<any>
}

const bp_map: Record<TailwindBp, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
  '2xl': 1600,
}

function useBreakpoint(always_open_bp?: TailwindBp) {
  const [matches, set_matches] = useState(false)

  useEffect(() => {
    if (!always_open_bp) {
      return
    }

    const query = window.matchMedia(`(min-width: ${bp_map[always_open_bp]}px)`)

    const listener = (e: MediaQueryListEvent | MediaQueryList) =>
      set_matches(e.matches)

    listener(query) // initial run
    query.addEventListener('change', listener) // modern API

    return () => query.removeEventListener('change', listener)
  }, [always_open_bp])

  return matches
}

export default function Collapsible({
  trigger,
  children,
  isOpen,
  onOpenChange,
  alwaysOpenAbove,
}: CollapsibleProps) {
  const [open, set_open] = useState(isOpen ?? false)
  const is_forced_open = useBreakpoint(alwaysOpenAbove)
  const effective_open = is_forced_open || (isOpen ?? open)

  const handle_open_change = (new_open: boolean) => {
    if (is_forced_open) {
      return
    }
    if (onOpenChange) {
      onOpenChange(new_open)
    } else {
      set_open(new_open)
    }
  }

  const wrapper_class = is_forced_open
    ? 'collapsible-forced'
    : effective_open
      ? 'collapsible-open'
      : 'collapsible-closed'

  return (
    <div className={wrapper_class}>
      <CollapsiblePrimitive.Root
        onOpenChange={handle_open_change}
        open={effective_open}
      >
        {!is_forced_open && trigger && (
          <CollapsiblePrimitive.Trigger asChild>
            {trigger}
          </CollapsiblePrimitive.Trigger>
        )}

        <CollapsiblePrimitive.Content
          className={`${styles.CollapsibleContent} ${
            is_forced_open ? 'block !h-auto !opacity-100' : ''
          }`}
        >
          {children}
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    </div>
  )
}
