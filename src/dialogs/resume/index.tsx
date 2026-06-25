import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CameraIcon,
	PencilSimpleLineIcon,
	PlusIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { api } from "@/utils/api";
import { generateRandomName, slugify } from "@/utils/string";
import { type DialogProps, useDialogStore } from "../store";
import { type TemplateMetadata, templates } from "./template/data";

const formSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(64),
	slug: z.string().min(1).max(64).transform(slugify),
	tags: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

const basicDetailsSchema = z.object({
	fullName: z
		.string()
		.trim()
		.min(2, "Full name must be at least 2 characters")
		.max(100)
		.regex(/^[^0-9]*$/, "Full name cannot contain numbers"),

	professionalTitle: z
		.string()
		.trim()
		.min(2, "Professional title is required")
		.max(100)
		.regex(/^[^0-9]*$/, "Professional title cannot contain numbers"),

	email: z
		.string()
		.trim()
		.min(5, "Email is required")
		.max(100, "Email must be at most 100 characters")
		.email("Please enter a valid email address")
		.transform((val) => val.toLowerCase()),

	phone: z
		.string()
		.trim()
		.transform((val) => val.replace(/\D/g, "")) // remove non-digits
		.refine((val) => val.length === 10, {
			message: "Phone number must be exactly 10 digits",
		}),

	location: z.string().trim().min(2, "Location is required"),

	linkedinUrl: z
		.string()
		.trim()
		.optional()
		.or(z.literal(""))
		.refine((val) => !val || (val.startsWith("https://") && val.includes("linkedin.com")), {
			message: "Enter a valid LinkedIn URL",
		}),

	githubUrl: z
		.string()
		.trim()
		.optional()
		.or(z.literal(""))
		.refine((val) => !val || (val.startsWith("https://") && val.includes("github.com")), {
			message: "Enter a valid GitHub URL",
		}),

	websiteUrl: z
		.string()
		.trim()
		.optional()
		.or(z.literal(""))
		.refine((val) => !val || /^https:\/\/.+\..+/.test(val), { message: "Website must start with https://" }),
});

type BasicDetailsFormValues = z.infer<typeof basicDetailsSchema>;

