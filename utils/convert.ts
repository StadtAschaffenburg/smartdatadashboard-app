import { renderToStaticMarkup } from 'react-dom/server'

export function getStaticIcon(icon: React.ReactElement, color: string): string {
  const svg_raw = renderToStaticMarkup(icon)

  if (!svg_raw) {
    return ''
  }

  const colored_svg = svg_raw
    .replace(/fill="[^"]*"/gi, `fill="${color}"`)
    .replace(/stroke="[^"]*"/gi, `stroke="${color}"`)
    .replace(
      /class="[^"]*fill-[^"]*"/gi,
      `fill="${color}" class="fill-inherit"`,
    )
    .replace(
      /class="[^"]*stroke-[^"]*"/gi,
      `stroke="${color}" class="stroke-inherit"`,
    )

  return colored_svg
}
