import { Trans } from "@lingui/react/macro";
import { Plus, X } from "lucide-react";
import { Heart } from "@phosphor-icons/react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { RichInput } from "@/components/input/rich-input";
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
				website: { url: "", label: "" },
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
					(item as any)[parent][child] = value;
				} else {
					(item as any)[field] = value;
				}
			}
		});
	};

	return (
		<SectionBase type="volunteer">
			<div className="flex flex-col gap-4 p-4">

				{section.items.map((item) => (
					<div
						key={item.id}
						className="relative flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
						style={{ borderLeft: "4px solid #f87171" }}
					>
						{/* Heart icon — vertically centred to the first row of inputs */}
						<div className="mt-1 flex-shrink-0">
							<Heart
								weight="fill"
								className="h-5 w-5 text-rose-400"
							/>
						</div>

						{/* Fields */}
						<div className="flex flex-1 flex-col gap-3 min-w-0">
							{/* Row 1: Organization + Role */}
							<div className="grid grid-cols-2 gap-3">
								<Input
									placeholder="Organization"
									value={item.organization}
									onChange={(e) => handleChange(item.id, "organization", e.target.value)}
									className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm h-auto shadow-sm"
								/>
								<Input
									placeholder="Role"
									value={item.location}
									onChange={(e) => handleChange(item.id, "location", e.target.value)}
									className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm h-auto shadow-sm"
								/>
							</div>

							{/* Row 2: Dates + Cause */}
							<div className="grid grid-cols-2 gap-3">
								<Input
									placeholder="Dates"
									value={item.period}
									onChange={(e) => handleChange(item.id, "period", e.target.value)}
									className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm h-auto shadow-sm"
								/>
								<Input
									placeholder="Cause"
									value={item.website?.url}
									onChange={(e) => handleChange(item.id, "website.url", e.target.value)}
									className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm h-auto shadow-sm"
								/>
							</div>

							{/* Description rich input */}
							<RichInput
								value={item.description}
								onChange={(val) => handleChange(item.id, "description", val)}
								className="rounded-xl border border-gray-200 bg-white"
							/>
						</div>

						{/* X button — top-right corner of the card */}
						<button
							type="button"
							onClick={() => handleDelete(item.id)}
							className="flex-shrink-0 mt-0.5 text-gray-400 hover:text-gray-700 transition-colors"
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
					className="
						mt-2 flex w-full items-center justify-center gap-2
						rounded-2xl border-2 border-rose-300 bg-white
						py-4 text-sm font-semibold text-rose-400
						transition-all duration-150
						hover:border-rose-400 hover:bg-rose-50 hover:text-rose-500
						active:scale-[0.99]
					"
				>
					<Plus className="h-4 w-4" strokeWidth={2.5} />
					<Trans>Add volunteer work</Trans>
				</button>

			</div>
		</SectionBase>
	);
}