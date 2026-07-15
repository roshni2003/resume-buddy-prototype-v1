import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { useResumeStore } from "@/components/resume/store/resume";
import { PageIcon } from "@/components/resume/shared/page-icon";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";

export function InterestsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.interests);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			const index = draft.sections.interests.items.findIndex((item) => item.id === id);
			if (index !== -1) draft.sections.interests.items.splice(index, 1);
		});
	};

	return (
		<SectionBase type="interests" className={cn("border-0 bg-transparent p-4 sm:p-6")}>
			<div className="flex flex-wrap items-center gap-3">
				{section.items.map((item) => (
					<div
						key={item.id}
						className="group flex items-center gap-2 rounded-full border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-1.5 shadow-sm transition-all hover:border-rose-200 hover:shadow-md"
					>
						<PageIcon icon={item.icon || "football"} className="h-3.5 w-3.5 text-rose-400 !text-rose-400 shrink-0" />
						<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
							{item.name}
						</span>
						<button
							onClick={() => handleDelete(item.id)}
							className="text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors ml-1"
						>
							<X className="h-3 w-3" />
						</button>
					</div>
				))}

				{/* Add Interest Button */}
				<SectionAddItemButton
					type="interests"
					className="mt-0 h-auto w-auto rounded-full border border-dashed border-rose-300 dark:border-rose-800/50 bg-rose-50/50 dark:bg-rose-900/20 px-4 py-1.5 text-sm font-medium text-rose-500 dark:text-rose-400 transition-all hover:border-rose-400 dark:hover:border-rose-700/50 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:shadow-sm [&>svg:first-child]:hidden"
				>
					<span className="flex items-center gap-1.5">
						<Plus className="h-3.5 w-3.5 stroke-[2.5]" />
						Add interests
					</span>
				</SectionAddItemButton>
			</div>
		</SectionBase>
	);
}
