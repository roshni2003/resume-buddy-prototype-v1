import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { t as n } from "./react-BZSX5Bs9.js";
import { t as i, c as r } from "./with-selector-DTFISeXP.js";
var a = !1;
function o(e) {
	return e[e.length - 1];
}
function s(e) {
	return typeof e == `function`;
}
function c(e, t) {
	return s(e) ? e(t) : e;
}
var l = Object.prototype.hasOwnProperty,
	u = Object.prototype.propertyIsEnumerable,
	d = () => Object.create(null),
	f = (e, t) => p(e, t, d);
function p(e, t, n = () => ({}), r = 0) {
	if (e === t) return e;
	if (r > 500) return t;
	const i = t,
		a = _(e) && _(i);
	if (!a && !(h(e) && h(i))) return i;
	const o = a ? e : m(e);
	if (!o) return i;
	const s = a ? i : m(i);
	if (!s) return i;
	let c = o.length,
		u = s.length,
		d = a ? Array(u) : n(),
		f = 0;
	for (let t = 0; t < u; t++) {
		const o = a ? t : s[t],
			u = e[o],
			m = i[o];
		if (u === m) {
			(d[o] = u), (a ? t < c : l.call(e, o)) && f++;
			continue;
		}
		if (u === null || m === null || typeof u != `object` || typeof m != `object`) {
			d[o] = m;
			continue;
		}
		const h = p(u, m, n, r + 1);
		(d[o] = h), h === u && f++;
	}
	return c === u && f === c ? e : d;
}
function m(e) {
	const t = Object.getOwnPropertyNames(e);
	for (const n of t) if (!u.call(e, n)) return !1;
	const n = Object.getOwnPropertySymbols(e);
	if (n.length === 0) return t;
	const r = t;
	for (const t of n) {
		if (!u.call(e, t)) return !1;
		r.push(t);
	}
	return r;
}
function h(e) {
	if (!g(e)) return !1;
	const t = e.constructor;
	if (t === void 0) return !0;
	const n = t.prototype;
	return !(!g(n) || !Object.hasOwn(n, `isPrototypeOf`));
}
function g(e) {
	return Object.prototype.toString.call(e) === `[object Object]`;
}
function _(e) {
	return Array.isArray(e) && e.length === Object.keys(e).length;
}
function v(e, t, n) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return !1;
		for (let r = 0, i = e.length; r < i; r++) if (!v(e[r], t[r], n)) return !1;
		return !0;
	}
	if (h(e) && h(t)) {
		const r = n?.ignoreUndefined ?? !0;
		if (n?.partial) {
			for (const i in t) if ((!r || t[i] !== void 0) && !v(e[i], t[i], n)) return !1;
			return !0;
		}
		let i = 0;
		if (!r) i = Object.keys(e).length;
		else for (const t in e) e[t] !== void 0 && i++;
		let a = 0;
		for (const o in t) if ((!r || t[o] !== void 0) && (a++, a > i || !v(e[o], t[o], n))) return !1;
		return i === a;
	}
	return !1;
}
function y(e) {
	let t,
		n,
		r = new Promise((e, r) => {
			(t = e), (n = r);
		});
	return (
		(r.status = `pending`),
		(r.resolve = (n) => {
			(r.status = `resolved`), (r.value = n), t(n), e?.(n);
		}),
		(r.reject = (e) => {
			(r.status = `rejected`), n(e);
		}),
		r
	);
}
function b(e) {
	return typeof e?.message == `string`
		? e.message.startsWith(`Failed to fetch dynamically imported module`) ||
				e.message.startsWith(`error loading dynamically imported module`) ||
				e.message.startsWith(`Importing a module script failed`)
		: !1;
}
function x(e) {
	return !!(e && typeof e == `object` && typeof e.then == `function`);
}
function ee(e) {
	return e.replace(/[\x00-\x1f\x7f]/g, ``);
}
function S(e) {
	let t;
	try {
		t = decodeURI(e);
	} catch {
		t = e.replaceAll(/%[0-9A-F]{2}/gi, (e) => {
			try {
				return decodeURI(e);
			} catch {
				return e;
			}
		});
	}
	return ee(t);
}
var C = [`http:`, `https:`, `mailto:`, `tel:`];
function w(e, t) {
	if (!e) return !1;
	try {
		const n = new URL(e);
		return !t.has(n.protocol);
	} catch {
		return !1;
	}
}
var te = { "&": `\\u0026`, ">": `\\u003e`, "<": `\\u003c`, "\u2028": `\\u2028`, "\u2029": `\\u2029` },
	ne = /[&><\u2028\u2029]/g;
