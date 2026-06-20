import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import { PencilSimpleLineIcon, PlusIcon } from "@phosphor-icons/react";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";
import type z from "zod";
import { ChipInput } from "@/components/input/chip-input";
import { IconPicker } from "@/components/input/icon-picker";
import { useResumeStore } from "@/components/resume/store/resume";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { DialogProps } from "@/dialogs/store";
import { useDialogStore } from "@/dialogs/store";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { skillItemSchema } from "@/schema/resume/data";
import { generateId } from "@/utils/string";
import { cn } from "@/utils/style";

const formSchema = skillItemSchema;

type FormValues = z.infer<typeof formSchema>;

const levelLabels: Record<number, string> = {
	0: "Hidden",
	1: "Beginner",
	2: "Intermediate",
	3: "Proficient",
	4: "Advanced",
	5: "Expert",
};

export function CreateSkillDialog({ data }: DialogProps<"resume.sections.skills.create">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [customSkills, setCustomSkills] = useState("");
	const [level, setLevel] = useState(3);
	const [error, setError] = useState("");

	const predefinedSkills = [
		"JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Go",
		"Rust", "CSS", "HTML", "Tailwind", "SQL", "PostgreSQL", "GraphQL", "Git",
		"Docker", "Kubernetes", "AWS", "GCP", "Figma", "Java", "Kotlin", "Swift"
	];

	const toggleSkill = (skill: string) => {
		setSelectedSkills((prev) =>
			prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
		);
	};

	const handleAdd = () => {
		const newSkills = [...selectedSkills];
		let hasError = false;

		if (customSkills.trim()) {
			customSkills.split(",").forEach((s) => {
				const trimmed = s.trim();

				if (trimmed.length === 1 || (trimmed.length > 0 && !/^[A-Za-z\s]+$/.test(trimmed))) {
					hasError = true;
				} else if (trimmed.length >= 2 && !newSkills.includes(trimmed)) {
					newSkills.push(trimmed);
				}
			});
		}

		if (hasError) {
			setError("Skill must be at least 2 characters and contain only letters");
			return;
		}

		setError("");
		if (newSkills.length === 0) return;

		updateResumeData((draft) => {
			newSkills.forEach((skillName) => {
				const newSkill = {
					id: generateId(),
					hidden: false,
					icon: "acorn",
					name: skillName,
					proficiency: levelLabels[level] || "",
					level: level,
					keywords: [],
				};
				if (data?.customSectionId) {
					const section = draft.customSections.find((s) => s.id === data.customSectionId);
					if (section) section.items.push(newSkill);
				} else {
					draft.sections.skills.items.push(newSkill);
				}
			});
		});
		closeDialog();
	};

	return (
		<DialogContent className="max-w-lg p-6 sm:rounded-3xl border-gray-200 dark:border-border bg-white dark:bg-card">
			<div className="flex items-start justify-between mb-4">
				<div>
					<h2 className="font-ibm-plex-sans text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Forge new skills</h2>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Tap multiple to select — they'll all be added at the chosen level.</p>
				</div>
				<button onClick={closeDialog} className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
					<X className="h-5 w-5" />
				</button>
			</div>

			<div className="space-y-6">
				<div>
					<p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Suggestions · Multi-select</p>
					<div className="flex flex-wrap gap-2">
						{predefinedSkills.map((skill) => {
							const isSelected = selectedSkills.includes(skill);
							return (
								<button
									key={skill}
									type="button"
									onClick={() => toggleSkill(skill)}
									className={cn(
										"rounded-full border px-4 py-1.5 text-sm transition-all",
										isSelected
											? "border-teal-200 bg-teal-50 text-teal-700 font-medium shadow-sm"
											: "border-gray-200 dark:border-border bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted/50 hover:text-gray-900 dark:hover:text-gray-100"
									)}
								>
									{skill}
								</button>
							);
						})}
					</div>
				</div>

				<div>
					<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Add your own (Comma-separated)</p>
					<input
						type="text"
						placeholder="e.g. Solidity, WebGL"
						value={customSkills}
						onChange={(e) => {
							setCustomSkills(e.target.value);
							if (error) setError("");
						}}
						className={cn("w-full rounded-xl border bg-gray-50 dark:bg-muted/50 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1", error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-border focus:border-teal-500 focus:ring-teal-500")}
					/>
					{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
				</div>

				<div className="rounded-xl border border-gray-200 dark:border-border bg-gray-50 dark:bg-muted/50 p-4 pt-5 pb-6">
					<div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
						<span>Level</span>
						<span className="text-teal-600">{level} · {levelLabels[level] || "Unknown"}</span>
					</div>
					<Slider
						min={0}
						max={5}
						step={1}
						value={[level]}
						onValueChange={(val) => setLevel(val[0])}
						className="[&>span:first-child]:bg-teal-100 [&_[data-slot=slider-range]]:bg-teal-500 [&_[data-slot=slider-thumb]]:border-teal-500 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:h-5 [&_[data-slot=slider-thumb]]:w-5"
					/>
					<div className="mt-3 flex justify-between px-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
						<span>0</span>
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</div>
				</div>
			</div>

			<div className="mt-8 flex justify-end gap-3">
				<button onClick={closeDialog} className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-muted transition-colors">
					Cancel
				</button>
				<button
					onClick={handleAdd}
					className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 active:scale-95 shadow-sm"
				>
					Add skills
				</button>
			</div>
		</DialogContent>
	);
}

export function UpdateSkillDialog({ data }: DialogProps<"resume.sections.skills.update">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			icon: data.item.icon,
			name: data.item.name,
			proficiency: data.item.proficiency,
			level: data.item.level,
			keywords: data.item.keywords,
		},
	});

	const onSubmit = (formData: FormValues) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.skills.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.skills.items[index] = formData;
			}
		});
		closeDialog();
	};

	const { blockEvents, requestClose } = useFormBlocker(form);

	return (
		<DialogContent {...blockEvents}>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-2">
					<PencilSimpleLineIcon />
					<Trans>Update an existing skill</Trans>
				</DialogTitle>
				<DialogDescription />
			</DialogHeader>

			<Form {...form}>
				<form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
					<SkillForm />

					<DialogFooter className="sm:col-span-full">
						<Button variant="ghost" onClick={requestClose}>
							<Trans>Cancel</Trans>
						</Button>

						<Button type="submit" disabled={form.formState.isSubmitting}>
							<Trans>Save Changes</Trans>
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}

