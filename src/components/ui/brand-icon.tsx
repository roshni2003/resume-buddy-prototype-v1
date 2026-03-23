import { cn } from "@/utils/style";

type Props = React.ComponentProps<"img"> & {
	variant?: "logo" | "icon";
};

export function BrandIcon({ variant = "logo", className, ...props }: Props) {
	return (
		<img
			src="/zoe-icon.png"
			alt="Zoe Resume Builder"
			className={cn("size-12", className)}
			{...props}
		/>
	);
}
