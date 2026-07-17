import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useMemo, useState } from "react";
import { api } from "@/utils/api";

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
import { AnimatePresence, motion } from "framer-motion";
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

export const Route = createFileRoute("/dashboard/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Resume Buddy — Analytics Dashboard" },
      { name: "description", content: "Product insights, AI usage, and retention analytics for Resume Buddy." },
    ],
  }),
  component: DashboardPage,
});

/* ------------------------------------------------------------------ */
/* Mock data (shape mirrors the api.fetchStatistics / user analytics) */
/* ------------------------------------------------------------------ */
const MOCK = {
  totalUsers: 18,
  totalResumes: 8,
  totalDownloads: 12,
  aiAdoption: 44.4,
  totalAiCalls: 601,
  aiSuccessRate: 98.8,
  activity: [
    { format: "(not set)", activated: 27, avgPerUser: 1.48, downloads: 0, uniqueDownloaders: 0 },
    { format: "docx", activated: 0, avgPerUser: 0, downloads: 1, uniqueDownloaders: 1 },
    { format: "pdf", activated: 0, avgPerUser: 0, downloads: 7, uniqueDownloaders: 4 },
  ],
  aiAnalysis: [
    { feature: "FinalReview", success: true, uniques: 4, tokens: 71070, cost: 0.021 },
    { feature: "experience", success: true, uniques: 3, tokens: 1807, cost: 0.00056 },
    { feature: "summary", success: true, uniques: 2, tokens: 772, cost: 0.00023 },
  ],
  filters: [
    { sortBy: "(not set)", pageViews: 36, resumeDataLoaded: 27, sortChanged: 0, downloaded: 8 },
    { sortBy: "createdAt", pageViews: 0, resumeDataLoaded: 0, sortChanged: 1, downloaded: 0 },
    { sortBy: "lastUpdatedAt", pageViews: 0, resumeDataLoaded: 0, sortChanged: 1, downloaded: 0 },
  ],
  journey: [
    { step: "Page View", count: 36, pct: 100 },
    { step: "Resume Data Loaded", count: 27, pct: 75 },
    { step: "Any event", count: 22, pct: 91.48 },
    { step: "AI Token Usage", count: 7, pct: 31.82 },
    { step: "Resume Downloaded", count: 3, pct: 42.86 },
  ],
  cohorts: [
    { date: "Oct 27 – Nov 02", size: "3,482", values: [100, 42, 31, 28, 26, 22, 21] },
    { date: "Oct 20 – Oct 26", size: "3,124", values: [100, 38, 30, 27, 24, 21, null] },
    { date: "Oct 13 – Oct 19", size: "2,942", values: [100, 36, 29, 25, 22, null, null] },
    { date: "Oct 06 – Oct 12", size: "3,211", values: [100, 35, 28, 24, null, null, null] },
  ],
};

type DashboardData = typeof MOCK;
type TabId = "overview" | "activity" | "ai" | "search" | "journey";

