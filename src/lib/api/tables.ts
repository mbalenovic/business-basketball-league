import { apiClient } from './client'
import type { StandingsTable } from '../types/standings'

export interface GetTablesParams {
  league?: number
  season?: number
  per_page?: number
  page?: number
}

/**
 * Get league standings tables
 */
export async function getTables(
  params?: GetTablesParams,
): Promise<StandingsTable[]> {
  return apiClient.get<StandingsTable[]>('/tables', params)
}

/**
 * Get a single standings table by ID
 */
export async function getTable(tableId: number): Promise<StandingsTable> {
  return apiClient.get<StandingsTable>(`/tables/${tableId}`)
}
