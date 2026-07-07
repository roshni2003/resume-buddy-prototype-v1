import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { PencilSimpleLineIcon, PlusIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";
import type z from "zod";
import { ChipInput } from "@/components/input/chip-input";
import { IconPicker } from "@/components/input/icon-picker";
import { useResumeStore } from "@/components/resume/store/resume";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { DialogProps } from "@/dialogs/store";
import { useDialogStore } from "@/dialogs/store";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { interestItemSchema } from "@/schema/resume/data";
import { generateId } from "@/utils/string";
import { cn } from "@/utils/style";

const formSchema = interestItemSchema;

type FormValues = z.infer<typeof formSchema>;

import { useState } from "react";
import { X } from "@phosphor-icons/react";

export function CreateInterestDialog({ data }: DialogProps<"resume.sections.interests.create">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [customInterests, setCustomInterests] = useState("");
	const [error, setError] = useState("");

	const predefinedInterests = [
		"Photography", "Hiking", "Cycling", "Chess", "Cooking", "Reading", "Gaming",
		"Yoga", "Music", "Travel", "Painting", "Running", "Astronomy", "Coffee",
		"Climbing", "Open Source"
	];

	const toggleInterest = (interest: string) => {
		setSelectedInterests((prev) =>
			prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
		);
	};

	const handleAdd = () => {
		const newInterests = [...selectedInterests];
		let hasError = false;

		if (customInterests.trim()) {
			customInterests.split(",").forEach((s) => {
				const trimmed = s.trim();

				if (trimmed.length === 1 || (trimmed.length > 0 && !/^[A-Za-z\s]+$/.test(trimmed))) {
					hasError = true;
				} else if (trimmed && !newInterests.includes(trimmed)) {
					newInterests.push(trimmed);
				}
			});
		}

		if (hasError) {
			setError("Interest must be at least 2 characters and contain only letters");
			return;
		}

		setError("");
		if (newInterests.length === 0) return;

		updateResumeData((draft) => {
			newInterests.forEach((interestName) => {
				const newInterest = {
					id: generateId(),
					hidden: false,
					icon: "heart",
					name: interestName,
					keywords: [],
				};
				if (data?.customSectionId) {
					const section = draft.customSections.find((s) => s.id === data.customSectionId);
					if (section) section.items.push(newInterest);
				} else {
					draft.sections.interests.items.push(newInterest);
				}
			});
		});
		closeDialog();
	};

	return (
		<DialogContent className="w-full max-w-[95vw] sm:max-w-[576px] !h-[444px] !max-h-[444px] overflow-y-auto p-6 sm:rounded-3xl border-gray-200 dark:border-border bg-white dark:bg-card">
			<div className="flex items-start justify-between mb-4">
				<div>
					<h2 className="font-ibm-plex-sans text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">What lights you up?</h2>
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
						{predefinedInterests.map((interest) => {
							const isSelected = selectedInterests.includes(interest);
							return (
								<button
									key={interest}
									type="button"
									onClick={() => toggleInterest(interest)}
									className={cn(
										"rounded-full border px-4 py-1.5 text-sm transition-all",
										isSelected
											? "border-rose-200 bg-rose-50 text-rose-700 font-medium shadow-sm"
											: "border-gray-200 dark:border-border bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted/50 hover:text-gray-900 dark:hover:text-gray-100"
									)}
								>
									{interest}
								</button>
							);
						})}
					</div>
				</div>

				<div>
					<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Add your own (Comma-separated)</p>
					<input
						type="text"
						placeholder="e.g. Bonsai, Vinyl"
						value={customInterests}
						onChange={(e) => {
							setCustomInterests(e.target.value);
							if (error) setError("");
						}}
						className={cn("w-full rounded-xl border bg-gray-50 dark:bg-muted/50 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1", error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-border focus:border-rose-500 focus:ring-rose-500")}
					/>
					{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
				</div>
			</div>

			<div className="mt-8 flex justify-end gap-3">
				<button onClick={closeDialog} className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-muted transition-colors">
					Cancel
				</button>
				<button
					onClick={handleAdd}
					className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-rose-500 active:scale-95 shadow-sm"
				>
					Add selected
				</button>
			</div>
		</DialogContent>
	);
}

export function UpdateInterestDialog({ data }: DialogProps<"resume.sections.interests.update">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			icon: data.item.icon,
			name: data.item.name,
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
				const index = draft.sections.interests.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.interests.items[index] = formData;
			}
		});
		closeDialog();
	};

	const { blockEvents, requestClose } = useFormBlocker(form);

	return (
		<DialogContent {...blockEvents} className="w-full max-w-[95vw] sm:max-w-[576px] !h-[444px] !max-h-[444px] overflow-y-auto">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-2">
					<PencilSimpleLineIcon />
					<Trans>Update an existing interest</Trans>
				</DialogTitle>
				<DialogDescription />
			</DialogHeader>

			<Form {...form}>
				<form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
					<InterestForm />

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

function InterestForm() {
	const form = useFormContext<FormValues>();
	const nameState = useFormState({ control: form.control, name: "name" });
	const isNameInvalid = useMemo(() => {
		return nameState.errors && Object.keys(nameState.errors).length > 0;
	}, [nameState]);

	// Pre-defined interests
	const predefinedInterests = [
		"Music",
		"Travel",
		"Photography",
		"Reading",
		"Writing",
		"Cooking",
		"Sports",
		"Gaming",
		"Art",
		"Volunteering",
		"Fitness",
		"Technology",
		"Movies",
		"Gardening",
		"Dancing",
		"Crafts",
		"Hiking",
		"Yoga",
		"Blogging",
		"Chess",
	];

	// Add interest chip instantly
	const handleAddInterestChip = (interest: string) => {
		form.setValue("name", interest);
		form.clearErrors("name");
	};

	return (
		<>
			{/* Pre-defined interest chips */}
			<div className="col-span-full mb-2 flex flex-wrap gap-2">
				{predefinedInterests.map((interest) => (
					<button
						type="button"
						key={interest}
						className={cn(
							"cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10",
							form.watch("name") === interest && "border-primary bg-primary text-white",
						)}
						onClick={() => handleAddInterestChip(interest)}
					>
						{interest}
					</button>
				))}
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

			<FormField
				control={form.control}
				name="keywords"
				render={({ field }) => (
					<FormItem className="col-span-full">
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
