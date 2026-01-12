import type {
  RenderedText,
  LeagueId,
  SeasonId,
  TeamId,
  PlayerId,
  StatsByLeagueSeason,
} from './common'

export interface Player {
  id: PlayerId
  title: RenderedText
  slug: string
  leagues: LeagueId[]
  seasons: SeasonId[]
  current_teams: TeamId[]
  nationalities: string[]
  metrics: PlayerMetrics
  number: string
  statistics: StatsByLeagueSeason
  position?: string
  date_of_birth?: string
  photo?: string
  link?: string
  featured_media?: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string }
          medium?: { source_url: string }
          'sportspress-fit-icon'?: { source_url: string }
        }
      }
    }>
  }
}

export interface PlayerMetrics {
  height?: string // in cm
  weight?: string // in kg
}

export interface PlayerLeaderboardItem {
  id: PlayerId
  name: string
  slug: string
  team: string
  teamId: TeamId
  number: string
  position?: string
  photo?: string
  stats: {
    ppg: number
    apg: number
    rpg: number
    spg: number
    bpg: number
    eff: number
    gamesPlayed: number
  }
}

export interface PlayerDetailStats {
  seasonStats: {
    ppg: number
    apg: number
    rpg: number
    spg: number
    bpg: number
    eff: number
    fg_pct: number
    '3p_pct': number
    ft_pct: number
    gamesPlayed: number
  }
  careerStats?: {
    totalPoints: number
    totalAssists: number
    totalRebounds: number
    avgPPG: number
    avgAPG: number
    avgRPG: number
    totalGames: number
  }
  recentGames?: GameStats[]
}

export interface GameStats {
  eventId: number
  date: string
  opponent: string
  points: number
  assists: number
  rebounds: number
  steals: number
  blocks: number
  minutes: number
  result: 'W' | 'L'
}
