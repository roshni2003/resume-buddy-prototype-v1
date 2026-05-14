import { t as getCookie } from "./server-Ck__86By.js";
import { t as createServerFn } from "./createServerFn-Ch6eBU8Y.js";
import { t as createSsrRpc } from "./createSsrRpc-9mmrq80i.js";
import z from "zod";
import { i18n } from "@lingui/core";
var __rolldown_dynamic_import_helper_default = (glob, path, segments) => {
	const query = path.lastIndexOf("?");
	const v = glob[query === -1 || query < path.lastIndexOf("/") ? path : path.slice(0, query)];
	if (v) return typeof v === "function" ? v() : Promise.resolve(v);
	return new Promise((_, reject) => {
		(typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path + (path.split("/").length !== segments ? ". Note that variables only represent file names one level deep." : ""))));
	});
};
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
var defaultLocale = "en-US";
const localeMap = {
	"af-ZA": { id: "1Cox/a" },
	"am-ET": { id: "UV0J8D" },
	"ar-SA": { id: "8HV3WN" },
	"az-AZ": { id: "/IkoRr" },
	"bg-BG": { id: "KhEBDR" },
	"bn-BD": { id: "Hds3Bq" },
	"ca-ES": { id: "M1RLfx" },
	"cs-CZ": { id: "w9VTXG" },
	"da-DK": { id: "Fo2vDn" },
	"de-DE": { id: "DDcvSo" },
	"el-GR": { id: "CZXzs4" },
	"en-US": { id: "lYGfRP" },
	"es-ES": { id: "65A04M" },
	"fa-IR": { id: "JFI3iH" },
	"fi-FI": { id: "USZ2N6" },
	"fr-FR": { id: "nLC6tu" },
	"he-IL": { id: "3oTCgM" },
	"hi-IN": { id: "tGjibo" },
	"hu-HU": { id: "mkWad2" },
	"id-ID": { id: "BQukYF" },
	"it-IT": { id: "Lj7sBL" },
	"ja-JP": { id: "dFtidv" },
	"km-KH": { id: "Fb6WVr" },
	"kn-IN": { id: "ffJEXe" },
	"ko-KR": { id: "h6S9Yz" },
	"lt-LT": { id: "Ot2qtY" },
	"lv-LV": { id: "/0YsGP" },
	"ml-IN": { id: "WQrafy" },
	"mr-IN": { id: "vKSpmV" },
	"ms-MY": { id: "tF97tn" },
	"ne-NP": { id: "3v9KAT" },
	"nl-NL": { id: "KIjvtr" },
	"no-NO": { id: "1IipHp" },
	"or-IN": { id: "S8nPbQ" },
	"pl-PL": { id: "trnWaw" },
	"pt-BR": { id: "R7+D0/" },
	"pt-PT": { id: "512Uma" },
	"ro-RO": { id: "uJc01W" },
	"ru-RU": { id: "nji0/X" },
	"sk-SK": { id: "paESr6" },
	"sq-AL": { id: "pVxf7b" },
	"sr-SP": { id: "9aBtdW" },
	"sv-SE": { id: "UaISq3" },
	"ta-IN": { id: "fb427h" },
	"te-IN": { id: "2SnOmG" },
	"th-TH": { id: "SUr44j" },
	"tr-TR": { id: "Kz91g/" },
	"uk-UA": { id: "V9+2pH" },
	"uz-UZ": { id: "b1dG47" },
	"vi-VN": { id: "fROFIL" },
	"zh-CN": { id: "6imsQS" },
	"zh-TW": { id: "DM4gBB" },
	"zu-ZA": { id: "+v7Dt7" }
};
function isLocale(locale) {
	return localeSchema.safeParse(locale).success;
}
var RTL_LANGUAGES = new Set([
	"ar",
	"ckb",
	"dv",
	"fa",
	"he",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function isRTL(locale) {
	const language = locale.split("-")[0].toLowerCase();
	return RTL_LANGUAGES.has(language);
}
const getLocale = async () => {
	const cookieLocale = getCookie(storageKey);
	if (!cookieLocale || !isLocale(cookieLocale)) return defaultLocale;
	return cookieLocale;
};
const setLocaleServerFn = createServerFn({ method: "POST" }).inputValidator(localeSchema).handler(createSsrRpc("14080f89ae495ac5a5d573b2a10df3d783b0f8d025c02f37771c42e9f7e4faa7"));
const loadLocale = async (locale) => {
	if (!isLocale(locale)) locale = defaultLocale;
	const { messages } = await __rolldown_dynamic_import_helper_default({
		"../../locales/af-ZA.po": () => import("./af-ZA-CBlTY68Z.js"),
		"../../locales/am-ET.po": () => import("./am-ET-iW6ACzIV.js"),
		"../../locales/ar-SA.po": () => import("./ar-SA-Bcp9D8Yq.js"),
		"../../locales/az-AZ.po": () => import("./az-AZ-dsCJfY2t.js"),
		"../../locales/bg-BG.po": () => import("./bg-BG-GtzPmP2C.js"),
		"../../locales/bn-BD.po": () => import("./bn-BD-CIBvgFfY.js"),
		"../../locales/ca-ES.po": () => import("./ca-ES-CJ7QmLuB.js"),
		"../../locales/cs-CZ.po": () => import("./cs-CZ-B3dktx9L.js"),
		"../../locales/da-DK.po": () => import("./da-DK-h_Muy93H.js"),
		"../../locales/de-DE.po": () => import("./de-DE-BAmhIh4c.js"),
		"../../locales/el-GR.po": () => import("./el-GR-DyYtginw.js"),
		"../../locales/en-US.po": () => import("./en-US-CO-7vlHt.js"),
		"../../locales/es-ES.po": () => import("./es-ES-JAHxWA5U.js"),
		"../../locales/fa-IR.po": () => import("./fa-IR-DFysIACU.js"),
		"../../locales/fi-FI.po": () => import("./fi-FI-yZ6xfirH.js"),
		"../../locales/fr-FR.po": () => import("./fr-FR-Rx1YGwLG.js"),
		"../../locales/he-IL.po": () => import("./he-IL-CAmo6rYo.js"),
		"../../locales/hi-IN.po": () => import("./hi-IN-Mgkrdyxq.js"),
		"../../locales/hu-HU.po": () => import("./hu-HU-ErbH0w8h.js"),
		"../../locales/id-ID.po": () => import("./id-ID-ACKqj3od.js"),
		"../../locales/it-IT.po": () => import("./it-IT-CYS0Ru-T.js"),
		"../../locales/ja-JP.po": () => import("./ja-JP-B7MmZyr7.js"),
		"../../locales/km-KH.po": () => import("./km-KH-gn7EMhJR.js"),
		"../../locales/kn-IN.po": () => import("./kn-IN-DkUG40m_.js"),
		"../../locales/ko-KR.po": () => import("./ko-KR-6KJojCnc.js"),
		"../../locales/lt-LT.po": () => import("./lt-LT-Be9cGxPK.js"),
		"../../locales/lv-LV.po": () => import("./lv-LV-COo7IUlp.js"),
		"../../locales/ml-IN.po": () => import("./ml-IN-DFw4UuX_.js"),
		"../../locales/mr-IN.po": () => import("./mr-IN-CSEcm4so.js"),
		"../../locales/ms-MY.po": () => import("./ms-MY-CMW-ESWL.js"),
		"../../locales/ne-NP.po": () => import("./ne-NP-B8aFmz46.js"),
		"../../locales/nl-NL.po": () => import("./nl-NL-DexIedS_.js"),
		"../../locales/no-NO.po": () => import("./no-NO-B3rKxBQK.js"),
		"../../locales/or-IN.po": () => import("./or-IN-DajBwhc5.js"),
		"../../locales/pl-PL.po": () => import("./pl-PL-DfOI4o5H.js"),
		"../../locales/pt-BR.po": () => import("./pt-BR-CbAySQuj.js"),
		"../../locales/pt-PT.po": () => import("./pt-PT-BhRR_9cj.js"),
		"../../locales/ro-RO.po": () => import("./ro-RO-Be6Nmb9z.js"),
		"../../locales/ru-RU.po": () => import("./ru-RU-aN4OPnjC.js"),
		"../../locales/sk-SK.po": () => import("./sk-SK-Q-QTsYSj.js"),
		"../../locales/sl-SI.po": () => import("./sl-SI-BoIRjE7n.js"),
		"../../locales/sq-AL.po": () => import("./sq-AL-DlcW_HVN.js"),
		"../../locales/sr-SP.po": () => import("./sr-SP-DSRFzzlg.js"),
		"../../locales/sv-SE.po": () => import("./sv-SE-DFcpA-8i.js"),
		"../../locales/ta-IN.po": () => import("./ta-IN-BzsUcoZT.js"),
		"../../locales/te-IN.po": () => import("./te-IN-BFCCjP0X.js"),
		"../../locales/th-TH.po": () => import("./th-TH-CvLfsyrr.js"),
		"../../locales/tr-TR.po": () => import("./tr-TR-B0VAtXmU.js"),
		"../../locales/uk-UA.po": () => import("./uk-UA-BhnYkKBR.js"),
		"../../locales/uz-UZ.po": () => import("./uz-UZ-CK7gUZIi.js"),
		"../../locales/vi-VN.po": () => import("./vi-VN-BX_lvbLX.js"),
		"../../locales/zh-CN.po": () => import("./zh-CN-BbpJ4Wue.js"),
		"../../locales/zh-TW.po": () => import("./zh-TW-C7q-8FAV.js"),
		"../../locales/zu-ZA.po": () => import("./zu-ZA-UD8eKfTE.js")
	}, `../../locales/${locale}.po`, 4);
	i18n.loadAndActivate({
		locale,
		messages
	});
};
export { localeMap as a, loadLocale as i, isLocale as n, setLocaleServerFn as o, isRTL as r, getLocale as t };
