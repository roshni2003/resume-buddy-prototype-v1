import re

with open("src/routes/dashboard/admin/analytics.tsx", "r") as f:
    code = f.read()

# 1. Remove the broken comment and uncomment AI Output Quality, Resume Upload Pipeline
broken_comment_regex = re.compile(r'\{\/\*\s*<div className="text-5xl font-bold text-\[\#34d399\]">61%<\/div>\s*<div className="mt-2 text-xs text-muted-foreground">of downloads ran Final Review<\/div>\s*<\/div>\s*<\/Card>.*?<\/Card>\s*\*\/\s*<div className="grid gap-6 sm:grid-cols-2">', re.DOTALL)
if broken_comment_regex.search(code):
    code = broken_comment_regex.sub('<div className="grid gap-6 sm:grid-cols-2">', code)
else:
    print("Could not find broken comment to remove")

# 2. Uncomment JD matching graph
jd_matching_comment = """            {/*
            <div className="text-[11px] text-muted-foreground/80 mb-2">Match score distribution</div>
            <div className="flex h-24 items-end gap-1 mb-6">
              {[5, 10, 15, 25, 45, 60, 40, 20, 10, 5].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-border" style={{ height: `${h}%` }} />
              ))}
            </div>
            */}"""
jd_matching_uncommented = """            <div className="text-[11px] text-muted-foreground/80 mb-2">Match score distribution</div>
            <div className="flex h-24 items-end gap-1 mb-6">
              {[5, 10, 15, 25, 45, 60, 40, 20, 10, 5].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-border" style={{ height: `${h}%` }} />
              ))}
            </div>"""
if jd_matching_comment in code:
    code = code.replace(jd_matching_comment, jd_matching_uncommented)
else:
    print("Could not find JD matching comment")

# 3. Uncomment Cost & Reliability, and remove Prompt version tags card
cost_reliability_comment = """      <Card>
        <SectionHeader title="Prompt version tags" />
        <Table
          head={["Tag", "Volume", "Cost ($)"]}
          rows={data.promptTags.map(p => [p.tag, p.volume.toString(), p.cost])}
        />
      </Card>

      {/*
      </Card>

      <Card>
        <div className="mb-6">
          <SectionHeader title="Cost & Reliability" />"""

cost_reliability_uncommented = """      <Card>
        <div className="mb-6">
          <SectionHeader title="Cost & Reliability" />"""

if cost_reliability_comment in code:
    code = code.replace(cost_reliability_comment, cost_reliability_uncommented)
else:
    print("Could not find cost_reliability_comment")


# 4. Remove second Prompt version tags card and uncomment the rest
second_prompt_card_comment = """        </div>
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
          <SectionHeader title="Latency" />"""

second_prompt_card_uncommented = """        </div>
      </Card>

      <Card>
        <div className="flex justify-between mb-4">
          <SectionHeader title="Latency" />"""

if second_prompt_card_comment in code:
    code = code.replace(second_prompt_card_comment, second_prompt_card_uncommented)
else:
    print("Could not find second prompt card")

with open("src/routes/dashboard/admin/analytics.tsx", "w") as f:
    f.write(code)
