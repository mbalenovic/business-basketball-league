import { apiClient } from './client'
import type { Match } from '../types/match'

export interface GetEventsParams {
  league?: number
  season?: number
  team?: number
  status?: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled'
  per_page?: number
  page?: number
  order?: 'asc' | 'desc'
  orderby?: 'date' | 'title'
}

/**
 * Get all events (matches)
 */
export async function getEvents(params?: GetEventsParams): Promise<Match[]> {
  return apiClient.get<Match[]>('/events', params)
}

/**
 * Get a single event by ID
 */
export async function getEvent(eventId: number): Promise<Match> {
  return apiClient.get<Match>(`/events/${eventId}`)
}

/**
 * Get upcoming matches
 */
export async function getUpcomingMatches(
  params?: Omit<GetEventsParams, 'status'>,
): Promise<Match[]> {
  return getEvents({ ...params, status: 'scheduled', orderby: 'date', order: 'asc' })
}

/**
 * Get completed matches
 */
export async function getCompletedMatches(
  params?: Omit<GetEventsParams, 'status'>,
): Promise<Match[]> {
  return getEvents({ ...params, status: 'completed', orderby: 'date', order: 'desc' })
}
