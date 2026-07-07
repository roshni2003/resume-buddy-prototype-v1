// import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ChartBar } from "@phosphor-icons/react";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDropdownMenu } from "@/components/user/dropdown-menu";
// authClient used in index.tsx for session
import { clearAuthToken, getAuthToken, getUrlToken, isValidToken, persistAuthToken } from "@/utils/auth-token";
import { getInitials } from "@/utils/string";
import { buildZuvyLoginUrl, redirectToZuvyLogin } from "@/utils/zuvy-redirect";

const AUTH_GATE_TIMEOUT_MS = 60_000;
const AUTH_GATE_POLL_MS = 500;

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (typeof window === "undefined") {
			return { session: context.session, needsAuth: false, isAuthenticated: Boolean(context.session?.user) };
		}

		const url = new URL(window.location.href);
		const devBypass = import.meta.env.DEV && url.searchParams.get("test") === "true";

		const urlToken = getUrlToken();
		if (urlToken) {
			await persistAuthToken(urlToken);
		}

		const token = getAuthToken();
		const hasToken = isValidToken(token);
		const hasUrlToken = isValidToken(urlToken);

		// If there's a token in storage but it's invalid/expired, wipe it.
		// This prevents stale tokens (local/session/cookie) from blocking the "no token" redirect.
		if (token && !hasToken) {
			clearAuthToken();
		}

		const tokenAfterClear = getAuthToken();
		const hasTokenAfterClear = isValidToken(tokenAfterClear);

		// If there's NO token in storage and NO token in the URL, user is not logged in.
		// Redirect immediately to Zuvy so no dashboard content mounts (and no API calls fire).
		if (!hasTokenAfterClear && !hasUrlToken && !devBypass) {
			throw redirect({
				href: buildZuvyLoginUrl(url.pathname + url.search + url.hash),
			});
		}

		// At this point: either token is valid OR we have a URL token in-flight.
		// If token isn't valid yet, render AuthGate to poll until storage commits.
		if (!hasTokenAfterClear && hasUrlToken && !devBypass) {
			return { session: context.session, needsAuth: true, isAuthenticated: false };
		}

		return { session: context.session, needsAuth: false, isAuthenticated: hasTokenAfterClear || devBypass };
	},
});

