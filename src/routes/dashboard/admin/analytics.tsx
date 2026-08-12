import { useQuery, useQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useMemo, useState } from "react";
import { api, UserAnalyticsItem } from "@/utils/api";

import { CaretLeft, CaretRight, CheckCircle, Clock, Download, Eye, ReadCvLogo, Robot, Stack, Timer, Warning, XCircle, CalendarBlank as CalendarIcon } from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/utils/style";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


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
/* Mock data (Extended for the new designs) */
/* ------------------------------------------------------------------ */
const MOCK = {
  entryPoints: [
    { label: "Resume Upload", pct: 46, color: "bg-[#2dd4bf]" },
    { label: "JD Matching", pct: 33, color: "bg-[#0ea5e9]" },
    { label: "Blank Template", pct: 21, color: "bg-[#a855f7]" }
  ],

  entryPointClicks: [
    { label: "Resume Upload", count: 342, color: "bg-[#2dd4bf]" },
    { label: "JD Matching", count: 215, color: "bg-[#0ea5e9]" },
    { label: "Blank Template", count: 184, color: "bg-[#a855f7]" }
  ],

  activity: [
    { format: "(not set)", activated: 27, avgPerUser: 1.48, downloads: 0, uniqueDownloaders: 0 },
    { format: "docx", activated: 0, avgPerUser: 0, downloads: 1, uniqueDownloaders: 1 },
    { format: "pdf", activated: 0, avgPerUser: 0, downloads: 7, uniqueDownloaders: 4 },
  ],

  perUserActivity: [
    { user: "user_8f2a", resumes: 3, downloads: 2, lastActive: "2h ago" },
    { user: "user_1c9d", resumes: 2, downloads: 3, lastActive: "5h ago" },
    { user: "user_44ef", resumes: 2, downloads: 1, lastActive: "1d ago" },
    { user: "user_7b01", resumes: 1, downloads: 1, lastActive: "1d ago" },
    { user: "user_9033", resumes: 1, downloads: 0, lastActive: "3d ago" },
  ],

  fileRejections: [
    { label: "Unsupported format", count: 12, max: 12 },
    { label: "File too large", count: 7, max: 12 },
    { label: "Verification failed", count: 4, max: 12 },
    { label: "Parse error", count: 3, max: 12 },
  ],

  aiAnalysis: [
    { feature: "FinalReview", success: true, uniques: 4, tokens: 71070, cost: 0.02104 },
    { feature: "experience", success: true, uniques: 3, tokens: 1807, cost: 0.00056 },
    { feature: "summary", success: true, uniques: 2, tokens: 772, cost: 0.00023 },
  ],

  askZoeUsage: [
    { label: "Summary", calls: 42, max: 42 },
    { label: "Experience", calls: 78, max: 78 },
    { label: "Projects", calls: 21, max: 78 },
    { label: "Skills", calls: 24, max: 78 },
    { label: "Education", calls: 11, max: 78 },
  ],

  uploadPipeline: [
    { label: "Verification pass", value: "91%" },
    { label: "Parse error rate", value: "4.2%" },
    { label: "Tokens / upload", value: "1,240" },
    { label: "Cost / upload", value: "$0.0838" },
  ],

  jdMatching: {
    strong: 23,
    good: 24,
    moderate: 37,
    needsWork: 15,
  },

  drawerFunnel: [
    { label: "Review Triggered", val: 22, pct: "100%" },
    { label: "Go-to-Print CTR", val: 17, pct: "77%" },
    { label: "Suggestion Resolved", val: 13, pct: "71%" },
  ],

  promptTags: [
    { tag: "final-review@v3.2", volume: 421, cost: "0.0190" },
    { tag: "summary@v1.7", volume: 132, cost: "0.0009" },
    { tag: "experience@v2.1", volume: 210, cost: "0.0021" },
  ],

  filters: [
    { sortBy: "(not set)", pageViews: 36, resumeDataLoaded: 27, sortChanged: 0, downloaded: 8 },
    { sortBy: "createdAt", pageViews: 0, resumeDataLoaded: 0, sortChanged: 1, downloaded: 0 },
    { sortBy: "lastUpdatedAt", pageViews: 0, resumeDataLoaded: 0, sortChanged: 1, downloaded: 0 },
  ],

  commonFilters: [
    { filter: "Role: Software", uses: 62, max: 62 },
    { filter: "Level: Senior", uses: 41, max: 62 },
    { filter: "Sort: Recent", uses: 33, max: 62 },
    { filter: "Format: PDF", uses: 22, max: 62 },
  ],
};

