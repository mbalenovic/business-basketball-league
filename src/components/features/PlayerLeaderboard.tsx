import * as React from 'react'
import { Link } from '@tanstack/react-router'
import type { Player } from '~/lib/types/player'
import { formatNumber } from '~/lib/utils'

type SortColumn = 'name' | 'pts' | 'ast' | 'stl' | 'blk' | '3pm' | 'gamesPlayed'
type SortOrder = 'asc' | 'desc'

interface PlayerLeaderboardProps {
  players: Player[]
  className?: string
  showMobileView?: boolean
}

// Helper function to get player photo URL
function getPlayerPhotoUrl(player: Player): string | null {
  if (player._embedded?.['wp:featuredmedia']?.[0]) {
    const media = player._embedded['wp:featuredmedia'][0]
    // Try to get thumbnail size, fallback to icon, then source_url
    return (
      media.media_details?.sizes?.thumbnail?.source_url ||
      media.media_details?.sizes?.['sportspress-fit-icon']?.source_url ||
      media.source_url ||
      null
    )
  }
  return null
}

export function PlayerLeaderboard({
  players,
  className = '',
  showMobileView = false,
}: PlayerLeaderboardProps) {
  const [sortColumn, setSortColumn] = React.useState<SortColumn>('pts')
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc')

  // Extract player stats for display
  const playersWithStats = React.useMemo(() => {
    return players.map((player) => {
      // Get stats for current league (69) and season (239)
      const stats = player.statistics?.[69]?.[239]

      const gamesPlayed = Number(stats?.g) || 0
      const apg = Number(stats?.apg) || 0
      const spg = Number(stats?.spg) || 0
      const bpg = Number(stats?.bpg) || 0

      return {
        id: player.id,
        name: player.title?.rendered || 'Unknown Player',
        slug: player.slug,
        number: player.number || '-',
        team: player.current_teams?.[0] || 0,
        photo: getPlayerPhotoUrl(player),
        pts: Number(stats?.pts) || 0, // Total points
        ast: Math.round(apg * gamesPlayed), // Total assists
        stl: Math.round(spg * gamesPlayed), // Total steals
        blk: Math.round(bpg * gamesPlayed), // Total blocks
        '3pm': Number(stats?.['3pm']) || 0, // Total 3-pointers made
        gamesPlayed,
      }
    })
  }, [players])

  // Sort players based on current sort column and order
  const sortedPlayers = React.useMemo(() => {
    return [...playersWithStats].sort((a, b) => {
      let aValue: any = a[sortColumn]
      let bValue: any = b[sortColumn]

      // Handle string sorting (names)
      if (sortColumn === 'name') {
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      // Handle numeric sorting
      aValue = Number(aValue) || 0
      bValue = Number(bValue) || 0
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })
  }, [playersWithStats, sortColumn, sortOrder])

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // New column, default to descending for stats
      setSortColumn(column)
      setSortOrder(column === 'name' ? 'asc' : 'desc')
    }
  }

  if (showMobileView) {
    // Mobile card view
    return (
      <div className={`space-y-3 ${className}`}>
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-600">
                  {index + 1}
                </span>
                {player.photo ? (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                    <span className="text-xl font-bold text-gray-600 dark:text-gray-400">
                      {player.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <Link
                    to="/players/$playerId"
                    params={{ playerId: String(player.id) }}
                    className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {player.name}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    #{player.number}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {player.pts}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  PTS
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">AST:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {player.ast}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">STL:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {player.stl}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">BLK:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {player.blk}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">3PM:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {player['3pm']}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">GP:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {player.gamesPlayed}
                </span>
              </div>
            </div>
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
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                #
              </th>
              <SortableHeader
                label="Player"
                column="name"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                className="sticky left-0 bg-gray-50 dark:bg-gray-900 z-10"
              />
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                No.
              </th>
              <SortableHeader
                label="PTS"
                column="pts"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
              />
              <SortableHeader
                label="AST"
                column="ast"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden md:table-cell"
              />
              <SortableHeader
                label="STL"
                column="stl"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden md:table-cell"
              />
              <SortableHeader
                label="BLK"
                column="blk"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden lg:table-cell"
              />
              <SortableHeader
                label="3PM"
                column="3pm"
                currentColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
                align="center"
                className="hidden lg:table-cell"
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 z-10">
                  <div className="flex items-center gap-3">
                    {player.photo ? (
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          {player.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <Link
                      to="/players/$playerId"
                      params={{ playerId: String(player.id) }}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {player.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
                  {player.number}
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {player.pts}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white hidden md:table-cell">
                  {player.ast}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white hidden md:table-cell">
                  {player.stl}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white hidden lg:table-cell">
                  {player.blk}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white hidden lg:table-cell">
                  {player['3pm']}
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
