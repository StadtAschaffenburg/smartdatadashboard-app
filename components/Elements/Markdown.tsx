import ReactMarkdown from 'react-markdown'
import { markdownComponents, markdownPlugins } from '@/utils/markdown'

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={markdownComponents}
      remarkPlugins={markdownPlugins}
    >
      {content}
    </ReactMarkdown>
  )
}
