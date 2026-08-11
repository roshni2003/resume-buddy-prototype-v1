import { X, Plus } from "lucide-react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";

const levelLabels: Record<number, string> = {
	0: "Hidden",
	1: "Beginner",
	2: "Intermediate",
	3: "Proficient",
	4: "Advanced",
	5: "Expert",
};

export function SkillsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.skills);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			const index = draft.sections.skills.items.findIndex((item) => item.id === id);
			if (index !== -1) draft.sections.skills.items.splice(index, 1);
		});
	};

	const handleLevelChange = (id: string, newLevel: number) => {
		updateResumeData((draft) => {
			const item = draft.sections.skills.items.find((item) => item.id === id);
			if (item) {
				item.level = newLevel;
				item.proficiency = newLevel === 0 ? "" : (levelLabels[newLevel] || "");
			}
		});
	};

	return (
		<SectionBase type="skills" className={cn("border-0 bg-transparent p-4 sm:p-6")}>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex flex-col justify-between rounded-2xl bg-white/80 dark:bg-card/80 backdrop-blur-sm p-5 shadow-sm border border-gray-200 dark:border-border transition-all hover:shadow-md hover:border-teal-200"
					>
						<button
							onClick={() => handleDelete(item.id)}
							className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 transition-colors hover:text-red-500 hover:bg-red-50 rounded-lg p-1"
						>
							<X className="h-4 w-4" />
						</button>

						<div className="flex items-center gap-3 mb-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-200 bg-teal-50 text-sm font-bold text-teal-600">
								{item.level}
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{item.name}</h4>
								<p className="text-xs text-teal-600 font-medium mt-0.5">
									{levelLabels[item.level] || "Not rated"}
								</p>
							</div>
						</div>

						<div className="mt-2">
							<div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
								<span>Level</span>
								<span className="text-teal-600">
									{item.level} · {levelLabels[item.level] || "Unknown"}
								</span>
							</div>
							<Slider
								min={0}
								max={5}
								value={[item.level]}
								onValueChange={(val) => handleLevelChange(item.id, val[0])}
								className="[&>span:first-child]:bg-teal-100 [&_[data-slot=slider-range]]:bg-teal-500 [&_[data-slot=slider-thumb]]:border-teal-500 [&_[data-slot=slider-thumb]]:h-5 [&_[data-slot=slider-thumb]]:w-5"
							/>
						</div>
					</div>
				))}

				{/* Add Skill Card */}
				<div className="flex items-stretch">
					<SectionAddItemButton
						type="skills"
						className="mt-0 w-full h-full rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50/30 p-2 text-sm font-semibold text-teal-600 transition-all hover:border-teal-400 hover:bg-teal-50 hover:shadow-md flex items-center justify-center gap-2 cursor-pointer group [&>svg:first-child]:hidden"
					>
						<Plus className="h-3.5 w-3.5 stroke-[2.5]" />
						<span>Add Skill</span>
					</SectionAddItemButton>
				</div>
			</div>
		</SectionBase>
	);
}