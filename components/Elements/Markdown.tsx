import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  markdownComponents as baseComponents,
  markdownPlugins,
} from '@/utils/markdown'
import DynamicText from '@/components/Elements/DynamicText'
import { TilePayloadType } from '@/types/tiles'

interface MarkdownProps {
  content: string
  tile_payload?: TilePayloadType
}

export default function Markdown({ content, tile_payload }: MarkdownProps) {
  const createDynamicWrapper = (Component: 'p' | 'span') => {
    // eslint-disable-next-line react/function-component-definition
    return ({ children }: { children: React.ReactNode }) => {
      if (!tile_payload) {
        return React.createElement(Component, {}, children)
      }

      const hasOnlyPlainText = React.Children.toArray(children).every(
        child => typeof child === 'string',
      )

      if (hasOnlyPlainText) {
        const textContent = React.Children.toArray(children).join(' ')
        return React.createElement(
          Component,
          {},
          <DynamicText tile_payload={tile_payload}>{textContent}</DynamicText>,
        )
      }

      return React.createElement(Component, {}, children)
    }
  }

  const markdownComponents = {
    ...baseComponents,
    p: createDynamicWrapper('p'),
    span: createDynamicWrapper('span'),
  }

  return (
    <ReactMarkdown
      components={markdownComponents}
      remarkPlugins={markdownPlugins}
    >
      {content}
    </ReactMarkdown>
  )
}
