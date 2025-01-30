'use server'

import { NextApiRequest, NextApiResponse } from 'next'
import { checkSecret } from '@/utils/api'
import { flushCache, revalidateContent } from '@/lib/cache'
import { rebuildCache } from '@/lib/cms'

type Data = {
  message: string
  results?: StepResult[]
  error?: string
}

type StepResult = {
  name: string
  success: boolean
  error?: string
  payload?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  const results: StepResult[] = []

  if (!checkSecret(req)) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const flushResult = await flushCache()
  results.push({ name: 'flush', success: flushResult === true })

  const rebuildResult = await rebuildCache()
  results.push({
    name: 'rebuild',
    success: rebuildResult !== false,
    payload: rebuildResult,
  })

  const revalidationResult = await revalidateContent()
  if (!revalidationResult.success) {
    results.push({
      name: 'revalidation',
      success: false,
      error: revalidationResult.error,
    })
  } else {
    results.push({ name: 'revalidation', success: true })
  }

  const overallSuccess = results.every(step => step.success)
  const message = overallSuccess
    ? 'Success! Cache has been flushed and rebuilt.'
    : 'Some steps failed. Check the results for more information.'

  return res.status(200).json({ message, results })
}
