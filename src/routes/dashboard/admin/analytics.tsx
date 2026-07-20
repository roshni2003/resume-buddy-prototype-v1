import {
	CaretLeft,
	CaretRight,
	ChartBar,
	CheckCircle,
	Clock,
	Download,
	Eye,
	ReadCvLogo,
	Robot,
	Stack,
	Timer,
	Warning,
	XCircle,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/utils/api";

export const Route = createFileRoute("/dashboard/admin/analytics")({
	component: AnalyticsPage,
});

function AnalyticsPage() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);

	const { data, isLoading, error } = useQuery({
		queryKey: ["user-analytics", page, limit],
		queryFn: () => api.fetchUserAnalytics(page, limit),
	});

	if (isLoading)
		return (
			<div className="flex min-h-[400px] items-center justify-center p-8">
				<div className="flex flex-col items-center gap-2">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent shadow-emerald-200/20 shadow-lg"></div>
					<p className="font-bold text-emerald-500">Syncing user analytics...</p>
				</div>
			</div>
		);

	if (error)
		return (
			<div className="m-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-12 text-center shadow-sm">
				<Warning size={48} className="mx-auto mb-4 text-rose-500" weight="duotone" />
				<h3 className="font-bold text-foreground text-xl tracking-tight">Analytics Sync Failed</h3>
				<p className="mt-2 font-medium text-muted-foreground">{(error as Error).message}</p>
				<Button
					variant="outline"
					className="cursor-pointer mt-6 border-rose-500/20 bg-background text-rose-500 hover:bg-rose-500/10"
					onClick={() => window.location.reload()}
				>
					Retry Connection
				</Button>
			</div>
		);

	const users = data?.users || [];
	const pagination = data?.pagination;

	return (
		<div className="space-y-8 p-6 lg:p-8">
			<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
				<div>
					<h1 className="font-black text-3xl text-foreground tracking-tight">User Analytics</h1>
					<p className="mt-1 font-medium text-muted-foreground">Monitor system performance, costs, and AI telemetry.</p>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3">
						<span className="font-bold text-muted-foreground text-xs uppercase tracking-widest">Page Capacity</span>
						<div className="relative">
							<select
								className="appearance-none rounded-xl border border-border bg-card py-2.5 pl-4 pr-10 font-bold text-foreground text-sm shadow-sm transition-colors hover:bg-muted/50 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
								value={limit}
								onChange={(e) => {
									setLimit(Number(e.target.value));
									setPage(1);
								}}
							>
								{[5, 10, 20, 50].map((l) => (
									<option key={l} value={l} className="bg-background text-foreground">
										{l} per view
									</option>
								))}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="m6 9 6 6 6-6" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="cursor-pointer group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 shadow-sm transition-all hover:shadow-md"
				>
					<div className="flex items-center justify-between pb-3">
						<span className="font-black text-[11px] text-emerald-500 uppercase tracking-[0.2em]">Live Database</span>
						<div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-500">
							<ChartBar className="size-5" weight="bold" />
						</div>
					</div>
					<div className="font-black text-4xl text-foreground">{pagination?.totalUsers || 0}</div>
					<div className="mt-2 font-bold text-emerald-500 text-sm">Active Tracked Users</div>
					<div className="absolute -right-4 -bottom-4 opacity-[0.05] transition-opacity group-hover:opacity-[0.1]">
						<ChartBar size={120} weight="fill" />
					</div>
				</motion.div>
			</div>

			<div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
				<div className="border-border border-b bg-muted/50 px-8 py-5">
					<h2 className="font-black text-foreground text-lg uppercase tracking-tight">Detailed Activity Report</h2>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm">
						<thead className="border-border border-b bg-muted/30">
							<tr>
								<th className="px-8 py-4 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
									User Identity
								</th>
								<th className="px-6 py-4 text-center font-black text-[10px] text-muted-foreground uppercase tracking-widest">
									Stats
								</th>
								<th className="px-6 py-4 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
									AI & Latency
								</th>
								<th className="px-6 py-4 text-center font-black text-[10px] text-muted-foreground uppercase tracking-widest">
									Revenue Impact
								</th>
								<th className="px-6 py-4 text-center font-black text-[10px] text-muted-foreground uppercase tracking-widest">
									Telemetry
								</th>
								<th className="px-8 py-4 text-right font-black text-[10px] text-muted-foreground uppercase tracking-widest">
									Last Sync
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{users.length === 0 ? (
								<tr>
									<td colSpan={6} className="h-60 text-center font-bold text-muted-foreground italic">
										No user patterns detected in current range.
									</td>
								</tr>
							) : (
								users.map((user) => (
									<tr key={user.userId} className="group transition-colors hover:bg-muted/50">
										<td className="px-8 py-6">
											<div className="flex items-center gap-3">
												<div className="flex size-10 items-center justify-center rounded-full bg-muted font-black text-muted-foreground text-xs shadow-inner">
													UID
												</div>
												<div className="font-bold font-mono text-[11px] text-foreground transition-colors group-hover:text-emerald-500">
													{String(user.userId).substring(0, 16)}...
												</div>
											</div>
										</td>
										<td className="px-6 py-6">
											<div className="flex flex-col items-center gap-2">
												<div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 shadow-sm">
													<ReadCvLogo className="size-3.5 text-emerald-500" weight="bold" />
													<span className="font-black text-foreground text-xs">{user.totalLiveResumes}</span>
												</div>
												<div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 shadow-sm">
													<Download className="size-3.5 text-blue-500" weight="bold" />
													<span className="font-black text-blue-500 text-xs">{user.downloads.total}</span>
												</div>
											</div>
										</td>
										<td className="px-6 py-6 font-bold text-foreground">
											<div className="flex flex-col gap-2">
												<div className="flex items-center gap-2">
													<Robot className="size-4 text-emerald-500" weight="fill" />
													<span className="text-foreground">
														{user.ai.totalCalls}{" "}
														<span className="font-black text-[10px] text-muted-foreground uppercase">hits</span>
													</span>
												</div>
												<div className="font-black text-[10px] text-muted-foreground uppercase tracking-tight">
													Usage: {user.ai.totalTokens.toLocaleString()} <span className="text-[9px]">TOKENS</span>
												</div>
											</div>
										</td>
										<td className="px-6 py-6 text-center">
											<div className="inline-block rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 font-black text-emerald-500 shadow-sm">
												${user.ai.totalCostUsd.toFixed(4)}
											</div>
										</td>
										<td className="px-6 py-6 text-center">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="outline"
														size="sm"
														className="cursor-pointer h-9 gap-2 rounded-xl border-emerald-500/30 bg-background font-bold text-emerald-500 shadow-sm transition-all hover:bg-emerald-600 hover:text-white active:scale-95"
														onClick={() => setSelectedUserId(user.userId)}
													>
														<Eye size={16} weight="bold" />
														Investigate
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-4xl overflow-hidden rounded-3xl border border-border bg-card text-foreground p-0 shadow-2xl">
													<AIInvocationsDetail userId={selectedUserId} />
												</DialogContent>
											</Dialog>
										</td>
										<td className="px-8 py-6 text-right">
											<div className="flex flex-col items-end gap-1">
												<span className="font-black text-foreground text-xs">
													{user.lastResumeUpdatedAt ? new Date(user.lastResumeUpdatedAt).toLocaleDateString() : "NEVER"}
												</span>
												<span className="font-bold text-[10px] text-muted-foreground uppercase">
													{user.lastResumeUpdatedAt
														? new Date(user.lastResumeUpdatedAt).toLocaleTimeString([], {
																hour: "2-digit",
																minute: "2-digit",
															})
														: "-"}
												</span>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="flex items-center justify-between border-border border-t bg-muted/50 p-6">
					<p className="font-black text-[11px] text-muted-foreground uppercase tracking-widest">
						Frame <span className="text-foreground">{pagination?.page}</span> of{" "}
						<span className="text-foreground">{pagination?.totalPages}</span>
					</p>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							className="cursor-pointer h-10 rounded-xl border-border bg-background px-5 font-black text-xs uppercase shadow-sm transition-all hover:translate-x-[-2px] hover:bg-muted"
							disabled={page <= 1}
							onClick={() => setPage((p) => p - 1)}
						>
							<CaretLeft className="mr-2 size-3" weight="bold" /> Prev
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="cursor-pointer h-10 rounded-xl border-border bg-background px-5 font-black text-xs uppercase shadow-sm transition-all hover:translate-x-[2px] hover:bg-muted"
							disabled={page >= (pagination?.totalPages || 1)}
							onClick={() => setPage((p) => p + 1)}
						>
							Next <CaretRight className="ml-2 size-3" weight="bold" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function AIInvocationsDetail({ userId }: { userId: string | number | null }) {
	const [page, setPage] = useState(1);
	const limit = 5;

	const { data, isLoading, error } = useQuery({
		queryKey: ["user-ai-invocations", userId, page],
		queryFn: () => (userId ? api.fetchUserAIInvocations(userId, page, limit) : Promise.reject("No User ID")),
		enabled: !!userId,
	});

	if (isLoading)
		return (
			<div className="flex h-[500px] flex-col items-center justify-center gap-4 bg-card text-foreground p-12">
				<div className="h-12 w-12 animate-spin rounded-full border-[5px] border-emerald-500 border-t-transparent shadow-2xl shadow-emerald-200/20"></div>
				<p className="translate-y-2 font-black text-muted-foreground text-sm uppercase tracking-widest">Decrypting Logs...</p>
			</div>
		);

	if (error)
		return (
			<div className="flex h-[500px] flex-col items-center justify-center bg-card text-foreground p-12 text-center">
				<Warning size={64} className="mb-6 text-rose-500" weight="duotone" />
				<h3 className="font-black text-2xl text-foreground uppercase tracking-tighter">Encryption Breach</h3>
				<p className="mt-2 font-medium text-muted-foreground">Failed to retrieve telemetry data.</p>
			</div>
		);

	const summary = data?.summary;
	const invocations = data?.invocations || [];
	const pagination = data?.pagination;

	return (
		<div className="flex max-h-[90vh] flex-col bg-card text-foreground">
			<DialogHeader className="border-border border-b bg-muted/30 p-8 text-left">
				<div className="flex items-center gap-5">
					<div className="rounded-2xl bg-emerald-600 p-3 text-white shadow-emerald-200/20 shadow-xl">
						<Robot size={32} weight="duotone" />
					</div>
					<div>
						<DialogTitle className="font-black text-2xl text-foreground tracking-tight">
							AI Invocation Telemetry
						</DialogTitle>
						<DialogDescription className="mt-0.5 font-bold text-muted-foreground text-sm">
							Secure drill-down for:{" "}
							<span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 font-mono text-emerald-500">{userId}</span>
						</DialogDescription>
					</div>
				</div>
			</DialogHeader>

			<div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
				{/* Top Hero Stats */}
				<div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
					<div className="cursor-pointer rounded-3xl border border-border bg-muted/50 p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="mb-2 flex items-center gap-2">
							<CheckCircle className="text-emerald-500" size={20} weight="fill" />
							<span className="font-black text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Success</span>
						</div>
						<div className="font-black text-2xl text-foreground">{summary?.successCount}</div>
					</div>
					<div className="cursor-pointer rounded-3xl border border-rose-500/20 bg-rose-500/10 p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="mb-2 flex items-center gap-2">
							<XCircle className="text-rose-500" size={20} weight="fill" />
							<span className="font-black text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Failure</span>
						</div>
						<div className="font-black text-2xl text-rose-500">{summary?.failedCalls}</div>
					</div>
					<div className="cursor-pointer rounded-3xl border border-blue-500/20 bg-blue-500/10 p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="mb-2 flex items-center gap-2">
							<Stack className="text-blue-500" size={20} weight="fill" />
							<span className="font-black text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Tokens</span>
						</div>
						<div className="font-black text-2xl text-blue-500">{summary?.totalTokens?.toLocaleString()}</div>
					</div>
					<div className="cursor-pointer rounded-3xl border border-amber-500/20 bg-amber-500/10 p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="mb-2 flex items-center gap-2">
							<Timer className="text-amber-500" size={20} weight="fill" />
							<span className="font-black text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Avg Time</span>
						</div>
						<div className="font-black text-2xl text-amber-500">{summary?.averageLatencyMs}ms</div>
					</div>
				</div>

				{/* Activity Feed */}
				<div className="space-y-6">
					<div className="flex items-center justify-between border-border border-b pb-3">
						<h4 className="font-black text-foreground text-sm uppercase italic tracking-widest">Recent Activity</h4>
						<span className="font-black text-[10px] text-muted-foreground uppercase">Live Feed</span>
					</div>

					{invocations.length === 0 ? (
						<div className="rounded-3xl border-2 border-border border-dashed p-20 text-center font-black text-muted-foreground text-sm uppercase tracking-widest">
							No recorded transmission.
						</div>
					) : (
						<div className="space-y-4">
							{invocations.map((item: any) => (
								<InvocationItem key={item.id} item={item} />
							))}
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between border-border border-t bg-card p-6">
				<p className="font-black text-[10px] text-muted-foreground uppercase tracking-widest">
					Buffer <span className="text-foreground">{pagination?.page}</span> /{" "}
					<span className="text-foreground">{pagination?.totalPages}</span>
				</p>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						className="cursor-pointer h-10 rounded-xl border-border bg-muted/50 px-4 font-black shadow-sm transition-all hover:bg-muted"
						disabled={page <= 1}
						onClick={() => setPage((p) => p - 1)}
					>
						<CaretLeft weight="bold" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="cursor-pointer h-10 rounded-xl border-border bg-muted/50 px-4 font-black shadow-sm transition-all hover:bg-muted"
						disabled={page >= (pagination?.totalPages || 1)}
						onClick={() => setPage((p) => p + 1)}
					>
						<CaretRight weight="bold" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function InvocationItem({ item }: { item: any }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className={`group relative overflow-hidden rounded-2xl border transition-all ${
				expanded
					? "scale-[1.01] border-emerald-500 bg-card shadow-xl ring-8 ring-emerald-500/10"
					: "border-border bg-card shadow-sm hover:border-muted-foreground/30"
			}`}
		>
			<div className="flex cursor-pointer items-center justify-between p-6 hover:bg-muted/30" onClick={() => setExpanded(!expanded)}>
				<div className="flex items-center gap-5">
					<div
						className={`rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-110 ${
							item.status === "success"
								? "bg-emerald-500/10 text-emerald-500"
								: item.status === "failure"
									? "bg-rose-500/10 text-rose-500"
									: "bg-amber-500/10 text-amber-500"
						}`}
					>
						<Robot size={24} weight={item.status === "success" ? "fill" : "bold"} />
					</div>
					<div>
						<div className="flex items-center gap-3">
							<span className="font-black text-base text-foreground capitalize tracking-tight">
								{item.keyName.replace(/([A-Z])/g, " $1").trim()}
							</span>
							<Badge
								variant="secondary"
								className={`rounded-lg border-none px-2 py-0.5 font-black text-[10px] uppercase shadow-sm ${
									item.status === "success"
										? "bg-emerald-500/20 text-emerald-500"
										: item.status === "failure"
											? "bg-rose-500/20 text-rose-500"
											: "bg-amber-500/20 text-amber-500"
								}`}
							>
								{item.status}
							</Badge>
						</div>
						<div className="mt-1 flex items-center gap-4">
							<span className="font-bold font-mono text-[10px] text-muted-foreground tracking-tighter">
								REF: {item.id.substring(0, 10)}...
							</span>
							<span className="flex items-center gap-1.5 font-bold text-[10px] text-muted-foreground uppercase">
								<Clock size={14} weight="bold" />
								{new Date(item.createdAt).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								})}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-6">
					<div className="text-right">
						<div className="font-black text-foreground text-sm tracking-tighter">
							{(item.inputTokens + item.outputTokens).toLocaleString()}{" "}
							<span className="ml-1 font-black text-[9px] text-muted-foreground uppercase tracking-widest">tokens</span>
						</div>
						<div className="mt-0.5 font-black text-[10px] text-muted-foreground uppercase tracking-tighter">
							IN: {item.inputTokens} | OUT: {item.outputTokens}
						</div>
					</div>
					<div className={`transition-all duration-300 ${expanded ? "translate-x-1 rotate-180" : "text-muted-foreground"}`}>
						<CaretRight size={20} weight="bold" className={`${expanded ? "rotate-90" : ""}`} />
					</div>
				</div>
			</div>

			<AnimatePresence>
				{expanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="overflow-hidden border-border border-t bg-muted/20 p-8"
					>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<div className="size-1.5 animate-pulse rounded-full bg-muted-foreground"></div>
									<span className="font-black text-[11px] text-muted-foreground uppercase tracking-[0.2em]">Input Context</span>
								</div>
								<div className="max-h-60 overflow-y-auto rounded-2xl border border-border bg-background p-5 font-bold text-foreground text-xs leading-relaxed shadow-inner">
									{item.userInput || "No input parameters detected."}
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<div className="size-1.5 animate-pulse rounded-full bg-emerald-500"></div>
									<span className="font-black text-[11px] text-emerald-500 uppercase tracking-[0.2em]">
										AI Response
									</span>
								</div>
								<div
									className={`max-h-60 overflow-y-auto rounded-2xl border p-5 font-black text-xs leading-relaxed shadow-inner ${
										item.status === "failure"
											? "border-rose-500/20 bg-rose-500/10 text-rose-500"
											: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
									}`}
								>
									{item.status === "failure" ? (
										<div className="space-y-2">
											<div className="inline-block rounded bg-rose-500/20 px-2 py-0.5 font-black text-[10px] text-rose-500 uppercase">
												Critical Failure: {item.errorCode}
											</div>
											<p className="font-medium font-mono text-[11px] text-rose-500">{item.errorMessage}</p>
										</div>
									) : (
										<pre className="custom-scrollbar whitespace-pre-wrap font-mono text-[11px]">
											{typeof item.response === "string" && item.response.startsWith("{")
												? JSON.stringify(JSON.parse(item.response), null, 2)
												: item.response || "No response generated."}
										</pre>
									)}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
