import type { PlayerStats } from '../types/common'

/**
 * Calculate field goal percentage
 */
export function calculateFGPercentage(
  fgm: number | undefined,
  fga: number | undefined,
): number | undefined {
  if (!fgm || !fga || fga === 0) return undefined
  return fgm / fga
}

/**
 * Calculate 3-point percentage
 */
export function calculate3PPercentage(
  threepm: number | undefined,
  threepa: number | undefined,
): number | undefined {
  if (!threepm || !threepa || threepa === 0) return undefined
  return threepm / threepa
}

/**
 * Calculate free throw percentage
 */
export function calculateFTPercentage(
  ftm: number | undefined,
  fta: number | undefined,
): number | undefined {
  if (!ftm || !fta || fta === 0) return undefined
  return ftm / fta
}

/**
 * Calculate true shooting percentage
 * TS% = PTS / (2 * (FGA + 0.44 * FTA))
 */
export function calculateTrueShootingPercentage(
  pts: number,
  fga: number,
  fta: number,
): number | undefined {
  const denominator = 2 * (fga + 0.44 * fta)
  if (denominator === 0) return undefined
  return pts / denominator
}

/**
 * Calculate effective field goal percentage
 * eFG% = (FGM + 0.5 * 3PM) / FGA
 */
export function calculateEffectiveFGPercentage(
  fgm: number,
  threepm: number,
  fga: number,
): number | undefined {
  if (fga === 0) return undefined
  return (fgm + 0.5 * threepm) / fga
}

/**
 * Calculate player efficiency rating (PER)
 * Simplified version
 */
export function calculatePER(stats: PlayerStats): number {
  const {
    pts = 0,
    apg = 0,
    rpg = 0,
    spg = 0,
    bpg = 0,
    tov = 0,
    fgm = 0,
    fga = 0,
    ftm = 0,
    fta = 0,
  } = stats

  // Simplified PER calculation
  const positivePlays = pts + apg + rpg + spg + bpg + fgm + ftm
  const negativePlays = tov + (fga - fgm) + (fta - ftm)

  return Math.max(0, positivePlays - negativePlays)
}

/**
 * Sort players by a specific stat
 */
export function sortPlayersByStat<T extends Record<string, any>>(
  players: T[],
  statKey: keyof T,
  order: 'asc' | 'desc' = 'desc',
): T[] {
  return [...players].sort((a, b) => {
    const aValue = Number(a[statKey]) || 0
    const bValue = Number(b[statKey]) || 0
    return order === 'desc' ? bValue - aValue : aValue - bValue
  })
}

/**
 * Get top N players by stat
 */
export function getTopPlayers<T extends Record<string, any>>(
  players: T[],
  statKey: keyof T,
  limit: number = 10,
): T[] {
  return sortPlayersByStat(players, statKey, 'desc').slice(0, limit)
}

/**
 * Calculate win percentage
 */
export function calculateWinPercentage(wins: number, losses: number): number {
  const total = wins + losses
  if (total === 0) return 0
  return wins / total
}

/**
 * Calculate games behind
 */
export function calculateGamesBehind(
  leaderWins: number,
  leaderLosses: number,
  teamWins: number,
  teamLosses: number,
): number {
  return ((leaderWins - teamWins) + (teamLosses - leaderLosses)) / 2
}

/**
 * Determine if a player meets minimum games threshold
 */
export function meetsMinimumGames(
  gamesPlayed: number,
  minGames: number,
): boolean {
  return gamesPlayed >= minGames
}

/**
 * Get player form (last N games result)
 */
export function getPlayerForm(
  results: ('W' | 'L')[],
  limit: number = 5,
): ('W' | 'L')[] {
  return results.slice(-limit)
}

/**
 * Calculate average from array of numbers
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((acc, val) => acc + val, 0)
  return sum / numbers.length
}
