import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import { toast } from "sonner";
import type z from "zod";
import { useResumeStore } from "@/components/resume/store/resume";
import { SortableList } from "@/components/ui/sortable-list";
import type { projectItemSchema } from "@/schema/resume/data";
import { api } from "@/utils/api";
import { stripHtml } from "@/utils/string";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";
import { SortableSectionItem } from "../shared/sortable-section-item";

export function ProjectsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.projects);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const onReorder = (items: z.infer<typeof projectItemSchema>[]) => {
		updateResumeData((draft) => {
			draft.sections.projects.items = items;
		});
	};

	const buildSubtitle = (item: z.infer<typeof projectItemSchema>) => {
		const parts = [item.period, item.website.label].filter((part) => part && part.trim().length > 0);
		return parts.length > 0 ? parts.join(" • ") : undefined;
	};

	const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

	const handleAskZoe = async (id: string) => {
		setGeneratingIds((prev) => new Set([...prev, id]));
		try {
			const item = section.items.find((p) => p.id === id);
			if (!item) throw new Error("Project item not found");

			const response = await api.generateAIContent({
				resume_id: useResumeStore.getState().resume.id,
				type: "ProjectsDescription",
				value: stripHtml(item.name),
			});

			const aiDescription = Object.values(response)[0];

			updateResumeData((draft) => {
				const draftItem = draft.sections.projects.items.find((p) => p.id === id);
				if (draftItem) draftItem.description = aiDescription;
			});

			toast.success("AI project description generated!");
		} catch (error) {
			console.error("AI generation error:", error);
			toast.error(error instanceof Error ? error.message : "Failed to generate");
		} finally {
			setGeneratingIds((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		}
	};

	return (
		<SectionBase type="projects" className={cn("rounded-md border", section.items.length === 0 && "border-dashed")}>
			<SortableList
				items={section.items}
				onReorder={onReorder}
				keyExtractor={(item) => item.id}
				renderItem={(item) => (
					<SortableSectionItem
						key={item.id}
						type="projects"
						item={item}
						title={item.name}
						subtitle={buildSubtitle(item)}
						onAskZoe={() => handleAskZoe(item.id)}
					/>
				)}
			/>

			<SectionAddItemButton type="projects">
				<Trans>Add a new project</Trans>
			</SectionAddItemButton>

			{generatingIds.size > 0 && (
				<div className="fixed right-8 bottom-8 max-w-sm animate-pulse rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-2xl">
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-emerald-100">
							<img src="/zoe-icon.png" alt="Zoe" className="h-8 w-8" />
						</div>
						<div>
							<h4 className="mb-1 font-bold text-gray-900">Zoe is working...</h4>
							<p className="text-gray-600 text-sm">Generating professional descriptions for your projects</p>
						</div>
					</div>
				</div>
			)}
		</SectionBase>
	);
}
