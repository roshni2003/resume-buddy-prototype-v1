import { t as cn } from "./style-BVXxCckg.js";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { isMotionComponent, motion } from "motion/react";
function mergeRefs(...refs) {
	return (node) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") ref(node);
			else ref.current = node;
		});
	};
}
function mergeProps(childProps, slotProps) {
	const merged = {
		...childProps,
		...slotProps
	};
	if (childProps.className || slotProps.className) merged.className = cn(childProps.className, slotProps.className);
	if (childProps.style || slotProps.style) merged.style = {
		...childProps.style,
		...slotProps.style
	};
	return merged;
}
function Slot({ children, ref, ...props }) {
	const isAlreadyMotion = children && typeof children.type === "object" && children.type !== null && isMotionComponent(children.type);
	const Base = React.useMemo(() => isAlreadyMotion ? children.type : motion.create(children?.type), [isAlreadyMotion, children]);
	if (!React.isValidElement(children)) return null;
	const { ref: childRef, ...childProps } = children.props;
	return /* @__PURE__ */ jsx(Base, {
		...mergeProps(childProps, props),
		ref: mergeRefs(childRef, ref)
	});
}
function Button({ hoverScale = 1, tapScale = .95, asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot : motion.button, {
		whileTap: { scale: tapScale },
		whileHover: { scale: hoverScale },
		...props
	});
}
var buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[box-shadow,color,background-color,border-color,outline-color,text-decoration-color,fill,stroke] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
			accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
			destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
			outline: "border bg-background shadow-xs hover:bg-secondary/40 hover:text-secondary-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			ghost: "hover:bg-secondary/40 hover:text-secondary-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-sm": "size-8 rounded-md",
			"icon-lg": "size-10 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		type,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ jsx("input", {
		type,
		"data-slot": "input",
		className: cn("h-9 w-full min-w-0 rounded-md border border-input bg-gray-50 px-2.5 py-1 shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-gray-50 focus:bg-gray-50 focus-visible:border-ring focus-visible:bg-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
export { Button$1 as n, buttonVariants as r, Input as t };
