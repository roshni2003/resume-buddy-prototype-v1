import { Plural, Trans } from "@lingui/react/macro";
import {
	ColumnsIcon,
	CopySimpleIcon,
	DotsThreeVerticalIcon,
	EyeClosedIcon,
	EyeIcon,
	PencilSimpleLineIcon,
	TrashSimpleIcon,
	X as XIcon,
	Plus as PlusIcon,
	Sparkle,
	Article,
	Briefcase,
	GraduationCap,
	Certificate
} from "@phosphor-icons/react";
import { AnimatePresence, Reorder } from "motion/react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { RichInput } from "@/components/input/rich-input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/dialogs/store";
import { useConfirm } from "@/hooks/use-confirm";
import type {
	CustomSection,
	CustomSectionItem as CustomSectionItemType,
} from "@/schema/resume/data";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";
import { SectionAddItemButton } from "../shared/section-item";

export function CustomSectionBuilder() {
	const customSections = useResumeStore((state) => state.resume.data.customSections);

	return (
		<SectionBase type="custom" className={cn("space-y-4", customSections.length === 0 && "border-dashed")}>
			<AnimatePresence>
				{customSections.map((section) => (
					<CustomSectionContainer key={section.id} section={section} />
				))}
			</AnimatePresence>

			{customSections.length === 0 && (
				<div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-emerald-200 py-12 text-center text-emerald-500">
					<Sparkle className="h-6 w-6" weight="fill" />
					<p className="font-medium text-gray-700 text-sm">
						<Trans>No custom blocks yet — design one your way.</Trans>
					</p>
				</div>
			)}

			{/* Add Custom Section Button */}
			<SectionAddItemButton type="custom" variant="outline" className="rounded-full border-dashed border-emerald-200 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600">
				<Trans>Add a new custom section</Trans>
			</SectionAddItemButton>
		</SectionBase>
	);
}

function CustomSectionContainer({ section }: { section: CustomSection }) {
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const onUpdateSection = () => {
		openDialog("resume.sections.custom.update", section);
	};

	const handleReorder = (items: CustomSectionItemType[]) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].items = items;
		});
	};

	const handleChange = (itemId: string, field: string, value: any) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((s) => s.id === section.id);
			if (sectionIndex === -1) return;
			const item = draft.customSections[sectionIndex].items.find((i) => i.id === itemId);
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

	const handleDelete = (itemId: string) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((s) => s.id === section.id);
			if (sectionIndex === -1) return;
			const itemIndex = draft.customSections[sectionIndex].items.findIndex((i) => i.id === itemId);
			if (itemIndex !== -1) draft.customSections[sectionIndex].items.splice(itemIndex, 1);
		});
	};

	const handleAdd = () => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((s) => s.id === section.id);
			if (sectionIndex === -1) return;

			const id = crypto.randomUUID();
			let newItem: any = { id, hidden: false, visible: true };

			if (section.type === "summary") {
				newItem = { ...newItem, name: "", content: "" };
			} else if (section.type === "experience") {
				newItem = { ...newItem, company: "", position: "", location: "", date: "", summary: "", url: "" };
			} else if (section.type === "education") {
				newItem = { ...newItem, institution: "", studyType: "", area: "", score: "", date: "", summary: "", url: "" };
			} else if (section.type === "certifications") {
				newItem = { ...newItem, title: "", issuer: "", date: "", website: { url: "", label: "" }, description: "" };
			} else {
				// Default generic fallback
				newItem = { ...newItem, name: "", description: "" };
			}

			draft.customSections[sectionIndex].items.push(newItem);
		});
	};

	const inputCls = "rounded-xl border border-gray-200 bg-white px-3 py-2.5 h-11 text-sm shadow-sm focus:border-teal-300 focus:ring-1 focus:ring-teal-200 w-full";

	const getIcon = () => {
		switch (section.type) {
			case "summary": return Article;
			case "experience": return Briefcase;
			case "education": return GraduationCap;
			case "certifications": return Certificate;
			default: return PencilSimpleLineIcon;
		}
	};
	const Icon = getIcon();

	const getPlaceholder = (key: string) => {
		if (key === "date") return "Jan 2023 - Present";
		if (key === "name") return "Section title — e.g. Languages, Publications, Hobbies";
		return key.charAt(0).toUpperCase() + key.slice(1);
	};

	return (
		<div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 shadow-sm overflow-hidden mb-4">
			{/* Section Header */}
			<div className="group flex select-none items-center p-4">
				<div className="flex flex-1 items-center gap-4">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
						<Icon className="h-5 w-5" weight="fill" />
					</div>
					<div className="flex flex-col items-start justify-center">
						<button
							type="button"
							onClick={onUpdateSection}
							className={cn(
								"line-clamp-1 text-wrap font-medium text-base text-gray-900 transition-opacity hover:text-emerald-600 focus:outline-none",
								section.hidden && "opacity-50"
							)}
						>
							{section.title || <Trans>Untitled Section</Trans>}
						</button>
						<div className="flex items-center text-[10px] font-bold tracking-wider text-gray-500 uppercase mt-0.5 gap-1.5">
							<span>{section.type === "custom" ? "Generic" : section.type}</span>
							<span>&middot;</span>
							<Plural value={section.items.length} one="# item" other="# items" />
						</div>
					</div>
				</div>

				<div className="flex items-center gap-1">
					<CustomSectionDropdownMenu section={section} />
				</div>
			</div>

			{/* Section Items Inline Editing */}
			<div className="p-4 pt-0 flex flex-col gap-4">
				{section.items.length > 0 && (
					<Reorder.Group axis="y" values={section.items} onReorder={handleReorder} className="flex flex-col gap-4">
						<AnimatePresence>
							{section.items.map((item) => (
								<Reorder.Item
									key={item.id}
									value={item}
									className="relative flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-4"
								>
									<button
										type="button"
										onClick={() => handleDelete(item.id)}
										className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 transition-colors z-10"
									>
										<XIcon className="h-4 w-4" weight="bold" />
									</button>

									<div className="grid grid-cols-2 gap-3 w-full pr-6">
										{Object.entries(item).map(([k, v]) => {
											if (k === "id" || k === "hidden" || typeof v === "boolean" || k === "visible") return null;

											const isFullWidth = k === "summary" || k === "content" || k === "description" || k === "url" || (typeof v === "object" && v !== null && "url" in v) || k === "name";

											if (k === "summary" || k === "content" || k === "description") {
												return (
													<div key={k} className="col-span-2">
														<RichInput
															label={k}
															value={v as string}
															onChange={(val) => handleChange(item.id, k, val)}
															className="rounded-xl border border-gray-200 bg-white"
														/>
													</div>
												);
											}
											if (typeof v === "object" && v !== null && "url" in v) {
												return (
													<div key={k} className="col-span-2">
														<Input
															placeholder="Website URL"
															value={v as string}
															onChange={(e) => handleChange(item.id, `${k}.url`, e.target.value)}
															className={inputCls}
														/>
													</div>
												);
											}
											return (
												<div key={k} className={isFullWidth ? "col-span-2" : "col-span-1"}>
													<Input
														placeholder={getPlaceholder(k)}
														value={v as string}
														onChange={(e) => handleChange(item.id, k, e.target.value)}
														className={inputCls}
													/>
												</div>
											);
										})}
									</div>
								</Reorder.Item>
							))}
						</AnimatePresence>
					</Reorder.Group>
				)}

				<button
					type="button"
					onClick={handleAdd}
					className="mt-2 flex h-10 w-full items-center justify-center rounded-full border border-dashed border-emerald-200 text-emerald-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600 font-medium text-sm"
				>
					<PlusIcon className="mr-2 h-4 w-4" weight="bold" />
					<Trans>Add {section.type === "generic" || section.type === "custom" ? "item" : section.type + " item"}</Trans>
				</button>
			</div>
		</div>
	);
}

