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
		<DialogContent className="max-w-xl bg-white p-6 text-gray-900 rounded-xl shadow-lg border border-gray-100">
			<DialogHeader className="mb-4">
				<div className="flex items-center gap-3">
					<img src="/zoe-icon.png" alt="Zoe AI" className="size-9 rounded-full object-cover" />
					<div>
						<DialogTitle className="text-xl font-bold text-gray-950">How would you like to start?</DialogTitle>
						<DialogDescription className="text-gray-500 text-sm mt-0.5">
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
					className="group flex flex-col items-center justify-between text-center p-5 rounded-xl border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all duration-300 shadow-sm"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:scale-110 transition-transform duration-300">
						<MagicWandIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-emerald-950 text-sm">Build from scratch</h3>
						<p className="mt-1 text-xs text-gray-500 leading-snug">
							Start from a blank canvas and design step by step.
						</p>
					</div>
				</button>

				{/* Upload Existing Resume */}
				<button
					type="button"
					onClick={handleUpload}
					className="group flex flex-col items-center justify-between text-center p-5 rounded-xl border border-blue-100 bg-blue-50/20 hover:bg-blue-50/60 hover:border-blue-300 transition-all duration-300 shadow-sm"
				>
					<div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700 group-hover:scale-110 transition-transform duration-300">
						<UploadSimpleIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-blue-950 text-sm">Upload resume</h3>
						<p className="mt-1 text-xs text-gray-500 leading-snug">
							Upload an existing PDF or Word file and rewrite it.
						</p>
					</div>
				</button>

				{/* Match to a Job */}
				<div
					className="relative flex flex-col items-center justify-between text-center p-5 rounded-xl border border-gray-100 bg-gray-50/60 opacity-75 cursor-not-allowed select-none"
				>
					<span className="absolute top-2 right-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
						Soon
					</span>
					<div className="flex size-12 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
						<SuitcaseIcon className="size-6" weight="regular" />
					</div>
					<div className="mt-4">
						<h3 className="font-bold text-gray-700 text-sm">Match to a job</h3>
						<p className="mt-1 text-xs text-gray-400 leading-snug">
							Paste a job description to tailor your resume fields.
						</p>
					</div>
				</div>
			</div>
		</DialogContent>
	);
}
