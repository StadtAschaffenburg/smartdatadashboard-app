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
    p: ({ node, children }: { node: any; children: React.ReactNode }) => {
      if (!tile_payload) {
        return children
      }

      const textContent = React.Children.toArray(children).join(' ')
      return (
        <DynamicText tile_payload={tile_payload}>{textContent}</DynamicText>
      )
    },
    // Optional: Erweiterung für andere Tags wie `span`, `div` usw.
    span: ({ node, children }: { node: any; children: React.ReactNode }) => {
      if (!tile_payload) {
        return children
      }

      const textContent = React.Children.toArray(children).join(' ')
      return (
        <DynamicText tile_payload={tile_payload}>{textContent}</DynamicText>
      )
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
