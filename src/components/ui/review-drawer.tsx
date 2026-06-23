import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import {
	CheckCircleIcon,
	CircleNotchIcon,
	LightbulbIcon,
	MagicWandIcon,
	ShieldWarningIcon,
	StarIcon,
	WarningCircleIcon,
	XIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import type { FinalReviewResult } from "@/components/resume/store/resume";
import { useResumeStore } from "@/components/resume/store/resume";
import { useSectionStore } from "@/routes/builder/$resumeId/-store/section";
import { cn } from "@/utils/style";

type ReviewDrawerProps = {
	result: FinalReviewResult;
};

// ─── Keyword → Sidebar Section mapping ───────────────────────────────────────
const SECTION_KEYWORD_MAP: Array<{ keywords: string[]; section: string }> = [
	{ keywords: ["project", "portfolio", "github", "repo", "repository"], section: "projects" },
	{ keywords: ["experience", "job", "work", "role", "position", "company", "employer", "employment"], section: "experience" },
	{ keywords: ["education", "degree", "university", "college", "school", "gpa", "grade", "course"], section: "education" },
	{ keywords: ["skill", "technology", "tool", "language", "framework", "programming"], section: "skills" },
	{ keywords: ["certification", "certificate", "licence", "license", "course", "award"], section: "certifications" },
	{ keywords: ["language", "fluent", "native", "proficiency"], section: "languages" },
	{ keywords: ["interest", "hobby", "hobbies", "activities"], section: "interests" },
	{ keywords: ["volunteer", "volunteering", "community", "service"], section: "volunteer" },
	{ keywords: ["publication", "paper", "article", "research"], section: "publications" },
	{ keywords: ["reference", "referee"], section: "references" },
	{ keywords: ["summary", "objective", "about"], section: "summary" },
	{ keywords: ["name", "email", "phone", "address", "location", "linkedin", "website", "url", "link", "headline", "photo", "picture", "contact", "profile", "basic"], section: "basics" },
];

function inferSectionFromText(issueText: string): string | null {
	const lower = issueText.toLowerCase();
	for (const { keywords, section } of SECTION_KEYWORD_MAP) {
		if (keywords.some((kw) => lower.includes(kw))) return section;
	}
	return null;
}

function inferTargetFromText(issueText: string): string | undefined {
	const lower = issueText.toLowerCase();
	if (lower.includes("name")) return "name";
	if (lower.includes("email")) return "email";
	if (lower.includes("phone")) return "phone";
	if (lower.includes("date") || lower.includes("period")) return "date";
	if (lower.includes("school") || lower.includes("university") || lower.includes("institution")) return "institution";
	if (lower.includes("degree")) return "degree";
	if (lower.includes("grade") || lower.includes("cgpa") || lower.includes("percentage")) return "percentage";
	if (lower.includes("company") || lower.includes("employer")) return "company";
	if (lower.includes("summary") || lower.includes("objective")) return "summary";
	if (lower.includes("role") || lower.includes("position")) return "role";
	return undefined;
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
function MiniScoreRing({ value }: { value: number }) {
	const r = 34;
	const c = 2 * Math.PI * r;
	const offset = c - (value / 100) * c;
	const color = value < 40 ? "#f43f5e" : value < 70 ? "#f59e0b" : "#10b981";
	return (
		<div className="relative grid h-20 w-20 shrink-0 place-items-center">
			<svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
				<circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
				<circle
					cx="40"
					cy="40"
					r={r}
					fill="none"
					stroke={color}
					strokeWidth="6"
					strokeLinecap="round"
					strokeDasharray={c}
					strokeDashoffset={offset}
					style={{
						transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)",
						filter: `drop-shadow(0 0 6px ${color}88)`,
					}}
				/>
			</svg>
			<div className="relative z-10 text-center">
				<p className="text-xl font-bold leading-none text-white">{value}</p>
				<p className="mt-0.5 text-[9px] uppercase tracking-widest text-white/35">/100</p>
			</div>
		</div>
	);
}

type Tone = "critical" | "important" | "suggestion" | "strength";

const TONE_STYLES: Record<Tone, { text: string; btn: string }> = {
	critical: {
		text: "text-zinc-300",
		btn: "border-rose-500/30 text-rose-400 hover:bg-rose-500/10",
	},
	important: {
		text: "text-zinc-300",
		btn: "border-amber-500/30 text-amber-400 hover:bg-amber-500/10",
	},
	suggestion: {
		text: "text-zinc-300",
		btn: "border-sky-500/30 text-sky-400 hover:bg-sky-500/10",
	},
	strength: {
		text: "text-zinc-300",
		btn: "",
	},
};

function IssueRow({
	text,
	tone,
	onGoToField,
}: {
	text: string;
	tone: Tone;
	onGoToField?: (sectionId: string, targetField?: string) => void;
}) {
	const inferredSection = inferSectionFromText(text);
	const inferredTarget = inferTargetFromText(text);
	const styles = TONE_STYLES[tone];

	return (
		<div className="border-b border-white/5 p-4 last:border-b-0">
			<p className={cn("mb-2.5 text-[13px] leading-relaxed", styles.text)}>{text}</p>
			{inferredSection && onGoToField && (
				<button
					type="button"
					onClick={() => onGoToField(inferredSection, inferredTarget)}
					className={cn(
						"inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition",
						styles.btn,
					)}
				>
					<Trans>Go to Field</Trans>
					<svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			)}
		</div>
	);
}

// ─── Review Card Section ──────────────────────────────────────────────────────
const SECTION_STYLES: Record<
	Tone,
	{ title: string; border: string; badgeBg: string; badgeText: string; icon: React.ReactNode }
> = {
	critical: {
		title: "text-rose-400",
		border: "border-rose-500/20",
		badgeBg: "bg-rose-500/15 border-rose-500/30 text-rose-400",
		badgeText: "text-rose-400",
		icon: <ShieldWarningIcon className="h-4 w-4" weight="fill" />,
	},
	important: {
		title: "text-amber-400",
		border: "border-amber-500/20",
		badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-400",
		badgeText: "text-amber-400",
		icon: <WarningCircleIcon className="h-4 w-4" weight="fill" />,
	},
	suggestion: {
		title: "text-sky-400",
		border: "border-sky-500/20",
		badgeBg: "bg-sky-500/15 border-sky-500/30 text-sky-400",
		badgeText: "text-sky-400",
		icon: <LightbulbIcon className="h-4 w-4" weight="fill" />,
	},
	strength: {
		title: "text-emerald-400",
		border: "border-emerald-500/20",
		badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
		badgeText: "text-emerald-400",
		icon: <CheckCircleIcon className="h-4 w-4" weight="fill" />,
	},
};

function ReviewSection({
	tone,
	title,
	items,
	withAction = true,
	onGoToField,
}: {
	tone: Tone;
	title: string;
	items: string[];
	withAction?: boolean;
	onGoToField?: (sectionId: string, targetField?: string) => void;
}) {
	if (items.length === 0) return null;
	const s = SECTION_STYLES[tone];

	return (
		<section className="space-y-2.5">
			<div className="flex items-center justify-between px-1">
				<div className={cn("flex items-center gap-2 text-sm font-semibold", s.title)}>
					{s.icon}
					{title}
				</div>
				<span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold", s.badgeBg)}>
					{items.length}
				</span>
			</div>
			<div className={cn("divide-y divide-white/5 rounded-2xl border bg-zinc-800/40 backdrop-blur-xl", s.border)}>
				{items.map((item, i) => (
					<IssueRow
						key={i}
						text={item}
						tone={tone}
						onGoToField={withAction ? onGoToField : undefined}
					/>
				))}
			</div>
		</section>
	);
}

// ─── Main Drawer ──────────────────────────────────────────────────────────────
export function ReviewDrawer({ result }: ReviewDrawerProps) {
	const showDrawer = useResumeStore((state) => state.showReviewDrawer);
	const setShowDrawer = useResumeStore((state) => state.setShowReviewDrawer);
	const autoFixResumeIssues = useResumeStore((state) => state.autoFixResumeIssues);
	const navigateToSection = useSectionStore((state) => state.navigateToSection);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [isFixing, setIsFixing] = useState(false);

	const verdict =
		result.final_verdict === "READY"
			? "Looking Sharp"
			: result.final_verdict === "NEEDS_MINOR_FIXES"
				? "Getting There"
				: "Needs Major Work";

	const verdictColor =
		result.final_verdict === "READY"
			? "bg-emerald-500"
			: result.final_verdict === "NEEDS_MINOR_FIXES"
				? "bg-amber-500"
				: "bg-rose-500";

	const handleGoToField = (sectionId: string, targetField?: string) => {
		setShowDrawer(false);
		setTimeout(() => navigateToSection(sectionId, targetField), 300);
	};

	const handleAutoFix = async () => {
		setIsFixing(true);
		const toastId = toast.loading(t`Fixing issues automatically...`);
		try {
			await autoFixResumeIssues();
			toast.success(t`Issues fixed successfully!`, {
				id: toastId,
				description: t`Your resume has been automatically improved. Review the changes.`,
			});
		} catch (error) {
			console.error("Auto-fix failed:", error);
			toast.error(t`Failed to fix issues automatically`, {
				id: toastId,
				description: t`Please try fixing issues manually or contact support.`,
			});
		} finally {
			setIsFixing(false);
		}
	};

	const hasIssues =
		result.critical.length > 0 || result.important.length > 0 || result.suggestions.length > 0;

	return (
		<AnimatePresence>
			{showDrawer && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-100 bg-black/20 backdrop-blur-sm"
						onClick={() => setShowDrawer(false)}
					/>

					{/* Drawer */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed top-0 right-0 z-101 flex h-full w-full max-w-[440px] flex-col overflow-hidden border-l border-white/10 bg-zinc-900 text-white shadow-2xl"
					>
						{/* Header */}
						<div className="flex items-start justify-between border-b border-white/7 px-6 pb-4 pt-7">
							<div>
								<div className="mb-1 flex items-center gap-2">
									<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
									<span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
										<Trans>Zoe AI Active</Trans>
									</span>
								</div>
								<h2 className="font-bold text-2xl tracking-tight text-white">
									<Trans>Final Review</Trans>
								</h2>
								<p className="text-sm text-zinc-400">
									<Trans>AI-powered resume analysis</Trans>
								</p>
							</div>
							<button
								type="button"
								onClick={() => setShowDrawer(false)}
								aria-label="Close drawer"
								className="mt-1 rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
							>
								<XIcon className="h-5 w-5" />
							</button>
						</div>

						{/* Score Hero */}
						<div className="mx-6 mt-4 flex items-center gap-5 rounded-2xl border border-white/5 bg-gradient-to-br from-rose-500/10 via-fuchsia-500/5 to-transparent px-4 py-4">
							<MiniScoreRing value={result.overall_score} />
							<div className="flex-1">
								<span
									className={cn(
										"mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white",
										verdictColor,
									)}
								>
									{verdict}
								</span>
								<p className="text-[11px] leading-relaxed text-zinc-400">
									<Trans>Zoe found several critical gaps that might stop your resume from passing ATS.</Trans>
								</p>
							</div>
						</div>

						{/* Stat Strip */}
						<div className="mx-6 mt-3 grid grid-cols-4 gap-1.5">
							{[
								{ n: result.critical.length, label: "Critical", color: "text-rose-300" },
								{ n: result.important.length, label: "Important", color: "text-amber-300" },
								{ n: result.suggestions.length, label: "Tips", color: "text-sky-300" },
								{ n: result.strengths.length, label: "Strong", color: "text-emerald-300" },
							].map((s) => (
								<div
									key={s.label}
									className="rounded-xl border border-white/5 bg-white/[0.03] px-2 py-2 text-center"
								>
									<p className={cn("text-lg font-bold leading-none", s.color)}>{s.n}</p>
									<p className="mt-1 text-[9px] uppercase tracking-wider text-white/40">{s.label}</p>
								</div>
							))}
						</div>

						{/* Scrollable Body */}
						<div className="mt-4 flex-1 space-y-4 overflow-y-auto px-5 pb-6">
							<ReviewSection
								tone="critical"
								title={t`Critical Issues`}
								items={result.critical}
								onGoToField={handleGoToField}
							/>
							<ReviewSection
								tone="important"
								title={t`Important Issues`}
								items={result.important}
								onGoToField={handleGoToField}
							/>
							<ReviewSection
								tone="suggestion"
								title={t`Suggestions`}
								items={result.suggestions}
								onGoToField={handleGoToField}
							/>
							<ReviewSection
								tone="strength"
								title={t`Strengths`}
								items={result.strengths}
								withAction={false}
							/>

							{/* Detailed Checks */}
							<button
								type="button"
								onClick={() => setDetailsOpen((o) => !o)}
								className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-zinc-800/80 p-4 text-sm font-semibold text-zinc-400 transition hover:text-white"
							>
								<span className="flex items-center gap-2">
									<StarIcon className="h-4 w-4 text-fuchsia-300" weight="fill" />
									<Trans>Detailed Checks</Trans>
								</span>
								<motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
									▼
								</motion.span>
							</button>

							<AnimatePresence>
								{detailsOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-[12px] leading-relaxed text-zinc-400">
											<Trans>
												Full diagnostic report including ATS compatibility, keyword density, section ordering,
												formatting consistency and grammar checks.
											</Trans>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Footer */}
						<div className="border-t border-white/5 bg-zinc-900/95 p-5 backdrop-blur-xl">
							{hasIssues && (
								<button
									type="button"
									onClick={handleAutoFix}
									disabled={isFixing}
									className="group relative mb-3 w-full overflow-hidden rounded-2xl bg-emerald-500 py-3.5 text-sm font-bold text-neutral-950 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.5)] transition hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-70"
								>
									{isFixing ? (
										<span className="inline-flex items-center gap-2">
											<CircleNotchIcon className="h-4 w-4 animate-spin" />
											<Trans>Fixing Issues...</Trans>
										</span>
									) : (
										<span className="inline-flex items-center gap-2">
											<MagicWandIcon className="h-4 w-4" />
											<Trans>Auto-fix with Zoe AI</Trans>
										</span>
									)}
								</button>
							)}
							<button
								type="button"
								onClick={() => setShowDrawer(false)}
								className="w-full rounded-2xl border border-white/10 py-3 text-sm font-semibold text-zinc-400 transition hover:border-white/20 hover:text-white"
							>
								<Trans>Close Review</Trans>
							</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}