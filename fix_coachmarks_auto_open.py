import re

path = "/Users/sama/Desktop/reactive-resume/src/components/editor/CoachMarks.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the import for the sidebar store
if "useBuilderSidebarStore" not in content:
    content = content.replace('import { Sparkles, ChevronLeft, ChevronRight, Wand2 } from "lucide-react";', 'import { Sparkles, ChevronLeft, ChevronRight, Wand2 } from "lucide-react";\nimport { useBuilderSidebarStore } from "@/routes/builder/$resumeId/-store/sidebar";')

# Inject the useEffect to automatically toggle the sidebar
auto_open_effect = """	// Auto-toggle sidebar on mobile based on the target
	useEffect(() => {
		if (!active || !step) return;
		if (typeof window !== "undefined" && window.innerWidth < 640) {
			const isSidebarTarget = step.target.startsWith("section-");
			useBuilderSidebarStore.getState().setLeftSidebarCollapsed(!isSidebarTarget);
		}
	}, [active, step]);
	
	const measure = useCallback(() => {"""

if "// Auto-toggle sidebar" not in content:
    content = content.replace('const measure = useCallback(() => {', auto_open_effect)

# We should also remove the fallback to btn-mobile-sidebar because now the sidebar will open itself, 
# making the section available in the DOM!
fallback_regex = r'// If a section target isn\'t found.*?}\n\n\t\t'
content = re.sub(fallback_regex, '', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CoachMarks auto-open logic")
