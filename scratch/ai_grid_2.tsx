        </Card>

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
