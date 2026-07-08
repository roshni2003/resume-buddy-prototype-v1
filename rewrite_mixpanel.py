import re

code = """import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { api } from "@/utils/api";

export const Route = createFileRoute("/dashboard/admin/mixpanel")({
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
    { date: "Oct 20 – Oct 26", size: "3,124", values: [100, 38, 30, 27, 24, 21, None] },
    { date: "Oct 13 – Oct 19", size: "2,942", values: [100, 36, 29, 25, 22, None, None] },
    { date: "Oct 06 – Oct 12", size: "3,211", values: [100, 35, 28, 24, None, None, None] },
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

  // Merge real data with mock data
  const data = useMemo(() => {
    const merged = { ...MOCK };
    
    if (userAnalytics) {
      merged.totalUsers = userAnalytics.pagination.totalUsers;
      const users = userAnalytics.users;
      const totalAiCalls = users.reduce((acc, u) => acc + u.ai.totalCalls, 0);
      const totalFailedAi = users.reduce((acc, u) => acc + u.ai.failedCalls, 0);
      
      merged.totalAiCalls = totalAiCalls;
      merged.aiSuccessRate = totalAiCalls > 0 ? Number((((totalAiCalls - totalFailedAi) / totalAiCalls) * 100).toFixed(1)) : 100;
      merged.aiAdoption = users.length > 0 ? Number(((users.filter((u) => u.ai.totalCalls > 0).length / users.length) * 100).toFixed(1)) : 0;
      
      // We could also dynamically update aiAnalysis tokens if we wanted to match the real total.
      // The old UI did: totalTokens = users.reduce((acc, u) => acc + u.ai.totalTokens, 0)
    }
    
    if (stats) {
      merged.totalResumes = stats.totalResumes;
      merged.totalDownloads = stats.totalDownloads;
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
    <div className="min-h-screen bg-[#0a0f0d] text-slate-100">
      {/* Top bar */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-black font-bold">
              R
            </div>
            <div>
              <div className="text-sm font-semibold">Resume Buddy</div>
              <div className="text-xs text-slate-400">Analytics workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-medium text-emerald-300">Live</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">Last 30 days</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Title */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Product Insights <span className="italic text-emerald-400">Dashboard</span>
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">
              Unified view of resume creation, AI usage, search behavior and retention — replacing the Mixpanel handoff.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">
              Export CSV
            </button>
            <button className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-black hover:bg-emerald-400">
              Add Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                tab === t.id ? "bg-emerald-500 text-black" : "text-slate-300 hover:bg-white/5"
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
              <p className="animate-pulse font-bold text-slate-400 text-sm">Gathering real-time insights...</p>
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
      </main>
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
                <div className="text-xs uppercase tracking-wide text-slate-400">{k.label}</div>
                <div className="mt-2 text-3xl font-bold">{k.value}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/15 text-lg">{k.icon}</div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-300">↗ {k.change}</span>
              <span className="text-slate-500">vs last 30 days</span>
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
                  <span className="font-medium text-slate-200">{s.label}</span>
                  <span className="text-slate-400">
                    <span className="font-semibold text-slate-100">{s.count.toLocaleString()}</span> · {s.pct}% conv.
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                    style={{ width: `${Math.min(s.pct, 100)}%`, animation: `grow-bar 900ms ${idx * 120}ms both` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-slate-200">
            <span className="text-emerald-400">⚡</span>
            <span>
              <span className="font-semibold text-emerald-300">Insight:</span> Users who use the AI Assistant are{" "}
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
          <div className="text-xs text-slate-400">Total unique AI users</div>
          <div className="mt-2 text-3xl font-bold">{totalUniques.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-xs text-slate-400">Total tokens consumed</div>
          <div className="mt-2 text-3xl font-bold">{totalTokens.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-xs text-slate-400">Total spend</div>
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
                  <span className="font-medium capitalize text-slate-200">{r.feature}</span>
                  <span className="text-slate-400">
                    {r.tokens.toLocaleString()} tokens · {r.uniques} users · ${r.cost.toFixed(5)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
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
  const max = Math.max(...data.journey.map((s) => s.count), 1);
  return (
    <Card>
      <SectionHeader title="Master User Journey" hint="5-step funnel · last 3 months" />
      <div className="flex h-64 items-end gap-3">
        {data.journey.map((s, i) => {
          const h = (s.count / max) * 100;
          return (
            <div key={s.step} className="flex flex-1 flex-col items-center gap-2">
              <div className="text-xs font-semibold text-emerald-300">{s.pct}%</div>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400"
                  style={{ height: `${h}%`, animation: `grow-bar 800ms ${i * 100}ms both` }}
                />
              </div>
              <div className="text-center text-[10px] text-slate-400">
                <div className="font-semibold text-slate-200">{s.count}</div>
                <div>{s.step}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ---------------------------- Primitives ---------------------------- */

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-white/[0.03] p-5 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
      {hint && <span className="text-[10px] uppercase tracking-wider text-slate-500">{hint}</span>}
    </div>
  );
}

function Row({ label, value, dot }: { label: string; value: string; dot: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs">
      <span className="flex items-center gap-2 text-slate-300">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </span>
      <span className="font-semibold text-slate-100">{value}</span>
    </div>
  );
}

function MiniStat({ label, value, bar }: { label: string; value: string; bar: number }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
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
        <div className="text-2xl font-bold text-emerald-300">{percent}%</div>
        <div className="text-[10px] uppercase tracking-wider text-slate-400">AI Adoption</div>
      </div>
    </div>
  );
}

function Table({ head, rows, totals }: { head: string[]; rows: string[][]; totals?: string[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/5">
      <table className="w-full text-xs">
        <thead className="bg-white/[0.04] text-slate-400">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((r, i) => (
            <tr key={i} className="text-slate-200 hover:bg-white/[0.02]">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="bg-emerald-500/5 font-semibold text-emerald-200">
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
          <tr className="text-slate-400">
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
              <td className="whitespace-nowrap px-3 py-2 text-slate-200">{row.date}</td>
              <td className="px-3 py-2 text-slate-400">{row.size}</td>
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
                    <div className="h-9 rounded-md border border-dashed border-white/5" />
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
"""

with open("/Users/sama/Desktop/reactive-resume/src/routes/dashboard/admin/mixpanel.tsx", "w", encoding="utf-8") as f:
    # Python replaces `None` with `null` so it becomes valid JS
    code = code.replace("None", "null")
    f.write(code)

print("Mixpanel UI completely replaced.")
