import { NextRequest } from 'next/server'
import { responseImage } from '@schleegleixner/react-statamic-api'
import sharp from 'sharp'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return await responseImage(params.id, req, sharp)
}
