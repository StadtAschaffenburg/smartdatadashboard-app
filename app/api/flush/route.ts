'use server'

import { responseFlush } from '@schleegleixner/react-statamic-api'

export async function POST(req: Request) {
  return responseFlush(req)
}

export async function GET(req: Request) {
  return responseFlush(req)
}