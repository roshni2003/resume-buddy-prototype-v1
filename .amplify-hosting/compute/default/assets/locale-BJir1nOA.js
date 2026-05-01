import { o as setCookie$1 } from "./server-Ck__86By.js";
import { t as createServerFn } from "./createServerFn-Ch6eBU8Y.js";
import { t as createServerRpc } from "./createServerRpc-D6AcG1Bm.js";
import z from "zod";
var localeSchema = z.union([
	z.literal("af-ZA"),
	z.literal("am-ET"),
	z.literal("ar-SA"),
	z.literal("az-AZ"),
	z.literal("bg-BG"),
	z.literal("bn-BD"),
	z.literal("ca-ES"),
	z.literal("cs-CZ"),
	z.literal("da-DK"),
	z.literal("de-DE"),
	z.literal("el-GR"),
	z.literal("en-US"),
	z.literal("es-ES"),
	z.literal("fa-IR"),
	z.literal("fi-FI"),
	z.literal("fr-FR"),
	z.literal("he-IL"),
	z.literal("hi-IN"),
	z.literal("hu-HU"),
	z.literal("id-ID"),
	z.literal("it-IT"),
	z.literal("ja-JP"),
	z.literal("km-KH"),
	z.literal("kn-IN"),
	z.literal("ko-KR"),
	z.literal("lt-LT"),
	z.literal("lv-LV"),
	z.literal("ml-IN"),
	z.literal("mr-IN"),
	z.literal("ms-MY"),
	z.literal("ne-NP"),
	z.literal("nl-NL"),
	z.literal("no-NO"),
	z.literal("or-IN"),
	z.literal("pl-PL"),
	z.literal("pt-BR"),
	z.literal("pt-PT"),
	z.literal("ro-RO"),
	z.literal("ru-RU"),
	z.literal("sk-SK"),
	z.literal("sq-AL"),
	z.literal("sr-SP"),
	z.literal("sv-SE"),
	z.literal("ta-IN"),
	z.literal("te-IN"),
	z.literal("th-TH"),
	z.literal("tr-TR"),
	z.literal("uk-UA"),
	z.literal("uz-UZ"),
	z.literal("vi-VN"),
	z.literal("zh-CN"),
	z.literal("zh-TW"),
	z.literal("zu-ZA")
]);
var storageKey = "locale";
var setLocaleServerFn_createServerFn_handler = createServerRpc({
	id: "14080f89ae495ac5a5d573b2a10df3d783b0f8d025c02f37771c42e9f7e4faa7",
	name: "setLocaleServerFn",
	filename: "src/utils/locale.ts"
}, (opts) => setLocaleServerFn.__executeServer(opts));
var setLocaleServerFn = createServerFn({ method: "POST" }).inputValidator(localeSchema).handler(setLocaleServerFn_createServerFn_handler, async ({ data }) => {
	setCookie$1(storageKey, data);
});
export { setLocaleServerFn_createServerFn_handler };
