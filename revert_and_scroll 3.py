import re

path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-components/top-tray.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the two rendering blocks (Desktop/Mobile View) with a single horizontal scrolling one
render_split_regex = r'({\/\* Desktop View \*\/}.*?)({\/\* Review Drawer \*\/})'
match = re.search(render_split_regex, content, re.DOTALL)
if match:
    new_render = """			{/* Unified Responsive View */}
			<div className="flex items-center justify-start sm:justify-end gap-2 w-max sm:w-auto pb-1 sm:pb-0">
				{secondaryButtons}
				<Button
					variant="outline"
					size="sm"
					onClick={openZoeTour}
					className="shrink-0 group flex sm:hidden items-center gap-2 rounded-full border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/15 px-3 py-1.5 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-200 transition"
				>
					✨ How to Use Zoe
				</Button>
				{downloadButton}
			</div>

			"""
    content = content.replace(match.group(1), new_render)
    
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated top-tray.tsx for horizontal scrolling")
