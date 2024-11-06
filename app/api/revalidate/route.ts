import { NextResponse } from 'next/server'
import revalidateCache from '@/app/actions/revalidateCache'

export async function GET() {
  await revalidateCache()
  return NextResponse.json({ revalidated: true })
}
