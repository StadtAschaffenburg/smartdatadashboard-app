export const dynamic = 'force-dynamic'

import IconFactory from '@/utils/factories/IconFactory'
import { getTaxonomy } from '@schleegleixner/react-statamic-api'

export default async function Icons() {
  // fetch icons von /api/taxonomy/icons
  const icon_data = await getTaxonomy('icons')

  if (!icon_data || icon_data.length === 0) {
    return <div>No icons found.</div>
  }

  return (
    <div>
      <div className="mx-auto grid max-w-5xl grid-cols-6 gap-4 font-clean my-12">
        {icon_data.map(({ data, id, slug }: any) => (
          <div
            className="group cursor-pointer rounded-sm border-2 border-primary/20 p-2 text-center transition-all hover:border-secondary hover:bg-secondary/80"
            key={id}
          >
            <div className="flex aspect-square w-full px-4 align-middle">
              <IconFactory
                className="mx-auto w-full group-hover:fill-white group-hover:stroke-white"
                type={slug}
              />
            </div>
            <p className="mt-4 whitespace-normal break-all text-xs text-primary group-hover:text-white">
              <span className="block font-bold">{data.title}</span>
              {data.title !== slug && (
                <span className="block text-primary/20">{slug}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
