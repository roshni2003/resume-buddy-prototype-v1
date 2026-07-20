import { debounce } from "es-toolkit";
import { useEffect, useMemo, useRef } from "react";
import { useResumeStore } from "@/components/resume/store/resume";
import type { SectionItem } from "@/schema/resume/data";
import { handleContentEditableLinkClick } from "@/utils/resume/event";
import { cn } from "@/utils/style";
import { InlineEditableText } from "../inline-editable-text";
import { PageLink } from "../page-link";

type ProjectsItemProps = SectionItem<"projects"> & {
	className?: string;
};

export function ProjectsItem({ className, ...item }: ProjectsItemProps) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef<HTMLDivElement>(null);

	// Format description correctly into HTML if it is plain text
	const formatDescription = (text: string): string => {
		if (!text) return "";
		if (
			text.includes("<p>") ||
			text.includes("<ul>") ||
			text.includes("<li>") ||
			text.includes("<strong>") ||
			text.includes("<b>")
		) {
			return text;
		}

		const lines = text.split("\n").filter((line) => line.trim() !== "");
		const hasBulletMarkers = lines.some((line) => line.trim().match(/^[*\-•]\s+/));

		if (hasBulletMarkers) {
			const listItems = lines.map((line) => {
				const cleanLine = line.replace(/^[*\-•]\s+/, "").trim();
				return `<li><p>${cleanLine}</p></li>`;
			});
			return `<ul>${listItems.join("")}</ul>`;
		}

		return lines.map((p) => `<p>${p}</p>`).join("");
	};

	useEffect(() => {
		if (descriptionRef.current) {
			const formatted = formatDescription(item.description);
			if (descriptionRef.current.innerHTML !== formatted && document.activeElement !== descriptionRef.current) {
				descriptionRef.current.innerHTML = formatted;
			}
		}
	}, [item.description]);

	const debouncedUpdate = useMemo(
		() =>
			debounce((newValue: string) => {
				updateResumeData((draft) => {
					const project = draft.sections.projects.items.find((p) => p.id === item.id);
					if (project) project.description = newValue;
				});
			}, 100),
		[updateResumeData, item.id],
	);

	const handleDescriptionChange = (e: React.FormEvent<HTMLDivElement>) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description) {
			debouncedUpdate(newValue);
		}
	};

	const handleNameChange = (e: React.FocusEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.name) {
			updateResumeData((draft) => {
				const project = draft.sections.projects.items.find((p) => p.id === item.id);
				if (project) project.name = newValue;
			});
		}
	};

	const handlePeriodChange = (e: React.FocusEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.period) {
			updateResumeData((draft) => {
				const project = draft.sections.projects.items.find((p) => p.id === item.id);
				if (project) project.period = newValue;
			});
		}
	};

	return (
		<div className={cn("projects-item", className)}>
			{/* Header */}
			<div className="section-item-header projects-item-header">
				{/* Row 1 */}
				<div className="flex items-start justify-between gap-x-2">
					<strong className="section-item-title projects-item-title">
						<InlineEditableText
							value={item.name}
							placeholder="Project Name"
							onChange={(value) => {
								updateResumeData((draft) => {
									const project = draft.sections.projects.items.find((p) => p.id === item.id);
									if (project) project.name = value;
								});
							}}
							as={item.website?.url && item.options?.showLinkInTitle ? "a" : "span"}
							href={item.website?.url}
							className={item.website?.url && item.options?.showLinkInTitle ? "hover:underline" : ""}
						/>
					</strong>
					<span className="section-item-metadata projects-item-period shrink-0 text-end">
						<InlineEditableText
							value={item.period}
							placeholder="Period"
							onChange={(value) => {
								updateResumeData((draft) => {
									const project = draft.sections.projects.items.find((p) => p.id === item.id);
									if (project) project.period = value;
								});
							}}
						/>
					</span>
				</div>
				{/* Row 2 */}
				{item.role && (
					<div className="flex items-start justify-between gap-x-2 mt-0.5">
						<span className="section-item-metadata projects-item-role text-sm">
							<InlineEditableText
								value={item.role}
								placeholder="Role"
								onChange={(value) => {
									updateResumeData((draft) => {
										const project = draft.sections.projects.items.find((p) => p.id === item.id);
										if (project) project.role = value;
									});
								}}
							/>
						</span>
					</div>
				)}
			</div>

			{/* Description */}
			<div
				ref={descriptionRef}
				contentEditable
				suppressContentEditableWarning
				onInput={handleDescriptionChange}
				onClick={handleContentEditableLinkClick}
				className={cn(
					"section-item-description projects-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!item.description && "hidden"
				)}
			/>

			{/* Website */}
			{item.website && !item.options?.showLinkInTitle && (
				<div className="section-item-website projects-item-website">
					<PageLink {...item.website} label={item.website.label} />
				</div>
			)}
		</div>
	);
}
