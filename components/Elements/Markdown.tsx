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
  const markdownComponents = {
    ...baseComponents,
    p: ({ children }: { children: React.ReactNode }) => {
      if (!tile_payload) {
        return <p>{children}</p>
      }

      // Check if all children are plain text or if there are formatted elements
      const hasOnlyPlainText = React.Children.toArray(children).every(
        child => typeof child === 'string',
      )

      if (hasOnlyPlainText) {
        const textContent = React.Children.toArray(children).join(' ')
        return (
          <p>
            <DynamicText tile_payload={tile_payload}>{textContent}</DynamicText>
          </p>
        )
      }

      // Return children as-is for mixed/complex content
      return <p>{children}</p>
    },
    span: ({ children }: { children: React.ReactNode }) => {
      if (!tile_payload) {
        return <span>{children}</span>
      }

      const hasOnlyPlainText = React.Children.toArray(children).every(
        child => typeof child === 'string',
      )

      if (hasOnlyPlainText) {
        const textContent = React.Children.toArray(children).join(' ')
        return (
          <span>
            <DynamicText tile_payload={tile_payload}>{textContent}</DynamicText>
          </span>
        )
      }

      return <span>{children}</span>
    },
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
