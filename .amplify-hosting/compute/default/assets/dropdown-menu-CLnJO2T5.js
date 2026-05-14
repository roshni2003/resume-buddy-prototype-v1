import { n as useControlledState, t as getStrictContext } from "./get-strict-context-CE5mktmJ.js";
import { t as cn } from "./style-BVXxCckg.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { CaretRightIcon, CheckIcon, CircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { DropdownMenu } from "radix-ui";
var [DropdownMenuProvider, useDropdownMenu] = getStrictContext("DropdownMenuContext");
var [DropdownMenuSubProvider, useDropdownMenuSub] = getStrictContext("DropdownMenuSubContext");
function DropdownMenu$1(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ jsx(DropdownMenuProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ jsx(DropdownMenu.Root, {
			"data-slot": "dropdown-menu",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DropdownMenuTrigger(props) {
	return /* @__PURE__ */ jsx(DropdownMenu.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuPortal(props) {
	return /* @__PURE__ */ jsx(DropdownMenu.Portal, {
		"data-slot": "dropdown-menu-portal",
		...props
	});
}
function DropdownMenuGroup(props) {
	return /* @__PURE__ */ jsx(DropdownMenu.Group, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuSub(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ jsx(DropdownMenuSubProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ jsx(DropdownMenu.Sub, {
			"data-slot": "dropdown-menu-sub",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DropdownMenuRadioGroup(props) {
	return /* @__PURE__ */ jsx(DropdownMenu.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...props
	});
}
function DropdownMenuSubTrigger({ disabled, textValue, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenu.SubTrigger, {
		disabled,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "dropdown-menu-sub-trigger",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuSubContent({ loop, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, sideOffset, alignOffset, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached, transition = { duration: .2 }, style, container, ...props }) {
	const { isOpen } = useDropdownMenuSub();
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(DropdownMenuPortal, {
		forceMount: true,
		container,
		children: /* @__PURE__ */ jsx(DropdownMenu.SubContent, {
			asChild: true,
			forceMount: true,
			loop,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside,
			onInteractOutside,
			sideOffset,
			alignOffset,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			arrowPadding,
			sticky,
			hideWhenDetached,
			children: /* @__PURE__ */ jsx(motion.div, {
				"data-slot": "dropdown-menu-sub-content",
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .95
				},
				transition,
				style: {
					willChange: "opacity, transform",
					...style
				},
				...props
			}, "dropdown-menu-sub-content")
		})
	}) });
}
function DropdownMenuContent({ loop, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, side, sideOffset, align, alignOffset, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached, transition = { duration: .2 }, style, container, ...props }) {
	const { isOpen } = useDropdownMenu();
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(DropdownMenuPortal, {
		forceMount: true,
		container,
		children: /* @__PURE__ */ jsx(DropdownMenu.Content, {
			asChild: true,
			loop,
			onCloseAutoFocus,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside,
			onInteractOutside,
			side,
			sideOffset,
			align,
			alignOffset,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			arrowPadding,
			sticky,
			hideWhenDetached,
			children: /* @__PURE__ */ jsx(motion.div, {
				"data-slot": "dropdown-menu-content",
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .95
				},
				transition,
				style: {
					willChange: "opacity, transform",
					...style
				},
				...props
			}, "dropdown-menu-content")
		})
	}) });
}
function DropdownMenuItem({ disabled, onSelect, textValue, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenu.Item, {
		disabled,
		onSelect,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "dropdown-menu-item",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuRadioItem({ value, disabled, onSelect, textValue, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenu.RadioItem, {
		value,
		disabled,
		onSelect,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "dropdown-menu-radio-item",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuSeparator(props) {
	return /* @__PURE__ */ jsx(DropdownMenu.Separator, {
		"data-slot": "dropdown-menu-separator",
		...props
	});
}
function DropdownMenuItemIndicator(props) {
	return /* @__PURE__ */ jsx(DropdownMenu.ItemIndicator, {
		"data-slot": "dropdown-menu-item-indicator",
		asChild: true,
		children: /* @__PURE__ */ jsx(motion.div, { ...props })
	});
}
function DropdownMenu$2(props) {
	return /* @__PURE__ */ jsx(DropdownMenu$1, { ...props });
}
function DropdownMenuTrigger$1(props) {
	return /* @__PURE__ */ jsx(DropdownMenuTrigger, { ...props });
}
function DropdownMenuContent$1({ sideOffset = 4, className, children, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuContent, {
		sideOffset,
		className: cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none", className),
		...props,
		children
	});
}
function DropdownMenuGroup$1({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuGroup, { ...props });
}
function DropdownMenuItem$1({ className, inset, variant = "default", disabled, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuItem, {
		disabled,
		"data-inset": inset,
		"data-variant": variant,
		className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-inset:ps-8 data-[variant=destructive]:text-destructive data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!", "data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive data-highlighted:bg-accent data-highlighted:text-accent-foreground dark:data-[variant=destructive]:data-highlighted:bg-destructive/20", className),
		...props
	});
}
function DropdownMenuRadioGroup$1(props) {
	return /* @__PURE__ */ jsx(DropdownMenuRadioGroup, { ...props });
}
function DropdownMenuRadioItem$1({ className, children, disabled, ...props }) {
	return /* @__PURE__ */ jsxs(DropdownMenuRadioItem, {
		disabled,
		className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", "data-highlighted:bg-accent data-highlighted:text-accent-foreground", className),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "pointer-events-none absolute start-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ jsx(DropdownMenuItemIndicator, {
				layoutId: "dropdown-menu-item-indicator-radio",
				children: /* @__PURE__ */ jsx(CircleIcon, { className: "size-2 fill-current" })
			})
		}), children]
	});
}
function DropdownMenuSeparator$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuSeparator, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function DropdownMenuSub$1(props) {
	return /* @__PURE__ */ jsx(DropdownMenuSub, { ...props });
}
function DropdownMenuSubTrigger$1({ disabled, className, inset, children, ...props }) {
	return /* @__PURE__ */ jsxs(DropdownMenuSubTrigger, {
		disabled,
		"data-inset": inset,
		className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-inset:ps-8 data-[state=open]:text-accent-foreground", "data-[state=open]:**:data-[slot=chevron]:rotate-90 **:data-[slot=chevron]:transition-transform **:data-[slot=chevron]:duration-300 **:data-[slot=chevron]:ease-in-out", "data-highlighted:bg-accent data-highlighted:text-accent-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(CaretRightIcon, {
			"data-slot": "chevron",
			className: "ml-auto size-4"
		})]
	});
}
function DropdownMenuSubContent$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuSubContent, {
		className: cn("z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg outline-none", className),
		...props
	});
}
export { DropdownMenuRadioGroup$1 as a, DropdownMenuSub$1 as c, DropdownMenuTrigger$1 as d, DropdownMenuItem$1 as i, DropdownMenuSubContent$1 as l, DropdownMenuContent$1 as n, DropdownMenuRadioItem$1 as o, DropdownMenuGroup$1 as r, DropdownMenuSeparator$1 as s, DropdownMenu$2 as t, DropdownMenuSubTrigger$1 as u };
