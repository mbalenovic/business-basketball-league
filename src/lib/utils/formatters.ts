/**
 * Format a number with fixed decimal places
 */
export function formatNumber(
  value: number | string | undefined | null,
  decimals: number = 1,
): string {
  if (value === undefined || value === null || value === '') return '-'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '-'
  return num.toFixed(decimals)
}

/**
 * Format percentage (0.750 -> 75.0%)
 */
export function formatPercentage(
  value: number | undefined,
  decimals: number = 1,
): string {
  if (value === undefined || value === null) return '-'
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Format win percentage from wins and losses
 */
export function formatWinPercentage(wins: number, losses: number): string {
  const total = wins + losses
  if (total === 0) return '.000'
  return (wins / total).toFixed(3)
}

/**
 * Format date to readable string
 */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    })
  } catch {
    return dateString
  }
}

/**
 * Format date and time
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

/**
 * Format time (24h to 12h format)
 */
export function formatTime(timeString: string): string {
  try {
    const [hours, minutes] = timeString.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`
  } catch {
    return timeString
  }
}

/**
 * Format large numbers with commas (1000 -> 1,000)
 */
export function formatWithCommas(value: number): string {
  return value.toLocaleString('en-US')
}

/**
 * Format player height (cm to feet/inches)
 */
export function formatHeight(heightCm: string | number | undefined): string {
  if (!heightCm) return '-'
  const cm = typeof heightCm === 'string' ? parseInt(heightCm) : heightCm
  const inches = cm / 2.54
  const feet = Math.floor(inches / 12)
  const remainingInches = Math.round(inches % 12)
  return `${feet}'${remainingInches}"`
}

/**
 * Format player weight (kg to lbs)
 */
export function formatWeight(weightKg: string | number | undefined): string {
  if (!weightKg) return '-'
  const kg = typeof weightKg === 'string' ? parseInt(weightKg) : weightKg
  const lbs = Math.round(kg * 2.20462)
  return `${lbs} lbs`
}

/**
 * Format record (W-L)
 */
export function formatRecord(wins: number, losses: number): string {
  return `${wins}-${losses}`
}

/**
 * Format streak (e.g., "W3", "L2")
 */
export function formatStreak(streak: string | undefined): string {
  if (!streak) return '-'
  return streak
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffMins = Math.floor(Math.abs(diffMs) / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    const isPast = diffMs < 0

    if (diffMins < 1) return 'just now'
    if (diffMins < 60)
      return isPast ? `${diffMins} min ago` : `in ${diffMins} min`
    if (diffHours < 24)
      return isPast ? `${diffHours}h ago` : `in ${diffHours}h`
    if (diffDays < 7) return isPast ? `${diffDays}d ago` : `in ${diffDays}d`

    return formatDate(dateString)
  } catch {
    return dateString
  }
}
