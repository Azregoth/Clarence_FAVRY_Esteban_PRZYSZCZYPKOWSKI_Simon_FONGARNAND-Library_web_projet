import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authors')({
  component: () => <div>Page Auteurs</div>,
})