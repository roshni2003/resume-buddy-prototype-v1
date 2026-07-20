import re

path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-components/top-tray.tsx"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add DotsThreeVerticalIcon to imports
content = content.replace("ListIcon,", "ListIcon,\n\tDotsThreeVertical as DotsThreeVerticalIcon,")
# Also import openZoeTour
if "openZoeTour" not in content:
    content = content.replace('import { AnimatedEyes, DeadEyes } from "./animated-eyes";', 'import { AnimatedEyes, DeadEyes } from "./animated-eyes";\nimport { openZoeTour } from "@/components/editor/CoachMarks";')

# 2. Split buttons into secondaryButtons and downloadButton
buttons_split_regex = r'(const buttons = \(\s*<>)(.*?)(<!-- Download Dropdown -->|{\/\* Download Dropdown \*\/})(.*?)(\s*</>\s*\);)'
match = re.search(buttons_split_regex, content, re.DOTALL)
if match:
    secondary_part = match.group(2)
    download_part = match.group(4)
    
    # Let's fix download button for mobile (icon only on mobile)
    # Remove w-full and add hidden sm:inline to the span
    download_part = download_part.replace('w-full h-9 justify-start gap-1.5 px-3 sm:w-auto sm:justify-center', 'h-9 w-auto justify-center gap-1.5 px-3')
    download_part = download_part.replace('<span className="font-medium">', '<span className="font-medium hidden sm:inline">')
    
    new_buttons_def = f"""	const secondaryButtons = (
		<>{secondary_part}</>
	);

	const downloadButton = (
		<>{match.group(3)}{download_part}</>
	);"""
    content = content.replace(match.group(0), new_buttons_def)

# 3. Update the Desktop and Mobile View render
render_split_regex = r'({\/\* Desktop View \*\/}.*?{\/\* Mobile View \*\/}.*?)({\/\* Review Drawer \*\/})'
match = re.search(render_split_regex, content, re.DOTALL)
if match:
    new_render = """			{/* Desktop View */}
			<div className="hidden sm:flex items-center justify-end gap-2">
				{secondaryButtons}
				{downloadButton}
			</div>

			{/* Mobile View */}
			<div className="flex items-center justify-end sm:hidden gap-1">
				{downloadButton}
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" variant="ghost" aria-label="More options" data-tour="btn-mobile-more">
							<DotsThreeVerticalIcon className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent side="bottom" className="p-4 flex flex-col gap-4 border-t border-border rounded-t-2xl max-h-[85vh] overflow-y-auto">
						<SheetHeader className="text-left mb-1">
							<SheetTitle>More Options</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-3">
							{secondaryButtons}
							<Button
								variant="outline"
								size="sm"
								onClick={openZoeTour}
								className="w-full justify-start gap-2 border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/15 px-3 py-2.5 text-sm font-medium text-fuchsia-700 dark:text-fuchsia-200 transition hover:from-fuchsia-500/25 hover:to-violet-500/25"
							>
								✨ How to Use Zoe
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>

			"""
    content = content.replace(match.group(1), new_render)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated top-tray.tsx")
