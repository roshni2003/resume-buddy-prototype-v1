const fs = require('fs');
const file = '/Users/sama/Desktop/reactive-resume/src/routes/builder/$resumeId/-sidebar/left/shared/section-item.tsx';
let code = fs.readFileSync(file, 'utf8');

const colorMapCode = `
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
`;

const replaceCode = `
export function SectionAddItemButton({ type, customSectionId, className, children, ...props }: AddButtonProps) {
	const { openDialog } = useDialogStore();

	const handleAdd = () => {
		if (type === "custom") {
			openDialog("resume.sections.custom.create", undefined);
		} else {
			openDialog(\`resume.sections.\${type}.create\`, customSectionId ? { customSectionId } : undefined);
		}
	};
    
    const colors = colorMap[type as string] || colorMap.custom;

	return (
		<Button
			tapScale={1}
			variant="outline"
			onClick={handleAdd}
			className={cn("mt-4 h-10 w-full justify-center rounded-full border-dashed transition-colors", colors.text, colors.bg, colors.border, "hover:bg-white", className)}
			{...props}
		>
			<PlusIcon className="mr-2 h-4 w-4" />
			{children}
		</Button>
	);
}
`;

code = code.replace(
  /export function SectionAddItemButton[\s\S]*?}\n/,
  colorMapCode + '\n' + replaceCode
);

fs.writeFileSync(file, code);
