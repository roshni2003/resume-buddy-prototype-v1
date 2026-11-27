import { toast } from "sonner";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	CheckCircle,
	Circle,
	Compass,
	Edit3,
	FileText,
	Mic,
	Share2,
	Sparkles,
	SlidersHorizontal,
	ExternalLink,
	GraduationCap,
	Wrench,
	Briefcase,
	Camera,
	Upload,
	Trash2,
	User,
	Eye,
	Palette,
	Download,
} from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { defaultResumeData } from "@/schema/resume/data";
import { api } from "@/utils/api";
import { slugify } from "@/utils/string";
import { cn } from "@/utils/style";
import {
	isValidEmail,
	isValidOptionalPhone,
	getEmailValidationError,
	getPhoneValidationError,
	getTextValidationError,
	getNameValidationError,
	getCharacterOnlyValidationError,
	sanitizeToCharactersOnly,
	getDatePeriodValidationError,
	getScoreValidationError,
} from "@/utils/validation";

const searchSchema = z.object({
	step: z.coerce.number().optional().default(1),
	section: z.string().optional().default("contact"),
});

const TEMPLATE_STYLES: Record<string, { borderTop: string; roleColor: string; accentBg: string }> = {
	azurill: { borderTop: "border-t-4 border-t-blue-500", roleColor: "text-blue-600", accentBg: "bg-blue-50" },
	bronzor: { borderTop: "border-t-4 border-t-slate-700", roleColor: "text-slate-700", accentBg: "bg-slate-50" },
	chikorita: { borderTop: "border-t-4 border-t-emerald-600", roleColor: "text-emerald-700", accentBg: "bg-emerald-50" },
	ditgar: { borderTop: "border-t-4 border-t-sky-600", roleColor: "text-sky-700", accentBg: "bg-sky-50" },
	ditto: { borderTop: "border-t-4 border-t-pink-500", roleColor: "text-pink-600", accentBg: "bg-pink-50" },
	gengar: { borderTop: "border-t-4 border-t-purple-600", roleColor: "text-purple-700", accentBg: "bg-purple-50" },
	glalie: { borderTop: "border-t-4 border-t-slate-600", roleColor: "text-slate-700", accentBg: "bg-slate-50" },
	kakuna: { borderTop: "border-t-4 border-t-amber-500", roleColor: "text-amber-700", accentBg: "bg-amber-50" },
	lapras: { borderTop: "border-t-4 border-t-indigo-700", roleColor: "text-indigo-800", accentBg: "bg-indigo-50" },
	leafish: { borderTop: "border-t-4 border-t-lime-600", roleColor: "text-lime-700", accentBg: "bg-lime-50" },
	onyx: { borderTop: "border-t-4 border-t-rose-600", roleColor: "text-rose-700", accentBg: "bg-rose-50" },
	pikachu: { borderTop: "border-t-4 border-t-yellow-500", roleColor: "text-yellow-700", accentBg: "bg-yellow-50" },
	rhyhorn: { borderTop: "border-t-4 border-t-stone-600", roleColor: "text-stone-700", accentBg: "bg-stone-50" },
};

const ALL_MANUAL_TEMPLATES = [
	{ name: "Azurill", color: "bg-blue-500", desc: "Two-column · Creative" },
	{ name: "Bronzor", color: "bg-slate-400", desc: "Classic corporate" },
	{ name: "Chikorita", color: "bg-teal-500", desc: "Creative fresh" },
	{ name: "Ditgar", color: "bg-sky-500", desc: "Modern developer" },
	{ name: "Ditto", color: "bg-pink-500", desc: "ATS minimal" },
	{ name: "Gengar", color: "bg-purple-600", desc: "Bold tech accent" },
	{ name: "Glalie", color: "bg-slate-500", desc: "Clean executive" },
	{ name: "Kakuna", color: "bg-amber-500", desc: "Single column modern" },
	{ name: "Lapras", color: "bg-blue-600", desc: "Creative banner" },
	{ name: "Leafish", color: "bg-lime-600", desc: "Fresh nature" },
	{ name: "Onyx", color: "bg-zinc-700", desc: "Sharp minimalist" },
	{ name: "Pikachu", color: "bg-yellow-500", desc: "Dynamic accented" },
	{ name: "Rhyhorn", color: "bg-stone-600", desc: "Structured engineer" },
];

export const Route = createFileRoute("/dashboard/resumes/manual-builder")({
	component: ManualBuilderRoute,
	validateSearch: zodValidator(searchSchema),
});

