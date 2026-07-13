import type { SectionItem } from "@/schema/resume/data";
import { cn } from "@/utils/style";
import { useResumeStore } from "../../store/resume";
import { InlineEditableText } from "../inline-editable-text";
import { PageIcon } from "../page-icon";

type LanguagesItemProps = SectionItem<"languages"> & {
	className?: string;
};

export function LanguagesItem({ className, ...item }: LanguagesItemProps) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleLanguageChange = (value: string) => {
		const trimmed = value.trim();

		updateResumeData((draft) => {
			const sectionItem = draft.sections.languages.items.find((i) => i.id === item.id);

			if (!sectionItem) return;

			// Don't save single character values
			if (trimmed.length > 1) {
				sectionItem.language = value;
			}
		});
	};

	return (
		<div className={cn("languages-item", className)}>
			{/* Header */}
			<div className="section-item-header languages-item-header flex items-center gap-x-1.5">
				<PageIcon icon={item.icon} className="section-item-icon languages-item-icon" />
				<strong className="section-item-title languages-item-name">
					<InlineEditableText value={item.language} placeholder="Language" onChange={handleLanguageChange} />
				</strong>
			</div>
		</div>
	);
}
