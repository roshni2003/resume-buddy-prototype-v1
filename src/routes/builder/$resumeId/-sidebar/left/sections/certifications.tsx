import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { SealCheck } from "@phosphor-icons/react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { RichInput } from "@/components/input/rich-input";
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
				website: { url: "", label: "" },
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
					(item as any)[parent][child] = value;
				} else {
					(item as any)[field] = value;
				}
			}
		});
	};

	const inputCls = "rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card px-3 py-2.5 h-11 text-sm shadow-sm focus:border-green-300 focus:ring-1 focus:ring-green-200 w-full";

	return (
		<SectionBase type="certifications" className="border-0 bg-transparent">
			<div className="flex flex-col gap-4 p-2 sm:p-4">
				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex items-start gap-4 rounded-3xl border border-gray-100 dark:border-border bg-gray-50/50 p-4"
					>
						{/* Left Icon */}
						<div className="flex-shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-green-200/50">
							<SealCheck weight="fill" className="h-6 w-6 text-green-400" />
						</div>

						{/* Fields Container */}
						<div className="flex flex-1 flex-col gap-3 min-w-0">
							{/* Top Row: Certification, Issuer, Year */}
							<div className="flex flex-col sm:flex-row gap-3">
								<Input
									placeholder="Certification"
									value={item.title}
									onChange={(e) => handleChange(item.id, "title", e.target.value)}
									className={inputCls}
								/>
								<Input
									placeholder="Issuer"
									value={item.issuer}
									onChange={(e) => handleChange(item.id, "issuer", e.target.value)}
									className={inputCls}
								/>
								<Input
									placeholder="Year"
									value={item.date}
									onChange={(e) => handleChange(item.id, "date", e.target.value)}
									className={inputCls}
								/>
							</div>

							{/* Additional fields kept as per user request */}
							<Input
								placeholder="Website URL"
								value={item.website?.url}
								onChange={(e) => handleChange(item.id, "website.url", e.target.value)}
								className={inputCls}
							/>

							<RichInput
								value={item.description}
								onChange={(val) => handleChange(item.id, "description", val)}
								className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card"
							/>
						</div>

						{/* Right X button */}
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className="flex-shrink-0 mt-3 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
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
					className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-300 dark:border-emerald-700/50 bg-emerald-50/50 dark:bg-emerald-900/20 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-400 transition-all duration-150 hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:shadow-sm"
				>
					<Plus className="h-4 w-4" strokeWidth={2} />
					<Trans>Add certification</Trans>
				</button>
			</div>
		</SectionBase>
	);
}
