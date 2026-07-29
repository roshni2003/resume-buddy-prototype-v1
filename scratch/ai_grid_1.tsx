            <div className="text-5xl font-bold text-[#34d399]">61%</div>
            <div className="mt-2 text-xs text-muted-foreground">of downloads ran Final Review</div>
          </div>
        </Card>

        <Card>
          <SectionHeader title="Daily Cap Usage" hint="CAP: 2 / DAY" />
          <div className="mt-4">
            <div className="text-[11px] text-muted-foreground">Avg uses per active day</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">1.3</span>
              <span className="text-sm font-medium text-muted-foreground/80">/ 2</span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[65%] rounded-full bg-[#059669]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <SectionHeader title="AI Output Quality" />
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex-1 rounded-xl border border-border bg-muted/30 p-4">
              <div className="text-[10px] text-muted-foreground/80">Acceptance</div>
              <div className="mt-1 text-2xl font-bold text-[#34d399]">74%</div>
              <div className="mt-1 text-[10px] text-muted-foreground/60">Revert · 26%</div>
            </div>
            <div className="flex-1 rounded-xl border border-border bg-muted/30 p-4">
              <div className="text-[10px] text-muted-foreground/80">Avg edits after accept</div>
              <div className="mt-1 text-2xl font-bold text-foreground">3.4</div>
              <div className="mt-1 text-[10px] text-muted-foreground/60">edits / accepted suggestion</div>
            </div>
