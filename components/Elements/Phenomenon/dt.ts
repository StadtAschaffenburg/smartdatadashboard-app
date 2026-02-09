import Phenomena from './Phenomena'
import { ForwardRefExoticComponent, JSX, SVGProps } from 'react'
import { TextVariant } from '@/utils/variants/TextVariants'

export type PhenomenaType = {
  [key: string]: {
    title: string
    shortTitle?: string
    unit: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
      | React.ForwardRefExoticComponent<
          Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
            title?: string | undefined
            titleId?: string | undefined
          } & React.RefAttributes<SVGSVGElement>
        >
    decimals?: number
  }
}

export type PhenomenonProps = {
  animate?: boolean
  phenomenon: keyof typeof Phenomena
  value: number
  icon?:
    | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
    | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
  size?: 'md' | 'xl'
  meta?: string
  hide_icon?: boolean
  variant?: TextVariant
}
