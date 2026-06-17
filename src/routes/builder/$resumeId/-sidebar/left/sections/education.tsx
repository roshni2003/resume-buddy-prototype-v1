import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { RichInput } from "@/components/input/rich-input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";

export function EducationSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.education);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleAdd = () => {
		updateResumeData((draft) => {
			draft.sections.education.items.push({
				id: crypto.randomUUID(),
				hidden: false,
				educationType: "College",
				school: "",
				degree: "",
				area: "",
				grade: "",
				location: "",
				period: "",
				description: "",
				currentlyStudyingHere: false,
				website: { url: "", label: "" },
			});
		});
	};

	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			const index = draft.sections.education.items.findIndex((i) => i.id === id);
			if (index !== -1) draft.sections.education.items.splice(index, 1);
		});
	};

	const handleChange = (id: string, field: string, value: any) => {
		updateResumeData((draft) => {
			const item = draft.sections.education.items.find((i) => i.id === id);
			if (item) {
				if (field.includes(".")) {
					const [parent, child] = field.split(".");
					(item as any)[parent][child] = value;
				} else {
					(item as any)[field] = value;
				}
			}
		});
	};

	const inputCls = "rounded-xl border border-gray-200 bg-white px-3 py-2.5 h-auto text-sm shadow-sm focus:border-emerald-300 focus:ring-1 focus:ring-emerald-200";

	return (
		<SectionBase type="education">
			<div className="flex flex-col gap-4 p-4">

				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
						style={{ borderLeft: "4px solid #10b981" }}
					>
						{/* Timeline dot — vertically aligned to first input row */}
						<div className="mt-2 flex-shrink-0 h-3.5 w-3.5 rounded-full border-[3px] border-emerald-100 bg-emerald-500" />

						{/* All fields */}
						<div className="flex flex-1 flex-col gap-3 min-w-0">
							{/* Row 1: Institution + Degree */}
							<div className="flex rounded-lg bg-gray-100 p-1 w-max">
								<button
									type="button"
									onClick={() => handleChange(item.id, "educationType", "School")}
									className={cn("px-4 py-1.5 rounded-md text-xs font-semibold transition-all", item.educationType === "School" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
								>
									School
								</button>
								<button
									type="button"
									onClick={() => handleChange(item.id, "educationType", "College")}
									className={cn("px-4 py-1.5 rounded-md text-xs font-semibold transition-all", (!item.educationType || item.educationType === "College") ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
								>
									College/University
								</button>
							</div>

							{/* Row 2: Period + Grade */}
							{item.educationType === "School" ? (
								<>
									<div className="grid grid-cols-2 gap-3">
										<Input
											placeholder="School Name"
											value={item.school}
											onChange={(e) => handleChange(item.id, "school", e.target.value)}
											className={inputCls}
										/>
										<Input
											placeholder="Board"
											value={item.degree}
											onChange={(e) => handleChange(item.id, "degree", e.target.value)}
											className={inputCls}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<Input
											placeholder="Passing Year"
											value={item.period}
											onChange={(e) => handleChange(item.id, "period", e.target.value)}
											className={inputCls}
										/>
										<Input
											placeholder="Percentage / CGPA"
											value={item.grade}
											onChange={(e) => handleChange(item.id, "grade", e.target.value)}
											className={inputCls}
										/>
									</div>
								</>
							) : (
								<>
									<div className="grid grid-cols-2 gap-3">
										<Input
											placeholder="Institution Name"
											value={item.school}
											onChange={(e) => handleChange(item.id, "school", e.target.value)}
											className={inputCls}
										/>
										<Input
											placeholder="Degree"
											value={item.degree}
											onChange={(e) => handleChange(item.id, "degree", e.target.value)}
											className={inputCls}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<Input
											placeholder="Specialization"
											value={item.area}
											onChange={(e) => handleChange(item.id, "area", e.target.value)}
											className={inputCls}
										/>
										<Input
											placeholder="CGPA / Percentage"
											value={item.grade}
											onChange={(e) => handleChange(item.id, "grade", e.target.value)}
											className={inputCls}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<Input
											placeholder="Graduation Year"
											value={item.period}
											onChange={(e) => handleChange(item.id, "period", e.target.value)}
											className={inputCls}
										/>
										<Input
											placeholder="Location"
											value={item.location}
											onChange={(e) => handleChange(item.id, "location", e.target.value)}
											className={inputCls}
										/>
									</div>
								</>
							)}


							{/* Row 3: Area + Location */}
							{/* <div className="grid grid-cols-2 gap-3">
								<Input
									placeholder="Area of Study"
									value={item.area}
									onChange={(e) => handleChange(item.id, "area", e.target.value)}
									className={inputCls}
								/>
								<Input
									placeholder="Location"
									value={item.location}
									onChange={(e) => handleChange(item.id, "location", e.target.value)}
									className={inputCls}
								/>
							</div> */}

							{/* Row 4: Website full width */}
							<Input
								placeholder="Website URL"
								value={item.website?.url}
								onChange={(e) => handleChange(item.id, "website.url", e.target.value)}
								className={inputCls}
							/>

							{/* Currently studying toggle */}
							<div className="flex items-center gap-2 pl-0.5">
								<Switch
									checked={item.currentlyStudyingHere}
									onCheckedChange={(val) => handleChange(item.id, "currentlyStudyingHere", val)}
								/>
								<span className="text-sm text-gray-600 font-medium">Currently studying here</span>
							</div>

							{/* Description */}
							<RichInput
								value={item.description}
								onChange={(val) => handleChange(item.id, "description", val)}
								className="rounded-xl border border-gray-200 bg-white"
							/>
						</div>

						{/* X button — top-right, flex sibling so it never overlaps inputs */}
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className="flex-shrink-0 mt-0.5 text-gray-400 hover:text-gray-700 transition-colors"
							aria-label="Remove education entry"
						>
							<X className="h-4 w-4" strokeWidth={2} />
						</button>
					</div>
				))}

				{/* Add button — emerald theme, no blue border */}
				<button
					type="button"
					onClick={handleAdd}
					className="mt-0 h-auto w-auto rounded-full border border-dashed border-emerald-300 bg-emerald-50/50 px-4 py-1.5 text-sm font-medium text-emerald-500 transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-sm [&>svg:first-child]:hidden"
				>
					<Plus className="h-4 w-4" strokeWidth={1.5} />
					<Trans>Add education</Trans>
				</button>

			</div>
		</SectionBase>
	);
}