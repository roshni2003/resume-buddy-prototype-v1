import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DragHandle } from "@/components/ui/sortable-item";
import type { SectionType } from "@/schema/resume/data";
import { getSectionIcon, getSectionTitle, type LeftSidebarSection, leftSidebarSections } from "@/utils/resume/section";
import { cn } from "@/utils/style";
import { useSectionStore } from "../../../-store/section";
import { SectionDropdownMenu } from "./section-menu";

type Props = React.ComponentProps<typeof AccordionContent> & {
	type: LeftSidebarSection;
};

const colorMap: Record<string, { iconText: string; iconBg: string; border: string }> = {
	picture: { iconText: "text-pink-500", iconBg: "bg-pink-50", border: "border-pink-500" },
	basics: { iconText: "text-sky-500", iconBg: "bg-sky-50", border: "border-sky-500" },
	profiles: { iconText: "text-purple-500", iconBg: "bg-purple-50", border: "border-purple-500" },
	summary: { iconText: "text-yellow-500", iconBg: "bg-yellow-50", border: "border-yellow-500" },
	experience: { iconText: "text-blue-500", iconBg: "bg-blue-50", border: "border-blue-500" },
	education: { iconText: "text-green-500", iconBg: "bg-green-50", border: "border-green-500" },
	projects: { iconText: "text-red-500", iconBg: "bg-red-50", border: "border-red-500" },
	skills: { iconText: "text-teal-500", iconBg: "bg-teal-50", border: "border-teal-500" },
	languages: { iconText: "text-indigo-500", iconBg: "bg-indigo-50", border: "border-indigo-500" },
	interests: { iconText: "text-orange-500", iconBg: "bg-orange-50", border: "border-orange-500" },
	awards: { iconText: "text-amber-500", iconBg: "bg-amber-50", border: "border-amber-500" },
	certifications: { iconText: "text-emerald-500", iconBg: "bg-emerald-50", border: "border-emerald-500" },
	publications: { iconText: "text-cyan-500", iconBg: "bg-cyan-50", border: "border-cyan-500" },
	volunteer: { iconText: "text-rose-500", iconBg: "bg-rose-50", border: "border-rose-500" },
	references: { iconText: "text-violet-500", iconBg: "bg-violet-50", border: "border-violet-500" },
	custom: { iconText: "text-gray-500", iconBg: "bg-gray-50", border: "border-gray-500" },
};

export function SectionBase({ type, className, ...props }: Props) {
	const layout = useResumeStore((state) => state.resume.data.metadata.layout);
	const section = useResumeStore((state) => {
		if (type === "basics") return state.resume.data.basics;
		if (type === "summary") return state.resume.data.summary;
		if (type === "picture") return state.resume.data.picture;
		if (type === "custom") return state.resume.data.customSections;
		return state.resume.data.sections[type];
	});

	const orderedSections = useMemo(() => {
		const layoutSections = layout.pages.flatMap((page) => [...page.main, ...page.sidebar]);
		const ordered: string[] = [];
		const seen = new Set<string>();

		for (const section of layoutSections) {
			if (!leftSidebarSections.includes(section as LeftSidebarSection)) continue;
			if (seen.has(section)) continue;
			ordered.push(section);
			seen.add(section);
		}

		for (const section of leftSidebarSections) {
			if (seen.has(section)) continue;
			ordered.push(section);
			seen.add(section);
		}

		return ordered;
	}, [layout.pages]);

	const isHidden = "hidden" in section && section.hidden;
	const collapsed = useSectionStore((state) => state.sections[type]?.collapsed ?? false);
	const toggleCollapsed = useSectionStore((state) => state.toggleCollapsed);

	const colors = colorMap[type as string] || colorMap.custom;

	return (
		<Accordion
			collapsible
			type="single"
			id={`sidebar-${type}`}
			value={collapsed ? "" : type}
			onValueChange={() => toggleCollapsed(type)}
			className={cn(isHidden && "opacity-50")}
		>
			<AccordionItem
				value={type}
				className={cn(
					"group/accordion overflow-hidden rounded-[32px] border border-gray-100 bg-white transition-all hover:shadow-sm",
				)}
			>
				<div className="flex items-center gap-2 p-3 transition-colors hover:bg-gray-50/50 sm:p-4">
					{/* Drag handle */}
					{!["picture", "basics"].includes(type) && (
						<DragHandle className="ml-1 text-gray-400 hover:text-gray-600" />
					)}

					<div className="flex-1">
						<AccordionTrigger className="flex w-full items-center justify-between py-0 hover:no-underline">
							{/* Icon and Title */}
							<div className="ml-2 flex items-center gap-x-4 text-left">
								<div
									className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", colors.iconBg, colors.iconText)}
								>
									{getSectionIcon(type)}
								</div>
								<h2 className="line-clamp-1 font-serif text-gray-900 text-xl tracking-tight">
									{("title" in section && section.title) || getSectionTitle(type)}
								</h2>
							</div>

							{/* OPEN Button Toggle Chevron */}
							<div className="flex items-center justify-center text-gray-500 transition-colors hover:text-gray-900">
								<ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/accordion:rotate-180" />
							</div>
						</AccordionTrigger>
					</div>

					{/* Menu */}
					{!["picture", "basics", "custom"].includes(type) && (
						<div className="ml-2">
							<SectionDropdownMenu type={type as "summary" | SectionType} />
						</div>
					)}
				</div>

				<AccordionContent
					className={cn(
						"overflow-hidden px-4 pb-4 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
						className,
					)}
					{...props}
				/>
			</AccordionItem>
		</Accordion>
	);
}
