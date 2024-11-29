export const sanitizeName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')

export const sanitizeValue = (value: string | number): number => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/\./g, '')) || 0
  }
  return parseFloat(value ? value.toString() : '') || 0
}

export const sanitizeLocalizedValue = (value: string | number): number => {
  const valueAsString = value.toString()
  const sanitized = valueAsString.replace(/\./g, '').replace(/,/g, '.')
  return parseFloat(sanitized) || 0
}
