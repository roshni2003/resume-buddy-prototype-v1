import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Wand2 } from "lucide-react";
import { useBuilderSidebarStore } from "@/routes/builder/$resumeId/-store/sidebar";
import { cn } from "@/utils/style";

export type CoachStep = {
	id: string;
	target: string; // data-tour value
	title: string;
	body: string;
	ai?: boolean;
	emoji?: string;
	placement?: "top" | "bottom" | "left" | "right" | "auto";
};

export const ZOE_STEPS: CoachStep[] = [
	{
		id: "summary",
		target: "section-summary",
		title: "Meet Zoe — your AI Summary writer ✨",
		body: "Open Summary and Zoe will craft a punchy professional headline tailored to your role. No more staring at a blank page.",
		ai: true,
		emoji: "📝",
	},
	{
		id: "experience",
		target: "section-experience",
		title: "Experience, rewritten by AI 💼",
		body: "Drop in your roles — Zoe turns bullet points into impact-driven achievements that recruiters love.",
		ai: true,
		emoji: "💼",
	},
	{
		id: "projects",
		target: "section-projects",
		title: "Showcase Projects with AI 🚀",
		body: "Zoe expands your project notes into clear, outcome-focused descriptions so your work shines.",
		ai: true,
		emoji: "🚀",
	},
	{
		id: "colors",
		target: "btn-colors",
		title: "Paint your resume 🎨",
		body: "Pick from beautifully curated palettes — your resume restyles instantly.",
		emoji: "🎨",
	},
	{
		id: "fonts",
		target: "btn-fonts",
		title: "Typography that talks 🔤",
		body: "Swap fonts to match your vibe — serif for editorial, mono for engineering, clean sans for the classics.",
		emoji: "🔤",
	},
	{
		id: "templates",
		target: "btn-templates",
		title: "Templates for every story 📐",
		body: "Switch layouts on the fly. Your content travels with you.",
		emoji: "📐",
	},
	{
		id: "finalReview",
		target: "btn-final-review",
		title: "AI Final Review 🎯",
		body: "One click and Zoe scans your whole resume — flagging weak verbs, missing metrics, and giving a polish score.",
		ai: true,
		emoji: "🎯",
	},
	{
		id: "download",
		target: "btn-download",
		title: "Ready? Download! ⬇️",
		body: "Export a print-perfect PDF or editable DOCX in one click. Go land that interview.",
		emoji: "⬇️",
	},
];

const STORAGE_KEY = "zoe_tour_completed_v1";
const OPEN_EVENT = "zoe:open-tour";

export function openZoeTour() {
	window.dispatchEvent(new Event(OPEN_EVENT));
}

type Rect = { top: number; left: number; width: number; height: number };

