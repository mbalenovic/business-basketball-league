import { apiClient } from './client'
import type { Team } from '../types/team'

export interface GetTeamsParams {
  league?: number
  season?: number
  per_page?: number
  page?: number
  _embed?: boolean
}

/**
 * Get all teams
 */
export async function getTeams(params?: GetTeamsParams): Promise<Team[]> {
  return apiClient.get<Team[]>('/teams', params)
}

/**
 * Get a single team by ID
 */
export async function getTeam(teamId: number): Promise<Team> {
  return apiClient.get<Team>(`/teams/${teamId}`, { _embed: true })
}

/**
 * Get a single team by slug
 */
export async function getTeamBySlug(slug: string): Promise<Team> {
  const teams = await apiClient.get<Team[]>('/teams', { slug })
  if (teams.length === 0) {
    throw new Error(`Team with slug "${slug}" not found`)
  }
  return teams[0]
}
