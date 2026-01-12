import type {
  RenderedText,
  LeagueId,
  SeasonId,
  TeamId,
  PlayerId,
} from './common'

export interface Team {
  id: TeamId
  title: RenderedText
  slug: string
  leagues: LeagueId[]
  seasons: SeasonId[]
  abbreviation: string
  logo?: string
  venue?: string
  colors?: {
    primary: string
    secondary: string
  }
  link?: string
  content?: RenderedText
  url?: string
  featured_media?: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string }
          medium?: { source_url: string }
          full?: { source_url: string }
        }
      }
    }>
  }
}

export interface TeamRoster {
  teamId: TeamId
  teamName: string
  players: TeamPlayer[]
}

export interface TeamPlayer {
  id: PlayerId
  name: string
  number: string
  position?: string
  photo?: string
}

export interface TeamStats {
  teamId: TeamId
  teamName: string
  seasonStats: {
    wins: number
    losses: number
    winPct: number
    pointsFor: number
    pointsAgainst: number
    pointDifferential: number
    homeRecord: string
    awayRecord: string
    streak: string
    last10: string
  }
  playerContributions?: {
    playerId: PlayerId
    playerName: string
    ppg: number
    apg: number
    rpg: number
  }[]
}
