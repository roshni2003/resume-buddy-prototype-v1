import re

with open("src/routes/dashboard/admin/analytics.tsx", "r") as f:
    code = f.read()

# 1. Update Table component
old_table = """function Table({ head, rows, totals }: { head: string[]; rows: string[][]; totals?: string[] }) {
  return (
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
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-muted/20">
              {r.map((c, j) => (
                <td key={j} className="px-5 py-3.5 text-foreground font-medium">
                  {c}
                </td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="bg-muted/30 text-foreground font-bold">
              {totals.map((t, j) => (
                <td key={j} className="px-5 py-3.5">
                  {t}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}"""
new_table = """function Table({ head, rows, totals, pagination, pageSize = 10 }: { head: string[]; rows: string[][]; totals?: string[]; pagination?: boolean; pageSize?: number }) {
  const [currentPage, setCurrentPage] = React.useState(1);
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
          <tbody className="divide-y divide-border">
            {paginatedRows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/20">
                {r.map((c, j) => (
                  <td key={j} className="px-5 py-3.5 text-foreground font-medium">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            {totals && (
              <tr className="bg-muted/30 text-foreground font-bold">
                {totals.map((t, j) => (
                  <td key={j} className="px-5 py-3.5">
                    {t}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}"""
code = code.replace(old_table, new_table)

# 2. Activity Table pagination
old_activity_table = """<Card>
        <SectionHeader title="Per-user resume & download counts" />
        <Table
          head={["User", "Resumes", "Downloads", "Last Active"]}
          rows={data.perUserActivity.map((u) => [u.user, u.resumes.toString(), u.downloads.toString(), u.lastActive])}
        />
      </Card>"""
new_activity_table = """<Card>
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
      </Card>"""
code = code.replace(old_activity_table, new_activity_table)

# 3. Update Activity and PerUser metrics
old_metrics = """        const totalDownloads = users.reduce((acc, u) => acc + u.downloads.total, 0);

        // Optional: Update `merged.activity` with accurate stats
        merged.activity = [
          { format: "(not set)", activated: users.length, avgPerUser: Number((totalResumes / (users.length || 1)).toFixed(2)), downloads: totalDownloads, uniqueDownloaders: users.length },
          { format: "docx", activated: 0, avgPerUser: 0, downloads: 0, uniqueDownloaders: 0 },
          { format: "pdf", activated: 0, avgPerUser: 0, downloads: totalDownloads, uniqueDownloaders: users.length },
        ];"""
new_metrics = """        const totalDownloads = users.reduce((acc, u) => acc + u.downloads.total, 0);
        const pdfDownloads = users.reduce((acc, u) => acc + (u.downloads.pdf || 0), 0);
        const docxDownloads = users.reduce((acc, u) => acc + (u.downloads.docx || 0), 0);
        const totalUniqueDownloaders = users.filter(u => u.downloads.total > 0).length;
        const totalActive = users.filter(u => u.totalLiveResumes > 0).length;

        merged.activity = [
          { format: "(not set)", activated: totalActive, avgPerUser: Number((merged.totalResumes / (users.length || 1)).toFixed(2)), downloads: totalDownloads, uniqueDownloaders: totalUniqueDownloaders },
          { format: "docx", activated: 0, avgPerUser: 0, downloads: docxDownloads, uniqueDownloaders: users.filter(u => u.downloads.docx > 0).length },
          { format: "pdf", activated: 0, avgPerUser: 0, downloads: pdfDownloads, uniqueDownloaders: users.filter(u => u.downloads.pdf > 0).length },
        ];"""
code = code.replace(old_metrics, new_metrics)

# 4. Remove Live resumes/user and Downloads/user cards
old_cards = """      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Active users</div>
          <div className="mt-2 text-4xl font-bold text-foreground">
            {data.activity[0]?.activated || 0}
          </div>
        </Card>
        <Card>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Live resumes / user</div>
          <div className="mt-2 text-4xl font-bold text-foreground">
            {data.activity[0]?.avgPerUser || 0}
          </div>
        </Card>
        <Card>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Downloads / user</div>
          <div className="mt-2 text-4xl font-bold text-foreground">
            {(data.activity[0]?.downloads / (data.activity[0]?.uniqueDownloaders || 1)).toFixed(1)}
          </div>
        </Card>
        <Card>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Unique downloaders</div>
          <div className="mt-2 text-4xl font-bold text-foreground">
            {data.activity[0]?.uniqueDownloaders || 0}
          </div>
        </Card>
      </div>"""
new_cards = """      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Active users</div>
          <div className="mt-2 text-4xl font-bold text-foreground">
            {data.activity[0]?.activated || 0}
          </div>
        </Card>
        <Card>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Unique downloaders</div>
          <div className="mt-2 text-4xl font-bold text-foreground">
            {data.activity[0]?.uniqueDownloaders || 0}
          </div>
        </Card>
      </div>"""
code = code.replace(old_cards, new_cards)

# 5. Remove PDF vs DOCX chart
pdf_docx_chart = """      <Card>
        <div className="flex items-center justify-between">
          <SectionHeader title="PDF vs DOCX Downloads" />
        </div>
        <div className="mt-8 flex justify-center gap-12">
          <DonutChart val1={pdfPct} val2={docxPct} />
          <div className="flex flex-col justify-center space-y-4">
            <Row label="PDF" value={`${data.activity[2]?.downloads || 0}`} dot="bg-[#34d399]" />
            <Row label="DOCX" value={`${data.activity[1]?.downloads || 0}`} dot="bg-[#0ea5e9]" />
          </div>
        </div>
      </Card>"""
code = code.replace(pdf_docx_chart, "")

with open("src/routes/dashboard/admin/analytics.tsx", "w") as f:
    f.write(code)