function CustomSectionDropdownMenu({ section }: { section: CustomSection }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const onToggleSectionVisibility = () => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].hidden = !draft.customSections[sectionIndex].hidden;
		});
	};

	const onUpdateSection = () => {
		openDialog("resume.sections.custom.update", section);
	};

	const onDuplicateSection = () => {
		openDialog("resume.sections.custom.create", section);
	};

	const onSetColumns = (value: string) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].columns = parseInt(value, 10);
		});
	};

	const onDeleteSection = async () => {
		const confirmed = await confirm("Are you sure you want to delete this custom section?", {
			confirmText: "Delete",
			cancelText: "Cancel",
		});

		if (!confirmed) return;

		updateResumeData((draft) => {
			draft.customSections = draft.customSections.filter((_section) => _section.id !== section.id);
			draft.metadata.layout.pages = draft.metadata.layout.pages.map((page) => ({
				...page,
				main: page.main.filter((id) => id !== section.id),
				sidebar: page.sidebar.filter((id) => id !== section.id),
			}));
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex cursor-context-menu items-center px-4 py-2 opacity-40 transition-[background-color,opacity] hover:bg-gray-200 focus:outline-none focus-visible:ring-1 group-hover:opacity-100"
				>
					<DotsThreeVerticalIcon className="h-5 w-5" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={onToggleSectionVisibility}>
						{section.hidden ? <EyeIcon /> : <EyeClosedIcon />}
						{section.hidden ? <Trans>Show</Trans> : <Trans>Hide</Trans>}
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={onUpdateSection}>
						<PencilSimpleLineIcon />
						<Trans>Update</Trans>
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={onDuplicateSection}>
						<CopySimpleIcon />
						<Trans>Duplicate</Trans>
					</DropdownMenuItem>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<ColumnsIcon />
							<Trans>Columns</Trans>
						</DropdownMenuSubTrigger>

						<DropdownMenuSubContent>
							<DropdownMenuRadioGroup value={section.columns.toString()} onValueChange={onSetColumns}>
								{[1, 2, 3, 4, 5, 6].map((column) => (
									<DropdownMenuRadioItem key={column} value={column.toString()}>
										<Plural value={column} one="# Column" other="# Columns" />
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem variant="destructive" onSelect={onDeleteSection}>
						<TrashSimpleIcon />
						<Trans>Delete</Trans>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
