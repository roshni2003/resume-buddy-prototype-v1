import os
import re

dir_path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections"

for filename in os.listdir(dir_path):
    if not filename.endswith(".tsx"):
        continue
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Replace grid-cols-2 that are NOT sm:grid-cols-2 or md:grid-cols-2
    # We use regex with negative lookbehind
    new_content = re.sub(r'(?<!sm:)(?<!md:)grid-cols-2', 'grid-cols-1 sm:grid-cols-2', new_content)
    
    # Replace flex items-end justify-between
    new_content = new_content.replace('flex items-end justify-between', 'flex flex-col sm:flex-row sm:items-end justify-between items-start gap-2')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")

print("Done")
