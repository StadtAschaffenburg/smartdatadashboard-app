import { usePathname } from 'next/navigation'

export function getUriSegment(id: number = 0): string | null {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  const segments = url.split('/').filter(Boolean)

  return segments[id] ?? null
}