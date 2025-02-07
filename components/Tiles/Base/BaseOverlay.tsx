import { XMarkIcon } from '@heroicons/react/24/outline'
import { ComponentPropsWithRef } from 'react'
import { animated, AnimatedProps } from '@react-spring/web'
import { cva, VariantProps } from 'class-variance-authority'
import {
  BackgroundDefaultVariants,
  BackgroundVariants,
} from '@/utils/variants/BackgroundVariants'

export const overlayStyle = cva(
  'absolute left-0 top-0 z-20 h-full w-full bg-opacity-90 md:pt-20 md:pr-20 md:pl-[70px] md:pb-[70px] backdrop-blur p-8 flex flex-col-reverse md:flex-row',
  {
    variants: BackgroundVariants,
    defaultVariants: BackgroundDefaultVariants,
  },
)

type BaseOverlayProps = VariantProps<typeof overlayStyle> &
  AnimatedProps<ComponentPropsWithRef<'div'>> & {
    children: React.ReactNode | React.ReactNode[]
    onClose?: () => void
  }

export default function BaseOverlay({
  variant,
  children,
  onClose,
  ...props
}: BaseOverlayProps) {
  return (
    <animated.div {...props} className={overlayStyle({ variant })}>
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden pr-4">
        {children}
      </div>
      <XMarkIcon
        className="h-6 cursor-pointer self-end text-white md:ml-[35px] md:self-auto"
        onClick={onClose}
      />
    </animated.div>
  )
}
