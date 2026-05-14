import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import { toast } from "sonner";
import { useResumeStore } from "@/components/resume/store/resume";
import { SortableList } from "@/components/ui/sortable-list";
import { api } from "@/utils/api";
import { stripHtml } from "@/utils/string";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";
import { SortableSectionItem } from "../shared/sortable-section-item";

// Function to format date as 'Sep/2026'
function formatExperienceDate(dateString: string | undefined): string {
	if (!dateString) return "";

	try {
		const date = new Date(dateString);
		const month = date.toLocaleString("en-US", { month: "short" });
		const year = date.getFullYear();
		return `${month}/${year}`;
	} catch {
		return dateString;
	}
}

export function ExperienceSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.experience);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

	const handleAskZoe = async (id: string) => {
		setGeneratingIds((prev) => new Set([...prev, id]));

		try {
			// Get the experience item data
			const item = section.items.find((exp) => exp.id === id);
			if (!item) {
				throw new Error("Experience item not found");
			}

			// Call real AI with the experience data
			const response = await api.generateAIContent({
				resume_id: useResumeStore.getState().resume.id,
				type: "ExperienceDescription",
				value: stripHtml(`${item.position} at ${item.company}`),
			});

			const aiDescription = Object.values(response)[0];

			// Update the description with AI-generated content
			updateResumeData((draft) => {
				const draftItem = draft.sections.experience.items.find((exp) => exp.id === id);
				if (draftItem) {
					draftItem.description = aiDescription;
				}
			});

			toast.success("AI description generated successfully!");
		} catch (error) {
			console.error("AI generation error:", error);
			toast.error(error instanceof Error ? error.message : "Failed to generate description");
		} finally {
			// Always remove from generating set
			setGeneratingIds((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		}
	};

	return (
		<SectionBase type="experience">
			<div className="space-y-4">
				{/* Experiences List */}
				<SortableList
					items={section.items}
					onReorder={(newItems) => {
						updateResumeData((draft) => {
							draft.sections.experience.items = newItems;
						});
					}}
					keyExtractor={(item) => item.id}
					renderItem={(item) => (
						<SortableSectionItem
							key={item.id}
							type="experience"
							item={item}
							title={item.position || "New Position"}
							subtitle={[
								item.company,
								`${formatExperienceDate(item.startDate)} - ${item.endDate ? formatExperienceDate(item.endDate) : item.currentlyWorkingHere ? "Present" : ""}`.trim(),
							]
								.filter(Boolean)
								.join(" • ")}
							onAskZoe={() => handleAskZoe(item.id)}
						/>
					)}
				/>

				{/* Add Button */}
				<SectionAddItemButton type="experience">
					<Trans>Add a new experience</Trans>
				</SectionAddItemButton>

				{/* AI Generation Indicator */}
				{generatingIds.size > 0 && (
					<div className="fixed right-8 bottom-8 max-w-sm animate-pulse rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-2xl">
						<div className="flex items-start gap-4">
							<div className="flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-emerald-100">
								<img src="/zoe-icon.png" alt="Zoe" className="h-8 w-8" />
							</div>
							<div>
								<h4 className="mb-1 font-bold text-gray-900">Zoe is working...</h4>
								<p className="text-gray-600 text-sm">Generating professional descriptions for your experience</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</SectionBase>
	);
}
