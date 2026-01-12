import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
  getEvents,
  getEvent,
  getUpcomingMatches,
  getCompletedMatches,
  type GetEventsParams,
} from '../api/events'
import type { Match } from '../types/match'

/**
 * Query key factory for matches/events
 */
export const matchesKeys = {
  all: ['matches'] as const,
  lists: () => [...matchesKeys.all, 'list'] as const,
  list: (params?: GetEventsParams) => [...matchesKeys.lists(), params] as const,
  upcoming: (params?: Omit<GetEventsParams, 'status'>) =>
    [...matchesKeys.lists(), 'upcoming', params] as const,
  completed: (params?: Omit<GetEventsParams, 'status'>) =>
    [...matchesKeys.lists(), 'completed', params] as const,
  details: () => [...matchesKeys.all, 'detail'] as const,
  detail: (id: number) => [...matchesKeys.details(), id] as const,
}

/**
 * Hook to fetch all events/matches with optional filters
 */
export function useMatches(params?: GetEventsParams) {
  return useQuery({
    queryKey: matchesKeys.list(params),
    queryFn: () => getEvents(params),
  })
}

/**
 * Hook to fetch all matches with Suspense (for SSR)
 */
export function useSuspenseMatches(params?: GetEventsParams) {
  return useSuspenseQuery({
    queryKey: matchesKeys.list(params),
    queryFn: () => getEvents(params),
  })
}

/**
 * Hook to fetch upcoming matches
 */
export function useUpcomingMatches(
  params?: Omit<GetEventsParams, 'status'>,
) {
  return useQuery({
    queryKey: matchesKeys.upcoming(params),
    queryFn: () => getUpcomingMatches(params),
  })
}

/**
 * Hook to fetch completed matches
 */
export function useCompletedMatches(
  params?: Omit<GetEventsParams, 'status'>,
) {
  return useQuery({
    queryKey: matchesKeys.completed(params),
    queryFn: () => getCompletedMatches(params),
  })
}

/**
 * Hook to fetch a single match by ID
 */
export function useMatch(matchId: number) {
  return useQuery({
    queryKey: matchesKeys.detail(matchId),
    queryFn: () => getEvent(matchId),
    enabled: !!matchId,
  })
}

/**
 * Hook for live match updates (refetches more frequently)
 */
export function useLiveMatch(matchId: number) {
  return useQuery({
    queryKey: matchesKeys.detail(matchId),
    queryFn: () => getEvent(matchId),
    enabled: !!matchId,
    // Refetch every 30 seconds for live matches
    refetchInterval: 30000,
    // Keep fetching even when window is not focused
    refetchIntervalInBackground: true,
  })
}
