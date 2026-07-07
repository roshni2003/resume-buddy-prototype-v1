import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { Heart } from "@phosphor-icons/react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { RichInput } from "@/components/input/rich-input";
import { Switch } from "@/components/ui/switch";
import { SectionBase } from "../shared/section-base";

export function VolunteerSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.volunteer);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleAdd = () => {
		updateResumeData((draft) => {
			draft.sections.volunteer.items.push({
				id: crypto.randomUUID(),
				hidden: false,
				organization: "",
				location: "",
				period: "",
				description: "",
				website: {
					url: "",
					label: ""
				},
				options: {
					showLinkInTitle: false,
				},
			});
		});
	};

	const handleDelete = (id: string) => {
		updateResumeData((draft) => {
			const index = draft.sections.volunteer.items.findIndex((i) => i.id === id);
			if (index !== -1) draft.sections.volunteer.items.splice(index, 1);
		});
	};

	const handleChange = (id: string, field: string, value: any) => {
		updateResumeData((draft) => {
			const item = draft.sections.volunteer.items.find((i) => i.id === id);
			if (item) {
				if (field.includes(".")) {
					const [parent, child] = field.split(".");
					if (!(item as any)[parent]) {
						(item as any)[parent] = {};
					}
					(item as any)[parent][child] = value;
				} else {
					(item as any)[field] = value;
				}
			}
		});
	};

	const inputCls = "rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-2.5 h-auto text-sm shadow-sm focus:border-rose-300 focus:ring-1 focus:ring-rose-200";

	return (
		<SectionBase type="volunteer">
			<div className="flex flex-col gap-4 p-4">

				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-border bg-gray-50 dark:bg-muted/50 p-4"
						style={{ borderLeft: "4px solid #f87171" }}
					>
						{/* Heart icon — vertically centred to the first row of inputs */}
						<div className="mt-2 flex-shrink-0">
							<Heart
								weight="fill"
								className="h-5 w-5 text-rose-400"
							/>
						</div>

						{/* Fields */}
						<div className="flex flex-1 flex-col gap-3 min-w-0">
							{/* Row 1: Organization + Location */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div>
									<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
										<Trans>Organization</Trans>
									</label>
									<Input
										placeholder="e.g. Red Cross"
										value={item.organization}
										onChange={(e) => handleChange(item.id, "organization", e.target.value)}
										className={inputCls}
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

							{/* Row 2: Period */}
							<div>
								<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
									<Trans>Period</Trans>
								</label>
								<Input
									placeholder="e.g. 3 months, 2 years, Jan 2024 - Present"
									value={item.period}
									onChange={(e) => handleChange(item.id, "period", e.target.value)}
									className={inputCls}
								/>
							</div>

							{/* Website URL */}
							<div>
								<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
									<Trans>Website</Trans>
								</label>
								<Input
									placeholder="e.g. https://redcross.org"
									value={item.website?.url || ""}
									onChange={(e) => handleChange(item.id, "website.url", e.target.value)}
									className={inputCls}
								/>
							</div>

							{/* Show link in title toggle */}
							<div className="flex items-center gap-2 pl-0.5">
								<Switch
									checked={item.options?.showLinkInTitle || false}
									onCheckedChange={(val) => handleChange(item.id, "options.showLinkInTitle", val)}
								/>
								<span className="text-sm text-gray-600 font-medium">
									<Trans>Show link in title</Trans>
								</span>
							</div>

							{/* Description rich input */}
							<div>
								<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
									<Trans>Description</Trans>
								</label>
								<RichInput
									value={item.description || ""}
									onChange={(val) => handleChange(item.id, "description", val)}
									className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card min-h-[120px]"
								/>
							</div>
						</div>

						{/* X button — top-right corner of the card */}
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className="flex-shrink-0 mt-0.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							aria-label="Remove volunteer entry"
						>
							<X className="h-4 w-4" strokeWidth={2} />
						</button>
					</div>
				))}

				{/* Add button — coral border to match the theme */}
				<button
					type="button"
					onClick={handleAdd}
					className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-800/50 py-2 text-sm font-medium text-rose-500 dark:text-rose-400 transition-all hover:border-rose-400 dark:hover:border-rose-700/50 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:shadow-sm"
				>
					<Plus className="h-4 w-4 transition-transform group-hover:scale-125" strokeWidth={2} />
					<Trans>Add volunteer work</Trans>
				</button>
			</div>
		</SectionBase>
	);
}