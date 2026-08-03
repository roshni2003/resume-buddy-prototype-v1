import re

with open("scratch/old_analytics.tsx", "r") as f:
    content = f.read()

# 1. Add import
if 'import { format } from "date-fns";' not in content:
    content = content.replace('import { DateRange } from "react-day-picker";', 'import { DateRange } from "react-day-picker";\nimport { format } from "date-fns";')

# 2. Insert new states and queries inside DashboardPage
queries = """
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
"""

content = re.sub(
    r'const \[tab, setTab\] = useState<TabId>\("overview"\);',
    r'const [tab, setTab] = useState<TabId>("overview");\n' + queries,
    content
)

# 3. Add KeyUsageData to dependencies of useMemo
content = content.replace(
    'return merged;\n  }, [stats, userAnalytics, allInvocations]);',
    'return merged;\n  }, [stats, userAnalytics, allInvocations, keyUsageData, jdMatchesData, resumeClicksData, errorCountsData]);'
)

# 4. Integrate real data in data useMemo
integration = """
    if (keyUsageData && keyUsageData.details) {
      merged.askZoeUsage = keyUsageData.details.map((d: any) => ({
        label: d.keyName,
        calls: d.totalTokens,
        max: Math.max(...keyUsageData.details.map((x: any) => x.totalTokens))
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
    }

    if (errorCountsData && errorCountsData.counts) {
      const maxCount = Math.max(...(Object.values(errorCountsData.counts) as number[]), 1);
      merged.fileRejections = Object.entries(errorCountsData.counts).map(([label, count]) => ({
        label,
        count: count as number,
        max: maxCount
      }));
    }
"""

content = re.sub(
    r'merged\.entryPointClicks = MOCK\.entryPointClicks;',
    integration,
    content
)

# 5. Fix Global Filter
date_filter_ui = """
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
          <Popover modal={false}>
            <PopoverTrigger asChild>
              <button className="rounded-full bg-[#059669] px-5 py-2 text-sm font-bold text-foreground hover:bg-[#047857] transition-colors shadow-sm flex items-center gap-2">
                <CalendarIcon weight="bold" />
                {globalDateRange.start ? `${globalDateRange.start} to ${globalDateRange.end || 'Now'}` : "All Time"}
              </button>
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
"""

content = re.sub(
    r'\{\/\* Title \*\/\}.*?<\/div>\s*<\/div>\s*<\/div>',
    date_filter_ui,
    content,
    flags=re.DOTALL
)

# 6. Fix JD matching verdicts UI
jd_matching_ui = """
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
              46% tailored-resume acceptance rate
            </div>
          </div>
        </Card>
"""

content = re.sub(
    r'<Card>\s*<SectionHeader title="JD Matching Verdicts" />\s*<div className="mt-4">\s*<div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">.*?<Row label="NEEDS WORK" value="15%" dot="bg-\[\#ef4444\]" />\s*</div>\s*<div className="mt-4 rounded-lg border border-\[\#059669\]/30 bg-\[\#059669\]/10 px-3 py-2 text-\[10px\] text-\[\#34d399\] font-medium">\s*46% tailored-resume acceptance rate\s*</div>\s*</div>\s*</Card>',
    jd_matching_ui,
    content,
    flags=re.DOTALL
)

with open("src/routes/dashboard/admin/analytics.tsx", "w") as f:
    f.write(content)
