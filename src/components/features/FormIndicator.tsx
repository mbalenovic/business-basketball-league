import * as React from 'react'

interface FormIndicatorProps {
  form: ('W' | 'L')[]
  className?: string
}

/**
 * Display team form as a series of W/L indicators
 */
export function FormIndicator({ form, className = '' }: FormIndicatorProps) {
  if (!form || form.length === 0) return null

  return (
    <div className={`flex gap-1 ${className}`} aria-label="Team form">
      {form.map((result, index) => (
        <span
          key={index}
          className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
            result === 'W'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}
          title={result === 'W' ? 'Win' : 'Loss'}
        >
          {result}
        </span>
      ))}
    </div>
  )
}

interface StreakBadgeProps {
  streak: string
  className?: string
}

/**
 * Display current streak badge (e.g., "W3", "L2")
 */
export function StreakBadge({ streak, className = '' }: StreakBadgeProps) {
  if (!streak) return null

  const isWinStreak = streak.startsWith('W')
  const streakNumber = parseInt(streak.slice(1))

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
        isWinStreak
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      } ${className}`}
      title={`${isWinStreak ? 'Win' : 'Loss'} streak: ${streakNumber}`}
    >
      {streak}
    </span>
  )
}
