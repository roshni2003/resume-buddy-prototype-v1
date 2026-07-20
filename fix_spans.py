import re

path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-components/top-tray.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the span classes to hide text on mobile
content = content.replace('className="inline sm:hidden lg:inline"', 'className="hidden sm:inline"')
content = content.replace('className="inline sm:hidden lg:inline"', 'className="hidden sm:inline"')

# Check if there are any remaining "w-auto justify-center" that should be "w-9" on mobile for square icon buttons
# Actually just letting it size naturally is fine, but h-9 w-9 is better.
content = content.replace('className="h-9 w-auto justify-center gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2"', 'className="h-9 w-9 sm:w-auto justify-center gap-1.5 px-0 sm:px-3 sm:gap-2"')
content = content.replace('className="flex w-auto justify-center h-9 gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2"', 'className="flex w-9 sm:w-auto justify-center h-9 gap-1.5 px-0 sm:px-3 sm:gap-2"')
content = content.replace('className="h-9 w-auto justify-center gap-1.5 px-3 sm:gap-2"', 'className="h-9 w-9 sm:w-auto justify-center gap-1.5 px-0 sm:px-3 sm:gap-2"')
content = content.replace('className="flex h-9 w-auto justify-center gap-1.5 px-3', 'className="flex h-9 w-9 sm:w-auto justify-center gap-1.5 px-0 sm:px-3')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed spans and widths")
