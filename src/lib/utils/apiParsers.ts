import type { StandingsTable, StandingsRow } from '../types/standings'

/**
 * Parse HTML form string to extract W/L array
 * Example: '<div class="sp-form-events"><a...>W</a> <a...>L</a></div>' -> ['W', 'L']
 */
function parseFormHTML(formHTML: string): ('W' | 'L')[] {
  if (!formHTML) return []

  // Extract all W/L from the HTML using regex
  const matches = formHTML.match(/>(W|L)</g)
  if (!matches) return []

  return matches.map(match => match.replace(/[><]/g, '') as 'W' | 'L')
}

/**
 * Parse HTML streak string to extract plain text
 * Example: '<span style="color:#888888">W4</span>' -> 'W4'
 */
function parseStreakHTML(streakHTML: string): string {
  if (!streakHTML) return ''

  // Extract text content from HTML
  const match = streakHTML.match(/>([WL]\d+)</i)
  if (!match) return ''

  return match[1]
}

/**
 * Parse SportsPress table API response into StandingsRow array
 */
export function parseStandingsTable(table: StandingsTable): StandingsRow[] {
  if (!table.data) return []

  const rows: StandingsRow[] = []

  // The data object has team IDs as keys
  Object.entries(table.data).forEach(([teamId, teamData]: [string, any]) => {
    // Skip teams with invalid data (no position, no name, or no games played)
    if (!teamData.pos || !teamData.name || teamData.pos === 0) {
      return
    }

    // Skip teams with no games played (0-0 record)
    const wins = Number(teamData.w) || 0
    const losses = Number(teamData.ltwo) || 0
    if (wins === 0 && losses === 0) {
      return
    }

    const row: StandingsRow = {
      pos: Number(teamData.pos),
      team: teamData.name,
      teamId: Number(teamId),
      w: wins,
      l: losses,
      pct: Number(teamData.pct) || 0,
      gb: Number(teamData.gb),
      pts_plus: Number(teamData.pf) || 0,
      pts_minus: Number(teamData.pa) || 0,
      diff: Number(teamData.diff) || 0,
      home: teamData.home,
      away: teamData.road,
      last_10: teamData.lten,
      streak: parseStreakHTML(teamData.strk),
      form: parseFormHTML(teamData.form),
    }

    rows.push(row)
  })

  // Sort by position
  return rows.sort((a, b) => a.pos - b.pos)
}

/**
 * Parse multiple standings tables from API response
 */
export function parseStandingsTables(tables: StandingsTable[]): StandingsRow[][] {
  return tables.map(table => parseStandingsTable(table))
}
