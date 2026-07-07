import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { SealCheck } from "@phosphor-icons/react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { RichInput } from "@/components/input/rich-input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";

export function CertificationsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.certifications);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleAdd = () => {
		updateResumeData((draft) => {
			draft.sections.certifications.items.push({
				id: crypto.randomUUID(),
				hidden: false,
				title: "",
				issuer: "",
				date: "",
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
			const index = draft.sections.certifications.items.findIndex((i) => i.id === id);
			if (index !== -1) draft.sections.certifications.items.splice(index, 1);
		});
	};

	const handleChange = (id: string, field: string, value: any) => {
		updateResumeData((draft) => {
			const item = draft.sections.certifications.items.find((i) => i.id === id);
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

	const inputCls = "rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-2.5 h-auto text-sm shadow-sm focus:border-emerald-300 focus:ring-1 focus:ring-emerald-200 w-full";

	return (
		<SectionBase type="certifications">
			<div className="flex flex-col gap-4 px-0 py-4 sm:p-4">
				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex items-start gap-2 sm:gap-4 rounded-none sm:rounded-3xl border-y sm:border border-gray-100 dark:border-border bg-gray-50/50 dark:bg-card p-4 sm:p-5"
						style={{ borderLeft: "4px solid #10b981" }}
					>
						{/* Left Icon - Desktop Only */}
						<div className="hidden md:flex flex-shrink-0 mt-1 h-10 w-10 items-center justify-center rounded-full bg-emerald-200/50 dark:bg-emerald-900/30">
							<SealCheck
								weight="fill"
								className="h-6 w-6 text-emerald-500"
							/>
						</div>

						{/* Fields Container */}
						<div className="flex flex-1 flex-col gap-3 min-w-0">
							{/* Row 1: Certification Title */}
							<div>
								<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<Trans>Title</Trans>
								</label>
								<Input
									placeholder="e.g. Certified Scrum Master"
									value={item.title}
									onChange={(e) => handleChange(item.id, "title", e.target.value)}
									className={inputCls}
								/>
							</div>

							{/* Row 2: Issuer + Date */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div>
									<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										<Trans>Issuer</Trans>
									</label>
									<Input
										placeholder="e.g. Google"
										value={item.issuer}
										onChange={(e) => handleChange(item.id, "issuer", e.target.value)}
										className={inputCls}
									/>
								</div>
								<div>
									<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
										<Trans>Date</Trans>
									</label>
									<Input
										type="month"
										value={item.date || ""}
										onChange={(e) => handleChange(item.id, "date", e.target.value)}
										className={inputCls}
									/>
								</div>
							</div>

							{/* Row 3: Website */}
							<div>
								<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<Trans>Website</Trans>
								</label>
								<Input
									placeholder="e.g. https://www.credential.net/12345"
									value={item.website?.url || ""}
									onChange={(e) => handleChange(item.id, "website.url", e.target.value)}
									className={inputCls}
								/>
							</div>

							{/* Show link in title toggle */}
							<div className="flex items-center justify-between sm:justify-start gap-2 pl-0.5 mt-1 sm:mt-0 w-full">
								<span className="text-sm text-gray-600 dark:text-gray-400 font-medium order-1 sm:order-2">
									<Trans>Show link in title</Trans>
								</span>
								<Switch
									className="order-2 sm:order-1"
									checked={item.options?.showLinkInTitle || false}
									onCheckedChange={(val) => handleChange(item.id, "options.showLinkInTitle", val)}
								/>
							</div>

							{/* Description */}
							<div>
								<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
									<Trans>Description</Trans>
								</label>
								<RichInput
									value={item.description || ""}
									onChange={(val) => handleChange(item.id, "description", val)}
									className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card min-h-[120px]"
								/>
							</div>
						</div>

						{/* X button */}
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
							aria-label="Remove certification"
						>
							<X className="h-4 w-4" strokeWidth={2} />
						</button>
					</div>
				))}

				{/* Add Certification button */}
				<button
					type="button"
					onClick={handleAdd}
					className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-700/50 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-400 transition-all hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:shadow-sm"
				>
					<Plus className="h-4 w-4 transition-transform group-hover:scale-125" strokeWidth={2} />
					<Trans>Add certification</Trans>
				</button>
			</div>
		</SectionBase>
	);
}