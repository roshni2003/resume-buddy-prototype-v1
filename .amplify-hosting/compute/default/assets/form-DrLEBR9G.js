import { isPlainObject } from "es-toolkit";
import { Label, Slot } from "radix-ui";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";
import { t as cn } from "./style-BVXxCckg.js";

function Label$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label.Root, {
		"data-slot": "label",
		className: cn(
			"flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
			className,
		),
		...props,
	});
}
var Form = FormProvider;
var FormFieldContext = React.createContext({});
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ jsx(FormFieldContext.Provider, {
		value: { name: props.name },
		children: /* @__PURE__ */ jsx(Controller, { ...props }),
	});
};
var useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};
var FormItemContext = React.createContext({});
function FormItem({ className, ...props }) {
	const id = React.useId();
	return /* @__PURE__ */ jsx(FormItemContext.Provider, {
		value: { id },
		children: /* @__PURE__ */ jsx("div", {
			"data-slot": "form-item",
			className: cn("grid gap-1.5", className),
			...props,
		}),
	});
}
function FormLabel({ className, ...props }) {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ jsx(Label$1, {
		"data-slot": "form-label",
		"data-error": !!error,
		className: cn("mb-0.5 data-[error=true]:text-destructive", className),
		htmlFor: formItemId,
		...props,
	});
}
function FormControl({ ...props }) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ jsx(Slot.Slot, {
		"data-slot": "form-control",
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props,
	});
}
function FormDescription({ className, ...props }) {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ jsx("p", {
		"data-slot": "form-description",
		id: formDescriptionId,
		className: cn("text-muted-foreground text-xs leading-normal", className),
		...props,
	});
}
function FormMessage({ className, ...props }) {
	const { error, formMessageId } = useFormField();
	function extractMessage(obj) {
		if (!obj || typeof obj !== "object") return void 0;
		if (isPlainObject(obj) && "message" in obj && typeof obj.message === "string") return obj.message;
		for (const value of Object.values(obj)) {
			const found = extractMessage(value);
			if (found) return found;
		}
	}
	const body = extractMessage(error);
	if (!body) return null;
	return /* @__PURE__ */ jsx("p", {
		id: formMessageId,
		"data-error": !!error,
		"data-slot": "form-message",
		className: cn("line-clamp-1 text-xs", error ? "text-destructive" : "text-muted-foreground", className),
		...props,
		children: body,
	});
}
export {
	FormItem as a,
	Label$1 as c,
	FormField as i,
	FormControl as n,
	FormLabel as o,
	FormDescription as r,
	FormMessage as s,
	Form as t,
};
