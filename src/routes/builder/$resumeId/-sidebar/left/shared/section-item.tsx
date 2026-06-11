import { Trans } from "@lingui/react/macro";
import {
	ArrowBendUpRightIcon,
	CopySimpleIcon,
	DotsSixVerticalIcon,
	DotsThreeVerticalIcon,
	EyeClosedIcon,
	EyeIcon,
	FileIcon,
	FolderPlusIcon,
	PencilSimpleLineIcon,
	PlusCircleIcon,
	PlusIcon,
	TrashSimpleIcon,
} from "@phosphor-icons/react";
import { Reorder, useDragControls } from "motion/react";
import { useMemo } from "react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/dialogs/store";
import { useConfirm } from "@/hooks/use-confirm";
import type {
	CustomSectionItem,
	CustomSectionType,
	SectionItem as SectionItemType,
	SectionType,
} from "@/schema/resume/data";
import {
	addItemToSection,
	createCustomSectionWithItem,
	createPageWithSection,
	getCompatibleMoveTargets,
	getSourceSectionTitle,
	removeItemFromSource,
} from "@/utils/resume/move-item";
import { cn } from "@/utils/style";

// ============================================================================
// MoveItemSubmenu Component
// ============================================================================

type MoveItemSubmenuProps = {
	type: CustomSectionType;
	item: CustomSectionItem | SectionItemType;
	customSectionId?: string;
};

/**
 * Submenu component for moving items between sections/pages.
 * Displays compatible targets grouped by page with options to:
 * - Move to existing compatible section
 * - Create new section on existing page
 * - Create new page with new section
 */
export function MoveItemSubmenu({ type, item, customSectionId }: MoveItemSubmenuProps) {
	const resume = useResumeStore((state) => state.resume);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	/** Compute compatible move targets grouped by page */
	const moveTargets = useMemo(
		() => getCompatibleMoveTargets(resume.data, type, customSectionId),
		[resume.data, type, customSectionId],
	);

	/** Get the current section's title (used when creating new sections) */
	const currentSectionTitle = useMemo(
		() => getSourceSectionTitle(resume.data, type, customSectionId),
		[resume.data, type, customSectionId],
	);

	/** Handler: Move item to an existing section */
	const handleMoveToSection = (targetSectionId: string) => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			addItemToSection(draft, removedItem, targetSectionId, type);
		});
	};

	/** Handler: Create a new custom section on an existing page and move the item there */
	const handleNewSectionOnPage = (pageIndex: number) => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			createCustomSectionWithItem(draft, removedItem, type, currentSectionTitle, pageIndex);
		});
	};

	/** Handler: Create a new page with a new custom section and move the item there */
	const handleNewPage = () => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			createPageWithSection(draft, removedItem, type, currentSectionTitle);
		});
	};

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<ArrowBendUpRightIcon />
				<Trans>Move to</Trans>
			</DropdownMenuSubTrigger>

			<DropdownMenuSubContent>
				{/* Render each page as a submenu */}
				{moveTargets.map(({ pageIndex, sections }) => (
					<DropdownMenuSub key={pageIndex}>
						<DropdownMenuSubTrigger>
							<FileIcon />
							<Trans>Page {pageIndex + 1}</Trans>
						</DropdownMenuSubTrigger>

						<DropdownMenuSubContent>
							{/* Existing compatible sections on this page */}
							{sections.map(({ sectionId, sectionTitle }) => (
								<DropdownMenuItem key={sectionId} onSelect={() => handleMoveToSection(sectionId)}>
									{sectionTitle}
								</DropdownMenuItem>
							))}

							{/* Separator if there are existing sections */}
							{sections.length > 0 && <DropdownMenuSeparator />}

							{/* Option to create a new section on this page */}
							<DropdownMenuItem onSelect={() => handleNewSectionOnPage(pageIndex)}>
								<FolderPlusIcon />
								<Trans>New Section</Trans>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				))}

				<DropdownMenuSeparator />

				{/* Option to create a new page with a new section */}
				<DropdownMenuItem onSelect={handleNewPage}>
					<PlusCircleIcon />
					<Trans>New Page</Trans>
				</DropdownMenuItem>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}

// ============================================================================
// SectionItem Component
// ============================================================================

type Props<T extends CustomSectionItem | SectionItemType> = {
	type: CustomSectionType;
	item: T;
	title: string;
	subtitle?: string;
	customSectionId?: string;
};

