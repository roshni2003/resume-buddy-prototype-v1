import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { useResumeStore } from "@/components/resume/store/resume";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";
import { PageIcon } from "@/components/resume/shared/page-icon";

export function LanguagesSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.languages);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			const index = draft.sections.languages.items.findIndex((item) => item.id === id);
			if (index !== -1) draft.sections.languages.items.splice(index, 1);
		});
	};

	return (
		<SectionBase type="languages" className={cn("border-0 bg-transparent p-4 sm:p-6")}>
			<div className="flex flex-wrap items-center gap-3">
				{section.items.map((item) => (
					<div
						key={item.id}
						className="group flex items-center gap-2 rounded-full border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-1.5 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md"
					>
						<PageIcon icon={item.icon} className="h-3.5 w-3.5 text-cyan-500" />
						<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
							{item.language}
						</span>
						<button
							onClick={() => handleDelete(item.id)}
							className="text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors ml-1"
						>
							<X className="h-3 w-3" />
						</button>
					</div>
				))}

				{/* Add Language Button */}
				<SectionAddItemButton
					type="languages"
					className="mt-0 h-auto w-auto rounded-full border border-dashed border-cyan-300 dark:border-cyan-800/50 bg-cyan-50/50 dark:bg-cyan-900/20 px-4 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 transition-all hover:border-cyan-400 dark:hover:border-cyan-700/50 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:shadow-sm [&>svg:first-child]:hidden"
				>
					<span className="flex items-center gap-1.5">
						<Plus className="h-3.5 w-3.5 stroke-[2.5]" />
						Add languages
					</span>
				</SectionAddItemButton>
			</div>
		</SectionBase>
	);
}