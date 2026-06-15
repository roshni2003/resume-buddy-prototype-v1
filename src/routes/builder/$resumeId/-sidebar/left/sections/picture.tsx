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
			<form onChange={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
					{/* Left Column: Photo Upload/Preview */}
					<div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[24px] border-2 border-emerald-200 border-dashed bg-white shadow-sm transition-all hover:bg-gray-50">
						{pictureUrl ? (
							<div
								className="flex items-center justify-center overflow-hidden bg-white shadow-md"
								style={{
									width: "100%",
									height: "100%",
									borderRadius: borderRadius === 100 ? "50%" : `${borderRadius}%`,
									border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
									boxShadow: shadowWidth > 0 ? `0 0 ${shadowWidth * 4}px ${shadowColor}40` : "none",
									transform: `rotate(${rotation}deg)`,
									aspectRatio: aspectRatio.toString(),
								}}
							>
								<img src={pictureUrl} alt="Profile" className="h-full w-full object-cover" />
							</div>
						) : (
							<div className="flex flex-col items-center justify-center gap-4 text-emerald-800">
								<div
									className={`flex items-center justify-center bg-emerald-50 transition-all duration-300 ${
										aspectRatio === 0.8 && borderRadius === 100
											? "rounded-t-full rounded-b-sm"
											: aspectRatio === 1 && borderRadius === 10
												? "rounded-xl"
												: "rounded-full"
									}`}
									style={{
										width: `${Math.max(64, Math.min(160, size * 0.8))}px`,
										height: `${Math.max(64, Math.min(160, size * 0.8)) / (aspectRatio || 1)}px`,
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
								<button
									type="button"
									onClick={handleRemovePhoto}
									className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 hover:bg-gray-100"
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
									<FormLabel className="font-bold text-gray-500 text-xs uppercase tracking-wider">
										<Trans>Image URL</Trans>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="https://..."
											className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm transition-all focus:bg-white focus:ring-1 focus:ring-emerald-500"
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
							<FormLabel className="font-bold text-gray-500 text-xs uppercase tracking-wider">
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
										className={`flex h-16 w-20 items-center justify-center rounded-xl transition-all ${aspectRatio === 1 && borderRadius === 100 ? "bg-[#0f1c23]" : "bg-transparent hover:bg-gray-50"}`}
									>
										<div
											className={`h-5 w-5 rounded-full ${aspectRatio === 1 && borderRadius === 100 ? "bg-gray-300" : "bg-gray-500"}`}
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 1 && borderRadius === 100 ? "font-medium text-[#0f1c23]" : "text-gray-900"}`}
									>
										Circle
									</span>
								</button>

								{/* Arch */}
								<button
									type="button"
									className="group flex flex-col items-center gap-2"
									onClick={() => {
										form.setValue("aspectRatio", 0.8, { shouldDirty: true });
										// we can set borderRadius to something high to simulate arch
										form.setValue("borderRadius", 100, { shouldDirty: true });
										form.handleSubmit(onSubmit)();
									}}
								>
									<div
										className={`flex h-16 w-20 items-center justify-center rounded-xl transition-all ${aspectRatio === 0.8 && borderRadius === 100 ? "bg-[#0f1c23]" : "bg-transparent hover:bg-gray-50"}`}
									>
										<div
											className={`h-6 w-5 rounded-t-full rounded-b-sm ${aspectRatio === 0.8 && borderRadius === 100 ? "bg-gray-300" : "bg-gray-500"}`}
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 0.8 && borderRadius === 100 ? "font-medium text-[#0f1c23]" : "text-gray-900"}`}
									>
										Arch
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
										className={`flex h-16 w-20 items-center justify-center rounded-xl transition-all ${aspectRatio === 1 && borderRadius === 10 ? "bg-[#0f1c23]" : "bg-transparent hover:bg-gray-50"}`}
									>
										<div
											className={`h-5 w-5 rounded-sm ${aspectRatio === 1 && borderRadius === 10 ? "bg-gray-300" : "bg-gray-500"}`}
										/>
									</div>
									<span
										className={`text-sm ${aspectRatio === 1 && borderRadius === 10 ? "font-medium text-[#0f1c23]" : "text-gray-900"}`}
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
										<FormLabel className="font-bold text-gray-500 text-xs uppercase tracking-wider">
											<Trans>Size</Trans>
										</FormLabel>
										<span className="font-medium text-gray-900 text-sm">{field.value}px</span>
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
