import { NextRequest } from 'next/server'
import { responseDownload } from '@schleegleixner/react-statamic-api'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return await responseDownload(params.id)
}