export function ManualBuilderRoute() {
	const navigate = useNavigate();
	const search = Route.useSearch();

	const [activeTab, setActiveTab] = useState<"plan" | "stories" | "details" | "export">("details");
	const [step, setStep] = useState<number>(search.step || 1);

	// Sync step from search params if passed (e.g. clicking "Add your education details")
	useEffect(() => {
		if (search.step) {
			setStep(Number(search.step));
		}
	}, [search.step]);

	// Default empty manual builder draft (users start with clean inputs)
	const defaultManualDraft = {
		fullName: "",
		targetRole: "",
		email: "",
		phone: "",
		location: "",
		school: "",
		degree: "",
		eduYear: "",
		eduScore: "",
		skills: "",
		project: "",
		statement: "",
		pictureUrl: "",
		showPicture: true,
		pictureShape: "circle" as "circle" | "rounded" | "square",
		selectedTemplate: "Azurill",
	};

	const getInitialManualState = () => {
		return defaultManualDraft;
	};

	const initialDraft = getInitialManualState();
	const [createdResumeId, setCreatedResumeId] = useState<string | null>(null);

	// Form values
	const [fullName, setFullName] = useState(initialDraft.fullName);
	const [targetRole, setTargetRole] = useState(initialDraft.targetRole);
	const [email, setEmail] = useState(initialDraft.email);
	const [phone, setPhone] = useState(initialDraft.phone);
	const [location, setLocation] = useState(initialDraft.location);

	// Education Form Values
	const [school, setSchool] = useState(initialDraft.school);
	const [degree, setDegree] = useState(initialDraft.degree);
	const [eduYear, setEduYear] = useState(initialDraft.eduYear);
	const [eduScore, setEduScore] = useState(initialDraft.eduScore);

	// Skills
	const [skills, setSkills] = useState(initialDraft.skills);

	// Experience
	const [project, setProject] = useState(initialDraft.project);
	const [statement, setStatement] = useState(initialDraft.statement);

	// Profile Picture & Review Settings
	const [pictureUrl, setPictureUrl] = useState(initialDraft.pictureUrl || "");
	const [showPicture, setShowPicture] = useState(initialDraft.showPicture !== false);
	const [pictureShape, setPictureShape] = useState<"circle" | "rounded" | "square">(
		initialDraft.pictureShape || "circle"
	);
	const [selectedTemplate, setSelectedTemplate] = useState(
		initialDraft.selectedTemplate || "Azurill"
	);
	const [savedToLibrary, setSavedToLibrary] = useState(false);

	// Sync template if changed via header gallery modal
	useEffect(() => {
		const handleTemplateChange = () => {
			try {
				const draft = localStorage.getItem("resume_buddy_manual_draft");
				if (draft) {
					const parsed = JSON.parse(draft);
					if (parsed.selectedTemplate) {
						setSelectedTemplate(parsed.selectedTemplate);
					}
				}
			} catch {
				// ignore
			}
		};

		window.addEventListener("resume_template_changed", handleTemplateChange);

		const handleManualTab = (e: any) => {
			if (e.detail?.tab) {
				setActiveTab(e.detail.tab);
			}
		};
		window.addEventListener("resume_manual_tab", handleManualTab);

		return () => {
			window.removeEventListener("resume_template_changed", handleTemplateChange);
			window.removeEventListener("resume_manual_tab", handleManualTab);
		};
	}, []);

	// Autosave manual builder values to localStorage only when user has entered meaningful data
	useEffect(() => {
		try {
			const hasAnyData =
				Boolean(fullName.trim()) ||
				Boolean(targetRole.trim()) ||
				Boolean(email.trim()) ||
				Boolean(phone.trim()) ||
				Boolean(location.trim()) ||
				Boolean(school.trim()) ||
				Boolean(degree.trim()) ||
				Boolean(eduYear.trim()) ||
				Boolean(eduScore.trim()) ||
				Boolean(skills.trim()) ||
				Boolean(project.trim()) ||
				Boolean(statement.trim());

			if (hasAnyData || Boolean(pictureUrl)) {
				const payload = {
					fullName,
					targetRole,
					email,
					phone,
					location,
					school,
					degree,
					eduYear,
					eduScore,
					skills,
					project,
					statement,
					step,
					pictureUrl,
					showPicture,
					pictureShape,
					selectedTemplate,
				};
				localStorage.setItem("resume_buddy_manual_draft", JSON.stringify(payload));

				const stepTitlesMap: Record<number, string> = {
					1: "Contact details and target role",
					2: "Education details",
					3: "Skills and competencies",
					4: "Experience and achievements",
				};
				localStorage.setItem(
					"resume_buddy_last_worked",
					JSON.stringify({
						type: "manual-builder",
						title: stepTitlesMap[step] ? `Complete ${stepTitlesMap[step].toLowerCase()}` : "Continue building your resume",
						path: "/dashboard/resumes/manual-builder",
						search: { step },
						updatedAt: new Date().toISOString(),
					})
				);
			}
		} catch {
			// ignore
		}
	}, [
		fullName,
		targetRole,
		email,
		phone,
		location,
		school,
		degree,
		eduYear,
		eduScore,
		skills,
		project,
		statement,
		step,
		pictureUrl,
		showPicture,
		pictureShape,
		selectedTemplate,
	]);

	// Photo file upload handler
	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			toast.error("Please upload an image file (PNG, JPG, WebP)");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image file size should be less than 5MB");
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				setPictureUrl(reader.result);
				setShowPicture(true);
				toast.success("Profile photo updated!");
			}
		};
		reader.readAsDataURL(file);
	};

	const handleResetDraft = () => {
		setFullName("");
		setTargetRole("");
		setEmail("");
		setPhone("");
		setLocation("");
		setSchool("");
		setDegree("");
		setEduYear("");
		setEduScore("");
		setSkills("");
		setProject("");
		setStatement("");
		setStep(1);
		try {
			localStorage.removeItem("resume_buddy_manual_draft");
			localStorage.removeItem("resume_buddy_last_worked");
		} catch {
			// ignore
		}
	};

	// Helper to mark checklist tasks as completed in localStorage
	const markChecklistCompleted = (itemId: string) => {
		try {
			const saved = localStorage.getItem("resume_buddy_checklist");
			let list = saved ? JSON.parse(saved) : [];
			const exists = list.some((i: any) => i.id === itemId);
			if (exists) {
				list = list.map((i: any) => (i.id === itemId ? { ...i, status: "Done" } : i));
			} else {
				list.push({ id: itemId, status: "Done" });
			}
			localStorage.setItem("resume_buddy_checklist", JSON.stringify(list));
		} catch {
			// ignore
		}
	};

	const handleUseSample = () => {
		setFullName("Roshni Jha");
		setTargetRole("Frontend Developer");
		setEmail("roshni.jha@example.com");
		setPhone("+91 98765 43210");
		setLocation("Bangalore, India");
	};

	const handleUseSampleEdu = () => {
		setSchool("Indian Institute of Technology, Bombay");
		setDegree("Bachelor of Technology in Computer Science");
		setEduYear("2020 - 2024");
		setEduScore("8.8 CGPA");
	};

	const handleUseSampleSkills = () => {
		setSkills("React, TypeScript, TailwindCSS, Next.js, GraphQL, Git, Node.js");
	};

	const handleContinue = () => {
		if (step === 1) {
			const nameErr = getNameValidationError(fullName, true) || getTextValidationError(fullName, "Full name", 2, true);
			if (nameErr) {
				toast.error(nameErr);
				return;
			}
			if (email && !isValidEmail(email)) {
				toast.error("Please enter a valid email address.");
				return;
			}
			if (phone && !isValidOptionalPhone(phone)) {
				toast.error("Please enter a valid phone number.");
				return;
			}
			markChecklistCompleted("target_role");
		}
		if (step === 2) {
			const schoolErr = getCharacterOnlyValidationError(school, "School / University", 2, true) || getTextValidationError(school, "School / University", 2, true);
			if (schoolErr) {
				toast.error(schoolErr);
				return;
			}
			const degreeErr = getCharacterOnlyValidationError(degree, "Degree & Major", 2, true) || getTextValidationError(degree, "Degree & Major", 2, true);
			if (degreeErr) {
				toast.error(degreeErr);
				return;
			}
			const yearErr = getDatePeriodValidationError(eduYear, false);
			if (yearErr) {
				toast.error(yearErr);
				return;
			}
			const scoreErr = getScoreValidationError(eduScore);
			if (scoreErr) {
				toast.error(scoreErr);
				return;
			}
			markChecklistCompleted("education");
		}
		if (step === 3) {
			const skillsErr = getTextValidationError(skills, "Skills", 2, true);
			if (skillsErr) {
				toast.error(skillsErr);
				return;
			}
			markChecklistCompleted("skills");
		}
		if (step === 4) {
			const projErr = getCharacterOnlyValidationError(project, "Project or Company Name", 2, true) || getTextValidationError(project, "Project or Company Name", 2, true);
			if (projErr) {
				toast.error(projErr);
				return;
			}
			const statementErr = getTextValidationError(statement, "Description & Key Contributions", 5, true);
			if (statementErr) {
				toast.error(statementErr);
				return;
			}
		}

		if (step < 4) {
			setStep(step + 1);
		} else {
			markChecklistCompleted("experience");
			setActiveTab("export");
		}
	};

	const handleOpenEditor = async () => {
		const resumeName = fullName ? `${fullName}'s Resume - ${targetRole || "Manual"}` : `${targetRole || "My"} Resume`;
		const resumeDataPayload = {
				basics: {
					name: fullName,
					headline: targetRole,
					email: email,
					phone: phone,
					location: location,
					website: { url: "", label: "" },
					customFields: [],
				},
				summary: {
					title: "Summary",
					columns: 1,
					hidden: false,
					content: `<p>${statement}</p>`,
				},
				sections: {
					experience: {
						title: "Experience",
						columns: 1,
						hidden: !(project || statement),
						items: (project || statement)
							? [
								{
									id: "exp-1",
									hidden: false,
									company: project || "",
									position: targetRole || "",
									period: "",
									location: location || "",
									website: { url: "", label: "" },
									description: statement ? `<p>• ${statement}</p>` : "",
								},
							]
							: [],
					},
					education: {
						title: "Education",
						columns: 1,
						hidden: !school,
						items: school
							? [
								{
									id: "edu-1",
									hidden: false,
									institution: school,
									degree: degree || "",
									area: "",
									period: eduYear || "",
									score: eduScore || "",
									website: { url: "", label: "" },
									description: "",
								},
							]
							: [],
					},
					skills: {
						title: "Skills",
						columns: 1,
						hidden: false,
						items: skills
							? skills.split(",").map((s: string, idx: number) => ({
								id: `skill-${idx}`,
								hidden: false,
								name: s.trim(),
								icon: "",
								proficiency: "",
								level: 1,
								keywords: [] as string[],
							}))
							: [],
					},
				} as any,
				metadata: {
					...defaultResumeData.metadata,
					template: (selectedTemplate.toLowerCase() || "azurill") as any,
					layout: {
						sidebarWidth: 30,
						pages: [
							{
								fullWidth: ["bronzor", "kakuna", "lapras", "onyx", "rhyhorn"].includes(selectedTemplate.toLowerCase()),
								main: ["bronzor", "kakuna", "lapras", "onyx", "rhyhorn"].includes(selectedTemplate.toLowerCase())
									? ["summary", "education", "experience", "skills"]
									: ["summary", "education", "experience"],
								sidebar: ["bronzor", "kakuna", "lapras", "onyx", "rhyhorn"].includes(selectedTemplate.toLowerCase())
									? []
									: ["profiles", "skills"],
							},
						],
					},
				},
		};

		try {
			if (createdResumeId) {
				await api.updateResume(createdResumeId, {
					name: resumeName,
					data: resumeDataPayload as any,
				});
			} else {
				const newResume = await api.createResume({
					name: resumeName,
					slug: `${slugify(resumeName)}-${Date.now().toString(36)}`,
					withSampleData: false,
					data: resumeDataPayload as any,
				});
				setCreatedResumeId(newResume.id);
			}
			localStorage.removeItem("resume_buddy_manual_draft");
			setSavedToLibrary(true);
			toast.success("Resume saved successfully! You can export or continue tweaking right here.");
		} catch (err: any) {
			toast.error("Failed to save resume: " + (err.message || "Unknown error"));
		}
	};

	const stepTitles: Record<number, { category: string; title: string; subtitle: string }> = {
		1: {
			category: "BUILD A RESUME · DETAILS",
			title: "Contact details and target role",
			subtitle: "Start with your name and the role you're applying for. Contact fields are optional in this demo.",
		},
		2: {
			category: "BUILD A RESUME · EDUCATION",
			title: "Add your education details",
			subtitle: "Tell recruiters about your educational background, university, and graduation year.",
		},
		3: {
			category: "BUILD A RESUME · SKILLS",
			title: "Add your core skills",
			subtitle: "List technologies, tools, and technical competencies relevant to your target role.",
		},
		4: {
			category: "BUILD A RESUME · WORK & PROJECTS",
			title: "Add experience or project",
			subtitle: "Highlight a notable project or work experience with your contribution.",
		},
	};

	return (
		<div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] w-full flex-1 text-slate-100">
			{/* Center: Main Form & Questions */}
			<main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 overflow-y-auto">
				{/* Top Header Bar: Navigation, Sections Stepper & Template Option */}
				<div className="space-y-4 mb-6 pb-5 border-b border-slate-800/80">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => navigate({ to: "/dashboard/resumes" as any })}
								className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
							>
								<ArrowLeft className="size-4" />
								<span>Dashboard</span>
							</button>

							<span className="text-slate-600">|</span>

							{/* Template Selector in Header */}
							<div className="flex items-center gap-1.5">
								<span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
									Template:
								</span>
								<div className="inline-flex items-center rounded-xl border border-slate-800 bg-[#09101d] p-1 gap-1">
									{[
										{ name: "Azurill", dot: "bg-emerald-500" },
										{ name: "Bronzor", dot: "bg-slate-300" },
										{ name: "Chikorita", dot: "bg-teal-400" },
										{ name: "Gengar", dot: "bg-purple-500" },
									].map((tmpl) => (
										<button
											key={tmpl.name}
											type="button"
											onClick={() => setSelectedTemplate(tmpl.name)}
											className={cn(
												"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
												selectedTemplate === tmpl.name
													? "bg-slate-800 text-white shadow-sm ring-1 ring-emerald-500/50"
													: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
											)}
										>
											<span className={cn("size-2 rounded-full", tmpl.dot)} />
											<span>{tmpl.name}</span>
										</button>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={handleResetDraft}
								className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
							>
								Clear form
							</button>
							<span className="text-slate-500 text-xs">Open-session draft</span>
						</div>
					</div>

					{/* Sections Step Bar Moved To Header */}
					<div className="flex items-center gap-2 overflow-x-auto pt-1">
						<span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0 mr-1">
							Sections:
						</span>
						{[
							{ num: 1, label: "Contact & Role" },
							{ num: 2, label: "Education" },
							{ num: 3, label: "Skills" },
							{ num: 4, label: "Experience" },
						].map((s) => (
							<button
								key={s.num}
								type="button"
								onClick={() => {
									setActiveTab("details");
									setStep(s.num);
								}}
								className={cn(
									"flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 border",
									step === s.num && activeTab === "details"
										? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-slate-200"
								)}
							>
								<span className="size-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold text-slate-300">
									{s.num}
								</span>
								<span>{s.label}</span>
							</button>
						))}

						<button
							type="button"
							onClick={() => setActiveTab("export")}
							className={cn(
								"flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 border",
								activeTab === "export"
									? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
									: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-slate-200"
							)}
						>
							<CheckCircle className="size-3.5 text-emerald-400" />
							<span>Review & Export</span>
						</button>
					</div>
				</div>

				{/* Progress Indicator */}
				<div className="space-y-2 mb-8">
					<div className="flex items-center justify-between text-xs font-semibold">
						<span className="text-emerald-400">
							{activeTab === "export"
								? "Step 5 of 5 · Final Preview"
								: `Step ${step} of 4 · ${stepTitles[step]?.title || "Details"}`}
						</span>
						<span className="text-slate-400">{activeTab === "export" ? "100%" : `${step * 25}%`}</span>
					</div>
					<div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 1 ? "w-1/4" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 2 ? "w-1/4" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 3 ? "w-1/4" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 4 ? "w-1/4" : "w-0")} />
					</div>
				</div>

				{
					activeTab === "export" ? (
						/* Review & In-Page Editor View (Decoupled from old editor) */
						<div className="space-y-6">
							<div>
								<div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
									IN-PAGE RESUME EDITOR
								</div>
								<h1 className="text-3xl font-extrabold text-white mb-2">Final Review & Styling</h1>
								<p className="text-sm text-slate-400">
									Edit your resume content, profile picture settings, and visual layout directly on this screen. All changes reflect instantly in the live 50% preview on the right.
								</p>
							</div>

							{/* Template Styling Cards */}
							<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-5 space-y-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Palette className="size-4 text-emerald-400" />
										<h3 className="text-sm font-bold text-white">Visual Template Style</h3>
									</div>
									<span className="text-xs text-emerald-400 font-semibold">{selectedTemplate}</span>
								</div>

								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1">
									{ALL_MANUAL_TEMPLATES.map((tmpl) => {
										const isSelected = selectedTemplate.toLowerCase() === tmpl.name.toLowerCase();
										return (
											<button
												key={tmpl.name}
												type="button"
												onClick={() => {
													setSelectedTemplate(tmpl.name);
													try {
														const manualDraft = localStorage.getItem("resume_buddy_manual_draft");
														const manualParsed = manualDraft ? JSON.parse(manualDraft) : {};
														manualParsed.selectedTemplate = tmpl.name;
														localStorage.setItem("resume_buddy_manual_draft", JSON.stringify(manualParsed));

														const storyDraft = localStorage.getItem("resume_buddy_guided_story_draft");
														const storyParsed = storyDraft ? JSON.parse(storyDraft) : {};
														storyParsed.selectedTemplate = tmpl.name;
														localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(storyParsed));

														window.dispatchEvent(new Event("resume_template_changed"));
													} catch {
														// ignore
													}
												}}
												className={cn(
													"rounded-xl border p-3 bg-slate-900/60 cursor-pointer transition-all text-left",
													isSelected
														? "border-emerald-500 bg-[#071b17] ring-1 ring-emerald-500/40"
														: "border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
												)}
											>
												<div className="h-7 rounded-lg bg-slate-800/80 mb-2 flex items-center px-2">
													<div className={cn("h-2.5 w-10 rounded-full", tmpl.color)} />
												</div>
												<div className="text-xs font-bold text-slate-200">{tmpl.name}</div>
												<div className="text-[10px] text-slate-400">{tmpl.desc}</div>
											</button>
										);
									})}
								</div>
							</div>

							{/* Picture Settings (Migrated from Old Editor) */}
							<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-5 space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Camera className="size-4 text-emerald-400" />
										<h3 className="text-sm font-bold text-white">Profile Picture Settings</h3>
									</div>
									<label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
										<input
											type="checkbox"
											checked={showPicture}
											onChange={(e) => setShowPicture(e.target.checked)}
											className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
										/>
										<span>Show photo on resume</span>
									</label>
								</div>

								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
									{/* Thumbnail or Placeholder */}
									<div className="relative group shrink-0">
										<div
											className={cn(
												"size-20 border-2 border-dashed border-slate-700 overflow-hidden bg-slate-900 flex items-center justify-center text-slate-400 shadow-md",
												pictureShape === "circle" && "rounded-full",
												pictureShape === "rounded" && "rounded-2xl",
												pictureShape === "square" && "rounded-md"
											)}
										>
											{pictureUrl ? (
												<img
													src={pictureUrl}
													alt="Profile"
													className="size-full object-cover"
												/>
											) : (
												<User className="size-8 text-slate-600" />
											)}
										</div>
									</div>

									{/* Upload & controls */}
									<div className="space-y-2.5 flex-1">
										<div className="flex flex-wrap items-center gap-2">
											<label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer">
												<Upload className="size-3.5 text-emerald-400" />
												<span>{pictureUrl ? "Change photo" : "Upload photo"}</span>
												<input
													type="file"
													accept="image/*"
													onChange={handlePhotoUpload}
													className="hidden"
												/>
											</label>

											{pictureUrl && (
												<button
													type="button"
													onClick={() => {
														setPictureUrl("");
														toast.success("Photo removed");
													}}
													className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
												>
													<Trash2 className="size-3.5" />
													<span>Remove</span>
												</button>
											)}
										</div>

										{/* Shape Controls */}
										<div className="flex items-center gap-2 text-xs">
											<span className="text-slate-400">Frame shape:</span>
											<div className="inline-flex rounded-lg border border-slate-800 bg-slate-900/90 p-0.5">
												{(["circle", "rounded", "square"] as const).map((shape) => (
													<button
														key={shape}
														type="button"
														onClick={() => setPictureShape(shape)}
														className={cn(
															"px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors cursor-pointer",
															pictureShape === shape
																? "bg-emerald-500 text-slate-950"
																: "text-slate-400 hover:text-slate-200"
														)}
													>
														{shape}
													</button>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* In-Page Content Quick Editing */}
							<div className="space-y-4 rounded-2xl border border-slate-800 bg-[#09101d] p-5">
								<div className="flex items-center justify-between pb-1">
									<h3 className="text-sm font-bold text-white flex items-center gap-2">
										<Edit3 className="size-4 text-emerald-400" />
										<span>Edit Details Live</span>
									</h3>
									<span className="text-xs text-slate-400">Live preview synchronized</span>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-400 mb-1">Full name</label>
										<input
											type="text"
											value={fullName}
											onChange={(e) => {
												const filtered = e.target.value.replace(/[^\p{L}\s'.-]/gu, "");
												setFullName(filtered);
											}}
											className={`w-full rounded-xl border ${fullName && getNameValidationError(fullName) ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:outline-none`}
											placeholder="e.g. Roshni Jha"
										/>
										{fullName && getNameValidationError(fullName) && (
											<p className="text-[11px] text-rose-400 mt-1">{getNameValidationError(fullName)}</p>
										)}
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-400 mb-1">Target role</label>
										<input
											type="text"
											value={targetRole}
											onChange={(e) => setTargetRole(sanitizeToCharactersOnly(e.target.value, true))}
											className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. Frontend Developer"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className={`w-full rounded-xl border ${email && getEmailValidationError(email) ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:outline-none`}
											placeholder="e.g. roshni@example.com"
										/>
										{email && getEmailValidationError(email) && (
											<p className="text-xs text-rose-400 mt-1">{getEmailValidationError(email)}</p>
										)}
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-400 mb-1">Phone</label>
										<input
											type="text"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className={`w-full rounded-xl border ${phone && getPhoneValidationError(phone) ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:outline-none`}
											placeholder="e.g. +91 98765 43210"
										/>
										{phone && getPhoneValidationError(phone) && (
											<p className="text-xs text-rose-400 mt-1">{getPhoneValidationError(phone)}</p>
										)}
									</div>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-400 mb-1">Education</label>
									<input
										type="text"
										value={school}
										onChange={(e) => setSchool(sanitizeToCharactersOnly(e.target.value, true))}
										className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
										placeholder="e.g. Indian Institute of Technology"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-400 mb-1">Skills (comma separated)</label>
									<input
										type="text"
										value={skills}
										onChange={(e) => setSkills(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
										placeholder="e.g. React, TypeScript, TailwindCSS"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-400 mb-1">Experience Contribution</label>
									<textarea
										rows={2}
										value={statement}
										onChange={(e) => setStatement(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
										placeholder="Key achievement or contribution statement..."
									/>
								</div>

								{/* Actions: Save Resume in place & PDF Export */}
								<div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-800">
									<button
										type="button"
										onClick={handleOpenEditor}
										className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
									>
										<Check className="size-4" />
										<span>{savedToLibrary ? "Saved to Library!" : "Save Resume in Library"}</span>
									</button>
									<button
										type="button"
										onClick={() => window.print()}
										className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-sm transition-colors cursor-pointer"
									>
										<Download className="size-4" />
										<span>Export / Print PDF</span>
									</button>
								</div>
							</div>
						</div>
					) : (
						/* Step 1 - 4 Forms */
						<div className="space-y-6">
							<div>
								<div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
									{stepTitles[step]?.category}
								</div>
								<h1 className="text-3xl font-extrabold text-white mb-2">
									{stepTitles[step]?.title}
								</h1>
								<p className="text-sm text-slate-400">
									{stepTitles[step]?.subtitle}
								</p>
							</div>

							{/* STEP 1: Contact Details */}
							{step === 1 && (
								<div className="space-y-5">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">Full name</label>
										<input
											type="text"
											value={fullName}
											onChange={(e) => {
												const filtered = e.target.value.replace(/[^\p{L}\s'.-]/gu, "");
												setFullName(filtered);
											}}
											className={`w-full rounded-xl border ${fullName && getNameValidationError(fullName) ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none`}
											placeholder="e.g. Roshni Jha"
										/>
										{fullName && getNameValidationError(fullName) && (
											<p className="text-[11px] text-rose-400 mt-1">{getNameValidationError(fullName)}</p>
										)}
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">Target role</label>
										<input
											type="text"
											value={targetRole}
											onChange={(e) => setTargetRole(sanitizeToCharactersOnly(e.target.value, true))}
											className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. Frontend Developer"
										/>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">Email (optional)</label>
											<input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className={`w-full rounded-xl border ${email && getEmailValidationError(email) ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none`}
												placeholder="e.g. roshni.jha@example.com"
											/>
											{email && getEmailValidationError(email) && (
												<p className="text-xs text-rose-400 mt-1">{getEmailValidationError(email)}</p>
											)}
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone (optional)</label>
											<input
												type="tel"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												className={`w-full rounded-xl border ${phone && getPhoneValidationError(phone) ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none`}
												placeholder="e.g. +91 98765 43210"
											/>
											{phone && getPhoneValidationError(phone) && (
												<p className="text-xs text-rose-400 mt-1">{getPhoneValidationError(phone)}</p>
											)}
										</div>
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">Location (optional)</label>
										<input
											type="text"
											value={location}
											onChange={(e) => setLocation(e.target.value)}
											className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. Bangalore, India"
										/>
									</div>

									<div className="flex items-center gap-3 pt-2">
										<button
											type="button"
											onClick={handleUseSample}
											className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
										>
											Use sample answer
										</button>
										<button
											type="button"
											onClick={handleContinue}
											className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
										>
											<span>Next: Education</span>
											<ArrowRight className="size-4" />
										</button>
									</div>
								</div>
							)}

							{/* STEP 2: Education Details (Fixes user issue) */}
							{step === 2 && (
								<div className="space-y-5">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											University / College / School <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={school}
											onChange={(e) => setSchool(sanitizeToCharactersOnly(e.target.value, true))}
											className={`w-full rounded-xl border ${school && (getCharacterOnlyValidationError(school, "School", 2, true) || getTextValidationError(school, "School", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none transition-colors`}
											placeholder="e.g. Indian Institute of Technology, Bombay"
										/>
										{school && (getCharacterOnlyValidationError(school, "School", 2, true) || getTextValidationError(school, "School", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(school, "School", 2, true) || getTextValidationError(school, "School", 2, true)}</p>
										)}
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Degree & Major <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={degree}
											onChange={(e) => setDegree(sanitizeToCharactersOnly(e.target.value, true))}
											className={`w-full rounded-xl border ${degree && (getCharacterOnlyValidationError(degree, "Degree", 2, true) || getTextValidationError(degree, "Degree", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none transition-colors`}
											placeholder="e.g. B.Tech in Computer Science"
										/>
										{degree && (getCharacterOnlyValidationError(degree, "Degree", 2, true) || getTextValidationError(degree, "Degree", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(degree, "Degree", 2, true) || getTextValidationError(degree, "Degree", 2, true)}</p>
										)}
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Period / Year</label>
											<input
												type="text"
												value={eduYear}
												onChange={(e) => setEduYear(e.target.value)}
												className={`w-full rounded-xl border ${eduYear && getDatePeriodValidationError(eduYear, false) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none transition-colors`}
												placeholder="e.g. 2020 - 2024"
											/>
											{eduYear && getDatePeriodValidationError(eduYear, false) && (
												<p className="text-xs text-rose-400 mt-1">{getDatePeriodValidationError(eduYear, false)}</p>
											)}
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">CGPA or Percentage (optional)</label>
											<input
												type="text"
												value={eduScore}
												onChange={(e) => setEduScore(e.target.value)}
												className={`w-full rounded-xl border ${eduScore && getScoreValidationError(eduScore) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none transition-colors`}
												placeholder="e.g. 8.8 CGPA"
											/>
											{eduScore && getScoreValidationError(eduScore) && (
												<p className="text-xs text-rose-400 mt-1">{getScoreValidationError(eduScore)}</p>
											)}
										</div>
									</div>

									<div className="flex items-center gap-3 pt-2">
										<button
											type="button"
											onClick={handleUseSampleEdu}
											className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
										>
											Use sample education
										</button>
										<button
											type="button"
											onClick={handleContinue}
											className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
										>
											<span>Next: Skills</span>
											<ArrowRight className="size-4" />
										</button>
									</div>
								</div>
							)}

							{/* STEP 3: Skills Details */}
							{step === 3 && (
								<div className="space-y-5">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Core Technical & Professional Skills <span className="text-emerald-400 font-bold">*</span>
										</label>
										<textarea
											rows={4}
											value={skills}
											onChange={(e) => setSkills(e.target.value)}
											className={`w-full rounded-xl border ${skills && getTextValidationError(skills, "Skills", 2, true) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none resize-none transition-colors`}
											placeholder="e.g. React, TypeScript, TailwindCSS, Next.js, Redux, Node.js"
										/>
										{skills && getTextValidationError(skills, "Skills", 2, true) && (
											<p className="text-xs text-rose-400 mt-1">{getTextValidationError(skills, "Skills", 2, true)}</p>
										)}
										<p className="text-[11px] text-slate-400 mt-1">Separate skills with commas.</p>
									</div>

									<div className="flex items-center gap-3 pt-2">
										<button
											type="button"
											onClick={handleUseSampleSkills}
											className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
										>
											Use sample skills
										</button>
										<button
											type="button"
											onClick={handleContinue}
											className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
										>
											<span>Next: Experience</span>
											<ArrowRight className="size-4" />
										</button>
									</div>
								</div>
							)}

							{/* STEP 4: Experience / Project */}
							{step === 4 && (
								<div className="space-y-5">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Project or Company Name <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={project}
											onChange={(e) => setProject(sanitizeToCharactersOnly(e.target.value, true))}
											className={`w-full rounded-xl border ${project && (getCharacterOnlyValidationError(project, "Project or Company", 2, true) || getTextValidationError(project, "Project or Company", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none transition-colors`}
											placeholder="e.g. Vipasna Website"
										/>
										{project && (getCharacterOnlyValidationError(project, "Project or Company", 2, true) || getTextValidationError(project, "Project or Company", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(project, "Project or Company", 2, true) || getTextValidationError(project, "Project or Company", 2, true)}</p>
										)}
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Description & Key Contributions <span className="text-emerald-400 font-bold">*</span>
										</label>
										<textarea
											rows={4}
											value={statement}
											onChange={(e) => setStatement(e.target.value)}
											className={`w-full rounded-xl border ${statement && getTextValidationError(statement, "Description", 5, true) ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"} bg-[#09101d] px-4 py-3 text-sm text-white focus:outline-none resize-none transition-colors`}
											placeholder="e.g. Built responsive pages using React, improved UI performance, and worked with cross-functional teams."
										/>
										{statement && getTextValidationError(statement, "Description", 5, true) && (
											<p className="text-xs text-rose-400 mt-1">{getTextValidationError(statement, "Description", 5, true)}</p>
										)}
									</div>

									<div className="flex items-center gap-3 pt-2">
										<button
											type="button"
											onClick={handleContinue}
											className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
										>
											<span>Review & Finalize</span>
											<ArrowRight className="size-4" />
										</button>
									</div>
								</div>
							)}
						</div>
					)
				}
			</main>

			{/* Right Column: Live Resume Preview (50% screen width on desktop) */}
			<aside className="w-full lg:w-1/2 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-[#060b13] p-6 lg:p-8 shrink-0 flex flex-col justify-between overflow-y-auto">
				<div className="space-y-6 w-full max-w-2xl mx-auto">
					<div className="flex items-center justify-between">
						<span className="text-sm font-bold text-white">Your resume</span>
						<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30">
							DEMO PREVIEW
						</span>
					</div>

					{/* Resume Card Preview Document with dynamic template styling */}
					{(() => {
						const currentStyle = TEMPLATE_STYLES[selectedTemplate.toLowerCase()] || TEMPLATE_STYLES.azurill;
						return (
							<div
								className={cn(
									"rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-900 shadow-xl min-h-[440px] text-xs space-y-4 w-full transition-all relative overflow-hidden",
									currentStyle.borderTop
								)}
							>
								<div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-4">
									<div className="space-y-0.5 flex-1 min-w-0">
										{fullName && <h3 className="text-xl font-bold font-serif text-slate-950">{fullName}</h3>}
										{targetRole && (
											<p className={cn("font-semibold text-[11px]", currentStyle.roleColor)}>
												{targetRole}
											</p>
										)}
										{(email || phone) && (
											<p className="text-slate-500 text-[11px] mt-0.5">{[email, phone].filter(Boolean).join(" · ")}</p>
										)}
									</div>

									{showPicture && pictureUrl && (
										<div
											className={cn(
												"size-14 overflow-hidden border border-slate-200 shadow-sm shrink-0",
												pictureShape === "circle" && "rounded-full",
												pictureShape === "rounded" && "rounded-xl",
												pictureShape === "square" && "rounded-none"
											)}
										>
											<img
												src={pictureUrl}
												alt="Profile avatar"
												className="size-full object-cover"
											/>
										</div>
									)}
								</div>

								{/* Experience */}
								{(project || statement) && (
									<div className="space-y-1">
										<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
											EXPERIENCE
										</div>
										<div>
											{project && <div className="font-semibold text-slate-900">{project}</div>}
											{statement && (
												<p className="text-[11px] text-slate-700 leading-relaxed">
													• {statement}
												</p>
											)}
										</div>
									</div>
								)}

								{/* Education */}
								{school && (
									<div className="space-y-1">
										<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
											EDUCATION
										</div>
										<div>
											<div className="font-semibold text-slate-900">{school}</div>
											{(degree || eduYear) && (
												<div className="text-slate-600 text-[11px]">{[degree, eduYear].filter(Boolean).join(" • ")}</div>
											)}
										</div>
									</div>
								)}

								{/* Skills */}
								{skills && (
									<div className="space-y-1">
										<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
											SKILLS
										</div>
										<p className="text-[11px] text-slate-700">
											{skills}
										</p>
									</div>
								)}
							</div>
						);
					})()}

					<p className="text-xs text-slate-500">All updates reflect live right here.</p>
					<button
						type="button"
						onClick={() => setActiveTab("export")}
						className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left"
					>
						Edit styling & picture settings on this page →
					</button>
				</div>
			</aside>
		</div>
	);
}