function DashboardPage() {
  const [tab, setTab] = useState<TabId>("overview");

  // Fetch aggregate statistics
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["resume-statistics"],
    queryFn: () => api.fetchStatistics(),
  });

  // Fetch user analytics for deeper insights
  const { data: userAnalytics, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-analytics-sample"],
    queryFn: () => api.fetchUserAnalytics(1, 100),
  });

  const isLoading = isStatsLoading || isUserLoading;

  // Merge real data with mock data (fallback to mock if backend is empty/0 for demo purposes)
  const data = useMemo(() => {
    const merged = { ...MOCK };
    
    if (userAnalytics) {
      merged.totalUsers = userAnalytics.pagination.totalUsers || MOCK.totalUsers;
      const users = userAnalytics.users;
      if (users.length > 0) {
        const totalAiCalls = users.reduce((acc, u) => acc + u.ai.totalCalls, 0);
        const totalFailedAi = users.reduce((acc, u) => acc + u.ai.failedCalls, 0);
        
        merged.totalAiCalls = totalAiCalls || MOCK.totalAiCalls;
        merged.aiSuccessRate = totalAiCalls > 0 ? Number((((totalAiCalls - totalFailedAi) / totalAiCalls) * 100).toFixed(1)) : MOCK.aiSuccessRate;
        merged.aiAdoption = users.length > 0 ? Number(((users.filter((u) => u.ai.totalCalls > 0).length / users.length) * 100).toFixed(1)) : MOCK.aiAdoption;
      }
    }
    
    if (stats) {
      merged.totalResumes = stats.totalResumes || MOCK.totalResumes;
      merged.totalDownloads = stats.totalDownloads || MOCK.totalDownloads;
    }
    
    return merged;
  }, [stats, userAnalytics]);

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Resume Activity" },
    { id: "ai", label: "AI Analysis" },
    { id: "search", label: "Search & Filter" },
    { id: "journey", label: "User Journey" },
  ];

  return (
    <div className="space-y-8 pb-10">


      <div className="w-full">
        {/* Title */}
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black tracking-tight text-foreground">
                Product Insights <span className="italic text-primary">Dashboard</span>
              </h1>
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-bold text-primary">Live</span>
                <span className="rounded-full border border-border px-3 py-1 font-medium text-muted-foreground">Last 30 days</span>
              </div>
            </div>
            <p className="mt-1 max-w-2xl text-sm font-medium text-muted-foreground">
              Unified view of resume creation, AI usage, search behavior and retention — replacing the Mixpanel handoff.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-border bg-muted/40 px-4 py-2 font-medium text-sm hover:bg-muted transition-colors">
              Export CSV
            </button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
              Add Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-border bg-muted/30 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="size-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent shadow-emerald-200/20 shadow-lg"></div>
              <p className="animate-pulse font-bold text-muted-foreground text-sm">Gathering real-time insights...</p>
            </div>
          </div>
        ) : (
          <>
            {tab === "overview" && <OverviewTab data={data} />}
            {tab === "activity" && <ActivityTab data={data} />}
            {tab === "ai" && <AIAnalysisTab data={data} />}
            {tab === "search" && <SearchTab data={data} />}
            {tab === "journey" && <JourneyTab data={data} />}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Panels ------------------------------- */

function OverviewTab({ data }: { data: DashboardData }) {
  const kpis = [
    { label: "Total Users", value: data.totalUsers.toLocaleString(), change: "+10.2%", icon: "👥" },
    { label: "Resumes Created", value: data.totalResumes.toLocaleString(), change: "+5.4%", icon: "📝" },
    { label: "Total Downloads", value: data.totalDownloads.toLocaleString(), change: "+2.1%", icon: "⬇" },
    { label: "AI Adoption", value: `${data.aiAdoption}%`, change: "+12.4%", icon: "🤖" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <Card key={k.label} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</div>
                <div className="mt-2 text-3xl font-bold">{k.value}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-lg">{k.icon}</div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">↗ {k.change}</span>
              <span className="text-muted-foreground/70">vs last 30 days</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Funnel + AI split */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeader title="System-wide Activation Funnel" hint="Live" />
          <div className="space-y-4">
            {[
              { label: "Signed Up", count: data.totalUsers, pct: 100 },
              { label: "Created Resume", count: data.totalResumes, pct: data.totalUsers > 0 ? Math.round((data.totalResumes / data.totalUsers) * 100) : 0 },
              { label: "Used AI Features", count: Math.round(data.totalUsers * (data.aiAdoption / 100)), pct: data.aiAdoption },
              { label: "Downloaded File", count: data.totalDownloads, pct: data.totalUsers > 0 ? Math.round((data.totalDownloads / data.totalUsers) * 100) : 0 },
            ].map((s, idx) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{s.label}</span>
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{s.count.toLocaleString()}</span> · {s.pct}% conv.
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted/40">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                    style={{ width: `${Math.min(s.pct, 100)}%`, animation: `grow-bar 900ms ${idx * 120}ms both` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground">
            <span className="text-primary">⚡</span>
            <span>
              <span className="font-semibold text-primary">Insight:</span> Users who use the AI Assistant are{" "}
              <span className="font-semibold">4.2×</span> more likely to export their resume within the first session.
            </span>
          </div>
        </Card>

        <Card>
          <SectionHeader title="AI Usage Split" />
          <DonutGauge percent={data.aiAdoption} />
          <div className="mt-6 space-y-3">
            <Row label="Total AI Calls" value={data.totalAiCalls.toLocaleString()} dot="bg-emerald-400" />
            <Row label="Success Rate" value={`${data.aiSuccessRate}%`} dot="bg-emerald-300" />
            <Row
              label="Total Tokens"
              value={data.aiAnalysis.reduce((a, r) => a + r.tokens, 0).toLocaleString()}
              dot="bg-emerald-500"
            />
          </div>
        </Card>
      </div>

      {/* Retention */}
      <Card>
        <SectionHeader title="User Retention Cohorts" hint="Rolling 30 days" />
        <CohortHeatmap data={data.cohorts} />
      </Card>
    </div>
  );
}

function ActivityTab({ data }: { data: DashboardData }) {
  return (
    <Card>
      <SectionHeader title="Resume Activity Metrics" hint="Last 3 months" />
      <Table
        head={["Format", "Activated Users", "Avg Resumes / User", "Total Downloads", "Unique Downloaders"]}
        rows={data.activity.map((r) => [
          r.format,
          r.activated.toString(),
          r.avgPerUser.toFixed(2),
          r.downloads.toString(),
          r.uniqueDownloaders.toString(),
        ])}
        totals={["Overall", "27", "1.48", "8", "4"]}
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <MiniStat label="Download share · PDF" value="87.5%" bar={87.5} />
        <MiniStat label="Download share · DOCX" value="12.5%" bar={12.5} />
        <MiniStat label="Activation rate" value="150%" bar={100} />
      </div>
    </Card>
  );
}

function AIAnalysisTab({ data }: { data: DashboardData }) {
  const totalTokens = useMemo(() => data.aiAnalysis.reduce((a, r) => a + r.tokens, 0), [data]);
  const totalUniques = useMemo(() => Math.round(data.totalUsers * (data.aiAdoption / 100)), [data]);
  const totalCost = useMemo(() => data.aiAnalysis.reduce((a, r) => a + r.cost, 0), [data]);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-xs text-muted-foreground">Total unique AI users</div>
          <div className="mt-2 text-3xl font-bold">{totalUniques.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted-foreground">Total tokens consumed</div>
          <div className="mt-2 text-3xl font-bold">{totalTokens.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted-foreground">Total spend</div>
          <div className="mt-2 text-3xl font-bold">${totalCost.toFixed(3)}</div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Feature-level breakdown" />
        <div className="space-y-4">
          {data.aiAnalysis.map((r) => {
            const pct = totalTokens > 0 ? (r.tokens / totalTokens) * 100 : 0;
            return (
              <div key={r.feature}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium capitalize text-foreground">{r.feature}</span>
                  <span className="text-muted-foreground">
                    {r.tokens.toLocaleString()} tokens · {r.uniques} users · ${r.cost.toFixed(5)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted/40">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <Table
          head={["Feature", "Success", "Unique Users", "Total Tokens", "Cost ($)"]}
          rows={data.aiAnalysis.map((r) => [
            r.feature,
            r.success ? "✓ true" : "✗ false",
            r.uniques.toString(),
            r.tokens.toLocaleString(),
            r.cost.toFixed(5),
          ])}
          totals={["Overall", "", totalUniques.toString(), totalTokens.toLocaleString(), totalCost.toFixed(3)]}
        />
      </Card>
    </div>
  );
}

function SearchTab({ data }: { data: DashboardData }) {
  return (
    <Card>
      <SectionHeader title="Search & Filter Activity" hint="Last 3 months" />
      <Table
        head={["Sort By", "Page Views", "Resume Data Loaded", "Sort Changed", "Downloaded"]}
        rows={data.filters.map((r) => [
          r.sortBy,
          r.pageViews.toString(),
          r.resumeDataLoaded.toString(),
          r.sortChanged.toString(),
          r.downloaded.toString(),
        ])}
        totals={["Overall", "36", "27", "2", "8"]}
      />
    </Card>
  );
}


function JourneyTab({ data }: { data: DashboardData }) {
  return <UserAnalyticsTab />;
}


/* ---------------------------- Primitives ---------------------------- */

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {hint && <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{hint}</span>}
    </div>
  );
}

function Row({ label, value, dot }: { label: string; value: string; dot: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs">
      <span className="flex items-center gap-2 text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

function MiniStat({ label, value, bar }: { label: string; value: string; bar: number }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/40">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}

function DonutGauge({ percent }: { percent: number }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative mx-auto grid h-40 w-40 place-items-center">
      <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
        <circle cx="80" cy="80" r={r} strokeWidth="14" className="stroke-white/5" fill="none" />
        <circle
          cx="80"
          cy="80"
          r={r}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          stroke="url(#g)"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-primary">{percent}%</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Adoption</div>
      </div>
    </div>
  );
}

function Table({ head, rows, totals }: { head: string[]; rows: string[][]; totals?: string[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-xs">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i} className="text-foreground hover:bg-muted/30">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="bg-primary/5 font-semibold text-primary">
              {totals.map((c, j) => (
                <td key={j} className="px-4 py-3">
                  {c}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function CohortHeatmap({ data }: { data: typeof MOCK.cohorts }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground">
            <th className="px-3 py-2 text-left font-medium">Cohort</th>
            <th className="px-3 py-2 text-left font-medium">Size</th>
            {[0, 1, 2, 3, 4, 5, 6].map((w) => (
              <th key={w} className="px-3 py-2 text-center font-medium">
                W{w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.date}>
              <td className="whitespace-nowrap px-3 py-2 text-foreground">{row.date}</td>
              <td className="px-3 py-2 text-muted-foreground">{row.size}</td>
              {row.values.map((v, j) => (
                <td key={j} className="px-1 py-1">
                  {v !== null ? (
                    <div
                      className="grid h-9 place-items-center rounded-md text-[11px] font-semibold"
                      style={{
                        background:
                          v > 60
                            ? "#059669"
                            : v > 35
                              ? "rgba(52,211,153,0.55)"
                              : v > 25
                                ? "rgba(52,211,153,0.28)"
                                : "rgba(52,211,153,0.12)",
                        color: v > 60 ? "white" : "#a7f3d0",
                      }}
                    >
                      {v}%
                    </div>
                  ) : (
                    <div className="h-9 rounded-md border border-dashed border-border" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`@keyframes grow-bar { from { width: 0 } }`}</style>
    </div>
  );
}


/* --- Restored User Analytics Content --- */
function UserAnalyticsTab() {
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
					<h1 className="font-black text-3xl text-foreground tracking-tight">User Telemetry</h1>
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
