import {
	ArrowRight,
	Check,
	CheckCircle,
	Circle,
	FileText,
	Sparkle,
	Plus,
	SlidersHorizontal,
	ExternalLink,
	Trash2,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useState, useEffect } from "react";
import z from "zod";
import { api } from "@/utils/api";
import { isStandaloneMode, localResumeStore } from "@/utils/local-resumes";
import { cn } from "@/utils/style";

const searchSchema = z.object({
	tags: z.array(z.string()).default([]),
	sort: z.enum(["lastUpdatedAt", "createdAt", "name"]).default("lastUpdatedAt"),
});

export const Route = createFileRoute("/dashboard/resumes/")({
	component: DashboardResumesRoute,
	validateSearch: zodValidator(searchSchema),
});

export function DashboardResumesRoute() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: resumes = [] } = useQuery({
		queryKey: ["resumes"],
		queryFn: () => api.fetchResumes(),
	});

	// Default demo checklist steps with deep link parameters & localStorage persistence
	const defaultChecklist = [
		{ id: "education", title: "Education details", status: "To do", path: "/dashboard/resumes/manual-builder", search: { step: 2 } },
		{ id: "target_role", title: "Target role", status: "To do", path: "/dashboard/resumes/manual-builder", search: { step: 1 } },
		{ id: "skills", title: "Skills", status: "To do", path: "/dashboard/resumes/manual-builder", search: { step: 3 } },
		{ id: "experience", title: "Project or work experience", status: "To do", path: "/dashboard/resumes/guided-story", search: {} },
		{ id: "achievement", title: "Achievement statement", status: "To do", path: "/dashboard/resumes/guided-story", search: {} },
	];

	const [checklist, setChecklist] = useState(() => {
		if (typeof window === "undefined") return defaultChecklist;
		try {
			// If no resumes exist in localStorage or store, default to fresh checklist
			const saved = localStorage.getItem("resume_buddy_checklist");
			if (saved) {
				const parsed = JSON.parse(saved);
				return defaultChecklist.map((item) => {
					const match = parsed.find((p: any) => p.id === item.id);
					return match ? { ...item, status: match.status } : item;
				});
			}
		} catch {
			// ignore fallback
		}
		return defaultChecklist;
	});

	// If there are 0 resumes, ensure checklist starts clean as "To do"
	useEffect(() => {
		if (resumes.length === 0) {
			try {
				localStorage.removeItem("resume_buddy_checklist");
				localStorage.removeItem("resume_buddy_manual_draft");
				localStorage.removeItem("resume_buddy_guided_story_draft");
			} catch {
				// ignore
			}
			setChecklist(defaultChecklist.map((item) => ({ ...item, status: "To do" })));
		}
	}, [resumes.length]);

	// Re-sync checklist status when returning from builder or after saving
	useEffect(() => {
		const syncChecklist = () => {
			try {
				const saved = localStorage.getItem("resume_buddy_checklist");
				if (saved) {
					const parsed = JSON.parse(saved);
					setChecklist(
						defaultChecklist.map((item) => {
							const match = parsed.find((p: any) => p.id === item.id);
							return match ? { ...item, status: match.status } : item;
						})
					);
				} else {
					setChecklist(defaultChecklist.map((item) => ({ ...item, status: "To do" })));
				}
			} catch {
				// ignore
			}
		};

		window.addEventListener("focus", syncChecklist);
		window.addEventListener("storage", syncChecklist);
		return () => {
			window.removeEventListener("focus", syncChecklist);
			window.removeEventListener("storage", syncChecklist);
		};
	}, []);

	const toggleChecklistItem = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		setChecklist((prev) => {
			const updated = prev.map((item) =>
				item.id === id ? { ...item, status: item.status === "Done" ? "To do" : "Done" } : item
			);
			try {
				localStorage.setItem("resume_buddy_checklist", JSON.stringify(updated.map((i) => ({ id: i.id, status: i.status }))));
			} catch {
				// ignore
			}
			return updated;
		});
	};

	const completedCount = checklist.filter((item) => item.status === "Done").length;
	const totalSteps = checklist.length;
	const progressPercent = Math.round((completedCount / totalSteps) * 100);

	// Next step is the first incomplete checklist item
	const nextPendingItem = checklist.find((item) => item.status === "To do") || checklist[0];

	const handleCreateNew = () => {
		const newResume = localResumeStore.create({
			name: "Untitled Resume",
			withSampleData: true,
		});
		queryClient.invalidateQueries({ queryKey: ["resumes"] });
		navigate({ to: `/builder/${newResume.id}` as any });
	};

	const handleDeleteResume = async (resumeId: string, e: React.MouseEvent) => {
		e.stopPropagation();
		if (!resumeId) return;
		try {
			await api.deleteResume(resumeId);
			const remaining = resumes.filter((r: any) => r.id !== resumeId);
			if (remaining.length === 0) {
				try {
					localStorage.removeItem("resume_buddy_checklist");
					localStorage.removeItem("resume_buddy_manual_draft");
					localStorage.removeItem("resume_buddy_guided_story_draft");
				} catch {
					// ignore
				}
				setChecklist(defaultChecklist.map((item) => ({ ...item, status: "To do" })));
			}
			await queryClient.invalidateQueries({ queryKey: ["resumes"] });
		} catch (err) {
			console.error("Failed to delete resume:", err);
		}
	};

	return (
		<div className="space-y-8 pb-16">
			{/* Welcome Heading */}
			<div>
				<h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
					Welcome back!
				</h1>
				<p className="text-slate-400 text-base sm:text-lg">
					What would you like to work on today?
				</p>
			</div>

			{/* Three Main Action Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
				{/* 1. Build a Resume */}
				<div className="relative rounded-2xl border border-slate-800/80 bg-[#0b1322]/80 p-6 flex flex-col justify-between transition-all hover:border-slate-700 hover:bg-[#0e182b]">
					<div>
						<div className="flex items-center justify-between mb-4">
							<div className="size-11 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-300">
								<FileText className="size-5" />
							</div>
						</div>
						<h3 className="text-lg font-bold text-white mb-2">Build a Resume</h3>
						<p className="text-sm text-slate-400 leading-relaxed mb-6">
							Add your details, education and skills, then develop one experience at a time.
						</p>
					</div>
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
						className="w-full flex items-center justify-between rounded-xl bg-[#141e33] hover:bg-[#1b2844] text-white px-4 py-3 text-sm font-semibold border border-slate-700/50 transition-colors cursor-pointer group"
					>
						<span>Build a resume</span>
						<ArrowRight className="size-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
					</button>
				</div>

				{/* 2. Improve My Experience (Recommended) */}
				<div className="relative rounded-2xl border border-emerald-500/50 bg-[#081b22]/90 p-6 flex flex-col justify-between transition-all hover:border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.07)]">
					<div>
						<div className="flex items-center justify-between mb-4">
							<div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
								<Sparkle className="size-5" />
							</div>
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
								<Check className="size-3.5" /> Recommended
							</span>
						</div>
						<h3 className="text-lg font-bold text-white mb-2">Improve My Experience</h3>
						<p className="text-sm text-slate-300 leading-relaxed mb-6">
							Explore your contribution and evidence, then approve a resume statement in your own words.
						</p>
					</div>
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes/guided-story" as any })}
						className="w-full flex items-center justify-between rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-3 text-sm font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer group"
					>
						<span>Improve my experience</span>
						<ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
					</button>
				</div>

				{/* 3. Review My Resume */}
				<div className="relative rounded-2xl border border-slate-800/80 bg-[#0b1322]/80 p-6 flex flex-col justify-between transition-all hover:border-slate-700 hover:bg-[#0e182b]">
					<div>
						<div className="flex items-center justify-between mb-4">
							<div className="size-11 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-300">
								<FileText className="size-5" />
							</div>
						</div>
						<h3 className="text-lg font-bold text-white mb-2">Review My Resume</h3>
						<p className="text-sm text-slate-400 leading-relaxed mb-6">
							Review resume content, find missing details, and improve existing statements.
						</p>
					</div>
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes/match" as any })}
						className="w-full flex items-center justify-between rounded-xl bg-[#141e33] hover:bg-[#1b2844] text-white px-4 py-3 text-sm font-semibold border border-slate-700/50 transition-colors cursor-pointer group"
					>
						<span>Review my resume</span>
						<ArrowRight className="size-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
					</button>
				</div>
			</div>

			{/* Middle Split: Your Next Step + Personalized Checklist */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
				{/* Left: Your next step */}
				<div className="lg:col-span-5 space-y-4">
					<h2 className="text-lg font-bold text-white">Your next step</h2>
					<div className="rounded-2xl border border-slate-800/80 bg-[#09101d] p-6 space-y-5">
						<p className="text-base font-semibold text-slate-100">
							{nextPendingItem.id === "education"
								? "Add your education details"
								: `Complete ${nextPendingItem.title.toLowerCase()}`}
						</p>
						<div className="space-y-2">
							<div className="flex items-center justify-between text-xs text-slate-400">
								<span>Progress</span>
								<span>{completedCount} of {totalSteps} completed</span>
							</div>
							<div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
								<div
									className="h-full bg-emerald-500 rounded-full transition-all duration-300"
									style={{ width: `${progressPercent}%` }}
								/>
							</div>
						</div>
						<button
							type="button"
							onClick={() => {
								navigate({
									to: (nextPendingItem?.path || "/dashboard/resumes/manual-builder") as any,
									search: (nextPendingItem?.search || {}) as any,
								});
							}}
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-95"
						>
							<span>Continue</span>
							<ArrowRight className="size-4" />
						</button>
					</div>
				</div>

				{/* Right: Personalized checklist */}
				<div className="lg:col-span-7 space-y-4">
					<h2 className="text-lg font-bold text-white">Personalized checklist</h2>
					<div className="rounded-2xl border border-slate-800/80 bg-[#09101d] divide-y divide-slate-800/80">
						{checklist.map((item) => (
							<div
								key={item.id}
								onClick={() => {
									navigate({
										to: item.path as any,
										search: item.search as any,
									});
								}}
								className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition-colors cursor-pointer group"
							>
								<div className="flex items-center gap-3.5">
									<button
										type="button"
										onClick={(e) => toggleChecklistItem(item.id, e)}
										className="cursor-pointer focus:outline-none"
									>
										{item.status === "Done" ? (
											<CheckCircle className="size-5 text-emerald-400" />
										) : (
											<Circle className="size-5 text-slate-600 hover:text-emerald-400 transition-colors" />
										)}
									</button>
									<span className={cn(
										"text-sm font-medium transition-colors",
										item.status === "Done" ? "text-slate-400 line-through" : "text-slate-200 group-hover:text-white"
									)}>
										{item.title}
									</span>
								</div>
								<div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-emerald-400">
									<span>{item.status}</span>
									<ArrowRight className="size-3.5" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* My Resumes Section */}
			<div className="space-y-4 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold text-white">My Resumes</h2>
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard/resumes/manual-builder" as any })}
							className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
						>
							<span>Open workspace</span>
							<ArrowRight className="size-3.5" />
						</button>
						<span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-slate-800/80 text-amber-300 border border-amber-500/20">
							SAMPLE RESUMES & DATES
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* New Resume Card */}
					<div
						onClick={handleCreateNew}
						className="h-[230px] rounded-2xl border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-[#09101d]/60 hover:bg-[#0c1626] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all group"
					>
						<div className="size-11 rounded-full bg-slate-800/80 group-hover:bg-emerald-500/20 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 mb-3 transition-colors">
							<Plus className="size-5" />
						</div>
						<h4 className="text-base font-bold text-white mb-1">New Resume</h4>
						<p className="text-xs text-slate-400">Build step by step</p>
					</div>

					{/* Resumes or Demo Resumes */}
					{resumes.map((resume: any, index: number) => {
						const dateFormatted = resume.updatedAt
							? new Date(resume.updatedAt).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
							})
							: "Sep 29, 2026 at 11:29 AM";

						return (
							<div
								key={resume.id || index}
								onClick={() => navigate({ to: `/builder/${resume.id}` as any })}
								className="relative h-[230px] rounded-2xl border border-slate-800 bg-[#09101d] p-5 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0d1627] transition-all cursor-pointer group"
							>
								{/* Top Right: Delete Button */}
								<button
									type="button"
									title="Delete Resume"
									onClick={(e) => handleDeleteResume(resume.id, e)}
									className="absolute top-3.5 right-3.5 z-10 p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800/80 hover:border-rose-500/30 transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-sm"
								>
									<Trash2 className="size-3.5" />
								</button>

								{/* Placeholder visual preview lines matching screenshot */}
								<div className="space-y-2 rounded-xl bg-slate-900/80 p-4 border border-slate-800/60 pr-8">
									<div className="h-2 w-16 bg-slate-700 rounded-full mx-auto" />
									<div className="h-1.5 w-full bg-slate-800 rounded-full" />
									<div className="h-1.5 w-4/5 bg-slate-800 rounded-full" />
									<div className="h-1.5 w-3/4 bg-slate-800 rounded-full" />
								</div>

								{/* Details */}
								<div>
									<div className="flex items-center justify-between gap-2 mb-1">
										<h4 className="text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
											{resume.name || "Frontend Developer Resume"}
										</h4>
										<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30 shrink-0">
											DEMO
										</span>
									</div>
									<p className="text-xs text-slate-400">{dateFormatted}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
