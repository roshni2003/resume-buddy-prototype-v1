import { t as cn } from "./style-BVXxCckg.js";
import { jsx } from "react/jsx-runtime";
import { SpinnerIcon } from "@phosphor-icons/react";
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ jsx(SpinnerIcon, {
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
export { Spinner as t };
