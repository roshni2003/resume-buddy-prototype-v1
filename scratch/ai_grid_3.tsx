          <div className="flex-1 pl-2">
            <div className="text-[11px] text-muted-foreground/80 mb-2">Verdict split</div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-[#34d399]" style={{ width: '23%' }} />
              <div className="h-full bg-[#fcd34d]" style={{ width: '24%' }} />
              <div className="h-full bg-[#f97316]" style={{ width: '37%' }} />
              <div className="h-full bg-[#ef4444]" style={{ width: '15%' }} />
            </div>
            <div className="mt-4 space-y-2">
              <Row label="STRONG FIT" value="23%" dot="bg-[#34d399]" />
              <Row label="GOOD FIT" value="24%" dot="bg-[#fcd34d]" />
              <Row label="MODERATE FIT" value="37%" dot="bg-[#f97316]" />
              <Row label="NEEDS WORK" value="15%" dot="bg-[#ef4444]" />
            </div>
            <div className="mt-4 rounded-lg border border-[#059669]/30 bg-[#059669]/10 px-3 py-2 text-[10px] text-[#34d399] font-medium">
              46% tailored-resume acceptance rate
