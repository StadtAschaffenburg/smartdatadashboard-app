export const sanitizeName = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')

export const sanitizeValue = (value: string | number): number => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/\./g, '')) || 0
  }
  return parseFloat(value.toString()) || 0
}
