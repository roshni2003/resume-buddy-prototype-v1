import os

profile_path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/profiles.tsx"
if os.path.exists(profile_path):
    with open(profile_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # fix the add network view for mobile (2 columns)
    content = content.replace('className="flex flex-wrap gap-3"', 'className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"')
    
    with open(profile_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print("Fixed profiles.tsx")
