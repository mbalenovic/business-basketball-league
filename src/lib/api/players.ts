import { apiClient } from './client'
import type { Player } from '../types/player'

export interface GetPlayersParams {
  league?: number
  season?: number
  team?: number
  per_page?: number
  page?: number
  search?: string
}

/**
 * Get all players
 */
export async function getPlayers(
  params?: GetPlayersParams,
): Promise<Player[]> {
  return apiClient.get<Player[]>('/players', { ...params, _embed: true })
}

/**
 * Get a single player by ID
 */
export async function getPlayer(playerId: number): Promise<Player> {
  return apiClient.get<Player>(`/players/${playerId}`, { _embed: true })
}

/**
 * Get a single player by slug
 */
export async function getPlayerBySlug(slug: string): Promise<Player> {
  const players = await apiClient.get<Player[]>('/players', { slug })
  if (players.length === 0) {
    throw new Error(`Player with slug "${slug}" not found`)
  }
  return players[0]
}
