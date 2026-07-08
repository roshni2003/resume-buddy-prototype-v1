path = "/Users/sama/Desktop/reactive-resume/src/routes/dashboard/route.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useRouterState
content = content.replace(
    'import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";',
    'import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";'
)

# Update RouteComponent
old_component = """	return (
		<div
			className="flex min-h-screen flex-col bg-background text-foreground"
			style={getBackgroundStyle()}
		>
			<DashboardHeader />

			{/* Main content — sits above the orbs */}
			<main className="@container relative z-10 mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
				<Outlet />
			</main>
		</div>
	);"""

new_component = """	const router = useRouterState();
	const isMixpanel = router.location.pathname.includes('/mixpanel');

	if (isMixpanel) {
		return <Outlet />;
	}

	return (
		<div
			className="flex min-h-screen flex-col bg-background text-foreground"
			style={getBackgroundStyle()}
		>
			<DashboardHeader />

			{/* Main content — sits above the orbs */}
			<main className="@container relative z-10 mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
				<Outlet />
			</main>
		</div>
	);"""

content = content.replace(old_component, new_component)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed route layout")
