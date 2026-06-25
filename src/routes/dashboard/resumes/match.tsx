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
import { Combobox } from "@/components/ui/combobox";
import { api } from "@/utils/api";
import { useDialogStore } from "@/dialogs/store";
import { templates } from "@/dialogs/resume/template/data";
import type { Template } from "@/schema/templates";
import { defaultResumeData } from "@/schema/resume/data";

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
	
	// Start Fresh state
	const [targetTitle, setTargetTitle] = useState("");
	const [experienceLevel, setExperienceLevel] = useState("1-3 years");
	const [recentCompany, setRecentCompany] = useState("");
	const [recentRole, setRecentRole] = useState("");
	const [recentBullets, setRecentBullets] = useState("");
	const [coreSkills, setCoreSkills] = useState("");
	const [keyProjects, setKeyProjects] = useState("");
	
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

	// Call real JD Match API when entering loading step
	const handleRunMatch = async () => {
		if (!selectedResumeId) return;
		if (selectedResumeId === "file_upload" && !uploadingFile) return;

		setMatchError(null);
		setStep("loading");
		try {
			let res;
			if (selectedResumeId === "file_upload") {
				res = await api.jdMatchUpload({ resume_upload: uploadingFile!, jd_text: jobDescription });
			} else {
				res = await api.jdMatch({ resume_id: selectedResumeId, jd_text: jobDescription });
			}

			if (res.success) {
				setMatchResult(res.jdMatch);
				setStep("report");
			} else {
				throw new Error("Match failed");
			}
		} catch (e: any) {
			setMatchError(e?.message ?? "Something went wrong. Please try again.");
			setStep("pick_resume");
		}
	};

	const isStep1Valid = role.trim() !== "" && company.trim() !== "" && jobDescription.trim() !== "";
	
	const isStartFreshValid = targetTitle.trim() !== "" && recentCompany.trim() !== "" && recentRole.trim() !== "" && recentBullets.trim() !== "" && coreSkills.trim() !== "" && keyProjects.trim() !== "";

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
		if (selectedResumeId && selectedResumeId !== "file_upload") {
			try {
				setIsCreating(true);
				const createdResume = await api.fetchResume(selectedResumeId);
				const updatedData = {
					...createdResume.data,
					metadata: {
						...createdResume.data.metadata,
						template: selectedTemplate,
					},
				};
				await api.updateResume(selectedResumeId, { data: updatedData });
				await queryClient.invalidateQueries({ queryKey: ["resumes"] });
				// Force the history stack to have Dashboard before Builder so back button works correctly
				window.history.replaceState(null, "", "/dashboard/resumes");
				navigate({ to: "/builder/$resumeId", params: { resumeId: selectedResumeId } });
			} catch(e) {
				console.error(e);
				setIsCreating(false);
			}
		} else {
			try {
				setIsCreating(true);
				let resumeDataPayload: any = undefined;
				
				if (uploadingFile) {
					const parsedRaw = await api.resumeUpload({ resume_upload: uploadingFile });
					resumeDataPayload = parsedRaw.data ? { 
						...defaultResumeData, 
						...parsedRaw.data, 
						metadata: defaultResumeData.metadata, 
						picture: defaultResumeData.picture 
					} : undefined;
				}

				const resume = await api.createResume({
					name: uploadingFile?.name ? `Tailored: ${uploadingFile.name}` : "Tailored Resume",
					slug: `tailored-${Date.now().toString(36)}`,
					data: resumeDataPayload,
					withSampleData: !uploadingFile,
				});
				
				const createdResume = await api.fetchResume(resume.id);
				const updatedData = {
					...createdResume.data,
					metadata: {
						...createdResume.data.metadata,
						template: selectedTemplate,
					},
				};
				await api.updateResume(resume.id, { data: updatedData });
				
				await queryClient.invalidateQueries({ queryKey: ["resumes"] });
				// Force the history stack to have Dashboard before Builder so back button works correctly
				window.history.replaceState(null, "", "/dashboard/resumes");
				navigate({ to: "/builder/$resumeId", params: { resumeId: resume.id } });
			} catch (e) {
				console.error("Failed to create resume", e);
				setIsCreating(false);
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
		<div className="space-y-6 max-w-4xl mx-auto py-4 font-sans text-foreground selection:bg-emerald-500/30" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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

					<div className="grid grid-cols-2 gap-4">
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

					<div className="grid grid-cols-2 gap-4">
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
												{fileError ?? `${(uploadingFile.size / 1024 / 1024).toFixed(1)} MB`}
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

					<div className="flex justify-end gap-3 pt-4">
						<Button
							variant="outline"
							onClick={() => setStep("resume_choice")}
							className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground"
						>
							Back
						</Button>
						{matchError && (
							<p className="text-sm text-rose-400 self-center">{matchError}</p>
						)}
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
				<div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
					<div>
						<h1 className="text-3xl font-bold mb-8">Tell us about you</h1>
					</div>

					<div className="space-y-6">
						<div className="space-y-1.5">
							<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">What is your target or current professional title?</label>
							<Input
								value={targetTitle}
								onChange={(e) => setTargetTitle(e.target.value)}
								className="bg-muted/40 border-border/50 text-foreground text-base h-11 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50"
								placeholder="e.g. &quot;Senior Frontend Engineer&quot;"
							/>
						</div>

						<div className="space-y-1.5">
							<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">How many years of experience?</label>
							<Combobox
								options={expOptions}
								value={experienceLevel}
								onValueChange={(val) => setExperienceLevel(val || "1-3 years")}
								hideSearch
								buttonProps={{
									className: "w-full bg-muted/40 border border-border/50 text-foreground text-base h-11 justify-between px-3 hover:bg-muted/60 font-normal"
								}}
							/>
						</div>

						<div className="space-y-3">
							<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Most recent work experience</label>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<label className="text-[10px] text-muted-foreground uppercase tracking-wider">Company Name</label>
									<Input
										value={recentCompany}
										onChange={(e) => setRecentCompany(e.target.value)}
										className="bg-muted/40 border-border/50 text-foreground text-base h-11 focus-visible:ring-emerald-500/50"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-[10px] text-muted-foreground uppercase tracking-wider">Role</label>
									<Input
										value={recentRole}
										onChange={(e) => setRecentRole(e.target.value)}
										className="bg-muted/40 border-border/50 text-foreground text-base h-11 focus-visible:ring-emerald-500/50"
									/>
								</div>
							</div>
							<textarea
								value={recentBullets}
								onChange={(e) => setRecentBullets(e.target.value)}
								className="w-full h-24 rounded-xl bg-muted/40 border border-border/50 p-3 text-foreground text-sm placeholder:text-foreground0 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none transition-all"
								placeholder="2-3 bullet points describing what you did..."
							/>
						</div>

						<div className="space-y-1.5">
							<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Your top 5-10 core skills (comma-separated)</label>
							<Input
								value={coreSkills}
								onChange={(e) => setCoreSkills(e.target.value)}
								className="bg-muted/40 border-border/50 text-foreground text-base h-11 focus-visible:ring-emerald-500/50"
								placeholder="React, TypeScript, Node.js, Git, UI Design"
							/>
						</div>

						<div className="space-y-1.5">
							<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">1 or 2 key projects or achievements</label>
							<textarea
								value={keyProjects}
								onChange={(e) => setKeyProjects(e.target.value)}
								className="w-full h-24 rounded-xl bg-muted/40 border border-border/50 p-3 text-foreground text-sm placeholder:text-foreground0 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none transition-all"
								placeholder="e.g. &quot;Built a task manager app using React that reduced load times by 20%&quot;"
							/>
						</div>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button
							variant="outline"
							onClick={() => setStep("resume_choice")}
							className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground rounded-full px-6"
						>
							Back
						</Button>
						<Button
							disabled={!isStartFreshValid}
							onClick={() => setStep("loading")}
							className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Tailor with Zoe
						</Button>
					</div>
				</div>
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
					<div className="flex items-center mb-6">
						<button
							onClick={() => setStep("paste_job")}
							className="cursor-pointer inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
						>
							<ArrowLeftIcon className="size-4" />
							<span>Back</span>
						</button>
					</div>

					<div className="grid grid-cols-12 gap-6">
						{/* Left Column */}
						<div className="col-span-5 space-y-6">
							{/* Match Score */}
							<div className="rounded-3xl border border-border bg-card/40 p-8 flex items-center gap-8">
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
								<div>
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
						<div className="col-span-7 space-y-6">
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
					<div className="flex items-center justify-between pt-6 border-t border-border/50">
						<Button
							variant="outline"
							onClick={() => navigate({ to: "/dashboard/resumes" })}
							className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground"
						>
							<ArrowLeftIcon className="mr-2" /> Back to Builder
						</Button>
						<div className="flex gap-3">
							<Button
								onClick={handleGenerateTailored}
								className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white"
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
				<div className="overflow-hidden rounded-2xl border border-border bg-card/60 shadow-2xl backdrop-blur-md">
					<div className="flex flex-col items-center gap-4 border-border border-b bg-card/80 px-6 py-8 text-center">
						<div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
							<img src="/zoe-icon.png" alt="Zoe AI" className="size-10 rounded-full object-cover dark:invert dark:hue-rotate-180 dark:brightness-110" />
						</div>
						<div>
							<h1 className="font-bold text-foreground text-2xl">Choose a Template</h1>
							<p className="mt-1 text-muted-foreground text-sm">
								Select a template to generate your tailored resume.
							</p>
						</div>
					</div>

					<div className="p-6">
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

						<div className="flex items-center justify-between pt-8 border-t border-border/50 mt-8">
							<Button
								variant="outline"
								onClick={() => setStep("report")}
								className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground"
							>
								<ArrowLeftIcon className="mr-2" /> Back to Report
							</Button>
							<Button
								onClick={handleConfirmTemplate}
								disabled={isCreating}
								className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white min-w-32"
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
				</div>
			)}
		</div>
	);
}
