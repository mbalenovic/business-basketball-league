import * as React from 'react'

interface SkeletonProps {
  className?: string
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`}
      aria-hidden="true"
    />
  )
}

/**
 * Skeleton for a table row
 */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

/**
 * Skeleton for a card component
 */
export function CardSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}

/**
 * Skeleton for player card
 */
export function PlayerCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />

        {/* Player info */}
        <div className="flex-1 min-w-0">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Stats */}
        <div className="hidden md:flex gap-4">
          <div>
            <Skeleton className="h-3 w-8 mb-1" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div>
            <Skeleton className="h-3 w-8 mb-1" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div>
            <Skeleton className="h-3 w-8 mb-1" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton for team card
 */
export function TeamCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-4">
        {/* Logo */}
        <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />

        {/* Team name */}
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton for match card
 */
export function MatchCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <Skeleton className="h-4 w-32 mb-4" />

      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex-1 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded flex-shrink-0" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Score or time */}
        <Skeleton className="h-8 w-16" />

        {/* Away team */}
        <div className="flex-1 flex items-center gap-3 justify-end">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-10 rounded flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton for standings table
 */
export function StandingsTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {['#', 'Team', 'W', 'L', 'PCT', 'PTS'].map((header) => (
              <th key={header} className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-12" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={6} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Generic loading spinner
 */
export function LoadingSpinner({ className = '' }: SkeletonProps) {
  return (
    <div className={`flex justify-center items-center ${className}`} role="status">
      <svg
        className="animate-spin h-8 w-8 text-gray-600 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
