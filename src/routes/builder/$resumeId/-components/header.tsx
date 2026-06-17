import { Link } from "@tanstack/react-router";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBuilderSidebar, useBuilderSidebarStore } from "../-store/sidebar";
import { BuilderTopTray } from "./top-tray.tsx";

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

				<div className="mx-2 h-6 w-px bg-border sm:mx-3" />

				<Link
					to="/dashboard/resumes"
					className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
				>
					<img
						src="/zoe-icon.png"
						alt="Resume Buddy"
						className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
						style={{ boxShadow: "0 0 0 2px rgba(0,208,156,0.3)" }}
					/>
					<span
						className="hidden font-bold text-foreground text-sm sm:block sm:text-base"
						style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
					>
						Resume Buddy
					</span>
				</Link>
			</div>
			<div className="flex-1 overflow-x-auto">
				<BuilderTopTray />
			</div>
		</header>
	);
}
