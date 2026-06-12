import { t } from "@lingui/macro";
import { authClient } from "@/integrations/auth/client";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { SortAscendingIcon, TagIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState, useEffect, useMemo } from "react";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { MultipleCombobox } from "@/components/ui/multiple-combobox";
import { Separator } from "@/components/ui/separator";
import { useDialogStore } from "@/dialogs/store";
import { api } from "@/utils/api";
import { getAuthToken, isValidToken } from "@/utils/auth-token";
import { mixpanelService } from "@/utils/mixpanel";
import { cn } from "@/utils/style";
import { GridView } from "./-components/grid-view";
import { ZoeBanner } from "./-components/zoe-banner";

function AnimatedNumber({ value }: { value: number }) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		let startTime: number | null = null;
		const duration = 200;
		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			setCount(Math.floor(progress * value));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}, [value]);
	return <span>{count}</span>;
}

function ZoeBanner() {
	const { openDialog } = useDialogStore();
	const [activeIndex, setActiveIndex] = useState(0);

	const steps = [
		{
			id: "upload",
			text: "📄 Upload your existing resume and let me enhance it.",
			label: "Upload resume",
			icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
		},
		{
			id: "create",
			text: "✨ Create a beautiful resume from scratch in minutes.",
			label: "Build from scratch",
			icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>,
		},
		{
			id: "match",
			text: "💼 Paste a job description and I'll tailor your resume to land the interview.",
			label: "Match to a job",
			icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>,
		}
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((current) => (current + 1) % steps.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-[#0f172a]/80 p-4 sm:p-5 shadow-lg backdrop-blur-sm transition-all">
			<div className="flex items-center gap-3 sm:gap-4">
				<div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
				</div>
				<div className="min-h-[44px] flex flex-col justify-center">
					<h3 className="font-bold text-white text-sm sm:text-base">Zoe works the way you do</h3>
					<p className="text-gray-400 text-xs sm:text-sm transition-all duration-300">{steps[activeIndex].text}</p>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full xl:w-auto">
				<button 
					onClick={() => openDialog("resume.upload", undefined)}
					className={cn(
						"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300",
						activeIndex === 0 ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border border-emerald-500/30 bg-white/5 text-gray-300 hover:bg-white/10"
					)}
				>
					{steps[0].icon}
					{steps[0].label}
				</button>
				<button 
					onClick={() => openDialog("resume.create", undefined)}
					className={cn(
						"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300",
						activeIndex === 1 ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border border-emerald-500/30 bg-white/5 text-gray-300 hover:bg-white/10"
					)}
				>
					{steps[1].icon}
					{steps[1].label}
				</button>
				<button 
					className={cn(
						"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300",
						activeIndex === 2 ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border border-emerald-500/30 bg-white/5 text-gray-300 hover:bg-white/10"
					)}
				>
					{steps[2].icon}
					{steps[2].label}
				</button>
			</div>
		</div>
	);
}

type SortOption = "lastUpdatedAt" | "createdAt" | "name";

const searchSchema = z.object({
	tags: z.array(z.string()).default([]),
	sort: z.enum(["lastUpdatedAt", "createdAt", "name"]).default("lastUpdatedAt"),
});

export const Route = createFileRoute("/dashboard/resumes/")({
	component: RouteComponent,
	validateSearch: zodValidator(searchSchema),
	search: {
		middlewares: [stripSearchParams({ tags: [], sort: "lastUpdatedAt" })],
	},
});

function RouteComponent() {
	const { i18n } = useLingui();
	const { tags, sort } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { openDialog } = useDialogStore();

	// Track page view immediately
	// Defensive: if auth redirect hasn't happened yet, don't fire queries.
	// The /dashboard parent route is responsible for redirecting to Zuvy when unauthenticated.
	const isAuthed = useMemo(() => isValidToken(getAuthToken()), []);

	// Invalidate statistics when component mounts to ensure fresh data
	useEffect(() => {
		mixpanelService.track("Page View", {
			page: "resumes",
			timestamp: new Date().toISOString(),
		});
	}, []);

	const { data: resumes } = useQuery({
		queryKey: ["resumes", { tags, sort }],
		queryFn: () => api.fetchResumes({ tags, sort }),
		enabled: isAuthed,
	});

	const { data: statistics } = useQuery({
		queryKey: ["statistics"],
		queryFn: api.fetchStatistics,
		enabled: isAuthed,
	});

	// Track User Resumes Count (Metric #2)
	useEffect(() => {
		if (resumes) {
			mixpanelService.track("User Resumes Count", {
				total_resumes: resumes.length,
				timestamp: new Date().toISOString(),
			});
		}
	}, [resumes]);

	// Track Users Who Created Resumes (Metric #1)
	useEffect(() => {
		if (resumes && resumes.length > 0) {
			mixpanelService.track("Resume Created", {
				resume_count: resumes.length,
				timestamp: new Date().toISOString(),
			});
		}
	}, [resumes]);

	// Track resume data loaded with all metrics
	useEffect(() => {
		if (resumes && statistics) {
			mixpanelService.track("Resume Data Loaded", {
				"number of resumes": resumes.length,
				"number of downloads": statistics.totalDownloads,
				lastUpdated: statistics.lastUpdated,
				avg_downloads_per_resume:
					statistics.totalResumes > 0 ? (statistics.totalDownloads / statistics.totalResumes).toFixed(2) : 0,
				has_active_filters: tags.length > 0,
				filter_count: tags.length,
				sort_method: sort,
				timestamp: new Date().toISOString(),
			});
		}
	}, [resumes, statistics, tags, sort]);

	const allTags = useMemo(() => {
		if (!resumes) return [];
		const tagsSet = new Set<string>();
		for (const resume of resumes) {
			for (const tag of resume.tags || []) {
				tagsSet.add(tag);
			}
		}
		return Array.from(tagsSet);
	}, [resumes]);

	useEffect(() => {
		if (resumes && resumes.length === 0) {
			openDialog("resume.onboarding", undefined);
		}
	}, [resumes, openDialog]);

	const tagOptions = useMemo(() => {
		if (!allTags) return [];
		return allTags.map((tag) => ({ value: tag, label: tag }));
	}, [allTags]);

	const sortOptions = useMemo(() => {
		return [
			{ value: "lastUpdatedAt", label: i18n.t("Last Updated") },
			{ value: "createdAt", label: i18n.t("Created") },
			{ value: "name", label: i18n.t("Name") },
		];
	}, [i18n]);

	const lastUpdateText = useMemo(() => {
		if (!statistics?.lastUpdated) return "Never";
		const now = new Date();
		const last = new Date(statistics.lastUpdated);
		const diff = now.getTime() - last.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		return `${days} day${days > 1 ? "s" : ""} ago`;
	}, [statistics]);

	const { data: session, isPending } = authClient.useSession();
	const user = session?.user as (typeof session)["user"] & { username?: string; displayName?: string } | undefined;
	
	const tokenName = useMemo(() => {
		try {
			const token = typeof window !== "undefined" ? (new URLSearchParams(window.location.search).get("token") || localStorage.getItem("authToken")) : null;
			if (!token) return "";
			const payload = JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))));
			return payload.name || payload.given_name || payload.preferred_username || payload.email?.split("@")[0] || "";
		} catch {
			return "";
		}
	}, []);

	// Try every field that might contain a display name — username is always set per auth config
	const displayName = user?.name || user?.displayName || user?.username || user?.email?.split("@")[0] || tokenName;
	const firstName = displayName?.split(" ")[0] || (isPending ? "" : "");

	const handleSortChange = (value: string | null, _option: unknown | null) => {
		const v = value ?? "lastUpdatedAt";
		mixpanelService.track("Sort Changed", {
			sort_by: v,
			current_filter_count: tags.length,
		});
		navigate({ search: { tags, sort: v as SortOption } });
	};

	const handleFilterChange = (value: string[]) => {
		mixpanelService.track("Filter Applied", {
			tags_selected: value.length,
			tags_count: value.length,
			current_sort: sort,
		});
		navigate({ search: { tags: value, sort } });
	};

	return (
		<div className="space-y-6 sm:space-y-8">
			{/* Welcome Banner */}
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<h1 className="font-bold text-2xl text-white sm:text-3xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
					Welcome back{firstName ? `, ${firstName}` : ""} <span className="inline-block origin-bottom-right hover:animate-pulse text-yellow-400">✨</span>
				</h1>
				<p className="text-gray-400 text-sm sm:text-base">
					Pick up where you left off or start something new with Zoe.
				</p>
			</div>

			{/* Zoe Action Banner */}
			<ZoeBanner />

			{/* Stats Grid */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{/* Total Resumes */}
				<div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 backdrop-blur-sm">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
						<svg className="size-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
					<div className="flex flex-col">
						<p className="text-xs font-medium text-gray-400"><Trans>Total Resumes</Trans></p>
						<p className="text-lg font-bold text-emerald-500"><AnimatedNumber value={statistics?.totalResumes ?? 0} /></p>
					</div>
				</div>
					</div>
				</div>

				{/* Last Update */}
				<div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 backdrop-blur-sm">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
						<svg className="size-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div className="flex flex-col">
						<p className="text-xs font-medium text-gray-400"><Trans>Last Update</Trans></p>
						<p className="text-lg font-bold text-emerald-500">{lastUpdateText}</p>
					</div>
				</div>
					</div>
				</div>

				{/* Total Downloads */}
				<div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 backdrop-blur-sm">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
						<svg className="size-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
						</svg>
					</div>
					<div className="flex flex-col">
						<p className="text-xs font-medium text-gray-400"><Trans>Total Downloads</Trans></p>
						<p className="text-lg font-bold text-emerald-500"><AnimatedNumber value={statistics?.totalDownloads ?? 0} /></p>
					</div>
				</div>
					</div>
				</div>

				{/* Total Submissions */}
				<div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 backdrop-blur-sm">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
						<svg className="size-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
						</svg>
					</div>
					<div className="flex flex-col">
						<p className="text-xs font-medium text-gray-400"><Trans>Total Submissions</Trans></p>
						<p className="text-sm font-semibold text-emerald-500 mt-1"><Trans>Coming Soon!</Trans></p>
					</div>
				</div>
					</div>
				</div>
			</div>

			<div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<h2 className="text-xl font-bold text-white">My Resumes</h2>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-x-2">
						<Combobox
							value={sort}
							options={sortOptions}
							onValueChange={(value) => {
								if (!value) return;
								navigate({ search: { tags, sort: value as SortOption } });
							}}
							buttonProps={{
								title: t`Sort by`,
								variant: "ghost",
								className: "text-gray-400 hover:text-white hover:bg-white/5",
								children: (_, option) => (
									<>
										<SortAscendingIcon />
										<span className="hidden sm:inline">{option?.label}</span>
									</>
								),
							}}
						/>
						<MultipleCombobox
							value={tags}
							options={tagOptions}
							onValueChange={handleFilterChange} // Use the new Mixpanel handler
							buttonProps={{
								variant: "ghost",
								title: t`Filter by`,
								className: cn("text-gray-400 hover:text-white hover:bg-white/5", { hidden: tagOptions.length === 0 }),
								children: (_, options) => (
									<>
										<TagIcon />
										{options.map((option) => (
											<Badge key={option.value} variant="outline" className="border-white/10 bg-white/5 text-gray-300">
												{option.label}
											</Badge>
										))}
									</>
								),
							}}
						/>
					</div>
				</div>
			</div>

			<GridView resumes={resumes ?? []} />
		</div>
	);
}
