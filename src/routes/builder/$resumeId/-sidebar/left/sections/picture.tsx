import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/react/macro";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { useResumeStore } from "@/components/resume/store/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { pictureSchema } from "@/schema/resume/data";
import { SectionBase } from "../shared/section-base";

export function PictureSectionBuilder() {
	return (
		<SectionBase type="picture">
			<PictureSectionForm />
		</SectionBase>
	);
}

export function PictureSectionForm() {
	const picture = useResumeStore((state) => state.resume.data.picture);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm({
		resolver: zodResolver(pictureSchema),
		defaultValues: picture,
		mode: "onChange",
	});

	const onSubmit = (data: z.infer<typeof pictureSchema>) => {
		updateResumeData((draft) => {
			draft.picture = data;
		});
	};

	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				toast.error(t`Please select a valid image file (PNG, JPG, WEBP, etc.)`);
				return;
			}

			// Validate file size (max 10MB)
			if (file.size > 10 * 1024 * 1024) {
				toast.error(t`Image size should be less than 10MB`);
				return;
			}

			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				const url = reader.result as string;
				form.setValue("url", url, { shouldDirty: true });
				form.setValue("hidden", false, { shouldDirty: true });
				form.handleSubmit(onSubmit)();
				toast.success(t`Picture uploaded successfully!`);
			};
			reader.readAsDataURL(file);
		}
		// Reset input value to allow selecting the same file again
		event.target.value = "";
	};

	const handleRemovePhoto = () => {
		form.setValue("url", "", { shouldDirty: true });
		form.setValue("hidden", true, { shouldDirty: true });
		form.handleSubmit(onSubmit)();
		toast.success(t`Picture removed`);
	};

	const pictureUrl = form.watch("url");
	const borderRadius = form.watch("borderRadius");
	const borderWidth = form.watch("borderWidth");
	const borderColor = form.watch("borderColor");
	const shadowWidth = form.watch("shadowWidth");
	const shadowColor = form.watch("shadowColor");
	const rotation = form.watch("rotation");
	const aspectRatio = form.watch("aspectRatio");
	const size = form.watch("size");

	return (
		<Form {...form}>
			<form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Profile Photo Upload Section */}
				<div className="rounded-xl border border-border bg-muted/50 p-5 shadow-sm">
					{/* Section Header */}
					<div className="mb-4 flex items-center gap-2 border-border border-b pb-3">
						<CameraIcon className="h-5 w-5 text-emerald-600" weight="bold" />
						<h3 className="font-semibold text-foreground text-sm">
							<Trans>Profile Picture</Trans>
						</h3>
					</div>

					<div className="flex items-center gap-6">
						{/* Photo Preview with Live Customization */}
						<div className="relative shrink-0">
							<div
								className="flex items-center justify-center overflow-hidden bg-card shadow-md"
								style={{
									width: `${size}px`,
									height: `${size / (aspectRatio || 1)}px`,
									borderRadius:
										aspectRatio === 0.75 && borderRadius === 100 ? "50%" : // Oval uses 50% border radius on a rectangular container
											aspectRatio === 1 && borderRadius === 100 ? "50%" : // Circle
												`${borderRadius}px`, // Square
									border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
									boxShadow: shadowWidth > 0 ? `0 0 ${shadowWidth * 4}px ${shadowColor}40` : "none",
									transform: `rotate(${rotation}deg)`,
								}}
							>
								{pictureUrl ? (
									<img src={pictureUrl} alt="Profile" className="h-full w-full object-cover" />
								) : (
									<div className="flex flex-col items-center gap-2">
										<CameraIcon className="h-10 w-10 text-muted-foreground" />
										<span className="text-muted-foreground text-xs">No Photo</span>
									</div>
								)}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center gap-4 text-emerald-800">
								<div
									className={`flex items-center justify-center bg-emerald-50 transition-all duration-300 ${aspectRatio === 1 && borderRadius === 100 ? "rounded-full" : // Circle
										aspectRatio === 0.75 && borderRadius === 100 ? "rounded-full" : // Oval (uses 50% border-radius)
											"rounded-xl" // Square
										}`}
									style={{
										width: `${size}px`,
										height: `${size / (aspectRatio || 1)}px`,
										border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
										boxShadow: shadowWidth > 0 ? `0 0 ${shadowWidth * 4}px ${shadowColor}40` : "none",
										transform: `rotate(${rotation}deg)`,
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										fill="currentColor"
										viewBox="0 0 256 256"
									>
										<path d="M224,144v64a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V144a8,8,0,0,1,16,0v64H208V144a8,8,0,0,1,16,0ZM133.66,34.34a8,8,0,0,0-11.32,0l-48,48a8,8,0,0,0,11.32,11.32L120,59.31V160a8,8,0,0,0,16,0V59.31l34.34,34.35a8,8,0,0,0,11.32-11.32Z"></path>
									</svg>
								</div>
								<span className="font-medium text-gray-500 text-sm">Drop an image, or paste a URL</span>
							</div>
						)}
						<input
							type="file"
							accept="image/*"
							onChange={handlePhotoChange}
							className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
							id="picture-upload"
						/>

						{pictureUrl && (
							<div className="absolute top-3 right-3 z-20 flex gap-2">
								<label
									htmlFor="picture-upload"
									className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 hover:bg-gray-100"
									title="Change photo"
								>
									<PencilSimpleIcon className="h-4 w-4 text-gray-700" weight="bold" />
								</label>
							)}
						</div>

						{/* URL Input */}
						<div className="flex-1">
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-medium text-muted-foreground text-xs">
											<Trans>Picture URL</Trans>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Paste image URL here..."
												className="h-auto border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
												onChange={(e) => {
													field.onChange(e);
													if (e.target.value.trim() !== "") {
														form.setValue("hidden", false, { shouldDirty: true });
													}
												}}
											/>
										</FormControl>
										<FormMessage />
										<p className="mt-1.5 text-muted-foreground text-xs">Upload a photo or paste an image URL</p>
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Customization Options */}
				<div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
					<h3 className="mb-4 font-semibold text-foreground text-sm">
						<Trans>Picture Customization</Trans>
					</h3>

					{/* Size */}
					<FormField
						control={form.control}
						name="size"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-medium text-muted-foreground text-xs">
									<Trans>Size</Trans>
								</FormLabel>
								<div className="flex items-center gap-2">
									<FormControl>
										<Input
											{...field}
											type="number"
											min={32}
											max={512}
											step={1}
											className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
											onChange={(e) => {
												const value = e.target.value;
												if (value === "") field.onChange("");
												else field.onChange(Number(value));
											}}
										/>
									</FormControl>
									<span className="font-medium text-muted-foreground text-sm">pt</span>
								</div>
								<FormMessage />
							</FormItem>
						)}
					</div>

					{/* Rotation */}
					<FormField
						control={form.control}
						name="rotation"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-medium text-muted-foreground text-xs">
									<Trans>Rotation</Trans>
								</FormLabel>
								<div className="flex items-center gap-2">
									<FormControl>
										<Input
											{...field}
											type="number"
											min={0}
											max={360}
											step={5}
											className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
											onChange={(e) => {
												field.onChange(e);
												if (e.target.value.trim() !== "") {
													form.setValue("hidden", false, { shouldDirty: true });
												}
											}}
										/>
									</FormControl>
									<span className="font-medium text-muted-foreground text-sm">°</span>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Aspect Ratio */}
					<FormField
						control={form.control}
						name="aspectRatio"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-medium text-muted-foreground text-xs">
									<Trans>Aspect Ratio</Trans>
								</FormLabel>
								<div className="flex items-center gap-2">
									<FormControl>
										<Input
											{...field}
											type="number"
											min={0.5}
											max={2.5}
											step={0.1}
											className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
											onChange={(e) => {
												const value = e.target.value;
												if (value === "") field.onChange("");
												else field.onChange(Number(value));
											}}
										/>
									</FormControl>
									<div className="flex gap-1">
										<Button
											type="button"
											size="icon"
											variant="outline"
											title={t`Square`}
											className="h-10 w-10 border-border p-2 transition-all hover:bg-muted/50"
											onClick={() => {
												field.onChange(1);
												form.handleSubmit(onSubmit)();
											}}
										>
											<div className="h-4 w-4 border-2 border-emerald-600" />
										</Button>
										<Button
											type="button"
											size="icon"
											variant="outline"
											title={t`Landscape`}
											className="h-10 w-10 border-border p-2 transition-all hover:bg-muted/50"
											onClick={() => {
												field.onChange(1.5);
												form.handleSubmit(onSubmit)();
											}}
										>
											<div className="h-3 w-5 border-2 border-emerald-600" />
										</Button>
										<Button
											type="button"
											size="icon"
											variant="outline"
											title={t`Portrait`}
											className="h-10 w-10 border-border p-2 transition-all hover:bg-muted/50"
											onClick={() => {
												field.onChange(0.5);
												form.handleSubmit(onSubmit)();
											}}
										>
											<div className="h-5 w-3 border-2 border-emerald-600" />
										</Button>
									</div>
									<span
										className={`text-sm ${aspectRatio === 1 && borderRadius === 100 ? "font-medium text-gray-700" : "text-gray-900"}`}
									>
										Circle
									</span>
								</button>

					{/* Border Radius */}
					<FormField
						control={form.control}
						name="borderRadius"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-medium text-muted-foreground text-xs">
									<Trans>Border Radius</Trans>
								</FormLabel>
								<div className="flex items-center gap-2">
									<FormControl>
										<Input
											{...field}
											type="number"
											min={0}
											max={100}
											step={1}
											className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
											onChange={(e) => {
												const value = Number(e.target.value);
												field.onChange(value);
											}}
										/>
									</FormControl>
									<span className="mr-1 font-medium text-muted-foreground text-sm">pt</span>
									<div className="flex gap-1">
										<Button
											type="button"
											size="icon"
											variant="outline"
											title={t`Square (0pt)`}
											className="h-10 w-10 border-border p-2 transition-all hover:bg-muted/50"
											onClick={() => {
												field.onChange(0);
												form.handleSubmit(onSubmit)();
											}}
										>
											<div className="h-4 w-4 rounded-none border-2 border-emerald-600" />
										</Button>
										<Button
											type="button"
											size="icon"
											variant="outline"
											title={t`Rounded (10pt)`}
											className="h-10 w-10 border-border p-2 transition-all hover:bg-muted/50"
											onClick={() => {
												field.onChange(10);
												form.handleSubmit(onSubmit)();
											}}
										>
											<div className="h-4 w-4 rounded-sm border-2 border-emerald-600" />
										</Button>
										<Button
											type="button"
											size="icon"
											variant="outline"
											title={t`Circle (100pt)`}
											className="h-10 w-10 border-border p-2 transition-all hover:bg-muted/50"
											onClick={() => {
												field.onChange(100);
												form.handleSubmit(onSubmit)();
											}}
										>
											<div className="h-4 w-4 rounded-full border-2 border-emerald-600" />
										</Button>
									</div>
									<span
										className={`text-sm ${aspectRatio === 0.75 && borderRadius === 100 ? "font-medium text-gray-700" : "text-gray-900"}`}
									>
										Oval
									</span>
								</button>

					{/* Border Color & Width */}
					<div className="grid grid-cols-2 gap-3">
						<FormField
							control={form.control}
							name="borderColor"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium text-muted-foreground text-xs">
										<Trans>Border Color</Trans>
									</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl>
											<ColorPicker
												{...field}
												className="h-10 w-12 cursor-pointer rounded-lg border border-border"
												defaultValue={field.value}
												onValueChange={(color) => {
													field.onChange(color);
													form.handleSubmit(onSubmit)();
												}}
											/>
										</FormControl>
										<Input
											{...field}
											placeholder="#10b981"
											className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 1 && borderRadius === 10 ? "font-medium text-gray-700" : "text-gray-900"}`}
									>
										Square
									</span>
								</button>
							</div>
						</div>

						{/* Size Slider */}
						<FormField
							control={form.control}
							name="size"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium text-muted-foreground text-xs">
										<Trans>Border Width</Trans>
									</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl>
											<Input
												{...field}
												type="number"
												min={0}
												step={1}
												className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
												onChange={(e) => {
													field.onChange(Number(e.target.value));
												}}
											/>
										</FormControl>
										<span className="font-medium text-muted-foreground text-sm">pt</span>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Shadow Color & Width */}
					<div className="grid grid-cols-2 gap-3">
						<FormField
							control={form.control}
							name="shadowColor"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium text-muted-foreground text-xs">
										<Trans>Shadow Color</Trans>
									</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl>
											<ColorPicker
												{...field}
												className="h-10 w-12 cursor-pointer rounded-lg border border-border"
												defaultValue={field.value}
												onValueChange={(color) => {
													field.onChange(color);
													form.handleSubmit(onSubmit)();
												}}
											/>
										</FormControl>
										<Input
											{...field}
											placeholder="#000000"
											className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
										/>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="shadowWidth"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium text-muted-foreground text-xs">
										<Trans>Shadow Width</Trans>
									</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl>
											<Input
												{...field}
												type="number"
												min={0}
												step={0.5}
												className="flex-1 border-border px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
												onChange={(e) => {
													const value = e.target.value;
													if (value === "") field.onChange("");
													else field.onChange(Number(value));
												}}
											/>
										</FormControl>
										<span className="font-medium text-muted-foreground text-sm">pt</span>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
