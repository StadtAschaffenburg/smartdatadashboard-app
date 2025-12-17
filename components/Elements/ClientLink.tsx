'use client'

import Button from './Button'
import { scrollToTop } from '@/utils/scroll'

export default function ClientLink({
  link,
  label,
}: {
  link: string
  label: string
}) {
  const handleClick = () => {
    scrollToTop()
  }

  return (
    <div>
      <Button
        className="inline-block"
        href={link}
        inverted
        onClick={!link.startsWith('http') ? handleClick : undefined}
        size="lg"
        target={link.startsWith('http') ? '_blank' : '_self'}
        variant="primary"
      >
        {label}
      </Button>
    </div>
  )
}
