// components/ui/ai-generate-button.tsx
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { api } from "@/utils/api";
import { stripHtml } from "@/utils/string";
import { Button } from "./button";

type AIGenerateButtonProps = {
	resumeId: string;
	type: "experience" | "projects" | "summary" | "custom";
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
	const { i18n } = useLingui();
	const isMounted = useRef(true);

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
			toast.info(i18n._(t({ id: "ai.generate.wait", message: "Please wait for the current generation to complete." })));
			return;
		}

		if (!isWordCountValid) {
			toast.error(
				i18n._(t({ id: "ai.generate.error.word-count", message: "Please write at least 5 words before asking Zoe." })),
			);
			return;
		}

		if (hasReachedLimit) {
			toast.error(
				i18n._(t`You've used all ${maxRounds} rounds for this text. Edit the content to get more AI suggestions.`),
			);
			return;
		}

		const toastId = toast.loading(
			roundsUsed === 0
				? i18n._(t({ id: "ai.generate.loading.first", message: "Generating first suggestion..." }))
				: i18n._(t`Generating refinement (Round ${roundsUsed + 1}/${maxRounds})...`),
		);

		let backendType: "summary" | "ExperienceDescription" | "ProjectsDescription" = "summary";
		if (type === "experience") backendType = "ExperienceDescription";
		else if (type === "projects") backendType = "ProjectsDescription";

		const value = stripHtml(
			(data.currentSummary || data.description || data.content || Object.values(data)[0] || "") as string,
		);

		// Backend requires non-empty value. Notify user instead of sending default prompts.
		if (!value.trim()) {
			toast.error(
				i18n._(
					t({
						id: "ai.generate.error.empty",
						message: "Please enter some details first to generate AI content.",
					}),
				),
				{ id: toastId },
			);
			return;
		}

		generateContent(
			{
				resume_id: resumeId,
				type: backendType,
				value: value,
			},
			{
				onSuccess: (response) => {
					const content = response[backendType] || Object.values(response)[0];

					console.log("Generation successful, content length:", content?.length);

					// Check if content is valid
					if (!content || content.length < 10) {
						toast.error(
							i18n._(
								t({
									id: "ai.generate.error.too-short",
									message: "Generated content is too short. Please try again.",
								}),
							),
							{ id: toastId },
						);
						return;
					}

					toast.success(i18n._(t({ id: "ai.generate.success", message: "Content generated successfully!" })), {
						id: toastId,
					});
					onGenerated(content);

					// Record the round
					if (isMounted.current) {
						onRoundComplete?.();
					}
				},
				onError: (error) => {
					console.error("Generation error:", error);
					toast.error(error.message || i18n._(t({ id: "ai.generate.error", message: "Failed to generate content" })), {
						id: toastId,
					});
				},
			},
		);
	};

	// Determine button text based on state
	const getButtonText = () => {
		if (isLoading) return "Generating...";

		if (hasReachedLimit) return "Ask Zoe (Used)";

		return `Ask Zoe (${roundsRemaining} ${roundsRemaining === 1 ? "round" : "rounds"} remaining)`;
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