function SkillForm() {
	const form = useFormContext<FormValues>();
	const nameState = useFormState({ control: form.control, name: "name" });
	const isNameInvalid = useMemo(() => {
		return nameState.errors && Object.keys(nameState.errors).length > 0;
	}, [nameState]);

	// Pre-defined skills
	const predefinedSkills = [
		"JavaScript",
		"TypeScript",
		"React",
		"Node.js",
		"Python",
		"CSS",
		"HTML",
		"SQL",
		"Git",
		"Docker",
		"Java",
		"C#",
		"C++",
		"Go",
		"Ruby",
		"PHP",
		"Swift",
		"Kotlin",
		"AWS",
		"Figma",
	];

	// Proficiency options
	const proficiencyOptions = [
		{ value: "Beginner", label: "Beginner" },
		{ value: "Intermediate", label: "Intermediate" },
		{ value: "Advanced", label: "Advanced" },
		{ value: "Expert", label: "Expert" },
	];

	// Add skill chip instantly
	const handleAddSkillChip = (skill: string) => {
		form.setValue("name", skill);
		form.clearErrors("name");
	};

	return (
		<>
			{/* Pre-defined skill chips */}
			<div className="col-span-full mb-2 flex flex-wrap gap-2">
				{predefinedSkills.map((skill) => (
					<button
						type="button"
						key={skill}
						className={cn(
							"cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10",
							form.watch("name") === skill && "border-primary bg-primary text-white",
						)}
						onClick={() => handleAddSkillChip(skill)}
					>
						{skill}
					</button>
				))}
			</div>

			<div className={cn("flex items-end", isNameInvalid && "items-center")}>
				<FormField
					control={form.control}
					name={"icon"}
					render={({ field }) => (
						<FormItem className="shrink-0">
							<FormControl>
								<IconPicker {...field} popoverProps={{ modal: true }} className="rounded-r-none! border-e-0!" />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>
								<Trans>Name</Trans>
							</FormLabel>
							<FormControl>
								<Input className="rounded-l-none!" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Proficiency dropdown */}
			<FormField
				control={form.control}
				name="proficiency"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<Trans>Proficiency</Trans>
						</FormLabel>
						<FormControl>
							<select
								className="w-full rounded border px-2 py-1"
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value)}
							>
								<option value="">Select proficiency</option>
								{proficiencyOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="level"
				render={({ field }) => (
					<FormItem className="gap-4 sm:col-span-full">
						<FormLabel>
							<Trans>Level</Trans>
						</FormLabel>
						<FormControl>
							<Slider
								min={0}
								max={5}
								step={1}
								value={[field.value]}
								onValueChange={(value) => field.onChange(value[0])}
							/>
						</FormControl>
						<FormMessage />
						<FormDescription>{Number(field.value) === 0 ? t`Hidden` : `${field.value} / 5`}</FormDescription>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="keywords"
				render={({ field }) => (
					<FormItem className="sm:col-span-full">
						<FormLabel>
							<Trans>Keywords</Trans>
						</FormLabel>
						<FormControl>
							<ChipInput {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
