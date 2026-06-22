import { Link } from "@tanstack/react-router";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBuilderSidebar, useBuilderSidebarStore } from "../-store/sidebar";
import { BuilderTopTray } from "./top-tray.tsx";
import { openZoeTour } from "@/components/editor/CoachMarks";

export function BuilderHeader() {
	const isMobile = useIsMobile();
	const toggleSidebar = useBuilderSidebar((state) => state.toggleSidebar);
	const isLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.isLeftSidebarCollapsed);
	const setLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.setLeftSidebarCollapsed);

	const handleToggle = () => {
		if (isMobile) {
			// On mobile, toggle the collapsed state directly
			setLeftSidebarCollapsed(!isLeftSidebarCollapsed);
		} else {
			// On desktop, use the panel toggle
			toggleSidebar("left");
		}
	};

	return (
		<header className="z-10 flex shrink-0 items-center justify-between gap-2 border-border border-b bg-background px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-6">
			<div className="flex items-center">
				<Button
					size="icon"
					variant="ghost"
					onClick={handleToggle}
					className="h-8 w-8 sm:h-10 sm:w-10"
					aria-label="Toggle sidebar"
				>
					<SidebarSimpleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
				</Button>

				<div className="flex items-center gap-3">
					<Link
						to="/dashboard/resumes"
						className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
					>
						<img
							src="/zoe-icon.png"
							alt="Resume Buddy"
							className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
						/>
						<span
							className="hidden font-bold text-foreground text-sm sm:block sm:text-base"
							style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
						>
							Resume Buddy
						</span>
					</Link>

					<Button
						variant="outline"
						size="sm"
						onClick={openZoeTour}
						className="
							zoe-tour-trigger
							hidden sm:flex
							items-center gap-2
							rounded-full
							border-yellow-400/40
							bg-yellow-400/10
							text-yellow-600
							hover:bg-yellow-400/20
							hover:border-yellow-400/60
							animate-pulse
						"
					>
						✨ How to Use Zoe
					</Button>

				</div>

			</div>
			<div className="flex-1 overflow-x-auto">
				<BuilderTopTray />
			</div>
		</header>
	);
}
