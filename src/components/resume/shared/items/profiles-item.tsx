import type { SectionItem } from "@/schema/resume/data";
import { cn } from "@/utils/style";
import { useResumeStore } from "../../store/resume";
import { InlineEditableText } from "../inline-editable-text";
import { PageIcon } from "../page-icon";
import { PageLink } from "../page-link";

type ProfilesItemProps = SectionItem<"profiles"> & {
	className?: string;
};

export function ProfilesItem({ className, ...item }: ProfilesItemProps) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleNetworkChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.profiles.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.network = value;
		});
	};

	return (
		<div className={cn("profiles-item", className)}>
			<div className="section-item-header profiles-item-header flex items-start gap-x-1.5 mb-0!">
				<PageIcon icon={item.icon} className="section-item-icon profiles-item-icon shrink-0 mt-[3px]" />
				
				<div className="flex flex-col min-w-0">
					<strong className="section-item-title profiles-item-network">
						<InlineEditableText value={item.network} placeholder="Network" onChange={handleNetworkChange} />
					</strong>

					{!item.options?.showLinkInTitle && (
						<PageLink
							{...item.website}
							label={item.website.label || item.username}
							className="section-item-website profiles-item-website"
						/>
					)}
				</div>
			</div>
		</div>
	);
}
