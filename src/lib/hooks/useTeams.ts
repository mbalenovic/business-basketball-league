import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
  getTeams,
  getTeam,
  getTeamBySlug,
  type GetTeamsParams,
} from '../api/teams'
import type { Team } from '../types/team'

/**
 * Query key factory for teams
 */
export const teamsKeys = {
  all: ['teams'] as const,
  lists: () => [...teamsKeys.all, 'list'] as const,
  list: (params?: GetTeamsParams) => [...teamsKeys.lists(), params] as const,
  details: () => [...teamsKeys.all, 'detail'] as const,
  detail: (id: number) => [...teamsKeys.details(), id] as const,
  detailBySlug: (slug: string) =>
    [...teamsKeys.details(), 'slug', slug] as const,
}

/**
 * Hook to fetch all teams with optional filters
 */
export function useTeams(params?: GetTeamsParams) {
  return useQuery({
    queryKey: teamsKeys.list(params),
    queryFn: () => getTeams(params),
  })
}

/**
 * Hook to fetch all teams with Suspense (for SSR)
 */
export function useSuspenseTeams(params?: GetTeamsParams) {
  return useSuspenseQuery({
    queryKey: teamsKeys.list(params),
    queryFn: () => getTeams(params),
  })
}

/**
 * Hook to fetch a single team by ID
 */
export function useTeam(teamId: number) {
  return useQuery({
    queryKey: teamsKeys.detail(teamId),
    queryFn: () => getTeam(teamId),
    enabled: !!teamId,
  })
}

/**
 * Hook to fetch a single team by slug
 */
export function useTeamBySlug(slug: string) {
  return useQuery({
    queryKey: teamsKeys.detailBySlug(slug),
    queryFn: () => getTeamBySlug(slug),
    enabled: !!slug,
  })
}
