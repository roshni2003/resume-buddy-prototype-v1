import { useEffect, useRef } from "react";
import type { SectionItem } from "@/schema/resume/data";
import { handleContentEditableLinkClick } from "@/utils/resume/event";
import { stripHtml } from "@/utils/string";
import { cn } from "@/utils/style";
import { useResumeStore } from "../../store/resume";
import { InlineEditableText } from "../inline-editable-text";
import { PageLink } from "../page-link";

type CertificationsItemProps = SectionItem<"certifications"> & {
	className?: string;
};

export function CertificationsItem({ className, ...item }: CertificationsItemProps) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description) {
			descriptionRef.current.innerHTML = item.description;
		}
	}, [item.description]);

	const handleTitleChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.title = value;
		});
	};

	const handleDateChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.date = value;
		});
	};

	const handleIssuerChange = (value: string) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.issuer = value;
		});
	};

	const handleDescriptionChange = (e: React.FocusEvent<HTMLDivElement>) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description) {
			updateResumeData((draft) => {
				const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
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

	// Format date from YYYY-MM to MMM YYYY (e.g. June 2026)
	const formatDateDisplay = (dateString: string | undefined): string => {
		if (!dateString) return "";
		if (/^\d{4}-\d{2}$/.test(dateString)) {
			try {
				const [year, month] = dateString.split('-');
				const date = new Date(parseInt(year), parseInt(month) - 1);
				return date.toLocaleString("en-US", { month: "short", year: "numeric" });
			} catch {
				return dateString;
			}
		}
		return dateString;
	};

	// Check if we should show the website link
	const showWebsiteLink = item.website?.url && !item.options?.showLinkInTitle;

	// Check if we should make the title a link
	const showTitleAsLink = item.website?.url && item.options?.showLinkInTitle;

	// Get display label for the link
	const websiteLabel = item.website?.label || getDisplayLabel(item.website?.url || "");

	// Format the date for display
	const displayDate = formatDateDisplay(item.date);

	// Render title with or without link
	const renderTitle = () => {
		return (
			<strong className="section-item-title certifications-item-title">
				<InlineEditableText
					value={item.title}
					placeholder="Certification Title"
					onChange={handleTitleChange}
					as={showTitleAsLink ? "a" : "span"}
					href={item.website?.url}
					className={showTitleAsLink ? "hover:underline" : ""}
				/>
			</strong>
		);
	};

	return (
		<div className={cn("certifications-item", className)}>
			{/* Header */}
			<div className="section-item-header certifications-item-header">
				{/* Row 1: Title + Date */}
				<div className="flex items-start justify-between gap-x-2">
					{renderTitle()}
					<span className="section-item-metadata certifications-item-date shrink-0 text-end">
						<InlineEditableText
							value={displayDate || item.date}
							placeholder="Date"
							onChange={handleDateChange}
						/>
					</span>
				</div>

				{/* Row 2: Issuer */}
				<div className="flex items-start justify-between gap-x-2">
					<span className="section-item-metadata certifications-item-issuer">
						<InlineEditableText
							value={item.issuer}
							placeholder="Issuer"
							onChange={handleIssuerChange}
						/>
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
					"section-item-description certifications-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				)}
			/>

			{/* Website - only show if URL exists and showLinkInTitle is false */}
			{showWebsiteLink && (
				<div className="section-item-website certifications-item-website mt-1">
					<PageLink
						url={item.website.url}
						label={websiteLabel}
					/>
				</div>
			)}
		</div>
	);
}