function re(e) {
	return e.replace(ne, (e) => te[e]);
}
function ie(e) {
	if (!e || (!/[%\\\x00-\x1f\x7f]/.test(e) && !e.startsWith(`//`))) return { path: e, handledProtocolRelativeURL: !1 };
	let t = /%25|%5C/gi,
		n = 0,
		r = ``,
		i;
	for (; (i = t.exec(e)) !== null; ) (r += S(e.slice(n, i.index)) + i[0]), (n = t.lastIndex);
	r += S(n ? e.slice(n) : e);
	let a = !1;
	return (
		r.startsWith(`//`) && ((a = !0), (r = `/` + r.replace(/^\/+/, ``))), { path: r, handledProtocolRelativeURL: a }
	);
}
function ae(e) {
	return /\s|[^\u0000-\u007F]/.test(e) ? e.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent) : e;
}
function oe(e, t) {
	if (e === t) return !0;
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function T(e) {
	let t = new Map(),
		n,
		r,
		i = (e) => {
			e.next &&
				(e.prev
					? ((e.prev.next = e.next), (e.next.prev = e.prev), (e.next = void 0), r && ((r.next = e), (e.prev = r)))
					: ((e.next.prev = void 0), (n = e.next), (e.next = void 0), r && ((e.prev = r), (r.next = e))),
				(r = e));
		};
	return {
		get(e) {
			const n = t.get(e);
			if (n) return i(n), n.value;
		},
		set(a, o) {
			if (t.size >= e && n) {
				const e = n;
				t.delete(e.key), e.next && ((n = e.next), (e.next.prev = void 0)), e === r && (r = void 0);
			}
			const s = t.get(a);
			if (s) (s.value = o), i(s);
			else {
				const e = { key: a, value: o, prev: r };
				r && (r.next = e), (r = e), (n ||= e), t.set(a, e);
			}
		},
		clear() {
			t.clear(), (n = void 0), (r = void 0);
		},
	};
}
var E = 4,
	D = 5;
function se(e) {
	const t = e.indexOf(`{`);
	if (t === -1) return null;
	const n = e.indexOf(`}`, t);
	return n === -1 || t + 1 >= e.length ? null : [t, n];
}
function O(e, t, n = new Uint16Array(6)) {
	const r = e.indexOf(`/`, t),
		i = r === -1 ? e.length : r,
		a = e.substring(t, i);
	if (!a || !a.includes(`$`)) return (n[0] = 0), (n[1] = t), (n[2] = t), (n[3] = i), (n[4] = i), (n[5] = i), n;
	if (a === `$`) {
		const r = e.length;
		return (n[0] = 2), (n[1] = t), (n[2] = t), (n[3] = r), (n[4] = r), (n[5] = r), n;
	}
	if (a.charCodeAt(0) === 36) return (n[0] = 1), (n[1] = t), (n[2] = t + 1), (n[3] = i), (n[4] = i), (n[5] = i), n;
	const o = se(a);
	if (o) {
		const [r, s] = o,
			c = a.charCodeAt(r + 1);
		if (c === 45) {
			if (r + 2 < a.length && a.charCodeAt(r + 2) === 36) {
				const e = r + 3,
					a = s;
				if (e < a) return (n[0] = 3), (n[1] = t + r), (n[2] = t + e), (n[3] = t + a), (n[4] = t + s + 1), (n[5] = i), n;
			}
		} else if (c === 36) {
			const a = r + 1,
				o = r + 2;
			return o === s
				? ((n[0] = 2), (n[1] = t + r), (n[2] = t + a), (n[3] = t + o), (n[4] = t + s + 1), (n[5] = e.length), n)
				: ((n[0] = 1), (n[1] = t + r), (n[2] = t + o), (n[3] = t + s), (n[4] = t + s + 1), (n[5] = i), n);
		}
	}
	return (n[0] = 0), (n[1] = t), (n[2] = t), (n[3] = i), (n[4] = i), (n[5] = i), n;
}
function k(e, t, n, r, i, a, o) {
	o?.(n);
	let s = r;
	{
		const r = n.fullPath ?? n.from,
			o = r.length,
			c = n.options?.caseSensitive ?? e,
			l = !!(n.options?.params?.parse && n.options?.skipRouteOnParseError?.params);
		for (; s < o; ) {
			let e = O(r, s, t),
				o,
				u = s,
				d = e[5];
			switch (((s = d + 1), a++, e[0])) {
				case 0: {
					const t = r.substring(e[2], e[3]);
					if (c) {
						const e = i.static?.get(t);
						if (e) o = e;
						else {
							i.static ??= new Map();
							const e = M(n.fullPath ?? n.from);
							(e.parent = i), (e.depth = a), (o = e), i.static.set(t, e);
						}
					} else {
						const e = t.toLowerCase(),
							r = i.staticInsensitive?.get(e);
						if (r) o = r;
						else {
							i.staticInsensitive ??= new Map();
							const t = M(n.fullPath ?? n.from);
							(t.parent = i), (t.depth = a), (o = t), i.staticInsensitive.set(e, t);
						}
					}
					break;
				}
				case 1: {
					const t = r.substring(u, e[1]),
						s = r.substring(e[4], d),
						f = c && !!(t || s),
						p = t ? (f ? t : t.toLowerCase()) : void 0,
						m = s ? (f ? s : s.toLowerCase()) : void 0,
						h =
							!l &&
							i.dynamic?.find((e) => !e.skipOnParamError && e.caseSensitive === f && e.prefix === p && e.suffix === m);
					if (h) o = h;
					else {
						const e = N(1, n.fullPath ?? n.from, f, p, m);
						(o = e), (e.depth = a), (e.parent = i), (i.dynamic ??= []), i.dynamic.push(e);
					}
					break;
				}
				case 3: {
					const t = r.substring(u, e[1]),
						s = r.substring(e[4], d),
						f = c && !!(t || s),
						p = t ? (f ? t : t.toLowerCase()) : void 0,
						m = s ? (f ? s : s.toLowerCase()) : void 0,
						h =
							!l &&
							i.optional?.find((e) => !e.skipOnParamError && e.caseSensitive === f && e.prefix === p && e.suffix === m);
					if (h) o = h;
					else {
						const e = N(3, n.fullPath ?? n.from, f, p, m);
						(o = e), (e.parent = i), (e.depth = a), (i.optional ??= []), i.optional.push(e);
					}
					break;
				}
				case 2: {
					const t = r.substring(u, e[1]),
						s = r.substring(e[4], d),
						l = c && !!(t || s),
						f = t ? (l ? t : t.toLowerCase()) : void 0,
						p = s ? (l ? s : s.toLowerCase()) : void 0,
						m = N(2, n.fullPath ?? n.from, l, f, p);
					(o = m), (m.parent = i), (m.depth = a), (i.wildcard ??= []), i.wildcard.push(m);
				}
			}
			i = o;
		}
		if (l && n.children && !n.isRoot && n.id && n.id.charCodeAt(n.id.lastIndexOf(`/`) + 1) === 95) {
			const e = M(n.fullPath ?? n.from);
			(e.kind = D), (e.parent = i), a++, (e.depth = a), (i.pathless ??= []), i.pathless.push(e), (i = e);
		}
		const u = (n.path || !n.children) && !n.isRoot;
		if (u && r.endsWith(`/`)) {
			const e = M(n.fullPath ?? n.from);
			(e.kind = E), (e.parent = i), a++, (e.depth = a), (i.index = e), (i = e);
		}
		(i.parse = n.options?.params?.parse ?? null),
			(i.skipOnParamError = l),
			(i.parsingPriority = n.options?.skipRouteOnParseError?.priority ?? 0),
			u && !i.route && ((i.route = n), (i.fullPath = n.fullPath ?? n.from));
	}
	if (n.children) for (const r of n.children) k(e, t, r, s, i, a, o);
}
function A(e, t) {
	if (e.skipOnParamError && !t.skipOnParamError) return -1;
	if (!e.skipOnParamError && t.skipOnParamError) return 1;
	if (e.skipOnParamError && t.skipOnParamError && (e.parsingPriority || t.parsingPriority))
		return t.parsingPriority - e.parsingPriority;
	if (e.prefix && t.prefix && e.prefix !== t.prefix) {
		if (e.prefix.startsWith(t.prefix)) return -1;
		if (t.prefix.startsWith(e.prefix)) return 1;
	}
	if (e.suffix && t.suffix && e.suffix !== t.suffix) {
		if (e.suffix.endsWith(t.suffix)) return -1;
		if (t.suffix.endsWith(e.suffix)) return 1;
	}
	return e.prefix && !t.prefix
		? -1
		: !e.prefix && t.prefix
			? 1
			: e.suffix && !t.suffix
				? -1
				: !e.suffix && t.suffix
					? 1
					: e.caseSensitive && !t.caseSensitive
						? -1
						: !e.caseSensitive && t.caseSensitive
							? 1
							: 0;
}
function j(e) {
	if (e.pathless) for (const t of e.pathless) j(t);
	if (e.static) for (const t of e.static.values()) j(t);
	if (e.staticInsensitive) for (const t of e.staticInsensitive.values()) j(t);
	if (e.dynamic?.length) {
		e.dynamic.sort(A);
		for (const t of e.dynamic) j(t);
	}
	if (e.optional?.length) {
		e.optional.sort(A);
		for (const t of e.optional) j(t);
	}
	if (e.wildcard?.length) {
		e.wildcard.sort(A);
		for (const t of e.wildcard) j(t);
	}
}
function M(e) {
	return {
		kind: 0,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath: e,
		parent: null,
		parse: null,
		skipOnParamError: !1,
		parsingPriority: 0,
	};
}
function N(e, t, n, r, i) {
	return {
		kind: e,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath: t,
		parent: null,
		parse: null,
		skipOnParamError: !1,
		parsingPriority: 0,
		caseSensitive: n,
		prefix: r,
		suffix: i,
	};
}
function ce(e, t) {
	const n = M(`/`),
		r = new Uint16Array(6);
	for (const t of e) k(!1, r, t, 1, n, 0);
	j(n), (t.masksTree = n), (t.flatCache = T(1e3));
}
function le(e, t) {
	e ||= `/`;
	const n = t.flatCache.get(e);
	if (n) return n;
	const r = P(e, t.masksTree);
	return t.flatCache.set(e, r), r;
}
function ue(e, t, n, r, i) {
	(e ||= `/`), (r ||= `/`);
	let a = t ? `case\0${e}` : e,
		o = i.singleCache.get(a);
	return o || ((o = M(`/`)), k(t, new Uint16Array(6), { from: e }, 1, o, 0), i.singleCache.set(a, o)), P(r, o, n);
}
function de(e, t, n = !1) {
	const r = n ? e : `nofuzz\0${e}`,
		i = t.matchCache.get(r);
	if (i !== void 0) return i;
	e ||= `/`;
	let a;
	try {
		a = P(e, t.segmentTree, n);
	} catch (e) {
		if (e instanceof URIError) a = null;
		else throw e;
	}
	return a && (a.branch = I(a.route)), t.matchCache.set(r, a), a;
}
function fe(e) {
	return e === `/` ? e : e.replace(/\/{1,}$/, ``);
}
function pe(e, t = !1, n) {
	let i = M(e.fullPath),
		a = new Uint16Array(6),
		o = {},
		s = {},
		c = 0;
	return (
		k(t, a, e, 1, i, 0, (e) => {
			if ((n?.(e, c), e.id in o && r(), (o[e.id] = e), c !== 0 && e.path)) {
				const t = fe(e.fullPath);
				(!s[t] || e.fullPath.endsWith(`/`)) && (s[t] = e);
			}
			c++;
		}),
		j(i),
		{
			processedTree: { segmentTree: i, singleCache: T(1e3), matchCache: T(1e3), flatCache: null, masksTree: null },
			routesById: o,
			routesByPath: s,
		}
	);
}
function P(e, t, n = !1) {
	const r = e.split(`/`),
		i = R(e, r, t, n);
	if (!i) return null;
	const [a] = F(e, r, i);
	return { route: i.node.route, rawParams: a, parsedParams: i.parsedParams };
}
function F(e, t, n) {
	let r = L(n.node),
		i = null,
		a = Object.create(null),
		o = n.extract?.part ?? 0,
		s = n.extract?.node ?? 0,
		c = n.extract?.path ?? 0,
		l = n.extract?.segment ?? 0;
	for (; s < r.length; o++, s++, c++, l++) {
		const u = r[s];
		if (u.kind === E) break;
		if (u.kind === D) {
			l--, o--, c--;
			continue;
		}
		const d = t[o],
			f = c;
		if ((d && (c += d.length), u.kind === 1)) {
			i ??= n.node.fullPath.split(`/`);
			const e = i[l],
				t = u.prefix?.length ?? 0;
			if (e.charCodeAt(t) === 123) {
				const n = u.suffix?.length ?? 0,
					r = e.substring(t + 2, e.length - n - 1),
					i = d.substring(t, d.length - n);
				a[r] = decodeURIComponent(i);
			} else {
				const t = e.substring(1);
				a[t] = decodeURIComponent(d);
			}
		} else if (u.kind === 3) {
			if (n.skipped & (1 << s)) {
				o--, (c = f - 1);
				continue;
			}
			i ??= n.node.fullPath.split(`/`);
			const e = i[l],
				t = u.prefix?.length ?? 0,
				r = u.suffix?.length ?? 0,
				p = e.substring(t + 3, e.length - r - 1),
				m = u.suffix || u.prefix ? d.substring(t, d.length - r) : d;
			m && (a[p] = decodeURIComponent(m));
		} else if (u.kind === 2) {
			const t = u,
				n = e.substring(f + (t.prefix?.length ?? 0), e.length - (t.suffix?.length ?? 0)),
				r = decodeURIComponent(n);
			(a[`*`] = r), (a._splat = r);
			break;
		}
	}
	return n.rawParams && Object.assign(a, n.rawParams), [a, { part: o, node: s, path: c, segment: l }];
}
function I(e) {
	const t = [e];
	for (; e.parentRoute; ) (e = e.parentRoute), t.push(e);
	return t.reverse(), t;
}
function L(e) {
	const t = Array(e.depth + 1);
	do (t[e.depth] = e), (e = e.parent);
	while (e);
	return t;
}
function R(e, t, n, r) {
	if (e === `/` && n.index) return { node: n.index, skipped: 0 };
	let i = !o(t),
		a = i && e !== `/`,
		s = t.length - (i ? 1 : 0),
		c = [{ node: n, index: 1, skipped: 0, depth: 1, statics: 0, dynamics: 0, optionals: 0 }],
		l = null,
		u = null;
	for (; c.length; ) {
		let n = c.pop(),
			{ node: i, index: o, skipped: d, depth: f, statics: p, dynamics: m, optionals: h } = n,
			{ extract: g, rawParams: _, parsedParams: v } = n;
		if (i.kind === 2 && i.route && !H(u, n)) continue;
		if (i.skipOnParamError) {
			if (!V(e, t, n)) continue;
			(_ = n.rawParams), (g = n.extract), (v = n.parsedParams);
		}
		r && i.route && i.kind !== E && H(l, n) && (l = n);
		const y = o === s;
		if (
			y &&
			(i.route && (!a || i.kind === E || i.kind === 2) && H(u, n) && (u = n),
			!i.optional && !i.wildcard && !i.index && !i.pathless)
		)
			continue;
		let b = y ? void 0 : t[o],
			x;
		if (y && i.index) {
			let n = {
					node: i.index,
					index: o,
					skipped: d,
					depth: f + 1,
					statics: p,
					dynamics: m,
					optionals: h,
					extract: g,
					rawParams: _,
					parsedParams: v,
				},
				r = !0;
			if ((i.index.skipOnParamError && (V(e, t, n) || (r = !1)), r)) {
				if (!m && !h && !d && B(p, s)) return n;
				H(u, n) && (u = n);
			}
		}
		if (i.wildcard)
			for (let e = i.wildcard.length - 1; e >= 0; e--) {
				const n = i.wildcard[e],
					{ prefix: r, suffix: a } = n;
				if (!(r && (y || !(n.caseSensitive ? b : (x ??= b.toLowerCase())).startsWith(r)))) {
					if (a) {
						if (y) continue;
						const e = t.slice(o).join(`/`).slice(-a.length);
						if ((n.caseSensitive ? e : e.toLowerCase()) !== a) continue;
					}
					c.push({
						node: n,
						index: s,
						skipped: d,
						depth: f + 1,
						statics: p,
						dynamics: m,
						optionals: h,
						extract: g,
						rawParams: _,
						parsedParams: v,
					});
				}
			}
		if (i.optional) {
			const e = d | (1 << f),
				t = f + 1;
			for (let n = i.optional.length - 1; n >= 0; n--) {
				const r = i.optional[n];
				c.push({
					node: r,
					index: o,
					skipped: e,
					depth: t,
					statics: p,
					dynamics: m,
					optionals: h,
					extract: g,
					rawParams: _,
					parsedParams: v,
				});
			}
			if (!y)
				for (let e = i.optional.length - 1; e >= 0; e--) {
					const n = i.optional[e],
						{ prefix: r, suffix: a } = n;
					if (r || a) {
						const e = n.caseSensitive ? b : (x ??= b.toLowerCase());
						if ((r && !e.startsWith(r)) || (a && !e.endsWith(a))) continue;
					}
					c.push({
						node: n,
						index: o + 1,
						skipped: d,
						depth: t,
						statics: p,
						dynamics: m,
						optionals: h + z(s, o),
						extract: g,
						rawParams: _,
						parsedParams: v,
					});
				}
		}
		if (!y && i.dynamic && b)
			for (let e = i.dynamic.length - 1; e >= 0; e--) {
				const t = i.dynamic[e],
					{ prefix: n, suffix: r } = t;
				if (n || r) {
					const e = t.caseSensitive ? b : (x ??= b.toLowerCase());
					if ((n && !e.startsWith(n)) || (r && !e.endsWith(r))) continue;
				}
				c.push({
					node: t,
					index: o + 1,
					skipped: d,
					depth: f + 1,
					statics: p,
					dynamics: m + z(s, o),
					optionals: h,
					extract: g,
					rawParams: _,
					parsedParams: v,
				});
			}
		if (!y && i.staticInsensitive) {
			const e = i.staticInsensitive.get((x ??= b.toLowerCase()));
			e &&
				c.push({
					node: e,
					index: o + 1,
					skipped: d,
					depth: f + 1,
					statics: p + z(s, o),
					dynamics: m,
					optionals: h,
					extract: g,
					rawParams: _,
					parsedParams: v,
				});
		}
		if (!y && i.static) {
			const e = i.static.get(b);
			e &&
				c.push({
					node: e,
					index: o + 1,
					skipped: d,
					depth: f + 1,
					statics: p + z(s, o),
					dynamics: m,
					optionals: h,
					extract: g,
					rawParams: _,
					parsedParams: v,
				});
		}
		if (i.pathless) {
			const e = f + 1;
			for (let t = i.pathless.length - 1; t >= 0; t--) {
				const n = i.pathless[t];
				c.push({
					node: n,
					index: o,
					skipped: d,
					depth: e,
					statics: p,
					dynamics: m,
					optionals: h,
					extract: g,
					rawParams: _,
					parsedParams: v,
				});
			}
		}
	}
	if (u) return u;
	if (r && l) {
		let n = l.index;
		for (let e = 0; e < l.index; e++) n += t[e].length;
		const r = n === e.length ? `/` : e.slice(n);
		return (l.rawParams ??= Object.create(null)), (l.rawParams[`**`] = decodeURIComponent(r)), l;
	}
	return null;
}
function z(e, t) {
	return 2 ** (e - t - 1);
}
function B(e, t) {
	return e === 2 ** (t - 1) - 1;
}
function V(e, t, n) {
	try {
		const [r, i] = F(e, t, n);
		(n.rawParams = r), (n.extract = i);
		const a = n.node.parse(r);
		return (n.parsedParams = Object.assign(Object.create(null), n.parsedParams, a)), !0;
	} catch {
		return null;
	}
}
function H(e, t) {
	return e
		? t.statics > e.statics ||
				(t.statics === e.statics &&
					(t.dynamics > e.dynamics ||
						(t.dynamics === e.dynamics &&
							(t.optionals > e.optionals ||
								(t.optionals === e.optionals &&
									((t.node.kind === E) > (e.node.kind === E) ||
										((t.node.kind === E) == (e.node.kind === E) && t.depth > e.depth)))))))
		: !0;
}
function me(e) {
	return U(e.filter((e) => e !== void 0).join(`/`));
}
function U(e) {
	return e.replace(/\/{2,}/g, `/`);
}
function W(e) {
	return e === `/` ? e : e.replace(/^\/{1,}/, ``);
}
function G(e) {
	const t = e.length;
	return t > 1 && e[t - 1] === `/` ? e.replace(/\/{1,}$/, ``) : e;
}
function he(e) {
	return G(W(e));
}
function K(e, t) {
	return e?.endsWith(`/`) && e !== `/` && e !== `${t}/` ? e.slice(0, -1) : e;
}
function ge(e, t, n) {
	return K(e, n) === K(t, n);
}
function _e({ base: e, to: t, trailingSlash: n = `never`, cache: r }) {
	let i = t.startsWith(`/`),
		a = !i && t === `.`,
		s;
	if (r) {
		s = i ? t : a ? e : e + `\0` + t;
		const n = r.get(s);
		if (n) return n;
	}
	let c;
	if (a) c = e.split(`/`);
	else if (i) c = t.split(`/`);
	else {
		for (c = e.split(`/`); c.length > 1 && o(c) === ``; ) c.pop();
		const n = t.split(`/`);
		for (let e = 0, t = n.length; e < t; e++) {
			const r = n[e];
			r === `` ? (e ? e === t - 1 && c.push(r) : (c = [r])) : r === `..` ? c.pop() : r === `.` || c.push(r);
		}
	}
	c.length > 1 && (o(c) === `` ? n === `never` && c.pop() : n === `always` && c.push(``));
	let l,
		u = ``;
	for (let e = 0; e < c.length; e++) {
		e > 0 && (u += `/`);
		const t = c[e];
		if (!t) continue;
		l = O(t, 0, l);
		const n = l[0];
		if (n === 0) {
			u += t;
			continue;
		}
		const r = l[5],
			i = t.substring(0, l[1]),
			a = t.substring(l[4], r),
			o = t.substring(l[2], l[3]);
		n === 1
			? (u += i || a ? `${i}{$${o}}${a}` : `$${o}`)
			: n === 2
				? (u += i || a ? `${i}{$}${a}` : `$`)
				: (u += `${i}{-$${o}}${a}`);
	}
	u = U(u);
	const d = u || `/`;
	return s && r && r.set(s, d), d;
}
function ve(e) {
	const t = new Map(e.map((e) => [encodeURIComponent(e), e])),
		n = Array.from(t.keys())
			.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`))
			.join(`|`),
		r = new RegExp(n, `g`);
	return (e) => e.replace(r, (e) => t.get(e) ?? e);
}
function q(e, t, n) {
	const r = t[e];
	return typeof r == `string`
		? e === `_splat`
			? /^[a-zA-Z0-9\-._~!/]*$/.test(r)
				? r
				: r
						.split(`/`)
						.map((e) => J(e, n))
						.join(`/`)
			: J(r, n)
		: r;
}
function ye({ path: e, params: t, decoder: n, ...r }) {
	let i = !1,
		a = Object.create(null);
	if (!e || e === `/`) return { interpolatedPath: `/`, usedParams: a, isMissingParams: i };
	if (!e.includes(`$`)) return { interpolatedPath: e, usedParams: a, isMissingParams: i };
	let o = e.length,
		s = 0,
		c,
		l = ``;
	for (; s < o; ) {
		const r = s;
		c = O(e, r, c);
		const o = c[5];
		if (((s = o + 1), r === o)) continue;
		const u = c[0];
		if (u === 0) {
			l += `/` + e.substring(r, o);
			continue;
		}
		if (u === 2) {
			const s = t._splat;
			(a._splat = s), (a[`*`] = s);
			const u = e.substring(r, c[1]),
				d = e.substring(c[4], o);
			if (!s) {
				(i = !0), (u || d) && (l += `/` + u + d);
				continue;
			}
			const f = q(`_splat`, t, n);
			l += `/` + u + f + d;
			continue;
		}
		if (u === 1) {
			const s = e.substring(c[2], c[3]);
			!i && !(s in t) && (i = !0), (a[s] = t[s]);
			const u = e.substring(r, c[1]),
				d = e.substring(c[4], o),
				f = q(s, t, n) ?? `undefined`;
			l += `/` + u + f + d;
			continue;
		}
		if (u === 3) {
			const i = e.substring(c[2], c[3]),
				s = t[i];
			if (s == null) continue;
			a[i] = s;
			const u = e.substring(r, c[1]),
				d = e.substring(c[4], o),
				f = q(i, t, n) ?? ``;
			l += `/` + u + f + d;
		}
	}
	return e.endsWith(`/`) && (l += `/`), { usedParams: a, interpolatedPath: l || `/`, isMissingParams: i };
}
function J(e, t) {
	const n = encodeURIComponent(e);
	return t?.(n) ?? n;
}
var be = `__root__`,
	Y = e(n(), 1),
	xe = Y.use,
	Se = typeof window < `u` ? Y.useLayoutEffect : Y.useEffect;
function Ce(e) {
	const t = Y.useRef({ value: e, prev: null }),
		n = t.current.value;
	return e !== n && (t.current = { value: e, prev: n }), t.current.prev;
}
function we(e, t, n = {}, r = {}) {
	Y.useEffect(() => {
		if (!e.current || r.disabled || typeof IntersectionObserver != `function`) return;
		const i = new IntersectionObserver(([e]) => {
			t(e);
		}, n);
		return (
			i.observe(e.current),
			() => {
				i.disconnect();
			}
		);
	}, [t, n, r.disabled, e]);
}
function Te(e) {
	const t = Y.useRef(null);
	return Y.useImperativeHandle(e, () => t.current, []), t;
}
var X = e(t(), 1);
function Z({ children: e, fallback: t = null }) {
	return Q() ? (0, X.jsx)(Y.Fragment, { children: e }) : (0, X.jsx)(Y.Fragment, { children: t });
}
function Q() {
	return Y.useSyncExternalStore(
		Ee,
		() => !0,
		() => !1,
	);
}
function Ee() {
	return () => {};
}
var $ = Y.createContext(null);
function De(e) {
	return Y.useContext($);
}
var Oe = Y.createContext(void 0),
	ke = Y.createContext(void 0),
	Ae = i();
function je(e, t) {
	return e === t;
}
function Me(e, t, n = je) {
	const r = (0, Y.useCallback)(
			(t) => {
				if (!e) return () => {};
				const { unsubscribe: n } = e.subscribe(t);
				return n;
			},
			[e],
		),
		i = (0, Y.useCallback)(() => e?.get(), [e]);
	return (0, Ae.useSyncExternalStoreWithSelector)(r, i, i, t, n);
}
export {
	C as A,
	h as B,
	G as C,
	ce as D,
	ue as E,
	ae as F,
	a as G,
	o as H,
	re as I,
	c as L,
	y as M,
	ie as N,
	pe as O,
	v as P,
	w as R,
	W as S,
	de as T,
	f as U,
	x as V,
	p as W,
	ye as _,
	$ as a,
	_e as b,
	xe as c,
	Se as d,
	Ce as f,
	ge as g,
	ve as h,
	De as i,
	oe as j,
	T as k,
	Te as l,
	U as m,
	ke as n,
	Z as o,
	be as p,
	Oe as r,
	Q as s,
	Me as t,
	we as u,
	me as v,
	le as w,
	he as x,
	K as y,
	b as z,
};
