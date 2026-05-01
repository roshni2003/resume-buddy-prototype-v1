import { n as useControlledState, t as getStrictContext } from "./get-strict-context-CE5mktmJ.js";
import { t as cn } from "./style-BVXxCckg.js";
import { r as buttonVariants } from "./input-C4lW-WI7.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "motion/react";
import { AlertDialog, Dialog } from "radix-ui";
var [DialogProvider, useDialog] = getStrictContext("DialogContext");
function Dialog$1(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ jsx(DialogProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ jsx(Dialog.Root, {
			"data-slot": "dialog",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DialogPortal(props) {
	const { isOpen } = useDialog();
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "dialog-portal",
		forceMount: true,
		...props
	}) });
}
function DialogOverlay({ transition = {
	duration: .2,
	ease: "easeInOut"
}, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Overlay, {
		"data-slot": "dialog-overlay",
		asChild: true,
		forceMount: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				filter: "blur(4px)"
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)"
			},
			transition,
			...props
		}, "dialog-overlay")
	});
}
function DialogContent({ from = "top", onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, transition = {
	type: "spring",
	stiffness: 250,
	damping: 25
}, ...props }) {
	const initialRotation = from === "bottom" || from === "left" ? "20deg" : "-20deg";
	const rotateAxis = from === "top" || from === "bottom" ? "rotateX" : "rotateY";
	return /* @__PURE__ */ jsx(Dialog.Content, {
		asChild: true,
		forceMount: true,
		onOpenAutoFocus,
		onCloseAutoFocus,
		onEscapeKeyDown,
		onPointerDownOutside,
		onInteractOutside,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "dialog-content",
			transition,
			initial: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)",
				transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			...props
		}, "dialog-content")
	});
}
function DialogHeader(props) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-header",
		...props
	});
}
function DialogFooter(props) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-footer",
		...props
	});
}
function DialogTitle(props) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "dialog-title",
		...props
	});
}
function DialogDescription(props) {
	return /* @__PURE__ */ jsx(Dialog.Description, {
		"data-slot": "dialog-description",
		...props
	});
}
function Dialog$2(props) {
	return /* @__PURE__ */ jsx(Dialog$1, { ...props });
}
function DialogOverlay$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function DialogContent$1({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay$1, {}), /* @__PURE__ */ jsx(DialogContent, {
		className: cn("fixed top-[50%] left-[50%] z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-lg border bg-background p-6 shadow-lg sm:max-w-2xl 2xl:max-w-4xl", className),
		...props,
		children
	})] });
}
function DialogHeader$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogHeader, {
		className: cn("flex flex-col gap-2 text-center sm:text-start", className),
		...props
	});
}
function DialogFooter$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogFooter, {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function DialogTitle$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogTitle, {
		className: cn("font-semibold text-lg leading-none", className),
		...props
	});
}
function DialogDescription$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogDescription, {
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
var [AlertDialogProvider, useAlertDialog] = getStrictContext("AlertDialogContext");
function AlertDialog$1(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ jsx(AlertDialogProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ jsx(AlertDialog.Root, {
			"data-slot": "alert-dialog",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function AlertDialogPortal(props) {
	const { isOpen } = useAlertDialog();
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(AlertDialog.Portal, {
		"data-slot": "alert-dialog-portal",
		forceMount: true,
		...props
	}) });
}
function AlertDialogOverlay({ transition = {
	duration: .2,
	ease: "easeInOut"
}, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Overlay, {
		"data-slot": "alert-dialog-overlay",
		asChild: true,
		forceMount: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				filter: "blur(4px)"
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)"
			},
			transition,
			...props
		}, "alert-dialog-overlay")
	});
}
function AlertDialogContent({ from = "top", onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, transition = {
	type: "spring",
	stiffness: 250,
	damping: 25
}, ...props }) {
	const initialRotation = from === "bottom" || from === "left" ? "20deg" : "-20deg";
	const rotateAxis = from === "top" || from === "bottom" ? "rotateX" : "rotateY";
	return /* @__PURE__ */ jsx(AlertDialog.Content, {
		asChild: true,
		forceMount: true,
		onOpenAutoFocus,
		onCloseAutoFocus,
		onEscapeKeyDown,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "alert-dialog-content",
			transition,
			initial: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)",
				transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			...props
		}, "alert-dialog-content")
	});
}
function AlertDialogCancel(props) {
	return /* @__PURE__ */ jsx(AlertDialog.Cancel, {
		"data-slot": "alert-dialog-cancel",
		...props
	});
}
function AlertDialogAction(props) {
	return /* @__PURE__ */ jsx(AlertDialog.Action, {
		"data-slot": "alert-dialog-action",
		...props
	});
}
function AlertDialogHeader(props) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-dialog-header",
		...props
	});
}
function AlertDialogFooter(props) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-dialog-footer",
		...props
	});
}
function AlertDialogTitle(props) {
	return /* @__PURE__ */ jsx(AlertDialog.Title, {
		"data-slot": "alert-dialog-title",
		...props
	});
}
function AlertDialogDescription(props) {
	return /* @__PURE__ */ jsx(AlertDialog.Description, {
		"data-slot": "alert-dialog-description",
		...props
	});
}
function AlertDialog$2(props) {
	return /* @__PURE__ */ jsx(AlertDialog$1, { ...props });
}
function AlertDialogOverlay$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function AlertDialogContent$1({ className, ...props }) {
	return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay$1, {}), /* @__PURE__ */ jsx(AlertDialogContent, {
		className: cn("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg", className),
		...props
	})] });
}
function AlertDialogHeader$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogHeader, {
		className: cn("flex flex-col gap-2 text-center sm:text-start", className),
		...props
	});
}
function AlertDialogFooter$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogFooter, {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogTitle, {
		className: cn("font-semibold text-lg", className),
		...props
	});
}
function AlertDialogDescription$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogDescription, {
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
function AlertDialogAction$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogAction, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialogCancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
export { AlertDialogDescription$1 as a, AlertDialogTitle$1 as c, DialogDescription$1 as d, DialogFooter$1 as f, AlertDialogContent$1 as i, Dialog$2 as l, DialogTitle$1 as m, AlertDialogAction$1 as n, AlertDialogFooter$1 as o, DialogHeader$1 as p, AlertDialogCancel$1 as r, AlertDialogHeader$1 as s, AlertDialog$2 as t, DialogContent$1 as u };
