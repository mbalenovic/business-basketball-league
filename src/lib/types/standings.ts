import type { TeamId, LeagueId, SeasonId, RenderedText } from './common'

export interface StandingsTable {
  id: number
  title: RenderedText
  leagues: LeagueId[]
  seasons: SeasonId[]
  data: {
    [teamId: string]: {
      name: string
      pos: number
      w: string
      ltwo: string // losses
      pct: string
      gb: number
      pf: string // points for
      pa: string // points against
      diff: string
      home?: string
      road?: string // away
      lten?: string // last 10
      strk?: string // streak (HTML)
      form?: string // form (HTML)
      meusobniomjer?: string
    }
  }
}

export interface StandingsRow {
  pos: number
  team: string
  teamId: TeamId
  w: number // Wins
  l: number // Losses
  pct: number // Win percentage
  gb?: number // Games behind
  pts_plus: number // Points scored
  pts_minus: number // Points allowed
  diff: number // Point differential
  home?: string // Home record
  away?: string // Away record
  last_10?: string // Last 10 games
  streak?: string // Current streak
  form?: ('W' | 'L')[] // Recent form (last 5 games)
}

export interface LeagueStandings {
  leagueId: LeagueId
  seasonId: SeasonId
  leagueName: string
  seasonName: string
  updated: string
  standings: StandingsRow[]
}
