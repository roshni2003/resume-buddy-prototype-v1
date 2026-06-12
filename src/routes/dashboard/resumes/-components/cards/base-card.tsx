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
					"relative flex h-[280px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#1e293b]/50 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
					className,
				)}
			>
				{children}

				<div className="absolute inset-x-0 bottom-0 w-full border-t border-white/10 bg-[#0f172a] p-3 antialiased sm:p-4 transition-colors group-hover:bg-[#0f172a]/90 flex justify-between items-center">
					<div className="flex-1 min-w-0">
						<h3 className="mb-0.5 truncate font-semibold text-base text-white">{title}</h3>
						<p className="truncate text-gray-400 text-xs">{description}</p>
					</div>
				</div>
			</div>
			{hoverOverlay}
		</CometCard>
	);
}
