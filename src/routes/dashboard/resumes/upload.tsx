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

// ---------------------------------------------------------------------------
// Route Definition
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/dashboard/resumes/upload")({
	component: UploadRouteComponent,
});

// ---------------------------------------------------------------------------
// Types & Mock Data
// ---------------------------------------------------------------------------

type UploadState = "idle" | "uploading" | "parsed" | "creating";

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
				const next = prev + Math.floor(Math.random() * 15) + 5;
				if (next >= 100) {
					clearInterval(interval);
					return 100;
				}
				if (next < 35) setProgressText("Extracting raw text from document...");
				else if (next < 60) setProgressText("Analyzing career history and education details...");
				else if (next < 85) setProgressText("Identifying skills and contact details...");
				else setProgressText("Structuring JSON schema mapping...");

				return next;
			});
		}, 350);

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
			setFullResumeData(parsedRaw);

			// Map to ParsedResumeData for preview UI
			const resumeData = parsedRaw.data || {};
			const mappedData: ParsedResumeData = {
				fullName: resumeData.basics?.name || "Parsed User",
				professionalTitle: resumeData.basics?.headline || "",
				email: resumeData.basics?.email || "",
				phone: resumeData.basics?.phone || "",
				location: resumeData.basics?.location || "",
				summary: resumeData.summary?.content || "",
				experience: (resumeData.sections?.experience?.items || []).map((item: any) => ({
					company: item.company || "",
					role: item.position || "",
					duration: item.period || "",
					description: item.description || "",
				})),
				education: (resumeData.sections?.education?.items || []).map((item: any) => ({
					institution: item.institution || "",
					degree: `${item.degree || ""} ${item.area || ""}`.trim(),
					year: item.period || "",
				})),
				skills: (resumeData.sections?.skills?.items || []).flatMap((item: any) => item.keywords || [item.name]).filter(Boolean),
			};

			setParsedData(mappedData);
			setUploadState("parsed");
		} catch (e: any) {
			setUploadError(e.message || "Something went wrong while parsing your resume. Please try again.");
			setUploadState("idle");
		}
	};

	const handleConfirm = async () => {
		if (!parsedData) return;
		setUploadState("creating");
		const toastId = toast.loading("Creating your resume in builder...");

		try {
			const resumeName = parsedData.fullName || "My Parsed Resume";
			const uniqueSlug = `${slugify(resumeName)}-${Date.now().toString(36)}`;
			const resume = await api.createResume({
				name: resumeName,
				slug: uniqueSlug,
				tags: ["AI Uploaded"],
				data: fullResumeData?.data ? { ...defaultResumeData, ...fullResumeData.data, metadata: defaultResumeData.metadata, picture: defaultResumeData.picture } : undefined,
				withSampleData: false,
			});

			await queryClient.invalidateQueries({ queryKey: ["resumes"] });

			toast.success("Resume created! Redirecting to editor...", { id: toastId });
			navigate({ to: "/builder/$resumeId", params: { resumeId: resume.id } });
		} catch {
			toast.error("Failed to create resume. Please try again.", { id: toastId });
			setUploadState("parsed");
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
						<div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
							<img src="/zoe-icon.png" alt="Zoe AI" className="size-9 rounded-full object-cover dark:invert dark:hue-rotate-180 dark:brightness-110" />
						</div>
						<div>
							<h1 className="font-bold text-foreground text-xl">Upload & Parse Resume</h1>
							<p className="mt-0.5 text-muted-foreground text-sm">
								Zoe reads your document and populates the editor with structured, optimized content.
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
										className={`flex cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed p-14 text-center transition-all duration-200 ${
											dragging
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
										className={`flex items-center gap-3 rounded-xl border p-4 ${
											fileError ? "border-red-500/30 bg-red-500/5" : "border-emerald-500/30 bg-emerald-500/5"
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
								<div className="flex justify-end gap-3 border-border border-t pt-5">
									<Link to="/dashboard/resumes">
										<Button
											variant="outline"
											className="cursor-pointer border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											Cancel
										</Button>
									</Link>
									<Button
										onClick={handleUpload}
										disabled={!file || !!fileError}
										className="cursor-pointer bg-emerald-600 font-medium text-white transition-colors hover:bg-emerald-500"
									>
										<CloudArrowUpIcon className="mr-1.5 size-4" />
										Upload & Parse with Zoe
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

						{/* ── STATE 3: Parsed Data Preview ── */}
						{uploadState === "parsed" && parsedData && (
							<div className="space-y-6">
								{/* Success Banner */}
								<div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
									<CheckCircleIcon weight="fill" className="size-6 shrink-0 text-emerald-400" />
									<div>
										<h3 className="font-bold text-emerald-300 text-sm">Resume successfully read by Zoe!</h3>
										<p className="mt-0.5 text-emerald-500/80 text-xs">
											Review the extracted information below before creating your resume in the editor.
										</p>
									</div>
								</div>

								{/* Extracted Data Grid */}
								<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
									{/* Left Column */}
									<div className="space-y-5">
										{/* Contact Details */}
										<SectionCard icon={<UserIcon className="size-4" />} title="Contact Details">
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<p className="mb-1 font-semibold text-[10px] text-muted-foreground uppercase">Full Name</p>
													<p className="font-medium text-foreground">{parsedData.fullName}</p>
												</div>
												<div>
													<p className="mb-1 font-semibold text-[10px] text-muted-foreground uppercase">Title</p>
													<p className="font-medium text-foreground">{parsedData.professionalTitle}</p>
												</div>
												<div>
													<p className="mb-1 font-semibold text-[10px] text-muted-foreground uppercase">Email</p>
													<p className="truncate font-medium text-foreground">{parsedData.email}</p>
												</div>
												<div>
													<p className="mb-1 font-semibold text-[10px] text-muted-foreground uppercase">Phone</p>
													<p className="font-medium text-foreground">{parsedData.phone}</p>
												</div>
											</div>
										</SectionCard>

										{/* Profile Summary */}
										<SectionCard icon={<FileTextIcon className="size-4" />} title="Profile Summary">
											<p className="text-muted-foreground text-sm italic leading-relaxed">"{parsedData.summary}"</p>
										</SectionCard>

										{/* Skills */}
										<SectionCard
											icon={<WrenchIcon className="size-4" />}
											title={`Skills Detected (${parsedData.skills.length})`}
										>
											<div className="flex flex-wrap gap-1.5">
												{parsedData.skills.map((skill) => (
													<span
														key={skill}
														className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-400 text-xs"
													>
														{skill}
													</span>
												))}
											</div>
										</SectionCard>
									</div>

									{/* Right Column */}
									<div className="space-y-5">
										{/* Work Experience */}
										<SectionCard icon={<SuitcaseIcon className="size-4" />} title="Work Experience">
											<div className="space-y-4">
												{parsedData.experience.map((exp, idx) => (
													<div
														key={`${exp.company}-${idx}`}
														className="space-y-1 border-emerald-500/40 border-l-2 py-0.5 pl-3"
													>
														<div className="flex items-baseline justify-between gap-2">
															<p className="font-bold text-foreground text-sm">{exp.role}</p>
															<span className="shrink-0 font-semibold text-[10px] text-muted-foreground uppercase">
																{exp.duration}
															</span>
														</div>
														<p className="font-medium text-emerald-500 text-xs">{exp.company}</p>
														<p className="text-muted-foreground text-xs leading-snug">{exp.description}</p>
													</div>
												))}
											</div>
										</SectionCard>

										{/* Education */}
										<SectionCard icon={<BookOpenIcon className="size-4" />} title="Education">
											<div className="space-y-3">
												{parsedData.education.map((edu, idx) => (
													<div key={`${edu.institution}-${idx}`} className="space-y-0.5">
														<div className="flex items-baseline justify-between gap-2">
															<p className="font-bold text-foreground text-sm">{edu.degree}</p>
															<span className="shrink-0 font-semibold text-[10px] text-muted-foreground">{edu.year}</span>
														</div>
														<p className="text-muted-foreground text-xs">{edu.institution}</p>
													</div>
												))}
											</div>
										</SectionCard>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center justify-between border-border border-t pt-5">
									<Button
										variant="outline"
										onClick={() => {
											setParsedData(null);
											setFile(null);
											setUploadState("idle");
										}}
										className="cursor-pointer border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									>
										Try another file
									</Button>

									<Button
										onClick={handleConfirm}
										disabled={isCreating}
										className="cursor-pointer bg-emerald-600 font-medium text-white transition-colors hover:bg-emerald-500"
									>
										{isCreating ? (
											<>
												<SpinnerGapIcon className="mr-1.5 size-4 animate-spin" />
												Creating resume...
											</>
										) : (
											<>
												<CheckCircleIcon className="mr-1.5 size-4" />
												Confirm & Import to Builder
											</>
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
