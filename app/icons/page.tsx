import IconFactory from '@/utils/IconFactory'
import { getAPI } from '@/lib/cms'

export default async function Icons() {
  // fetch icons von /api/taxonomy/icons
  const icon_data = await getAPI('taxonomy/icons' as string, true, 60 * 60 * 24)

  return (
    <div>
      {/* Titel oder Wrapper für die Icons */}
      <div className="mx-auto grid max-w-5xl grid-cols-6 gap-8">
        {icon_data.map(({ data, id, slug }: any) => (
          <div className="rounded-sm border-2 p-2 text-center" key={id}>
            <div className="flex aspect-square w-full px-4 align-middle">
              <IconFactory className="mx-auto w-full" type={slug} />
            </div>
            <p className="mt-4 whitespace-normal break-all text-xs">
              {data.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
