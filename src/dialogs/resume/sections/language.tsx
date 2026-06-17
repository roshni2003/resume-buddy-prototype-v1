import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import { PencilSimpleLineIcon, PlusIcon } from "@phosphor-icons/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import type z from "zod";
import { useResumeStore } from "@/components/resume/store/resume";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { DialogProps } from "@/dialogs/store";
import { useDialogStore } from "@/dialogs/store";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { languageItemSchema } from "@/schema/resume/data";
import { generateId } from "@/utils/string";
import { cn } from "@/utils/style";

const formSchema = languageItemSchema;

type FormValues = z.infer<typeof formSchema>;

const fluencyLabels: Record<number, string> = {
	0: "Hidden",
	1: "Beginner",
	2: "Conversational",
	3: "Proficient",
	4: "Fluent",
	5: "Native",
};

export function CreateLanguageDialog({ data }: DialogProps<"resume.sections.languages.create">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
	const [customLanguages, setCustomLanguages] = useState("");
	const [level, setLevel] = useState(3);
	const [error, setError] = useState("");

	const predefinedLanguages = [
		"English", "Spanish", "French", "German", "Mandarin", "Japanese", "Hindi",
		"Arabic", "Portuguese", "Italian", "Korean", "Russian", "Dutch"
	];

	const toggleLanguage = (lang: string) => {
		setSelectedLanguages((prev) =>
			prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
		);
	};

	const handleAdd = () => {
		const newLanguages = [...selectedLanguages];
		let hasError = false;

		if (customLanguages.trim()) {
			customLanguages.split(",").forEach((s) => {
				const trimmed = s.trim();

				if (trimmed.length === 1 || (trimmed.length > 0 && !/^[A-Za-z\s]+$/.test(trimmed))) {
					hasError = true;
				} else if (
					trimmed.length >= 2 &&
					!newLanguages.includes(trimmed)
				) {
					newLanguages.push(trimmed);
				}
			});
		}

		if (hasError) {
			setError("Language must be at least 2 characters and contain only letters");
			return;
		}

		setError("");
		if (newLanguages.length === 0) return;

		updateResumeData((draft) => {
			newLanguages.forEach((langName) => {
				const newLang = {
					id: generateId(),
					hidden: false,
					language: langName,
					fluency: fluencyLabels[level] || "",
					level: level,
				};
				if (data?.customSectionId) {
					const section = draft.customSections.find((s) => s.id === data.customSectionId);
					if (section) section.items.push(newLang);
				} else {
					draft.sections.languages.items.push(newLang);
				}
			});
		});
		closeDialog();
	};

	return (
		<DialogContent className="max-w-xl p-6 sm:rounded-3xl border-gray-200 bg-white">
			<div className="flex items-start justify-between mb-4">
				<div>
					<h2 className="font-serif text-3xl font-semibold tracking-tight text-gray-900">Add languages</h2>
					<p className="mt-1 text-sm text-gray-500">Pick several at once and set their fluency together.</p>
				</div>
				<button onClick={closeDialog} className="text-gray-400 hover:text-gray-700 transition-colors">
					<X className="h-5 w-5" />
				</button>
			</div>

			<div className="space-y-6">
				<div>
					<p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Suggestions · Multi-select</p>
					<div className="flex flex-wrap gap-2">
						{predefinedLanguages.map((lang) => {
							const isSelected = selectedLanguages.includes(lang);
							return (
								<button
									key={lang}
									type="button"
									onClick={() => toggleLanguage(lang)}
									className={cn(
										"rounded-full border px-4 py-1.5 text-sm transition-all",
										isSelected
											? "border-cyan-200 bg-cyan-50 text-cyan-700 font-medium shadow-sm"
											: "border-gray-200 bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									)}
								>
									{lang}
								</button>
							);
						})}
					</div>
				</div>

				<div>
					<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Add your own (Comma-separated)</p>
					<input
						type="text"
						placeholder="e.g. Swahili, Tagalog"
						value={customLanguages}
						onChange={(e) => {
							setCustomLanguages(e.target.value);
							if (error) setError("");
						}}
						className={cn("w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1", error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-cyan-500 focus:ring-cyan-500")}
					/>
					{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
				</div>

				<div className="rounded-xl border border-gray-200 bg-gray-50 p-4 pt-5 pb-6">
					<div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
						<span>Level</span>
						<span className="text-cyan-600">{level} · {fluencyLabels[level] || "Unknown"}</span>
					</div>
					<Slider
						min={0}
						max={5}
						step={1}
						value={[level]}
						onValueChange={(val) => setLevel(val[0])}
						className="[&>span:first-child]:bg-cyan-100 [&_[data-slot=slider-range]]:bg-cyan-500 [&_[data-slot=slider-thumb]]:border-cyan-500 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:h-5 [&_[data-slot=slider-thumb]]:w-5"
					/>
					<div className="mt-3 flex justify-between px-1 text-xs text-gray-500 font-medium">
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
				<button onClick={closeDialog} className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
					Cancel
				</button>
				<button
					onClick={handleAdd}
					className="rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyan-500 active:scale-95 shadow-sm"
				>
					Add selected
				</button>
			</div>
		</DialogContent>
	);
}

export function UpdateLanguageDialog({ data }: DialogProps<"resume.sections.languages.update">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			language: data.item.language,
			fluency: data.item.fluency,
			level: data.item.level,
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
				const index = draft.sections.languages.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.languages.items[index] = formData;
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
					<Trans>Update an existing language</Trans>
				</DialogTitle>
				<DialogDescription />
			</DialogHeader>

			<Form {...form}>
				<form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
					<LanguageForm />

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

function LanguageForm() {
	const form = useFormContext<FormValues>();

	// Pre-defined languages
	const predefinedLanguages = [
		"English",
		"Hindi",
		"Bengali",
		"Telugu",
		"Marathi",
		"Tamil",
		"Gujarati",
		"Urdu",
		"Kannada",
		"Malayalam",
		"Odia",
		"Punjabi",
		"Assamese",
		"Sanskrit",
		"Spanish",
		"French",
		"German",
		"Mandarin",
		"Arabic",
		"Portuguese",
		"Russian",
		"Japanese",
		"Italian",
		"Korean",
	];
	// Fluency options
	const fluencyOptions = [
		{ value: "Basic", label: "Basic" },
		{ value: "Conversational", label: "Conversational" },
		{ value: "Fluent", label: "Fluent" },
		{ value: "Native", label: "Native" },
	];

	// Add language chip instantly
	const handleAddLanguageChip = (lang: string) => {
		form.setValue("language", lang);
		form.clearErrors("language");
	};

	return (
		<>
			{/* Pre-defined language chips */}
			<div className="col-span-full mb-2 flex flex-wrap gap-2">
				{predefinedLanguages.map((lang) => (
					<button
						type="button"
						key={lang}
						className={cn(
							"cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10",
							form.watch("language") === lang && "border-primary bg-primary text-white",
						)}
						onClick={() => handleAddLanguageChip(lang)}
					>
						{lang}
					</button>
				))}
			</div>

			<FormField
				control={form.control}
				name="language"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<Trans>Language</Trans>
						</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* Fluency dropdown */}
			<FormField
				control={form.control}
				name="fluency"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<Trans>Fluency</Trans>
						</FormLabel>
						<FormControl>
							<select
								className="w-full rounded border px-2 py-1"
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value)}
							>
								<option value="">Select fluency</option>
								{fluencyOptions.map((option) => (
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
		</>
	);
}
