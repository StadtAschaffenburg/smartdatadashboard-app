import IconFactory from '@/utils/IconFactory'
import { getAPI } from '@/lib/cms'

export default async function Icons() {
  // fetch icons von /api/taxonomy/icons
  const icon_data = await getAPI('taxonomy/icons' as string, true, 60 * 60 * 24)

  return (
    <div>
      <div className="mx-auto grid max-w-5xl grid-cols-6 gap-4">
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
              <div className="font-bold">{data.title}</div>
              {data.title !== slug && (
                <div className="text-primary/20">{slug}</div>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
