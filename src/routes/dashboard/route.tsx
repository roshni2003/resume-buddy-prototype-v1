// import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ChartBar } from "@phosphor-icons/react";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDropdownMenu } from "@/components/user/dropdown-menu";
// authClient used in index.tsx for session
import { clearAuthToken, getAuthToken, getUrlToken, isValidToken, persistAuthToken } from "@/utils/auth-token";
import { isStandaloneMode } from "@/utils/local-resumes";
import { getInitials } from "@/utils/string";
import { buildZuvyLoginUrl, redirectToZuvyLogin } from "@/utils/zuvy-redirect";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useSettingsStore } from "@/stores/settings";
import { useTheme } from "@/components/theme/provider";

const AUTH_GATE_TIMEOUT_MS = 60_000;
const AUTH_GATE_POLL_MS = 500;

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		return { session: context.session, needsAuth: false, isAuthenticated: true };
	},
});

function AuthGate({ showAuthHelp }: { showAuthHelp?: boolean }) {
	const [secondsLeft, setSecondsLeft] = useState(Math.ceil(AUTH_GATE_TIMEOUT_MS / 1000));
	const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

	useEffect(() => {
		if (showAuthHelp) return;

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

	if (showAuthHelp) {
		return (
			<div
				className="flex min-h-screen flex-col items-center justify-center px-6"
				style={{ background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)" }}
			>
				<div className="flex max-w-lg w-full flex-col items-center gap-6 text-center bg-card/10 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
					<img src="/zoe-icon.png" alt="Zoe AI" className="h-16 w-16 rounded-full object-cover dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
					<div className="w-full">
						<h1 className="mb-2 font-bold text-white text-xl">Authentication Required</h1>
						<p className="text-white/80 text-sm mb-6">
							You are running the app without an authentication token.
						</p>
						<div className="bg-black/40 text-left p-5 rounded-xl text-sm text-white/90 border border-white/5 space-y-4 w-full">
							<p><strong className="text-emerald-400">Step 1:</strong> Click the button below to log in to Zuvy.</p>
							<p><strong className="text-emerald-400">Step 2:</strong> In the Zuvy dashboard, click on <strong>"Learn with Zoe"</strong>.</p>
							<p><strong className="text-emerald-400">Step 3:</strong> You will be redirected to the production Zoe site. <strong>Copy the <code className="bg-black px-1.5 py-0.5 rounded text-emerald-300 text-xs break-all">?token=...</code></strong> part from the URL.</p>
							<div className="w-full">
								<strong className="text-emerald-400">Step 4:</strong> Come back to your environment and paste the token at the end of the URL like so:<br />
								<code className="block mt-2 bg-black p-2 rounded text-xs text-emerald-300 break-all">
									{currentOrigin}/dashboard/resumes?token=eyJhb...
								</code>
							</div>
						</div>
					</div>
					<button
						onClick={() => redirectToZuvyLogin(window.location.pathname + window.location.search + window.location.hash)}
						className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-2.5 font-medium transition-colors cursor-pointer"
					>
						Go to Zuvy Login
					</button>
				</div>
			</div>
		);
	}

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

function DashboardHeader() {
	const { theme } = useTheme();
	const navigate = useNavigate();
	const [savedRecently, setSavedRecently] = useState(false);

	const handleSaveAndContinue = (e: React.MouseEvent) => {
		e.preventDefault();
		setSavedRecently(true);
		toast.success("Progress saved! You can resume anytime from the dashboard.");
		setTimeout(() => {
			navigate({ to: "/dashboard/resumes" });
			setTimeout(() => setSavedRecently(false), 2000);
		}, 300);
	};

	return (
		<header
			className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#060b13]/90 backdrop-blur-md"
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
				{/* Left: Logo & Prototype Badge */}
				<div className="flex items-center gap-3">
					<Link
						to="/dashboard/resumes"
						className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
					>
						<div className="size-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-base shadow-sm shadow-emerald-500/20">
							Z
						</div>
						<span
							className="font-bold text-base sm:text-lg text-white"
							style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
						>
							Resume Buddy
						</span>
					</Link>

					<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
						<span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
						Prototype v1 · simulated AI
					</span>
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleSaveAndContinue}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700 hover:border-slate-600 text-xs sm:text-sm font-semibold text-slate-200 transition-all cursor-pointer shadow-sm active:scale-95"
					>
						{savedRecently ? (
							<svg className="size-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
								<polyline points="20 6 9 17 4 12" />
							</svg>
						) : (
							<svg className="size-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
								<polyline points="17 21 17 13 7 13 7 21"/>
								<polyline points="7 3 7 8 15 8"/>
							</svg>
						)}
						<span>{savedRecently ? "Saved!" : "Save and continue later"}</span>
					</button>
				</div>
			</div>
		</header>
	);
}

function RouteComponent() {
	useLingui();
	const { theme } = useTheme();
	const { backgroundTheme } = useSettingsStore();

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
