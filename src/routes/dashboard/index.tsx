import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardRedirect,
});

function DashboardRedirect() {
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.location.replace(`/dashboard/resumes${window.location.search || ""}${window.location.hash || ""}`);
		}
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#050b14] text-white">
			<meta httpEquiv="refresh" content="0;url=/dashboard/resumes" />
			<Navigate to="/dashboard/resumes" replace />
		</div>
	);
}
