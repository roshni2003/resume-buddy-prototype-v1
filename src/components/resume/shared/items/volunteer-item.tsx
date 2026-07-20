import { useEffect, useRef } from "react";
import type { SectionItem } from "@/schema/resume/data";
import { handleContentEditableLinkClick } from "@/utils/resume/event";
import { stripHtml } from "@/utils/string";
import { cn } from "@/utils/style";
import { useResumeStore } from "../../store/resume";
import { InlineEditableText } from "../inline-editable-text";
import { PageLink } from "../page-link";

type VolunteerItemProps = SectionItem<"volunteer"> & {
	className?: string;
};

export function VolunteerItem({ className, ...item }: VolunteerItemProps) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description) {
			descriptionRef.current.innerHTML = item.description;
		}
	}, [item.description]);

	const handleOrganizationChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.organization = value;
		});
	};

	const handlePeriodChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.period = value;
		});
	};

	const handleLocationChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.location = value;
		});
	};

	const handleDescriptionChange = (e: React.FocusEvent<HTMLDivElement>) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description) {
			updateResumeData((draft) => {
				const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
				if (sectionItem) sectionItem.description = newValue;
			});
		}
	};

	// Helper function to get a clean display label from URL
	const getDisplayLabel = (url: string): string => {
		if (!url) return "";
		try {
			// Remove protocol (http://, https://)
			let cleanUrl = url.replace(/^https?:\/\//, '');
			// Remove www.
			cleanUrl = cleanUrl.replace(/^www\./, '');
			// Remove trailing slash
			cleanUrl = cleanUrl.replace(/\/$/, '');
			// Truncate if too long
			if (cleanUrl.length > 30) {
				return cleanUrl.substring(0, 30) + '...';
			}
			return cleanUrl;
		} catch {
			return url;
		}
	};

	// Check if we should show the website link
	const showWebsiteLink = item.website?.url && !item.options?.showLinkInTitle;

	// Get display label for the link
	const websiteLabel = item.website?.label || getDisplayLabel(item.website?.url || "");

	return (
		<div className={cn("volunteer-item", className)}>
			{/* Header */}
			<div className="section-item-header volunteer-item-header">
				{/* Row 1 */}
				<div className="flex items-start justify-between gap-x-2">
					<strong className="section-item-title volunteer-item-title">
						<InlineEditableText
							value={item.organization}
							placeholder="Organization"
							onChange={handleOrganizationChange}
							as={item.website?.url && item.options?.showLinkInTitle ? "a" : "span"}
							href={item.website?.url}
							className={item.website?.url && item.options?.showLinkInTitle ? "hover:underline" : ""}
						/>
					</strong>
					<span className="section-item-metadata volunteer-item-period shrink-0 text-end">
						<InlineEditableText value={item.period} placeholder="Period" onChange={handlePeriodChange} />
					</span>
				</div>

				{/* Row 2 */}
				<div className="flex items-start justify-between gap-x-2">
					<span className="section-item-metadata volunteer-item-location">
						<InlineEditableText value={item.location} placeholder="Location" onChange={handleLocationChange} />
					</span>
				</div>
			</div>

			{/* Description */}
			<div
				ref={descriptionRef}
				contentEditable
				suppressContentEditableWarning
				onBlur={handleDescriptionChange}
				onClick={handleContentEditableLinkClick}
				className={cn(
					"section-item-description volunteer-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				)}
			/>

			{/* Website - only show if URL exists and showLinkInTitle is false */}
			{showWebsiteLink && (
				<div className="section-item-website volunteer-item-website mt-1">
					<PageLink
						url={item.website.url}
						label={websiteLabel}
					/>
				</div>
			)}
		</div>
	);
}