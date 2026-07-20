import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import { CheckCircleIcon, LightbulbIcon, ShieldWarningIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
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
	{
		keywords: ["experience", "job", "work", "role", "position", "company", "employer", "employment"],
		section: "experience",
	},
	{
		keywords: ["education", "degree", "university", "college", "school", "gpa", "grade", "course"],
		section: "education",
	},
	{ keywords: ["skill", "technology", "tool", "language", "framework", "programming"], section: "skills" },
	{ keywords: ["certification", "certificate", "licence", "license", "course", "award"], section: "certifications" },
	{ keywords: ["language", "fluent", "native", "proficiency"], section: "languages" },
	{ keywords: ["interest", "hobby", "hobbies", "activities"], section: "interests" },
	{ keywords: ["volunteer", "volunteering", "community", "service"], section: "volunteer" },
	{ keywords: ["publication", "paper", "article", "research"], section: "publications" },
	{ keywords: ["reference", "referee"], section: "references" },
	{ keywords: ["summary", "objective", "about"], section: "summary" },
	{
		keywords: [
			"name",
			"email",
			"phone",
			"address",
			"location",
			"linkedin",
			"website",
			"url",
			"link",
			"headline",
			"photo",
			"picture",
			"contact",
			"profile",
			"basic",
		],
		section: "basics",
	},
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
	const color = value < 30 ? "#f43f5e" : value < 60 ? "#f59e0b" : "#10b981";
	return (
		<div className="relative grid h-20 w-20 shrink-0 place-items-center">
			<svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
				<circle cx="40" cy="40" r={r} fill="none" className="stroke-zinc-200 dark:stroke-white/10" strokeWidth="6" />
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
				<p className="font-bold text-xl text-zinc-900 leading-none dark:text-white">{value}</p>
				<p className="mt-0.5 text-[9px] text-zinc-500 uppercase tracking-widest dark:text-white/35">/100</p>
			</div>
		</div>
	);
}

type Tone = "critical" | "important" | "suggestion" | "strength";

