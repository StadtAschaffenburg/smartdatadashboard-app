/**
 * CLI-Skript zum manuellen Auslösen von fetchFromStatamic().
 *
 * Verwendung:
 *   npm run flush:statamic [-- site1 site2 ...]
 *
 * Umgebungsvariablen (werden aus .env geladen):
 *   SSD_API        – Statamic API Endpoint
 *   API_SECRET     – API Secret für die Authentifizierung
 *   SITE_IDS       – Fallback Site-IDs (kommagetrennt), falls keine Argumente übergeben werden
 *
 * Optionale Umgebungsvariablen:
 *   SET_COLLECTIONS – Kommagetrennte Collections (default: pages,sources,images,tiles)
 *   SET_TAXONOMIES  – Kommagetrennte Taxonomien (default: icons,action_fields,sdg_targets)
 *   SET_GLOBAL      – Kommagetrennte Globals (default: seo,footer,strings)
 */

import { fetchFromStatamic } from '@schleegleixner/react-statamic-api'

async function main() {
  // Sites aus CLI-Argumenten oder Fallback aus Umgebungsvariable
  let sites = process.argv.slice(2)

  if (sites.length === 0) {
    sites = process.env.SITE_IDS?.split(',') ?? ['default']
  }

  // eslint-disable-next-line no-console
  console.log(`🚀 Starte fetchFromStatamic für Sites: ${sites.join(', ')}`)
  // eslint-disable-next-line no-console
  console.log(`📡 CMS Endpoint: ${process.env.SSD_API ?? '(nicht gesetzt!)'}`)
  // eslint-disable-next-line no-console
  console.log('')

  const result = await fetchFromStatamic(sites)

  // eslint-disable-next-line no-console
  console.log('')
  // eslint-disable-next-line no-console
  console.log(
    result.success ? '✅ Erfolgreich abgeschlossen' : '❌ Fehler aufgetreten',
  )
  // eslint-disable-next-line no-console
  console.log('')
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, null, 2))

  process.exit(result.success ? 0 : 1)
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('❌ Unerwarteter Fehler:', err)
  process.exit(1)
})
