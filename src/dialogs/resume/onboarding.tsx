import { MagicWandIcon, SuitcaseIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDialogStore } from "../store";

export function OnboardingDialog() {
	const { closeDialog, openDialog } = useDialogStore();
	const navigate = useNavigate();

	const handleScratch = () => {
		// Close onboarding first, then open create dialog AFTER the 300ms
		// activeDialog-clear timeout in closeDialog has completed.
		closeDialog();
		setTimeout(() => {
			openDialog("resume.create", undefined);
		}, 350);
	};

	const handleUpload = () => {
		closeDialog();
		navigate({ to: "/dashboard/resumes/upload" });
	};

	return (
		<DialogContent className="max-w-xl rounded-xl border border-border bg-background/95 p-6 text-foreground shadow-2xl backdrop-blur-md">
			<DialogHeader className="mb-4">
				<div className="flex items-center gap-3">
					<img src="/zoe-icon.png" alt="Zoe AI" className="size-9 rounded-full border border-border object-cover dark:invert dark:hue-rotate-180" />
					<div>
						<DialogTitle className="font-bold text-foreground text-xl">How would you like to start?</DialogTitle>
						<DialogDescription className="mt-0.5 text-muted-foreground text-sm">
							Choose one of the options below to kickstart your professional resume.
						</DialogDescription>
					</div>
				</div>
			</DialogHeader>

			<div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-3">
				{/* Build from Scratch */}
				<button
					type="button"
					onClick={handleScratch}
					className="group flex cursor-pointer flex-col items-center justify-between rounded-xl border border-border bg-muted/30 p-5 text-center shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition-transform duration-300 group-hover:scale-110">
						<MagicWandIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-emerald-400">
							Build from scratch
						</h3>
						<p className="mt-1 text-muted-foreground text-xs leading-snug">
							Start from a blank canvas and design step by step.
						</p>
					</div>
				</button>

				{/* Upload Existing Resume */}
				<button
					type="button"
					onClick={handleUpload}
					className="group flex cursor-pointer flex-col items-center justify-between rounded-xl border border-border bg-muted/30 p-5 text-center shadow-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-muted/70"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 transition-transform duration-300 group-hover:scale-110">
						<UploadSimpleIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-blue-400">
							Upload resume
						</h3>
						<p className="mt-1 text-muted-foreground text-xs leading-snug">
							Upload an existing PDF or Word file and rewrite it.
						</p>
					</div>
				</button>

				{/* Match to a Job */}
				<button
					type="button"
					onClick={() => {
						closeDialog();
						navigate({ to: "/dashboard/resumes/match" });
					}}
					className="group flex cursor-pointer flex-col items-center justify-between rounded-xl border border-border bg-muted/30 p-5 text-center shadow-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-muted/70"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 transition-transform duration-300 group-hover:scale-110">
						<SuitcaseIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-purple-400">
							Match to a job
						</h3>
						<p className="mt-1 text-muted-foreground text-xs leading-snug">
							Paste a job description to tailor your resume fields.
						</p>
					</div>
				</button>
			</div>
		</DialogContent>
	);
}
