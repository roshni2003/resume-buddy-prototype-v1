import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import { PencilSimpleLineIcon, PlusIcon } from "@phosphor-icons/react";
import { X } from "lucide-react";
import { useState, useMemo } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";
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
import { IconPicker } from "@/components/input/icon-picker";

const formSchema = languageItemSchema;

type FormValues = z.infer<typeof formSchema>;

export function CreateLanguageDialog({ data }: DialogProps<"resume.sections.languages.create">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
	const [customLanguages, setCustomLanguages] = useState("");
	const [error, setError] = useState("");

	const existingItems = useResumeStore((state) => data?.customSectionId 
		? state.resume.data.customSections.find((s) => s.id === data.customSectionId)?.items || []
		: state.resume.data.sections.languages.items
	);
	const existingNames = existingItems.map((item: any) => item.language?.toLowerCase() || "");

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
					setError("Language must be at least 2 characters and contain only letters");
				} else if (existingNames.includes(trimmed.toLowerCase())) {
					hasError = true;
					setError(`Language "${trimmed}" is already added.`);
				} else if (
					trimmed.length >= 2 &&
					!newLanguages.includes(trimmed)
				) {
					newLanguages.push(trimmed);
				}
			});
		}

		if (hasError) {
			return;
		}

		setError("");
		if (newLanguages.length === 0) return;

		updateResumeData((draft) => {
			newLanguages.forEach((langName) => {
				const newLang = {
					id: generateId(),
					hidden: false,
					icon: "translate",
					language: langName,
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
		<DialogContent className="w-full max-w-[95vw] sm:!max-w-[576px] !h-[444px] !max-h-[444px] overflow-y-auto p-6 sm:rounded-3xl border-gray-200 dark:border-border bg-white dark:bg-card">
			<div className="flex items-start justify-between mb-2">
				<div>
					<h2 className="font-ibm-plex-sans text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Add languages</h2>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Pick as many as you like — all at once.</p>
				</div>
				<button onClick={closeDialog} className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
					<X className="h-5 w-5" />
				</button>
			</div>

			<div className="space-y-6">
				<div>
					<p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Suggestions · Multi-select</p>
					<div className="flex flex-wrap gap-2">
						{predefinedLanguages.map((lang) => {
							const isAlreadySelected = existingNames.includes(lang.toLowerCase());
							const isSelected = selectedLanguages.includes(lang);
							return (
								<button
									key={lang}
									type="button"
									disabled={isAlreadySelected}
									onClick={() => toggleLanguage(lang)}
									className={cn(
										"rounded-full border px-4 py-1.5 text-sm transition-all",
										isAlreadySelected
											? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600"
											: isSelected
											? "border-cyan-200 bg-cyan-50 text-cyan-700 font-medium shadow-sm"
											: "border-gray-200 dark:border-border bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted/50 hover:text-gray-900 dark:hover:text-gray-100"
									)}
								>
									{lang}
								</button>
							);
						})}
					</div>
				</div>

				<div>
					<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Add your own (Comma-separated)</p>
					<input
						type="text"
						placeholder="e.g. Swahili, Tagalog"
						value={customLanguages}
						onChange={(e) => {
							setCustomLanguages(e.target.value);
							if (error) setError("");
						}}
						className={cn("w-full rounded-xl border bg-gray-50 dark:bg-muted/50 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1", error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-border focus:border-cyan-500 focus:ring-cyan-500")}
					/>
					{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
				</div>

			</div>

			<div className="mt-4 flex justify-end gap-3">
				<button onClick={closeDialog} className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-muted transition-colors">
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
			icon: data.item.icon,
			language: data.item.language,
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
		<DialogContent {...blockEvents} className="w-full max-w-[95vw] sm:!max-w-[576px] !h-[444px] !max-h-[444px] overflow-y-auto">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-2">
					<PencilSimpleLineIcon />
					<Trans>Update an existing language</Trans>
				</DialogTitle>
				<DialogDescription />
			</DialogHeader>

			<Form {...form}>
				<form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
					<LanguageForm existingNames={useResumeStore(state => (data?.customSectionId ? state.resume.data.customSections.find((s) => s.id === data.customSectionId)?.items || [] : state.resume.data.sections.languages.items).filter(i => i.id !== form.getValues("id")).map((i: any) => i.language?.toLowerCase() || ""))} />

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

function LanguageForm({ existingNames = [] }: { existingNames?: string[] }) {
	const form = useFormContext<FormValues>();
	const nameState = useFormState({ control: form.control, name: "language" });
	const isNameInvalid = useMemo(() => {
		return nameState.errors && Object.keys(nameState.errors).length > 0;
	}, [nameState]);

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

	// Add language chip instantly
	const handleAddLanguageChip = (lang: string) => {
		form.setValue("language", lang);
		form.clearErrors("language");
	};

	return (
		<>
			<div className="col-span-full mb-2 flex flex-wrap gap-2">
				{predefinedLanguages.map((lang) => {
					const isAlreadySelected = existingNames.includes(lang.toLowerCase());
					return (
						<button
							type="button"
							key={lang}
							disabled={isAlreadySelected}
							className={cn(
								"cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10",
								form.watch("language") === lang && "border-primary bg-primary text-white",
								isAlreadySelected && "cursor-not-allowed opacity-50 bg-gray-100 text-gray-500 hover:bg-gray-100"
							)}
							onClick={() => handleAddLanguageChip(lang)}
						>
							{lang}
						</button>
					);
				})}
			</div>

			<div className={cn("col-span-full flex items-end", isNameInvalid && "items-center")}>
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
					name="language"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>
								<Trans>Language</Trans>
							</FormLabel>
							<FormControl>
								<Input 
									className="rounded-l-none!" 
									{...field} 
									onChange={(e) => {
										field.onChange(e);
										if (existingNames.includes(e.target.value.trim().toLowerCase())) {
											form.setError("language", { message: `Language "${e.target.value}" is already added.` });
										} else {
											form.clearErrors("language");
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
}