export function CreateResumeDialog(_: DialogProps<"resume.create">) {
	const navigate = useNavigate();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);
	const [selectedTemplate, setSelectedTemplate] = useState<string>("ditto");
	const [basicDetails, setBasicDetails] = useState<BasicDetailsFormValues | null>(null);
	const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
	const [showPhotoOptions, setShowPhotoOptions] = useState(false);

	const { mutate: createResume, isPending } = useMutation({
		mutationFn: (data: Parameters<typeof api.createResume>[0]) => api.createResume(data),
	});

	const basicDetailsForm = useForm<BasicDetailsFormValues>({
		resolver: zodResolver(basicDetailsSchema),
		mode: "onChange",
		defaultValues: {
			fullName: "",
			professionalTitle: "",
			email: "",
			phone: "",
			location: "",
			linkedinUrl: "",
			githubUrl: "",
			websiteUrl: "",
		},
	});

	// Restore form data when going back from step 2 to step 1
	useEffect(() => {
		if (currentStep === 1 && basicDetails) {
			basicDetailsForm.reset(basicDetails);
		}
	}, [currentStep, basicDetails, basicDetailsForm]);

	const isFormValid = basicDetailsForm.formState.isValid;

	const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const allowedTypes = ["image/jpeg", "image/png"];

		if (!allowedTypes.includes(file.type)) {
			toast.error("Only JPEG or PNG images are allowed");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image size must be under 5MB");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setProfilePhoto(reader.result as string);
			setShowPhotoOptions(true);
		};
		reader.readAsDataURL(file);

		event.target.value = "";
	};

	const handleRemovePhoto = () => {
		setProfilePhoto(null);
		setShowPhotoOptions(false);
		toast.success("Profile photo removed");
	};

	const onBasicDetailsSubmit = (data: BasicDetailsFormValues) => {
		setBasicDetails(data);
		setCurrentStep(2);
	};

	const onTemplateSelected = () => {
		if (!basicDetails) return;

		// Generate resume name from full name
		const resumeName = basicDetails.fullName || generateRandomName();
		const toastId = toast.loading(t`Creating your resume...`);

		const resumeData = {
			name: resumeName,
			slug: slugify(resumeName),
			tags: [],
			withSampleData: false,
		};

		createResume(resumeData, {
			onSuccess: async (response) => {
				const resumeId = response.id;

				// Wait a moment for the API to process the resume creation
				await new Promise((resolve) => setTimeout(resolve, 500));

				try {
					// Fetch the created resume to get the full data structure
					const createdResume = await api.fetchResume(resumeId);

					// Build profiles array for LinkedIn, GitHub, Website
					const profiles = [];
					if (basicDetails.linkedinUrl) {
						profiles.push({
							id: "linkedin",
							hidden: false,
							network: "LinkedIn",
							username: "",
							icon: "linkedin",
							url: basicDetails.linkedinUrl,
						});
					}
					if (basicDetails.githubUrl) {
						profiles.push({
							id: "github",
							hidden: false,
							network: "GitHub",
							username: "",
							icon: "github",
							url: basicDetails.githubUrl,
						});
					}
					if (basicDetails.websiteUrl) {
						profiles.push({
							id: "website",
							hidden: false,
							network: "Website",
							username: "",
							icon: "link",
							url: basicDetails.websiteUrl,
						});
					}

					// Update the resume data with selected template and basic info
					const updatedData = {
						...createdResume.data,
						metadata: {
							...createdResume.data.metadata,
							template: selectedTemplate,
						},
						picture: {
							...createdResume.data.picture,
							url: profilePhoto || "",
						},
						basics: {
							...createdResume.data.basics,
							name: basicDetails.fullName,
							headline: basicDetails.professionalTitle,
							email: basicDetails.email,
							phone: basicDetails.phone,
							location: basicDetails.location,
						},
						sections: {
							...createdResume.data.sections,
							profiles: {
								...createdResume.data.sections.profiles,
								items: profiles,
							},
						},
					};

					// Update the resume with the new data
					await api.updateResume(resumeId, { data: updatedData });

					toast.success(t`Your resume has been created successfully.`, { id: toastId });
					closeDialog();

					// Navigate to builder
					navigate({ to: "/builder/$resumeId", params: { resumeId } });
				} catch (error) {
					console.error("Failed to populate resume:", error);
					// Still navigate to editor even if update fails
					toast.success(t`Your resume has been created. You can fill in the details in the editor.`, { id: toastId });
					closeDialog();
					navigate({ to: "/builder/$resumeId", params: { resumeId } });
				}
			},
			onError: (error) => {
				if (
					error.message === "RESUME_SLUG_ALREADY_EXISTS" ||
					error.message.toLowerCase().includes("internal server error")
				) {
					toast.error("Name already exists, please use a different name.", { id: toastId });
					return;
				}

				toast.error(error.message, { id: toastId });
			},
		});
	};

	if (currentStep === 1) {
		return (
			<DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-xl border border-border bg-background/95 text-foreground shadow-2xl backdrop-blur-md">
				{/* Progress Bar */}
				<div className="mb-6">
					<div className="mb-2 flex items-center justify-between">
						<span className="font-medium text-muted-foreground text-sm">Step 1 of 2</span>
						<span className="font-medium text-muted-foreground text-sm">Basic Details</span>
					</div>
					<div className="h-1.5 w-full rounded-full bg-muted">
						<div
							className="h-1.5 rounded-full bg-emerald-500 transition-all duration-300"
							style={{ width: "50%" }}
						></div>
					</div>
				</div>
				{/* Header with Zoe */}
				<div className="mb-6 flex items-start gap-4 border-border border-b pb-6">
					<div className="shrink-0">
						<img src="/zoe-talking.png" alt="Zoe AI" className="h-15 w-12 rounded-full border border-border dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
					</div>
					<div>
						<h2 className="mb-1 font-bold text-foreground text-xl">Let's build your resume</h2>
						<p className="text-muted-foreground">I'm Zoe, your AI assistant for Resume Builder. Start with your basics.</p>
					</div>
				</div>{" "}
				<Form {...basicDetailsForm}>
					<form onSubmit={basicDetailsForm.handleSubmit(onBasicDetailsSubmit)} className="space-y-6">
						{/* Profile Photo Upload */}
						<div className="flex items-start gap-6">
							<div className="relative">
								<div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
									{profilePhoto ? (
										<img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
									) : (
										<CameraIcon className="h-10 w-10 text-muted-foreground" />
									)}
								</div>
								<input
									type="file"
									accept="image/*"
									onChange={handleProfilePhotoChange}
									className="hidden"
									id="profile-photo-upload"
								/>

								{/* Photo Action Buttons */}
								{profilePhoto && showPhotoOptions ? (
									<button
										type="button"
										onClick={handleRemovePhoto}
										className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 ring-2 ring-background transition-colors hover:bg-red-500"
										title="Remove photo"
									>
										<TrashIcon className="h-4 w-4 text-white" />
									</button>
								) : (
									<label
										htmlFor="profile-photo-upload"
										className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-500/90 ring-2 ring-background transition-colors hover:bg-emerald-500"
										title="Upload photo"
									>
										<PlusIcon className="h-4 w-4 text-white" />
									</label>
								)}
							</div>

							<div className="flex-1 space-y-4">
								{/* Full Name */}
								<FormField
									control={basicDetailsForm.control}
									name="fullName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground">
												Full Name <span className="text-red-400">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
													placeholder="John Doe"
													onChange={(e) => {
														const value = e.target.value.replace(/[0-9]/g, "");
														field.onChange(value);
													}}
												/>
											</FormControl>
											<FormMessage className="text-red-400" />
										</FormItem>
									)}
								/>

								{/* Professional Title */}
								<FormField
									control={basicDetailsForm.control}
									name="professionalTitle"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground">
												Professional Title <span className="text-red-400">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
													placeholder="Senior Software Engineer"
													onChange={(e) => {
														const value = e.target.value.replace(/[0-9]/g, "");
														field.onChange(value);
													}}
												/>
											</FormControl>
											<FormMessage className="text-red-400" />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Contact Information Grid */}
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<FormField
								control={basicDetailsForm.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Email <span className="text-red-400">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
												placeholder="john@example.com"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<FormField
								control={basicDetailsForm.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Phone <span className="text-red-400">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="tel"
												inputMode="numeric"
												maxLength={10}
												onChange={(e) => {
													const cleaned = e.target.value.replace(/\D/g, "");
													field.onChange(cleaned);
												}}
												className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
												placeholder="9876543210"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<FormField
								control={basicDetailsForm.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Location <span className="text-red-400">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
												placeholder="San Francisco, CA"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>

						{/* Optional Links */}
						<div>
							<h3 className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Optional Links</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<FormField
									control={basicDetailsForm.control}
									name="linkedinUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground">LinkedIn URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="url"
													className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
													placeholder="https://linkedin.com/in/..."
												/>
											</FormControl>
											<FormMessage className="text-red-400" />
										</FormItem>
									)}
								/>

								<FormField
									control={basicDetailsForm.control}
									name="githubUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground">GitHub URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="url"
													className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
													placeholder="https://github.com/..."
												/>
											</FormControl>
											<FormMessage className="text-red-400" />
										</FormItem>
									)}
								/>

								<FormField
									control={basicDetailsForm.control}
									name="websiteUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground">Website URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="url"
													className="border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50"
													placeholder="https://yourwebsite.com"
												/>
											</FormControl>
											<FormMessage className="text-red-400" />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Navigation Buttons */}
						<DialogFooter className="grid grid-cols-2 gap-x-2 pt-6 sm:flex sm:justify-end">
							<Button
								type="button"
								variant="outline"
								className="cursor-pointer border-border bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
								onClick={closeDialog}
							>
								<ArrowLeftIcon className="mr-2" />
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={!isFormValid}
								className="cursor-pointer bg-emerald-600 text-white transition-colors hover:bg-emerald-500"
							>
								Continue
								<ArrowRightIcon className="ml-2" />
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		);
	}

	return (
		<DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto rounded-xl border border-border bg-background/95 text-foreground shadow-2xl backdrop-blur-md">
			{/* Progress Bar */}
			<div className="mb-6">
				<div className="mb-2 flex items-center justify-between">
					<span className="font-medium text-muted-foreground text-sm">Step 2 of 2</span>
					<span className="font-medium text-muted-foreground text-sm">Choose Template</span>
				</div>
				<div className="h-1.5 w-full rounded-full bg-muted">
					<div
						className="h-1.5 rounded-full bg-emerald-500 transition-all duration-300"
						style={{ width: "100%" }}
					></div>
				</div>
			</div>
			{/* Header */}
			<div className="mb-8 text-center">
				<div className="mb-4 flex items-center justify-center gap-2">
					<img src="/zoe-talking.png" alt="Zoe AI" className="h-8 w-8 rounded-full border border-border dark:bg-slate-100 dark:p-[2px] dark:rounded-full" />
					<span className="font-medium text-muted-foreground text-sm">Zoe AI - Resume Builder Assistant</span>
				</div>
				<h1 className="mb-2 font-bold text-3xl text-foreground">Choose Your Template</h1>
				<p className="text-muted-foreground">Pick a design that matches your style. You can always change it later.</p>
			</div>{" "}
			{/* Templates Grid */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{Object.entries(templates).map(([key, template]) => (
					<TemplateCard
						key={key}
						template={template}
						isSelected={selectedTemplate === key}
						onSelect={() => setSelectedTemplate(key)}
						onContinue={onTemplateSelected}
						isPending={isPending}
					/>
				))}
			</div>
			{/* Navigation Buttons */}
			<DialogFooter className="flex items-center justify-between border-border border-t pt-6">
				<Button
					type="button"
					variant="outline"
					className="cursor-pointer border-border bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
					onClick={() => setCurrentStep(1)}
				>
					<ArrowLeftIcon className="mr-2" />
					Back
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}

export function UpdateResumeDialog({ data }: DialogProps<"resume.update">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const queryClient = useQueryClient();

	const { mutate: updateResume, isPending } = useMutation({
		mutationFn: (data: FormValues) => api.updateResume(data.id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		},
	});

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.id,
			name: data.name,
			slug: data.slug,
			tags: data.tags,
		},
	});

	const name = useWatch({ control: form.control, name: "name" });

	useEffect(() => {
		if (!name) return;
		form.setValue("slug", slugify(name), { shouldDirty: true });
	}, [form, name]);

	const { blockEvents } = useFormBlocker(form);

	const onSubmit = (data: FormValues) => {
		const toastId = toast.loading(t`Updating your resume...`);

		updateResume(data, {
			onSuccess: () => {
				toast.success(t`Your resume has been updated successfully.`, { id: toastId });
				closeDialog();
			},
			onError: (error) => {
				if (
					error.message === "RESUME_SLUG_ALREADY_EXISTS" ||
					error.message.toLowerCase().includes("internal server error")
				) {
					toast.error(t`Name already exists, please use a different name.`, { id: toastId });
					return;
				}

				toast.error(error.message, { id: toastId });
			},
		});
	};

	return (
		<DialogContent {...blockEvents}>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-2">
					<PencilSimpleLineIcon />
					<Trans>Rename Resume</Trans>
				</DialogTitle>
				<DialogDescription>
					<Trans>Give your resume a new name.</Trans>
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<ResumeForm />

					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							<Trans>Save Changes</Trans>
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}

