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
} from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { localResumeStore } from "@/utils/local-resumes";
import { cn } from "@/utils/style";

const searchSchema = z.object({
	step: z.coerce.number().optional().default(1),
	section: z.string().optional().default("contact"),
});

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
	};

	const getInitialManualState = () => {
		if (typeof window === "undefined") return defaultManualDraft;
		try {
			const saved = localStorage.getItem("resume_buddy_manual_draft");
			if (saved) {
				return { ...defaultManualDraft, ...JSON.parse(saved) };
			}
		} catch {
			// ignore fallback
		}
		return defaultManualDraft;
	};

	const initialDraft = getInitialManualState();

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

	// Autosave manual builder values to localStorage
	useEffect(() => {
		try {
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
			};
			localStorage.setItem("resume_buddy_manual_draft", JSON.stringify(payload));
		} catch {
			// ignore
		}
	}, [fullName, targetRole, email, phone, location, school, degree, eduYear, eduScore, skills, project, statement, step]);

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
		// Mark completed checklist items corresponding to step
		if (step === 1) markChecklistCompleted("target_role");
		if (step === 2) markChecklistCompleted("education");
		if (step === 3) markChecklistCompleted("skills");

		if (step < 4) {
			setStep(step + 1);
		} else {
			markChecklistCompleted("experience");
			setActiveTab("export");
		}
	};

	const handleOpenEditor = () => {
		// Save to local resume store
		const newResume = localResumeStore.create({
			name: `${fullName}'s Resume - ${targetRole || "Manual"}`,
			data: {
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
						hidden: false,
						items: [
							{
								id: "exp-1",
								hidden: false,
								company: project || "Project",
								position: targetRole || "Developer",
								period: "2023 - Present",
								location: location || "Remote",
								website: { url: "", label: "" },
								description: `<p>• ${statement}</p>`,
							},
						],
					},
					education: {
						title: "Education",
						columns: 1,
						hidden: false,
						items: school
							? [
									{
										id: "edu-1",
										hidden: false,
										institution: school,
										degree: degree || "Bachelor of Technology",
										area: "Computer Science",
										period: eduYear || "2020 - 2024",
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
							? skills.split(",").map((s, idx) => ({
									id: `skill-${idx}`,
									hidden: false,
									name: s.trim(),
									icon: "",
									proficiency: "",
									level: 1,
									keywords: [],
								}))
							: [],
					},
				} as any,
				metadata: {
					template: "azurill",
					layout: {
						sidebarWidth: 30,
						pages: [
							{
								fullWidth: false,
								main: ["summary", "education", "experience"],
								sidebar: ["profiles", "skills"],
							},
						],
					},
					typography: {
						font: { family: "IBM Plex Sans", subsets: ["latin"], variants: ["regular", "700"] },
						lineHeight: 1.5,
						size: 14,
					},
					theme: { background: "#ffffff", text: "#000000", primary: "#10b981" },
					page: { format: "a4" },
				},
			},
		});

		navigate({ to: `/builder/${newResume.id}` as any });
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
		<div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] -m-4 sm:-m-6 text-slate-100">
			{/* Left Workspace Sidebar */}
			<aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-[#060b13] p-5 shrink-0">
				<div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">
					YOUR RESUME WORKSPACE
				</div>
				<nav className="space-y-1.5">
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any })}
						className={cn(
							"w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left",
							activeTab === "plan" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<Compass className="size-4" />
						<span>Your Plan</span>
					</button>

					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any })}
						className={cn(
							"w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left",
							activeTab === "stories" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<Sparkles className="size-4" />
						<span>Your Stories</span>
					</button>

					<button
						type="button"
						onClick={() => setActiveTab("details")}
						className={cn(
							"w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left",
							activeTab === "details"
								? "bg-[#0b1f1a] text-emerald-400 border border-emerald-500/20"
								: "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<Edit3 className="size-4" />
						<span>Details</span>
					</button>

					<button
						type="button"
						onClick={() => setActiveTab("export")}
						className={cn(
							"w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left",
							activeTab === "export"
								? "bg-[#0b1f1a] text-emerald-400 border border-emerald-500/20"
								: "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<CheckCircle className="size-4" />
						<span>Review & Export</span>
					</button>
				</nav>

				{/* Stepper Inside Sidebar */}
				<div className="mt-8 pt-6 border-t border-slate-800 space-y-2">
					<div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sections</div>
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
								"w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left",
								step === s.num && activeTab === "details"
									? "bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20"
									: "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
							)}
						>
							<span>{s.label}</span>
							<span className="text-[10px] text-slate-500 font-mono">Step {s.num}</span>
						</button>
					))}
				</div>
			</aside>

			{/* Center: Main Form & Questions */}
			<main className="flex-1 p-6 sm:p-10 max-w-3xl overflow-y-auto">
				{/* Top Status */}
				<div className="flex items-center justify-between text-xs text-slate-400 mb-6">
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes" as any })}
						className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
					>
						<ArrowLeft className="size-4" />
						<span>Dashboard</span>
					</button>
					<span className="text-slate-500">Open-session draft</span>
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

				{activeTab === "export" ? (
					/* Review & Export View */
					<div className="space-y-8">
						<div>
							<h1 className="text-3xl font-extrabold text-white mb-2">Resume Buddy editor preview — demo</h1>
							<p className="text-sm text-slate-400">
								All information entered below will transfer directly into the full resume editor.
							</p>
						</div>

						{/* Template Selector Cards */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{[
								{ name: "Azurill", color: "bg-emerald-500", active: true },
								{ name: "Bronzor", color: "bg-slate-200", active: false },
								{ name: "Chikorita", color: "bg-emerald-500", active: false },
								{ name: "Gengar", color: "bg-purple-500", active: false },
							].map((tmpl) => (
								<div
									key={tmpl.name}
									className={cn(
										"rounded-xl border p-3 bg-slate-900/60 cursor-pointer transition-all",
										tmpl.active ? "border-emerald-500 bg-[#071b17]" : "border-slate-800 hover:border-slate-700"
									)}
								>
									<div className="h-9 rounded-lg bg-slate-800/80 mb-2 flex items-center px-2">
										<div className={cn("h-2.5 w-10 rounded-full", tmpl.color)} />
									</div>
									<div className="text-xs font-bold text-slate-300">{tmpl.name}</div>
								</div>
							))}
						</div>

						{/* Quick Edit Inputs */}
						<div className="space-y-4 rounded-2xl border border-slate-800 bg-[#09101d] p-6">
							<div>
								<label className="block text-xs font-semibold text-slate-400 mb-1.5">Full name</label>
								<input
									type="text"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-400 mb-1.5">Target role</label>
								<input
									type="text"
									value={targetRole}
									onChange={(e) => setTargetRole(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-400 mb-1.5">Education</label>
								<input
									type="text"
									value={school}
									onChange={(e) => setSchool(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-400 mb-1.5">Skills</label>
								<input
									type="text"
									value={skills}
									onChange={(e) => setSkills(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
								<button
									type="button"
									onClick={handleOpenEditor}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
								>
									<span>Transfer to Resume Editor</span>
									<ArrowRight className="size-4" />
								</button>
								<button
									type="button"
									onClick={() => window.print()}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-sm transition-colors cursor-pointer"
								>
									<span>PDF Export</span>
									<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
										SIMULATED
									</span>
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
										onChange={(e) => setFullName(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
										placeholder="e.g. Roshni Jha"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">Target role</label>
									<input
										type="text"
										value={targetRole}
										onChange={(e) => setTargetRole(e.target.value)}
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
											className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. roshni.jha@example.com"
										/>
									</div>
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone (optional)</label>
										<input
											type="tel"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. +91 98765 43210"
										/>
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
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">University / College / School</label>
									<input
										type="text"
										value={school}
										onChange={(e) => setSchool(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
										placeholder="e.g. Indian Institute of Technology, Bombay"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">Degree & Major</label>
									<input
										type="text"
										value={degree}
										onChange={(e) => setDegree(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
										placeholder="e.g. B.Tech in Computer Science"
									/>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Period / Year</label>
										<input
											type="text"
											value={eduYear}
											onChange={(e) => setEduYear(e.target.value)}
											className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. 2020 - 2024"
										/>
									</div>
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">CGPA or Percentage (optional)</label>
										<input
											type="text"
											value={eduScore}
											onChange={(e) => setEduScore(e.target.value)}
											className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
											placeholder="e.g. 8.8 CGPA"
										/>
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
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">Core Technical & Professional Skills</label>
									<textarea
										rows={4}
										value={skills}
										onChange={(e) => setSkills(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
										placeholder="e.g. React, TypeScript, TailwindCSS, Next.js, Redux, Node.js"
									/>
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
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">Project or Company Name</label>
									<input
										type="text"
										value={project}
										onChange={(e) => setProject(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
										placeholder="e.g. Vipasna Website"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">Description & Key Contributions</label>
									<textarea
										rows={4}
										value={statement}
										onChange={(e) => setStatement(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
										placeholder="e.g. Built responsive pages using React, improved UI performance, and worked with cross-functional teams."
									/>
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
				)}
			</main>

			{/* Right Column: Live Resume Preview */}
			<aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-[#060b13] p-6 shrink-0 flex flex-col justify-between">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<span className="text-sm font-bold text-white">Your resume</span>
						<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30">
							DEMO PREVIEW
						</span>
					</div>

					{/* Resume Card Preview Document */}
					<div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl min-h-[360px] text-xs space-y-4">
						<div className="border-b border-slate-200 pb-3">
							<h3 className="text-xl font-bold font-serif text-slate-950">{fullName || "Your Name"}</h3>
							<p className="text-emerald-700 font-semibold text-[11px]">{targetRole || "Target Role"}</p>
							<p className="text-slate-500 text-[11px] mt-0.5">{email || (phone ? `${phone}` : "Contact details not added")}</p>
						</div>

						{/* Experience */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								EXPERIENCE
							</div>
							{project || statement ? (
								<div>
									<div className="font-semibold text-slate-900">{project || "Project"}</div>
									{statement && (
										<p className="text-[11px] text-slate-700 leading-relaxed">
											• {statement}
										</p>
									)}
								</div>
							) : (
								<p className="text-[11px] text-slate-500">Experience not added</p>
							)}
						</div>

						{/* Education */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								EDUCATION
							</div>
							{school ? (
								<div>
									<div className="font-semibold text-slate-900">{school}</div>
									<div className="text-slate-600 text-[11px]">{degree} • {eduYear}</div>
								</div>
							) : (
								<p className="text-[11px] text-slate-500">Education not added</p>
							)}
						</div>

						{/* Skills */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								SKILLS
							</div>
							<p className="text-[11px] text-slate-700">
								{skills || "Skills not added"}
							</p>
						</div>
					</div>

					<p className="text-xs text-slate-500">Only approved statements appear here.</p>
					<button
						type="button"
						onClick={handleOpenEditor}
						className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left"
					>
						Open full preview in editor →
					</button>
				</div>
			</aside>
		</div>
	);
}