export function CoachMarks({ steps = ZOE_STEPS }: { steps?: CoachStep[] }) {
	const [active, setActive] = useState(false);
	const [idx, setIdx] = useState(0);
	const [rect, setRect] = useState<Rect | null>(null);
	const [missing, setMissing] = useState(false);

	// Auto-start on first visit
	useEffect(() => {
		if (typeof window === "undefined") return;
		const seen = window.localStorage.getItem(STORAGE_KEY);
		if (!seen) {
			// small delay so layout settles
			const t = setTimeout(() => setActive(true), 600);
			return () => clearTimeout(t);
		}
	}, []);

	// Listen to manual open
	useEffect(() => {
		const onOpen = () => {
			setIdx(0);
			setActive(true);
		};
		window.addEventListener(OPEN_EVENT, onOpen);
		return () => window.removeEventListener(OPEN_EVENT, onOpen);
	}, []);

	const step = steps[idx];

		// Auto-toggle sidebar on mobile based on the target
	useEffect(() => {
		if (!active || !step) return;
		if (typeof window !== "undefined" && window.innerWidth < 640) {
			const isSidebarTarget = step.target.startsWith("section-");
			useBuilderSidebarStore.getState().setLeftSidebarCollapsed(!isSidebarTarget);
		}
	}, [active, step]);
	
	const measure = useCallback(() => {
		if (!step) return;
		let el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);

		if (!el) {
			setMissing(true);
			setRect(null);
			return;
		}
		setMissing(false);
		el.scrollIntoView({ behavior: "smooth", block: "center" });
		// measure after scroll
		requestAnimationFrame(() => {
			const r = el.getBoundingClientRect();
			setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
		});
	}, [step]);

	useLayoutEffect(() => {
		if (!active) return;
		measure();
		const onResize = () => measure();
		window.addEventListener("resize", onResize);
		window.addEventListener("scroll", onResize, true);
		const interval = setInterval(measure, 300);
		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("scroll", onResize, true);
			clearInterval(interval);
		};
	}, [active, measure]);

	const finish = () => {
		setActive(false);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, "1");
		}
	};

	if (!active) return null;

	const PAD = typeof window !== 'undefined' && window.innerWidth < 640 ? 4 : 10;
	let hlLeft = rect ? rect.left - PAD : 0;
	let hlWidth = rect ? rect.width + PAD * 2 : 0;
	let hlTop = rect ? rect.top - PAD : 0;
	let hlHeight = rect ? rect.height + PAD * 2 : 0;

	if (typeof window !== 'undefined' && rect) {
		if (hlLeft < 4) {
			hlWidth -= (4 - hlLeft);
			hlLeft = 4;
		}
		if (hlLeft + hlWidth > window.innerWidth - 4) {
			hlWidth = window.innerWidth - 4 - hlLeft;
		}
	}

	const highlightStyle = rect
		? {
			top: hlTop,
			left: hlLeft,
			width: hlWidth,
			height: hlHeight,
		}
		: null;

	// Tooltip placement — pick best spot to avoid covering target
	const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
	const vh = typeof window !== "undefined" ? window.innerHeight : 800;
	const TOOLTIP_W = Math.min(360, vw - 32);
	const TOOLTIP_H = 220;

	let tipStyle: React.CSSProperties = {
		top: Math.max(16, vh / 2 - TOOLTIP_H / 2),
		left: Math.max(16, vw / 2 - TOOLTIP_W / 2),
	};
	if (highlightStyle) {
		const spaceRight = vw - (highlightStyle.left + highlightStyle.width) - 24;
		const spaceLeft = highlightStyle.left - 24;
		const spaceBelow = vh - (highlightStyle.top + highlightStyle.height) - 24;
		const spaceAbove = highlightStyle.top - 24;

		if (spaceBelow >= TOOLTIP_H + 16) {
			tipStyle = {
				top: highlightStyle.top + highlightStyle.height + 16,
				left: Math.min(vw - TOOLTIP_W - 16, Math.max(16, highlightStyle.left + highlightStyle.width / 2 - TOOLTIP_W / 2)),
			};
		} else if (spaceAbove >= TOOLTIP_H + 16) {
			tipStyle = {
				top: highlightStyle.top - TOOLTIP_H - 16,
				left: Math.min(vw - TOOLTIP_W - 16, Math.max(16, highlightStyle.left + highlightStyle.width / 2 - TOOLTIP_W / 2)),
			};
		} else if (spaceRight >= TOOLTIP_W + 16) {
			tipStyle = {
				top: Math.min(vh - TOOLTIP_H - 16, Math.max(16, highlightStyle.top + highlightStyle.height / 2 - TOOLTIP_H / 2)),
				left: highlightStyle.left + highlightStyle.width + 16,
			};
		} else if (spaceLeft >= TOOLTIP_W + 16) {
			tipStyle = {
				top: Math.min(vh - TOOLTIP_H - 16, Math.max(16, highlightStyle.top + highlightStyle.height / 2 - TOOLTIP_H / 2)),
				left: highlightStyle.left - TOOLTIP_W - 16,
			};
		}
	}

	const isFirst = idx === 0;
	const isLast = idx === steps.length - 1;

	return (
		<div className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
			{/* Dimmed overlay using SVG mask so the highlighted element shines through */}
			<svg className="pointer-events-auto absolute inset-0 h-full w-full" onClick={finish}>
				<defs>
					<mask id="zoe-mask">
						<rect x="0" y="0" width="100%" height="100%" fill="white" />
						{highlightStyle && (
							<rect
								x={highlightStyle.left}
								y={highlightStyle.top}
								width={highlightStyle.width}
								height={highlightStyle.height}
								rx="14"
								ry="14"
								fill="black"
								style={{ transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)" }}
							/>
						)}
					</mask>
				</defs>
				<rect x="0" y="0" width="100%" height="100%" className="fill-slate-900/30 dark:fill-[rgba(8,10,20,0.72)]" mask="url(#zoe-mask)" />
			</svg>

			{/* Animated ring around highlight */}
			{highlightStyle && (
				<>
					<div
						className="pointer-events-none absolute rounded-2xl"
						style={{
							...highlightStyle,
							boxShadow:
								"0 0 0 2px rgba(168,85,247,0.9), 0 0 0 3px rgba(168,85,247,0.25), 0 0 40px rgba(168,85,247,0.45)",
							transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
						}}
					/>
					{/* pulsing halo */}
					<div
						className="pointer-events-none absolute rounded-2xl zoe-pulse"
						style={{
							...highlightStyle,
							transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
						}}
					/>
					{/* floating sparkle */}
					<div
						className="pointer-events-none absolute zoe-float"
						style={{
							top: highlightStyle.top < 20 ? highlightStyle.top + highlightStyle.height - 18 : highlightStyle.top - 18,
							left: typeof window !== "undefined" ? Math.min(highlightStyle.left + highlightStyle.width - 18, window.innerWidth - 44) : highlightStyle.left + highlightStyle.width - 18,
							transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
						}}
					>
						<div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-[0_8px_24px_rgba(168,85,247,0.55)]">
							<Sparkles className="h-4 w-4" />
						</div>
					</div>
				</>
			)}

			<div
				key={step.id}
				className="zoe-tip-enter pointer-events-auto absolute rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_10px_60px_-20px_rgba(168,85,247,0.4)] backdrop-blur-xl dark:border-white/15 dark:bg-transparent dark:bg-gradient-to-br dark:from-[#1a1530] dark:via-[#1a1a2e] dark:to-[#0f0d20] dark:text-white dark:shadow-[0_10px_60px_-20px_rgba(168,85,247,0.6)]"
				style={{ ...tipStyle, width: TOOLTIP_W }}
			>
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" />

				<div className="mb-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-[14px] zoe-bob">
							{step.emoji ?? "✨"}
						</span>
						<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fuchsia-600 dark:text-fuchsia-300/90">
							Zoe · step {idx + 1}/{steps.length}
						</span>
					</div>
				</div>

				<h3 className="font-display text-lg leading-snug">
					{step.title}
				</h3>
				<p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-white/75">{step.body}</p>

				{step.ai && (
					<div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fuchsia-700 dark:border-fuchsia-400/40 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
						<Wand2 className="h-3 w-3" /> Powered by Zoe AI
					</div>
				)}

				{missing && (
					<p className="mt-2 text-xs text-amber-600 dark:text-amber-300/90">
						Couldn't locate this element on the page — it might be off-screen.
					</p>
				)}

				{/* Progress dots */}
				<div className="mt-4 flex items-center justify-center gap-1.5">
					{steps.map((s, i) => (
						<span
							key={s.id}
							className={cn(
								"h-1.5 rounded-full transition-all",
								i === idx ? "w-6 bg-fuchsia-500 dark:bg-fuchsia-400" : i < idx ? "w-1.5 bg-fuchsia-400 dark:bg-fuchsia-400/70" : "w-1.5 bg-slate-200 dark:bg-white/20",
							)}
						/>
					))}
				</div>

				<div className="mt-4 flex flex-wrap items-center justify-between gap-2">
					<button
						onClick={finish}
						className="rounded-full px-3 py-1.5 text-xs text-slate-500 transition hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
					>
						Skip tour
					</button>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setIdx((i) => Math.max(0, i - 1))}
							disabled={isFirst}
							className={cn(
								"flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition",
								isFirst ? "opacity-40" : "hover:bg-slate-100 dark:hover:bg-white/10",
								"border-slate-200 bg-white text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-white"
							)}
						>
							<ChevronLeft className="h-3.5 w-3.5" /> Previous
						</button>
						<button
							onClick={() => (isLast ? finish() : setIdx((i) => Math.min(steps.length - 1, i + 1)))}
							className="group flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-1.5 text-xs font-medium text-white shadow-[0_8px_24px_-8px_rgba(168,85,247,0.6)] transition hover:scale-[1.03] dark:shadow-[0_8px_24px_-8px_rgba(168,85,247,0.8)]"
						>
							{isLast ? "Finish 🎉" : (
								<>
									Next <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
