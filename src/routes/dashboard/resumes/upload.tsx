import {
	ArrowLeftIcon,
	CheckCircleIcon,
	CloudArrowUpIcon,
	FileTextIcon,
	SpinnerGapIcon,
	WarningCircleIcon,
	XCircleIcon,
	BookOpenIcon,
	SuitcaseIcon,
	WrenchIcon,
	UserIcon,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { slugify } from "@/utils/string";

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

// Helper to validate files
function validateFile(file: File): string | null {
	if (!ACCEPTED_TYPES.includes(file.type) && !file.name.endsWith(".pdf") && !file.name.endsWith(".doc") && !file.name.endsWith(".docx")) {
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

	// Drag & drop handlers
	const [dragging, setDragging] = useState(false);
	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setDragging(false);
		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile) handleFile(droppedFile);
	}, []);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// Simulating beautiful AI reading/parsing stages
	useEffect(() => {
		if (uploadState !== "uploading") return;

		const interval = setInterval(() => {
			setProgressPercent((prev) => {
				const next = prev + Math.floor(Math.random() * 15) + 5;
				if (next >= 100) {
					clearInterval(interval);
					return 100;
				}

				// Dynamically change stage descriptions
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
			// Simulate 2.5s network + AI parsing latency
			await new Promise((r) => setTimeout(r, 2500));
			setParsedData(MOCK_PARSED_DATA);
			setUploadState("parsed");
		} catch {
			setUploadError("Something went wrong while parsing your resume. Please try again.");
			setUploadState("idle");
		}
	};

	const handleConfirm = async () => {
		if (!parsedData) return;
		setUploadState("creating");
		const toastId = toast.loading("Creating your resume in builder...");

		try {
			const resumeName = parsedData.fullName || "My Parsed Resume";
			// Append a short timestamp suffix to guarantee slug uniqueness across uploads
			const uniqueSlug = `${slugify(resumeName)}-${Date.now().toString(36)}`;
			const resume = await api.createResume({
				name: resumeName,
				slug: uniqueSlug,
				tags: ["AI Uploaded"],
				withSampleData: false,
			});

			// Invalidate resumes query
			await queryClient.invalidateQueries({ queryKey: ["resumes"] });

			toast.success("Resume created! Redirecting to editor...", { id: toastId });
			navigate({ to: "/builder/$resumeId", params: { resumeId: resume.id } });
		} catch {
			toast.error("Failed to create resume. Please try again.", { id: toastId });
			setUploadState("parsed");
		}
	};

	return (
		<div className="space-y-6 max-w-4xl mx-auto py-4">
			{/* Top Bar with Back Button */}
			<div className="flex items-center justify-between">
				<Link
					to="/dashboard/resumes"
					className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
				>
					<ArrowLeftIcon className="size-4" />
					<span>Back to Resumes</span>
				</Link>
			</div>

			{/* Main Card */}
			<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
					<div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50">
						<img src="/zoe-icon.png" alt="Zoe AI" className="size-9 rounded-full object-cover" />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-950">Upload & Parse Resume</h1>
						<p className="text-sm text-gray-500 mt-0.5">
							Zoe reads your document and populates the editor with structured, optimized content.
						</p>
					</div>
				</div>

				{/* Idle & Drop Zone */}
				{uploadState === "idle" && (
					<div className="space-y-4">
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
								className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
									dragging
										? "border-emerald-500 bg-emerald-50"
										: "border-gray-200 hover:border-emerald-400 hover:bg-gray-50/50"
								}`}
							>
								<div className="rounded-full bg-emerald-50 p-4 text-emerald-600">
									<CloudArrowUpIcon className="size-10 animate-bounce" weight="regular" />
								</div>
								<div>
									<p className="font-semibold text-gray-900 text-sm">
										Drag & drop your resume file here, or{" "}
										<span className="text-emerald-600 underline underline-offset-2">browse</span>
									</p>
									<p className="mt-1 text-gray-500 text-xs">
										Supports PDF, DOC, DOCX up to {MAX_SIZE_MB}MB
									</p>
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
									fileError ? "border-red-200 bg-red-50/30" : "border-emerald-200 bg-emerald-50/30"
								}`}
							>
								<FileTextIcon
									weight="fill"
									className={`size-10 shrink-0 ${fileError ? "text-red-400" : "text-emerald-500"}`}
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate font-semibold text-gray-900 text-sm">{file.name}</p>
									<p className={`text-xs ${fileError ? "text-red-600" : "text-gray-500"}`}>
										{fileError ?? formatBytes(file.size)}
									</p>
								</div>
								<button
									type="button"
									onClick={handleRemoveFile}
									className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
									aria-label="Remove file"
								>
									<XCircleIcon weight="fill" className="size-6" />
								</button>
							</div>
						)}

						{uploadError && (
							<div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
								<WarningCircleIcon weight="fill" className="size-5 shrink-0" />
								{uploadError}
							</div>
						)}

						{/* Footer Actions */}
						<div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
							<Link to="/dashboard/resumes">
								<Button variant="outline" className="border-gray-300 text-gray-700">
									Cancel
								</Button>
							</Link>
							<Button
								onClick={handleUpload}
								disabled={!file || !!fileError}
								className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
							>
								<CloudArrowUpIcon className="mr-1.5 size-4" />
								Upload & Parse with Zoe
							</Button>
						</div>
					</div>
				)}

				{/* Uploading/Parsing State */}
				{uploadState === "uploading" && (
					<div className="flex flex-col items-center justify-center py-12 space-y-6">
						<div className="relative flex items-center justify-center">
							<div className="absolute animate-ping size-16 rounded-full bg-emerald-100 opacity-75" />
							<div className="relative flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
								<SpinnerGapIcon className="size-8 animate-spin" weight="bold" />
							</div>
						</div>
						<div className="text-center max-w-sm space-y-1">
							<p className="font-semibold text-gray-900 text-base">Zoe AI is reading your resume...</p>
							<p className="text-xs text-gray-500 h-8 flex items-center justify-center">{progressText}</p>
						</div>
						<div className="w-full max-w-xs space-y-1">
							<div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
								<div
									className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
									style={{ width: `${progressPercent}%` }}
								/>
							</div>
							<p className="text-right text-[10px] text-gray-400 font-semibold">{progressPercent}%</p>
						</div>
					</div>
				)}

				{/* Parsed Preview Screen */}
				{uploadState === "parsed" && parsedData && (
					<div className="space-y-6">
						{/* Success banner */}
						<div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
							<CheckCircleIcon weight="fill" className="size-6 text-emerald-600 shrink-0" />
							<div>
								<h3 className="font-bold text-emerald-950 text-sm">Resume successfully read by Zoe!</h3>
								<p className="text-xs text-emerald-800 mt-0.5">
									Review the extracted information below before creating your resume in the editor.
								</p>
							</div>
						</div>

						{/* Extraction Sections */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Left Column: Basic Info & Profile Summary */}
							<div className="space-y-6">
								{/* Basic Details */}
								<div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
									<div className="flex items-center gap-2 border-b border-gray-200 pb-2">
										<UserIcon className="size-4 text-emerald-600" />
										<span className="font-bold text-gray-900 text-xs uppercase tracking-wider">
											Contact Details
										</span>
									</div>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-[10px] text-gray-400 font-semibold uppercase">Full Name</p>
											<p className="font-medium text-gray-800">{parsedData.fullName}</p>
										</div>
										<div>
											<p className="text-[10px] text-gray-400 font-semibold uppercase">Title</p>
											<p className="font-medium text-gray-800">{parsedData.professionalTitle}</p>
										</div>
										<div>
											<p className="text-[10px] text-gray-400 font-semibold uppercase">Email</p>
											<p className="font-medium text-gray-800 truncate">{parsedData.email}</p>
										</div>
										<div>
											<p className="text-[10px] text-gray-400 font-semibold uppercase">Phone</p>
											<p className="font-medium text-gray-800">{parsedData.phone}</p>
										</div>
									</div>
								</div>

								{/* Professional Summary */}
								<div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
									<div className="flex items-center gap-2 border-b border-gray-200 pb-2">
										<FileTextIcon className="size-4 text-emerald-600" />
										<span className="font-bold text-gray-900 text-xs uppercase tracking-wider">
											Profile Summary
										</span>
									</div>
									<p className="text-sm text-gray-700 leading-relaxed italic">
										"{parsedData.summary}"
									</p>
								</div>

								{/* Skills */}
								<div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
									<div className="flex items-center gap-2 border-b border-gray-200 pb-2">
										<WrenchIcon className="size-4 text-emerald-600" />
										<span className="font-bold text-gray-900 text-xs uppercase tracking-wider">
											Skills Detected ({parsedData.skills.length})
										</span>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{parsedData.skills.map((skill) => (
											<span
												key={skill}
												className="rounded-full border border-emerald-100 bg-emerald-50/30 px-3 py-1 text-xs font-medium text-emerald-800"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* Right Column: Work Experience & Education */}
							<div className="space-y-6">
								{/* Work History */}
								<div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
									<div className="flex items-center gap-2 border-b border-gray-200 pb-2">
										<SuitcaseIcon className="size-4 text-emerald-600" />
										<span className="font-bold text-gray-900 text-xs uppercase tracking-wider">
											Work Experience
										</span>
									</div>
									<div className="space-y-3">
										{parsedData.experience.map((exp, idx) => (
											<div
												key={`${exp.company}-${idx}`}
												className="border-l-2 border-emerald-400 pl-3 py-0.5 space-y-1"
											>
												<div className="flex items-baseline justify-between gap-2">
													<p className="font-bold text-sm text-gray-800">{exp.role}</p>
													<span className="text-[10px] text-gray-400 font-semibold uppercase shrink-0">
														{exp.duration}
													</span>
												</div>
												<p className="text-xs text-gray-500 font-medium">{exp.company}</p>
												<p className="text-xs text-gray-600 leading-snug">{exp.description}</p>
											</div>
										))}
									</div>
								</div>

								{/* Education */}
								<div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
									<div className="flex items-center gap-2 border-b border-gray-200 pb-2">
										<BookOpenIcon className="size-4 text-emerald-600" />
										<span className="font-bold text-gray-900 text-xs uppercase tracking-wider">
											Education
										</span>
									</div>
									<div className="space-y-3">
										{parsedData.education.map((edu, idx) => (
											<div key={`${edu.institution}-${idx}`} className="space-y-0.5">
												<div className="flex items-baseline justify-between gap-2">
													<p className="font-bold text-sm text-gray-800">{edu.degree}</p>
													<span className="text-[10px] text-gray-400 font-semibold shrink-0">
														{edu.year}
													</span>
												</div>
												<p className="text-xs text-gray-500">{edu.institution}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Bottom action buttons */}
						<div className="flex justify-between items-center border-t border-gray-100 pt-4">
							<Button
								variant="outline"
								onClick={() => {
									setParsedData(null);
									setFile(null);
									setUploadState("idle");
								}}
								className="border-gray-300 text-gray-700"
							>
								Try another file
							</Button>

							<Button
								onClick={handleConfirm}
								disabled={isCreating}
								className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
							>
								<CheckCircleIcon className="mr-1.5 size-4" />
								Confirm & Import to Builder
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
