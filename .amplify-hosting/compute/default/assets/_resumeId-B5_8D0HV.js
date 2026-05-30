import "./get-strict-context-CE5mktmJ.js";
import "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import { n as Button } from "./input-C4lW-WI7.js";
import { t as cn } from "./style-BVXxCckg.js";
import "./rich-input-Dxvyx_Hq.js";
import "./locale-BPZR263U.js";
import "./alert-dialog-D16KSnDL.js";
import { n as useTemporalStore } from "./resume-BHY1IvQp.js";
import { t as useIsMobile } from "./use-mobile-CJT-n_ru.js";
import "./section-lTXHolph.js";
import { i18n } from "@lingui/core";
import { ArrowUUpLeftIcon, ArrowUUpRightIcon, FloppyDiskIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { useResizeObserver, useWindowSize } from "usehooks-ts";
import { t as ResumePreview } from "./preview-BAUdtGCW.js";
import {
	r as Tooltip,
	i as TooltipContent,
	a as TooltipTrigger,
	n as useBuilderSidebarStore,
} from "./sidebar-DDRCAu1z.js";

function BuilderDock() {
	const { undo, redo, pastStates, futureStates } = useTemporalStore((state) => ({
		undo: state.undo,
		redo: state.redo,
		pastStates: state.pastStates,
		futureStates: state.futureStates,
	}));
	const canUndo = pastStates.length > 1;
	const canRedo = futureStates.length > 0;
	useHotkeys("mod+z", () => undo(), {
		enabled: canUndo,
		preventDefault: true,
	});
	useHotkeys(["mod+y", "mod+shift+z"], () => redo(), {
		enabled: canRedo,
		preventDefault: true,
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-x-0 bottom-2 flex items-center justify-center px-2 sm:bottom-4",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				y: -50,
			},
			animate: {
				opacity: 0.5,
				y: 0,
			},
			whileHover: { opacity: 1 },
			transition: { duration: 0.2 },
			className: "flex items-center gap-0.5 rounded-full bg-popover px-1.5 shadow-lg sm:gap-1 sm:px-2 sm:shadow-xl",
			children: [
				/* @__PURE__ */ jsx(DockIcon, {
					disabled: !canUndo,
					onClick: () => undo(),
					icon: ArrowUUpLeftIcon,
					title: i18n._({ id: "P+nDDS" }),
				}),
				/* @__PURE__ */ jsx(DockIcon, {
					disabled: !canRedo,
					onClick: () => redo(),
					icon: ArrowUUpRightIcon,
					title: i18n._({ id: "vQwX2Y" }),
				}),
			],
		}),
	});
}
function DockIcon({ icon: Icon, title, disabled, onClick, iconClassName }) {
	return /* @__PURE__ */ jsxs(Tooltip, {
		children: [
			/* @__PURE__ */ jsx(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Button, {
					size: "icon",
					variant: "ghost",
					disabled,
					onClick,
					className: "h-8 w-8 sm:h-10 sm:w-10",
					children: /* @__PURE__ */ jsx(Icon, { className: cn("size-3.5 sm:size-4", iconClassName) }),
				}),
			}),
			/* @__PURE__ */ jsx(TooltipContent, {
				side: "top",
				align: "center",
				className: "font-medium text-xs sm:text-sm",
				children: title,
			}),
		],
	});
}
var RESUME_WIDTH = 794;
function RouteComponent() {
	const isLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.isLeftSidebarCollapsed);
	const isMobile = useIsMobile();
	const { width: windowWidth = 0 } = useWindowSize();
	const scale = useMemo(() => {
		if (windowWidth < 1024) return 0.65;
		if (isLeftSidebarCollapsed) return 1.5;
		return 1;
	}, [windowWidth, isLeftSidebarCollapsed]);
	const previewRef = useRef(null);
	const { height: unscaledHeight = 0 } = useResizeObserver({ ref: previewRef });
	useHotkeys(
		["ctrl+s", "meta+s"],
		() => {
			toast.info(i18n._({ id: "p01AP+" }), {
				id: "auto-save",
				icon: /* @__PURE__ */ jsx(FloppyDiskIcon, {}),
			});
		},
		{
			preventDefault: true,
			enableOnFormTags: true,
		},
	);
	const scaledWidth = RESUME_WIDTH * scale;
	const scaledHeight = unscaledHeight * scale;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative h-full w-full overflow-x-auto overflow-y-auto bg-gray-100",
		style: { backgroundColor: "#f0f0f0" },
		children: [
			/* @__PURE__ */ jsx("div", {
				className:
					"flex min-h-full flex-col items-start p-2 transition-[padding] duration-300 ease-in-out md:p-6 lg:p-8",
				style: { paddingBottom: !isMobile && windowWidth >= 1024 ? "5rem" : "6rem" },
				children: /* @__PURE__ */ jsx("div", {
					style: {
						width: scaledWidth,
						minWidth: scaledWidth,
						height: scaledHeight || void 0,
						margin: isMobile ? void 0 : "0 auto",
						overflow: "visible",
						flexShrink: 0,
					},
					children: /* @__PURE__ */ jsx(ResumePreview, {
						ref: previewRef,
						showPageNumbers: true,
						className:
							"flex flex-col items-start gap-3 transition-transform duration-300 ease-in-out sm:gap-4 md:gap-6",
						style: {
							transform: `scale(${scale})`,
							transformOrigin: "top left",
							width: RESUME_WIDTH,
							minWidth: RESUME_WIDTH,
							flexShrink: 0,
						},
						pageClassName: "overflow-hidden rounded-sm shadow-lg sm:rounded-md sm:shadow-xl",
					}),
				}),
			}),
			/* @__PURE__ */ jsx(BuilderDock, {}),
		],
	});
}
export { RouteComponent as component };
