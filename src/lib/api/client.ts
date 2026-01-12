// Base API client for SportsPress WordPress REST API

const API_BASE_URL = 'https://bbl.hr/wp-json/sportspress/v2'

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

/**
 * Base fetch wrapper with error handling
 */
async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options

  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    if (!response.ok) {
      throw new APIError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText,
      )
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    // Network or parsing error
    throw new APIError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'Network Error',
    )
  }
}

/**
 * API client methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, params?: Record<string, any>) =>
    fetcher<T>(endpoint, { method: 'GET', params }),

  /**
   * POST request
   */
  post: <T>(endpoint: string, body?: any, params?: Record<string, any>) =>
    fetcher<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      params,
    }),

  /**
   * PUT request
   */
  put: <T>(endpoint: string, body?: any, params?: Record<string, any>) =>
    fetcher<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      params,
    }),

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string, params?: Record<string, any>) =>
    fetcher<T>(endpoint, { method: 'DELETE', params }),
}

export { API_BASE_URL }
