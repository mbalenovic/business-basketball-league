import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/schedule')({
  component: SchedulePage,
})

function SchedulePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Match Schedule
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Coming soon: Upcoming matches, past results, and match details.
      </p>
    </div>
  )
}
