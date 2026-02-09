'use server'

import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

export default async function revalidateCache() {
  revalidateTag('cached_data', { expire: 0 })
  revalidateTag('cached_files', { expire: 0 })
  revalidatePath('/')
}
