import type { StandingsRow } from '../types/standings'

/**
 * Generate mock standings data for testing
 * This will be replaced with real API data
 */
export function generateMockStandings(): StandingsRow[] {
  const teams = [
    'Lakers',
    'Warriors',
    'Celtics',
    'Heat',
    'Bucks',
    'Suns',
    'Nuggets',
    'Clippers',
  ]

  const standings: StandingsRow[] = teams.map((team, index) => {
    const wins = 10 - index
    const losses = index + 2
    const pct = wins / (wins + losses)
    const ptsPlus = 850 - index * 30
    const ptsMinus = 800 + index * 25
    const diff = ptsPlus - ptsMinus

    // Generate random form (last 5 games)
    const form: ('W' | 'L')[] = Array.from({ length: 5 }, () =>
      Math.random() > 0.5 ? 'W' : 'L',
    )

    // Calculate streak from form
    let streak = form[form.length - 1]
    let count = 1
    for (let i = form.length - 2; i >= 0; i--) {
      if (form[i] === streak) {
        count++
      } else {
        break
      }
    }
    const streakString = `${streak}${count}`

    // Calculate games behind (relative to first place)
    const gb = index === 0 ? 0 : (wins - 10 + (index + 2 - 2)) / 2

    return {
      pos: index + 1,
      team,
      teamId: 1000 + index,
      w: wins,
      l: losses,
      pct,
      gb,
      pts_plus: ptsPlus,
      pts_minus: ptsMinus,
      diff,
      streak: streakString,
      form,
      home: `${Math.floor(wins / 2)}-${Math.floor(losses / 2)}`,
      away: `${wins - Math.floor(wins / 2)}-${losses - Math.floor(losses / 2)}`,
      last_10: `${Math.min(wins, 7)}-${Math.min(losses, 3)}`,
    }
  })

  return standings
}
