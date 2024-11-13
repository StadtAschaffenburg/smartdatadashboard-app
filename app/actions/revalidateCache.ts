'use server'

import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

export default async function revalidateCache() {
  revalidateTag('cached_data')
  revalidateTag('cached_files')
  revalidatePath('/', 'layout')
}
