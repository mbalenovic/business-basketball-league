// Common types shared across the application

export interface RenderedText {
  rendered: string
}

export interface APIResponse<T> {
  data: T
  error?: string
  status: number
}

// League and Season IDs
export type LeagueId = number
export type SeasonId = number
export type TeamId = number
export type PlayerId = number
export type EventId = number

// Statistics for a specific league and season
export interface StatsByLeagueSeason {
  [leagueId: string]: {
    [seasonId: string]: PlayerStats
  }
}

export interface PlayerStats {
  pts: number // Total points
  ppg: number // Points per game
  apg: number // Assists per game
  rpg: number // Rebounds per game
  spg: number // Steals per game
  bpg: number // Blocks per game
  eff: number // Efficiency
  g: number // Games played
  fgm?: number // Field goals made
  fga?: number // Field goals attempted
  fg_pct?: number // Field goal percentage
  '3pm'?: number // 3-pointers made
  '3pa'?: number // 3-pointers attempted
  '3p_pct'?: number // 3-point percentage
  ftm?: number // Free throws made
  fta?: number // Free throws attempted
  ft_pct?: number // Free throw percentage
  orpg?: number // Offensive rebounds per game
  drpg?: number // Defensive rebounds per game
  tov?: number // Turnovers
  pf?: number // Personal fouls
}
