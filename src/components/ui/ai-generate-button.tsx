import { t } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useResumeStore } from "@/components/resume/store/resume";
import { api } from "@/utils/api";
import { mixpanelService } from "@/utils/mixpanel";
import { stripHtml } from "@/utils/string";
import { Button } from "./button";

function getWeekNumber(date: Date) {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
	const week1 = new Date(d.getFullYear(), 0, 4);
	return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

type AIGenerateButtonProps = {
	resumeId?: string;
	type: "experience" | "projects" | "summary" | "custom" | "ExperienceDescription" | "ProjectsDescription";
	data: Record<string, unknown>;
	onGenerated: (content: string) => void;
	disabled?: boolean;
	className?: string;
	roundsUsed?: number; // 0, 1, or 2
	maxRounds?: number; // default 2
	isWordCountValid?: boolean;
	onRoundComplete?: () => void;
};

export function AIGenerateButton({
	resumeId,
	type,
	data,
	onGenerated,
	disabled,
	className,
	roundsUsed = 0,
	maxRounds = 2,
	isWordCountValid = true,
	onRoundComplete,
}: AIGenerateButtonProps) {
	const isMounted = useRef(true);
	const storeResumeId = useResumeStore((state) => state.resume.id);
	const effectiveResumeId = resumeId || storeResumeId;

	const { mutate: generateContent, isPending } = useMutation({
		mutationFn: api.generateAIContent,
	});

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const hasReachedLimit = roundsUsed >= maxRounds;
	const roundsRemaining = Math.max(0, maxRounds - roundsUsed);
	const isLoading = isPending;

	const handleGenerate = () => {
		// Prevent multiple clicks while generating
		if (isLoading) {
			console.log("Already generating, ignoring click");
			toast.info(t`Please wait for the current generation to complete.`);
			return;
		}

		if (!isWordCountValid) {
			toast.error(t`Please write at least 5 words before asking Zoe.`);
			return;
		}

		if (hasReachedLimit) {
			toast.error(t`You've used all ${maxRounds} rounds for this text. Edit the content to get more AI suggestions.`);
			return;
		}

		console.log("Starting generation for round:", roundsUsed + 1);

		const toastId = toast.loading(
			roundsUsed === 0
				? t`Generating first suggestion...`
				: t`Generating refinement (Round ${roundsUsed + 1}/${maxRounds})...`,
		);

		// Map simpler internal types to what the API expects
		const apiType =
			type === "experience" ? "ExperienceDescription" : type === "projects" ? "ProjectsDescription" : type;

		const value = stripHtml(
			(data.currentSummary || data.description || data.content || Object.values(data)[0] || "") as string,
		);

		// Backend requires non-empty value. Notify user instead of sending default prompts.
		if (!value.trim()) {
			toast.error(
				t({
					id: "ai.generate.error.empty",
					message: "Please enter some details first to generate AI content.",
				}),
				{ id: toastId },
			);
			return;
		}

		generateContent(
			{
				resume_id: effectiveResumeId,
				type: apiType as "summary" | "ExperienceDescription" | "ProjectsDescription" | "FinalReview",
				value,
			},
			{
				onSuccess: (response) => {
					if (!isMounted.current) return;

					const content = response[apiType] || response.content || Object.values(response)[0];
					if (content) {
						onGenerated(content);
						if (onRoundComplete) onRoundComplete();

						mixpanelService.track("AI Token Usage", {
							tokens_used: response.tokens_used || 1200, // Fallback
							feature: apiType,
							success: true,
							timestamp: new Date().toISOString(),
							date: new Date().toISOString().split("T")[0],
							week: getWeekNumber(new Date()),
							month: new Date().getMonth() + 1,
							year: new Date().getFullYear(),
						});

						toast.success(t`Zoe has refined your content! (Round ${roundsUsed + 1}/${maxRounds})`, {
							id: toastId,
						});
					} else {
						// Handle case where API succeeds but content is empty
						toast.error(t`AI failed to generate a suggestion. Please try again.`, { id: toastId });
					}
				},
				onError: (error) => {
					if (!isMounted.current) return;

					mixpanelService.track("AI Token Usage", {
						tokens_used: 0,
						feature: apiType,
						success: false,
						timestamp: new Date().toISOString(),
						date: new Date().toISOString().split("T")[0],
						week: getWeekNumber(new Date()),
						month: new Date().getMonth() + 1,
						year: new Date().getFullYear(),
					});

					toast.error(error.message, { id: toastId });
				},
			},
		);
	};

	// Determine button text based on state
	const getButtonText = () => {
		if (isLoading) return t`Generating...`;

		if (hasReachedLimit) return t`Ask Zoe (Used)`;

		return t`Ask Zoe (${roundsRemaining} ${roundsRemaining === 1 ? "round" : "rounds"} remaining)`;
	};

	const isDisabled = disabled || isLoading || !isWordCountValid || hasReachedLimit;

	return (
		<Button
			type="button"
			size="sm"
			variant="outline"
			onClick={handleGenerate}
			disabled={isDisabled}
			className={`flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm shadow-sm transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
		>
			<img src="/zoe-talking.png" alt="" className="size-4" />
			<span>{getButtonText()}</span>
			{isLoading && (
				<span className="ml-1 h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
			)}
		</Button>
	);
}
