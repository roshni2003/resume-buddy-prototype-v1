import { DownloadSimpleIcon, MagicWandIcon, SuitcaseIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDialogStore } from "@/dialogs/store";
import { cn } from "@/utils/style";

type Step = 0 | 1 | 2;

const steps: {
	label: string;
	description: string;
	icon: React.ElementType;
	action: (
		navigate: ReturnType<typeof useNavigate>,
		openDialog: ReturnType<typeof useDialogStore>["openDialog"],
	) => void;
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
		<div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-card/80 p-4 shadow-lg backdrop-blur-sm transition-all sm:p-5 xl:flex-row xl:items-center">
			<div className="flex items-center gap-3 sm:gap-4">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 sm:size-12">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
					</svg>
				</div>
				<div className="flex min-h-[44px] flex-col justify-center">
					<h3 className="font-bold text-sm text-foreground sm:text-base">Zoe works the way you do</h3>
					<div
						className="mt-0.5 flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm"
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
			<div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 xl:w-auto">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const isActive = activeStep === index;
					return (
						<button
							key={step.label}
							type="button"
							onClick={() => {
								setAnimating(true);
								setTimeout(() => {
									setActiveStep(index as Step);
									setAnimating(false);
								}, 300);
								step.action(navigate, openDialog);
							}}
							className={cn(
								"flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-xs transition-all duration-300 sm:text-sm",
								isActive
									? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
									: "border border-emerald-500/30 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
							)}
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
