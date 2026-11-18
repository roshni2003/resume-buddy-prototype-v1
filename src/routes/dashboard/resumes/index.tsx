import {
	ArrowRight,
	Check,
	CheckCircle,
	Circle,
	FileText,
	Mic,
	Target,
	Upload,
	X,
	Sparkle,
	Sparkles,
	Trash2,
	ExternalLink,
	Plus,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useState, useEffect, useRef } from "react";
import z from "zod";
import { toast } from "sonner";
import { api } from "@/utils/api";
import { isStandaloneMode, localResumeStore } from "@/utils/local-resumes";
import { cn } from "@/utils/style";
import { useAuth } from "@/hooks/useAuth";

const searchSchema = z.object({
	tags: z.array(z.string()).optional().catch([]),
	sort: z.enum(["lastUpdatedAt", "createdAt", "name"]).optional().catch("lastUpdatedAt"),
	start: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/resumes/")({
	component: DashboardResumesRoute,
	validateSearch: zodValidator(searchSchema),
});

export function DashboardResumesRoute() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { user, isAuthenticated } = useAuth();
	const search = Route.useSearch();

	const startingPointRef = useRef<HTMLDivElement>(null);

	const { data: apiResumes = [] } = useQuery({
		queryKey: ["resumes"],
		queryFn: () => api.fetchResumes(),
	});

	// Get local resumes
	const [localResumes, setLocalResumes] = useState<any[]>(() => {
		try {
			return localResumeStore.getAll();
		} catch {
			return [];
		}
	});

	// Active working resume / guided story state from localStorage
	const [activeStoryDraft, setActiveStoryDraft] = useState<any>(() => {
		if (typeof window === "undefined") return null;
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			return saved ? JSON.parse(saved) : null;
		} catch {
			return null;
		}
	});

	const [outlineEntries, setOutlineEntries] = useState<any[]>(() => {
		if (typeof window === "undefined") return [];
		try {
			const saved = localStorage.getItem("resume_buddy_outline_entries");
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	// Refresh local resumes and drafts on mount and window focus
	useEffect(() => {
		const refresh = () => {
			try {
				setLocalResumes(localResumeStore.getAll());
				const savedDraft = localStorage.getItem("resume_buddy_guided_story_draft");
				setActiveStoryDraft(savedDraft ? JSON.parse(savedDraft) : null);
				const savedEntries = localStorage.getItem("resume_buddy_outline_entries");
				setOutlineEntries(savedEntries ? JSON.parse(savedEntries) : []);
			} catch {}
		};
		refresh();
		window.addEventListener("focus", refresh);
		window.addEventListener("storage", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			window.removeEventListener("storage", refresh);
		};
	}, []);

	// Determine if user has created or started a resume
	const hasActiveResume = Boolean(
		activeStoryDraft ||
		outlineEntries.length > 0 ||
		localResumes.length > 0 ||
		apiResumes.length > 0
	);

	const activeRoleTitle =
		activeStoryDraft?.targetRole ||
		outlineEntries[0]?.title ||
		localResumes[0]?.name?.replace(/\s+Resume$/i, "") ||
		"Frontend Developer";

	// Calculate plan steps done: out of 10 steps
	const stepsDone = Math.min(10, Math.max(2, (outlineEntries.length > 0 ? 2 : 1) + (outlineEntries.filter((e) => e.points?.length > 0).length)));
	const stepsLeft = Math.max(0, 10 - stepsDone);

	// Next step item to work on (e.g. Mentor or next experience)
	const nextExperience = outlineEntries.find((e) => !e.points || e.points.length === 0) || outlineEntries[0] || {
		title: "Mentor",
		description: "Talk through the main things you did here. Zoe drafts a statement for each.",
	};

	// Fallback resume cards list for active resume state
	const resumesList = useMemo(() => {
		const combined: any[] = [];

		if (activeStoryDraft || outlineEntries.length > 0) {
			combined.push({
				id: activeStoryDraft?.createdResumeId || "active-story-draft",
				title: activeRoleTitle,
				status: "In progress",
				updatedAt: "Last edited",
				isDraft: true,
			});
		}

		for (const r of localResumes) {
			if (!combined.some((item) => item.id === r.id)) {
				combined.push({
					id: r.id,
					title: r.name || activeRoleTitle,
					status: "In progress",
					updatedAt: "Last edited",
				});
			}
		}

		for (const ar of apiResumes) {
			if (!combined.some((item) => item.id === ar.id)) {
				combined.push({
					id: ar.id,
					title: ar.name || activeRoleTitle,
					status: "In progress",
					updatedAt: "Last edited",
				});
			}
		}

		return combined;
	}, [activeStoryDraft, outlineEntries, localResumes, apiResumes, activeRoleTitle]);

	// Handler to delete a resume
	const handleDeleteResume = async (resumeId: string, e?: React.MouseEvent) => {
		if (e) e.stopPropagation();

		// Delete from local store if exists
		try {
			localResumeStore.delete(resumeId);
		} catch {}

		// Delete from API if applicable
		try {
			await api.deleteResume(resumeId);
			await queryClient.invalidateQueries({ queryKey: ["resumes"] });
		} catch {}

		// If this is the active story draft or the only remaining draft
		if (
			resumeId === "active-story-draft" ||
			resumeId === activeStoryDraft?.createdResumeId ||
			resumesList.length <= 1
		) {
			try {
				localStorage.removeItem("resume_buddy_guided_story_draft");
				localStorage.removeItem("resume_buddy_outline_entries");
				localStorage.removeItem("resume_buddy_last_worked");
				localStorage.removeItem("resume_buddy_manual_draft");
				localStorage.removeItem("resume_buddy_checklist");
			} catch {}
			setActiveStoryDraft(null);
			setOutlineEntries([]);
		}

		const updatedLocal = localResumeStore.getAll();
		setLocalResumes(updatedLocal);
		toast.success("Resume deleted");
	};

	// Candidate name for header
	const candidateName = user?.name || activeStoryDraft?.fullName?.split(" ")[0] || "Narendra";

	return (
		<div className="space-y-12 pb-16 font-sans max-w-7xl mx-auto">
			{/* ============================================================== */}
			{/* STATE A: ACTIVE RESUME EXISTS -> SHOW ZOE CARD + YOUR RESUMES */}
			{/* ============================================================== */}
			{hasActiveResume ? (
				<>
					{/* DASHBOARD HEADER FOR RETURNING USERS */}
					<div className="space-y-2 pt-2">
						<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
							YOUR DASHBOARD
						</span>
						<h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
							Welcome back, {candidateName}.
						</h1>
						<p className="text-sm sm:text-base text-slate-400">
							Pick up where you left off, or start something new.
						</p>
					</div>

					{/* FEATURED ACTIVE RESUME / ZOE PICK UP WHERE YOU LEFT OFF CARD */}
					<section className="rounded-2xl border border-emerald-500/30 bg-[#07130e] p-6 sm:p-7 shadow-2xl relative space-y-6">
						{/* Top Header Badge & Timestamp */}
						<div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-emerald-300">
							<div className="flex items-center gap-2">
								<span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
								<span>ZOE / PICK UP WHERE YOU LEFT OFF</span>
							</div>
							<ExternalLink className="size-3.5 text-emerald-400/60" />
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
							{/* Left Column (7 cols): Role title, progress bar, and Next Step action */}
							<div className="lg:col-span-7 space-y-6">
								<div>
									<div className="flex items-center justify-between mb-1.5">
										<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
											In progress
										</span>
										<span className="text-xs text-slate-400 font-mono">
											Edited just now
										</span>
									</div>

									<h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
										{activeRoleTitle}
									</h2>

									{/* Progress Bar & steps count */}
									<div className="flex items-center gap-3 pt-3">
										<div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
											<div
												className="h-full bg-emerald-400 rounded-full transition-all duration-300"
												style={{ width: `${(stepsDone / 10) * 100}%` }}
											/>
										</div>
										<span className="text-xs text-slate-400 font-mono shrink-0">
											{stepsDone} of 10 plan steps done
										</span>
									</div>
								</div>

								{/* Your next step details */}
								<div className="pt-2 space-y-2 border-t border-slate-800/80">
									<span className="text-[11px] text-slate-400 block font-medium">
										Your next step
									</span>
									<h3 className="text-lg font-bold text-white tracking-tight">
										{nextExperience.title}
									</h3>
									<p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
										{nextExperience.description || "Talk through the main things you did here. Zoe drafts a statement for each."}
									</p>

									{/* Primary CTA Buttons */}
									<div className="flex items-center gap-4 pt-3">
										<button
											type="button"
											onClick={() => {
												navigate({
													to: "/dashboard/resumes/guided-story" as any,
													search: { step: "plan" } as any,
												});
											}}
											className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
										>
											<Mic className="size-4 text-slate-950" />
											<span>Talk through this</span>
											<ArrowRight className="size-4 text-slate-950" />
										</button>

										<button
											type="button"
											onClick={() => {
												navigate({
													to: "/dashboard/resumes/guided-story" as any,
													search: { step: "plan" } as any,
												});
											}}
											className="text-xs text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer"
										>
											Open my plan
										</button>
									</div>
								</div>
							</div>

							{/* Right Column (5 cols): Statement Health & Review Cards matching screenshot */}
							<div className="lg:col-span-5 space-y-3">
								{/* Card 1: Needs work */}
								<div className="rounded-xl border border-slate-800 bg-[#081711] p-4 space-y-1">
									<div className="text-xs font-bold text-amber-400">
										1 of 3 <span className="text-slate-300 font-medium">statement needs work</span>
									</div>
									<button
										type="button"
										onClick={() => {
											navigate({
												to: "/dashboard/resumes/guided-story" as any,
												search: { step: "plan" } as any,
											});
										}}
										className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
									>
										<span>Strengthen them</span>
										<ArrowRight className="size-3" />
									</button>
								</div>

								{/* Card 2: Shows a result */}
								<div className="rounded-xl border border-slate-800 bg-[#081711] p-4 space-y-1">
									<div className="text-xs font-bold text-emerald-400">
										1 of 3 <span className="text-slate-300 font-medium">statements show a result</span>
									</div>
									<div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-0.5">
										<Check className="size-3.5" />
										<span>Looks good</span>
									</div>
								</div>

								{/* Card 3: Recruiter checks */}
								<div className="rounded-xl border border-slate-800 bg-[#081711] p-4 space-y-1.5">
									<div className="text-xs text-emerald-400 flex items-center gap-1.5">
										<Check className="size-3.5" />
										<span className="text-slate-200">recruiter checks look good</span>
									</div>
									<div className="text-xs text-emerald-400 flex items-center gap-1.5">
										<Check className="size-3.5" />
										<span>Looks good</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* SECTION: YOUR RESUMES (Saved in this browser) */}
					<section className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold text-white tracking-tight">Your resumes</h2>
							<span className="text-xs text-slate-400 font-mono">
								Saved in this browser
							</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
							{resumesList.map((res: any) => (
								<div
									key={res.id}
									className="rounded-2xl border border-slate-800/90 bg-[#070e19] p-5 space-y-4 shadow-md hover:border-slate-700 transition-all"
								>
									<div className="flex items-center justify-between">
										<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
											{res.status}
										</span>
										<span className="text-xs text-slate-500 font-mono">{res.updatedAt}</span>
									</div>

									<div>
										<h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
											{res.title}
										</h3>
									</div>

									{/* Progress bar */}
									<div className="space-y-1 pt-1">
										<div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
											<div
												className="h-full bg-emerald-400 rounded-full"
												style={{ width: `${(stepsDone / 10) * 100}%` }}
											/>
										</div>
										<span className="text-[11px] text-slate-400 block pt-0.5">
											{stepsLeft} steps left
										</span>
									</div>

									{/* Card actions: Open, Tailor for a job, Delete */}
									<div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
										<button
											type="button"
											onClick={() => {
												navigate({
													to: "/dashboard/resumes/guided-story" as any,
													search: { step: "plan" } as any,
												});
											}}
											className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
										>
											<span>Open</span>
											<ArrowRight className="size-3" />
										</button>

										<button
											type="button"
											onClick={() => {
												navigate({
													to: "/dashboard/resumes/match" as any,
													search: { resumeId: res.id } as any,
												});
											}}
											className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
										>
											<Target className="size-3 text-emerald-400" />
											<span>Tailor for a job</span>
										</button>

										<button
											type="button"
											onClick={(e) => handleDeleteResume(res.id, e)}
											className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
											title="Delete resume"
										>
											<X className="size-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* SECTION: START SOMETHING NEW */}
					<section className="space-y-4 pt-2">
						<h2 className="text-xl font-bold text-white tracking-tight">Start something new</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							{/* Card 1: Start from your story */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any, search: { step: "direction" } as any })}
								className="group rounded-2xl border border-slate-800/80 bg-[#070e19] p-5 flex items-center justify-between hover:border-slate-700 hover:bg-[#0c1527] transition-all cursor-pointer shadow-sm"
							>
								<div className="flex items-center gap-4">
									<div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
										<Mic className="size-4" />
									</div>
									<div>
										<h3 className="text-sm font-bold text-white mb-0.5">Start from your story</h3>
										<p className="text-xs text-slate-400">Build an outline and talk it through with Zoe.</p>
									</div>
								</div>
								<ArrowRight className="size-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
							</div>

							{/* Card 2: Bring a resume */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/upload" as any })}
								className="group rounded-2xl border border-slate-800/80 bg-[#070e19] p-5 flex items-center justify-between hover:border-slate-700 hover:bg-[#0c1527] transition-all cursor-pointer shadow-sm"
							>
								<div className="flex items-center gap-4">
									<div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
										<Upload className="size-4" />
									</div>
									<div>
										<h3 className="text-sm font-bold text-white mb-0.5">Bring a resume</h3>
										<p className="text-xs text-slate-400">Import a PDF, Word file, or text and strengthen it.</p>
									</div>
								</div>
								<ArrowRight className="size-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
							</div>

							{/* Card 3: Make it fit a job */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/match" as any })}
								className="group rounded-2xl border border-slate-800/80 bg-[#070e19] p-5 flex items-center justify-between hover:border-slate-700 hover:bg-[#0c1527] transition-all cursor-pointer shadow-sm"
							>
								<div className="flex items-center gap-4">
									<div className="size-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
										<Target className="size-4" />
									</div>
									<div>
										<h3 className="text-sm font-bold text-white mb-0.5">Make it fit a job</h3>
										<p className="text-xs text-slate-400">Shape a separate version for a vacancy.</p>
									</div>
								</div>
								<ArrowRight className="size-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
							</div>
						</div>
					</section>
				</>
			) : (
				/* ============================================================== */
				/* STATE B: FIRST-TIME VISITOR / NEW USER DASHBOARD (Exact Screenshot Match) */
				/* ============================================================== */
				<div className="space-y-16">
					{/* TOP HERO SECTION: Left text + Right Interactive Zoe Mockup Card */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-2">
						{/* Left Column (7 cols): Hero Headline & CTA */}
						<div className="lg:col-span-7 space-y-6">
							<div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
								<span className="size-1.5 rounded-full bg-emerald-400" />
								<span>A LITTLE VOICE. A CLEARER STORY.</span>
							</div>

							<div className="space-y-1">
								<h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
									Your <br />
									experience. <br />
									<span className="text-[#ccf873]">Turned up.</span>
								</h1>
							</div>

							<p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
								You've done more than you think. Talk it through with Zoe and turn the useful details into a resume that sounds like you.
							</p>

							<div className="pt-2 space-y-3">
								<button
									type="button"
									onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any, search: { step: "direction" } as any })}
									className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-sm shadow-lg shadow-lime-500/10 transition-all cursor-pointer active:scale-95"
								>
									<Mic className="size-4 text-slate-950" />
									<span>Start a new resume</span>
									<ArrowRight className="size-4 text-slate-950" />
								</button>

								<p className="text-xs text-slate-400">
									Speak or type. Go at your pace.
								</p>

								<div className="pt-1">
									<button
										type="button"
										onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
										className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer"
									>
										<span>Explore a sample workspace</span>
										<ArrowRight className="size-3" />
									</button>
								</div>
							</div>
						</div>

						{/* Right Column (5 cols): Interactive Zoe Prompt Device Mockup */}
						<div className="lg:col-span-5 relative">
							{/* Device Mockup Shell */}
							<div className="rounded-3xl border border-slate-700/60 bg-[#07130e] p-6 sm:p-7 shadow-2xl relative space-y-6">
								{/* Top Device Bar */}
								<div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500">
									<span>YOUR NEXT CHAPTER</span>
									<div className="flex items-center gap-1.5">
										<span className="size-1.5 rounded-full bg-slate-600" />
										<span className="size-1.5 rounded-full bg-slate-600" />
									</div>
								</div>

								{/* Zoe Question Box */}
								<div className="rounded-2xl border border-emerald-500/30 bg-[#091d14] p-5 sm:p-6 space-y-5">
									<div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-emerald-400">
										<div className="flex items-center gap-1.5">
											<span className="size-1.5 rounded-full bg-emerald-400" />
											<span>ZOE / LET'S FIND YOUR STORY</span>
										</div>
										<ArrowRight className="size-3 text-emerald-400/80 -rotate-45" />
									</div>

									<h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
										What's one thing you worked on that you're proud of?
									</h3>

									{/* User In Your Words Simulation */}
									<div className="rounded-xl border border-emerald-500/20 bg-[#05140d] p-3.5 space-y-1">
										<span className="text-[9px] font-mono tracking-widest uppercase text-emerald-400 block font-bold">
											IN YOUR WORDS
										</span>
										<p className="text-xs text-slate-300 italic">
											"I noticed people kept getting stuck, so I redesigned the first few steps..."
										</p>
									</div>

									{/* Audio Waveform Row */}
									<div className="flex items-center gap-3 pt-1">
										<div className="size-9 rounded-full bg-[#ccf873] flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
											<Mic className="size-4" />
										</div>
										<div className="flex items-center gap-1 text-emerald-400/80">
											<span className="h-3 w-0.5 rounded-full bg-emerald-400 animate-pulse" />
											<span className="h-5 w-0.5 rounded-full bg-emerald-400" />
											<span className="h-2 w-0.5 rounded-full bg-emerald-400" />
											<span className="h-6 w-0.5 rounded-full bg-emerald-400 animate-pulse" />
											<span className="h-4 w-0.5 rounded-full bg-emerald-400" />
											<span className="h-2.5 w-0.5 rounded-full bg-emerald-400" />
										</div>
										<span className="text-[11px] text-slate-400 font-medium">
											Your story starts here.
										</span>
									</div>
								</div>

								{/* Bottom Floating Note: TAKING SHAPE */}
								<div className="absolute -bottom-5 -right-2 sm:-right-4 rounded-xl border border-slate-300 bg-[#faf8f5] text-slate-900 p-3.5 shadow-2xl max-w-[260px] space-y-1 z-10">
									<div className="flex items-center justify-between text-[9px] font-mono tracking-widest uppercase text-slate-500">
										<span className="font-bold">TAKING SHAPE</span>
										<FileText className="size-3 text-slate-400" />
									</div>
									<p className="text-[11px] text-slate-800 font-medium leading-relaxed">
										Redesigned the onboarding flow to help new users get started.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* PICK YOUR STARTING POINT SECTION */}
					<div className="space-y-4 pt-4">
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold block">
								PICK YOUR STARTING POINT
							</span>
							<span className="text-xs text-slate-500 font-mono">
								Same companion. Your own route.
							</span>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							{/* Card 01: Start from your story */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any, search: { step: "direction" } as any })}
								className="rounded-2xl border border-slate-800/90 bg-[#070e19] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1527] transition-all cursor-pointer shadow-sm group"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
											<Mic className="size-4" />
										</div>
										<span className="text-xs font-mono text-slate-600 font-bold">01</span>
									</div>

									<div className="space-y-1.5">
										<h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
											Start from your story
										</h3>
										<p className="text-xs text-slate-400 leading-relaxed">
											No polished answers needed. Build an outline and find the details together.
										</p>
									</div>
								</div>

								<div className="pt-6">
									<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
										<span>Start a new resume</span>
										<ArrowRight className="size-3" />
									</div>
								</div>
							</div>

							{/* Card 02: Bring your resume */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/upload" as any })}
								className="rounded-2xl border border-slate-800/90 bg-[#070e19] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1527] transition-all cursor-pointer shadow-sm group"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
											<Upload className="size-4" />
										</div>
										<span className="text-xs font-mono text-slate-600 font-bold">02</span>
									</div>

									<div className="space-y-1.5">
										<h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
											Bring your resume
										</h3>
										<p className="text-xs text-slate-400 leading-relaxed">
											Import a PDF, Word document, or text. Keep what works and strengthen the rest.
										</p>
									</div>
								</div>

								<div className="pt-6">
									<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
										<span>Import a resume</span>
										<ArrowRight className="size-3" />
									</div>
								</div>
							</div>

							{/* Card 03: Make it fit the job */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/match" as any })}
								className="rounded-2xl border border-slate-800/90 bg-[#070e19] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1527] transition-all cursor-pointer shadow-sm group"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="size-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
											<Target className="size-4" />
										</div>
										<span className="text-xs font-mono text-slate-600 font-bold">03</span>
									</div>

									<div className="space-y-1.5">
										<h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
											Make it fit the job
										</h3>
										<p className="text-xs text-slate-400 leading-relaxed">
											Work from a saved resume and shape a separate version for an opportunity.
										</p>
									</div>
								</div>

								<div className="pt-6">
									<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
										<span>Prepare for a job</span>
										<ArrowRight className="size-3" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* YOUR RESUMES SECTION (Saved on this device) */}
					<div className="space-y-4 pt-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold text-white tracking-tight">Your resumes</h2>
							<span className="text-xs text-slate-400 font-mono">
								Saved on this device
							</span>
						</div>

						{/* Grid of Resumes */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
							{/* New Resume Card placeholder / action */}
							<div
								onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any, search: { step: "direction" } as any })}
								className="h-[170px] rounded-2xl border-2 border-dashed border-slate-800/80 hover:border-emerald-500/50 bg-[#070e19]/60 hover:bg-[#0c1527] p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
							>
								<div className="size-10 rounded-full bg-slate-800/80 group-hover:bg-emerald-500/20 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 mb-2.5 transition-colors">
									<Plus className="size-4" />
								</div>
								<h4 className="text-sm font-bold text-white mb-0.5">Start a new resume</h4>
								<p className="text-xs text-slate-500">Create with Zoe or build manually</p>
							</div>

							{/* Any existing local cards */}
							{localResumes.map((res: any) => (
								<div
									key={res.id}
									className="rounded-2xl border border-slate-800/90 bg-[#070e19] p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
								>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
												In progress
											</span>
										</div>

										<div>
											<h4 className="text-base font-bold text-white tracking-tight truncate">
												{res.name || "Untitled resume"}
											</h4>
											<p className="text-[11px] text-slate-500 font-mono mt-0.5">
												Choose a direction · {res.updatedAt ? new Date(res.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent"}
											</p>
										</div>
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4">
										<button
											type="button"
											onClick={() => navigate({ to: `/builder/${res.id}` as any })}
											className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
										>
											<span>Continue</span>
											<ArrowRight className="size-3" />
										</button>

										<button
											type="button"
											onClick={(e) => handleDeleteResume(res.id, e)}
											className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
											title="Delete"
										>
											<X className="size-3.5" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* FOOTER */}
			<footer className="border-t border-slate-800/80 pt-8 text-xs text-slate-400">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<span className="font-mono tracking-wider uppercase text-slate-400">
						YOUR EXPERIENCE, IN YOUR WORDS.
					</span>
					<div className="flex items-center gap-6">
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any, search: { step: "plan" } as any })}
							className="hover:text-emerald-400 transition-colors cursor-pointer"
						>
							Audition Kokoro voices ↗
						</button>
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any, search: { step: "plan" } as any })}
							className="hover:text-emerald-400 transition-colors cursor-pointer"
						>
							How Zoe helps ↗
						</button>
					</div>
				</div>
			</footer>
		</div>
	);
}
