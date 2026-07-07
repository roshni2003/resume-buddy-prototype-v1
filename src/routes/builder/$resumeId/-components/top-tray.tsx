import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import {
	CircleNotchIcon,
	DownloadSimpleIcon,
	FilePdfIcon,
	MicrosoftWordLogoIcon,
	PaletteIcon,
	ShieldWarningIcon,
	SwapIcon,
	TextTIcon,
	ListIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { WritableDraft } from "immer";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ColorPicker } from "@/components/input/color-picker";
import { type ResumeStore, useResumeStore } from "@/components/resume/store/resume";
import { FontFamilyCombobox, FontWeightCombobox, getNextWeight } from "@/components/typography/combobox";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ReviewDrawer } from "@/components/ui/review-drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDialogStore } from "@/dialogs/store";
import type { ResumeData } from "@/schema/resume/data";
import { api } from "@/utils/api";
import { downloadFromUrl, generateFilename } from "@/utils/file";
import { mixpanelService } from "@/utils/mixpanel";
import { cn } from "@/utils/style";
import { AnimatedEyes, DeadEyes } from "./animated-eyes";

function getWeekNumber(date: Date) {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
	const week1 = new Date(d.getFullYear(), 0, 4);
	return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function BuilderTopTray() {
	const { i18n } = useLingui();
	const openDialog = useDialogStore((state) => state.openDialog);
	const params = useParams({ from: "/builder/$resumeId" });
	const { data: resume } = useQuery({
		queryKey: ["resumes", params.resumeId],
		queryFn: () => api.fetchResume(params.resumeId),
	});

	const { mutateAsync: exportResume, isPending: isPrinting } = useMutation({
		mutationFn: (data: { id: string; format: "pdf" | "docx" }) => api.exportResume(data.id, data.format),
	});

	const { mutateAsync: runFinalReview } = useMutation({
		mutationFn: api.generateAIContent,
	});

	const setShowReviewDrawer = useResumeStore((state: ResumeStore) => state.setShowReviewDrawer);
	const setReviewing = useResumeStore((state: ResumeStore) => state.setReviewing);
	const setReviewResult = useResumeStore((state: ResumeStore) => state.setReviewResult);
	const isReviewing = useResumeStore((state: ResumeStore) => state.isReviewing);
	const reviewResult = useResumeStore((state: ResumeStore) => state.reviewResult);
	const reviewAttempts = useResumeStore((state: ResumeStore) => state.reviewAttempts);
	const incrementReviewAttempts = useResumeStore((state: ResumeStore) => state.incrementReviewAttempts);

	const [reviewStartTime, setReviewStartTime] = useState<number>(0);
	const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
	const [showLastAttemptConfirm, setShowLastAttemptConfirm] = useState(false);
	useEffect(() => {
		return () => {
			if (fallbackTimeoutRef.current) {
				clearTimeout(fallbackTimeoutRef.current);
			}
		};
	}, []);

	const onFinalReview = async () => {
		if (!resume) {
			return;
		}

		if (reviewAttempts >= 2) {
			if (isMobile) {
				toast.error("🚫 Review limit reached. Resets at 12 AM.");
			}
			return;
		}

		// If this is the LAST attempt (second click)
		if (reviewAttempts === 1 && isMobile && !showLastAttemptConfirm) {
			setShowLastAttemptConfirm(true);
			return;
		}

		// Increment attempts before starting review
		incrementReviewAttempts();

		setReviewing(true);
		setReviewStartTime(Date.now());

		const toastId = toast.loading(i18n._(t({ id: "ai.review.loading", message: "AI is reviewing your resume..." })), {
			description: i18n._(
				t({
					id: "ai.review.loading.description",
					message: "Looking for improvements in layout, spacing, and content.",
				}),
			),
		});

		// Show fallback message if API takes too long
		fallbackTimeoutRef.current = setTimeout(() => {
			if (isReviewing) {
				toast.loading(t`Still analyzing your resume...`, {
					id: toastId,
					description: t`This is taking a bit longer than expected, please wait...`,
				});
			}
		}, 6000);

		try {
			const response = await runFinalReview({
				resume_id: resume.id,
				type: "FinalReview",
				value: "string",
			});

			const reviewRaw = response.FinalReview || Object.values(response)[0];
			if (!reviewRaw) throw new Error("No review result received from AI");

			// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
			let result;
			if (typeof reviewRaw === "string") {
				try {
					result = JSON.parse(reviewRaw);
				} catch (e) {
					console.error("Failed to parse Final Review result:", e);
					throw new Error("Invalid review format received from AI");
				}
			} else if (typeof reviewRaw === "object" && reviewRaw !== null) {
				result = reviewRaw;
			} else {
				throw new Error("Invalid review format received from AI");
			}

			// Ensure minimum 1.2 seconds loading time for UX
			const elapsedTime = Date.now() - reviewStartTime;
			const remainingTime = Math.max(0, 1200 - elapsedTime);

			await new Promise((resolve) => setTimeout(resolve, remainingTime));

			if (fallbackTimeoutRef.current) {
				clearTimeout(fallbackTimeoutRef.current);
			}

			setReviewing(false);
			setReviewResult(result);
			setShowReviewDrawer(true);

			mixpanelService.track("AI Token Usage", {
				tokens_used: result.tokens_used || 1500, // Fallback if not in API response
				feature: "FinalReview",
				success: true,
				timestamp: new Date().toISOString(),
				date: new Date().toISOString().split("T")[0],
				week: getWeekNumber(new Date()),
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			});

			toast.success(t`Review complete!`, {
				id: toastId,
				description: t`Score: ${result.overall_score}/100 - ${result.final_verdict === "READY" ? "Ready to export!" : "Check suggestions for improvements"}`,
			});
		} catch (error: any) {
			if (fallbackTimeoutRef.current) {
				clearTimeout(fallbackTimeoutRef.current);
			}

			setReviewing(false);
			console.error("Final Review Error:", error);

			mixpanelService.track("AI Token Usage", {
				tokens_used: 0,
				feature: "FinalReview",
				success: false,
				timestamp: new Date().toISOString(),
				date: new Date().toISOString().split("T")[0],
				week: getWeekNumber(new Date()),
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			});

			toast.error(i18n._(t({ id: "ai.review.error", message: "Review failed. Please try again." })), {
				id: toastId,
				description:
					error.message ||
					i18n._(
						t({
							id: "ai.review.error.description",
							message: "There was an error analyzing your resume. Please check your AI configuration.",
						}),
					),
			});
		}
	};

	const onDownloadPDF = async () => {
		if (!resume?.id) return;
		const filename = generateFilename(resume.data.basics.name, "pdf");
		const toastId = toast.loading(t`Please wait while your PDF is being generated...`, {
			description: t`This may take a while depending on the server capacity. Please do not close the window or refresh the page.`,
		});

		try {
			const { url } = await exportResume({ id: resume.id, format: "pdf" });
			downloadFromUrl(url, filename);

			mixpanelService.track("Resume Downloaded", {
				format: "pdf",
				status: "success",
				timestamp: new Date().toISOString(),
			});
		} catch (error: any) {
			mixpanelService.track("Resume Downloaded", {
				format: "pdf",
				status: "error",
				error_message: error.message,
				timestamp: new Date().toISOString(),
			});
			toast.error(t`There was a problem while generating the PDF, please try again in some time.`);
		} finally {
			toast.dismiss(toastId);
		}
	};

	const onDownloadDocx = async () => {
		if (!resume?.id) return;
		const filename = generateFilename(resume.data.basics.name, "docx");
		const toastId = toast.loading(t`Please wait while your DOCX is being generated...`, {
			description: t`This may take a while depending on the server capacity. Please do not close the window or refresh the page.`,
		});

		try {
			const { url } = await exportResume({ id: resume.id, format: "docx" });
			downloadFromUrl(url, filename);

			mixpanelService.track("Resume Downloaded", {
				format: "docx",
				status: "success",
				timestamp: new Date().toISOString(),
			});
		} catch (error: any) {
			mixpanelService.track("Resume Downloaded", {
				format: "docx",
				status: "error",
				error_message: error.message,
				timestamp: new Date().toISOString(),
			});
			toast.error(t`There was a problem while generating the DOCX, please try again in some time.`);
		} finally {
			toast.dismiss(toastId);
		}
	};

	const buttons = (
		<>
				{/* Colors Button */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							size="sm"
							variant="outline"
							className="h-9 w-full justify-start gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2"
							aria-label="Colors"
							data-tour="btn-colors"
						>
							<PaletteIcon className="h-4 w-4" />
							<span className="inline sm:hidden lg:inline">
								<Trans>Colors</Trans>
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-[90vw] max-w-[min(400px,95vw)] p-3 sm:w-100 sm:p-4"
						onOpenAutoFocus={(e) => e.preventDefault()}
						side="bottom"
						align="center"
						sideOffset={8}
					>
						<PopoverHeader>
							<PopoverTitle className="text-sm sm:text-base">
								<Trans>Resume Colours</Trans>
							</PopoverTitle>
						</PopoverHeader>
						<ColorsPopoverContent />
					</PopoverContent>
				</Popover>

				{/* Fonts Button */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							size="sm"
							variant="outline"
							className="h-9 w-full justify-start gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2"
							aria-label="Fonts"
							data-tour="btn-fonts"
						>
							<TextTIcon className="h-4 w-4" />
							<span className="inline sm:hidden lg:inline">
								<Trans>Fonts</Trans>
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-[90vw] max-w-[min(300px,95vw)] p-3 sm:mr-2 sm:w-100 sm:p-4"
						side="bottom"
						align="center"
						sideOffset={8}
					>
						<PopoverHeader>
							<PopoverTitle className="text-sm sm:text-base">
								<Trans>Typography Settings</Trans>
							</PopoverTitle>
						</PopoverHeader>
						<TypographyPopoverContent />
					</PopoverContent>
				</Popover>

				{/* Templates Button */}
				<Button
					size="sm"
					variant="outline"
					onClick={() => openDialog("resume.template.gallery", undefined)}
					className="h-9 w-full justify-start gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2"
					aria-label="Templates"
					data-tour="btn-templates"
				>
					<SwapIcon className="h-4 w-4" />
					<span className="inline sm:hidden lg:inline">
						<Trans>Templates</Trans>
					</span>
				</Button>

				{/* Final Review Button with Warning */}
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="shrink-0 w-full sm:w-auto">
							<Button
								size="sm"
								variant="outline"
								className={cn(
									"flex w-full justify-start h-9 gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2",
									"border-0 shadow-sm transition-all duration-300",
									"!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white",
									"hover:!from-indigo-700 hover:!to-purple-700",

									isReviewing && "scale-[0.98] brightness-90",

									reviewAttempts >= 2 && "!bg-gray-400 !text-white hover:!bg-gray-400 cursor-not-allowed",
								)}
								onClick={onFinalReview}
								data-tour="btn-final-review"
							>
								{isReviewing ? (
									<CircleNotchIcon className="animate-spin" />
								) : reviewAttempts >= 2 ? (
									<DeadEyes />
								) : (
									<motion.div whileHover={{ scale: 1.1 }}>
										<AnimatedEyes />
									</motion.div>
								)}
								<span className="inline sm:hidden lg:inline">
									<Trans>Final Review</Trans>
								</span>
							</Button>
						</div>
					</TooltipTrigger>

					{reviewAttempts === 1 && (
						<TooltipContent>
							⚠️ <Trans>One attempt left only!</Trans>
						</TooltipContent>
					)}

					{reviewAttempts >= 2 && (
						<TooltipContent>
							🚫 <Trans>Review limit reached. Resets at 12 AM.</Trans>
						</TooltipContent>
					)}
				</Tooltip>

				{/* View Last Review Button - Only shows if review result exists */}
				{reviewResult && !isReviewing && (
					<Button
						size="sm"
						variant="outline"
						onClick={() => setShowReviewDrawer(true)}
						className="h-9 w-full justify-start gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2"
						aria-label="View Last Review"
						title="View your last review results"
					>
						<ShieldWarningIcon className="h-4 w-4" />
						<span className="inline sm:hidden lg:inline">
							<Trans>View Review</Trans>
						</span>
					</Button>
				)}

				{/* Download Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size="sm"
							variant="default"
							disabled={isPrinting}
							className="flex w-full h-9 justify-start gap-1.5 px-3 sm:w-auto sm:justify-center sm:gap-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all"
							aria-label="Download"
							data-tour="btn-download"
						>
							{isPrinting ? (
								<CircleNotchIcon className="size-4 animate-spin" />
							) : (
								<DownloadSimpleIcon className="size-4" />
							)}
							<span className="font-medium">
								<Trans>Download</Trans>
							</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="min-w-[160px] bg-popover text-foreground border-border"
					>
						<DropdownMenuItem
							onClick={onDownloadPDF}
							disabled={isPrinting}
							className="cursor-pointer gap-2 focus:bg-accent focus:text-accent-foreground"
						>
							<FilePdfIcon className="size-4 text-red-500" />
							<span className="font-medium">Download PDF</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={onDownloadDocx}
							disabled={isPrinting}
							className="cursor-pointer gap-2 focus:bg-accent focus:text-accent-foreground"
						>
							<MicrosoftWordLogoIcon className="size-4 text-blue-500" />
							<span className="font-medium">Download Word</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
		</>
	);

	return (
		<>
			{/* Desktop View */}
			<div className="hidden sm:flex items-center justify-end gap-2">
				{buttons}
			</div>

			{/* Mobile View */}
			<div className="flex items-center justify-end sm:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" variant="ghost" aria-label="Menu" className="mr-1">
							<ListIcon className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[280px] p-4 flex flex-col gap-4 border-border">
						<SheetHeader className="text-left mb-2">
							<SheetTitle>Menu</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-3">
							{buttons}
						</div>
					</SheetContent>
				</Sheet>
			</div>

			{/* Review Drawer */}
			{reviewResult && <ReviewDrawer result={reviewResult} />}
			<AlertDialog open={showLastAttemptConfirm} onOpenChange={setShowLastAttemptConfirm}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>⚠️ Only 1 attempt left</AlertDialogTitle>
						<AlertDialogDescription>
							This is your final review attempt for today. Do you want to continue?
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel>No</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								setShowLastAttemptConfirm(false);
								onFinalReview(); // Call again but now it will pass
							}}
						>
							Yes, Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

function ColorsPopoverContent() {
	const colors = useResumeStore((state: ResumeStore) => state.resume!.data.metadata.design.colors);
	const updateResumeData = useResumeStore((state: ResumeStore) => state.updateResumeData);

	const setColor = (key: "primary" | "text" | "background", value: string) => {
		updateResumeData((draft: WritableDraft<ResumeData>) => {
			draft.metadata.design.colors[key] = value;
		});
	};

	return (
		<div className="space-y-3 sm:space-y-4">
			<div className="space-y-1.5 sm:space-y-2">
				<p className="font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs">
					<Trans>Primary Color</Trans>
				</p>
				<div className="flex items-center gap-2">
					<ColorPicker value={colors.primary} onValueChange={(value) => setColor("primary", value)} />
					<Input
						value={colors.primary}
						onChange={(e) => setColor("primary", e.target.value)}
						className="text-xs sm:text-sm"
					/>
				</div>
			</div>

			<div className="space-y-1.5 sm:space-y-2">
				<p className="font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs">
					<Trans>Text Color</Trans>
				</p>
				<div className="flex items-center gap-2">
					<ColorPicker value={colors.text} onValueChange={(value) => setColor("text", value)} />
					<Input
						value={colors.text}
						onChange={(e) => setColor("text", e.target.value)}
						className="text-xs sm:text-sm"
					/>
				</div>
			</div>

			<div className="space-y-1.5 sm:space-y-2">
				<p className="font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs">
					<Trans>Background Color</Trans>
				</p>
				<div className="flex items-center gap-2">
					<ColorPicker value={colors.background} onValueChange={(value) => setColor("background", value)} />
					<Input
						value={colors.background}
						onChange={(e) => setColor("background", e.target.value)}
						className="text-xs sm:text-sm"
					/>
				</div>
			</div>
		</div>
	);
}

function TypographyPopoverContent() {
	const typography = useResumeStore((state: ResumeStore) => state.resume!.data.metadata.typography);
	const colors = useResumeStore((state: ResumeStore) => state.resume!.data.metadata.design.colors);
	const updateResumeData = useResumeStore((state: ResumeStore) => state.updateResumeData);

	const updateBody = (data: Partial<typeof typography.body>) => {
		updateResumeData((draft: WritableDraft<ResumeData>) => {
			draft.metadata.typography.body = { ...draft.metadata.typography.body, ...data };
		});
	};

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<div className="min-w-0 space-y-2">
					<p className="font-semibold text-muted-foreground text-xs tracking-wide">
						<Trans>Font Family</Trans>
					</p>
					<FontFamilyCombobox
						buttonProps={{ className: "w-full" }}
						value={typography.body.fontFamily}
						onValueChange={(value) => {
							if (value === null) return;
							const nextWeight = getNextWeight(value);
							updateBody({
								fontFamily: value,
								fontWeights: nextWeight ? [nextWeight] : typography.body.fontWeights,
							});
						}}
					/>
				</div>

				<div className="min-w-0 space-y-2">
					<p className="font-semibold text-muted-foreground text-xs tracking-wide">
						<Trans>Font Weight</Trans>
					</p>
					<FontWeightCombobox
						buttonProps={{ variant: "ghost", className: "w-full" }}
						fontFamily={typography.body.fontFamily}
						value={typography.body.fontWeights}
						onValueChange={(weights) => {
							updateBody({
								fontWeights: weights as ("100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900")[],
							});
						}}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<div className="space-y-1.5 sm:space-y-2">
					<p className="font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs">
						<Trans>Size</Trans>
					</p>
					<InputGroup>
						<InputGroupInput
							type="number"
							min={6}
							max={24}
							step={0.1}
							value={typography.body.fontSize}
							onChange={(e) => {
								const parsed = Number(e.target.value);
								if (Number.isNaN(parsed)) return;
								updateBody({ fontSize: parsed });
							}}
						/>
						<ColorPicker
							value={colors.text}
							onValueChange={(color) => {
								updateResumeData((draft: WritableDraft<ResumeData>) => {
									draft.metadata.design.colors.text = color;
								});
							}}
						/>
						<InputGroupAddon align="inline-end">
							<InputGroupText className="text-xs sm:text-sm">
								<Trans>px</Trans>
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</div>

				<div className="space-y-1.5 sm:space-y-2">
					<p className="font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs">
						<Trans>Line Height</Trans>
					</p>
					<InputGroup>
						<InputGroupInput
							type="number"
							min={1}
							max={3}
							step={0.01}
							value={typography.body.lineHeight ?? 1.4}
							onChange={(e) => {
								const parsed = Number(e.target.value);
								if (Number.isNaN(parsed)) return;
								updateBody({ lineHeight: parsed });
							}}
						/>
						<InputGroupAddon align="inline-end">
							<InputGroupText className="text-xs sm:text-sm">
								<Trans>em</Trans>
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</div>
			</div>
		</div>
	);
}
