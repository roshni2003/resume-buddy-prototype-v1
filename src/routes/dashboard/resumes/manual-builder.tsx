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
} from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { localResumeStore } from "@/utils/local-resumes";
import { cn } from "@/utils/style";

export const Route = createFileRoute("/dashboard/resumes/manual-builder")({
	component: ManualBuilderRoute,
});

export function ManualBuilderRoute() {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<"plan" | "stories" | "details" | "export">("details");
	const [step, setStep] = useState(1); // 1 = Contact & target role, 2 = Education, 3 = Skills, etc.

	// Form values
	const [fullName, setFullName] = useState("Roshni Jha");
	const [targetRole, setTargetRole] = useState("Frontend Developer");
	const [email, setEmail] = useState("you@example.com");
	const [phone, setPhone] = useState("");
	const [location, setLocation] = useState("");
	const [education, setEducation] = useState("");
	const [skills, setSkills] = useState("");
	const [project, setProject] = useState("Vipasna Website");
	const [statement, setStatement] = useState(
		"Built a website using React and MUI. Created pages that work on mobile. The pages adapted to desktop and mobile screen sizes."
	);

	const handleUseSample = () => {
		setFullName("Roshni Jha");
		setTargetRole("Frontend Developer");
		setEmail("roshni.jha@example.com");
		setPhone("+91 98765 43210");
		setLocation("Bangalore, India");
	};

	const handleContinue = () => {
		if (step < 3) {
			setStep(step + 1);
		} else {
			setActiveTab("export");
		}
	};

	const handleOpenEditor = () => {
		// Save to local resume store
		const newResume = localResumeStore.create({
			name: `${fullName}'s Resume - ${targetRole || "V1"}`,
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
								description: `<p>${statement}</p>`,
							},
						],
					},
					education: {
						title: "Education",
						columns: 1,
						hidden: false,
						items: education
							? [
									{
										id: "edu-1",
										hidden: false,
										institution: education,
										degree: "Degree",
										area: "",
										period: "2020 - 2024",
										score: "",
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
					template: "ditto",
					layout: [
						["summary", "experience"],
						["education", "skills"],
					],
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
						onClick={() => setActiveTab("plan")}
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
							activeTab === "details" ? "bg-[#0b1f1a] text-emerald-400 border border-emerald-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
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
							activeTab === "export" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<CheckCircle className="size-4" />
						<span>Review & Export</span>
					</button>
				</nav>
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
							{activeTab === "export" ? "Step 5 of 5 · Final Preview" : `Step ${step} of 5 · Contact & Details`}
						</span>
						<span className="text-slate-400">{activeTab === "export" ? "100%" : `${step * 20}%`}</span>
					</div>
					<div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 1 ? "w-1/5" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 2 ? "w-1/5" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 3 ? "w-1/5" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", step >= 4 ? "w-1/5" : "w-0")} />
						<div className={cn("h-full bg-emerald-500 rounded-full", activeTab === "export" ? "w-1/5" : "w-0")} />
					</div>
				</div>

				{activeTab === "export" ? (
					/* Review & Export View */
					<div className="space-y-8">
						<div>
							<h1 className="text-3xl font-extrabold text-white mb-2">Resume Buddy editor preview — demo</h1>
							<p className="text-sm text-slate-400">
								Standalone prototype · not connected to the live Resume Buddy editor. Template previews are demo sketches.
							</p>
						</div>

						{/* Template Selector Cards */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{[
								{ name: "Azurill", color: "bg-emerald-500", active: false },
								{ name: "Bronzor", color: "bg-slate-200", active: true },
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
								<label className="block text-xs font-semibold text-slate-400 mb-1.5">Project</label>
								<input
									type="text"
									value={project}
									onChange={(e) => setProject(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-400 mb-1.5">Resume statement</label>
								<textarea
									rows={3}
									value={statement}
									onChange={(e) => setStatement(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
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
					/* Details Form */
					<div className="space-y-6">
						<div>
							<div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
								BUILD A RESUME · DETAILS
							</div>
							<h1 className="text-3xl font-extrabold text-white mb-2">
								Contact details and target role
							</h1>
							<p className="text-sm text-slate-400">
								Start with your name and the role you're applying for. Contact fields are optional in this demo.
							</p>
						</div>

						<div className="space-y-5">
							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">Full name</label>
								<input
									type="text"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">Target role</label>
								<input
									type="text"
									value={targetRole}
									onChange={(e) => setTargetRole(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Email (optional)
									</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Phone (optional)
									</label>
									<input
										type="tel"
										value={phone}
										placeholder="Your phone number"
										onChange={(e) => setPhone(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Location (optional)
								</label>
								<input
									type="text"
									value={location}
									placeholder="City, country"
									onChange={(e) => setLocation(e.target.value)}
									className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
								/>
							</div>

							<div className="pt-2">
								<button
									type="button"
									onClick={handleUseSample}
									className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
								>
									Use sample answer
								</button>
							</div>

							<div className="pt-4">
								<button
									type="button"
									onClick={handleContinue}
									className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
								>
									<span>Continue</span>
									<ArrowRight className="size-4" />
								</button>
							</div>
						</div>
					</div>
				)}
			</main>

			{/* Right Column: Live Resume Preview + What Zoe has captured */}
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
							<h3 className="text-xl font-bold font-serif text-slate-950">{fullName || "Roshni Jha"}</h3>
							<p className="text-slate-500 text-[11px] mt-0.5">
								{email || "Contact details not added"}
							</p>
						</div>

						{/* Experience */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								EXPERIENCE
							</div>
							<div className="font-semibold text-slate-900">{project || "Vipasna Website"}</div>
							<p className="text-[11px] text-slate-700 leading-relaxed">
								• {statement}
							</p>
						</div>

						{/* Education */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								EDUCATION
							</div>
							<p className="text-[11px] text-slate-500">
								{education || "Education not added"}
							</p>
						</div>

						{/* Skills */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								SKILLS
							</div>
							<p className="text-[11px] text-slate-500">
								{skills || "Skills not added"}
							</p>
						</div>
					</div>

					<p className="text-xs text-slate-500">Only approved statements appear here.</p>
					<button
						type="button"
						onClick={handleOpenEditor}
						className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
					>
						Open full preview
					</button>

					{/* What Zoe has captured */}
					<div className="pt-4 border-t border-slate-800/80 space-y-3">
						<h4 className="text-xs font-bold text-white">What Zoe has captured</h4>
						<div className="space-y-2 text-xs">
							<div className="flex items-start gap-2 text-slate-300">
								<Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
								<div>
									<span className="font-bold text-white">Experience: </span>
									<span>{project}</span>
								</div>
							</div>
							<div className="flex items-start gap-2 text-slate-400">
								<Circle className="size-3.5 text-slate-600 shrink-0 mt-0.5" />
								<div>
									<span className="font-medium text-slate-300">Your contribution: </span>
									<span>Built a website using React and MUI</span>
								</div>
							</div>
							<div className="flex items-start gap-2 text-slate-400">
								<Circle className="size-3.5 text-slate-600 shrink-0 mt-0.5" />
								<div>
									<span className="font-medium text-slate-300">Results & evidence: </span>
									<span>The pages adapted to desktop and mobile</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}