export function DuplicateResumeDialog({ data }: DialogProps<"resume.duplicate">) {
	const navigate = useNavigate();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const queryClient = useQueryClient();

	const { mutate: duplicateResume, isPending } = useMutation({
		mutationFn: (values: Parameters<typeof api.duplicateResume>[1]) => api.duplicateResume(data.id, values),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		},
	});

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.id,
			name: `${data.name} (Copy)`,
			slug: `${data.slug}-copy`,
			tags: data.tags,
		},
	});

	const name = useWatch({ control: form.control, name: "name" });

	useEffect(() => {
		if (!name) return;
		form.setValue("slug", slugify(name), { shouldDirty: true });
	}, [form, name]);

	const { blockEvents } = useFormBlocker(form);

	const onSubmit = (values: FormValues) => {
		const toastId = toast.loading(t`Duplicating your resume...`);

		duplicateResume(values, {
			onSuccess: async (response) => {
				const resumeId = response.id;
				toast.success(t`Your resume has been duplicated successfully.`, { id: toastId });
				closeDialog();

				if (data.shouldRedirect) {
					navigate({ to: `/builder/$resumeId`, params: { resumeId } });
				}
			},
			onError: (error) => {
				if (
					error.message === "RESUME_SLUG_ALREADY_EXISTS" ||
					error.message.toLowerCase().includes("internal server error")
				) {
					toast.error("Name already exists, please use a different name.", { id: toastId });
					return;
				}

				toast.error(error.message, { id: toastId });
			},
		});
	};

	return (
		<DialogContent {...blockEvents}>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-2">
					<PencilSimpleLineIcon />
					<Trans>Duplicate Resume</Trans>
				</DialogTitle>
				<DialogDescription>
					<Trans>Duplicate your resume to create a new one, just like the original.</Trans>
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<ResumeForm />

					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							<Trans>Duplicate</Trans>
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}

