import { CometCard } from "@/components/animation/comet-card";
import { cn } from "@/utils/style";

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	description?: string;
	tags?: string[];
	hoverOverlay?: React.ReactNode;
}

export function BaseCard({ title, description, tags, className, children, hoverOverlay, ...props }: BaseCardProps) {
	return (
		<CometCard translateDepth={3} rotateDepth={6} className="group/card relative h-full">
			<div
				{...props}
				className={cn(
					"relative flex h-[280px] w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
					className,
				)}
			>
				{children}

				<div className="absolute inset-x-0 bottom-0 flex w-full items-center justify-between border-border/60 border-t bg-card p-3 antialiased transition-colors group-hover:bg-card/90 sm:p-4">
					<div className="min-w-0 flex-1">
						<h3 className="mb-0.5 truncate font-semibold text-base text-foreground">{title}</h3>
						<p className="truncate text-muted-foreground text-xs">{description}</p>
					</div>
				</div>
			</div>
			{hoverOverlay}
		</CometCard>
	);
}
