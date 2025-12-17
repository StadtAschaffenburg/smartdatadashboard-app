'use client'

import { ComponentPropsWithRef } from 'react'
import { AnimatedProps } from '@react-spring/web'
import React from 'react'
import BaseOverlay, { overlayStyle } from './BaseOverlay'
import Text from '@/components/Elements/Text'
import { cx, VariantProps } from 'class-variance-authority'
import Divider from '@/components/Elements/Divider'
import Title from '@/components/Elements/Title'
import {
  replaceContentTags,
  useContentWidth,
} from '@schleegleixner/react-statamic-api'

type MoreInfoOverlayProps = VariantProps<typeof overlayStyle> &
  AnimatedProps<ComponentPropsWithRef<'div'>> & {
    onClose?: () => void
    children?: React.ReactNode | React.ReactNode[]
    title?: string
  }

export default function MoreInfoOverlay({
  onClose,
  children,
  title,
  ...props
}: MoreInfoOverlayProps) {
  const limit = 720
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()

  return (
    <BaseOverlay onClose={onClose} variant={'inverse'} {...props}>
      <div className="flex flex-col gap-4">
        {title && (
          <Title as="h3" margin="none">
            {replaceContentTags(title)}
          </Title>
        )}
        {title && <Divider />}

        <div
          className={cx('flex-1 overflow-y-auto overflow-x-hidden pr-4')}
          ref={elRef}
        >
          <Text
            as="md"
            className={cx(
              contentWidth > limit
                ? 'column-fill-balance columns-2 gap-12'
                : '',
            )}
          >
            {children}
          </Text>
        </div>
      </div>
    </BaseOverlay>
  )
}
