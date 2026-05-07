import { o as setCookie$1 } from "./server-Ck__86By.js";
import { t as createServerFn } from "./createServerFn-Ch6eBU8Y.js";
import { t as createServerRpc } from "./createServerRpc-D6AcG1Bm.js";
import z from "zod";
var themeSchema = z.union([z.literal("light"), z.literal("dark")]);
var storageKey = "theme";
var setThemeServerFn_createServerFn_handler = createServerRpc({
	id: "71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9",
	name: "setThemeServerFn",
	filename: "src/utils/theme.ts"
}, (opts) => setThemeServerFn.__executeServer(opts));
var setThemeServerFn = createServerFn({ method: "POST" }).inputValidator(themeSchema).handler(setThemeServerFn_createServerFn_handler, async ({ data }) => {
	setCookie$1(storageKey, data);
});
export { setThemeServerFn_createServerFn_handler };
