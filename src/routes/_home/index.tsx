import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/")({
	beforeLoad: ({ location }) => {
		// IMPORTANT: Do NOT use `search` here — TanStack Router strips unknown params
		// (like ?token=) from the validated search object when there is no validateSearch.
		// Use location.searchStr (raw query string) with href to safely forward
		// the token through the SSR redirect to /dashboard/resumes.
		throw redirect({ href: `/dashboard/resumes${location.searchStr}` });
	},
});
