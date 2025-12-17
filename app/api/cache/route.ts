import { responseContent } from '@schleegleixner/react-statamic-api'

export async function GET(req: Request) {
  return await responseContent(req)
}
