# BBL Redesign - Implementation Plan

## Project Overview

Building a modern, SEO-friendly Business Basketball League website using **TanStack Start** (SSR/SSG React framework) that connects to the existing **SportsPress WordPress REST API** at `https://bbl.hr/wp-json/sportspress/v2/`.

---

## Tech Stack

- **Frontend Framework**: TanStack Start (SSR/SSG React)
- **Styling**: TailwindCSS
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Icons**: Lucide React
- **TypeScript**: For type safety

---

## API Endpoints (Already Identified)

1. `/wp-json/sportspress/v2/players` - Player statistics
2. `/wp-json/sportspress/v2/teams` - Team information
3. `/wp-json/sportspress/v2/tables` - League standings
4. `/wp-json/sportspress/v2/events` - Match schedule/results
5. `/wp-json/sportspress/v2/seasons` - Season data
6. `/wp-json/sportspress/v2/leagues` - League data

---

## Key Improvements Over Current Site

### 1. **Better UX/UI**

- Clean, modern design with proper visual hierarchy
- Mobile-first responsive design
- Light/dark theme toggle
- Smooth animations and transitions

### 2. **Enhanced Functionality**

- **Search & Filters**: Real-time search for players/teams
- **Sorting**: Click column headers to sort any stat
- **Pagination**: Better performance with paginated results
- **Player Comparison**: Select multiple players to compare stats
- **Data Visualizations**: Charts showing performance trends

### 3. **Performance**

- Server-side rendering for better SEO
- Optimized images
- Lazy loading for charts and images
- Caching with TanStack Query

### 4. **Features**

- League standings with live updates
- Player leaderboard with advanced stats
- Team pages with rosters
- Match schedule with results
- Historical season data

---

## Project Structure

```
bbl-redesign/
├── app/
│   ├── routes/
│   │   ├── __root.tsx          # Root layout
│   │   ├── index.tsx             # Home page (standings + highlights)
│   │   ├── players/
│   │   │   ├── index.tsx         # Player leaderboard
│   │   │   └── $playerId.tsx    # Individual player page
│   │   ├── teams/
│   │   │   ├── index.tsx         # Teams list
│   │   │   └── $teamId.tsx      # Individual team page
│   │   ├── schedule.tsx         # Match schedule
│   │   └── standings.tsx        # League standings (detailed)
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Input.tsx
│   │   ├── features/            # Feature-specific components
│   │   │   ├── LeagueTable.tsx
│   │   │   ├── PlayerLeaderboard.tsx
│   │   │   ├── PlayerCard.tsx
│   │   │   ├── TeamCard.tsx
│   │   │   ├── MatchCard.tsx
│   │   │   ├── PlayerComparison.tsx
│   │   │   └── StatsChart.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── SearchBar.tsx
│   ├── lib/
│   │   ├── api/                 # API service layer
│   │   │   ├── client.ts        # Base API client
│   │   │   ├── players.ts       # Player API functions
│   │   │   ├── teams.ts         # Team API functions
│   │   │   ├── tables.ts        # Standings API functions
│   │   │   └── events.ts        # Events/matches API functions
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── usePlayers.ts
│   │   │   ├── useTeams.ts
│   │   │   ├── useStandings.ts
│   │   │   └── useMatches.ts
│   │   ├── types/               # TypeScript types
│   │   │   ├── player.ts
│   │   │   ├── team.ts
│   │   │   ├── match.ts
│   │   │   └── standings.ts
│   │   └── utils/               # Utility functions
│   │       ├── formatters.ts    # Date, number formatting
│   │       └── stats.ts         # Stats calculations
│   └── styles/
│       └── global.css           # Global styles + Tailwind imports
├── public/                      # Static assets
├── tailwind.config.js
├── postcss.config.js
└── app.config.ts                # TanStack Start config
```

---

## Implementation Phases

### Phase 1: Project Setup & Configuration ✅

- [x] Create TanStack Start project
- [x] Install dependencies
- [x] Configure TailwindCSS
- [x] Set up base API client
- [x] Create TypeScript types from API responses
- [x] Set up TanStack Query provider

**Mobile Considerations:**
- Configure mobile viewport meta tags
- Set up mobile-first Tailwind breakpoints (sm, md, lg, xl)
- Ensure touch-friendly default styles (minimum 44x44px tap targets)

### Phase 2: Core Layout & Navigation ✅

- [x] Build root layout with header/footer
- [x] Create navigation component
- [x] Implement theme toggle (light/dark)
- [x] Add responsive mobile menu

**Mobile Considerations:**
- Mobile-first hamburger menu with smooth animations
- Sticky header that collapses on scroll (mobile)
- Touch-friendly navigation items with adequate spacing
- Bottom navigation bar option for key sections
- Swipe gestures for menu open/close

### Phase 3: API Layer & Data Fetching ✅

- [x] Create API client functions for all endpoints
- [x] Set up custom React Query hooks
- [x] Implement error handling
- [x] Add loading states

**Mobile Considerations:**
- Optimize API payload sizes for mobile data usage
- Implement request debouncing for search (reduce mobile data)
- Add offline-first caching strategies
- Show data usage indicators for large requests
- Prioritize critical data loading on mobile

### Phase 4: Home Page & League Standings ✅

- [x] Build league standings table
- [x] Add sorting by columns
- [x] Show team form (W/L indicators)
- [x] Display point differential, streaks
- [x] Add season selector

**Mobile Considerations:**
- Horizontal scroll for wide tables with sticky first column
- Condensed mobile table view (hide less important columns)
- Tap to expand row for full team details
- Card-based layout alternative for mobile
- Large, touch-friendly sort buttons
- Swipe gestures to navigate between teams

