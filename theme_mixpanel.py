import re

path = "/Users/sama/Desktop/reactive-resume/src/routes/dashboard/admin/mixpanel.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the custom header entirely.
header_regex = re.compile(r'      {/\* Top bar \*/}.*?</header>', re.DOTALL)
content = header_regex.sub('', content)

# 2. Main container classes
content = content.replace('<div className="min-h-screen bg-[#0a0f0d] text-slate-100">', '<div className="space-y-8 pb-10">')
content = content.replace('<main className="mx-auto max-w-7xl px-6 py-8">', '<div className="w-full">')

# 3. Text colors
content = content.replace('text-slate-100', 'text-foreground')
content = content.replace('text-slate-200', 'text-foreground')
content = content.replace('text-slate-300', 'text-muted-foreground')
content = content.replace('text-slate-400', 'text-muted-foreground')
content = content.replace('text-slate-500', 'text-muted-foreground/70')
content = content.replace('text-black', 'text-primary-foreground')

# 4. Background and border colors
content = content.replace('bg-[#0a0f0d]', 'bg-background')
content = content.replace('bg-white/[0.03]', 'bg-card')
content = content.replace('bg-white/[0.02]', 'bg-muted/30')
content = content.replace('bg-white/[0.04]', 'bg-muted/50')
content = content.replace('bg-white/5', 'bg-muted/40')
content = content.replace('bg-white/10', 'bg-muted')
content = content.replace('border-white/5', 'border-border')
content = content.replace('border-white/10', 'border-border')
content = content.replace('divide-white/5', 'divide-border')

# 5. Buttons and active tabs
content = content.replace('bg-emerald-500 text-primary-foreground', 'bg-primary text-primary-foreground')
content = content.replace('hover:bg-white/5', 'hover:bg-muted')
content = content.replace('hover:bg-white/10', 'hover:bg-muted')
content = content.replace('hover:bg-white/[0.02]', 'hover:bg-muted/50')
content = content.replace('hover:bg-emerald-400', 'hover:bg-primary/90')
content = content.replace('bg-emerald-500/15', 'bg-primary/15')
content = content.replace('text-emerald-300', 'text-primary')
content = content.replace('text-emerald-400', 'text-primary')
content = content.replace('text-emerald-200', 'text-primary')
content = content.replace('bg-emerald-500/5', 'bg-primary/5')
content = content.replace('border-emerald-500/20', 'border-primary/20')

# Card shadow to standard tailwind
content = content.replace('shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]', 'shadow-sm')

# 6. Move the badges next to the title
old_title_area = """        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Product Insights <span className="italic text-primary">Dashboard</span>
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Unified view of resume creation, AI usage, search behavior and retention — replacing the Mixpanel handoff.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs hover:bg-muted">
              Export CSV
            </button>
            <button className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
              Add Filter
            </button>
          </div>
        </div>"""

new_title_area = """        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
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
        </div>"""

content = content.replace(old_title_area, new_title_area)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied semantic theme to mixpanel.tsx")