function ResumeForm() {
	const form = useFormContext<FormValues>();
	// slugPrefix commented out — used only by the Slug field which is temporarily hidden
	// const { data: session } = authClient.useSession();
	// const slugPrefix = useMemo(() => {
	// 	return `${window.location.origin}/${session?.user.username ?? ""}/`;
	// }, [session]);

	return (
		<>
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<Trans>Name</Trans>
						</FormLabel>
						<FormControl>
							<Input min={1} max={64} {...field} />
						</FormControl>
						<FormMessage />
						<FormDescription>
							<Trans>Tip: You can name the resume referring to the position you are applying for.</Trans>
						</FormDescription>
					</FormItem>
				)}
			/>

			{/* Slug field commented out — not copyable and public slug URL not yet functional
			<FormField
				control={form.control}
				name="slug"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<Trans>Slug</Trans>
						</FormLabel>
						<FormControl>
							<InputGroup>
								<InputGroupAddon align="inline-start" className="hidden sm:flex">
									<InputGroupText>{slugPrefix}</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput min={1} max={64} className="ps-0!" {...field} />
							</InputGroup>
						</FormControl>
						<FormMessage />
						<FormDescription>
							<Trans>This is a URL-friendly name for your resume.</Trans>
						</FormDescription>
					</FormItem>
				)}
			/>
			*/}

			{/* Tags field commented out — no filtering/search feature currently uses tags
			<FormField
				control={form.control}
				name="tags"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<Trans>Tags</Trans>
						</FormLabel>
						<FormControl>
							<ChipInput {...field} />
						</FormControl>
						<FormMessage />
						<FormDescription>
							<Trans>Tags can be used to categorize your resume by keywords.</Trans>
						</FormDescription>
					</FormItem>
				)}
			/>
			*/}
		</>
	);
}

