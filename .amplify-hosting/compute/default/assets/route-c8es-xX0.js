import { n as useControlledState, t as getStrictContext } from "./get-strict-context-CE5mktmJ.js";
import { t as createServerFn } from "./createServerFn-Ch6eBU8Y.js";
import "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import { t as cn } from "./style-BVXxCckg.js";
import { n as Button, t as Input } from "./input-C4lW-WI7.js";
import "./spinner-D8fbffbw.js";
import { t as LoadingScreen } from "./loading-screen-CHUPzkEh.js";
import { a as init_string, n as generateId, s as stripHtml, t as createSsrRpc } from "./createSsrRpc-9mmrq80i.js";
import { C as InputGroupText, F as pictureSchema, M as init_data, S as InputGroupInput, T as basicsSchema, a as PopoverHeader, b as InputGroupAddon, i as PopoverContent, l as useConfirm, n as Combobox, o as PopoverTitle, r as Popover$1, s as PopoverTrigger, t as Badge, u as useDialogStore, y as InputGroup } from "./badge-C7BDNxcP.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog$1 } from "./alert-dialog-D16KSnDL.js";
import { t as api } from "./api-CLpzZUWU.js";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form } from "./form-DrLEBR9G.js";
import { a as hexToRgb, c as rgbToHsv, i as URLInput, l as rgbToString, n as ScrollArea$1, o as hsvToRgb, r as IconPicker, s as parseRgbString, t as Route } from "./route-CsRbs3nG.js";
import { i as usePrompt, t as useResumeStore } from "./resume-BHY1IvQp.js";
import { t as useIsMobile } from "./use-mobile-CJT-n_ru.js";
import { a as webfontlist_default, i as rightSidebarSections, n as getSectionTitle, o as useCSSVariables, r as leftSidebarSections, t as getSectionIcon } from "./section-lTXHolph.js";
import { n as generateFilename, t as downloadFromUrl } from "./file-x-fFSVdS.js";
import { a as TooltipTrigger, i as TooltipContent, n as useBuilderSidebarStore, r as Tooltip$1, t as useBuilderSidebar } from "./sidebar-DDRCAu1z.js";
import { t as MultipleCombobox } from "./multiple-combobox-DQb9dFeD.js";
import { a as DropdownMenuRadioGroup, c as DropdownMenuSub, d as DropdownMenuTrigger, i as DropdownMenuItem, l as DropdownMenuSubContent, n as DropdownMenuContent, o as DropdownMenuRadioItem, r as DropdownMenuGroup, s as DropdownMenuSeparator, t as DropdownMenu$1, u as DropdownMenuSubTrigger } from "./dropdown-menu-CLnJO2T5.js";
import { t as Separator$1 } from "./separator-CVomJmmh.js";
import * as React from "react";
import { Fragment, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useParams } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Trans, useLingui } from "@lingui/react";
import { ArrowBendUpRightIcon, BroomIcon, CameraIcon, CaretRightIcon, CheckCircleIcon, CircleNotchIcon, ColumnsIcon, CopySimpleIcon, DotsSixVerticalIcon, DotsThreeVerticalIcon, DownloadSimpleIcon, EyeClosedIcon, EyeIcon, EyedropperIcon, FileIcon, FilePdfIcon, FolderPlusIcon, LightbulbIcon, LinkIcon, ListIcon, ListPlusIcon, MicrosoftWordLogoIcon, PaletteIcon, PencilSimpleIcon, PencilSimpleLineIcon, PlusCircleIcon, PlusIcon, ShieldWarningIcon, SidebarSimpleIcon, SparkleIcon, SwapIcon, TextTIcon, TrashIcon, TrashSimpleIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, Reorder, motion, useDragControls, useInView } from "motion/react";
import z from "zod";
import { i18n } from "@lingui/core";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Accordion, Slider, Slot } from "radix-ui";
import { create } from "zustand/react";
import { toast } from "sonner";
import { match } from "ts-pattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useDebounceCallback, useWindowSize } from "usehooks-ts";
import * as ResizablePrimitive from "react-resizable-panels";
import { usePanelRef } from "react-resizable-panels";
import { AnimatePresence as AnimatePresence$1, motion as motion$1 } from "framer-motion";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCenter, defaultDropAnimation, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
function ResizableGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(ResizablePrimitive.Group, {
		"data-slot": "resizable-panel-group",
		className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
		...props
	});
}
function ResizablePanel({ className, ...props }) {
	return /* @__PURE__ */ jsx(ResizablePrimitive.Panel, {
		"data-slot": "resizable-panel",
		className: cn("relative", className),
		...props
	});
}
function ResizableSeparator({ withHandle, className, ...props }) {
	return /* @__PURE__ */ jsx(ResizablePrimitive.Separator, {
		"data-slot": "resizable-handle",
		className: cn("relative flex w-px items-center justify-center bg-transparent transition-colors after:absolute after:inset-y-0 after:start-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[separator='active']:bg-sky-700 data-[separator='hover']:bg-sky-700 data-[panel-group-direction=vertical]:after:start-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90", className),
		...props,
		children: withHandle && /* @__PURE__ */ jsx("div", {
			className: "absolute z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border",
			children: /* @__PURE__ */ jsx(DotsSixVerticalIcon, { className: "size-2.5" })
		})
	});
}
function VisuallyHiddenInput(props) {
	const { control, value, checked, bubbles = true, type = "hidden", style, ...inputProps } = props;
	const isCheckInput = React.useMemo(() => type === "checkbox" || type === "radio" || type === "switch", [type]);
	const inputRef = React.useRef(null);
	const prevValueRef = React.useRef({
		value: isCheckInput ? checked : value,
		previous: isCheckInput ? checked : value
	});
	const prevValue = React.useMemo(() => {
		const currentValue = isCheckInput ? checked : value;
		if (prevValueRef.current.value !== currentValue) {
			prevValueRef.current.previous = prevValueRef.current.value;
			prevValueRef.current.value = currentValue;
		}
		return prevValueRef.current.previous;
	}, [
		isCheckInput,
		value,
		checked
	]);
	const [controlSize, setControlSize] = React.useState({});
	React.useLayoutEffect(() => {
		if (!control) {
			setControlSize({});
			return;
		}
		setControlSize({
			width: control.offsetWidth,
			height: control.offsetHeight
		});
		if (typeof window === "undefined") return;
		const resizeObserver = new ResizeObserver((entries) => {
			if (!Array.isArray(entries) || !entries.length) return;
			const entry = entries[0];
			if (!entry) return;
			let width;
			let height;
			if ("borderBoxSize" in entry) {
				const borderSizeEntry = entry.borderBoxSize;
				const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
				width = borderSize.inlineSize;
				height = borderSize.blockSize;
			} else {
				width = control.offsetWidth;
				height = control.offsetHeight;
			}
			setControlSize({
				width,
				height
			});
		});
		resizeObserver.observe(control, { box: "border-box" });
		return () => {
			resizeObserver.disconnect();
		};
	}, [control]);
	React.useEffect(() => {
		const input = inputRef.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const propertyKey = isCheckInput ? "checked" : "value";
		const eventType = isCheckInput ? "click" : "input";
		const currentValue = isCheckInput ? checked : value;
		const serializedCurrentValue = isCheckInput ? checked : typeof value === "object" && value !== null ? JSON.stringify(value) : value;
		const setter = Object.getOwnPropertyDescriptor(inputProto, propertyKey)?.set;
		if (prevValue !== currentValue && setter) {
			const event = new Event(eventType, { bubbles });
			setter.call(input, serializedCurrentValue);
			input.dispatchEvent(event);
		}
	}, [
		prevValue,
		value,
		checked,
		bubbles,
		isCheckInput
	]);
	const composedStyle = React.useMemo(() => {
		return {
			...style,
			...controlSize.width !== void 0 && controlSize.height !== void 0 ? controlSize : {},
			border: 0,
			clip: "rect(0 0 0 0)",
			clipPath: "inset(50%)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			whiteSpace: "nowrap",
			width: "1px"
		};
	}, [style, controlSize]);
	return /* @__PURE__ */ jsx("input", {
		type,
		...inputProps,
		ref: inputRef,
		"aria-hidden": isCheckInput,
		tabIndex: -1,
		defaultChecked: isCheckInput ? checked : void 0,
		style: composedStyle
	});
}
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	if (ref !== null && ref !== void 0) ref.current = value;
}
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
function useComposedRefs(...refs) {
	return useCallback(composeRefs(...refs), refs);
}
var DirectionContext = React.createContext(void 0);
function useDirection(dirProp) {
	const contextDir = React.useContext(DirectionContext);
	return dirProp ?? contextDir ?? "ltr";
}
function useLazyRef(fn) {
	const ref = React.useRef(null);
	if (ref.current === null) ref.current = fn();
	return ref;
}
function colorValuesEqual(a, b) {
	return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}
function hsvValuesEqual(a, b) {
	return a.h === b.h && a.s === b.s && a.v === b.v && a.a === b.a;
}
function createColorPickerStore(listenersRef, stateRef, callbacks) {
	const store = {
		subscribe: (cb) => {
			if (listenersRef.current) {
				listenersRef.current.add(cb);
				return () => listenersRef.current?.delete(cb);
			}
			return () => {};
		},
		getState: () => stateRef.current || {
			color: {
				r: 0,
				g: 0,
				b: 0,
				a: 1
			},
			hsv: {
				h: 0,
				s: 0,
				v: 0,
				a: 1
			},
			open: false
		},
		setColor: (value) => {
			if (!stateRef.current) return;
			if (colorValuesEqual(stateRef.current.color, value)) return;
			stateRef.current.color = value;
			stateRef.current.hsv = rgbToHsv(value);
			if (callbacks?.onColorChange) {
				const colorString = rgbToString(value);
				callbacks.onColorChange(colorString);
			}
			store.notify();
		},
		setHsv: (value) => {
			if (!stateRef.current) return;
			if (hsvValuesEqual(stateRef.current.hsv, value)) return;
			stateRef.current.hsv = value;
			stateRef.current.color = hsvToRgb(value);
			if (callbacks?.onColorChange) {
				const colorString = rgbToString(stateRef.current.color);
				callbacks.onColorChange(colorString);
			}
			store.notify();
		},
		syncColor: (value) => {
			if (!stateRef.current) return;
			if (colorValuesEqual(stateRef.current.color, value)) return;
			stateRef.current.color = value;
			stateRef.current.hsv = rgbToHsv(value);
			store.notify();
		},
		setOpen: (value) => {
			if (!stateRef.current) return;
			if (Object.is(stateRef.current.open, value)) return;
			stateRef.current.open = value;
			if (callbacks?.onOpenChange) callbacks.onOpenChange(value);
			store.notify();
		},
		notify: () => {
			if (listenersRef.current) for (const cb of listenersRef.current) cb();
		}
	};
	return store;
}
function useColorPickerStoreContext(consumerName) {
	const context = React.useContext(ColorPickerStoreContext);
	if (!context) throw new Error(`\`${consumerName}\` must be used within \`ColorPickerRoot\``);
	return context;
}
function useColorPickerStore(selector) {
	const store = useColorPickerStoreContext("useColorPickerStoreSelector");
	const getSnapshot = React.useCallback(() => selector(store.getState()), [store, selector]);
	return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}
