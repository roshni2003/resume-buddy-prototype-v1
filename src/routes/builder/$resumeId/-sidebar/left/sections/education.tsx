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
				college: "College",
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
				website: {
					url: "",
					label: "",
				},
				options: {
					showLinkInTitle: false,
				},
				schoolName_school: "",
				board_school: "",
				percentage_school: "",
				collegeName_college: "",
				degree_college: "",
				specialization_college: "",
				cgpa_college: "",
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
			const item = draft.sections.education.items.find((i) => i.id === id) as any;
			if (item) {
				if (field.includes(".")) {
					const [parent, child] = field.split(".");
					item[parent][child] = value;
				} else {
					item[field] = value;
				}

				// Sync to real fields so PDF renders correctly instantly
				const mode = field === "college" ? value : item.college;
				if (mode === "School") {
					item.school = item.schoolName_school || "";
					item.degree = item.board_school || "";
					item.grade = item.percentage_school || "";
					item.area = "";
				} else {
					item.school = item.collegeName_college || "";
					item.degree = item.degree_college || "";
					item.area = item.specialization_college || "";
					item.grade = item.cgpa_college || "";
				}
			}
		});
	};

	const inputCls = "rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-2.5 h-auto text-sm shadow-sm focus:border-emerald-300 focus:ring-1 focus:ring-emerald-200";

	// Helper function to show dates correctly formatted
	const formatDate = (dateString: string | undefined): string => {
		if (!dateString) return "";
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

	return (
		<SectionBase type="education">
			<div className="flex flex-col gap-4 px-0 py-4 sm:p-4">

				{section.items.map((item) => {
					// Calculate date range display for the toggle
					const isSchool = item.college === "School";
					const startForToggle = item.startDate;
					const endForToggle = item.endDate;
					const currentlyStudyingForToggle = item.currentlyStudyingHere;

					const dateRange = [
						formatDate(startForToggle),
						currentlyStudyingForToggle
							? "Present"
							: endForToggle
								? formatDate(endForToggle)
								: "",
					]
						.filter(Boolean)
						.join(" – ");

					return (
						<div
							key={item.id}
							className="relative flex items-start gap-2 sm:gap-3 rounded-none sm:rounded-2xl border-y sm:border border-gray-100 dark:border-border bg-gray-50 dark:bg-card p-4 sm:p-5"
							style={{ borderLeft: "4px solid #10b981" }}
						>
							{/* Timeline dot */}
							{/* <div className="mt-2 flex-shrink-0 h-3.5 w-3.5 rounded-full border-[3px] border-emerald-100 bg-emerald-500" /> */}

							{/* All fields */}
							<div className="flex flex-1 flex-col gap-3 min-w-0">
								{/* Education Type Toggle */}
								<div className="flex w-full sm:w-max rounded-lg bg-gray-100 dark:bg-muted p-1">
									<button
										type="button"
										onClick={() => handleChange(item.id, "college", "School")}
										className={cn(
											"flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
											item.college === "School"
												? "bg-white dark:bg-card text-emerald-600 dark:text-emerald-400 shadow-sm"
												: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
										)}
									>
										School
									</button>
									<button
										type="button"
										onClick={() => handleChange(item.id, "college", "College")}
										className={cn(
											"flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
											(!item.college || item.college === "College")
												? "bg-white dark:bg-card text-emerald-600 dark:text-emerald-400 shadow-sm"
												: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
										)}
									>
										College
									</button>
								</div>

								{/* School Fields */}
								{item.college === "School" ? (
									<>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>School Name</Trans>
												</label>
												<Input
													placeholder="e.g. Delhi Public School"
													value={(item as any).schoolName_school || ""}
													onChange={(e) => handleChange(item.id, "schoolName_school", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>Board</Trans>
												</label>
												<Input
													placeholder="e.g. CBSE, ICSE"
													value={(item as any).board_school || ""}
													onChange={(e) => handleChange(item.id, "board_school", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>Start Date</Trans>
												</label>
												<Input
													type="date"
													value={item.startDate ?? ""}
													onChange={(e) => handleChange(item.id, "startDate", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>End Date</Trans>
												</label>
												<Input
													type="date"
													value={item.endDate ?? ""}
													onChange={(e) => handleChange(item.id, "endDate", e.target.value)}
													disabled={item.currentlyStudyingHere ?? false}
													className={cn(inputCls, item.currentlyStudyingHere && "opacity-40")}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>Percentage / CGPA</Trans>
												</label>
												<Input
													placeholder="e.g. 85%, 9.2 CGPA"
													value={(item as any).percentage_school || ""}
													onChange={(e) => handleChange(item.id, "percentage_school", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
									</>
								) : (
									/* College Fields */
									<>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>Institution Name</Trans>
												</label>
												<Input
													placeholder="e.g. Stanford University"
													value={(item as any).collegeName_college || ""}
													onChange={(e) => handleChange(item.id, "collegeName_college", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>Degree</Trans>
												</label>
												<Input
													placeholder="e.g. B.Sc. Computer Science"
													value={(item as any).degree_college || ""}
													onChange={(e) => handleChange(item.id, "degree_college", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>Specialization</Trans>
												</label>
												<Input
													placeholder="e.g. Artificial Intelligence"
													value={(item as any).specialization_college || ""}
													onChange={(e) => handleChange(item.id, "specialization_college", e.target.value)}
													className={inputCls}
												/>
											</div>
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
													<Trans>CGPA / Percentage</Trans>
												</label>
												<Input
													placeholder="e.g. 3.8"
													value={(item as any).cgpa_college || ""}
													onChange={(e) => handleChange(item.id, "cgpa_college", e.target.value)}
													className={inputCls}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
											<div>
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
												<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
								<div className="flex items-center justify-between sm:justify-start gap-2 pl-0.5 mt-1 sm:mt-0 w-full">
									<span className="text-sm text-gray-600 dark:text-gray-400 font-medium order-1 sm:order-2">
										<Trans>Currently studying here</Trans>
									</span>
									<Switch
										className="order-2 sm:order-1"
										checked={item.currentlyStudyingHere || false}
										onCheckedChange={(val) => {
											handleChange(item.id, "currentlyStudyingHere", val);
											if (val) {
												handleChange(item.id, "endDate", "");
											}
										}}
									/>
									{dateRange && (
										<span className="hidden sm:inline-block ml-2 text-xs text-gray-400 dark:text-gray-500 order-3">{dateRange}</span>
									)}
								</div>

								{/* Description */}
								<div>
									<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										<Trans>Description</Trans>
									</label>
									<RichInput
										value={item.description || ""}
										onChange={(val) => handleChange(item.id, "description", val)}
										className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-muted/50 min-h-[120px]"
									/>
								</div>
							</div>

							{/* X button */}
							<button
								type="button"
								onClick={() => handleDelete(item.id)}
								className="flex-shrink-0 mt-0.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
								aria-label="Remove education entry"
							>
								<X className="h-4 w-4" strokeWidth={2} />
							</button>
						</div>
					);
				})}

				{/* Add button */}
				<button
					type="button"
					onClick={handleAdd}
					className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 dark:border-border py-2 text-sm font-medium text-gray-400 dark:text-gray-500 transition-all hover:border-emerald-300 dark:hover:border-emerald-600/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
				>
					<Plus className="h-4 w-4 transition-transform group-hover:scale-125" strokeWidth={2} />
					<Trans>Add education</Trans>
				</button>

			</div>
		</SectionBase>
	);
}