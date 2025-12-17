import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  markdownComponents as baseComponents,
  markdownPlugins,
} from '@/utils/markdown'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import rehypeRaw from 'rehype-raw'
import remarkAnimate from '@/utils/markdown/remarkAnimate'
import { cx } from 'class-variance-authority'

interface MarkdownProps {
  className?: string
  defaultClasses?: string
  content: string
}

export default function Markdown({
  defaultClasses = 'text-base font-normal lg:text-lg',
  className = '',
  content,
}: MarkdownProps) {
  const markdownComponents = {
    ...baseComponents,
    animate: ({ children }: { children: React.ReactNode }) => {
      // if is number, animate it - else just render as text
      const value = String(children).trim()
      return isNaN(Number(value)) ? (
        <span>{children}</span>
      ) : (
        <AnimatedNumber>{Number(value)}</AnimatedNumber>
      )
    },
  }

  return (
    <div className={cx(className, defaultClasses)}>
      <ReactMarkdown
        components={markdownComponents as any}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[...markdownPlugins, remarkAnimate]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
