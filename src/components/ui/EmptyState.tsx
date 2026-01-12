import * as React from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`text-center py-12 px-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div className="flex justify-center mb-4 text-gray-400 dark:text-gray-600">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="touch-target bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

/**
 * Empty state for no search results
 */
export function NoSearchResults({ searchTerm }: { searchTerm: string }) {
  return (
    <EmptyState
      title="No results found"
      description={`We couldn't find any results for "${searchTerm}". Try adjusting your search.`}
      icon={
        <svg
          className="w-16 h-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
    />
  )
}

/**
 * Empty state for no data
 */
export function NoData({
  title = 'No data available',
  description = 'There is no data to display at this time.',
}: {
  title?: string
  description?: string
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={
        <svg
          className="w-16 h-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      }
    />
  )
}
