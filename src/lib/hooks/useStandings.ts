import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getTables, getTable, type GetTablesParams } from '../api/tables'
import type { StandingsTable } from '../types/standings'

/**
 * Query key factory for standings
 */
export const standingsKeys = {
  all: ['standings'] as const,
  lists: () => [...standingsKeys.all, 'list'] as const,
  list: (params?: GetTablesParams) =>
    [...standingsKeys.lists(), params] as const,
  details: () => [...standingsKeys.all, 'detail'] as const,
  detail: (id: number) => [...standingsKeys.details(), id] as const,
}

/**
 * Hook to fetch all standings tables with optional filters
 */
export function useStandings(params?: GetTablesParams) {
  return useQuery({
    queryKey: standingsKeys.list(params),
    queryFn: () => getTables(params),
  })
}

/**
 * Hook to fetch all standings tables with Suspense (for SSR)
 */
export function useSuspenseStandings(params?: GetTablesParams) {
  return useSuspenseQuery({
    queryKey: standingsKeys.list(params),
    queryFn: () => getTables(params),
  })
}

/**
 * Hook to fetch a single standings table by ID
 */
export function useStandingsTable(tableId: number) {
  return useQuery({
    queryKey: standingsKeys.detail(tableId),
    queryFn: () => getTable(tableId),
    enabled: !!tableId,
  })
}
