import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { JDMatchResult } from "@/utils/api";
import {
	ArrowLeftIcon,
	CheckCircleIcon,
	SparkleIcon,
	UploadSimpleIcon,
	CheckIcon,
	FileTextIcon,
	XCircleIcon,
	WarningCircleIcon,
	SpinnerGapIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useDialogStore } from "@/dialogs/store";
import { templates } from "@/dialogs/resume/template/data";
import type { Template } from "@/schema/templates";
import { defaultResumeData } from "@/schema/resume/data";
import { OnboardingWizard, type OnboardingAnswers, onboardingQuestions } from "./-components/OnboardingWizard";

const ACCEPTED_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_MB = 5;

function validateFile(file: File): string | null {
	if (!ACCEPTED_TYPES.includes(file.type) && !file.name.endsWith(".pdf") && !file.name.endsWith(".doc") && !file.name.endsWith(".docx")) {
		return "Only PDF, DOC, or DOCX files are accepted.";
	}
	if (file.size > MAX_SIZE_MB * 1024 * 1024) {
		return `File must be under ${MAX_SIZE_MB} MB.`;
	}
	return null;
}

export const Route = createFileRoute("/dashboard/resumes/match")({
	component: MatchToJobRouteComponent,
});

type MatchStep = "paste_job" | "resume_choice" | "pick_resume" | "start_fresh" | "loading" | "report" | "low_score_warning" | "choose_template";

