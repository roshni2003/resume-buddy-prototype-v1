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
	Pencil,
	MoreVertical,
	Copy,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useState, useEffect, useRef } from "react";
import z from "zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { api } from "@/utils/api";
import { isStandaloneMode, localResumeStore } from "@/utils/local-resumes";
import { cn } from "@/utils/style";
import { getStoredUserProfile } from "@/utils/auth-token";
import { useAuth } from "@/hooks/useAuth";
import { useConfirm } from "@/hooks/use-confirm";

dayjs.extend(relativeTime);

/** Format date and time for resume items (e.g., "Today, 4:15 PM" or "Nov 21, 2026 at 4:15 PM") */
export function formatResumeLastUpdated(dateInput: string | Date | undefined | null): string {
	if (!dateInput) return "Recently";
	const d = dayjs(dateInput);
	if (!d.isValid()) return "Recently";
	const now = dayjs();
	if (d.isSame(now, "day")) {
		return `Today, ${d.format("h:mm A")}`;
	}
	if (d.isSame(now.subtract(1, "day"), "day")) {
		return `Yesterday, ${d.format("h:mm A")}`;
	}
	if (d.isSame(now, "year")) {
		return d.format("MMM D [at] h:mm A");
	}
	return d.format("MMM D, YYYY [at] h:mm A");
}

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
	const confirm = useConfirm();
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
			} catch { }
		};
		refresh();
		window.addEventListener("focus", refresh);
		window.addEventListener("storage", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			window.removeEventListener("storage", refresh);
		};
	}, []);

	// Determine if user has created or started a resume and is authenticated
	const hasActiveResume = Boolean(
		isAuthenticated &&
		(localResumes.length > 0 || apiResumes.length > 0)
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
			const draftUpdated = activeStoryDraft?.updatedAt || activeStoryDraft?.lastModified;
			combined.push({
				id: activeStoryDraft?.createdResumeId || "active-story-draft",
				title: activeRoleTitle,
				status: "In progress",
				updatedAt: formatResumeLastUpdated(draftUpdated),
				rawUpdatedAt: draftUpdated ? new Date(draftUpdated).getTime() : 0,
				isDraft: true,
			});
		}

		for (const r of localResumes) {
			const existingIdx = combined.findIndex((item) => item.id === r.id);
			const formattedDate = formatResumeLastUpdated(r.updatedAt || r.createdAt);
			const rawDate = r.updatedAt ? new Date(r.updatedAt).getTime() : (r.createdAt ? new Date(r.createdAt).getTime() : 0);

			if (existingIdx >= 0) {
				// Update with more accurate metadata from local store
				combined[existingIdx] = {
					...combined[existingIdx],
					title: r.name || combined[existingIdx].title,
					updatedAt: formattedDate,
					rawUpdatedAt: rawDate,
				};
			} else {
				combined.push({
					id: r.id,
					title: r.name || activeRoleTitle,
					status: "In progress",
					updatedAt: formattedDate,
					rawUpdatedAt: rawDate,
				});
			}
		}

		for (const ar of apiResumes) {
			const existingIdx = combined.findIndex((item) => item.id === ar.id);
			const formattedDate = formatResumeLastUpdated(ar.updatedAt || ar.createdAt);
			const rawDate = ar.updatedAt ? new Date(ar.updatedAt).getTime() : (ar.createdAt ? new Date(ar.createdAt).getTime() : 0);

			if (existingIdx >= 0) {
				combined[existingIdx] = {
					...combined[existingIdx],
					title: ar.name || combined[existingIdx].title,
					updatedAt: formattedDate,
					rawUpdatedAt: rawDate,
				};
			} else {
				combined.push({
					id: ar.id,
					title: ar.name || activeRoleTitle,
					status: "In progress",
					updatedAt: formattedDate,
					rawUpdatedAt: rawDate,
				});
			}
		}

		// Sort resumes so the most recently updated appears first
		return combined.sort((a, b) => (b.rawUpdatedAt || 0) - (a.rawUpdatedAt || 0));
	}, [activeStoryDraft, outlineEntries, localResumes, apiResumes, activeRoleTitle]);

	// Handler to delete a resume with warning/confirmation
	const handleDeleteResume = async (resumeId: string, e?: React.MouseEvent) => {
		if (e) e.stopPropagation();

		// Prompt user for confirmation before deletion
		const resumeItem = resumesList.find((r) => r.id === resumeId) || localResumes.find((r) => r.id === resumeId);
		const resumeName = resumeItem?.title || resumeItem?.name || "this resume";

		const confirmed = await confirm(`Are you sure you want to delete "${resumeName}"?`, {
			description: "This will permanently remove this resume and its associated content. This action cannot be undone.",
			confirmText: "Delete Resume",
			cancelText: "Cancel",
		});

		if (!confirmed) return;

		const toastId = toast.loading("Deleting resume...");

		// Delete from local store if exists
		try {
			localResumeStore.delete(resumeId);
		} catch { }

		// Delete from API if applicable
		try {
			await api.deleteResume(resumeId);
			await queryClient.invalidateQueries({ queryKey: ["resumes"] });
		} catch { }

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
			} catch { }
			setActiveStoryDraft(null);
			setOutlineEntries([]);
		}

		const updatedLocal = localResumeStore.getAll();
		setLocalResumes(updatedLocal);
		toast.success("Resume deleted successfully", { id: toastId });
	};

	// Rename state & handlers
	const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
	const [editingResumeName, setEditingResumeName] = useState("");

	const handleStartRename = (id: string, currentTitle: string, e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setEditingResumeId(id);
		setEditingResumeName(currentTitle);
	};

	const handleSaveResumeName = async (resumeId: string, newTitle: string) => {
		const trimmed = newTitle.trim();
		if (!trimmed) {
			setEditingResumeId(null);
			return;
		}

		// 1. Update in local store
		try {
			localResumeStore.update(resumeId, { name: trimmed });
		} catch { }

		// 2. Update active draft if matches
		try {
			if (
				resumeId === "active-story-draft" ||
				resumeId === activeStoryDraft?.createdResumeId
			) {
				const draftRaw = localStorage.getItem("resume_buddy_guided_story_draft");
				if (draftRaw) {
					const draft = JSON.parse(draftRaw);
					draft.targetRole = trimmed;
					draft.resumeName = trimmed;
					draft.updatedAt = new Date().toISOString();
					localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(draft));
					setActiveStoryDraft(draft);
				}
			}

			// Update last worked
			const lastWorkedRaw = localStorage.getItem("resume_buddy_last_worked");
			if (lastWorkedRaw) {
				const lw = JSON.parse(lastWorkedRaw);
				if (lw.resumeId === resumeId) {
					lw.resumeName = trimmed;
					lw.title = `Continue editing ${trimmed}`;
					lw.updatedAt = new Date().toISOString();
					localStorage.setItem("resume_buddy_last_worked", JSON.stringify(lw));
				}
			}
		} catch { }

		// 3. Update API if applicable
		try {
			await api.updateResume(resumeId, { name: trimmed });
			await queryClient.invalidateQueries({ queryKey: ["resumes"] });
		} catch { }

		setLocalResumes(localResumeStore.getAll());
		setEditingResumeId(null);
		toast.success("Resume renamed");
	};

	// Duplicate a resume
	const handleDuplicateResume = (resumeId: string, e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		try {
			const res = localResumeStore.duplicate(resumeId);
			setLocalResumes(localResumeStore.getAll());
			toast.success("Resume duplicated");
			return res.id;
		} catch (err) {
			console.error("Failed to duplicate resume:", err);
			toast.error("Failed to duplicate resume");
		}
	};

	// Candidate name for header: prioritize logged-in user name, email prefix, or user profile
	const storedProfile = typeof window !== "undefined" ? getStoredUserProfile() : null;
	const candidateName = (() => {
		// 1. Logged in user name or email ID prefix
		if (user?.name && user.name.trim() && user.name.trim().toLowerCase() !== "user") {
			return user.name.trim().split(" ")[0];
		}
		if (user?.email && user.email.includes("@")) {
			return user.email.split("@")[0];
		}
		// 2. Stored user profile name or email prefix
		if (storedProfile?.name && storedProfile.name.trim()) {
			return storedProfile.name.trim().split(" ")[0];
		}
		if (storedProfile?.email && storedProfile.email.includes("@")) {
			return storedProfile.email.split("@")[0];
		}
		// 3. Active story draft contact email prefix or full name (excluding filename patterns)
		if (activeStoryDraft?.contactEmail && activeStoryDraft.contactEmail.includes("@")) {
			return activeStoryDraft.contactEmail.split("@")[0];
		}
		if (activeStoryDraft?.fullName && !/^resume[-_\s0-9a-z]*$/i.test(activeStoryDraft.fullName.trim())) {
			return activeStoryDraft.fullName.trim().split(" ")[0];
		}
		return "Narendra";
	})();

	// Action router: Requires login before starting or creating a resume
	const requireAuthAction = (destinationUrl: string, searchParams?: Record<string, any>) => {
		if (!isAuthenticated) {
			toast.info("Please sign in or create an account to start your resume.");
			navigate({
				to: "/auth/login" as any,
				search: { redirect: destinationUrl } as any,
			});
			return;
		}

		// When starting a fresh guided story (from scratch), reset any residual uploaded draft or outline
		if (destinationUrl.includes("guided-story") && searchParams?.step === "direction") {
			try {
				localStorage.removeItem("resume_buddy_outline_entries");
				localStorage.removeItem("resume_buddy_guided_story_draft");
			} catch { }
		}

		navigate({ to: destinationUrl as any, search: searchParams as any });
	};

	return (
		<div className="space-y-12 pb-16 font-sans max-w-7xl mx-auto">
			{/* ============================================================== */}
			{/* SITUATION 1: LOGGED OUT -> SHOW EXACT 1st IMAGE DESIGN         */}
			{/* ("Your experience. Turned up." + Hero Card + Starting Point + Resumes) */}
			{/* ============================================================== */}
			{!isAuthenticated ? (
				<div className="space-y-12">
					{/* TOP HERO SECTION: Split Left Pitch & Right Interactive Story Card */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
						{/* Left: Headline & Call-To-Action buttons */}
						<div className="lg:col-span-6 space-y-6">
							<div className="space-y-1">
								<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-emerald-400" />
									<span>A LITTLE VOICE. A CLEARER STORY.</span>
								</span>
							</div>

							<h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
								Your experience.<br />
								<span className="text-[#ccf873]">Turned up.</span>
							</h1>

							<p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
								You've done more than you think. Talk it through with Zoe and turn the useful details into a resume that sounds like you.
							</p>

							<div className="space-y-3 pt-2">
								<button
									type="button"
									onClick={() => requireAuthAction("/dashboard/resumes/guided-story", { step: "direction" })}
									className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
								>
									<Mic className="size-4 text-slate-950" />
									<span>Start a new resume</span>
									<ArrowRight className="size-4 text-slate-950" />
								</button>
								<div className="text-xs text-slate-400">
									Speak or type. Go at your pace.
								</div>
								<div className="pt-2">
									<button
										type="button"
										onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
										className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
									>
										<span>Explore a sample workspace</span>
										<span>→</span>
									</button>
								</div>
							</div>
						</div>

						{/* Right: Zoe Interactive Mockup Card matching 1st image */}
						<div className="lg:col-span-6 flex justify-center lg:justify-end">
							<div className="relative w-full max-w-md rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0c1f17] via-[#091712] to-[#060e0a] p-6 sm:p-7 shadow-2xl space-y-6">
								<div className="flex items-center justify-between text-[10px] font-mono uppercase text-emerald-300/80">
									<span>YOUR NEXT CHAPTER</span>
									<div className="flex items-center gap-1.5">
										<span className="size-1.5 rounded-full bg-emerald-400/40" />
										<span className="size-1.5 rounded-full bg-emerald-400/40" />
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
										<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
										<span>ZOE / LET'S FIND YOUR STORY</span>
									</div>
									<h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
										What's one thing you worked on that you're proud of?
									</h2>
								</div>

								<div className="space-y-1">
									<span className="text-[10px] font-mono uppercase text-emerald-300/60 block">IN YOUR WORDS</span>
									<p className="text-xs italic text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-emerald-500/10">
										"I noticed people kept getting stuck, so I redesigned the first few steps..."
									</p>
								</div>

								<div className="flex items-center gap-3 pt-1">
									<div className="size-9 rounded-full bg-[#ccf873] flex items-center justify-center text-slate-950 shadow-md">
										<Mic className="size-4" />
									</div>
									<div className="flex items-center gap-1 text-emerald-400">
										<span className="h-4 w-1 bg-emerald-400 rounded-full animate-pulse" />
										<span className="h-6 w-1 bg-emerald-400 rounded-full animate-pulse delay-75" />
										<span className="h-3 w-1 bg-emerald-400 rounded-full animate-pulse delay-150" />
										<span className="h-5 w-1 bg-emerald-400 rounded-full animate-pulse" />
									</div>
									<span className="text-xs text-slate-300 font-medium pl-1">Your story starts here.</span>
								</div>

								{/* Overlapping Taking Shape Note */}
								<div className="rounded-2xl border border-slate-700/80 bg-[#f4f3ea] text-slate-900 p-4 shadow-xl space-y-1 transform sm:translate-x-4 sm:translate-y-2">
									<div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
										<span>TAKING SHAPE</span>
										<FileText className="size-3 text-slate-600" />
									</div>
									<p className="text-xs text-slate-800 font-semibold leading-relaxed">
										Redesigned the onboarding flow to help new users get started.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* PICK YOUR STARTING POINT SECTION */}
					<div className="space-y-4 pt-4">
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
								PICK YOUR STARTING POINT
							</span>
							<span className="text-xs text-slate-500 font-medium">
								Same companion. Your own route.
							</span>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							{/* Card 01 */}
							<div
								onClick={() => requireAuthAction("/dashboard/resumes/guided-story", { step: "direction" })}
								className="rounded-2xl border border-slate-800/90 bg-[#09131d] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1827] transition-all cursor-pointer shadow-sm group min-h-[200px]"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
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
								<div className="pt-4">
									<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
										<span>Start a new resume</span>
										<ArrowRight className="size-3" />
									</div>
								</div>
							</div>

							{/* Card 02 */}
							<div
								onClick={() => requireAuthAction("/dashboard/resumes/upload")}
								className="rounded-2xl border border-slate-800/90 bg-[#09131d] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1827] transition-all cursor-pointer shadow-sm group min-h-[200px]"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="size-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
											<Upload className="size-4" />
										</div>
										<span className="text-xs font-mono text-slate-600 font-bold">02</span>
									</div>
									<div className="space-y-1.5">
										<h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
											Bring your resume
										</h3>
										<p className="text-xs text-slate-400 leading-relaxed">
											Import a PDF, Word document, or text. Keep what works and strengthen the rest.
										</p>
									</div>
								</div>
								<div className="pt-4">
									<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
										<span>Import a resume</span>
										<ArrowRight className="size-3" />
									</div>
								</div>
							</div>

							{/* Card 03 */}
							<div
								onClick={() => requireAuthAction("/dashboard/resumes/match")}
								className="rounded-2xl border border-slate-800/90 bg-[#09131d] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1827] transition-all cursor-pointer shadow-sm group min-h-[200px]"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="size-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
											<Target className="size-4" />
										</div>
										<span className="text-xs font-mono text-slate-600 font-bold">03</span>
									</div>
									<div className="space-y-1.5">
										<h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
											Make it fit the job
										</h3>
										<p className="text-xs text-slate-400 leading-relaxed">
											Work from a saved resume and shape a separate version for an opportunity.
										</p>
									</div>
								</div>
								<div className="pt-4">
									<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
										<span>Prepare for a job</span>
										<ArrowRight className="size-3" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : resumesList.length === 0 ? (
				/* ============================================================== */
				/* SITUATION 2: LOGGED IN & NO RESUME YET -> SHOW 2nd IMAGE       */
				/* ("WELCOME, <NAME> / Where would you like to start?" + 3 CARDS) */
				/* ============================================================== */
				<div className="space-y-10 pt-4 max-w-5xl">
					{/* Header matching 2nd image */}
					<div className="space-y-3">
						<span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
							WELCOME, {candidateName.toUpperCase()}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
							Where would you like to<br />start?
						</h1>
						<p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
							Pick the one closest to where you are now. You can do the others later, and come back to your dashboard any time.
						</p>
					</div>

					{/* 3 Starting Choice Cards matching 2nd image */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
						{/* Card 01: Start from your story */}
						<div
							onClick={() => requireAuthAction("/dashboard/resumes/guided-story", { step: "direction" })}
							className="rounded-2xl border border-slate-800/90 bg-[#09131d] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1827] transition-all cursor-pointer shadow-sm group min-h-[220px]"
						>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
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
							className="rounded-2xl border border-slate-800/90 bg-[#09131d] p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0c1827] transition-all cursor-pointer shadow-sm group min-h-[220px]"
						>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="size-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
										<Upload className="size-4" />
									</div>
									<span className="text-xs font-mono text-slate-600 font-bold">02</span>
								</div>

								<div className="space-y-1.5">
									<h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
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

						{/* Card 03: Make it fit the job (Highlighted border in 2nd image) */}
						<div
							onClick={() => navigate({ to: "/dashboard/resumes/match" as any })}
							className="rounded-2xl border-2 border-emerald-500/50 bg-[#0c1e15] p-6 flex flex-col justify-between hover:border-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 group min-h-[220px]"
						>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="size-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
										<Target className="size-4" />
									</div>
									<span className="text-xs font-mono text-emerald-400/80 font-bold">03</span>
								</div>

								<div className="space-y-1.5">
									<h3 className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors">
										Make it fit the job
									</h3>
									<p className="text-xs text-slate-300 leading-relaxed">
										Bring your resume first, then shape a separate version for a job you've found.
									</p>
								</div>
							</div>

							<div className="pt-6">
								<div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
									<span>Prepare for a job</span>
									<ArrowRight className="size-3" />
								</div>
							</div>
						</div>
					</div>

					{/* Sample workspace link matching 2nd image */}
					<div className="pt-2">
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
							className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
						>
							<span>Not sure yet? Look around a sample resume</span>
							<span>→</span>
						</button>
					</div>
				</div>
			) : (
				/* ============================================================== */
				/* SITUATION 3: LOGGED IN & CREATED RESUME -> WELCOME BACK, <NAME>*/
				/* (Pick up where you left off + Your resumes list)               */
				/* ============================================================== */
				<>
					{/* DASHBOARD HEADER WITH WELCOME BACK & USER NAME */}
					<div className="space-y-2 pt-2">
						<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
							WELCOME BACK, {candidateName.toUpperCase()}
						</span>
						<h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
							Where would you like to start?
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
							<button
								type="button"
								onClick={() => {
									const targetId = activeStoryDraft?.createdResumeId || resumesList[0]?.id || "active-story-draft";
									navigate({
										to: "/dashboard/resumes/guided-story" as any,
										search: { step: "plan", resumeId: targetId } as any,
									});
								}}
								className="p-1 rounded-md text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors cursor-pointer"
								title="Open in Story Builder"
							>
								<ExternalLink className="size-3.5" />
							</button>
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
											{resumesList[0]?.updatedAt ? `Edited ${resumesList[0].updatedAt}` : "Edited just now"}
										</span>
									</div>

									{editingResumeId === (resumesList[0]?.id || "active-story-draft") ? (
										<div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
											<input
												type="text"
												value={editingResumeName}
												onChange={(e) => setEditingResumeName(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														handleSaveResumeName(resumesList[0]?.id || "active-story-draft", editingResumeName);
													} else if (e.key === "Escape") {
														setEditingResumeId(null);
													}
												}}
												autoFocus
												className="text-xl sm:text-2xl font-bold text-white bg-slate-900 border border-emerald-500 rounded-lg px-2.5 py-1 focus:outline-none w-full max-w-md"
												placeholder="Enter resume name..."
											/>
											<button
												type="button"
												onClick={() => handleSaveResumeName(resumesList[0]?.id || "active-story-draft", editingResumeName)}
												className="p-2 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer shrink-0"
												title="Save name"
											>
												<Check className="size-4 stroke-[3]" />
											</button>
											<button
												type="button"
												onClick={() => setEditingResumeId(null)}
												className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
												title="Cancel"
											>
												<X className="size-4" />
											</button>
										</div>
									) : (
										<div className="flex items-center gap-2 group/title">
											<h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
												{resumesList[0]?.title || activeRoleTitle}
											</h2>
											<button
												type="button"
												onClick={(e) =>
													handleStartRename(
														resumesList[0]?.id || "active-story-draft",
														resumesList[0]?.title || activeRoleTitle,
														e
													)
												}
												className="p-1 text-slate-500 hover:text-emerald-400 rounded transition-colors cursor-pointer"
												title="Edit resume name"
											>
												<Pencil className="size-4" />
											</button>
										</div>
									)}

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
												const targetId = activeStoryDraft?.createdResumeId || localResumes[0]?.id || "active-story-draft";
												navigate({
													to: "/dashboard/resumes/guided-story" as any,
													search: { step: "plan", resumeId: targetId } as any,
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
												const targetId = activeStoryDraft?.createdResumeId || localResumes[0]?.id || "active-story-draft";
												navigate({
													to: "/dashboard/resumes/guided-story" as any,
													search: { step: "plan", resumeId: targetId } as any,
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
										<div className="flex items-center gap-1.5">
											<span className="text-xs text-slate-500 font-mono">{res.updatedAt}</span>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<button
														type="button"
														onClick={(e) => e.stopPropagation()}
														className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
														title="More options"
													>
														<MoreVertical className="size-4" />
													</button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end" className="w-48 bg-slate-900 border border-slate-800 text-slate-200">
													<DropdownMenuItem
														onClick={() => {
															navigate({
																to: "/dashboard/resumes/guided-story" as any,
																search: { step: "plan", resumeId: res.id } as any,
															});
														}}
														className="cursor-pointer hover:bg-slate-800 text-xs"
													>
														<ArrowRight className="size-3.5 mr-2 text-emerald-400" />
														<span>Open in Story Builder</span>
													</DropdownMenuItem>

													<DropdownMenuItem
														onClick={(e) => handleStartRename(res.id, res.title, e as any)}
														className="cursor-pointer hover:bg-slate-800 text-xs"
													>
														<Pencil className="size-3.5 mr-2 text-amber-400" />
														<span>Rename resume</span>
													</DropdownMenuItem>

													<DropdownMenuItem
														onClick={(e) => handleDuplicateResume(res.id, e as any)}
														className="cursor-pointer hover:bg-slate-800 text-xs"
													>
														<Copy className="size-3.5 mr-2 text-indigo-400" />
														<span>Duplicate resume</span>
													</DropdownMenuItem>

													<DropdownMenuItem
														onClick={() => {
															navigate({
																to: "/dashboard/resumes/match" as any,
																search: { resumeId: res.id } as any,
															});
														}}
														className="cursor-pointer hover:bg-slate-800 text-xs"
													>
														<Target className="size-3.5 mr-2 text-emerald-400" />
														<span>Tailor for a job</span>
													</DropdownMenuItem>

													<DropdownMenuSeparator className="bg-slate-800" />

													<DropdownMenuItem
														onClick={(e) => handleDeleteResume(res.id, e as any)}
														className="cursor-pointer text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 text-xs"
													>
														<Trash2 className="size-3.5 mr-2" />
														<span>Delete resume</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>

									<div className="flex items-center justify-between gap-2">
										{editingResumeId === res.id ? (
											<div className="flex items-center gap-1.5 w-full" onClick={(e) => e.stopPropagation()}>
												<input
													type="text"
													value={editingResumeName}
													onChange={(e) => setEditingResumeName(e.target.value)}
													onKeyDown={(e) => {
														if (e.key === "Enter") {
															handleSaveResumeName(res.id, editingResumeName);
														} else if (e.key === "Escape") {
															setEditingResumeId(null);
														}
													}}
													autoFocus
													className="text-sm font-bold text-white bg-slate-900 border border-emerald-500 rounded px-2 py-0.5 focus:outline-none w-full"
													placeholder="Resume name..."
												/>
												<button
													type="button"
													onClick={() => handleSaveResumeName(res.id, editingResumeName)}
													className="p-1 rounded bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer shrink-0"
													title="Save name"
												>
													<Check className="size-3.5 stroke-[3]" />
												</button>
												<button
													type="button"
													onClick={() => setEditingResumeId(null)}
													className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
													title="Cancel"
												>
													<X className="size-3.5" />
												</button>
											</div>
										) : (
											<div className="flex items-center justify-between gap-2 w-full group/name">
												<h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
													{res.title}
												</h3>
												<button
													type="button"
													onClick={(e) => handleStartRename(res.id, res.title, e)}
													className="p-1 text-slate-500 hover:text-emerald-400 rounded opacity-70 group-hover/name:opacity-100 transition-all cursor-pointer shrink-0"
													title="Rename resume"
												>
													<Pencil className="size-3.5" />
												</button>
											</div>
										)}
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
													search: { step: "plan", resumeId: res.id } as any,
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
								onClick={() => requireAuthAction("/dashboard/resumes/guided-story", { step: "direction" })}
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
			)}

			{/* FOOTER */}
			<footer className="border-t border-slate-800/80 pt-8 text-xs text-slate-400">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<span className="font-mono tracking-wider uppercase text-slate-400">
						YOUR EXPERIENCE, IN YOUR WORDS.
					</span>
				</div>
			</footer>
		</div>
	);
}
