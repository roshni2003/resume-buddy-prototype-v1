import re

path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/education.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Outer wrapper padding
content = content.replace(
    '<div className="flex flex-col gap-4 p-4">',
    '<div className="flex flex-col gap-4 px-0 py-4 sm:p-4">'
)

# Inner card classes
content = content.replace(
    'className="relative flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-border bg-gray-50 dark:bg-card p-4"',
    'className="relative flex items-start gap-2 sm:gap-3 rounded-none sm:rounded-2xl border-y sm:border border-gray-100 dark:border-border bg-gray-50 dark:bg-card p-4 sm:p-5"'
)

# 2. Education type buttons 50% width on mobile
# Replace "px-4 py-1.5 rounded-md text-xs font-semibold transition-all"
# with "flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-semibold transition-all"
content = content.replace(
    '"px-4 py-1.5 rounded-md text-xs font-semibold transition-all"',
    '"flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-semibold transition-all"'
)

# 3. Fix grid-cols-3 in College Fields
content = content.replace(
    '<div className="grid grid-cols-3 gap-3">',
    '<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">'
)

# 4. Toggle alignment
old_toggle = """								{/* Currently studying toggle */}
								<div className="flex items-center gap-2 pl-0.5">
									<Switch
										checked={item.currentlyStudyingHere || false}
										onCheckedChange={(val) => {
											handleChange(item.id, "currentlyStudyingHere", val);
											if (val) {
												handleChange(item.id, "endDate", "");
											}
										}}
									/>
									<span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
										<Trans>Currently studying here</Trans>
									</span>
									{dateRange && (
										<span className="ml-2 text-xs text-gray-400 dark:text-gray-500">{dateRange}</span>
									)}
								</div>"""

new_toggle = """								{/* Currently studying toggle */}
								<div className="flex items-center justify-between sm:justify-start gap-2 pl-0.5 mt-1 sm:mt-0 w-full">
									<span className="text-sm text-gray-600 dark:text-gray-400 font-medium order-1 sm:order-2">
										<Trans>Currently studying here</Trans>
									</span>
									<Switch
										className="order-2 sm:order-1"
										checked={item.currentlyStudyingHere || false}
										onCheckedChange={(val) => {
											handleChange(item.id, "currentlyStudyingHere", val);
											if (val) {
												handleChange(item.id, "endDate", "");
											}
										}}
									/>
									{dateRange && (
										<span className="hidden sm:inline-block ml-2 text-xs text-gray-400 dark:text-gray-500 order-3">{dateRange}</span>
									)}
								</div>"""

content = content.replace(old_toggle, new_toggle)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated education.tsx mobile layout")
