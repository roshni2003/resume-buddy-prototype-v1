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

			// Create preview URL and compress
			const reader = new FileReader();
			reader.onloadend = () => {
				const img = new Image();
				img.onload = () => {
					try {
						const canvas = document.createElement("canvas");
						let { width, height } = img;
						const maxDim = 800; // Resize to max 800px to reduce base64 size and prevent 413 error

						if (width > height) {
							if (width > maxDim) {
								height = Math.round(height * (maxDim / width));
								width = maxDim;
							}
						} else {
							if (height > maxDim) {
								width = Math.round(width * (maxDim / height));
								height = maxDim;
							}
						}

						canvas.width = width;
						canvas.height = height;
						const ctx = canvas.getContext("2d");
						
						if (ctx) {
							ctx.drawImage(img, 0, 0, width, height);
							// Compress image as webp or jpeg
							const compressedBase64 = canvas.toDataURL("image/webp", 0.8);
							form.setValue("url", compressedBase64, { shouldDirty: true });
							form.setValue("hidden", false, { shouldDirty: true });
							form.handleSubmit(onSubmit)();
							toast.success(t`Picture uploaded successfully!`);
						} else {
							// Fallback if canvas context fails
							form.setValue("url", img.src, { shouldDirty: true });
							form.setValue("hidden", false, { shouldDirty: true });
							form.handleSubmit(onSubmit)();
							toast.success(t`Picture uploaded successfully!`);
						}
					} catch (e) {
						console.error("Failed to compress image", e);
						// Fallback to original image
						form.setValue("url", img.src, { shouldDirty: true });
						form.setValue("hidden", false, { shouldDirty: true });
						form.handleSubmit(onSubmit)();
						toast.success(t`Picture uploaded successfully!`);
					}
				};
				img.src = reader.result as string;
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
			<form onChange={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
					{/* Left Column: Photo Upload/Preview */}
					<div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[24px] border-2 border-emerald-200 dark:border-emerald-800/50 border-dashed bg-white dark:bg-card shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-muted/50">
						{pictureUrl ? (
							<div
								className="flex items-center justify-center overflow-hidden bg-white dark:bg-card shadow-md transition-all duration-300"
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
								<img src={pictureUrl} alt="Profile" className="h-full w-full object-cover" />
							</div>
						) : (
							<div className="flex flex-col items-center justify-center gap-4 text-emerald-800 dark:text-emerald-300">
								<div
									className={`flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 transition-all duration-300 ${aspectRatio === 1 && borderRadius === 100 ? "rounded-full" : // Circle
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
								<span className="font-medium text-gray-500 dark:text-gray-400 text-sm">Drop an image, or paste a URL</span>
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
									className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-card shadow-md transition-all hover:scale-110 hover:bg-gray-100 dark:hover:bg-muted"
									title="Change photo"
								>
									<PencilSimpleIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" weight="bold" />
								</label>
								<button
									type="button"
									onClick={handleRemovePhoto}
									className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-card shadow-md transition-all hover:scale-110 hover:bg-gray-100 dark:hover:bg-muted"
									title="Remove photo"
								>
									<TrashIcon className="h-4 w-4 text-red-500" weight="bold" />
								</button>
							</div>
						)}
					</div>

					{/* Right Column: Controls */}
					<div className="flex flex-col gap-6">
						{/* URL Input */}
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
										<Trans>Image URL</Trans>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="https://..."
											className="h-10 rounded-xl border border-gray-200 dark:border-border bg-gray-50 dark:bg-muted/50 px-4 text-sm transition-all focus:bg-white focus:ring-1 focus:ring-emerald-500"
											onChange={(e) => {
												field.onChange(e);
												if (e.target.value.trim() !== "") {
													form.setValue("hidden", false, { shouldDirty: true });
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Frame Selection */}
						<div className="space-y-3">
							<FormLabel className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
								<Trans>Frame</Trans>
							</FormLabel>
							<div className="flex gap-6">
								{/* Circle */}
								<button
									type="button"
									className="group flex flex-col items-center gap-2"
									onClick={() => {
										form.setValue("aspectRatio", 1, { shouldDirty: true });
										form.setValue("borderRadius", 100, { shouldDirty: true });
										form.handleSubmit(onSubmit)();
									}}
								>
									<div
										className={`flex h-16 w-16 items-center justify-center rounded-xl transition-all ${aspectRatio === 1 && borderRadius === 100 ? "bg-gray-200 dark:bg-muted/80" : "bg-transparent hover:bg-gray-50 dark:hover:bg-muted/50"}`}
									>
										<div
											className={`h-5 w-5 rounded-full ${aspectRatio === 1 && borderRadius === 100 ? "bg-gray-500" : "bg-gray-500"}`}
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 1 && borderRadius === 100 ? "font-medium text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"}`}
									>
										Circle
									</span>
								</button>

								{/* Oval */}
								<button
									type="button"
									className="group flex flex-col items-center gap-2"
									onClick={() => {
										form.setValue("aspectRatio", 0.75, { shouldDirty: true });
										form.setValue("borderRadius", 100, { shouldDirty: true });
										form.handleSubmit(onSubmit)();
									}}
								>
									<div
										className={`flex h-16 w-16 items-center justify-center rounded-xl transition-all ${aspectRatio === 0.75 && borderRadius === 100 ? "bg-gray-200 dark:bg-muted/80" : "bg-transparent hover:bg-gray-50 dark:hover:bg-muted/50"}`}
									>
										<div
											className={`h-6 w-5 rounded-full ${aspectRatio === 0.75 && borderRadius === 100 ? "bg-gray-500" : "bg-gray-500"}`}
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 0.75 && borderRadius === 100 ? "font-medium text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"}`}
									>
										Oval
									</span>
								</button>

								{/* Square */}
								<button
									type="button"
									className="group flex flex-col items-center gap-2"
									onClick={() => {
										form.setValue("aspectRatio", 1, { shouldDirty: true });
										form.setValue("borderRadius", 10, { shouldDirty: true });
										form.handleSubmit(onSubmit)();
									}}
								>
									<div
										className={`flex h-16 w-16 items-center justify-center rounded-xl transition-all ${aspectRatio === 1 && borderRadius === 10 ? "bg-gray-200 dark:bg-muted/80" : "bg-transparent hover:bg-gray-50 dark:hover:bg-muted/50"}`}
									>
										<div
											className={`h-5 w-5 rounded-sm ${aspectRatio === 1 && borderRadius === 10 ? "bg-gray-500" : "bg-gray-500"}`}
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 1 && borderRadius === 10 ? "font-medium text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"}`}
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
								<FormItem className="space-y-3 pt-2">
									<div className="flex items-center justify-between">
										<FormLabel className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider !m-0">
											<Trans>Size</Trans>
										</FormLabel>
										<span className="font-medium text-gray-900 dark:text-gray-100 text-sm">{field.value}px</span>
									</div>
									<div className="flex items-center justify-between pb-1 -mt-1">
										<button
											type="button"
											onClick={() => field.onChange(Math.max(32, field.value - 4))}
											className="text-xs font-medium text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100 transition-colors"
										>
											dec. size
										</button>
										<button
											type="button"
											onClick={() => field.onChange(Math.min(256, field.value + 4))}
											className="text-xs font-medium text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100 transition-colors"
										>
											inc. size
										</button>
									</div>
									<FormControl>
										<div className="relative flex w-full items-center">
											<input
												type="range"
												min={32}
												max={256}
												step={1}
												value={field.value}
												onChange={(e) => {
													field.onChange(Number(e.target.value));
												}}
												className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-emerald-100 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-500 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:bg-white"
												style={{
													background: `linear-gradient(to right, #10b981 0%, #10b981 ${((field.value - 32) / (256 - 32)) * 100}%, #d1fae5 ${((field.value - 32) / (256 - 32)) * 100}%, #d1fae5 100%)`,
												}}
											/>
										</div>
									</FormControl>
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
