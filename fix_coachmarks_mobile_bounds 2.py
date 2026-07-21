import re

path = "/Users/sama/Desktop/reactive-resume/src/components/editor/CoachMarks.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace PAD and highlightStyle
old_highlight_logic = """	const PAD = 10;
	const highlightStyle = rect
		? {
			top: rect.top - PAD,
			left: rect.left - PAD,
			width: rect.width + PAD * 2,
			height: rect.height + PAD * 2,
		}
		: null;"""

new_highlight_logic = """	const PAD = typeof window !== 'undefined' && window.innerWidth < 640 ? 4 : 10;
	let hlLeft = rect ? rect.left - PAD : 0;
	let hlWidth = rect ? rect.width + PAD * 2 : 0;
	let hlTop = rect ? rect.top - PAD : 0;
	let hlHeight = rect ? rect.height + PAD * 2 : 0;

	if (typeof window !== 'undefined' && rect) {
		if (hlLeft < 4) {
			hlWidth -= (4 - hlLeft);
			hlLeft = 4;
		}
		if (hlLeft + hlWidth > window.innerWidth - 4) {
			hlWidth = window.innerWidth - 4 - hlLeft;
		}
	}

	const highlightStyle = rect
		? {
			top: hlTop,
			left: hlLeft,
			width: hlWidth,
			height: hlHeight,
		}
		: null;"""

content = content.replace(old_highlight_logic, new_highlight_logic)

# Replace the floating sparkle icon position
old_sparkle_left = 'left: highlightStyle.left + highlightStyle.width - 18,'
new_sparkle_left = 'left: typeof window !== "undefined" ? Math.min(highlightStyle.left + highlightStyle.width - 18, window.innerWidth - 44) : highlightStyle.left + highlightStyle.width - 18,'

content = content.replace(old_sparkle_left, new_sparkle_left)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated padding and bounds for CoachMarks on mobile")
