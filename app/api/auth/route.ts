import { responseAuth } from '@schleegleixner/react-statamic-api'

export async function POST(req: Request) {
  return await responseAuth(req)
}
