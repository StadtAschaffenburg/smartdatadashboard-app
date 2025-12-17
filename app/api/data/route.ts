import { responseLiveData } from '@schleegleixner/react-statamic-api'

export async function GET(req: Request) {
  return await responseLiveData(req)
}
