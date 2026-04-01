import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/core/macro";
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
			<DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-white text-gray-900">
				{/* Progress Bar */}
				<div className="mb-6">
					<div className="mb-2 flex items-center justify-between">
						<span className="font-medium text-gray-700 text-sm">Step 1 of 2</span>
						<span className="font-medium text-gray-700 text-sm">Basic Details</span>
					</div>
					<div className="h-1.5 w-full rounded-full bg-gray-200">
						<div
							className="h-1.5 rounded-full bg-emerald-600 transition-all duration-300"
							style={{ width: "50%" }}
						></div>
					</div>
				</div>
				{/* Header with Zoe */}
				<div className="mb-6 flex items-start gap-4 border-gray-100 border-b pb-6">
					<div className="shrink-0">
						<img src="/zoe-talking.png" alt="Zoe AI" className="h-15 w-12 rounded-full" />
					</div>
					<div>
						<h2 className="mb-1 font-bold text-emerald-900 text-xl">Let's build your resume</h2>
						<p className="text-gray-600">I'm Zoe, your AI assistant for Resume Builder. Start with your basics.</p>
					</div>
				</div>{" "}
				<Form {...basicDetailsForm}>
					<form onSubmit={basicDetailsForm.handleSubmit(onBasicDetailsSubmit)} className="space-y-6">
						{/* Profile Photo Upload */}
						<div className="flex items-start gap-6">
							<div className="relative">
								<div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100">
									{profilePhoto ? (
										<img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
									) : (
										<CameraIcon className="h-10 w-10 text-gray-400" />
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
										className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700"
										title="Remove photo"
									>
										<TrashIcon className="h-4 w-4 text-white" />
									</button>
								) : (
									<label
										htmlFor="profile-photo-upload"
										className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-600 transition-colors hover:bg-emerald-700"
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
											<FormLabel className="text-gray-900">
												Full Name <span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
													placeholder="John Doe"
													onChange={(e) => {
														const value = e.target.value.replace(/[0-9]/g, "");
														field.onChange(value);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Professional Title */}
								<FormField
									control={basicDetailsForm.control}
									name="professionalTitle"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-900">
												Professional Title <span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
													placeholder="Senior Software Engineer"
													onChange={(e) => {
														const value = e.target.value.replace(/[0-9]/g, "");
														field.onChange(value);
													}}
												/>
											</FormControl>
											<FormMessage />
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
										<FormLabel className="text-gray-900">
											Email <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
												placeholder="john@example.com"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={basicDetailsForm.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-900">
											Phone <span className="text-red-500">*</span>
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
												placeholder="9876543210"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={basicDetailsForm.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-900">
											Location <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
												placeholder="San Francisco, CA"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Optional Links */}
						<div>
							<h3 className="mb-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">Optional Links</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<FormField
									control={basicDetailsForm.control}
									name="linkedinUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-900">LinkedIn URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="url"
													className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
													placeholder="https://linkedin.com/in/..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={basicDetailsForm.control}
									name="githubUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-900">GitHub URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="url"
													className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
													placeholder="https://github.com/..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={basicDetailsForm.control}
									name="websiteUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-900">Website URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="url"
													className="border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0"
													placeholder="https://yourwebsite.com"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Navigation Buttons */}
						<DialogFooter className="flex items-center justify-between pt-6">
							<Button
								type="button"
								variant="outline"
								className="border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
								onClick={closeDialog}
							>
								<ArrowLeftIcon className="mr-2" />
								Cancel
							</Button>

							<div className="flex gap-2">
								<Button type="submit" disabled={!isFormValid} className="bg-emerald-600 hover:bg-emerald-700">
									Continue
								</Button>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		);
	}

	// Step 2: Template Selection
	return (
		<DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto bg-white text-gray-900">
			{/* Progress Bar */}
			<div className="mb-6">
				<div className="mb-2 flex items-center justify-between">
					<span className="font-medium text-gray-700 text-sm">Step 2 of 2</span>
					<span className="font-medium text-gray-700 text-sm">Choose Template</span>
				</div>
				<div className="h-1.5 w-full rounded-full bg-gray-200">
					<div
						className="h-1.5 rounded-full bg-emerald-600 transition-all duration-300"
						style={{ width: "100%" }}
					></div>
				</div>
			</div>
			{/* Header */}
			<div className="mb-8 text-center">
				<div className="mb-4 flex items-center justify-center gap-2">
					<img src="/zoe-talking.png" alt="Zoe AI" className="h-8 w-8 rounded-full" />
					<span className="font-medium text-gray-600 text-sm">Zoe AI - Resume Builder Assistant</span>
				</div>
				<h1 className="mb-2 font-bold text-3xl text-emerald-900">Choose Your Template</h1>
				<p className="text-gray-600">Pick a design that matches your style. You can always change it later.</p>
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
			<DialogFooter className="flex items-center justify-between border-gray-200 border-t pt-6">
				<Button style={{ backgroundColor: "grey" }} type="button" variant="outline" onClick={() => setCurrentStep(1)}>
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
		mutationFn: api.updateResume,
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
			className={`group cursor-pointer transition-all ${isSelected ? "ring-2 ring-emerald-600 ring-offset-2" : ""}`}
		>
			<div className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all hover:border-gray-300">
				{/* Template Preview Image */}
				<div className="relative aspect-[8.5/11] overflow-hidden bg-linear-to-br from-gray-100 to-gray-50">
					<img src={template.imageUrl} alt={template.name} className="h-full w-full object-cover" />

					{/* Selected Checkmark */}
					{isSelected && (
						<div className="absolute inset-0 flex items-center justify-center bg-emerald-50/80">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
								<svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>
					)}
				</div>

				{/* Template Info */}
				<div className="bg-white p-4">
					<div className="mb-1 flex items-start justify-between">
						<h3 className="font-semibold text-emerald-900">{template.name}</h3>
						<span className="rounded bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700 text-xs">
							{template.sidebarPosition === "left"
								? "Left Sidebar"
								: template.sidebarPosition === "right"
									? "Right Sidebar"
									: "Single Column"}
						</span>
					</div>
					<p className="text-gray-600 text-sm">
						{typeof template.description === "object" ? template.name : template.description}
					</p>
					{/* Continue to Editor Button (only for selected template) */}
					{isSelected && (
						<Button
							type="button"
							className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700"
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
