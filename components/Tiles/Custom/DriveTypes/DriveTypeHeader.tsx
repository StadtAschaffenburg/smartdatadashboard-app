import Spacer from '@/components/Elements/Spacer'
import Text from '@/components/Elements/Text'
import Title from '@/components/Elements/Title'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export default function DriveTypeHeader(props: {
  title: React.ReactNode
  year: string | number
  AllYear: string | number
  variant: TileVariantTypes
}) {
  return (
    <>
      <div className="flex flex-wrap justify-start gap-x-4 lg:max-w-[87%]">
        <Text
          as={'h1'}
          className="min-w-fit tracking-tighter xl:text-6xl 2xl:text-7xl mb-2"
          tag={'h3'}
          variant={props.variant}
        >
          {props.title} Autos
        </Text>

        <Title as={'subtitle'} color="dark">
          {props.year !== 'Alle Jahre' ? (
            <>
              waren <span className={'text-' + props.variant}>{props.year}</span> in
              Frankfurt angemeldet.{' '}
              Aufgeteilt auf folgende Antriebsarten:
            </>
          ) : (
            <>
              sind <span className={'text-' + props.variant}>seit {props.AllYear}</span>{' '}
              in Frankfurt hinzugekommen, aufgeteilt auf folgende Antriebsarten:
            </>
          )}
        </Title>
      </div>
      <Spacer />
    </>
  )
}
