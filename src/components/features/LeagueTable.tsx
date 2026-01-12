import * as React from 'react'
import type { StandingsRow } from '~/lib/types/standings'
import { FormIndicator, StreakBadge } from './FormIndicator'
import { formatPercentage, formatWithCommas } from '~/lib/utils'

type SortColumn =
  | 'pos'
  | 'team'
  | 'w'
  | 'l'
  | 'pct'
  | 'pts_plus'
  | 'pts_minus'
  | 'diff'
type SortOrder = 'asc' | 'desc'

interface LeagueTableProps {
  standings: StandingsRow[]
  className?: string
  showMobileView?: boolean
}

export function LeagueTable({
  standings,
  className = '',
  showMobileView = false,
}: LeagueTableProps) {
  const [sortColumn, setSortColumn] = React.useState<SortColumn>('pos')
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc')
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null)

  // Sort standings based on current sort column and order
  const sortedStandings = React.useMemo(() => {
    const sorted = [...standings].sort((a, b) => {
      let aValue: any = a[sortColumn]
      let bValue: any = b[sortColumn]

      // Handle string sorting (team names)
      if (sortColumn === 'team') {
        aValue = String(aValue || '').toLowerCase()
        bValue = String(bValue || '').toLowerCase()
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      // Handle numeric sorting
      aValue = Number(aValue) || 0
      bValue = Number(bValue) || 0
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    return sorted
  }, [standings, sortColumn, sortOrder])

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // New column, default to descending (except for position)
      setSortColumn(column)
      setSortOrder(column === 'pos' ? 'asc' : 'desc')
    }
  }

  const toggleRowExpansion = (pos: number) => {
    setExpandedRow(expandedRow === pos ? null : pos)
  }

  if (showMobileView) {
    // Mobile card view
    return (
      <div className={`space-y-3 ${className}`}>
        {sortedStandings.map((row) => (
          <div
            key={row.pos}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-600">
                  {row.pos}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {row.team}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {row.w}-{row.l} ({formatPercentage(row.pct, 3)})
                  </p>
                </div>
              </div>
              {row.streak && <StreakBadge streak={row.streak} />}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">PTS For:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {formatWithCommas(row.pts_plus)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">PTS Against:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {formatWithCommas(row.pts_minus)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Diff:</span>
                <span
                  className={`ml-2 font-medium ${
                    row.diff >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {row.diff >= 0 ? '+' : ''}
                  {row.diff}
                </span>
              </div>
              {row.gb !== undefined && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">GB:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {row.gb === 0 ? '-' : row.gb}
                  </span>
                </div>
              )}
            </div>

            {row.form && row.form.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400 block mb-2">
                  Last 5 games:
                </span>
                <FormIndicator form={row.form} />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Desktop table view
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <SortableHeader
                label="#"
                column="pos"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="Team"
                column="team"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                className="sticky left-0 bg-gray-50 dark:bg-gray-900 z-10"
              />
              <SortableHeader
                label="W"
                column="w"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="L"
                column="l"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="PCT"
                column="pct"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
              />
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                GB
              </th>
              <SortableHeader
                label="PF"
                column="pts_plus"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden md:table-cell"
              />
              <SortableHeader
                label="PA"
                column="pts_minus"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden md:table-cell"
              />
              <SortableHeader
                label="DIFF"
                column="diff"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden lg:table-cell"
              />
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Streak
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                Form
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedStandings.map((row) => (
              <tr
                key={row.pos}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {row.pos}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 z-10">
                  {row.team}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                  {row.w}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                  {row.l}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white font-medium">
                  {formatPercentage(row.pct, 3)}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
                  {row.gb === undefined || row.gb === 0 ? '-' : row.gb}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white hidden md:table-cell">
                  {formatWithCommas(row.pts_plus)}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white hidden md:table-cell">
                  {formatWithCommas(row.pts_minus)}
                </td>
                <td
                  className={`px-4 py-3 text-center text-sm font-medium hidden lg:table-cell ${
                    row.diff >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {row.diff >= 0 ? '+' : ''}
                  {row.diff}
                </td>
                <td className="px-4 py-3 text-center text-sm hidden lg:table-cell">
                  {row.streak ? <StreakBadge streak={row.streak} /> : '-'}
                </td>
                <td className="px-4 py-3 text-center hidden xl:table-cell">
                  {row.form && row.form.length > 0 ? (
                    <FormIndicator form={row.form} className="justify-center" />
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface SortableHeaderProps {
  label: string
  column: SortColumn
  currentColumn: SortColumn
  sortOrder: SortOrder
  onSort: (column: SortColumn) => void
  align?: 'left' | 'center' | 'right'
  className?: string
}

function SortableHeader({
  label,
  column,
  currentColumn,
  sortOrder,
  onSort,
  align = 'left',
  className = '',
}: SortableHeaderProps) {
  const isActive = currentColumn === column
  const alignClass =
    align === 'center'
      ? 'text-center'
      : align === 'right'
        ? 'text-right'
        : 'text-left'

  return (
    <th className={`px-4 py-3 ${alignClass} ${className}`}>
      <button
        onClick={() => onSort(column)}
        className="touch-target group inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <span>{label}</span>
        <span className="flex flex-col">
          <svg
            className={`w-3 h-3 ${
              isActive && sortOrder === 'asc'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </span>
      </button>
    </th>
  )
}
