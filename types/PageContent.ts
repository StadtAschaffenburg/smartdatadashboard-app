export type PageContentTileType = {
  headline: string | null
  content: string | null
  link: string | null
}

export type PageContentType = {
  name: string
  headline: string | null
  content: string | null
  tiles?: PageContentTileType[] | null
}
