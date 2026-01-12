import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
  getPlayers,
  getPlayer,
  getPlayerBySlug,
  type GetPlayersParams,
} from '../api/players'
import type { Player } from '../types/player'

/**
 * Query key factory for players
 */
export const playersKeys = {
  all: ['players'] as const,
  lists: () => [...playersKeys.all, 'list'] as const,
  list: (params?: GetPlayersParams) =>
    [...playersKeys.lists(), params] as const,
  details: () => [...playersKeys.all, 'detail'] as const,
  detail: (id: number) => [...playersKeys.details(), id] as const,
  detailBySlug: (slug: string) =>
    [...playersKeys.details(), 'slug', slug] as const,
}

/**
 * Hook to fetch all players with optional filters
 */
export function usePlayers(params?: GetPlayersParams) {
  return useQuery({
    queryKey: playersKeys.list(params),
    queryFn: () => getPlayers(params),
  })
}

/**
 * Hook to fetch all players with Suspense (for SSR)
 */
export function useSuspensePlayers(params?: GetPlayersParams) {
  return useSuspenseQuery({
    queryKey: playersKeys.list(params),
    queryFn: () => getPlayers(params),
  })
}

/**
 * Hook to fetch a single player by ID
 */
export function usePlayer(playerId: number) {
  return useQuery({
    queryKey: playersKeys.detail(playerId),
    queryFn: () => getPlayer(playerId),
    enabled: !!playerId,
  })
}

/**
 * Hook to fetch a single player by slug
 */
export function usePlayerBySlug(slug: string) {
  return useQuery({
    queryKey: playersKeys.detailBySlug(slug),
    queryFn: () => getPlayerBySlug(slug),
    enabled: !!slug,
  })
}
