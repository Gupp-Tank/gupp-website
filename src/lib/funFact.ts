const DAY_MS = 86_400_000

// Day of the year (1-366) for the visitor's local calendar date.
export const dayOfYear = (date: Date): number =>
  Math.round((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / DAY_MS)

// The fact of the day: stable through the day, changes at midnight.
export const factOfTheDay = (count: number, date: Date): number => (count > 0 ? dayOfYear(date) % count : 0)
