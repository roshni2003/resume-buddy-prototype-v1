import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { SortAscendingIcon, TagIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useMemo } from "react";
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

	// Sync User Profile for total resumes length accurately
	useEffect(() => {
		if (resumes && resumes.length !== undefined) {
			mixpanelService.setProfileProperties({
				"Total Resumes": resumes.length,
			});

			// Removing the broken tracking events below that fired repeatedly upon page load
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
			openDialog("resume.create", undefined);
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
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
				<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
					<div className="mb-3 flex items-start justify-between">
						<div>
							<p className="mb-2 text-gray-600 text-xs sm:text-sm">
								<Trans>Total Resumes</Trans>
							</p>
							<p className="font-bold text-emerald-600 text-sm sm:text-base">{statistics?.totalResumes ?? 0}</p>
						</div>
						<div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50">
							<svg className="size-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Last Update */}
				<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
					<div className="mb-3 flex items-start justify-between">
						<div>
							<p className="mb-2 text-gray-600 text-xs sm:text-sm">
								<Trans>Last Update</Trans>
							</p>
							<p className="font-semibold text-emerald-600 text-sm sm:text-base">{lastUpdateText}</p>
						</div>
						<div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50">
							<svg className="size-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Total Downloads */}
				<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
					<div className="mb-3 flex items-start justify-between">
						<div>
							<p className="mb-1 text-gray-600 text-xs sm:text-sm">
								<Trans>Total Downloads</Trans>
							</p>
							<p className="mb-2 text-gray-500 text-xs">
								<Trans>This month</Trans>
							</p>
							<p className="font-bold text-emerald-600 text-sm sm:text-base">{statistics?.totalDownloads ?? 0}</p>
						</div>
						<div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50">
							<svg className="size-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Total Submissions */}
				<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
					<div className="mb-3 flex items-start justify-between">
						<div>
							<p className="mb-2 text-gray-600 text-xs sm:text-sm">
								<Trans>Total Submissions</Trans>
							</p>
							<p className="font-semibold text-amber-600 text-sm sm:text-base">
								<Trans>Coming Soon!</Trans>
							</p>
						</div>
						<div className="flex size-10 items-center justify-center rounded-lg bg-gray-200">
							<svg className="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 10h16M4 14h16M4 18h16"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<Separator />

			<div className="flex items-center gap-x-4">
				<Combobox
					value={sort}
					options={sortOptions}
					onValueChange={handleSortChange} // Use only this one
					buttonProps={{
						title: t`Sort by`,
						variant: "ghost",
						children: (_, option) => (
							<>
								<SortAscendingIcon />
								{option?.label}
							</>
						),
					}}
				/>

				<MultipleCombobox
					value={tags}
					options={tagOptions}
					onValueChange={handleFilterChange} // Use only this one
					buttonProps={{
						variant: "ghost",
						title: t`Filter by`,
						className: cn({ hidden: tagOptions.length === 0 }),
						children: (_, options) => (
							<>
								<TagIcon />
								{options.map((option) => (
									<Badge key={option.value} variant="outline">
										{option.label}
									</Badge>
								))}
							</>
						),
					}}
				/>
			</div>

			<GridView resumes={resumes ?? []} />
		</div>
	);
}
