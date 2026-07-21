import { debounce } from "es-toolkit";
import { useEffect, useMemo, useRef } from "react";
import type z from "zod";
import { useResumeStore } from "@/components/resume/store/resume";
import type { experienceItemSchema } from "@/schema/resume/data";
import { handleContentEditableLinkClick } from "@/utils/resume/event";
import { cn } from "@/utils/style";
import { PageLink } from "../page-link";

// Function to format date as 'Sep/2026'
function formatExperienceDate(dateString: string | undefined): string {
	if (!dateString) return "";

	try {
		let date = new Date(dateString);
		if (isNaN(date.getTime())) {
			// Try to parse MM/YYYY or MM-YYYY
			const match = dateString.match(/^(\d{1,2})[\/\-](\d{4})$/);
			if (match) {
				date = new Date(`${match[2]}-${match[1].padStart(2, '0')}-02`); // Use 02 to avoid timezone underflow to previous month
			}
		}

		if (isNaN(date.getTime())) {
			return dateString;
		}
		const month = date.toLocaleString("en-US", { month: "short" });
		const year = date.getFullYear();
		return `${month} ${year}`;
	} catch {
		return dateString;
	}
}

type ExperienceItemProps = z.infer<typeof experienceItemSchema> & {
	className?: string;
};

export function ExperienceItem({ className, ...item }: ExperienceItemProps) {
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

	// Update description content when item.description changes
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
					const exp = draft.sections.experience.items.find((exp) => exp.id === item.id);
					if (exp) exp.description = newValue;
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

	const handleCompanyChange = (e: React.FocusEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.company) {
			updateResumeData((draft) => {
				const exp = draft.sections.experience.items.find((exp) => exp.id === item.id);
				if (exp) exp.company = newValue;
			});
		}
	};

	const handlePositionChange = (e: React.FocusEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.position) {
			updateResumeData((draft) => {
				const exp = draft.sections.experience.items.find((exp) => exp.id === item.id);
				if (exp) exp.position = newValue;
			});
		}
	};

	const handleLocationChange = (e: React.FocusEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.location) {
			updateResumeData((draft) => {
				const exp = draft.sections.experience.items.find((exp) => exp.id === item.id);
				if (exp) exp.location = newValue;
			});
		}
	};

	return (
		<div className={cn("experience-item group/item", className)}>
			{/* Header */}
			<div className="section-item-header experience-item-header">
				{/* Row 1 */}
				<div className="flex items-start justify-between gap-x-2">
					<span
						contentEditable
						suppressContentEditableWarning
						onBlur={handleCompanyChange}
						className="section-item-title experience-item-title cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
					>
						{item.company}
					</span>
					<span
						contentEditable
						suppressContentEditableWarning
						onBlur={handleLocationChange}
						className="section-item-metadata experience-item-location shrink-0 cursor-text text-end outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
					>
						{item.location}
					</span>
				</div>

				{/* Row 2 */}
				<div className="flex items-start justify-between gap-x-2">
					<span
						contentEditable
						suppressContentEditableWarning
						onBlur={handlePositionChange}
						className="section-item-metadata experience-item-position cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
					>
						{item.position}
					</span>
					<span className="section-item-metadata experience-item-period shrink-0 text-end">
						{formatExperienceDate(item.startDate)}
						{item.startDate && " - "}
						{item.currentlyWorkingHere ? "Present" : formatExperienceDate(item.endDate)}
					</span>
				</div>
			</div>

			{/* Description */}
			<div
				ref={descriptionRef}
				contentEditable
				suppressContentEditableWarning
				onInput={handleDescriptionChange}
				onClick={handleContentEditableLinkClick}
				className={cn(
					"section-item-description experience-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!item.description && "hidden"
				)}
			/>

		</div>
	);
}
