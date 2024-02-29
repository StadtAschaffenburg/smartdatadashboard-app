import SectionTitle from './SectionTitle'

export default function SectionHeader({
  variant,
}: {
  variant: 'climate' | 'mobility' | 'energy' | 'building'
}) {
  return (
    <div className="my-4 flex w-full items-center justify-between">
      <SectionTitle variant={variant} />
      {/* <SortTiles /> */}
    </div>
  )
}