var ColorPickerStoreContext = React.createContext(null);
var ColorPickerContext = React.createContext(null);
function useColorPickerContext(consumerName) {
	const context = React.useContext(ColorPickerContext);
	if (!context) throw new Error(`\`${consumerName}\` must be used within \`ColorPickerRoot\``);
	return context;
}
function ColorPickerRoot(props) {
	const { value: valueProp, defaultValue = "rgb(0, 0, 0)", onValueChange, defaultOpen, open: openProp, onOpenChange, name, disabled, readOnly, required, ...rootProps } = props;
	const initialColor = React.useMemo(() => {
		const color = parseRgbString(valueProp ?? defaultValue) ?? {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		};
		return {
			color,
			hsv: rgbToHsv(color),
			open: openProp ?? defaultOpen ?? false
		};
	}, [
		valueProp,
		defaultValue,
		openProp,
		defaultOpen
	]);
	const stateRef = useLazyRef(() => initialColor);
	const listenersRef = useLazyRef(() => /* @__PURE__ */ new Set());
	const storeCallbacks = React.useMemo(() => ({
		onColorChange: onValueChange,
		onOpenChange
	}), [onValueChange, onOpenChange]);
	const store = React.useMemo(() => createColorPickerStore(listenersRef, stateRef, storeCallbacks), [
		listenersRef,
		stateRef,
		storeCallbacks
	]);
	return /* @__PURE__ */ jsx(ColorPickerStoreContext.Provider, {
		value: store,
		children: /* @__PURE__ */ jsx(ColorPickerRootImpl, {
			...rootProps,
			value: valueProp,
			defaultOpen,
			open: openProp,
			onOpenChange,
			name,
			disabled,
			readOnly,
			required
		})
	});
}
function ColorPickerRootImpl(props) {
	const { value: valueProp, dir: dirProp, defaultOpen, open: openProp, onOpenChange, name, ref, asChild, disabled, modal, readOnly, required, ...rootProps } = props;
	const store = useColorPickerStoreContext("ColorPickerRootImpl");
	const dir = useDirection(dirProp);
	const [formTrigger, setFormTrigger] = React.useState(null);
	const composedRef = useComposedRefs(ref, (node) => setFormTrigger(node));
	const isFormControl = formTrigger ? !!formTrigger.closest("form") : true;
	React.useEffect(() => {
		if (valueProp !== void 0) {
			const parsed = parseRgbString(valueProp);
			if (parsed) {
				const currentState = store.getState();
				const color = {
					...parsed,
					a: parsed.a ?? currentState.color.a
				};
				store.syncColor(color);
			}
		}
	}, [valueProp, store]);
	React.useEffect(() => {
		if (openProp !== void 0) store.setOpen(openProp);
	}, [openProp, store]);
	const contextValue = React.useMemo(() => ({
		dir,
		disabled,
		readOnly,
		required
	}), [
		dir,
		disabled,
		readOnly,
		required
	]);
	const value = useColorPickerStore((state) => rgbToString(state.color));
	const open = useColorPickerStore((state) => state.open);
	const onPopoverOpenChange = React.useCallback((newOpen) => {
		store.setOpen(newOpen);
		onOpenChange?.(newOpen);
	}, [store, onOpenChange]);
	const RootPrimitive = asChild ? Slot.Slot : "div";
	return /* @__PURE__ */ jsx(ColorPickerContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsxs(Popover$1, {
			defaultOpen,
			open,
			onOpenChange: onPopoverOpenChange,
			modal,
			children: [/* @__PURE__ */ jsx(RootPrimitive, {
				...rootProps,
				ref: composedRef
			}), isFormControl && /* @__PURE__ */ jsx(VisuallyHiddenInput, {
				type: "hidden",
				name,
				value,
				disabled,
				readOnly,
				required,
				control: formTrigger
			})]
		})
	});
}
function ColorPickerTrigger(props) {
	const { asChild, ...triggerProps } = props;
	const context = useColorPickerContext("ColorPickerTrigger");
	const TriggerPrimitive = asChild ? Slot.Slot : PopoverTrigger;
	return /* @__PURE__ */ jsx(PopoverTrigger, {
		asChild: true,
		disabled: context.disabled,
		children: /* @__PURE__ */ jsx(TriggerPrimitive, {
			"data-slot": "color-picker-trigger",
			...triggerProps
		})
	});
}
function ColorPickerContent(props) {
	const { asChild, className, children, ...popoverContentProps } = props;
	return /* @__PURE__ */ jsx(PopoverContent, {
		"data-slot": "color-picker-content",
		asChild,
		...popoverContentProps,
		className: cn("flex w-[340px] flex-col gap-4 p-4", className),
		children
	});
}
function ColorPickerSwatch(props) {
	const { asChild, className, ...swatchProps } = props;
	const context = useColorPickerContext("ColorPickerSwatch");
	const color = useColorPickerStore((state) => state.color);
	const backgroundStyle = React.useMemo(() => {
		if (!color) return { background: "linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat" };
		const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
		if (color.a < 1) return { background: `linear-gradient(${colorString}, ${colorString}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 8px 8px` };
		return { backgroundColor: colorString };
	}, [color]);
	const ariaLabel = !color ? "No color selected" : `Current color: ${rgbToString(color)}`;
	return /* @__PURE__ */ jsx("div", {
		className: "flex size-9 items-center justify-start",
		children: /* @__PURE__ */ jsx(asChild ? Slot.Slot : "div", {
			...swatchProps,
			role: "img",
			"aria-label": ariaLabel,
			"data-slot": "color-picker-swatch",
			className: cn("box-border size-7 rounded-md border", context.disabled && "opacity-50", className),
			style: {
				...backgroundStyle,
				forcedColorAdjust: "none"
			}
		})
	});
}
function ColorPickerArea(props) {
	const { asChild, className, ref, ...areaProps } = props;
	const context = useColorPickerContext("ColorPickerArea");
	const store = useColorPickerStoreContext("ColorPickerArea");
	const hsv = useColorPickerStore((state) => state.hsv);
	const isDraggingRef = React.useRef(false);
	const areaRef = React.useRef(null);
	const composedRef = useComposedRefs(ref, areaRef);
	const updateColorFromPosition = React.useCallback((clientX, clientY) => {
		if (!areaRef.current) return;
		const rect = areaRef.current.getBoundingClientRect();
		const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
		const newHsv = {
			h: hsv?.h ?? 0,
			s: Math.round(x * 100),
			v: Math.round(y * 100),
			a: hsv?.a ?? 1
		};
		store.setHsv(newHsv);
	}, [hsv, store]);
	const onPointerDown = React.useCallback((event) => {
		if (context.disabled) return;
		isDraggingRef.current = true;
		areaRef.current?.setPointerCapture(event.pointerId);
		updateColorFromPosition(event.clientX, event.clientY);
	}, [context.disabled, updateColorFromPosition]);
	const onPointerMove = React.useCallback((event) => {
		if (isDraggingRef.current) updateColorFromPosition(event.clientX, event.clientY);
	}, [updateColorFromPosition]);
	const onPointerUp = React.useCallback((event) => {
		isDraggingRef.current = false;
		areaRef.current?.releasePointerCapture(event.pointerId);
	}, []);
	const backgroundHue = hsvToRgb({
		h: hsv?.h ?? 0,
		s: 100,
		v: 100,
		a: 1
	});
	return /* @__PURE__ */ jsxs(asChild ? Slot.Slot : "div", {
		"data-slot": "color-picker-area",
		...areaProps,
		className: cn("relative h-40 w-full cursor-crosshair touch-none rounded-md border", context.disabled && "pointer-events-none opacity-50", className),
		ref: composedRef,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 overflow-hidden rounded-md",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { backgroundColor: `rgb(${backgroundHue.r}, ${backgroundHue.g}, ${backgroundHue.b})` }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: "linear-gradient(to right, #fff, transparent)" }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: "linear-gradient(to bottom, transparent, #000)" }
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white",
			style: {
				left: `${hsv?.s ?? 0}%`,
				top: `${100 - (hsv?.v ?? 0)}%`
			}
		})]
	});
}
function ColorPickerHueSlider(props) {
	const { className, ...sliderProps } = props;
	const context = useColorPickerContext("ColorPickerHueSlider");
	const store = useColorPickerStoreContext("ColorPickerHueSlider");
	const hsv = useColorPickerStore((state) => state.hsv);
	const onValueChange = React.useCallback((values) => {
		const newHsv = {
			h: values[0] ?? 0,
			s: hsv?.s ?? 0,
			v: hsv?.v ?? 0,
			a: hsv?.a ?? 1
		};
		store.setHsv(newHsv);
	}, [hsv, store]);
	return /* @__PURE__ */ jsxs(Slider.Root, {
		"data-slot": "color-picker-hue-slider",
		...sliderProps,
		max: 360,
		step: 1,
		className: cn("relative flex w-full touch-none select-none items-center", className),
		value: [hsv?.h ?? 0],
		onValueChange,
		disabled: context.disabled,
		children: [/* @__PURE__ */ jsx(Slider.Track, {
			className: "relative h-3 w-full grow overflow-hidden rounded-full bg-[linear-gradient(to_right,#ff0000_0%,#ffff00_16.66%,#00ff00_33.33%,#00ffff_50%,#0000ff_66.66%,#ff00ff_83.33%,#ff0000_100%)]",
			children: /* @__PURE__ */ jsx(Slider.Range, { className: "absolute h-full" })
		}), /* @__PURE__ */ jsx(Slider.Thumb, { className: "block size-4 rounded-full border border-primary/50 bg-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
	});
}
function ColorPickerEyeDropper(props) {
	const { children, size, ...buttonProps } = props;
	const context = useColorPickerContext("ColorPickerEyeDropper");
	const store = useColorPickerStoreContext("ColorPickerEyeDropper");
	const color = useColorPickerStore((state) => state.color);
	const onEyeDropper = React.useCallback(async () => {
		if (!window.EyeDropper) return;
		try {
			const result = await new window.EyeDropper().open();
			if (result.sRGBHex) {
				const currentAlpha = color?.a ?? 1;
				const newColor = hexToRgb(result.sRGBHex, currentAlpha);
				store.setColor(newColor);
			}
		} catch (error) {
			console.warn("EyeDropper error:", error);
		}
	}, [color, store]);
	if (!(typeof window !== "undefined" && !!window.EyeDropper)) return null;
	const buttonSize = size ?? (children ? "default" : "icon");
	return /* @__PURE__ */ jsx(Button, {
		"data-slot": "color-picker-eye-dropper",
		...buttonProps,
		variant: "outline",
		size: buttonSize,
		onClick: onEyeDropper,
		disabled: context.disabled,
		children: children ?? /* @__PURE__ */ jsx(EyedropperIcon, {})
	});
}
function ColorPickerAlphaSlider(props) {
	const { className, ...sliderProps } = props;
	const context = useColorPickerContext("ColorPickerAlphaSlider");
	const store = useColorPickerStoreContext("ColorPickerAlphaSlider");
	const color = useColorPickerStore((state) => state.color);
	const onValueChange = React.useCallback((values) => {
		const alpha = (values[0] ?? 0) / 100;
		const newColor = {
			...color,
			a: alpha
		};
		store.setColor(newColor);
	}, [color, store]);
	const gradientColor = `rgb(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0})`;
	return /* @__PURE__ */ jsxs(Slider.Root, {
		"data-slot": "color-picker-alpha-slider",
		...sliderProps,
		max: 100,
		step: 1,
		disabled: context.disabled,
		className: cn("relative flex w-full touch-none select-none items-center", className),
		value: [Math.round((color?.a ?? 1) * 100)],
		onValueChange,
		children: [/* @__PURE__ */ jsxs(Slider.Track, {
			className: "relative h-3 w-full grow overflow-hidden rounded-full",
			style: {
				background: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
				backgroundSize: "8px 8px",
				backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px"
			},
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 rounded-full",
				style: { background: `linear-gradient(to right, transparent, ${gradientColor})` }
			}), /* @__PURE__ */ jsx(Slider.Range, { className: "absolute h-full" })]
		}), /* @__PURE__ */ jsx(Slider.Thumb, { className: "block size-4 rounded-full border border-primary/50 bg-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
	});
}
function ColorPickerInput(props) {
	const context = useColorPickerContext("ColorPickerInput");
	const store = useColorPickerStoreContext("ColorPickerInput");
	const color = useColorPickerStore((state) => state.color);
	const onChannelChange = React.useCallback((channel, max, isAlpha = false) => (event) => {
		const value = Number.parseInt(event.target.value, 10);
		if (!Number.isNaN(value) && value >= 0 && value <= max) {
			const newValue = isAlpha ? value / 100 : value;
			const newColor = {
				...color,
				[channel]: newValue
			};
			store.setColor(newColor);
		}
	}, [color, store]);
	const rValue = Math.round(color?.r ?? 0);
	const gValue = Math.round(color?.g ?? 0);
	const bValue = Math.round(color?.b ?? 0);
	const alphaValue = Math.round((color?.a ?? 1) * 100);
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "color-picker-input-wrapper",
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ jsx("span", { children: "R" }),
			/* @__PURE__ */ jsx(Input, {
				type: "number",
				"aria-label": "Red color component (0-255)",
				placeholder: "0",
				inputMode: "numeric",
				pattern: "[0-9]*",
				min: "0",
				max: "255",
				className: "flex-1 shrink-0",
				value: rValue,
				onChange: onChannelChange("r", 255),
				disabled: context.disabled
			}),
			/* @__PURE__ */ jsx("span", { children: "G" }),
			/* @__PURE__ */ jsx(Input, {
				type: "number",
				"aria-label": "Green color component (0-255)",
				placeholder: "0",
				inputMode: "numeric",
				pattern: "[0-9]*",
				min: "0",
				max: "255",
				className: "flex-1 shrink-0",
				value: gValue,
				onChange: onChannelChange("g", 255),
				disabled: context.disabled
			}),
			/* @__PURE__ */ jsx("span", { children: "B" }),
			/* @__PURE__ */ jsx(Input, {
				type: "number",
				"aria-label": "Blue color component (0-255)",
				placeholder: "0",
				inputMode: "numeric",
				pattern: "[0-9]*",
				min: "0",
				max: "255",
				className: "flex-1 shrink-0",
				value: bValue,
				onChange: onChannelChange("b", 255),
				disabled: context.disabled
			}),
			!props.withoutAlpha && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", { children: "A" }), /* @__PURE__ */ jsx(Input, {
				type: "number",
				"aria-label": "Alpha transparency percentage",
				placeholder: "100",
				inputMode: "numeric",
				pattern: "[0-9]*",
				min: "0",
				max: "100",
				className: "flex-1 shrink-0",
				value: alphaValue,
				onChange: onChannelChange("a", 100, true),
				disabled: context.disabled
			})] })
		]
	});
}
var ColorPicker = (props) => {
	return /* @__PURE__ */ jsxs(ColorPickerRoot, {
		...props,
		children: [/* @__PURE__ */ jsx(ColorPickerTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(ColorPickerSwatch, {})
		}), /* @__PURE__ */ jsxs(ColorPickerContent, { children: [
			/* @__PURE__ */ jsx(ColorPickerArea, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ jsx(ColorPickerEyeDropper, {}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-1 flex-col gap-4",
					children: [/* @__PURE__ */ jsx(ColorPickerHueSlider, {}), /* @__PURE__ */ jsx(ColorPickerAlphaSlider, {})]
				})]
			}),
			/* @__PURE__ */ jsx(ColorPickerInput, {})
		] })]
	});
};
var loadedFonts = /* @__PURE__ */ new Set();
function FontDisplay({ name, url, type = "web" }) {
	const previewName = type === "local" ? name : `${name} Preview`;
	const containerRef = useRef(null);
	const [isLoaded, setIsLoaded] = useState(() => type === "local" || loadedFonts.has(previewName));
	const isInView = useInView(containerRef, {
		once: true,
		amount: .1,
		margin: "50px"
	});
	useEffect(() => {
		if (!isInView || isLoaded || !url) return;
		new FontFace(previewName, `url(${url})`, { display: "swap" }).load().then((loadedFace) => {
			if (!document.fonts.has(loadedFace)) document.fonts.add(loadedFace);
			loadedFonts.add(previewName);
			setIsLoaded(true);
		});
	}, [
		isInView,
		isLoaded,
		previewName,
		url
	]);
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		className: "inline",
		children: /* @__PURE__ */ jsx("span", {
			style: { fontFamily: isLoaded ? `'${previewName}', sans-serif` : "sans-serif" },
			className: cn(isLoaded ? "opacity-100" : "opacity-50", "transition-opacity duration-200 ease-in"),
			children: name
		})
	});
}
var localFontList = [
	{
		type: "local",
		category: "sans-serif",
		family: "Arial",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "sans-serif",
		family: "Calibri",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "sans-serif",
		family: "Helvetica",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "sans-serif",
		family: "Tahoma",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "sans-serif",
		family: "Trebuchet MS",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "sans-serif",
		family: "Verdana",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "serif",
		family: "Bookman",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "serif",
		family: "Cambria",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "serif",
		family: "Garamond",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "serif",
		family: "Georgia",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "serif",
		family: "Palatino",
		weights: [
			"400",
			"600",
			"700"
		]
	},
	{
		type: "local",
		category: "serif",
		family: "Times New Roman",
		weights: [
			"400",
			"600",
			"700"
		]
	}
];
var webFontList = webfontlist_default;
function buildWebFontMap() {
	const webFontMap$1 = /* @__PURE__ */ new Map();
	for (const font of webFontList) webFontMap$1.set(font.family, font);
	return webFontMap$1;
}
var webFontMap = buildWebFontMap();
function getNextWeight(fontFamily) {
	const fontData = webFontMap.get(fontFamily);
	if (!fontData || !Array.isArray(fontData.weights) || fontData.weights.length === 0) return null;
	if (fontData.weights.includes("400")) return "400";
	return fontData.weights[0];
}
function FontFamilyCombobox({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox, {
		options: useMemo(() => {
			return [...localFontList, ...webFontList].map((font) => ({
				value: font.family,
				keywords: [font.family],
				label: /* @__PURE__ */ jsx(FontDisplay, {
					name: font.family,
					type: font.type,
					url: "preview" in font ? font.preview : void 0
				})
			}));
		}, []),
		className: cn("w-full", className),
		...props
	});
}
function FontWeightCombobox({ fontFamily, ...props }) {
	return /* @__PURE__ */ jsx(MultipleCombobox, {
		options: useMemo(() => {
			const fontData = webFontMap.get(fontFamily);
			let weights = [];
			if (!fontData || !Array.isArray(fontData.weights)) weights = [
				"100",
				"200",
				"300",
				"400",
				"500",
				"600",
				"700",
				"800",
				"900"
			];
			else weights = fontData.weights;
			return weights.map((variant) => ({
				value: variant,
				label: variant,
				keywords: [variant]
			}));
		}, [fontFamily]),
		...props
	});
}
function ReviewDrawer({ result }) {
	const showDrawer = useResumeStore((state) => state.showReviewDrawer);
	const setShowDrawer = useResumeStore((state) => state.setShowReviewDrawer);
	const [showDetails, setShowDetails] = useState(false);
	const getStatusColor = () => {
		if (result.final_verdict === "READY") return "text-green-600 bg-green-50 border-green-200";
		if (result.final_verdict === "NEEDS_MINOR_FIXES") return "text-orange-600 bg-orange-50 border-orange-200";
		return "text-red-600 bg-red-50 border-red-200";
	};
	const getStatusText = () => {
		if (result.final_verdict === "READY") return "Ready to Export";
		if (result.final_verdict === "NEEDS_MINOR_FIXES") return "Needs Minor Fixes";
		return "Needs Major Work";
	};
	return /* @__PURE__ */ jsx(AnimatePresence$1, { children: showDrawer && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(motion$1.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2 },
		className: "fixed inset-0 z-100 bg-black/20 backdrop-blur-sm",
		onClick: () => setShowDrawer(false)
	}), /* @__PURE__ */ jsx(motion$1.div, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 200
		},
		className: "fixed top-0 right-0 z-101 h-full w-full max-w-md border-l bg-background shadow-2xl sm:max-w-lg",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex h-full flex-col",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-b p-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-semibold text-xl",
							children: /* @__PURE__ */ jsx(Trans, { id: "aRzppY" })
						}), /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground text-sm",
							children: /* @__PURE__ */ jsx(Trans, { id: "rBZOs8" })
						})]
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setShowDrawer(false),
						"aria-label": "Close drawer",
						children: /* @__PURE__ */ jsx(XIcon, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto p-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-medium text-sm",
										children: /* @__PURE__ */ jsx(Trans, { id: "BrqWf+" })
									}), /* @__PURE__ */ jsxs("span", {
										className: "font-bold text-2xl",
										children: [result.overall_score, "/100"]
									})]
								}), /* @__PURE__ */ jsx(Badge, {
									className: cn("w-full justify-center py-2 text-sm", getStatusColor()),
									children: getStatusText()
								})]
							}),
							/* @__PURE__ */ jsx(Separator$1, {}),
							result.critical.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(ShieldWarningIcon, {
											className: "h-5 w-5 text-red-600",
											weight: "fill"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-semibold text-red-600 text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "VdRooq" })
										}),
										/* @__PURE__ */ jsx(Badge, {
											variant: "destructive",
											className: "ml-auto",
											children: result.critical.length
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-2 rounded-lg border border-red-200 bg-red-50 p-3",
									children: result.critical.map((issue, index) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-2 text-red-900 text-sm",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mt-0.5",
											children: "•"
										}), /* @__PURE__ */ jsx("span", {
											className: "flex-1",
											children: issue
										})]
									}, index))
								})]
							}),
							result.important.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(WarningCircleIcon, {
											className: "h-5 w-5 text-orange-600",
											weight: "fill"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-semibold text-orange-600 text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "mWLhp4" })
										}),
										/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "ml-auto border-orange-600 text-orange-600",
											children: result.important.length
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-2 rounded-lg border border-orange-200 bg-orange-50 p-3",
									children: result.important.map((issue, index) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-2 text-orange-900 text-sm",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mt-0.5",
											children: "•"
										}), /* @__PURE__ */ jsx("span", {
											className: "flex-1",
											children: issue
										})]
									}, index))
								})]
							}),
							result.suggestions.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(LightbulbIcon, {
											className: "h-5 w-5 text-blue-600",
											weight: "fill"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-semibold text-blue-600 text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "8J32PY" })
										}),
										/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "ml-auto border-blue-600 text-blue-600",
											children: result.suggestions.length
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3",
									children: result.suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-2 text-blue-900 text-sm",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mt-0.5",
											children: "•"
										}), /* @__PURE__ */ jsx("span", {
											className: "flex-1",
											children: suggestion
										})]
									}, index))
								})]
							}),
							result.strengths.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(CheckCircleIcon, {
											className: "h-5 w-5 text-green-600",
											weight: "fill"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-semibold text-green-600 text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "RJ4tIk" })
										}),
										/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "ml-auto border-green-600 text-green-600",
											children: result.strengths.length
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-2 rounded-lg border border-green-200 bg-green-50 p-3",
									children: result.strengths.map((strength, index) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-2 text-green-900 text-sm",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mt-0.5",
											children: "•"
										}), /* @__PURE__ */ jsx("span", {
											className: "flex-1",
											children: strength
										})]
									}, index))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "w-full justify-between",
									onClick: () => setShowDetails(!showDetails),
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-medium text-sm",
										children: /* @__PURE__ */ jsx(Trans, { id: "/xd7dM" })
									}), /* @__PURE__ */ jsx(motion$1.span, {
										animate: { rotate: showDetails ? 180 : 0 },
										transition: { duration: .2 },
										children: "▼"
									})]
								}), /* @__PURE__ */ jsx(AnimatePresence$1, { children: showDetails && /* @__PURE__ */ jsx(motion$1.div, {
									initial: {
										height: 0,
										opacity: 0
									},
									animate: {
										height: "auto",
										opacity: 1
									},
									exit: {
										height: 0,
										opacity: 0
									},
									transition: { duration: .2 },
									className: "overflow-hidden",
									children: /* @__PURE__ */ jsxs("div", {
										className: "space-y-3 rounded-lg border bg-muted/30 p-3",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
												className: "font-medium text-sm",
												children: [/* @__PURE__ */ jsx(Trans, { id: "38rDfe" }), ":"]
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-muted-foreground text-sm",
												children: result.detailed_checks.photo_verdict
											})] }),
											/* @__PURE__ */ jsx(Separator$1, {}),
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
												className: "font-medium text-sm",
												children: [/* @__PURE__ */ jsx(Trans, { id: "R3LyB2" }), ":"]
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-muted-foreground text-sm",
												children: result.detailed_checks.link_status
											})] }),
											/* @__PURE__ */ jsx(Separator$1, {}),
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
												className: "font-medium text-sm",
												children: [/* @__PURE__ */ jsx(Trans, { id: "s2/eHv" }), ":"]
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-muted-foreground text-sm",
												children: result.detailed_checks.grammar_tense
											})] })
										]
									})
								}) })]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "border-t p-4",
					children: /* @__PURE__ */ jsx(Button, {
						onClick: () => setShowDrawer(false),
						className: "w-full",
						children: /* @__PURE__ */ jsx(Trans, { id: "Veyccc" })
					})
				})
			]
		})
	})] }) });
}
function AnimatedEyes() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex h-4 items-center gap-1",
		children: [0, 1].map((eye) => /* @__PURE__ */ jsxs("div", {
			className: "relative h-4 w-4 overflow-hidden rounded-full bg-white",
			children: [/* @__PURE__ */ jsx(motion$1.div, {
				className: "absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black",
				animate: { x: [
					-3,
					3,
					-3
				] },
				transition: {
					repeat: Infinity,
					duration: 1.8,
					ease: "easeInOut"
				}
			}), /* @__PURE__ */ jsx(motion$1.div, {
				className: "absolute top-0 left-0 h-full w-full bg-indigo-600",
				animate: { y: [
					"-100%",
					"0%",
					"-100%"
				] },
				transition: {
					repeat: Infinity,
					duration: .5,
					repeatDelay: 6,
					ease: "easeInOut"
				}
			})]
		}, eye))
	});
}
function DeadEyes() {
	return /* @__PURE__ */ jsx(motion$1.div, {
		initial: { rotate: 0 },
		animate: { rotate: [
			-3,
			3,
			-3
		] },
		transition: {
			repeat: Infinity,
			duration: 2,
			ease: "easeInOut"
		},
		className: "flex items-center gap-1",
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative flex h-5 w-8 items-center justify-center rounded-full bg-gray-200",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute top-1 left-1 font-bold text-[8px] text-gray-600",
					children: "×"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute top-1 right-1 font-bold text-[8px] text-gray-600",
					children: "×"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute bottom-0 flex items-end justify-center",
					children: /* @__PURE__ */ jsx("div", { className: "h-2 w-3 rounded-b-full bg-gray-700" })
				}),
				/* @__PURE__ */ jsx(motion$1.div, {
					className: "absolute bottom-[-3px] h-2 w-2 rounded-full bg-pink-400",
					animate: { y: [
						0,
						1.5,
						0
					] },
					transition: {
						repeat: Infinity,
						duration: 1,
						ease: "easeInOut"
					}
				})
			]
		})
	});
}
function BuilderTopTray() {
	const { i18n: i18n$1 } = useLingui();
	const openDialog = useDialogStore((state) => state.openDialog);
	const params = useParams({ from: "/builder/$resumeId" });
	const { data: resume } = useQuery({
		queryKey: ["resumes", params.resumeId],
		queryFn: () => api.fetchResume(params.resumeId)
	});
	const { mutateAsync: exportResume, isPending: isPrinting } = useMutation({ mutationFn: (data) => api.exportResume(data.id, data.format) });
	const { mutateAsync: runFinalReview } = useMutation({ mutationFn: api.generateAIContent });
	const setShowReviewDrawer = useResumeStore((state) => state.setShowReviewDrawer);
	const setReviewing = useResumeStore((state) => state.setReviewing);
	const setReviewResult = useResumeStore((state) => state.setReviewResult);
	const isReviewing = useResumeStore((state) => state.isReviewing);
	const reviewResult = useResumeStore((state) => state.reviewResult);
	const reviewAttempts = useResumeStore((state) => state.reviewAttempts);
	const incrementReviewAttempts = useResumeStore((state) => state.incrementReviewAttempts);
	const [reviewStartTime, setReviewStartTime] = useState(0);
	const fallbackTimeoutRef = useRef(null);
	const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
	const [showLastAttemptConfirm, setShowLastAttemptConfirm] = useState(false);
	useEffect(() => {
		return () => {
			if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
		};
	}, []);
	const onFinalReview = async () => {
		if (!resume) return;
		if (reviewAttempts >= 2) {
			if (isMobile) toast.error("🚫 Review limit reached. Resets at 12 AM.");
			return;
		}
		if (reviewAttempts === 1 && isMobile && !showLastAttemptConfirm) {
			setShowLastAttemptConfirm(true);
			return;
		}
		incrementReviewAttempts();
		setReviewing(true);
		setReviewStartTime(Date.now());
		const toastId = toast.loading(i18n$1._(i18n._({ id: "ai.review.loading" })), { description: i18n$1._(i18n._({ id: "ai.review.loading.description" })) });
		fallbackTimeoutRef.current = setTimeout(() => {
			if (isReviewing) toast.loading(i18n._({ id: "P4XZdE" }), {
				id: toastId,
				description: i18n._({ id: "ZnJ2R8" })
			});
		}, 6e3);
		try {
			const response = await runFinalReview({
				resume_id: resume.id,
				type: "FinalReview",
				value: "string"
			});
			const reviewRaw = response.FinalReview || Object.values(response)[0];
			if (!reviewRaw) throw new Error("No review result received from AI");
			let result;
			if (typeof reviewRaw === "string") try {
				result = JSON.parse(reviewRaw);
			} catch (e) {
				console.error("Failed to parse Final Review result:", e);
				throw new Error("Invalid review format received from AI");
			}
			else if (typeof reviewRaw === "object" && reviewRaw !== null) result = reviewRaw;
			else throw new Error("Invalid review format received from AI");
			const elapsedTime = Date.now() - reviewStartTime;
			const remainingTime = Math.max(0, 1200 - elapsedTime);
			await new Promise((resolve) => setTimeout(resolve, remainingTime));
			if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
			setReviewing(false);
			setReviewResult(result);
			setShowReviewDrawer(true);
			toast.success(i18n._({ id: "I74nVJ" }), {
				id: toastId,
				description: i18n._({
					id: "morsMQ",
					values: {
						0: result.overall_score,
						1: result.final_verdict === "READY" ? "Ready to export!" : "Check suggestions for improvements"
					}
				})
			});
		} catch (error) {
			if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
			setReviewing(false);
			console.error("Final Review Error:", error);
			toast.error(i18n$1._(i18n._({ id: "ai.review.error" })), {
				id: toastId,
				description: error.message || i18n$1._(i18n._({ id: "ai.review.error.description" }))
			});
		}
	};
	const onDownloadPDF = async () => {
		if (!resume?.id) return;
		const filename = generateFilename(resume.data.basics.name, "pdf");
		const toastId = toast.loading(i18n._({ id: "UC7fTw" }), { description: i18n._({ id: "TNAt2N" }) });
		try {
			const { url } = await exportResume({
				id: resume.id,
				format: "pdf"
			});
			downloadFromUrl(url, filename);
		} catch {
			toast.error(i18n._({ id: "5VU+Oa" }));
		} finally {
			toast.dismiss(toastId);
		}
	};
	const onDownloadDocx = async () => {
		if (!resume?.id) return;
		const filename = generateFilename(resume.data.basics.name, "docx");
		const toastId = toast.loading(i18n._({ id: "ttosDi" }), { description: i18n._({ id: "TNAt2N" }) });
		try {
			const { url } = await exportResume({
				id: resume.id,
				format: "docx"
			});
			downloadFromUrl(url, filename);
		} catch {
			toast.error(i18n._({ id: "ykXI++" }));
		} finally {
			toast.dismiss(toastId);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-end gap-1 overflow-visible sm:gap-2",
		children: [
			/* @__PURE__ */ jsxs(Popover$1, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Button, {
					size: "sm",
					variant: "outline",
					className: "h-8 shrink-0 gap-1.5 px-2 sm:h-9 sm:gap-2 sm:px-3",
					"aria-label": "Colors",
					children: [/* @__PURE__ */ jsx(PaletteIcon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
						className: "hidden lg:inline",
						children: /* @__PURE__ */ jsx(Trans, { id: "1HfW/F" })
					})]
				})
			}), /* @__PURE__ */ jsxs(PopoverContent, {
				className: "w-[90vw] max-w-[min(400px,95vw)] p-3 sm:w-100 sm:p-4",
				onOpenAutoFocus: (e) => e.preventDefault(),
				side: "bottom",
				align: "center",
				sideOffset: 8,
				children: [/* @__PURE__ */ jsx(PopoverHeader, { children: /* @__PURE__ */ jsx(PopoverTitle, {
					className: "text-sm sm:text-base",
					children: /* @__PURE__ */ jsx(Trans, { id: "pXAaMd" })
				}) }), /* @__PURE__ */ jsx(ColorsPopoverContent, {})]
			})] }),
			/* @__PURE__ */ jsxs(Popover$1, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Button, {
					size: "sm",
					variant: "outline",
					className: "h-8 shrink-0 gap-1.5 px-2 sm:h-9 sm:gap-2 sm:px-3",
					"aria-label": "Fonts",
					children: [/* @__PURE__ */ jsx(TextTIcon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
						className: "hidden lg:inline",
						children: /* @__PURE__ */ jsx(Trans, { id: "I0oBSl" })
					})]
				})
			}), /* @__PURE__ */ jsxs(PopoverContent, {
				className: "w-[90vw] max-w-[min(300px,95vw)] p-3 sm:mr-2 sm:w-100 sm:p-4",
				side: "bottom",
				align: "center",
				sideOffset: 8,
				children: [/* @__PURE__ */ jsx(PopoverHeader, { children: /* @__PURE__ */ jsx(PopoverTitle, {
					className: "text-sm sm:text-base",
					children: /* @__PURE__ */ jsx(Trans, { id: "+ehU7j" })
				}) }), /* @__PURE__ */ jsx(TypographyPopoverContent, {})]
			})] }),
			/* @__PURE__ */ jsxs(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => openDialog("resume.template.gallery", void 0),
				className: "h-8 shrink-0 gap-1.5 px-2 sm:h-9 sm:gap-2 sm:px-3",
				"aria-label": "Templates",
				children: [/* @__PURE__ */ jsx(SwapIcon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
					className: "hidden lg:inline",
					children: /* @__PURE__ */ jsx(Trans, { id: "iTylMl" })
				})]
			}),
			/* @__PURE__ */ jsxs(Tooltip$1, { children: [
				/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("div", {
						className: "shrink-0",
						children: /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							variant: "outline",
							className: cn("flex shrink-0 items-center justify-center gap-1.5 px-2 sm:h-9 sm:w-auto sm:gap-2 sm:px-3", "border-0 shadow-sm transition-all duration-300", "!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white", "hover:!from-indigo-700 hover:!to-purple-700", isReviewing && "scale-[0.98] brightness-90", reviewAttempts >= 2 && "!bg-gray-400 !text-white hover:!bg-gray-400 cursor-not-allowed"),
							onClick: onFinalReview,
							children: [isReviewing ? /* @__PURE__ */ jsx(CircleNotchIcon, { className: "animate-spin" }) : reviewAttempts >= 2 ? /* @__PURE__ */ jsx(DeadEyes, {}) : /* @__PURE__ */ jsx(motion$1.div, {
								whileHover: { scale: 1.1 },
								children: /* @__PURE__ */ jsx(AnimatedEyes, {})
							}), /* @__PURE__ */ jsx("span", {
								className: "hidden lg:inline",
								children: /* @__PURE__ */ jsx(Trans, { id: "aRzppY" })
							})]
						})
					})
				}),
				reviewAttempts === 1 && /* @__PURE__ */ jsxs(TooltipContent, { children: ["⚠️ ", /* @__PURE__ */ jsx(Trans, { id: "q9JzwU" })] }),
				reviewAttempts >= 2 && /* @__PURE__ */ jsxs(TooltipContent, { children: ["🚫 ", /* @__PURE__ */ jsx(Trans, { id: "FSsMMs" })] })
			] }),
			reviewResult && !isReviewing && /* @__PURE__ */ jsxs(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => setShowReviewDrawer(true),
				className: "h-8 shrink-0 gap-1.5 px-2 sm:h-9 sm:gap-2 sm:px-3",
				"aria-label": "View Last Review",
				title: "View your last review results",
				children: [/* @__PURE__ */ jsx(ShieldWarningIcon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
					className: "hidden lg:inline",
					children: /* @__PURE__ */ jsx(Trans, { id: "NF91Wb" })
				})]
			}),
			/* @__PURE__ */ jsxs(DropdownMenu$1, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Button, {
					size: "sm",
					variant: "default",
					disabled: isPrinting,
					className: "flex shrink-0 items-center justify-center gap-1.5 bg-emerald-600 px-2 text-white hover:bg-emerald-700 sm:h-9 sm:w-auto sm:gap-2 sm:px-3",
					"aria-label": "Download",
					children: [isPrinting ? /* @__PURE__ */ jsx(CircleNotchIcon, { className: cn("animate-spin") }) : /* @__PURE__ */ jsx(DownloadSimpleIcon, {}), /* @__PURE__ */ jsx("span", {
						className: "hidden lg:inline",
						children: /* @__PURE__ */ jsx(Trans, { id: "mzI/c+" })
					})]
				})
			}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
				align: "end",
				className: "min-w-35",
				children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: onDownloadPDF,
					disabled: isPrinting,
					children: [/* @__PURE__ */ jsx(FilePdfIcon, { className: "size-4 text-red-500" }), /* @__PURE__ */ jsx(Trans, { id: "KMdYRY" })]
				}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: onDownloadDocx,
					children: [/* @__PURE__ */ jsx(MicrosoftWordLogoIcon, { className: "size-4 text-blue-600" }), /* @__PURE__ */ jsx(Trans, { id: "aNGX9X" })]
				})]
			})] }),
			reviewResult && /* @__PURE__ */ jsx(ReviewDrawer, { result: reviewResult })
		]
	}), /* @__PURE__ */ jsx(AlertDialog$1, {
		open: showLastAttemptConfirm,
		onOpenChange: setShowLastAttemptConfirm,
		children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "⚠️ Only 1 attempt left" }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This is your final review attempt for today. Do you want to continue?" })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "No" }), /* @__PURE__ */ jsx(AlertDialogAction, {
			onClick: () => {
				setShowLastAttemptConfirm(false);
				onFinalReview();
			},
			children: "Yes, Continue"
		})] })] })
	})] });
}
function ColorsPopoverContent() {
	const colors = useResumeStore((state) => state.resume.data.metadata.design.colors);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const setColor = (key, value) => {
		updateResumeData((draft) => {
			draft.metadata.design.colors[key] = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3 sm:space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5 sm:space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "6RmHKN" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(ColorPicker, {
						value: colors.primary,
						onValueChange: (value) => setColor("primary", value)
					}), /* @__PURE__ */ jsx(Input, {
						value: colors.primary,
						onChange: (e) => setColor("primary", e.target.value),
						className: "text-xs sm:text-sm"
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5 sm:space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "HmA4Lf" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(ColorPicker, {
						value: colors.text,
						onValueChange: (value) => setColor("text", value)
					}), /* @__PURE__ */ jsx(Input, {
						value: colors.text,
						onChange: (e) => setColor("text", e.target.value),
						className: "text-xs sm:text-sm"
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5 sm:space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "k1bLf+" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(ColorPicker, {
						value: colors.background,
						onValueChange: (value) => setColor("background", value)
					}), /* @__PURE__ */ jsx(Input, {
						value: colors.background,
						onChange: (e) => setColor("background", e.target.value),
						className: "text-xs sm:text-sm"
					})]
				})]
			})
		]
	});
}
function TypographyPopoverContent() {
	const typography = useResumeStore((state) => state.resume.data.metadata.typography);
	const colors = useResumeStore((state) => state.resume.data.metadata.design.colors);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const updateBody = (data) => {
		updateResumeData((draft) => {
			draft.metadata.typography.body = {
				...draft.metadata.typography.body,
				...data
			};
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-muted-foreground text-xs tracking-wide",
					children: /* @__PURE__ */ jsx(Trans, { id: "X+U6/w" })
				}), /* @__PURE__ */ jsx(FontFamilyCombobox, {
					buttonProps: { className: "w-full" },
					value: typography.body.fontFamily,
					onValueChange: (value) => {
						if (value === null) return;
						const nextWeight = getNextWeight(value);
						updateBody({
							fontFamily: value,
							fontWeights: nextWeight ? [nextWeight] : typography.body.fontWeights
						});
					}
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-muted-foreground text-xs tracking-wide",
					children: /* @__PURE__ */ jsx(Trans, { id: "eD/eCt" })
				}), /* @__PURE__ */ jsx(FontWeightCombobox, {
					buttonProps: {
						variant: "ghost",
						className: "w-full"
					},
					fontFamily: typography.body.fontFamily,
					value: typography.body.fontWeights,
					onValueChange: (weights) => {
						updateBody({ fontWeights: weights });
					}
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5 sm:space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "Cj2Gtd" })
				}), /* @__PURE__ */ jsxs(InputGroup, { children: [
					/* @__PURE__ */ jsx(InputGroupInput, {
						type: "number",
						min: 6,
						max: 24,
						step: .1,
						value: typography.body.fontSize,
						onChange: (e) => {
							const parsed = Number(e.target.value);
							if (Number.isNaN(parsed)) return;
							updateBody({ fontSize: parsed });
						}
					}),
					/* @__PURE__ */ jsx(ColorPicker, {
						value: colors.text,
						onValueChange: (color) => {
							updateResumeData((draft) => {
								draft.metadata.design.colors.text = color;
							});
						}
					}),
					/* @__PURE__ */ jsx(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ jsx(InputGroupText, {
							className: "text-xs sm:text-sm",
							children: /* @__PURE__ */ jsx(Trans, { id: "qdSiBE" })
						})
					})
				] })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5 sm:space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[10px] text-muted-foreground tracking-wide sm:text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "DVnBSM" })
				}), /* @__PURE__ */ jsxs(InputGroup, { children: [/* @__PURE__ */ jsx(InputGroupInput, {
					type: "number",
					min: 1,
					max: 3,
					step: .01,
					value: typography.body.lineHeight ?? 1.4,
					onChange: (e) => {
						const parsed = Number(e.target.value);
						if (Number.isNaN(parsed)) return;
						updateBody({ lineHeight: parsed });
					}
				}), /* @__PURE__ */ jsx(InputGroupAddon, {
					align: "inline-end",
					children: /* @__PURE__ */ jsx(InputGroupText, {
						className: "text-xs sm:text-sm",
						children: /* @__PURE__ */ jsx(Trans, { id: "AGs4zr" })
					})
				})] })]
			})]
		})]
	});
}
function BuilderHeader() {
	const isMobile = useIsMobile();
	const toggleSidebar = useBuilderSidebar((state) => state.toggleSidebar);
	const isLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.isLeftSidebarCollapsed);
	const setLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.setLeftSidebarCollapsed);
	const handleToggle = () => {
		if (isMobile) setLeftSidebarCollapsed(!isLeftSidebarCollapsed);
		else toggleSidebar("left");
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "z-10 flex shrink-0 items-center justify-between gap-2 border-gray-200 border-b bg-white px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-6",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex items-center",
			children: /* @__PURE__ */ jsx(Button, {
				size: "icon",
				variant: "ghost",
				onClick: handleToggle,
				className: "h-8 w-8 sm:h-10 sm:w-10",
				"aria-label": "Toggle sidebar",
				children: /* @__PURE__ */ jsx(SidebarSimpleIcon, { className: "h-5 w-5 sm:h-6 sm:w-6" })
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-x-auto",
			children: /* @__PURE__ */ jsx(BuilderTopTray, {})
		})]
	});
}
var SortableItemContext = createContext(null);
function useSortableItem() {
	return useContext(SortableItemContext);
}
function SortableItem({ id, children, className, asHandle = false }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		zIndex: isDragging ? 10 : 1,
		position: "relative"
	};
	const dragListeners = useMemo(() => {
		if (!listeners || !asHandle) return listeners;
		const wrappedListeners = { ...listeners };
		for (const key in wrappedListeners) {
			const originalListener = wrappedListeners[key];
			wrappedListeners[key] = (event) => {
				event.stopPropagation();
				return originalListener?.(event);
			};
		}
		return wrappedListeners;
	}, [listeners, asHandle]);
	const contextValue = useMemo(() => ({
		attributes,
		listeners: dragListeners,
		isDragging
	}), [
		attributes,
		dragListeners,
		isDragging
	]);
	return /* @__PURE__ */ jsx(SortableItemContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx("div", {
			ref: setNodeRef,
			style,
			className: cn(className, isDragging && "z-50 opacity-50", asHandle && "cursor-grab active:cursor-grabbing"),
			...asHandle ? attributes : {},
			...asHandle ? dragListeners : {},
			children
		})
	});
}
function DragHandle({ className, children }) {
	const context = useSortableItem();
	if (!context) return null;
	const { attributes, listeners } = context;
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: cn("flex cursor-grab touch-none items-center justify-center active:cursor-grabbing", className),
		...attributes,
		...listeners,
		children: children || /* @__PURE__ */ jsx(DotsSixVerticalIcon, {
			size: 16,
			className: "text-gray-400"
		})
	});
}
var dropAnimation = { ...defaultDropAnimation };
function SortableList({ items, onReorder, renderItem, renderOverlay, keyExtractor, className }) {
	const [activeId, setActiveId] = useState(null);
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const activeItem = items.find((item) => keyExtractor(item) === activeId);
	function handleDragStart(event) {
		setActiveId(event.active.id);
	}
	function handleDragEnd(event) {
		const { active, over } = event;
		if (over && active.id !== over.id) onReorder(arrayMove(items, items.findIndex((item) => keyExtractor(item) === active.id.toString()), items.findIndex((item) => keyExtractor(item) === over.id.toString())));
		setActiveId(null);
	}
	return /* @__PURE__ */ jsxs(DndContext, {
		sensors,
		collisionDetection: closestCenter,
		onDragStart: handleDragStart,
		onDragEnd: handleDragEnd,
		modifiers: [restrictToVerticalAxis],
		children: [/* @__PURE__ */ jsx(SortableContext, {
			items: items.map(keyExtractor),
			strategy: verticalListSortingStrategy,
			children: /* @__PURE__ */ jsx("div", {
				className,
				children: items.map((item) => renderItem(item))
			})
		}), createPortal(/* @__PURE__ */ jsx(DragOverlay, {
			dropAnimation,
			modifiers: [restrictToVerticalAxis],
			children: activeId && activeItem ? renderOverlay ? renderOverlay(activeItem) : renderItem(activeItem) : null
		}), document.body)]
	});
}
var [AccordionProvider, useAccordion] = getStrictContext("AccordionContext");
var [AccordionItemProvider, useAccordionItem] = getStrictContext("AccordionItemContext");
function Accordion$2(props) {
	const [value, setValue] = useControlledState({
		value: props?.value,
		defaultValue: props?.defaultValue,
		onChange: props?.onValueChange
	});
	return /* @__PURE__ */ jsx(AccordionProvider, {
		value: {
			value,
			setValue
		},
		children: /* @__PURE__ */ jsx(Accordion.Root, {
			"data-slot": "accordion",
			...props,
			onValueChange: setValue
		})
	});
}
function AccordionItem$1(props) {
	const { value } = useAccordion();
	const [isOpen, setIsOpen] = React.useState(value?.includes(props?.value) ?? false);
	React.useEffect(() => {
		setIsOpen(value?.includes(props?.value) ?? false);
	}, [value, props?.value]);
	return /* @__PURE__ */ jsx(AccordionItemProvider, {
		value: {
			isOpen,
			setIsOpen,
			value: props.value
		},
		children: /* @__PURE__ */ jsx(Accordion.Item, {
			"data-slot": "accordion-item",
			...props
		})
	});
}
function AccordionHeader(props) {
	return /* @__PURE__ */ jsx(Accordion.Header, {
		"data-slot": "accordion-header",
		...props
	});
}
function AccordionTrigger$1(props) {
	return /* @__PURE__ */ jsx(Accordion.Trigger, {
		"data-slot": "accordion-trigger",
		...props
	});
}
function AccordionContent$1({ keepRendered = false, transition = {
	duration: .35,
	ease: "easeInOut"
}, ...props }) {
	const { isOpen } = useAccordionItem();
	return /* @__PURE__ */ jsx(AnimatePresence, { children: keepRendered ? /* @__PURE__ */ jsx(Accordion.Content, {
		asChild: true,
		forceMount: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "accordion-content",
			initial: {
				height: 0,
				opacity: 0,
				"--mask-stop": "0%",
				y: 20
			},
			animate: isOpen ? {
				height: "auto",
				opacity: 1,
				"--mask-stop": "100%",
				y: 0
			} : {
				height: 0,
				opacity: 0,
				"--mask-stop": "0%",
				y: 20
			},
			transition,
			style: {
				maskImage: "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
				WebkitMaskImage: "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
				overflow: "hidden"
			},
			...props
		}, "accordion-content")
	}) : isOpen && /* @__PURE__ */ jsx(Accordion.Content, {
		asChild: true,
		forceMount: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			"data-slot": "accordion-content",
			initial: {
				height: 0,
				opacity: 0,
				"--mask-stop": "0%",
				y: 20
			},
			animate: {
				height: "auto",
				opacity: 1,
				"--mask-stop": "100%",
				y: 0
			},
			exit: {
				height: 0,
				opacity: 0,
				"--mask-stop": "0%",
				y: 20
			},
			transition,
			style: {
				maskImage: "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
				WebkitMaskImage: "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
				overflow: "hidden"
			},
			...props
		}, "accordion-content")
	}) });
}
function Accordion$1(props) {
	return /* @__PURE__ */ jsx(Accordion$2, { ...props });
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(AccordionItem$1, {
		className: cn(className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(AccordionHeader, {
		className: "flex",
		children: /* @__PURE__ */ jsx(AccordionTrigger$1, {
			className: cn("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-start font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=closed]>svg]:rotate-0 [&[data-state=open]>svg]:rotate-90 [&[data-state=open]>svg]:transition-transform", className),
			...props,
			children
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(AccordionContent$1, {
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("pt-0 pb-4 text-sm", className),
			children
		})
	});
}
const useSectionStore = create()(persist(immer((set) => ({
	sections: {},
	setCollapsed: (id, collapsed) => {
		set((state) => {
			state.sections[id] = { collapsed };
		});
	},
	toggleCollapsed: (id) => {
		set((state) => {
			const current = state.sections[id]?.collapsed ?? false;
			state.sections[id] = { collapsed: !current };
		});
	},
	toggleAll: () => {
		set((state) => {
			[...leftSidebarSections, ...rightSidebarSections].forEach((id) => {
				const current = state.sections[id]?.collapsed ?? false;
				state.sections[id] = { collapsed: !current };
			});
		});
	}
})), {
	name: "section-store",
	storage: createJSONStorage(() => localStorage),
	partialize: (state) => ({ sections: state.sections })
}));
function SectionDropdownMenu({ type }) {
	const prompt = usePrompt();
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const section = useResumeStore((state) => type === "summary" ? state.resume.data.summary : state.resume.data.sections[type]);
	const onAddItem = () => {
		if (type === "summary") return;
		openDialog(`resume.sections.${type}.create`, void 0);
	};
	const onToggleVisibility = () => {
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.hidden = !draft.summary.hidden;
			else draft.sections[type].hidden = !draft.sections[type].hidden;
		});
	};
	const onRenameSection = async () => {
		const newTitle = await prompt(i18n._({ id: "iExfqZ" }), {
			description: i18n._({ id: "SnHJLz" }),
			defaultValue: section.title
		});
		if (newTitle === null || newTitle === section.title) return;
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.title = newTitle ?? "";
			else draft.sections[type].title = newTitle ?? "";
		});
	};
	const onReset = async () => {
		if (!await confirm("Are you sure you want to reset this section?", {
			description: "This will remove all items from this section.",
			confirmText: "Reset",
			cancelText: "Cancel"
		})) return;
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.content = "";
			else draft.sections[type].items = [];
		});
	};
	return /* @__PURE__ */ jsxs(DropdownMenu$1, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			size: "icon",
			variant: "ghost",
			children: /* @__PURE__ */ jsx(ListIcon, {})
		})
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "end",
		children: [
			type !== "summary" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
				onSelect: onAddItem,
				children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "rvNS8V" })]
			}) }), /* @__PURE__ */ jsx(DropdownMenuSeparator, {})] }),
			/* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
				onSelect: onToggleVisibility,
				children: [section.hidden ? /* @__PURE__ */ jsx(EyeIcon, {}) : /* @__PURE__ */ jsx(EyeClosedIcon, {}), section.hidden ? /* @__PURE__ */ jsx(Trans, { id: "8vETh9" }) : /* @__PURE__ */ jsx(Trans, { id: "vLyv1R" })]
			}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
				onSelect: onRenameSection,
				children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "2wxgft" })]
			})] }),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
				variant: "destructive",
				onSelect: onReset,
				children: [/* @__PURE__ */ jsx(BroomIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "OfhWJH" })]
			}) })
		]
	})] });
}
function SectionBase({ type, className, ...props }) {
	const section = useResumeStore((state) => {
		if (type === "basics") return state.resume.data.basics;
		if (type === "summary") return state.resume.data.summary;
		if (type === "picture") return state.resume.data.picture;
		if (type === "custom") return state.resume.data.customSections;
		return state.resume.data.sections[type];
	});
	const isHidden = "hidden" in section && section.hidden;
	const collapsed = useSectionStore((state) => state.sections[type]?.collapsed ?? false);
	const toggleCollapsed = useSectionStore((state) => state.toggleCollapsed);
	return /* @__PURE__ */ jsx(Accordion$1, {
		collapsible: true,
		type: "single",
		id: `sidebar-${type}`,
		value: collapsed ? "" : type,
		onValueChange: () => toggleCollapsed(type),
		className: cn("space-y-3 sm:space-y-4", isHidden && "opacity-50"),
		children: /* @__PURE__ */ jsxs(AccordionItem, {
			value: type,
			className: "group/accordion space-y-3 sm:space-y-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1 lg:gap-2",
				children: [
					/* @__PURE__ */ jsx(DragHandle, { className: "mr-1 lg:mr-2" }),
					/* @__PURE__ */ jsx(AccordionTrigger, {
						asChild: true,
						className: "me-1 items-center justify-center lg:me-2",
						children: /* @__PURE__ */ jsx(Button, {
							size: "icon",
							variant: "ghost",
							className: "h-8 w-8 lg:h-10 lg:w-10",
							children: /* @__PURE__ */ jsx(CaretRightIcon, { className: "h-4 w-4 transition-transform group-data-[state=open]/accordion:rotate-90 lg:h-5 lg:w-5" })
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-1 items-center gap-x-1.5 lg:gap-x-4",
						children: [getSectionIcon(type), /* @__PURE__ */ jsx("h2", {
							className: "line-clamp-1 font-bold text-base tracking-tight lg:text-xl xl:text-2xl",
							children: "title" in section && section.title || getSectionTitle(type)
						})]
					}),
					![
						"picture",
						"basics",
						"custom"
					].includes(type) && /* @__PURE__ */ jsx(SectionDropdownMenu, { type })
				]
			}), /* @__PURE__ */ jsx(AccordionContent, {
				className: cn("overflow-hidden pb-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className),
				...props
			})]
		})
	});
}
init_string();
function isStandardSectionId(sectionId) {
	return [
		"profiles",
		"experience",
		"education",
		"projects",
		"skills",
		"languages",
		"interests",
		"awards",
		"certifications",
		"publications",
		"volunteer",
		"references"
	].includes(sectionId);
}
function getSourceSectionTitle(resumeData, type, customSectionId) {
	if (customSectionId) return resumeData.customSections.find((s) => s.id === customSectionId)?.title ?? getSectionTitle(type);
	return getSectionTitle(type);
}
function getCompatibleMoveTargets(resumeData, sourceType, sourceSectionId) {
	const { pages } = resumeData.metadata.layout;
	const result = [];
	for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
		const page = pages[pageIndex];
		const allSectionIds = [...page.main, ...page.sidebar];
		const compatibleSections = [];
		for (const sectionId of allSectionIds) {
			if (sectionId === sourceSectionId || sourceSectionId === void 0 && sectionId === sourceType) continue;
			if (isStandardSectionId(sectionId) && sectionId === sourceType) {
				compatibleSections.push({
					sectionId,
					sectionTitle: getSectionTitle(sectionId),
					isStandard: true
				});
				continue;
			}
			const customSection = resumeData.customSections.find((s) => s.id === sectionId);
			if (customSection && customSection.type === sourceType) compatibleSections.push({
				sectionId: customSection.id,
				sectionTitle: customSection.title,
				isStandard: false
			});
		}
		result.push({
			pageIndex,
			sections: compatibleSections
		});
	}
	return result;
}
function removeItemFromSource(draft, itemId, type, customSectionId) {
	if (customSectionId) {
		const section$1 = draft.customSections.find((s) => s.id === customSectionId);
		if (!section$1) return null;
		const index$1 = section$1.items.findIndex((item) => item.id === itemId);
		if (index$1 === -1) return null;
		const [removed$1] = section$1.items.splice(index$1, 1);
		return removed$1;
	}
	const section = draft.sections[type];
	if (!("items" in section)) return null;
	const index = section.items.findIndex((item) => item.id === itemId);
	if (index === -1) return null;
	const [removed] = section.items.splice(index, 1);
	return removed;
}
function addItemToSection(draft, item, targetSectionId, type) {
	if (isStandardSectionId(targetSectionId) && targetSectionId === type) {
		const section = draft.sections[type];
		if ("items" in section) section.items.push(item);
		return;
	}
	const customSection = draft.customSections.find((s) => s.id === targetSectionId);
	if (customSection) customSection.items.push(item);
}
function createCustomSectionWithItem(draft, item, type, sectionTitle, targetPageIndex) {
	const newSectionId = generateId();
	const newSection = {
		id: newSectionId,
		type,
		title: sectionTitle,
		columns: 1,
		hidden: false,
		items: [item]
	};
	draft.customSections.push(newSection);
	const page = draft.metadata.layout.pages[targetPageIndex];
	if (page) page.main.push(newSectionId);
	return newSectionId;
}
function createPageWithSection(draft, item, type, sectionTitle) {
	const newSectionId = generateId();
	const newSection = {
		id: newSectionId,
		type,
		title: sectionTitle,
		columns: 1,
		hidden: false,
		items: [item]
	};
	draft.customSections.push(newSection);
	draft.metadata.layout.pages.push({
		fullWidth: false,
		main: [newSectionId],
		sidebar: []
	});
}
function MoveItemSubmenu({ type, item, customSectionId }) {
	const resume = useResumeStore((state) => state.resume);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const moveTargets = useMemo(() => getCompatibleMoveTargets(resume.data, type, customSectionId), [
		resume.data,
		type,
		customSectionId
	]);
	const currentSectionTitle = useMemo(() => getSourceSectionTitle(resume.data, type, customSectionId), [
		resume.data,
		type,
		customSectionId
	]);
	const handleMoveToSection = (targetSectionId) => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			addItemToSection(draft, removedItem, targetSectionId, type);
		});
	};
	const handleNewSectionOnPage = (pageIndex) => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			createCustomSectionWithItem(draft, removedItem, type, currentSectionTitle, pageIndex);
		});
	};
	const handleNewPage = () => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			createPageWithSection(draft, removedItem, type, currentSectionTitle);
		});
	};
	return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ jsx(ArrowBendUpRightIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "mcfB2A" })] }), /* @__PURE__ */ jsxs(DropdownMenuSubContent, { children: [
		moveTargets.map(({ pageIndex, sections }) => /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ jsx(FileIcon, {}), /* @__PURE__ */ jsx(Trans, {
			id: "tdta9X",
			values: { 0: pageIndex + 1 }
		})] }), /* @__PURE__ */ jsxs(DropdownMenuSubContent, { children: [
			sections.map(({ sectionId, sectionTitle }) => /* @__PURE__ */ jsx(DropdownMenuItem, {
				onSelect: () => handleMoveToSection(sectionId),
				children: sectionTitle
			}, sectionId)),
			sections.length > 0 && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsxs(DropdownMenuItem, {
				onSelect: () => handleNewSectionOnPage(pageIndex),
				children: [/* @__PURE__ */ jsx(FolderPlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "1/wEJt" })]
			})
		] })] }, pageIndex)),
		/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
		/* @__PURE__ */ jsxs(DropdownMenuItem, {
			onSelect: handleNewPage,
			children: [/* @__PURE__ */ jsx(PlusCircleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "GrZ6fH" })]
		})
	] })] });
}
function SectionItem({ type, item, title, subtitle, customSectionId }) {
	const confirm = useConfirm();
	const controls = useDragControls();
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onToggleVisibility = () => {
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			} else {
				const section = draft.sections[type];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			}
		});
	};
	const onUpdate = () => {
		openDialog(`resume.sections.${type}.update`, {
			item,
			customSectionId
		});
	};
	const onDuplicate = () => {
		openDialog(`resume.sections.${type}.create`, {
			item,
			customSectionId
		});
	};
	const onDelete = async () => {
		if (!await confirm("Are you sure you want to delete this item?", {
			confirmText: "Delete",
			cancelText: "Cancel"
		})) return;
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			} else {
				const section = draft.sections[type];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			}
		});
	};
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		value: item,
		dragListener: false,
		dragControls: controls,
		initial: {
			opacity: 1,
			y: -10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -10
		},
		className: "group relative flex h-18 select-none border-b",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex cursor-ns-resize touch-none items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 group-hover:opacity-100",
				onPointerDown: (e) => {
					e.preventDefault();
					controls.start(e);
				},
				children: /* @__PURE__ */ jsx(DotsSixVerticalIcon, {})
			}),
			/* @__PURE__ */ jsxs("button", {
				onClick: onUpdate,
				className: cn("flex flex-1 flex-col items-start justify-center space-y-0.5 ps-1.5 text-start opacity-100 transition-opacity hover:bg-secondary/40 focus:outline-none focus-visible:ring-1", item.hidden && "opacity-50"),
				children: [/* @__PURE__ */ jsx("div", {
					className: "line-clamp-1 font-medium",
					children: title
				}), subtitle && /* @__PURE__ */ jsx("div", {
					className: "line-clamp-1 text-muted-foreground text-xs",
					children: subtitle
				})]
			}),
			/* @__PURE__ */ jsxs(DropdownMenu$1, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx("button", {
					className: "flex cursor-context-menu items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 focus:outline-none focus-visible:ring-1 group-hover:opacity-100",
					children: /* @__PURE__ */ jsx(DotsThreeVerticalIcon, {})
				})
			}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
				align: "end",
				children: [
					/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: onToggleVisibility,
						children: [item.hidden ? /* @__PURE__ */ jsx(EyeIcon, {}) : /* @__PURE__ */ jsx(EyeClosedIcon, {}), item.hidden ? /* @__PURE__ */ jsx(Trans, { id: "8vETh9" }) : /* @__PURE__ */ jsx(Trans, { id: "vLyv1R" })]
					}) }),
					/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
					/* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
						/* @__PURE__ */ jsxs(DropdownMenuItem, {
							onSelect: onUpdate,
							children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "EkH9pt" })]
						}),
						/* @__PURE__ */ jsxs(DropdownMenuItem, {
							onSelect: onDuplicate,
							children: [/* @__PURE__ */ jsx(CopySimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "euc6Ns" })]
						}),
						/* @__PURE__ */ jsx(MoveItemSubmenu, {
							type,
							item,
							customSectionId
						})
					] }),
					/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
					/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
						variant: "destructive",
						onSelect: onDelete,
						children: [/* @__PURE__ */ jsx(TrashSimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "cnGeoo" })]
					}) })
				]
			})] })
		]
	}, item.id);
}
function SectionAddItemButton({ type, customSectionId, className, children, ...props }) {
	const { openDialog } = useDialogStore();
	const handleAdd = () => {
		if (type === "custom") openDialog("resume.sections.custom.create", void 0);
		else openDialog(`resume.sections.${type}.create`, customSectionId ? { customSectionId } : void 0);
	};
	return /* @__PURE__ */ jsxs(Button, {
		tapScale: 1,
		variant: "ghost",
		onClick: handleAdd,
		className: cn("h-12 w-full justify-start rounded-t-none", className),
		...props,
		children: [/* @__PURE__ */ jsx(PlusIcon, {}), children]
	});
}
function SortableSectionItem({ type, item, title, subtitle, customSectionId, onAskZoe }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onToggleVisibility = () => {
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			} else {
				const section = draft.sections[type];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			}
		});
	};
	const onUpdate = () => {
		openDialog(`resume.sections.${type}.update`, {
			item,
			customSectionId
		});
	};
	const onDuplicate = () => {
		openDialog(`resume.sections.${type}.create`, {
			item,
			customSectionId
		});
	};
	const onDelete = async () => {
		if (!await confirm("Are you sure you want to delete this item?", {
			confirmText: "Delete",
			cancelText: "Cancel"
		})) return;
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			} else {
				const section = draft.sections[type];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			}
		});
	};
	return /* @__PURE__ */ jsx(SortableItem, {
		id: item.id,
		asHandle: true,
		className: "group relative border-b last:border-b-0",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex h-18 items-center bg-white",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex shrink-0 items-center px-3 text-gray-500 opacity-70 transition-opacity group-hover:opacity-100",
					children: /* @__PURE__ */ jsx(DotsSixVerticalIcon, { size: 20 })
				}),
				/* @__PURE__ */ jsxs("button", {
					onClick: onUpdate,
					className: cn("flex flex-1 flex-col items-start justify-center space-y-0.5 ps-1 text-start opacity-100 transition-opacity hover:bg-secondary/40 focus:outline-none focus-visible:ring-1", item.hidden && "opacity-50"),
					type: "button",
					children: [/* @__PURE__ */ jsx("div", {
						className: "line-clamp-1 font-medium",
						children: title
					}), subtitle && /* @__PURE__ */ jsx("div", {
						className: "line-clamp-1 text-muted-foreground text-xs",
						children: subtitle
					})]
				}),
				/* @__PURE__ */ jsxs(DropdownMenu$1, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("button", {
						className: "flex h-full cursor-context-menu items-center px-3 text-gray-500 opacity-70 transition-[background-color,opacity] hover:bg-secondary/40 focus:outline-none focus-visible:ring-1 group-hover:opacity-100",
						children: /* @__PURE__ */ jsx(DotsThreeVerticalIcon, { size: 20 })
					})
				}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
							onSelect: onToggleVisibility,
							children: [item.hidden ? /* @__PURE__ */ jsx(EyeIcon, {}) : /* @__PURE__ */ jsx(EyeClosedIcon, {}), item.hidden ? /* @__PURE__ */ jsx(Trans, { id: "8vETh9" }) : /* @__PURE__ */ jsx(Trans, { id: "vLyv1R" })]
						}) }),
						/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
						/* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
							/* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: onUpdate,
								children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "EkH9pt" })]
							}),
							/* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: onDuplicate,
								children: [/* @__PURE__ */ jsx(CopySimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "euc6Ns" })]
							}),
							onAskZoe && /* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: onAskZoe,
								children: [/* @__PURE__ */ jsx(SparkleIcon, { className: "text-emerald-600" }), /* @__PURE__ */ jsx(Trans, { id: "RBclte" })]
							}),
							/* @__PURE__ */ jsx(MoveItemSubmenu, {
								type,
								item,
								customSectionId
							})
						] }),
						/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
						/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
							variant: "destructive",
							onSelect: onDelete,
							children: [/* @__PURE__ */ jsx(TrashSimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "cnGeoo" })]
						}) })
					]
				})] })
			]
		})
	});
}
function AwardsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.awards);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.awards.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "awards",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder: handleReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "awards",
				item,
				title: item.title,
				subtitle: item.awarder
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "awards",
			children: /* @__PURE__ */ jsx(Trans, { id: "FKYYW1" })
		})]
	});
}
init_data();
init_string();
function CustomFieldsSection({ onSubmit }) {
	const form = useFormContext();
	const customFields = useWatch({
		control: form.control,
		name: "customFields"
	});
	const customFieldsArray = useFieldArray({
		control: form.control,
		keyName: "key",
		name: "customFields"
	});
	function handleReorder(newFields) {
		const currentFieldsMap = Object.fromEntries(customFields.map((f) => [f.id, f]));
		const reordered = newFields.map((field) => currentFieldsMap[field.id] ?? field);
		form.setValue("customFields", reordered);
		form.handleSubmit(onSubmit)();
	}
	function handleRemove(index) {
		customFieldsArray.remove(index);
		form.handleSubmit(onSubmit)();
	}
	function handleAdd() {
		customFieldsArray.append({
			id: generateId(),
			icon: "acorn",
			text: "",
			link: ""
		});
		form.handleSubmit(onSubmit)();
	}
	return /* @__PURE__ */ jsxs(Reorder.Group, {
		className: "touch-none space-y-4",
		values: customFieldsArray.fields,
		onReorder: handleReorder,
		children: [customFieldsArray.fields.map((field, index) => /* @__PURE__ */ jsxs(CustomFieldItem, {
			field,
			children: [
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: `customFields.${index}.icon`,
					render: ({ field: field$1 }) => /* @__PURE__ */ jsx(FormItem, {
						className: "shrink-0",
						children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(IconPicker, {
							...field$1,
							className: "rounded-r-none! border-e-0!",
							onChange: (icon) => {
								field$1.onChange(icon);
								form.handleSubmit(onSubmit)();
							}
						}) })
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: `customFields.${index}.text`,
					render: ({ field: field$1 }) => /* @__PURE__ */ jsx(FormItem, {
						className: "flex-1",
						children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							...field$1,
							className: "rounded-l-none!",
							onChange: (e) => {
								field$1.onChange(e.target.value);
								form.handleSubmit(onSubmit)();
							}
						}) })
					})
				}),
				/* @__PURE__ */ jsxs(Popover$1, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx(Button, {
						size: "icon",
						variant: "ghost",
						className: "ms-1",
						children: /* @__PURE__ */ jsx(LinkIcon, {})
					})
				}), /* @__PURE__ */ jsx(PopoverContent, {
					align: "center",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-y-1.5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground text-xs",
							children: /* @__PURE__ */ jsx(Trans, { id: "iIJL5x" })
						}), /* @__PURE__ */ jsx(Controller, {
							control: form.control,
							name: `customFields.${index}.link`,
							render: ({ field: field$1 }) => /* @__PURE__ */ jsx(Input, {
								type: "url",
								value: field$1.value,
								placeholder: "Must start with https://",
								onChange: (e) => {
									field$1.onChange(e.target.value);
									form.handleSubmit(onSubmit)();
								}
							})
						})]
					})
				})] }),
				/* @__PURE__ */ jsx(Button, {
					size: "icon",
					variant: "ghost",
					onClick: () => handleRemove(index),
					children: /* @__PURE__ */ jsx(XIcon, {})
				})
			]
		}, field.id)), /* @__PURE__ */ jsxs(Button, {
			variant: "ghost",
			onClick: handleAdd,
			children: [/* @__PURE__ */ jsx(ListPlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "77JB0Z" })]
		})]
	});
}
function CustomFieldItem({ field, children }) {
	const controls = useDragControls();
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		value: field,
		dragListener: false,
		dragControls: controls,
		initial: {
			opacity: 0,
			y: -10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "flex touch-none items-center",
		children: [/* @__PURE__ */ jsx(Button, {
			size: "icon",
			variant: "ghost",
			className: "me-2 touch-none",
			onPointerDown: (e) => {
				e.preventDefault();
				controls.start(e);
			},
			children: /* @__PURE__ */ jsx(DotsSixVerticalIcon, {})
		}), children]
	}, field.id);
}
function BasicsSectionBuilder() {
	return /* @__PURE__ */ jsx(SectionBase, {
		type: "basics",
		children: /* @__PURE__ */ jsx(BasicsSectionForm, {})
	});
}
var formSchema = basicsSchema;
function BasicsSectionForm() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: basics,
		mode: "onChange"
	});
	const basicsRef = useRef(basics);
	useEffect(() => {
		if (basics !== basicsRef.current) {
			form.reset(basics);
			basicsRef.current = basics;
		}
	}, [basics, form]);
	const onSubmit = (data) => {
		updateResumeData((draft) => {
			draft.basics = data;
		});
	};
	return /* @__PURE__ */ jsx(Form, {
		...form,
		children: /* @__PURE__ */ jsxs("form", {
			onChange: form.handleSubmit(onSubmit),
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: "name",
					render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							...field,
							onChange: (e) => {
								const value = e.target.value.replace(/[0-9]/g, "");
								field.onChange(value);
							}
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: "headline",
					render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "+670Zw" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							...field,
							onChange: (e) => {
								const value = e.target.value.replace(/[0-9]/g, "");
								field.onChange(value);
							}
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: "email",
					render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "O3oNi5" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							type: "email",
							...field
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: "phone",
					render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "zmwvG2" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: "location",
					render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "wJijgU" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ jsx(FormField, {
					control: form.control,
					name: "website",
					render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
							...field,
							value: field.value,
							onChange: field.onChange
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ jsx(CustomFieldsSection, { onSubmit })
			]
		})
	});
}
function CertificationsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.certifications);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.certifications.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "certifications",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder: handleReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "certifications",
				item,
				title: item.title,
				subtitle: [item.issuer, item.date].filter(Boolean).join(" • ") || void 0
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "certifications",
			children: /* @__PURE__ */ jsx(Trans, { id: "YWqdgB" })
		})]
	});
}
init_string();
function getItemTitle(type, item) {
	return match(type).with("summary", () => {
		if ("content" in item) {
			const stripped = stripHtml(item.content);
			return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped || "Summary";
		}
		return "Summary";
	}).with("profiles", () => "network" in item ? item.network : "").with("experience", () => "company" in item ? item.company : "").with("education", () => "school" in item ? item.school : "").with("projects", () => "name" in item ? item.name : "").with("skills", () => "name" in item ? item.name : "").with("languages", () => "language" in item ? item.language : "").with("interests", () => "name" in item ? item.name : "").with("awards", () => "title" in item ? item.title : "").with("certifications", () => "title" in item ? item.title : "").with("publications", () => "title" in item ? item.title : "").with("volunteer", () => "organization" in item ? item.organization : "").with("references", () => "name" in item ? item.name : "").with("cover-letter", () => {
		if ("recipient" in item) {
			const stripped = stripHtml(item.recipient);
			return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped || "Cover Letter";
		}
		return "Cover Letter";
	}).exhaustive();
}
function getItemSubtitle(type, item) {
	return match(type).with("summary", () => void 0).with("profiles", () => "username" in item ? item.username : void 0).with("experience", () => "position" in item ? item.position : void 0).with("education", () => "degree" in item ? item.degree : void 0).with("projects", () => "period" in item ? item.period : void 0).with("skills", () => "proficiency" in item ? item.proficiency : void 0).with("languages", () => "fluency" in item ? item.fluency : void 0).with("interests", () => void 0).with("awards", () => "awarder" in item ? item.awarder : void 0).with("certifications", () => "issuer" in item ? item.issuer : void 0).with("publications", () => "publisher" in item ? item.publisher : void 0).with("volunteer", () => "period" in item ? item.period : void 0).with("references", () => void 0).with("cover-letter", () => {
		if ("content" in item) {
			const stripped = stripHtml(item.content);
			return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped || void 0;
		}
	}).exhaustive();
}
function CustomSectionBuilder() {
	const customSections = useResumeStore((state) => state.resume.data.customSections);
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "custom",
		className: cn("space-y-4", customSections.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(AnimatePresence, { children: customSections.map((section) => /* @__PURE__ */ jsx(CustomSectionContainer, { section }, section.id)) }), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "custom",
			variant: "outline",
			className: "rounded-md",
			children: /* @__PURE__ */ jsx(Trans, { id: "NIRRxa" })
		})]
	});
}
function CustomSectionContainer({ section }) {
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onUpdateSection = () => {
		openDialog("resume.sections.custom.update", section);
	};
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].items = items;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "group flex select-none",
				children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: onUpdateSection,
					className: cn("flex flex-1 flex-col items-start justify-center space-y-0.5 p-4 text-start transition-opacity hover:bg-secondary/40 focus:outline-none focus-visible:ring-1", section.hidden && "opacity-50"),
					children: [
						/* @__PURE__ */ jsx(Badge, {
							variant: "secondary",
							className: "mb-1.5 rounded-sm",
							children: getSectionTitle(section.type)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "line-clamp-1 text-wrap font-medium text-base",
							children: section.title
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground text-xs",
							children: /* @__PURE__ */ jsx(Trans, {
								id: "6ki7F2",
								values: { 0: section.items.length }
							})
						})
					]
				}), /* @__PURE__ */ jsx(CustomSectionDropdownMenu, { section })]
			}),
			section.items.length > 0 && /* @__PURE__ */ jsx("div", {
				className: cn("border-t", section.hidden && "opacity-50"),
				children: /* @__PURE__ */ jsx(Reorder.Group, {
					axis: "y",
					values: section.items,
					onReorder: handleReorder,
					children: /* @__PURE__ */ jsx(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ jsx(SectionItem, {
						type: section.type,
						item,
						customSectionId: section.id,
						title: getItemTitle(section.type, item),
						subtitle: getItemSubtitle(section.type, item)
					}, item.id)) })
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "border-t",
				children: /* @__PURE__ */ jsx(SectionAddItemButton, {
					type: section.type,
					customSectionId: section.id,
					children: /* @__PURE__ */ jsx(Trans, { id: "rvNS8V" })
				})
			})
		]
	});
}
function CustomSectionDropdownMenu({ section }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onToggleSectionVisibility = () => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].hidden = !draft.customSections[sectionIndex].hidden;
		});
	};
	const onUpdateSection = () => {
		openDialog("resume.sections.custom.update", section);
	};
	const onDuplicateSection = () => {
		openDialog("resume.sections.custom.create", section);
	};
	const onSetColumns = (value) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].columns = parseInt(value, 10);
		});
	};
	const onDeleteSection = async () => {
		if (!await confirm("Are you sure you want to delete this custom section?", {
			confirmText: "Delete",
			cancelText: "Cancel"
		})) return;
		updateResumeData((draft) => {
			draft.customSections = draft.customSections.filter((_section) => _section.id !== section.id);
			draft.metadata.layout.pages = draft.metadata.layout.pages.map((page) => ({
				...page,
				main: page.main.filter((id) => id !== section.id),
				sidebar: page.sidebar.filter((id) => id !== section.id)
			}));
		});
	};
	return /* @__PURE__ */ jsxs(DropdownMenu$1, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "flex cursor-context-menu items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 focus:outline-none focus-visible:ring-1 group-hover:opacity-100",
			children: /* @__PURE__ */ jsx(DotsThreeVerticalIcon, {})
		})
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "end",
		children: [
			/* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onSelect: onToggleSectionVisibility,
					children: [section.hidden ? /* @__PURE__ */ jsx(EyeIcon, {}) : /* @__PURE__ */ jsx(EyeClosedIcon, {}), section.hidden ? /* @__PURE__ */ jsx(Trans, { id: "8vETh9" }) : /* @__PURE__ */ jsx(Trans, { id: "vLyv1R" })]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onSelect: onUpdateSection,
					children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "EkH9pt" })]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onSelect: onDuplicateSection,
					children: [/* @__PURE__ */ jsx(CopySimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "euc6Ns" })]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ jsx(ColumnsIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "jEu4bB" })] }), /* @__PURE__ */ jsx(DropdownMenuSubContent, { children: /* @__PURE__ */ jsx(DropdownMenuRadioGroup, {
					value: section.columns.toString(),
					onValueChange: onSetColumns,
					children: [
						1,
						2,
						3,
						4,
						5,
						6
					].map((column) => /* @__PURE__ */ jsx(DropdownMenuRadioItem, {
						value: column.toString(),
						children: /* @__PURE__ */ jsx(Trans, {
							id: "rBk6aK",
							values: { column }
						})
					}, column))
				}) })] })
			] }),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
				variant: "destructive",
				onSelect: onDeleteSection,
				children: [/* @__PURE__ */ jsx(TrashSimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "cnGeoo" })]
			}) })
		]
	})] });
}
function EducationSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.education);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "education",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: /* @__PURE__ */ jsx(SortableList, {
				items: section.items,
				onReorder: (newItems) => {
					updateResumeData((draft) => {
						draft.sections.education.items = newItems;
					});
				},
				keyExtractor: (item) => item.id,
				renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
					type: "education",
					item,
					title: item.school || "New Education",
					subtitle: [item.degree, item.period].filter(Boolean).join(" • ")
				}, item.id)
			})
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "education",
			children: /* @__PURE__ */ jsx(Trans, { id: "qRrfdD" })
		})]
	});
}
init_string();
function formatExperienceDate(dateString) {
	if (!dateString) return "";
	try {
		const date = new Date(dateString);
		return `${date.toLocaleString("en-US", { month: "short" })}/${date.getFullYear()}`;
	} catch {
		return dateString;
	}
}
function ExperienceSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.experience);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const [generatingIds, setGeneratingIds] = useState(/* @__PURE__ */ new Set());
	const handleAskZoe = async (id) => {
		setGeneratingIds((prev) => new Set([...prev, id]));
		try {
			const item = section.items.find((exp) => exp.id === id);
			if (!item) throw new Error("Experience item not found");
			const response = await api.generateAIContent({
				resume_id: useResumeStore.getState().resume.id,
				type: "ExperienceDescription",
				value: stripHtml(`${item.position} at ${item.company}`)
			});
			const aiDescription = Object.values(response)[0];
			updateResumeData((draft) => {
				const draftItem = draft.sections.experience.items.find((exp) => exp.id === id);
				if (draftItem) draftItem.description = aiDescription;
			});
			toast.success("AI description generated successfully!");
		} catch (error) {
			console.error("AI generation error:", error);
			toast.error(error instanceof Error ? error.message : "Failed to generate description");
		} finally {
			setGeneratingIds((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		}
	};
	return /* @__PURE__ */ jsx(SectionBase, {
		type: "experience",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsx(SortableList, {
					items: section.items,
					onReorder: (newItems) => {
						updateResumeData((draft) => {
							draft.sections.experience.items = newItems;
						});
					},
					keyExtractor: (item) => item.id,
					renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
						type: "experience",
						item,
						title: item.position || "New Position",
						subtitle: [item.company, `${formatExperienceDate(item.startDate)} - ${item.endDate ? formatExperienceDate(item.endDate) : item.currentlyWorkingHere ? "Present" : ""}`.trim()].filter(Boolean).join(" • "),
						onAskZoe: () => handleAskZoe(item.id)
					}, item.id)
				}),
				/* @__PURE__ */ jsx(SectionAddItemButton, {
					type: "experience",
					children: /* @__PURE__ */ jsx(Trans, { id: "flhYjS" })
				}),
				generatingIds.size > 0 && /* @__PURE__ */ jsx("div", {
					className: "fixed right-8 bottom-8 max-w-sm animate-pulse rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-2xl",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-emerald-100",
							children: /* @__PURE__ */ jsx("img", {
								src: "/zoe-icon.png",
								alt: "Zoe",
								className: "h-8 w-8"
							})
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "mb-1 font-bold text-gray-900",
							children: "Zoe is working..."
						}), /* @__PURE__ */ jsx("p", {
							className: "text-gray-600 text-sm",
							children: "Generating professional descriptions for your experience"
						})] })]
					})
				})
			]
		})
	});
}
function InterestsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.interests);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.interests.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "interests",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder: handleReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "interests",
				item,
				title: item.name
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "interests",
			children: /* @__PURE__ */ jsx(Trans, { id: "QIJa3o" })
		})]
	});
}
function LanguagesSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.languages);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.languages.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "languages",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder: handleReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "languages",
				item,
				title: item.language,
				subtitle: item.fluency
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "languages",
			children: /* @__PURE__ */ jsx(Trans, { id: "WpnLrW" })
		})]
	});
}
init_data();
function PictureSectionBuilder() {
	return /* @__PURE__ */ jsx(SectionBase, {
		type: "picture",
		children: /* @__PURE__ */ jsx(PictureSectionForm, {})
	});
}
function PictureSectionForm() {
	const picture = useResumeStore((state) => state.resume.data.picture);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(pictureSchema),
		defaultValues: picture,
		mode: "onChange"
	});
	const onSubmit = (data) => {
		updateResumeData((draft) => {
			draft.picture = data;
		});
	};
	const handlePhotoChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				toast.error(i18n._({ id: "YnBrFL" }));
				return;
			}
			if (file.size > 10 * 1024 * 1024) {
				toast.error(i18n._({ id: "sePO8K" }));
				return;
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				const url = reader.result;
				form.setValue("url", url, { shouldDirty: true });
				form.setValue("hidden", false, { shouldDirty: true });
				form.handleSubmit(onSubmit)();
				toast.success(i18n._({ id: "u0DHjL" }));
			};
			reader.readAsDataURL(file);
		}
		event.target.value = "";
	};
	const handleRemovePhoto = () => {
		form.setValue("url", "", { shouldDirty: true });
		form.setValue("hidden", true, { shouldDirty: true });
		form.handleSubmit(onSubmit)();
		toast.success(i18n._({ id: "AnLV/r" }));
	};
	const pictureUrl = form.watch("url");
	const borderRadius = form.watch("borderRadius");
	const borderWidth = form.watch("borderWidth");
	const borderColor = form.watch("borderColor");
	const shadowWidth = form.watch("shadowWidth");
	const shadowColor = form.watch("shadowColor");
	const rotation = form.watch("rotation");
	const aspectRatio = form.watch("aspectRatio");
	return /* @__PURE__ */ jsx(Form, {
		...form,
		children: /* @__PURE__ */ jsxs("form", {
			onChange: form.handleSubmit(onSubmit),
			className: "space-y-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center gap-2 border-gray-200 border-b pb-3",
					children: [/* @__PURE__ */ jsx(CameraIcon, {
						className: "h-5 w-5 text-emerald-600",
						weight: "bold"
					}), /* @__PURE__ */ jsx("h3", {
						className: "font-semibold text-gray-900 text-sm",
						children: /* @__PURE__ */ jsx(Trans, { id: "Szskbr" })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative shrink-0",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-center overflow-hidden bg-white shadow-md",
								style: {
									width: "112px",
									height: "112px",
									borderRadius: borderRadius === 100 ? "50%" : `${borderRadius}%`,
									border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
									boxShadow: shadowWidth > 0 ? `0 0 ${shadowWidth * 4}px ${shadowColor}40` : "none",
									transform: `rotate(${rotation}deg)`,
									aspectRatio: aspectRatio.toString()
								},
								children: pictureUrl ? /* @__PURE__ */ jsx("img", {
									src: pictureUrl,
									alt: "Profile",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center gap-2",
									children: [/* @__PURE__ */ jsx(CameraIcon, { className: "h-10 w-10 text-gray-300" }), /* @__PURE__ */ jsx("span", {
										className: "text-gray-400 text-xs",
										children: "No Photo"
									})]
								})
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								accept: "image/*",
								onChange: handlePhotoChange,
								className: "hidden",
								id: "picture-upload"
							}),
							pictureUrl ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "picture-upload",
								className: "absolute -top-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-emerald-600 shadow-lg transition-all hover:scale-110 hover:bg-emerald-700",
								title: "Change photo",
								children: /* @__PURE__ */ jsx(PencilSimpleIcon, {
									className: "h-4 w-4 text-white",
									weight: "bold"
								})
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: handleRemovePhoto,
								className: "absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-600 shadow-lg transition-all hover:scale-110 hover:bg-red-700",
								title: "Remove photo",
								children: /* @__PURE__ */ jsx(TrashIcon, {
									className: "h-4 w-4 text-white",
									weight: "bold"
								})
							})] }) : /* @__PURE__ */ jsx("label", {
								htmlFor: "picture-upload",
								className: "absolute -right-1 -bottom-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-emerald-600 shadow-lg transition-all hover:scale-110 hover:bg-emerald-700",
								title: "Upload photo",
								children: /* @__PURE__ */ jsx(PlusIcon, {
									className: "h-5 w-5 text-white",
									weight: "bold"
								})
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex-1",
						children: /* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "url",
							render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
								/* @__PURE__ */ jsx(FormLabel, {
									className: "font-medium text-gray-700 text-xs",
									children: /* @__PURE__ */ jsx(Trans, { id: "YhFvEi" })
								}),
								/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
									...field,
									placeholder: "Paste image URL here...",
									className: "h-auto border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
									onChange: (e) => {
										field.onChange(e);
										if (e.target.value.trim() !== "") form.setValue("hidden", false, { shouldDirty: true });
									}
								}) }),
								/* @__PURE__ */ jsx(FormMessage, {}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1.5 text-gray-500 text-xs",
									children: "Upload a photo or paste an image URL"
								})
							] })
						})
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "mb-4 font-semibold text-gray-900 text-sm",
						children: /* @__PURE__ */ jsx(Trans, { id: "XyNMGH" })
					}),
					/* @__PURE__ */ jsx(FormField, {
						control: form.control,
						name: "size",
						render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
							/* @__PURE__ */ jsx(FormLabel, {
								className: "font-medium text-gray-700 text-xs",
								children: /* @__PURE__ */ jsx(Trans, { id: "Cj2Gtd" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
									...field,
									type: "number",
									min: 32,
									max: 512,
									step: 1,
									className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
									onChange: (e) => {
										const value = e.target.value;
										if (value === "") field.onChange("");
										else field.onChange(Number(value));
									}
								}) }), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-500 text-sm",
									children: "pt"
								})]
							}),
							/* @__PURE__ */ jsx(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ jsx(FormField, {
						control: form.control,
						name: "rotation",
						render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
							/* @__PURE__ */ jsx(FormLabel, {
								className: "font-medium text-gray-700 text-xs",
								children: /* @__PURE__ */ jsx(Trans, { id: "exWyD0" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
									...field,
									type: "number",
									min: 0,
									max: 360,
									step: 5,
									className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
									onChange: (e) => {
										const value = e.target.value;
										if (value === "") field.onChange("");
										else field.onChange(Number(value));
									}
								}) }), /* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-500 text-sm",
									children: "°"
								})]
							}),
							/* @__PURE__ */ jsx(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ jsx(FormField, {
						control: form.control,
						name: "aspectRatio",
						render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
							/* @__PURE__ */ jsx(FormLabel, {
								className: "font-medium text-gray-700 text-xs",
								children: /* @__PURE__ */ jsx(Trans, { id: "A8094e" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
									...field,
									type: "number",
									min: .5,
									max: 2.5,
									step: .1,
									className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
									onChange: (e) => {
										const value = e.target.value;
										if (value === "") field.onChange("");
										else field.onChange(Number(value));
									}
								}) }), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ jsx(Button, {
											type: "button",
											size: "icon",
											variant: "outline",
											title: i18n._({ id: "1DA6ap" }),
											className: "h-10 w-10 border-gray-300 p-2 transition-all hover:bg-gray-50",
											onClick: () => {
												field.onChange(1);
												form.handleSubmit(onSubmit)();
											},
											children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 border-2 border-emerald-600" })
										}),
										/* @__PURE__ */ jsx(Button, {
											type: "button",
											size: "icon",
											variant: "outline",
											title: i18n._({ id: "XxIeKn" }),
											className: "h-10 w-10 border-gray-300 p-2 transition-all hover:bg-gray-50",
											onClick: () => {
												field.onChange(1.5);
												form.handleSubmit(onSubmit)();
											},
											children: /* @__PURE__ */ jsx("div", { className: "h-3 w-5 border-2 border-emerald-600" })
										}),
										/* @__PURE__ */ jsx(Button, {
											type: "button",
											size: "icon",
											variant: "outline",
											title: i18n._({ id: "3bV9gD" }),
											className: "h-10 w-10 border-gray-300 p-2 transition-all hover:bg-gray-50",
											onClick: () => {
												field.onChange(.5);
												form.handleSubmit(onSubmit)();
											},
											children: /* @__PURE__ */ jsx("div", { className: "h-5 w-3 border-2 border-emerald-600" })
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ jsx(FormField, {
						control: form.control,
						name: "borderRadius",
						render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
							/* @__PURE__ */ jsx(FormLabel, {
								className: "font-medium text-gray-700 text-xs",
								children: /* @__PURE__ */ jsx(Trans, { id: "bjp1xg" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
										...field,
										type: "number",
										min: 0,
										max: 100,
										step: 1,
										className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
										onChange: (e) => {
											const value = Number(e.target.value);
											field.onChange(value);
										}
									}) }),
									/* @__PURE__ */ jsx("span", {
										className: "mr-1 font-medium text-gray-500 text-sm",
										children: "pt"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-1",
										children: [
											/* @__PURE__ */ jsx(Button, {
												type: "button",
												size: "icon",
												variant: "outline",
												title: i18n._({ id: "4oZXWU" }),
												className: "h-10 w-10 border-gray-300 p-2 transition-all hover:bg-gray-50",
												onClick: () => {
													field.onChange(0);
													form.handleSubmit(onSubmit)();
												},
												children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-none border-2 border-emerald-600" })
											}),
											/* @__PURE__ */ jsx(Button, {
												type: "button",
												size: "icon",
												variant: "outline",
												title: i18n._({ id: "+Ogicq" }),
												className: "h-10 w-10 border-gray-300 p-2 transition-all hover:bg-gray-50",
												onClick: () => {
													field.onChange(10);
													form.handleSubmit(onSubmit)();
												},
												children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-sm border-2 border-emerald-600" })
											}),
											/* @__PURE__ */ jsx(Button, {
												type: "button",
												size: "icon",
												variant: "outline",
												title: i18n._({ id: "4rGGrY" }),
												className: "h-10 w-10 border-gray-300 p-2 transition-all hover:bg-gray-50",
												onClick: () => {
													field.onChange(100);
													form.handleSubmit(onSubmit)();
												},
												children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full border-2 border-emerald-600" })
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsx(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "borderColor",
							render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
								/* @__PURE__ */ jsx(FormLabel, {
									className: "font-medium text-gray-700 text-xs",
									children: /* @__PURE__ */ jsx(Trans, { id: "jj5Fl6" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(ColorPicker, {
										...field,
										className: "h-10 w-12 cursor-pointer rounded-lg border border-gray-300",
										defaultValue: field.value,
										onValueChange: (color) => {
											field.onChange(color);
											form.handleSubmit(onSubmit)();
										}
									}) }), /* @__PURE__ */ jsx(Input, {
										...field,
										placeholder: "#10b981",
										className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
									})]
								}),
								/* @__PURE__ */ jsx(FormMessage, {})
							] })
						}), /* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "borderWidth",
							render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
								/* @__PURE__ */ jsx(FormLabel, {
									className: "font-medium text-gray-700 text-xs",
									children: /* @__PURE__ */ jsx(Trans, { id: "Zei97D" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
										...field,
										type: "number",
										min: 0,
										step: 1,
										className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
										onChange: (e) => {
											if (e.target.value === "") field.onChange("");
											else field.onChange(Number(e.target.value));
										}
									}) }), /* @__PURE__ */ jsx("span", {
										className: "font-medium text-gray-500 text-sm",
										children: "pt"
									})]
								}),
								/* @__PURE__ */ jsx(FormMessage, {})
							] })
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "shadowColor",
							render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
								/* @__PURE__ */ jsx(FormLabel, {
									className: "font-medium text-gray-700 text-xs",
									children: /* @__PURE__ */ jsx(Trans, { id: "JciY5k" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(ColorPicker, {
										...field,
										className: "h-10 w-12 cursor-pointer rounded-lg border border-gray-300",
										defaultValue: field.value,
										onValueChange: (color) => {
											field.onChange(color);
											form.handleSubmit(onSubmit)();
										}
									}) }), /* @__PURE__ */ jsx(Input, {
										...field,
										placeholder: "#000000",
										className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
									})]
								}),
								/* @__PURE__ */ jsx(FormMessage, {})
							] })
						}), /* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "shadowWidth",
							render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
								/* @__PURE__ */ jsx(FormLabel, {
									className: "font-medium text-gray-700 text-xs",
									children: /* @__PURE__ */ jsx(Trans, { id: "fGSOMF" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
										...field,
										type: "number",
										min: 0,
										step: .5,
										className: "flex-1 border-gray-300 px-3 py-2 text-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
										onChange: (e) => {
											const value = e.target.value;
											if (value === "") field.onChange("");
											else field.onChange(Number(value));
										}
									}) }), /* @__PURE__ */ jsx("span", {
										className: "font-medium text-gray-500 text-sm",
										children: "pt"
									})]
								}),
								/* @__PURE__ */ jsx(FormMessage, {})
							] })
						})]
					})
				]
			})]
		})
	});
}
var socialNetworks = [
	{
		name: "LinkedIn",
		icon: "💼",
		placeholder: "linkedin.com/in/username",
		color: "bg-blue-600"
	},
	{
		name: "GitHub",
		icon: "💻",
		placeholder: "github.com/username",
		color: "bg-gray-800"
	},
	{
		name: "Twitter",
		icon: "🐦",
		placeholder: "twitter.com/username",
		color: "bg-sky-500"
	},
	{
		name: "Portfolio",
		icon: "🌐",
		placeholder: "yourwebsite.com",
		color: "bg-purple-600"
	}
];
function ProfilesSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.profiles);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const [isAddingProfile, setIsAddingProfile] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		network: "LinkedIn",
		username: "",
		url: ""
	});
	const handleAddProfile = () => {
		if (formData.username.trim()) {
			const networkData = socialNetworks.find((n) => n.name === formData.network);
			const newProfile = {
				id: crypto.randomUUID(),
				hidden: false,
				icon: networkData?.icon || "🔗",
				network: formData.network,
				username: formData.username,
				website: {
					url: formData.url || `https://${networkData?.placeholder}`,
					label: formData.username
				}
			};
			updateResumeData((draft) => {
				draft.sections.profiles.items.push(newProfile);
			});
			setFormData({
				network: "LinkedIn",
				username: "",
				url: ""
			});
			setIsAddingProfile(false);
		} else alert("Please enter a username before adding a profile.");
	};
	const handleUpdateProfile = () => {
		updateResumeData((draft) => {
			const item = draft.sections.profiles.items.find((p) => p.id === editingId);
			if (item) {
				item.network = formData.network;
				item.username = formData.username;
				item.website.url = formData.url;
			}
		});
		setEditingId(null);
		setFormData({
			network: "LinkedIn",
			username: "",
			url: ""
		});
	};
	const handleDeleteProfile = (id) => {
		updateResumeData((draft) => {
			draft.sections.profiles.items = draft.sections.profiles.items.filter((item) => item.id !== id);
		});
	};
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.profiles.items = items;
		});
	};
	const startEditing = (profile) => {
		setEditingId(profile.id);
		setFormData({
			network: profile.network,
			username: profile.username,
			url: profile.website.url
		});
		setIsAddingProfile(false);
	};
	const cancelForm = () => {
		setIsAddingProfile(false);
		setEditingId(null);
		setFormData({
			network: "LinkedIn",
			username: "",
			url: ""
		});
	};
	const getNetworkIcon = (network) => {
		return socialNetworks.find((n) => n.name === network)?.icon || "🔗";
	};
	const getNetworkColor = (network) => {
		return socialNetworks.find((n) => n.name === network)?.color || "bg-gray-600";
	};
	return /* @__PURE__ */ jsx(SectionBase, {
		type: "profiles",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: cn("overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-colors", section.items.length === 0 && !isAddingProfile ? "border-gray-300 border-dashed" : "border-gray-200"),
					children: [
						/* @__PURE__ */ jsx(SortableList, {
							items: section.items,
							onReorder: handleReorder,
							keyExtractor: (item) => item.id,
							renderItem: (profile) => /* @__PURE__ */ jsx(SortableItem, {
								id: profile.id,
								className: "group border-gray-200 border-b last:border-b-0",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 p-4 transition-all hover:bg-gray-50",
									children: [
										/* @__PURE__ */ jsx(DragHandle, { className: "shrink-0 p-1 text-gray-400 transition-colors hover:text-gray-600" }),
										/* @__PURE__ */ jsx("div", {
											className: cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white text-xl", getNetworkColor(profile.network)),
											children: getNetworkIcon(profile.network)
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-semibold text-gray-900 text-sm",
												children: profile.network
											}), /* @__PURE__ */ jsx("p", {
												className: "truncate text-gray-600 text-sm",
												children: profile.username
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex shrink-0 items-center gap-2",
											children: [/* @__PURE__ */ jsx("button", {
												onClick: () => startEditing(profile),
												className: "rounded-lg p-2 text-gray-600 transition-all hover:bg-emerald-50 hover:text-emerald-600",
												title: "Edit",
												type: "button",
												children: /* @__PURE__ */ jsx("svg", {
													className: "h-4 w-4",
													fill: "none",
													stroke: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", {
														strokeLinecap: "round",
														strokeLinejoin: "round",
														strokeWidth: 2,
														d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													})
												})
											}), /* @__PURE__ */ jsx("button", {
												onClick: () => handleDeleteProfile(profile.id),
												className: "rounded-lg p-2 text-gray-600 transition-all hover:bg-red-50 hover:text-red-600",
												title: "Delete",
												type: "button",
												children: /* @__PURE__ */ jsx("svg", {
													className: "h-4 w-4",
													fill: "none",
													stroke: "currentColor",
													viewBox: "0 0 24 24",
													children: /* @__PURE__ */ jsx("path", {
														strokeLinecap: "round",
														strokeLinejoin: "round",
														strokeWidth: 2,
														d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													})
												})
											})]
										})
									]
								})
							}, profile.id)
						}),
						(isAddingProfile || editingId) && /* @__PURE__ */ jsxs("div", {
							className: "border-gray-200 border-t bg-gray-50 p-4",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "mb-4 font-semibold text-gray-900 text-sm",
								children: editingId ? "Edit Profile" : "Add New Profile"
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "mb-2 block font-medium text-gray-700 text-xs",
										children: "Social Network"
									}), /* @__PURE__ */ jsx("select", {
										value: formData.network,
										onChange: (e) => setFormData({
											...formData,
											network: e.target.value
										}),
										className: "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500",
										children: socialNetworks.map((network) => /* @__PURE__ */ jsxs("option", {
											value: network.name,
											children: [
												network.icon,
												" ",
												network.name
											]
										}, network.name))
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "mb-2 block font-medium text-gray-700 text-xs",
										children: "Username"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: formData.username,
										onChange: (e) => setFormData({
											...formData,
											username: e.target.value
										}),
										placeholder: "johndoe",
										className: "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "mb-2 block font-medium text-gray-700 text-xs",
										children: "Profile URL"
									}), /* @__PURE__ */ jsx("input", {
										type: "url",
										value: formData.url,
										onChange: (e) => setFormData({
											...formData,
											url: e.target.value
										}),
										placeholder: socialNetworks.find((n) => n.name === formData.network)?.placeholder,
										className: "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 pt-2",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: editingId ? handleUpdateProfile : handleAddProfile,
											className: "flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-sm text-white transition-all hover:bg-emerald-700",
											type: "button",
											children: editingId ? "Update Profile" : "Add Profile"
										}), /* @__PURE__ */ jsx("button", {
											onClick: cancelForm,
											className: "rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-gray-300",
											type: "button",
											children: "Cancel"
										})]
									})
								]
							})]
						}),
						!isAddingProfile && !editingId && /* @__PURE__ */ jsx("div", {
							className: "p-4",
							children: /* @__PURE__ */ jsxs("button", {
								onClick: () => setIsAddingProfile(true),
								className: "flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 border-dashed py-3 font-medium text-gray-600 text-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700",
								type: "button",
								children: [/* @__PURE__ */ jsx("svg", {
									className: "h-5 w-5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M12 4v16m8-8H4"
									})
								}), "Add a new profile"]
							})
						}),
						section.items.length === 0 && !isAddingProfile && /* @__PURE__ */ jsxs("div", {
							className: "p-8 text-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100",
									children: /* @__PURE__ */ jsx("svg", {
										className: "h-8 w-8 text-gray-400",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
										})
									})
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "mb-1 font-semibold text-gray-900 text-sm",
									children: "No profiles added yet"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mb-4 text-gray-600 text-xs",
									children: "Add your social media profiles and professional links"
								})
							]
						})
					]
				}),
				section.items.length > 0 && !isAddingProfile && !editingId && /* @__PURE__ */ jsx("div", {
					className: "rounded-xl border border-blue-200 bg-blue-50 p-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ jsx("svg", {
							className: "mt-0.5 h-5 w-5 shrink-0 text-blue-600",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "mb-2 font-semibold text-blue-900 text-sm",
							children: "Profile Tips"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "space-y-1 text-blue-800 text-xs",
							children: [
								/* @__PURE__ */ jsx("li", { children: "• Add your most professional networks first (LinkedIn, GitHub)" }),
								/* @__PURE__ */ jsx("li", { children: "• Use consistent usernames across platforms when possible" }),
								/* @__PURE__ */ jsx("li", { children: "• Only include profiles that are relevant to your job search" }),
								/* @__PURE__ */ jsx("li", { children: "• Drag and drop to reorder profiles" })
							]
						})] })]
					})
				}),
				section.items.length === 0 && !isAddingProfile && /* @__PURE__ */ jsxs("div", {
					className: "rounded-xl border border-emerald-200 bg-linear-to-br from-emerald-50 p-4",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "mb-3 font-semibold text-gray-900 text-sm",
						children: "Popular Networks"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-2",
						children: socialNetworks.map((network) => /* @__PURE__ */ jsxs("button", {
							onClick: () => {
								setFormData({
									...formData,
									network: network.name
								});
								setIsAddingProfile(true);
							},
							className: "flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-medium text-gray-700 text-sm transition-all hover:bg-emerald-50 hover:text-emerald-700",
							type: "button",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-lg",
								children: network.icon
							}), network.name]
						}, network.name))
					})]
				})
			]
		})
	});
}
init_string();
function ProjectsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.projects);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.projects.items = items;
		});
	};
	const buildSubtitle = (item) => {
		const parts = [item.period, item.website.label].filter((part) => part && part.trim().length > 0);
		return parts.length > 0 ? parts.join(" • ") : void 0;
	};
	const [generatingIds, setGeneratingIds] = useState(/* @__PURE__ */ new Set());
	const handleAskZoe = async (id) => {
		setGeneratingIds((prev) => new Set([...prev, id]));
		try {
			const item = section.items.find((p) => p.id === id);
			if (!item) throw new Error("Project item not found");
			const response = await api.generateAIContent({
				resume_id: useResumeStore.getState().resume.id,
				type: "ProjectsDescription",
				value: stripHtml(item.name)
			});
			const aiDescription = Object.values(response)[0];
			updateResumeData((draft) => {
				const draftItem = draft.sections.projects.items.find((p) => p.id === id);
				if (draftItem) draftItem.description = aiDescription;
			});
			toast.success("AI project description generated!");
		} catch (error) {
			console.error("AI generation error:", error);
			toast.error(error instanceof Error ? error.message : "Failed to generate");
		} finally {
			setGeneratingIds((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		}
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "projects",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [
			/* @__PURE__ */ jsx(SortableList, {
				items: section.items,
				onReorder,
				keyExtractor: (item) => item.id,
				renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
					type: "projects",
					item,
					title: item.name,
					subtitle: buildSubtitle(item),
					onAskZoe: () => handleAskZoe(item.id)
				}, item.id)
			}),
			/* @__PURE__ */ jsx(SectionAddItemButton, {
				type: "projects",
				children: /* @__PURE__ */ jsx(Trans, { id: "O6bw1H" })
			}),
			generatingIds.size > 0 && /* @__PURE__ */ jsx("div", {
				className: "fixed right-8 bottom-8 max-w-sm animate-pulse rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-2xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-emerald-100",
						children: /* @__PURE__ */ jsx("img", {
							src: "/zoe-icon.png",
							alt: "Zoe",
							className: "h-8 w-8"
						})
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "mb-1 font-bold text-gray-900",
						children: "Zoe is working..."
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 text-sm",
						children: "Generating professional descriptions for your projects"
					})] })]
				})
			})
		]
	});
}
function PublicationsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.publications);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.publications.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "publications",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder: handleReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "publications",
				item,
				title: item.title,
				subtitle: item.publisher
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "publications",
			children: /* @__PURE__ */ jsx(Trans, { id: "p/At8y" })
		})]
	});
}
function ReferencesSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.references);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.references.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "references",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "references",
				item,
				title: item.name
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "references",
			children: /* @__PURE__ */ jsx(Trans, { id: "G51jfQ" })
		})]
	});
}
function SkillsSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.skills);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "skills",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder: (newItems) => {
				updateResumeData((draft) => {
					draft.sections.skills.items = newItems;
				});
			},
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "skills",
				item,
				title: item.name,
				subtitle: item.proficiency
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "skills",
			children: /* @__PURE__ */ jsx(Trans, { id: "K3qAaT" })
		})]
	});
}
function SummarySectionBuilder() {
	const summary = useResumeStore((state) => state.resume.data.summary);
	return /* @__PURE__ */ jsx(SectionBase, {
		type: "summary",
		children: /* @__PURE__ */ jsx(SortableSectionItem, {
			type: "summary",
			item: {
				id: "summary",
				...summary
			},
			title: "Edit Summary",
			subtitle: summary.content ? summary.content.replace(/<[^>]*>?/gm, "").slice(0, 120) : "Click to add your professional summary"
		})
	});
}
function VolunteerSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.volunteer);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const onReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.volunteer.items = items;
		});
	};
	return /* @__PURE__ */ jsxs(SectionBase, {
		type: "volunteer",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ jsx(SortableList, {
			items: section.items,
			onReorder,
			keyExtractor: (item) => item.id,
			renderItem: (item) => /* @__PURE__ */ jsx(SortableSectionItem, {
				type: "volunteer",
				item,
				title: item.organization,
				subtitle: item.location
			}, item.id)
		}), /* @__PURE__ */ jsx(SectionAddItemButton, {
			type: "volunteer",
			children: /* @__PURE__ */ jsx(Trans, { id: "kEJ+pR" })
		})]
	});
}
function getSectionComponent(type) {
	switch (type) {
		case "picture": return /* @__PURE__ */ jsx(PictureSectionBuilder, {});
		case "basics": return /* @__PURE__ */ jsx(BasicsSectionBuilder, {});
		case "profiles": return /* @__PURE__ */ jsx(ProfilesSectionBuilder, {});
		case "summary": return /* @__PURE__ */ jsx(SummarySectionBuilder, {});
		case "experience": return /* @__PURE__ */ jsx(ExperienceSectionBuilder, {});
		case "education": return /* @__PURE__ */ jsx(EducationSectionBuilder, {});
		case "projects": return /* @__PURE__ */ jsx(ProjectsSectionBuilder, {});
		case "skills": return /* @__PURE__ */ jsx(SkillsSectionBuilder, {});
		case "languages": return /* @__PURE__ */ jsx(LanguagesSectionBuilder, {});
		case "interests": return /* @__PURE__ */ jsx(InterestsSectionBuilder, {});
		case "awards": return /* @__PURE__ */ jsx(AwardsSectionBuilder, {});
		case "certifications": return /* @__PURE__ */ jsx(CertificationsSectionBuilder, {});
		case "publications": return /* @__PURE__ */ jsx(PublicationsSectionBuilder, {});
		case "volunteer": return /* @__PURE__ */ jsx(VolunteerSectionBuilder, {});
		case "references": return /* @__PURE__ */ jsx(ReferencesSectionBuilder, {});
		case "custom": return /* @__PURE__ */ jsx(CustomSectionBuilder, {});
		default: return null;
	}
}
function BuilderSidebarLeft() {
	const scrollAreaRef = useRef(null);
	const layout = useResumeStore((state) => state.resume.data.metadata.layout);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const orderedSections = useMemo(() => {
		const layoutSections = layout.pages.flatMap((page) => [...page.main, ...page.sidebar]);
		const ordered = [];
		const seen = /* @__PURE__ */ new Set();
		for (const section of layoutSections) {
			if (!leftSidebarSections.includes(section)) continue;
			if (seen.has(section)) continue;
			ordered.push(section);
			seen.add(section);
		}
		for (const section of leftSidebarSections) {
			if (seen.has(section)) continue;
			ordered.push(section);
			seen.add(section);
		}
		return ordered;
	}, [layout.pages]);
	const reorderableSections = useMemo(() => orderedSections.filter((section) => section !== "picture" && section !== "basics"), [orderedSections]);
	const fixedSections = useMemo(() => orderedSections.filter((section) => section === "picture" || section === "basics"), [orderedSections]);
	const [sectionOrder, setSectionOrder] = useState(reorderableSections);
	useEffect(() => {
		setSectionOrder(reorderableSections);
	}, [reorderableSections]);
	const handleSectionReorder = (nextOrder) => {
		setSectionOrder(nextOrder);
		updateResumeData((draft) => {
			draft.metadata.layout.pages.forEach((page) => {
				const mainKnown = nextOrder.filter((section) => page.main.includes(section));
				const mainUnknown = page.main.filter((section) => !nextOrder.includes(section));
				page.main = [...mainKnown, ...mainUnknown];
				const sidebarKnown = nextOrder.filter((section) => page.sidebar.includes(section));
				const sidebarUnknown = page.sidebar.filter((section) => !nextOrder.includes(section));
				page.sidebar = [...sidebarKnown, ...sidebarUnknown];
			});
		});
	};
	return /* @__PURE__ */ jsx(ScrollArea$1, {
		ref: scrollAreaRef,
		className: "@container h-[calc(100svh-3.5rem)] bg-gray-50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-3 p-3 sm:space-y-4 sm:p-4",
			children: [fixedSections.map((section) => /* @__PURE__ */ jsxs(Fragment, { children: [getSectionComponent(section), /* @__PURE__ */ jsx(Separator$1, {})] }, section)), /* @__PURE__ */ jsx(SortableList, {
				items: sectionOrder,
				onReorder: handleSectionReorder,
				keyExtractor: (section) => section,
				className: "space-y-3 sm:space-y-4",
				renderItem: (section) => /* @__PURE__ */ jsxs(SortableItem, {
					id: section,
					className: "space-y-3 sm:space-y-4",
					children: [getSectionComponent(section), /* @__PURE__ */ jsx(Separator$1, {})]
				}, section)
			})]
		})
	});
}
function RouteComponent() {
	const { layout: initialLayout } = Route.useLoaderData();
	const { resumeId } = Route.useParams();
	const { data: resume } = useSuspenseQuery({
		queryKey: ["resumes", resumeId],
		queryFn: () => api.fetchResume(resumeId)
	});
	const isReady = useResumeStore((state) => state.isReady);
	const initialize = useResumeStore((state) => state.initialize);
	useEffect(() => {
		initialize(resume);
		return () => initialize(null);
	}, [resume, initialize]);
	if (!isReady) return /* @__PURE__ */ jsx(LoadingScreen, {});
	return /* @__PURE__ */ jsx(BuilderLayout, { initialLayout });
}
function BuilderLayout({ initialLayout, ...props }) {
	const style = useCSSVariables(useResumeStore((state) => state.resume.data));
	const isMobile = useIsMobile();
	const leftSidebarRef = usePanelRef();
	const setLeftSidebar = useBuilderSidebarStore((state) => state.setLeftSidebar);
	const isLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.isLeftSidebarCollapsed);
	const setLeftSidebarCollapsed = useBuilderSidebarStore((state) => state.setLeftSidebarCollapsed);
	const showReviewDrawer = useResumeStore((state) => state.showReviewDrawer);
	const { maxSidebarSize } = useBuilderSidebar((state) => ({ maxSidebarSize: state.maxSidebarSize }));
	const onLayoutChange = useDebounceCallback((layout) => {
		setBuilderLayoutServerFn({ data: layout });
	}, 200);
	useEffect(() => {
		if (!leftSidebarRef?.current) return;
		setLeftSidebar(leftSidebarRef);
		setLeftSidebarCollapsed(leftSidebarRef.current.isCollapsed());
	}, [
		leftSidebarRef,
		setLeftSidebar,
		setLeftSidebarCollapsed
	]);
	const { width: windowWidth } = useWindowSize();
	const isTablet = !!(!isMobile && windowWidth && windowWidth >= 768 && windowWidth < 1024);
	useEffect(() => {
		if (isTablet && leftSidebarRef.current && leftSidebarRef.current.getSize().asPercentage < 42) leftSidebarRef.current.resize(42);
	}, [isTablet, leftSidebarRef]);
	const leftSidebarSize = isTablet ? Math.max(initialLayout.left || 0, 42) : Math.max(initialLayout.left || 0, 30);
	const artboardSize = 100 - leftSidebarSize;
	useEffect(() => {
		if (isMobile) setLeftSidebarCollapsed(true);
		else if (leftSidebarRef.current) {
			if (leftSidebarRef.current.getSize().asPercentage <= 0) leftSidebarRef.current.resize(leftSidebarSize);
		}
	}, [
		isMobile,
		setLeftSidebarCollapsed,
		leftSidebarRef,
		leftSidebarSize
	]);
	if (isMobile) return /* @__PURE__ */ jsxs("div", {
		className: "flex h-svh flex-col",
		...props,
		children: [/* @__PURE__ */ jsx(BuilderHeader, {}), /* @__PURE__ */ jsxs("div", {
			className: "relative flex-1 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "h-full",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}), !isLeftSidebarCollapsed && !showReviewDrawer && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 top-14 z-40 bg-black/50 transition-opacity",
				onClick: () => setLeftSidebarCollapsed(true),
				onKeyDown: (e) => e.key === "Escape" && setLeftSidebarCollapsed(true),
				role: "button",
				tabIndex: 0,
				"aria-label": "Close sidebar"
			}), /* @__PURE__ */ jsx("div", {
				className: "fixed inset-y-0 top-14 left-0 z-50 w-[85vw] max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-in-out",
				children: /* @__PURE__ */ jsx(BuilderSidebarLeft, {})
			})] })]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex h-svh flex-col",
		style,
		...props,
		children: [/* @__PURE__ */ jsx(BuilderHeader, {}), /* @__PURE__ */ jsxs(ResizableGroup, {
			orientation: "horizontal",
			className: "flex-1",
			onLayoutChange,
			children: [!showReviewDrawer && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(ResizablePanel, {
				collapsible: true,
				id: "left",
				panelRef: leftSidebarRef,
				maxSize: maxSidebarSize,
				minSize: 0,
				collapsedSize: 0,
				defaultSize: leftSidebarSize,
				className: "z-20 h-[calc(100svh-3.5rem)]",
				children: /* @__PURE__ */ jsx(BuilderSidebarLeft, {})
			}), /* @__PURE__ */ jsx(ResizableSeparator, {
				withHandle: true,
				className: "z-20 border-s"
			})] }), /* @__PURE__ */ jsx(ResizablePanel, {
				id: "artboard",
				defaultSize: artboardSize,
				className: "h-[calc(100svh-3.5rem)]",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})]
		})]
	});
}
var layoutSchema = z.record(z.string(), z.number()).catch({
	left: 30,
	artboard: 70
});
var setBuilderLayoutServerFn = createServerFn({ method: "POST" }).inputValidator(layoutSchema).handler(createSsrRpc("4cf8a2dd9971804ed852b0e8800e0801d53148f92b5cde984ecc2402a068ba3c"));
export { RouteComponent as component };
