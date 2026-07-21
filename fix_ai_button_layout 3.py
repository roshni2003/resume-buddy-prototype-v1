import re
import os

files = [
    {
        "path": "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/summary.tsx",
        "title": "Professional Summary",
        "text": "Create a recruiter-ready summary in seconds."
    },
    {
        "path": "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/experience.tsx",
        "title": "<Trans>Description</Trans>",
        "text": "Turn your work into impactful resume bullet points."
    },
    {
        "path": "/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/projects.tsx",
        "title": "<Trans>Description</Trans>",
        "text": "Highlight your project achievements powerfully."
    }
]

for file_info in files:
    path = file_info["path"]
    title = file_info["title"]
    text = file_info["text"]
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the button block
    button_start_match = re.search(r'(<div\s+className="relative\s+[^"]*?rounded-xl\s+bg-gray-50\s+p-1"[^>]*>.*?<AIGenerateButton.*?</AIGenerateButton>\s*</div>\s*</div>)', content, re.DOTALL)
    
    if not button_start_match:
        # Fallback regex if it's already modified
        button_start_match = re.search(r'(<div\s+className="relative\s+[^"]*?rounded-xl\s+bg-gray-50\s+p-1".*?</AIGenerateButton>\s*</div>)', content, re.DOTALL)
        
    if not button_start_match:
        print(f"Could not find button in {path}")
        continue
        
    button_block = button_start_match.group(1)
    
    # We need to replace the entire layout from the start of the title to the end of the AI chip
    if "summary.tsx" in path:
        regex_pattern = r'<div className="mb-3 flex flex-col sm:flex-row sm:items-end justify-between items-start gap-2">.*?Create a recruiter-ready summary in seconds\.\s*</span>\s*</div>'
    elif "experience.tsx" in path:
        regex_pattern = r'<div className="flex flex-col sm:flex-row sm:items-end justify-between items-start gap-2">\s*<FormLabel.*?Turn your work into impactful resume bullet points\.\s*</span>\s*</div>'
    else:
        regex_pattern = r'<div className="flex flex-col sm:flex-row sm:items-end justify-between items-start gap-2">\s*<FormLabel.*?Highlight your project achievements powerfully\.\s*</span>\s*</div>'
    
    match = re.search(regex_pattern, content, re.DOTALL)
    if not match:
        # Try finding old format
        print(f"Could not find wrapper in {path}")
        continue
    
    wrapper = match.group(0)
    
    # Construct the new layout
    label_tag = "label" if "summary.tsx" in path else "FormLabel"
    margin_class = "mb-3" if "summary.tsx" in path else "mb-2"
    
    new_layout = f"""<div className="{margin_class} flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-2">
    <div className="flex flex-col gap-2">
        <{label_tag} className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest">
            {title}
        </{label_tag}>
        
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <SparkleIcon weight="fill" className="h-3 w-3" />
                AI Assisted
            </span>
            <span className="text-xs text-slate-700 dark:text-gray-400">
                {text}
            </span>
        </div>
    </div>

    <div className="w-fit origin-left scale-[0.85] sm:origin-right sm:scale-100">
        {button_block}
    </div>
</div>"""

    new_content = content.replace(wrapper, new_layout)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {path}")
    
