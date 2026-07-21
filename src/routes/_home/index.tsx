import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/")({
	beforeLoad: ({ location }) => {
		// Always redirect the root to the dashboard.
		// Use location.searchStr to safely forward any query parameters (like ?token=) through the SSR redirect.
		throw redirect({ href: `/dashboard/resumes${location.searchStr || ""}` });
	},
});