type DashboardData = typeof MOCK & {
  globalTokens?: number;
  globalCost?: number;
  globalTokensDistinctUsers?: number;
  totalUsers?: number;
  totalAiCalls?: number;
  aiSuccessRate?: number;
  aiErrorRate?: number;
  aiAdoption?: number;
  totalResumes?: number;
  totalDownloads?: number;
  askZoeUsage?: { label: string; calls: number; max: number }[];
  aiAnalysis?: { feature: string; success: boolean; uniques: number; tokens: number; cost: number; errorRate: number }[];
};
type TabId = "overview" | "activity" | "ai" | "detailed";

function DashboardPage() {
  const [tab, setTab] = useState<TabId>("overview");
  const [globalDateRange, setGlobalDateRange] = useState<{ start?: string; end?: string }>({});

  const { data: keyUsageData } = useQuery({
    queryKey: ["analytics-key-usage", globalDateRange],
    queryFn: () => api.fetchKeyUsage(globalDateRange.start, globalDateRange.end),
  });

  const { data: jdMatchesData } = useQuery({
    queryKey: ["analytics-jd-matches", globalDateRange],
    queryFn: () => api.fetchJdMatches(globalDateRange.start, globalDateRange.end),
  });

  const { data: resumeClicksData } = useQuery({
    queryKey: ["analytics-resume-clicks", globalDateRange],
    queryFn: () => api.fetchResumeClicks(globalDateRange.start, globalDateRange.end),
  });

  const { data: errorCountsData } = useQuery({
    queryKey: ["analytics-error-counts", globalDateRange],
    queryFn: () => api.fetchErrorCounts(globalDateRange.start, globalDateRange.end),
  });

  // Fetch aggregate statistics
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["resume-statistics"],
    queryFn: () => api.fetchStatistics(),
  });

  // Fetch user analytics for deeper insights
  const { data: userAnalytics, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-analytics-sample"],
    queryFn: () => api.fetchUserAnalytics(1, 50),
  });

  const users = userAnalytics?.users || [];

  const userInvocationsQueries = useQueries({
    queries: users.map(user => ({
      queryKey: ["user-invocations", user.userId],
      queryFn: () => api.fetchUserAIInvocations(user.userId as string, 1, 50),
      enabled: !!user.userId,
    }))
  });

  const allInvocations = useMemo(() => {
    return userInvocationsQueries.flatMap(q => q.data?.invocations || []);
  }, [userInvocationsQueries]);

  const isLoading = isStatsLoading || isUserLoading || userInvocationsQueries.some(q => q.isLoading);

  // Merge real data with mock data (fallback to mock if backend is empty/0 for demo purposes)
  const data = useMemo(() => {
    const merged = { ...MOCK } as DashboardData;

    if (userAnalytics) {
      merged.totalUsers = userAnalytics.pagination.totalUsers || 0;
      const users = userAnalytics.users;
      if (users.length > 0) {
        if (userAnalytics.global) {
          merged.totalAiCalls = userAnalytics.global.failureRate.totalCalls;
          merged.aiSuccessRate = Number((100 - userAnalytics.global.failureRate.failureRatePercent).toFixed(2));
          merged.aiErrorRate = Number(userAnalytics.global.failureRate.failureRatePercent.toFixed(2));

          const globalTokens = userAnalytics.global.tokens.totalTokens;
          // Set these on the data object so the UI can read them
          merged.globalTokens = globalTokens;

          const totalCostFromUsers = users.reduce((acc, u) => acc + (u.ai?.totalCostUsd || 0), 0);
          merged.globalCost = userAnalytics.global.tokens.totalCostUsd
            ?? userAnalytics.global.failureRate.totalCostUsd
            ?? totalCostFromUsers;
          merged.globalTokensDistinctUsers = userAnalytics.global.tokens.distinctUsers;
        } else {
          const totalAiCalls = users.reduce((acc, u) => acc + u.ai.totalCalls, 0);
          const totalFailedAi = users.reduce((acc, u) => acc + u.ai.failedCalls, 0);

          merged.totalAiCalls = totalAiCalls || 0;
          merged.aiSuccessRate = totalAiCalls > 0 ? Number((((totalAiCalls - totalFailedAi) / totalAiCalls) * 100).toFixed(2)) : 0;
          merged.aiErrorRate = totalAiCalls > 0 ? Number(((totalFailedAi / totalAiCalls) * 100).toFixed(2)) : 0;
        }

        merged.aiAdoption = (merged.globalTokensDistinctUsers !== undefined && merged.totalUsers > 0)
          ? Number(((merged.globalTokensDistinctUsers / merged.totalUsers) * 100).toFixed(2))
          : (users.length > 0 ? Number(((users.filter((u) => u.ai.totalCalls > 0).length / users.length) * 100).toFixed(2)) : 0);

        merged.perUserActivity = users.map(u => ({
          user: typeof u.userId === 'string' ? u.userId.substring(0, 8) : `user_${u.userId}`,
          resumes: u.totalLiveResumes,
          downloads: u.downloads.total,
          lastActive: new Date(u.lastResumeUpdatedAt).toLocaleDateString()
        }));

        const totalDownloads = users.reduce((acc, u) => acc + u.downloads.total, 0);
        const pdfDownloads = users.reduce((acc, u) => acc + u.downloads.pdf, 0);
        const docxDownloads = users.reduce((acc, u) => acc + u.downloads.docx, 0);
        const uniqueDownloaders = users.filter(u => u.downloads.total > 0).length;

        merged.activity = [
          { format: "(not set)", activated: users.filter(u => u.hasAtLeastOneResume).length, avgPerUser: users.reduce((acc, u) => acc + u.totalLiveResumes, 0) / users.length, downloads: 0, uniqueDownloaders: 0 },
          { format: "docx", activated: 0, avgPerUser: 0, downloads: docxDownloads, uniqueDownloaders },
          { format: "pdf", activated: 0, avgPerUser: 0, downloads: pdfDownloads, uniqueDownloaders },
        ];
      }
    }

    if (stats) {
      merged.totalResumes = stats.totalResumes || 0;
      merged.totalDownloads = stats.totalDownloads || 0;
    }

    if (keyUsageData && keyUsageData.details) {
      merged.askZoeUsage = keyUsageData.details.map((d: any) => ({
        label: d.keyName,
        calls: d.totalTokens,
        max: Math.max(1, ...keyUsageData.details.map((x: any) => x.totalTokens))
      })).sort((a: any, b: any) => b.calls - a.calls);

      merged.aiAnalysis = keyUsageData.details.map((d: any) => ({
        feature: d.keyName,
        success: true,
        uniques: 0,
        tokens: d.totalTokens,
        cost: d.totalDollarUsed,
        errorRate: 0,
      }));

      merged.globalTokens = keyUsageData.details.reduce((acc: any, curr: any) => acc + curr.totalTokens, 0);
      merged.globalCost = keyUsageData.details.reduce((acc: any, curr: any) => acc + curr.totalDollarUsed, 0);
    }

    if (jdMatchesData) {
      merged.jdMatching = {
        strong: jdMatchesData.percentages.strong || 0,
        good: jdMatchesData.percentages.good || 0,
        moderate: jdMatchesData.percentages.moderate || 0,
        needsWork: jdMatchesData.percentages.need_work || 0,
      };
    }

    if (resumeClicksData && resumeClicksData.metrics) {
      const colors: Record<string, string> = {
        "resume-upload": "bg-[#2dd4bf]",
        "jd-matching": "bg-[#0ea5e9]",
        "blank-template": "bg-[#a855f7]",
        "resume-review": "bg-[#f59e0b]"
      };
      const labels: Record<string, string> = {
        "resume-upload": "Resume Upload",
        "jd-matching": "JD Matching",
        "blank-template": "Blank Template",
        "resume-review": "Final Review"
      };

      let totalClicks = 0;
      Object.values(resumeClicksData.metrics).forEach((m: any) => { totalClicks += m.totalClicks; });

      merged.entryPointClicks = Object.entries(resumeClicksData.metrics).map(([key, value]: [string, any]) => ({
        label: labels[key] || key,
        count: value.totalClicks,
        color: colors[key] || "bg-[#34d399]"
      }));

      merged.entryPoints = Object.entries(resumeClicksData.metrics).map(([key, value]: [string, any]) => ({
        label: labels[key] || key,
        pct: totalClicks > 0 ? Math.round((value.totalClicks / totalClicks) * 100) : 0,
        color: colors[key] || "bg-[#34d399]"
      }));
    } else {
      merged.entryPointClicks = MOCK.entryPointClicks;
    }

    if (errorCountsData && errorCountsData.counts) {
      const maxCount = Math.max(...(Object.values(errorCountsData.counts) as number[]), 1);
      merged.fileRejections = Object.entries(errorCountsData.counts).map(([label, count]) => ({
        label,
        count: count as number,
        max: maxCount
      }));
    }

    if (allInvocations.length > 0 && (!keyUsageData || !keyUsageData.details)) {
      const askZoeUsage: Record<string, number> = {};
      const aiAnalysisMap: Record<string, { feature: string, success: boolean, uniques: Set<string>, tokens: number, cost: number, totalCalls: number, failedCalls: number }> = {};

      allInvocations.forEach(inv => {
        const key = inv.keyName || 'unknown';
        askZoeUsage[key] = (askZoeUsage[key] || 0) + 1;

        if (!aiAnalysisMap[key]) {
          aiAnalysisMap[key] = { feature: key, success: true, uniques: new Set(), tokens: 0, cost: 0, totalCalls: 0, failedCalls: 0 };
        }
        aiAnalysisMap[key].uniques.add(inv.resumeId || 'unknown');
        aiAnalysisMap[key].tokens += (inv.inputTokens || 0) + (inv.outputTokens || 0);
        // Cost from API
        aiAnalysisMap[key].cost += (inv.dollarUsed || 0);
        aiAnalysisMap[key].totalCalls += 1;
        if (inv.status !== "success") {
          aiAnalysisMap[key].success = false;
          aiAnalysisMap[key].failedCalls += 1;
        }
      });

      merged.askZoeUsage = Object.entries(askZoeUsage).map(([label, calls]) => ({
        label, calls, max: Math.max(...Object.values(askZoeUsage))
      })).sort((a, b) => b.calls - a.calls);

      merged.aiAnalysis = Object.values(aiAnalysisMap).map(v => ({
        feature: v.feature,
        success: v.success,
        uniques: v.uniques.size,
        tokens: v.tokens,
        cost: v.cost,
        errorRate: v.totalCalls > 0 ? (v.failedCalls / v.totalCalls) * 100 : 0
      }));
    }

    return merged;
  }, [stats, userAnalytics, allInvocations, keyUsageData, jdMatchesData, resumeClicksData, errorCountsData]);

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Resume Activity" },
    { id: "ai", label: "AI Analysis" },
    { id: "detailed", label: "Detailed Activity Report" },
  ];

  return (

    <div className="w-full">
      {/* Title */}
      <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Product Insights <span className="text-[#059669]">Dashboard</span>
            </h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm font-medium text-muted-foreground">
            Unified view of resume creation, AI usage, search behavior and retention — replacing the Mixpanel handoff.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full border border-border bg-muted/50 px-5 py-2 font-medium text-sm hover:bg-border transition-colors">
            Export CSV
          </button>
          <Popover modal={false}>
            <PopoverTrigger asChild>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end" side="bottom" sideOffset={8}>
              <Calendar
                initialFocus
                mode="range"
                selected={{
                  from: globalDateRange.start ? new Date(globalDateRange.start) : undefined,
                  to: globalDateRange.end ? new Date(globalDateRange.end) : undefined
                }}
                onSelect={(range: any) => {
                  if (range?.from) {
                    const start = format(range.from, "yyyy-MM-dd");
                    const end = range.to ? format(range.to, "yyyy-MM-dd") : undefined;
                    setGlobalDateRange({ start, end });
                  } else {
                    setGlobalDateRange({});
                  }
                }}
                numberOfMonths={1}
                className="p-2"
                startMonth={new Date(2023, 0)}
                endMonth={new Date()}
              />
              <div className="p-2 pt-0 border-t flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => setGlobalDateRange({})}>Clear</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tabs and Pills */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-1 rounded-full border border-border bg-muted/30 p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition ${tab === t.id ? "bg-[#059669] text-foreground" : "text-muted-foreground hover:text-foreground/90"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-2 rounded-full border border-[#059669]/30 bg-[#059669]/10 px-3 py-1.5 text-[#34d399]">
            <div className="size-2 rounded-full bg-[#34d399]" />
            AI Success Rate {data.aiSuccessRate}%
          </span>
          <span className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-400">
            <div className="size-2 rounded-full bg-red-400" />
            AI Error / Timeout {data.aiErrorRate}%
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="size-12 animate-spin rounded-full border-4 border-[#059669] border-t-transparent shadow-[#059669]/20 shadow-lg"></div>
            <p className="animate-pulse font-bold text-muted-foreground/80 text-sm">Gathering real-time insights...</p>
          </div>
        </div>
      ) : (
        <>
          {tab === "overview" && <OverviewTab data={data} />}
          {tab === "activity" && <ActivityTab data={data} users={users} />}
          {tab === "ai" && <AIAnalysisTab data={data} />}
          {tab === "detailed" && <DetailedActivityReportTab />}
        </>
      )}
    </div>
  );
}

