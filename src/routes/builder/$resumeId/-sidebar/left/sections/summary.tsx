import { SparkleIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RichInput } from "@/components/input/rich-input";
import { useResumeStore } from "@/components/resume/store/resume";
import { AIGenerateButton } from "@/components/ui/ai-generate-button";
import { SectionBase } from "../shared/section-base";
import { Button } from "@/components/ui/button";
import { Trans } from "@lingui/react/macro";

export function SummarySectionBuilder() {
	const summary = useResumeStore((state) => state.resume.data.summary);
	const resumeData = useResumeStore((state) => state.resume.data);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm({
		defaultValues: { content: summary.content ?? "" },
	});

	const content = form.watch("content");
	const previousContentRef = useRef(content);

	const aiUpdateCountRef = useRef(0);
	const roundsUsed = useResumeStore((state) => state.summaryAIRoundsUsed);
	const incrementRoundsUsed = useResumeStore((state) => state.incrementSummaryRounds);
	const resetRounds = useResumeStore((state) => state.resetSummaryRounds);
	const maxRounds = 2;

	const [isPulsing, setIsPulsing] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsPulsing(false), 5000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (aiUpdateCountRef.current > 0) {
			aiUpdateCountRef.current -= 1;
			previousContentRef.current = content;
			return;
		}
		if (content !== previousContentRef.current) {
			resetRounds();
		}
		previousContentRef.current = content;
	}, [content, resetRounds]);

	const isWordCountValid =
		typeof content === "string" &&
		content
			.replace(/<[^>]*>?/gm, "")
			.split(/\s+/)
			.filter(Boolean).length >= 5;

	const handleAIGenerated = (aiSummary: string) => {
		if (aiSummary && aiSummary.length > 10) {
			aiUpdateCountRef.current = 2;
			form.setValue("content", aiSummary, { shouldDirty: true, shouldValidate: true });
			incrementRoundsUsed();
		}
	};

	const onSubmit = (data: any) => {
		updateResumeData((draft) => {
			draft.summary.content = data.content;
		});
		form.reset({ content: data.content });
	};

	const onCancel = () => {
		form.reset({ content: summary.content ?? "" });
	};

	const wordCount = content
		? content
			.replace(/<[^>]*>?/gm, "")
			.split(/\s+/)
			.filter(Boolean).length
		: 0;
	const charCount = content ? content.replace(/<[^>]*>?/gm, "").length : 0;

	return (
		<SectionBase type="summary">
			<div className="flex flex-col gap-6 p-5">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="mb-3 flex items-end justify-between">
							<label className="font-bold text-gray-500 text-xs uppercase tracking-widest">Professional Summary</label>

							<div className="relative mb-2 rounded-xl bg-gray-50 p-1">
								{isPulsing && (
									<>
										<div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-md animate-ai-glow" />

										<div
											className="absolute -inset-2 rounded-full border border-amber-300/50 animate-ai-glow-ring"
										/>
									</>
								)}
								<AIGenerateButton
									resumeId={resumeData.id}
									type="summary"
									data={{
										name: resumeData.basics.name,
										headline: resumeData.basics.headline,
										experience: resumeData.sections.experience.items.slice(0, 2),
										skills: resumeData.sections.skills.items.slice(0, 5).map((skill) => skill.name),
										currentSummary: content || "",
									}}
									onGenerated={handleAIGenerated}
									roundsUsed={roundsUsed}
									maxRounds={maxRounds}
									isWordCountValid={isWordCountValid}
									disabled={roundsUsed >= maxRounds || !isWordCountValid}
									className="relative z-10 border border-amber-300 font-bold text-black shadow-lg shadow-amber-500/30 hover:bg-amber-600 hover:text-white"
								/>
							</div>
						</div>

						{/* AI Chip */}
						<div className="mb-3 flex items-center gap-2">
							<div className="flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
								<SparkleIcon weight="fill" className="h-3 w-3" />
								AI Assisted
							</div>

							<span className="text-xs text-gray-500">
								Zoe can improve tone and impact
							</span>
						</div>

						{/* Input Area */}
						<div className="mb-2 rounded-xl bg-gray-50 p-1">
							<RichInput
								value={content}
								onChange={(val) => {
									form.setValue("content", val, { shouldDirty: true });
								}}
							/>
						</div>

						{/* Footer Stats */}
						<div className="mb-4 flex flex-col gap-1 font-mono text-gray-500 text-xs sm:flex-row sm:items-center sm:justify-between">
							<div>
								{wordCount} words &nbsp;·&nbsp; {charCount} chars
							</div>
							<div className="text-right font-sans">
								{!isWordCountValid && wordCount < 5 && wordCount > 0 && (
									<span className="text-amber-600">Write at least 5 words to enable Ask Zoe</span>
								)}
								{roundsUsed === 1 && <span className="font-medium text-blue-600">1 more AI suggestion left.</span>}
								{roundsUsed >= maxRounds && (
									<span className="font-medium text-red-600">Used both AI suggestions. Edit text to reset.</span>
								)}
							</div>
						</div>

						{/* Actions */}

					</form>
				</FormProvider>

				{/* Zoe Tips Card Below Input */}
				<div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-linear-to-br from-emerald-50 to-teal-50/50 p-5 shadow-sm">
					<div className="absolute top-0 right-0 p-4 opacity-10">
						<SparkleIcon weight="fill" className="h-24 w-24 text-emerald-600" />
					</div>
					<div className="mb-3 flex items-center gap-2">
						<SparkleIcon className="h-5 w-5 text-emerald-600" weight="fill" />
						<h4 className="font-bold text-emerald-800 text-sm uppercase tracking-widest">Zoe Tips</h4>
					</div>
					<ul className="mb-4 space-y-2 font-medium text-emerald-900 text-sm">
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
							Lead with your role + years
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
							Name 2-3 power skills
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
							What makes you different?
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
							Keep it under 80 words
						</li>
					</ul>
					<p className="font-serif text-emerald-700 text-sm italic">
						Zoe will polish tone, tighten verbs, and quantify impact for you. Look for the magic button above!
					</p>
				</div>
				<div className="flex justify-end gap-2">
					<Button
						type="button"
						variant="ghost"
						className="rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
						onClick={onCancel}
					>
						<Trans>Cancel</Trans>
					</Button>
					<Button
						type="submit"
						disabled={!form.formState.isDirty}
						className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
					>
						<Trans>Save Changes</Trans>
					</Button>
				</div>
			</div>
		</SectionBase>
	);
}