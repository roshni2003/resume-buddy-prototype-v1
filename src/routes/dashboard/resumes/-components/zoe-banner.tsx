import { DownloadSimpleIcon, MagicWandIcon, SuitcaseIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDialogStore } from "@/dialogs/store";

type Step = 0 | 1 | 2;

const steps: {
	label: string;
	description: string;
	icon: React.ElementType;
	action: (navigate: ReturnType<typeof useNavigate>, openDialog: ReturnType<typeof useDialogStore>["openDialog"]) => void;
}[] = [
	{
		label: "Upload resume",
		description: "Drop in your old resume and I'll rewrite it into recruiter-ready impact.",
		icon: DownloadSimpleIcon,
		action: (navigate) => {
			navigate({ to: "/dashboard/resumes/upload" });
		},
	},
	{
		label: "Build from scratch",
		description: "Start from a blank page and I'll draft sharp, metric-rich content with you.",
		icon: MagicWandIcon,
		action: (_, openDialog) => {
			openDialog("resume.create", undefined);
		},
	},
	{
		label: "Match to a job",
		description: "Paste a job description and I'll tailor your resume to land the interview.",
		icon: SuitcaseIcon,
		action: () => {}, // Coming soon
	},
];

export function ZoeBanner() {
	const [activeStep, setActiveStep] = useState<Step>(0);
	const [animating, setAnimating] = useState(false);
	const { openDialog } = useDialogStore();
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setAnimating(true);
			setTimeout(() => {
				setActiveStep((prev) => ((prev + 1) % 3) as Step);
				setAnimating(false);
			}, 300);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const current = steps[activeStep];

	return (
		<div className="flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
			{/* Left: Zoe icon + text */}
			<div className="flex min-w-0 items-center gap-3">
				<div className="shrink-0">
					<img
						src="/zoe-icon.png"
						alt="Zoe AI"
						className="h-9 w-9 rounded-full object-cover"
					/>
				</div>
				<div className="min-w-0">
					<p className="font-semibold text-emerald-900 text-sm leading-tight">Zoe works the way you do</p>
					<div
						className="mt-0.5 flex items-center gap-1.5 text-emerald-700 text-xs"
						style={{
							opacity: animating ? 0 : 1,
							transform: animating ? "translateY(4px)" : "translateY(0)",
							transition: "opacity 0.3s ease, transform 0.3s ease",
						}}
					>
						{current && (
							<>
								<current.icon className="size-3.5 shrink-0" weight="regular" />
								<span>{current.description}</span>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Right: Action buttons */}
			<div className="flex shrink-0 flex-wrap items-center gap-2">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const isActive = activeStep === index;
					return (
						<button
							key={step.label}
							type="button"
							onClick={() => {
								// Switch active highlight
								setAnimating(true);
								setTimeout(() => {
									setActiveStep(index as Step);
									setAnimating(false);
								}, 300);
								// Run the step action
								step.action(navigate, openDialog);
							}}
							className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
								isActive
									? "border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-200"
									: "border-emerald-200 bg-white text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"
							}`}
						>
							<Icon className="size-3.5" weight={isActive ? "bold" : "regular"} />
							{step.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
