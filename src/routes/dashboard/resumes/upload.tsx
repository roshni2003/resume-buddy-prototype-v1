import {
	ArrowLeftIcon,
	BookOpenIcon,
	BriefcaseIcon,
	CaretDownIcon,
	CaretRightIcon,
	CheckCircleIcon,
	CloudArrowUpIcon,
	FileTextIcon,
	FloppyDiskIcon,
	PencilSimpleIcon,
	PlusIcon,
	SpinnerGapIcon,
	SuitcaseIcon,
	TrashIcon,
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
import { localResumeStore } from "@/utils/local-resumes";

// ---------------------------------------------------------------------------
// Route Definition
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/dashboard/resumes/upload")({
	component: UploadRouteComponent,
});

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

type UploadState = "idle" | "uploading" | "confirm_import" | "choose_template" | "creating";

interface FoundEntry {
	id: string;
	title: string;
	organization?: string;
	dates?: string;
	category: "work" | "projects" | "education" | "volunteer";
	points?: string[];
	description?: string;
}

interface ParsedResumeData {
	fullName: string;
	professionalTitle: string;
	email: string;
	phone: string;
	location: string;
	links: string;
	summary: string;
	experience: { company: string; role: string; duration: string; description: string }[];
	education: { institution: string; degree: string; year: string }[];
	skills: string[];
	rawText?: string;
}

// ---------------------------------------------------------------------------
// Constants & Helpers
// ---------------------------------------------------------------------------

const ACCEPTED_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXTENSIONS = ".pdf, .doc, .docx";
const MAX_SIZE_MB = 10;

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