// Template Card Component
type TemplateCardProps = {
	template: TemplateMetadata;
	isSelected: boolean;
	onSelect: () => void;
	onContinue: () => void;
	isPending: boolean;
};

function TemplateCard({ template, isSelected, onSelect, onContinue, isPending }: TemplateCardProps) {
	return (
		<div
			onClick={onSelect}
			className={`group cursor-pointer transition-all ${isSelected ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background" : ""}`}
		>
			<div className="overflow-hidden rounded-xl border-2 border-border bg-card transition-all hover:border-emerald-500/50">
				{/* Template Preview Image */}
				<div className="relative aspect-[8.5/11] overflow-hidden bg-muted">
					<img src={template.imageUrl} alt={template.name} className="h-full w-full object-cover opacity-90" />

					{/* Selected Checkmark */}
					{isSelected && (
						<div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
								<svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>
					)}
				</div>

				{/* Template Info */}
				<div className="p-4">
					<div className="mb-1 flex items-start justify-between gap-2">
						<h3 className="font-semibold text-foreground">{template.name}</h3>
						<span className="whitespace-nowrap rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-[10px] text-emerald-400 uppercase tracking-wider ring-1 ring-emerald-500/20">
							{template.sidebarPosition === "left"
								? "Left Sidebar"
								: template.sidebarPosition === "right"
									? "Right Sidebar"
									: "Single Column"}
						</span>
					</div>
					<p className="mt-1 text-muted-foreground text-sm">
						{typeof template.description === "object" ? template.name : template.description}
					</p>
					{/* Continue to Editor Button (only for selected template) */}
					{isSelected && (
						<Button
							type="button"
							className="mt-4 w-full bg-emerald-600 text-white transition-colors hover:bg-emerald-500"
							onClick={(e) => {
								e.stopPropagation();
								onContinue();
							}}
							disabled={isPending}
						>
							Continue to Editor
							<ArrowRightIcon className="ml-2" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
