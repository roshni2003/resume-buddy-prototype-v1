import { Separator } from "radix-ui";
import { jsx } from "react/jsx-runtime";
import { t as cn } from "./style-BVXxCckg.js";

function Separator$1({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ jsx(Separator.Root, {
		"data-slot": "separator",
		decorative,
		orientation,
		className: cn(
			"shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
			className,
		),
		...props,
	});
}
export { Separator$1 as t };