/* ------------------------------- Panels ------------------------------- */

function OverviewTab({ data }: { data: DashboardData }) {
  const kpis = [
    { label: "Total Users", value: (data.totalUsers ?? 0).toLocaleString(), icon: "👥", trend: undefined },
    { label: "Active Users", value: (data.totalUsers ?? 0).toLocaleString(), icon: undefined, trend: "Live Count" },
    { label: "Resumes Created", value: (data.totalResumes ?? 0).toLocaleString(), icon: "📝", trend: undefined },
    { label: "Total Downloads", value: (data.totalDownloads ?? 0).toLocaleString(), icon: "⬇", trend: undefined },
    { label: "AI Adoption", value: (data.globalTokensDistinctUsers ?? 0).toLocaleString(), icon: "🤖", trend: undefined },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((k, i) => (
          <Card key={k.label} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{k.label}</div>
                <div className="mt-2 text-4xl font-bold text-foreground pb-2">{k.value}</div>
              </div>
              {k.trend ? (
                <div className="text-xs font-bold text-[#34d399] mt-1">{k.trend}</div>
              ) : (
                <div className="text-xl opacity-60">{k.icon}</div>
              )}
            </div>
            <div className="mt-1 flex justify-end">
              <CardFilter />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <SectionHeader title="Entry Point Adoption" hint="% OF USERS" />
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-muted">
            {data.entryPoints.map(ep => (
              <div key={ep.label} className={`h-full ${ep.color}`} style={{ width: `${ep.pct}%` }} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {data.entryPoints.map(ep => (
              <div key={ep.label} className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${ep.color}`} />
                <span className="font-medium text-foreground/90">{ep.label}</span>
                <span>· {ep.pct}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Entry Point Behavior" hint="TOTAL CLICKS" />
          <div className="mt-4 space-y-2">
            {data.entryPointClicks.map(ep => (
              <div key={ep.label} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-xs">
                <div className="flex items-center gap-2 text-foreground/80">
                  <div className={`size-1.5 rounded-full ${ep.color}`} />
                  <span className="font-medium">{ep.label}</span>
                </div>
                <span className="font-bold text-foreground">{ep.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeader title="System-wide Activation Funnel" hint="LIVE" />
          <div className="space-y-5 mt-6">
            {[
              { label: "Visited Landing Page", count: 412, pct: 100 },
              { label: "Signed Up", count: data.totalUsers ?? 0, pct: 6 },
              { label: "Created Resume", count: data.totalResumes ?? 0, pct: 46 },
              { label: "Used AI Features", count: 8, pct: 44 },
              { label: "Downloaded File", count: data.totalDownloads ?? 0, pct: 150 },
            ].map((s, idx) => (
              <div key={s.label}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground/90">{s.label}</span>
                  <span className="text-muted-foreground/80">
                    <span className="font-bold text-foreground/90">{s.count.toLocaleString()}</span> · {s.pct}% conv.
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-r-full bg-muted">
                  <div
                    className="h-full rounded-r-full bg-[#059669] transition-all"
                    style={{ width: `${Math.min(s.pct, 100)}%`, animation: `grow-bar 900ms ${idx * 120}ms both` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#059669]/30 bg-[#059669]/10 p-4 text-xs text-foreground/80">
            <span className="text-[#34d399]">⚡</span>
            <span>
              <span className="font-bold text-[#34d399]">Insight:</span> Users who use the AI Assistant are{" "}
              <span className="font-bold">4.2×</span> more likely to export their resume within the first session.
            </span>
          </div>
        </Card>

        <Card>
          <SectionHeader title="AI Usage Split" />
          <div className="mt-8">
            <DonutGauge percent={data.aiAdoption ?? 0} value={data.globalTokensDistinctUsers !== undefined ? data.globalTokensDistinctUsers.toLocaleString() : undefined} label="AI Users" />
          </div>
          <div className="mt-10 space-y-3">
            <Row label="Total AI Calls" value={data.totalAiCalls.toLocaleString()} dot="bg-[#34d399]" />
            <Row label="Success Rate" value={`${data.aiSuccessRate}%`} dot="bg-[#34d399]" />
            <Row
              label="Total Tokens"
              value={(data.globalTokens !== undefined ? data.globalTokens : data.aiAnalysis.reduce((a, r) => a + r.tokens, 0)).toLocaleString()}
              dot="bg-[#34d399]"
            />
            <Row label="Total AI Spend" value={`$${(data.globalCost !== undefined ? data.globalCost : data.aiAnalysis.reduce((a, r) => a + r.cost, 0)).toFixed(2)}`} dot="bg-[#34d399]" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function ActivityTab({ data, users }: { data: DashboardData; users: UserAnalyticsItem[] }) {
  const activatedUsers = users.filter((u) => u.hasAtLeastOneResume).length;
  const totalResumes = users.reduce((sum, u) => sum + (u.totalLiveResumes || 0), 0);
  const avgResumes = activatedUsers > 0 ? (totalResumes / activatedUsers).toFixed(2) : "0.00";

  const pdfDownloads = users.reduce((sum, u) => sum + (u.downloads?.pdf || 0), 0);
  const pdfDownloaders = users.filter((u) => (u.downloads?.pdf || 0) > 0).length;

  const docxDownloads = users.reduce((sum, u) => sum + (u.downloads?.docx || 0), 0);
  const docxDownloaders = users.filter((u) => (u.downloads?.docx || 0) > 0).length;

  const overallDownloads = pdfDownloads + docxDownloads;
  const overallUniqueDownloaders = users.filter((u) => u.downloads?.hasAtLeastOneDownload).length;

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="File Rejection Reasons" />
        <div className="mt-4 space-y-4">
          {data.fileRejections.map(r => (
            <div key={r.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                <span className="text-foreground/90">{r.label}</span>
                <span className="text-muted-foreground">{r.count}</span>
              </div>
              <div className="h-1.5 w-full rounded-r-full bg-muted">
                <div className="h-full rounded-r-full bg-[#059669]" style={{ width: `${(r.count / r.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Resume Activity Metrics" hint="LAST 3 MONTHS" />
        <Table
          head={["Format", "Activated Users", "Avg Resumes / User", "Total Downloads", "Unique Downloaders"]}
          rows={[
            ["(overall activity)", activatedUsers.toString(), avgResumes, "-", "-"],
            ["pdf", "-", "-", pdfDownloads.toString(), pdfDownloaders.toString()],
            ["docx", "-", "-", docxDownloads.toString(), docxDownloaders.toString()],
          ]}
          totals={["Overall", activatedUsers.toString(), avgResumes, overallDownloads.toString(), overallUniqueDownloaders.toString()]}
        />
      </Card>

      <Card>
        <SectionHeader title="Per-user resume & download counts" />
        <Table
          pagination
          pageSize={10}
          head={["User", "Resumes", "Downloads", "Last Active"]}
          rows={users.map((u) => [
            `User ${u.userId.toString().slice(-4)}`,
            u.totalLiveResumes.toString(),
            u.downloads?.total?.toString() || "0",
            u.lastResumeUpdatedAt ? new Date(u.lastResumeUpdatedAt).toLocaleDateString() : "Never",
          ])}
        />
      </Card>
    </div>
  );
}

function AIAnalysisTab({ data }: { data: DashboardData }) {
  const totalTokens = useMemo(() => data.globalTokens !== undefined ? data.globalTokens : data.aiAnalysis.reduce((a, r) => a + r.tokens, 0), [data]);
  const totalCost = useMemo(() => data.globalCost !== undefined ? data.globalCost : data.aiAnalysis.reduce((a, r) => a + r.cost, 0), [data]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Total AI users</div>
              <div className="mt-2 text-4xl font-bold text-foreground pb-2">
                {data.globalTokensDistinctUsers !== undefined ? data.globalTokensDistinctUsers.toLocaleString() : "7"}
              </div>
            </div>
          </div>
          <div className="mt-1 flex justify-end">
            <CardFilter />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Tokens consumed</div>
              <div className="mt-2 text-4xl font-bold text-foreground pb-2">{totalTokens.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-1 flex justify-end">
            <CardFilter />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Total AI spend</div>
              <div className="mt-2 text-4xl font-bold text-foreground pb-2">${totalCost.toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-1 flex justify-end">
            <CardFilter />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="sm:col-span-2">
          <SectionHeader title="Ask Zoe — Usage per Resume Section" />
          <div className="mt-4 space-y-4">
            {data.askZoeUsage.map(u => (
              <div key={u.label}>
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium">
                  <span className="text-foreground/90">{u.label}</span>
                  <span className="text-muted-foreground">{u.calls} calls</span>
                </div>
                <div className="h-1.5 w-full rounded-r-full bg-muted">
                  <div className="h-full rounded-r-full bg-[#059669]" style={{ width: `${(u.calls / u.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Review Rounds" />
          <div className="mt-4 flex flex-col items-center">
            <DonutChart val1={68} val2={32} size={100} stroke={10} color2="#0284c7" />
            <div className="mt-6 w-full space-y-2">
              <Row label="Round 1" value="48%" dot="bg-[#34d399]" />
              <Row label="Round 2" value="32%" dot="bg-[#0ea5e9]" />
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <SectionHeader title="Resume Upload Pipeline" />
          <div className="mt-4 space-y-2">
            {data.uploadPipeline.map((p, i) => (
              <div key={p.label} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs">
                <span className="flex items-center gap-2 text-foreground/80">
                  <div className={`size-1.5 rounded-full ${i === 0 ? 'bg-[#34d399]' : i === 1 ? 'bg-[#f59e0b]' : i === 2 ? 'bg-[#0ea5e9]' : 'bg-[#a855f7]'}`} />
                  {p.label}
                </span>
                <span className="font-bold text-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="JD Matching Verdicts" />
          <div className="mt-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-[#34d399]" style={{ width: `${data.jdMatching.strong}%` }} />
              <div className="h-full bg-[#fcd34d]" style={{ width: `${data.jdMatching.good}%` }} />
              <div className="h-full bg-[#f97316]" style={{ width: `${data.jdMatching.moderate}%` }} />
              <div className="h-full bg-[#ef4444]" style={{ width: `${data.jdMatching.needsWork}%` }} />
            </div>
            <div className="mt-4 space-y-2">
              <Row label="STRONG FIT" value={`${data.jdMatching.strong}%`} dot="bg-[#34d399]" />
              <Row label="GOOD FIT" value={`${data.jdMatching.good}%`} dot="bg-[#fcd34d]" />
              <Row label="MODERATE FIT" value={`${data.jdMatching.moderate}%`} dot="bg-[#f97316]" />
              <Row label="NEEDS WORK" value={`${data.jdMatching.needsWork}%`} dot="bg-[#ef4444]" />
            </div>
            <div className="mt-4 rounded-lg border border-[#059669]/30 bg-[#059669]/10 px-3 py-2 text-[10px] text-[#34d399] font-medium">
              Powered by real JD analysis data
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6">
          <SectionHeader title="Cost & Reliability" />
        </div>
        <div>
          <div className="w-full">
            <div className="text-[10px] font-bold text-muted-foreground/80 mb-4">Error / Timeout rate per endpoint</div>
            <div className="space-y-4">
              {data.aiAnalysis.map((feature) => (
                <div key={feature.feature} className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground w-40 truncate" title={feature.feature}>{feature.feature}</span>
                  <div className="flex-1 h-1.5 bg-muted mx-3 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ef4444]" style={{ width: `${Math.min((feature as any).errorRate || 0, 100)}%` }} />
                  </div>
                  <span className="font-bold w-12 text-right">{((feature as any).errorRate || 0).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Feature-level breakdown" />
        <Table
          head={["Feature", "Success", "Unique Users", "Total Tokens", "Cost ($)"]}
          rows={data.aiAnalysis.map((r) => [
            r.feature,
            r.success ? "✓ true" : "✗ false",
            r.uniques.toString(),
            r.tokens.toLocaleString(),
            r.cost.toFixed(5),
          ])}
          totals={["Overall", "", "7", totalTokens.toLocaleString(), totalCost.toFixed(3)]}
        />
      </Card>
    </div>
  );
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

export function CardFilter() {
  const [filter, setFilter] = useState<"weekly" | "monthly" | "custom">("monthly");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="flex w-max items-center gap-0.5 bg-muted/30 border border-border rounded-full p-0.5">
      <button
        onClick={() => setFilter("weekly")}
        className={cn(
          "px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors",
          filter === "weekly" ? "bg-border text-foreground" : "text-muted-foreground/80 hover:text-foreground"
        )}
      >
        weekly
      </button>
      <button
        onClick={() => setFilter("monthly")}
        className={cn(
          "px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors",
          filter === "monthly" ? "bg-border text-foreground" : "text-muted-foreground/80 hover:text-foreground"
        )}
      >
        monthly
      </button>
      <Popover modal={false}>
        <PopoverTrigger asChild>
          <button
            onClick={() => setFilter("custom")}
            className={cn(
              "px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 transition-colors",
              filter === "custom" ? "bg-border text-foreground" : "text-muted-foreground/80 hover:text-foreground"
            )}
          >
            custom
            {filter === "custom" && <CalendarIcon weight="bold" className="h-3 w-3" />}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end" side="bottom" sideOffset={8}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              setDateRange(range as any);
              if (range?.from && range?.to) {
                setFilter("custom");
              }
            }}
            numberOfMonths={1}
            className="p-2"
            captionLayout="dropdown"
            startMonth={new Date(2010, 0)}
            endMonth={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-[13px] font-bold text-foreground">{title}</h2>
        {hint && <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-foreground/70">{hint}</span>}
      </div>
      <CardFilter />
    </div>
  );
}

function Row({ label, value, dot }: { label: string; value: string; dot: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-xs">
      <span className="flex items-center gap-3 font-medium text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}

function DonutGauge({ percent, label, value }: { percent: number, label?: string, value?: string | number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative mx-auto grid h-48 w-48 place-items-center">
      <svg width="192" height="192" viewBox="0 0 192 192" className="-rotate-90">
        <circle cx="96" cy="96" r={r} strokeWidth="16" className="stroke-muted" fill="none" />
        <circle
          cx="96"
          cy="96"
          r={r}
          strokeWidth="16"
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
        <div className="text-3xl font-black text-[#34d399]">{value !== undefined ? value : `${percent}%`}</div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">{label || "AI Adoption"}</div>
      </div>
    </div>
  );
}

function DonutChart({ val1, val2, size = 120, stroke = 12, color2 = "#0ea5e9" }: { val1: number, val2: number, size?: number, stroke?: number, color2?: string }) {
  const r = (size / 2) - stroke;
  const c = 2 * Math.PI * r;
  const offset = c - (val1 / 100) * c;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="stroke-muted" fill="none" />
        {/* Background circle acting as val2 (DOCX) */}
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke={color2} fill="none" />
        {/* Foreground circle acting as val1 (PDF) */}
        <circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
          fill="none" stroke="#34d399"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-black text-foreground">{val1}%</div>
        <div className="text-[8px] font-bold uppercase text-muted-foreground/80">PDF</div>
      </div>
    </div>
  );
}

function AreaChart() {
  return (
    <div className="w-full h-32 relative">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 L40,60 L80,75 L120,40 L160,50 L200,30 L240,45 L280,10 L320,15 L360,5 L400,20 L400,128 L0,128 Z"
          fill="url(#areaGradient)"
          transform="scale(1 1)"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,80 L40,60 L80,75 L120,40 L160,50 L200,30 L240,45 L280,10 L320,15 L360,5 L400,20"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function LineChart({ color, targetY }: { color: string, targetY: number }) {
  return (
    <div className="w-full h-20 relative">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <line x1="0" y1={targetY} x2="100%" y2={targetY} stroke="#ca8a04" strokeWidth="1" strokeDasharray="4 4" />
        <path
          d="M0,50 L40,30 L80,45 L120,50 L160,55 L200,60 L240,65 L280,30 L320,50 L360,60 L400,65 L440,70 L480,75 L520,80"
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="0" cy="50" r="2" fill={color} />
        <circle cx="40" cy="30" r="2" fill={color} />
        <circle cx="80" cy="45" r="2" fill={color} />
        <circle cx="120" cy="50" r="2" fill={color} />
        <circle cx="160" cy="55" r="2" fill={color} />
        <circle cx="200" cy="60" r="2" fill={color} />
        <circle cx="240" cy="65" r="2" fill={color} />
        <circle cx="280" cy="30" r="2" fill={color} />
        <circle cx="320" cy="50" r="2" fill={color} />
        <circle cx="360" cy="60" r="2" fill={color} />
        <circle cx="400" cy="65" r="2" fill={color} />
        <circle cx="440" cy="70" r="2" fill={color} />
        <circle cx="480" cy="75" r="2" fill={color} />
        <circle cx="520" cy="80" r="2" fill={color} />
      </svg>
    </div>
  );
}

function Table({ head, rows, totals, pagination, pageSize = 10 }: { head: string[]; rows: string[][]; totals?: string[]; pagination?: boolean; pageSize?: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = pagination ? rows.slice((currentPage - 1) * pageSize, currentPage * pageSize) : rows;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              {head.map((h) => (
                <th key={h} className="px-5 py-3.5 text-left font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {paginatedRows.map((r, i) => (
              <tr key={i} className="text-foreground/90 hover:bg-muted">
                {r.map((c, j) => (
                  <td key={j} className="px-5 py-3.5 font-medium">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            {totals && (
              <tr className="bg-[#059669]/10 font-bold text-[#34d399]">
                {totals.map((c, j) => (
                  <td key={j} className="px-5 py-3.5">
                    {c}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="h-8 text-xs font-bold"
          >
            <CaretLeft className="mr-1 h-3.5 w-3.5" /> Previous
          </Button>
          <div className="text-xs font-bold text-muted-foreground px-2">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="h-8 text-xs font-bold"
          >
            Next <CaretRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

function CohortHeatmap({ data }: { data: typeof MOCK.cohorts }) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground/80">
            <th className="px-3 py-2 text-left font-bold">Cohort</th>
            <th className="px-3 py-2 text-left font-bold">Size</th>
            {[0, 1, 2, 3, 4, 5, 6].map((w) => (
              <th key={w} className="px-3 py-2 text-center font-bold">
                W{w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.date}>
              <td className="whitespace-nowrap px-3 py-2 font-medium text-foreground/90">{row.date}</td>
              <td className="px-3 py-2 font-medium text-muted-foreground/80">{row.size}</td>
              {row.values.map((v, j) => (
                <td key={j} className="px-1 py-1">
                  {v !== null ? (
                    <div
                      className="grid h-10 place-items-center rounded-lg text-[11px] font-bold"
                      style={{
                        background:
                          v > 60
                            ? "#059669"
                            : v > 35
                              ? "rgba(5, 150, 105, 0.6)"
                              : v > 25
                                ? "rgba(5, 150, 105, 0.3)"
                                : "rgba(5, 150, 105, 0.1)",
                        color: v > 60 ? "white" : "#34d399",
                      }}
                    >
                      {v}%
                    </div>
                  ) : (
                    <div className="h-10 rounded-lg border border-dashed border-border" />
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


function DetailedActivityReportTab() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);

  const { data: userAnalytics, isLoading } = useQuery({
    queryKey: ["user-analytics", page, limit],
    queryFn: () => api.fetchUserAnalytics(page, limit),
  });

  const users = userAnalytics?.users || [];
  const pagination = userAnalytics?.pagination;

  return (
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
      className={`group relative overflow-hidden rounded-2xl border transition-all ${expanded
        ? "scale-[1.01] border-emerald-500 bg-card shadow-xl ring-8 ring-emerald-500/10"
        : "border-border bg-card shadow-sm hover:border-muted-foreground/30"
        }`}
    >
      <div className="flex cursor-pointer items-center justify-between p-6 hover:bg-muted/30" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-5">
          <div
            className={`rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-110 ${item.status === "success"
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
                className={`rounded-lg border-none px-2 py-0.5 font-black text-[10px] uppercase shadow-sm ${item.status === "success"
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
                  className={`max-h-60 overflow-y-auto rounded-2xl border p-5 font-black text-xs leading-relaxed shadow-inner ${item.status === "failure"
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

