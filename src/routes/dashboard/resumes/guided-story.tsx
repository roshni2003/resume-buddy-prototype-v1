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
	MicOff,
	RefreshCw,
	Sparkles,
	Layers,
	Target,
	HelpCircle,
	Lightbulb,
	Send,
	Flame,
	Plus,
	Trash2,
} from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { localResumeStore } from "@/utils/local-resumes";
import { cn } from "@/utils/style";

export const Route = createFileRoute("/dashboard/resumes/guided-story")({
	component: GuidedStoryRoute,
});

type WorkspaceTab = "plan" | "stories" | "details" | "export";

interface PlanItem {
	id: string;
	title: string;
	description: string;
	status: "Completed" | "In progress" | "Not started" | "Needs review";
	tab: WorkspaceTab;
}

interface StoryItem {
	id: string;
	companyOrProject: string;
	type: "project" | "work" | "internship";
	role: string;
	contribution: string;
	problem: string;
	approach: string;
	evidenceResult: string;
	finalBullets: string[];
	status: "draft" | "approved";
}

export function GuidedStoryRoute() {
	const navigate = useNavigate();

	// Navigation Tabs inside Workspace
	const [activeTab, setActiveTab] = useState<WorkspaceTab>("stories");

	// User target role & basic info
	const [targetRole, setTargetRole] = useState("Frontend Developer");
	const [fullName, setFullName] = useState("Roshni Jha");

	// Voice Simulation State
	const [isListening, setIsListening] = useState(false);
	const [voiceTranscript, setVoiceTranscript] = useState("");

	// Prototype 1 & 2: Collected Stories
	const [stories, setStories] = useState<StoryItem[]>([
		{
			id: "story-1",
			companyOrProject: "Vipasna Website",
			type: "project",
			role: "Frontend Developer",
			contribution: "Built a responsive web portal using React and TailwindCSS.",
			problem: "Pages were sluggish on mobile devices and had poor layout adaptability.",
			approach: "Refactored UI into atomic components and implemented responsive fluid CSS grids.",
			evidenceResult: "The pages adapted seamlessly to desktop and mobile screen sizes.",
			finalBullets: [
				"Built a website using React and MUI, ensuring full mobile and desktop viewport adaptability.",
			],
			status: "approved",
		},
	]);

	// Interactive Conversational Discovery State
	const [currentStep, setCurrentStep] = useState<
		"role_setup" | "pick_topic" | "describe_work" | "clarify_impact" | "generate_bullet" | "review_approve" | "success"
	>("pick_topic");

	// Active story under construction
	const [activeStoryType, setActiveStoryType] = useState<"project" | "work" | "internship">("project");
	const [activeProjectName, setActiveProjectName] = useState("E-Commerce Dashboard");
	const [activeContribution, setActiveContribution] = useState("Built responsive analytics charts and order lists using React.");
	const [activeProblem, setActiveProblem] = useState("Loading state was unhandled and table would freeze on large loads.");
	const [activeEvidence, setActiveEvidence] = useState("Reduced page lag by memoizing components and adding pagination.");
	const [generatedBullet, setGeneratedBullet] = useState(
		"Architected high-performance analytics charts and paginated order tables in React, eliminating UI freezes on heavy data loads."
	);
	const [editedBullet, setEditedBullet] = useState(
		"Architected high-performance analytics charts and paginated order tables in React, eliminating UI freezes on heavy data loads."
	);

	// Plan Items (Prototype 2 style progress)
	const planItems: PlanItem[] = [
		{
			id: "target_role",
			title: "Target Role & Profile",
			description: targetRole || "Define your desired career direction",
			status: targetRole ? "Completed" : "Not started",
			tab: "plan",
		},
		{
			id: "stories",
			title: "Work & Project Stories",
			description: `${stories.length} verified experience bullet${stories.length > 1 ? "s" : ""} generated`,
			status: stories.some((s) => s.status === "approved") ? "Completed" : "In progress",
			tab: "stories",
		},
		{
			id: "education",
			title: "Education details",
			description: "Add degree, university and timeline",
			status: "In progress",
			tab: "details",
		},
		{
			id: "skills",
			title: "Core technical skills",
			description: "React, TypeScript, CSS architecture, Tailwind",
			status: "In progress",
			tab: "details",
		},
		{
			id: "export",
			title: "Review layout & export",
			description: "Inspect template styles and download PDF",
			status: "Needs review",
			tab: "export",
		},
	];

	const completedCount = planItems.filter((p) => p.status === "Completed").length;
	const progressPercent = Math.round((completedCount / planItems.length) * 100);

	// Toggle simulated voice recording
	const toggleVoice = (onReceiveText: (txt: string) => void) => {
		if (isListening) {
			setIsListening(false);
		} else {
			setIsListening(true);
			setVoiceTranscript("Listening... speak naturally about what you built...");
			setTimeout(() => {
				const mockSpokenText = "I created a web app using React and added real-time filtering for users.";
				setVoiceTranscript(`Recognized: "${mockSpokenText}"`);
				onReceiveText(mockSpokenText);
				setIsListening(false);
			}, 2200);
		}
	};

	// Save and Hand off to the real Resume Buddy Editor
	const handleHandoffToEditor = () => {
		const newResume = localResumeStore.create({
			name: `${fullName}'s Resume - ${targetRole || "Story Based"}`,
			data: {
				basics: {
					name: fullName,
					headline: targetRole,
					email: "roshni.jha@example.com",
					phone: "+91 98765 43210",
					location: "Bangalore, India",
					website: { url: "", label: "" },
					customFields: [],
				},
				summary: {
					title: "Summary",
					columns: 1,
					hidden: false,
					content: `<p>Frontend Engineer targeting ${targetRole} positions with proven experience building robust web applications.</p>`,
				},
				sections: {
					experience: {
						title: "Experience & Projects",
						columns: 1,
						hidden: false,
						items: stories.map((s, idx) => ({
							id: s.id || `exp-${idx}`,
							hidden: false,
							company: s.companyOrProject,
							position: s.role || targetRole,
							period: "2023 - Present",
							location: "Remote",
							website: { url: "", label: "" },
							description: s.finalBullets.map((b) => `<p>• ${b}</p>`).join(""),
						})),
					},
					education: {
						title: "Education",
						columns: 1,
						hidden: false,
						items: [
							{
								id: "edu-1",
								hidden: false,
								institution: "Tech Institute of Science",
								degree: "Bachelor of Technology",
								area: "Computer Science",
								period: "2020 - 2024",
								score: "",
								website: { url: "", label: "" },
								description: "",
							},
						],
					},
					skills: {
						title: "Skills",
						columns: 1,
						hidden: false,
						items: [
							{ id: "s-1", hidden: false, name: "React", icon: "", proficiency: "", level: 1, keywords: [] },
							{ id: "s-2", hidden: false, name: "TypeScript", icon: "", proficiency: "", level: 1, keywords: [] },
							{ id: "s-3", hidden: false, name: "TailwindCSS", icon: "", proficiency: "", level: 1, keywords: [] },
							{ id: "s-4", hidden: false, name: "Responsive Design", icon: "", proficiency: "", level: 1, keywords: [] },
						],
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
			{/* Left Workspace Sidebar (Narendra Prototype 2 Navigation) */}
			<aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-[#060b13] p-5 shrink-0">
				<div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">
					YOUR RESUME WORKSPACE
				</div>
				<nav className="space-y-1.5">
					<button
						type="button"
						onClick={() => setActiveTab("plan")}
						className={cn(
							"w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left",
							activeTab === "plan"
								? "bg-[#0b1f1a] text-emerald-400 border border-emerald-500/20"
								: "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<div className="flex items-center gap-3">
							<Compass className="size-4" />
							<span>Your Plan</span>
						</div>
						<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
							{completedCount}/{planItems.length}
						</span>
					</button>

					<button
						type="button"
						onClick={() => setActiveTab("stories")}
						className={cn(
							"w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left",
							activeTab === "stories"
								? "bg-[#0b1f1a] text-emerald-400 border border-emerald-500/20"
								: "text-slate-400 hover:text-white hover:bg-slate-800/50"
						)}
					>
						<div className="flex items-center gap-3">
							<Sparkles className="size-4" />
							<span>Your Stories</span>
						</div>
						<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
							{stories.length}
						</span>
					</button>

					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
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

				{/* Mini Workspace Progress */}
				<div className="mt-8 p-4 rounded-xl border border-slate-800 bg-[#09101d] space-y-3">
					<div className="flex items-center justify-between text-xs font-semibold">
						<span className="text-slate-400">Target Role</span>
						<span className="text-emerald-400 font-bold">{targetRole}</span>
					</div>
					<div className="space-y-1">
						<div className="flex justify-between text-[11px] text-slate-400">
							<span>Overall Readiness</span>
							<span className="text-slate-300 font-bold">{progressPercent}%</span>
						</div>
						<div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
							<div
								className="h-full bg-emerald-500 rounded-full transition-all duration-300"
								style={{ width: `${progressPercent}%` }}
							/>
						</div>
					</div>
				</div>
			</aside>

			{/* Center: Interactive Main Content */}
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

				{/* TAB 1: YOUR PLAN (Prototype 2 Personalized Roadmap) */}
				{activeTab === "plan" && (
					<div className="space-y-6">
						<div>
							<div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
								YOUR RESUME PLAN
							</div>
							<h1 className="text-3xl font-extrabold text-white mb-2">Let's bring your story out.</h1>
							<p className="text-sm text-slate-400">
								One experience at a time. A draft that reflects your authentic work without fabricated metrics.
							</p>
						</div>

						{/* Next Recommended Step Hero */}
						<div className="rounded-2xl border border-emerald-500/40 bg-[#081a1f] p-6 space-y-4">
							<div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
								RECOMMENDED NEXT STEP
							</div>
							<h2 className="text-xl font-bold text-white">Capture an achievement with Zoe</h2>
							<p className="text-sm text-slate-300">
								You have {stories.length} story captured. Zoe will interview you on one project and craft verified impact bullet points.
							</p>
							<button
								type="button"
								onClick={() => setActiveTab("stories")}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
							>
								<span>Start Achievement Studio</span>
								<ArrowRight className="size-4" />
							</button>
						</div>

						{/* Section Checklist */}
						<div className="space-y-3">
							<h3 className="text-base font-bold text-white">Your complete plan</h3>
							<div className="rounded-2xl border border-slate-800 bg-[#09101d] divide-y divide-slate-800">
								{planItems.map((item) => (
									<div key={item.id} className="flex items-center justify-between p-4 sm:p-5">
										<div className="flex items-start gap-3.5">
											{item.status === "Completed" ? (
												<CheckCircle className="size-5 text-emerald-400 mt-0.5" />
											) : item.status === "In progress" ? (
												<div className="size-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mt-0.5" />
											) : (
												<Circle className="size-5 text-slate-600 mt-0.5" />
											)}
											<div>
												<h4 className="text-sm font-bold text-white">{item.title}</h4>
												<p className="text-xs text-slate-400">{item.description}</p>
											</div>
										</div>
										<button
											type="button"
											onClick={() => {
												if (item.tab === "details") {
													navigate({ to: "/dashboard/resumes/manual-builder" as any });
												} else {
													setActiveTab(item.tab);
												}
											}}
											className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
										>
											Open
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* TAB 2: YOUR STORIES & ACHIEVEMENT STUDIO (Prototype 1 & 2 Combined) */}
				{activeTab === "stories" && (
					<div className="space-y-6">
						{/* Mode Switcher / Breadcrumb */}
						<div className="flex items-center justify-between">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
										IMPROVE MY EXPERIENCE
									</span>
									<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30">
										AI RESPONSES SIMULATED
									</span>
								</div>
								<h1 className="text-2xl sm:text-3xl font-extrabold text-white">Achievement Studio</h1>
							</div>

							{currentStep !== "pick_topic" && (
								<button
									type="button"
									onClick={() => setCurrentStep("pick_topic")}
									className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
								>
									<ArrowLeft className="size-3.5" />
									<span>Reset question</span>
								</button>
							)}
						</div>

						{/* Step 1: Pick topic */}
						{currentStep === "pick_topic" && (
							<div className="space-y-6">
								<p className="text-sm text-slate-400">
									Choose which experience or project to talk through. Zoe will ask focused follow-ups and build authentic bullets.
								</p>

								{/* Experience type selector */}
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-2">Experience type</label>
									<div className="flex flex-wrap gap-3">
										{[
											{ id: "project", label: "Project" },
											{ id: "internship", label: "Internship" },
											{ id: "work", label: "Work experience" },
										].map((t) => (
											<button
												key={t.id}
												type="button"
												onClick={() => setActiveStoryType(t.id as any)}
												className={cn(
													"inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer",
													activeStoryType === t.id
														? "border-emerald-500 bg-[#071d18] text-emerald-300"
														: "border-slate-800 bg-[#09101d] text-slate-300 hover:border-slate-700"
												)}
											>
												<div
													className={cn(
														"size-3.5 rounded-full border flex items-center justify-center",
														activeStoryType === t.id ? "border-emerald-500 bg-emerald-500" : "border-slate-600"
													)}
												>
													{activeStoryType === t.id && <div className="size-1.5 rounded-full bg-slate-950" />}
												</div>
												<span>{t.label}</span>
											</button>
										))}
									</div>
								</div>

								{/* Role / Project name */}
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Project, organization, or role name
									</label>
									<input
										type="text"
										value={activeProjectName}
										onChange={(e) => setActiveProjectName(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
									/>
								</div>

								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={() => setActiveProjectName("Vipasna Website")}
										className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
									>
										Use sample project
									</button>
									<button
										type="button"
										onClick={() => setCurrentStep("describe_work")}
										className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
									>
										<span>Continue</span>
										<ArrowRight className="size-4" />
									</button>
								</div>
							</div>
						)}

						{/* Step 2: Describe your contribution naturally (Text or Voice) */}
						{currentStep === "describe_work" && (
							<div className="space-y-6">
								<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-6 space-y-4">
									<div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
										<Lightbulb className="size-4" />
										<span>ZOE ASKS:</span>
									</div>
									<h2 className="text-xl font-bold text-white">
										What was your main contribution on {activeProjectName}?
									</h2>
									<p className="text-xs text-slate-400">
										Speak or type naturally. Describe the technologies you used and the problems you tackled.
									</p>

									<textarea
										rows={4}
										value={activeContribution}
										onChange={(e) => setActiveContribution(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
										placeholder="e.g. I designed the database models and created the user login endpoints..."
									/>

									{/* Voice Control Indicator */}
									<div className="flex flex-wrap items-center justify-between gap-3 pt-2">
										<div className="flex items-center gap-3">
											<button
												type="button"
												onClick={() => toggleVoice((txt) => setActiveContribution(txt))}
												className={cn(
													"inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
													isListening
														? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
														: "bg-slate-800 hover:bg-slate-700 text-slate-300"
												)}
											>
												{isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
												<span>{isListening ? "Listening..." : "Use voice input"}</span>
											</button>
											{voiceTranscript && <span className="text-xs text-slate-400 italic">{voiceTranscript}</span>}
										</div>

										<button
											type="button"
											onClick={() => setCurrentStep("clarify_impact")}
											className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
										>
											<span>Next question</span>
											<ArrowRight className="size-4" />
										</button>
									</div>
								</div>
							</div>
						)}

						{/* Step 3: Zoe identifies gaps and asks for verifiable results */}
						{currentStep === "clarify_impact" && (
							<div className="space-y-6">
								<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-6 space-y-4">
									<div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
										<HelpCircle className="size-4" />
										<span>ZOE'S FOLLOW-UP:</span>
									</div>
									<h2 className="text-xl font-bold text-white">Can you share a result or evidence?</h2>
									<p className="text-xs text-slate-400">
										What changed after your work? Include a result only if you can support it. Never invent fake percentages.
									</p>

									<textarea
										rows={3}
										value={activeEvidence}
										onChange={(e) => setActiveEvidence(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
									/>

									<div className="flex flex-wrap items-center gap-3 pt-2">
										<button
											type="button"
											onClick={() => {
												const combined = `${activeContribution} Result: ${activeEvidence}`;
												setGeneratedBullet(combined);
												setEditedBullet(combined);
												setCurrentStep("generate_bullet");
											}}
											className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
										>
											<span>Generate professional bullet</span>
											<ArrowRight className="size-4" />
										</button>
										<button
											type="button"
											onClick={() => {
												setGeneratedBullet(activeContribution);
												setEditedBullet(activeContribution);
												setCurrentStep("generate_bullet");
											}}
											className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
										>
											Skip — no verifiable metric
										</button>
									</div>
								</div>
							</div>
						)}

						{/* Step 4: Review and verify generated bullet */}
						{currentStep === "generate_bullet" && (
							<div className="space-y-6">
								<div>
									<h2 className="text-2xl font-bold text-white mb-1">Your resume bullet</h2>
									<p className="text-xs text-slate-400">
										Drafted only from the exact words you provided. No exaggerated figures added.
									</p>
								</div>

								<div className="rounded-2xl border-l-4 border-l-emerald-500 border border-slate-800 bg-[#091523] p-6 text-sm text-slate-200 leading-relaxed">
									{editedBullet}
								</div>

								<div className="flex items-center gap-2 text-xs text-amber-300">
									<Sparkles className="size-4 shrink-0" />
									<span>Verify this statement before approving it to your resume.</span>
								</div>

								<div className="flex items-center gap-3 pt-2">
									<button
										type="button"
										onClick={() => setCurrentStep("review_approve")}
										className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
									>
										<span>Review and edit</span>
										<ArrowRight className="size-4" />
									</button>
								</div>
							</div>
						)}

						{/* Step 5: Edit and Approve (User in complete control) */}
						{currentStep === "review_approve" && (
							<div className="space-y-6">
								<h2 className="text-2xl font-bold text-white">Choose your final version</h2>

								<div className="space-y-2">
									<div className="text-xs font-bold uppercase tracking-wider text-slate-400">YOUR ORIGINAL</div>
									<p className="text-sm text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
										{activeContribution}
									</p>
								</div>

								<div className="space-y-2">
									<label className="block text-xs font-semibold text-slate-300">Edit the suggestion</label>
									<textarea
										rows={4}
										value={editedBullet}
										onChange={(e) => setEditedBullet(e.target.value)}
										className="w-full rounded-xl border border-slate-800 bg-[#09101d] px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
									/>
								</div>

								<div className="flex flex-wrap items-center gap-3 pt-2">
									<button
										type="button"
										onClick={() => {
											const newStory: StoryItem = {
												id: `story-${Date.now()}`,
												companyOrProject: activeProjectName,
												type: activeStoryType,
												role: targetRole,
												contribution: activeContribution,
												problem: activeProblem,
												approach: "",
												evidenceResult: activeEvidence,
												finalBullets: [editedBullet],
												status: "approved",
											};
											setStories([newStory, ...stories]);
											setCurrentStep("success");
										}}
										className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
									>
										<Check className="size-4" />
										<span>Approve improved version</span>
									</button>
									<button
										type="button"
										onClick={() => {
											const newStory: StoryItem = {
												id: `story-${Date.now()}`,
												companyOrProject: activeProjectName,
												type: activeStoryType,
												role: targetRole,
												contribution: activeContribution,
												problem: "",
												approach: "",
												evidenceResult: "",
												finalBullets: [activeContribution],
												status: "approved",
											};
											setStories([newStory, ...stories]);
											setCurrentStep("success");
										}}
										className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors cursor-pointer"
									>
										Keep my original version
									</button>
								</div>
							</div>
						)}

						{/* Success / Story Added View */}
						{currentStep === "success" && (
							<div className="space-y-6">
								<div className="rounded-2xl border border-emerald-500/30 bg-[#06181b] p-6 space-y-4">
									<div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
										<CheckCircle className="size-5" />
										<span>Achievement added to your resume</span>
									</div>
									<h2 className="text-xl font-bold text-white">{activeProjectName}</h2>
									<p className="text-sm text-slate-200 leading-relaxed bg-[#0a1f24] p-4 rounded-xl border border-emerald-500/20">
										• {editedBullet}
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-3">
									<button
										type="button"
										onClick={handleHandoffToEditor}
										className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
									>
										<span>Transfer to Resume Editor</span>
										<ArrowRight className="size-4" />
									</button>
									<button
										type="button"
										onClick={() => {
											setActiveProjectName("Second Project");
											setActiveContribution("");
											setActiveEvidence("");
											setCurrentStep("describe_work");
										}}
										className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors cursor-pointer"
									>
										Capture another achievement
									</button>
									<button
										type="button"
										onClick={() => setActiveTab("export")}
										className="px-4 py-3 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
									>
										Review layout & export
									</button>
								</div>
							</div>
						)}

						{/* List of previously captured stories */}
						<div className="pt-8 border-t border-slate-800/80 space-y-4">
							<h3 className="text-base font-bold text-white flex items-center gap-2">
								<span>Captured stories</span>
								<span className="text-xs font-normal text-slate-400">({stories.length})</span>
							</h3>
							<div className="space-y-3">
								{stories.map((story) => (
									<div
										key={story.id}
										className="p-4 rounded-xl border border-slate-800 bg-[#09101d] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-bold text-white">{story.companyOrProject}</span>
												<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
													{story.status}
												</span>
											</div>
											<p className="text-xs text-slate-400 line-clamp-1">{story.finalBullets[0]}</p>
										</div>
										<button
											type="button"
											onClick={handleHandoffToEditor}
											className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer shrink-0"
										>
											<span>Edit in builder</span>
											<ArrowRight className="size-3" />
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* TAB 3: REVIEW & EXPORT */}
				{activeTab === "export" && (
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-extrabold text-white mb-2">Review layout & export</h1>
							<p className="text-sm text-slate-400">
								Inspect your story-based resume. Everything captured here directly transfers into the full resume editor.
							</p>
						</div>

						{/* Quick summary of captured content */}
						<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-6 space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-base font-bold text-white">Resume content snapshot</h3>
								<span className="text-xs text-emerald-400 font-semibold">{stories.length} stories ready</span>
							</div>

							<div className="space-y-2 text-sm text-slate-300">
								<div><strong>Target Role:</strong> {targetRole}</div>
								<div><strong>Candidate:</strong> {fullName}</div>
								<div>
									<strong>Experiences:</strong>
									<ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-400">
										{stories.map((s) => (
											<li key={s.id}>{s.companyOrProject}: {s.finalBullets[0]}</li>
										))}
									</ul>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
								<button
									type="button"
									onClick={handleHandoffToEditor}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
								>
									<span>Transfer into full Resume Editor</span>
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
				)}
			</main>

			{/* Right Column: Live Resume Preview (Always synchronized) */}
			<aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-[#060b13] p-6 shrink-0 flex flex-col justify-between">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<span className="text-sm font-bold text-white">Your resume</span>
						<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30">
							DEMO PREVIEW
						</span>
					</div>

					{/* Live Rendered Document Card */}
					<div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl min-h-[380px] text-xs space-y-4">
						<div className="border-b border-slate-200 pb-3">
							<h3 className="text-xl font-bold font-serif text-slate-950">{fullName}</h3>
							<p className="text-emerald-700 font-semibold text-[11px] mt-0.5">{targetRole}</p>
							<p className="text-slate-500 text-[11px]">roshni.jha@example.com • Bangalore, India</p>
						</div>

						{/* Experience Section */}
						<div className="space-y-2">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								EXPERIENCE
							</div>
							{stories.map((story) => (
								<div key={story.id} className="space-y-1">
									<div className="font-semibold text-slate-900">{story.companyOrProject}</div>
									{story.finalBullets.map((bullet, idx) => (
										<p key={idx} className="text-[11px] text-slate-700 leading-relaxed">
											• {bullet}
										</p>
									))}
								</div>
							))}
						</div>

						{/* Skills Section */}
						<div className="space-y-1">
							<div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
								SKILLS
							</div>
							<p className="text-[11px] text-slate-600">
								React, TypeScript, TailwindCSS, Responsive Design
							</p>
						</div>
					</div>

					<p className="text-xs text-slate-500">Only approved statements appear on your live resume.</p>
					<button
						type="button"
						onClick={handleHandoffToEditor}
						className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left"
					>
						Open full resume editor & template customizer →
					</button>

					{/* What Zoe has captured checklist */}
					<div className="pt-4 border-t border-slate-800/80 space-y-3">
						<h4 className="text-xs font-bold text-white">What Zoe has captured</h4>
						<div className="space-y-2 text-xs">
							<div className="flex items-start gap-2 text-slate-300">
								<Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
								<div>
									<span className="font-bold text-white">Target role: </span>
									<span>{targetRole}</span>
								</div>
							</div>
							<div className="flex items-start gap-2 text-slate-300">
								<Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
								<div>
									<span className="font-bold text-white">Stories captured: </span>
									<span>{stories.length} verified bullet point{stories.length > 1 ? "s" : ""}</span>
								</div>
							</div>
							<div className="flex items-start gap-2 text-slate-400">
								<Circle className="size-3.5 text-slate-600 shrink-0 mt-0.5" />
								<div>
									<span className="font-medium text-slate-300">Editor handoff: </span>
									<span>Ready to transfer</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}
