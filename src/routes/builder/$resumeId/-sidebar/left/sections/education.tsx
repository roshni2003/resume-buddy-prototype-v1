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
				startDate: "",
				endDate: "",
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

	const inputCls = "rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-2.5 h-auto text-sm shadow-sm focus:border-emerald-300 focus:ring-1 focus:ring-emerald-200";

	// Helper function to format date
	const formatDate = (dateString: string | undefined): string => {
		if (!dateString) return "";
		try {
			const d = new Date(dateString);
			return d.toLocaleString("en-US", { month: "short", year: "numeric" });
		} catch {
			return dateString;
		}
	};

	return (
		<SectionBase type="education">
			<div className="flex flex-col gap-4 p-4">

				{section.items.map((item) => {
					// Calculate date range display
					const dateRange = [
						formatDate(item.startDate),
						item.currentlyStudyingHere
							? "Present"
							: item.endDate
								? formatDate(item.endDate)
								: "",
					]
						.filter(Boolean)
						.join(" – ");

					return (
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
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>School Name</Trans>
												</label>
												<Input
													placeholder="e.g. Delhi Public School"
													value={item.school}
													onChange={(e) => handleChange(item.id, "school", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Board</Trans>
												</label>
												<Input
													placeholder="e.g. CBSE, ICSE"
													value={item.degree}
													onChange={(e) => handleChange(item.id, "degree", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Passing Year</Trans>
												</label>
												<Input
													type="date"
													placeholder="Passing Year"
													value={item.period}
													onChange={(e) => handleChange(item.id, "period", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Percentage / CGPA</Trans>
												</label>
												<Input
													placeholder="e.g. 85%, 9.2 CGPA"
													value={item.grade}
													onChange={(e) => handleChange(item.id, "grade", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
									</>
								) : (
									<>
										<div className="grid grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Institution Name</Trans>
												</label>
												<Input
													placeholder="e.g. Stanford University"
													value={item.school}
													onChange={(e) => handleChange(item.id, "school", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Degree</Trans>
												</label>
												<Input
													placeholder="e.g. B.Sc. Computer Science"
													value={item.degree}
													onChange={(e) => handleChange(item.id, "degree", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Specialization</Trans>
												</label>
												<Input
													placeholder="e.g. Artificial Intelligence"
													value={item.area}
													onChange={(e) => handleChange(item.id, "area", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>CGPA / Percentage</Trans>
												</label>
												<Input
													placeholder="e.g. 3.8/4.0, 92%"
													value={item.grade}
													onChange={(e) => handleChange(item.id, "grade", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
										<div className="grid grid-cols-3 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Start Date</Trans>
												</label>
												<Input
													type="date"
													value={item.startDate || ""}
													onChange={(e) => handleChange(item.id, "startDate", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>End Date</Trans>
												</label>
												<Input
													type="date"
													value={item.endDate || ""}
													onChange={(e) => handleChange(item.id, "endDate", e.target.value)}
													disabled={item.currentlyStudyingHere}
													className={cn(inputCls, item.currentlyStudyingHere && "opacity-40")}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
													<Trans>Location</Trans>
												</label>
												<Input
													placeholder="e.g. San Francisco, CA"
													value={item.location}
													onChange={(e) => handleChange(item.id, "location", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
									</>
								)}

								{/* Currently studying toggle */}
								<div className="flex items-center gap-2 pl-0.5">
									<Switch
										checked={item.currentlyStudyingHere}
										onCheckedChange={(val) => handleChange(item.id, "currentlyStudyingHere", val)}
									/>
									<span className="text-sm text-gray-600 font-medium">
										<Trans>Currently studying here</Trans>
									</span>
									{dateRange && (
										<span className="ml-2 text-xs text-gray-400">{dateRange}</span>
									)}
								</div>

								{/* Description */}
								<div>
									<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
										<Trans>Description</Trans>
									</label>
									<RichInput
										value={item.description}
										onChange={(val) => handleChange(item.id, "description", val)}
										className="rounded-xl border border-gray-200 bg-white"
										placeholder="Describe your academic achievements, relevant coursework, or extracurricular activities..."
									/>
								</div>
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
					);
				})}

				{/* Add button — fixed with proper icon */}
				<button
					type="button"
					onClick={handleAdd}
					className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-2 text-sm font-medium text-gray-400 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
				>
					<Plus className="h-4 w-4 transition-transform group-hover:scale-125" strokeWidth={2} />
					<Trans>Add education</Trans>
				</button>

			</div>
		</SectionBase>
	);
}