import { o as setCookie$1, t as getCookie } from "./server-Ck__86By.js";
import { t as createServerFn } from "./createServerFn-Ch6eBU8Y.js";
import { t as createServerRpc } from "./createServerRpc-D6AcG1Bm.js";
import z from "zod";
var defaultLayout = {
	left: 30,
	artboard: 70
};
var BUILDER_LAYOUT_COOKIE_NAME = "builder_layout";
var layoutSchema = z.record(z.string(), z.number()).catch(defaultLayout);
var setBuilderLayoutServerFn_createServerFn_handler = createServerRpc({
	id: "4cf8a2dd9971804ed852b0e8800e0801d53148f92b5cde984ecc2402a068ba3c",
	name: "setBuilderLayoutServerFn",
	filename: "src/routes/builder/$resumeId/route.tsx"
}, (opts) => setBuilderLayoutServerFn.__executeServer(opts));
var setBuilderLayoutServerFn = createServerFn({ method: "POST" }).inputValidator(layoutSchema).handler(setBuilderLayoutServerFn_createServerFn_handler, async ({ data }) => {
	setCookie$1(BUILDER_LAYOUT_COOKIE_NAME, JSON.stringify(data));
});
var getBuilderLayoutServerFn_createServerFn_handler = createServerRpc({
	id: "87b9e274e18165348265760f0c6066b95da714ecd2e1a1b30427498be3225e01",
	name: "getBuilderLayoutServerFn",
	filename: "src/routes/builder/$resumeId/route.tsx"
}, (opts) => getBuilderLayoutServerFn.__executeServer(opts));
var getBuilderLayoutServerFn = createServerFn({ method: "GET" }).handler(getBuilderLayoutServerFn_createServerFn_handler, async () => {
	const layout = getCookie(BUILDER_LAYOUT_COOKIE_NAME);
	if (!layout) return defaultLayout;
	return layoutSchema.parse(JSON.parse(layout));
});
export { getBuilderLayoutServerFn_createServerFn_handler, setBuilderLayoutServerFn_createServerFn_handler };
