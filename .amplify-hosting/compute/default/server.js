import { a as requestHandler, i as getResponse } from "./assets/server-Ck__86By.js";
import { _ as isResolvedRedirect, a as getStartContext, c as safeObjectMerge, d as TSS_CONTENT_TYPE_FRAMED_VERSIONED, f as TSS_FORMDATA_CONTEXT, g as isRedirect, h as X_TSS_SERIALIZED, i as getStartOptions, l as FRAME_HEADER_SIZE, m as X_TSS_RAW_RESPONSE, n as flattenMiddlewares, o as runWithStartContext, p as TSS_SERVER_FUNCTION, r as mergeHeaders, s as createNullProtoObject, u as FrameType } from "./assets/createServerFn-Ch6eBU8Y.js";
import { t as getServerFnById } from "./assets/__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import "react";
import { RouterProvider } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { defineHandlerCallback, renderRouterToStream } from "@tanstack/react-router/ssr/server";
function StartServer(props) {
	return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
	request,
	router,
	responseHeaders,
	children: /* @__PURE__ */ jsx(StartServer, { router })
}));
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
function sanitizePathSegment(segment) {
	return segment.replace(/[\x00-\x1f\x7f]/g, "");
}
function decodeSegment(segment) {
	let decoded;
	try {
		decoded = decodeURI(segment);
	} catch {
		decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
			try {
				return decodeURI(match);
			} catch {
				return match;
			}
		});
	}
	return sanitizePathSegment(decoded);
}
function decodePath(path) {
	if (!path) return {
		path,
		handledProtocolRelativeURL: false
	};
	if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
		path,
		handledProtocolRelativeURL: false
	};
	const re$1 = /%25|%5C/gi;
	let cursor = 0;
	let result = "";
	let match;
	while (null !== (match = re$1.exec(path))) {
		result += decodeSegment(path.slice(cursor, match.index)) + match[0];
		cursor = re$1.lastIndex;
	}
	result = result + decodeSegment(cursor ? path.slice(cursor) : path);
	let handledProtocolRelativeURL = false;
	if (result.startsWith("//")) {
		handledProtocolRelativeURL = true;
		result = "/" + result.replace(/^\/+/, "");
	}
	return {
		path: result,
		handledProtocolRelativeURL
	};
}
function invariant() {
	throw new Error("Invariant failed");
}
function createLRUCache(max) {
	const cache = /* @__PURE__ */ new Map();
	let oldest;
	let newest;
	const touch = (entry) => {
		if (!entry.next) return;
		if (!entry.prev) {
			entry.next.prev = void 0;
			oldest = entry.next;
			entry.next = void 0;
			if (newest) {
				entry.prev = newest;
				newest.next = entry;
			}
		} else {
			entry.prev.next = entry.next;
			entry.next.prev = entry.prev;
			entry.next = void 0;
			if (newest) {
				newest.next = entry;
				entry.prev = newest;
			}
		}
		newest = entry;
	};
	return {
		get(key) {
			const entry = cache.get(key);
			if (!entry) return void 0;
			touch(entry);
			return entry.value;
		},
		set(key, value) {
			if (cache.size >= max && oldest) {
				const toDelete = oldest;
				cache.delete(toDelete.key);
				if (toDelete.next) {
					oldest = toDelete.next;
					toDelete.next.prev = void 0;
				}
				if (toDelete === newest) newest = void 0;
			}
			const existing = cache.get(key);
			if (existing) {
				existing.value = value;
				touch(existing);
			} else {
				const entry = {
					key,
					value,
					prev: newest
				};
				if (newest) newest.next = entry;
				newest = entry;
				if (!oldest) oldest = entry;
				cache.set(key, entry);
			}
		},
		clear() {
			cache.clear();
			oldest = void 0;
			newest = void 0;
		}
	};
}
function isNotFound(obj) {
	return obj?.isNotFound === true;
}
var rootRouteId = "__root__";
function executeRewriteInput(rewrite, url) {
	const res = rewrite?.input?.({ url });
	if (res) {
		if (typeof res === "string") return new URL(res);
		else if (res instanceof URL) return res;
	}
	return url;
}
var stateIndexKey = "__TSR_index";
function createHistory(opts) {
	let location = opts.getLocation();
	const subscribers = /* @__PURE__ */ new Set();
	const notify = (action) => {
		location = opts.getLocation();
		subscribers.forEach((subscriber) => subscriber({
			location,
			action
		}));
	};
	const handleIndexChange = (action) => {
		if (opts.notifyOnIndexChange ?? true) notify(action);
		else location = opts.getLocation();
	};
	const tryNavigation = async ({ task, navigateOpts, ...actionInfo }) => {
		if (navigateOpts?.ignoreBlocker ?? false) {
			task();
			return;
		}
		const blockers = opts.getBlockers?.() ?? [];
		const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
		if (typeof document !== "undefined" && blockers.length && isPushOrReplace) for (const blocker of blockers) {
			const nextLocation = parseHref(actionInfo.path, actionInfo.state);
			if (await blocker.blockerFn({
				currentLocation: location,
				nextLocation,
				action: actionInfo.type
			})) {
				opts.onBlocked?.();
				return;
			}
		}
		task();
	};
	return {
		get location() {
			return location;
		},
		get length() {
			return opts.getLength();
		},
		subscribers,
		subscribe: (cb) => {
			subscribers.add(cb);
			return () => {
				subscribers.delete(cb);
			};
		},
		push: (path, state, navigateOpts) => {
			const currentIndex = location.state[stateIndexKey];
			state = assignKeyAndIndex(currentIndex + 1, state);
			tryNavigation({
				task: () => {
					opts.pushState(path, state);
					notify({ type: "PUSH" });
				},
				navigateOpts,
				type: "PUSH",
				path,
				state
			});
		},
		replace: (path, state, navigateOpts) => {
			const currentIndex = location.state[stateIndexKey];
			state = assignKeyAndIndex(currentIndex, state);
			tryNavigation({
				task: () => {
					opts.replaceState(path, state);
					notify({ type: "REPLACE" });
				},
				navigateOpts,
				type: "REPLACE",
				path,
				state
			});
		},
		go: (index, navigateOpts) => {
			tryNavigation({
				task: () => {
					opts.go(index);
					handleIndexChange({
						type: "GO",
						index
					});
				},
				navigateOpts,
				type: "GO"
			});
		},
		back: (navigateOpts) => {
			tryNavigation({
				task: () => {
					opts.back(navigateOpts?.ignoreBlocker ?? false);
					handleIndexChange({ type: "BACK" });
				},
				navigateOpts,
				type: "BACK"
			});
		},
		forward: (navigateOpts) => {
			tryNavigation({
				task: () => {
					opts.forward(navigateOpts?.ignoreBlocker ?? false);
					handleIndexChange({ type: "FORWARD" });
				},
				navigateOpts,
				type: "FORWARD"
			});
		},
		canGoBack: () => location.state[stateIndexKey] !== 0,
		createHref: (str) => opts.createHref(str),
		block: (blocker) => {
			if (!opts.setBlockers) return () => {};
			const blockers = opts.getBlockers?.() ?? [];
			opts.setBlockers([...blockers, blocker]);
			return () => {
				const blockers$1 = opts.getBlockers?.() ?? [];
				opts.setBlockers?.(blockers$1.filter((b$1) => b$1 !== blocker));
			};
		},
		flush: () => opts.flush?.(),
		destroy: () => opts.destroy?.(),
		notify
	};
}
function assignKeyAndIndex(index, state) {
	if (!state) state = {};
	const key = createRandomKey();
	return {
		...state,
		key,
		__TSR_key: key,
		[stateIndexKey]: index
	};
}
function createMemoryHistory(opts = { initialEntries: ["/"] }) {
	const entries = opts.initialEntries;
	let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
	const states = entries.map((_entry, index$1) => assignKeyAndIndex(index$1, void 0));
	const getLocation = () => parseHref(entries[index], states[index]);
	let blockers = [];
	const _getBlockers = () => blockers;
	const _setBlockers = (newBlockers) => blockers = newBlockers;
	return createHistory({
		getLocation,
		getLength: () => entries.length,
		pushState: (path, state) => {
			if (index < entries.length - 1) {
				entries.splice(index + 1);
				states.splice(index + 1);
			}
			states.push(state);
			entries.push(path);
			index = Math.max(entries.length - 1, 0);
		},
		replaceState: (path, state) => {
			states[index] = state;
			entries[index] = path;
		},
		back: () => {
			index = Math.max(index - 1, 0);
		},
		forward: () => {
			index = Math.min(index + 1, entries.length - 1);
		},
		go: (n$1) => {
			index = Math.min(Math.max(index + n$1, 0), entries.length - 1);
		},
		createHref: (path) => path,
		getBlockers: _getBlockers,
		setBlockers: _setBlockers
	});
}
function sanitizePath(path) {
	let sanitized = path.replace(/[\x00-\x1f\x7f]/g, "");
	if (sanitized.startsWith("//")) sanitized = "/" + sanitized.replace(/^\/+/, "");
	return sanitized;
}
function parseHref(href, state) {
	const sanitizedHref = sanitizePath(href);
	const hashIndex = sanitizedHref.indexOf("#");
	const searchIndex = sanitizedHref.indexOf("?");
	const addedKey = createRandomKey();
	return {
		href: sanitizedHref,
		pathname: sanitizedHref.substring(0, hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : sanitizedHref.length),
		hash: hashIndex > -1 ? sanitizedHref.substring(hashIndex) : "",
		search: searchIndex > -1 ? sanitizedHref.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
		state: state || {
			[stateIndexKey]: 0,
			key: addedKey,
			__TSR_key: addedKey
		}
	};
}
function createRandomKey() {
	return (Math.random() + 1).toString(36).substring(7);
}
function resolveManifestAssetLink(link) {
	if (typeof link === "string") return {
		href: link,
		crossOrigin: void 0
	};
	return link;
}
function getStylesheetHref(asset) {
	if (asset.tag !== "link") return void 0;
	const rel = asset.attrs?.rel;
	const href = asset.attrs?.href;
	if (typeof href !== "string") return void 0;
	if (!(typeof rel === "string" ? rel.split(/\s+/) : []).includes("stylesheet")) return void 0;
	return href;
}
function isInlinableStylesheet(manifest, asset) {
	const href = getStylesheetHref(asset);
	return !!href && manifest?.inlineCss?.styles[href] !== void 0;
}
function createInlineCssStyleAsset(css) {
	return {
		tag: "style",
		attrs: { suppressHydrationWarning: true },
		inlineCss: true,
		children: css
	};
}
function createInlineCssPlaceholderAsset() {
	return {
		tag: "style",
		attrs: { suppressHydrationWarning: true },
		inlineCss: true
	};
}
var GLOBAL_TSR = "$_TSR";
var TSR_SCRIPT_BARRIER_ID = "$tsr-stream-barrier";
var L$1 = ((i$1) => (i$1[i$1.AggregateError = 1] = "AggregateError", i$1[i$1.ArrowFunction = 2] = "ArrowFunction", i$1[i$1.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", i$1[i$1.ObjectAssign = 8] = "ObjectAssign", i$1[i$1.BigIntTypedArray = 16] = "BigIntTypedArray", i$1[i$1.RegExp = 32] = "RegExp", i$1))(L$1 || {});
var v$1 = Symbol.asyncIterator, mr = Symbol.hasInstance, R = Symbol.isConcatSpreadable, C = Symbol.iterator, pr = Symbol.match, dr = Symbol.matchAll, gr = Symbol.replace, yr = Symbol.search, Nr = Symbol.species, br = Symbol.split, vr = Symbol.toPrimitive, P$1 = Symbol.toStringTag, Cr = Symbol.unscopables;
var rt = {
	0: "Symbol.asyncIterator",
	1: "Symbol.hasInstance",
	2: "Symbol.isConcatSpreadable",
	3: "Symbol.iterator",
	4: "Symbol.match",
	5: "Symbol.matchAll",
	6: "Symbol.replace",
	7: "Symbol.search",
	8: "Symbol.species",
	9: "Symbol.split",
	10: "Symbol.toPrimitive",
	11: "Symbol.toStringTag",
	12: "Symbol.unscopables"
}, ve = {
	[v$1]: 0,
	[mr]: 1,
	[R]: 2,
	[C]: 3,
	[pr]: 4,
	[dr]: 5,
	[gr]: 6,
	[yr]: 7,
	[Nr]: 8,
	[br]: 9,
	[vr]: 10,
	[P$1]: 11,
	[Cr]: 12
}, tt = {
	0: v$1,
	1: mr,
	2: R,
	3: C,
	4: pr,
	5: dr,
	6: gr,
	7: yr,
	8: Nr,
	9: br,
	10: vr,
	11: P$1,
	12: Cr
}, nt = {
	2: "!0",
	3: "!1",
	1: "void 0",
	0: "null",
	4: "-0",
	5: "1/0",
	6: "-1/0",
	7: "0/0"
}, o$1 = void 0, ot = {
	2: !0,
	3: !1,
	1: o$1,
	0: null,
	4: -0,
	5: Number.POSITIVE_INFINITY,
	6: Number.NEGATIVE_INFINITY,
	7: NaN
};
var Ce = {
	0: "Error",
	1: "EvalError",
	2: "RangeError",
	3: "ReferenceError",
	4: "SyntaxError",
	5: "TypeError",
	6: "URIError"
}, at = {
	0: Error,
	1: EvalError,
	2: RangeError,
	3: ReferenceError,
	4: SyntaxError,
	5: TypeError,
	6: URIError
};
function c$1(e, r, t, n$1, a, s, i$1, u$1, l$1, g$1, S, d$1) {
	return {
		t: e,
		i: r,
		s: t,
		c: n$1,
		m: a,
		p: s,
		e: i$1,
		a: u$1,
		f: l$1,
		b: g$1,
		o: S,
		l: d$1
	};
}
function B$1(e) {
	return c$1(2, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
var J = B$1(2), Z = B$1(3), Ae = B$1(1), Ee = B$1(0), st = B$1(4), it = B$1(5), ut = B$1(6), lt = B$1(7);
function fn(e) {
	switch (e) {
		case "\"": return "\\\"";
		case "\\": return "\\\\";
		case `
`: return "\\n";
		case "\r": return "\\r";
		case "\b": return "\\b";
		case "	": return "\\t";
		case "\f": return "\\f";
		case "<": return "\\x3C";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return o$1;
	}
}
function y$1(e) {
	let r = "", t = 0, n$1;
	for (let a = 0, s = e.length; a < s; a++) n$1 = fn(e[a]), n$1 && (r += e.slice(t, a) + n$1, t = a + 1);
	return t === 0 ? r = e : r += e.slice(t), r;
}
function Sn(e) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\\"": return "\"";
		case "\\n": return `
`;
		case "\\r": return "\r";
		case "\\b": return "\b";
		case "\\t": return "	";
		case "\\f": return "\f";
		case "\\x3C": return "<";
		case "\\u2028": return "\u2028";
		case "\\u2029": return "\u2029";
		default: return e;
	}
}
function D$1(e) {
	return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, Sn);
}
var U = "__SEROVAL_REFS__", ce = "$R", Ie = `self.${ce}`;
function mn(e) {
	return e == null ? `${Ie}=${Ie}||[]` : `(${Ie}=${Ie}||{})["${y$1(e)}"]=[]`;
}
var Ar = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map();
function Er(e) {
	return Ar.has(e);
}
function dn(e) {
	return j.has(e);
}
function ct(e) {
	if (Er(e)) return Ar.get(e);
	throw new Re(e);
}
function ft(e) {
	if (dn(e)) return j.get(e);
	throw new Pe(e);
}
typeof globalThis != "undefined" ? Object.defineProperty(globalThis, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof window != "undefined" ? Object.defineProperty(window, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof self != "undefined" ? Object.defineProperty(self, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof global != "undefined" && Object.defineProperty(global, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
});
function xe(e) {
	return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function gn(e) {
	let r = Ce[xe(e)];
	return e.name !== r ? { name: e.name } : e.constructor.name !== r ? { name: e.constructor.name } : {};
}
function $$1(e, r) {
	let t = gn(e), n$1 = Object.getOwnPropertyNames(e);
	for (let a = 0, s = n$1.length, i$1; a < s; a++) i$1 = n$1[a], i$1 !== "name" && i$1 !== "message" && (i$1 === "stack" ? r & 4 && (t = t || {}, t[i$1] = e[i$1]) : (t = t || {}, t[i$1] = e[i$1]));
	return t;
}
function Oe(e) {
	return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function Te(e) {
	switch (e) {
		case Number.POSITIVE_INFINITY: return it;
		case Number.NEGATIVE_INFINITY: return ut;
	}
	return e !== e ? lt : Object.is(e, -0) ? st : c$1(0, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function X(e) {
	return c$1(1, o$1, y$1(e), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function we(e) {
	return c$1(3, o$1, "" + e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function mt(e) {
	return c$1(4, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function he(e, r) {
	let t = r.valueOf();
	return c$1(5, e, t !== t ? "" : r.toISOString(), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function ze(e, r) {
	return c$1(6, e, o$1, y$1(r.source), r.flags, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function pt(e, r) {
	return c$1(17, e, ve[r], o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function dt(e, r) {
	return c$1(18, e, y$1(ct(r)), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function fe$1(e, r, t) {
	return c$1(25, e, t, y$1(r), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function _e(e, r, t) {
	return c$1(9, e, o$1, o$1, o$1, o$1, o$1, t, o$1, o$1, Oe(r), o$1);
}
function ke(e, r) {
	return c$1(21, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function De(e, r, t) {
	return c$1(15, e, o$1, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.length);
}
function Fe(e, r, t) {
	return c$1(16, e, o$1, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.byteLength);
}
function Be(e, r, t) {
	return c$1(20, e, o$1, o$1, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.byteLength);
}
function Ve(e, r, t) {
	return c$1(13, e, xe(r), o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Me(e, r, t) {
	return c$1(14, e, xe(r), o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Le(e, r) {
	return c$1(7, e, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1, o$1);
}
function Ue(e, r) {
	return c$1(28, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1, o$1);
}
function je(e, r) {
	return c$1(30, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1, o$1);
}
function Ye(e, r, t) {
	return c$1(31, e, o$1, o$1, o$1, o$1, o$1, t, r, o$1, o$1, o$1);
}
function qe(e, r) {
	return c$1(32, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function We(e, r) {
	return c$1(33, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function Ge(e, r) {
	return c$1(34, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function Ke(e, r, t, n$1) {
	return c$1(35, e, t, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1, n$1);
}
var { toString: ys } = Object.prototype;
var yn = {
	parsing: 1,
	serialization: 2,
	deserialization: 3
};
function Nn(e) {
	return `Seroval Error (step: ${yn[e]})`;
}
var bn = (e, r) => Nn(e), Se = class extends Error {
	constructor(t, n$1) {
		super(bn(t, n$1));
		this.cause = n$1;
	}
}, z = class extends Se {
	constructor(r) {
		super("parsing", r);
	}
}, He = class extends Se {
	constructor(r) {
		super("deserialization", r);
	}
};
function _(e) {
	return `Seroval Error (specific: ${e})`;
}
var x$1 = class extends Error {
	constructor(t) {
		super(_(1));
		this.value = t;
	}
}, w$1 = class extends Error {
	constructor(r) {
		super(_(2));
	}
}, Q = class extends Error {
	constructor(r) {
		super(_(3));
	}
}, V = class extends Error {
	constructor(r) {
		super(_(4));
	}
}, Re = class extends Error {
	constructor(t) {
		super(_(5));
		this.value = t;
	}
}, Pe = class extends Error {
	constructor(r) {
		super(_(6));
	}
}, Je = class extends Error {
	constructor(r) {
		super(_(7));
	}
}, h$1 = class extends Error {
	constructor(r) {
		super(_(8));
	}
};
Error;
var ee = class extends Error {
	constructor(r) {
		super(_(9));
	}
};
var Y$1 = class {
	constructor(r, t) {
		this.value = r;
		this.replacement = t;
	}
};
var re = () => {
	let e = {
		p: 0,
		s: 0,
		f: 0
	};
	return e.p = new Promise((r, t) => {
		e.s = r, e.f = t;
	}), e;
}, vn = (e, r) => {
	e.s(r), e.p.s = 1, e.p.v = r;
}, Cn = (e, r) => {
	e.f(r), e.p.s = 2, e.p.v = r;
}, yt = re.toString(), Nt = vn.toString(), bt = Cn.toString(), Rr = () => {
	let e = [], r = [], t = !0, n$1 = !1, a = 0, s = (l$1, g$1, S) => {
		for (S = 0; S < a; S++) r[S] && r[S][g$1](l$1);
	}, i$1 = (l$1, g$1, S, d$1) => {
		for (g$1 = 0, S = e.length; g$1 < S; g$1++) d$1 = e[g$1], !t && g$1 === S - 1 ? l$1[n$1 ? "return" : "throw"](d$1) : l$1.next(d$1);
	}, u$1 = (l$1, g$1) => (t && (g$1 = a++, r[g$1] = l$1), i$1(l$1), () => {
		t && (r[g$1] = r[a], r[a--] = void 0);
	});
	return {
		__SEROVAL_STREAM__: !0,
		on: (l$1) => u$1(l$1),
		next: (l$1) => {
			t && (e.push(l$1), s(l$1, "next"));
		},
		throw: (l$1) => {
			t && (e.push(l$1), s(l$1, "throw"), t = !1, n$1 = !1, r.length = 0);
		},
		return: (l$1) => {
			t && (e.push(l$1), s(l$1, "return"), t = !1, n$1 = !0, r.length = 0);
		}
	};
}, vt = Rr.toString(), Pr = (e) => (r) => () => {
	let t = 0, n$1 = {
		[e]: () => n$1,
		next: () => {
			if (t > r.d) return {
				done: !0,
				value: void 0
			};
			let a = t++, s = r.v[a];
			if (a === r.t) throw s;
			return {
				done: a === r.d,
				value: s
			};
		}
	};
	return n$1;
}, Ct = Pr.toString(), xr = (e, r) => (t) => () => {
	let n$1 = 0, a = -1, s = !1, i$1 = [], u$1 = [], l$1 = (S = 0, d$1 = u$1.length) => {
		for (; S < d$1; S++) u$1[S].s({
			done: !0,
			value: void 0
		});
	};
	t.on({
		next: (S) => {
			let d$1 = u$1.shift();
			d$1 && d$1.s({
				done: !1,
				value: S
			}), i$1.push(S);
		},
		throw: (S) => {
			let d$1 = u$1.shift();
			d$1 && d$1.f(S), l$1(), a = i$1.length, s = !0, i$1.push(S);
		},
		return: (S) => {
			let d$1 = u$1.shift();
			d$1 && d$1.s({
				done: !0,
				value: S
			}), l$1(), a = i$1.length, i$1.push(S);
		}
	});
	let g$1 = {
		[e]: () => g$1,
		next: () => {
			if (a === -1) {
				let K$1 = n$1++;
				if (K$1 >= i$1.length) {
					let et = r();
					return u$1.push(et), et.p;
				}
				return {
					done: !1,
					value: i$1[K$1]
				};
			}
			if (n$1 > a) return {
				done: !0,
				value: void 0
			};
			let S = n$1++, d$1 = i$1[S];
			if (S !== a) return {
				done: !1,
				value: d$1
			};
			if (s) throw d$1;
			return {
				done: !0,
				value: d$1
			};
		}
	};
	return g$1;
}, At = xr.toString(), Or = (e) => {
	let r = atob(e), t = r.length, n$1 = new Uint8Array(t);
	for (let a = 0; a < t; a++) n$1[a] = r.charCodeAt(a);
	return n$1.buffer;
}, Et = Or.toString();
function Ze(e) {
	return "__SEROVAL_SEQUENCE__" in e;
}
function Tr(e, r, t) {
	return {
		__SEROVAL_SEQUENCE__: !0,
		v: e,
		t: r,
		d: t
	};
}
function $e(e) {
	let r = [], t = -1, n$1 = -1, a = e[C]();
	for (;;) try {
		let s = a.next();
		if (r.push(s.value), s.done) {
			n$1 = r.length - 1;
			break;
		}
	} catch (s) {
		t = r.length, r.push(s);
	}
	return Tr(r, t, n$1);
}
var An = Pr(C);
function It(e) {
	return An(e);
}
var Rt = {}, Pt = {};
var xt = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
	5: {}
}, Ot = {
	0: "[]",
	1: yt,
	2: Nt,
	3: bt,
	4: vt,
	5: Et
};
function M(e) {
	return "__SEROVAL_STREAM__" in e;
}
function te() {
	return Rr();
}
function Xe(e) {
	let r = te(), t = e[v$1]();
	async function n$1() {
		try {
			let a = await t.next();
			a.done ? r.return(a.value) : (r.next(a.value), await n$1());
		} catch (a) {
			r.throw(a);
		}
	}
	return n$1().catch(() => {}), r;
}
var En = xr(v$1, re);
function Tt(e) {
	return En(e);
}
async function wr(e) {
	try {
		return [1, await e];
	} catch (r) {
		return [0, r];
	}
}
function pe$1(e, r) {
	return {
		plugins: r.plugins,
		mode: e,
		marked: /* @__PURE__ */ new Set(),
		features: 63 ^ (r.disabledFeatures || 0),
		refs: r.refs || /* @__PURE__ */ new Map(),
		depthLimit: r.depthLimit || 1e3
	};
}
function de(e, r) {
	e.marked.add(r);
}
function hr(e, r) {
	let t = e.refs.size;
	return e.refs.set(r, t), t;
}
function Qe(e, r) {
	let t = e.refs.get(r);
	return t != null ? (de(e, t), {
		type: 1,
		value: mt(t)
	}) : {
		type: 0,
		value: hr(e, r)
	};
}
function q$1(e, r) {
	let t = Qe(e, r);
	return t.type === 1 ? t : Er(r) ? {
		type: 2,
		value: dt(t.value, r)
	} : t;
}
function I(e, r) {
	let t = q$1(e, r);
	if (t.type !== 0) return t.value;
	if (r in ve) return pt(t.value, r);
	throw new x$1(r);
}
function k(e, r) {
	let t = Qe(e, xt[r]);
	return t.type === 1 ? t.value : c$1(26, t.value, r, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function er(e) {
	let r = Qe(e, Rt);
	return r.type === 1 ? r.value : c$1(27, r.value, o$1, o$1, o$1, o$1, o$1, o$1, I(e, C), o$1, o$1, o$1);
}
function rr(e) {
	let r = Qe(e, Pt);
	return r.type === 1 ? r.value : c$1(29, r.value, o$1, o$1, o$1, o$1, o$1, [k(e, 1), I(e, v$1)], o$1, o$1, o$1, o$1);
}
function tr(e, r, t, n$1) {
	return c$1(t ? 11 : 10, e, o$1, o$1, o$1, n$1, o$1, o$1, o$1, o$1, Oe(r), o$1);
}
function nr(e, r, t, n$1) {
	return c$1(8, r, o$1, o$1, o$1, o$1, {
		k: t,
		v: n$1
	}, o$1, k(e, 0), o$1, o$1, o$1);
}
function ht(e, r, t) {
	return c$1(22, r, t, o$1, o$1, o$1, o$1, o$1, k(e, 1), o$1, o$1, o$1);
}
function or(e, r, t) {
	let n$1 = new Uint8Array(t), a = "";
	for (let s = 0, i$1 = n$1.length; s < i$1; s++) a += String.fromCharCode(n$1[s]);
	return c$1(19, r, y$1(btoa(a)), o$1, o$1, o$1, o$1, o$1, k(e, 5), o$1, o$1, o$1);
}
function ne$1(e, r) {
	return {
		base: pe$1(e, r),
		child: void 0
	};
}
var _r = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return N$1(this._p, this.depth, r);
	}
};
async function Rn(e, r, t) {
	let n$1 = [];
	for (let a = 0, s = t.length; a < s; a++) a in t ? n$1[a] = await N$1(e, r, t[a]) : n$1[a] = 0;
	return n$1;
}
async function Pn(e, r, t, n$1) {
	return _e(t, n$1, await Rn(e, r, n$1));
}
async function kr(e, r, t) {
	let n$1 = Object.entries(t), a = [], s = [];
	for (let i$1 = 0, u$1 = n$1.length; i$1 < u$1; i$1++) a.push(y$1(n$1[i$1][0])), s.push(await N$1(e, r, n$1[i$1][1]));
	return C in t && (a.push(I(e.base, C)), s.push(Ue(er(e.base), await N$1(e, r, $e(t))))), v$1 in t && (a.push(I(e.base, v$1)), s.push(je(rr(e.base), await N$1(e, r, Xe(t))))), P$1 in t && (a.push(I(e.base, P$1)), s.push(X(t[P$1]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? J : Z)), {
		k: a,
		v: s
	};
}
async function zr(e, r, t, n$1, a) {
	return tr(t, n$1, a, await kr(e, r, n$1));
}
async function xn(e, r, t, n$1) {
	return ke(t, await N$1(e, r, n$1.valueOf()));
}
async function On(e, r, t, n$1) {
	return De(t, n$1, await N$1(e, r, n$1.buffer));
}
async function Tn(e, r, t, n$1) {
	return Fe(t, n$1, await N$1(e, r, n$1.buffer));
}
async function wn(e, r, t, n$1) {
	return Be(t, n$1, await N$1(e, r, n$1.buffer));
}
async function zt(e, r, t, n$1) {
	let a = $$1(n$1, e.base.features);
	return Ve(t, n$1, a ? await kr(e, r, a) : o$1);
}
async function hn(e, r, t, n$1) {
	let a = $$1(n$1, e.base.features);
	return Me(t, n$1, a ? await kr(e, r, a) : o$1);
}
async function zn(e, r, t, n$1) {
	let a = [], s = [];
	for (let [i$1, u$1] of n$1.entries()) a.push(await N$1(e, r, i$1)), s.push(await N$1(e, r, u$1));
	return nr(e.base, t, a, s);
}
async function _n(e, r, t, n$1) {
	let a = [];
	for (let s of n$1.keys()) a.push(await N$1(e, r, s));
	return Le(t, a);
}
async function _t(e, r, t, n$1) {
	let a = e.base.plugins;
	if (a) for (let s = 0, i$1 = a.length; s < i$1; s++) {
		let u$1 = a[s];
		if (u$1.parse.async && u$1.test(n$1)) return fe$1(t, u$1.tag, await u$1.parse.async(n$1, new _r(e, r), { id: t }));
	}
	return o$1;
}
async function kn(e, r, t, n$1) {
	let [a, s] = await wr(n$1);
	return c$1(12, t, a, o$1, o$1, o$1, o$1, o$1, await N$1(e, r, s), o$1, o$1, o$1);
}
function Dn(e, r, t, n$1, a) {
	let s = [], i$1 = t.on({
		next: (u$1) => {
			de(this.base, r), N$1(this, e, u$1).then((l$1) => {
				s.push(qe(r, l$1));
			}, (l$1) => {
				a(l$1), i$1();
			});
		},
		throw: (u$1) => {
			de(this.base, r), N$1(this, e, u$1).then((l$1) => {
				s.push(We(r, l$1)), n$1(s), i$1();
			}, (l$1) => {
				a(l$1), i$1();
			});
		},
		return: (u$1) => {
			de(this.base, r), N$1(this, e, u$1).then((l$1) => {
				s.push(Ge(r, l$1)), n$1(s), i$1();
			}, (l$1) => {
				a(l$1), i$1();
			});
		}
	});
}
async function Fn(e, r, t, n$1) {
	return Ye(t, k(e.base, 4), await new Promise(Dn.bind(e, r, t, n$1)));
}
async function Bn(e, r, t, n$1) {
	let a = [];
	for (let s = 0, i$1 = n$1.v.length; s < i$1; s++) a[s] = await N$1(e, r, n$1.v[s]);
	return Ke(t, a, n$1.t, n$1.d);
}
async function Vn(e, r, t, n$1) {
	if (Array.isArray(n$1)) return Pn(e, r, t, n$1);
	if (M(n$1)) return Fn(e, r, t, n$1);
	if (Ze(n$1)) return Bn(e, r, t, n$1);
	let a = n$1.constructor;
	if (a === Y$1) return N$1(e, r, n$1.replacement);
	let s = await _t(e, r, t, n$1);
	if (s) return s;
	switch (a) {
		case Object: return zr(e, r, t, n$1, !1);
		case o$1: return zr(e, r, t, n$1, !0);
		case Date: return he(t, n$1);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return zt(e, r, t, n$1);
		case Number:
		case Boolean:
		case String:
		case BigInt: return xn(e, r, t, n$1);
		case ArrayBuffer: return or(e.base, t, n$1);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return On(e, r, t, n$1);
		case DataView: return wn(e, r, t, n$1);
		case Map: return zn(e, r, t, n$1);
		case Set: return _n(e, r, t, n$1);
		default: break;
	}
	if (a === Promise || n$1 instanceof Promise) return kn(e, r, t, n$1);
	let i$1 = e.base.features;
	if (i$1 & 32 && a === RegExp) return ze(t, n$1);
	if (i$1 & 16) switch (a) {
		case BigInt64Array:
		case BigUint64Array: return Tn(e, r, t, n$1);
		default: break;
	}
	if (i$1 & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n$1 instanceof AggregateError)) return hn(e, r, t, n$1);
	if (n$1 instanceof Error) return zt(e, r, t, n$1);
	if (C in n$1 || v$1 in n$1) return zr(e, r, t, n$1, !!a);
	throw new x$1(n$1);
}
async function Mn(e, r, t) {
	let n$1 = q$1(e.base, t);
	if (n$1.type !== 0) return n$1.value;
	let a = await _t(e, r, n$1.value, t);
	if (a) return a;
	throw new x$1(t);
}
async function N$1(e, r, t) {
	switch (typeof t) {
		case "boolean": return t ? J : Z;
		case "undefined": return Ae;
		case "string": return X(t);
		case "number": return Te(t);
		case "bigint": return we(t);
		case "object":
			if (t) {
				let n$1 = q$1(e.base, t);
				return n$1.type === 0 ? await Vn(e, r + 1, n$1.value, t) : n$1.value;
			}
			return Ee;
		case "symbol": return I(e.base, t);
		case "function": return Mn(e, r, t);
		default: throw new x$1(t);
	}
}
async function oe(e, r) {
	try {
		return await N$1(e, 0, r);
	} catch (t) {
		throw t instanceof z ? t : new z(t);
	}
}
var ae = ((t) => (t[t.Vanilla = 1] = "Vanilla", t[t.Cross = 2] = "Cross", t))(ae || {});
function ni(e) {
	return e;
}
function kt(e, r) {
	for (let t = 0, n$1 = r.length; t < n$1; t++) {
		let a = r[t];
		e.has(a) || (e.add(a), a.extends && kt(e, a.extends));
	}
}
function A(e) {
	if (e) {
		let r = /* @__PURE__ */ new Set();
		return kt(r, e), [...r];
	}
}
function Dt(e) {
	switch (e) {
		case "Int8Array": return Int8Array;
		case "Int16Array": return Int16Array;
		case "Int32Array": return Int32Array;
		case "Uint8Array": return Uint8Array;
		case "Uint16Array": return Uint16Array;
		case "Uint32Array": return Uint32Array;
		case "Uint8ClampedArray": return Uint8ClampedArray;
		case "Float32Array": return Float32Array;
		case "Float64Array": return Float64Array;
		case "BigInt64Array": return BigInt64Array;
		case "BigUint64Array": return BigUint64Array;
		default: throw new Je(e);
	}
}
var Ln = 1e6, Un = 1e4, jn = 2e4;
function Bt(e, r) {
	switch (r) {
		case 3: return Object.freeze(e);
		case 1: return Object.preventExtensions(e);
		case 2: return Object.seal(e);
		default: return e;
	}
}
var Yn = 1e3;
function Vt(e, r) {
	var t;
	return {
		mode: e,
		plugins: r.plugins,
		refs: r.refs || /* @__PURE__ */ new Map(),
		features: (t = r.features) != null ? t : 63 ^ (r.disabledFeatures || 0),
		depthLimit: r.depthLimit || Yn
	};
}
function Mt(e) {
	return {
		mode: 1,
		base: Vt(1, e),
		child: o$1,
		state: { marked: new Set(e.markedRefs) }
	};
}
var Dr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	deserialize(r) {
		return p$1(this._p, this.depth, r);
	}
};
function Ut(e, r) {
	if (r < 0 || !Number.isFinite(r) || !Number.isInteger(r)) throw new h$1({
		t: 4,
		i: r
	});
	if (e.refs.has(r)) throw new Error("Conflicted ref id: " + r);
}
function qn(e, r, t) {
	return Ut(e.base, r), e.state.marked.has(r) && e.base.refs.set(r, t), t;
}
function Wn(e, r, t) {
	return Ut(e.base, r), e.base.refs.set(r, t), t;
}
function b(e, r, t) {
	return e.mode === 1 ? qn(e, r, t) : Wn(e, r, t);
}
function Fr(e, r, t) {
	if (Object.hasOwn(r, t)) return r[t];
	throw new h$1(e);
}
function Gn(e, r) {
	return b(e, r.i, ft(D$1(r.s)));
}
function Kn(e, r, t) {
	let n$1 = t.a, a = n$1.length, s = b(e, t.i, new Array(a));
	for (let i$1 = 0, u$1; i$1 < a; i$1++) u$1 = n$1[i$1], u$1 && (s[i$1] = p$1(e, r, u$1));
	return Bt(s, t.o), s;
}
function Hn(e) {
	switch (e) {
		case "constructor":
		case "__proto__":
		case "prototype":
		case "__defineGetter__":
		case "__defineSetter__":
		case "__lookupGetter__":
		case "__lookupSetter__": return !1;
		default: return !0;
	}
}
function Jn(e) {
	switch (e) {
		case v$1:
		case R:
		case P$1:
		case C: return !0;
		default: return !1;
	}
}
function Ft(e, r, t) {
	Hn(r) ? e[r] = t : Object.defineProperty(e, r, {
		value: t,
		configurable: !0,
		enumerable: !0,
		writable: !0
	});
}
function Zn(e, r, t, n$1, a) {
	if (typeof n$1 == "string") Ft(t, D$1(n$1), p$1(e, r, a));
	else {
		let s = p$1(e, r, n$1);
		switch (typeof s) {
			case "string":
				Ft(t, s, p$1(e, r, a));
				break;
			case "symbol":
				Jn(s) && (t[s] = p$1(e, r, a));
				break;
			default: throw new h$1(n$1);
		}
	}
}
function jt(e, r, t, n$1) {
	let a = t.k;
	if (a.length > 0) for (let i$1 = 0, u$1 = t.v, l$1 = a.length; i$1 < l$1; i$1++) Zn(e, r, n$1, a[i$1], u$1[i$1]);
	return n$1;
}
function $n(e, r, t) {
	let n$1 = b(e, t.i, t.t === 10 ? {} : Object.create(null));
	return jt(e, r, t.p, n$1), Bt(n$1, t.o), n$1;
}
function Xn(e, r) {
	return b(e, r.i, new Date(r.s));
}
function Qn(e, r) {
	if (e.base.features & 32) {
		let t = D$1(r.c);
		if (t.length > jn) throw new h$1(r);
		return b(e, r.i, new RegExp(t, r.m));
	}
	throw new w$1(r);
}
function eo(e, r, t) {
	let n$1 = b(e, t.i, /* @__PURE__ */ new Set());
	for (let a = 0, s = t.a, i$1 = s.length; a < i$1; a++) n$1.add(p$1(e, r, s[a]));
	return n$1;
}
function ro(e, r, t) {
	let n$1 = b(e, t.i, /* @__PURE__ */ new Map());
	for (let a = 0, s = t.e.k, i$1 = t.e.v, u$1 = s.length; a < u$1; a++) n$1.set(p$1(e, r, s[a]), p$1(e, r, i$1[a]));
	return n$1;
}
function to(e, r) {
	if (r.s.length > Ln) throw new h$1(r);
	return b(e, r.i, Or(D$1(r.s)));
}
function no(e, r, t) {
	var u$1;
	let n$1 = Dt(t.c), a = p$1(e, r, t.f), s = (u$1 = t.b) != null ? u$1 : 0;
	if (s < 0 || s > a.byteLength) throw new h$1(t);
	return b(e, t.i, new n$1(a, s, t.l));
}
function oo(e, r, t) {
	var i$1;
	let n$1 = p$1(e, r, t.f), a = (i$1 = t.b) != null ? i$1 : 0;
	if (a < 0 || a > n$1.byteLength) throw new h$1(t);
	return b(e, t.i, new DataView(n$1, a, t.l));
}
function Yt(e, r, t, n$1) {
	if (t.p) {
		let a = jt(e, r, t.p, {});
		Object.defineProperties(n$1, Object.getOwnPropertyDescriptors(a));
	}
	return n$1;
}
function ao(e, r, t) {
	return Yt(e, r, t, b(e, t.i, new AggregateError([], D$1(t.m))));
}
function so(e, r, t) {
	let n$1 = Fr(t, at, t.s);
	return Yt(e, r, t, b(e, t.i, new n$1(D$1(t.m))));
}
function io(e, r, t) {
	let n$1 = re(), a = b(e, t.i, n$1.p), s = p$1(e, r, t.f);
	return t.s ? n$1.s(s) : n$1.f(s), a;
}
function uo(e, r, t) {
	return b(e, t.i, Object(p$1(e, r, t.f)));
}
function lo(e, r, t) {
	let n$1 = e.base.plugins;
	if (n$1) {
		let a = D$1(t.c);
		for (let s = 0, i$1 = n$1.length; s < i$1; s++) {
			let u$1 = n$1[s];
			if (u$1.tag === a) return b(e, t.i, u$1.deserialize(t.s, new Dr(e, r), { id: t.i }));
		}
	}
	throw new Q(t.c);
}
function co(e, r) {
	return b(e, r.i, b(e, r.s, re()).p);
}
function fo(e, r, t) {
	let n$1 = e.base.refs.get(t.i);
	if (n$1) return n$1.s(p$1(e, r, t.a[1])), o$1;
	throw new V("Promise");
}
function So(e, r, t) {
	let n$1 = e.base.refs.get(t.i);
	if (n$1) return n$1.f(p$1(e, r, t.a[1])), o$1;
	throw new V("Promise");
}
function mo(e, r, t) {
	p$1(e, r, t.a[0]);
	return It(p$1(e, r, t.a[1]));
}
function po(e, r, t) {
	p$1(e, r, t.a[0]);
	return Tt(p$1(e, r, t.a[1]));
}
function go(e, r, t) {
	let n$1 = b(e, t.i, te()), a = t.a, s = a.length;
	if (s) for (let i$1 = 0; i$1 < s; i$1++) p$1(e, r, a[i$1]);
	return n$1;
}
function yo(e, r, t) {
	let n$1 = e.base.refs.get(t.i);
	if (n$1 && M(n$1)) return n$1.next(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function No(e, r, t) {
	let n$1 = e.base.refs.get(t.i);
	if (n$1 && M(n$1)) return n$1.throw(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function bo(e, r, t) {
	let n$1 = e.base.refs.get(t.i);
	if (n$1 && M(n$1)) return n$1.return(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function vo(e, r, t) {
	return p$1(e, r, t.f), o$1;
}
function Co(e, r, t) {
	return p$1(e, r, t.a[1]), o$1;
}
function Ao(e, r, t) {
	let n$1 = b(e, t.i, Tr([], t.s, t.l));
	for (let a = 0, s = t.a.length; a < s; a++) n$1.v[a] = p$1(e, r, t.a[a]);
	return n$1;
}
function p$1(e, r, t) {
	if (r > e.base.depthLimit) throw new ee(e.base.depthLimit);
	switch (r += 1, t.t) {
		case 2: return Fr(t, ot, t.s);
		case 0: return Number(t.s);
		case 1: return D$1(String(t.s));
		case 3:
			if (String(t.s).length > Un) throw new h$1(t);
			return BigInt(t.s);
		case 4: return e.base.refs.get(t.i);
		case 18: return Gn(e, t);
		case 9: return Kn(e, r, t);
		case 10:
		case 11: return $n(e, r, t);
		case 5: return Xn(e, t);
		case 6: return Qn(e, t);
		case 7: return eo(e, r, t);
		case 8: return ro(e, r, t);
		case 19: return to(e, t);
		case 16:
		case 15: return no(e, r, t);
		case 20: return oo(e, r, t);
		case 14: return ao(e, r, t);
		case 13: return so(e, r, t);
		case 12: return io(e, r, t);
		case 17: return Fr(t, tt, t.s);
		case 21: return uo(e, r, t);
		case 25: return lo(e, r, t);
		case 22: return co(e, t);
		case 23: return fo(e, r, t);
		case 24: return So(e, r, t);
		case 28: return mo(e, r, t);
		case 30: return po(e, r, t);
		case 31: return go(e, r, t);
		case 32: return yo(e, r, t);
		case 33: return No(e, r, t);
		case 34: return bo(e, r, t);
		case 27: return vo(e, r, t);
		case 29: return Co(e, r, t);
		case 35: return Ao(e, r, t);
		default: throw new w$1(t);
	}
}
function ar(e, r) {
	try {
		return p$1(e, 0, r);
	} catch (t) {
		throw new He(t);
	}
}
var Eo = () => T, Io = Eo.toString(), qt = /=>/.test(Io);
function sr(e, r) {
	return qt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
}
function Wt(e, r) {
	return qt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
}
var Ht = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_", Gt = Ht.length, Jt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_", Kt = Jt.length;
function Br(e) {
	let r = e % Gt, t = Ht[r];
	for (e = (e - r) / Gt; e > 0;) r = e % Kt, t += Jt[r], e = (e - r) / Kt;
	return t;
}
var Ro = /^[$A-Z_][0-9A-Z_$]*$/i;
function Vr(e) {
	let r = e[0];
	return (r === "$" || r === "_" || r >= "A" && r <= "Z" || r >= "a" && r <= "z") && Ro.test(e);
}
function ye(e) {
	switch (e.t) {
		case 0: return e.s + "=" + e.v;
		case 2: return e.s + ".set(" + e.k + "," + e.v + ")";
		case 1: return e.s + ".add(" + e.v + ")";
		case 3: return e.s + ".delete(" + e.k + ")";
	}
}
function Po(e) {
	let r = [], t = e[0];
	for (let n$1 = 1, a = e.length, s, i$1 = t; n$1 < a; n$1++) s = e[n$1], s.t === 0 && s.v === i$1.v ? t = {
		t: 0,
		s: s.s,
		k: o$1,
		v: ye(t)
	} : s.t === 2 && s.s === i$1.s ? t = {
		t: 2,
		s: ye(t),
		k: s.k,
		v: s.v
	} : s.t === 1 && s.s === i$1.s ? t = {
		t: 1,
		s: ye(t),
		k: o$1,
		v: s.v
	} : s.t === 3 && s.s === i$1.s ? t = {
		t: 3,
		s: ye(t),
		k: s.k,
		v: o$1
	} : (r.push(t), t = s), i$1 = s;
	return r.push(t), r;
}
function tn(e) {
	if (e.length) {
		let r = "", t = Po(e);
		for (let n$1 = 0, a = t.length; n$1 < a; n$1++) r += ye(t[n$1]) + ",";
		return r;
	}
	return o$1;
}
var xo = "Object.create(null)", Oo = "new Set", To = "new Map", wo = "Promise.resolve", ho = "Promise.reject", zo = {
	3: "Object.freeze",
	2: "Object.seal",
	1: "Object.preventExtensions",
	0: o$1
};
function nn(e, r) {
	return {
		mode: e,
		plugins: r.plugins,
		features: r.features,
		marked: new Set(r.markedRefs),
		stack: [],
		flags: [],
		assignments: []
	};
}
function ur(e) {
	return {
		mode: 2,
		base: nn(2, e),
		state: e,
		child: o$1
	};
}
var Mr = class {
	constructor(r) {
		this._p = r;
	}
	serialize(r) {
		return f$1(this._p, r);
	}
};
function ko(e, r) {
	let t = e.valid.get(r);
	t ?? (t = e.valid.size, e.valid.set(r, t));
	let n$1 = e.vars[t];
	return n$1 ?? (n$1 = Br(t), e.vars[t] = n$1), n$1;
}
function Do(e) {
	return ce + "[" + e + "]";
}
function m$1(e, r) {
	return e.mode === 1 ? ko(e.state, r) : Do(r);
}
function O$1(e, r) {
	e.marked.add(r);
}
function Lr(e, r) {
	return e.marked.has(r);
}
function jr(e, r, t) {
	r !== 0 && (O$1(e.base, t), e.base.flags.push({
		type: r,
		value: m$1(e, t)
	}));
}
function Fo(e) {
	let r = "";
	for (let t = 0, n$1 = e.flags, a = n$1.length; t < a; t++) {
		let s = n$1[t];
		r += zo[s.type] + "(" + s.value + "),";
	}
	return r;
}
function on(e) {
	let r = tn(e.assignments), t = Fo(e);
	return r ? t ? r + t : r : t;
}
function Yr(e, r, t) {
	e.assignments.push({
		t: 0,
		s: r,
		k: o$1,
		v: t
	});
}
function Bo(e, r, t) {
	e.base.assignments.push({
		t: 1,
		s: m$1(e, r),
		k: o$1,
		v: t
	});
}
function ge(e, r, t, n$1) {
	e.base.assignments.push({
		t: 2,
		s: m$1(e, r),
		k: t,
		v: n$1
	});
}
function Zt(e, r, t) {
	e.base.assignments.push({
		t: 3,
		s: m$1(e, r),
		k: t,
		v: o$1
	});
}
function Ne(e, r, t, n$1) {
	Yr(e.base, m$1(e, r) + "[" + t + "]", n$1);
}
function Ur(e, r, t, n$1) {
	Yr(e.base, m$1(e, r) + "." + t, n$1);
}
function Vo(e, r, t, n$1) {
	Yr(e.base, m$1(e, r) + ".v[" + t + "]", n$1);
}
function F(e, r) {
	return r.t === 4 && e.stack.includes(r.i);
}
function se(e, r, t) {
	return e.mode === 1 && !Lr(e.base, r) ? t : m$1(e, r) + "=" + t;
}
function Mo(e) {
	return U + ".get(\"" + e.s + "\")";
}
function $t(e, r, t, n$1) {
	return t ? F(e.base, t) ? (O$1(e.base, r), Ne(e, r, n$1, m$1(e, t.i)), "") : f$1(e, t) : "";
}
function Lo(e, r) {
	let t = r.i, n$1 = r.a, a = n$1.length;
	if (a > 0) {
		e.base.stack.push(t);
		let s = $t(e, t, n$1[0], 0), i$1 = s === "";
		for (let u$1 = 1, l$1; u$1 < a; u$1++) l$1 = $t(e, t, n$1[u$1], u$1), s += "," + l$1, i$1 = l$1 === "";
		return e.base.stack.pop(), jr(e, r.o, r.i), "[" + s + (i$1 ? ",]" : "]");
	}
	return "[]";
}
function Xt(e, r, t, n$1) {
	if (typeof t == "string") {
		let a = Number(t), s = a >= 0 && a.toString() === t || Vr(t);
		if (F(e.base, n$1)) {
			let i$1 = m$1(e, n$1.i);
			return O$1(e.base, r.i), s && a !== a ? Ur(e, r.i, t, i$1) : Ne(e, r.i, s ? t : "\"" + t + "\"", i$1), "";
		}
		return (s ? t : "\"" + t + "\"") + ":" + f$1(e, n$1);
	}
	return "[" + f$1(e, t) + "]:" + f$1(e, n$1);
}
function an(e, r, t) {
	let n$1 = t.k, a = n$1.length;
	if (a > 0) {
		let s = t.v;
		e.base.stack.push(r.i);
		let i$1 = Xt(e, r, n$1[0], s[0]);
		for (let u$1 = 1, l$1 = i$1; u$1 < a; u$1++) l$1 = Xt(e, r, n$1[u$1], s[u$1]), i$1 += (l$1 && i$1 && ",") + l$1;
		return e.base.stack.pop(), "{" + i$1 + "}";
	}
	return "{}";
}
function Uo(e, r) {
	return jr(e, r.o, r.i), an(e, r, r.p);
}
function jo(e, r, t, n$1) {
	let a = an(e, r, t);
	return a !== "{}" ? "Object.assign(" + n$1 + "," + a + ")" : n$1;
}
function Yo(e, r, t, n$1, a) {
	let s = e.base, i$1 = f$1(e, a), u$1 = Number(n$1), l$1 = u$1 >= 0 && u$1.toString() === n$1 || Vr(n$1);
	if (F(s, a)) l$1 && u$1 !== u$1 ? Ur(e, r.i, n$1, i$1) : Ne(e, r.i, l$1 ? n$1 : "\"" + n$1 + "\"", i$1);
	else {
		let g$1 = s.assignments;
		s.assignments = t, l$1 && u$1 !== u$1 ? Ur(e, r.i, n$1, i$1) : Ne(e, r.i, l$1 ? n$1 : "\"" + n$1 + "\"", i$1), s.assignments = g$1;
	}
}
function qo(e, r, t, n$1, a) {
	if (typeof n$1 == "string") Yo(e, r, t, n$1, a);
	else {
		let s = e.base, i$1 = s.stack;
		s.stack = [];
		let u$1 = f$1(e, a);
		s.stack = i$1;
		let l$1 = s.assignments;
		s.assignments = t, Ne(e, r.i, f$1(e, n$1), u$1), s.assignments = l$1;
	}
}
function Wo(e, r, t) {
	let n$1 = t.k, a = n$1.length;
	if (a > 0) {
		let s = [], i$1 = t.v;
		e.base.stack.push(r.i);
		for (let u$1 = 0; u$1 < a; u$1++) qo(e, r, s, n$1[u$1], i$1[u$1]);
		return e.base.stack.pop(), tn(s);
	}
	return o$1;
}
function qr(e, r, t) {
	if (r.p) {
		let n$1 = e.base;
		if (n$1.features & 8) t = jo(e, r, r.p, t);
		else {
			O$1(n$1, r.i);
			let a = Wo(e, r, r.p);
			if (a) return "(" + se(e, r.i, t) + "," + a + m$1(e, r.i) + ")";
		}
	}
	return t;
}
function Go(e, r) {
	return jr(e, r.o, r.i), qr(e, r, xo);
}
function Ko(e) {
	return "new Date(\"" + e.s + "\")";
}
function Ho(e, r) {
	if (e.base.features & 32) return "/" + r.c + "/" + r.m;
	throw new w$1(r);
}
function Qt(e, r, t) {
	let n$1 = e.base;
	return F(n$1, t) ? (O$1(n$1, r), Bo(e, r, m$1(e, t.i)), "") : f$1(e, t);
}
function Jo(e, r) {
	let t = Oo, n$1 = r.a, a = n$1.length, s = r.i;
	if (a > 0) {
		e.base.stack.push(s);
		let i$1 = Qt(e, s, n$1[0]);
		for (let u$1 = 1, l$1 = i$1; u$1 < a; u$1++) l$1 = Qt(e, s, n$1[u$1]), i$1 += (l$1 && i$1 && ",") + l$1;
		e.base.stack.pop(), i$1 && (t += "([" + i$1 + "])");
	}
	return t;
}
function en(e, r, t, n$1, a) {
	let s = e.base;
	if (F(s, t)) {
		let i$1 = m$1(e, t.i);
		if (O$1(s, r), F(s, n$1)) return ge(e, r, i$1, m$1(e, n$1.i)), "";
		if (n$1.t !== 4 && n$1.i != null && Lr(s, n$1.i)) {
			let l$1 = "(" + f$1(e, n$1) + ",[" + a + "," + a + "])";
			return ge(e, r, i$1, m$1(e, n$1.i)), Zt(e, r, a), l$1;
		}
		let u$1 = s.stack;
		return s.stack = [], ge(e, r, i$1, f$1(e, n$1)), s.stack = u$1, "";
	}
	if (F(s, n$1)) {
		let i$1 = m$1(e, n$1.i);
		if (O$1(s, r), t.t !== 4 && t.i != null && Lr(s, t.i)) {
			let l$1 = "(" + f$1(e, t) + ",[" + a + "," + a + "])";
			return ge(e, r, m$1(e, t.i), i$1), Zt(e, r, a), l$1;
		}
		let u$1 = s.stack;
		return s.stack = [], ge(e, r, f$1(e, t), i$1), s.stack = u$1, "";
	}
	return "[" + f$1(e, t) + "," + f$1(e, n$1) + "]";
}
function Zo(e, r) {
	let t = To, n$1 = r.e.k, a = n$1.length, s = r.i, i$1 = r.f, u$1 = m$1(e, i$1.i), l$1 = e.base;
	if (a > 0) {
		let g$1 = r.e.v;
		l$1.stack.push(s);
		let S = en(e, s, n$1[0], g$1[0], u$1);
		for (let d$1 = 1, K$1 = S; d$1 < a; d$1++) K$1 = en(e, s, n$1[d$1], g$1[d$1], u$1), S += (K$1 && S && ",") + K$1;
		l$1.stack.pop(), S && (t += "([" + S + "])");
	}
	return i$1.t === 26 && (O$1(l$1, i$1.i), t = "(" + f$1(e, i$1) + "," + t + ")"), t;
}
function $o(e, r) {
	return W(e, r.f) + "(\"" + r.s + "\")";
}
function Xo(e, r) {
	return "new " + r.c + "(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function Qo(e, r) {
	return "new DataView(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ea(e, r) {
	let t = r.i;
	e.base.stack.push(t);
	let n$1 = qr(e, r, "new AggregateError([],\"" + r.m + "\")");
	return e.base.stack.pop(), n$1;
}
function ra(e, r) {
	return qr(e, r, "new " + Ce[r.s] + "(\"" + r.m + "\")");
}
function ta(e, r) {
	let t, n$1 = r.f, a = r.i, s = r.s ? wo : ho, i$1 = e.base;
	if (F(i$1, n$1)) {
		let u$1 = m$1(e, n$1.i);
		t = s + (r.s ? "().then(" + sr([], u$1) + ")" : "().catch(" + Wt([], "throw " + u$1) + ")");
	} else {
		i$1.stack.push(a);
		let u$1 = f$1(e, n$1);
		i$1.stack.pop(), t = s + "(" + u$1 + ")";
	}
	return t;
}
function na(e, r) {
	return "Object(" + f$1(e, r.f) + ")";
}
function W(e, r) {
	let t = f$1(e, r);
	return r.t === 4 ? t : "(" + t + ")";
}
function oa(e, r) {
	if (e.mode === 1) throw new w$1(r);
	return "(" + se(e, r.s, W(e, r.f) + "()") + ").p";
}
function aa(e, r) {
	if (e.mode === 1) throw new w$1(r);
	return W(e, r.a[0]) + "(" + m$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function sa(e, r) {
	if (e.mode === 1) throw new w$1(r);
	return W(e, r.a[0]) + "(" + m$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function ia(e, r) {
	let t = e.base.plugins;
	if (t) for (let n$1 = 0, a = t.length; n$1 < a; n$1++) {
		let s = t[n$1];
		if (s.tag === r.c) return e.child ??= new Mr(e), s.serialize(r.s, e.child, { id: r.i });
	}
	throw new Q(r.c);
}
function ua(e, r) {
	let t = "", n$1 = !1;
	return r.f.t !== 4 && (O$1(e.base, r.f.i), t = "(" + f$1(e, r.f) + ",", n$1 = !0), t += se(e, r.i, "(" + Ct + ")(" + m$1(e, r.f.i) + ")"), n$1 && (t += ")"), t;
}
function la(e, r) {
	return W(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function ca(e, r) {
	let t = r.a[0], n$1 = r.a[1], a = e.base, s = "";
	t.t !== 4 && (O$1(a, t.i), s += "(" + f$1(e, t)), n$1.t !== 4 && (O$1(a, n$1.i), s += (s ? "," : "(") + f$1(e, n$1)), s && (s += ",");
	let i$1 = se(e, r.i, "(" + At + ")(" + m$1(e, n$1.i) + "," + m$1(e, t.i) + ")");
	return s ? s + i$1 + ")" : i$1;
}
function fa(e, r) {
	return W(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function Sa(e, r) {
	let t = se(e, r.i, W(e, r.f) + "()"), n$1 = r.a.length;
	if (n$1) {
		let a = f$1(e, r.a[0]);
		for (let s = 1; s < n$1; s++) a += "," + f$1(e, r.a[s]);
		return "(" + t + "," + a + "," + m$1(e, r.i) + ")";
	}
	return t;
}
function ma(e, r) {
	return m$1(e, r.i) + ".next(" + f$1(e, r.f) + ")";
}
function pa(e, r) {
	return m$1(e, r.i) + ".throw(" + f$1(e, r.f) + ")";
}
function da(e, r) {
	return m$1(e, r.i) + ".return(" + f$1(e, r.f) + ")";
}
function rn(e, r, t, n$1) {
	let a = e.base;
	return F(a, n$1) ? (O$1(a, r), Vo(e, r, t, m$1(e, n$1.i)), "") : f$1(e, n$1);
}
function ga(e, r) {
	let t = r.a, n$1 = t.length, a = r.i;
	if (n$1 > 0) {
		e.base.stack.push(a);
		let s = rn(e, a, 0, t[0]);
		for (let i$1 = 1, u$1 = s; i$1 < n$1; i$1++) u$1 = rn(e, a, i$1, t[i$1]), s += (u$1 && s && ",") + u$1;
		if (e.base.stack.pop(), s) return "{__SEROVAL_SEQUENCE__:!0,v:[" + s + "],t:" + r.s + ",d:" + r.l + "}";
	}
	return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function ya(e, r) {
	switch (r.t) {
		case 17: return rt[r.s];
		case 18: return Mo(r);
		case 9: return Lo(e, r);
		case 10: return Uo(e, r);
		case 11: return Go(e, r);
		case 5: return Ko(r);
		case 6: return Ho(e, r);
		case 7: return Jo(e, r);
		case 8: return Zo(e, r);
		case 19: return $o(e, r);
		case 16:
		case 15: return Xo(e, r);
		case 20: return Qo(e, r);
		case 14: return ea(e, r);
		case 13: return ra(e, r);
		case 12: return ta(e, r);
		case 21: return na(e, r);
		case 22: return oa(e, r);
		case 25: return ia(e, r);
		case 26: return Ot[r.s];
		case 35: return ga(e, r);
		default: throw new w$1(r);
	}
}
function f$1(e, r) {
	switch (r.t) {
		case 2: return nt[r.s];
		case 0: return "" + r.s;
		case 1: return "\"" + r.s + "\"";
		case 3: return r.s + "n";
		case 4: return m$1(e, r.i);
		case 23: return aa(e, r);
		case 24: return sa(e, r);
		case 27: return ua(e, r);
		case 28: return la(e, r);
		case 29: return ca(e, r);
		case 30: return fa(e, r);
		case 31: return Sa(e, r);
		case 32: return ma(e, r);
		case 33: return pa(e, r);
		case 34: return da(e, r);
		default: return se(e, r.i, ya(e, r));
	}
}
function cr(e, r) {
	let t = f$1(e, r), n$1 = r.i;
	if (n$1 == null) return t;
	let a = on(e.base), s = m$1(e, n$1), i$1 = e.state.scopeId, u$1 = i$1 == null ? "" : ce, l$1 = a ? "(" + t + "," + a + s + ")" : t;
	if (u$1 === "") return r.t === 10 && !a ? "(" + l$1 + ")" : l$1;
	let g$1 = i$1 == null ? "()" : "(" + ce + "[\"" + y$1(i$1) + "\"])";
	return "(" + sr([u$1], l$1) + ")" + g$1;
}
var Gr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return E$1(this._p, this.depth, r);
	}
}, Kr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return E$1(this._p, this.depth, r);
	}
	parseWithError(r) {
		return G(this._p, this.depth, r);
	}
	isAlive() {
		return this._p.state.alive;
	}
	pushPendingState() {
		Xr(this._p);
	}
	popPendingState() {
		be(this._p);
	}
	onParse(r) {
		ie(this._p, r);
	}
	onError(r) {
		Zr(this._p, r);
	}
};
function Na(e) {
	return {
		alive: !0,
		pending: 0,
		initial: !0,
		buffer: [],
		onParse: e.onParse,
		onError: e.onError,
		onDone: e.onDone
	};
}
function Hr(e) {
	return {
		type: 2,
		base: pe$1(2, e),
		state: Na(e)
	};
}
function ba(e, r, t) {
	let n$1 = [];
	for (let a = 0, s = t.length; a < s; a++) a in t ? n$1[a] = E$1(e, r, t[a]) : n$1[a] = 0;
	return n$1;
}
function va(e, r, t, n$1) {
	return _e(t, n$1, ba(e, r, n$1));
}
function Jr(e, r, t) {
	let n$1 = Object.entries(t), a = [], s = [];
	for (let i$1 = 0, u$1 = n$1.length; i$1 < u$1; i$1++) a.push(y$1(n$1[i$1][0])), s.push(E$1(e, r, n$1[i$1][1]));
	return C in t && (a.push(I(e.base, C)), s.push(Ue(er(e.base), E$1(e, r, $e(t))))), v$1 in t && (a.push(I(e.base, v$1)), s.push(je(rr(e.base), E$1(e, r, e.type === 1 ? te() : Xe(t))))), P$1 in t && (a.push(I(e.base, P$1)), s.push(X(t[P$1]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? J : Z)), {
		k: a,
		v: s
	};
}
function Wr(e, r, t, n$1, a) {
	return tr(t, n$1, a, Jr(e, r, n$1));
}
function Ca(e, r, t, n$1) {
	return ke(t, E$1(e, r, n$1.valueOf()));
}
function Aa(e, r, t, n$1) {
	return De(t, n$1, E$1(e, r, n$1.buffer));
}
function Ea(e, r, t, n$1) {
	return Fe(t, n$1, E$1(e, r, n$1.buffer));
}
function Ia(e, r, t, n$1) {
	return Be(t, n$1, E$1(e, r, n$1.buffer));
}
function sn(e, r, t, n$1) {
	let a = $$1(n$1, e.base.features);
	return Ve(t, n$1, a ? Jr(e, r, a) : o$1);
}
function Ra(e, r, t, n$1) {
	let a = $$1(n$1, e.base.features);
	return Me(t, n$1, a ? Jr(e, r, a) : o$1);
}
function Pa(e, r, t, n$1) {
	let a = [], s = [];
	for (let [i$1, u$1] of n$1.entries()) a.push(E$1(e, r, i$1)), s.push(E$1(e, r, u$1));
	return nr(e.base, t, a, s);
}
function xa(e, r, t, n$1) {
	let a = [];
	for (let s of n$1.keys()) a.push(E$1(e, r, s));
	return Le(t, a);
}
function Oa(e, r, t, n$1) {
	let a = Ye(t, k(e.base, 4), []);
	return e.type === 1 || (Xr(e), n$1.on({
		next: (s) => {
			if (e.state.alive) {
				let i$1 = G(e, r, s);
				i$1 && ie(e, qe(t, i$1));
			}
		},
		throw: (s) => {
			if (e.state.alive) {
				let i$1 = G(e, r, s);
				i$1 && ie(e, We(t, i$1));
			}
			be(e);
		},
		return: (s) => {
			if (e.state.alive) {
				let i$1 = G(e, r, s);
				i$1 && ie(e, Ge(t, i$1));
			}
			be(e);
		}
	})), a;
}
function Ta(e, r, t) {
	if (this.state.alive) {
		let n$1 = G(this, r, t);
		n$1 && ie(this, c$1(23, e, o$1, o$1, o$1, o$1, o$1, [k(this.base, 2), n$1], o$1, o$1, o$1, o$1)), be(this);
	}
}
function wa(e, r, t) {
	if (this.state.alive) {
		let n$1 = G(this, r, t);
		n$1 && ie(this, c$1(24, e, o$1, o$1, o$1, o$1, o$1, [k(this.base, 3), n$1], o$1, o$1, o$1, o$1));
	}
	be(this);
}
function ha(e, r, t, n$1) {
	let a = hr(e.base, {});
	return e.type === 2 && (Xr(e), n$1.then(Ta.bind(e, a, r), wa.bind(e, a, r))), ht(e.base, t, a);
}
function za(e, r, t, n$1, a) {
	for (let s = 0, i$1 = a.length; s < i$1; s++) {
		let u$1 = a[s];
		if (u$1.parse.sync && u$1.test(n$1)) return fe$1(t, u$1.tag, u$1.parse.sync(n$1, new Gr(e, r), { id: t }));
	}
	return o$1;
}
function _a(e, r, t, n$1, a) {
	for (let s = 0, i$1 = a.length; s < i$1; s++) {
		let u$1 = a[s];
		if (u$1.parse.stream && u$1.test(n$1)) return fe$1(t, u$1.tag, u$1.parse.stream(n$1, new Kr(e, r), { id: t }));
	}
	return o$1;
}
function un(e, r, t, n$1) {
	let a = e.base.plugins;
	return a ? e.type === 1 ? za(e, r, t, n$1, a) : _a(e, r, t, n$1, a) : o$1;
}
function ka(e, r, t, n$1) {
	let a = [];
	for (let s = 0, i$1 = n$1.v.length; s < i$1; s++) a[s] = E$1(e, r, n$1.v[s]);
	return Ke(t, a, n$1.t, n$1.d);
}
function Da(e, r, t, n$1, a) {
	switch (a) {
		case Object: return Wr(e, r, t, n$1, !1);
		case o$1: return Wr(e, r, t, n$1, !0);
		case Date: return he(t, n$1);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return sn(e, r, t, n$1);
		case Number:
		case Boolean:
		case String:
		case BigInt: return Ca(e, r, t, n$1);
		case ArrayBuffer: return or(e.base, t, n$1);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return Aa(e, r, t, n$1);
		case DataView: return Ia(e, r, t, n$1);
		case Map: return Pa(e, r, t, n$1);
		case Set: return xa(e, r, t, n$1);
		default: break;
	}
	if (a === Promise || n$1 instanceof Promise) return ha(e, r, t, n$1);
	let s = e.base.features;
	if (s & 32 && a === RegExp) return ze(t, n$1);
	if (s & 16) switch (a) {
		case BigInt64Array:
		case BigUint64Array: return Ea(e, r, t, n$1);
		default: break;
	}
	if (s & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n$1 instanceof AggregateError)) return Ra(e, r, t, n$1);
	if (n$1 instanceof Error) return sn(e, r, t, n$1);
	if (C in n$1 || v$1 in n$1) return Wr(e, r, t, n$1, !!a);
	throw new x$1(n$1);
}
function Fa(e, r, t, n$1) {
	if (Array.isArray(n$1)) return va(e, r, t, n$1);
	if (M(n$1)) return Oa(e, r, t, n$1);
	if (Ze(n$1)) return ka(e, r, t, n$1);
	let a = n$1.constructor;
	if (a === Y$1) return E$1(e, r, n$1.replacement);
	return un(e, r, t, n$1) || Da(e, r, t, n$1, a);
}
function Ba(e, r, t) {
	let n$1 = q$1(e.base, t);
	if (n$1.type !== 0) return n$1.value;
	let a = un(e, r, n$1.value, t);
	if (a) return a;
	throw new x$1(t);
}
function E$1(e, r, t) {
	if (r >= e.base.depthLimit) throw new ee(e.base.depthLimit);
	switch (typeof t) {
		case "boolean": return t ? J : Z;
		case "undefined": return Ae;
		case "string": return X(t);
		case "number": return Te(t);
		case "bigint": return we(t);
		case "object":
			if (t) {
				let n$1 = q$1(e.base, t);
				return n$1.type === 0 ? Fa(e, r + 1, n$1.value, t) : n$1.value;
			}
			return Ee;
		case "symbol": return I(e.base, t);
		case "function": return Ba(e, r, t);
		default: throw new x$1(t);
	}
}
function ie(e, r) {
	e.state.initial ? e.state.buffer.push(r) : $r(e, r, !1);
}
function Zr(e, r) {
	if (e.state.onError) e.state.onError(r);
	else throw r instanceof z ? r : new z(r);
}
function ln(e) {
	e.state.onDone && e.state.onDone();
}
function $r(e, r, t) {
	try {
		e.state.onParse(r, t);
	} catch (n$1) {
		Zr(e, n$1);
	}
}
function Xr(e) {
	e.state.pending++;
}
function be(e) {
	--e.state.pending <= 0 && ln(e);
}
function G(e, r, t) {
	try {
		return E$1(e, r, t);
	} catch (n$1) {
		return Zr(e, n$1), o$1;
	}
}
function Qr(e, r) {
	let t = G(e, 0, r);
	t && ($r(e, t, !0), e.state.initial = !1, Va(e, e.state), e.state.pending <= 0 && fr(e));
}
function Va(e, r) {
	for (let t = 0, n$1 = r.buffer.length; t < n$1; t++) $r(e, r.buffer[t], !1);
}
function fr(e) {
	e.state.alive && (ln(e), e.state.alive = !1);
}
async function ou(e, r = {}) {
	return await oe(ne$1(2, {
		plugins: A(r.plugins),
		disabledFeatures: r.disabledFeatures,
		refs: r.refs
	}), e);
}
function cn(e, r) {
	let t = A(r.plugins), n$1 = Hr({
		plugins: t,
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		onParse(a, s) {
			let i$1 = ur({
				plugins: t,
				features: n$1.base.features,
				scopeId: r.scopeId,
				markedRefs: n$1.base.marked
			}), u$1;
			try {
				u$1 = cr(i$1, a);
			} catch (l$1) {
				r.onError && r.onError(l$1);
				return;
			}
			r.onSerialize(u$1, s);
		},
		onError: r.onError,
		onDone: r.onDone
	});
	return Qr(n$1, e), fr.bind(null, n$1);
}
function au(e, r) {
	let n$1 = Hr({
		plugins: A(r.plugins),
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		depthLimit: r.depthLimit,
		onParse: r.onParse,
		onError: r.onError,
		onDone: r.onDone
	});
	return Qr(n$1, e), fr.bind(null, n$1);
}
function Iu(e, r = {}) {
	var i$1;
	let t = A(r.plugins), n$1 = r.disabledFeatures || 0, a = (i$1 = e.f) != null ? i$1 : 63;
	return ar(Mt({
		plugins: t,
		markedRefs: e.m,
		features: a & ~n$1,
		disabledFeatures: n$1
	}), e.t);
}
function createSerializationAdapter(opts) {
	return opts;
}
/* @__NO_SIDE_EFFECTS__ */
function makeSsrSerovalPlugin(serializationAdapter, options) {
	return /* @__PURE__ */ ni({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: { stream(value, ctx, _data) {
			return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
		} },
		serialize(node, ctx, _data) {
			options.didRun = true;
			return GLOBAL_TSR + ".t.get(\"" + serializationAdapter.key + "\")(" + ctx.serialize(node.v) + ")";
		},
		deserialize: void 0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function makeSerovalPlugin(serializationAdapter) {
	return /* @__PURE__ */ ni({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: {
			sync(value, ctx, _data) {
				return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
			},
			async async(value, ctx, _data) {
				return { v: await ctx.parse(serializationAdapter.toSerializable(value)) };
			},
			stream(value, ctx, _data) {
				return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
			}
		},
		serialize: void 0,
		deserialize(node, ctx, _data) {
			return serializationAdapter.fromSerializable(ctx.deserialize(node.v));
		}
	});
}
var RawStream = class {
	constructor(stream, options) {
		this.stream = stream;
		this.hint = options?.hint ?? "binary";
	}
};
var BufferCtor = globalThis.Buffer;
var hasNodeBuffer = !!BufferCtor && typeof BufferCtor.from === "function";
function uint8ArrayToBase64(bytes) {
	if (bytes.length === 0) return "";
	if (hasNodeBuffer) return BufferCtor.from(bytes).toString("base64");
	const CHUNK_SIZE = 32768;
	const chunks = [];
	for (let i$1 = 0; i$1 < bytes.length; i$1 += CHUNK_SIZE) {
		const chunk = bytes.subarray(i$1, i$1 + CHUNK_SIZE);
		chunks.push(String.fromCharCode.apply(null, chunk));
	}
	return btoa(chunks.join(""));
}
function base64ToUint8Array(base64) {
	if (base64.length === 0) return new Uint8Array(0);
	if (hasNodeBuffer) {
		const buf = BufferCtor.from(base64, "base64");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i$1 = 0; i$1 < binary.length; i$1++) bytes[i$1] = binary.charCodeAt(i$1);
	return bytes;
}
var RAW_STREAM_FACTORY_BINARY = Object.create(null);
var RAW_STREAM_FACTORY_TEXT = Object.create(null);
var RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY = (stream) => new ReadableStream({ start(controller) {
	stream.on({
		next(base64) {
			try {
				controller.enqueue(base64ToUint8Array(base64));
			} catch {}
		},
		throw(error) {
			controller.error(error);
		},
		return() {
			try {
				controller.close();
			} catch {}
		}
	});
} });
var textEncoderForFactory = new TextEncoder();
var RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT = (stream) => {
	return new ReadableStream({ start(controller) {
		stream.on({
			next(value) {
				try {
					if (typeof value === "string") controller.enqueue(textEncoderForFactory.encode(value));
					else controller.enqueue(base64ToUint8Array(value.$b64));
				} catch {}
			},
			throw(error) {
				controller.error(error);
			},
			return() {
				try {
					controller.close();
				} catch {}
			}
		});
	} });
};
var FACTORY_BINARY = `(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))`;
var FACTORY_TEXT = `(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})`;
function toBinaryStream(readable) {
	const stream = te();
	const reader = readable.getReader();
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					stream.return(void 0);
					break;
				}
				stream.next(uint8ArrayToBase64(value));
			}
		} catch (error) {
			stream.throw(error);
		} finally {
			reader.releaseLock();
		}
	})();
	return stream;
}
function toTextStream(readable) {
	const stream = te();
	const reader = readable.getReader();
	const decoder = new TextDecoder("utf-8", { fatal: true });
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					try {
						const remaining = decoder.decode();
						if (remaining.length > 0) stream.next(remaining);
					} catch {}
					stream.return(void 0);
					break;
				}
				try {
					const text = decoder.decode(value, { stream: true });
					if (text.length > 0) stream.next(text);
				} catch {
					stream.next({ $b64: uint8ArrayToBase64(value) });
				}
			}
		} catch (error) {
			stream.throw(error);
		} finally {
			reader.releaseLock();
		}
	})();
	return stream;
}
var RawStreamSSRPlugin = /* @__PURE__ */ ni({
	tag: "tss/RawStream",
	extends: [/* @__PURE__ */ ni({
		tag: "tss/RawStreamFactory",
		test(value) {
			return value === RAW_STREAM_FACTORY_BINARY;
		},
		parse: {
			sync(_value, _ctx, _data) {
				return {};
			},
			async async(_value, _ctx, _data) {
				return {};
			},
			stream(_value, _ctx, _data) {
				return {};
			}
		},
		serialize(_node, _ctx, _data) {
			return FACTORY_BINARY;
		},
		deserialize(_node, _ctx, _data) {
			return RAW_STREAM_FACTORY_BINARY;
		}
	}), /* @__PURE__ */ ni({
		tag: "tss/RawStreamFactoryText",
		test(value) {
			return value === RAW_STREAM_FACTORY_TEXT;
		},
		parse: {
			sync(_value, _ctx, _data) {
				return {};
			},
			async async(_value, _ctx, _data) {
				return {};
			},
			stream(_value, _ctx, _data) {
				return {};
			}
		},
		serialize(_node, _ctx, _data) {
			return FACTORY_TEXT;
		},
		deserialize(_node, _ctx, _data) {
			return RAW_STREAM_FACTORY_TEXT;
		}
	})],
	test(value) {
		return value instanceof RawStream;
	},
	parse: {
		sync(value, ctx, _data) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			return {
				hint: ctx.parse(value.hint),
				factory: ctx.parse(factory),
				stream: ctx.parse(te())
			};
		},
		async async(value, ctx, _data) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
			return {
				hint: await ctx.parse(value.hint),
				factory: await ctx.parse(factory),
				stream: await ctx.parse(encodedStream)
			};
		},
		stream(value, ctx, _data) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
			return {
				hint: ctx.parse(value.hint),
				factory: ctx.parse(factory),
				stream: ctx.parse(encodedStream)
			};
		}
	},
	serialize(node, ctx, _data) {
		return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
	},
	deserialize(node, ctx, _data) {
		const stream = ctx.deserialize(node.stream);
		return ctx.deserialize(node.hint) === "text" ? RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT(stream) : RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY(stream);
	}
});
/* @__NO_SIDE_EFFECTS__ */
function createRawStreamRPCPlugin(onRawStream) {
	let nextStreamId = 1;
	return /* @__PURE__ */ ni({
		tag: "tss/RawStream",
		test(value) {
			return value instanceof RawStream;
		},
		parse: {
			async async(value, ctx, _data) {
				const streamId = nextStreamId++;
				onRawStream(streamId, value.stream);
				return { streamId: await ctx.parse(streamId) };
			},
			stream(value, ctx, _data) {
				const streamId = nextStreamId++;
				onRawStream(streamId, value.stream);
				return { streamId: ctx.parse(streamId) };
			}
		},
		serialize() {
			throw new Error("RawStreamRPCPlugin.serialize should not be called. RPC uses JSON serialization, not JS code generation.");
		},
		deserialize() {
			throw new Error("RawStreamRPCPlugin.deserialize should not be called. Use createRawStreamDeserializePlugin on client.");
		}
	});
}
var ShallowErrorPlugin = /* @__PURE__ */ ni({
	tag: "$TSR/Error",
	test(value) {
		return value instanceof Error;
	},
	parse: {
		sync(value, ctx) {
			return { message: ctx.parse(value.message) };
		},
		async async(value, ctx) {
			return { message: await ctx.parse(value.message) };
		},
		stream(value, ctx) {
			return { message: ctx.parse(value.message) };
		}
	},
	serialize(node, ctx) {
		return "new Error(" + ctx.serialize(node.message) + ")";
	},
	deserialize(node, ctx) {
		return new Error(ctx.deserialize(node.message));
	}
});
var u = (e) => {
	let r = new AbortController(), a = r.abort.bind(r);
	return e.then(a, a), r;
};
function E(e) {
	e(this.reason);
}
function D(e) {
	this.addEventListener("abort", E.bind(this, e), { once: !0 });
}
function c(e) {
	return new Promise(D.bind(e));
}
var i = {};
ni({
	tag: "seroval-plugins/web/AbortSignal",
	extends: [ni({
		tag: "seroval-plugins/web/AbortControllerFactoryPlugin",
		test(e) {
			return e === i;
		},
		parse: {
			sync() {
				return i;
			},
			async async() {
				return await Promise.resolve(i);
			},
			stream() {
				return i;
			}
		},
		serialize() {
			return u.toString();
		},
		deserialize() {
			return u;
		}
	})],
	test(e) {
		return typeof AbortSignal == "undefined" ? !1 : e instanceof AbortSignal;
	},
	parse: {
		sync(e, r) {
			return e.aborted ? { reason: r.parse(e.reason) } : {};
		},
		async async(e, r) {
			if (e.aborted) return { reason: await r.parse(e.reason) };
			let a = await c(e);
			return { reason: await r.parse(a) };
		},
		stream(e, r) {
			if (e.aborted) return { reason: r.parse(e.reason) };
			let a = c(e);
			return {
				factory: r.parse(i),
				controller: r.parse(a)
			};
		}
	},
	serialize(e, r) {
		return e.reason ? "AbortSignal.abort(" + r.serialize(e.reason) + ")" : e.controller && e.factory ? "(" + r.serialize(e.factory) + ")(" + r.serialize(e.controller) + ").signal" : "(new AbortController).signal";
	},
	deserialize(e, r) {
		return e.reason ? AbortSignal.abort(r.deserialize(e.reason)) : e.controller ? u(r.deserialize(e.controller)).signal : new AbortController().signal;
	}
});
ni({
	tag: "seroval-plugins/web/Blob",
	test(e) {
		return typeof Blob == "undefined" ? !1 : e instanceof Blob;
	},
	parse: { async async(e, r) {
		return {
			type: await r.parse(e.type),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new Blob([" + r.serialize(e.buffer) + "],{type:" + r.serialize(e.type) + "})";
	},
	deserialize(e, r) {
		return new Blob([r.deserialize(e.buffer)], { type: r.deserialize(e.type) });
	}
});
function d(e) {
	return {
		detail: e.detail,
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
ni({
	tag: "seroval-plugins/web/CustomEvent",
	test(e) {
		return typeof CustomEvent == "undefined" ? !1 : e instanceof CustomEvent;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(d(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(d(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(d(e))
			};
		}
	},
	serialize(e, r) {
		return "new CustomEvent(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new CustomEvent(r.deserialize(e.type), r.deserialize(e.options));
	}
});
ni({
	tag: "seroval-plugins/web/DOMException",
	test(e) {
		return typeof DOMException == "undefined" ? !1 : e instanceof DOMException;
	},
	parse: {
		sync(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		},
		async async(e, r) {
			return {
				name: await r.parse(e.name),
				message: await r.parse(e.message)
			};
		},
		stream(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		}
	},
	serialize(e, r) {
		return "new DOMException(" + r.serialize(e.message) + "," + r.serialize(e.name) + ")";
	},
	deserialize(e, r) {
		return new DOMException(r.deserialize(e.message), r.deserialize(e.name));
	}
});
function f(e) {
	return {
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
ni({
	tag: "seroval-plugins/web/Event",
	test(e) {
		return typeof Event == "undefined" ? !1 : e instanceof Event;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(f(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		}
	},
	serialize(e, r) {
		return "new Event(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Event(r.deserialize(e.type), r.deserialize(e.options));
	}
});
var m = ni({
	tag: "seroval-plugins/web/File",
	test(e) {
		return typeof File == "undefined" ? !1 : e instanceof File;
	},
	parse: { async async(e, r) {
		return {
			name: await r.parse(e.name),
			options: await r.parse({
				type: e.type,
				lastModified: e.lastModified
			}),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new File([" + r.serialize(e.buffer) + "]," + r.serialize(e.name) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new File([r.deserialize(e.buffer)], r.deserialize(e.name), r.deserialize(e.options));
	}
});
function y(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var o = {}, v = (e, r = new FormData(), a = 0, t = e.length, s) => {
	for (; a < t; a++) s = e[a], r.append(s[0], s[1]);
	return r;
};
ni({
	tag: "seroval-plugins/web/FormData",
	extends: [m, ni({
		tag: "seroval-plugins/web/FormDataFactory",
		test(e) {
			return e === o;
		},
		parse: {
			sync() {
				return o;
			},
			async async() {
				return await Promise.resolve(o);
			},
			stream() {
				return o;
			}
		},
		serialize() {
			return v.toString();
		},
		deserialize() {
			return o;
		}
	})],
	test(e) {
		return typeof FormData == "undefined" ? !1 : e instanceof FormData;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(o),
				entries: r.parse(y(e))
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(o),
				entries: await r.parse(y(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(o),
				entries: r.parse(y(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.entries) + ")";
	},
	deserialize(e, r) {
		return v(r.deserialize(e.entries));
	}
});
function g(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var l = ni({
	tag: "seroval-plugins/web/Headers",
	test(e) {
		return typeof Headers == "undefined" ? !1 : e instanceof Headers;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(g(e)) };
		},
		async async(e, r) {
			return { value: await r.parse(g(e)) };
		},
		stream(e, r) {
			return { value: r.parse(g(e)) };
		}
	},
	serialize(e, r) {
		return "new Headers(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new Headers(r.deserialize(e.value));
	}
});
ni({
	tag: "seroval-plugins/web/ImageData",
	test(e) {
		return typeof ImageData == "undefined" ? !1 : e instanceof ImageData;
	},
	parse: {
		sync(e, r) {
			return {
				data: r.parse(e.data),
				width: r.parse(e.width),
				height: r.parse(e.height),
				options: r.parse({ colorSpace: e.colorSpace })
			};
		},
		async async(e, r) {
			return {
				data: await r.parse(e.data),
				width: await r.parse(e.width),
				height: await r.parse(e.height),
				options: await r.parse({ colorSpace: e.colorSpace })
			};
		},
		stream(e, r) {
			return {
				data: r.parse(e.data),
				width: r.parse(e.width),
				height: r.parse(e.height),
				options: r.parse({ colorSpace: e.colorSpace })
			};
		}
	},
	serialize(e, r) {
		return "new ImageData(" + r.serialize(e.data) + "," + r.serialize(e.width) + "," + r.serialize(e.height) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new ImageData(r.deserialize(e.data), r.deserialize(e.width), r.deserialize(e.height), r.deserialize(e.options));
	}
});
var n = {}, P = (e) => new ReadableStream({ start: (r) => {
	e.on({
		next: (a) => {
			try {
				r.enqueue(a);
			} catch (t) {}
		},
		throw: (a) => {
			r.error(a);
		},
		return: () => {
			try {
				r.close();
			} catch (a) {}
		}
	});
} }), x = ni({
	tag: "seroval-plugins/web/ReadableStreamFactory",
	test(e) {
		return e === n;
	},
	parse: {
		sync() {
			return n;
		},
		async async() {
			return await Promise.resolve(n);
		},
		stream() {
			return n;
		}
	},
	serialize() {
		return P.toString();
	},
	deserialize() {
		return n;
	}
});
function w(e) {
	let r = te(), a = e.getReader();
	async function t() {
		try {
			let s = await a.read();
			s.done ? r.return(s.value) : (r.next(s.value), await t());
		} catch (s) {
			r.throw(s);
		}
	}
	return t().catch(() => {}), r;
}
var p = ni({
	tag: "seroval/plugins/web/ReadableStream",
	extends: [x],
	test(e) {
		return typeof ReadableStream == "undefined" ? !1 : e instanceof ReadableStream;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(n),
				stream: r.parse(te())
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(n),
				stream: await r.parse(w(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(n),
				stream: r.parse(w(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.stream) + ")";
	},
	deserialize(e, r) {
		return P(r.deserialize(e.stream));
	}
});
function N(e, r) {
	return {
		body: r,
		cache: e.cache,
		credentials: e.credentials,
		headers: e.headers,
		integrity: e.integrity,
		keepalive: e.keepalive,
		method: e.method,
		mode: e.mode,
		redirect: e.redirect,
		referrer: e.referrer,
		referrerPolicy: e.referrerPolicy
	};
}
ni({
	tag: "seroval-plugins/web/Request",
	extends: [p, l],
	test(e) {
		return typeof Request == "undefined" ? !1 : e instanceof Request;
	},
	parse: {
		async async(e, r) {
			return {
				url: await r.parse(e.url),
				options: await r.parse(N(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null))
			};
		},
		stream(e, r) {
			return {
				url: r.parse(e.url),
				options: r.parse(N(e, e.body && !e.bodyUsed ? e.clone().body : null))
			};
		}
	},
	serialize(e, r) {
		return "new Request(" + r.serialize(e.url) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Request(r.deserialize(e.url), r.deserialize(e.options));
	}
});
function h(e) {
	return {
		headers: e.headers,
		status: e.status,
		statusText: e.statusText
	};
}
ni({
	tag: "seroval-plugins/web/Response",
	extends: [p, l],
	test(e) {
		return typeof Response == "undefined" ? !1 : e instanceof Response;
	},
	parse: {
		async async(e, r) {
			return {
				body: await r.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null),
				options: await r.parse(h(e))
			};
		},
		stream(e, r) {
			return {
				body: r.parse(e.body && !e.bodyUsed ? e.clone().body : null),
				options: r.parse(h(e))
			};
		}
	},
	serialize(e, r) {
		return "new Response(" + r.serialize(e.body) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Response(r.deserialize(e.body), r.deserialize(e.options));
	}
});
ni({
	tag: "seroval-plugins/web/URL",
	test(e) {
		return typeof URL == "undefined" ? !1 : e instanceof URL;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(e.href) };
		},
		async async(e, r) {
			return { value: await r.parse(e.href) };
		},
		stream(e, r) {
			return { value: r.parse(e.href) };
		}
	},
	serialize(e, r) {
		return "new URL(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new URL(r.deserialize(e.value));
	}
});
ni({
	tag: "seroval-plugins/web/URLSearchParams",
	test(e) {
		return typeof URLSearchParams == "undefined" ? !1 : e instanceof URLSearchParams;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(e.toString()) };
		},
		async async(e, r) {
			return { value: await r.parse(e.toString()) };
		},
		stream(e, r) {
			return { value: r.parse(e.toString()) };
		}
	},
	serialize(e, r) {
		return "new URLSearchParams(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new URLSearchParams(r.deserialize(e.value));
	}
});
var defaultSerovalPlugins = [
	ShallowErrorPlugin,
	RawStreamSSRPlugin,
	p
];
async function getStartManifest(matchedRoutes) {
	const { tsrStartManifest } = await import("./assets/_tanstack-start-manifest_v-i8wIgu1w.js");
	const startManifest = tsrStartManifest();
	const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes["__root__"] || {};
	rootRoute.assets = rootRoute.assets || [];
	let injectedHeadScripts;
	return {
		manifest: {
			inlineCss: startManifest.inlineCss,
			routes: Object.fromEntries(Object.entries(startManifest.routes).flatMap(([k$1, v$2]) => {
				const result = {};
				let hasData = false;
				if (v$2.preloads && v$2.preloads.length > 0) {
					result["preloads"] = v$2.preloads;
					hasData = true;
				}
				if (v$2.assets && v$2.assets.length > 0) {
					result["assets"] = v$2.assets;
					hasData = true;
				}
				if (!hasData) return [];
				return [[k$1, result]];
			}))
		},
		clientEntry: startManifest.clientEntry,
		injectedHeadScripts
	};
}
function dehydrateSsrMatchId(id) {
	return id.replaceAll("/", "\0");
}
function getDefaultSerovalPlugins() {
	return [...(getStartOptions()?.serializationAdapters)?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
var textEncoder = new TextEncoder();
var EMPTY_PAYLOAD = new Uint8Array(0);
function encodeFrame(type, streamId, payload) {
	const frame = new Uint8Array(9 + payload.length);
	frame[0] = type;
	frame[1] = streamId >>> 24 & 255;
	frame[2] = streamId >>> 16 & 255;
	frame[3] = streamId >>> 8 & 255;
	frame[4] = streamId & 255;
	frame[5] = payload.length >>> 24 & 255;
	frame[6] = payload.length >>> 16 & 255;
	frame[7] = payload.length >>> 8 & 255;
	frame[8] = payload.length & 255;
	frame.set(payload, 9);
	return frame;
}
function encodeJSONFrame(json) {
	return encodeFrame(FrameType.JSON, 0, textEncoder.encode(json));
}
function encodeChunkFrame(streamId, chunk) {
	return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
function encodeEndFrame(streamId) {
	return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
function encodeErrorFrame(streamId, error) {
	const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
	return encodeFrame(FrameType.ERROR, streamId, textEncoder.encode(message));
}
function createMultiplexedStream(jsonStream, rawStreams, lateStreamSource) {
	let controller;
	let cancelled = false;
	const readers = [];
	const enqueue = (frame) => {
		if (cancelled) return false;
		try {
			controller.enqueue(frame);
			return true;
		} catch {
			return false;
		}
	};
	const errorOutput = (error) => {
		if (cancelled) return;
		cancelled = true;
		try {
			controller.error(error);
		} catch {}
		for (const reader of readers) reader.cancel().catch(() => {});
	};
	async function pumpRawStream(streamId, stream) {
		const reader = stream.getReader();
		readers.push(reader);
		try {
			while (!cancelled) {
				const { done, value } = await reader.read();
				if (done) {
					enqueue(encodeEndFrame(streamId));
					return;
				}
				if (!enqueue(encodeChunkFrame(streamId, value))) return;
			}
		} catch (error) {
			enqueue(encodeErrorFrame(streamId, error));
		} finally {
			reader.releaseLock();
		}
	}
	async function pumpJSON() {
		const reader = jsonStream.getReader();
		readers.push(reader);
		try {
			while (!cancelled) {
				const { done, value } = await reader.read();
				if (done) return;
				if (!enqueue(encodeJSONFrame(value))) return;
			}
		} catch (error) {
			errorOutput(error);
			throw error;
		} finally {
			reader.releaseLock();
		}
	}
	async function pumpLateStreams() {
		if (!lateStreamSource) return [];
		const lateStreamPumps = [];
		const reader = lateStreamSource.getReader();
		readers.push(reader);
		try {
			while (!cancelled) {
				const { done, value } = await reader.read();
				if (done) break;
				lateStreamPumps.push(pumpRawStream(value.id, value.stream));
			}
		} finally {
			reader.releaseLock();
		}
		return lateStreamPumps;
	}
	return new ReadableStream({
		async start(ctrl) {
			controller = ctrl;
			const pumps = [pumpJSON()];
			for (const [streamId, stream] of rawStreams) pumps.push(pumpRawStream(streamId, stream));
			if (lateStreamSource) pumps.push(pumpLateStreams());
			try {
				const latePumps = (await Promise.all(pumps)).find(Array.isArray);
				if (latePumps && latePumps.length > 0) await Promise.all(latePumps);
				if (!cancelled) try {
					controller.close();
				} catch {}
			} catch {}
		},
		cancel() {
			cancelled = true;
			for (const reader of readers) reader.cancel().catch(() => {});
			readers.length = 0;
		}
	});
}
var serovalPlugins = void 0;
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
	const methodUpper = request.method.toUpperCase();
	const url = new URL(request.url);
	const action = await getServerFnById(serverFnId, { origin: "client" });
	if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
		status: 405,
		headers: { Allow: action.method }
	});
	const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
	if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
	const contentType = request.headers.get("Content-Type");
	function parsePayload(payload) {
		return Iu(payload, { plugins: serovalPlugins });
	}
	return await (async () => {
		try {
			let res = await (async () => {
				if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
					if (methodUpper === "GET") invariant();
					const formData = await request.formData();
					const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
					formData.delete(TSS_FORMDATA_CONTEXT);
					const params = {
						context,
						data: formData,
						method: methodUpper
					};
					if (typeof serializedContext === "string") try {
						const deserializedContext = Iu(JSON.parse(serializedContext), { plugins: serovalPlugins });
						if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(deserializedContext, context);
					} catch (e) {}
					return await action(params);
				}
				if (methodUpper === "GET") {
					const payloadParam = url.searchParams.get("payload");
					if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
					const payload$1 = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
					payload$1.context = safeObjectMerge(payload$1.context, context);
					payload$1.method = methodUpper;
					return await action(payload$1);
				}
				let jsonPayload;
				if (contentType?.includes("application/json")) jsonPayload = await request.json();
				const payload = jsonPayload ? parsePayload(jsonPayload) : {};
				payload.context = safeObjectMerge(payload.context, context);
				payload.method = methodUpper;
				return await action(payload);
			})();
			const unwrapped = res.result || res.error;
			if (isNotFound(res)) res = isNotFoundResponse(res);
			if (!isServerFn) return unwrapped;
			if (unwrapped instanceof Response) {
				if (isRedirect(unwrapped)) return unwrapped;
				unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
				return unwrapped;
			}
			return serializeResult(res);
			function serializeResult(res$1) {
				let nonStreamingBody = void 0;
				const alsResponse = getResponse();
				if (res$1 !== void 0) {
					const rawStreams = /* @__PURE__ */ new Map();
					let initialPhase = true;
					let lateStreamWriter;
					let lateStreamReadable = void 0;
					const pendingLateStreams = [];
					const plugins = [/* @__PURE__ */ createRawStreamRPCPlugin((id, stream) => {
						if (initialPhase) {
							rawStreams.set(id, stream);
							return;
						}
						if (lateStreamWriter) {
							lateStreamWriter.write({
								id,
								stream
							}).catch(() => {});
							return;
						}
						pendingLateStreams.push({
							id,
							stream
						});
					}), ...serovalPlugins || []];
					let done = false;
					const callbacks = {
						onParse: (value) => {
							nonStreamingBody = value;
						},
						onDone: () => {
							done = true;
						},
						onError: (error) => {
							throw error;
						}
					};
					au(res$1, {
						refs: /* @__PURE__ */ new Map(),
						plugins,
						onParse(value) {
							callbacks.onParse(value);
						},
						onDone() {
							callbacks.onDone();
						},
						onError: (error) => {
							callbacks.onError(error);
						}
					});
					initialPhase = false;
					if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": "application/json",
							[X_TSS_SERIALIZED]: "true"
						}
					});
					const { readable, writable } = new TransformStream();
					lateStreamReadable = readable;
					lateStreamWriter = writable.getWriter();
					for (const registration of pendingLateStreams) lateStreamWriter.write(registration).catch(() => {});
					pendingLateStreams.length = 0;
					const multiplexedStream = createMultiplexedStream(new ReadableStream({
						start(controller) {
							callbacks.onParse = (value) => {
								controller.enqueue(JSON.stringify(value) + "\n");
							};
							callbacks.onDone = () => {
								try {
									controller.close();
								} catch {}
								lateStreamWriter?.close().catch(() => {}).finally(() => {
									lateStreamWriter = void 0;
								});
							};
							callbacks.onError = (error) => {
								controller.error(error);
								lateStreamWriter?.abort(error).catch(() => {}).finally(() => {
									lateStreamWriter = void 0;
								});
							};
							if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
							if (done) callbacks.onDone();
						},
						cancel() {
							lateStreamWriter?.abort().catch(() => {});
							lateStreamWriter = void 0;
						}
					}), rawStreams, lateStreamReadable);
					return new Response(multiplexedStream, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
							[X_TSS_SERIALIZED]: "true"
						}
					});
				}
				return new Response(void 0, {
					status: alsResponse.status,
					statusText: alsResponse.statusText
				});
			}
		} catch (error) {
			if (error instanceof Response) return error;
			if (isNotFound(error)) return isNotFoundResponse(error);
			console.info();
			console.info("Server Fn Error!");
			console.info();
			console.error(error);
			console.info();
			const serializedError = JSON.stringify(await Promise.resolve(ou(error, {
				refs: /* @__PURE__ */ new Map(),
				plugins: serovalPlugins
			})));
			const response = getResponse();
			return new Response(serializedError, {
				status: response.status ?? 500,
				statusText: response.statusText,
				headers: {
					"Content-Type": "application/json",
					[X_TSS_SERIALIZED]: "true"
				}
			});
		}
	})();
};
function isNotFoundResponse(error) {
	const { headers, ...rest } = error;
	return new Response(JSON.stringify(rest), {
		status: 404,
		headers: {
			"Content-Type": "application/json",
			...headers || {}
		}
	});
}
function warnDeprecatedTransformAssetUrls() {}
function normalizeTransformAssetResult(result) {
	if (typeof result === "string") return { href: result };
	return result;
}
function resolveTransformAssetsCrossOrigin(config, kind) {
	if (!config) return void 0;
	if (typeof config === "string") return config;
	return config[kind];
}
function isObjectShorthand(transform) {
	return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
	if (typeof transform === "string") {
		const prefix = transform;
		return {
			type: "transform",
			transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
			cache: true
		};
	}
	if (typeof transform === "function") return {
		type: "transform",
		transformFn: transform,
		cache: true
	};
	if (isObjectShorthand(transform)) {
		const { prefix, crossOrigin } = transform;
		return {
			type: "transform",
			transformFn: ({ url, kind }) => {
				const href = `${prefix}${url}`;
				if (kind === "clientEntry") return { href };
				const co$1 = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
				return co$1 ? {
					href,
					crossOrigin: co$1
				} : { href };
			},
			cache: true
		};
	}
	if ("createTransform" in transform && transform.createTransform) return {
		type: "createTransform",
		createTransform: transform.createTransform,
		cache: transform.cache !== false
	};
	return {
		type: "transform",
		transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
		cache: transform.cache !== false
	};
}
function adaptTransformAssetUrlsToTransformAssets(transformFn) {
	return async ({ url, kind }) => ({ href: await transformFn({
		url,
		type: kind
	}) });
}
function adaptTransformAssetUrlsConfigToTransformAssets(transform) {
	warnDeprecatedTransformAssetUrls();
	if (typeof transform === "string") return transform;
	if (typeof transform === "function") return adaptTransformAssetUrlsToTransformAssets(transform);
	if ("createTransform" in transform && transform.createTransform) return {
		createTransform: async (ctx) => adaptTransformAssetUrlsToTransformAssets(await transform.createTransform(ctx)),
		cache: transform.cache,
		warmup: transform.warmup
	};
	return {
		transform: typeof transform.transform === "string" ? transform.transform : adaptTransformAssetUrlsToTransformAssets(transform.transform),
		cache: transform.cache,
		warmup: transform.warmup
	};
}
function buildClientEntryScriptTag(clientEntry, injectedHeadScripts) {
	let script = `import(${JSON.stringify(clientEntry)})`;
	if (injectedHeadScripts) script = `${injectedHeadScripts};${script}`;
	return {
		tag: "script",
		attrs: {
			type: "module",
			async: true
		},
		children: script
	};
}
function assignManifestAssetLink(link, next) {
	if (typeof link === "string") return next.crossOrigin ? next : next.href;
	return next.crossOrigin ? next : { href: next.href };
}
async function transformManifestAssets(source, transformFn, _opts) {
	const manifest = structuredClone(source.manifest);
	for (const route of Object.values(manifest.routes)) {
		if (route.preloads) route.preloads = await Promise.all(route.preloads.map(async (link) => {
			const result = normalizeTransformAssetResult(await transformFn({
				url: resolveManifestAssetLink(link).href,
				kind: "modulepreload"
			}));
			return assignManifestAssetLink(link, {
				href: result.href,
				crossOrigin: result.crossOrigin
			});
		}));
		if (route.assets && !source.manifest.inlineCss) {
			for (const asset of route.assets) if (asset.tag === "link" && asset.attrs?.href) {
				const rel = asset.attrs.rel;
				if (!(typeof rel === "string" ? rel.split(/\s+/) : []).includes("stylesheet")) continue;
				const result = normalizeTransformAssetResult(await transformFn({
					url: asset.attrs.href,
					kind: "stylesheet"
				}));
				asset.attrs.href = result.href;
				if (result.crossOrigin) asset.attrs.crossOrigin = result.crossOrigin;
				else delete asset.attrs.crossOrigin;
			}
		}
	}
	const transformedClientEntry = normalizeTransformAssetResult(await transformFn({
		url: source.clientEntry,
		kind: "clientEntry"
	}));
	const rootRoute = manifest.routes[rootRouteId] = manifest.routes["__root__"] || {};
	rootRoute.assets = rootRoute.assets || [];
	rootRoute.assets.push(buildClientEntryScriptTag(transformedClientEntry.href, source.injectedHeadScripts));
	return manifest;
}
function buildManifestWithClientEntry(source) {
	const scriptTag = buildClientEntryScriptTag(source.clientEntry, source.injectedHeadScripts);
	const baseRootRoute = source.manifest.routes[rootRouteId];
	const routes = {
		...source.manifest.routes,
		[rootRouteId]: {
			...baseRootRoute,
			assets: [...baseRootRoute?.assets || [], scriptTag]
		}
	};
	return {
		inlineCss: source.manifest.inlineCss,
		routes
	};
}
var ServerFunctionSerializationAdapter = createSerializationAdapter({
	key: "$TSS/serverfn",
	test: (v$2) => {
		if (typeof v$2 !== "function") return false;
		if (!(TSS_SERVER_FUNCTION in v$2)) return false;
		return !!v$2[TSS_SERVER_FUNCTION];
	},
	toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
	fromSerializable: ({ functionId }) => {
		const fn$1 = async (opts, signal) => {
			return (await (await getServerFnById(functionId, { origin: "client" }))(opts ?? {}, signal)).result;
		};
		return fn$1;
	}
});
var tsrScript_default = "self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]}";
var SCOPE_ID = "tsr";
var TSR_PREFIX = GLOBAL_TSR + ".router=";
var P_PREFIX = GLOBAL_TSR + ".p(()=>";
var P_SUFFIX = ")";
function dehydrateMatch(match) {
	const dehydratedMatch = {
		i: dehydrateSsrMatchId(match.id),
		u: match.updatedAt,
		s: match.status
	};
	for (const [key, shorthand] of [
		["__beforeLoadContext", "b"],
		["loaderData", "l"],
		["error", "e"],
		["ssr", "ssr"]
	]) if (match[key] !== void 0) dehydratedMatch[shorthand] = match[key];
	if (match.globalNotFound) dehydratedMatch.g = true;
	return dehydratedMatch;
}
var INITIAL_SCRIPTS = [mn(SCOPE_ID), tsrScript_default];
var ScriptBuffer = class {
	constructor(router) {
		this._scriptBarrierLifted = false;
		this._cleanedUp = false;
		this._pendingMicrotask = false;
		this.router = router;
		this._queue = INITIAL_SCRIPTS.slice();
	}
	enqueue(script) {
		if (this._cleanedUp) return;
		this._queue.push(script);
		if (this._scriptBarrierLifted && !this._pendingMicrotask) {
			this._pendingMicrotask = true;
			queueMicrotask(() => {
				this._pendingMicrotask = false;
				this.injectBufferedScripts();
			});
		}
	}
	liftBarrier() {
		if (this._scriptBarrierLifted || this._cleanedUp) return;
		this._scriptBarrierLifted = true;
		if (this._queue.length > 0 && !this._pendingMicrotask) {
			this._pendingMicrotask = true;
			queueMicrotask(() => {
				this._pendingMicrotask = false;
				this.injectBufferedScripts();
			});
		}
	}
	flush() {
		if (!this._scriptBarrierLifted) return;
		if (this._cleanedUp) return;
		this._pendingMicrotask = false;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
	}
	takeAll() {
		const bufferedScripts = this._queue;
		this._queue = [];
		if (bufferedScripts.length === 0) return;
		if (bufferedScripts.length === 1) return bufferedScripts[0] + ";document.currentScript.remove()";
		return bufferedScripts.join(";") + ";document.currentScript.remove()";
	}
	injectBufferedScripts() {
		if (this._cleanedUp) return;
		if (this._queue.length === 0) return;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
	}
	cleanup() {
		this._cleanedUp = true;
		this._queue = [];
		this.router = void 0;
	}
};
var isProd = true;
var MANIFEST_CACHE_SIZE = 100;
var manifestCaches = /* @__PURE__ */ new WeakMap();
var inlineCssCaches = /* @__PURE__ */ new WeakMap();
function getManifestCache(manifest) {
	const cache = manifestCaches.get(manifest);
	if (cache) return cache;
	const newCache = createLRUCache(MANIFEST_CACHE_SIZE);
	manifestCaches.set(manifest, newCache);
	return newCache;
}
function getInlineCssCache(manifest) {
	const cache = inlineCssCaches.get(manifest);
	if (cache) return cache;
	const newCache = createLRUCache(MANIFEST_CACHE_SIZE);
	inlineCssCaches.set(manifest, newCache);
	return newCache;
}
function getInlineCssHrefsForMatches(manifest, matches) {
	const styles = manifest?.inlineCss?.styles;
	if (!styles) return [];
	const seen = /* @__PURE__ */ new Set();
	const hrefs = [];
	for (const match of matches) {
		const assets = manifest?.routes[match.routeId]?.assets ?? [];
		for (const asset of assets) {
			const href = getStylesheetHref(asset);
			if (!href || seen.has(href) || styles[href] === void 0) continue;
			seen.add(href);
			hrefs.push(href);
		}
	}
	return hrefs;
}
function getInlineCssForHrefs(manifest, hrefs) {
	const styles = manifest.inlineCss?.styles;
	if (!styles || hrefs.length === 0) return void 0;
	const cacheKey = hrefs.join("\0");
	if (isProd) {
		const cached = getInlineCssCache(manifest).get(cacheKey);
		if (cached !== void 0) return cached;
	}
	const css = hrefs.map((href) => styles[href]).join("");
	if (isProd) getInlineCssCache(manifest).set(cacheKey, css);
	return css;
}
function getInlineCssAssetForMatches(manifest, matches) {
	if (!manifest?.inlineCss) return void 0;
	const css = getInlineCssForHrefs(manifest, getInlineCssHrefsForMatches(manifest, matches));
	return css === void 0 ? void 0 : createInlineCssStyleAsset(css);
}
function stripInlinedStylesheetAssets(manifest, routes, matches) {
	if (!manifest.inlineCss) return routes;
	const nextRoutes = {};
	for (const [routeId, route] of Object.entries(routes)) {
		const assets = route.assets?.filter((asset) => !isInlinableStylesheet(manifest, asset));
		const nextRoute = { ...route };
		if (assets) if (assets.length > 0) nextRoute.assets = assets;
		else delete nextRoute.assets;
		nextRoutes[routeId] = nextRoute;
	}
	if (getInlineCssAssetForMatches(manifest, matches)) {
		const rootRoute = nextRoutes["__root__"] ?? {};
		nextRoutes[rootRouteId] = {
			...rootRoute,
			assets: [createInlineCssPlaceholderAsset(), ...rootRoute.assets ?? []]
		};
	}
	return nextRoutes;
}
function attachRouterServerSsrUtils({ router, manifest, getRequestAssets, includeUnmatchedRouteAssets = true }) {
	router.ssr = { get manifest() {
		const requestAssets = getRequestAssets?.();
		const inlineCssAsset = getInlineCssAssetForMatches(manifest, router.stores.matches.get());
		if (!requestAssets?.length && !inlineCssAsset) return manifest;
		return {
			...manifest,
			routes: {
				...manifest?.routes,
				[rootRouteId]: {
					...manifest?.routes?.[rootRouteId],
					assets: [
						...requestAssets ?? [],
						...inlineCssAsset ? [inlineCssAsset] : [],
						...manifest?.routes?.["__root__"]?.assets ?? []
					]
				}
			}
		};
	} };
	let _dehydrated = false;
	let _serializationFinished = false;
	const renderFinishedListeners = [];
	const serializationFinishedListeners = [];
	const scriptBuffer = new ScriptBuffer(router);
	let injectedHtmlBuffer = "";
	router.serverSsr = {
		injectHtml: (html) => {
			if (!html) return;
			injectedHtmlBuffer += html;
			router.emit({ type: "onInjectedHtml" });
		},
		injectScript: (script) => {
			if (!script) return;
			const html = `<script${router.options.ssr?.nonce ? ` nonce='${router.options.ssr.nonce}'` : ""}>${script}<\/script>`;
			router.serverSsr.injectHtml(html);
		},
		dehydrate: async (opts) => {
			if (_dehydrated) invariant();
			let matchesToDehydrate = router.stores.matches.get();
			if (router.isShell()) matchesToDehydrate = matchesToDehydrate.slice(0, 1);
			const matches = matchesToDehydrate.map(dehydrateMatch);
			let manifestToDehydrate = void 0;
			if (manifest) {
				const currentRouteIdsList = matchesToDehydrate.map((m$2) => m$2.routeId);
				const manifestCacheKey = `${currentRouteIdsList.join("\0")}\0includeUnmatchedRouteAssets=${includeUnmatchedRouteAssets}`;
				let filteredRoutes;
				if (isProd) filteredRoutes = getManifestCache(manifest).get(manifestCacheKey);
				if (!filteredRoutes) {
					const currentRouteIds = new Set(currentRouteIdsList);
					const nextFilteredRoutes = {};
					for (const routeId in manifest.routes) {
						const routeManifest = manifest.routes[routeId];
						if (currentRouteIds.has(routeId)) nextFilteredRoutes[routeId] = routeManifest;
						else if (includeUnmatchedRouteAssets && routeManifest.assets && routeManifest.assets.length > 0) nextFilteredRoutes[routeId] = { assets: routeManifest.assets };
					}
					filteredRoutes = stripInlinedStylesheetAssets(manifest, nextFilteredRoutes, matchesToDehydrate);
					if (isProd) getManifestCache(manifest).set(manifestCacheKey, filteredRoutes);
				}
				manifestToDehydrate = { routes: { ...filteredRoutes } };
				if (opts?.requestAssets?.length) {
					const existingRoot = manifestToDehydrate.routes[rootRouteId];
					manifestToDehydrate.routes[rootRouteId] = {
						...existingRoot,
						assets: [...opts.requestAssets, ...existingRoot?.assets ?? []]
					};
				}
			}
			const dehydratedRouter = {
				manifest: manifestToDehydrate,
				matches
			};
			const lastMatchId = matchesToDehydrate[matchesToDehydrate.length - 1]?.id;
			if (lastMatchId) dehydratedRouter.lastMatchId = dehydrateSsrMatchId(lastMatchId);
			const dehydratedData = await router.options.dehydrate?.();
			if (dehydratedData) dehydratedRouter.dehydratedData = dehydratedData;
			_dehydrated = true;
			const trackPlugins = { didRun: false };
			const serializationAdapters = router.options.serializationAdapters;
			const plugins = serializationAdapters ? serializationAdapters.map((t) => /* @__PURE__ */ makeSsrSerovalPlugin(t, trackPlugins)).concat(defaultSerovalPlugins) : defaultSerovalPlugins;
			const signalSerializationComplete = () => {
				_serializationFinished = true;
				try {
					serializationFinishedListeners.forEach((l$1) => l$1());
					router.emit({ type: "onSerializationFinished" });
				} catch (err) {
					console.error("Serialization listener error:", err);
				} finally {
					serializationFinishedListeners.length = 0;
					renderFinishedListeners.length = 0;
				}
			};
			cn(dehydratedRouter, {
				refs: /* @__PURE__ */ new Map(),
				plugins,
				onSerialize: (data, initial) => {
					let serialized = initial ? TSR_PREFIX + data : data;
					if (trackPlugins.didRun) serialized = P_PREFIX + serialized + P_SUFFIX;
					scriptBuffer.enqueue(serialized);
				},
				onError: (err) => {
					console.error("Serialization error:", err);
					if (err && err.stack) console.error(err.stack);
					signalSerializationComplete();
				},
				scopeId: SCOPE_ID,
				onDone: () => {
					scriptBuffer.enqueue(GLOBAL_TSR + ".e()");
					scriptBuffer.flush();
					signalSerializationComplete();
				}
			});
		},
		isDehydrated() {
			return _dehydrated;
		},
		isSerializationFinished() {
			return _serializationFinished;
		},
		onRenderFinished: (listener) => renderFinishedListeners.push(listener),
		onSerializationFinished: (listener) => serializationFinishedListeners.push(listener),
		setRenderFinished: () => {
			try {
				renderFinishedListeners.forEach((l$1) => l$1());
			} catch (err) {
				console.error("Error in render finished listener:", err);
			} finally {
				renderFinishedListeners.length = 0;
			}
			scriptBuffer.liftBarrier();
		},
		takeBufferedScripts() {
			const scripts = scriptBuffer.takeAll();
			return {
				tag: "script",
				attrs: {
					nonce: router.options.ssr?.nonce,
					className: "$tsr",
					id: TSR_SCRIPT_BARRIER_ID
				},
				children: scripts
			};
		},
		liftScriptBarrier() {
			scriptBuffer.liftBarrier();
		},
		takeBufferedHtml() {
			if (!injectedHtmlBuffer) return;
			const buffered = injectedHtmlBuffer;
			injectedHtmlBuffer = "";
			return buffered;
		},
		cleanup() {
			if (!router.serverSsr) return;
			renderFinishedListeners.length = 0;
			serializationFinishedListeners.length = 0;
			injectedHtmlBuffer = "";
			scriptBuffer.cleanup();
			router.serverSsr = void 0;
		}
	};
}
function getOrigin(request) {
	try {
		return new URL(request.url).origin;
	} catch {}
	return "http://localhost";
}
function getNormalizedURL(url, base) {
	if (typeof url === "string") url = url.replace("\\", "%5C");
	const rawUrl = new URL(url, base);
	const { path: decodedPathname, handledProtocolRelativeURL } = decodePath(rawUrl.pathname);
	const searchParams = new URLSearchParams(rawUrl.search);
	const normalizedHref = decodedPathname + (searchParams.size > 0 ? "?" : "") + searchParams.toString() + rawUrl.hash;
	return {
		url: new URL(normalizedHref, rawUrl.origin),
		handledProtocolRelativeURL
	};
}
function getStartResponseHeaders(opts) {
	return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.stores.matches.get().map((match) => {
		return match.headers;
	}));
}
var entriesPromise;
var baseManifestPromise;
var cachedFinalManifestPromise;
async function loadEntries() {
	const [routerEntry, startEntry, pluginAdapters] = await Promise.all([
		import("./assets/router-DO2A21hY.js"),
		import("./assets/start-B8cmKWhz.js"),
		import("./assets/__23tanstack-start-plugin-adapters-CNJ2jciT.js")
	]);
	return {
		routerEntry,
		startEntry,
		pluginAdapters
	};
}
function getEntries() {
	if (!entriesPromise) entriesPromise = loadEntries();
	return entriesPromise;
}
function getBaseManifest(matchedRoutes) {
	if (!baseManifestPromise) baseManifestPromise = getStartManifest();
	return baseManifestPromise;
}
async function resolveManifest(matchedRoutes, transformFn, cache) {
	const base = await getBaseManifest(matchedRoutes);
	const computeFinalManifest = async () => {
		return transformFn ? await transformManifestAssets(base, transformFn, { clone: !cache }) : buildManifestWithClientEntry(base);
	};
	if (!transformFn || cache) {
		if (!cachedFinalManifestPromise) cachedFinalManifestPromise = computeFinalManifest();
		return cachedFinalManifestPromise;
	}
	return computeFinalManifest();
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var IS_DEV = false;
var ERR_NO_RESPONSE = IS_DEV ? `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.` : "Internal Server Error";
var ERR_NO_DEFER = IS_DEV ? `You cannot defer to the app router if there is no component defined on this route.` : "Internal Server Error";
function throwRouteHandlerError() {
	throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
	throw new Error(ERR_NO_DEFER);
}
function isSpecialResponse(value) {
	return value instanceof Response || isRedirect(value);
}
function handleCtxResult(result) {
	if (isSpecialResponse(result)) return { response: result };
	return result;
}
function executeMiddleware(middlewares, ctx) {
	let index = -1;
	const next = async (nextCtx) => {
		if (nextCtx) {
			if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
			for (const key of Object.keys(nextCtx)) if (key !== "context") ctx[key] = nextCtx[key];
		}
		index++;
		const middleware = middlewares[index];
		if (!middleware) return ctx;
		let result;
		try {
			result = await middleware({
				...ctx,
				next
			});
		} catch (err) {
			if (isSpecialResponse(err)) {
				ctx.response = err;
				return ctx;
			}
			throw err;
		}
		const normalized = handleCtxResult(result);
		if (normalized) {
			if (normalized.response !== void 0) ctx.response = normalized.response;
			if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
		}
		return ctx;
	};
	return next();
}
function handlerToMiddleware(handler, mayDefer = false) {
	if (mayDefer) return handler;
	return async (ctx) => {
		const response = await handler({
			...ctx,
			next: throwIfMayNotDefer
		});
		if (!response) throwRouteHandlerError();
		return response;
	};
}
function createStartHandler(cbOrOptions) {
	const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
	const transformAssetsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssets;
	const transformAssetUrlsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssetUrls;
	const transformOption = transformAssetsOption !== void 0 ? resolveTransformAssetsConfig(transformAssetsOption) : transformAssetUrlsOption !== void 0 ? resolveTransformAssetsConfig(adaptTransformAssetUrlsConfigToTransformAssets(transformAssetUrlsOption)) : void 0;
	const warmupTransformManifest = !!transformAssetsOption && typeof transformAssetsOption === "object" && "warmup" in transformAssetsOption && transformAssetsOption.warmup === true || !!transformAssetUrlsOption && typeof transformAssetUrlsOption === "object" && transformAssetUrlsOption.warmup === true;
	const resolvedTransformConfig = transformOption;
	const cache = resolvedTransformConfig ? resolvedTransformConfig.cache : true;
	const shouldCacheCreateTransform = cache && true;
	let cachedCreateTransformPromise;
	const getTransformFn = async (opts) => {
		if (!resolvedTransformConfig) return void 0;
		if (resolvedTransformConfig.type === "createTransform") {
			if (shouldCacheCreateTransform) {
				if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(resolvedTransformConfig.createTransform(opts)).catch((error) => {
					cachedCreateTransformPromise = void 0;
					throw error;
				});
				return cachedCreateTransformPromise;
			}
			return resolvedTransformConfig.createTransform(opts);
		}
		return resolvedTransformConfig.transformFn;
	};
	if (warmupTransformManifest && cache && !cachedFinalManifestPromise) {
		const warmupPromise = (async () => {
			const base = await getBaseManifest(void 0);
			const transformFn = await getTransformFn({ warmup: true });
			return transformFn ? await transformManifestAssets(base, transformFn, { clone: false }) : buildManifestWithClientEntry(base);
		})();
		cachedFinalManifestPromise = warmupPromise;
		warmupPromise.catch(() => {
			if (cachedFinalManifestPromise === warmupPromise) cachedFinalManifestPromise = void 0;
			cachedCreateTransformPromise = void 0;
		});
	}
	const startRequestResolver = async (request, requestOpts) => {
		let router = null;
		let cbWillCleanup = false;
		try {
			const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
			const href = url.pathname + url.search + url.hash;
			const origin = getOrigin(request);
			if (handledProtocolRelativeURL) return Response.redirect(url, 308);
			const entries = await getEntries();
			const startOptions = await entries.startEntry.startInstance?.getOptions() || {};
			const { hasPluginAdapters, pluginSerializationAdapters } = entries.pluginAdapters;
			const serializationAdapters = [
				...startOptions.serializationAdapters || [],
				...hasPluginAdapters ? pluginSerializationAdapters : [],
				ServerFunctionSerializationAdapter
			];
			const requestStartOptions = {
				...startOptions,
				serializationAdapters
			};
			const flattenedRequestMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
			const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
			const getRouter = async () => {
				if (router) return router;
				router = await entries.routerEntry.getRouter();
				let isShell = IS_SHELL_ENV;
				if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
				const history = createMemoryHistory({ initialEntries: [href] });
				router.update({
					history,
					isShell,
					isPrerendering: IS_PRERENDERING,
					origin: router.options.origin ?? origin,
					defaultSsr: requestStartOptions.defaultSsr,
					serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
					basepath: ROUTER_BASEPATH
				});
				return router;
			};
			if (SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE)) {
				const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
				if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
				const serverFnHandler = async ({ context }) => {
					return runWithStartContext({
						getRouter,
						startOptions: requestStartOptions,
						contextAfterGlobalMiddlewares: context,
						request,
						executedRequestMiddlewares,
						handlerType: "serverFn"
					}, () => handleServerAction({
						request,
						context: requestOpts?.context,
						serverFnId
					}));
				};
				return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d$1) => d$1.options.server), serverFnHandler], {
					request,
					pathname: url.pathname,
					context: createNullProtoObject(requestOpts?.context)
				})).response, request, getRouter);
			}
			const executeRouter = async (serverContext, matchedRoutes) => {
				const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
				if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });
				const manifest = await resolveManifest(matchedRoutes, await getTransformFn({
					warmup: false,
					request
				}), cache);
				const routerInstance = await getRouter();
				attachRouterServerSsrUtils({
					router: routerInstance,
					manifest,
					getRequestAssets: () => getStartContext({ throwIfNotFound: false })?.requestAssets,
					includeUnmatchedRouteAssets: false
				});
				routerInstance.update({ additionalContext: { serverContext } });
				await routerInstance.load();
				if (routerInstance.state.redirect) return routerInstance.state.redirect;
				const ctx = getStartContext({ throwIfNotFound: false });
				await routerInstance.serverSsr.dehydrate({ requestAssets: ctx?.requestAssets });
				const responseHeaders = getStartResponseHeaders({ router: routerInstance });
				cbWillCleanup = true;
				return cb({
					request,
					router: routerInstance,
					responseHeaders
				});
			};
			const requestHandlerMiddleware = async ({ context }) => {
				return runWithStartContext({
					getRouter,
					startOptions: requestStartOptions,
					contextAfterGlobalMiddlewares: context,
					request,
					executedRequestMiddlewares,
					handlerType: "router"
				}, async () => {
					try {
						return await handleServerRoutes({
							getRouter,
							request,
							url,
							executeRouter,
							context,
							executedRequestMiddlewares
						});
					} catch (err) {
						if (err instanceof Response) return err;
						throw err;
					}
				});
			};
			return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d$1) => d$1.options.server), requestHandlerMiddleware], {
				request,
				pathname: url.pathname,
				context: createNullProtoObject(requestOpts?.context)
			})).response, request, getRouter);
		} finally {
			if (router && !cbWillCleanup) router.serverSsr?.cleanup();
			router = null;
		}
	};
	return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter) {
	if (!isRedirect(response)) return response;
	if (isResolvedRedirect(response)) {
		if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
			...response.options,
			isSerializedRedirect: true
		}, { headers: response.headers });
		return response;
	}
	const opts = response.options;
	if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
	if ([
		"params",
		"search",
		"hash"
	].some((d$1) => typeof opts[d$1] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d$1) => typeof opts[d$1] === "function").map((d$1) => `"${d$1}"`).join(", ")}`);
	const redirect$1 = (await getRouter()).resolveRedirect(response);
	if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
		...response.options,
		isSerializedRedirect: true
	}, { headers: response.headers });
	return redirect$1;
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
	const router = await getRouter();
	const pathname = executeRewriteInput(router.rewrite, url).pathname;
	const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
	const isExactMatch = foundRoute && routeParams["**"] === void 0;
	const routeMiddlewares = [];
	for (const route of matchedRoutes) {
		const serverMiddleware = route.options.server?.middleware;
		if (serverMiddleware) {
			const flattened = flattenMiddlewares(serverMiddleware);
			for (const m$2 of flattened) if (!executedRequestMiddlewares.has(m$2)) routeMiddlewares.push(m$2.options.server);
		}
	}
	const server = foundRoute?.options.server;
	if (server?.handlers && isExactMatch) {
		const handlers = typeof server.handlers === "function" ? server.handlers({ createHandlers: (d$1) => d$1 }) : server.handlers;
		const handler = handlers[request.method.toUpperCase()] ?? handlers["ANY"];
		if (handler) {
			const mayDefer = !!foundRoute.options.component;
			if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
			else {
				if (handler.middleware?.length) {
					const handlerMiddlewares = flattenMiddlewares(handler.middleware);
					for (const m$2 of handlerMiddlewares) routeMiddlewares.push(m$2.options.server);
				}
				if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
			}
		}
	}
	routeMiddlewares.push((ctx) => executeRouter(ctx.context, matchedRoutes));
	return (await executeMiddleware(routeMiddlewares, {
		request,
		context,
		params: routeParams,
		pathname
	})).response;
}
var fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
	return { async fetch(...args) {
		return await entry.fetch(...args);
	} };
}
var server_default = createServerEntry({ fetch });
export { StartServer as a, createServerEntry, server_default as default, defaultStreamHandler as i, attachRouterServerSsrUtils as n, HEADERS as r, createStartHandler as t };
