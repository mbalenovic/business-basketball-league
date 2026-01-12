import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams')({
  component: TeamsPage,
})

function TeamsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Teams
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Coming soon: Team rosters, statistics, and team pages.
      </p>
    </div>
  )
}
