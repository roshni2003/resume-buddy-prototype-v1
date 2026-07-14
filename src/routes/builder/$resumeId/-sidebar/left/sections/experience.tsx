import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import {
	BriefcaseIcon,
	BuildingsIcon,
	CalendarBlankIcon,
	CaretDownIcon,
	CaretUpIcon,
	MapPinIcon,
	PlusIcon,
	SparkleIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type z from "zod";

import { RichInput } from "@/components/input/rich-input";
import { useResumeStore } from "@/components/resume/store/resume";
import { AIGenerateButton } from "@/components/ui/ai-generate-button";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { experienceItemSchema } from "@/schema/resume/data";
import { SectionBase } from "../shared/section-base";
import { generateId } from "@/utils/string";
type FormValues = z.infer<typeof experienceItemSchema>;

type PanelState =
	| { mode: "idle" }
	| { mode: "create" }
	| { mode: "edit"; id: string };
function formatDate(dateString: string | undefined): string {
	if (!dateString) return "";
	try {
		const d = new Date(dateString);
		return d.toLocaleString("en-US", { month: "short", year: "numeric" });
	} catch {
		return dateString;
	}
}

function ZoeTipsCard() {
	return (
		<div className="relative overflow-hidden rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-linear-to-br from-emerald-50 dark:from-emerald-900/20 to-teal-50/50 dark:to-teal-900/20 p-5 shadow-sm">
			<div className="absolute top-0 right-0 p-4 opacity-10">
				<SparkleIcon weight="fill" className="h-24 w-24 text-emerald-600 dark:text-emerald-400" />
			</div>
			<div className="mb-3 flex items-center gap-2">
				<SparkleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" weight="fill" />
				<h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm uppercase tracking-widest">Zoe Tips</h4>
			</div>
			<ul className="mb-4 space-y-2 font-medium text-emerald-900 dark:text-emerald-200 text-sm">
				<li className="flex items-center gap-2">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					Start each bullet with a strong action verb
				</li>
				<li className="flex items-center gap-2">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					Add numbers — % growth, team size, revenue saved
				</li>
				<li className="flex items-center gap-2">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					Focus on impact, not just responsibilities
				</li>
				<li className="flex items-center gap-2">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					Keep descriptions under 80 words
				</li>
			</ul>
			<p className="font-serif text-emerald-700 dark:text-emerald-400 text-sm italic">
				Zoe will polish tone, tighten verbs, and quantify impact for you. Look for the magic button above!
			</p>
		</div>
	);
}

interface InlineFormProps {
	defaultValues: FormValues;
	onSave: (values: FormValues) => void;
	onCancel: () => void;
	isNew?: boolean;
}

function InlineExperienceForm({
	defaultValues,
	onSave,
	onCancel,
	isNew = false,
}: InlineFormProps) {
	const [isPulsing, setIsPulsing] = useState(true);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsPulsing(false), 5000);
		return () => clearTimeout(timer);
	}, []);

	const form = useForm<FormValues>({
		resolver: zodResolver(experienceItemSchema),
		defaultValues,
	});

	const experienceId = form.getValues("id");
	const description = useWatch({ control: form.control, name: "description" });
	const previousDescriptionRef = useRef(description);
	const aiUpdateCountRef = useRef(0);

	const roundsUsed = useResumeStore(
		(state) => state.experienceAIRoundsUsed?.[experienceId] ?? 0
	);
	const incrementRoundsUsed = useResumeStore(
		(state) => state.incrementExperienceRounds
	);
	const resetRounds = useResumeStore((state) => state.resetExperienceRounds);
	const maxRounds = 2;

	useEffect(() => {
		if (aiUpdateCountRef.current > 0) {
			aiUpdateCountRef.current -= 1;
			previousDescriptionRef.current = description;
			return;
		}
		if (description !== previousDescriptionRef.current) {
			resetRounds(experienceId);
		}
		previousDescriptionRef.current = description;
	}, [description, resetRounds, experienceId]);

	const wordCount =
		typeof description === "string"
			? description.trim().split(/\s+/).filter(Boolean).length
			: 0;
	const charCount =
		typeof description === "string" ? description.replace(/<[^>]*>/g, "").length : 0;
	const isWordCountValid = wordCount >= 5;

	const handleAIGenerated = (aiText: string) => {
		if (aiText && aiText.length > 10) {
			aiUpdateCountRef.current = 2;
			form.setValue("description", aiText, {
				shouldDirty: true,
				shouldValidate: true,
			});
			incrementRoundsUsed(experienceId);
		}
	};

	const currentlyWorking = form.watch("currentlyWorkingHere");
	const shouldGlow = isPulsing || isHovering;

	return (
		<Form {...form}>
			<form
				className="space-y-5"
				onSubmit={form.handleSubmit(onSave)}
			>
				{/* ── Row 1: Company + Position ── */}
				<div className="grid gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="company"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<BuildingsIcon className="h-3.5 w-3.5" />
									<Trans>Company</Trans>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Acme Corp"
										className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-emerald-400 focus:ring-emerald-200"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="position"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<BriefcaseIcon className="h-3.5 w-3.5" />
									<Trans>Position</Trans>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Senior Engineer"
										className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-emerald-400 focus:ring-emerald-200"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* ── Row 2: Location ── */}
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
								<MapPinIcon className="h-3.5 w-3.5" />
								<Trans>Location</Trans>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="San Francisco, CA"
									className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-emerald-400 focus:ring-emerald-200"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* ── Row 3: Dates + Currently Working ── */}
				<div className="grid gap-4 sm:grid-cols-3">
					<FormField
						control={form.control}
						name="startDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<CalendarBlankIcon className="h-3.5 w-3.5" />
									<Trans>Start Date</Trans>
								</FormLabel>
								<FormControl>
									<Input
										type="date"
										{...field}
										className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-emerald-400 focus:ring-emerald-200"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<CalendarBlankIcon className="h-3.5 w-3.5" />
									<Trans>End Date</Trans>
								</FormLabel>
								<FormControl>
									<Input
										type="date"
										{...field}
										disabled={currentlyWorking}
										className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 disabled:opacity-40 focus:border-emerald-400 focus:ring-emerald-200"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="currentlyWorkingHere"
					render={({ field }) => (
						<FormItem className="flex flex-col justify-end pb-0.5">
							<FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
								&nbsp;
							</FormLabel>
							<div className="flex items-center gap-2">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<span className="text-sm text-gray-600 dark:text-gray-400">
									<Trans>Currently here</Trans>
								</span>
							</div>
						</FormItem>
					)}
				/>

				{/* ── Description + AI ── */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<div className="mb-3 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-end sm:justify-between gap-y-2 sm:gap-y-0">
								<FormLabel className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest block w-full sm:w-auto sm:mb-2">
									<Trans>Description</Trans>
								</FormLabel>

								<div className="w-fit origin-left sm:origin-right scale-90 sm:scale-100 order-last sm:order-none sm:ml-auto mt-1 sm:mt-0">
									<div
										className="relative rounded-xl bg-gray-50 p-1 sm:mb-2"
										onMouseEnter={() => setIsHovering(true)}
										onMouseLeave={() => setIsHovering(false)}
									>
										{shouldGlow && (
											<>
												<div className="absolute -inset-1 rounded-full bg-blue-400/40 blur-md animate-ai-glow" />
												<div className="absolute -inset-2 rounded-full border border-blue-300/50 animate-ai-glow-ring" />
											</>
										)}

										<AIGenerateButton
											resumeId={useResumeStore.getState().resume.id}
											type="experience"
											data={{
												position: form.getValues("position"),
												company: form.getValues("company"),
												summary: description,
											}}
											onGenerated={handleAIGenerated}
											roundsUsed={roundsUsed}
											maxRounds={maxRounds}
											isWordCountValid={isWordCountValid}
											disabled={roundsUsed >= maxRounds || !isWordCountValid}
											className="relative z-10 font-bold text-black shadow-lg shadow-blue-500/30 hover:text-black"
										/>
									</div>
								</div>

								<div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 order-2 sm:order-none sm:mb-3">
									<div className="w-fit">
										<span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
											<SparkleIcon weight="fill" className="h-3 w-3" />
											AI Assisted
										</span>
									</div>

									<span className="text-xs text-slate-700 dark:text-gray-400">
										Turn bullet points into standout achievements.
									</span>
								</div>
							</div>
							
							<FormControl>
								<RichInput
									{...field}
									value={field.value || ""}
									onChange={field.onChange}
								/>
							</FormControl>

							{/* Word / char count */}
							<p className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
								<span>
									{wordCount} words · {charCount} chars
								</span>
								{!isWordCountValid && field.value && (
									<span className="text-amber-500">
										<Trans>Write at least 5 words to enable Ask Zoe</Trans>
									</span>
								)}
							</p>

							{roundsUsed === 1 && (
								<p className="text-xs text-blue-500">
									<Trans>You have 1 more AI suggestion left for this text.</Trans>
								</p>
							)}
							{roundsUsed >= maxRounds && (
								<p className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600">
									<Trans>
										✓ You've used both AI suggestions. Edit the text to get new
										suggestions.
									</Trans>
								</p>
							)}

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* ── Actions ── */}
				<div className="flex justify-end gap-2 pt-1">
					<Button
						type="button"
						variant="ghost"
						className="rounded-xl border border-gray-200 dark:border-border text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted/50"
						onClick={onCancel}
					>
						<Trans>Cancel</Trans>
					</Button>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
					>
						{isNew ? <Trans>Add Experience</Trans> : <Trans>Save Changes</Trans>}
					</Button>
				</div>

				{/* ── Tips Card ── */}
				<ZoeTipsCard />
			</form>
		</Form>
	);
}

