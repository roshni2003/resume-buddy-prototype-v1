import re

files = [
    ("/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/summary.tsx", "Professional Summary", "Create a recruiter-ready summary in seconds.", "summary", "amber"),
    ("/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/experience.tsx", "Description", "Turn bullet points into standout achievements.", "experience", "blue"),
    ("/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/sections/projects.tsx", "Description", "Turn projects into standout resume bullets.", "projects", "violet")
]

for path, title, text, type_str, color in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_str = '<div className="mb-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">'
    end_str = '</div>\n\t\t\t\t\t\t</div>' if type_str == "summary" else '</div>\n\t\t\t\t\t\t\t</div>'
    
    start_idx = content.find(start_str)
    
    if type_str == "summary":
        # we know it ends right before `{/* Input Area */}`
        end_idx = content.find('{/* Input Area */}', start_idx)
    elif type_str == "experience":
        # ends right before `<FormControl>`
        end_idx = content.find('<FormControl>', start_idx)
    elif type_str == "projects":
        # ends right before `<FormControl>`
        end_idx = content.find('<FormControl>', start_idx)
        
    if start_idx != -1 and end_idx != -1:
        # Move end_idx back to include the closing tags correctly. The previous tag is a div.
        # It's easier to just take substring up to end_idx - some whitespace.
        
        isFormLabel = type_str != "summary"
        label_tag = "FormLabel" if isFormLabel else "label"
        title_text = "<Trans>Description</Trans>" if isFormLabel else "Professional Summary"
        resume_id_prop = "{resumeId}" if type_str == "summary" else "{useResumeStore.getState().resume.id}"
        
        if type_str == "summary":
            data_prop = """{{
											name: resumeData.basics.name,
											headline: resumeData.basics.headline,
											experience: resumeData.sections.experience.items.slice(0, 2),
											skills: resumeData.sections.skills.items.slice(0, 5).map((skill) => skill.name),
											currentSummary: content || "",
										}}"""
        elif type_str == "projects":
            data_prop = """{{
												name: form.getValues("name"),
												description,
											}}"""
        else:
            data_prop = """{{
												position: form.getValues("position"),
												company: form.getValues("company"),
												summary: description,
											}}"""
        
        new_layout = f"""<div className="mb-3 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-end sm:justify-between gap-y-2 sm:gap-y-0">
								<{label_tag} className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest block w-full sm:w-auto sm:mb-2">
									{title_text}
								</{label_tag}>

								<div className="w-fit origin-left sm:origin-right scale-90 sm:scale-100 order-last sm:order-none sm:ml-auto mt-1 sm:mt-0">
									<div
										className="relative rounded-xl bg-gray-50 p-1 sm:mb-2"
										onMouseEnter={{() => setIsHovering(true)}}
										onMouseLeave={{() => setIsHovering(false)}}
									>
										{{shouldGlow && (
											<>
												<div className="absolute -inset-1 rounded-full bg-{color}-400/40 blur-md animate-ai-glow" />
												<div className="absolute -inset-2 rounded-full border border-{color}-300/50 animate-ai-glow-ring" />
											</>
										)}}

										<AIGenerateButton
											resumeId={resume_id_prop}
											type="{type_str}"
											data={data_prop}
											onGenerated={{handleAIGenerated}}
											roundsUsed={{roundsUsed}}
											maxRounds={{maxRounds}}
											isWordCountValid={{isWordCountValid}}
											disabled={{roundsUsed >= maxRounds || !isWordCountValid}}
											className="relative z-10 font-bold text-black shadow-lg shadow-{color}-500/30 hover:text-black"
										/>
									</div>
								</div>

								<div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 order-2 sm:order-none sm:mb-3">
									<div className="w-fit">
										<span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
											<SparkleIcon weight="fill" className="h-3 w-3" />
											AI Assisted
										</span>
									</div>

									<span className="text-xs text-slate-700 dark:text-gray-400">
										{text}
									</span>
								</div>
							</div>
							
							"""
        
        # the part to replace is from start_idx to end_idx
        content = content[:start_idx] + new_layout + content[end_idx:]
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {type_str}")
    else:
        print(f"Could not find indices for {type_str}")

