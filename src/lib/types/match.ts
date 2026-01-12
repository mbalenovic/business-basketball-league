import type {
  RenderedText,
  LeagueId,
  SeasonId,
  TeamId,
  EventId,
} from './common'

export interface Match {
  id: EventId
  title: RenderedText
  slug: string
  date: string
  time?: string
  leagues: LeagueId[]
  seasons: SeasonId[]
  teams: TeamId[]
  venue?: string
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled'
  results?: MatchResult
  link?: string
}

export interface MatchResult {
  homeTeamId: TeamId
  awayTeamId: TeamId
  homeScore: number
  awayScore: number
  quarters?: QuarterScore[]
  overtime?: boolean
}

export interface QuarterScore {
  quarter: number
  homeScore: number
  awayScore: number
}

export interface MatchDetail {
  id: EventId
  date: string
  time?: string
  venue?: string
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled'
  homeTeam: {
    id: TeamId
    name: string
    logo?: string
    score?: number
  }
  awayTeam: {
    id: TeamId
    name: string
    logo?: string
    score?: number
  }
  quarters?: QuarterScore[]
  boxScore?: BoxScore
}

export interface BoxScore {
  homeTeam: TeamBoxScore
  awayTeam: TeamBoxScore
}

export interface TeamBoxScore {
  teamId: TeamId
  teamName: string
  players: PlayerBoxScore[]
  totals: {
    points: number
    rebounds: number
    assists: number
    steals: number
    blocks: number
  }
}

export interface PlayerBoxScore {
  playerId: number
  playerName: string
  number: string
  minutes: number
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  fgm: number
  fga: number
  '3pm': number
  '3pa': number
  ftm: number
  fta: number
}

export interface MatchSchedule {
  upcoming: Match[]
  completed: Match[]
  live: Match[]
}
