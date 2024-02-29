'use client'

import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from '@react-spring/web'
import React from 'react'
import BaseOverlay, { overlayStyle } from './BaseOverlay'
import Title from '@/components/Elements/Title'
import { cx, VariantProps } from 'class-variance-authority'
import MoreDetails from '@/components/Elements/MoreDetails'
import useDevice from '@/hooks/useDevice'

type MoreInfoOverlayProps = VariantProps<typeof overlayStyle> &
  AnimatedProps<ComponentPropsWithRef<'div'>> & {
    onClose?: () => void
    children?: React.ReactNode | React.ReactNode[]
    isFullWidth?: boolean
  }

export default function MoreInfoOverlay({
  onClose,
  children,
  isFullWidth,
  ...props
}: MoreInfoOverlayProps) {
  const device = useDevice()

  return (
    <BaseOverlay onClose={onClose} {...props}>
      <div className="flex h-full flex-col">
        <div
          className={cx(
            'no-scrollbar h-full flex-1 overflow-scroll',
            isFullWidth && device === 'desktop'
              ? 'column-fill-auto columns-2 gap-12'
              : '',
          )}
        >
          <Title as="h5" variant={'inverse'}>
            {children}
          </Title>
        </div>
        <div className="mt-2 flex w-full justify-center">
          <MoreDetails
            lessDetails={true}
            onClick={onClose}
            variant={'inverse'}
          />
        </div>
      </div>
    </BaseOverlay>
  )
}
