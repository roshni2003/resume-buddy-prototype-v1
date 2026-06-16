import { PlusIcon } from "@phosphor-icons/react";
import { useDialogStore } from "@/dialogs/store";
import { cn } from "@/utils/style";

export function CreateResumeCard() {
	const { openDialog } = useDialogStore();

	return (
		<div
			onClick={() => openDialog("resume.onboarding", undefined)}
			className={cn(
				"group relative flex h-[280px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card/50 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 active:scale-[0.98] sm:active:scale-100"
			)}
		>
			<div className="flex size-10 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-emerald-500/10 mb-3">
				<PlusIcon weight="bold" className="size-5 text-muted-foreground transition-colors group-hover:text-emerald-500" />
			</div>
			<h3 className="font-semibold text-base text-foreground">New Resume</h3>
			<p className="text-muted-foreground text-xs sm:text-sm mt-1">Start from scratch or upload</p>
		</div>
	);
}
