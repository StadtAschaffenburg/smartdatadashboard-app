'use client'

import AnimatedCopyIcon from '@/components/Elements/Animated/AnimatedCopyIcon'
import Title from '@/components/Elements/Title'
import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from '@react-spring/web'
import BaseOverlay from './BaseOverlay'
import { TileType } from '@schleegleixner/react-statamic-api'
import Button from '@/components/Elements/Button'
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { getGlobalString } from '@schleegleixner/react-statamic-api'

type EmbedOverlayProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  onClose?: () => void
  embedId: TileType
}

export default function EmbedOverlay({
  onClose,
  embedId,
  ...props
}: EmbedOverlayProps) {
  const link = `${window.location.origin}/embed/${embedId}`

  const iframeSrc = `<iframe src="${link}" style="border:none; width:100%; height:100%" title="Datendashboard Aschaffenburg"></iframe>`

  const [wasCopied, setWasCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(iframeSrc)
    setWasCopied(true)
    setTimeout(() => setWasCopied(false), 2000)
  }

  return (
    <BaseOverlay onClose={onClose} {...props}>
      <div className="flex w-full flex-1 flex-col">
        <div className="flex flex-col gap-4">
          <div className="col-span-2 row-span-1">
            <Title as="h3" variant={'white'}>
              Diese Kachel auf Ihre Website einbetten
            </Title>
          </div>
          <div className="">
            <p className="text-white">
              Sie möchten diese Kachel auch auf ihrer Website darstellen? Nutzen
              Sie den Iframe Code und betten Sie diesen in ihrer Website ganz
              einfach ein.
            </p>
          </div>
          <div className="">
            <div className="mt-4 flex rounded bg-white p-4">
              <pre className="m-4 flex-1 whitespace-pre-wrap break-all text-sm text-black">
                {iframeSrc}
              </pre>
              <div className="relative w-7">
                <AnimatedCopyIcon onClick={copyToClipboard} />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <Button
            Icon={
              wasCopied ? (
                <CheckIcon className="w-5 stroke-2" />
              ) : (
                <ClipboardDocumentIcon className="w-5 stroke-2" />
              )
            }
            onClick={copyToClipboard}
            variant={'ivory'}
          >
            {wasCopied
              ? getGlobalString('copy_button_success')
              : getGlobalString('copy_button_default')}
          </Button>
        </div>
      </div>
    </BaseOverlay>
  )
}
