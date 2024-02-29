'use client'

import AnimatedCopyIcon from '@/components/Elements/Animated/AnimatedCopyIcon'
import Title from '@/components/Elements/Title'
import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from '@react-spring/web'
import BaseOverlay from './BaseOverlay'
import { TileType } from '@/utils/TileFactory'
import { Button } from '@/components/Elements/Button'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

type ShareOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  embedId: TileType
}

export default function ShareOverlay({
  onClose,
  embedId,
  ...props
}: ShareOverlayProps) {
  const link = `${window.location.origin}/share/${embedId}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link)
  }

  return (
    <BaseOverlay onClose={onClose} {...props}>
      <div className="flex h-full w-full flex-1 flex-col">
        <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-8">
          <div className="col-span-2 row-span-1">
            <Title as="h3" variant={'secondary'}>
              Diese Kachel teilen
            </Title>
          </div>
          <div className="col-span-2 row-span-1">
            <div className="flex w-full rounded bg-white p-4">
              <pre className="m-4 flex-1 whitespace-pre-wrap break-all text-sm">
                {link}
              </pre>
              <div className="relative w-7">
                <AnimatedCopyIcon onClick={copyToClipboard} />
              </div>
            </div>
          </div>
          <div className="col-span-1 row-span-2">
            <p className="text-white">
              Sie möchten diese Kachel mit anderen teilen? Nutzen Sie diesen
              Link um direkt zu dieser Kachel zu verlinken.
            </p>
          </div>
        </div>
        <div className="pt-10">
          <Button
            onClick={copyToClipboard}
            startIcon={
              <ClipboardDocumentIcon className="w-5 stroke-2 text-secondary" />
            }
            variant={'overlay'}
          >
            Link kopieren
          </Button>
        </div>
      </div>
    </BaseOverlay>
  )
}
