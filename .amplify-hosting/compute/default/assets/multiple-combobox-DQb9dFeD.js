import { n as useControlledState } from "./get-strict-context-CE5mktmJ.js";
import { t as cn } from "./style-BVXxCckg.js";
import { n as Button } from "./input-C4lW-WI7.js";
import { _ as CommandSeparator, d as Command, f as CommandEmpty, g as CommandList, h as CommandItem, i as PopoverContent, m as CommandInput, p as CommandGroup, r as Popover, s as PopoverTrigger } from "./badge-C7BDNxcP.js";
import * as React from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react";
import { i18n } from "@lingui/core";
var CLEAR_COMMAND_VALUE = "__command-clear-multi-select-combobox";
function MultipleCombobox({ options, value, defaultValue, placeholder = i18n._({ id: "O/7I0o" }), searchPlaceholder = i18n._({ id: "YIix5Y" }), emptyMessage = i18n._({ id: "MZbQHL" }), clearLabel = i18n._({ id: "FBIuPX" }), className, buttonProps, onValueChange, onOpenChange, disableClear = false, ...popoverProps }) {
	const [open, setOpen] = React.useState(false);
	const { children: buttonChildren, className: buttonClassName, ...buttonRest } = buttonProps ?? {};
	const resolvedDefaultValue = React.useMemo(() => defaultValue ? [...defaultValue] : [], [defaultValue]);
	const optionsByStringValue = React.useMemo(() => {
		return new Map(options.map((option) => [String(option.value), option]));
	}, [options]);
	const [selectedValues, setSelectedValues] = useControlledState({
		value,
		defaultValue: resolvedDefaultValue,
		onChange: (next) => onValueChange?.(next, next.map((item) => options.find((option) => option.value === item)).filter((option) => Boolean(option)))
	});
	const selectionSet = React.useMemo(() => new Set(selectedValues), [selectedValues]);
	const selectedOptions = React.useMemo(() => options.filter((option) => selectionSet.has(option.value)), [options, selectionSet]);
	const selectionCount = selectedOptions.length;
	const canClear = !disableClear && selectionCount > 0;
	const toggleOption = React.useCallback((option) => {
		if (option.disabled) return;
		setSelectedValues(selectionSet.has(option.value) ? selectedValues.filter((selected) => selected !== option.value) : [...selectedValues, option.value]);
	}, [
		selectionSet,
		selectedValues,
		setSelectedValues
	]);
	const handleSelect = React.useCallback((current) => {
		if (current === CLEAR_COMMAND_VALUE) {
			setSelectedValues([]);
			return;
		}
		const option = optionsByStringValue.get(current);
		if (!option) return;
		toggleOption(option);
	}, [
		optionsByStringValue,
		toggleOption,
		setSelectedValues
	]);
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: React.useCallback((nextOpen) => {
			setOpen(nextOpen);
			onOpenChange?.(nextOpen);
		}, [onOpenChange]),
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				role: "combobox",
				variant: "outline",
				"aria-expanded": open,
				"aria-label": "Multi-select Combobox",
				className: cn("min-w-0 justify-between gap-2 font-normal active:scale-100", buttonClassName),
				...buttonRest,
				children: typeof buttonChildren === "function" ? buttonChildren(selectedValues, selectedOptions) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
					className: "flex-1 truncate text-left",
					children: selectionCount > 0 ? `${selectionCount} selected` : placeholder
				}), /* @__PURE__ */ jsx(CaretUpDownIcon, {
					"aria-hidden": true,
					className: "ms-2 shrink-0 opacity-50"
				})] })
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: "start",
			role: "listbox",
			className: cn("w-[260px] p-0", className),
			"aria-multiselectable": "true",
			...popoverProps,
			children: /* @__PURE__ */ jsxs(Command, { children: [/* @__PURE__ */ jsx(CommandInput, { placeholder: searchPlaceholder }), /* @__PURE__ */ jsxs(CommandList, { children: [
				/* @__PURE__ */ jsx(CommandEmpty, { children: emptyMessage }),
				/* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => {
					const stringValue = String(option.value);
					const isSelected = selectionSet.has(option.value);
					const isDisabled = option.disabled ?? false;
					return /* @__PURE__ */ jsxs(CommandItem, {
						value: stringValue,
						keywords: option.keywords,
						onSelect: handleSelect,
						disabled: isDisabled,
						"data-selected": isSelected ? "" : void 0,
						"aria-selected": isSelected,
						children: [/* @__PURE__ */ jsx(CheckIcon, {
							"aria-hidden": true,
							className: cn("size-4 shrink-0 transition-opacity", isSelected ? "opacity-100" : "opacity-0")
						}), /* @__PURE__ */ jsx("span", {
							className: cn("truncate", isDisabled && "opacity-60"),
							children: option.label
						})]
					}, stringValue);
				}) }),
				canClear ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(CommandSeparator, {}), /* @__PURE__ */ jsx(CommandGroup, { children: /* @__PURE__ */ jsx(CommandItem, {
					value: CLEAR_COMMAND_VALUE,
					onSelect: handleSelect,
					keywords: [],
					"data-selected": void 0,
					"aria-selected": "false",
					children: clearLabel
				}) })] }) : null
			] })] })
		})]
	});
}
export { MultipleCombobox as t };
