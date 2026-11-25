// import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ChartBar } from "@phosphor-icons/react";
import { createFileRoute, Link, Outlet, redirect, useLocation } from "@tanstack/react-router";
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
import { cn } from "@/utils/style";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User as UserIcon, Check } from "lucide-react";

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

function DashboardHeader({ isFullWidth }: { isFullWidth?: boolean }) {
	const { theme } = useTheme();
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();
	const [savedRecently, setSavedRecently] = useState(false);
	const [templateGalleryOpen, setTemplateGalleryOpen] = useState(false);
	const [activeTemplate, setActiveTemplate] = useState("azurill");


	// Sync active template from localStorage or custom event
	useEffect(() => {
		const loadTemplate = () => {
			try {
				const manualDraft = localStorage.getItem("resume_buddy_manual_draft");
				if (manualDraft) {
					const parsed = JSON.parse(manualDraft);
					if (parsed.selectedTemplate) {
						setActiveTemplate(parsed.selectedTemplate.toLowerCase());
						return;
					}
				}
				const storyDraft = localStorage.getItem("resume_buddy_guided_story_draft");
				if (storyDraft) {
					const parsed = JSON.parse(storyDraft);
					if (parsed.selectedTemplate) {
						setActiveTemplate(parsed.selectedTemplate.toLowerCase());
					}
				}
			} catch {
				// ignore
			}
		};
		loadTemplate();

		const handleStorage = () => loadTemplate();
		window.addEventListener("storage", handleStorage);
		window.addEventListener("resume_template_changed", handleStorage);
		return () => {
			window.removeEventListener("storage", handleStorage);
			window.removeEventListener("resume_template_changed", handleStorage);
		};
	}, []);

	const handleSelectTemplate = (tmplKey: string, tmplName: string) => {
		setActiveTemplate(tmplKey);
		setTemplateGalleryOpen(false);

		// Update localStorage drafts so builder screens pick it up immediately
		try {
			const manualDraft = localStorage.getItem("resume_buddy_manual_draft");
			const manualParsed = manualDraft ? JSON.parse(manualDraft) : {};
			manualParsed.selectedTemplate = tmplName;
			localStorage.setItem("resume_buddy_manual_draft", JSON.stringify(manualParsed));

			const storyDraft = localStorage.getItem("resume_buddy_guided_story_draft");
			const storyParsed = storyDraft ? JSON.parse(storyDraft) : {};
			storyParsed.selectedTemplate = tmplName;
			localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(storyParsed));

			window.dispatchEvent(new Event("resume_template_changed"));
		} catch {
			// ignore
		}
		toast.success(`Template changed to ${tmplName}!`);
	};

	const handleSaveAndContinue = (e: React.MouseEvent) => {
		e.preventDefault();
		setSavedRecently(true);
		toast.success("Progress saved! You can resume anytime from the dashboard.");
		setTimeout(() => {
			navigate({ to: "/dashboard/resumes" });
			setTimeout(() => setSavedRecently(false), 2000);
		}, 300);
	};

	const templateList = [
		{ key: "azurill", name: "Azurill", tags: "Two-column · Creative · Tech", color: "bg-emerald-500", preview: "/templates/jpg/azurill.jpg" },
		{ key: "bronzor", name: "Bronzor", tags: "Two-column · Clean · Corporate", color: "bg-slate-400", preview: "/templates/jpg/bronzor.jpg" },
		{ key: "chikorita", name: "Chikorita", tags: "Two-column · Marketing · Clean", color: "bg-teal-500", preview: "/templates/jpg/chikorita.jpg" },
		{ key: "ditgar", name: "Ditgar", tags: "Two-column · Modern Developer", color: "bg-sky-500", preview: "/templates/jpg/ditgar.jpg" },
		{ key: "ditto", name: "Ditto", tags: "ATS Friendly · Minimal", color: "bg-pink-500", preview: "/templates/jpg/ditto.jpg" },
		{ key: "gengar", name: "Gengar", tags: "Accent Colors · Bold Tech", color: "bg-purple-600", preview: "/templates/jpg/gengar.jpg" },
		{ key: "glalie", name: "Glalie", tags: "Minimal · Professional", color: "bg-slate-500", preview: "/templates/jpg/glalie.jpg" },
		{ key: "kakuna", name: "Kakuna", tags: "Single column · Modern", color: "bg-amber-500", preview: "/templates/jpg/kakuna.jpg" },
		{ key: "lapras", name: "Lapras", tags: "Creative · Side profile", color: "bg-blue-600", preview: "/templates/jpg/lapras.jpg" },
		{ key: "onyx", name: "Onyx", tags: "Executive · High contrast", color: "bg-zinc-700", preview: "/templates/jpg/onyx.jpg" },
		{ key: "pikachu", name: "Pikachu", tags: "Vibrant · Engineering", color: "bg-yellow-500", preview: "/templates/jpg/pikachu.jpg" },
		{ key: "rhyhorn", name: "Rhyhorn", tags: "Classic · Structured", color: "bg-stone-600", preview: "/templates/jpg/rhyhorn.jpg" },
	];

	return (
		<header
			className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#060b13]/90 backdrop-blur-md"
		>
			<div
				className={
					isFullWidth
						? "flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5"
						: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5"
				}
			>
				{/* Left: Logo, Prototype Badge, and Workspace Nav */}
				<div className="flex items-center gap-3 xl:gap-4 min-w-0">
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

					<span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
						<span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
						Prototype v1 · simulated AI
					</span>

					{/* YOUR RESUME WORKSPACE Header Tabs (when on builder/guided-story routes) */}
					{/* {isFullWidth && (
						<div className="flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-slate-800/80 overflow-x-auto">
							<span className="hidden xl:inline-block text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0 mr-1">
								YOUR RESUME WORKSPACE:
							</span>
							<button
								type="button"
								onClick={() => {
									if (location.pathname.includes("/guided-story")) {
										window.dispatchEvent(new CustomEvent("resume_workspace_tab", { detail: { tab: "plan" } }));
									} else {
										navigate({ to: "/dashboard/resumes/guided-story" as any });
									}
								}}
								className={cn(
									"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 border",
									location.pathname.includes("/guided-story")
										? "bg-[#0b1f1a] text-emerald-300 border-emerald-500/30"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								<span>Your Plan</span>
								<span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
									0/5
								</span>
							</button>

							<button
								type="button"
								onClick={() => {
									if (location.pathname.includes("/guided-story")) {
										window.dispatchEvent(new CustomEvent("resume_workspace_tab", { detail: { tab: "stories" } }));
									} else {
										navigate({ to: "/dashboard/resumes/guided-story" as any });
									}
								}}
								className={cn(
									"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 border",
									location.pathname.includes("/guided-story")
										? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								<span>Your Stories</span>
								<span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
									0
								</span>
							</button>

							<button
								type="button"
								onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
								className={cn(
									"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 border",
									location.pathname.includes("/manual-builder")
										? "bg-[#0b1f1a] text-emerald-300 border-emerald-500/30"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								<span>Details</span>
							</button>

							<button
								type="button"
								onClick={() => {
									if (location.pathname.includes("/guided-story")) {
										window.dispatchEvent(new CustomEvent("resume_workspace_tab", { detail: { tab: "export" } }));
									} else {
										window.dispatchEvent(new CustomEvent("resume_manual_tab", { detail: { tab: "export" } }));
									}
								}}
								className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 border bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
							>
								<span>Review & Export</span>
							</button>
						</div>
					)} */}
				</div>

				{/* Right: Actions (Template gallery button + Save and continue later) */}
				<div className="flex items-center gap-2.5">

					{/* Save and Continue Later (only in editor/builder) */}
					{isFullWidth && (
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
									<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
									<polyline points="17 21 17 13 7 13 7 21" />
									<polyline points="7 3 7 8 15 8" />
								</svg>
							)}
							<span>{savedRecently ? "Saved!" : "Save and continue later"}</span>
						</button>
					)}

					{/* Logged in User Profile & Log out or Log in Button */}
					{isAuthenticated && user ? (
						<div className="flex items-center gap-2 pl-2 border-l border-slate-800">
							<div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
								<span className="size-2 rounded-full bg-emerald-400" />
								<span className="max-w-[120px] truncate">{user.name || user.email.split("@")[0]}</span>
							</div>
							<button
								type="button"
								onClick={logout}
								title="Log out"
								className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
							>
								<LogOut className="size-3.5" />
								<span className="hidden md:inline">Log out</span>
							</button>
						</div>
					) : (
						<div className="flex items-center gap-2 pl-2 border-l border-slate-800">
							<button
								type="button"
								onClick={() => navigate({ to: "/auth/login" as any })}
								className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700 hover:border-slate-600 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
							>
								Log in
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Template Gallery Modal Dialog */}
			{templateGalleryOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
					onClick={() => setTemplateGalleryOpen(false)}
				>
					<div
						className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-800 bg-[#09101d] text-slate-100 shadow-2xl overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
							<div className="flex items-center gap-3">
								<div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
									<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
										<line x1="3" y1="9" x2="21" y2="9" />
										<line x1="9" y1="21" x2="9" y2="9" />
									</svg>
								</div>
								<div>
									<h2 className="text-lg font-bold text-white">Choose a Resume Template</h2>
									<p className="text-xs text-slate-400">
										Pick any layout design. All your details, stories, and photo will adapt instantly.
									</p>
								</div>
							</div>

							<button
								type="button"
								onClick={() => setTemplateGalleryOpen(false)}
								className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
								aria-label="Close"
							>
								<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						</div>

						{/* Modal Grid of Templates */}
						<div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{templateList.map((tmpl) => {
								const isSelected = activeTemplate === tmpl.key || activeTemplate === tmpl.name.toLowerCase();
								return (
									<div
										key={tmpl.key}
										onClick={() => handleSelectTemplate(tmpl.key, tmpl.name)}
										className={cn(
											"group relative flex flex-col rounded-xl border p-3 bg-slate-900/60 hover:bg-slate-800/60 cursor-pointer transition-all",
											isSelected
												? "border-emerald-500 bg-[#071b17] ring-2 ring-emerald-500/40"
												: "border-slate-800 hover:border-slate-700"
										)}
									>
										{/* Preview Thumbnail Card */}
										<div className="aspect-[3/4] w-full rounded-lg bg-slate-950/80 border border-slate-800/80 mb-3 overflow-hidden relative flex flex-col p-2.5">
											{/* Miniature layout mockup */}
											<div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-800">
												<div className={cn("size-2 rounded-full", tmpl.color)} />
												<div className="h-1.5 w-12 rounded bg-slate-700" />
											</div>
											<div className="flex-1 flex gap-2">
												<div className="w-1/3 space-y-1">
													<div className="h-1.5 w-full bg-slate-800 rounded" />
													<div className="h-1.5 w-3/4 bg-slate-800/60 rounded" />
													<div className="h-1.5 w-5/6 bg-slate-800/60 rounded" />
												</div>
												<div className="flex-1 space-y-1">
													<div className="h-1.5 w-full bg-slate-700/80 rounded" />
													<div className="h-1.5 w-full bg-slate-800/60 rounded" />
													<div className="h-1.5 w-4/5 bg-slate-800/60 rounded" />
													<div className="h-1.5 w-full bg-slate-800/60 rounded" />
												</div>
											</div>

											{isSelected && (
												<div className="absolute top-2 right-2 rounded-full bg-emerald-500 text-slate-950 p-1 shadow-md">
													<svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
														<polyline points="20 6 9 17 4 12" />
													</svg>
												</div>
											)}
										</div>

										<div className="flex items-center justify-between">
											<span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
												{tmpl.name}
											</span>
											{isSelected && (
												<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
													Active
												</span>
											)}
										</div>
										<p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{tmpl.tags}</p>
									</div>
								);
							})}
						</div>

						{/* Modal Footer */}
						<div className="flex items-center justify-between border-t border-slate-800 px-6 py-3.5 bg-slate-950/60">
							<span className="text-xs text-slate-400">
								Currently using: <strong className="text-white capitalize">{activeTemplate}</strong>
							</span>
							<button
								type="button"
								onClick={() => setTemplateGalleryOpen(false)}
								className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
							>
								Done
							</button>
						</div>
					</div>
				</div>
			)}


		</header>
	);
}

function RouteComponent() {
	useLingui();
	const { theme } = useTheme();
	const { backgroundTheme } = useSettingsStore();
	const location = useLocation();

	const isFullWidthRoute =
		location.pathname.includes("/manual-builder") ||
		location.pathname.includes("/guided-story");

	const hideDashboardHeader = location.pathname.includes("/guided-story");

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
			{!hideDashboardHeader && <DashboardHeader isFullWidth={isFullWidthRoute} />}

			{/* Main content — full-width bleed for builder/guided-story, contained for dashboard lists */}
			<main
				className={
					isFullWidthRoute
						? "relative z-10 w-full flex-1 flex flex-col p-0"
						: "@container relative z-10 mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6"
				}
			>
				<Outlet />
			</main>
		</div>
	);
}
