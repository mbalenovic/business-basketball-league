import * as React from 'react'
import { Link } from '@tanstack/react-router'

interface NavigationProps {
  mobile?: boolean
  onNavigate?: () => void
}

const navigationLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/standings', label: 'Standings' },
  { to: '/players', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/schedule', label: 'Schedule' },
]

export function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const baseClassName = mobile
    ? 'block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors touch-target'
    : 'text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'

  const activeClassName = mobile
    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
    : 'text-gray-900 dark:text-white font-semibold'

  return (
    <>
      {navigationLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={baseClassName}
          activeProps={{
            className: activeClassName,
          }}
          activeOptions={link.exact ? { exact: true } : undefined}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}
