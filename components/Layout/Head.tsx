import { getPageTitleServer } from '@schleegleixner/react-statamic-api'

interface HeadProps {
  global_seo?: {
    keywords?: string | null
    meta_description?: string | null
    page_title?: string | null
    share_image?: string | null
  } | null
  page_data?: {
    content?: {
      seo_description?: string | null
      seo_keywords?: string | null
    } | null
  } | null
  pathname: string
  site_id: string
}

export default async function Head({
  global_seo,
  page_data,
  pathname,
  site_id,
}: HeadProps) {
  const page_title = await getPageTitleServer(
    pathname,
    site_id,
    page_data,
    global_seo?.page_title ?? null,
  )

  const page_description =
    page_data?.content?.seo_description ?? global_seo?.meta_description ?? ''
  const page_keywords =
    page_data?.content?.seo_keywords ?? global_seo?.keywords ?? ''

  return (
    <head>
      <title>{page_title}</title>

      <link
        href="/favicon/favicon-96x96.png"
        rel="icon"
        sizes="96x96"
        type="image/png"
      />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />
      <link
        href="/favicon/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <meta
        content={global_seo?.page_title ?? undefined}
        name="apple-mobile-web-app-title"
      />
      <link href="/favicon/site.webmanifest" rel="manifest" />

      <meta content={page_description} name="description" />
      <meta content={page_title} property="og:title" />
      <meta content={page_description} property="og:description" />
      <meta content={page_keywords} name="keywords" />
      {global_seo?.share_image && (
        <>
          <meta
            content={`/images/${global_seo.share_image}?w=1200&h=630`}
            property="og:image"
          />
          <meta content="1200" property="og:image:width" />
          <meta content="630" property="og:image:height" />
        </>
      )}
      <meta content="website" property="og:type" />
    </head>
  )
}
