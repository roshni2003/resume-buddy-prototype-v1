import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import {
	CaretDownIcon,
	CaretUpIcon,
	FolderOpenIcon,
	GlobeIcon,
	PlusIcon,
	SparkleIcon,
	TagIcon,
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
import { projectItemSchema } from "@/schema/resume/data";
import { SectionBase } from "../shared/section-base";
import { generateId } from "@/utils/string";

type FormValues = z.infer<typeof projectItemSchema>;

type PanelState =
	| { mode: "idle" }
	| { mode: "create" }
	| { mode: "edit"; id: string };

function ZoeTipsCard() {
	return (
		<div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 shadow-sm">
			<div className="mb-3 flex items-center gap-2">
				<SparkleIcon weight="fill" className="h-5 w-5 text-violet-500" />
				<span className="text-xs font-bold uppercase tracking-widest text-violet-700">
					Zoe Tips
				</span>
				<SparkleIcon
					weight="fill"
					className="ml-auto h-8 w-8 text-violet-100"
				/>
			</div>
			<ul className="space-y-2 text-sm text-violet-800">
				{[
					"Lead with what the project does, not how you built it",
					"Mention the tech stack concisely (3–5 keywords)",
					"Highlight impact — users, scale, or problem solved",
					"Include a live link or GitHub repo if public",
				].map((tip) => (
					<li key={tip} className="flex items-start gap-2">
						<span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
						{tip}
					</li>
				))}
			</ul>
			<p className="mt-4 text-xs italic text-violet-600">
				Zoe will sharpen your project pitch and highlight the impact. Look for
				the magic button above!
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

function InlineProjectForm({
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
		resolver: zodResolver(projectItemSchema),
		defaultValues,
	});

	const projectId = form.getValues("id");
	const description = useWatch({ control: form.control, name: "description" });
	const previousDescriptionRef = useRef(description);
	const aiUpdateCountRef = useRef(0);

	const roundsUsed = useResumeStore(
		(state) => state.projectAIRoundsUsed?.[projectId] ?? 0
	);
	const incrementRoundsUsed = useResumeStore(
		(state) => state.incrementProjectRounds
	);
	const resetRounds = useResumeStore((state) => state.resetProjectRounds);
	const maxRounds = 2;

	useEffect(() => {
		if (aiUpdateCountRef.current > 0) {
			aiUpdateCountRef.current -= 1;
			previousDescriptionRef.current = description;
			return;
		}
		if (description !== previousDescriptionRef.current) {
			resetRounds(projectId);
		}
		previousDescriptionRef.current = description;
	}, [description, resetRounds, projectId]);

	const wordCount =
		typeof description === "string"
			? description.trim().split(/\s+/).filter(Boolean).length
			: 0;
	const charCount =
		typeof description === "string"
			? description.replace(/<[^>]*>/g, "").length
			: 0;
	const isWordCountValid = wordCount >= 5;

	const handleAIGenerated = (aiText: string) => {
		if (aiText && aiText.length > 10) {
			aiUpdateCountRef.current = 2;
			form.setValue("description", aiText, {
				shouldDirty: true,
				shouldValidate: true,
			});
			incrementRoundsUsed(projectId);
		}
	};

	const shouldGlow = isPulsing || isHovering;

	return (
		<Form {...form}>
			<form className="space-y-5" onSubmit={form.handleSubmit(onSave)}>
				{/* ── Row 1: Project name ── */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
								<FolderOpenIcon className="h-3.5 w-3.5" />
								<Trans>Project Name</Trans>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="My Awesome Project"
									className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-violet-400 focus:ring-violet-200"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* ── Row 2: Period + Tech stack ── */}
				<div className="grid gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="period"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<TagIcon className="h-3.5 w-3.5" />
									<Trans>Period / Year</Trans>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Jan 2024 – Mar 2024"
										className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-violet-400 focus:ring-violet-200"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="website.url"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<GlobeIcon className="h-3.5 w-3.5" />
									<Trans>Website</Trans>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="https://myproject.com"
										className="rounded-xl border-gray-200 dark:border-border bg-white/70 dark:bg-card/70 focus:border-violet-400 focus:ring-violet-200"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* ── Row 4: Show Link in Title Toggle ── */}
				<FormField
					control={form.control}
					name="options.showLinkInTitle"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
								<Trans>Display Options</Trans>
							</FormLabel>
							<div className="flex items-center gap-2">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<span className="text-sm text-gray-600">
									<Trans>Show link in title</Trans>
								</span>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* ── Description + AI ── */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-end justify-between">
								<FormLabel className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<Trans>Description</Trans>
								</FormLabel>
								<div
									className="relative mb-2 rounded-xl bg-gray-50 p-1"
									onMouseEnter={() => setIsHovering(true)}
									onMouseLeave={() => setIsHovering(false)}
								>
									{shouldGlow && (
										<>
											<div className="absolute -inset-1 rounded-full bg-violet-400/40 blur-md animate-ai-glow" />
											<div className="absolute -inset-2 rounded-full border border-violet-300/50 animate-ai-glow-ring" />
										</>
									)}
									<AIGenerateButton
										resumeId={useResumeStore.getState().resume.id}
										type="projects"
										data={{
											name: form.getValues("name"),
											description,
										}}
										onGenerated={handleAIGenerated}
										roundsUsed={roundsUsed}
										maxRounds={maxRounds}
										isWordCountValid={isWordCountValid}
										disabled={roundsUsed >= maxRounds || !isWordCountValid}
										className="relative z-10 border border-violet-300 font-bold text-black shadow-lg shadow-violet-500/30 hover:text-black"
									/>
								</div>
							</div>

							{/* AI badge */}
							<div className="flex items-center gap-2">
								<span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700">
									<SparkleIcon weight="fill" className="h-3 w-3" />
									AI Assisted
								</span>
								<span className="text-xs text-slate-700">
									Turn your project details into standout resume bullet points.
								</span>
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
								<p className="text-xs font-medium text-red-500">
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

				{/* ── Tips Card ── */}
				<ZoeTipsCard />

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
						className="rounded-xl bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50"
					>
						{isNew ? <Trans>Add Project</Trans> : <Trans>Save Changes</Trans>}
					</Button>
				</div>
			</form>
		</Form>
	);
}

/* ─────────────────────────────────────────────
   PROJECT CARD  (collapsed / expanded)
───────────────────────────────────────────── */
interface ProjectCardProps {
	item: FormValues;
	isExpanded: boolean;
	onToggle: () => void;
	onSave: (values: FormValues) => void;
	onDelete: () => void;
}

function ProjectCard({
	item,
	isExpanded,
	onToggle,
	onSave,
	onDelete,
}: ProjectCardProps) {
	const subtitle = [item.period, item.website?.label]
		.filter((p) => p && p.trim().length > 0)
		.join(" · ");

	return (
		<div
			className={`rounded-2xl border bg-white dark:bg-card shadow-sm transition-all duration-200 ${isExpanded
				? "border-violet-300 shadow-violet-100 shadow-md"
				: "border-gray-100 dark:border-border hover:border-gray-200 hover:shadow"
				}`}
		>
			{/* ── Header ── */}
			<button
				type="button"
				onClick={onToggle}
				className="flex w-full items-center gap-3 px-5 py-4 text-left"
			>
				<span
					className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm transition-colors ${isExpanded ? "bg-violet-500" : "bg-gray-100 dark:bg-muted"
						}`}
				>
					<FolderOpenIcon
						weight="fill"
						className={`h-5 w-5 ${isExpanded ? "text-white" : "text-gray-400 dark:text-gray-500"}`}
					/>
				</span>

				<div className="min-w-0 flex-1">
					<p
						className={`truncate font-semibold leading-tight ${isExpanded ? "text-violet-800" : "text-gray-800 dark:text-gray-200"
							}`}
					>
						{item.name || "New Project"}
					</p>
					{subtitle && (
						<p className="truncate text-sm text-gray-400 dark:text-gray-500">{subtitle}</p>
					)}
				</div>

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

							<InlineProjectForm
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
		name: "",
		period: "",
		description: "",
		website: { url: "", label: "" },
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -8 }}
			transition={{ duration: 0.2 }}
			className="rounded-2xl border border-violet-300 dark:border-violet-700/50 bg-gradient-to-b from-white dark:from-card to-violet-50/30 dark:to-muted/30 p-5 shadow-md shadow-violet-100 dark:shadow-none"
		>
			<div className="mb-4 flex items-center gap-2">
				<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500 text-white shadow-sm">
					<PlusIcon weight="bold" className="h-4 w-4" />
				</span>
				<p className="font-semibold text-violet-800">
					<Trans>New Project</Trans>
				</p>
			</div>

			<InlineProjectForm
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
export function ProjectsSectionBuilder() {
	const section = useResumeStore(
		(state) => state.resume.data.sections.projects
	);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [panelState, setPanelState] = useState<PanelState>({ mode: "idle" });
	const [generatingIds] = useState<Set<string>>(new Set());

	const handleAddProject = (values: FormValues) => {
		updateResumeData((draft) => {
			draft.sections.projects.items.push(values);
		});
		setPanelState({ mode: "idle" });
	};

	const handleUpdateProject = (values: FormValues) => {
		updateResumeData((draft) => {
			const index = draft.sections.projects.items.findIndex(
				(item) => item.id === values.id
			);
			if (index !== -1) {
				draft.sections.projects.items[index] = values;
			}
		});
		setExpandedId(null);
	};

	const handleDeleteProject = (id: string) => {
		updateResumeData((draft) => {
			draft.sections.projects.items = draft.sections.projects.items.filter(
				(item) => item.id !== id
			);
		});
		setExpandedId(null);
	};

	const toggleExpand = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
		if (panelState.mode !== "idle") {
			setPanelState({ mode: "idle" });
		}
	};

	return (
		<SectionBase type="projects">
			<div className="space-y-4">
				{/* Projects List */}
				{section.items.map((item) => (
					<ProjectCard
						key={item.id}
						item={item}
						isExpanded={expandedId === item.id}
						onToggle={() => toggleExpand(item.id)}
						onSave={handleUpdateProject}
						onDelete={() => handleDeleteProject(item.id)}
					/>
				))}

				{/* Add New Panel */}
				{panelState.mode === "create" ? (
					<AddNewPanel
						onSave={handleAddProject}
						onCancel={() => setPanelState({ mode: "idle" })}
					/>
				) : (
					<button
						type="button"
						onClick={() => setPanelState({ mode: "create" })}
						className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 dark:border-border py-4 text-sm font-medium text-gray-400 dark:text-gray-500 transition-all hover:border-violet-300 hover:bg-violet-50/30 hover:text-violet-600"
					>
						<PlusIcon className="h-4 w-4" />
						<Trans>Add a new project</Trans>
					</button>
				)}

				{/* Zoe Working Indicator */}
				{generatingIds.size > 0 && (
					<div className="fixed right-8 bottom-8 max-w-sm animate-pulse rounded-2xl border-2 border-emerald-500 bg-card p-5 shadow-2xl">
						<div className="flex items-start gap-4">
							<div className="flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-emerald-100">
								<img src="/zoe-icon.png" alt="Zoe" className="h-8 w-8" />
							</div>
							<div>
								<h4 className="mb-1 font-bold text-foreground">Zoe is working...</h4>
								<p className="text-muted-foreground text-sm">Generating professional descriptions for your projects</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</SectionBase>
	);
}