### Phase 5: Player Leaderboard ✅

- [x] Build player leaderboard table
- [x] Add search functionality
- [x] Implement filters (team, position, min games)
- [x] Add column sorting
- [x] Implement pagination
- [x] Show player photos/avatars

**Mobile Considerations:**
- Mobile-optimized table with priority columns (PTS, REB, AST)
- Bottom sheet for filters on mobile
- Search bar fixed at top with keyboard optimization
- Infinite scroll instead of pagination on mobile
- Player card view option for small screens
- Touch-optimized column selector
- Quick filter chips for common selections

### Phase 6: Player & Team Pages

- [ ] Individual player page with full stats
- [ ] Career statistics and charts
- [ ] Team page with roster
- [ ] Team statistics and performance graphs

**Mobile Considerations:**
- Stacked single-column layouts for mobile
- Collapsible sections for stats categories
- Mobile-optimized hero images (smaller file sizes)
- Horizontal scroll for stat tables
- Tabbed interface for different stat views
- Pull-to-refresh for live data updates
- Share button optimized for mobile sharing

### Phase 7: Data Visualizations

- [ ] Performance trend charts (Recharts)
- [ ] Player comparison tool
- [ ] Team performance over time
- [ ] Points/assists/rebounds distribution

**Mobile Considerations:**
- Responsive charts that adapt to screen width
- Touch interactions for chart tooltips
- Pinch-to-zoom for detailed chart views
- Simplified chart views on small screens
- Portrait-optimized chart dimensions
- Lazy loading charts below the fold
- Reduce chart complexity on mobile (fewer data points)

### Phase 8: Match Schedule

- [ ] Display upcoming matches
- [ ] Show past results
- [ ] Filter by team, date
- [ ] Match detail view

**Mobile Considerations:**
- Mobile-friendly calendar with touch navigation
- Swipe between dates and weeks
- Compact match cards for list view
- Bottom sheet for match details
- Date picker optimized for mobile
- "Add to calendar" functionality
- Push notification opt-in for favorite teams

### Phase 9: Polish & Optimization

- [ ] Add loading skeletons
- [ ] Optimize images
- [ ] Add error boundaries
- [ ] Implement SEO meta tags
- [ ] Add Open Graph tags for social sharing
- [ ] Test responsive design
- [ ] Add animations/transitions

**Mobile Considerations:**
- Mobile-optimized loading skeletons
- WebP/AVIF images with mobile-specific sizes
- Touch gesture refinements (swipe, tap, long-press)
- Reduce motion option for accessibility
- Mobile-specific animations (lighter, faster)
- Test on actual devices (iOS Safari, Chrome Android)
- Optimize for slow 3G connections
- Haptic feedback for interactions (iOS/Android)

### Phase 10: Testing & Deployment

- [ ] Test all features
- [ ] Performance optimization
- [ ] SEO audit
- [ ] Deploy (Vercel/Netlify)

**Mobile Considerations:**
- Test on multiple mobile devices (iPhone, Android phones, tablets)
- Mobile performance testing (Lighthouse mobile scores)
- Test touch interactions and gestures
- Verify mobile SEO (mobile-friendly test)
- Test in mobile browsers (Safari, Chrome, Firefox)
- Check mobile data usage and loading times
- Test PWA capabilities (offline mode, install prompt)
- Verify responsive images are loading correctly

---

## Key Features Summary

1. **Home Page**

   - Current season standings
   - Top players highlight
   - Upcoming matches

2. **League Standings**

   - Full standings table
   - Sortable columns
   - Team records (home/away, last 10)
   - Win streaks
   - Points for/against

3. **Player Leaderboard**

   - All players with stats (PTS, AST, REB, STL, BLK, EFF)
   - Search by name
   - Filter by team, position
   - Sort by any stat
   - Pagination

4. **Individual Player Page**

   - Player photo and info
   - Season statistics
   - Career stats
   - Performance charts
   - Recent games

5. **Team Pages**

   - Team roster
   - Team statistics
   - Schedule/results
   - Player contributions chart

6. **Match Schedule**
   - Calendar view
   - List of upcoming/past matches
   - Match results
   - Box scores

---

## Design Principles

1. **Mobile-First**: Design for mobile, enhance for desktop
2. **Performance**: Fast loading, minimal JavaScript
3. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
4. **SEO**: Server-side rendering, proper meta tags, structured data
5. **Clean UI**: Lots of whitespace, clear typography, intuitive navigation
6. **Data-Driven**: Show insights, not just raw numbers

---

## API Data Structure Examples

### Player Data

```json
{
  "id": 12345,
  "title": { "rendered": "Player Name" },
  "slug": "player-name",
  "leagues": [69],
  "seasons": [239],
  "current_teams": [15978],
  "nationalities": ["hr"],
  "metrics": { "height": "195" },
  "number": "23",
  "statistics": {
    "69": {
      "239": {
        "pts": 150,
        "ppg": 15.0,
        "apg": 5.0,
        "rpg": 7.0,
        "spg": 2.0,
        "bpg": 1.0,
        "eff": 18.5,
        "g": 10
      }
    }
  }
}
```

### Team Data

```json
{
  "id": 15978,
  "title": { "rendered": "Team Name" },
  "slug": "team-name",
  "leagues": [69],
  "seasons": [239],
  "abbreviation": "TN"
}
```

### Standings Data

```json
{
  "team": "Team Name",
  "w": 4,
  "l": 1,
  "pct": 0.8,
  "pts_plus": 450,
  "pts_minus": 400,
  "diff": 50
}
```

---

## Next Steps

Continue with Phase 1 to complete setup and configuration.
