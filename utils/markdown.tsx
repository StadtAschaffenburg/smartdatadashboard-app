import remarkGfm from 'remark-gfm'
import { ReactNode } from 'react'
import Title from '@/components/Elements/Title'

interface MarkdownComponentProps {
  children: ReactNode
}

export const markdownComponents = {
  h1: (props: MarkdownComponentProps) => <Title as={'h1'} {...props} />,
  h2: (props: MarkdownComponentProps) => <Title as={'h2'} {...props} />,
  h3: (props: MarkdownComponentProps) => <Title as={'h3'} {...props} />,
  h4: (props: MarkdownComponentProps) => <Title as={'h4'} {...props} />,
  h5: (props: MarkdownComponentProps) => <Title as={'h5'} {...props} />,
  h6: (props: MarkdownComponentProps) => <Title as={'h6'} {...props} />,
  ul: (props: MarkdownComponentProps) => (
    <ul className="list-disc px-6" {...props} />
  ),
  p: (props: MarkdownComponentProps) => (
    <p className="mb-2 text-base font-normal lg:text-lg" {...props} />
  ),
  a: (props: MarkdownComponentProps & { href?: string }) => (
    <a
      className="underline"
      {...props}
      rel="noopener noreferrer"
      target="_blank"
    />
  ),
}

export const markdownPlugins: Array<any> = [remarkGfm]
