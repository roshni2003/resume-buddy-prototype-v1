import { useEffect, useRef } from "react";
import { handleContentEditableLinkClick } from "@/utils/resume/event";
import { stripHtml } from "@/utils/string";
import { cn } from "@/utils/style";
import { useResumeStore } from "../../store/resume";
import { InlineEditableText } from "../inline-editable-text";

type CustomItemProps = {
	id: string;
	hidden: boolean;
	name?: string;
	description?: string;
	className?: string;
	[key: string]: any;
};

export function CustomItem({ className, ...item }: CustomItemProps) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== (item.description || "")) {
			descriptionRef.current.innerHTML = item.description || "";
		}
	}, [item.description]);

	const handleNameChange = (value: string) => {
		updateResumeData((draft) => {
			for (const section of draft.customSections) {
				const sectionItem = section.items.find((i) => i.id === item.id);
				if (sectionItem && section.type === "custom") {
					(sectionItem as any).name = value;
					break;
				}
			}
		});
	};

	const handleDescriptionChange = (e: React.FocusEvent<HTMLDivElement>) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description) {
			updateResumeData((draft) => {
				for (const section of draft.customSections) {
					const sectionItem = section.items.find((i) => i.id === item.id);
					if (sectionItem && section.type === "custom") {
						(sectionItem as any).description = newValue;
						break;
					}
				}
			});
		}
	};

	return (
		<div className={cn("custom-item", className)}>
			<div className="section-item-header custom-item-header">
				<div className="flex items-start justify-between gap-x-2">
					<strong className="section-item-title custom-item-title">
						<InlineEditableText value={item.name || ""} placeholder="Item Name" onChange={handleNameChange} />
					</strong>
				</div>
			</div>

			<div
				ref={descriptionRef}
				contentEditable
				suppressContentEditableWarning
				onBlur={handleDescriptionChange}
				onClick={handleContentEditableLinkClick}
				className={cn(
					"section-item-description custom-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description || "") && "hidden",
				)}
			/>
		</div>
	);
}
