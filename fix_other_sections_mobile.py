import re

files = [
    ("/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/certifications.tsx", "certifications"),
    ("/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/volunteer.tsx", "volunteer")
]

for path, type_str in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Outer wrapper padding
    content = content.replace(
        '<div className="flex flex-col gap-4 p-4">',
        '<div className="flex flex-col gap-4 px-0 py-4 sm:p-4">'
    )

    # 2. Inner card padding
    if type_str == "certifications":
        content = content.replace(
            'className="relative flex items-start gap-4 rounded-3xl border border-gray-100 dark:border-border bg-gray-50/50 dark:bg-card p-4"',
            'className="relative flex items-start gap-2 sm:gap-4 rounded-none sm:rounded-3xl border-y sm:border border-gray-100 dark:border-border bg-gray-50/50 dark:bg-card p-4 sm:p-5"'
        )
    elif type_str == "volunteer":
        content = content.replace(
            'className="relative flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-border bg-gray-50 dark:bg-muted/50 p-4"',
            'className="relative flex items-start gap-2 sm:gap-3 rounded-none sm:rounded-2xl border-y sm:border border-gray-100 dark:border-border bg-gray-50 dark:bg-muted/50 p-4 sm:p-5"'
        )

    # 3. Toggle alignment
    old_toggle_cert = """							<div className="flex items-center gap-2 pl-0.5">
								<Switch
									checked={item.options?.showLinkInTitle || false}
									onCheckedChange={(val) => handleChange(item.id, "options.showLinkInTitle", val)}
								/>
								<span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
									<Trans>Show link in title</Trans>
								</span>
							</div>"""
    
    new_toggle_cert = """							<div className="flex items-center justify-between sm:justify-start gap-2 pl-0.5 mt-1 sm:mt-0 w-full">
								<span className="text-sm text-gray-600 dark:text-gray-400 font-medium order-1 sm:order-2">
									<Trans>Show link in title</Trans>
								</span>
								<Switch
									className="order-2 sm:order-1"
									checked={item.options?.showLinkInTitle || false}
									onCheckedChange={(val) => handleChange(item.id, "options.showLinkInTitle", val)}
								/>
							</div>"""

    old_toggle_vol = """							<div className="flex items-center gap-2 pl-0.5">
								<Switch
									checked={item.options?.showLinkInTitle || false}
									onCheckedChange={(val) => handleChange(item.id, "options.showLinkInTitle", val)}
								/>
								<span className="text-sm text-gray-600 font-medium">
									<Trans>Show link in title</Trans>
								</span>
							</div>"""
    
    new_toggle_vol = """							<div className="flex items-center justify-between sm:justify-start gap-2 pl-0.5 mt-1 sm:mt-0 w-full">
								<span className="text-sm text-gray-600 dark:text-gray-400 font-medium order-1 sm:order-2">
									<Trans>Show link in title</Trans>
								</span>
								<Switch
									className="order-2 sm:order-1"
									checked={item.options?.showLinkInTitle || false}
									onCheckedChange={(val) => handleChange(item.id, "options.showLinkInTitle", val)}
								/>
							</div>"""

    if type_str == "certifications":
        content = content.replace(old_toggle_cert, new_toggle_cert)
    elif type_str == "volunteer":
        content = content.replace(old_toggle_vol, new_toggle_vol)
        # volunteer also uses dark:text-gray-400 in the span now

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated certifications and volunteer mobile layouts")