const TONE_STYLES: Record<Tone, { text: string; btn: string }> = {
	critical: {
		text: "text-zinc-700 dark:text-zinc-300",
		btn: "border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10",
	},
	important: {
		text: "text-zinc-700 dark:text-zinc-300",
		btn: "border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
	},
	suggestion: {
		text: "text-zinc-700 dark:text-zinc-300",
		btn: "border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10",
	},
	strength: {
		text: "text-zinc-700 dark:text-zinc-300",
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
		<div className="border-zinc-200 border-b p-4 last:border-b-0 dark:border-white/5">
			<p className={cn("mb-2.5 text-[13px] leading-relaxed", styles.text)}>{text}</p>
			{inferredSection && onGoToField && (
				<button
					type="button"
					onClick={() => onGoToField(inferredSection, inferredTarget)}
					className={cn(
						"inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-semibold text-[11px] transition",
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
		title: "text-rose-600 dark:text-rose-400",
		border: "border-rose-500/20",
		badgeBg: "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400",
		badgeText: "text-rose-600 dark:text-rose-400",
		icon: <ShieldWarningIcon className="h-4 w-4" weight="fill" />,
	},
	important: {
		title: "text-amber-600 dark:text-amber-400",
		border: "border-amber-500/20",
		badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
		badgeText: "text-amber-600 dark:text-amber-400",
		icon: <WarningCircleIcon className="h-4 w-4" weight="fill" />,
	},
	suggestion: {
		title: "text-sky-600 dark:text-sky-400",
		border: "border-sky-500/20",
		badgeBg: "bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-400",
		badgeText: "text-sky-600 dark:text-sky-400",
		icon: <LightbulbIcon className="h-4 w-4" weight="fill" />,
	},
	strength: {
		title: "text-emerald-600 dark:text-emerald-400",
		border: "border-emerald-500/20",
		badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
		badgeText: "text-emerald-600 dark:text-emerald-400",
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
				<div className={cn("flex items-center gap-2 font-semibold text-sm", s.title)}>
					{s.icon}
					{title}
				</div>
				<span className={cn("rounded-full border px-2 py-0.5 font-mono font-semibold text-[10px]", s.badgeBg)}>
					{items.length}
				</span>
			</div>
			<div
				className={cn(
					"divide-y divide-zinc-200 rounded-2xl border bg-white shadow-sm backdrop-blur-xl dark:divide-white/5 dark:bg-zinc-800/40 dark:shadow-none",
					s.border,
				)}
			>
				{items.map((item, i) => (
					<IssueRow key={i} text={item} tone={tone} onGoToField={withAction ? onGoToField : undefined} />
				))}
			</div>
		</section>
	);
}

// ─── Main Drawer ──────────────────────────────────────────────────────────────
export function ReviewDrawer({ result }: ReviewDrawerProps) {
	const showDrawer = useResumeStore((state) => state.showReviewDrawer);
	const setShowDrawer = useResumeStore((state) => state.setShowReviewDrawer);
	const navigateToSection = useSectionStore((state) => state.navigateToSection);
	const verdict =
		result.overall_score >= 60 ? "Looking Sharp" : result.overall_score >= 30 ? "Getting There" : "Needs Major Work";

	const verdictColor =
		result.overall_score >= 60 ? "bg-emerald-500" : result.overall_score >= 30 ? "bg-amber-500" : "bg-rose-500";

	const handleGoToField = (sectionId: string, targetField?: string) => {
		setShowDrawer(false);
		setTimeout(() => navigateToSection(sectionId, targetField), 300);
	};

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
						className="fixed top-0 right-0 z-101 flex h-full w-full max-w-[440px] flex-col overflow-hidden border-zinc-200 border-l bg-zinc-50 text-zinc-900 shadow-2xl dark:border-white/10 dark:bg-zinc-900 dark:text-white"
					>
						{/* Header */}
						<div className="flex items-start justify-between border-zinc-200 border-b px-6 pt-7 pb-4 dark:border-white/7">
							<div>
								<div className="mb-1 flex items-center gap-2">
									<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
									<span className="font-bold text-[10px] text-emerald-600 dark:text-emerald-400/80 uppercase tracking-[0.18em]">
										<Trans>Zoe AI Active</Trans>
									</span>
								</div>
								<h2 className="font-bold text-2xl text-zinc-900 tracking-tight dark:text-white">
									<Trans>Final Review</Trans>
								</h2>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									<Trans>AI-powered resume analysis</Trans>
								</p>
							</div>
							<button
								type="button"
								onClick={() => setShowDrawer(false)}
								aria-label="Close drawer"
								className="mt-1 rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
							>
								<XIcon className="h-5 w-5" />
							</button>
						</div>

						{/* Score Hero */}
						<div className="mx-6 mt-4 flex items-center gap-5 rounded-2xl border border-zinc-200 bg-gradient-to-br from-rose-500/5 via-fuchsia-500/5 to-transparent px-4 py-4 shadow-sm dark:border-white/5 dark:from-rose-500/10 dark:via-fuchsia-500/5 dark:shadow-none">
							<MiniScoreRing value={result.overall_score} />
							<div className="flex-1">
								<span
									className={cn(
										"mb-1.5 inline-block rounded-full px-2.5 py-0.5 font-bold text-[10px] text-white uppercase tracking-wider",
										verdictColor,
									)}
								>
									{verdict}
								</span>
								<p className="text-[11px] text-zinc-600 leading-relaxed dark:text-zinc-400">
									<Trans>Zoe found several critical gaps that might stop your resume from passing ATS.</Trans>
								</p>
							</div>
						</div>

						{/* Stat Strip */}
						<div className="mx-6 mt-3 grid grid-cols-4 gap-1.5">
							{[
								{ n: result.critical.length, label: "Critical", color: "text-rose-600 dark:text-rose-300" },
								{ n: result.important.length, label: "Important", color: "text-amber-600 dark:text-amber-300" },
								{ n: result.suggestions.length, label: "Tips", color: "text-sky-600 dark:text-sky-300" },
								{ n: result.strengths.length, label: "Strong", color: "text-emerald-600 dark:text-emerald-300" },
							].map((s) => (
								<div
									key={s.label}
									className="rounded-xl border border-zinc-200 bg-white px-2 py-2 text-center shadow-sm dark:border-white/5 dark:bg-white/[0.03] dark:shadow-none"
								>
									<p className={cn("font-bold text-lg leading-none", s.color)}>{s.n}</p>
									<p className="mt-1 text-[9px] text-zinc-500 uppercase tracking-wider dark:text-white/40">{s.label}</p>
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
							<ReviewSection tone="strength" title={t`Strengths`} items={result.strengths} withAction={false} />
						</div>

						{/* Footer */}
						<div className="border-zinc-200 border-t bg-white/95 p-5 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-900/95">
							<button
								type="button"
								onClick={() => setShowDrawer(false)}
								className="w-full rounded-2xl border border-zinc-200 py-3 font-semibold text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:bg-transparent dark:hover:text-white"
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
