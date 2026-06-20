import { useEffect, useRef } from "react";
import { useResumeStore } from "@/components/resume/store/resume";
import type { SectionItem } from "@/schema/resume/data";
import { handleContentEditableLinkClick } from "@/utils/resume/event";
import { stripHtml } from "@/utils/string";
import { cn } from "@/utils/style";
import { PageLink } from "../page-link";

type EducationItemProps = SectionItem<"education"> & {
    className?: string;
};

export function EducationItem({ className, ...item }: EducationItemProps) {
    const updateResumeData = useResumeStore((state) => state.updateResumeData);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description) {
            descriptionRef.current.innerHTML = item.description;
        }
    }, [item.description]);

    const isSchool = item.educationType === "School";

    const handleSchoolChange = (e: React.FocusEvent<HTMLSpanElement>) => {
        const newValue = e.currentTarget.textContent || "";
        const field = isSchool ? "schoolName" : "school";
        if (newValue !== item[field]) {
            updateResumeData((draft) => {
                const edu = draft.sections.education.items.find((e) => e.id === item.id);
                if (edu) (edu as any)[field] = newValue;
            });
        }
    };

    const handleDegreeChange = (e: React.FocusEvent<HTMLSpanElement>) => {
        const newValue = e.currentTarget.textContent || "";
        const field = isSchool ? "schoolBoard" : "degree";
        if (newValue !== item[field]) {
            updateResumeData((draft) => {
                const edu = draft.sections.education.items.find((e) => e.id === item.id);
                if (edu) (edu as any)[field] = newValue;
            });
        }
    };

    const handleAreaChange = (e: React.FocusEvent<HTMLSpanElement>) => {
        const newValue = e.currentTarget.textContent || "";
        if (newValue !== item.area) {
            updateResumeData((draft) => {
                const edu = draft.sections.education.items.find((e) => e.id === item.id);
                if (edu) edu.area = newValue;
            });
        }
    };

    const handlePeriodChange = (e: React.FocusEvent<HTMLSpanElement>) => {
        const newValue = e.currentTarget.textContent || "";
        if (newValue !== item.period) {
            updateResumeData((draft) => {
                const edu = draft.sections.education.items.find((e) => e.id === item.id);
                if (edu) edu.period = newValue;
            });
        }
    };

    const handleGradeChange = (e: React.FocusEvent<HTMLSpanElement>) => {
        const newValue = e.currentTarget.textContent || "";
        const field = isSchool ? "schoolGrade" : "grade";
        if (newValue !== item[field]) {
            updateResumeData((draft) => {
                const edu = draft.sections.education.items.find((e) => e.id === item.id);
                if (edu) (edu as any)[field] = newValue;
            });
        }
    };

    const handleDescriptionChange = (e: React.FocusEvent<HTMLDivElement>) => {
        const newValue = e.currentTarget.innerHTML || "";
        if (newValue !== item.description) {
            updateResumeData((draft) => {
                const edu = draft.sections.education.items.find((e) => e.id === item.id);
                if (edu) edu.description = newValue;
            });
        }
    };

    // Format date from YYYY-MM to MMMM YYYY (e.g. June 2026)
    const formatDateDisplay = (dateString: string | undefined): string => {
        if (!dateString) return "";
        // Only try to parse if it's strictly YYYY-MM (from previous month input)
        if (/^\d{4}-\d{2}$/.test(dateString)) {
            try {
                const [year, month] = dateString.split('-');
                const date = new Date(parseInt(year), parseInt(month) - 1);
                return date.toLocaleString("en-US", { month: "long", year: "numeric" });
            } catch {
                return dateString;
            }
        }
        return dateString;
    };

    // Build date display for both School and College
    let dateDisplay = "";
    const startForRender = isSchool ? (item.schoolStartDate ?? item.startDate) : item.startDate;
    const endForRender = isSchool ? (item.schoolEndDate ?? item.endDate) : item.endDate;
    const currentlyStudyingForRender = isSchool ? (item.schoolCurrentlyStudyingHere ?? item.currentlyStudyingHere) : item.currentlyStudyingHere;

    const start = startForRender ? formatDateDisplay(startForRender) : "";
    const end = currentlyStudyingForRender
        ? "Present"
        : endForRender
            ? formatDateDisplay(endForRender)
            : "";

    if (start || end) {
        dateDisplay = `${start}${start && end ? " – " : ""}${end}`;
    }

    // Build the education title
    const schoolText = isSchool ? (item.schoolName ?? item.school) : item.school;
    const degreeText = isSchool ? (item.schoolBoard ?? item.degree) : item.degree;
    const gradeText = isSchool ? (item.schoolGrade ?? item.grade) : item.grade;
    const educationTitle = [schoolText, item.area].filter(Boolean).join(", ");

    return (
        <div className={cn("education-item", className)}>
            {/* Header */}
            <div className="section-item-header education-item-header mb-2">
                {/* Row 1: School/Institution Name */}
                <div className="flex items-start justify-between gap-x-2">
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleSchoolChange}
                        className="section-item-title education-item-title cursor-text text-gray-900 outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
                    >
                        {schoolText || "School Name"}
                    </span>
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleDegreeChange}
                        className="section-item-metadata education-item-degree-grade shrink-0 cursor-text text-end text-gray-800 outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
                    >
                        {degreeText || "Degree"}
                    </span>
                </div>

                {/* Row 2: Area/Specialization and Location/Date */}
                <div className="flex items-start justify-between gap-x-2">
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleAreaChange}
                        className="section-item-metadata education-item-area cursor-text text-gray-700 outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
                    >
                        {item.area || "Specialization"}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {item.location && (
                            <span className="section-item-metadata education-item-location shrink-0 text-end text-gray-600">
                                {item.location}
                                <span className="mx-1">•</span>
                            </span>
                        )}
                        <span
                            contentEditable={item.educationType === "School"}
                            suppressContentEditableWarning={item.educationType === "School"}
                            onBlur={handlePeriodChange}
                            className="section-item-metadata education-item-location-period shrink-0 cursor-text text-end text-gray-600 outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500"
                        >
                            {dateDisplay}
                        </span>
                        <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleGradeChange}
                            className="section-item-metadata education-item-grade shrink-0 cursor-text text-end text-black outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 font-medium"
                        >
                            {gradeText || "Grade"}
                        </span>
                    </div>
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
                    "section-item-description education-item-description tiptap-content cursor-text text-gray-700 outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
                    !stripHtml(item.description) && "hidden",
                )}
            />

            {/* Website */}
            {item.website && !item.options?.showLinkInTitle && item.website.url && (
                <div className="section-item-website education-item-website mt-1">
                    <PageLink {...item.website} label={item.website.label || item.website.url} />
                </div>
            )}
        </div>
    );
}