export function SectionItem<T extends CustomSectionItem | SectionItemType>({
	type,
	item,
	title,
	subtitle,
	customSectionId,
}: Props<T>) {
	const confirm = useConfirm();
	const controls = useDragControls();
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const onToggleVisibility = () => {
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			} else {
				// Type assertion: when customSectionId is not provided, type is always a built-in SectionType
				const section = draft.sections[type as SectionType];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			}
		});
	};

	const onUpdate = () => {
		// Type assertion needed because TypeScript can't narrow the union type through template literals
		openDialog(`resume.sections.${type}.update`, { item, customSectionId } as never);
	};

	const onDuplicate = () => {
		// Type assertion needed because TypeScript can't narrow the union type through template literals
		openDialog(`resume.sections.${type}.create`, { item, customSectionId } as never);
	};

	const onDelete = async () => {
		const confirmed = await confirm("Are you sure you want to delete this item?", {
			confirmText: "Delete",
			cancelText: "Cancel",
		});

		if (!confirmed) return;

		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			} else {
				// Type assertion: when customSectionId is not provided, type is always a built-in SectionType
				const section = draft.sections[type as SectionType];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			}
		});
	};

	return (
		<Reorder.Item
			key={item.id}
			value={item}
			dragListener={false}
			dragControls={controls}
			initial={{ opacity: 1, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			className="group relative flex h-18 select-none border-b"
		>
			<div
				className="flex cursor-ns-resize touch-none items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 group-hover:opacity-100"
				onPointerDown={(e) => {
					e.preventDefault();
					controls.start(e);
				}}
			>
				<DotsSixVerticalIcon />
			</div>

			<button
				onClick={onUpdate}
				className={cn(
					"flex flex-1 flex-col items-start justify-center space-y-0.5 ps-1.5 text-start opacity-100 transition-opacity hover:bg-secondary/40 focus:outline-none focus-visible:ring-1",
					item.hidden && "opacity-50",
				)}
			>
				<div className="line-clamp-1 font-medium">{title}</div>
				{subtitle && <div className="line-clamp-1 text-muted-foreground text-xs">{subtitle}</div>}
			</button>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="flex cursor-context-menu items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 focus:outline-none focus-visible:ring-1 group-hover:opacity-100">
						<DotsThreeVerticalIcon />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={onToggleVisibility}>
							{item.hidden ? <EyeIcon /> : <EyeClosedIcon />}
							{item.hidden ? <Trans>Show</Trans> : <Trans>Hide</Trans>}
						</DropdownMenuItem>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={onUpdate}>
							<PencilSimpleLineIcon />
							<Trans>Update</Trans>
						</DropdownMenuItem>

						<DropdownMenuItem onSelect={onDuplicate}>
							<CopySimpleIcon />
							<Trans>Duplicate</Trans>
						</DropdownMenuItem>

						<MoveItemSubmenu type={type} item={item} customSectionId={customSectionId} />
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem variant="destructive" onSelect={onDelete}>
							<TrashSimpleIcon />
							<Trans>Delete</Trans>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Reorder.Item>
	);
}

type AddButtonProps = Omit<ButtonProps, "type"> & {
	type: CustomSectionType | "custom";
	customSectionId?: string;
};

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
	picture: { text: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200" },
	basics: { text: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200" },
	profiles: { text: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
	summary: { text: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" },
	experience: { text: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
	education: { text: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
	projects: { text: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
	skills: { text: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" },
	languages: { text: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" },
	interests: { text: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
	awards: { text: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
	certifications: { text: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
	publications: { text: "text-cyan-500", bg: "bg-cyan-50", border: "border-cyan-200" },
	volunteer: { text: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" },
	references: { text: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200" },
	custom: { text: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
};

export function SectionAddItemButton({ type, customSectionId, className, children, ...props }: AddButtonProps) {
	const { openDialog } = useDialogStore();

	const handleAdd = () => {
		if (type === "custom") {
			openDialog("resume.sections.custom.create", undefined);
		} else {
			openDialog(`resume.sections.${type}.create`, customSectionId ? { customSectionId } : undefined);
		}
	};

	const colors = colorMap[type as string] || colorMap.custom;

	return (
		<Button
			tapScale={1}
			variant="outline"
			onClick={handleAdd}
			className={cn(
				"mt-4 h-10 w-full justify-center rounded-full border border-dashed transition-colors hover:bg-white",
				colors.text,
				colors.bg,
				colors.border,
				className,
			)}
			{...props}
		>
			<PlusIcon className="mr-2 h-4 w-4" />
			{children}
		</Button>
	);
}
