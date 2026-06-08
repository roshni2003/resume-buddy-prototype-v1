const fs = require('fs');
const file = '/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/shared/section-base.tsx';
let code = fs.readFileSync(file, 'utf8');

const colorMapCode = `
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
`;

code = code.replace(
  'export function SectionBase({ type, className, ...props }: Props) {',
  colorMapCode + '\nexport function SectionBase({ type, className, ...props }: Props) {'
);

code = code.replace(
  'const toggleCollapsed = useSectionStore((state) => state.toggleCollapsed);',
  'const toggleCollapsed = useSectionStore((state) => state.toggleCollapsed);\n\tconst colors = colorMap[type as string] || colorMap.custom;'
);

const newRender = `
	return (
		<Accordion
			collapsible
			type="single"
			id={\`sidebar-\${type}\`}
			value={collapsed ? "" : type}
			onValueChange={() => toggleCollapsed(type)}
			className={cn("mb-4", isHidden && "opacity-50")}
		>
			<AccordionItem 
                value={type} 
                className={cn(
                    "group/accordion overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md",
                    "border-l-4",
                    colors.border
                )}
            >
				<div className="flex items-center gap-2 p-3 sm:p-4 transition-colors hover:bg-gray-50/50">
					{/* Drag handle */}
					<DragHandle className="text-gray-400 hover:text-gray-600" />

					{/* Icon and Title */}
					<div className="flex flex-1 items-center gap-x-3">
						<div className={cn("flex h-8 w-8 items-center justify-center rounded-full", colors.iconBg, colors.iconText)}>
							{getSectionIcon(type)}
						</div>
						<h2 className="line-clamp-1 font-semibold text-gray-900 lg:text-lg">
							{("title" in section && section.title) || getSectionTitle(type)}
						</h2>
					</div>

                    {/* Counts/badges could go here if available */}

					{/* Menu */}
					{!["picture", "basics", "custom"].includes(type) && (
						<SectionDropdownMenu type={type as "summary" | SectionType} />
					)}

                    {/* Arrow */}
					<AccordionTrigger asChild className="ml-2 items-center justify-center">
						<Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-900">
							<CaretRightIcon className="h-4 w-4 transition-transform group-data-[state=open]/accordion:rotate-90" />
						</Button>
					</AccordionTrigger>
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
`;

code = code.replace(/return \(\s*<Accordion[\s\S]*<\/Accordion>\s*\);/, newRender.trim());

fs.writeFileSync(file, code);
