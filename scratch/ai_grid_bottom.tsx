      </Card>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <SectionHeader title="Cost & Reliability" />
          <div className="flex gap-1 bg-muted/30 border border-border rounded-full p-0.5">
            <div className="px-3 py-1 bg-border rounded-full text-[10px] font-bold text-foreground">daily</div>
            <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground/80">weekly</div>
            <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground/80">monthly</div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="text-[10px] font-bold text-muted-foreground/80 mb-4">Total AI spend (daily)</div>
            <AreaChart />
            <div className="mt-2 text-[11px] font-bold text-foreground/80">Cost per completed resume: <span className="text-foreground">$0.038</span></div>
          </div>
          <div className="w-1/3">
            <div className="text-[10px] font-bold text-muted-foreground/80 mb-4">Error / Timeout rate per endpoint</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground w-24">/ai/final-review</span>
                <div className="flex-1 h-1.5 bg-muted mx-3 rounded-full overflow-hidden">
                  <div className="h-full bg-[#facc15] w-[20%]" />
                </div>
                <span className="font-bold">1.4%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground w-24">/ai/summary</span>
                <div className="flex-1 h-1.5 bg-muted mx-3 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34d399] w-[5%]" />
                </div>
                <span className="font-bold">0.3%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground w-24">/ai/experience</span>
                <div className="flex-1 h-1.5 bg-muted mx-3 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34d399] w-[8%]" />
                </div>
                <span className="font-bold">0.5%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground w-24">/ai/jd-match</span>
                <div className="flex-1 h-1.5 bg-muted mx-3 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ef4444] w-[40%]" />
                </div>
                <span className="font-bold">2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Prompt version tags" />
        <Table
          head={["Tag", "Volume", "Cost ($)"]}
          rows={data.promptTags.map(p => [p.tag, p.volume.toString(), p.cost])}
        />
      </Card>

      <Card>
        <div className="flex justify-between mb-4">
          <SectionHeader title="Latency" />
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-bold">TARGET REFERENCE LINES</div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
              <span>Total AI response (ms)</span>
              <span className="text-[#34d399]">target &lt; 3500</span>
            </div>
            <LineChart color="#059669" targetY={50} />
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
