import { t as cn } from "./style-BVXxCckg.js";
import { t as useIsMobile } from "./use-mobile-CJT-n_ru.js";
import { useCallback, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip } from "radix-ui";
import { create } from "zustand/react";
import { useWindowSize } from "usehooks-ts";
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(Tooltip.Root, {
		"data-slot": "tooltip",
		...props
	}) });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Portal, { children: /* @__PURE__ */ jsxs(Tooltip.Content, {
		"data-slot": "tooltip-content",
		sideOffset,
		className: cn("data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=delayed-open]:animate-in data-closed:animate-out data-open:animate-in", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Tooltip.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
	}) });
}
const useBuilderSidebarStore = create((set) => ({
	isDragging: false,
	leftSidebar: null,
	rightSidebar: null,
	isLeftSidebarCollapsed: false,
	setLeftSidebar: (ref) => set({ leftSidebar: ref }),
	setRightSidebar: (ref) => set({ rightSidebar: ref }),
	setLeftSidebarCollapsed: (collapsed) => set({ isLeftSidebarCollapsed: collapsed })
}));
function useBuilderSidebar(selector) {
	const isMobile = useIsMobile();
	const { width } = useWindowSize();
	const maxSidebarSize = useMemo(() => {
		if (!width) return 0;
		return isMobile ? "95%" : "45%";
	}, [width, isMobile]);
	const collapsedSidebarSize = useMemo(() => {
		if (!width) return 0;
		return isMobile ? 0 : 48;
	}, [width, isMobile]);
	const expandSize = useMemo(() => isMobile ? "95%" : "30%", [isMobile]);
	const isCollapsed = useCallback((side) => {
		const sidebar = side === "left" ? useBuilderSidebarStore.getState().leftSidebar?.current : useBuilderSidebarStore.getState().rightSidebar?.current;
		if (!sidebar) return false;
		return sidebar.isCollapsed();
	}, []);
	const toggleSidebar = useCallback((side, forceState) => {
		const sidebar = side === "left" ? useBuilderSidebarStore.getState().leftSidebar?.current : useBuilderSidebarStore.getState().rightSidebar?.current;
		if (!sidebar) return;
		if (forceState === void 0 ? sidebar.isCollapsed() : forceState) {
			sidebar.resize(expandSize);
			if (side === "left") useBuilderSidebarStore.getState().setLeftSidebarCollapsed(false);
		} else {
			sidebar.collapse();
			if (side === "left") useBuilderSidebarStore.getState().setLeftSidebarCollapsed(true);
		}
	}, [expandSize]);
	const state = useMemo(() => {
		return {
			maxSidebarSize,
			collapsedSidebarSize,
			isCollapsed,
			toggleSidebar
		};
	}, [
		maxSidebarSize,
		collapsedSidebarSize,
		isCollapsed,
		toggleSidebar
	]);
	return selector ? selector(state) : state;
}
export { TooltipTrigger as a, TooltipContent as i, useBuilderSidebarStore as n, Tooltip$1 as r, useBuilderSidebar as t };
