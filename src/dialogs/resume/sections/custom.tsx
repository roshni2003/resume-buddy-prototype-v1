import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import {
	PencilSimpleLineIcon,
	PlusIcon,
	Article,
	Briefcase,
	GraduationCap,
	Certificate
} from "@phosphor-icons/react";
import { useForm, useFormContext } from "react-hook-form";
import type z from "zod";
import { useResumeStore } from "@/components/resume/store/resume";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { DialogProps } from "@/dialogs/store";
import { useDialogStore } from "@/dialogs/store";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { type CustomSectionType, customSectionSchema } from "@/schema/resume/data";
import { generateId } from "@/utils/string";

const formSchema = customSectionSchema;

type FormValues = z.infer<typeof formSchema>;

const SECTION_TYPE_OPTIONS = [
	{ value: "custom", label: "Generic", description: "Title + free-form content", icon: PencilSimpleLineIcon },
	{ value: "summary", label: "Summary", description: "Headline + paragraph", icon: Article },
	{ value: "experience", label: "Experience", description: "Company, role, dates", icon: Briefcase },
	{ value: "education", label: "Education", description: "School, degree, year", icon: GraduationCap },
	{ value: "certifications", label: "Certification", description: "Title, issuer, link", icon: Certificate },
] as const;

export function CreateCustomSectionDialog({ data }: DialogProps<"resume.sections.custom.create">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: generateId(),
			title: data?.title ?? "",
			type: data?.type ?? "experience",
			columns: data?.columns ?? 1,
			hidden: data?.hidden ?? false,
			items: data?.items ?? [],
		},
	});

	const onSubmit = (formData: FormValues) => {
		// Build the first empty item based on type
		const baseItem = { id: generateId(), hidden: false, visible: true };
		const firstItem: any =
			formData.type === "summary"
				? { ...baseItem, name: "", content: "" }
				: formData.type === "experience"
					? { ...baseItem, company: "", position: "", location: "", date: "", summary: "", url: "" }
					: formData.type === "education"
						? { ...baseItem, institution: "", studyType: "", area: "", score: "", date: "", summary: "", url: "" }
						: formData.type === "certifications"
							? { ...baseItem, title: "", issuer: "", date: "", website: { url: "", label: "" }, description: "" }
							: { ...baseItem, name: "", description: "" };

		const sectionWithItem = { ...formData, items: [firstItem] };

		updateResumeData((draft) => {
			draft.customSections.push(sectionWithItem);
			const lastPageIndex = draft.metadata.layout.pages.length - 1;
			if (lastPageIndex < 0) return;
			draft.metadata.layout.pages[lastPageIndex].main.push(sectionWithItem.id);
		});
		closeDialog();
	};

	const { blockEvents, requestClose } = useFormBlocker(form);

	return (
		<DialogContent {...blockEvents}>
			<DialogHeader>
				<DialogTitle className="flex flex-col gap-y-1">
					<span className="font-ibm Plex text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
						<Trans>New custom section</Trans>
					</span>
				</DialogTitle>
				<DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
					<Trans>Name your section and choose a layout type.</Trans>
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
					<CustomSectionForm />

					<DialogFooter className="sm:col-span-full">
						<Button variant="ghost" onClick={requestClose}>
							<Trans>Cancel</Trans>
						</Button>

						<Button type="submit" disabled={form.formState.isSubmitting}>
							<Trans>Create</Trans>
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}

export function UpdateCustomSectionDialog({ data }: DialogProps<"resume.sections.custom.update">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.id,
			title: data.title,
			type: data.type,
			columns: data.columns,
			hidden: data.hidden,
			items: data.items,
		},
	});

	const onSubmit = (formData: FormValues) => {
		updateResumeData((draft) => {
			const index = draft.customSections.findIndex((item) => item.id === formData.id);
			if (index === -1) return;
			draft.customSections[index] = formData;
		});
		closeDialog();
	};

	const { blockEvents, requestClose } = useFormBlocker(form);

	return (
		<DialogContent {...blockEvents}>
			<DialogHeader>
				<DialogTitle className="flex flex-col gap-y-1">
					<span className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
						<Trans>Update custom section</Trans>
					</span>
				</DialogTitle>
				<DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
					<Trans>Update your section name or change layout type.</Trans>
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
					<CustomSectionForm isUpdate />

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

function CustomSectionForm({ isUpdate = false }: { isUpdate?: boolean }) {
	const form = useFormContext<FormValues>();

	return (
		<>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem className="sm:col-span-full">
						<FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
							<Trans>Section Title</Trans>
						</FormLabel>
						<FormControl>
							<Input {...field} placeholder="e.g. Volunteering, Awards, Publications" className="h-11 rounded-xl border border-gray-200 dark:border-border bg-gray-50 dark:bg-muted/50 px-4 text-sm transition-all focus:bg-white focus:ring-1 focus:ring-emerald-500" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="type"
				render={({ field }) => (
					<FormItem className="sm:col-span-full">
						<FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
							<Trans>Section Type</Trans>
						</FormLabel>
						<FormControl>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-2">
								{SECTION_TYPE_OPTIONS.map((option) => {
									const isSelected = field.value === option.value;
									const Icon = option.icon;
									return (
										<button
											key={option.value}
											type="button"
											onClick={() => !isUpdate && field.onChange(option.value)}
											disabled={isUpdate}
											className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${isSelected
												? "border-emerald-500 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/30 shadow-sm"
												: "border-gray-200 dark:border-border bg-white dark:bg-card hover:border-emerald-200 hover:bg-gray-50 dark:hover:bg-muted/50"
												} ${isUpdate ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
										>
											<div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-emerald-500 text-white" : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"}`}>
												<Icon className="h-5 w-5" weight={isSelected ? "bold" : "regular"} />
											</div>
											<div className="flex flex-col gap-0.5">
												<span className={`font-semibold ${isSelected ? "text-emerald-900 dark:text-emerald-300" : "text-gray-900 dark:text-gray-100"}`}>{option.label}</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
											</div>
										</button>
									);
								})}
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
