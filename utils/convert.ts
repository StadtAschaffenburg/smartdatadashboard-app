export const convertToFloat = (str: string): number =>
  parseFloat(str.replace(/\./g, '').replace(',', '.'))

export const convertToUnixTimestamp = (dateStr: string): number => {
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mär: 2,
    Apr: 3,
    Mai: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Okt: 9,
    Nov: 10,
    Dez: 11,
  }

  if (/^\d{4}$/.test(dateStr)) {
    // Check if the dateStr is just a year
    const date = new Date(`${dateStr}-01-01T00:00:00Z`)
    return Math.floor(date.getTime() / 1000)
  }
  const [monthStr, yearStr] = dateStr.split(' ')
  const month = monthMap[monthStr]
  const year = parseInt(`20${yearStr}`, 10) // Assumes the year is in the 21st century
  const date = new Date(year, month, 1) // Month in Date object is 0-based
  return Math.floor(date.getTime() / 1000)
}
