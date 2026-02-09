import { cx } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

export function TileSplitView(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col gap-8 lg:flex-row 2xl:justify-center 2xl:items-center" {...props} />
}

TileSplitView.Left = function LeftView(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx(props.className, 'flex-1')} />
}

TileSplitView.Right = function Rightiew(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className="lg:max-w-80" />
}