function AuthGate() {
	const [secondsLeft, setSecondsLeft] = useState(Math.ceil(AUTH_GATE_TIMEOUT_MS / 1000));

	useEffect(() => {
		const start = Date.now();
		let cancelled = false;
		let timer: ReturnType<typeof setTimeout> | null = null;

		const tick = async () => {
			if (cancelled) return;

			const urlToken = getUrlToken();
			if (urlToken) {
				await persistAuthToken(urlToken);
				if (cancelled) return;
			}

			const token = getAuthToken();
			const elapsed = Date.now() - start;
			console.log("[auth-debug] AuthGate.tick", {
				elapsedMs: elapsed,
				hasUrlToken: Boolean(urlToken),
				tokenInStore: Boolean(token),
				tokenValid: isValidToken(token),
			});
			if (isValidToken(token)) {
				console.log("[auth-debug] AuthGate.tick: token landed, reloading");
				window.location.reload();
				return;
			}

			if (elapsed >= AUTH_GATE_TIMEOUT_MS) {
				console.log("[auth-debug] AuthGate.tick: timed out, redirecting to Zuvy");
				redirectToZuvyLogin();
				return;
			}

			setSecondsLeft(Math.ceil((AUTH_GATE_TIMEOUT_MS - elapsed) / 1000));
			timer = setTimeout(tick, AUTH_GATE_POLL_MS);
		};

		void tick();

		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	}, []);

	return (
		<div
			className="flex min-h-screen flex-col items-center justify-center px-6"
			style={{ background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)" }}
		>
			<div className="flex max-w-md flex-col items-center gap-6 text-center">
				<img src="/zoe-icon.png" alt="Zoe AI" className="h-16 w-16 rounded-full object-cover dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
				<div className="size-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
				<div>
					<h1 className="mb-2 font-bold text-white text-xl">Logging you in...</h1>
					<p className="text-white/60 text-sm">
						Please wait while we securely sign you in. This usually takes a few seconds.
					</p>
				</div>
				<p className="text-white/30 text-xs">
					If this takes longer than expected, we'll redirect you to sign in again in {secondsLeft}s.
				</p>
			</div>
		</div>
	);
}

import { useSettingsStore } from "@/stores/settings";
import { useTheme } from "@/components/theme/provider";

function DashboardHeader() {
	const { theme } = useTheme();

	return (
		<header
			className="sticky top-0 z-30 border-b"
			style={{
				background: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(9, 13, 22, 0.85)",
				borderColor: theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
				backdropFilter: "blur(20px)",
				WebkitBackdropFilter: "blur(20px)",
			}}
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
				{/* Left: Logo */}
				<Link
					to="/dashboard/resumes"
					className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
				>
					<img src="/zoe-icon.png"
						alt="Resume Buddy"
						className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9 dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
					<span
						className={`font-bold text-base sm:text-lg ${theme === "light" ? "text-slate-900" : "text-white"}`}
						style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
					>
						Resume Buddy
					</span>
				</Link>

				{/* <Link
					to="/dashboard/admin/mixpanel"
					activeProps={{ className: "bg-emerald-50 text-emerald-700 shadow-sm" }}
					className="flex items-center gap-2 rounded-lg px-3 py-2 font-bold text-gray-600 text-sm transition-all hover:bg-gray-100 lg:px-4"
				>
					<ChartBar size={18} weight="bold" />
					<span>Insights</span>
				</Link> */}

				{/* Right: Settings & User menu */}
				<div className="flex items-center gap-2 sm:gap-4">
					<nav className="hidden items-center gap-1 sm:flex">
						{/* TODO: Add logic to conditionally render Analytics link for admins only if needed */}
						<Link
							to="/dashboard/admin/analytics"
							activeProps={{ className: theme === "light" ? "bg-slate-200 text-slate-900 shadow-sm" : "bg-white/10 text-white shadow-sm" }}
							className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${theme === "light" ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
						>
							User Analytics
						</Link>
					</nav>

					<Link
						to="/dashboard/settings"
						activeProps={{ className: theme === "light" ? "bg-slate-200 text-slate-900 shadow-sm" : "bg-white/10 text-white shadow-sm" }}
						className={`flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors ${theme === "light" ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
							<circle cx="12" cy="12" r="3"></circle>
						</svg>
						<span className="hidden sm:inline text-sm font-medium">Settings</span>
					</Link>

					<UserDropdownMenu>
						{({ session: userSession }) => (
							<button className="flex items-center justify-center rounded-full transition-all hover:ring-2 hover:ring-white/20">
								<Avatar className="size-8">
									<AvatarImage src={userSession.user.image ?? undefined} />
									<AvatarFallback
										className="text-xs text-white"
										style={{ background: "rgba(0,208,156,0.2)" }}
									>
										{getInitials(userSession.user.name)}
									</AvatarFallback>
								</Avatar>
							</button>
						)}
					</UserDropdownMenu>
				</div>
			</div>
		</header>
	);
}

function RouteComponent() {
	useLingui();
	const { needsAuth } = Route.useRouteContext();
	const { theme } = useTheme();
	const { backgroundTheme } = useSettingsStore();

	useEffect(() => {
		// Safety net: if beforeLoad didn't redirect for some reason (stale cached context,
		// in-app browser quirks, etc.), ensure we still send unauthenticated users to Zuvy.
		const urlToken = getUrlToken();
		const token = getAuthToken();
		const devBypass = import.meta.env.DEV && new URL(window.location.href).searchParams.get("test") === "true";

		if (!devBypass && !isValidToken(token) && !isValidToken(urlToken)) {
			redirectToZuvyLogin(window.location.pathname + window.location.search + window.location.hash);
		}
	}, []);

	useEffect(() => {
		const token = getAuthToken();
		console.log("[auth-debug] dashboard.RouteComponent mounted", {
			path: window.location.pathname + window.location.search + window.location.hash,
			hasStoredToken: Boolean(token),
		});
	}, []);

	if (needsAuth) {
		return <AuthGate />;
	}

	const getBackgroundStyle = () => {
		if (theme === "light") return { background: "var(--color-background)" };
		if (backgroundTheme === "navy") return { background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)" };
		if (backgroundTheme === "purple") return { background: "linear-gradient(145deg, #0f0514 0%, #1c0f2a 100%)" };
		if (backgroundTheme === "forest") return { background: "linear-gradient(145deg, #05140b 0%, #0f2a17 100%)" };
		return { background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)" };
	};

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
	);
}
