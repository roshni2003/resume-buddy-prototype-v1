import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	Export,
	Funnel,
	HandPointing,
	Lightning,
	Robot,
	TrendUp,
	Users,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/utils/api";

export const Route = createFileRoute("/dashboard/admin/mixpanel")({
	component: MixpanelPreviewPage,
});

const KpiCard = ({ title, value, change, isPositive, icon: Icon, delay }: any) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay }}
		className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/40 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md"
	>
		<div className="flex items-center justify-between">
			<div className="space-y-1">
				<p className="font-medium text-gray-500 text-sm">{title}</p>
				<h3 className="font-bold text-3xl text-gray-900">{value}</h3>
			</div>
			<div className={`rounded-xl p-3 ${isPositive ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
				<Icon size={24} weight="duotone" />
			</div>
		</div>
		<div className="mt-4 flex items-center gap-1.5">
			<div
				className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-bold text-xs ${isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
			>
				{isPositive ? <ArrowUpRight weight="bold" /> : <ArrowDownRight weight="bold" />}
				{change}%
			</div>
			<span className="whitespace-nowrap font-medium text-gray-400 text-xs">vs last 30 days</span>
		</div>
		<div className="absolute -right-4 -bottom-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]">
			<Icon size={120} weight="fill" />
		</div>
	</motion.div>
);

function MixpanelPreviewPage() {
	const [selectedRange] = useState("Last 30 Days");

	// Fetch aggregate statistics
	const { data: stats, isLoading: isStatsLoading } = useQuery({
		queryKey: ["resume-statistics"],
		queryFn: () => api.fetchStatistics(),
	});

	// Fetch user analytics for deeper insights (sample of 100 users for trends)
	const { data: userAnalytics, isLoading: isUserLoading } = useQuery({
		queryKey: ["user-analytics-sample"],
		queryFn: () => api.fetchUserAnalytics(1, 100),
	});

	const isLoading = isStatsLoading || isUserLoading;

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="flex flex-col items-center gap-4">
					<div className="size-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent shadow-emerald-200 shadow-lg"></div>
					<p className="animate-pulse font-bold text-gray-400 text-lg">Gathering real-time insights...</p>
				</div>
			</div>
		);
	}

	// Dynamic Aggregation
	const totalUsers = userAnalytics?.pagination.totalUsers || 0;
	const totalResumes = stats?.totalResumes || 0;
	const totalDownloads = stats?.totalDownloads || 0;

	// AI Usage split (Real data from user sample)
	const users = userAnalytics?.users || [];
	const totalAiCalls = users.reduce((acc, u) => acc + u.ai.totalCalls, 0);
	const totalFailedAi = users.reduce((acc, u) => acc + u.ai.failedCalls, 0);
	const totalTokens = users.reduce((acc, u) => acc + u.ai.totalTokens, 0);
	const aiSuccessRate = totalAiCalls > 0 ? (((totalAiCalls - totalFailedAi) / totalAiCalls) * 100).toFixed(1) : "100";

	const aiAdoptionPercent =
		users.length > 0 ? ((users.filter((u) => u.ai.totalCalls > 0).length / users.length) * 100).toFixed(1) : "0";

	return (
		<div className="min-h-screen space-y-8 bg-linear-to-br from-gray-50 to-emerald-50/20 p-6 lg:p-10">
			{/* Header */}
			<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<motion.h1
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="font-extrabold text-3xl text-gray-900 tracking-tight md:text-4xl"
					>
						Product Insights <span className="font-black text-emerald-600 italic tracking-tighter">BETA</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 }}
						className="mt-2 max-w-lg font-medium text-gray-500"
					>
						Experience dynamic user behavior tracking and predictive conversion funnels with our upcoming Mixpanel
						integration.
					</motion.p>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors hover:bg-gray-50">
						<Calendar className="text-emerald-600" weight="bold" />
						<span className="font-bold text-gray-700 text-sm">{selectedRange}</span>
					</div>
					<button className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 font-bold text-sm text-white shadow-emerald-200 shadow-lg transition-all hover:scale-[1.02] hover:bg-emerald-700 active:scale-95">
						<Funnel weight="bold" />
						Add Filter
					</button>
				</div>
			</div>

			{/* KPI Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<KpiCard
					title="Total Users"
					value={totalUsers.toLocaleString()}
					change="10.2"
					isPositive={true}
					icon={Users}
					delay={0.1}
				/>
				<KpiCard
					title="Resumes Created"
					value={totalResumes.toLocaleString()}
					change="5.4"
					isPositive={true}
					icon={HandPointing}
					delay={0.2}
				/>
				<KpiCard
					title="Total Downloads"
					value={totalDownloads.toLocaleString()}
					change="2.1"
					isPositive={true}
					icon={Export}
					delay={0.3}
				/>
				<KpiCard
					title="AI Content Adoption"
					value={`${aiAdoptionPercent}%`}
					change="12.4"
					isPositive={true}
					icon={Robot}
					delay={0.4}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Conversion Funnel (Hybrid Real/Synthetic) */}
				<Card className="overflow-hidden rounded-3xl border-none bg-white shadow-xl lg:col-span-2">
					<div className="flex items-center justify-between border-gray-100 border-b bg-gray-50/30 p-6">
						<h3 className="font-bold text-gray-800 text-lg">System-wide Activation Funnel</h3>
						<TrendUp className="text-emerald-500" size={24} />
					</div>
					<div className="space-y-6 p-8">
						{[
							{ label: "Signed Up", count: totalUsers, percent: 100, color: "bg-emerald-500" },
							{
								label: "Created Resume",
								count: totalResumes,
								percent: totalUsers > 0 ? Math.round((totalResumes / totalUsers) * 100) : 0,
								color: "bg-emerald-400",
							},
							{
								label: "Used AI Features",
								count: Math.round(totalUsers * (Number(aiAdoptionPercent) / 100)),
								percent: Math.round(Number(aiAdoptionPercent)),
								color: "bg-emerald-300",
							},
							{
								label: "Downloaded File",
								count: totalDownloads,
								percent: totalResumes > 0 ? Math.round((totalDownloads / totalResumes) * 100) : 0,
								color: "bg-emerald-200 text-emerald-900",
							},
						].map((step, idx) => (
							<div key={idx} className="group relative">
								<div className="mb-2 flex items-end justify-between">
									<span className="font-bold text-gray-700 text-sm">{step.label}</span>
									<div className="text-right">
										<span className="block font-extrabold text-gray-900">{step.count}</span>
										<span className="font-bold text-[10px] text-gray-400 uppercase">{step.percent}% CONV.</span>
									</div>
								</div>
								<div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${step.percent}%` }}
										transition={{ delay: 0.5 + idx * 0.1, duration: 1, ease: "easeOut" }}
										className={`h-full ${step.color} relative`}
									>
										<div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent" />
									</motion.div>
								</div>
							</div>
						))}
						<div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
							<Lightning weight="fill" className="mt-1 shrink-0 text-emerald-500" />
							<p className="font-medium text-emerald-800 text-sm leading-relaxed">
								<span className="font-bold">Conversion Insight:</span> Users who use the{" "}
								<span className="font-bold italic underline decoration-2 decoration-emerald-300">AI Assistant</span> are
								4.2x more likely to export their resume within the first session.
							</p>
						</div>
					</div>
				</Card>

				{/* Feature Distribution */}
				<Card className="rounded-3xl border-none bg-white shadow-xl">
					<div className="border-gray-100 border-b bg-gray-50/30 p-6">
						<h3 className="font-bold text-gray-800 text-lg">AI Usage Split</h3>
					</div>
					<div className="flex flex-col items-center justify-center p-8">
						<div className="relative flex size-48 items-center justify-center">
							<svg className="size-full -rotate-90 transform">
								<circle
									cx="96"
									cy="96"
									r="80"
									stroke="currentColor"
									strokeWidth="24"
									fill="transparent"
									className="text-gray-100"
								/>
								<motion.circle
									initial={{ strokeDashoffset: 502 }}
									animate={{ strokeDashoffset: 502 * (1 - Number(aiAdoptionPercent) / 100) }}
									transition={{ delay: 1, duration: 1.5 }}
									cx="96"
									cy="96"
									r="80"
									stroke="currentColor"
									strokeWidth="24"
									strokeDasharray="502"
									fill="transparent"
									className="text-emerald-500"
								/>
							</svg>
							<div className="absolute inset-0 flex flex-col items-center justify-center">
								<span className="font-extrabold text-3xl">{aiAdoptionPercent}%</span>
								<span className="font-bold text-[10px] text-gray-400 uppercase">AI Adoption</span>
							</div>
						</div>

						<div className="mt-10 w-full space-y-4">
							<div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-full bg-emerald-500" />
									<span className="font-bold text-gray-700 text-sm">Total AI Calls</span>
								</div>
								<span className="font-bold text-emerald-700 text-sm">{totalAiCalls.toLocaleString()}</span>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-full bg-emerald-300" />
									<span className="font-bold text-gray-700 text-sm">Success Rate</span>
								</div>
								<span className="font-bold text-gray-500 text-sm">{aiSuccessRate}%</span>
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* Retention Heatmap Dummy */}
			<Card className="overflow-hidden rounded-3xl border-none bg-white shadow-xl">
				<div className="flex items-center justify-between border-gray-100 border-b bg-gray-50/30 p-6">
					<h3 className="font-bold text-gray-800 text-lg">User Retention Cohorts</h3>
					<Badge variant="outline" className="font-bold text-[10px] uppercase tracking-wider">
						Rolling 30 Days
					</Badge>
				</div>
				<div className="overflow-x-auto p-8">
					<table className="w-full text-xs">
						<thead>
							<tr>
								<th className="px-4 py-2 text-left font-bold text-gray-400 uppercase tracking-widest">Cohort</th>
								<th className="px-4 py-2 text-center font-bold text-gray-400 uppercase">Size</th>
								{[0, 1, 2, 3, 4, 5, 6].map((w) => (
									<th key={w} className="px-4 py-2 text-center font-bold text-gray-400 uppercase">
										W{w}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{[
								{ date: "Oct 27 - Nov 02", size: "3,482", values: [100, 42, 31, 28, 26, 22, 21] },
								{ date: "Oct 20 - Oct 26", size: "3,124", values: [100, 38, 30, 27, 24, 21, null] },
								{ date: "Oct 13 - Oct 19", size: "2,942", values: [100, 36, 29, 25, 22, null, null] },
								{ date: "Oct 06 - Oct 12", size: "3,211", values: [100, 35, 28, 24, null, null, null] },
							].map((row, i) => (
								<tr key={i} className="hover:bg-gray-50/50">
									<td className="whitespace-nowrap px-4 py-4 font-bold text-gray-700">{row.date}</td>
									<td className="px-4 py-4 text-center font-medium text-gray-500">{row.size}</td>
									{row.values.map((v, j) => (
										<td key={j} className="p-1">
											{v !== null ? (
												<div
													className={`flex size-full min-w-[40px] cursor-default items-center justify-center rounded-xl py-4 font-bold shadow-sm transition-all hover:scale-[1.05] ${
														v > 60
															? "bg-emerald-600 text-white"
															: v > 35
																? "border border-emerald-300 bg-emerald-400 text-emerald-900"
																: v > 25
																	? "bg-emerald-200 text-emerald-800"
																	: "border border-emerald-100 bg-emerald-50 text-emerald-700"
													}`}
													style={{ opacity: 0.4 + (v / 100) * 0.6 }}
												>
													{v}%
												</div>
											) : (
												<div className="size-full min-h-[48px] rounded-xl bg-gray-50" />
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>

			{/* Footer / CTA */}
			<div className="flex flex-col items-center justify-center border-gray-200 border-t border-dashed pt-12 pb-6">
				<p className="font-medium text-gray-400 text-sm italic">
					Showing dummy data for concept validation. Proposed Mixpanel events are being tracked for early
					implementation.
				</p>
			</div>
		</div>
	);
}

const Card = ({ children, className }: any) => (
	<div className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>{children}</div>
);
