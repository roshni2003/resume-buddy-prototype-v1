import { Trans } from "@lingui/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { t as Spinner } from "./spinner-D8fbffbw.js";

function LoadingScreen() {
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-50 flex h-svh w-svw items-center justify-center gap-x-3 bg-background",
		children: [
			/* @__PURE__ */ jsx(Spinner, { className: "size-6" }),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: /* @__PURE__ */ jsx(Trans, { id: "Z3FXyt" }),
			}),
		],
	});
}
export { LoadingScreen as t };
