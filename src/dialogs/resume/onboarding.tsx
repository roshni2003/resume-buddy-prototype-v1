import { MagicWandIcon, UploadSimpleIcon, SuitcaseIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
		<DialogContent className="max-w-xl bg-[#0f172a]/95 backdrop-blur-md p-6 text-slate-50 rounded-xl shadow-2xl border border-slate-800">
			<DialogHeader className="mb-4">
				<div className="flex items-center gap-3">
					<img src="/zoe-icon.png" alt="Zoe AI" className="size-9 rounded-full object-cover border border-slate-700" />
					<div>
						<DialogTitle className="text-xl font-bold text-slate-50">How would you like to start?</DialogTitle>
						<DialogDescription className="text-slate-400 text-sm mt-0.5">
							Choose one of the options below to kickstart your professional resume.
						</DialogDescription>
					</div>
				</div>
			</DialogHeader>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
				{/* Build from Scratch */}
				<button
					type="button"
					onClick={handleScratch}
					className="group flex flex-col items-center justify-between text-center p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300 ring-1 ring-emerald-500/20">
						<MagicWandIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-slate-200 text-sm group-hover:text-emerald-400 transition-colors">Build from scratch</h3>
						<p className="mt-1 text-xs text-slate-400 leading-snug">
							Start from a blank canvas and design step by step.
						</p>
					</div>
				</button>

				{/* Upload Existing Resume */}
				<button
					type="button"
					onClick={handleUpload}
					className="group flex flex-col items-center justify-between text-center p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:border-blue-500/50 transition-all duration-300 shadow-sm"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300 ring-1 ring-blue-500/20">
						<UploadSimpleIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-slate-200 text-sm group-hover:text-blue-400 transition-colors">Upload resume</h3>
						<p className="mt-1 text-xs text-slate-400 leading-snug">
							Upload an existing PDF or Word file and rewrite it.
						</p>
					</div>
				</button>

				{/* Match to a Job */}
				<div
					className="relative flex flex-col items-center justify-between text-center p-5 rounded-xl border border-slate-800 bg-slate-900/30 opacity-50 cursor-not-allowed select-none"
				>
					<span className="absolute top-2 right-2 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400 ring-1 ring-slate-700">
						Soon
					</span>
					<div className="flex size-12 items-center justify-center rounded-lg bg-slate-800/50 text-slate-500">
						<SuitcaseIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-slate-400 text-sm">Match to a job</h3>
						<p className="mt-1 text-xs text-slate-500 leading-snug">
							Paste a job description to tailor your resume fields.
						</p>
					</div>
				</div>
			</div>
		</DialogContent>
	);
}