/* ─────────────────────────────────────────────
   EXPERIENCE CARD  (collapsed / expanded)
───────────────────────────────────────────── */
interface ExperienceCardProps {
	item: FormValues;
	isExpanded: boolean;
	onToggle: () => void;
	onSave: (values: FormValues) => void;
	onDelete: () => void;
}

function ExperienceCard({
	item,
	isExpanded,
	onToggle,
	onSave,
	onDelete,
}: ExperienceCardProps) {
	const dateRange = [
		formatDate(item.startDate),
		item.currentlyWorkingHere
			? "Present"
			: item.endDate
				? formatDate(item.endDate)
				: "",
	]
		.filter(Boolean)
		.join(" – ");

	return (
		<div
			className={`rounded-2xl border dark:bg-card shadow-sm transition-all duration-200 ${isExpanded
				? "bg-white dark:border-emerald-700/50 shadow-emerald-100 dark:shadow-none shadow-md"
				: "bg-white dark:bg-card border-gray-100 dark:border-border hover:border-gray-200 dark:hover:border-border/80 hover:shadow"
				}`}
		>
			{/* ── Header (always visible) ── */}
			<button
				type="button"
				onClick={onToggle}
				className="flex w-full items-center gap-3 px-5 py-4 text-left"
			>
				{/* Icon bubble */}
				<span
					className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm transition-colors ${isExpanded ? "bg-indigo-100 dark:bg-indigo-900/30" : "bg-gray-100 dark:bg-muted"
						}`}
				>
					<BriefcaseIcon
						weight="fill"
						className={`h-6 w-6 ${isExpanded ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
							}`}
					/>
				</span>

				<div className="min-w-0 flex-1">
					<p
						className={`truncate font-semibold leading-tight ${isExpanded ? "text-indigo-800 dark:text-indigo-300" : "text-gray-800 dark:text-gray-200"
							}`}
					>
						{item.position || "New Position"}
					</p>
					<p className="truncate text-sm text-gray-500 dark:text-gray-400">
						{[item.company, item.location].filter(Boolean).join(" · ")}
						{dateRange && (
							<span className="ml-2 text-xs text-gray-400 dark:text-gray-500">{dateRange}</span>
						)}
					</p>
				</div>

				{/* Expand / collapse chevron */}
				<span className="shrink-0 text-gray-400 dark:text-gray-500">
					{isExpanded ? (
						<CaretUpIcon className="h-4 w-4" />
					) : (
						<CaretDownIcon className="h-4 w-4" />
					)}
				</span>
			</button>

			{/* ── Expanded form ── */}
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						key="form"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="border-t border-gray-100 dark:border-border px-5 pb-6 pt-5">
							{/* Delete link */}
							<div className="mb-4 flex justify-end">
								<button
									type="button"
									onClick={onDelete}
									className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600"
								>
									<TrashIcon className="h-3.5 w-3.5" />
									<Trans>Remove</Trans>
								</button>
							</div>

							<InlineExperienceForm
								key={item.id}
								defaultValues={item}
								onSave={onSave}
								onCancel={onToggle}
								isNew={false}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

/* ─────────────────────────────────────────────
   ADD NEW PANEL
───────────────────────────────────────────── */
function AddNewPanel({
	onSave,
	onCancel,
}: {
	onSave: (v: FormValues) => void;
	onCancel: () => void;
}) {
	const newDefaults: FormValues = {
		id: generateId(),
		hidden: false,
		options: { showLinkInTitle: false },
		company: "",
		position: "",
		location: "",
		startDate: "",
		endDate: "",
		currentlyWorkingHere: false,
		description: "",
		period: "",
		website: { url: "", label: "" },
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -8 }}
			transition={{ duration: 0.2 }}
			className="rounded-2xl border border-emerald-300 dark:border-emerald-700/50 bg-gradient-to-b from-white dark:from-card to-emerald-50/30 dark:to-muted/30 p-5 shadow-md shadow-emerald-100 dark:shadow-none"
		>
			<div className="mb-4 flex items-center gap-2">
				<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
					<PlusIcon weight="bold" className="h-4 w-4" />
				</span>
				<p className="font-semibold text-emerald-800 dark:text-emerald-300">
					<Trans>New Experience</Trans>
				</p>
			</div>

			<InlineExperienceForm
				defaultValues={newDefaults}
				onSave={onSave}
				onCancel={onCancel}
				isNew
			/>
		</motion.div>
	);
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export function ExperienceSectionBuilder() {
	const section = useResumeStore(
		(state) => state.resume.data.sections.experience
	);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [panel, setPanel] = useState<PanelState>({ mode: "idle" });

	/* open/close an existing item */
	const toggleEdit = (id: string) =>
		setPanel((prev) =>
			prev.mode === "edit" && prev.id === id
				? { mode: "idle" }
				: { mode: "edit", id }
		);

	/* save edited item */
	const handleUpdate = (values: FormValues) => {
		updateResumeData((draft) => {
			const idx = draft.sections.experience.items.findIndex(
				(i) => i.id === values.id
			);
			if (idx !== -1) draft.sections.experience.items[idx] = values;
		});
		setPanel({ mode: "idle" });
	};

	/* save new item */
	const handleCreate = (values: FormValues) => {
		updateResumeData((draft) => {
			draft.sections.experience.items.push(values);
		});
		setPanel({ mode: "idle" });
	};

	/* delete */
	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			draft.sections.experience.items = draft.sections.experience.items.filter(
				(i) => i.id !== id
			);
		});
		setPanel({ mode: "idle" });
	};

	return (
		<SectionBase type="experience">
			<div className="space-y-3">
				{/* ── Existing items ── */}
				{section.items.map((item) => (
					<ExperienceCard
						key={item.id}
						item={item}
						isExpanded={panel.mode === "edit" && panel.id === item.id}
						onToggle={() => toggleEdit(item.id)}
						onSave={handleUpdate}
						onDelete={() => handleDelete(item.id)}
					/>
				))}

				{/* ── Add-new panel ── */}
				<AnimatePresence>
					{panel.mode === "create" && (
						<AddNewPanel
							onSave={handleCreate}
							onCancel={() => setPanel({ mode: "idle" })}
						/>
					)}
				</AnimatePresence>

				{/* ── Add button (hidden while panel open) ── */}
				{panel.mode !== "create" && (
					<button
						type="button"
						onClick={() => setPanel({ mode: "create" })}
						className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 dark:border-border py-4 text-sm font-medium text-gray-400 dark:text-gray-500 transition-all hover:border-emerald-300 dark:hover:border-emerald-600/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
					>
						<PlusIcon className="h-4 w-4 transition-transform group-hover:scale-125" />
						<Trans>Add a new experience</Trans>
					</button>
				)}
			</div>
		</SectionBase>
	);
}