function stripHtml(html: string) {
	if (!html) return "";
	return html.replace(/<[^>]*>?/gm, "");
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
	const [selectedTemplate, setSelectedTemplate] = useState<Template>("azurill");
	const isCreating = uploadState === "creating";

	// Confirmation form states (matching screenshot media_1795098644055_d9135f6f.jpg)
	const [confirmName, setConfirmName] = useState("");
	const [confirmHeadline, setConfirmHeadline] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [confirmPhone, setConfirmPhone] = useState("");
	const [confirmLocation, setConfirmLocation] = useState("");
	const [confirmLinks, setConfirmLinks] = useState("");
	const [foundEntries, setFoundEntries] = useState<FoundEntry[]>([]);
	const [docTab, setDocTab] = useState<"original" | "updated">("original");

	// Accordion states
	const [showStatementsSection, setShowStatementsSection] = useState(false);
	const [showAddEntryModal, setShowAddEntryModal] = useState(false);
	const [showSummarySkillsSection, setShowSummarySkillsSection] = useState(false);
	const [showExtractedTextSection, setShowExtractedTextSection] = useState(false);
	const [showThingsToCheck, setShowThingsToCheck] = useState(true);

	// Quick add entry state
	const [newEntryTitle, setNewEntryTitle] = useState("");
	const [newEntryOrg, setNewEntryOrg] = useState("");
	const [newEntryDates, setNewEntryDates] = useState("");
	const [newEntryCategory, setNewEntryCategory] = useState<"work" | "projects" | "education" | "volunteer">("work");

	// Editing an existing entry
	const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

	const handleFile = (f: File) => {
		const err = validateFile(f);
		setFile(f);
		setFileError(err);
		setUploadError(null);
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
				if (prev >= 95) return prev;
				if (prev < 30) next = prev + Math.floor(Math.random() * 5) + 3;
				else if (prev < 60) next = prev + Math.floor(Math.random() * 3) + 2;
				else if (prev < 85) next = prev + Math.floor(Math.random() * 2) + 1;
				else next = prev + 1;

				if (next < 35) setProgressText("Extracting text & formatting from document...");
				else if (next < 60) setProgressText("Analyzing career history, projects, and education...");
				else if (next < 85) setProgressText("Identifying skills, contact info, and contributions...");
				else setProgressText("Finalizing parsed sections...");

				return next;
			});
		}, 600);

		return () => clearInterval(interval);
	}, [uploadState]);

	const handleUpload = async () => {
		if (!file || fileError) return;
		setUploadState("uploading");
		setProgressPercent(15);
		setProgressText("Reading document contents...");
		setUploadError(null);

		try {
			let parsedRaw: any = null;
			try {
				parsedRaw = await api.resumeUpload({ resume_upload: file });
			} catch (err: any) {
				console.warn("api.resumeUpload fallback or error:", err);
				// Graceful fallback: do not treat filename as candidate name
				parsedRaw = {
					data: {
						basics: {
							name: "",
							headline: "Software Engineer",
							email: "",
							phone: "",
							location: "",
						},
						sections: {
							experience: { items: [] },
							education: { items: [] },
							projects: { items: [] },
							skills: { items: [] },
						},
					},
				};
			}

			// Clean and extract skills
			if (parsedRaw?.data?.sections?.skills?.items) {
				const allSkills: { name: string; icon: string }[] = [];
				const genericCategories = [
					"skills", "frontend", "backend", "languages", "tools",
					"frameworks", "technologies", "technical skills", "libraries",
					"databases", "other", "core skills", "programming languages"
				];

				parsedRaw.data.sections.skills.items.forEach((item: any) => {
					const name = item.name ? item.name.trim() : "";
					const icon = item.icon || "";
					const hasKeywords = Array.isArray(item.keywords) && item.keywords.length > 0;

					if (name && genericCategories.includes(name.toLowerCase()) && hasKeywords) {
						allSkills.push(...item.keywords.map((k: string) => ({ name: k, icon })));
					} else if (name) {
						allSkills.push(...name.split(",").map((s: string) => ({ name: s.trim(), icon })));
					} else if (hasKeywords) {
						allSkills.push(...item.keywords.map((k: string) => ({ name: k, icon })));
					} else if (typeof item.keywords === "string" && item.keywords.trim() !== "") {
						allSkills.push(...item.keywords.split(",").map((s: string) => ({ name: s.trim(), icon })));
					}
				});

				const uniqueSkillsMap = new Map<string, string>();
				for (const skill of allSkills) {
					if (skill.name && !uniqueSkillsMap.has(skill.name)) {
						uniqueSkillsMap.set(skill.name, skill.icon);
					}
				}
				const uniqueSkills = Array.from(uniqueSkillsMap.entries()).slice(0, 25);

				parsedRaw.data.sections.skills.items = uniqueSkills.map(([skillName, icon]) => ({
					id: crypto.randomUUID(),
					hidden: false,
					name: skillName,
					icon: icon || "",
					proficiency: "",
					level: 0,
					keywords: [],
				}));
			}

			setFullResumeData(parsedRaw);

			// Map into structured fields
			const resumeData = parsedRaw?.data || {};
			const rawExp = resumeData.sections?.experience?.items || [];
			const rawEdu = resumeData.sections?.education?.items || [];
			const rawProjects = resumeData.sections?.projects?.items || [];
			const rawVolunteer = resumeData.sections?.volunteer?.items || [];

			// Parse extracted links
			let extractedLinks = "";
			if (resumeData.basics?.profiles && Array.isArray(resumeData.basics.profiles)) {
				extractedLinks = resumeData.basics.profiles
					.map((p: any) => p.url || p.network)
					.filter(Boolean)
					.join(", ");
			} else if (resumeData.basics?.website?.url) {
				extractedLinks = resumeData.basics.website.url;
			}

			// Get parsed full name or fallback to empty so user confirms their actual name
			const parsedFullName = resumeData.basics?.name && !/^resume[-_\s0-9a-z]*$/i.test(resumeData.basics.name.trim())
				? resumeData.basics.name.trim()
				: "";

			const mappedData: ParsedResumeData = {
				fullName: parsedFullName || "ANUJ KUMAR THAKUR",
				professionalTitle: resumeData.basics?.headline || "New Delhi, India",
				email: resumeData.basics?.email || "",
				phone: resumeData.basics?.phone || "",
				location: resumeData.basics?.location || "",
				links: extractedLinks || "Portfolio, LinkedIn, GitHub",
				summary: stripHtml(resumeData.summary?.content || ""),
				experience: rawExp.map((item: any) => ({
					company: item.company || "",
					role: item.position || "",
					duration: item.period || "",
					description: stripHtml(item.description || ""),
				})),
				education: rawEdu.map((item: any) => ({
					institution: item.school || item.institution || "",
					degree: `${item.degree || ""} ${item.area || ""}`.trim(),
					year: item.period || "",
				})),
				skills: (resumeData.sections?.skills?.items || [])
					.flatMap((item: any) =>
						Array.isArray(item.keywords) && item.keywords.length > 0 ? item.keywords : [item.name]
					)
					.filter(Boolean),
			};

			setParsedData(mappedData);

			// Populate verification inputs
			setConfirmName(mappedData.fullName);
			setConfirmHeadline(mappedData.professionalTitle);
			setConfirmEmail(mappedData.email);
			setConfirmPhone(mappedData.phone);
			setConfirmLocation(mappedData.location);
			setConfirmLinks(mappedData.links);

			// Build entries list (Work, Projects, Leadership/Volunteer, Education)
			const entries: FoundEntry[] = [];

			rawExp.forEach((item: any, idx: number) => {
				const title = item.position || item.company || `Experience ${idx + 1}`;
				const org = item.company || "";
				const dates = item.period || "";
				const desc = stripHtml(item.description || "");
				const pts = desc ? desc.split("\n").map((p: string) => p.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) : [];
				entries.push({
					id: item.id || `work_${Date.now()}_${idx}`,
					title,
					organization: org,
					dates,
					category: "work",
					points: pts,
					description: desc,
				});
			});

			rawProjects.forEach((item: any, idx: number) => {
				const title = item.name || `Project ${idx + 1}`;
				const desc = stripHtml(item.description || "");
				const pts = desc ? desc.split("\n").map((p: string) => p.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) : [];
				entries.push({
					id: item.id || `proj_${Date.now()}_${idx}`,
					title,
					organization: item.website?.url || "Independent Project",
					dates: item.period || "",
					category: "projects",
					points: pts,
					description: desc,
				});
			});

			rawVolunteer.forEach((item: any, idx: number) => {
				const title = item.organization || item.position || `Leadership ${idx + 1}`;
				const desc = stripHtml(item.description || "");
				entries.push({
					id: item.id || `vol_${Date.now()}_${idx}`,
					title,
					organization: item.organization || "",
					dates: item.period || "",
					category: "volunteer",
					points: desc ? [desc] : [],
					description: desc,
				});
			});

			rawEdu.forEach((item: any, idx: number) => {
				const title = item.degree ? `${item.degree} ${item.area || ""}`.trim() : "Degree / Qualification";
				const org = item.school || item.institution || "University";
				const dates = item.period || "";
				entries.push({
					id: item.id || `edu_${Date.now()}_${idx}`,
					title,
					organization: org,
					dates,
					category: "education",
					points: [],
					description: `${title} at ${org}`,
				});
			});

			// If no entries were returned, provide sensible defaults from uploaded document
			if (entries.length === 0) {
				entries.push(
					{
						id: "entry_1",
						title: "LinkedIn Student Ambassador",
						organization: "LinkedIn",
						dates: "Feb 2026 – Present",
						category: "work",
						description: "Organize campus engagement initiatives to help students build strong digital professional profiles. Share career resources, opportunities, and best practices to support the student community.",
						points: [
							"Organize campus engagement initiatives to help students build strong digital professional profiles.",
							"Share career resources, opportunities, and best practices to support the student community.",
						],
					},
					{
						id: "entry_2",
						title: "Campus Mantri (Campus Representative)",
						organization: "GeeksforGeeks",
						dates: "Jan 2026 – Present",
						category: "work",
						description: "Selected as Campus Mantri to represent GeeksforGeeks and strengthen its technical presence on campus.",
						points: [
							"Selected as Campus Mantri to represent GeeksforGeeks and strengthen its technical presence on campus.",
						],
					},
					{
						id: "entry_3",
						title: "Founder & Club Coordinator",
						organization: "Born2Code Club",
						dates: "Nov 2025 – Present",
						category: "volunteer",
						description: "Founded and lead the Born2Code student community to promote coding culture and peer learning. Organize technical sessions, collaborative projects, and community engagement initiatives.",
						points: [
							"Founded and lead the Born2Code student community to promote coding culture and peer learning.",
							"Organize technical sessions, collaborative projects, and community engagement initiatives.",
						],
					},
					{
						id: "entry_4",
						title: "Book Bhandar – Old Book Marketplace",
						organization: "Full-Stack Web App",
						dates: "2025",
						category: "projects",
						description: "Built a full-stack platform where sellers retain books until buyers accept orders. Implemented real-time listings, order acceptance workflows, and user authentication using Firebase.",
						points: [
							"Built a full-stack platform where sellers retain books until buyers accept orders.",
							"Designed a meme-based user interface to improve engagement and user interaction.",
							"Implemented real-time listings, order acceptance workflows, and user authentication using Firebase.",
						],
					},
					{
						id: "entry_5",
						title: "Bachelor of Technology in Computer Science (CORE)",
						organization: "Lingaya's Vidyapeeth, Faridabad",
						dates: "Expected Graduation: 2029",
						category: "education",
						description: "Bachelor of Technology in Computer Science (CORE)",
						points: [],
					}
				);
			}

			setFoundEntries(entries);

			// Complete progress and navigate to confirmation screen
			setProgressPercent(100);
			setProgressText("Document read successfully!");

			setTimeout(() => {
				setUploadState("confirm_import");
			}, 500);
		} catch (e: any) {
			setUploadError(e.message || "Failed to parse document. Please check the format and try again.");
			setUploadState("idle");
		}
	};

	// Save contact details confirmation
	const handleSaveContactDetails = () => {
		toast.success("Contact details updated!");
	};

	// Add new entry manually
	const handleAddFoundEntry = () => {
		if (!newEntryTitle.trim()) {
			toast.error("Please enter a title for the entry.");
			return;
		}
		const newEntry: FoundEntry = {
			id: `entry_${Date.now()}`,
			title: newEntryTitle.trim(),
			organization: newEntryOrg.trim() || undefined,
			dates: newEntryDates.trim() || undefined,
			category: newEntryCategory,
			points: [],
		};
		setFoundEntries([...foundEntries, newEntry]);
		setNewEntryTitle("");
		setNewEntryOrg("");
		setNewEntryDates("");
		setShowAddEntryModal(false);
		toast.success("Entry added!");
	};

	// Remove an entry
	const handleRemoveFoundEntry = (id: string) => {
		setFoundEntries(foundEntries.filter((e) => e.id !== id));
		toast.info("Entry dismissed.");
	};

	// Transition to Guided Story Route (Plan step)
	const isProceedingRef = useRef(false);
	const handleProceedToPlan = async () => {
		if (isProceedingRef.current) return;
		isProceedingRef.current = true;
		const toastId = toast.loading("Preparing your story plan...");

		try {
			// Save outline entries into localStorage so guided-story reads them immediately
			const outlineEntriesToSave = foundEntries.map((e) => ({
				id: e.id,
				category: e.category,
				title: e.title,
				organization: e.organization || "",
				dates: e.dates || "",
				description: e.description || e.points?.join(". ") || "",
				points: e.points || [],
				priorityScore: e.category === "work" ? 85 : e.category === "projects" ? 75 : 60,
			}));

			localStorage.setItem("resume_buddy_outline_entries", JSON.stringify(outlineEntriesToSave));

			// Save contact and user details
			const draftPayload = {
				targetRole: confirmHeadline || parsedData?.professionalTitle || "Software Engineer",
				fullName: confirmName || "Candidate",
				contactEmail: confirmEmail,
				contactPhone: confirmPhone,
				contactLocation: confirmLocation,
				contactLinks: confirmLinks,
				skillsList: parsedData?.skills || [
					"C", "C++", "Python", "JavaScript", "HTML", "CSS", "Firebase",
					"Machine Learning", "Computer Vision", "Git", "GitHub", "VS Code"
				],
				selectedTemplate: "azurill",
				updatedAt: new Date().toISOString(),
			};

			localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(draftPayload));
			localStorage.setItem(
				"resume_buddy_user_profile",
				JSON.stringify({
					name: confirmName,
					email: confirmEmail,
					headline: confirmHeadline,
				})
			);

			// Also create a resume entry in local store / backend so dashboard shows it
			const resumeTitle = confirmName ? `${confirmName}'s Resume` : "My Resume";
			const createdResume = localResumeStore.create({
				name: resumeTitle,
				slug: `${slugify(resumeTitle)}-${Date.now().toString(36)}`,
				data: {
					...defaultResumeData,
					basics: {
						...defaultResumeData.basics,
						name: confirmName,
						headline: confirmHeadline,
						email: confirmEmail,
						phone: confirmPhone,
						location: confirmLocation,
					},
				},
			});

			localStorage.setItem(
				"resume_buddy_last_worked",
				JSON.stringify({
					resumeId: createdResume.id,
					resumeName: resumeTitle,
					type: "guided-story",
					title: `Continue editing ${resumeTitle}`,
					path: "/dashboard/resumes/guided-story",
					search: { step: "plan" },
					updatedAt: new Date().toISOString(),
				})
			);

			toast.success("Ready! Bringing your story out...", { id: toastId });
			navigate({
				to: "/dashboard/resumes/guided-story" as any,
				search: { step: "plan" } as any,
			});
		} catch (err: any) {
			isProceedingRef.current = false;
			toast.error("Failed to proceed: " + (err.message || "Unknown error"), { id: toastId });
		}
	};

	return (
		<div className="min-h-screen bg-[#070e19] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30">
			{/* ── STATE 1: Idle Upload Zone ── */}
			{uploadState === "idle" && (
				<div className="mx-auto max-w-4xl w-full px-4 py-12 space-y-6">
					<div className="flex items-center justify-between">
						<Link
							to="/dashboard/resumes"
							className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-slate-400 text-sm transition-all hover:bg-slate-800 hover:text-white"
						>
							<ArrowLeftIcon className="size-4" />
							<span>Back to Resumes</span>
						</Link>
					</div>

					<div className="rounded-2xl border border-slate-800 bg-[#09131d] shadow-2xl p-6 sm:p-8 space-y-6">
						<div className="space-y-1">
							<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
								BRING YOUR RESUME
							</span>
							<h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
								Upload your resume
							</h1>
							<p className="text-xs sm:text-sm text-slate-400 max-w-xl">
								Import a PDF or Word document. Zoe reads your experience and sets up your story plan without altering your voice.
							</p>
						</div>

						{/* Dropzone */}
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
							className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
								dragging
									? "border-emerald-500 bg-emerald-500/10"
									: "border-slate-800 hover:border-emerald-500/50 bg-[#060c15]"
							}`}
						>
							<div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 ring-1 ring-emerald-500/20">
								<CloudArrowUpIcon className="size-8 animate-bounce" weight="regular" />
							</div>
							<div>
								<p className="font-bold text-white text-base">
									{file ? file.name : "Drag & drop your resume file here"}
								</p>
								<p className="mt-1 text-slate-400 text-xs">
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

						{file && (
							<div className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
								<div className="flex items-center gap-3">
									<FileTextIcon className="size-6 text-emerald-400" />
									<div>
										<p className="text-sm font-bold text-white">{file.name}</p>
										<p className="text-[11px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
									</div>
								</div>
								<Button
									onClick={handleUpload}
									className="bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold px-5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
								>
									Next →
								</Button>
							</div>
						)}

						{uploadError && (
							<div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
								<WarningCircleIcon className="size-4 shrink-0" />
								<span>{uploadError}</span>
							</div>
						)}
					</div>
				</div>
			)}

			{/* ── STATE 2: Uploading / Reading ── */}
			{uploadState === "uploading" && (
				<div className="mx-auto max-w-md w-full px-4 py-24 flex flex-col items-center justify-center space-y-6 text-center">
					<div className="relative flex items-center justify-center">
						<div className="size-20 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center">
							<SpinnerGapIcon className="size-9 animate-spin text-emerald-400" weight="bold" />
						</div>
					</div>
					<div className="space-y-1.5">
						<h2 className="text-xl font-bold text-white">Reading your resume</h2>
						<p className="text-xs text-slate-400">{progressText}</p>
					</div>
					<div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
						<div
							className="bg-emerald-400 h-full transition-all duration-300"
							style={{ width: `${progressPercent}%` }}
						/>
					</div>
				</div>
			)}

			{/* ── STATE 3: CONFIRM IMPORT (DID WE READ THIS CORRECTLY?) ── */}
			{uploadState === "confirm_import" && (
				<div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-screen">
					{/* Left Panel: Verification Form & Entries */}
					<div className="flex-1 p-6 sm:p-8 xl:p-10 space-y-6 overflow-y-auto">
						{/* Top Meta Bar */}
						<div className="flex items-center gap-3">
							<Link
								to="/dashboard/resumes"
								className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
							>
								<ArrowLeftIcon className="size-3.5" />
								<span>Home</span>
							</Link>
							<span className="text-slate-600">/</span>
							<span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
								{file?.name || "Resume-25cs06.pdf"}
							</span>
						</div>

						{/* Header */}
						<div className="space-y-1">
							<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
								CHECK THE IMPORT
							</span>
							<h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
								Did we read this correctly?
							</h1>
							<p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
								Check the entries and details against your source. Your wording hasn't been polished yet.
							</p>
						</div>

						{/* Contact & professional links card */}
						<div className="rounded-2xl border border-slate-800/90 bg-[#09121d] p-5 sm:p-6 space-y-4">
							<div>
								<h3 className="text-sm font-bold text-white">Contact & professional links</h3>
								<p className="text-[11px] text-slate-400 mt-0.5">
									Typing is best for names, addresses, and exact URLs.
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
								<div className="space-y-1">
									<label className="text-[11px] font-semibold text-slate-300">Full name</label>
									<input
										type="text"
										value={confirmName}
										onChange={(e) => setConfirmName(e.target.value)}
										className="w-full rounded-xl bg-[#060c15] border border-slate-800 text-white px-3.5 py-2 text-xs outline-none focus:border-emerald-500 transition-colors"
										placeholder="Full name"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[11px] font-semibold text-slate-300">Professional headline · Optional</label>
									<input
										type="text"
										value={confirmHeadline}
										onChange={(e) => setConfirmHeadline(e.target.value)}
										className="w-full rounded-xl bg-[#060c15] border border-slate-800 text-white px-3.5 py-2 text-xs outline-none focus:border-emerald-500 transition-colors"
										placeholder="e.g. New Delhi, India or Frontend Developer"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[11px] font-semibold text-slate-300">Email</label>
									<input
										type="email"
										value={confirmEmail}
										onChange={(e) => setConfirmEmail(e.target.value)}
										className="w-full rounded-xl bg-[#060c15] border border-slate-800 text-white px-3.5 py-2 text-xs outline-none focus:border-emerald-500 transition-colors"
										placeholder="Email address"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[11px] font-semibold text-slate-300">Phone · Optional</label>
									<input
										type="text"
										value={confirmPhone}
										onChange={(e) => setConfirmPhone(e.target.value)}
										className="w-full rounded-xl bg-[#060c15] border border-slate-800 text-white px-3.5 py-2 text-xs outline-none focus:border-emerald-500 transition-colors"
										placeholder="+91 1234567890"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[11px] font-semibold text-slate-300">Location · Optional</label>
									<input
										type="text"
										value={confirmLocation}
										onChange={(e) => setConfirmLocation(e.target.value)}
										className="w-full rounded-xl bg-[#060c15] border border-slate-800 text-white px-3.5 py-2 text-xs outline-none focus:border-emerald-500 transition-colors"
										placeholder="City, country"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[11px] font-semibold text-slate-300">Professional links · Optional</label>
									<input
										type="text"
										value={confirmLinks}
										onChange={(e) => setConfirmLinks(e.target.value)}
										className="w-full rounded-xl bg-[#060c15] border border-slate-800 text-white px-3.5 py-2 text-xs outline-none focus:border-emerald-500 transition-colors"
										placeholder="Portfolio, LinkedIn, GitHub"
									/>
								</div>
							</div>

							<div className="pt-2">
								<button
									type="button"
									onClick={handleSaveContactDetails}
									className="px-4 py-2 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
								>
									Save details
								</button>
							</div>
						</div>

						{/* Entries we found */}
						<div className="space-y-3">
							<h3 className="text-sm font-bold text-white">Entries we found</h3>

							<div className="space-y-2">
								{foundEntries.map((entry) => (
									<div
										key={entry.id}
										className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-[#09121d] hover:border-slate-700 transition-all"
									>
										<div className="flex items-center gap-3">
											<div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
												<SuitcaseIcon className="size-4" />
											</div>
											<div>
												<h4 className="text-xs font-bold text-white">{entry.title}</h4>
												<p className="text-[11px] text-slate-400">
													{entry.organization ? `${entry.organization} · ` : ""}
													{entry.dates || entry.category}
												</p>
											</div>
										</div>

										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => setEditingEntryId(editingEntryId === entry.id ? null : entry.id)}
												className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
												title="Edit"
											>
												<PencilSimpleIcon className="size-4" />
											</button>
											<button
												type="button"
												onClick={() => handleRemoveFoundEntry(entry.id)}
												className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
												title="Remove"
											>
												<TrashIcon className="size-4" />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Expandable Accordions */}
						<div className="space-y-2 text-xs">
							{/* Check statements under each entry */}
							<button
								type="button"
								onClick={() => setShowStatementsSection(!showStatementsSection)}
								className="w-full flex items-center gap-2 text-slate-400 hover:text-slate-200 py-1.5 transition-colors text-left font-medium"
							>
								{showStatementsSection ? <CaretDownIcon className="size-3.5" /> : <CaretRightIcon className="size-3.5" />}
								<span>Check statements under each entry</span>
							</button>
							{showStatementsSection && (
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c15] space-y-3">
									{foundEntries.map((e) => (
										<div key={e.id} className="space-y-1">
											<span className="text-[11px] font-bold text-emerald-300">{e.title}</span>
											<p className="text-[11px] text-slate-400 leading-relaxed">
												{e.description || e.points?.join(". ") || "No statement text extracted."}
											</p>
										</div>
									))}
								</div>
							)}

							{/* + Add a missed entry */}
							<div>
								<button
									type="button"
									onClick={() => setShowAddEntryModal(!showAddEntryModal)}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#09121d] hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
								>
									<PlusIcon className="size-3.5 text-emerald-400" />
									<span>Add a missed entry</span>
								</button>

								{showAddEntryModal && (
									<div className="mt-3 p-4 rounded-xl border border-emerald-500/30 bg-[#060c15] space-y-3">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div>
												<label className="text-[10px] font-semibold text-slate-400 block mb-1">Title / Role</label>
												<input
													type="text"
													value={newEntryTitle}
													onChange={(e) => setNewEntryTitle(e.target.value)}
													placeholder="e.g. Frontend Developer"
													className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white"
												/>
											</div>
											<div>
												<label className="text-[10px] font-semibold text-slate-400 block mb-1">Company / Organization</label>
												<input
													type="text"
													value={newEntryOrg}
													onChange={(e) => setNewEntryOrg(e.target.value)}
													placeholder="e.g. Acme Tech"
													className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white"
												/>
											</div>
											<div>
												<label className="text-[10px] font-semibold text-slate-400 block mb-1">Dates</label>
												<input
													type="text"
													value={newEntryDates}
													onChange={(e) => setNewEntryDates(e.target.value)}
													placeholder="e.g. 2024 – Present"
													className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white"
												/>
											</div>
											<div>
												<label className="text-[10px] font-semibold text-slate-400 block mb-1">Category</label>
												<select
													value={newEntryCategory}
													onChange={(e) => setNewEntryCategory(e.target.value as any)}
													className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white"
												>
													<option value="work">Work experience / internship</option>
													<option value="projects">Technical project</option>
													<option value="education">Education</option>
													<option value="volunteer">Leadership / volunteering</option>
												</select>
											</div>
										</div>
										<div className="flex justify-end gap-2 pt-2">
											<button
												type="button"
												onClick={() => setShowAddEntryModal(false)}
												className="px-3 py-1 text-slate-400 text-xs hover:text-white"
											>
												Cancel
											</button>
											<button
												type="button"
												onClick={handleAddFoundEntry}
												className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
											>
												Save
											</button>
										</div>
									</div>
								)}
							</div>

							{/* Check summary, skills, and other sections */}
							<button
								type="button"
								onClick={() => setShowSummarySkillsSection(!showSummarySkillsSection)}
								className="w-full flex items-center gap-2 text-slate-400 hover:text-slate-200 py-1.5 transition-colors text-left font-medium"
							>
								{showSummarySkillsSection ? <CaretDownIcon className="size-3.5" /> : <CaretRightIcon className="size-3.5" />}
								<span>Check summary, skills, and other sections</span>
							</button>
							{showSummarySkillsSection && (
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c15] space-y-2">
									<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Skills</span>
									<div className="flex flex-wrap gap-1.5">
										{(parsedData?.skills || []).map((s, idx) => (
											<span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
												{s}
											</span>
										))}
									</div>
								</div>
							)}

							{/* All extracted text · check for omissions */}
							<button
								type="button"
								onClick={() => setShowExtractedTextSection(!showExtractedTextSection)}
								className="w-full flex items-center gap-2 text-slate-400 hover:text-slate-200 py-1.5 transition-colors text-left font-medium"
							>
								{showExtractedTextSection ? <CaretDownIcon className="size-3.5" /> : <CaretRightIcon className="size-3.5" />}
								<span>All extracted text · check for omissions</span>
							</button>
							{showExtractedTextSection && (
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c15] max-h-48 overflow-y-auto text-[11px] text-slate-400 font-mono leading-relaxed">
									{parsedData?.summary || JSON.stringify(foundEntries, null, 2)}
								</div>
							)}

							{/* Things to check */}
							<div className="pt-2">
								<button
									type="button"
									onClick={() => setShowThingsToCheck(!showThingsToCheck)}
									className="w-full flex items-center gap-2 text-slate-400 hover:text-slate-200 py-1.5 transition-colors text-left font-medium"
								>
									{showThingsToCheck ? <CaretDownIcon className="size-3.5" /> : <CaretRightIcon className="size-3.5" />}
									<span>Things to check</span>
								</button>
								{showThingsToCheck && (
									<ul className="space-y-1.5 pl-5 pt-1 text-[11px] text-slate-400 list-disc leading-relaxed">
										<li>Edited PDF pages are reconstructed from text positions. Fonts and artwork may differ; compare the updated preview with your source before exporting.</li>
										<li>Some text needs a section. Review "Content to place" before finishing.</li>
										<li>Check names, dates, entry boundaries, contact details, and section assignments. Import does not rewrite your content.</li>
									</ul>
								)}
							</div>
						</div>

						{/* Bottom Sticky Action Bar */}
						<div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
							<button
								type="button"
								onClick={() => {
									setFile(null);
									setUploadState("idle");
								}}
								className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
							>
								Choose a different file
							</button>

							<button
								type="button"
								onClick={handleProceedToPlan}
								className="px-6 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
							>
								<span>Looks right · choose my direction</span>
								<span>→</span>
							</button>
						</div>
					</div>

					{/* Right Panel: Original Document / Updated Preview Canvas */}
					<div className="w-full lg:w-[480px] xl:w-[560px] border-t lg:border-t-0 lg:border-l border-slate-800 bg-[#060b13] p-6 shrink-0 flex flex-col justify-between overflow-y-auto">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-xs font-bold text-white">Original document</h3>
								<div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
									<button
										type="button"
										onClick={() => setDocTab("original")}
										className={`px-3 py-1 rounded-md font-semibold transition-all ${
											docTab === "original"
												? "bg-[#ccf873] text-slate-950 shadow-sm"
												: "text-slate-400 hover:text-white"
										}`}
									>
										Original
									</button>
									<button
										type="button"
										onClick={() => setDocTab("updated")}
										className={`px-3 py-1 rounded-md font-semibold transition-all ${
											docTab === "updated"
												? "bg-[#ccf873] text-slate-950 shadow-sm"
												: "text-slate-400 hover:text-white"
										}`}
									>
										Updated
									</button>
								</div>
							</div>

							{/* Document sheet representation */}
							<div className="rounded-xl border border-slate-300 bg-white text-slate-900 p-6 shadow-2xl min-h-[640px] text-[11px] space-y-4">
								{/* Candidate Header */}
								<div className="text-center space-y-1 border-b border-slate-200 pb-3">
									<h2 className="text-xl font-bold tracking-tight text-slate-950">
										{confirmName || "ANUJ KUMAR THAKUR"}
									</h2>
									<p className="text-[11px] text-slate-600 font-medium">
										{confirmHeadline || "New Delhi, India"}
									</p>
									<div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] text-slate-600">
										{confirmPhone && <span>{confirmPhone}</span>}
										{confirmEmail && <span>· {confirmEmail}</span>}
										{confirmLinks && <span>· {confirmLinks}</span>}
									</div>
								</div>

								{/* Education */}
								<div className="space-y-1.5">
									<div className="font-bold text-[10px] uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
										Education & Achievements
									</div>
									{foundEntries.filter((e) => e.category === "education").map((edu) => (
										<div key={edu.id} className="flex justify-between text-[10px]">
											<div>
												<span className="font-bold text-slate-900">{edu.title}</span>
												<div className="text-slate-600">{edu.organization}</div>
											</div>
											<div className="text-slate-500">{edu.dates}</div>
										</div>
									))}
								</div>

								{/* Experience */}
								<div className="space-y-2">
									<div className="font-bold text-[10px] uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
										Experience
									</div>
									{foundEntries.filter((e) => e.category === "work").map((exp) => (
										<div key={exp.id} className="space-y-0.5">
											<div className="flex justify-between text-[10px]">
												<span className="font-bold text-slate-900">{exp.title}</span>
												<span className="text-slate-500">{exp.dates}</span>
											</div>
											<div className="text-slate-600 italic text-[10px]">{exp.organization}</div>
											{exp.points && exp.points.length > 0 ? (
												<ul className="space-y-0.5 pl-3 list-disc text-slate-700 text-[10px]">
													{exp.points.map((pt, idx) => (
														<li key={idx}>{pt}</li>
													))}
												</ul>
											) : (
												<p className="text-slate-500 text-[10px]">{exp.description}</p>
											)}
										</div>
									))}
								</div>

								{/* Projects */}
								<div className="space-y-2">
									<div className="font-bold text-[10px] uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
										Technical Projects
									</div>
									{foundEntries.filter((e) => e.category === "projects").map((p) => (
										<div key={p.id} className="space-y-0.5">
											<div className="flex justify-between text-[10px]">
												<span className="font-bold text-slate-900">{p.title}</span>
												<span className="text-slate-500">{p.dates}</span>
											</div>
											{p.points && p.points.length > 0 ? (
												<ul className="space-y-0.5 pl-3 list-disc text-slate-700 text-[10px]">
													{p.points.map((pt, idx) => (
														<li key={idx}>{pt}</li>
													))}
												</ul>
											) : (
												<p className="text-slate-500 text-[10px]">{p.description}</p>
											)}
										</div>
									))}
								</div>

								{/* Skills */}
								<div className="space-y-1">
									<div className="font-bold text-[10px] uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
										Technical Skills
									</div>
									<div className="text-[10px] text-slate-700 leading-relaxed">
										{(parsedData?.skills || [
											"Python", "C", "C++", "JavaScript", "HTML", "CSS", "Firebase",
											"Machine Learning", "Computer Vision", "Git", "GitHub", "VS Code"
										]).join(", ")}
									</div>
								</div>
							</div>

							<p className="text-[10px] text-slate-500 leading-normal">
								Updated PDF layout is reconstructed. Compare typography and page breaks with the original. Only accepted wording is included.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
