import { t } from "@lingui/macro";
import { FloppyDiskIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { useResizeObserver, useWindowSize } from "usehooks-ts";
import { ResumePreview } from "@/components/resume/preview";
import { useIsMobile } from "@/hooks/use-mobile";
import { BuilderDock } from "./-components/dock";
import { useBuilderSidebarStore } from "./-store/sidebar";
import { useSectionStore } from "./-store/section";

export const Route = createFileRoute("/builder/$resumeId/")({
	component: RouteComponent,
});

// A4 page width at 96dpi
const RESUME_WIDTH = 794;

function RouteComponent() {
	const isLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.isLeftSidebarCollapsed);
	const isMobile = useIsMobile();
	const { width: windowWidth = 0 } = useWindowSize();
	const navigateToSection = useSectionStore((state) => state.navigateToSection);
	const setLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.setLeftSidebarCollapsed);

	// Compute the active scale factor in JS so we can set the correct wrapper dimensions
	const scale = useMemo(() => {
		if (windowWidth < 1024) return 0.65; // mobile & tablet
		if (isLeftSidebarCollapsed) return 1.5; // large desktop, sidebar hidden
		return 1.0; // large desktop, sidebar visible
	}, [windowWidth, isLeftSidebarCollapsed]);

	const previewRef = useRef<HTMLDivElement>(null);
	const { height: unscaledHeight = 0 } = useResizeObserver({
		ref: previewRef as React.RefObject<HTMLElement>,
	});

	useHotkeys(
		["ctrl+s", "meta+s"],
		() => {
			toast.info(t`Your changes are saved automatically.`, {
				id: "auto-save",
				icon: <FloppyDiskIcon />,
			});
		},
		{ preventDefault: true, enableOnFormTags: true },
	);

	// Visual (scaled) dimensions of the resume
	const scaledWidth = RESUME_WIDTH * scale;
	const scaledHeight = unscaledHeight * scale;

	// ── Click-to-Navigate ──────────────────────────────────────────────────────
	// Walk up the DOM from the click target to find a [data-section-id] element.
	// Then expand + scroll to the matching sidebar accordion.
	const findSectionId = (target: HTMLElement | null, container: HTMLElement): string | null => {
		let el = target;
		while (el && el !== container) {
			const id = el.getAttribute("data-section-id");
			if (id) return id;
			el = el.parentElement;
		}
		return null;
	};

	const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const sectionId = findSectionId(e.target as HTMLElement, e.currentTarget);
		if (!sectionId) return;

		// On mobile, ensure the sidebar drawer is open first
		if (isMobile) {
			setLeftSidebarCollapsed(false);
		}

		// Expand the accordion and scroll it into view
		navigateToSection(sectionId);
	};

	// ── Hover highlight ────────────────────────────────────────────────────────
	// Highlight the hovered section with a subtle emerald ring.
	const handlePreviewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const container = previewRef.current;
		if (!container) return;

		const sectionId = findSectionId(e.target as HTMLElement, e.currentTarget);

		// Remove previous highlight
		const prev = container.querySelector("[data-section-highlight='true']");
		if (prev) prev.removeAttribute("data-section-highlight");

		if (sectionId) {
			// Use innermost [data-section-id] for precise highlighting
			const el = (e.target as HTMLElement).closest("[data-section-id]");
			if (el) el.setAttribute("data-section-highlight", "true");
		}
	};

	const handlePreviewMouseLeave = () => {
		const container = previewRef.current;
		if (!container) return;
		const prev = container.querySelector("[data-section-highlight='true']");
		if (prev) prev.removeAttribute("data-section-highlight");
	};

	return (
		<div className="relative h-full w-full overflow-x-auto overflow-y-auto bg-muted/30">
			{/* Click-to-Navigate styles */}
			<style>{`
				.resume-preview-container [data-section-id] {
					cursor: pointer;
					transition: outline 0.12s ease, box-shadow 0.12s ease;
					border-radius: 3px;
				}
				.resume-preview-container [data-section-highlight="true"] {
					outline: 2px solid rgba(16, 185, 129, 0.55);
					outline-offset: 4px;
					box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.08);
				}
			`}</style>

			{/* Outer flex container: centres the wrapper horizontally */}
			<div
				className="flex min-h-full flex-col items-start p-2 transition-[padding] duration-300 ease-in-out md:p-6 lg:p-8"
				style={{
					// Only add extra bottom padding when the scale is small and we need dock clearance
					paddingBottom: !isMobile && windowWidth >= 1024 ? "5rem" : "6rem",
				}}
			>
				{/*
				 * Fixed-size wrapper whose width = resume visual width (794 × scale).
				 * Using margin: auto centres it within the available artboard width.
				 * Height is clamped to the visual height to prevent extra scroll from
				 * the unscaled layout height left behind by CSS transforms.
				 */}
				<div
					style={{
						width: scaledWidth,
						minWidth: scaledWidth,
						height: scaledHeight || undefined,
						margin: isMobile ? undefined : "0 auto",
						overflow: "visible",
						flexShrink: 0,
					}}
				>
					<ResumePreview
						ref={previewRef}
						showPageNumbers
						className="flex flex-col items-start gap-3 transition-transform duration-300 ease-in-out sm:gap-4 md:gap-6"
						style={{
							transform: `scale(${scale})`,
							transformOrigin: "top left",
							width: RESUME_WIDTH,
							minWidth: RESUME_WIDTH,
							flexShrink: 0,
						}}
						pageClassName="overflow-hidden rounded-sm shadow-lg sm:rounded-md sm:shadow-xl"
						onClick={handlePreviewClick}
						onMouseMove={handlePreviewMouseMove}
						onMouseLeave={handlePreviewMouseLeave}
					/>
				</div>
			</div>

			<BuilderDock />
		</div>
	);
}
