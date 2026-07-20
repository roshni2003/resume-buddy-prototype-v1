import os

dialog_files = [
    "skill.tsx", "interest.tsx", "language.tsx", "custom.tsx"
]

base_dialog_path = "/Users/sama/Desktop/reactive-resume/src/dialogs/resume/sections/"

for f in dialog_files:
    filepath = os.path.join(base_dialog_path, f)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Fix width
        content = content.replace("!w-[576px] !max-w-[576px]", "w-full max-w-[95vw] sm:max-w-[576px]")
        content = content.replace("!w-[576px] !max-w-[576px]", "w-full max-w-[95vw] sm:max-w-[576px]") # just in case
        
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Fixed dialog width in {f}")

# Education section fixes
edu_path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/education.tsx"
if os.path.exists(edu_path):
    with open(edu_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # fix toggle
    content = content.replace('className="flex rounded-lg bg-gray-100 dark:bg-muted p-1 w-max"', 'className="flex w-full sm:w-max rounded-lg bg-gray-100 dark:bg-muted p-1"')
    
    # fix description height
    content = content.replace('className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50"', 'className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50 min-h-[120px]"')
    
    with open(edu_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print("Fixed education.tsx")

# Volunteer section description
vol_path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/volunteer.tsx"
if os.path.exists(vol_path):
    with open(vol_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace('className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card"', 'className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card min-h-[120px]"')
    content = content.replace('className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50"', 'className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50 min-h-[120px]"')
    
    with open(vol_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print("Fixed volunteer.tsx")

# Certifications section description
cert_path = "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/certifications.tsx"
if os.path.exists(cert_path):
    with open(cert_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace('className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card"', 'className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card min-h-[120px]"')
    content = content.replace('className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50"', 'className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50 min-h-[120px]"')
    
    with open(cert_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print("Fixed certifications.tsx")

