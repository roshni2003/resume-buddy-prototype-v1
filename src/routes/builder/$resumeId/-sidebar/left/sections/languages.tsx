import { X, Plus } from "lucide-react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";

const levelLabels: Record<number, string> = {
	0: "Hidden",
	1: "Beginner",
	2: "Conversational",
	3: "Proficient",
	4: "Fluent",
	5: "Native",
};

export function LanguagesSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.languages);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			const index = draft.sections.languages.items.findIndex((item) => item.id === id);
			if (index !== -1) draft.sections.languages.items.splice(index, 1);
		});
	};

	const handleLevelChange = (id: string, newLevel: number) => {
		updateResumeData((draft) => {
			const item = draft.sections.languages.items.find((item) => item.id === id);
			if (item) {
				item.level = newLevel;
				// Update fluency to match the new level
				item.fluency = levelLabels[newLevel];
			}
		});
	};

	return (
		<SectionBase type="languages" className={cn("border-0 bg-transparent p-4 sm:p-6")}>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex flex-col justify-between rounded-2xl bg-white/80 dark:bg-card/80 backdrop-blur-sm p-5 shadow-sm border border-gray-200 dark:border-border transition-all hover:shadow-md hover:border-cyan-200"
					>
						<button
							onClick={() => handleDelete(item.id)}
							className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 transition-colors hover:text-red-500 hover:bg-red-50 rounded-lg p-1"
						>
							<X className="h-4 w-4" />
						</button>

						<div className="mb-4">
							<h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{item.language}</h4>
							{item.fluency && (
								<p className="text-xs font-semibold text-cyan-600 uppercase tracking-wide mt-1">
									{item.fluency}
								</p>
							)}
						</div>

						<div className="mt-2">
							<div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
								<span>Level</span>
								<span className="text-cyan-600">
									{item.level} · {levelLabels[item.level] || "Unknown"}
								</span>
							</div>
							<Slider
								min={0}
								max={5}
								value={[item.level]}
								onValueChange={(val) => handleLevelChange(item.id, val[0])}
								className="[&>span:first-child]:bg-cyan-100 [&_[data-slot=slider-range]]:bg-cyan-500 [&_[data-slot=slider-thumb]]:border-cyan-500 [&_[data-slot=slider-thumb]]:h-5 [&_[data-slot=slider-thumb]]:w-5"
							/>
						</div>
					</div>
				))}

				{/* Add Language Card */}
				<div className="flex items-stretch">
					<SectionAddItemButton
						type="languages"
						className="mt-0 w-full h-full rounded-2xl border-2 border-dashed border-cyan-300 bg-cyan-50/30 p-2 text-sm font-semibold text-cyan-600 transition-all hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-md flex items-center justify-center gap-2 cursor-pointer group [&>svg:first-child]:hidden"
					>
						<Plus className="h-3.5 w-3.5 stroke-[2.5]" />
						<span>Add Language</span>
					</SectionAddItemButton>
				</div>
			</div>
		</SectionBase>
	);
}