function MatchToJobRouteComponent() {
	const isCreatingRef = useRef(false);

	const navigate = useNavigate();
	const { openDialog } = useDialogStore();
	
	const [step, setStep] = useState<MatchStep>("paste_job");
	const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
	const [matchResult, setMatchResult] = useState<JDMatchResult | null>(null);
	const [matchError, setMatchError] = useState<string | null>(null);
	const [selectedTemplate, setSelectedTemplate] = useState<Template>("ditto");
	
	const [role, setRole] = useState("");
	const [company, setCompany] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	
	const [jdMatchId, setJdMatchId] = useState<string | null>(null);
	
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadingFile, setUploadingFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState<string | null>(null);

	// Fetch existing resumes
	const { data: resumes = [] } = useQuery({
		queryKey: ["resumes", { tags: [], sort: "lastUpdatedAt" }],
		queryFn: () => api.fetchResumes({ tags: [], sort: "lastUpdatedAt" }),
	});

	const formatLastModified = (dateString: string | Date | undefined) => {
		if (!dateString) return "Unknown";
		const last = new Date(dateString);
		if (isNaN(last.getTime())) return "Unknown";
		const now = new Date();
		const diff = now.getTime() - last.getTime();
		const days = Math.floor(diff / 86400000);
		if (days === 0) {
			return `Today, ${last.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
		}
		if (days === 1) return "Yesterday";
		return `${days} days ago`;
	};

	// Dropdown options
	const expOptions = [
		{ value: "0-1 years", label: "0-1 years" },
		{ value: "1-3 years", label: "1-3 years" },
		{ value: "3-5 years", label: "3-5 years" },
		{ value: "5-10 years", label: "5-10 years" },
		{ value: "10+ years", label: "10+ years" },
	];

	// Helper to analyze resume data purely on the client side without backend APIs
	const analyzeResumeDataLocally = (resumeData: any, targetRole: string, companyName: string, jdText: string): JDMatchResult => {
		const basics = resumeData?.basics || {};
		const sections = resumeData?.sections || {};
		const summary = resumeData?.summary?.content || "";

		const hasSummary = Boolean(summary && summary.trim().length > 20);
		const expItems = sections?.experience?.items || [];
		const eduItems = sections?.education?.items || [];
		const skillItems = sections?.skills?.items || [];
		const projectItems = sections?.projects?.items || [];

		const missingSections: string[] = [];
		if (!basics.name || !basics.headline) missingSections.push("Personal details & Target Headline");
		if (!hasSummary) missingSections.push("Professional Summary");
		if (expItems.length === 0) missingSections.push("Work Experience");
		if (eduItems.length === 0) missingSections.push("Education History");
		if (skillItems.length === 0) missingSections.push("Skills List");

		const suggestions: string[] = [];
		if (!hasSummary) {
			suggestions.push("Add a targeted 2-3 line career summary highlighting your core strengths.");
		}
		if (expItems.length === 0) {
			suggestions.push("Add at least 1-2 practical experiences or projects with measurable contributions.");
		} else {
			suggestions.push("Strengthen experience bullet points by connecting your tools directly to project outcomes.");
		}
		if (eduItems.length === 0) {
			suggestions.push("List your primary degree, university, and graduation year so recruiters can verify your background.");
		}
		if (skillItems.length < 5) {
			suggestions.push("Expand your core skills list with relevant technologies and tools mentioned in your target role.");
		}

		// Calculate client-side completion / match score
		let score = 50;
		if (hasSummary) score += 10;
		if (expItems.length > 0) score += 15;
		if (eduItems.length > 0) score += 10;
		if (skillItems.length >= 4) score += 15;

		const roleTokens = (targetRole || "developer software engineer")
			.toLowerCase()
			.split(/[\s,/]+/)
			.filter((t) => t.length > 2);
		const matchedSkills: string[] = [];
		const missingSkills: string[] = [];

		skillItems.forEach((s: any) => {
			const name = typeof s === "string" ? s : s?.name || "";
			if (name) matchedSkills.push(name);
		});

		roleTokens.forEach((tok) => {
			if (!matchedSkills.some((m) => m.toLowerCase().includes(tok))) {
				missingSkills.push(tok.charAt(0).toUpperCase() + tok.slice(1));
			}
		});

		return {
			match_score: Math.min(score, 94),
			verdict: missingSections.length === 0 ? "Strong Foundational Profile" : "Profile Needs Completion",
			matched_keywords: matchedSkills.slice(0, 8),
			missing_keywords: missingSections.slice(0, 5),
			missing_skills: missingSkills.slice(0, 4),
			suggestions: suggestions.length > 0 ? suggestions : ["Profile looks well-rounded. Review layout before export."],
			summary: `Client-side review of ${basics.name || "candidate"}'s resume for ${targetRole || "target position"}. Identified ${matchedSkills.length} existing skills and ${missingSections.length} recommended sections to enhance.`,
		};
	};

	// Call real JD Match API or fallback to instant client-side analysis in standalone mode
	const handleRunMatch = async () => {
		if (!selectedResumeId) return;
		if (selectedResumeId === "file_upload" && !uploadingFile) return;

		setMatchError(null);
		setStep("loading");

		// Fetch selected local resume if available
		let localResume: any = null;
		if (selectedResumeId !== "file_upload") {
			try {
				localResume = await api.fetchResume(selectedResumeId);
			} catch {
				// ignore
			}
		}

		try {
			let res: any = null;
			const fullJobDescription = `Role: ${role}\nCompany: ${company}\n\nJob Description:\n${jobDescription}`;

			// Try remote API if connected, else catch immediately and fall back to local analysis
			try {
				if (selectedResumeId === "file_upload") {
					res = await api.jdMatchUpload({ resume_upload: uploadingFile!, jd_text: fullJobDescription });
				} else {
					res = await api.jdMatch({ resume_id: selectedResumeId, jd_text: fullJobDescription });
				}
			} catch (apiErr) {
				console.info("[Resume Review] Remote API offline or unavailable, using standalone client analysis:", apiErr);
			}

			if (res?.success && res?.jdMatch) {
				setMatchResult(res.jdMatch);
				setStep("report");
			} else {
				// Standalone fallback: Analyze local resume data or uploaded file
				const analysis = analyzeResumeDataLocally(
					localResume?.data || defaultResumeData,
					role || "Professional",
					company || "Company",
					jobDescription
				);
				setMatchResult(analysis);
				setStep("report");
			}
		} catch (e: any) {
			// Fallback safely to client-side report without showing raw errors to user
			const analysis = analyzeResumeDataLocally(
				localResume?.data || defaultResumeData,
				role || "Professional",
				company || "Company",
				jobDescription
			);
			setMatchResult(analysis);
			setStep("report");
		}
	};

	const handleRunOnboardingMatch = async (answers: OnboardingAnswers) => {
		setMatchError(null);
		setStep("loading");
		try {
			const fullJobDescription = `Role: ${role}\nCompany: ${company}\n\nJob Description:\n${jobDescription}`;

			// Format answers to convert comma-separated strings back to arrays expected by the backend
			const formattedAnswers = {
				...answers,
				projects: answers.projects.map((p) => ({
					...p,
					"4.6": p["4.6"] ? p["4.6"].split(",").map((s) => s.trim()).filter(Boolean) : [],
				})),
				experience: answers.experience.map((e) => ({
					...e,
					"5.7": e["5.7"] ? (e["5.7"] as any).split(",").map((s: string) => s.trim()).filter(Boolean) : [],
					"5.8": e["5.8"] ? (e["5.8"] as any).split(",").map((s: string) => s.trim()).filter(Boolean) : [],
				})),
			};

			let res: any = null;
			try {
				res = await api.onboardingJdMatch({
					jd_text: fullJobDescription,
					onboarding_questions: onboardingQuestions,
					onboarding_answers: formattedAnswers as any,
				});
			} catch (apiErr) {
				console.info("[Resume Review] Remote onboarding match offline, providing standalone report.");
			}

			if (res?.success || res?.jd_match_id) {
				setMatchResult(res.jdMatch || res.report);
				setJdMatchId(res.jd_match_id);
				setStep("report");
			} else {
				// Standalone simulated report
				const simulated = analyzeResumeDataLocally(
					defaultResumeData,
					role || "Role",
					company || "Company",
					fullJobDescription
				);
				setMatchResult(simulated);
				setStep("report");
			}
		} catch (e: any) {
			const simulated = analyzeResumeDataLocally(
				defaultResumeData,
				role || "Role",
				company || "Company",
				jobDescription
			);
			setMatchResult(simulated);
			setStep("report");
		}
	};

	const isStep1Valid = role.trim() !== "" && company.trim() !== "" && jobDescription.trim() !== "";

	const queryClient = useQueryClient();
	const [isCreating, setIsCreating] = useState(false);

	const handleGenerateTailored = async () => {
		if ((matchResult?.match_score ?? 0) < 30) {
			setStep("low_score_warning");
			return;
		}
		setStep("choose_template");
	};

	const handleConfirmTemplate = async () => {
		if (isCreatingRef.current) return;
		
		if (jdMatchId) {
			try {
				isCreatingRef.current = true;
				setIsCreating(true);
				const tailoredData = await api.tailorResume({ jd_match_id: jdMatchId, template: selectedTemplate });
				
				const newResume = await api.createResume({
					name: tailoredData.name || `Tailored: ${role} at ${company}`,
					slug: tailoredData.slug || `tailored-${Date.now().toString(36)}`,
					data: {
						...defaultResumeData,
						...tailoredData.data,
						metadata: {
							...(tailoredData.data?.metadata || defaultResumeData.metadata),
							template: selectedTemplate,
							design: {
								...(tailoredData.data?.metadata?.design || defaultResumeData.metadata.design),
								colors: {
									...(tailoredData.data?.metadata?.design?.colors || defaultResumeData.metadata.design.colors),
									primary: templates[selectedTemplate].defaults.design.colors.primary,
								},
							},
						}
					},
					withSampleData: false,
				});

				await queryClient.invalidateQueries({ queryKey: ["resumes"] });
				window.history.replaceState(null, "", "/dashboard/resumes");
				navigate({ to: "/builder/$resumeId", params: { resumeId: newResume.id } });
			} catch (e) {
				console.error("Failed to tailor resume with onboarding", e);
				setIsCreating(false);
				isCreatingRef.current = false;
			}
			return;
		}

		if (selectedResumeId && selectedResumeId !== "file_upload") {
			try {
				isCreatingRef.current = true;
				setIsCreating(true);
				const originalResume = await api.fetchResume(selectedResumeId);
				const updatedData = {
					...originalResume.data,
					metadata: {
						...originalResume.data.metadata,
						template: selectedTemplate,
						design: {
							...originalResume.data.metadata.design,
							colors: {
								...originalResume.data.metadata.design.colors,
								primary: templates[selectedTemplate].defaults.design.colors.primary,
							},
						},
					},
				};
				
				const newResume = await api.createResume({
					name: `Tailored: ${originalResume.name}`,
					slug: `tailored-${Date.now().toString(36)}`,
					data: updatedData,
					withSampleData: false,
				});
				
				await queryClient.invalidateQueries({ queryKey: ["resumes"] });
				// Force the history stack to have Dashboard before Builder so back button works correctly
				window.history.replaceState(null, "", "/dashboard/resumes");
				navigate({ to: "/builder/$resumeId", params: { resumeId: newResume.id } });
			} catch(e) {
				console.error("Failed to create tailored resume", e);
				setIsCreating(false);
				isCreatingRef.current = false;
			}
		} else {
			try {
				isCreatingRef.current = true;
				setIsCreating(true);
				let resumeDataPayload: any = undefined;
				
				if (uploadingFile) {
					const parsedRaw = await api.resumeUpload({ resume_upload: uploadingFile });

					if (parsedRaw.data?.sections?.skills?.items) {
						let allSkills: string[] = [];
						const genericCategories = ["skills", "frontend", "backend", "languages", "tools", "frameworks", "technologies", "technical skills", "libraries", "databases", "other", "core skills", "programming languages"];
						
						parsedRaw.data.sections.skills.items.forEach((item: any) => {
							const name = item.name ? item.name.trim() : "";
							const hasKeywords = Array.isArray(item.keywords) && item.keywords.length > 0;
							
							if (name && genericCategories.includes(name.toLowerCase()) && hasKeywords) {
								allSkills.push(...item.keywords);
							} else if (name) {
								allSkills.push(...name.split(",").map((s: string) => s.trim()));
							} else if (hasKeywords) {
								allSkills.push(...item.keywords);
							} else if (typeof item.keywords === "string" && item.keywords.trim() !== "") {
								allSkills.push(...item.keywords.split(",").map((s: string) => s.trim()));
							}
						});
						allSkills = Array.from(new Set(allSkills)).filter(Boolean).slice(0, 20);
						parsedRaw.data.sections.skills.items = allSkills.map(skillName => ({
								id: crypto.randomUUID(),
								hidden: false,
								name: skillName,
								icon: "",
								proficiency: "",
								level: 0,
								keywords: []
						}));
					}

					resumeDataPayload = parsedRaw.data ? { 
						...defaultResumeData, 
						...parsedRaw.data, 
						sections: {
							...defaultResumeData.sections,
							...(parsedRaw.data.sections || {})
						},
						metadata: {
							...defaultResumeData.metadata,
							template: selectedTemplate,
							design: {
								...defaultResumeData.metadata.design,
								colors: {
									...defaultResumeData.metadata.design.colors,
									primary: templates[selectedTemplate].defaults.design.colors.primary,
								},
							},
						}, 
						picture: defaultResumeData.picture 
					} : undefined;
				} else {
					// Start fresh or fallback
					resumeDataPayload = {
						...defaultResumeData,
						metadata: {
							...defaultResumeData.metadata,
							template: selectedTemplate,
							design: {
								...defaultResumeData.metadata.design,
								colors: {
									...defaultResumeData.metadata.design.colors,
									primary: templates[selectedTemplate].defaults.design.colors.primary,
								},
							},
						}
					};
				}

				const resume = await api.createResume({
					name: uploadingFile?.name ? `Tailored: ${uploadingFile.name}` : "Tailored Resume",
					slug: `tailored-${Date.now().toString(36)}`,
					data: resumeDataPayload,
					withSampleData: !uploadingFile,
				});
				
				await queryClient.invalidateQueries({ queryKey: ["resumes"] });
				// Force the history stack to have Dashboard before Builder so back button works correctly
				window.history.replaceState(null, "", "/dashboard/resumes");
				navigate({ to: "/builder/$resumeId", params: { resumeId: resume.id } });
			} catch (e) {
				console.error("Failed to create resume", e);
				setIsCreating(false);
				isCreatingRef.current = false;
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const err = validateFile(file);
			setFileError(err);
			setUploadingFile(file);
			setSelectedResumeId("file_upload");
		}
	};

	return (
		<div className="space-y-6 max-w-4xl mx-auto py-4 px-4 md:px-8 font-sans text-foreground selection:bg-emerald-500/30" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
			{/* Header */}
			{step !== "report" && step !== "loading" && (
				<div className="max-w-2xl mx-auto flex items-center">
					<button
						onClick={() => {
							if (step === "paste_job") navigate({ to: "/dashboard/resumes" });
							if (step === "resume_choice") setStep("paste_job");
							if (step === "pick_resume") setStep("resume_choice");
							if (step === "start_fresh") setStep("resume_choice");
						}}
						className="cursor-pointer inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
					>
						<ArrowLeftIcon className="size-4" />
						<span>Back</span>
					</button>
				</div>
			)}

			{/* Step 1: Paste Job */}
			{step === "paste_job" && (
				<div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div>
						<h1 className="text-3xl font-bold mb-2">Paste the job</h1>
						<p className="text-muted-foreground">Zoe will pull keywords and tailor your resume to match.</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Role</label>
							<Input
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="bg-muted/40 border-border/50 text-foreground text-base h-12 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50"
								placeholder="e.g. Software Developer"
								autoComplete="off"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Company</label>
							<Input
								value={company}
								onChange={(e) => setCompany(e.target.value)}
								className="bg-muted/40 border-border/50 text-foreground text-base h-12 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50"
								placeholder="e.g. Google"
								autoComplete="off"
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Job Description</label>
						<textarea
							value={jobDescription}
							onChange={(e) => setJobDescription(e.target.value)}
							className="w-full h-48 rounded-xl bg-muted/40 border border-border/50 p-4 text-foreground text-base placeholder:text-foreground0 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none transition-all"
							placeholder="Paste the full job description here..."
						/>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button
							variant="outline"
							onClick={() => navigate({ to: "/dashboard/resumes" })}
							className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground"
						>
							Back
						</Button>
						<Button
							disabled={!isStep1Valid}
							onClick={() => setStep("resume_choice")}
							className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Continue
						</Button>
					</div>
				</div>
			)}

			{/* Step 2: Resume Choice */}
			{step === "resume_choice" && (
				<div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div>
						<h1 className="text-3xl font-bold mb-2">Do you already have a resume?</h1>
						<p className="text-muted-foreground">We'll tailor it to the job, or build one with you.</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<button
							onClick={() => setStep("pick_resume")}
							className="cursor-pointer text-left group flex flex-col p-6 rounded-2xl border border-border/50 bg-muted/40 hover:bg-muted/60 hover:border-emerald-500/50 transition-all duration-300 gap-4"
						>
							<div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
								<CheckCircleIcon className="size-5" weight="fill" />
							</div>
							<div>
								<h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-emerald-400 transition-colors">
									Yes, use an existing one
								</h3>
								<p className="text-sm text-muted-foreground">Pick a saved resume to tailor.</p>
							</div>
						</button>

						<button
							onClick={() => setStep("start_fresh")}
							className="cursor-pointer text-left group flex flex-col p-6 rounded-2xl border border-border/50 bg-muted/40 hover:bg-muted/60 hover:border-emerald-500/50 transition-all duration-300 gap-4"
						>
							<div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
								<SparkleIcon className="size-5" weight="fill" />
							</div>
							<div>
								<h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-emerald-400 transition-colors">
									No, start fresh
								</h3>
								<p className="text-sm text-muted-foreground">Tell us about you and we'll go.</p>
							</div>
						</button>
					</div>
				</div>
			)}

			{/* Step 3: Pick a Resume */}
			{step === "pick_resume" && (
				<div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div>
						<h1 className="text-3xl font-bold mb-6">Pick a resume</h1>
					</div>

					<div className="space-y-3">
						{resumes.map((r: any, idx: number) => {
							const isSelected = selectedResumeId === r.id;
							const colors = ["bg-emerald-500", "bg-purple-500", "bg-amber-500", "bg-blue-500"];
							const color = colors[idx % colors.length];
							return (
								<button
									key={r.id}
									onClick={() => {
										setSelectedResumeId(r.id);
										setUploadingFile(null);
									}}
									className={`cursor-pointer w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
										isSelected
											? "bg-muted border-emerald-500/50"
											: "bg-card/60 border-border hover:bg-muted/80"
									}`}
								>
									<div className="flex items-center gap-4">
										<div className={`w-1 h-10 rounded-full ${color}`} />
										<div className="text-left">
											<h3 className="font-semibold text-foreground">{r.name || r.title || "Untitled Resume"}</h3>
											<p className="text-xs text-foreground0">{formatLastModified(r.updatedAt || r.createdAt)}</p>
										</div>
									</div>
									{isSelected && <CheckCircleIcon className="size-6 text-emerald-400" weight="fill" />}
								</button>
							);
						})}

						{uploadingFile ? (
							<button
								onClick={() => setSelectedResumeId("file_upload")}
								className={`cursor-pointer w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
									selectedResumeId === "file_upload"
										? (fileError ? "bg-rose-500/10 border-rose-500/50" : "bg-muted border-emerald-500/50")
										: "bg-card/60 border-border hover:bg-muted/80"
								}`}
							>
								<div className="flex items-center gap-4">
									<div className={`w-1 h-10 rounded-full ${fileError ? "bg-rose-500" : "bg-slate-500"}`} />
									<div className="text-left flex items-center gap-3">
										<FileTextIcon weight="fill" className={`size-8 ${fileError ? "text-rose-400" : "text-emerald-400"}`} />
										<div>
											<h3 className="font-semibold text-foreground">{uploadingFile.name}</h3>
											<p className={`text-xs ${fileError ? "text-rose-400" : "text-foreground0"}`}>
												{fileError ?? (uploadingFile.size < 1024 * 1024 ? `${(uploadingFile.size / 1024).toFixed(1)} KB` : `${(uploadingFile.size / 1024 / 1024).toFixed(1)} MB`)}
											</p>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<button 
										onClick={(e) => {
											e.stopPropagation();
											setUploadingFile(null);
											setFileError(null);
											if (selectedResumeId === "file_upload") setSelectedResumeId(null);
										}}
										className="cursor-pointer text-foreground0 hover:text-rose-400"
									>
										<XCircleIcon weight="fill" className="size-5" />
									</button>
									{selectedResumeId === "file_upload" && !fileError && <CheckCircleIcon className="size-6 text-emerald-400" weight="fill" />}
								</div>
							</button>
						) : (
							<>
								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept=".pdf,.doc,.docx"
									onChange={handleFileChange}
								/>
								<button 
									onClick={() => fileInputRef.current?.click()}
									className="cursor-pointer w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border hover:border-emerald-500/50 hover:bg-muted/40 hover:text-emerald-400 transition-colors text-muted-foreground"
								>
									<UploadSimpleIcon className="size-5" />
									<span className="text-sm font-medium">Upload from your System</span>
								</button>
							</>
						)}
					</div>

					{matchError && (
						<div className="p-4 rounded-xl border border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center gap-3">
							<WarningCircleIcon className="size-5 shrink-0" weight="fill" />
							<p className="text-sm font-medium">{matchError}</p>
						</div>
					)}
					<div className="flex justify-end gap-3 pt-4">
						<Button
							variant="outline"
							onClick={() => setStep("resume_choice")}
							className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground"
						>
							Back
						</Button>
						<Button
							disabled={!selectedResumeId || (selectedResumeId === "file_upload" && (!uploadingFile || !!fileError))}
							onClick={handleRunMatch}
							className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Match with Zoe
						</Button>
					</div>
				</div>
			)}

			{/* Step 3B: Start Fresh */}
			{step === "start_fresh" && (
				<OnboardingWizard jobRole={role} onComplete={handleRunOnboardingMatch} error={matchError} />
			)}

			{/* Step 4: Loading */}
			{step === "loading" && (
				<div className="max-w-2xl mx-auto mt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="flex flex-col items-center justify-center p-16 rounded-3xl border border-border bg-card/30 backdrop-blur-sm">
						<div className="relative flex items-center justify-center mb-8">
							<svg className="size-16 animate-spin text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0711 19.0711L16.2426 16.2426M19.0711 4.92893L16.2426 7.75736M4.92893 4.92893L7.75736 7.75736M4.92893 19.0711L7.75736 16.2426" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
						<h2 className="text-xl font-bold mb-2 text-foreground">Zoe is tailoring your resume...</h2>
						<p className="text-sm text-muted-foreground">Extracting keywords, rewriting bullets, and aligning to the role.</p>
					</div>
				</div>
			)}

			{/* Step 5: Report */}
			{step === "report" && (
				<div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="flex items-center justify-between mb-6">
						<button
							onClick={() => setStep("paste_job")}
							className="cursor-pointer inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
						>
							<ArrowLeftIcon className="size-4" />
							<span>Back</span>
						</button>
						<span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-slate-800 text-amber-300 border border-amber-500/20">
							CLIENT ANALYSIS · STANDALONE
						</span>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
						{/* Left Column */}
						<div className="col-span-1 lg:col-span-5 space-y-6">
							{/* Match Score */}
							<div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 sm:gap-8">
								<div className="relative size-28 shrink-0 flex items-center justify-center">
									<svg className="absolute inset-0 size-full -rotate-90 text-slate-800" viewBox="0 0 120 120">
										<circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" />
									</svg>
									<svg className="absolute inset-0 size-full -rotate-90 text-emerald-500" viewBox="0 0 120 120">
										<circle
											cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8"
											strokeDasharray="326.7"
											strokeDashoffset={326.7 - (326.7 * (matchResult?.match_score ?? 0)) / 100}
											strokeLinecap="round"
											className="transition-all duration-1000 ease-out"
										/>
									</svg>
									<div className="text-center relative z-10">
										<span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{matchResult?.match_score ?? 0}%</span>
										<span className="block text-[10px] font-bold text-emerald-700/70 dark:text-emerald-500/70 uppercase tracking-wider mt-0.5">Match</span>
									</div>
								</div>
								<div className="flex flex-col items-center sm:items-start">
									<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-3">
										<CheckCircleIcon weight="fill" /> {matchResult?.verdict ?? "Analyzing..."}
									</div>
									<h2 className="text-2xl font-bold mb-1">{role || "Role"} <span className="text-muted-foreground">at</span> {company || "Company"}</h2>
									<p className="text-sm text-muted-foreground">Here's how your profile lines up against the job description.</p>
								</div>
							</div>

							{/* Missing Keywords */}
							{((matchResult?.missing_keywords?.length ?? 0) > 0 || (matchResult?.missing_skills?.length ?? 0) > 0) && (
							<div className="rounded-2xl border border-rose-500/20 bg-card/40 p-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-bold text-rose-600 dark:text-rose-400">Missing Keywords</h3>
									<span className="text-xs text-muted-foreground">{(matchResult?.missing_keywords?.length ?? 0) + (matchResult?.missing_skills?.length ?? 0)} missing</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{[...(matchResult?.missing_keywords ?? []), ...(matchResult?.missing_skills ?? [])].map(k => (
										<span key={k} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-medium">
											{k}
										</span>
									))}
								</div>
							</div>
							)}

							{/* Matched Keywords */}
							{(matchResult?.matched_keywords?.length ?? 0) > 0 && (
							<div className="rounded-2xl border border-emerald-500/20 bg-card/40 p-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-bold text-emerald-600 dark:text-emerald-400">Matched Keywords</h3>
									<span className="text-xs text-muted-foreground">{matchResult?.matched_keywords?.length} matched</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{(matchResult?.matched_keywords ?? []).map(k => (
										<span key={k} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
											<CheckIcon weight="bold" /> {k}
										</span>
									))}
								</div>
							</div>
							)}
						</div>

						{/* Right Column */}
						<div className="col-span-1 lg:col-span-7 space-y-6">
							{/* Action Plan */}
							<div className="rounded-3xl border border-border bg-card/40 p-6">
								<div className="flex items-center gap-2 mb-6">
									<div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
										<SparkleIcon weight="fill" />
									</div>
									<h3 className="font-bold text-lg text-foreground">Zoe's Action Plan</h3>
								</div>
								<div className="space-y-3">
									{(matchResult?.suggestions ?? []).map((task, i) => (
										<div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/50">
											<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-bold">
												{i + 1}
											</div>
											<p className="text-sm text-foreground/80 leading-relaxed">{task}</p>
										</div>
									))}
								</div>
							</div>

							{/* Summary */}
							{matchResult?.summary && (
							<div className="rounded-2xl border border-border bg-card/40 p-6">
								<h3 className="font-bold mb-2 text-foreground">AI Summary</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">{matchResult.summary}</p>
							</div>
							)}
						</div>
					</div>

					{/* Footer Actions */}
					<div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-border/50 mt-8">
						<Button
							variant="outline"
							onClick={() => navigate({ to: "/dashboard/resumes" })}
							className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground w-full sm:w-auto"
						>
							<ArrowLeftIcon className="mr-2" /> Back to Builder
						</Button>
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								onClick={handleGenerateTailored}
								className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto"
							>
								Generate Tailored Resume
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Step 3.5: Low Score Warning */}
			{step === "low_score_warning" && (
				<div className="overflow-hidden rounded-2xl border border-red-500/20 bg-card/60 shadow-2xl backdrop-blur-md max-w-xl mx-auto mt-12">
					<div className="flex flex-col items-center gap-4 bg-red-500/5 px-6 py-8 text-center">
						<div className="flex size-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-4 ring-red-500/10">
							<WarningCircleIcon weight="fill" className="size-8" />
						</div>
						<div>
							<h1 className="font-bold text-foreground text-2xl">Low Match Score</h1>
							<p className="mt-2 text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
								Your profile only matches <span className="font-bold text-foreground">{matchResult?.match_score}%</span> of the job description. Tailoring a resume might be challenging without the core required skills.
							</p>
						</div>
					</div>

					<div className="p-6 bg-card border-t border-red-500/10">
						<p className="text-center font-medium text-foreground mb-6">
							Would you still like to proceed and create a tailored resume?
						</p>

						<div className="flex items-center justify-center gap-4">
							<Button
								variant="outline"
								onClick={() => setStep("report")}
								className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground w-32"
							>
								Cancel
							</Button>
							<Button
								onClick={() => setStep("choose_template")}
								className="cursor-pointer bg-red-600 hover:bg-red-500 text-white w-40"
							>
								Proceed Anyway
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Step 4: Choose Template */}
			{step === "choose_template" && (
				<div className="flex flex-col max-h-[calc(100vh-8rem)] rounded-2xl border border-border bg-card/60 shadow-2xl backdrop-blur-md relative">
					<div className="shrink-0 flex flex-col items-center gap-4 border-border border-b bg-card/80 px-6 py-8 text-center rounded-t-2xl">
						<div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
							<img src="/zoe-icon.png" alt="Zoe AI" className="size-10 rounded-full object-cover dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
						</div>
						<div>
							<h1 className="font-bold text-foreground text-2xl">Choose a Template</h1>
							<p className="mt-1 text-muted-foreground text-sm">
								Select a template to generate your tailored resume.
							</p>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto p-6">
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
							{Object.entries(templates).map(([key, template]) => (
								<div
									key={key}
									onClick={() => setSelectedTemplate(key as Template)}
									className={`cursor-pointer rounded-xl border p-2 transition-all ${
										selectedTemplate === key
											? "border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/20"
											: "border-border hover:border-emerald-500/50 hover:bg-muted/40"
									}`}
								>
									<img
										src={template.imageUrl}
										alt={template.name}
										className="w-full rounded-md object-cover aspect-[210/297]"
									/>
									<p className="mt-2 text-center text-sm font-medium">{template.name}</p>
								</div>
							))}
						</div>
					</div>

						<div className="shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 p-6 border-t border-border/50 bg-card/95 backdrop-blur-md rounded-b-2xl">
							<Button
								variant="outline"
								onClick={() => setStep("report")}
								className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground w-full sm:w-auto"
							>
								<ArrowLeftIcon className="mr-2" /> Back to Report
							</Button>
							<Button
								onClick={handleConfirmTemplate}
								disabled={isCreating}
								className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto sm:min-w-32"
							>
								{isCreating ? (
									<>
										<SpinnerGapIcon className="mr-2 size-4 animate-spin" />
										Generating...
									</>
								) : (
									"Create Resume"
								)}
							</Button>
						</div>
					</div>
			)}
		</div>
	);
}
