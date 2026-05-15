// import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
// import { ReadCvLogoIcon } from "@phosphor-icons/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDropdownMenu } from "@/components/user/dropdown-menu";
import { clearAuthToken, getAuthToken, getUrlToken, isValidToken, persistAuthToken } from "@/utils/auth-token";
import { getInitials } from "@/utils/string";
import { buildZuvyLoginUrl, redirectToZuvyLogin } from "@/utils/zuvy-redirect";

// On some devices (iOS Safari private mode, Facebook/Instagram in-app browsers) the
// localStorage write committed in beforeLoad doesn't reflect immediately on the next read.
// Instead of redirecting back to Zuvy on the first miss, render <AuthGate /> and keep
// retrying for up to 60s before giving up. This breaks the redirect loop in the common
// case where the storage write succeeds a moment later.
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

			// Re-attempt persistence from the URL each tick: on some devices the storage
			// quota opens up after a delay, so a retry may succeed where the first write failed.
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
				// Storage finally has a valid token — reload so the route re-runs
				// beforeLoad and renders the dashboard with auth.
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
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
			<div className="flex max-w-md flex-col items-center gap-6 text-center">
				<img src="/zoe-talking.png" alt="Zoe AI" className="h-16 w-12" />
				<div className="size-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
				<div>
					<h1 className="mb-2 font-bold text-gray-900 text-xl">Logging you in...</h1>
					<p className="text-gray-600 text-sm">
						Please wait while we securely sign you in. This usually takes a few seconds.
					</p>
				</div>
				<p className="text-gray-400 text-xs">
					If this takes longer than expected, we'll redirect you to sign in again in {secondsLeft}s.
				</p>
			</div>
		</div>
	);
}

function RouteComponent() {
	useLingui();
	const { needsAuth } = Route.useRouteContext();

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

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			{/* Header */}
			<header className="border-gray-200 border-b bg-white shadow-sm">
				<div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
					{/* Left: Logo and Title */}
					<div className="flex items-center gap-2 sm:gap-3">
						<img src="/zoe-talking.png" alt="Zoe AI" className="h-8 w-6 rounded-full sm:h-10 sm:w-8" />
						<h1 className="font-bold text-base text-gray-900 sm:text-lg md:text-xl">Resume Buddy</h1>
					</div>{" "}
					{/* Center: Navigation */}
					{/* <nav className="flex items-center gap-2">
						<Link
							to="/dashboard/resumes"
							activeProps={{ className: "bg-emerald-50 text-emerald-700" }}
							className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-gray-100 sm:px-4"
						>
							<ReadCvLogoIcon className="size-5" />
							<span>{i18n._(t`Resumes`)}</span>
						</Link>
					</nav> */}
					{/* Right: User Menu */}
					<UserDropdownMenu>
						{({ session }) => (
							<button className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100">
								<Avatar className="size-8">
									<AvatarImage src={session.user.image ?? undefined} />
									<AvatarFallback className="text-xs">{getInitials(session.user.name)}</AvatarFallback>
								</Avatar>
								<div className="hidden text-left md:block">
									<p className="font-medium text-sm">{session.user.name}</p>
									<p className="text-gray-500 text-xs">{session.user.email}</p>
								</div>
							</button>
						)}
					</UserDropdownMenu>
				</div>
			</header>

			{/* Main Content */}
			<main className="@container mx-auto w-full max-w-7xl flex-1 p-6">
				<Outlet />
			</main>
		</div>
	);
}
