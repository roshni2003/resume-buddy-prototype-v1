import {
	ArrowLeftIcon,
	BookOpenIcon,
	CheckCircleIcon,
	CloudArrowUpIcon,
	FileTextIcon,
	SpinnerGapIcon,
	SuitcaseIcon,
	UserIcon,
	WarningCircleIcon,
	WrenchIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { slugify } from "@/utils/string";
import { defaultResumeData } from "@/schema/resume/data";
import { templates } from "@/dialogs/resume/template/data";
import type { Template } from "@/schema/templates";

// ---------------------------------------------------------------------------
// Route Definition
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/dashboard/resumes/upload")({
	component: UploadRouteComponent,
});

// ---------------------------------------------------------------------------
// Types & Mock Data
// ---------------------------------------------------------------------------

type UploadState = "idle" | "uploading" | "parsed" | "choose_template" | "creating";

interface ParsedResumeData {
	fullName: string;
	professionalTitle: string;
	email: string;
	phone: string;
	location: string;
	summary: string;
	experience: { company: string; role: string; duration: string; description: string }[];
	education: { institution: string; degree: string; year: string }[];
	skills: string[];
}

const MOCK_PARSED_DATA: ParsedResumeData = {
	fullName: "Priya Sharma",
	professionalTitle: "Senior Software Engineer",
	email: "priya.sharma@example.com",
	phone: "9876543210",
	location: "Bangalore, India",
	summary:
		"Results-driven engineer with 5+ years of experience building scalable web applications. Passionate about clean code and developer experience.",
	experience: [
		{
			company: "Zoe Technologies",
			role: "Senior React Developer",
			duration: "2022 – Present",
			description: "Architected modern frontend systems using React and TypeScript, boosting page speed by 40%.",
		},
		{
			company: "Global Solutions",
			role: "Software Engineer",
			duration: "2020 – 2022",
			description: "Developed robust microservices and handled database queries optimization.",
		},
	],
	education: [
		{ institution: "Indian Institute of Technology, Bombay", degree: "B.Tech in Computer Science", year: "2020" },
	],
	skills: ["React", "TypeScript", "Node.js", "GraphQL", "TailwindCSS", "PostgreSQL", "Docker", "AWS"],
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ACCEPTED_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXTENSIONS = ".pdf, .doc, .docx";
const MAX_SIZE_MB = 5;

function validateFile(file: File): string | null {
	if (
		!ACCEPTED_TYPES.includes(file.type) &&
		!file.name.endsWith(".pdf") &&
		!file.name.endsWith(".doc") &&
		!file.name.endsWith(".docx")
	) {
		return "Only PDF, DOC, or DOCX files are accepted.";
	}
	if (file.size > MAX_SIZE_MB * 1024 * 1024) {
		return `File must be under ${MAX_SIZE_MB} MB.`;
	}
	return null;
}

function formatBytes(bytes: number) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function stripHtml(html: string) {
	if (!html) return "";
	return html.replace(/<[^>]*>?/gm, '');
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
	return (
		<div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
			<div className="flex items-center gap-2 border-border border-b pb-3">
				<span className="text-emerald-400">{icon}</span>
				<span className="font-bold text-foreground text-xs uppercase tracking-wider">{title}</span>
			</div>
			{children}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

function UploadRouteComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [uploadState, setUploadState] = useState<UploadState>("idle");
	const [file, setFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState<string | null>(null);
	const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [fullResumeData, setFullResumeData] = useState<any>(null);
	const [progressText, setProgressText] = useState("Initializing Zoe AI reader...");
	const [progressPercent, setProgressPercent] = useState(10);
	const [selectedTemplate, setSelectedTemplate] = useState<Template>("ditto");
	const isCreating = uploadState === "creating";

	const handleFile = (f: File) => {
		const err = validateFile(f);
		setFile(f);
		setFileError(err);
		setUploadError(null);
	};

	const handleRemoveFile = () => {
		setFile(null);
		setFileError(null);
		setUploadError(null);
		setUploadState("idle");
	};

	const [dragging, setDragging] = useState(false);
	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setDragging(false);
		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile) handleFile(droppedFile);
	}, []);

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (uploadState !== "uploading") return;

		const interval = setInterval(() => {
			setProgressPercent((prev) => {
				let next = prev;

				// Stop the automated increment if we've hit 95% or manually set to 100%
				if (prev >= 95) return prev;

				// Asymptotic progression to better reflect parsing time
				if (prev < 30) next = prev + Math.floor(Math.random() * 5) + 3;
				else if (prev < 60) next = prev + Math.floor(Math.random() * 3) + 2;
				else if (prev < 85) next = prev + Math.floor(Math.random() * 2) + 1;
				else next = prev + 1;

				if (next < 35) setProgressText("Extracting raw text from document...");
				else if (next < 60) setProgressText("Analyzing career history and education details...");
				else if (next < 85) setProgressText("Identifying skills and contact details...");
				else setProgressText("Finalizing resume content...");

				return next;
			});
		}, 800);

		return () => clearInterval(interval);
	}, [uploadState]);

	const handleUpload = async () => {
		if (!file || fileError) return;
		setUploadState("uploading");
		setProgressPercent(10);
		setProgressText("Initializing Zoe AI reader...");
		setUploadError(null);

		try {
			const parsedRaw = await api.resumeUpload({ resume_upload: file });

			// Robustly parse and cap skills to prevent AI exaggeration and handle different formats
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

				// Deduplicate and cap
				allSkills = Array.from(new Set(allSkills)).filter(Boolean).slice(0, 20);

				// Overwrite the payload so the builder also gets the capped/cleaned skills
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

			setFullResumeData(parsedRaw);

			// Map to ParsedResumeData for preview UI
			const resumeData = parsedRaw.data || {};
			const mappedData: ParsedResumeData = {
				fullName: resumeData.basics?.name || "Parsed User",
				professionalTitle: resumeData.basics?.headline || "",
				email: resumeData.basics?.email || "",
				phone: resumeData.basics?.phone || "",
				location: resumeData.basics?.location || "",
				summary: stripHtml(resumeData.summary?.content || ""),
				experience: (resumeData.sections?.experience?.items || []).map((item: any) => ({
					company: item.company || "",
					role: item.position || "",
					duration: item.period || "",
					description: stripHtml(item.description || ""),
				})),
				education: (resumeData.sections?.education?.items || []).map((item: any) => ({
					institution: item.institution || "",
					degree: `${item.degree || ""} ${item.area || ""}`.trim(),
					year: item.period || "",
				})),
				skills: (resumeData.sections?.skills?.items || [])
					.flatMap((item: any) => (Array.isArray(item.keywords) && item.keywords.length > 0) ? item.keywords : [item.name])
					.filter(Boolean),
			};

			setParsedData(mappedData);

			// Show 100% completion before transitioning
			setProgressPercent(100);
			setProgressText("Resume parsing complete!");

			setTimeout(() => {
				setUploadState("choose_template");
			}, 800);
		} catch (e: any) {
			setUploadError(e.message || "Something went wrong while parsing your resume. Please try again.");
			setUploadState("idle");
		}
	};

	const isCreatingRef = useRef(false);

	const handleConfirm = async () => {
		if (!parsedData || isCreatingRef.current) return;
		isCreatingRef.current = true;
		setUploadState("creating");
		const toastId = toast.loading("Creating your resume in builder...");

		try {
			const resumeName = parsedData.fullName || "My Parsed Resume";
			const uniqueSlug = `${slugify(resumeName)}-${Date.now().toString(36)}`;
			const resume = await api.createResume({
				name: resumeName,
				slug: uniqueSlug,
				tags: ["AI Uploaded"],
				data: fullResumeData?.data ? { 
					...defaultResumeData, 
					...fullResumeData.data, 
					sections: {
						...defaultResumeData.sections,
						...(fullResumeData.data.sections || {})
					},
					metadata: { ...defaultResumeData.metadata, template: selectedTemplate }, 
					picture: defaultResumeData.picture 
				} : undefined,
				withSampleData: false,
			});

			await queryClient.invalidateQueries({ queryKey: ["resumes"] });

			toast.success("Resume created! Redirecting to editor...", { id: toastId });
			navigate({ to: "/builder/$resumeId", params: { resumeId: resume.id } });
		} catch {
			isCreatingRef.current = false;
			toast.error("Failed to create resume. Please try again.");
			setUploadState("choose_template");
		}
	};

	return (
		<div className="min-h-screen bg-background px-4 py-8">
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Top Bar */}
				<div className="flex items-center justify-between">
					<Link
						to="/dashboard/resumes"
						className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
					>
						<ArrowLeftIcon className="size-4" />
						<span>Back to Resumes</span>
					</Link>
				</div>

				{/* Main Card */}
				<div className="overflow-hidden rounded-2xl border border-border bg-card/60 shadow-2xl backdrop-blur-md">
					{/* Card Header */}
					<div className="flex items-center gap-4 border-border border-b bg-card/80 px-6 py-5">
						<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
							<img src="/zoe-icon.png" alt="Zoe AI" className="size-9 rounded-full object-cover dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
						</div>
						<div>
							<h1 className="font-bold text-foreground text-xl">Upload & Parse Resume</h1>
							<p className="mt-0.5 text-muted-foreground text-sm">
								Zoe reads your document and seamlessly organizes your information, ready for you to review and enhance.
							</p>
						</div>
					</div>

					<div className="p-6">
						{/* ── STATE 1: Idle / Drop Zone ── */}
						{uploadState === "idle" && (
							<div className="space-y-5">
								{!file ? (
									<div
										role="button"
										tabIndex={0}
										aria-label="Upload resume file drop zone"
										onDragOver={(e) => {
											e.preventDefault();
											setDragging(true);
										}}
										onDragLeave={() => setDragging(false)}
										onDrop={handleDrop}
										onClick={() => fileInputRef.current?.click()}
										onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
										className={`flex cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed p-14 text-center transition-all duration-200 ${dragging
												? "border-emerald-500 bg-emerald-500/5"
												: "border-border hover:border-emerald-500/50 hover:bg-muted/40"
											}`}
									>
										<div
											className={`rounded-full p-4 transition-all ${dragging ? "bg-emerald-500/15 text-emerald-400" : "bg-muted text-muted-foreground"}`}
										>
											<CloudArrowUpIcon className="size-10 animate-bounce" weight="regular" />
										</div>
										<div>
											<p className="font-semibold text-foreground text-sm">
												Drag & drop your resume here, or{" "}
												<span className="text-emerald-500 underline underline-offset-2">browse</span>
											</p>
											<p className="mt-1 text-muted-foreground text-xs">Supports PDF, DOC, DOCX up to {MAX_SIZE_MB}MB</p>
										</div>
										<input
											ref={fileInputRef}
											type="file"
											accept={ACCEPTED_EXTENSIONS}
											className="hidden"
											onChange={(e) => {
												const f = e.target.files?.[0];
												if (f) handleFile(f);
												e.target.value = "";
											}}
										/>
									</div>
								) : (
									<div
										className={`flex items-center gap-3 rounded-xl border p-4 ${fileError ? "border-red-500/30 bg-red-500/5" : "border-emerald-500/30 bg-emerald-500/5"
											}`}
									>
										<FileTextIcon
											weight="fill"
											className={`size-10 shrink-0 ${fileError ? "text-red-400" : "text-emerald-400"}`}
										/>
										<div className="min-w-0 flex-1">
											<p className="truncate font-semibold text-foreground text-sm">{file.name}</p>
											<p className={`text-xs ${fileError ? "text-red-400" : "text-muted-foreground"}`}>
												{fileError ?? formatBytes(file.size)}
											</p>
										</div>
										<button
											type="button"
											onClick={handleRemoveFile}
											className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
											aria-label="Remove file"
										>
											<XCircleIcon weight="fill" className="size-6" />
										</button>
									</div>
								)}

								{uploadError && (
									<div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400 text-sm">
										<WarningCircleIcon weight="fill" className="size-5 shrink-0" />
										{uploadError}
									</div>
								)}

								{/* Footer Actions */}
								<div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-border border-t pt-5">
									<Link to="/dashboard/resumes" className="w-full sm:w-auto">
										<Button
											variant="outline"
											className="w-full sm:w-auto cursor-pointer border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											Cancel
										</Button>
									</Link>
									<Button
										onClick={handleUpload}
										disabled={!file || !!fileError}
										className="w-full sm:w-auto cursor-pointer bg-emerald-600 font-medium text-white transition-colors hover:bg-emerald-500"
									>
										<CloudArrowUpIcon className="mr-1.5 size-4" />
										Upload & Continue
									</Button>
								</div>
							</div>
						)}

						{/* ── STATE 2: AI Reading / Uploading ── */}
						{uploadState === "uploading" && (
							<div className="flex flex-col items-center justify-center space-y-8 py-16">
								{/* Animated rings */}
								<div className="relative flex items-center justify-center">
									<div className="absolute size-28 animate-ping rounded-full bg-emerald-500/10" />
									<div className="absolute size-20 animate-pulse rounded-full bg-emerald-500/10" />
									<div className="relative flex size-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
										<SpinnerGapIcon className="size-8 animate-spin text-emerald-400" weight="bold" />
									</div>
								</div>

								{/* Status text */}
								<div className="max-w-sm space-y-2 text-center">
									<p className="font-bold text-lg text-foreground">Zoe AI is reading your resume...</p>
									<p className="flex h-5 items-center justify-center text-muted-foreground text-sm">{progressText}</p>
								</div>

								{/* Progress bar */}
								<div className="w-full max-w-xs space-y-2">
									<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
											style={{ width: `${progressPercent}%` }}
										/>
									</div>
									<div className="flex justify-between font-medium text-[11px] text-muted-foreground">
										<span>Analyzing document...</span>
										<span>{progressPercent}%</span>
									</div>
								</div>

								{/* Stage indicators */}
								<div className="flex gap-6 text-muted-foreground text-xs">
									{["Extracting", "Analyzing", "Structuring"].map((stage, i) => {
										const thresholds = [0, 35, 60];
										const active = progressPercent >= thresholds[i];
										return (
											<div
												key={stage}
												className={`flex items-center gap-1.5 transition-all ${active ? "text-emerald-500" : "text-muted-foreground"}`}
											>
												<div
													className={`size-1.5 rounded-full transition-all ${active ? "bg-emerald-500" : "bg-muted-foreground"}`}
												/>
												{stage}
											</div>
										);
									})}
								</div>
							</div>
						)}



						{/* ── STATE 4: Choose Template & Creating ── */}
						{(uploadState === "choose_template" || uploadState === "creating") && (
							<div className="flex flex-col max-h-[calc(100vh-8rem)] rounded-2xl border border-border bg-card/60 shadow-2xl backdrop-blur-md relative">
								<div className="shrink-0 flex flex-col items-center gap-4 border-border border-b bg-card/80 px-6 py-8 text-center rounded-t-2xl">
									<div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
										<img src="/zoe-icon.png" alt="Zoe AI" className="size-10 rounded-full object-cover dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
									</div>
									<div>
										<h1 className="font-bold text-foreground text-2xl">Choose a Template</h1>
										<p className="mt-1 text-muted-foreground text-sm">
											Select a template to generate your new resume.
										</p>
									</div>
								</div>

								<div className="flex-1 overflow-y-auto p-6">
									<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
									{Object.entries(templates).map(([key, template]) => (
										<div
											key={key}
											onClick={() => setSelectedTemplate(key as Template)}
											className={`cursor-pointer rounded-xl border p-2 transition-all ${selectedTemplate === key
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
										onClick={() => {
											setParsedData(null);
											setFile(null);
											setUploadState("idle");
										}}
										className="cursor-pointer border-border bg-card/60 text-foreground/80 hover:bg-muted hover:text-foreground w-full sm:w-auto"
									>
										<ArrowLeftIcon className="mr-2" /> Try another file
									</Button>
									<Button
										onClick={handleConfirm}
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
				</div>
			</div>
		</div>
	);
}
