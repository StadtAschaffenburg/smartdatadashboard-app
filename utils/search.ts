export const search_parameter = 'suche'

export function getTerm(search_params: any): string {
  return search_params?.[search_parameter] || ''
}

export function setTerm(search_term: string): string {
  return `?${search_parameter}=${encodeURIComponent(search_term)}`
}

export function removeParameterLink(): string {
  if (typeof window === 'undefined') {
    return '/'
  }
  const url = new URL(window.location.href)
  url.searchParams.delete(search_parameter)
  return url.toString()
}

export function removeParameter(): void {
  window.location.href = removeParameterLink()
}
