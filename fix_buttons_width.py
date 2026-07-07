import re

path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-components/top-tray.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace w-full with w-auto in the secondary buttons
content = content.replace('w-full justify-start', 'w-auto justify-center')
content = content.replace('className="shrink-0 w-full sm:w-auto"', 'className="shrink-0"')
content = content.replace('flex w-full justify-start h-9', 'flex w-auto justify-center h-9')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed button widths")
