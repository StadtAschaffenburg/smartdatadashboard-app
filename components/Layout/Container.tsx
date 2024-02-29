import { cx } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

export type ContainerProps = HTMLAttributes<HTMLDivElement>

export default function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cx(
        'mx-auto max-w-[1920px] px-2 py-4 xs:px-[16px] md:px-[32px] md:py-10 xl:px-[82px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
