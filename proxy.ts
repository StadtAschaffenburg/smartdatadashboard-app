import { createProxy } from '@schleegleixner/react-statamic-api'

export const proxy = createProxy({
  // siteIds: ['de', 'en', 'fr'],
  // defaultSiteId: 'de',
})

export const config = {
  matcher: ['/((?!api|images|download|icoset|_next|\\.well-known).*)'],
}
