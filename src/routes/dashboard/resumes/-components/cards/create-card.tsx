import { t } from "@lingui/macro";
import { PlusIcon } from "@phosphor-icons/react";
import { useDialogStore } from "@/dialogs/store";
import { cn } from "@/utils/style";

export function CreateResumeCard() {
	const { openDialog } = useDialogStore();

	return (
		<div
			onClick={() => openDialog("resume.onboarding", undefined)}
			className={cn(
				"group relative flex h-[280px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-transparent shadow-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 active:scale-[0.98] sm:active:scale-100"
			)}
		>
			<div className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-emerald-500/10 mb-3">
				<PlusIcon weight="bold" className="size-5 text-gray-400 transition-colors group-hover:text-emerald-400" />
			</div>
			<h3 className="font-semibold text-base text-white">{t`New Resume`}</h3>
			<p className="text-gray-400 text-xs sm:text-sm mt-1">{t`Start from scratch or upload`}</p>
		</div>
	);
}
