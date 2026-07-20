import { t as a, a as e, r as i, n, o as r, i as t } from "./jsx-runtime-D7jARjhZ.js";
import { t as o } from "./react-BZSX5Bs9.js";

var s = n((e) => {
		var t = o();
		function n(e) {
			var t = `https://react.dev/errors/` + e;
			if (1 < arguments.length) {
				t += `?args[]=` + encodeURIComponent(arguments[1]);
				for (var n = 2; n < arguments.length; n++) t += `&args[]=` + encodeURIComponent(arguments[n]);
			}
			return (
				`Minified React error #` +
				e +
				`; visit ` +
				t +
				` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
			);
		}
		function r() {}
		var i = {
				d: {
					f: r,
					r: () => {
						throw Error(n(522));
					},
					D: r,
					C: r,
					L: r,
					m: r,
					X: r,
					S: r,
					M: r,
				},
				p: 0,
				findDOMNode: null,
			},
			a = Symbol.for(`react.portal`);
		function s(e, t, n) {
			var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: a, key: r == null ? null : `` + r, children: e, containerInfo: t, implementation: n };
		}
		var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function l(e, t) {
			if (e === `font`) return ``;
			if (typeof t == `string`) return t === `use-credentials` ? t : ``;
		}
		(e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
			(e.createPortal = function (e, t) {
				var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)) throw Error(n(299));
				return s(e, t, null, r);
			}),
			(e.flushSync = (e) => {
				var t = c.T,
					n = i.p;
				try {
					if (((c.T = null), (i.p = 2), e)) return e();
				} finally {
					(c.T = t), (i.p = n), i.d.f();
				}
			}),
			(e.preconnect = (e, t) => {
				typeof e == `string` &&
					(t
						? ((t = t.crossOrigin), (t = typeof t == `string` ? (t === `use-credentials` ? t : ``) : void 0))
						: (t = null),
					i.d.C(e, t));
			}),
			(e.prefetchDNS = (e) => {
				typeof e == `string` && i.d.D(e);
			}),
			(e.preinit = (e, t) => {
				if (typeof e == `string` && t && typeof t.as == `string`) {
					var n = t.as,
						r = l(n, t.crossOrigin),
						a = typeof t.integrity == `string` ? t.integrity : void 0,
						o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
					n === `style`
						? i.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
								crossOrigin: r,
								integrity: a,
								fetchPriority: o,
							})
						: n === `script` &&
							i.d.X(e, {
								crossOrigin: r,
								integrity: a,
								fetchPriority: o,
								nonce: typeof t.nonce == `string` ? t.nonce : void 0,
							});
				}
			}),
			(e.preinitModule = (e, t) => {
				if (typeof e == `string`)
					if (typeof t == `object` && t) {
						if (t.as == null || t.as === `script`) {
							var n = l(t.as, t.crossOrigin);
							i.d.M(e, {
								crossOrigin: n,
								integrity: typeof t.integrity == `string` ? t.integrity : void 0,
								nonce: typeof t.nonce == `string` ? t.nonce : void 0,
							});
						}
					} else t ?? i.d.M(e);
			}),
			(e.preload = (e, t) => {
				if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
					var n = t.as,
						r = l(n, t.crossOrigin);
					i.d.L(e, n, {
						crossOrigin: r,
						integrity: typeof t.integrity == `string` ? t.integrity : void 0,
						nonce: typeof t.nonce == `string` ? t.nonce : void 0,
						type: typeof t.type == `string` ? t.type : void 0,
						fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
						referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
						imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
						imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
						media: typeof t.media == `string` ? t.media : void 0,
					});
				}
			}),
			(e.preloadModule = (e, t) => {
				if (typeof e == `string`)
					if (t) {
						var n = l(t.as, t.crossOrigin);
						i.d.m(e, {
							as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
							crossOrigin: n,
							integrity: typeof t.integrity == `string` ? t.integrity : void 0,
						});
					} else i.d.m(e);
			}),
			(e.requestFormReset = (e) => {
				i.d.r(e);
			}),
			(e.unstable_batchedUpdates = (e, t) => e(t)),
			(e.useFormState = (e, t, n) => c.H.useFormState(e, t, n)),
			(e.useFormStatus = () => c.H.useHostTransitionStatus()),
			(e.version = `19.2.4`);
	}),
	c = n((e, t) => {
		function n() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
				} catch (e) {
					console.error(e);
				}
		}
		n(), (t.exports = s());
	}),
	l = r(a(), 1),
	u = r(o(), 1),
	d = /<([a-zA-Z0-9]+)>([\s\S]*?)<\/\1>|<([a-zA-Z0-9]+)\/>/,
	f = {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0,
		menuitem: !0,
	};
function p(e, t = {}) {
	const n = e.split(d);
	if (n.length === 1) return e;
	const r = h(0, `$lingui$`),
		i = [],
		a = n.shift();
	a && i.push(a);
	for (const [e, a, o] of m(n)) {
		let n = e === void 0 ? void 0 : t[e];
		(!n || (f[n.type] && a)) &&
			(n
				? console.error(`${n.type} is a void element tag therefore it must have no children`)
				: console.error(`Can't use element at index '${e}' as it is not declared in the original translation`),
			(n = (0, l.jsx)(l.Fragment, {}))),
			Array.isArray(n) && (n = (0, l.jsx)(l.Fragment, { children: n })),
			i.push((0, u.cloneElement)(n, { key: r() }, a ? p(a, t) : n.props.children)),
			o && i.push(o);
	}
	return i.length === 1 ? i[0] : i;
}
function m(e) {
	if (!e.length) return [];
	const [t, n, r, i] = e.slice(0, 4);
	return [[t || r, n || ``, i]].concat(m(e.slice(4, e.length)));
}
var h =
	(e = 0, t = ``) =>
	() =>
		`${t}_${e++}`;
function g(e) {
	const {
			render: t,
			component: n,
			id: r,
			message: i,
			formats: a,
			lingui: { i18n: o, defaultComponent: s },
		} = e,
		{ values: c, components: u } = v(e),
		d = o && typeof o._ == `function` ? o._(r, c, { message: i, formats: a }) : r,
		f = d ? p(d, u) : null;
	if (t === null || n === null) return f;
	const m = s || _,
		h = { id: r, message: i, translation: f, children: f };
	if (t && n)
		console.error("You can't use both `component` and `render` prop at the same time. `component` is ignored.");
	else if (t && typeof t != `function`)
		console.error(`Invalid value supplied to prop \`render\`. It must be a function, provided ${t}`);
	else if (n && typeof n != `function`)
		return (
			console.error(`Invalid value supplied to prop \`component\`. It must be a React component, provided ${n}`),
			(0, l.jsx)(m, { ...h, children: f })
		);
	return typeof t == `function` ? t(h) : (0, l.jsx)(n || m, { ...h, children: f });
}
var _ = ({ children: e }) => e,
	v = (e) => {
		if (!e.values) return { values: void 0, components: e.components };
		const t = { ...e.values },
			n = { ...e.components };
		return (
			Object.entries(e.values).forEach(([e, r]) => {
				if (typeof r == `string` || typeof r == `number`) return;
				const i = Object.keys(n).length;
				(n[i] = (0, l.jsx)(l.Fragment, { children: r })), (t[e] = `<${i}/>`);
			}),
			{ values: t, components: n }
		);
	},
	y = (0, u.createContext)(null),
	b = (e) => (0, u.useContext)(y);
function x() {
	return b();
}
var S = ({ i18n: e, defaultComponent: t, children: n }) => {
	const r = (0, u.useRef)(e.locale),
		i = (0, u.useCallback)(() => ({ i18n: e, defaultComponent: t, _: e.t.bind(e) }), [e, t]),
		[a, o] = (0, u.useState)(i());
	return (
		(0, u.useEffect)(() => {
			const t = () => {
					(r.current = e.locale), o(i());
				},
				n = e.on(`change`, t);
			return r.current !== e.locale && t(), n;
		}, [e, i]),
		r.current ? (0, l.jsx)(y.Provider, { value: a, children: n }) : null
	);
};
function ee(e) {
	const t = b(void 0);
	return (0, l.jsx)(g, { ...e, lingui: t });
}
var C = (0, u.createContext)({ color: `currentColor`, size: `1em`, weight: `regular`, mirrored: !1 }),
	w = u.forwardRef((e, t) => {
		const { alt: n, color: r, size: i, weight: a, mirrored: o, children: s, weights: c, ...l } = e,
			{ color: d = `currentColor`, size: f, weight: p = `regular`, mirrored: m = !1, ...h } = u.useContext(C);
		return u.createElement(
			`svg`,
			{
				ref: t,
				xmlns: `http://www.w3.org/2000/svg`,
				width: i ?? f,
				height: i ?? f,
				fill: r ?? d,
				viewBox: `0 0 256 256`,
				transform: o || m ? `scale(-1, 1)` : void 0,
				...h,
				...l,
			},
			!!n && u.createElement(`title`, null, n),
			s,
			c.get(a ?? p),
		);
	});
w.displayName = `IconBase`;
function te(e) {
	var t,
		n,
		r = ``;
	if (typeof e == `string` || typeof e == `number`) r += e;
	else if (typeof e == `object`)
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = te(e[t])) && (r && (r += ` `), (r += n));
		} else for (n in e) e[n] && (r && (r += ` `), (r += n));
	return r;
}
function ne() {
	for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
		(e = arguments[n]) && (t = te(e)) && (r && (r += ` `), (r += t));
	return r;
}
var re = (0, u.createContext)({});
function ie(e) {
	const t = (0, u.useRef)(null);
	return t.current === null && (t.current = e()), t.current;
}
var ae = typeof window < `u`,
	oe = ae ? u.useLayoutEffect : u.useEffect,
	se = (0, u.createContext)(null);
function ce(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function T(e, t) {
	const n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
function le([...e], t, n) {
	const r = t < 0 ? e.length + t : t;
	if (r >= 0 && r < e.length) {
		const r = n < 0 ? e.length + n : n,
			[i] = e.splice(t, 1);
		e.splice(r, 0, i);
	}
	return e;
}
var E = (e, t, n) => (n > t ? t : n < e ? e : n),
	ue = () => {},
	de = {},
	D = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function fe(e) {
	return typeof e == `object` && !!e;
}
var pe = (e) => /^0[^.\s]+$/u.test(e);
function me(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
var O = (e) => e,
	he = (e, t) => (n) => t(e(n)),
	ge = (...e) => e.reduce(he),
	_e = (e, t, n) => {
		const r = t - e;
		return r === 0 ? 1 : (n - e) / r;
	},
	ve = class {
		constructor() {
			this.subscriptions = [];
		}
		add(e) {
			return ce(this.subscriptions, e), () => T(this.subscriptions, e);
		}
		notify(e, t, n) {
			const r = this.subscriptions.length;
			if (r)
				if (r === 1) this.subscriptions[0](e, t, n);
				else
					for (let i = 0; i < r; i++) {
						const r = this.subscriptions[i];
						r && r(e, t, n);
					}
		}
		getSize() {
			return this.subscriptions.length;
		}
		clear() {
			this.subscriptions.length = 0;
		}
	},
	ye = (e) => e * 1e3,
	be = (e) => e / 1e3;
function xe(e, t) {
	return t ? (1e3 / t) * e : 0;
}
var Se = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
	Ce = 1e-7,
	we = 12;
function Te(e, t, n, r, i) {
	let a,
		o,
		s = 0;
	do (o = t + (n - t) / 2), (a = Se(o, r, i) - e), a > 0 ? (n = o) : (t = o);
	while (Math.abs(a) > Ce && ++s < we);
	return o;
}
function Ee(e, t, n, r) {
	if (e === t && n === r) return O;
	const i = (t) => Te(t, 0, 1, e, n);
	return (e) => (e === 0 || e === 1 ? e : Se(i(e), t, r));
}
var De = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
	Oe = (e) => (t) => 1 - e(1 - t),
	ke = Ee(0.33, 1.53, 0.69, 0.99),
	Ae = Oe(ke),
	je = De(Ae),
	Me = (e) => ((e *= 2) < 1 ? 0.5 * Ae(e) : 0.5 * (2 - 2 ** (-10 * (e - 1)))),
	Ne = (e) => 1 - Math.sin(Math.acos(e)),
	Pe = Oe(Ne),
	Fe = De(Ne),
	Ie = Ee(0.42, 0, 1, 1),
	Le = Ee(0, 0, 0.58, 1),
	Re = Ee(0.42, 0, 0.58, 1),
	ze = (e) => Array.isArray(e) && typeof e[0] != `number`,
	Be = (e) => Array.isArray(e) && typeof e[0] == `number`,
	Ve = {
		linear: O,
		easeIn: Ie,
		easeInOut: Re,
		easeOut: Le,
		circIn: Ne,
		circInOut: Fe,
		circOut: Pe,
		backIn: Ae,
		backInOut: je,
		backOut: ke,
		anticipate: Me,
	},
	He = (e) => typeof e == `string`,
	Ue = (e) => {
		if (Be(e)) {
			e.length;
			const [t, n, r, i] = e;
			return Ee(t, n, r, i);
		} else if (He(e)) return Ve[e], `${e}`, Ve[e];
		return e;
	},
	We = [`setup`, `read`, `resolveKeyframes`, `preUpdate`, `update`, `preRender`, `render`, `postRender`],
	Ge = { value: null, addProjectionMetrics: null };
function Ke(e, t) {
	let n = new Set(),
		r = new Set(),
		i = !1,
		a = !1,
		o = new WeakSet(),
		s = { delta: 0, timestamp: 0, isProcessing: !1 },
		c = 0;
	function l(t) {
		o.has(t) && (u.schedule(t), e()), c++, t(s);
	}
	const u = {
		schedule: (e, t = !1, a = !1) => {
			const s = a && i ? n : r;
			return t && o.add(e), s.has(e) || s.add(e), e;
		},
		cancel: (e) => {
			r.delete(e), o.delete(e);
		},
		process: (e) => {
			if (((s = e), i)) {
				a = !0;
				return;
			}
			(i = !0),
				([n, r] = [r, n]),
				n.forEach(l),
				t && Ge.value && Ge.value.frameloop[t].push(c),
				(c = 0),
				n.clear(),
				(i = !1),
				a && ((a = !1), u.process(e));
		},
	};
	return u;
}
var qe = 40;
function Je(e, t) {
	let n = !1,
		r = !0,
		i = { delta: 0, timestamp: 0, isProcessing: !1 },
		a = () => (n = !0),
		o = We.reduce((e, n) => ((e[n] = Ke(a, t ? n : void 0)), e), {}),
		{ setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: p, postRender: m } = o,
		h = () => {
			const a = de.useManualTiming ? i.timestamp : performance.now();
			(n = !1),
				de.useManualTiming || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(a - i.timestamp, qe), 1)),
				(i.timestamp = a),
				(i.isProcessing = !0),
				s.process(i),
				c.process(i),
				l.process(i),
				u.process(i),
				d.process(i),
				f.process(i),
				p.process(i),
				m.process(i),
				(i.isProcessing = !1),
				n && t && ((r = !1), e(h));
		},
		g = () => {
			(n = !0), (r = !0), i.isProcessing || e(h);
		};
	return {
		schedule: We.reduce((e, t) => {
			const r = o[t];
			return (e[t] = (e, t = !1, i = !1) => (n || g(), r.schedule(e, t, i))), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < We.length; t++) o[We[t]].cancel(e);
		},
		state: i,
		steps: o,
	};
}
var {
		schedule: k,
		cancel: Ye,
		state: A,
		steps: Xe,
	} = Je(typeof requestAnimationFrame < `u` ? requestAnimationFrame : O, !0),
	Ze;
function Qe() {
	Ze = void 0;
}
var $e = {
		now: () => (Ze === void 0 && $e.set(A.isProcessing || de.useManualTiming ? A.timestamp : performance.now()), Ze),
		set: (e) => {
			(Ze = e), queueMicrotask(Qe);
		},
	},
	et = { layout: 0, mainThread: 0, waapi: 0 },
	tt = (e) => (t) => typeof t == `string` && t.startsWith(e),
	nt = tt(`--`),
	rt = tt(`var(--`),
	it = (e) => (rt(e) ? at.test(e.split(`/*`)[0].trim()) : !1),
	at = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ot(e) {
	return typeof e == `string` ? e.split(`/*`)[0].includes(`var(--`) : !1;
}
var st = { test: (e) => typeof e == `number`, parse: parseFloat, transform: (e) => e },
	ct = { ...st, transform: (e) => E(0, 1, e) },
	lt = { ...st, default: 1 },
	ut = (e) => Math.round(e * 1e5) / 1e5,
	dt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ft(e) {
	return e == null;
}
var pt =
		/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
	mt = (e, t) => (n) =>
		!!((typeof n == `string` && pt.test(n) && n.startsWith(e)) || (t && !ft(n) && Object.hasOwn(n, t))),
	ht = (e, t, n) => (r) => {
		if (typeof r != `string`) return r;
		const [i, a, o, s] = r.match(dt);
		return { [e]: parseFloat(i), [t]: parseFloat(a), [n]: parseFloat(o), alpha: s === void 0 ? 1 : parseFloat(s) };
	},
	gt = (e) => E(0, 255, e),
	_t = { ...st, transform: (e) => Math.round(gt(e)) },
	vt = {
		test: mt(`rgb`, `red`),
		parse: ht(`red`, `green`, `blue`),
		transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
			`rgba(` + _t.transform(e) + `, ` + _t.transform(t) + `, ` + _t.transform(n) + `, ` + ut(ct.transform(r)) + `)`,
	};
function yt(e) {
	let t = ``,
		n = ``,
		r = ``,
		i = ``;
	return (
		e.length > 5
			? ((t = e.substring(1, 3)), (n = e.substring(3, 5)), (r = e.substring(5, 7)), (i = e.substring(7, 9)))
			: ((t = e.substring(1, 2)),
				(n = e.substring(2, 3)),
				(r = e.substring(3, 4)),
				(i = e.substring(4, 5)),
				(t += t),
				(n += n),
				(r += r),
				(i += i)),
		{ red: parseInt(t, 16), green: parseInt(n, 16), blue: parseInt(r, 16), alpha: i ? parseInt(i, 16) / 255 : 1 }
	);
}
var bt = { test: mt(`#`), parse: yt, transform: vt.transform },
	xt = (e) => ({
		test: (t) => typeof t == `string` && t.endsWith(e) && t.split(` `).length === 1,
		parse: parseFloat,
		transform: (t) => `${t}${e}`,
	}),
	St = xt(`deg`),
	Ct = xt(`%`),
	j = xt(`px`),
	wt = xt(`vh`),
	Tt = xt(`vw`),
	Et = (() => ({ ...Ct, parse: (e) => Ct.parse(e) / 100, transform: (e) => Ct.transform(e * 100) }))(),
	Dt = {
		test: mt(`hsl`, `hue`),
		parse: ht(`hue`, `saturation`, `lightness`),
		transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
			`hsla(` +
			Math.round(e) +
			`, ` +
			Ct.transform(ut(t)) +
			`, ` +
			Ct.transform(ut(n)) +
			`, ` +
			ut(ct.transform(r)) +
			`)`,
	},
	M = {
		test: (e) => vt.test(e) || bt.test(e) || Dt.test(e),
		parse: (e) => (vt.test(e) ? vt.parse(e) : Dt.test(e) ? Dt.parse(e) : bt.parse(e)),
		transform: (e) => (typeof e == `string` ? e : Object.hasOwn(e, `red`) ? vt.transform(e) : Dt.transform(e)),
		getAnimatableNone: (e) => {
			const t = M.parse(e);
			return (t.alpha = 0), M.transform(t);
		},
	},
	Ot =
		/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function kt(e) {
	return isNaN(e) && typeof e == `string` && (e.match(dt)?.length || 0) + (e.match(Ot)?.length || 0) > 0;
}
var At = `number`,
	jt = `color`,
	Mt = `var`,
	Nt = `var(`,
	Pt = "${}",
	Ft =
		/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function It(e) {
	let t = e.toString(),
		n = [],
		r = { color: [], number: [], var: [] },
		i = [],
		a = 0;
	return {
		values: n,
		split: t
			.replace(
				Ft,
				(e) => (
					M.test(e)
						? (r.color.push(a), i.push(jt), n.push(M.parse(e)))
						: e.startsWith(Nt)
							? (r.var.push(a), i.push(Mt), n.push(e))
							: (r.number.push(a), i.push(At), n.push(parseFloat(e))),
					++a,
					Pt
				),
			)
			.split(Pt),
		indexes: r,
		types: i,
	};
}
function Lt(e) {
	return It(e).values;
}
function Rt(e) {
	const { split: t, types: n } = It(e),
		r = t.length;
	return (e) => {
		let i = ``;
		for (let a = 0; a < r; a++)
			if (((i += t[a]), e[a] !== void 0)) {
				const t = n[a];
				t === At ? (i += ut(e[a])) : t === jt ? (i += M.transform(e[a])) : (i += e[a]);
			}
		return i;
	};
}
var zt = (e) => (typeof e == `number` ? 0 : M.test(e) ? M.getAnimatableNone(e) : e);
function Bt(e) {
	const t = Lt(e);
	return Rt(e)(t.map(zt));
}
var Vt = { test: kt, parse: Lt, createTransformer: Rt, getAnimatableNone: Bt };
function Ht(e, t, n) {
	return (
		n < 0 && (n += 1),
		n > 1 && --n,
		n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
	);
}
function Ut({ hue: e, saturation: t, lightness: n, alpha: r }) {
	(e /= 360), (t /= 100), (n /= 100);
	let i = 0,
		a = 0,
		o = 0;
	if (!t) i = a = o = n;
	else {
		const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
			s = 2 * n - r;
		(i = Ht(s, r, e + 1 / 3)), (a = Ht(s, r, e)), (o = Ht(s, r, e - 1 / 3));
	}
	return { red: Math.round(i * 255), green: Math.round(a * 255), blue: Math.round(o * 255), alpha: r };
}
function Wt(e, t) {
	return (n) => (n > 0 ? t : e);
}
var N = (e, t, n) => e + (t - e) * n,
	Gt = (e, t, n) => {
		const r = e * e,
			i = n * (t * t - r) + r;
		return i < 0 ? 0 : Math.sqrt(i);
	},
	Kt = [bt, vt, Dt],
	qt = (e) => Kt.find((t) => t.test(e));
function Jt(e) {
	const t = qt(e);
	if ((`${e}`, !t)) return !1;
	let n = t.parse(e);
	return t === Dt && (n = Ut(n)), n;
}
var Yt = (e, t) => {
		const n = Jt(e),
			r = Jt(t);
		if (!n || !r) return Wt(e, t);
		const i = { ...n };
		return (e) => (
			(i.red = Gt(n.red, r.red, e)),
			(i.green = Gt(n.green, r.green, e)),
			(i.blue = Gt(n.blue, r.blue, e)),
			(i.alpha = N(n.alpha, r.alpha, e)),
			vt.transform(i)
		);
	},
	Xt = new Set([`none`, `hidden`]);
function Zt(e, t) {
	return Xt.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function Qt(e, t) {
	return (n) => N(e, t, n);
}
function $t(e) {
	return typeof e == `number`
		? Qt
		: typeof e == `string`
			? it(e)
				? Wt
				: M.test(e)
					? Yt
					: rn
			: Array.isArray(e)
				? en
				: typeof e == `object`
					? M.test(e)
						? Yt
						: tn
					: Wt;
}
function en(e, t) {
	const n = [...e],
		r = n.length,
		i = e.map((e, n) => $t(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function tn(e, t) {
	const n = { ...e, ...t },
		r = {};
	for (const i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = $t(e[i])(e[i], t[i]));
	return (e) => {
		for (const t in r) n[t] = r[t](e);
		return n;
	};
}
function nn(e, t) {
	const n = [],
		r = { color: 0, var: 0, number: 0 };
	for (let i = 0; i < t.values.length; i++) {
		const a = t.types[i],
			o = e.indexes[a][r[a]];
		(n[i] = e.values[o] ?? 0), r[a]++;
	}
	return n;
}
var rn = (e, t) => {
	const n = Vt.createTransformer(t),
		r = It(e),
		i = It(t);
	return r.indexes.var.length === i.indexes.var.length &&
		r.indexes.color.length === i.indexes.color.length &&
		r.indexes.number.length >= i.indexes.number.length
		? (Xt.has(e) && !i.values.length) || (Xt.has(t) && !r.values.length)
			? Zt(e, t)
			: ge(en(nn(r, i), i.values), n)
		: (`${e}${t}`, Wt(e, t));
};
function an(e, t, n) {
	return typeof e == `number` && typeof t == `number` && typeof n == `number` ? N(e, t, n) : $t(e)(e, t);
}
var on = (e) => {
		const t = ({ timestamp: t }) => e(t);
		return {
			start: (e = !0) => k.update(t, e),
			stop: () => Ye(t),
			now: () => (A.isProcessing ? A.timestamp : $e.now()),
		};
	},
	sn = (e, t, n = 10) => {
		let r = ``,
			i = Math.max(Math.round(t / n), 2);
		for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + `, `;
		return `linear(${r.substring(0, r.length - 2)})`;
	},
	cn = 2e4;
function ln(e) {
	let t = 0,
		n = e.next(t);
	for (; !n.done && t < 2e4; ) (t += 50), (n = e.next(t));
	return t >= 2e4 ? 1 / 0 : t;
}
function un(e, t = 100, n) {
	const r = n({ ...e, keyframes: [0, t] }),
		i = Math.min(ln(r), cn);
	return { type: `keyframes`, ease: (e) => r.next(i * e).value / t, duration: be(i) };
}
var dn = 5;
function fn(e, t, n) {
	const r = Math.max(t - dn, 0);
	return xe(n - e(r), t - r);
}
var P = {
		stiffness: 100,
		damping: 10,
		mass: 1,
		velocity: 0,
		duration: 800,
		bounce: 0.3,
		visualDuration: 0.3,
		restSpeed: { granular: 0.01, default: 2 },
		restDelta: { granular: 0.005, default: 0.5 },
		minDuration: 0.01,
		maxDuration: 10,
		minDamping: 0.05,
		maxDamping: 1,
	},
	pn = 0.001;
function mn({ duration: e = P.duration, bounce: t = P.bounce, velocity: n = P.velocity, mass: r = P.mass }) {
	let i, a;
	P.maxDuration;
	let o = 1 - t;
	(o = E(P.minDamping, P.maxDamping, o)),
		(e = E(P.minDuration, P.maxDuration, be(e))),
		o < 1
			? ((i = (t) => {
					const r = t * o,
						i = r * e,
						a = r - n,
						s = _n(t, o),
						c = Math.exp(-i);
					return pn - (a / s) * c;
				}),
				(a = (t) => {
					const r = t * o * e,
						a = r * n + n,
						s = o ** 2 * t ** 2 * e,
						c = Math.exp(-r),
						l = _n(t ** 2, o);
					return ((-i(t) + pn > 0 ? -1 : 1) * ((a - s) * c)) / l;
				}))
			: ((i = (t) => {
					const r = Math.exp(-t * e),
						i = (t - n) * e + 1;
					return -pn + r * i;
				}),
				(a = (t) => Math.exp(-t * e) * ((n - t) * (e * e))));
	const s = 5 / e,
		c = gn(i, a, s);
	if (((e = ye(e)), isNaN(c))) return { stiffness: P.stiffness, damping: P.damping, duration: e };
	{
		const t = c ** 2 * r;
		return { stiffness: t, damping: o * 2 * Math.sqrt(r * t), duration: e };
	}
}
var hn = 12;
function gn(e, t, n) {
	let r = n;
	for (let n = 1; n < hn; n++) r -= e(r) / t(r);
	return r;
}
function _n(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var vn = [`duration`, `bounce`],
	yn = [`stiffness`, `damping`, `mass`];
function bn(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function xn(e) {
	let t = {
		velocity: P.velocity,
		stiffness: P.stiffness,
		damping: P.damping,
		mass: P.mass,
		isResolvedFromDuration: !1,
		...e,
	};
	if (!bn(e, yn) && bn(e, vn))
		if (((t.velocity = 0), e.visualDuration)) {
			const n = e.visualDuration,
				r = (2 * Math.PI) / (n * 1.2),
				i = r * r,
				a = 2 * E(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
			t = { ...t, mass: P.mass, stiffness: i, damping: a };
		} else {
			const n = mn({ ...e, velocity: 0 });
			(t = { ...t, ...n, mass: P.mass }), (t.isResolvedFromDuration = !0);
		}
	return t;
}
function Sn(e = P.visualDuration, t = P.bounce) {
	let n = typeof e == `object` ? e : { visualDuration: e, keyframes: [0, 1], bounce: t },
		{ restSpeed: r, restDelta: i } = n,
		a = n.keyframes[0],
		o = n.keyframes[n.keyframes.length - 1],
		s = { done: !1, value: a },
		{
			stiffness: c,
			damping: l,
			mass: u,
			duration: d,
			velocity: f,
			isResolvedFromDuration: p,
		} = xn({ ...n, velocity: -be(n.velocity || 0) }),
		m = f || 0,
		h = l / (2 * Math.sqrt(c * u)),
		g = o - a,
		_ = be(Math.sqrt(c / u)),
		v = Math.abs(g) < 5;
	(r ||= v ? P.restSpeed.granular : P.restSpeed.default), (i ||= v ? P.restDelta.granular : P.restDelta.default);
	let y;
	if (h < 1) {
		const e = _n(_, h);
		y = (t) => o - Math.exp(-h * _ * t) * (((m + h * _ * g) / e) * Math.sin(e * t) + g * Math.cos(e * t));
	} else if (h === 1) y = (e) => o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
	else {
		const e = _ * Math.sqrt(h * h - 1);
		y = (t) => {
			const n = Math.exp(-h * _ * t),
				r = Math.min(e * t, 300);
			return o - (n * ((m + h * _ * g) * Math.sinh(r) + e * g * Math.cosh(r))) / e;
		};
	}
	const b = {
		calculatedDuration: (p && d) || null,
		next: (e) => {
			const t = y(e);
			if (p) s.done = e >= d;
			else {
				let n = e === 0 ? m : 0;
				h < 1 && (n = e === 0 ? ye(m) : fn(y, e, t));
				const a = Math.abs(n) <= r,
					c = Math.abs(o - t) <= i;
				s.done = a && c;
			}
			return (s.value = s.done ? o : t), s;
		},
		toString: () => {
			const e = Math.min(ln(b), cn),
				t = sn((t) => b.next(e * t).value, e, 30);
			return e + `ms ` + t;
		},
		toTransition: () => {},
	};
	return b;
}
Sn.applyToOptions = (e) => {
	const t = un(e, 100, Sn);
	return (e.ease = t.ease), (e.duration = ye(t.duration)), (e.type = `keyframes`), e;
};
function Cn({
	keyframes: e,
	velocity: t = 0,
	power: n = 0.8,
	timeConstant: r = 325,
	bounceDamping: i = 10,
	bounceStiffness: a = 500,
	modifyTarget: o,
	min: s,
	max: c,
	restDelta: l = 0.5,
	restSpeed: u,
}) {
	let d = e[0],
		f = { done: !1, value: d },
		p = (e) => (s !== void 0 && e < s) || (c !== void 0 && e > c),
		m = (e) => (s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c),
		h = n * t,
		g = d + h,
		_ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r),
		y = (e) => _ + v(e),
		b = (e) => {
			const t = v(e),
				n = y(e);
			(f.done = Math.abs(t) <= l), (f.value = f.done ? _ : n);
		},
		x,
		S,
		ee = (e) => {
			p(f.value) &&
				((x = e),
				(S = Sn({
					keyframes: [f.value, m(f.value)],
					velocity: fn(y, e, f.value),
					damping: i,
					stiffness: a,
					restDelta: l,
					restSpeed: u,
				})));
		};
	return (
		ee(0),
		{
			calculatedDuration: null,
			next: (e) => {
				let t = !1;
				return !S && x === void 0 && ((t = !0), b(e), ee(e)), x !== void 0 && e >= x ? S.next(e - x) : (!t && b(e), f);
			},
		}
	);
}
function wn(e, t, n) {
	const r = [],
		i = n || de.mix || an,
		a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = ge(Array.isArray(t) ? t[n] || O : t, a)), r.push(a);
	}
	return r;
}
function Tn(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	const a = e.length;
	if ((t.length, a === 1)) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	const o = e[0] === e[1];
	e[0] > e[a - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
	const s = wn(t, r, i),
		c = s.length,
		l = (n) => {
			if (o && n < e[0]) return t[0];
			let r = 0;
			if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
			const i = _e(e[r], e[r + 1], n);
			return s[r](i);
		};
	return n ? (t) => l(E(e[0], e[a - 1], t)) : l;
}
function En(e, t) {
	const n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		const i = _e(0, t, r);
		e.push(N(n, 1, i));
	}
}
function Dn(e) {
	const t = [0];
	return En(t, e.length - 1), t;
}
function On(e, t) {
	return e.map((e) => e * t);
}
function kn(e, t) {
	return e.map(() => t || Re).splice(0, e.length - 1);
}
function An({ duration: e = 300, keyframes: t, times: n, ease: r = `easeInOut` }) {
	const i = ze(r) ? r.map(Ue) : Ue(r),
		a = { done: !1, value: t[0] },
		o = Tn(On(n && n.length === t.length ? n : Dn(t), e), t, { ease: Array.isArray(i) ? i : kn(t, i) });
	return { calculatedDuration: e, next: (t) => ((a.value = o(t)), (a.done = t >= e), a) };
}
var jn = (e) => e !== null;
function Mn(e, { repeat: t, repeatType: n = `loop` }, r, i = 1) {
	const a = e.filter(jn),
		o = i < 0 || (t && n !== `loop` && t % 2 == 1) ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
var Nn = { decay: Cn, inertia: Cn, tween: An, keyframes: An, spring: Sn };
function Pn(e) {
	typeof e.type == `string` && (e.type = Nn[e.type]);
}
var Fn = class {
		constructor() {
			this.updateFinished();
		}
		get finished() {
			return this._finished;
		}
		updateFinished() {
			this._finished = new Promise((e) => {
				this.resolve = e;
			});
		}
		notifyFinished() {
			this.resolve();
		}
		then(e, t) {
			return this.finished.then(e, t);
		}
	},
	In = (e) => e / 100,
	Ln = class extends Fn {
		constructor(e) {
			super(),
				(this.state = `idle`),
				(this.startTime = null),
				(this.isStopped = !1),
				(this.currentTime = 0),
				(this.holdTime = null),
				(this.playbackSpeed = 1),
				(this.stop = () => {
					const { motionValue: e } = this.options;
					e && e.updatedAt !== $e.now() && this.tick($e.now()),
						(this.isStopped = !0),
						this.state !== `idle` && (this.teardown(), this.options.onStop?.());
				}),
				et.mainThread++,
				(this.options = e),
				this.initAnimation(),
				this.play(),
				e.autoplay === !1 && this.pause();
		}
		initAnimation() {
			const { options: e } = this;
			Pn(e);
			let { type: t = An, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e,
				{ keyframes: o } = e,
				s = t || An;
			s !== An && typeof o[0] != `number` && ((this.mixKeyframes = ge(In, an(o[0], o[1]))), (o = [0, 100]));
			const c = s({ ...e, keyframes: o });
			i === `mirror` && (this.mirroredGenerator = s({ ...e, keyframes: [...o].reverse(), velocity: -a })),
				c.calculatedDuration === null && (c.calculatedDuration = ln(c));
			const { calculatedDuration: l } = c;
			(this.calculatedDuration = l),
				(this.resolvedDuration = l + r),
				(this.totalDuration = this.resolvedDuration * (n + 1) - r),
				(this.generator = c);
		}
		updateTime(e) {
			const t = Math.round(e - this.startTime) * this.playbackSpeed;
			this.holdTime === null ? (this.currentTime = t) : (this.currentTime = this.holdTime);
		}
		tick(e, t = !1) {
			const {
				generator: n,
				totalDuration: r,
				mixKeyframes: i,
				mirroredGenerator: a,
				resolvedDuration: o,
				calculatedDuration: s,
			} = this;
			if (this.startTime === null) return n.next(0);
			const {
				delay: c = 0,
				keyframes: l,
				repeat: u,
				repeatType: d,
				repeatDelay: f,
				type: p,
				onUpdate: m,
				finalKeyframe: h,
			} = this.options;
			this.speed > 0
				? (this.startTime = Math.min(this.startTime, e))
				: this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)),
				t ? (this.currentTime = e) : this.updateTime(e);
			const g = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1),
				_ = this.playbackSpeed >= 0 ? g < 0 : g > r;
			(this.currentTime = Math.max(g, 0)),
				this.state === `finished` && this.holdTime === null && (this.currentTime = r);
			let v = this.currentTime,
				y = n;
			if (u) {
				let e = Math.min(this.currentTime, r) / o,
					t = Math.floor(e),
					n = e % 1;
				!n && e >= 1 && (n = 1),
					n === 1 && t--,
					(t = Math.min(t, u + 1)),
					t % 2 && (d === `reverse` ? ((n = 1 - n), f && (n -= f / o)) : d === `mirror` && (y = a)),
					(v = E(0, 1, n) * o);
			}
			const b = _ ? { done: !1, value: l[0] } : y.next(v);
			i && (b.value = i(b.value));
			let { done: x } = b;
			!_ && s !== null && (x = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
			const S = this.holdTime === null && (this.state === `finished` || (this.state === `running` && x));
			return S && p !== Cn && (b.value = Mn(l, this.options, h, this.speed)), m && m(b.value), S && this.finish(), b;
		}
		then(e, t) {
			return this.finished.then(e, t);
		}
		get duration() {
			return be(this.calculatedDuration);
		}
		get iterationDuration() {
			const { delay: e = 0 } = this.options || {};
			return this.duration + be(e);
		}
		get time() {
			return be(this.currentTime);
		}
		set time(e) {
			(e = ye(e)),
				(this.currentTime = e),
				this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0
					? (this.holdTime = e)
					: this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed),
				this.driver?.start(!1);
		}
		get speed() {
			return this.playbackSpeed;
		}
		set speed(e) {
			this.updateTime($e.now());
			const t = this.playbackSpeed !== e;
			(this.playbackSpeed = e), t && (this.time = be(this.currentTime));
		}
		play() {
			if (this.isStopped) return;
			const { driver: e = on, startTime: t } = this.options;
			(this.driver ||= e((e) => this.tick(e))), this.options.onPlay?.();
			const n = this.driver.now();
			this.state === `finished`
				? (this.updateFinished(), (this.startTime = n))
				: this.holdTime === null
					? (this.startTime ||= t ?? n)
					: (this.startTime = n - this.holdTime),
				this.state === `finished` && this.speed < 0 && (this.startTime += this.calculatedDuration),
				(this.holdTime = null),
				(this.state = `running`),
				this.driver.start();
		}
		pause() {
			(this.state = `paused`), this.updateTime($e.now()), (this.holdTime = this.currentTime);
		}
		complete() {
			this.state !== `running` && this.play(), (this.state = `finished`), (this.holdTime = null);
		}
		finish() {
			this.notifyFinished(), this.teardown(), (this.state = `finished`), this.options.onComplete?.();
		}
		cancel() {
			(this.holdTime = null), (this.startTime = 0), this.tick(0), this.teardown(), this.options.onCancel?.();
		}
		teardown() {
			(this.state = `idle`), this.stopDriver(), (this.startTime = this.holdTime = null), et.mainThread--;
		}
		stopDriver() {
			this.driver &&= (this.driver.stop(), void 0);
		}
		sample(e) {
			return (this.startTime = 0), this.tick(e, !0);
		}
		attachTimeline(e) {
			return (
				this.options.allowFlatten &&
					((this.options.type = `keyframes`), (this.options.ease = `linear`), this.initAnimation()),
				this.driver?.stop(),
				e.observe(this)
			);
		}
	};
function Rn(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
var zn = (e) => (e * 180) / Math.PI,
	Bn = (e) => Hn(zn(Math.atan2(e[1], e[0]))),
	Vn = {
		x: 4,
		y: 5,
		translateX: 4,
		translateY: 5,
		scaleX: 0,
		scaleY: 3,
		scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
		rotate: Bn,
		rotateZ: Bn,
		skewX: (e) => zn(Math.atan(e[1])),
		skewY: (e) => zn(Math.atan(e[2])),
		skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
	},
	Hn = (e) => ((e %= 360), e < 0 && (e += 360), e),
	Un = Bn,
	Wn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
	Gn = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
	Kn = {
		x: 12,
		y: 13,
		z: 14,
		translateX: 12,
		translateY: 13,
		translateZ: 14,
		scaleX: Wn,
		scaleY: Gn,
		scale: (e) => (Wn(e) + Gn(e)) / 2,
		rotateX: (e) => Hn(zn(Math.atan2(e[6], e[5]))),
		rotateY: (e) => Hn(zn(Math.atan2(-e[2], e[0]))),
		rotateZ: Un,
		rotate: Un,
		skewX: (e) => zn(Math.atan(e[4])),
		skewY: (e) => zn(Math.atan(e[1])),
		skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
	};
function qn(e) {
	return e.includes(`scale`) ? 1 : 0;
}
function Jn(e, t) {
	if (!e || e === `none`) return qn(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),
		r,
		i;
	if (n) (r = Kn), (i = n);
	else {
		const t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		(r = Vn), (i = t);
	}
	if (!i) return qn(t);
	const a = r[t],
		o = i[1].split(`,`).map(Xn);
	return typeof a == `function` ? a(o) : o[a];
}
var Yn = (e, t) => {
	const { transform: n = `none` } = getComputedStyle(e);
	return Jn(n, t);
};
function Xn(e) {
	return parseFloat(e.trim());
}
var Zn = [
		`transformPerspective`,
		`x`,
		`y`,
		`z`,
		`translateX`,
		`translateY`,
		`translateZ`,
		`scale`,
		`scaleX`,
		`scaleY`,
		`rotate`,
		`rotateX`,
		`rotateY`,
		`rotateZ`,
		`skew`,
		`skewX`,
		`skewY`,
	],
	Qn = (() => new Set(Zn))(),
	$n = (e) => e === st || e === j,
	er = new Set([`x`, `y`, `z`]),
	tr = Zn.filter((e) => !er.has(e));
function nr(e) {
	const t = [];
	return (
		tr.forEach((n) => {
			const r = e.getValue(n);
			r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith(`scale`) ? 1 : 0));
		}),
		t
	);
}
var rr = {
	width: ({ x: e }, { paddingLeft: t = `0`, paddingRight: n = `0` }) => e.max - e.min - parseFloat(t) - parseFloat(n),
	height: ({ y: e }, { paddingTop: t = `0`, paddingBottom: n = `0` }) => e.max - e.min - parseFloat(t) - parseFloat(n),
	top: (e, { top: t }) => parseFloat(t),
	left: (e, { left: t }) => parseFloat(t),
	bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
	right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
	x: (e, { transform: t }) => Jn(t, `x`),
	y: (e, { transform: t }) => Jn(t, `y`),
};
(rr.translateX = rr.x), (rr.translateY = rr.y);
var ir = new Set(),
	ar = !1,
	or = !1,
	sr = !1;
function cr() {
	if (or) {
		const e = Array.from(ir).filter((e) => e.needsMeasurement),
			t = new Set(e.map((e) => e.element)),
			n = new Map();
		t.forEach((e) => {
			const t = nr(e);
			t.length && (n.set(e, t), e.render());
		}),
			e.forEach((e) => e.measureInitialState()),
			t.forEach((e) => {
				e.render();
				const t = n.get(e);
				t &&
					t.forEach(([t, n]) => {
						e.getValue(t)?.set(n);
					});
			}),
			e.forEach((e) => e.measureEndState()),
			e.forEach((e) => {
				e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
			});
	}
	(or = !1), (ar = !1), ir.forEach((e) => e.complete(sr)), ir.clear();
}
function lr() {
	ir.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (or = !0);
	});
}
function ur() {
	(sr = !0), lr(), cr(), (sr = !1);
}
var dr = class {
		constructor(e, t, n, r, i, a = !1) {
			(this.state = `pending`),
				(this.isAsync = !1),
				(this.needsMeasurement = !1),
				(this.unresolvedKeyframes = [...e]),
				(this.onComplete = t),
				(this.name = n),
				(this.motionValue = r),
				(this.element = i),
				(this.isAsync = a);
		}
		scheduleResolve() {
			(this.state = `scheduled`),
				this.isAsync
					? (ir.add(this), ar || ((ar = !0), k.read(lr), k.resolveKeyframes(cr)))
					: (this.readKeyframes(), this.complete());
		}
		readKeyframes() {
			const { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
			if (e[0] === null) {
				const i = r?.get(),
					a = e[e.length - 1];
				if (i !== void 0) e[0] = i;
				else if (n && t) {
					const r = n.readValue(t, a);
					r != null && (e[0] = r);
				}
				e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
			}
			Rn(e);
		}
		setFinalKeyframe() {}
		measureInitialState() {}
		renderEndStyles() {}
		measureEndState() {}
		complete(e = !1) {
			(this.state = `complete`), this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ir.delete(this);
		}
		cancel() {
			this.state === `scheduled` && (ir.delete(this), (this.state = `pending`));
		}
		resume() {
			this.state === `pending` && this.scheduleResolve();
		}
	},
	fr = (e) => e.startsWith(`--`);
function pr(e, t, n) {
	fr(t) ? e.style.setProperty(t, n) : (e.style[t] = n);
}
var mr = {};
function hr(e, t) {
	const n = me(e);
	return () => mr[t] ?? n();
}
var gr = hr(() => window.ScrollTimeline !== void 0, `scrollTimeline`),
	_r = hr(() => {
		try {
			document.createElement(`div`).animate({ opacity: 0 }, { easing: `linear(0, 1)` });
		} catch {
			return !1;
		}
		return !0;
	}, `linearEasing`),
	vr = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
	yr = {
		linear: `linear`,
		ease: `ease`,
		easeIn: `ease-in`,
		easeOut: `ease-out`,
		easeInOut: `ease-in-out`,
		circIn: vr([0, 0.65, 0.55, 1]),
		circOut: vr([0.55, 0, 1, 0.45]),
		backIn: vr([0.31, 0.01, 0.66, -0.59]),
		backOut: vr([0.33, 1.53, 0.69, 0.99]),
	};
function br(e, t) {
	if (e)
		return typeof e == `function`
			? _r()
				? sn(e, t)
				: `ease-out`
			: Be(e)
				? vr(e)
				: Array.isArray(e)
					? e.map((e) => br(e, t) || yr.easeOut)
					: yr[e];
}
function xr(
	e,
	t,
	n,
	{ delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = `loop`, ease: s = `easeOut`, times: c } = {},
	l = void 0,
) {
	const u = { [t]: n };
	c && (u.offset = c);
	const d = br(s, i);
	Array.isArray(d) && (u.easing = d), Ge.value && et.waapi++;
	const f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? `linear` : d,
		fill: `both`,
		iterations: a + 1,
		direction: o === `reverse` ? `alternate` : `normal`,
	};
	l && (f.pseudoElement = l);
	const p = e.animate(u, f);
	return (
		Ge.value &&
			p.finished.finally(() => {
				et.waapi--;
			}),
		p
	);
}
function Sr(e) {
	return typeof e == `function` && `applyToOptions` in e;
}
function Cr({ type: e, ...t }) {
	return Sr(e) && _r() ? e.applyToOptions(t) : ((t.duration ??= 300), (t.ease ??= `easeOut`), t);
}
var wr = class extends Fn {
		constructor(e) {
			if ((super(), (this.finishedTime = null), (this.isStopped = !1), (this.manualStartTime = null), !e)) return;
			const {
				element: t,
				name: n,
				keyframes: r,
				pseudoElement: i,
				allowFlatten: a = !1,
				finalKeyframe: o,
				onComplete: s,
			} = e;
			(this.isPseudoElement = !!i), (this.allowFlatten = a), (this.options = e), e.type;
			const c = Cr(e);
			(this.animation = xr(t, n, r, c, i)),
				c.autoplay === !1 && this.animation.pause(),
				(this.animation.onfinish = () => {
					if (((this.finishedTime = this.time), !i)) {
						const e = Mn(r, this.options, o, this.speed);
						this.updateMotionValue ? this.updateMotionValue(e) : pr(t, n, e), this.animation.cancel();
					}
					s?.(), this.notifyFinished();
				});
		}
		play() {
			this.isStopped ||
				((this.manualStartTime = null), this.animation.play(), this.state === `finished` && this.updateFinished());
		}
		pause() {
			this.animation.pause();
		}
		complete() {
			this.animation.finish?.();
		}
		cancel() {
			try {
				this.animation.cancel();
			} catch {}
		}
		stop() {
			if (this.isStopped) return;
			this.isStopped = !0;
			const { state: e } = this;
			e === `idle` ||
				e === `finished` ||
				(this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
				this.isPseudoElement || this.cancel());
		}
		commitStyles() {
			const e = this.options?.element;
			!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
		}
		get duration() {
			const e = this.animation.effect?.getComputedTiming?.().duration || 0;
			return be(Number(e));
		}
		get iterationDuration() {
			const { delay: e = 0 } = this.options || {};
			return this.duration + be(e);
		}
		get time() {
			return be(Number(this.animation.currentTime) || 0);
		}
		set time(e) {
			(this.manualStartTime = null), (this.finishedTime = null), (this.animation.currentTime = ye(e));
		}
		get speed() {
			return this.animation.playbackRate;
		}
		set speed(e) {
			e < 0 && (this.finishedTime = null), (this.animation.playbackRate = e);
		}
		get state() {
			return this.finishedTime === null ? this.animation.playState : `finished`;
		}
		get startTime() {
			return this.manualStartTime ?? Number(this.animation.startTime);
		}
		set startTime(e) {
			this.manualStartTime = this.animation.startTime = e;
		}
		attachTimeline({ timeline: e, observe: t }) {
			return (
				this.allowFlatten && this.animation.effect?.updateTiming({ easing: `linear` }),
				(this.animation.onfinish = null),
				e && gr() ? ((this.animation.timeline = e), O) : t(this)
			);
		}
	},
	Tr = { anticipate: Me, backInOut: je, circInOut: Fe };
function Er(e) {
	return e in Tr;
}
function Dr(e) {
	typeof e.ease == `string` && Er(e.ease) && (e.ease = Tr[e.ease]);
}
var Or = 10,
	kr = class extends wr {
		constructor(e) {
			Dr(e), Pn(e), super(e), e.startTime !== void 0 && (this.startTime = e.startTime), (this.options = e);
		}
		updateMotionValue(e) {
			const { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
			if (!t) return;
			if (e !== void 0) {
				t.set(e);
				return;
			}
			const o = new Ln({ ...a, autoplay: !1 }),
				s = Math.max(Or, $e.now() - this.startTime),
				c = E(0, Or, s - Or);
			t.setWithVelocity(o.sample(Math.max(0, s - c)).value, o.sample(s).value, c), o.stop();
		}
	},
	Ar = (e, t) =>
		t === `zIndex`
			? !1
			: !!(
					typeof e == `number` ||
					Array.isArray(e) ||
					(typeof e == `string` && (Vt.test(e) || e === `0`) && !e.startsWith(`url(`))
				);
function jr(e) {
	const t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Mr(e, t, n, r) {
	const i = e[0];
	if (i === null) return !1;
	if (t === `display` || t === `visibility`) return !0;
	const a = e[e.length - 1],
		o = Ar(i, t),
		s = Ar(a, t);
	return `${t}${i}${a}${o ? a : i}`, !o || !s ? !1 : jr(e) || ((n === `spring` || Sr(n)) && r);
}
function Nr(e) {
	(e.duration = 0), (e.type = `keyframes`);
}
var Pr = new Set([`opacity`, `clipPath`, `filter`, `transform`]),
	Fr = me(() => Object.hasOwn(Element.prototype, `animate`));
function Ir(e) {
	const { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o } = e;
	if (!(t?.owner?.current instanceof HTMLElement)) return !1;
	const { onUpdate: s, transformTemplate: c } = t.owner.getProps();
	return (
		Fr() && n && Pr.has(n) && (n !== `transform` || !c) && !s && !r && i !== `mirror` && a !== 0 && o !== `inertia`
	);
}
var Lr = 40,
	Rr = class extends Fn {
		constructor({
			autoplay: e = !0,
			delay: t = 0,
			type: n = `keyframes`,
			repeat: r = 0,
			repeatDelay: i = 0,
			repeatType: a = `loop`,
			keyframes: o,
			name: s,
			motionValue: c,
			element: l,
			...u
		}) {
			super(),
				(this.stop = () => {
					this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
				}),
				(this.createdAt = $e.now());
			const d = {
				autoplay: e,
				delay: t,
				type: n,
				repeat: r,
				repeatDelay: i,
				repeatType: a,
				name: s,
				motionValue: c,
				element: l,
				...u,
			};
			(this.keyframeResolver = new (l?.KeyframeResolver || dr)(
				o,
				(e, t, n) => this.onKeyframesResolved(e, t, d, !n),
				s,
				c,
				l,
			)),
				this.keyframeResolver?.scheduleResolve();
		}
		onKeyframesResolved(e, t, n, r) {
			this.keyframeResolver = void 0;
			const { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
			(this.resolvedAt = $e.now()),
				Mr(e, i, a, o) ||
					((de.instantAnimations || !s) && l?.(Mn(e, n, t)), (e[0] = e[e.length - 1]), Nr(n), (n.repeat = 0));
			const u = {
					startTime: r
						? this.resolvedAt && this.resolvedAt - this.createdAt > Lr
							? this.resolvedAt
							: this.createdAt
						: void 0,
					finalKeyframe: t,
					...n,
					keyframes: e,
				},
				d = !c && Ir(u),
				f = u.motionValue?.owner?.current,
				p = d ? new kr({ ...u, element: f }) : new Ln(u);
			p.finished
				.then(() => {
					this.notifyFinished();
				})
				.catch(O),
				(this.pendingTimeline &&= ((this.stopTimeline = p.attachTimeline(this.pendingTimeline)), void 0)),
				(this._animation = p);
		}
		get finished() {
			return this._animation ? this.animation.finished : this._finished;
		}
		then(e, t) {
			return this.finished.finally(e).then(() => {});
		}
		get animation() {
			return this._animation || (this.keyframeResolver?.resume(), ur()), this._animation;
		}
		get duration() {
			return this.animation.duration;
		}
		get iterationDuration() {
			return this.animation.iterationDuration;
		}
		get time() {
			return this.animation.time;
		}
		set time(e) {
			this.animation.time = e;
		}
		get speed() {
			return this.animation.speed;
		}
		get state() {
			return this.animation.state;
		}
		set speed(e) {
			this.animation.speed = e;
		}
		get startTime() {
			return this.animation.startTime;
		}
		attachTimeline(e) {
			return (
				this._animation ? (this.stopTimeline = this.animation.attachTimeline(e)) : (this.pendingTimeline = e),
				() => this.stop()
			);
		}
		play() {
			this.animation.play();
		}
		pause() {
			this.animation.pause();
		}
		complete() {
			this.animation.complete();
		}
		cancel() {
			this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
		}
	};
function zr(e, t, n, r = 0, i = 1) {
	const a = Array.from(e)
			.sort((e, t) => e.sortNodePosition(t))
			.indexOf(t),
		o = e.size,
		s = (o - 1) * r;
	return typeof n == `function` ? n(a, o) : i === 1 ? a * r : s - a * r;
}
var Br = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Vr(e) {
	const t = Br.exec(e);
	if (!t) return [,];
	const [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
function Hr(e, t, n = 1) {
	`${e}`;
	const [r, i] = Vr(e);
	if (!r) return;
	const a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		const e = a.trim();
		return D(e) ? parseFloat(e) : e;
	}
	return it(i) ? Hr(i, t, n + 1) : i;
}
var Ur = { type: `spring`, stiffness: 500, damping: 25, restSpeed: 10 },
	Wr = (e) => ({ type: `spring`, stiffness: 550, damping: e === 0 ? 2 * Math.sqrt(550) : 30, restSpeed: 10 }),
	Gr = { type: `keyframes`, duration: 0.8 },
	Kr = { type: `keyframes`, ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
	qr = (e, { keyframes: t }) => (t.length > 2 ? Gr : Qn.has(e) ? (e.startsWith(`scale`) ? Wr(t[1]) : Ur) : Kr),
	Jr = (e) => e !== null;
function Yr(e, { repeat: t, repeatType: n = `loop` }, r) {
	const i = e.filter(Jr),
		a = t && n !== `loop` && t % 2 == 1 ? 0 : i.length - 1;
	return !a || r === void 0 ? i[a] : r;
}
function Xr(e, t) {
	if (e?.inherit && t) {
		const { inherit: n, ...r } = e;
		return { ...t, ...r };
	}
	return e;
}
function Zr(e, t) {
	const n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : Xr(n, e);
}
function Qr({
	when: e,
	delay: t,
	delayChildren: n,
	staggerChildren: r,
	staggerDirection: i,
	repeat: a,
	repeatType: o,
	repeatDelay: s,
	from: c,
	elapsed: l,
	...u
}) {
	return !!Object.keys(u).length;
}
var $r =
	(e, t, n, r = {}, i, a) =>
	(o) => {
		let s = Zr(r, e) || {},
			c = s.delay || r.delay || 0,
			{ elapsed: l = 0 } = r;
		l -= ye(c);
		const u = {
			keyframes: Array.isArray(n) ? n : [null, n],
			ease: `easeOut`,
			velocity: t.getVelocity(),
			...s,
			delay: -l,
			onUpdate: (e) => {
				t.set(e), s.onUpdate && s.onUpdate(e);
			},
			onComplete: () => {
				o(), s.onComplete && s.onComplete();
			},
			name: e,
			motionValue: t,
			element: a ? void 0 : i,
		};
		Qr(s) || Object.assign(u, qr(e, u)),
			(u.duration &&= ye(u.duration)),
			(u.repeatDelay &&= ye(u.repeatDelay)),
			u.from !== void 0 && (u.keyframes[0] = u.from);
		let d = !1;
		if (
			((u.type === !1 || (u.duration === 0 && !u.repeatDelay)) && (Nr(u), u.delay === 0 && (d = !0)),
			(de.instantAnimations || de.skipAnimations || i?.shouldSkipAnimations) && ((d = !0), Nr(u), (u.delay = 0)),
			(u.allowFlatten = !s.type && !s.ease),
			d && !a && t.get() !== void 0)
		) {
			const e = Yr(u.keyframes, s);
			if (e !== void 0) {
				k.update(() => {
					u.onUpdate(e), u.onComplete();
				});
				return;
			}
		}
		return s.isSync ? new Ln(u) : new Rr(u);
	};
function ei(e) {
	const t = [{}, {}];
	return (
		e?.values.forEach((e, n) => {
			(t[0][n] = e.get()), (t[1][n] = e.getVelocity());
		}),
		t
	);
}
function ti(e, t, n, r) {
	if (typeof t == `function`) {
		const [i, a] = ei(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if ((typeof t == `string` && (t = e.variants && e.variants[t]), typeof t == `function`)) {
		const [i, a] = ei(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
function ni(e, t, n) {
	const r = e.getProps();
	return ti(r, t, n === void 0 ? r.custom : n, e);
}
var ri = new Set([`width`, `height`, `top`, `left`, `right`, `bottom`, ...Zn]),
	ii = 30,
	ai = (e) => !isNaN(parseFloat(e)),
	oi = { current: void 0 },
	si = class {
		constructor(e, t = {}) {
			(this.canTrackVelocity = null),
				(this.events = {}),
				(this.updateAndNotify = (e) => {
					const t = $e.now();
					if (
						(this.updatedAt !== t && this.setPrevFrameValue(),
						(this.prev = this.current),
						this.setCurrent(e),
						this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
					)
						for (const e of this.dependents) e.dirty();
				}),
				(this.hasAnimated = !1),
				this.setCurrent(e),
				(this.owner = t.owner);
		}
		setCurrent(e) {
			(this.current = e),
				(this.updatedAt = $e.now()),
				this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = ai(this.current));
		}
		setPrevFrameValue(e = this.current) {
			(this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
		}
		onChange(e) {
			return this.on(`change`, e);
		}
		on(e, t) {
			this.events[e] || (this.events[e] = new ve());
			const n = this.events[e].add(t);
			return e === `change`
				? () => {
						n(),
							k.read(() => {
								this.events.change.getSize() || this.stop();
							});
					}
				: n;
		}
		clearListeners() {
			for (const e in this.events) this.events[e].clear();
		}
		attach(e, t) {
			(this.passiveEffect = e), (this.stopPassiveEffect = t);
		}
		set(e) {
			this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
		}
		setWithVelocity(e, t, n) {
			this.set(t), (this.prev = void 0), (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt - n);
		}
		jump(e, t = !0) {
			this.updateAndNotify(e),
				(this.prev = e),
				(this.prevUpdatedAt = this.prevFrameValue = void 0),
				t && this.stop(),
				this.stopPassiveEffect && this.stopPassiveEffect();
		}
		dirty() {
			this.events.change?.notify(this.current);
		}
		addDependent(e) {
			(this.dependents ||= new Set()), this.dependents.add(e);
		}
		removeDependent(e) {
			this.dependents && this.dependents.delete(e);
		}
		get() {
			return oi.current && oi.current.push(this), this.current;
		}
		getPrevious() {
			return this.prev;
		}
		getVelocity() {
			const e = $e.now();
			if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ii) return 0;
			const t = Math.min(this.updatedAt - this.prevUpdatedAt, ii);
			return xe(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
		}
		start(e) {
			return (
				this.stop(),
				new Promise((t) => {
					(this.hasAnimated = !0),
						(this.animation = e(t)),
						this.events.animationStart && this.events.animationStart.notify();
				}).then(() => {
					this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
				})
			);
		}
		stop() {
			this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
				this.clearAnimation();
		}
		isAnimating() {
			return !!this.animation;
		}
		clearAnimation() {
			delete this.animation;
		}
		destroy() {
			this.dependents?.clear(),
				this.events.destroy?.notify(),
				this.clearListeners(),
				this.stop(),
				this.stopPassiveEffect && this.stopPassiveEffect();
		}
	};
function ci(e, t) {
	return new si(e, t);
}
var li = (e) => Array.isArray(e);
function ui(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, ci(n));
}
function di(e) {
	return li(e) ? e[e.length - 1] || 0 : e;
}
function fi(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = ni(e, t) || {};
	for (const t in ((i = { ...i, ...n }), i)) ui(e, t, di(i[t]));
}
var F = (e) => !!(e && e.getVelocity);
function pi(e) {
	return !!(F(e) && e.add);
}
function mi(e, t) {
	const n = e.getValue(`willChange`);
	if (pi(n)) return n.add(t);
	if (!n && de.WillChange) {
		const n = new de.WillChange(`auto`);
		e.addValue(`willChange`, n), n.add(t);
	}
}
function hi(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var gi = `data-` + hi(`framerAppearId`);
function _i(e) {
	return e.props[gi];
}
function vi({ protectedKeys: e, needsAnimating: t }, n) {
	const r = Object.hasOwn(e, n) && t[n] !== !0;
	return (t[n] = !1), r;
}
function yi(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t,
		c = e.getDefaultTransition();
	a = a ? Xr(a, c) : c;
	const l = a?.reduceMotion;
	r && (a = r);
	const u = [],
		d = i && e.animationState && e.animationState.getState()[i];
	for (const t in s) {
		const r = e.getValue(t, e.latestValues[t] ?? null),
			i = s[t];
		if (i === void 0 || (d && vi(d, t))) continue;
		const o = { delay: n, ...Zr(a || {}, t) },
			c = r.get();
		if (c !== void 0 && !r.isAnimating && !Array.isArray(i) && i === c && !o.velocity) continue;
		let f = !1;
		if (window.MotionHandoffAnimation) {
			const n = _i(e);
			if (n) {
				const e = window.MotionHandoffAnimation(n, t, k);
				e !== null && ((o.startTime = e), (f = !0));
			}
		}
		mi(e, t);
		const p = l ?? e.shouldReduceMotion;
		r.start($r(t, r, i, p && ri.has(t) ? { type: !1 } : o, e, f));
		const m = r.animation;
		m && u.push(m);
	}
	if (o) {
		const t = () =>
			k.update(() => {
				o && fi(e, o);
			});
		u.length ? Promise.all(u).then(t) : t();
	}
	return u;
}
function bi(e, t, n = {}) {
	let r = ni(e, t, n.type === `exit` ? e.presenceContext?.custom : void 0),
		{ transition: i = e.getDefaultTransition() || {} } = r || {};
	n.transitionOverride && (i = n.transitionOverride);
	const a = r ? () => Promise.all(yi(e, r, n)) : () => Promise.resolve(),
		o =
			e.variantChildren && e.variantChildren.size
				? (r = 0) => {
						const { delayChildren: a = 0, staggerChildren: o, staggerDirection: s } = i;
						return xi(e, t, r, a, o, s, n);
					}
				: () => Promise.resolve(),
		{ when: s } = i;
	if (s) {
		const [e, t] = s === `beforeChildren` ? [a, o] : [o, a];
		return e().then(() => t());
	} else return Promise.all([a(), o(n.delay)]);
}
function xi(e, t, n = 0, r = 0, i = 0, a = 1, o) {
	const s = [];
	for (const c of e.variantChildren)
		c.notify(`AnimationStart`, t),
			s.push(
				bi(c, t, { ...o, delay: n + (typeof r == `function` ? 0 : r) + zr(e.variantChildren, c, r, i, a) }).then(() =>
					c.notify(`AnimationComplete`, t),
				),
			);
	return Promise.all(s);
}
function Si(e, t, n = {}) {
	e.notify(`AnimationStart`, t);
	let r;
	if (Array.isArray(t)) {
		const i = t.map((t) => bi(e, t, n));
		r = Promise.all(i);
	} else if (typeof t == `string`) r = bi(e, t, n);
	else {
		const i = typeof t == `function` ? ni(e, t, n.custom) : t;
		r = Promise.all(yi(e, i, n));
	}
	return r.then(() => {
		e.notify(`AnimationComplete`, t);
	});
}
var Ci = { test: (e) => e === `auto`, parse: (e) => e },
	wi = (e) => (t) => t.test(e),
	Ti = [st, j, Ct, St, Tt, wt, Ci],
	Ei = (e) => Ti.find(wi(e));
function Di(e) {
	return typeof e == `number` ? e === 0 : e === null ? !0 : e === `none` || e === `0` || pe(e);
}
var Oi = new Set([`brightness`, `contrast`, `saturate`, `opacity`]);
function ki(e) {
	const [t, n] = e.slice(0, -1).split(`(`);
	if (t === `drop-shadow`) return e;
	const [r] = n.match(dt) || [];
	if (!r) return e;
	let i = n.replace(r, ``),
		a = Oi.has(t) ? 1 : 0;
	return r !== n && (a *= 100), t + `(` + a + i + `)`;
}
var Ai = /\b([a-z-]*)\(.*?\)/gu,
	ji = {
		...Vt,
		getAnimatableNone: (e) => {
			const t = e.match(Ai);
			return t ? t.map(ki).join(` `) : e;
		},
	},
	Mi = {
		...Vt,
		getAnimatableNone: (e) => {
			const t = Vt.parse(e);
			return Vt.createTransformer(e)(
				t.map((e) => (typeof e == `number` ? 0 : typeof e == `object` ? { ...e, alpha: 1 } : e)),
			);
		},
	},
	Ni = { ...st, transform: Math.round },
	Pi = {
		borderWidth: j,
		borderTopWidth: j,
		borderRightWidth: j,
		borderBottomWidth: j,
		borderLeftWidth: j,
		borderRadius: j,
		borderTopLeftRadius: j,
		borderTopRightRadius: j,
		borderBottomRightRadius: j,
		borderBottomLeftRadius: j,
		width: j,
		maxWidth: j,
		height: j,
		maxHeight: j,
		top: j,
		right: j,
		bottom: j,
		left: j,
		inset: j,
		insetBlock: j,
		insetBlockStart: j,
		insetBlockEnd: j,
		insetInline: j,
		insetInlineStart: j,
		insetInlineEnd: j,
		padding: j,
		paddingTop: j,
		paddingRight: j,
		paddingBottom: j,
		paddingLeft: j,
		paddingBlock: j,
		paddingBlockStart: j,
		paddingBlockEnd: j,
		paddingInline: j,
		paddingInlineStart: j,
		paddingInlineEnd: j,
		margin: j,
		marginTop: j,
		marginRight: j,
		marginBottom: j,
		marginLeft: j,
		marginBlock: j,
		marginBlockStart: j,
		marginBlockEnd: j,
		marginInline: j,
		marginInlineStart: j,
		marginInlineEnd: j,
		fontSize: j,
		backgroundPositionX: j,
		backgroundPositionY: j,
		rotate: St,
		rotateX: St,
		rotateY: St,
		rotateZ: St,
		scale: lt,
		scaleX: lt,
		scaleY: lt,
		scaleZ: lt,
		skew: St,
		skewX: St,
		skewY: St,
		distance: j,
		translateX: j,
		translateY: j,
		translateZ: j,
		x: j,
		y: j,
		z: j,
		perspective: j,
		transformPerspective: j,
		opacity: ct,
		originX: Et,
		originY: Et,
		originZ: j,
		zIndex: Ni,
		fillOpacity: ct,
		strokeOpacity: ct,
		numOctaves: Ni,
	},
	Fi = {
		...Pi,
		color: M,
		backgroundColor: M,
		outlineColor: M,
		fill: M,
		stroke: M,
		borderColor: M,
		borderTopColor: M,
		borderRightColor: M,
		borderBottomColor: M,
		borderLeftColor: M,
		filter: ji,
		WebkitFilter: ji,
		mask: Mi,
		WebkitMask: Mi,
	},
	Ii = (e) => Fi[e],
	Li = new Set([ji, Mi]);
function Ri(e, t) {
	let n = Ii(e);
	return Li.has(n) || (n = Vt), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
var zi = new Set([`auto`, `none`, `0`]);
function Bi(e, t, n) {
	let r = 0,
		i;
	for (; r < e.length && !i; ) {
		const t = e[r];
		typeof t == `string` && !zi.has(t) && It(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (const r of t) e[r] = Ri(n, i);
}
var Vi = class extends dr {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i, !0);
		}
		readKeyframes() {
			const { unresolvedKeyframes: e, element: t, name: n } = this;
			if (!t || !t.current) return;
			super.readKeyframes();
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				if (typeof r == `string` && ((r = r.trim()), it(r))) {
					const i = Hr(r, t.current);
					i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
				}
			}
			if ((this.resolveNoneKeyframes(), !ri.has(n) || e.length !== 2)) return;
			const [r, i] = e,
				a = Ei(r),
				o = Ei(i);
			if (ot(r) !== ot(i) && rr[n]) {
				this.needsMeasurement = !0;
				return;
			}
			if (a !== o)
				if ($n(a) && $n(o))
					for (let t = 0; t < e.length; t++) {
						const n = e[t];
						typeof n == `string` && (e[t] = parseFloat(n));
					}
				else rr[n] && (this.needsMeasurement = !0);
		}
		resolveNoneKeyframes() {
			const { unresolvedKeyframes: e, name: t } = this,
				n = [];
			for (let t = 0; t < e.length; t++) (e[t] === null || Di(e[t])) && n.push(t);
			n.length && Bi(e, n, t);
		}
		measureInitialState() {
			const { element: e, unresolvedKeyframes: t, name: n } = this;
			if (!e || !e.current) return;
			n === `height` && (this.suspendedScrollY = window.pageYOffset),
				(this.measuredOrigin = rr[n](e.measureViewportBox(), window.getComputedStyle(e.current))),
				(t[0] = this.measuredOrigin);
			const r = t[t.length - 1];
			r !== void 0 && e.getValue(n, r).jump(r, !1);
		}
		measureEndState() {
			const { element: e, name: t, unresolvedKeyframes: n } = this;
			if (!e || !e.current) return;
			const r = e.getValue(t);
			r && r.jump(this.measuredOrigin, !1);
			const i = n.length - 1,
				a = n[i];
			(n[i] = rr[t](e.measureViewportBox(), window.getComputedStyle(e.current))),
				a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
				this.removedTransforms?.length &&
					this.removedTransforms.forEach(([t, n]) => {
						e.getValue(t).set(n);
					}),
				this.resolveNoneKeyframes();
		}
	},
	Hi = new Set([`opacity`, `clipPath`, `filter`, `transform`]);
function Ui(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == `string`) {
		let r = document;
		t && (r = t.current);
		const i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
var Wi = (e, t) => (t && typeof e == `number` ? t.transform(e) : e);
function Gi(e) {
	return fe(e) && `offsetHeight` in e;
}
var { schedule: Ki, cancel: qi } = Je(queueMicrotask, !1),
	Ji = { x: !1, y: !1 };
function Yi() {
	return Ji.x || Ji.y;
}
function Xi(e) {
	return e === `x` || e === `y`
		? Ji[e]
			? null
			: ((Ji[e] = !0),
				() => {
					Ji[e] = !1;
				})
		: Ji.x || Ji.y
			? null
			: ((Ji.x = Ji.y = !0),
				() => {
					Ji.x = Ji.y = !1;
				});
}
function Zi(e, t) {
	const n = Ui(e),
		r = new AbortController();
	return [n, { passive: !0, ...t, signal: r.signal }, () => r.abort()];
}
function Qi(e) {
	return !(e.pointerType === `touch` || Yi());
}
function $i(e, t, n = {}) {
	const [r, i, a] = Zi(e, n);
	return (
		r.forEach((e) => {
			let n = !1,
				r = !1,
				a,
				o = () => {
					e.removeEventListener(`pointerleave`, u);
				},
				s = (e) => {
					(a &&= (a(e), void 0)), o();
				},
				c = (e) => {
					(n = !1),
						window.removeEventListener(`pointerup`, c),
						window.removeEventListener(`pointercancel`, c),
						r && ((r = !1), s(e));
				},
				l = () => {
					(n = !0), window.addEventListener(`pointerup`, c, i), window.addEventListener(`pointercancel`, c, i);
				},
				u = (e) => {
					if (e.pointerType !== `touch`) {
						if (n) {
							r = !0;
							return;
						}
						s(e);
					}
				};
			e.addEventListener(
				`pointerenter`,
				(n) => {
					if (!Qi(n)) return;
					r = !1;
					const o = t(e, n);
					typeof o == `function` && ((a = o), e.addEventListener(`pointerleave`, u, i));
				},
				i,
			),
				e.addEventListener(`pointerdown`, l, i);
		}),
		a
	);
}
var ea = (e, t) => (t ? (e === t ? !0 : ea(e, t.parentElement)) : !1),
	ta = (e) => (e.pointerType === `mouse` ? typeof e.button != `number` || e.button <= 0 : e.isPrimary !== !1),
	na = new Set([`BUTTON`, `INPUT`, `SELECT`, `TEXTAREA`, `A`]);
function ra(e) {
	return na.has(e.tagName) || e.isContentEditable === !0;
}
var ia = new Set([`INPUT`, `SELECT`, `TEXTAREA`]);
function aa(e) {
	return ia.has(e.tagName) || e.isContentEditable === !0;
}
var oa = new WeakSet();
function sa(e) {
	return (t) => {
		t.key === `Enter` && e(t);
	};
}
function ca(e, t) {
	e.dispatchEvent(new PointerEvent(`pointer` + t, { isPrimary: !0, bubbles: !0 }));
}
var la = (e, t) => {
	const n = e.currentTarget;
	if (!n) return;
	const r = sa(() => {
		if (oa.has(n)) return;
		ca(n, `down`);
		const e = sa(() => {
			ca(n, `up`);
		});
		n.addEventListener(`keyup`, e, t), n.addEventListener(`blur`, () => ca(n, `cancel`), t);
	});
	n.addEventListener(`keydown`, r, t), n.addEventListener(`blur`, () => n.removeEventListener(`keydown`, r), t);
};
function ua(e) {
	return ta(e) && !Yi();
}
var da = new WeakSet();
function fa(e, t, n = {}) {
	const [r, i, a] = Zi(e, n),
		o = (e) => {
			const r = e.currentTarget;
			if (!ua(e) || da.has(e)) return;
			oa.add(r), n.stopPropagation && da.add(e);
			const a = t(r, e),
				o = (e, t) => {
					window.removeEventListener(`pointerup`, s),
						window.removeEventListener(`pointercancel`, c),
						oa.has(r) && oa.delete(r),
						ua(e) && typeof a == `function` && a(e, { success: t });
				},
				s = (e) => {
					o(e, r === window || r === document || n.useGlobalTarget || ea(r, e.target));
				},
				c = (e) => {
					o(e, !1);
				};
			window.addEventListener(`pointerup`, s, i), window.addEventListener(`pointercancel`, c, i);
		};
	return (
		r.forEach((e) => {
			(n.useGlobalTarget ? window : e).addEventListener(`pointerdown`, o, i),
				Gi(e) &&
					(e.addEventListener(`focus`, (e) => la(e, i)), !ra(e) && !e.hasAttribute(`tabindex`) && (e.tabIndex = 0));
		}),
		a
	);
}
function pa(e) {
	return fe(e) && `ownerSVGElement` in e;
}
var ma = new WeakMap(),
	ha,
	ga = (e, t, n) => (r, i) => (i && i[0] ? i[0][e + `Size`] : pa(r) && `getBBox` in r ? r.getBBox()[t] : r[n]),
	_a = ga(`inline`, `width`, `offsetWidth`),
	va = ga(`block`, `height`, `offsetHeight`);
function ya({ target: e, borderBoxSize: t }) {
	ma.get(e)?.forEach((n) => {
		n(e, {
			get width() {
				return _a(e, t);
			},
			get height() {
				return va(e, t);
			},
		});
	});
}
function ba(e) {
	e.forEach(ya);
}
function xa() {
	typeof ResizeObserver > `u` || (ha = new ResizeObserver(ba));
}
function Sa(e, t) {
	ha || xa();
	const n = Ui(e);
	return (
		n.forEach((e) => {
			let n = ma.get(e);
			n || ((n = new Set()), ma.set(e, n)), n.add(t), ha?.observe(e);
		}),
		() => {
			n.forEach((e) => {
				const n = ma.get(e);
				n?.delete(t), n?.size || ha?.unobserve(e);
			});
		}
	);
}
var Ca = new Set(),
	wa;
function Ta() {
	(wa = () => {
		const e = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			},
		};
		Ca.forEach((t) => t(e));
	}),
		window.addEventListener(`resize`, wa);
}
function Ea(e) {
	return (
		Ca.add(e),
		wa || Ta(),
		() => {
			Ca.delete(e), !Ca.size && typeof wa == `function` && (window.removeEventListener(`resize`, wa), (wa = void 0));
		}
	);
}
function Da(e, t) {
	return typeof e == `function` ? Ea(e) : Sa(e, t);
}
function Oa(e) {
	return pa(e) && e.tagName === `svg`;
}
var ka = [...Ti, M, Vt],
	Aa = (e) => ka.find(wi(e)),
	ja = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
	Ma = () => ({ x: ja(), y: ja() }),
	Na = () => ({ min: 0, max: 0 }),
	I = () => ({ x: Na(), y: Na() }),
	Pa = new WeakMap();
function Fa(e) {
	return typeof e == `object` && !!e && typeof e.start == `function`;
}
function Ia(e) {
	return typeof e == `string` || Array.isArray(e);
}
var La = [`animate`, `whileInView`, `whileFocus`, `whileHover`, `whileTap`, `whileDrag`, `exit`],
	Ra = [`initial`, ...La];
function za(e) {
	return Fa(e.animate) || Ra.some((t) => Ia(e[t]));
}
function Ba(e) {
	return !!(za(e) || e.variants);
}
function Va(e, t, n) {
	for (const r in t) {
		const i = t[r],
			a = n[r];
		if (F(i)) e.addValue(r, i);
		else if (F(a)) e.addValue(r, ci(i, { owner: e }));
		else if (a !== i)
			if (e.hasValue(r)) {
				const t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				const t = e.getStaticValue(r);
				e.addValue(r, ci(t === void 0 ? i : t, { owner: e }));
			}
	}
	for (const r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
var Ha = { current: null },
	Ua = { current: !1 },
	Wa = typeof window < `u`;
function Ga() {
	if (((Ua.current = !0), Wa))
		if (window.matchMedia) {
			const e = window.matchMedia(`(prefers-reduced-motion)`),
				t = () => (Ha.current = e.matches);
			e.addEventListener(`change`, t), t();
		} else Ha.current = !1;
}
var Ka = [
		`AnimationStart`,
		`AnimationComplete`,
		`Update`,
		`BeforeLayoutMeasure`,
		`LayoutMeasure`,
		`LayoutAnimationStart`,
		`LayoutAnimationComplete`,
	],
	qa = {};
function Ja(e) {
	qa = e;
}
function Ya() {
	return qa;
}
var Xa = class {
		scrapeMotionValuesFromProps(e, t, n) {
			return {};
		}
		constructor(
			{
				parent: e,
				props: t,
				presenceContext: n,
				reducedMotionConfig: r,
				skipAnimations: i,
				blockInitialAnimation: a,
				visualState: o,
			},
			s = {},
		) {
			(this.current = null),
				(this.children = new Set()),
				(this.isVariantNode = !1),
				(this.isControllingVariants = !1),
				(this.shouldReduceMotion = null),
				(this.shouldSkipAnimations = !1),
				(this.values = new Map()),
				(this.KeyframeResolver = dr),
				(this.features = {}),
				(this.valueSubscriptions = new Map()),
				(this.prevMotionValues = {}),
				(this.hasBeenMounted = !1),
				(this.events = {}),
				(this.propEventSubscriptions = {}),
				(this.notifyUpdate = () => this.notify(`Update`, this.latestValues)),
				(this.render = () => {
					this.current &&
						(this.triggerBuild(),
						this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
				}),
				(this.renderScheduledAt = 0),
				(this.scheduleRender = () => {
					const e = $e.now();
					this.renderScheduledAt < e && ((this.renderScheduledAt = e), k.render(this.render, !1, !0));
				});
			const { latestValues: c, renderState: l } = o;
			(this.latestValues = c),
				(this.baseTarget = { ...c }),
				(this.initialValues = t.initial ? { ...c } : {}),
				(this.renderState = l),
				(this.parent = e),
				(this.props = t),
				(this.presenceContext = n),
				(this.depth = e ? e.depth + 1 : 0),
				(this.reducedMotionConfig = r),
				(this.skipAnimationsConfig = i),
				(this.options = s),
				(this.blockInitialAnimation = !!a),
				(this.isControllingVariants = za(t)),
				(this.isVariantNode = Ba(t)),
				this.isVariantNode && (this.variantChildren = new Set()),
				(this.manuallyAnimateOnMount = !!(e && e.current));
			const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
			for (const e in d) {
				const t = d[e];
				c[e] !== void 0 && F(t) && t.set(c[e]);
			}
		}
		mount(e) {
			if (this.hasBeenMounted)
				for (const e in this.initialValues)
					this.values.get(e)?.jump(this.initialValues[e]), (this.latestValues[e] = this.initialValues[e]);
			(this.current = e),
				Pa.set(e, this),
				this.projection && !this.projection.instance && this.projection.mount(e),
				this.parent &&
					this.isVariantNode &&
					!this.isControllingVariants &&
					(this.removeFromVariantTree = this.parent.addVariantChild(this)),
				this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
				this.reducedMotionConfig === `never`
					? (this.shouldReduceMotion = !1)
					: this.reducedMotionConfig === `always`
						? (this.shouldReduceMotion = !0)
						: (Ua.current || Ga(), (this.shouldReduceMotion = Ha.current)),
				(this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
				this.parent?.addChild(this),
				this.update(this.props, this.presenceContext),
				(this.hasBeenMounted = !0);
		}
		unmount() {
			for (const e in (this.projection && this.projection.unmount(),
			Ye(this.notifyUpdate),
			Ye(this.render),
			this.valueSubscriptions.forEach((e) => e()),
			this.valueSubscriptions.clear(),
			this.removeFromVariantTree && this.removeFromVariantTree(),
			this.parent?.removeChild(this),
			this.events))
				this.events[e].clear();
			for (const e in this.features) {
				const t = this.features[e];
				t && (t.unmount(), (t.isMounted = !1));
			}
			this.current = null;
		}
		addChild(e) {
			this.children.add(e), (this.enteringChildren ??= new Set()), this.enteringChildren.add(e);
		}
		removeChild(e) {
			this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
		}
		bindToMotionValue(e, t) {
			if (
				(this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(),
				t.accelerate && Hi.has(e) && this.current instanceof HTMLElement)
			) {
				const { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate,
					s = new wr({ element: this.current, name: e, keyframes: r, times: i, ease: a, duration: ye(o) }),
					c = n(s);
				this.valueSubscriptions.set(e, () => {
					c(), s.cancel();
				});
				return;
			}
			const n = Qn.has(e);
			n && this.onBindTransform && this.onBindTransform();
			let r = t.on(`change`, (t) => {
					(this.latestValues[e] = t),
						this.props.onUpdate && k.preRender(this.notifyUpdate),
						n && this.projection && (this.projection.isTransformDirty = !0),
						this.scheduleRender();
				}),
				i;
			typeof window < `u` && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)),
				this.valueSubscriptions.set(e, () => {
					r(), i && i(), t.owner && t.stop();
				});
		}
		sortNodePosition(e) {
			return !this.current || !this.sortInstanceNodePosition || this.type !== e.type
				? 0
				: this.sortInstanceNodePosition(this.current, e.current);
		}
		updateFeatures() {
			let e = `animation`;
			for (e in qa) {
				const t = qa[e];
				if (!t) continue;
				const { isEnabled: n, Feature: r } = t;
				if ((!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e])) {
					const t = this.features[e];
					t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
				}
			}
		}
		triggerBuild() {
			this.build(this.renderState, this.latestValues, this.props);
		}
		measureViewportBox() {
			return this.current ? this.measureInstanceViewportBox(this.current, this.props) : I();
		}
		getStaticValue(e) {
			return this.latestValues[e];
		}
		setStaticValue(e, t) {
			this.latestValues[e] = t;
		}
		update(e, t) {
			(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
				(this.prevProps = this.props),
				(this.props = e),
				(this.prevPresenceContext = this.presenceContext),
				(this.presenceContext = t);
			for (let t = 0; t < Ka.length; t++) {
				const n = Ka[t];
				this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
				const r = e[`on` + n];
				r && (this.propEventSubscriptions[n] = this.on(n, r));
			}
			(this.prevMotionValues = Va(
				this,
				this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this),
				this.prevMotionValues,
			)),
				this.handleChildMotionValue && this.handleChildMotionValue();
		}
		getProps() {
			return this.props;
		}
		getVariant(e) {
			return this.props.variants ? this.props.variants[e] : void 0;
		}
		getDefaultTransition() {
			return this.props.transition;
		}
		getTransformPagePoint() {
			return this.props.transformPagePoint;
		}
		getClosestVariantNode() {
			return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
		}
		addVariantChild(e) {
			const t = this.getClosestVariantNode();
			if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
		}
		addValue(e, t) {
			const n = this.values.get(e);
			t !== n &&
				(n && this.removeValue(e),
				this.bindToMotionValue(e, t),
				this.values.set(e, t),
				(this.latestValues[e] = t.get()));
		}
		removeValue(e) {
			this.values.delete(e);
			const t = this.valueSubscriptions.get(e);
			t && (t(), this.valueSubscriptions.delete(e)),
				delete this.latestValues[e],
				this.removeValueFromRenderState(e, this.renderState);
		}
		hasValue(e) {
			return this.values.has(e);
		}
		getValue(e, t) {
			if (this.props.values && this.props.values[e]) return this.props.values[e];
			let n = this.values.get(e);
			return (
				n === void 0 && t !== void 0 && ((n = ci(t === null ? void 0 : t, { owner: this })), this.addValue(e, n)), n
			);
		}
		readValue(e, t) {
			let n =
				this.latestValues[e] !== void 0 || !this.current
					? this.latestValues[e]
					: (this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options));
			return (
				n != null &&
					(typeof n == `string` && (D(n) || pe(n)) ? (n = parseFloat(n)) : !Aa(n) && Vt.test(t) && (n = Ri(e, t)),
					this.setBaseTarget(e, F(n) ? n.get() : n)),
				F(n) ? n.get() : n
			);
		}
		setBaseTarget(e, t) {
			this.baseTarget[e] = t;
		}
		getBaseTarget(e) {
			let { initial: t } = this.props,
				n;
			if (typeof t == `string` || typeof t == `object`) {
				const r = ti(this.props, t, this.presenceContext?.custom);
				r && (n = r[e]);
			}
			if (t && n !== void 0) return n;
			const r = this.getBaseTargetFromProps(this.props, e);
			return r !== void 0 && !F(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
		}
		on(e, t) {
			return this.events[e] || (this.events[e] = new ve()), this.events[e].add(t);
		}
		notify(e, ...t) {
			this.events[e] && this.events[e].notify(...t);
		}
		scheduleRenderMicrotask() {
			Ki.render(this.render);
		}
	},
	Za = class extends Xa {
		constructor() {
			super(...arguments), (this.KeyframeResolver = Vi);
		}
		sortInstanceNodePosition(e, t) {
			return e.compareDocumentPosition(t) & 2 ? 1 : -1;
		}
		getBaseTargetFromProps(e, t) {
			const n = e.style;
			return n ? n[t] : void 0;
		}
		removeValueFromRenderState(e, { vars: t, style: n }) {
			delete t[e], delete n[e];
		}
		handleChildMotionValue() {
			this.childSubscription && (this.childSubscription(), delete this.childSubscription);
			const { children: e } = this.props;
			F(e) &&
				(this.childSubscription = e.on(`change`, (e) => {
					this.current && (this.current.textContent = `${e}`);
				}));
		}
	},
	Qa = class {
		constructor(e) {
			(this.isMounted = !1), (this.node = e);
		}
		update() {}
	};
function $a({ top: e, left: t, right: n, bottom: r }) {
	return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function eo({ x: e, y: t }) {
	return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function to(e, t) {
	if (!t) return e;
	const n = t({ x: e.left, y: e.top }),
		r = t({ x: e.right, y: e.bottom });
	return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function no(e) {
	return e === void 0 || e === 1;
}
function ro({ scale: e, scaleX: t, scaleY: n }) {
	return !no(e) || !no(t) || !no(n);
}
function io(e) {
	return ro(e) || ao(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function ao(e) {
	return oo(e.x) || oo(e.y);
}
function oo(e) {
	return e && e !== `0%`;
}
function so(e, t, n) {
	return n + t * (e - n);
}
function co(e, t, n, r, i) {
	return i !== void 0 && (e = so(e, i, r)), so(e, n, r) + t;
}
function lo(e, t = 0, n = 1, r, i) {
	(e.min = co(e.min, t, n, r, i)), (e.max = co(e.max, t, n, r, i));
}
function uo(e, { x: t, y: n }) {
	lo(e.x, t.translate, t.scale, t.originPoint), lo(e.y, n.translate, n.scale, n.originPoint);
}
var fo = 0.999999999999,
	po = 1.0000000000001;
function mo(e, t, n, r = !1) {
	const i = n.length;
	if (!i) return;
	t.x = t.y = 1;
	let a, o;
	for (let s = 0; s < i; s++) {
		(a = n[s]), (o = a.projectionDelta);
		const { visualElement: i } = a.options;
		(i && i.props.style && i.props.style.display === `contents`) ||
			(r &&
				a.options.layoutScroll &&
				a.scroll &&
				a !== a.root &&
				_o(e, { x: -a.scroll.offset.x, y: -a.scroll.offset.y }),
			o && ((t.x *= o.x.scale), (t.y *= o.y.scale), uo(e, o)),
			r && io(a.latestValues) && _o(e, a.latestValues));
	}
	t.x < po && t.x > fo && (t.x = 1), t.y < po && t.y > fo && (t.y = 1);
}
function ho(e, t) {
	(e.min += t), (e.max += t);
}
function go(e, t, n, r, i = 0.5) {
	lo(e, t, n, N(e.min, e.max, i), r);
}
function _o(e, t) {
	go(e.x, t.x, t.scaleX, t.scale, t.originX), go(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function vo(e, t) {
	return $a(to(e.getBoundingClientRect(), t));
}
function yo(e, t, n) {
	const r = vo(e, n),
		{ scroll: i } = t;
	return i && (ho(r.x, i.offset.x), ho(r.y, i.offset.y)), r;
}
var bo = { x: `translateX`, y: `translateY`, z: `translateZ`, transformPerspective: `perspective` },
	xo = Zn.length;
function So(e, t, n) {
	let r = ``,
		i = !0;
	for (let a = 0; a < xo; a++) {
		const o = Zn[a],
			s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == `number`) c = s === (o.startsWith(`scale`) ? 1 : 0);
		else {
			const e = parseFloat(s);
			c = o.startsWith(`scale`) ? e === 1 : e === 0;
		}
		if (!c || n) {
			const e = Wi(s, Pi[o]);
			if (!c) {
				i = !1;
				const t = bo[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	return (r = r.trim()), n ? (r = n(t, i ? `` : r)) : i && (r = `none`), r;
}
function Co(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e,
		o = !1,
		s = !1;
	for (const e in t) {
		const n = t[e];
		if (Qn.has(e)) {
			o = !0;
		} else if (nt(e)) {
			i[e] = n;
		} else {
			const t = Wi(n, Pi[e]);
			e.startsWith(`origin`) ? ((s = !0), (a[e] = t)) : (r[e] = t);
		}
	}
	if ((t.transform || (o || n ? (r.transform = So(t, e.transform, n)) : (r.transform &&= `none`)), s)) {
		const { originX: e = `50%`, originY: t = `50%`, originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
function wo(e, { style: t, vars: n }, r, i) {
	let a = e.style,
		o;
	for (o in t) a[o] = t[o];
	for (o in (i?.applyProjectionStyles(a, r), n)) a.setProperty(o, n[o]);
}
function To(e, t) {
	return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
var Eo = {
		correct: (e, t) => {
			if (!t.target) return e;
			if (typeof e == `string`)
				if (j.test(e)) e = parseFloat(e);
				else return e;
			return `${To(e, t.target.x)}% ${To(e, t.target.y)}%`;
		},
	},
	Do = {
		correct: (e, { treeScale: t, projectionDelta: n }) => {
			const r = e,
				i = Vt.parse(e);
			if (i.length > 5) return r;
			const a = Vt.createTransformer(e),
				o = typeof i[0] == `number` ? 0 : 1,
				s = n.x.scale * t.x,
				c = n.y.scale * t.y;
			(i[0 + o] /= s), (i[1 + o] /= c);
			const l = N(s, c, 0.5);
			return typeof i[2 + o] == `number` && (i[2 + o] /= l), typeof i[3 + o] == `number` && (i[3 + o] /= l), a(i);
		},
	},
	Oo = {
		borderRadius: {
			...Eo,
			applyTo: [`borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`],
		},
		borderTopLeftRadius: Eo,
		borderTopRightRadius: Eo,
		borderBottomLeftRadius: Eo,
		borderBottomRightRadius: Eo,
		boxShadow: Do,
	};
function ko(e, { layout: t, layoutId: n }) {
	return Qn.has(e) || e.startsWith(`origin`) || ((t || n !== void 0) && (!!Oo[e] || e === `opacity`));
}
function Ao(e, t, n) {
	const r = e.style,
		i = t?.style,
		a = {};
	if (!r) return a;
	for (const t in r) (F(r[t]) || (i && F(i[t])) || ko(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
function jo(e) {
	return window.getComputedStyle(e);
}
var Mo = class extends Za {
		constructor() {
			super(...arguments), (this.type = `html`), (this.renderInstance = wo);
		}
		readValueFromInstance(e, t) {
			if (Qn.has(t)) return this.projection?.isProjecting ? qn(t) : Yn(e, t);
			{
				const n = jo(e),
					r = (nt(t) ? n.getPropertyValue(t) : n[t]) || 0;
				return typeof r == `string` ? r.trim() : r;
			}
		}
		measureInstanceViewportBox(e, { transformPagePoint: t }) {
			return vo(e, t);
		}
		build(e, t, n) {
			Co(e, t, n.transformTemplate);
		}
		scrapeMotionValuesFromProps(e, t, n) {
			return Ao(e, t, n);
		}
	},
	No = { offset: `stroke-dashoffset`, array: `stroke-dasharray` },
	Po = { offset: `strokeDashoffset`, array: `strokeDasharray` };
function Fo(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	const a = i ? No : Po;
	(e[a.offset] = `${-r}`), (e[a.array] = `${t} ${n}`);
}
var Io = [`offsetDistance`, `offsetPath`, `offsetRotate`, `offsetAnchor`];
function Lo(
	e,
	{ attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s },
	c,
	l,
	u,
) {
	if ((Co(e, s, l), c)) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	(e.attrs = e.style), (e.style = {});
	const { attrs: d, style: f } = e;
	d.transform && ((f.transform = d.transform), delete d.transform),
		(f.transform || d.transformOrigin) &&
			((f.transformOrigin = d.transformOrigin ?? `50% 50%`), delete d.transformOrigin),
		f.transform && ((f.transformBox = u?.transformBox ?? `fill-box`), delete d.transformBox);
	for (const e of Io) d[e] !== void 0 && ((f[e] = d[e]), delete d[e]);
	t !== void 0 && (d.x = t),
		n !== void 0 && (d.y = n),
		r !== void 0 && (d.scale = r),
		i !== void 0 && Fo(d, i, a, o, !1);
}
var Ro = new Set([
		`baseFrequency`,
		`diffuseConstant`,
		`kernelMatrix`,
		`kernelUnitLength`,
		`keySplines`,
		`keyTimes`,
		`limitingConeAngle`,
		`markerHeight`,
		`markerWidth`,
		`numOctaves`,
		`targetX`,
		`targetY`,
		`surfaceScale`,
		`specularConstant`,
		`specularExponent`,
		`stdDeviation`,
		`tableValues`,
		`viewBox`,
		`gradientTransform`,
		`pathLength`,
		`startOffset`,
		`textLength`,
		`lengthAdjust`,
	]),
	zo = (e) => typeof e == `string` && e.toLowerCase() === `svg`;
function Bo(e, t, n, r) {
	for (const n in (wo(e, t, void 0, r), t.attrs)) e.setAttribute(Ro.has(n) ? n : hi(n), t.attrs[n]);
}
function Vo(e, t, n) {
	const r = Ao(e, t, n);
	for (const n in e)
		if (F(e[n]) || F(t[n])) {
			const t = Zn.indexOf(n) === -1 ? n : `attr` + n.charAt(0).toUpperCase() + n.substring(1);
			r[t] = e[n];
		}
	return r;
}
var Ho = class extends Za {
		constructor() {
			super(...arguments), (this.type = `svg`), (this.isSVGTag = !1), (this.measureInstanceViewportBox = I);
		}
		getBaseTargetFromProps(e, t) {
			return e[t];
		}
		readValueFromInstance(e, t) {
			if (Qn.has(t)) {
				const e = Ii(t);
				return (e && e.default) || 0;
			}
			return (t = Ro.has(t) ? t : hi(t)), e.getAttribute(t);
		}
		scrapeMotionValuesFromProps(e, t, n) {
			return Vo(e, t, n);
		}
		build(e, t, n) {
			Lo(e, t, this.isSVGTag, n.transformTemplate, n.style);
		}
		renderInstance(e, t, n, r) {
			Bo(e, t, n, r);
		}
		mount(e) {
			(this.isSVGTag = zo(e.tagName)), super.mount(e);
		}
	},
	Uo = Ra.length;
function Wo(e) {
	if (!e) return;
	if (!e.isControllingVariants) {
		const t = (e.parent && Wo(e.parent)) || {};
		return e.props.initial !== void 0 && (t.initial = e.props.initial), t;
	}
	const t = {};
	for (let n = 0; n < Uo; n++) {
		const r = Ra[n],
			i = e.props[r];
		(Ia(i) || i === !1) && (t[r] = i);
	}
	return t;
}
function Go(e, t) {
	if (!Array.isArray(t)) return !1;
	const n = t.length;
	if (n !== e.length) return !1;
	for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
	return !0;
}
var Ko = [...La].reverse(),
	qo = La.length;
function Jo(e) {
	return (t) => Promise.all(t.map(({ animation: t, options: n }) => Si(e, t, n)));
}
function Yo(e) {
	let t = Jo(e),
		n = Qo(),
		r = !0,
		i = (t) => (n, r) => {
			const i = ni(e, r, t === `exit` ? e.presenceContext?.custom : void 0);
			if (i) {
				const { transition: e, transitionEnd: t, ...r } = i;
				n = { ...n, ...r, ...t };
			}
			return n;
		};
	function a(n) {
		t = n(e);
	}
	function o(a) {
		let { props: o } = e,
			s = Wo(e.parent) || {},
			c = [],
			l = new Set(),
			u = {},
			d = 1 / 0;
		for (let t = 0; t < qo; t++) {
			const f = Ko[t],
				p = n[f],
				m = o[f] === void 0 ? s[f] : o[f],
				h = Ia(m),
				g = f === a ? p.isActive : null;
			g === !1 && (d = t);
			let _ = m === s[f] && m !== o[f] && h;
			if (
				(_ && r && e.manuallyAnimateOnMount && (_ = !1),
				(p.protectedKeys = { ...u }),
				(!p.isActive && g === null) || (!m && !p.prevProp) || Fa(m) || typeof m == `boolean`)
			)
				continue;
			if (f === `exit` && p.isActive && g !== !0) {
				p.prevResolvedValues && (u = { ...u, ...p.prevResolvedValues });
				continue;
			}
			let v = Xo(p.prevProp, m),
				y = v || (f === a && p.isActive && !_ && h) || (t > d && h),
				b = !1,
				x = Array.isArray(m) ? m : [m],
				S = x.reduce(i(f), {});
			g === !1 && (S = {});
			const { prevResolvedValues: ee = {} } = p,
				C = { ...ee, ...S },
				w = (t) => {
					(y = !0), l.has(t) && ((b = !0), l.delete(t)), (p.needsAnimating[t] = !0);
					const n = e.getValue(t);
					n && (n.liveStyle = !1);
				};
			for (const e in C) {
				const t = S[e],
					n = ee[e];
				if (Object.hasOwn(u, e)) continue;
				let r = !1;
				(r = li(t) && li(n) ? !Go(t, n) : t !== n),
					r ? (t == null ? l.add(e) : w(e)) : t !== void 0 && l.has(e) ? w(e) : (p.protectedKeys[e] = !0);
			}
			(p.prevProp = m),
				(p.prevResolvedValues = S),
				p.isActive && (u = { ...u, ...S }),
				r && e.blockInitialAnimation && (y = !1);
			const te = _ && v;
			y &&
				(!te || b) &&
				c.push(
					...x.map((t) => {
						const n = { type: f };
						if (typeof t == `string` && r && !te && e.manuallyAnimateOnMount && e.parent) {
							const { parent: r } = e,
								i = ni(r, t);
							if (r.enteringChildren && i) {
								const { delayChildren: t } = i.transition || {};
								n.delay = zr(r.enteringChildren, e, t);
							}
						}
						return { animation: t, options: n };
					}),
				);
		}
		if (l.size) {
			const t = {};
			if (typeof o.initial != `boolean`) {
				const n = ni(e, Array.isArray(o.initial) ? o.initial[0] : o.initial);
				n && n.transition && (t.transition = n.transition);
			}
			l.forEach((n) => {
				const r = e.getBaseTarget(n),
					i = e.getValue(n);
				i && (i.liveStyle = !0), (t[n] = r ?? null);
			}),
				c.push({ animation: t });
		}
		let f = !!c.length;
		return (
			r && (o.initial === !1 || o.initial === o.animate) && !e.manuallyAnimateOnMount && (f = !1),
			(r = !1),
			f ? t(c) : Promise.resolve()
		);
	}
	function s(t, r) {
		if (n[t].isActive === r) return Promise.resolve();
		e.variantChildren?.forEach((e) => e.animationState?.setActive(t, r)), (n[t].isActive = r);
		const i = o(t);
		for (const e in n) n[e].protectedKeys = {};
		return i;
	}
	return {
		animateChanges: o,
		setActive: s,
		setAnimateFunction: a,
		getState: () => n,
		reset: () => {
			n = Qo();
		},
	};
}
function Xo(e, t) {
	return typeof t == `string` ? t !== e : Array.isArray(t) ? !Go(t, e) : !1;
}
function Zo(e = !1) {
	return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function Qo() {
	return {
		animate: Zo(!0),
		whileInView: Zo(),
		whileHover: Zo(),
		whileTap: Zo(),
		whileDrag: Zo(),
		whileFocus: Zo(),
		exit: Zo(),
	};
}
function $o(e, t) {
	(e.min = t.min), (e.max = t.max);
}
function es(e, t) {
	$o(e.x, t.x), $o(e.y, t.y);
}
function ts(e, t) {
	(e.translate = t.translate), (e.scale = t.scale), (e.originPoint = t.originPoint), (e.origin = t.origin);
}
var ns = 1e-4,
	rs = 1 - ns,
	is = 1 + ns,
	as = 0.01,
	os = 0 - as,
	ss = 0 + as;
function cs(e) {
	return e.max - e.min;
}
function ls(e, t, n) {
	return Math.abs(e - t) <= n;
}
function us(e, t, n, r = 0.5) {
	(e.origin = r),
		(e.originPoint = N(t.min, t.max, e.origin)),
		(e.scale = cs(n) / cs(t)),
		(e.translate = N(n.min, n.max, e.origin) - e.originPoint),
		((e.scale >= rs && e.scale <= is) || isNaN(e.scale)) && (e.scale = 1),
		((e.translate >= os && e.translate <= ss) || isNaN(e.translate)) && (e.translate = 0);
}
function ds(e, t, n, r) {
	us(e.x, t.x, n.x, r ? r.originX : void 0), us(e.y, t.y, n.y, r ? r.originY : void 0);
}
function fs(e, t, n) {
	(e.min = n.min + t.min), (e.max = e.min + cs(t));
}
function ps(e, t, n) {
	fs(e.x, t.x, n.x), fs(e.y, t.y, n.y);
}
function ms(e, t, n) {
	(e.min = t.min - n.min), (e.max = e.min + cs(t));
}
function hs(e, t, n) {
	ms(e.x, t.x, n.x), ms(e.y, t.y, n.y);
}
function gs(e, t, n, r, i) {
	return (e -= t), (e = so(e, 1 / n, r)), i !== void 0 && (e = so(e, 1 / i, r)), e;
}
function _s(e, t = 0, n = 1, r = 0.5, i, a = e, o = e) {
	if ((Ct.test(t) && ((t = parseFloat(t)), (t = N(o.min, o.max, t / 100) - o.min)), typeof t != `number`)) return;
	let s = N(a.min, a.max, r);
	e === a && (s -= t), (e.min = gs(e.min, t, n, s, i)), (e.max = gs(e.max, t, n, s, i));
}
function vs(e, t, [n, r, i], a, o) {
	_s(e, t[n], t[r], t[i], t.scale, a, o);
}
var ys = [`x`, `scaleX`, `originX`],
	bs = [`y`, `scaleY`, `originY`];
function xs(e, t, n, r) {
	vs(e.x, t, ys, n ? n.x : void 0, r ? r.x : void 0), vs(e.y, t, bs, n ? n.y : void 0, r ? r.y : void 0);
}
function Ss(e) {
	return e.translate === 0 && e.scale === 1;
}
function Cs(e) {
	return Ss(e.x) && Ss(e.y);
}
function ws(e, t) {
	return e.min === t.min && e.max === t.max;
}
function Ts(e, t) {
	return ws(e.x, t.x) && ws(e.y, t.y);
}
function Es(e, t) {
	return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Ds(e, t) {
	return Es(e.x, t.x) && Es(e.y, t.y);
}
function Os(e) {
	return cs(e.x) / cs(e.y);
}
function ks(e, t) {
	return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
function As(e) {
	return [e(`x`), e(`y`)];
}
function js(e, t, n) {
	let r = ``,
		i = e.x.translate / t.x,
		a = e.y.translate / t.y,
		o = n?.z || 0;
	if (
		((i || a || o) && (r = `translate3d(${i}px, ${a}px, ${o}px) `),
		(t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
		n)
	) {
		const { transformPerspective: e, rotate: t, rotateX: i, rotateY: a, skewX: o, skewY: s } = n;
		e && (r = `perspective(${e}px) ${r}`),
			t && (r += `rotate(${t}deg) `),
			i && (r += `rotateX(${i}deg) `),
			a && (r += `rotateY(${a}deg) `),
			o && (r += `skewX(${o}deg) `),
			s && (r += `skewY(${s}deg) `);
	}
	const s = e.x.scale * t.x,
		c = e.y.scale * t.y;
	return (s !== 1 || c !== 1) && (r += `scale(${s}, ${c})`), r || `none`;
}
var Ms = [`TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`],
	Ns = Ms.length,
	Ps = (e) => (typeof e == `string` ? parseFloat(e) : e),
	Fs = (e) => typeof e == `number` || j.test(e);
function Is(e, t, n, r, i, a) {
	i
		? ((e.opacity = N(0, n.opacity ?? 1, Rs(r))), (e.opacityExit = N(t.opacity ?? 1, 0, zs(r))))
		: a && (e.opacity = N(t.opacity ?? 1, n.opacity ?? 1, r));
	for (let i = 0; i < Ns; i++) {
		let a = `border${Ms[i]}Radius`,
			o = Ls(t, a),
			s = Ls(n, a);
		(o === void 0 && s === void 0) ||
			((o ||= 0),
			(s ||= 0),
			o === 0 || s === 0 || Fs(o) === Fs(s)
				? ((e[a] = Math.max(N(Ps(o), Ps(s), r), 0)), (Ct.test(s) || Ct.test(o)) && (e[a] += `%`))
				: (e[a] = s));
	}
	(t.rotate || n.rotate) && (e.rotate = N(t.rotate || 0, n.rotate || 0, r));
}
function Ls(e, t) {
	return e[t] === void 0 ? e.borderRadius : e[t];
}
var Rs = Bs(0, 0.5, Pe),
	zs = Bs(0.5, 0.95, O);
function Bs(e, t, n) {
	return (r) => (r < e ? 0 : r > t ? 1 : n(_e(e, t, r)));
}
function Vs(e, t, n) {
	const r = F(e) ? e : ci(e);
	return r.start($r(``, r, t, n)), r.animation;
}
function Hs(e, t, n, r = { passive: !0 }) {
	return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
var Us = (e, t) => e.depth - t.depth,
	Ws = class {
		constructor() {
			(this.children = []), (this.isDirty = !1);
		}
		add(e) {
			ce(this.children, e), (this.isDirty = !0);
		}
		remove(e) {
			T(this.children, e), (this.isDirty = !0);
		}
		forEach(e) {
			this.isDirty && this.children.sort(Us), (this.isDirty = !1), this.children.forEach(e);
		}
	};
function Gs(e, t) {
	const n = $e.now(),
		r = ({ timestamp: i }) => {
			const a = i - n;
			a >= t && (Ye(r), e(a - t));
		};
	return k.setup(r, !0), () => Ye(r);
}
function Ks(e) {
	return F(e) ? e.get() : e;
}
var qs = class {
		constructor() {
			this.members = [];
		}
		add(e) {
			ce(this.members, e);
			for (let t = this.members.length - 1; t >= 0; t--) {
				const n = this.members[t];
				if (n === e || n === this.lead || n === this.prevLead) continue;
				const r = n.instance;
				r && r.isConnected === !1 && n.isPresent !== !1 && !n.snapshot && T(this.members, n);
			}
			e.scheduleRender();
		}
		remove(e) {
			if ((T(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead)) {
				const e = this.members[this.members.length - 1];
				e && this.promote(e);
			}
		}
		relegate(e) {
			const t = this.members.findIndex((t) => e === t);
			if (t === 0) return !1;
			let n;
			for (let e = t; e >= 0; e--) {
				const t = this.members[e],
					r = t.instance;
				if (t.isPresent !== !1 && (!r || r.isConnected !== !1)) {
					n = t;
					break;
				}
			}
			return n ? (this.promote(n), !0) : !1;
		}
		promote(e, t) {
			const n = this.lead;
			if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
				n.instance && n.scheduleRender(), e.scheduleRender();
				const r = n.options.layoutDependency,
					i = e.options.layoutDependency;
				if (!(r !== void 0 && i !== void 0 && r === i)) {
					const r = n.instance;
					(r && r.isConnected === !1 && !n.snapshot) ||
						((e.resumeFrom = n),
						t && (e.resumeFrom.preserveOpacity = !0),
						n.snapshot && ((e.snapshot = n.snapshot), (e.snapshot.latestValues = n.animationValues || n.latestValues)),
						e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
				}
				const { crossfade: a } = e.options;
				a === !1 && n.hide();
			}
		}
		exitAnimationComplete() {
			this.members.forEach((e) => {
				const { options: t, resumingFrom: n } = e;
				t.onExitComplete && t.onExitComplete(), n && n.options.onExitComplete && n.options.onExitComplete();
			});
		}
		scheduleRender() {
			this.members.forEach((e) => {
				e.instance && e.scheduleRender(!1);
			});
		}
		removeLeadSnapshot() {
			this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
		}
	},
	Js = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
	Ys = { nodes: 0, calculatedTargetDeltas: 0, calculatedProjections: 0 },
	Xs = [``, `X`, `Y`, `Z`],
	Zs = 1e3,
	Qs = 0;
function $s(e, t, n, r) {
	const { latestValues: i } = t;
	i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function ec(e) {
	if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
	const { visualElement: t } = e.options;
	if (!t) return;
	const n = _i(t);
	if (window.MotionHasOptimisedAnimation(n, `transform`)) {
		const { layout: t, layoutId: r } = e.options;
		window.MotionCancelOptimisedAnimation(n, `transform`, k, !(t || r));
	}
	const { parent: r } = e;
	r && !r.hasCheckedOptimisedAppear && ec(r);
}
function tc({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
	return class {
		constructor(e = {}, n = t?.()) {
			(this.id = Qs++),
				(this.animationId = 0),
				(this.animationCommitId = 0),
				(this.children = new Set()),
				(this.options = {}),
				(this.isTreeAnimating = !1),
				(this.isAnimationBlocked = !1),
				(this.isLayoutDirty = !1),
				(this.isProjectionDirty = !1),
				(this.isSharedProjectionDirty = !1),
				(this.isTransformDirty = !1),
				(this.updateManuallyBlocked = !1),
				(this.updateBlockedByResize = !1),
				(this.isUpdating = !1),
				(this.isSVG = !1),
				(this.needsReset = !1),
				(this.shouldResetTransform = !1),
				(this.hasCheckedOptimisedAppear = !1),
				(this.treeScale = { x: 1, y: 1 }),
				(this.eventHandlers = new Map()),
				(this.hasTreeAnimated = !1),
				(this.layoutVersion = 0),
				(this.updateScheduled = !1),
				(this.scheduleUpdate = () => this.update()),
				(this.projectionUpdateScheduled = !1),
				(this.checkUpdateFailed = () => {
					this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
				}),
				(this.updateProjection = () => {
					(this.projectionUpdateScheduled = !1),
						Ge.value && (Ys.nodes = Ys.calculatedTargetDeltas = Ys.calculatedProjections = 0),
						this.nodes.forEach(ic),
						this.nodes.forEach(dc),
						this.nodes.forEach(fc),
						this.nodes.forEach(ac),
						Ge.addProjectionMetrics && Ge.addProjectionMetrics(Ys);
				}),
				(this.resolvedRelativeTargetAt = 0),
				(this.linkedParentVersion = 0),
				(this.hasProjected = !1),
				(this.isVisible = !0),
				(this.animationProgress = 0),
				(this.sharedNodes = new Map()),
				(this.latestValues = e),
				(this.root = n ? n.root || n : this),
				(this.path = n ? [...n.path, n] : []),
				(this.parent = n),
				(this.depth = n ? n.depth + 1 : 0);
			for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
			this.root === this && (this.nodes = new Ws());
		}
		addEventListener(e, t) {
			return this.eventHandlers.has(e) || this.eventHandlers.set(e, new ve()), this.eventHandlers.get(e).add(t);
		}
		notifyListeners(e, ...t) {
			const n = this.eventHandlers.get(e);
			n && n.notify(...t);
		}
		hasListeners(e) {
			return this.eventHandlers.has(e);
		}
		mount(t) {
			if (this.instance) return;
			(this.isSVG = pa(t) && !Oa(t)), (this.instance = t);
			const { layoutId: n, layout: r, visualElement: i } = this.options;
			if (
				(i && !i.current && i.mount(t),
				this.root.nodes.add(this),
				this.parent && this.parent.children.add(this),
				this.root.hasTreeAnimated && (r || n) && (this.isLayoutDirty = !0),
				e)
			) {
				let n,
					r = 0,
					i = () => (this.root.updateBlockedByResize = !1);
				k.read(() => {
					r = window.innerWidth;
				}),
					e(t, () => {
						const e = window.innerWidth;
						e !== r &&
							((r = e),
							(this.root.updateBlockedByResize = !0),
							n && n(),
							(n = Gs(i, 250)),
							Js.hasAnimatedSinceResize && ((Js.hasAnimatedSinceResize = !1), this.nodes.forEach(uc)));
					});
			}
			n && this.root.registerSharedNode(n, this),
				this.options.animate !== !1 &&
					i &&
					(n || r) &&
					this.addEventListener(
						`didUpdate`,
						({ delta: e, hasLayoutChanged: t, hasRelativeLayoutChanged: n, layout: r }) => {
							if (this.isTreeAnimationBlocked()) {
								(this.target = void 0), (this.relativeTarget = void 0);
								return;
							}
							const a = this.options.transition || i.getDefaultTransition() || yc,
								{ onLayoutAnimationStart: o, onLayoutAnimationComplete: s } = i.getProps(),
								c = !this.targetLayout || !Ds(this.targetLayout, r),
								l = !t && n;
							if (this.options.layoutRoot || this.resumeFrom || l || (t && (c || !this.currentAnimation))) {
								this.resumeFrom && ((this.resumingFrom = this.resumeFrom), (this.resumingFrom.resumingFrom = void 0));
								const t = { ...Zr(a, `layout`), onPlay: o, onComplete: s };
								(i.shouldReduceMotion || this.options.layoutRoot) && ((t.delay = 0), (t.type = !1)),
									this.startAnimation(t),
									this.setAnimationOrigin(e, l);
							} else t || uc(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
							this.targetLayout = r;
						},
					);
		}
		unmount() {
			this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
			const e = this.getStack();
			e && e.remove(this),
				this.parent && this.parent.children.delete(this),
				(this.instance = void 0),
				this.eventHandlers.clear(),
				Ye(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = !0;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = !1;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
		}
		startUpdate() {
			this.isUpdateBlocked() || ((this.isUpdating = !0), this.nodes && this.nodes.forEach(pc), this.animationId++);
		}
		getTransformTemplate() {
			const { visualElement: e } = this.options;
			return e && e.getProps().transformTemplate;
		}
		willUpdate(e = !0) {
			if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			if (
				(window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && ec(this),
				!this.root.isUpdating && this.root.startUpdate(),
				this.isLayoutDirty)
			)
				return;
			this.isLayoutDirty = !0;
			for (let e = 0; e < this.path.length; e++) {
				const t = this.path[e];
				(t.shouldResetTransform = !0), t.updateScroll(`snapshot`), t.options.layoutRoot && t.willUpdate(!1);
			}
			const { layoutId: t, layout: n } = this.options;
			if (t === void 0 && !n) return;
			const r = this.getTransformTemplate();
			(this.prevTransformTemplateValue = r ? r(this.latestValues, ``) : void 0),
				this.updateSnapshot(),
				e && this.notifyListeners(`willUpdate`);
		}
		update() {
			if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
				this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(sc);
				return;
			}
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(cc);
				return;
			}
			(this.animationCommitId = this.animationId),
				this.isUpdating
					? ((this.isUpdating = !1), this.nodes.forEach(lc), this.nodes.forEach(nc), this.nodes.forEach(rc))
					: this.nodes.forEach(cc),
				this.clearAllSnapshots();
			const e = $e.now();
			(A.delta = E(0, 1e3 / 60, e - A.timestamp)),
				(A.timestamp = e),
				(A.isProcessing = !0),
				Xe.update.process(A),
				Xe.preRender.process(A),
				Xe.render.process(A),
				(A.isProcessing = !1);
		}
		didUpdate() {
			this.updateScheduled || ((this.updateScheduled = !0), Ki.read(this.scheduleUpdate));
		}
		clearAllSnapshots() {
			this.nodes.forEach(oc), this.sharedNodes.forEach(mc);
		}
		scheduleUpdateProjection() {
			this.projectionUpdateScheduled ||
				((this.projectionUpdateScheduled = !0), k.preRender(this.updateProjection, !1, !0));
		}
		scheduleCheckAfterUnmount() {
			k.postRender(() => {
				this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			this.snapshot ||
				!this.instance ||
				((this.snapshot = this.measure()),
				this.snapshot &&
					!cs(this.snapshot.measuredBox.x) &&
					!cs(this.snapshot.measuredBox.y) &&
					(this.snapshot = void 0));
		}
		updateLayout() {
			if (
				!this.instance ||
				(this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
			)
				return;
			if (this.resumeFrom && !this.resumeFrom.instance)
				for (let e = 0; e < this.path.length; e++) this.path[e].updateScroll();
			const e = this.layout;
			(this.layout = this.measure(!1)),
				this.layoutVersion++,
				(this.layoutCorrected = I()),
				(this.isLayoutDirty = !1),
				(this.projectionDelta = void 0),
				this.notifyListeners(`measure`, this.layout.layoutBox);
			const { visualElement: t } = this.options;
			t && t.notify(`LayoutMeasure`, this.layout.layoutBox, e ? e.layoutBox : void 0);
		}
		updateScroll(e = `measure`) {
			let t = !!(this.options.layoutScroll && this.instance);
			if (
				(this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === e && (t = !1),
				t && this.instance)
			) {
				const t = r(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase: e,
					isRoot: t,
					offset: n(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : t,
				};
			}
		}
		resetTransform() {
			if (!i) return;
			const e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
				t = this.projectionDelta && !Cs(this.projectionDelta),
				n = this.getTransformTemplate(),
				r = n ? n(this.latestValues, ``) : void 0,
				a = r !== this.prevTransformTemplateValue;
			e &&
				this.instance &&
				(t || io(this.latestValues) || a) &&
				(i(this.instance, r), (this.shouldResetTransform = !1), this.scheduleRender());
		}
		measure(e = !0) {
			let t = this.measurePageBox(),
				n = this.removeElementScroll(t);
			return (
				e && (n = this.removeTransform(n)),
				Cc(n),
				{ animationId: this.root.animationId, measuredBox: t, layoutBox: n, latestValues: {}, source: this.id }
			);
		}
		measurePageBox() {
			const { visualElement: e } = this.options;
			if (!e) return I();
			const t = e.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(Tc))) {
				const { scroll: e } = this.root;
				e && (ho(t.x, e.offset.x), ho(t.y, e.offset.y));
			}
			return t;
		}
		removeElementScroll(e) {
			const t = I();
			if ((es(t, e), this.scroll?.wasRoot)) return t;
			for (let n = 0; n < this.path.length; n++) {
				const r = this.path[n],
					{ scroll: i, options: a } = r;
				r !== this.root && i && a.layoutScroll && (i.wasRoot && es(t, e), ho(t.x, i.offset.x), ho(t.y, i.offset.y));
			}
			return t;
		}
		applyTransform(e, t = !1) {
			const n = I();
			es(n, e);
			for (let e = 0; e < this.path.length; e++) {
				const r = this.path[e];
				!t &&
					r.options.layoutScroll &&
					r.scroll &&
					r !== r.root &&
					_o(n, { x: -r.scroll.offset.x, y: -r.scroll.offset.y }),
					io(r.latestValues) && _o(n, r.latestValues);
			}
			return io(this.latestValues) && _o(n, this.latestValues), n;
		}
		removeTransform(e) {
			const t = I();
			es(t, e);
			for (let e = 0; e < this.path.length; e++) {
				const n = this.path[e];
				if (!n.instance || !io(n.latestValues)) continue;
				ro(n.latestValues) && n.updateSnapshot();
				const r = I();
				es(r, n.measurePageBox()), xs(t, n.latestValues, n.snapshot ? n.snapshot.layoutBox : void 0, r);
			}
			return io(this.latestValues) && xs(t, this.latestValues), t;
		}
		setTargetDelta(e) {
			(this.targetDelta = e), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0);
		}
		setOptions(e) {
			this.options = { ...this.options, ...e, crossfade: e.crossfade === void 0 ? !0 : e.crossfade };
		}
		clearMeasurements() {
			(this.scroll = void 0),
				(this.layout = void 0),
				(this.snapshot = void 0),
				(this.prevTransformTemplateValue = void 0),
				(this.targetDelta = void 0),
				(this.target = void 0),
				(this.isLayoutDirty = !1);
		}
		forceRelativeParentToResolveTarget() {
			this.relativeParent &&
				this.relativeParent.resolvedRelativeTargetAt !== A.timestamp &&
				this.relativeParent.resolveTargetDelta(!0);
		}
		resolveTargetDelta(e = !1) {
			const t = this.getLead();
			(this.isProjectionDirty ||= t.isProjectionDirty),
				(this.isTransformDirty ||= t.isTransformDirty),
				(this.isSharedProjectionDirty ||= t.isSharedProjectionDirty);
			const n = !!this.resumingFrom || this !== t;
			if (
				!(
					e ||
					(n && this.isSharedProjectionDirty) ||
					this.isProjectionDirty ||
					this.parent?.isProjectionDirty ||
					this.attemptToResolveRelativeTarget ||
					this.root.updateBlockedByResize
				)
			)
				return;
			const { layout: r, layoutId: i } = this.options;
			if (!this.layout || !(r || i)) return;
			this.resolvedRelativeTargetAt = A.timestamp;
			const a = this.getClosestProjectingParent();
			a && this.linkedParentVersion !== a.layoutVersion && !a.options.layoutRoot && this.removeRelativeTarget(),
				!this.targetDelta &&
					!this.relativeTarget &&
					(a && a.layout
						? this.createRelativeTarget(a, this.layout.layoutBox, a.layout.layoutBox)
						: this.removeRelativeTarget()),
				!(!this.relativeTarget && !this.targetDelta) &&
					(this.target || ((this.target = I()), (this.targetWithTransforms = I())),
					this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target
						? (this.forceRelativeParentToResolveTarget(),
							ps(this.target, this.relativeTarget, this.relativeParent.target))
						: this.targetDelta
							? (this.resumingFrom
									? (this.target = this.applyTransform(this.layout.layoutBox))
									: es(this.target, this.layout.layoutBox),
								uo(this.target, this.targetDelta))
							: es(this.target, this.layout.layoutBox),
					this.attemptToResolveRelativeTarget &&
						((this.attemptToResolveRelativeTarget = !1),
						a &&
						!!a.resumingFrom == !!this.resumingFrom &&
						!a.options.layoutScroll &&
						a.target &&
						this.animationProgress !== 1
							? this.createRelativeTarget(a, this.target, a.target)
							: (this.relativeParent = this.relativeTarget = void 0)),
					Ge.value && Ys.calculatedTargetDeltas++);
		}
		getClosestProjectingParent() {
			if (!(!this.parent || ro(this.parent.latestValues) || ao(this.parent.latestValues)))
				return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(e, t, n) {
			(this.relativeParent = e),
				(this.linkedParentVersion = e.layoutVersion),
				this.forceRelativeParentToResolveTarget(),
				(this.relativeTarget = I()),
				(this.relativeTargetOrigin = I()),
				hs(this.relativeTargetOrigin, t, n),
				es(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			let e = this.getLead(),
				t = !!this.resumingFrom || this !== e,
				n = !0;
			if (
				((this.isProjectionDirty || this.parent?.isProjectionDirty) && (n = !1),
				t && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1),
				this.resolvedRelativeTargetAt === A.timestamp && (n = !1),
				n)
			)
				return;
			const { layout: r, layoutId: i } = this.options;
			if (
				((this.isTreeAnimating = !!(
					(this.parent && this.parent.isTreeAnimating) ||
					this.currentAnimation ||
					this.pendingAnimation
				)),
				this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
				!this.layout || !(r || i))
			)
				return;
			es(this.layoutCorrected, this.layout.layoutBox);
			const a = this.treeScale.x,
				o = this.treeScale.y;
			mo(this.layoutCorrected, this.treeScale, this.path, t),
				e.layout &&
					!e.target &&
					(this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
					((e.target = e.layout.layoutBox), (e.targetWithTransforms = I()));
			const { target: s } = e;
			if (!s) {
				this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
				return;
			}
			!this.projectionDelta || !this.prevProjectionDelta
				? this.createProjectionDeltas()
				: (ts(this.prevProjectionDelta.x, this.projectionDelta.x),
					ts(this.prevProjectionDelta.y, this.projectionDelta.y)),
				ds(this.projectionDelta, this.layoutCorrected, s, this.latestValues),
				(this.treeScale.x !== a ||
					this.treeScale.y !== o ||
					!ks(this.projectionDelta.x, this.prevProjectionDelta.x) ||
					!ks(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
					((this.hasProjected = !0), this.scheduleRender(), this.notifyListeners(`projectionUpdate`, s)),
				Ge.value && Ys.calculatedProjections++;
		}
		hide() {
			this.isVisible = !1;
		}
		show() {
			this.isVisible = !0;
		}
		scheduleRender(e = !0) {
			if ((this.options.visualElement?.scheduleRender(), e)) {
				const e = this.getStack();
				e && e.scheduleRender();
			}
			this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
		}
		createProjectionDeltas() {
			(this.prevProjectionDelta = Ma()), (this.projectionDelta = Ma()), (this.projectionDeltaWithTransform = Ma());
		}
		setAnimationOrigin(e, t = !1) {
			const n = this.snapshot,
				r = n ? n.latestValues : {},
				i = { ...this.latestValues },
				a = Ma();
			(!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
				(this.relativeTarget = this.relativeTargetOrigin = void 0),
				(this.attemptToResolveRelativeTarget = !t);
			const o = I(),
				s = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
				c = this.getStack(),
				l = !c || c.members.length <= 1,
				u = !!(s && !l && this.options.crossfade === !0 && !this.path.some(vc));
			this.animationProgress = 0;
			let d;
			(this.mixTargetDelta = (t) => {
				const n = t / 1e3;
				hc(a.x, e.x, n),
					hc(a.y, e.y, n),
					this.setTargetDelta(a),
					this.relativeTarget &&
						this.relativeTargetOrigin &&
						this.layout &&
						this.relativeParent &&
						this.relativeParent.layout &&
						(hs(o, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
						_c(this.relativeTarget, this.relativeTargetOrigin, o, n),
						d && Ts(this.relativeTarget, d) && (this.isProjectionDirty = !1),
						(d ||= I()),
						es(d, this.relativeTarget)),
					s && ((this.animationValues = i), Is(i, r, this.latestValues, n, u, l)),
					this.root.scheduleUpdateProjection(),
					this.scheduleRender(),
					(this.animationProgress = n);
			}),
				this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(e) {
			this.notifyListeners(`animationStart`),
				this.currentAnimation?.stop(),
				this.resumingFrom?.currentAnimation?.stop(),
				(this.pendingAnimation &&= (Ye(this.pendingAnimation), void 0)),
				(this.pendingAnimation = k.update(() => {
					(Js.hasAnimatedSinceResize = !0),
						et.layout++,
						(this.motionValue ||= ci(0)),
						this.motionValue.jump(0, !1),
						(this.currentAnimation = Vs(this.motionValue, [0, 1e3], {
							...e,
							velocity: 0,
							isSync: !0,
							onUpdate: (t) => {
								this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
							},
							onStop: () => {
								et.layout--;
							},
							onComplete: () => {
								et.layout--, e.onComplete && e.onComplete(), this.completeAnimation();
							},
						})),
						this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
						(this.pendingAnimation = void 0);
				}));
		}
		completeAnimation() {
			this.resumingFrom &&
				((this.resumingFrom.currentAnimation = void 0), (this.resumingFrom.preserveOpacity = void 0));
			const e = this.getStack();
			e && e.exitAnimationComplete(),
				(this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
				this.notifyListeners(`animationComplete`);
		}
		finishAnimation() {
			this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Zs), this.currentAnimation.stop()),
				this.completeAnimation();
		}
		applyTransformsToTarget() {
			let e = this.getLead(),
				{ targetWithTransforms: t, target: n, layout: r, latestValues: i } = e;
			if (!(!t || !n || !r)) {
				if (this !== e && this.layout && r && wc(this.options.animationType, this.layout.layoutBox, r.layoutBox)) {
					n = this.target || I();
					const t = cs(this.layout.layoutBox.x);
					(n.x.min = e.target.x.min), (n.x.max = n.x.min + t);
					const r = cs(this.layout.layoutBox.y);
					(n.y.min = e.target.y.min), (n.y.max = n.y.min + r);
				}
				es(t, n), _o(t, i), ds(this.projectionDeltaWithTransform, this.layoutCorrected, t, i);
			}
		}
		registerSharedNode(e, t) {
			this.sharedNodes.has(e) || this.sharedNodes.set(e, new qs()), this.sharedNodes.get(e).add(t);
			const n = t.options.initialPromotionConfig;
			t.promote({
				transition: n ? n.transition : void 0,
				preserveFollowOpacity: n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(t) : void 0,
			});
		}
		isLead() {
			const e = this.getStack();
			return e ? e.lead === this : !0;
		}
		getLead() {
			const { layoutId: e } = this.options;
			return (e && this.getStack()?.lead) || this;
		}
		getPrevLead() {
			const { layoutId: e } = this.options;
			return e ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			const { layoutId: e } = this.options;
			if (e) return this.root.sharedNodes.get(e);
		}
		promote({ needsReset: e, transition: t, preserveFollowOpacity: n } = {}) {
			const r = this.getStack();
			r && r.promote(this, n),
				e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
				t && this.setOptions({ transition: t });
		}
		relegate() {
			const e = this.getStack();
			return e ? e.relegate(this) : !1;
		}
		resetSkewAndRotation() {
			const { visualElement: e } = this.options;
			if (!e) return;
			let t = !1,
				{ latestValues: n } = e;
			if (((n.z || n.rotate || n.rotateX || n.rotateY || n.rotateZ || n.skewX || n.skewY) && (t = !0), !t)) return;
			const r = {};
			n.z && $s(`z`, e, r, this.animationValues);
			for (let t = 0; t < Xs.length; t++)
				$s(`rotate${Xs[t]}`, e, r, this.animationValues), $s(`skew${Xs[t]}`, e, r, this.animationValues);
			for (const t in (e.render(), r))
				e.setStaticValue(t, r[t]), this.animationValues && (this.animationValues[t] = r[t]);
			e.scheduleRender();
		}
		applyProjectionStyles(e, t) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				e.visibility = `hidden`;
				return;
			}
			const n = this.getTransformTemplate();
			if (this.needsReset) {
				(this.needsReset = !1),
					(e.visibility = ``),
					(e.opacity = ``),
					(e.pointerEvents = Ks(t?.pointerEvents) || ``),
					(e.transform = n ? n(this.latestValues, ``) : `none`);
				return;
			}
			const r = this.getLead();
			if (!this.projectionDelta || !this.layout || !r.target) {
				this.options.layoutId &&
					((e.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity),
					(e.pointerEvents = Ks(t?.pointerEvents) || ``)),
					this.hasProjected &&
						!io(this.latestValues) &&
						((e.transform = n ? n({}, ``) : `none`), (this.hasProjected = !1));
				return;
			}
			e.visibility = ``;
			const i = r.animationValues || r.latestValues;
			this.applyTransformsToTarget();
			let a = js(this.projectionDeltaWithTransform, this.treeScale, i);
			n && (a = n(i, a)), (e.transform = a);
			const { x: o, y: s } = this.projectionDelta;
			for (const t in ((e.transformOrigin = `${o.origin * 100}% ${s.origin * 100}% 0`),
			r.animationValues
				? (e.opacity =
						r === this
							? (i.opacity ?? this.latestValues.opacity ?? 1)
							: this.preserveOpacity
								? this.latestValues.opacity
								: i.opacityExit)
				: (e.opacity =
						r === this ? (i.opacity === void 0 ? `` : i.opacity) : i.opacityExit === void 0 ? 0 : i.opacityExit),
			Oo)) {
				if (i[t] === void 0) continue;
				const { correct: n, applyTo: o, isCSSVariable: s } = Oo[t],
					c = a === `none` ? i[t] : n(i[t], r);
				if (o) {
					const t = o.length;
					for (let n = 0; n < t; n++) e[o[n]] = c;
				} else s ? (this.options.visualElement.renderState.vars[t] = c) : (e[t] = c);
			}
			this.options.layoutId && (e.pointerEvents = r === this ? Ks(t?.pointerEvents) || `` : `none`);
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((e) => e.currentAnimation?.stop()),
				this.root.nodes.forEach(sc),
				this.root.sharedNodes.clear();
		}
	};
}
function nc(e) {
	e.updateLayout();
}
function rc(e) {
	const t = e.resumeFrom?.snapshot || e.snapshot;
	if (e.isLead() && e.layout && t && e.hasListeners(`didUpdate`)) {
		const { layoutBox: n, measuredBox: r } = e.layout,
			{ animationType: i } = e.options,
			a = t.source !== e.layout.source;
		i === `size`
			? As((e) => {
					const r = a ? t.measuredBox[e] : t.layoutBox[e],
						i = cs(r);
					(r.min = n[e].min), (r.max = r.min + i);
				})
			: wc(i, t.layoutBox, n) &&
				As((r) => {
					const i = a ? t.measuredBox[r] : t.layoutBox[r],
						o = cs(n[r]);
					(i.max = i.min + o),
						e.relativeTarget &&
							!e.currentAnimation &&
							((e.isProjectionDirty = !0), (e.relativeTarget[r].max = e.relativeTarget[r].min + o));
				});
		const o = Ma();
		ds(o, n, t.layoutBox);
		const s = Ma();
		a ? ds(s, e.applyTransform(r, !0), t.measuredBox) : ds(s, n, t.layoutBox);
		let c = !Cs(o),
			l = !1;
		if (!e.resumeFrom) {
			const r = e.getClosestProjectingParent();
			if (r && !r.resumeFrom) {
				const { snapshot: i, layout: a } = r;
				if (i && a) {
					const o = I();
					hs(o, t.layoutBox, i.layoutBox);
					const s = I();
					hs(s, n, a.layoutBox),
						Ds(o, s) || (l = !0),
						r.options.layoutRoot && ((e.relativeTarget = s), (e.relativeTargetOrigin = o), (e.relativeParent = r));
				}
			}
		}
		e.notifyListeners(`didUpdate`, {
			layout: n,
			snapshot: t,
			delta: s,
			layoutDelta: o,
			hasLayoutChanged: c,
			hasRelativeLayoutChanged: l,
		});
	} else if (e.isLead()) {
		const { onExitComplete: t } = e.options;
		t && t();
	}
	e.options.transition = void 0;
}
function ic(e) {
	Ge.value && Ys.nodes++,
		e.parent &&
			(e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
			(e.isSharedProjectionDirty ||= !!(
				e.isProjectionDirty ||
				e.parent.isProjectionDirty ||
				e.parent.isSharedProjectionDirty
			)),
			(e.isTransformDirty ||= e.parent.isTransformDirty));
}
function ac(e) {
	e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function oc(e) {
	e.clearSnapshot();
}
function sc(e) {
	e.clearMeasurements();
}
function cc(e) {
	e.isLayoutDirty = !1;
}
function lc(e) {
	const { visualElement: t } = e.options;
	t && t.getProps().onBeforeLayoutMeasure && t.notify(`BeforeLayoutMeasure`), e.resetTransform();
}
function uc(e) {
	e.finishAnimation(), (e.targetDelta = e.relativeTarget = e.target = void 0), (e.isProjectionDirty = !0);
}
function dc(e) {
	e.resolveTargetDelta();
}
function fc(e) {
	e.calcProjection();
}
function pc(e) {
	e.resetSkewAndRotation();
}
function mc(e) {
	e.removeLeadSnapshot();
}
function hc(e, t, n) {
	(e.translate = N(t.translate, 0, n)),
		(e.scale = N(t.scale, 1, n)),
		(e.origin = t.origin),
		(e.originPoint = t.originPoint);
}
function gc(e, t, n, r) {
	(e.min = N(t.min, n.min, r)), (e.max = N(t.max, n.max, r));
}
function _c(e, t, n, r) {
	gc(e.x, t.x, n.x, r), gc(e.y, t.y, n.y, r);
}
function vc(e) {
	return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var yc = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
	bc = (e) => typeof navigator < `u` && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
	xc = bc(`applewebkit/`) && !bc(`chrome/`) ? Math.round : O;
function Sc(e) {
	(e.min = xc(e.min)), (e.max = xc(e.max));
}
function Cc(e) {
	Sc(e.x), Sc(e.y);
}
function wc(e, t, n) {
	return e === `position` || (e === `preserve-aspect` && !ls(Os(t), Os(n), 0.2));
}
function Tc(e) {
	return e !== e.root && e.scroll?.wasRoot;
}
var Ec = tc({
		attachResizeListener: (e, t) => Hs(e, `resize`, t),
		measureScroll: () => ({
			x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
			y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
		}),
		checkIsScrollRoot: () => !0,
	}),
	Dc = { current: void 0 },
	Oc = tc({
		measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
		defaultParent: () => {
			if (!Dc.current) {
				const e = new Ec({});
				e.mount(window), e.setOptions({ layoutScroll: !0 }), (Dc.current = e);
			}
			return Dc.current;
		},
		resetTransform: (e, t) => {
			e.style.transform = t === void 0 ? `none` : t;
		},
		checkIsScrollRoot: (e) => window.getComputedStyle(e).position === `fixed`,
	}),
	kc = (0, u.createContext)({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: `never` });
function Ac(e, t) {
	if (typeof e == `function`) return e(t);
	e != null && (e.current = t);
}
function jc(...e) {
	return (t) => {
		let n = !1,
			r = e.map((e) => {
				const r = Ac(e, t);
				return !n && typeof r == `function` && (n = !0), r;
			});
		if (n)
			return () => {
				for (let t = 0; t < r.length; t++) {
					const n = r[t];
					typeof n == `function` ? n() : Ac(e[t], null);
				}
			};
	};
}
function Mc(...e) {
	return u.useCallback(jc(...e), e);
}
var Nc = class extends u.Component {
	getSnapshotBeforeUpdate(e) {
		const t = this.props.childRef.current;
		if (t && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
			const e = t.offsetParent,
				n = (Gi(e) && e.offsetWidth) || 0,
				r = (Gi(e) && e.offsetHeight) || 0,
				i = this.props.sizeRef.current;
			(i.height = t.offsetHeight || 0),
				(i.width = t.offsetWidth || 0),
				(i.top = t.offsetTop),
				(i.left = t.offsetLeft),
				(i.right = n - i.width - i.left),
				(i.bottom = r - i.height - i.top);
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function Pc({ children: e, isPresent: t, anchorX: n, anchorY: r, root: i, pop: a }) {
	const o = (0, u.useId)(),
		s = (0, u.useRef)(null),
		c = (0, u.useRef)({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }),
		{ nonce: d } = (0, u.useContext)(kc),
		f = Mc(s, e.props?.ref ?? e?.ref);
	return (
		(0, u.useInsertionEffect)(() => {
			const { width: e, height: l, top: u, left: f, right: p, bottom: m } = c.current;
			if (t || a === !1 || !s.current || !e || !l) return;
			const h = n === `left` ? `left: ${f}` : `right: ${p}`,
				g = r === `bottom` ? `bottom: ${m}` : `top: ${u}`;
			s.current.dataset.motionPopId = o;
			const _ = document.createElement(`style`);
			d && (_.nonce = d);
			const v = i ?? document.head;
			return (
				v.appendChild(_),
				_.sheet &&
					_.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${l}px !important;
            ${h}px !important;
            ${g}px !important;
          }
        `),
				() => {
					v.contains(_) && v.removeChild(_);
				}
			);
		}, [t]),
		(0, l.jsx)(Nc, {
			isPresent: t,
			childRef: s,
			sizeRef: c,
			pop: a,
			children: a === !1 ? e : u.cloneElement(e, { ref: f }),
		})
	);
}
var Fc = ({
	children: e,
	initial: t,
	isPresent: n,
	onExitComplete: r,
	custom: i,
	presenceAffectsLayout: a,
	mode: o,
	anchorX: s,
	anchorY: c,
	root: d,
}) => {
	let f = ie(Ic),
		p = (0, u.useId)(),
		m = !0,
		h = (0, u.useMemo)(
			() => (
				(m = !1),
				{
					id: p,
					initial: t,
					isPresent: n,
					custom: i,
					onExitComplete: (e) => {
						f.set(e, !0);
						for (const e of f.values()) if (!e) return;
						r && r();
					},
					register: (e) => (f.set(e, !1), () => f.delete(e)),
				}
			),
			[n, f, r],
		);
	return (
		a && m && (h = { ...h }),
		(0, u.useMemo)(() => {
			f.forEach((e, t) => f.set(t, !1));
		}, [n]),
		u.useEffect(() => {
			!n && !f.size && r && r();
		}, [n]),
		(e = (0, l.jsx)(Pc, { pop: o === `popLayout`, isPresent: n, anchorX: s, anchorY: c, root: d, children: e })),
		(0, l.jsx)(se.Provider, { value: h, children: e })
	);
};
function Ic() {
	return new Map();
}
function Lc(e = !0) {
	const t = (0, u.useContext)(se);
	if (t === null) return [!0, null];
	const { isPresent: n, onExitComplete: r, register: i } = t,
		a = (0, u.useId)();
	(0, u.useEffect)(() => {
		if (e) return i(a);
	}, [e]);
	const o = (0, u.useCallback)(() => e && r && r(a), [a, r, e]);
	return !n && r ? [!1, o] : [!0];
}
var Rc = (e) => e.key || ``;
function zc(e) {
	const t = [];
	return (
		u.Children.forEach(e, (e) => {
			(0, u.isValidElement)(e) && t.push(e);
		}),
		t
	);
}
var Bc = ({
		children: e,
		custom: t,
		initial: n = !0,
		onExitComplete: r,
		presenceAffectsLayout: i = !0,
		mode: a = `sync`,
		propagate: o = !1,
		anchorX: s = `left`,
		anchorY: c = `top`,
		root: d,
	}) => {
		const [f, p] = Lc(o),
			m = (0, u.useMemo)(() => zc(e), [e]),
			h = o && !f ? [] : m.map(Rc),
			g = (0, u.useRef)(!0),
			_ = (0, u.useRef)(m),
			v = ie(() => new Map()),
			y = (0, u.useRef)(new Set()),
			[b, x] = (0, u.useState)(m),
			[S, ee] = (0, u.useState)(m);
		oe(() => {
			(g.current = !1), (_.current = m);
			for (let e = 0; e < S.length; e++) {
				const t = Rc(S[e]);
				h.includes(t) ? (v.delete(t), y.current.delete(t)) : v.get(t) !== !0 && v.set(t, !1);
			}
		}, [S, h.length, h.join(`-`)]);
		const C = [];
		if (m !== b) {
			let e = [...m];
			for (let t = 0; t < S.length; t++) {
				const n = S[t],
					r = Rc(n);
				h.includes(r) || (e.splice(t, 0, n), C.push(n));
			}
			return a === `wait` && C.length && (e = C), ee(zc(e)), x(m), null;
		}
		const { forceRender: w } = (0, u.useContext)(re);
		return (0, l.jsx)(l.Fragment, {
			children: S.map((e) => {
				const u = Rc(e),
					b = o && !f ? !1 : m === S || h.includes(u);
				return (0, l.jsx)(
					Fc,
					{
						isPresent: b,
						initial: !g.current || n ? void 0 : !1,
						custom: t,
						presenceAffectsLayout: i,
						mode: a,
						root: d,
						onExitComplete: b
							? void 0
							: () => {
									if (y.current.has(u)) return;
									if ((y.current.add(u), v.has(u))) v.set(u, !0);
									else return;
									let e = !0;
									v.forEach((t) => {
										t || (e = !1);
									}),
										e && (w?.(), ee(_.current), o && p?.(), r && r());
								},
						anchorX: s,
						anchorY: c,
						children: e,
					},
					u,
				);
			}),
		});
	},
	Vc = (0, u.createContext)({ strict: !1 }),
	Hc = {
		animation: [`animate`, `variants`, `whileHover`, `whileTap`, `exit`, `whileInView`, `whileFocus`, `whileDrag`],
		exit: [`exit`],
		drag: [`drag`, `dragControls`],
		focus: [`whileFocus`],
		hover: [`whileHover`, `onHoverStart`, `onHoverEnd`],
		tap: [`whileTap`, `onTap`, `onTapStart`, `onTapCancel`],
		pan: [`onPan`, `onPanStart`, `onPanSessionStart`, `onPanEnd`],
		inView: [`whileInView`, `onViewportEnter`, `onViewportLeave`],
		layout: [`layout`, `layoutId`],
	},
	Uc = !1;
function Wc() {
	if (Uc) return;
	const e = {};
	for (const t in Hc) e[t] = { isEnabled: (e) => Hc[t].some((t) => !!e[t]) };
	Ja(e), (Uc = !0);
}
function Gc() {
	return Wc(), Ya();
}
function Kc(e) {
	const t = Gc();
	for (const n in e) t[n] = { ...t[n], ...e[n] };
	Ja(t);
}
var qc = new Set(
	`animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport`.split(
		`.`,
	),
);
function Jc(e) {
	return (
		e.startsWith(`while`) ||
		(e.startsWith(`drag`) && e !== `draggable`) ||
		e.startsWith(`layout`) ||
		e.startsWith(`onTap`) ||
		e.startsWith(`onPan`) ||
		e.startsWith(`onLayout`) ||
		qc.has(e)
	);
}
var Yc = t({ default: () => Xc }, 1),
	Xc,
	Zc = i(() => {
		throw (
			((Xc = {}), Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion". Is it installed?`))
		);
	}),
	Qc = (e) => !Jc(e);
function $c(e) {
	typeof e == `function` && (Qc = (t) => (t.startsWith(`on`) ? !Jc(t) : e(t)));
}
try {
	$c((Zc(), e(Yc)).default);
} catch {}
function el(e, t, n) {
	const r = {};
	for (const i in e)
		(i === `values` && typeof e.values == `object`) ||
			((Qc(i) || (n === !0 && Jc(i)) || (!t && !Jc(i)) || (e.draggable && i.startsWith(`onDrag`))) && (r[i] = e[i]));
	return r;
}
var tl = (0, u.createContext)({});
function nl(e, t) {
	if (za(e)) {
		const { initial: t, animate: n } = e;
		return { initial: t === !1 || Ia(t) ? t : void 0, animate: Ia(n) ? n : void 0 };
	}
	return e.inherit === !1 ? {} : t;
}
function rl(e) {
	const { initial: t, animate: n } = nl(e, (0, u.useContext)(tl));
	return (0, u.useMemo)(() => ({ initial: t, animate: n }), [il(t), il(n)]);
}
function il(e) {
	return Array.isArray(e) ? e.join(` `) : e;
}
var al = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function ol(e, t, n) {
	for (const r in t) !F(t[r]) && !ko(r, n) && (e[r] = t[r]);
}
function sl({ transformTemplate: e }, t) {
	return (0, u.useMemo)(() => {
		const n = al();
		return Co(n, t, e), Object.assign({}, n.vars, n.style);
	}, [t]);
}
function cl(e, t) {
	const n = e.style || {},
		r = {};
	return ol(r, n, e), Object.assign(r, sl(e, t)), r;
}
function ll(e, t) {
	const n = {},
		r = cl(e, t);
	return (
		e.drag &&
			e.dragListener !== !1 &&
			((n.draggable = !1),
			(r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = `none`),
			(r.touchAction = e.drag === !0 ? `none` : `pan-${e.drag === `x` ? `y` : `x`}`)),
		e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
		(n.style = r),
		n
	);
}
var ul = () => ({ ...al(), attrs: {} });
function dl(e, t, n, r) {
	const i = (0, u.useMemo)(() => {
		const n = ul();
		return Lo(n, t, zo(r), e.transformTemplate, e.style), { ...n.attrs, style: { ...n.style } };
	}, [t]);
	if (e.style) {
		const t = {};
		ol(t, e.style, e), (i.style = { ...t, ...i.style });
	}
	return i;
}
var fl = [
	`animate`,
	`circle`,
	`defs`,
	`desc`,
	`ellipse`,
	`g`,
	`image`,
	`line`,
	`filter`,
	`marker`,
	`mask`,
	`metadata`,
	`path`,
	`pattern`,
	`polygon`,
	`polyline`,
	`rect`,
	`stop`,
	`switch`,
	`symbol`,
	`svg`,
	`text`,
	`tspan`,
	`use`,
	`view`,
];
function pl(e) {
	return typeof e != `string` || e.includes(`-`) ? !1 : !!(fl.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function ml(e, t, n, { latestValues: r }, i, a = !1, o) {
	const s = ((o ?? pl(e)) ? dl : ll)(t, r, i, e),
		c = el(t, typeof e == `string`, a),
		l = e === u.Fragment ? {} : { ...c, ...s, ref: n },
		{ children: d } = t,
		f = (0, u.useMemo)(() => (F(d) ? d.get() : d), [d]);
	return (0, u.createElement)(e, { ...l, children: f });
}
function hl({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, i) {
	return { latestValues: gl(n, r, i, e), renderState: t() };
}
function gl(e, t, n, r) {
	const i = {},
		a = r(e, {});
	for (const e in a) i[e] = Ks(a[e]);
	let { initial: o, animate: s } = e,
		c = za(e),
		l = Ba(e);
	t && l && !c && e.inherit !== !1 && (o === void 0 && (o = t.initial), s === void 0 && (s = t.animate));
	let u = n ? n.initial === !1 : !1;
	u ||= o === !1;
	const d = u ? s : o;
	if (d && typeof d != `boolean` && !Fa(d)) {
		const t = Array.isArray(d) ? d : [d];
		for (let n = 0; n < t.length; n++) {
			const r = ti(e, t[n]);
			if (r) {
				const { transitionEnd: e, transition: t, ...n } = r;
				for (const e in n) {
					let t = n[e];
					if (Array.isArray(t)) {
						const e = u ? t.length - 1 : 0;
						t = t[e];
					}
					t !== null && (i[e] = t);
				}
				for (const t in e) i[t] = e[t];
			}
		}
	}
	return i;
}
var _l = (e) => (t, n) => {
		const r = (0, u.useContext)(tl),
			i = (0, u.useContext)(se),
			a = () => hl(e, t, r, i);
		return n ? a() : ie(a);
	},
	vl = _l({ scrapeMotionValuesFromProps: Ao, createRenderState: al }),
	yl = _l({ scrapeMotionValuesFromProps: Vo, createRenderState: ul }),
	bl = Symbol.for(`motionComponentSymbol`);
function xl(e, t, n) {
	const r = (0, u.useRef)(n);
	(0, u.useInsertionEffect)(() => {
		r.current = n;
	});
	const i = (0, u.useRef)(null);
	return (0, u.useCallback)(
		(n) => {
			n && e.onMount?.(n), t && (n ? t.mount(n) : t.unmount());
			const a = r.current;
			if (typeof a == `function`)
				if (n) {
					const e = a(n);
					typeof e == `function` && (i.current = e);
				} else i.current ? (i.current(), (i.current = null)) : a(n);
			else a && (a.current = n);
		},
		[t],
	);
}
var Sl = (0, u.createContext)({});
function Cl(e) {
	return e && typeof e == `object` && Object.hasOwn(e, `current`);
}
function wl(e, t, n, r, i, a) {
	const { visualElement: o } = (0, u.useContext)(tl),
		s = (0, u.useContext)(Vc),
		c = (0, u.useContext)(se),
		l = (0, u.useContext)(kc),
		d = l.reducedMotion,
		f = l.skipAnimations,
		p = (0, u.useRef)(null),
		m = (0, u.useRef)(!1);
	(r ||= s.renderer),
		!p.current &&
			r &&
			((p.current = r(e, {
				visualState: t,
				parent: o,
				props: n,
				presenceContext: c,
				blockInitialAnimation: c ? c.initial === !1 : !1,
				reducedMotionConfig: d,
				skipAnimations: f,
				isSVG: a,
			})),
			m.current && p.current && (p.current.manuallyAnimateOnMount = !0));
	const h = p.current,
		g = (0, u.useContext)(Sl);
	h && !h.projection && i && (h.type === `html` || h.type === `svg`) && Tl(p.current, n, i, g);
	const _ = (0, u.useRef)(!1);
	(0, u.useInsertionEffect)(() => {
		h && _.current && h.update(n, c);
	});
	const v = n[gi],
		y = (0, u.useRef)(!!v && !window.MotionHandoffIsComplete?.(v) && window.MotionHasOptimisedAnimation?.(v));
	return (
		oe(() => {
			(m.current = !0),
				h &&
					((_.current = !0),
					(window.MotionIsMounted = !0),
					h.updateFeatures(),
					h.scheduleRenderMicrotask(),
					y.current && h.animationState && h.animationState.animateChanges());
		}),
		(0, u.useEffect)(() => {
			h &&
				(!y.current && h.animationState && h.animationState.animateChanges(),
				(y.current &&=
					(queueMicrotask(() => {
						window.MotionHandoffMarkAsComplete?.(v);
					}),
					!1)),
				(h.enteringChildren = void 0));
		}),
		h
	);
}
function Tl(e, t, n, r) {
	const { layoutId: i, layout: a, drag: o, dragConstraints: s, layoutScroll: c, layoutRoot: l, layoutCrossfade: u } = t;
	(e.projection = new n(e.latestValues, t[`data-framer-portal-id`] ? void 0 : El(e.parent))),
		e.projection.setOptions({
			layoutId: i,
			layout: a,
			alwaysMeasureLayout: !!o || (s && Cl(s)),
			visualElement: e,
			animationType: typeof a == `string` ? a : `both`,
			initialPromotionConfig: r,
			crossfade: u,
			layoutScroll: c,
			layoutRoot: l,
		});
}
function El(e) {
	if (e) return e.options.allowProjection === !1 ? El(e.parent) : e.projection;
}
function Dl(e, { forwardMotionProps: t = !1, type: n } = {}, r, i) {
	r && Kc(r);
	const a = n ? n === `svg` : pl(e),
		o = a ? yl : vl;
	function s(n, s) {
		let c,
			d = { ...(0, u.useContext)(kc), ...n, layoutId: Ol(n) },
			{ isStatic: f } = d,
			p = rl(n),
			m = o(n, f);
		if (!f && ae) {
			kl(d, r);
			const t = Al(d);
			(c = t.MeasureLayout), (p.visualElement = wl(e, m, d, i, t.ProjectionNode, a));
		}
		return (0, l.jsxs)(tl.Provider, {
			value: p,
			children: [
				c && p.visualElement ? (0, l.jsx)(c, { visualElement: p.visualElement, ...d }) : null,
				ml(e, n, xl(m, p.visualElement, s), m, f, t, a),
			],
		});
	}
	s.displayName = `motion.${typeof e == `string` ? e : `create(${e.displayName ?? e.name ?? ``})`}`;
	const c = (0, u.forwardRef)(s);
	return (c[bl] = e), c;
}
function Ol({ layoutId: e }) {
	const t = (0, u.useContext)(re).id;
	return t && e !== void 0 ? t + `-` + e : e;
}
function kl(e, t) {
	(0, u.useContext)(Vc).strict;
}
function Al(e) {
	const { drag: t, layout: n } = Gc();
	if (!t && !n) return {};
	const r = { ...t, ...n };
	return {
		MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? r.MeasureLayout : void 0,
		ProjectionNode: r.ProjectionNode,
	};
}
function jl(e, t) {
	if (typeof Proxy > `u`) return Dl;
	const n = new Map(),
		r = (n, r) => Dl(n, r, e, t);
	return new Proxy((e, t) => r(e, t), {
		get: (i, a) => (a === `create` ? r : (n.has(a) || n.set(a, Dl(a, void 0, e, t)), n.get(a))),
	});
}
var Ml = (e, t) => ((t.isSVG ?? pl(e)) ? new Ho(t) : new Mo(t, { allowProjection: e !== u.Fragment })),
	Nl = class extends Qa {
		constructor(e) {
			super(e), (e.animationState ||= Yo(e));
		}
		updateAnimationControlsSubscription() {
			const { animate: e } = this.node.getProps();
			Fa(e) && (this.unmountControls = e.subscribe(this.node));
		}
		mount() {
			this.updateAnimationControlsSubscription();
		}
		update() {
			const { animate: e } = this.node.getProps(),
				{ animate: t } = this.node.prevProps || {};
			e !== t && this.updateAnimationControlsSubscription();
		}
		unmount() {
			this.node.animationState.reset(), this.unmountControls?.();
		}
	},
	Pl = 0,
	Fl = {
		animation: { Feature: Nl },
		exit: {
			Feature: class extends Qa {
				constructor() {
					super(...arguments), (this.id = Pl++);
				}
				update() {
					if (!this.node.presenceContext) return;
					const { isPresent: e, onExitComplete: t } = this.node.presenceContext,
						{ isPresent: n } = this.node.prevPresenceContext || {};
					if (!this.node.animationState || e === n) return;
					const r = this.node.animationState.setActive(`exit`, !e);
					t &&
						!e &&
						r.then(() => {
							t(this.id);
						});
				}
				mount() {
					const { register: e, onExitComplete: t } = this.node.presenceContext || {};
					t && t(this.id), e && (this.unmount = e(this.id));
				}
				unmount() {}
			},
		},
	};
function Il(e) {
	return { point: { x: e.pageX, y: e.pageY } };
}
var Ll = (e) => (t) => ta(t) && e(t, Il(t));
function Rl(e, t, n, r) {
	return Hs(e, t, Ll(n), r);
}
var zl = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
	Bl = (e, t) => Math.abs(e - t);
function Vl(e, t) {
	const n = Bl(e.x, t.x),
		r = Bl(e.y, t.y);
	return Math.sqrt(n ** 2 + r ** 2);
}
var Hl = new Set([`auto`, `scroll`]),
	Ul = class {
		constructor(
			e,
			t,
			{
				transformPagePoint: n,
				contextWindow: r = window,
				dragSnapToOrigin: i = !1,
				distanceThreshold: a = 3,
				element: o,
			} = {},
		) {
			if (
				((this.startEvent = null),
				(this.lastMoveEvent = null),
				(this.lastMoveEventInfo = null),
				(this.handlers = {}),
				(this.contextWindow = window),
				(this.scrollPositions = new Map()),
				(this.removeScrollListeners = null),
				(this.onElementScroll = (e) => {
					this.handleScroll(e.target);
				}),
				(this.onWindowScroll = () => {
					this.handleScroll(window);
				}),
				(this.updatePoint = () => {
					if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
					const e = Kl(this.lastMoveEventInfo, this.history),
						t = this.startEvent !== null,
						n = Vl(e.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
					if (!t && !n) return;
					const { point: r } = e,
						{ timestamp: i } = A;
					this.history.push({ ...r, timestamp: i });
					const { onStart: a, onMove: o } = this.handlers;
					t || (a && a(this.lastMoveEvent, e), (this.startEvent = this.lastMoveEvent)), o && o(this.lastMoveEvent, e);
				}),
				(this.handlePointerMove = (e, t) => {
					(this.lastMoveEvent = e),
						(this.lastMoveEventInfo = Wl(t, this.transformPagePoint)),
						k.update(this.updatePoint, !0);
				}),
				(this.handlePointerUp = (e, t) => {
					this.end();
					const { onEnd: n, onSessionEnd: r, resumeAnimation: i } = this.handlers;
					if (
						((this.dragSnapToOrigin || !this.startEvent) && i && i(), !(this.lastMoveEvent && this.lastMoveEventInfo))
					)
						return;
					const a = Kl(
						e.type === `pointercancel` ? this.lastMoveEventInfo : Wl(t, this.transformPagePoint),
						this.history,
					);
					this.startEvent && n && n(e, a), r && r(e, a);
				}),
				!ta(e))
			)
				return;
			(this.dragSnapToOrigin = i),
				(this.handlers = t),
				(this.transformPagePoint = n),
				(this.distanceThreshold = a),
				(this.contextWindow = r || window);
			const s = Wl(Il(e), this.transformPagePoint),
				{ point: c } = s,
				{ timestamp: l } = A;
			this.history = [{ ...c, timestamp: l }];
			const { onSessionStart: u } = t;
			u && u(e, Kl(s, this.history)),
				(this.removeListeners = ge(
					Rl(this.contextWindow, `pointermove`, this.handlePointerMove),
					Rl(this.contextWindow, `pointerup`, this.handlePointerUp),
					Rl(this.contextWindow, `pointercancel`, this.handlePointerUp),
				)),
				o && this.startScrollTracking(o);
		}
		startScrollTracking(e) {
			let t = e.parentElement;
			for (; t; ) {
				const e = getComputedStyle(t);
				(Hl.has(e.overflowX) || Hl.has(e.overflowY)) &&
					this.scrollPositions.set(t, { x: t.scrollLeft, y: t.scrollTop }),
					(t = t.parentElement);
			}
			this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
				window.addEventListener(`scroll`, this.onElementScroll, { capture: !0 }),
				window.addEventListener(`scroll`, this.onWindowScroll),
				(this.removeScrollListeners = () => {
					window.removeEventListener(`scroll`, this.onElementScroll, { capture: !0 }),
						window.removeEventListener(`scroll`, this.onWindowScroll);
				});
		}
		handleScroll(e) {
			const t = this.scrollPositions.get(e);
			if (!t) return;
			const n = e === window,
				r = n ? { x: window.scrollX, y: window.scrollY } : { x: e.scrollLeft, y: e.scrollTop },
				i = { x: r.x - t.x, y: r.y - t.y };
			(i.x === 0 && i.y === 0) ||
				(n
					? this.lastMoveEventInfo && ((this.lastMoveEventInfo.point.x += i.x), (this.lastMoveEventInfo.point.y += i.y))
					: this.history.length > 0 && ((this.history[0].x -= i.x), (this.history[0].y -= i.y)),
				this.scrollPositions.set(e, r),
				k.update(this.updatePoint, !0));
		}
		updateHandlers(e) {
			this.handlers = e;
		}
		end() {
			this.removeListeners && this.removeListeners(),
				this.removeScrollListeners && this.removeScrollListeners(),
				this.scrollPositions.clear(),
				Ye(this.updatePoint);
		}
	};
function Wl(e, t) {
	return t ? { point: t(e.point) } : e;
}
function Gl(e, t) {
	return { x: e.x - t.x, y: e.y - t.y };
}
function Kl({ point: e }, t) {
	return { point: e, delta: Gl(e, Jl(t)), offset: Gl(e, ql(t)), velocity: Yl(t, 0.1) };
}
function ql(e) {
	return e[0];
}
function Jl(e) {
	return e[e.length - 1];
}
function Yl(e, t) {
	if (e.length < 2) return { x: 0, y: 0 };
	let n = e.length - 1,
		r = null,
		i = Jl(e);
	for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > ye(t))); ) n--;
	if (!r) return { x: 0, y: 0 };
	r === e[0] && e.length > 2 && i.timestamp - r.timestamp > ye(t) * 2 && (r = e[1]);
	const a = be(i.timestamp - r.timestamp);
	if (a === 0) return { x: 0, y: 0 };
	const o = { x: (i.x - r.x) / a, y: (i.y - r.y) / a };
	return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function Xl(e, { min: t, max: n }, r) {
	return (
		t !== void 0 && e < t
			? (e = r ? N(t, e, r.min) : Math.max(e, t))
			: n !== void 0 && e > n && (e = r ? N(n, e, r.max) : Math.min(e, n)),
		e
	);
}
function Zl(e, t, n) {
	return { min: t === void 0 ? void 0 : e.min + t, max: n === void 0 ? void 0 : e.max + n - (e.max - e.min) };
}
function Ql(e, { top: t, left: n, bottom: r, right: i }) {
	return { x: Zl(e.x, n, i), y: Zl(e.y, t, r) };
}
function $l(e, t) {
	let n = t.min - e.min,
		r = t.max - e.max;
	return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function eu(e, t) {
	return { x: $l(e.x, t.x), y: $l(e.y, t.y) };
}
function tu(e, t) {
	let n = 0.5,
		r = cs(e),
		i = cs(t);
	return i > r ? (n = _e(t.min, t.max - r, e.min)) : r > i && (n = _e(e.min, e.max - i, t.min)), E(0, 1, n);
}
function nu(e, t) {
	const n = {};
	return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
var ru = 0.35;
function iu(e = ru) {
	return e === !1 ? (e = 0) : e === !0 && (e = ru), { x: au(e, `left`, `right`), y: au(e, `top`, `bottom`) };
}
function au(e, t, n) {
	return { min: ou(e, t), max: ou(e, n) };
}
function ou(e, t) {
	return typeof e == `number` ? e : e[t] || 0;
}
var su = new WeakMap(),
	cu = class {
		constructor(e) {
			(this.openDragLock = null),
				(this.isDragging = !1),
				(this.currentDirection = null),
				(this.originPoint = { x: 0, y: 0 }),
				(this.constraints = !1),
				(this.hasMutatedConstraints = !1),
				(this.elastic = I()),
				(this.latestPointerEvent = null),
				(this.latestPanInfo = null),
				(this.visualElement = e);
		}
		start(e, { snapToCursor: t = !1, distanceThreshold: n } = {}) {
			const { presenceContext: r } = this.visualElement;
			if (r && r.isPresent === !1) return;
			const i = (e) => {
					t && this.snapToCursor(Il(e).point), this.stopAnimation();
				},
				a = (e, t) => {
					const { drag: n, dragPropagation: r, onDragStart: i } = this.getProps();
					if (n && !r && (this.openDragLock && this.openDragLock(), (this.openDragLock = Xi(n)), !this.openDragLock))
						return;
					(this.latestPointerEvent = e),
						(this.latestPanInfo = t),
						(this.isDragging = !0),
						(this.currentDirection = null),
						this.resolveConstraints(),
						this.visualElement.projection &&
							((this.visualElement.projection.isAnimationBlocked = !0),
							(this.visualElement.projection.target = void 0)),
						As((e) => {
							let t = this.getAxisMotionValue(e).get() || 0;
							if (Ct.test(t)) {
								const { projection: n } = this.visualElement;
								if (n && n.layout) {
									const r = n.layout.layoutBox[e];
									r && (t = cs(r) * (parseFloat(t) / 100));
								}
							}
							this.originPoint[e] = t;
						}),
						i && k.update(() => i(e, t), !1, !0),
						mi(this.visualElement, `transform`);
					const { animationState: a } = this.visualElement;
					a && a.setActive(`whileDrag`, !0);
				},
				o = (e, t) => {
					(this.latestPointerEvent = e), (this.latestPanInfo = t);
					const { dragPropagation: n, dragDirectionLock: r, onDirectionLock: i, onDrag: a } = this.getProps();
					if (!n && !this.openDragLock) return;
					const { offset: o } = t;
					if (r && this.currentDirection === null) {
						(this.currentDirection = fu(o)), this.currentDirection !== null && i && i(this.currentDirection);
						return;
					}
					this.updateAxis(`x`, t.point, o),
						this.updateAxis(`y`, t.point, o),
						this.visualElement.render(),
						a && k.update(() => a(e, t), !1, !0);
				},
				s = (e, t) => {
					(this.latestPointerEvent = e),
						(this.latestPanInfo = t),
						this.stop(e, t),
						(this.latestPointerEvent = null),
						(this.latestPanInfo = null);
				},
				c = () => {
					const { dragSnapToOrigin: e } = this.getProps();
					(e || this.constraints) && this.startAnimation({ x: 0, y: 0 });
				},
				{ dragSnapToOrigin: l } = this.getProps();
			this.panSession = new Ul(
				e,
				{ onSessionStart: i, onStart: a, onMove: o, onSessionEnd: s, resumeAnimation: c },
				{
					transformPagePoint: this.visualElement.getTransformPagePoint(),
					dragSnapToOrigin: l,
					distanceThreshold: n,
					contextWindow: zl(this.visualElement),
					element: this.visualElement.current,
				},
			);
		}
		stop(e, t) {
			const n = e || this.latestPointerEvent,
				r = t || this.latestPanInfo,
				i = this.isDragging;
			if ((this.cancel(), !i || !r || !n)) return;
			const { velocity: a } = r;
			this.startAnimation(a);
			const { onDragEnd: o } = this.getProps();
			o && k.postRender(() => o(n, r));
		}
		cancel() {
			this.isDragging = !1;
			const { projection: e, animationState: t } = this.visualElement;
			e && (e.isAnimationBlocked = !1), this.endPanSession();
			const { dragPropagation: n } = this.getProps();
			!n && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)), t && t.setActive(`whileDrag`, !1);
		}
		endPanSession() {
			this.panSession && this.panSession.end(), (this.panSession = void 0);
		}
		updateAxis(e, t, n) {
			const { drag: r } = this.getProps();
			if (!n || !du(e, r, this.currentDirection)) return;
			let i = this.getAxisMotionValue(e),
				a = this.originPoint[e] + n[e];
			this.constraints && this.constraints[e] && (a = Xl(a, this.constraints[e], this.elastic[e])), i.set(a);
		}
		resolveConstraints() {
			const { dragConstraints: e, dragElastic: t } = this.getProps(),
				n =
					this.visualElement.projection && !this.visualElement.projection.layout
						? this.visualElement.projection.measure(!1)
						: this.visualElement.projection?.layout,
				r = this.constraints;
			e && Cl(e)
				? (this.constraints ||= this.resolveRefConstraints())
				: e && n
					? (this.constraints = Ql(n.layoutBox, e))
					: (this.constraints = !1),
				(this.elastic = iu(t)),
				r !== this.constraints &&
					!Cl(e) &&
					n &&
					this.constraints &&
					!this.hasMutatedConstraints &&
					As((e) => {
						this.constraints !== !1 &&
							this.getAxisMotionValue(e) &&
							(this.constraints[e] = nu(n.layoutBox[e], this.constraints[e]));
					});
		}
		resolveRefConstraints() {
			const { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
			if (!e || !Cl(e)) return !1;
			const n = e.current,
				{ projection: r } = this.visualElement;
			if (!r || !r.layout) return !1;
			let i = yo(n, r.root, this.visualElement.getTransformPagePoint()),
				a = eu(r.layout.layoutBox, i);
			if (t) {
				const e = t(eo(a));
				(this.hasMutatedConstraints = !!e), e && (a = $a(e));
			}
			return a;
		}
		startAnimation(e) {
			const {
					drag: t,
					dragMomentum: n,
					dragElastic: r,
					dragTransition: i,
					dragSnapToOrigin: a,
					onDragTransitionEnd: o,
				} = this.getProps(),
				s = this.constraints || {},
				c = As((o) => {
					if (!du(o, t, this.currentDirection)) return;
					let c = (s && s[o]) || {};
					a && (c = { min: 0, max: 0 });
					const l = r ? 200 : 1e6,
						u = r ? 40 : 1e7,
						d = {
							type: `inertia`,
							velocity: n ? e[o] : 0,
							bounceStiffness: l,
							bounceDamping: u,
							timeConstant: 750,
							restDelta: 1,
							restSpeed: 10,
							...i,
							...c,
						};
					return this.startAxisValueAnimation(o, d);
				});
			return Promise.all(c).then(o);
		}
		startAxisValueAnimation(e, t) {
			const n = this.getAxisMotionValue(e);
			return mi(this.visualElement, e), n.start($r(e, n, 0, t, this.visualElement, !1));
		}
		stopAnimation() {
			As((e) => this.getAxisMotionValue(e).stop());
		}
		getAxisMotionValue(e) {
			const t = `_drag${e.toUpperCase()}`,
				n = this.visualElement.getProps();
			return n[t] || this.visualElement.getValue(e, (n.initial ? n.initial[e] : void 0) || 0);
		}
		snapToCursor(e) {
			As((t) => {
				const { drag: n } = this.getProps();
				if (!du(t, n, this.currentDirection)) return;
				const { projection: r } = this.visualElement,
					i = this.getAxisMotionValue(t);
				if (r && r.layout) {
					const { min: n, max: a } = r.layout.layoutBox[t],
						o = i.get() || 0;
					i.set(e[t] - N(n, a, 0.5) + o);
				}
			});
		}
		scalePositionWithinConstraints() {
			if (!this.visualElement.current) return;
			const { drag: e, dragConstraints: t } = this.getProps(),
				{ projection: n } = this.visualElement;
			if (!Cl(t) || !n || !this.constraints) return;
			this.stopAnimation();
			const r = { x: 0, y: 0 };
			As((e) => {
				const t = this.getAxisMotionValue(e);
				if (t && this.constraints !== !1) {
					const n = t.get();
					r[e] = tu({ min: n, max: n }, this.constraints[e]);
				}
			});
			const { transformTemplate: i } = this.visualElement.getProps();
			(this.visualElement.current.style.transform = i ? i({}, ``) : `none`),
				n.root && n.root.updateScroll(),
				n.updateLayout(),
				(this.constraints = !1),
				this.resolveConstraints(),
				As((t) => {
					if (!du(t, e, null)) return;
					const n = this.getAxisMotionValue(t),
						{ min: i, max: a } = this.constraints[t];
					n.set(N(i, a, r[t]));
				}),
				this.visualElement.render();
		}
		addListeners() {
			if (!this.visualElement.current) return;
			su.set(this.visualElement, this);
			let e = this.visualElement.current,
				t = Rl(e, `pointerdown`, (t) => {
					const { drag: n, dragListener: r = !0 } = this.getProps(),
						i = t.target,
						a = i !== e && aa(i);
					n && r && !a && this.start(t);
				}),
				n,
				r = () => {
					const { dragConstraints: t } = this.getProps();
					Cl(t) &&
						t.current &&
						((this.constraints = this.resolveRefConstraints()),
						(n ||= uu(e, t.current, () => this.scalePositionWithinConstraints())));
				},
				{ projection: i } = this.visualElement,
				a = i.addEventListener(`measure`, r);
			i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), k.read(r);
			const o = Hs(window, `resize`, () => this.scalePositionWithinConstraints()),
				s = i.addEventListener(`didUpdate`, ({ delta: e, hasLayoutChanged: t }) => {
					this.isDragging &&
						t &&
						(As((t) => {
							const n = this.getAxisMotionValue(t);
							n && ((this.originPoint[t] += e[t].translate), n.set(n.get() + e[t].translate));
						}),
						this.visualElement.render());
				});
			return () => {
				o(), t(), a(), s && s(), n && n();
			};
		}
		getProps() {
			const e = this.visualElement.getProps(),
				{
					drag: t = !1,
					dragDirectionLock: n = !1,
					dragPropagation: r = !1,
					dragConstraints: i = !1,
					dragElastic: a = ru,
					dragMomentum: o = !0,
				} = e;
			return {
				...e,
				drag: t,
				dragDirectionLock: n,
				dragPropagation: r,
				dragConstraints: i,
				dragElastic: a,
				dragMomentum: o,
			};
		}
	};
function lu(e) {
	let t = !0;
	return () => {
		if (t) {
			t = !1;
			return;
		}
		e();
	};
}
function uu(e, t, n) {
	const r = Da(e, lu(n)),
		i = Da(t, lu(n));
	return () => {
		r(), i();
	};
}
function du(e, t, n) {
	return (t === !0 || t === e) && (n === null || n === e);
}
function fu(e, t = 10) {
	let n = null;
	return Math.abs(e.y) > t ? (n = `y`) : Math.abs(e.x) > t && (n = `x`), n;
}
var pu = class extends Qa {
		constructor(e) {
			super(e), (this.removeGroupControls = O), (this.removeListeners = O), (this.controls = new cu(e));
		}
		mount() {
			const { dragControls: e } = this.node.getProps();
			e && (this.removeGroupControls = e.subscribe(this.controls)),
				(this.removeListeners = this.controls.addListeners() || O);
		}
		update() {
			const { dragControls: e } = this.node.getProps(),
				{ dragControls: t } = this.node.prevProps || {};
			e !== t && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
		}
		unmount() {
			this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
		}
	},
	mu = (e) => (t, n) => {
		e && k.update(() => e(t, n), !1, !0);
	},
	hu = class extends Qa {
		constructor() {
			super(...arguments), (this.removePointerDownListener = O);
		}
		onPointerDown(e) {
			this.session = new Ul(e, this.createPanHandlers(), {
				transformPagePoint: this.node.getTransformPagePoint(),
				contextWindow: zl(this.node),
			});
		}
		createPanHandlers() {
			const { onPanSessionStart: e, onPanStart: t, onPan: n, onPanEnd: r } = this.node.getProps();
			return {
				onSessionStart: mu(e),
				onStart: mu(t),
				onMove: mu(n),
				onEnd: (e, t) => {
					delete this.session, r && k.postRender(() => r(e, t));
				},
			};
		}
		mount() {
			this.removePointerDownListener = Rl(this.node.current, `pointerdown`, (e) => this.onPointerDown(e));
		}
		update() {
			this.session && this.session.updateHandlers(this.createPanHandlers());
		}
		unmount() {
			this.removePointerDownListener(), this.session && this.session.end();
		}
	},
	gu = !1,
	_u = class extends u.Component {
		componentDidMount() {
			const { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props,
				{ projection: i } = e;
			i &&
				(t.group && t.group.add(i),
				n && n.register && r && n.register(i),
				gu && i.root.didUpdate(),
				i.addEventListener(`animationComplete`, () => {
					this.safeToRemove();
				}),
				i.setOptions({
					...i.options,
					layoutDependency: this.props.layoutDependency,
					onExitComplete: () => this.safeToRemove(),
				})),
				(Js.hasEverUpdated = !0);
		}
		getSnapshotBeforeUpdate(e) {
			const { layoutDependency: t, visualElement: n, drag: r, isPresent: i } = this.props,
				{ projection: a } = n;
			return a
				? ((a.isPresent = i),
					e.layoutDependency !== t && a.setOptions({ ...a.options, layoutDependency: t }),
					(gu = !0),
					r || e.layoutDependency !== t || t === void 0 || e.isPresent !== i ? a.willUpdate() : this.safeToRemove(),
					e.isPresent !== i &&
						(i
							? a.promote()
							: a.relegate() ||
								k.postRender(() => {
									const e = a.getStack();
									(!e || !e.members.length) && this.safeToRemove();
								})),
					null)
				: null;
		}
		componentDidUpdate() {
			const { projection: e } = this.props.visualElement;
			e &&
				(e.root.didUpdate(),
				Ki.postRender(() => {
					!e.currentAnimation && e.isLead() && this.safeToRemove();
				}));
		}
		componentWillUnmount() {
			const { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props,
				{ projection: r } = e;
			(gu = !0),
				r && (r.scheduleCheckAfterUnmount(), t && t.group && t.group.remove(r), n && n.deregister && n.deregister(r));
		}
		safeToRemove() {
			const { safeToRemove: e } = this.props;
			e && e();
		}
		render() {
			return null;
		}
	};
function vu(e) {
	const [t, n] = Lc(),
		r = (0, u.useContext)(re);
	return (0, l.jsx)(_u, {
		...e,
		layoutGroup: r,
		switchLayoutGroup: (0, u.useContext)(Sl),
		isPresent: t,
		safeToRemove: n,
	});
}
var yu = { pan: { Feature: hu }, drag: { Feature: pu, ProjectionNode: Oc, MeasureLayout: vu } };
function bu(e, t, n) {
	const { props: r } = e;
	e.animationState && r.whileHover && e.animationState.setActive(`whileHover`, n === `Start`);
	const i = r[`onHover` + n];
	i && k.postRender(() => i(t, Il(t)));
}
var xu = class extends Qa {
		mount() {
			const { current: e } = this.node;
			e && (this.unmount = $i(e, (e, t) => (bu(this.node, t, `Start`), (e) => bu(this.node, e, `End`))));
		}
		unmount() {}
	},
	Su = class extends Qa {
		constructor() {
			super(...arguments), (this.isActive = !1);
		}
		onFocus() {
			let e = !1;
			try {
				e = this.node.current.matches(`:focus-visible`);
			} catch {
				e = !0;
			}
			!e || !this.node.animationState || (this.node.animationState.setActive(`whileFocus`, !0), (this.isActive = !0));
		}
		onBlur() {
			!this.isActive ||
				!this.node.animationState ||
				(this.node.animationState.setActive(`whileFocus`, !1), (this.isActive = !1));
		}
		mount() {
			this.unmount = ge(
				Hs(this.node.current, `focus`, () => this.onFocus()),
				Hs(this.node.current, `blur`, () => this.onBlur()),
			);
		}
		unmount() {}
	};
function Cu(e, t, n) {
	const { props: r } = e;
	if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
	e.animationState && r.whileTap && e.animationState.setActive(`whileTap`, n === `Start`);
	const i = r[`onTap` + (n === `End` ? `` : n)];
	i && k.postRender(() => i(t, Il(t)));
}
var wu = class extends Qa {
		mount() {
			const { current: e } = this.node;
			if (!e) return;
			const { globalTapTarget: t, propagate: n } = this.node.props;
			this.unmount = fa(
				e,
				(e, t) => (Cu(this.node, t, `Start`), (e, { success: t }) => Cu(this.node, e, t ? `End` : `Cancel`)),
				{ useGlobalTarget: t, stopPropagation: n?.tap === !1 },
			);
		}
		unmount() {}
	},
	Tu = new WeakMap(),
	Eu = new WeakMap(),
	Du = (e) => {
		const t = Tu.get(e.target);
		t && t(e);
	},
	Ou = (e) => {
		e.forEach(Du);
	};
function ku({ root: e, ...t }) {
	const n = e || document;
	Eu.has(n) || Eu.set(n, {});
	const r = Eu.get(n),
		i = JSON.stringify(t);
	return r[i] || (r[i] = new IntersectionObserver(Ou, { root: e, ...t })), r[i];
}
function Au(e, t, n) {
	const r = ku(t);
	return (
		Tu.set(e, n),
		r.observe(e),
		() => {
			Tu.delete(e), r.unobserve(e);
		}
	);
}
var ju = { some: 0, all: 1 },
	Mu = class extends Qa {
		constructor() {
			super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
		}
		startObserver() {
			this.unmount();
			const { viewport: e = {} } = this.node.getProps(),
				{ root: t, margin: n, amount: r = `some`, once: i } = e,
				a = { root: t ? t.current : void 0, rootMargin: n, threshold: typeof r == `number` ? r : ju[r] };
			return Au(this.node.current, a, (e) => {
				const { isIntersecting: t } = e;
				if (this.isInView === t || ((this.isInView = t), i && !t && this.hasEnteredView)) return;
				t && (this.hasEnteredView = !0),
					this.node.animationState && this.node.animationState.setActive(`whileInView`, t);
				const { onViewportEnter: n, onViewportLeave: r } = this.node.getProps(),
					a = t ? n : r;
				a && a(e);
			});
		}
		mount() {
			this.startObserver();
		}
		update() {
			if (typeof IntersectionObserver > `u`) return;
			const { props: e, prevProps: t } = this.node;
			[`amount`, `margin`, `root`].some(Nu(e, t)) && this.startObserver();
		}
		unmount() {}
	};
function Nu({ viewport: e = {} }, { viewport: t = {} } = {}) {
	return (n) => e[n] !== t[n];
}
var Pu = { inView: { Feature: Mu }, tap: { Feature: wu }, focus: { Feature: Su }, hover: { Feature: xu } },
	Fu = { layout: { ProjectionNode: Oc, MeasureLayout: vu } },
	Iu = jl({ ...Fl, ...Pu, ...yu, ...Fu }, Ml),
	Lu = (e, t) => {
		const n = Array(e.length + t.length);
		for (let t = 0; t < e.length; t++) n[t] = e[t];
		for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
		return n;
	},
	Ru = (e, t) => ({ classGroupId: e, validator: t }),
	zu = (e = new Map(), t = null, n) => ({ nextPart: e, validators: t, classGroupId: n }),
	Bu = `-`,
	Vu = [],
	Hu = `arbitrary..`,
	Uu = (e) => {
		const t = Ku(e),
			{ conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
		return {
			getClassGroupId: (e) => {
				if (e.startsWith(`[`) && e.endsWith(`]`)) return Gu(e);
				const n = e.split(Bu);
				return Wu(n, n[0] === `` && n.length > 1 ? 1 : 0, t);
			},
			getConflictingClassGroupIds: (e, t) => {
				if (t) {
					const t = r[e],
						i = n[e];
					return t ? (i ? Lu(i, t) : t) : i || Vu;
				}
				return n[e] || Vu;
			},
		};
	},
	Wu = (e, t, n) => {
		if (e.length - t === 0) return n.classGroupId;
		const r = e[t],
			i = n.nextPart.get(r);
		if (i) {
			const n = Wu(e, t + 1, i);
			if (n) return n;
		}
		const a = n.validators;
		if (a === null) return;
		const o = t === 0 ? e.join(Bu) : e.slice(t).join(Bu),
			s = a.length;
		for (let e = 0; e < s; e++) {
			const t = a[e];
			if (t.validator(o)) return t.classGroupId;
		}
	},
	Gu = (e) =>
		e.slice(1, -1).indexOf(`:`) === -1
			? void 0
			: (() => {
					const t = e.slice(1, -1),
						n = t.indexOf(`:`),
						r = t.slice(0, n);
					return r ? Hu + r : void 0;
				})(),
	Ku = (e) => {
		const { theme: t, classGroups: n } = e;
		return qu(n, t);
	},
	qu = (e, t) => {
		const n = zu();
		for (const r in e) {
			const i = e[r];
			Ju(i, n, r, t);
		}
		return n;
	},
	Ju = (e, t, n, r) => {
		const i = e.length;
		for (let a = 0; a < i; a++) {
			const i = e[a];
			Yu(i, t, n, r);
		}
	},
	Yu = (e, t, n, r) => {
		if (typeof e == `string`) {
			Xu(e, t, n);
			return;
		}
		if (typeof e == `function`) {
			Zu(e, t, n, r);
			return;
		}
		Qu(e, t, n, r);
	},
	Xu = (e, t, n) => {
		const r = e === `` ? t : $u(t, e);
		r.classGroupId = n;
	},
	Zu = (e, t, n, r) => {
		if (ed(e)) {
			Ju(e(r), t, n, r);
			return;
		}
		t.validators === null && (t.validators = []), t.validators.push(Ru(n, e));
	},
	Qu = (e, t, n, r) => {
		const i = Object.entries(e),
			a = i.length;
		for (let e = 0; e < a; e++) {
			const [a, o] = i[e];
			Ju(o, $u(t, a), n, r);
		}
	},
	$u = (e, t) => {
		let n = e,
			r = t.split(Bu),
			i = r.length;
		for (let e = 0; e < i; e++) {
			let t = r[e],
				i = n.nextPart.get(t);
			i || ((i = zu()), n.nextPart.set(t, i)), (n = i);
		}
		return n;
	},
	ed = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
	td = (e) => {
		if (e < 1) return { get: () => void 0, set: () => {} };
		let t = 0,
			n = Object.create(null),
			r = Object.create(null),
			i = (i, a) => {
				(n[i] = a), t++, t > e && ((t = 0), (r = n), (n = Object.create(null)));
			};
		return {
			get(e) {
				let t = n[e];
				if (t !== void 0) return t;
				if ((t = r[e]) !== void 0) return i(e, t), t;
			},
			set(e, t) {
				e in n ? (n[e] = t) : i(e, t);
			},
		};
	},
	nd = `!`,
	rd = `:`,
	id = [],
	ad = (e, t, n, r, i) => ({
		modifiers: e,
		hasImportantModifier: t,
		baseClassName: n,
		maybePostfixModifierPosition: r,
		isExternal: i,
	}),
	od = (e) => {
		let { prefix: t, experimentalParseClassName: n } = e,
			r = (e) => {
				let t = [],
					n = 0,
					r = 0,
					i = 0,
					a,
					o = e.length;
				for (let s = 0; s < o; s++) {
					const o = e[s];
					if (n === 0 && r === 0) {
						if (o === rd) {
							t.push(e.slice(i, s)), (i = s + 1);
							continue;
						}
						if (o === `/`) {
							a = s;
							continue;
						}
					}
					o === `[` ? n++ : o === `]` ? n-- : o === `(` ? r++ : o === `)` && r--;
				}
				let s = t.length === 0 ? e : e.slice(i),
					c = s,
					l = !1;
				s.endsWith(nd) ? ((c = s.slice(0, -1)), (l = !0)) : s.startsWith(nd) && ((c = s.slice(1)), (l = !0));
				const u = a && a > i ? a - i : void 0;
				return ad(t, l, c, u);
			};
		if (t) {
			const e = t + rd,
				n = r;
			r = (t) => (t.startsWith(e) ? n(t.slice(e.length)) : ad(id, !1, t, void 0, !0));
		}
		if (n) {
			const e = r;
			r = (t) => n({ className: t, parseClassName: e });
		}
		return r;
	},
	sd = (e) => {
		const t = new Map();
		return (
			e.orderSensitiveModifiers.forEach((e, n) => {
				t.set(e, 1e6 + n);
			}),
			(e) => {
				let n = [],
					r = [];
				for (let i = 0; i < e.length; i++) {
					const a = e[i],
						o = a[0] === `[`,
						s = t.has(a);
					o || s ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])), n.push(a)) : r.push(a);
				}
				return r.length > 0 && (r.sort(), n.push(...r)), n;
			}
		);
	},
	cd = (e) => ({ cache: td(e.cacheSize), parseClassName: od(e), sortModifiers: sd(e), ...Uu(e) }),
	ld = /\s+/,
	ud = (e, t) => {
		let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a } = t,
			o = [],
			s = e.trim().split(ld),
			c = ``;
		for (let e = s.length - 1; e >= 0; --e) {
			const t = s[e],
				{
					isExternal: l,
					modifiers: u,
					hasImportantModifier: d,
					baseClassName: f,
					maybePostfixModifierPosition: p,
				} = n(t);
			if (l) {
				c = t + (c.length > 0 ? ` ` + c : c);
				continue;
			}
			let m = !!p,
				h = r(m ? f.substring(0, p) : f);
			if (!h) {
				if (!m) {
					c = t + (c.length > 0 ? ` ` + c : c);
					continue;
				}
				if (((h = r(f)), !h)) {
					c = t + (c.length > 0 ? ` ` + c : c);
					continue;
				}
				m = !1;
			}
			const g = u.length === 0 ? `` : u.length === 1 ? u[0] : a(u).join(`:`),
				_ = d ? g + nd : g,
				v = _ + h;
			if (o.indexOf(v) > -1) continue;
			o.push(v);
			const y = i(h, m);
			for (let e = 0; e < y.length; ++e) {
				const t = y[e];
				o.push(_ + t);
			}
			c = t + (c.length > 0 ? ` ` + c : c);
		}
		return c;
	},
	dd = (...e) => {
		let t = 0,
			n,
			r,
			i = ``;
		for (; t < e.length; ) (n = e[t++]) && (r = fd(n)) && (i && (i += ` `), (i += r));
		return i;
	},
	fd = (e) => {
		if (typeof e == `string`) return e;
		let t,
			n = ``;
		for (let r = 0; r < e.length; r++) e[r] && (t = fd(e[r])) && (n && (n += ` `), (n += t));
		return n;
	},
	pd = (e, ...t) => {
		let n,
			r,
			i,
			a,
			o = (o) => ((n = cd(t.reduce((e, t) => t(e), e()))), (r = n.cache.get), (i = n.cache.set), (a = s), s(o)),
			s = (e) => {
				const t = r(e);
				if (t) return t;
				const a = ud(e, n);
				return i(e, a), a;
			};
		return (a = o), (...e) => a(dd(...e));
	},
	md = [],
	L = (e) => {
		const t = (t) => t[e] || md;
		return (t.isThemeGetter = !0), t;
	},
	hd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
	gd = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
	_d = /^\d+\/\d+$/,
	vd = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	yd =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
	bd = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
	xd = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
	Sd = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
	Cd = (e) => _d.test(e),
	R = (e) => !!e && !Number.isNaN(Number(e)),
	wd = (e) => !!e && Number.isInteger(Number(e)),
	Td = (e) => e.endsWith(`%`) && R(e.slice(0, -1)),
	Ed = (e) => vd.test(e),
	Dd = () => !0,
	Od = (e) => yd.test(e) && !bd.test(e),
	kd = () => !1,
	Ad = (e) => xd.test(e),
	jd = (e) => Sd.test(e),
	Md = (e) => !z(e) && !B(e),
	Nd = (e) => Gd(e, Yd, kd),
	z = (e) => hd.test(e),
	Pd = (e) => Gd(e, Xd, Od),
	Fd = (e) => Gd(e, Zd, R),
	Id = (e) => Gd(e, qd, kd),
	Ld = (e) => Gd(e, Jd, jd),
	Rd = (e) => Gd(e, $d, Ad),
	B = (e) => gd.test(e),
	zd = (e) => Kd(e, Xd),
	Bd = (e) => Kd(e, Qd),
	Vd = (e) => Kd(e, qd),
	Hd = (e) => Kd(e, Yd),
	Ud = (e) => Kd(e, Jd),
	Wd = (e) => Kd(e, $d, !0),
	Gd = (e, t, n) => {
		const r = hd.exec(e);
		return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
	},
	Kd = (e, t, n = !1) => {
		const r = gd.exec(e);
		return r ? (r[1] ? t(r[1]) : n) : !1;
	},
	qd = (e) => e === `position` || e === `percentage`,
	Jd = (e) => e === `image` || e === `url`,
	Yd = (e) => e === `length` || e === `size` || e === `bg-size`,
	Xd = (e) => e === `length`,
	Zd = (e) => e === `number`,
	Qd = (e) => e === `family-name`,
	$d = (e) => e === `shadow`,
	ef = pd(() => {
		const e = L(`color`),
			t = L(`font`),
			n = L(`text`),
			r = L(`font-weight`),
			i = L(`tracking`),
			a = L(`leading`),
			o = L(`breakpoint`),
			s = L(`container`),
			c = L(`spacing`),
			l = L(`radius`),
			u = L(`shadow`),
			d = L(`inset-shadow`),
			f = L(`text-shadow`),
			p = L(`drop-shadow`),
			m = L(`blur`),
			h = L(`perspective`),
			g = L(`aspect`),
			_ = L(`ease`),
			v = L(`animate`),
			y = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
			b = () => [
				`center`,
				`top`,
				`bottom`,
				`left`,
				`right`,
				`top-left`,
				`left-top`,
				`top-right`,
				`right-top`,
				`bottom-right`,
				`right-bottom`,
				`bottom-left`,
				`left-bottom`,
			],
			x = () => [...b(), B, z],
			S = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
			ee = () => [`auto`, `contain`, `none`],
			C = () => [B, z, c],
			w = () => [Cd, `full`, `auto`, ...C()],
			te = () => [wd, `none`, `subgrid`, B, z],
			ne = () => [`auto`, { span: [`full`, wd, B, z] }, wd, B, z],
			re = () => [wd, `auto`, B, z],
			ie = () => [`auto`, `min`, `max`, `fr`, B, z],
			ae = () => [
				`start`,
				`end`,
				`center`,
				`between`,
				`around`,
				`evenly`,
				`stretch`,
				`baseline`,
				`center-safe`,
				`end-safe`,
			],
			oe = () => [`start`, `end`, `center`, `stretch`, `center-safe`, `end-safe`],
			se = () => [`auto`, ...C()],
			ce = () => [Cd, `auto`, `full`, `dvw`, `dvh`, `lvw`, `lvh`, `svw`, `svh`, `min`, `max`, `fit`, ...C()],
			T = () => [e, B, z],
			le = () => [...b(), Vd, Id, { position: [B, z] }],
			E = () => [`no-repeat`, { repeat: [``, `x`, `y`, `space`, `round`] }],
			ue = () => [`auto`, `cover`, `contain`, Hd, Nd, { size: [B, z] }],
			de = () => [Td, zd, Pd],
			D = () => [``, `none`, `full`, l, B, z],
			fe = () => [``, R, zd, Pd],
			pe = () => [`solid`, `dashed`, `dotted`, `double`],
			me = () => [
				`normal`,
				`multiply`,
				`screen`,
				`overlay`,
				`darken`,
				`lighten`,
				`color-dodge`,
				`color-burn`,
				`hard-light`,
				`soft-light`,
				`difference`,
				`exclusion`,
				`hue`,
				`saturation`,
				`color`,
				`luminosity`,
			],
			O = () => [R, Td, Vd, Id],
			he = () => [``, `none`, m, B, z],
			ge = () => [`none`, R, B, z],
			_e = () => [`none`, R, B, z],
			ve = () => [R, B, z],
			ye = () => [Cd, `full`, ...C()];
		return {
			cacheSize: 500,
			theme: {
				animate: [`spin`, `ping`, `pulse`, `bounce`],
				aspect: [`video`],
				blur: [Ed],
				breakpoint: [Ed],
				color: [Dd],
				container: [Ed],
				"drop-shadow": [Ed],
				ease: [`in`, `out`, `in-out`],
				font: [Md],
				"font-weight": [`thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`],
				"inset-shadow": [Ed],
				leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
				perspective: [`dramatic`, `near`, `normal`, `midrange`, `distant`, `none`],
				radius: [Ed],
				shadow: [Ed],
				spacing: [`px`, R],
				text: [Ed],
				"text-shadow": [Ed],
				tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`],
			},
			classGroups: {
				aspect: [{ aspect: [`auto`, `square`, Cd, z, B, g] }],
				container: [`container`],
				columns: [{ columns: [R, z, B, s] }],
				"break-after": [{ "break-after": y() }],
				"break-before": [{ "break-before": y() }],
				"break-inside": [{ "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`] }],
				"box-decoration": [{ "box-decoration": [`slice`, `clone`] }],
				box: [{ box: [`border`, `content`] }],
				display: [
					`block`,
					`inline-block`,
					`inline`,
					`flex`,
					`inline-flex`,
					`table`,
					`inline-table`,
					`table-caption`,
					`table-cell`,
					`table-column`,
					`table-column-group`,
					`table-footer-group`,
					`table-header-group`,
					`table-row-group`,
					`table-row`,
					`flow-root`,
					`grid`,
					`inline-grid`,
					`contents`,
					`list-item`,
					`hidden`,
				],
				sr: [`sr-only`, `not-sr-only`],
				float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
				clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
				isolation: [`isolate`, `isolation-auto`],
				"object-fit": [{ object: [`contain`, `cover`, `fill`, `none`, `scale-down`] }],
				"object-position": [{ object: x() }],
				overflow: [{ overflow: S() }],
				"overflow-x": [{ "overflow-x": S() }],
				"overflow-y": [{ "overflow-y": S() }],
				overscroll: [{ overscroll: ee() }],
				"overscroll-x": [{ "overscroll-x": ee() }],
				"overscroll-y": [{ "overscroll-y": ee() }],
				position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
				inset: [{ inset: w() }],
				"inset-x": [{ "inset-x": w() }],
				"inset-y": [{ "inset-y": w() }],
				start: [{ start: w() }],
				end: [{ end: w() }],
				top: [{ top: w() }],
				right: [{ right: w() }],
				bottom: [{ bottom: w() }],
				left: [{ left: w() }],
				visibility: [`visible`, `invisible`, `collapse`],
				z: [{ z: [wd, `auto`, B, z] }],
				basis: [{ basis: [Cd, `full`, `auto`, s, ...C()] }],
				"flex-direction": [{ flex: [`row`, `row-reverse`, `col`, `col-reverse`] }],
				"flex-wrap": [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
				flex: [{ flex: [R, Cd, `auto`, `initial`, `none`, z] }],
				grow: [{ grow: [``, R, B, z] }],
				shrink: [{ shrink: [``, R, B, z] }],
				order: [{ order: [wd, `first`, `last`, `none`, B, z] }],
				"grid-cols": [{ "grid-cols": te() }],
				"col-start-end": [{ col: ne() }],
				"col-start": [{ "col-start": re() }],
				"col-end": [{ "col-end": re() }],
				"grid-rows": [{ "grid-rows": te() }],
				"row-start-end": [{ row: ne() }],
				"row-start": [{ "row-start": re() }],
				"row-end": [{ "row-end": re() }],
				"grid-flow": [{ "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`] }],
				"auto-cols": [{ "auto-cols": ie() }],
				"auto-rows": [{ "auto-rows": ie() }],
				gap: [{ gap: C() }],
				"gap-x": [{ "gap-x": C() }],
				"gap-y": [{ "gap-y": C() }],
				"justify-content": [{ justify: [...ae(), `normal`] }],
				"justify-items": [{ "justify-items": [...oe(), `normal`] }],
				"justify-self": [{ "justify-self": [`auto`, ...oe()] }],
				"align-content": [{ content: [`normal`, ...ae()] }],
				"align-items": [{ items: [...oe(), { baseline: [``, `last`] }] }],
				"align-self": [{ self: [`auto`, ...oe(), { baseline: [``, `last`] }] }],
				"place-content": [{ "place-content": ae() }],
				"place-items": [{ "place-items": [...oe(), `baseline`] }],
				"place-self": [{ "place-self": [`auto`, ...oe()] }],
				p: [{ p: C() }],
				px: [{ px: C() }],
				py: [{ py: C() }],
				ps: [{ ps: C() }],
				pe: [{ pe: C() }],
				pt: [{ pt: C() }],
				pr: [{ pr: C() }],
				pb: [{ pb: C() }],
				pl: [{ pl: C() }],
				m: [{ m: se() }],
				mx: [{ mx: se() }],
				my: [{ my: se() }],
				ms: [{ ms: se() }],
				me: [{ me: se() }],
				mt: [{ mt: se() }],
				mr: [{ mr: se() }],
				mb: [{ mb: se() }],
				ml: [{ ml: se() }],
				"space-x": [{ "space-x": C() }],
				"space-x-reverse": [`space-x-reverse`],
				"space-y": [{ "space-y": C() }],
				"space-y-reverse": [`space-y-reverse`],
				size: [{ size: ce() }],
				w: [{ w: [s, `screen`, ...ce()] }],
				"min-w": [{ "min-w": [s, `screen`, `none`, ...ce()] }],
				"max-w": [{ "max-w": [s, `screen`, `none`, `prose`, { screen: [o] }, ...ce()] }],
				h: [{ h: [`screen`, `lh`, ...ce()] }],
				"min-h": [{ "min-h": [`screen`, `lh`, `none`, ...ce()] }],
				"max-h": [{ "max-h": [`screen`, `lh`, ...ce()] }],
				"font-size": [{ text: [`base`, n, zd, Pd] }],
				"font-smoothing": [`antialiased`, `subpixel-antialiased`],
				"font-style": [`italic`, `not-italic`],
				"font-weight": [{ font: [r, B, Fd] }],
				"font-stretch": [
					{
						"font-stretch": [
							`ultra-condensed`,
							`extra-condensed`,
							`condensed`,
							`semi-condensed`,
							`normal`,
							`semi-expanded`,
							`expanded`,
							`extra-expanded`,
							`ultra-expanded`,
							Td,
							z,
						],
					},
				],
				"font-family": [{ font: [Bd, z, t] }],
				"fvn-normal": [`normal-nums`],
				"fvn-ordinal": [`ordinal`],
				"fvn-slashed-zero": [`slashed-zero`],
				"fvn-figure": [`lining-nums`, `oldstyle-nums`],
				"fvn-spacing": [`proportional-nums`, `tabular-nums`],
				"fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
				tracking: [{ tracking: [i, B, z] }],
				"line-clamp": [{ "line-clamp": [R, `none`, B, Fd] }],
				leading: [{ leading: [a, ...C()] }],
				"list-image": [{ "list-image": [`none`, B, z] }],
				"list-style-position": [{ list: [`inside`, `outside`] }],
				"list-style-type": [{ list: [`disc`, `decimal`, `none`, B, z] }],
				"text-alignment": [{ text: [`left`, `center`, `right`, `justify`, `start`, `end`] }],
				"placeholder-color": [{ placeholder: T() }],
				"text-color": [{ text: T() }],
				"text-decoration": [`underline`, `overline`, `line-through`, `no-underline`],
				"text-decoration-style": [{ decoration: [...pe(), `wavy`] }],
				"text-decoration-thickness": [{ decoration: [R, `from-font`, `auto`, B, Pd] }],
				"text-decoration-color": [{ decoration: T() }],
				"underline-offset": [{ "underline-offset": [R, `auto`, B, z] }],
				"text-transform": [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
				"text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
				"text-wrap": [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
				indent: [{ indent: C() }],
				"vertical-align": [
					{ align: [`baseline`, `top`, `middle`, `bottom`, `text-top`, `text-bottom`, `sub`, `super`, B, z] },
				],
				whitespace: [{ whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`] }],
				break: [{ break: [`normal`, `words`, `all`, `keep`] }],
				wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
				hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
				content: [{ content: [`none`, B, z] }],
				"bg-attachment": [{ bg: [`fixed`, `local`, `scroll`] }],
				"bg-clip": [{ "bg-clip": [`border`, `padding`, `content`, `text`] }],
				"bg-origin": [{ "bg-origin": [`border`, `padding`, `content`] }],
				"bg-position": [{ bg: le() }],
				"bg-repeat": [{ bg: E() }],
				"bg-size": [{ bg: ue() }],
				"bg-image": [
					{
						bg: [
							`none`,
							{
								linear: [{ to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] }, wd, B, z],
								radial: [``, B, z],
								conic: [wd, B, z],
							},
							Ud,
							Ld,
						],
					},
				],
				"bg-color": [{ bg: T() }],
				"gradient-from-pos": [{ from: de() }],
				"gradient-via-pos": [{ via: de() }],
				"gradient-to-pos": [{ to: de() }],
				"gradient-from": [{ from: T() }],
				"gradient-via": [{ via: T() }],
				"gradient-to": [{ to: T() }],
				rounded: [{ rounded: D() }],
				"rounded-s": [{ "rounded-s": D() }],
				"rounded-e": [{ "rounded-e": D() }],
				"rounded-t": [{ "rounded-t": D() }],
				"rounded-r": [{ "rounded-r": D() }],
				"rounded-b": [{ "rounded-b": D() }],
				"rounded-l": [{ "rounded-l": D() }],
				"rounded-ss": [{ "rounded-ss": D() }],
				"rounded-se": [{ "rounded-se": D() }],
				"rounded-ee": [{ "rounded-ee": D() }],
				"rounded-es": [{ "rounded-es": D() }],
				"rounded-tl": [{ "rounded-tl": D() }],
				"rounded-tr": [{ "rounded-tr": D() }],
				"rounded-br": [{ "rounded-br": D() }],
				"rounded-bl": [{ "rounded-bl": D() }],
				"border-w": [{ border: fe() }],
				"border-w-x": [{ "border-x": fe() }],
				"border-w-y": [{ "border-y": fe() }],
				"border-w-s": [{ "border-s": fe() }],
				"border-w-e": [{ "border-e": fe() }],
				"border-w-t": [{ "border-t": fe() }],
				"border-w-r": [{ "border-r": fe() }],
				"border-w-b": [{ "border-b": fe() }],
				"border-w-l": [{ "border-l": fe() }],
				"divide-x": [{ "divide-x": fe() }],
				"divide-x-reverse": [`divide-x-reverse`],
				"divide-y": [{ "divide-y": fe() }],
				"divide-y-reverse": [`divide-y-reverse`],
				"border-style": [{ border: [...pe(), `hidden`, `none`] }],
				"divide-style": [{ divide: [...pe(), `hidden`, `none`] }],
				"border-color": [{ border: T() }],
				"border-color-x": [{ "border-x": T() }],
				"border-color-y": [{ "border-y": T() }],
				"border-color-s": [{ "border-s": T() }],
				"border-color-e": [{ "border-e": T() }],
				"border-color-t": [{ "border-t": T() }],
				"border-color-r": [{ "border-r": T() }],
				"border-color-b": [{ "border-b": T() }],
				"border-color-l": [{ "border-l": T() }],
				"divide-color": [{ divide: T() }],
				"outline-style": [{ outline: [...pe(), `none`, `hidden`] }],
				"outline-offset": [{ "outline-offset": [R, B, z] }],
				"outline-w": [{ outline: [``, R, zd, Pd] }],
				"outline-color": [{ outline: T() }],
				shadow: [{ shadow: [``, `none`, u, Wd, Rd] }],
				"shadow-color": [{ shadow: T() }],
				"inset-shadow": [{ "inset-shadow": [`none`, d, Wd, Rd] }],
				"inset-shadow-color": [{ "inset-shadow": T() }],
				"ring-w": [{ ring: fe() }],
				"ring-w-inset": [`ring-inset`],
				"ring-color": [{ ring: T() }],
				"ring-offset-w": [{ "ring-offset": [R, Pd] }],
				"ring-offset-color": [{ "ring-offset": T() }],
				"inset-ring-w": [{ "inset-ring": fe() }],
				"inset-ring-color": [{ "inset-ring": T() }],
				"text-shadow": [{ "text-shadow": [`none`, f, Wd, Rd] }],
				"text-shadow-color": [{ "text-shadow": T() }],
				opacity: [{ opacity: [R, B, z] }],
				"mix-blend": [{ "mix-blend": [...me(), `plus-darker`, `plus-lighter`] }],
				"bg-blend": [{ "bg-blend": me() }],
				"mask-clip": [{ "mask-clip": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] }, `mask-no-clip`],
				"mask-composite": [{ mask: [`add`, `subtract`, `intersect`, `exclude`] }],
				"mask-image-linear-pos": [{ "mask-linear": [R] }],
				"mask-image-linear-from-pos": [{ "mask-linear-from": O() }],
				"mask-image-linear-to-pos": [{ "mask-linear-to": O() }],
				"mask-image-linear-from-color": [{ "mask-linear-from": T() }],
				"mask-image-linear-to-color": [{ "mask-linear-to": T() }],
				"mask-image-t-from-pos": [{ "mask-t-from": O() }],
				"mask-image-t-to-pos": [{ "mask-t-to": O() }],
				"mask-image-t-from-color": [{ "mask-t-from": T() }],
				"mask-image-t-to-color": [{ "mask-t-to": T() }],
				"mask-image-r-from-pos": [{ "mask-r-from": O() }],
				"mask-image-r-to-pos": [{ "mask-r-to": O() }],
				"mask-image-r-from-color": [{ "mask-r-from": T() }],
				"mask-image-r-to-color": [{ "mask-r-to": T() }],
				"mask-image-b-from-pos": [{ "mask-b-from": O() }],
				"mask-image-b-to-pos": [{ "mask-b-to": O() }],
				"mask-image-b-from-color": [{ "mask-b-from": T() }],
				"mask-image-b-to-color": [{ "mask-b-to": T() }],
				"mask-image-l-from-pos": [{ "mask-l-from": O() }],
				"mask-image-l-to-pos": [{ "mask-l-to": O() }],
				"mask-image-l-from-color": [{ "mask-l-from": T() }],
				"mask-image-l-to-color": [{ "mask-l-to": T() }],
				"mask-image-x-from-pos": [{ "mask-x-from": O() }],
				"mask-image-x-to-pos": [{ "mask-x-to": O() }],
				"mask-image-x-from-color": [{ "mask-x-from": T() }],
				"mask-image-x-to-color": [{ "mask-x-to": T() }],
				"mask-image-y-from-pos": [{ "mask-y-from": O() }],
				"mask-image-y-to-pos": [{ "mask-y-to": O() }],
				"mask-image-y-from-color": [{ "mask-y-from": T() }],
				"mask-image-y-to-color": [{ "mask-y-to": T() }],
				"mask-image-radial": [{ "mask-radial": [B, z] }],
				"mask-image-radial-from-pos": [{ "mask-radial-from": O() }],
				"mask-image-radial-to-pos": [{ "mask-radial-to": O() }],
				"mask-image-radial-from-color": [{ "mask-radial-from": T() }],
				"mask-image-radial-to-color": [{ "mask-radial-to": T() }],
				"mask-image-radial-shape": [{ "mask-radial": [`circle`, `ellipse`] }],
				"mask-image-radial-size": [{ "mask-radial": [{ closest: [`side`, `corner`], farthest: [`side`, `corner`] }] }],
				"mask-image-radial-pos": [{ "mask-radial-at": b() }],
				"mask-image-conic-pos": [{ "mask-conic": [R] }],
				"mask-image-conic-from-pos": [{ "mask-conic-from": O() }],
				"mask-image-conic-to-pos": [{ "mask-conic-to": O() }],
				"mask-image-conic-from-color": [{ "mask-conic-from": T() }],
				"mask-image-conic-to-color": [{ "mask-conic-to": T() }],
				"mask-mode": [{ mask: [`alpha`, `luminance`, `match`] }],
				"mask-origin": [{ "mask-origin": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] }],
				"mask-position": [{ mask: le() }],
				"mask-repeat": [{ mask: E() }],
				"mask-size": [{ mask: ue() }],
				"mask-type": [{ "mask-type": [`alpha`, `luminance`] }],
				"mask-image": [{ mask: [`none`, B, z] }],
				filter: [{ filter: [``, `none`, B, z] }],
				blur: [{ blur: he() }],
				brightness: [{ brightness: [R, B, z] }],
				contrast: [{ contrast: [R, B, z] }],
				"drop-shadow": [{ "drop-shadow": [``, `none`, p, Wd, Rd] }],
				"drop-shadow-color": [{ "drop-shadow": T() }],
				grayscale: [{ grayscale: [``, R, B, z] }],
				"hue-rotate": [{ "hue-rotate": [R, B, z] }],
				invert: [{ invert: [``, R, B, z] }],
				saturate: [{ saturate: [R, B, z] }],
				sepia: [{ sepia: [``, R, B, z] }],
				"backdrop-filter": [{ "backdrop-filter": [``, `none`, B, z] }],
				"backdrop-blur": [{ "backdrop-blur": he() }],
				"backdrop-brightness": [{ "backdrop-brightness": [R, B, z] }],
				"backdrop-contrast": [{ "backdrop-contrast": [R, B, z] }],
				"backdrop-grayscale": [{ "backdrop-grayscale": [``, R, B, z] }],
				"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [R, B, z] }],
				"backdrop-invert": [{ "backdrop-invert": [``, R, B, z] }],
				"backdrop-opacity": [{ "backdrop-opacity": [R, B, z] }],
				"backdrop-saturate": [{ "backdrop-saturate": [R, B, z] }],
				"backdrop-sepia": [{ "backdrop-sepia": [``, R, B, z] }],
				"border-collapse": [{ border: [`collapse`, `separate`] }],
				"border-spacing": [{ "border-spacing": C() }],
				"border-spacing-x": [{ "border-spacing-x": C() }],
				"border-spacing-y": [{ "border-spacing-y": C() }],
				"table-layout": [{ table: [`auto`, `fixed`] }],
				caption: [{ caption: [`top`, `bottom`] }],
				transition: [{ transition: [``, `all`, `colors`, `opacity`, `shadow`, `transform`, `none`, B, z] }],
				"transition-behavior": [{ transition: [`normal`, `discrete`] }],
				duration: [{ duration: [R, `initial`, B, z] }],
				ease: [{ ease: [`linear`, `initial`, _, B, z] }],
				delay: [{ delay: [R, B, z] }],
				animate: [{ animate: [`none`, v, B, z] }],
				backface: [{ backface: [`hidden`, `visible`] }],
				perspective: [{ perspective: [h, B, z] }],
				"perspective-origin": [{ "perspective-origin": x() }],
				rotate: [{ rotate: ge() }],
				"rotate-x": [{ "rotate-x": ge() }],
				"rotate-y": [{ "rotate-y": ge() }],
				"rotate-z": [{ "rotate-z": ge() }],
				scale: [{ scale: _e() }],
				"scale-x": [{ "scale-x": _e() }],
				"scale-y": [{ "scale-y": _e() }],
				"scale-z": [{ "scale-z": _e() }],
				"scale-3d": [`scale-3d`],
				skew: [{ skew: ve() }],
				"skew-x": [{ "skew-x": ve() }],
				"skew-y": [{ "skew-y": ve() }],
				transform: [{ transform: [B, z, ``, `none`, `gpu`, `cpu`] }],
				"transform-origin": [{ origin: x() }],
				"transform-style": [{ transform: [`3d`, `flat`] }],
				translate: [{ translate: ye() }],
				"translate-x": [{ "translate-x": ye() }],
				"translate-y": [{ "translate-y": ye() }],
				"translate-z": [{ "translate-z": ye() }],
				"translate-none": [`translate-none`],
				accent: [{ accent: T() }],
				appearance: [{ appearance: [`none`, `auto`] }],
				"caret-color": [{ caret: T() }],
				"color-scheme": [{ scheme: [`normal`, `dark`, `light`, `light-dark`, `only-dark`, `only-light`] }],
				cursor: [
					{
						cursor: [
							`auto`,
							`default`,
							`pointer`,
							`wait`,
							`text`,
							`move`,
							`help`,
							`not-allowed`,
							`none`,
							`context-menu`,
							`progress`,
							`cell`,
							`crosshair`,
							`vertical-text`,
							`alias`,
							`copy`,
							`no-drop`,
							`grab`,
							`grabbing`,
							`all-scroll`,
							`col-resize`,
							`row-resize`,
							`n-resize`,
							`e-resize`,
							`s-resize`,
							`w-resize`,
							`ne-resize`,
							`nw-resize`,
							`se-resize`,
							`sw-resize`,
							`ew-resize`,
							`ns-resize`,
							`nesw-resize`,
							`nwse-resize`,
							`zoom-in`,
							`zoom-out`,
							B,
							z,
						],
					},
				],
				"field-sizing": [{ "field-sizing": [`fixed`, `content`] }],
				"pointer-events": [{ "pointer-events": [`auto`, `none`] }],
				resize: [{ resize: [`none`, ``, `y`, `x`] }],
				"scroll-behavior": [{ scroll: [`auto`, `smooth`] }],
				"scroll-m": [{ "scroll-m": C() }],
				"scroll-mx": [{ "scroll-mx": C() }],
				"scroll-my": [{ "scroll-my": C() }],
				"scroll-ms": [{ "scroll-ms": C() }],
				"scroll-me": [{ "scroll-me": C() }],
				"scroll-mt": [{ "scroll-mt": C() }],
				"scroll-mr": [{ "scroll-mr": C() }],
				"scroll-mb": [{ "scroll-mb": C() }],
				"scroll-ml": [{ "scroll-ml": C() }],
				"scroll-p": [{ "scroll-p": C() }],
				"scroll-px": [{ "scroll-px": C() }],
				"scroll-py": [{ "scroll-py": C() }],
				"scroll-ps": [{ "scroll-ps": C() }],
				"scroll-pe": [{ "scroll-pe": C() }],
				"scroll-pt": [{ "scroll-pt": C() }],
				"scroll-pr": [{ "scroll-pr": C() }],
				"scroll-pb": [{ "scroll-pb": C() }],
				"scroll-pl": [{ "scroll-pl": C() }],
				"snap-align": [{ snap: [`start`, `end`, `center`, `align-none`] }],
				"snap-stop": [{ snap: [`normal`, `always`] }],
				"snap-type": [{ snap: [`none`, `x`, `y`, `both`] }],
				"snap-strictness": [{ snap: [`mandatory`, `proximity`] }],
				touch: [{ touch: [`auto`, `none`, `manipulation`] }],
				"touch-x": [{ "touch-pan": [`x`, `left`, `right`] }],
				"touch-y": [{ "touch-pan": [`y`, `up`, `down`] }],
				"touch-pz": [`touch-pinch-zoom`],
				select: [{ select: [`none`, `text`, `all`, `auto`] }],
				"will-change": [{ "will-change": [`auto`, `scroll`, `contents`, `transform`, B, z] }],
				fill: [{ fill: [`none`, ...T()] }],
				"stroke-w": [{ stroke: [R, zd, Pd, Fd] }],
				stroke: [{ stroke: [`none`, ...T()] }],
				"forced-color-adjust": [{ "forced-color-adjust": [`auto`, `none`] }],
			},
			conflictingClassGroups: {
				overflow: [`overflow-x`, `overflow-y`],
				overscroll: [`overscroll-x`, `overscroll-y`],
				inset: [`inset-x`, `inset-y`, `start`, `end`, `top`, `right`, `bottom`, `left`],
				"inset-x": [`right`, `left`],
				"inset-y": [`top`, `bottom`],
				flex: [`basis`, `grow`, `shrink`],
				gap: [`gap-x`, `gap-y`],
				p: [`px`, `py`, `ps`, `pe`, `pt`, `pr`, `pb`, `pl`],
				px: [`pr`, `pl`],
				py: [`pt`, `pb`],
				m: [`mx`, `my`, `ms`, `me`, `mt`, `mr`, `mb`, `ml`],
				mx: [`mr`, `ml`],
				my: [`mt`, `mb`],
				size: [`w`, `h`],
				"font-size": [`leading`],
				"fvn-normal": [`fvn-ordinal`, `fvn-slashed-zero`, `fvn-figure`, `fvn-spacing`, `fvn-fraction`],
				"fvn-ordinal": [`fvn-normal`],
				"fvn-slashed-zero": [`fvn-normal`],
				"fvn-figure": [`fvn-normal`],
				"fvn-spacing": [`fvn-normal`],
				"fvn-fraction": [`fvn-normal`],
				"line-clamp": [`display`, `overflow`],
				rounded: [
					`rounded-s`,
					`rounded-e`,
					`rounded-t`,
					`rounded-r`,
					`rounded-b`,
					`rounded-l`,
					`rounded-ss`,
					`rounded-se`,
					`rounded-ee`,
					`rounded-es`,
					`rounded-tl`,
					`rounded-tr`,
					`rounded-br`,
					`rounded-bl`,
				],
				"rounded-s": [`rounded-ss`, `rounded-es`],
				"rounded-e": [`rounded-se`, `rounded-ee`],
				"rounded-t": [`rounded-tl`, `rounded-tr`],
				"rounded-r": [`rounded-tr`, `rounded-br`],
				"rounded-b": [`rounded-br`, `rounded-bl`],
				"rounded-l": [`rounded-tl`, `rounded-bl`],
				"border-spacing": [`border-spacing-x`, `border-spacing-y`],
				"border-w": [
					`border-w-x`,
					`border-w-y`,
					`border-w-s`,
					`border-w-e`,
					`border-w-t`,
					`border-w-r`,
					`border-w-b`,
					`border-w-l`,
				],
				"border-w-x": [`border-w-r`, `border-w-l`],
				"border-w-y": [`border-w-t`, `border-w-b`],
				"border-color": [
					`border-color-x`,
					`border-color-y`,
					`border-color-s`,
					`border-color-e`,
					`border-color-t`,
					`border-color-r`,
					`border-color-b`,
					`border-color-l`,
				],
				"border-color-x": [`border-color-r`, `border-color-l`],
				"border-color-y": [`border-color-t`, `border-color-b`],
				translate: [`translate-x`, `translate-y`, `translate-none`],
				"translate-none": [`translate`, `translate-x`, `translate-y`, `translate-z`],
				"scroll-m": [
					`scroll-mx`,
					`scroll-my`,
					`scroll-ms`,
					`scroll-me`,
					`scroll-mt`,
					`scroll-mr`,
					`scroll-mb`,
					`scroll-ml`,
				],
				"scroll-mx": [`scroll-mr`, `scroll-ml`],
				"scroll-my": [`scroll-mt`, `scroll-mb`],
				"scroll-p": [
					`scroll-px`,
					`scroll-py`,
					`scroll-ps`,
					`scroll-pe`,
					`scroll-pt`,
					`scroll-pr`,
					`scroll-pb`,
					`scroll-pl`,
				],
				"scroll-px": [`scroll-pr`, `scroll-pl`],
				"scroll-py": [`scroll-pt`, `scroll-pb`],
				touch: [`touch-x`, `touch-y`, `touch-pz`],
				"touch-x": [`touch`],
				"touch-y": [`touch`],
				"touch-pz": [`touch`],
			},
			conflictingClassGroupModifiers: { "font-size": [`leading`] },
			orderSensitiveModifiers: [
				`*`,
				`**`,
				`after`,
				`backdrop`,
				`before`,
				`details-content`,
				`file`,
				`first-letter`,
				`first-line`,
				`marker`,
				`placeholder`,
				`selection`,
			],
		};
	});
function tf(...e) {
	return ef(ne(e));
}
var nf = (e) => typeof e == `string`,
	rf = (e) => typeof e == `function`,
	af = new Map(),
	of = `en`;
function sf(e) {
	return [...(Array.isArray(e) ? e : [e]), of];
}
function cf(e, t, n) {
	const r = sf(e);
	n ||= `default`;
	let i;
	if (typeof n == `string`)
		switch (((i = { day: `numeric`, month: `short`, year: `numeric` }), n)) {
			case `full`:
				i.weekday = `long`;
			case `long`:
				i.month = `long`;
				break;
			case `short`:
				i.month = `numeric`;
				break;
		}
	else i = n;
	return ff(
		() => pf(`date`, r, n),
		() => new Intl.DateTimeFormat(r, i),
	).format(nf(t) ? new Date(t) : t);
}
function lf(e, t, n) {
	let r;
	if (((n ||= `default`), typeof n == `string`))
		switch (((r = { second: `numeric`, minute: `numeric`, hour: `numeric` }), n)) {
			case `full`:
			case `long`:
				r.timeZoneName = `short`;
				break;
			case `short`:
				delete r.second;
		}
	else r = n;
	return cf(e, t, r);
}
function uf(e, t, n) {
	const r = sf(e);
	return ff(
		() => pf(`number`, r, n),
		() => new Intl.NumberFormat(r, n),
	).format(t);
}
function df(e, t, n, { offset: r = 0, ...i }) {
	const a = sf(e),
		o = t
			? ff(
					() => pf(`plural-ordinal`, a),
					() => new Intl.PluralRules(a, { type: `ordinal` }),
				)
			: ff(
					() => pf(`plural-cardinal`, a),
					() => new Intl.PluralRules(a, { type: `cardinal` }),
				);
	return i[n] ?? i[o.select(n - r)] ?? i.other;
}
function ff(e, t) {
	let n = e(),
		r = af.get(n);
	return r || ((r = t()), af.set(n, r)), r;
}
function pf(e, t, n) {
	return `${e}-${t.join(`-`)}-${JSON.stringify(n)}`;
}
var mf = /\\u[a-fA-F0-9]{4}|\\x[a-fA-F0-9]{2}/,
	hf = (e) =>
		e.replace(/\\u([a-fA-F0-9]{4})|\\x([a-fA-F0-9]{2})/g, (e, t, n) => {
			if (t) {
				const e = parseInt(t, 16);
				return String.fromCharCode(e);
			} else {
				const e = parseInt(n, 16);
				return String.fromCharCode(e);
			}
		}),
	gf = `%__lingui_octothorpe__%`,
	_f = (e, t, n = {}) => {
		const r = t || e,
			i = (e) => (typeof e == `object` ? e : n[e]),
			a = (e, t) => {
				const a = uf(r, e, Object.keys(n).length ? i(`number`) : void 0);
				return t.replace(new RegExp(gf, `g`), a);
			};
		return {
			plural: (e, t) => {
				const { offset: n = 0 } = t,
					i = df(r, !1, e, t);
				return a(e - n, i);
			},
			selectordinal: (e, t) => {
				const { offset: n = 0 } = t,
					i = df(r, !0, e, t);
				return a(e - n, i);
			},
			select: vf,
			number: (e, t) => uf(r, e, i(t) || { style: t }),
			date: (e, t) => cf(r, e, i(t) || t),
			time: (e, t) => lf(r, e, i(t) || t),
		};
	},
	vf = (e, t) => t[e] ?? t.other;
function yf(e, t, n) {
	return (r = {}, i) => {
		const a = _f(t, n, i),
			o = (e, t = !1) =>
				Array.isArray(e)
					? e.reduce((e, n) => {
							if (n === `#` && t) return e + gf;
							if (nf(n)) return e + n;
							let [i, s, c] = n,
								l = {};
							s === `plural` || s === `selectordinal` || s === `select`
								? Object.entries(c).forEach(([e, t]) => {
										l[e] = o(t, s === `plural` || s === `selectordinal`);
									})
								: (l = c);
							let u;
							if (s) {
								const e = a[s];
								u = e(r[i], l);
							} else u = r[i];
							return u == null ? e : e + u;
						}, ``)
					: e,
			s = o(e);
		return nf(s) && mf.test(s) ? hf(s) : nf(s) ? s : s ? String(s) : ``;
	};
}
var bf = Object.defineProperty,
	xf = (e, t, n) => (t in e ? bf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)),
	Sf = (e, t, n) => (xf(e, typeof t == `symbol` ? t : t + ``, n), n),
	Cf = class {
		constructor() {
			Sf(this, `_events`, {});
		}
		on(e, t) {
			var n;
			return (n = this._events)[e] ?? (n[e] = []), this._events[e].push(t), () => this.removeListener(e, t);
		}
		removeListener(e, t) {
			const n = this._getListeners(e);
			if (!n) return;
			const r = n.indexOf(t);
			~r && n.splice(r, 1);
		}
		emit(e, ...t) {
			const n = this._getListeners(e);
			n && n.map((e) => e.apply(this, t));
		}
		_getListeners(e) {
			const t = this._events[e];
			return Array.isArray(t) ? t : !1;
		}
	},
	wf = Object.defineProperty,
	Tf = (e, t, n) => (t in e ? wf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)),
	Ef = (e, t, n) => (Tf(e, typeof t == `symbol` ? t : t + ``, n), n),
	Df = class extends Cf {
		constructor(e) {
			super(),
				Ef(this, `_locale`, ``),
				Ef(this, `_locales`),
				Ef(this, `_localeData`, {}),
				Ef(this, `_messages`, {}),
				Ef(this, `_missing`),
				Ef(this, `_messageCompiler`),
				Ef(this, `t`, this._.bind(this)),
				e.missing != null && (this._missing = e.missing),
				e.messages != null && this.load(e.messages),
				e.localeData != null && this.loadLocaleData(e.localeData),
				(typeof e.locale == `string` || e.locales) && this.activate(e.locale ?? of, e.locales);
		}
		get locale() {
			return this._locale;
		}
		get locales() {
			return this._locales;
		}
		get messages() {
			return this._messages[this._locale] ?? {};
		}
		get localeData() {
			return this._localeData[this._locale] ?? {};
		}
		_loadLocaleData(e, t) {
			const n = this._localeData[e];
			n ? Object.assign(n, t) : (this._localeData[e] = t);
		}
		setMessagesCompiler(e) {
			return (this._messageCompiler = e), this;
		}
		loadLocaleData(e, t) {
			typeof e == `string` ? this._loadLocaleData(e, t) : Object.keys(e).forEach((t) => this._loadLocaleData(t, e[t])),
				this.emit(`change`);
		}
		_load(e, t) {
			const n = this._messages[e];
			n ? Object.assign(n, t) : (this._messages[e] = t);
		}
		load(e, t) {
			typeof e == `string` && typeof t == `object`
				? this._load(e, t)
				: Object.entries(e).forEach(([e, t]) => this._load(e, t)),
				this.emit(`change`);
		}
		loadAndActivate({ locale: e, locales: t, messages: n }) {
			(this._locale = e), (this._locales = t || void 0), (this._messages[this._locale] = n), this.emit(`change`);
		}
		activate(e, t) {
			(this._locale = e), (this._locales = t), this.emit(`change`);
		}
		_(e, t, n) {
			if (!this.locale)
				throw Error(`Lingui: Attempted to call a translation function without setting a locale.
Make sure to call \`i18n.activate(locale)\` before using Lingui functions.
This issue may also occur due to a race condition in your initialization logic.`);
			let r = n?.message;
			(e ||= ``), nf(e) || ((t = e.values || t), (r = e.message), (e = e.id));
			const i = this.messages[e],
				a = i === void 0,
				o = this._missing;
			if (o && a) return rf(o) ? o(this._locale, e) : o;
			a && this.emit(`missing`, { id: e, locale: this._locale });
			let s = i || r || e;
			return (
				nf(s) &&
					(this._messageCompiler
						? (s = this._messageCompiler(s))
						: console.warn(`Uncompiled message detected! Message:

> ${s}

That means you use raw catalog or your catalog doesn't have a translation for the message and fallback was used.
ICU features such as interpolation and plurals will not work properly for that message. 

Please compile your catalog first. 
`)),
				nf(s) && mf.test(s) ? hf(s) : nf(s) ? s : yf(s, this._locale, this._locales)(t, n?.formats)
			);
		}
		date(e, t) {
			return cf(this._locales || this._locale, e, t);
		}
		number(e, t) {
			return uf(this._locales || this._locale, e, t);
		}
	};
function Of(e = {}) {
	return new Df(e);
}
var kf = Of();
function Af(e, t) {
	if (typeof e == `function`) return e(t);
	e != null && (e.current = t);
}
function jf(...e) {
	return (t) => {
		let n = !1,
			r = e.map((e) => {
				const r = Af(e, t);
				return !n && typeof r == `function` && (n = !0), r;
			});
		if (n)
			return () => {
				for (let t = 0; t < r.length; t++) {
					const n = r[t];
					typeof n == `function` ? n() : Af(e[t], null);
				}
			};
	};
}
function Mf(...e) {
	return u.useCallback(jf(...e), e);
}
function Nf(e) {
	const t = Ff(e),
		n = u.forwardRef((e, n) => {
			const { children: r, ...i } = e,
				a = u.Children.toArray(r),
				o = a.find(Rf);
			if (o) {
				const e = o.props.children,
					r = a.map((t) =>
						t === o
							? u.Children.count(e) > 1
								? u.Children.only(null)
								: u.isValidElement(e)
									? e.props.children
									: null
							: t,
					);
				return (0, l.jsx)(t, { ...i, ref: n, children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null });
			}
			return (0, l.jsx)(t, { ...i, ref: n, children: r });
		});
	return (n.displayName = `${e}.Slot`), n;
}
var Pf = Nf(`Slot`);
function Ff(e) {
	const t = u.forwardRef((e, t) => {
		const { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			const e = Bf(n),
				i = zf(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? jf(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return (t.displayName = `${e}.SlotClone`), t;
}
var If = Symbol(`radix.slottable`);
function Lf(e) {
	const t = ({ children: e }) => (0, l.jsx)(l.Fragment, { children: e });
	return (t.displayName = `${e}.Slottable`), (t.__radixId = If), t;
}
function Rf(e) {
	return u.isValidElement(e) && typeof e.type == `function` && `__radixId` in e.type && e.type.__radixId === If;
}
function zf(e, t) {
	const n = { ...t };
	for (const r in t) {
		const i = e[r],
			a = t[r];
		/^on[A-Z]/.test(r)
			? i && a
				? (n[r] = (...e) => {
						const t = a(...e);
						return i(...e), t;
					})
				: i && (n[r] = i)
			: r === `style`
				? (n[r] = { ...i, ...a })
				: r === `className` && (n[r] = [i, a].filter(Boolean).join(` `));
	}
	return { ...e, ...n };
}
function Bf(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
		n = t && `isReactWarning` in t && t.isReactWarning;
	return n
		? e.ref
		: ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
			(n = t && `isReactWarning` in t && t.isReactWarning),
			n ? e.props.ref : e.props.ref || e.ref);
}
var Vf = r(c(), 1),
	Hf = [
		`a`,
		`button`,
		`div`,
		`form`,
		`h2`,
		`h3`,
		`img`,
		`input`,
		`label`,
		`li`,
		`nav`,
		`ol`,
		`p`,
		`select`,
		`span`,
		`svg`,
		`ul`,
	].reduce((e, t) => {
		const n = Nf(`Primitive.${t}`),
			r = u.forwardRef((e, r) => {
				const { asChild: i, ...a } = e,
					o = i ? n : t;
				return typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0), (0, l.jsx)(o, { ...a, ref: r });
			});
		return (r.displayName = `Primitive.${t}`), { ...e, [t]: r };
	}, {});
function Uf(e, t) {
	e && Vf.flushSync(() => e.dispatchEvent(t));
}
const Wf = Object.freeze({ status: `aborted` });
function V(e, t, n) {
	function r(n, r) {
		if (
			(n._zod || Object.defineProperty(n, `_zod`, { value: { def: r, constr: o, traits: new Set() }, enumerable: !1 }),
			n._zod.traits.has(e))
		)
			return;
		n._zod.traits.add(e), t(n, r);
		const i = o.prototype,
			a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			const t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	const i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, `name`, { value: e });
	function o(e) {
		var t;
		const i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (const e of i._zod.deferred) e();
		return i;
	}
	return (
		Object.defineProperty(o, `init`, { value: r }),
		Object.defineProperty(o, Symbol.hasInstance, {
			value: (t) => (n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e)),
		}),
		Object.defineProperty(o, `name`, { value: e }),
		o
	);
}
const Gf = Symbol(`zod_brand`);
var Kf = class extends Error {
		constructor() {
			super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
		}
	},
	qf = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), (this.name = `ZodEncodeError`);
		}
	};
const Jf = {};
function Yf(e) {
	return e && Object.assign(Jf, e), Jf;
}
var Xf = t(
	{
		BIGINT_FORMAT_RANGES: () => Mp,
		Class: () => em,
		NUMBER_FORMAT_RANGES: () => jp,
		aborted: () => Bp,
		allowsEval: () => bp,
		assert: () => tp,
		assertEqual: () => Zf,
		assertIs: () => $f,
		assertNever: () => ep,
		assertNotEqual: () => Qf,
		assignProp: () => up,
		base64ToUint8Array: () => Jp,
		base64urlToUint8Array: () => Xp,
		cached: () => ip,
		captureStackTrace: () => vp,
		cleanEnum: () => qp,
		cleanRegex: () => op,
		clone: () => Op,
		cloneDef: () => fp,
		createTransparentProxy: () => kp,
		defineLazy: () => U,
		esc: () => gp,
		escapeRegex: () => Dp,
		extend: () => Fp,
		finalizeIssue: () => Up,
		floatSafeRemainder: () => sp,
		getElementAtPath: () => pp,
		getEnumValues: () => np,
		getLengthableOrigin: () => Gp,
		getParsedType: () => wp,
		getSizableOrigin: () => Wp,
		hexToUint8Array: () => Qp,
		isObject: () => yp,
		isPlainObject: () => xp,
		issue: () => Kp,
		joinValues: () => H,
		jsonStringifyReplacer: () => rp,
		merge: () => Lp,
		mergeDefs: () => dp,
		normalizeParams: () => W,
		nullish: () => ap,
		numKeys: () => Cp,
		objectClone: () => lp,
		omit: () => Pp,
		optionalKeys: () => Ap,
		parsedType: () => K,
		partial: () => Rp,
		pick: () => Np,
		prefixIssues: () => Vp,
		primitiveTypes: () => Ep,
		promiseAllObject: () => mp,
		propertyKeyTypes: () => Tp,
		randomString: () => hp,
		required: () => zp,
		safeExtend: () => Ip,
		shallowClone: () => Sp,
		slugify: () => _p,
		stringifyPrimitive: () => G,
		uint8ArrayToBase64: () => Yp,
		uint8ArrayToBase64url: () => Zp,
		uint8ArrayToHex: () => $p,
		unwrapMessage: () => Hp,
	},
	1,
);
function Zf(e) {
	return e;
}
function Qf(e) {
	return e;
}
function $f(e) {}
function ep(e) {
	throw Error(`Unexpected value in exhaustive check`);
}
function tp(e) {}
function np(e) {
	const t = Object.values(e).filter((e) => typeof e == `number`);
	return Object.entries(e)
		.filter(([e, n]) => t.indexOf(+e) === -1)
		.map(([e, t]) => t);
}
function H(e, t = `|`) {
	return e.map((e) => G(e)).join(t);
}
function rp(e, t) {
	return typeof t == `bigint` ? t.toString() : t;
}
function ip(e) {
	return {
		get value() {
			{
				const t = e();
				return Object.defineProperty(this, `value`, { value: t }), t;
			}
			throw Error(`cached value already set`);
		},
	};
}
function ap(e) {
	return e == null;
}
function op(e) {
	const t = e.startsWith(`^`) ? 1 : 0,
		n = e.endsWith(`$`) ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function sp(e, t) {
	let n = (e.toString().split(`.`)[1] || ``).length,
		r = t.toString(),
		i = (r.split(`.`)[1] || ``).length;
	if (i === 0 && /\d?e-\d?/.test(r)) {
		const e = r.match(/\d?e-(\d?)/);
		e?.[1] && (i = Number.parseInt(e[1]));
	}
	const a = n > i ? n : i;
	return (Number.parseInt(e.toFixed(a).replace(`.`, ``)) % Number.parseInt(t.toFixed(a).replace(`.`, ``))) / 10 ** a;
}
var cp = Symbol(`evaluating`);
function U(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== cp) return r === void 0 && ((r = cp), (r = n())), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0,
	});
}
function lp(e) {
	return Object.create(Object.getPrototypeOf(e), Object.getOwnPropertyDescriptors(e));
}
function up(e, t, n) {
	Object.defineProperty(e, t, { value: n, writable: !0, enumerable: !0, configurable: !0 });
}
function dp(...e) {
	const t = {};
	for (const n of e) {
		const e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function fp(e) {
	return dp(e._zod.def);
}
function pp(e, t) {
	return t ? t.reduce((e, t) => e?.[t], e) : e;
}
function mp(e) {
	const t = Object.keys(e),
		n = t.map((t) => e[t]);
	return Promise.all(n).then((e) => {
		const n = {};
		for (let r = 0; r < t.length; r++) n[t[r]] = e[r];
		return n;
	});
}
function hp(e = 10) {
	let t = ``;
	for (let n = 0; n < e; n++) t += `abcdefghijklmnopqrstuvwxyz`[Math.floor(Math.random() * 26)];
	return t;
}
function gp(e) {
	return JSON.stringify(e);
}
function _p(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, ``)
		.replace(/[\s_-]+/g, `-`)
		.replace(/^-+|-+$/g, ``);
}
const vp = `captureStackTrace` in Error ? Error.captureStackTrace : (...e) => {};
function yp(e) {
	return typeof e == `object` && !!e && !Array.isArray(e);
}
const bp = ip(() => {
	if (typeof navigator < `u` && navigator?.userAgent?.includes(`Cloudflare`)) return !1;
	try {
		return Function(``), !0;
	} catch {
		return !1;
	}
});
function xp(e) {
	if (yp(e) === !1) return !1;
	const t = e.constructor;
	if (t === void 0 || typeof t != `function`) return !0;
	const n = t.prototype;
	return !(yp(n) === !1 || Object.hasOwn(n, `isPrototypeOf`) === !1);
}
function Sp(e) {
	return xp(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
function Cp(e) {
	let t = 0;
	for (const n in e) Object.hasOwn(e, n) && t++;
	return t;
}
const wp = (e) => {
		const t = typeof e;
		switch (t) {
			case `undefined`:
				return `undefined`;
			case `string`:
				return `string`;
			case `number`:
				return Number.isNaN(e) ? `nan` : `number`;
			case `boolean`:
				return `boolean`;
			case `function`:
				return `function`;
			case `bigint`:
				return `bigint`;
			case `symbol`:
				return `symbol`;
			case `object`:
				return Array.isArray(e)
					? `array`
					: e === null
						? `null`
						: e.then && typeof e.then == `function` && e.catch && typeof e.catch == `function`
							? `promise`
							: typeof Map < `u` && e instanceof Map
								? `map`
								: typeof Set < `u` && e instanceof Set
									? `set`
									: typeof Date < `u` && e instanceof Date
										? `date`
										: typeof File < `u` && e instanceof File
											? `file`
											: `object`;
			default:
				throw Error(`Unknown data type: ${t}`);
		}
	},
	Tp = new Set([`string`, `number`, `symbol`]),
	Ep = new Set([`string`, `number`, `bigint`, `boolean`, `symbol`, `undefined`]);
function Dp(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function Op(e, t, n) {
	const r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function W(e) {
	const t = e;
	if (!t) return {};
	if (typeof t == `string`) return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == `string` ? { ...t, error: () => t.error } : t;
}
function kp(e) {
	let t;
	return new Proxy(
		{},
		{
			get(n, r, i) {
				return (t ??= e()), Reflect.get(t, r, i);
			},
			set(n, r, i, a) {
				return (t ??= e()), Reflect.set(t, r, i, a);
			},
			has(n, r) {
				return (t ??= e()), Reflect.has(t, r);
			},
			deleteProperty(n, r) {
				return (t ??= e()), Reflect.deleteProperty(t, r);
			},
			ownKeys(n) {
				return (t ??= e()), Reflect.ownKeys(t);
			},
			getOwnPropertyDescriptor(n, r) {
				return (t ??= e()), Reflect.getOwnPropertyDescriptor(t, r);
			},
			defineProperty(n, r, i) {
				return (t ??= e()), Reflect.defineProperty(t, r, i);
			},
		},
	);
}
function G(e) {
	return typeof e == `bigint` ? e.toString() + `n` : typeof e == `string` ? `"${e}"` : `${e}`;
}
function Ap(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === `optional` && e[t]._zod.optout === `optional`);
}
const jp = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
	},
	Mp = {
		int64: [BigInt(`-9223372036854775808`), BigInt(`9223372036854775807`)],
		uint64: [BigInt(0), BigInt(`18446744073709551615`)],
	};
function Np(e, t) {
	const n = e._zod.def,
		r = n.checks;
	if (r && r.length > 0) throw Error(`.pick() cannot be used on object schemas containing refinements`);
	return Op(
		e,
		dp(e._zod.def, {
			get shape() {
				const e = {};
				for (const r in t) {
					if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
					t[r] && (e[r] = n.shape[r]);
				}
				return up(this, `shape`, e), e;
			},
			checks: [],
		}),
	);
}
function Pp(e, t) {
	const n = e._zod.def,
		r = n.checks;
	if (r && r.length > 0) throw Error(`.omit() cannot be used on object schemas containing refinements`);
	return Op(
		e,
		dp(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape };
				for (const e in t) {
					if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
					t[e] && delete r[e];
				}
				return up(this, `shape`, r), r;
			},
			checks: [],
		}),
	);
}
function Fp(e, t) {
	if (!xp(t)) throw Error(`Invalid input to extend: expected a plain object`);
	const n = e._zod.def.checks;
	if (n && n.length > 0) {
		const n = e._zod.def.shape;
		for (const e in t)
			if (Object.getOwnPropertyDescriptor(n, e) !== void 0)
				throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Op(
		e,
		dp(e._zod.def, {
			get shape() {
				const n = { ...e._zod.def.shape, ...t };
				return up(this, `shape`, n), n;
			},
		}),
	);
}
function Ip(e, t) {
	if (!xp(t)) throw Error(`Invalid input to safeExtend: expected a plain object`);
	return Op(
		e,
		dp(e._zod.def, {
			get shape() {
				const n = { ...e._zod.def.shape, ...t };
				return up(this, `shape`, n), n;
			},
		}),
	);
}
function Lp(e, t) {
	return Op(
		e,
		dp(e._zod.def, {
			get shape() {
				const n = { ...e._zod.def.shape, ...t._zod.def.shape };
				return up(this, `shape`, n), n;
			},
			get catchall() {
				return t._zod.def.catchall;
			},
			checks: [],
		}),
	);
}
function Rp(e, t, n) {
	const r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(`.partial() cannot be used on object schemas containing refinements`);
	return Op(
		t,
		dp(t._zod.def, {
			get shape() {
				const r = t._zod.def.shape,
					i = { ...r };
				if (n)
					for (const t in n) {
						if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
						n[t] && (i[t] = e ? new e({ type: `optional`, innerType: r[t] }) : r[t]);
					}
				else for (const t in r) i[t] = e ? new e({ type: `optional`, innerType: r[t] }) : r[t];
				return up(this, `shape`, i), i;
			},
			checks: [],
		}),
	);
}
function zp(e, t, n) {
	return Op(
		t,
		dp(t._zod.def, {
			get shape() {
				const r = t._zod.def.shape,
					i = { ...r };
				if (n)
					for (const t in n) {
						if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
						n[t] && (i[t] = new e({ type: `nonoptional`, innerType: r[t] }));
					}
				else for (const t in r) i[t] = new e({ type: `nonoptional`, innerType: r[t] });
				return up(this, `shape`, i), i;
			},
		}),
	);
}
function Bp(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Vp(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Hp(e) {
	return typeof e == `string` ? e : e?.message;
}
function Up(e, t, n) {
	const r = { ...e, path: e.path ?? [] };
	return (
		e.message ||
			(r.message =
				Hp(e.inst?._zod.def?.error?.(e)) ??
				Hp(t?.error?.(e)) ??
				Hp(n.customError?.(e)) ??
				Hp(n.localeError?.(e)) ??
				`Invalid input`),
		delete r.inst,
		delete r.continue,
		t?.reportInput || delete r.input,
		r
	);
}
function Wp(e) {
	return e instanceof Set ? `set` : e instanceof Map ? `map` : e instanceof File ? `file` : `unknown`;
}
function Gp(e) {
	return Array.isArray(e) ? `array` : typeof e == `string` ? `string` : `unknown`;
}
function K(e) {
	const t = typeof e;
	switch (t) {
		case `number`:
			return Number.isNaN(e) ? `nan` : `number`;
		case `object`: {
			if (e === null) return `null`;
			if (Array.isArray(e)) return `array`;
			const t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && `constructor` in t && t.constructor)
				return t.constructor.name;
		}
	}
	return t;
}
function Kp(...e) {
	const [t, n, r] = e;
	return typeof t == `string` ? { message: t, code: `custom`, input: n, inst: r } : { ...t };
}
function qp(e) {
	return Object.entries(e)
		.filter(([e, t]) => Number.isNaN(Number.parseInt(e, 10)))
		.map((e) => e[1]);
}
function Jp(e) {
	const t = atob(e),
		n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function Yp(e) {
	let t = ``;
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return btoa(t);
}
function Xp(e) {
	const t = e.replace(/-/g, `+`).replace(/_/g, `/`);
	return Jp(t + `=`.repeat((4 - (t.length % 4)) % 4));
}
function Zp(e) {
	return Yp(e).replace(/\+/g, `-`).replace(/\//g, `_`).replace(/=/g, ``);
}
function Qp(e) {
	const t = e.replace(/^0x/, ``);
	if (t.length % 2 != 0) throw Error(`Invalid hex string length`);
	const n = new Uint8Array(t.length / 2);
	for (let e = 0; e < t.length; e += 2) n[e / 2] = Number.parseInt(t.slice(e, e + 2), 16);
	return n;
}
function $p(e) {
	return Array.from(e)
		.map((e) => e.toString(16).padStart(2, `0`))
		.join(``);
}
var em = class {
		constructor(...e) {}
	},
	tm = (e, t) => {
		(e.name = `$ZodError`),
			Object.defineProperty(e, `_zod`, { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, `issues`, { value: t, enumerable: !1 }),
			(e.message = JSON.stringify(t, rp, 2)),
			Object.defineProperty(e, `toString`, { value: () => e.message, enumerable: !1 });
	};
const nm = V(`$ZodError`, tm),
	rm = V(`$ZodError`, tm, { Parent: Error });
function im(e, t = (e) => e.message) {
	const n = {},
		r = [];
	for (const i of e.issues)
		i.path.length > 0 ? ((n[i.path[0]] = n[i.path[0]] || []), n[i.path[0]].push(t(i))) : r.push(t(i));
	return { formErrors: r, fieldErrors: n };
}
function am(e, t = (e) => e.message) {
	const n = { _errors: [] },
		r = (e) => {
			for (const i of e.issues)
				if (i.code === `invalid_union` && i.errors.length) i.errors.map((e) => r({ issues: e }));
				else if (i.code === `invalid_key`) r({ issues: i.issues });
				else if (i.code === `invalid_element`) r({ issues: i.issues });
				else if (i.path.length === 0) n._errors.push(t(i));
				else {
					let e = n,
						r = 0;
					for (; r < i.path.length; ) {
						const n = i.path[r];
						r === i.path.length - 1
							? ((e[n] = e[n] || { _errors: [] }), e[n]._errors.push(t(i)))
							: (e[n] = e[n] || { _errors: [] }),
							(e = e[n]),
							r++;
					}
				}
		};
	return r(e), n;
}
function om(e, t = (e) => e.message) {
	const n = { errors: [] },
		r = (e, i = []) => {
			var a, o;
			for (const s of e.issues)
				if (s.code === `invalid_union` && s.errors.length) s.errors.map((e) => r({ issues: e }, s.path));
				else if (s.code === `invalid_key`) r({ issues: s.issues }, s.path);
				else if (s.code === `invalid_element`) r({ issues: s.issues }, s.path);
				else {
					const e = [...i, ...s.path];
					if (e.length === 0) {
						n.errors.push(t(s));
						continue;
					}
					let r = n,
						c = 0;
					for (; c < e.length; ) {
						const n = e[c],
							i = c === e.length - 1;
						typeof n == `string`
							? ((r.properties ??= {}), (a = r.properties)[n] ?? (a[n] = { errors: [] }), (r = r.properties[n]))
							: ((r.items ??= []), (o = r.items)[n] ?? (o[n] = { errors: [] }), (r = r.items[n])),
							i && r.errors.push(t(s)),
							c++;
					}
				}
		};
	return r(e), n;
}
function sm(e) {
	const t = [],
		n = e.map((e) => (typeof e == `object` ? e.key : e));
	for (const e of n)
		typeof e == `number`
			? t.push(`[${e}]`)
			: typeof e == `symbol`
				? t.push(`[${JSON.stringify(String(e))}]`)
				: /[^\w$]/.test(e)
					? t.push(`[${JSON.stringify(e)}]`)
					: (t.length && t.push(`.`), t.push(e));
	return t.join(``);
}
function cm(e) {
	const t = [],
		n = [...e.issues].sort((e, t) => (e.path ?? []).length - (t.path ?? []).length);
	for (const e of n) t.push(`✖ ${e.message}`), e.path?.length && t.push(`  → at ${sm(e.path)}`);
	return t.join(`
`);
}
const lm = (e) => (t, n, r, i) => {
		const a = r ? Object.assign(r, { async: !1 }) : { async: !1 },
			o = t._zod.run({ value: n, issues: [] }, a);
		if (o instanceof Promise) throw new Kf();
		if (o.issues.length) {
			const t = new (i?.Err ?? e)(o.issues.map((e) => Up(e, a, Yf())));
			throw (vp(t, i?.callee), t);
		}
		return o.value;
	},
	um = lm(rm),
	dm = (e) => async (t, n, r, i) => {
		let a = r ? Object.assign(r, { async: !0 }) : { async: !0 },
			o = t._zod.run({ value: n, issues: [] }, a);
		if ((o instanceof Promise && (o = await o), o.issues.length)) {
			const t = new (i?.Err ?? e)(o.issues.map((e) => Up(e, a, Yf())));
			throw (vp(t, i?.callee), t);
		}
		return o.value;
	},
	fm = dm(rm),
	pm = (e) => (t, n, r) => {
		const i = r ? { ...r, async: !1 } : { async: !1 },
			a = t._zod.run({ value: n, issues: [] }, i);
		if (a instanceof Promise) throw new Kf();
		return a.issues.length
			? { success: !1, error: new (e ?? nm)(a.issues.map((e) => Up(e, i, Yf()))) }
			: { success: !0, data: a.value };
	},
	mm = pm(rm),
	hm = (e) => async (t, n, r) => {
		let i = r ? Object.assign(r, { async: !0 }) : { async: !0 },
			a = t._zod.run({ value: n, issues: [] }, i);
		return (
			a instanceof Promise && (a = await a),
			a.issues.length
				? { success: !1, error: new e(a.issues.map((e) => Up(e, i, Yf()))) }
				: { success: !0, data: a.value }
		);
	},
	gm = hm(rm),
	_m = (e) => (t, n, r) => {
		const i = r ? Object.assign(r, { direction: `backward` }) : { direction: `backward` };
		return lm(e)(t, n, i);
	},
	vm = _m(rm),
	ym = (e) => (t, n, r) => lm(e)(t, n, r),
	bm = ym(rm),
	xm = (e) => async (t, n, r) => {
		const i = r ? Object.assign(r, { direction: `backward` }) : { direction: `backward` };
		return dm(e)(t, n, i);
	},
	Sm = xm(rm),
	Cm = (e) => async (t, n, r) => dm(e)(t, n, r),
	wm = Cm(rm),
	Tm = (e) => (t, n, r) => {
		const i = r ? Object.assign(r, { direction: `backward` }) : { direction: `backward` };
		return pm(e)(t, n, i);
	},
	Em = Tm(rm),
	Dm = (e) => (t, n, r) => pm(e)(t, n, r),
	Om = Dm(rm),
	km = (e) => async (t, n, r) => {
		const i = r ? Object.assign(r, { direction: `backward` }) : { direction: `backward` };
		return hm(e)(t, n, i);
	},
	Am = km(rm),
	jm = (e) => async (t, n, r) => hm(e)(t, n, r),
	Mm = jm(rm);
var Nm = t(
	{
		base64: () => oh,
		base64url: () => sh,
		bigint: () => _h,
		boolean: () => bh,
		browserEmail: () => Qm,
		cidrv4: () => ih,
		cidrv6: () => ah,
		cuid: () => Pm,
		cuid2: () => Fm,
		date: () => fh,
		datetime: () => hh,
		domain: () => lh,
		duration: () => Bm,
		e164: () => uh,
		email: () => qm,
		emoji: () => eh,
		extendedDuration: () => Vm,
		guid: () => Hm,
		hex: () => Th,
		hostname: () => ch,
		html5Email: () => Jm,
		idnEmail: () => Zm,
		integer: () => vh,
		ipv4: () => th,
		ipv6: () => nh,
		ksuid: () => Rm,
		lowercase: () => Ch,
		mac: () => rh,
		md5_base64: () => kh,
		md5_base64url: () => Ah,
		md5_hex: () => Oh,
		nanoid: () => zm,
		null: () => xh,
		number: () => yh,
		rfc5322Email: () => Ym,
		sha1_base64: () => Mh,
		sha1_base64url: () => Nh,
		sha1_hex: () => jh,
		sha256_base64: () => Fh,
		sha256_base64url: () => Ih,
		sha256_hex: () => Ph,
		sha384_base64: () => Rh,
		sha384_base64url: () => zh,
		sha384_hex: () => Lh,
		sha512_base64: () => Vh,
		sha512_base64url: () => Hh,
		sha512_hex: () => Bh,
		string: () => gh,
		time: () => mh,
		ulid: () => Im,
		undefined: () => Sh,
		unicodeEmail: () => Xm,
		uppercase: () => wh,
		uuid: () => Um,
		uuid4: () => Wm,
		uuid6: () => Gm,
		uuid7: () => Km,
		xid: () => Lm,
	},
	1,
);
const Pm = /^[cC][^\s-]{8,}$/,
	Fm = /^[0-9a-z]+$/,
	Im = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	Lm = /^[0-9a-vA-V]{20}$/,
	Rm = /^[A-Za-z0-9]{27}$/,
	zm = /^[a-zA-Z0-9_-]{21}$/,
	Bm = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	Vm =
		/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
	Hm = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Um = (e) =>
		e
			? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	Wm = Um(4),
	Gm = Um(6),
	Km = Um(7),
	qm = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/,
	Jm =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	Ym =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	Xm = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
	Zm = Xm,
	Qm =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var $m = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function eh() {
	return new RegExp($m, `u`);
}
const th =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	nh =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	rh = (e) => {
		const t = Dp(e ?? `:`);
		return RegExp(`^(?:[0-9A-F]{2}${t}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${t}){5}[0-9a-f]{2}$`);
	},
	ih =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	ah =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	oh = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	sh = /^[A-Za-z0-9_-]*$/,
	ch =
		/^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
	lh = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
	uh = /^\+[1-9]\d{6,14}$/;
var dh = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const fh = RegExp(`^${dh}$`);
function ph(e) {
	const t = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof e.precision == `number`
		? e.precision === -1
			? `${t}`
			: e.precision === 0
				? `${t}:[0-5]\\d`
				: `${t}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function mh(e) {
	return RegExp(`^${ph(e)}$`);
}
function hh(e) {
	const t = ph({ precision: e.precision }),
		n = [`Z`];
	e.local && n.push(``), e.offset && n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const r = `${t}(?:${n.join(`|`)})`;
	return RegExp(`^${dh}T(?:${r})$`);
}
const gh = (e) => {
		const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ``}}` : `[\\s\\S]*`;
		return RegExp(`^${t}$`);
	},
	_h = /^-?\d+n?$/,
	vh = /^-?\d+$/,
	yh = /^-?\d+(?:\.\d+)?$/,
	bh = /^(?:true|false)$/i;
var xh = /^null$/i,
	Sh = /^undefined$/i;
const Ch = /^[^A-Z]*$/,
	wh = /^[^a-z]*$/,
	Th = /^[0-9a-fA-F]*$/;
function Eh(e, t) {
	return RegExp(`^[A-Za-z0-9+/]{${e}}${t}$`);
}
function Dh(e) {
	return RegExp(`^[A-Za-z0-9_-]{${e}}$`);
}
const Oh = /^[0-9a-fA-F]{32}$/,
	kh = Eh(22, `==`),
	Ah = Dh(22),
	jh = /^[0-9a-fA-F]{40}$/,
	Mh = Eh(27, `=`),
	Nh = Dh(27),
	Ph = /^[0-9a-fA-F]{64}$/,
	Fh = Eh(43, `=`),
	Ih = Dh(43),
	Lh = /^[0-9a-fA-F]{96}$/,
	Rh = Eh(64, ``),
	zh = Dh(64),
	Bh = /^[0-9a-fA-F]{128}$/,
	Vh = Eh(86, `==`),
	Hh = Dh(86),
	q = V(`$ZodCheck`, (e, t) => {
		var n;
		(e._zod ??= {}), (e._zod.def = t), (n = e._zod).onattach ?? (n.onattach = []);
	});
var Uh = { number: `number`, bigint: `bigint`, object: `date` };
const Wh = V(`$ZodCheckLessThan`, (e, t) => {
		q.init(e, t);
		const n = Uh[typeof t.value];
		e._zod.onattach.push((e) => {
			const n = e._zod.bag,
				r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? 1 / 0;
			t.value < r && (t.inclusive ? (n.maximum = t.value) : (n.exclusiveMaximum = t.value));
		}),
			(e._zod.check = (r) => {
				(t.inclusive ? r.value <= t.value : r.value < t.value) ||
					r.issues.push({
						origin: n,
						code: `too_big`,
						maximum: typeof t.value == `object` ? t.value.getTime() : t.value,
						input: r.value,
						inclusive: t.inclusive,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	Gh = V(`$ZodCheckGreaterThan`, (e, t) => {
		q.init(e, t);
		const n = Uh[typeof t.value];
		e._zod.onattach.push((e) => {
			const n = e._zod.bag,
				r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -1 / 0;
			t.value > r && (t.inclusive ? (n.minimum = t.value) : (n.exclusiveMinimum = t.value));
		}),
			(e._zod.check = (r) => {
				(t.inclusive ? r.value >= t.value : r.value > t.value) ||
					r.issues.push({
						origin: n,
						code: `too_small`,
						minimum: typeof t.value == `object` ? t.value.getTime() : t.value,
						input: r.value,
						inclusive: t.inclusive,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	Kh = V(`$ZodCheckMultipleOf`, (e, t) => {
		q.init(e, t),
			e._zod.onattach.push((e) => {
				var n;
				(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
			}),
			(e._zod.check = (n) => {
				if (typeof n.value != typeof t.value) throw Error(`Cannot mix number and bigint in multiple_of check.`);
				(typeof n.value == `bigint` ? n.value % t.value === BigInt(0) : sp(n.value, t.value) === 0) ||
					n.issues.push({
						origin: typeof n.value,
						code: `not_multiple_of`,
						divisor: t.value,
						input: n.value,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	qh = V(`$ZodCheckNumberFormat`, (e, t) => {
		q.init(e, t), (t.format = t.format || `float64`);
		const n = t.format?.includes(`int`),
			r = n ? `int` : `number`,
			[i, a] = jp[t.format];
		e._zod.onattach.push((e) => {
			const r = e._zod.bag;
			(r.format = t.format), (r.minimum = i), (r.maximum = a), n && (r.pattern = vh);
		}),
			(e._zod.check = (o) => {
				const s = o.value;
				if (n) {
					if (!Number.isInteger(s)) {
						o.issues.push({ expected: r, format: t.format, code: `invalid_type`, continue: !1, input: s, inst: e });
						return;
					}
					if (!Number.isSafeInteger(s)) {
						s > 0
							? o.issues.push({
									input: s,
									code: `too_big`,
									maximum: 2 ** 53 - 1,
									note: `Integers must be within the safe integer range.`,
									inst: e,
									origin: r,
									inclusive: !0,
									continue: !t.abort,
								})
							: o.issues.push({
									input: s,
									code: `too_small`,
									minimum: -(2 ** 53 - 1),
									note: `Integers must be within the safe integer range.`,
									inst: e,
									origin: r,
									inclusive: !0,
									continue: !t.abort,
								});
						return;
					}
				}
				s < i &&
					o.issues.push({
						origin: `number`,
						input: s,
						code: `too_small`,
						minimum: i,
						inclusive: !0,
						inst: e,
						continue: !t.abort,
					}),
					s > a &&
						o.issues.push({
							origin: `number`,
							input: s,
							code: `too_big`,
							maximum: a,
							inclusive: !0,
							inst: e,
							continue: !t.abort,
						});
			});
	}),
	Jh = V(`$ZodCheckBigIntFormat`, (e, t) => {
		q.init(e, t);
		const [n, r] = Mp[t.format];
		e._zod.onattach.push((e) => {
			const i = e._zod.bag;
			(i.format = t.format), (i.minimum = n), (i.maximum = r);
		}),
			(e._zod.check = (i) => {
				const a = i.value;
				a < n &&
					i.issues.push({
						origin: `bigint`,
						input: a,
						code: `too_small`,
						minimum: n,
						inclusive: !0,
						inst: e,
						continue: !t.abort,
					}),
					a > r &&
						i.issues.push({
							origin: `bigint`,
							input: a,
							code: `too_big`,
							maximum: r,
							inclusive: !0,
							inst: e,
							continue: !t.abort,
						});
			});
	}),
	Yh = V(`$ZodCheckMaxSize`, (e, t) => {
		var n;
		q.init(e, t),
			(n = e._zod.def).when ??
				(n.when = (e) => {
					const t = e.value;
					return !ap(t) && t.size !== void 0;
				}),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag.maximum ?? 1 / 0;
				t.maximum < n && (e._zod.bag.maximum = t.maximum);
			}),
			(e._zod.check = (n) => {
				const r = n.value;
				r.size <= t.maximum ||
					n.issues.push({
						origin: Wp(r),
						code: `too_big`,
						maximum: t.maximum,
						inclusive: !0,
						input: r,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	Xh = V(`$ZodCheckMinSize`, (e, t) => {
		var n;
		q.init(e, t),
			(n = e._zod.def).when ??
				(n.when = (e) => {
					const t = e.value;
					return !ap(t) && t.size !== void 0;
				}),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag.minimum ?? -1 / 0;
				t.minimum > n && (e._zod.bag.minimum = t.minimum);
			}),
			(e._zod.check = (n) => {
				const r = n.value;
				r.size >= t.minimum ||
					n.issues.push({
						origin: Wp(r),
						code: `too_small`,
						minimum: t.minimum,
						inclusive: !0,
						input: r,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	Zh = V(`$ZodCheckSizeEquals`, (e, t) => {
		var n;
		q.init(e, t),
			(n = e._zod.def).when ??
				(n.when = (e) => {
					const t = e.value;
					return !ap(t) && t.size !== void 0;
				}),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag;
				(n.minimum = t.size), (n.maximum = t.size), (n.size = t.size);
			}),
			(e._zod.check = (n) => {
				const r = n.value,
					i = r.size;
				if (i === t.size) return;
				const a = i > t.size;
				n.issues.push({
					origin: Wp(r),
					...(a ? { code: `too_big`, maximum: t.size } : { code: `too_small`, minimum: t.size }),
					inclusive: !0,
					exact: !0,
					input: n.value,
					inst: e,
					continue: !t.abort,
				});
			});
	}),
	Qh = V(`$ZodCheckMaxLength`, (e, t) => {
		var n;
		q.init(e, t),
			(n = e._zod.def).when ??
				(n.when = (e) => {
					const t = e.value;
					return !ap(t) && t.length !== void 0;
				}),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag.maximum ?? 1 / 0;
				t.maximum < n && (e._zod.bag.maximum = t.maximum);
			}),
			(e._zod.check = (n) => {
				const r = n.value;
				if (r.length <= t.maximum) return;
				const i = Gp(r);
				n.issues.push({
					origin: i,
					code: `too_big`,
					maximum: t.maximum,
					inclusive: !0,
					input: r,
					inst: e,
					continue: !t.abort,
				});
			});
	}),
	$h = V(`$ZodCheckMinLength`, (e, t) => {
		var n;
		q.init(e, t),
			(n = e._zod.def).when ??
				(n.when = (e) => {
					const t = e.value;
					return !ap(t) && t.length !== void 0;
				}),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag.minimum ?? -1 / 0;
				t.minimum > n && (e._zod.bag.minimum = t.minimum);
			}),
			(e._zod.check = (n) => {
				const r = n.value;
				if (r.length >= t.minimum) return;
				const i = Gp(r);
				n.issues.push({
					origin: i,
					code: `too_small`,
					minimum: t.minimum,
					inclusive: !0,
					input: r,
					inst: e,
					continue: !t.abort,
				});
			});
	}),
	eg = V(`$ZodCheckLengthEquals`, (e, t) => {
		var n;
		q.init(e, t),
			(n = e._zod.def).when ??
				(n.when = (e) => {
					const t = e.value;
					return !ap(t) && t.length !== void 0;
				}),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag;
				(n.minimum = t.length), (n.maximum = t.length), (n.length = t.length);
			}),
			(e._zod.check = (n) => {
				const r = n.value,
					i = r.length;
				if (i === t.length) return;
				const a = Gp(r),
					o = i > t.length;
				n.issues.push({
					origin: a,
					...(o ? { code: `too_big`, maximum: t.length } : { code: `too_small`, minimum: t.length }),
					inclusive: !0,
					exact: !0,
					input: n.value,
					inst: e,
					continue: !t.abort,
				});
			});
	}),
	tg = V(`$ZodCheckStringFormat`, (e, t) => {
		var n, r;
		q.init(e, t),
			e._zod.onattach.push((e) => {
				const n = e._zod.bag;
				(n.format = t.format), t.pattern && ((n.patterns ??= new Set()), n.patterns.add(t.pattern));
			}),
			t.pattern
				? ((n = e._zod).check ??
					(n.check = (n) => {
						(t.pattern.lastIndex = 0),
							!t.pattern.test(n.value) &&
								n.issues.push({
									origin: `string`,
									code: `invalid_format`,
									format: t.format,
									input: n.value,
									...(t.pattern ? { pattern: t.pattern.toString() } : {}),
									inst: e,
									continue: !t.abort,
								});
					}))
				: ((r = e._zod).check ?? (r.check = () => {}));
	}),
	ng = V(`$ZodCheckRegex`, (e, t) => {
		tg.init(e, t),
			(e._zod.check = (n) => {
				(t.pattern.lastIndex = 0),
					!t.pattern.test(n.value) &&
						n.issues.push({
							origin: `string`,
							code: `invalid_format`,
							format: `regex`,
							input: n.value,
							pattern: t.pattern.toString(),
							inst: e,
							continue: !t.abort,
						});
			});
	}),
	rg = V(`$ZodCheckLowerCase`, (e, t) => {
		(t.pattern ??= Ch), tg.init(e, t);
	}),
	ig = V(`$ZodCheckUpperCase`, (e, t) => {
		(t.pattern ??= wh), tg.init(e, t);
	}),
	ag = V(`$ZodCheckIncludes`, (e, t) => {
		q.init(e, t);
		const n = Dp(t.includes),
			r = new RegExp(typeof t.position == `number` ? `^.{${t.position}}${n}` : n);
		(t.pattern = r),
			e._zod.onattach.push((e) => {
				const t = e._zod.bag;
				(t.patterns ??= new Set()), t.patterns.add(r);
			}),
			(e._zod.check = (n) => {
				n.value.includes(t.includes, t.position) ||
					n.issues.push({
						origin: `string`,
						code: `invalid_format`,
						format: `includes`,
						includes: t.includes,
						input: n.value,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	og = V(`$ZodCheckStartsWith`, (e, t) => {
		q.init(e, t);
		const n = RegExp(`^${Dp(t.prefix)}.*`);
		(t.pattern ??= n),
			e._zod.onattach.push((e) => {
				const t = e._zod.bag;
				(t.patterns ??= new Set()), t.patterns.add(n);
			}),
			(e._zod.check = (n) => {
				n.value.startsWith(t.prefix) ||
					n.issues.push({
						origin: `string`,
						code: `invalid_format`,
						format: `starts_with`,
						prefix: t.prefix,
						input: n.value,
						inst: e,
						continue: !t.abort,
					});
			});
	}),
	sg = V(`$ZodCheckEndsWith`, (e, t) => {
		q.init(e, t);
		const n = RegExp(`.*${Dp(t.suffix)}$`);
		(t.pattern ??= n),
			e._zod.onattach.push((e) => {
				const t = e._zod.bag;
				(t.patterns ??= new Set()), t.patterns.add(n);
			}),
			(e._zod.check = (n) => {
				n.value.endsWith(t.suffix) ||
					n.issues.push({
						origin: `string`,
						code: `invalid_format`,
						format: `ends_with`,
						suffix: t.suffix,
						input: n.value,
						inst: e,
						continue: !t.abort,
					});
			});
	});
function cg(e, t, n) {
	e.issues.length && t.issues.push(...Vp(n, e.issues));
}
const lg = V(`$ZodCheckProperty`, (e, t) => {
		q.init(e, t),
			(e._zod.check = (e) => {
				const n = t.schema._zod.run({ value: e.value[t.property], issues: [] }, {});
				if (n instanceof Promise) return n.then((n) => cg(n, e, t.property));
				cg(n, e, t.property);
			});
	}),
	ug = V(`$ZodCheckMimeType`, (e, t) => {
		q.init(e, t);
		const n = new Set(t.mime);
		e._zod.onattach.push((e) => {
			e._zod.bag.mime = t.mime;
		}),
			(e._zod.check = (r) => {
				n.has(r.value.type) ||
					r.issues.push({ code: `invalid_value`, values: t.mime, input: r.value.type, inst: e, continue: !t.abort });
			});
	}),
	dg = V(`$ZodCheckOverwrite`, (e, t) => {
		q.init(e, t),
			(e._zod.check = (e) => {
				e.value = t.tx(e.value);
			});
	});
var fg = class {
	constructor(e = []) {
		(this.content = []), (this.indent = 0), this && (this.args = e);
	}
	indented(e) {
		(this.indent += 1), e(this), --this.indent;
	}
	write(e) {
		if (typeof e == `function`) {
			e(this, { execution: `sync` }), e(this, { execution: `async` });
			return;
		}
		const t = e
				.split(`
`)
				.filter((e) => e),
			n = Math.min(...t.map((e) => e.length - e.trimStart().length)),
			r = t.map((e) => e.slice(n)).map((e) => ` `.repeat(this.indent * 2) + e);
		for (const e of r) this.content.push(e);
	}
	compile() {
		const e = Function,
			t = this?.args,
			n = [...(this?.content ?? [``]).map((e) => `  ${e}`)];
		return new e(
			...t,
			n.join(`
`),
		);
	}
};
const pg = { major: 4, minor: 3, patch: 6 },
	J = V(`$ZodType`, (e, t) => {
		var n;
		(e ??= {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = pg);
		const r = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has(`$ZodCheck`) && r.unshift(e);
		for (const t of r) for (const n of t._zod.onattach) n(e);
		if (r.length === 0)
			(n = e._zod).deferred ?? (n.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				});
		else {
			const t = (e, t, n) => {
					let r = Bp(e),
						i;
					for (const a of t) {
						if (a._zod.def.when) {
							if (!a._zod.def.when(e)) continue;
						} else if (r) continue;
						const t = e.issues.length,
							o = a._zod.check(e);
						if (o instanceof Promise && n?.async === !1) throw new Kf();
						if (i || o instanceof Promise)
							i = (i ?? Promise.resolve()).then(async () => {
								await o, e.issues.length !== t && (r ||= Bp(e, t));
							});
						else {
							if (e.issues.length === t) continue;
							r ||= Bp(e, t);
						}
					}
					return i ? i.then(() => e) : e;
				},
				n = (n, i, a) => {
					if (Bp(n)) return (n.aborted = !0), n;
					const o = t(i, r, a);
					if (o instanceof Promise) {
						if (a.async === !1) throw new Kf();
						return o.then((t) => e._zod.parse(t, a));
					}
					return e._zod.parse(o, a);
				};
			e._zod.run = (i, a) => {
				if (a.skipChecks) return e._zod.parse(i, a);
				if (a.direction === `backward`) {
					const t = e._zod.parse({ value: i.value, issues: [] }, { ...a, skipChecks: !0 });
					return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
				}
				const o = e._zod.parse(i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new Kf();
					return o.then((e) => t(e, r, a));
				}
				return t(o, r, a);
			};
		}
		U(e, `~standard`, () => ({
			validate: (t) => {
				try {
					const n = mm(e, t);
					return n.success ? { value: n.data } : { issues: n.error?.issues };
				} catch {
					return gm(e, t).then((e) => (e.success ? { value: e.data } : { issues: e.error?.issues }));
				}
			},
			vendor: `zod`,
			version: 1,
		}));
	}),
	mg = V(`$ZodString`, (e, t) => {
		J.init(e, t),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? gh(e._zod.bag)),
			(e._zod.parse = (n, r) => {
				if (t.coerce)
					try {
						n.value = String(n.value);
					} catch {}
				return (
					typeof n.value == `string` ||
						n.issues.push({ expected: `string`, code: `invalid_type`, input: n.value, inst: e }),
					n
				);
			});
	}),
	Y = V(`$ZodStringFormat`, (e, t) => {
		tg.init(e, t), mg.init(e, t);
	}),
	hg = V(`$ZodGUID`, (e, t) => {
		(t.pattern ??= Hm), Y.init(e, t);
	}),
	gg = V(`$ZodUUID`, (e, t) => {
		if (t.version) {
			const e = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
			if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ??= Um(e);
		} else t.pattern ??= Um();
		Y.init(e, t);
	}),
	_g = V(`$ZodEmail`, (e, t) => {
		(t.pattern ??= qm), Y.init(e, t);
	}),
	vg = V(`$ZodURL`, (e, t) => {
		Y.init(e, t),
			(e._zod.check = (n) => {
				try {
					const r = n.value.trim(),
						i = new URL(r);
					t.hostname &&
						((t.hostname.lastIndex = 0),
						t.hostname.test(i.hostname) ||
							n.issues.push({
								code: `invalid_format`,
								format: `url`,
								note: `Invalid hostname`,
								pattern: t.hostname.source,
								input: n.value,
								inst: e,
								continue: !t.abort,
							})),
						t.protocol &&
							((t.protocol.lastIndex = 0),
							t.protocol.test(i.protocol.endsWith(`:`) ? i.protocol.slice(0, -1) : i.protocol) ||
								n.issues.push({
									code: `invalid_format`,
									format: `url`,
									note: `Invalid protocol`,
									pattern: t.protocol.source,
									input: n.value,
									inst: e,
									continue: !t.abort,
								})),
						t.normalize ? (n.value = i.href) : (n.value = r);
					return;
				} catch {
					n.issues.push({ code: `invalid_format`, format: `url`, input: n.value, inst: e, continue: !t.abort });
				}
			});
	}),
	yg = V(`$ZodEmoji`, (e, t) => {
		(t.pattern ??= eh()), Y.init(e, t);
	}),
	bg = V(`$ZodNanoID`, (e, t) => {
		(t.pattern ??= zm), Y.init(e, t);
	}),
	xg = V(`$ZodCUID`, (e, t) => {
		(t.pattern ??= Pm), Y.init(e, t);
	}),
	Sg = V(`$ZodCUID2`, (e, t) => {
		(t.pattern ??= Fm), Y.init(e, t);
	}),
	Cg = V(`$ZodULID`, (e, t) => {
		(t.pattern ??= Im), Y.init(e, t);
	}),
	wg = V(`$ZodXID`, (e, t) => {
		(t.pattern ??= Lm), Y.init(e, t);
	}),
	Tg = V(`$ZodKSUID`, (e, t) => {
		(t.pattern ??= Rm), Y.init(e, t);
	}),
	Eg = V(`$ZodISODateTime`, (e, t) => {
		(t.pattern ??= hh(t)), Y.init(e, t);
	}),
	Dg = V(`$ZodISODate`, (e, t) => {
		(t.pattern ??= fh), Y.init(e, t);
	}),
	Og = V(`$ZodISOTime`, (e, t) => {
		(t.pattern ??= mh(t)), Y.init(e, t);
	}),
	kg = V(`$ZodISODuration`, (e, t) => {
		(t.pattern ??= Bm), Y.init(e, t);
	}),
	Ag = V(`$ZodIPv4`, (e, t) => {
		(t.pattern ??= th), Y.init(e, t), (e._zod.bag.format = `ipv4`);
	}),
	jg = V(`$ZodIPv6`, (e, t) => {
		(t.pattern ??= nh),
			Y.init(e, t),
			(e._zod.bag.format = `ipv6`),
			(e._zod.check = (n) => {
				try {
					new URL(`http://[${n.value}]`);
				} catch {
					n.issues.push({ code: `invalid_format`, format: `ipv6`, input: n.value, inst: e, continue: !t.abort });
				}
			});
	}),
	Mg = V(`$ZodMAC`, (e, t) => {
		(t.pattern ??= rh(t.delimiter)), Y.init(e, t), (e._zod.bag.format = `mac`);
	}),
	Ng = V(`$ZodCIDRv4`, (e, t) => {
		(t.pattern ??= ih), Y.init(e, t);
	}),
	Pg = V(`$ZodCIDRv6`, (e, t) => {
		(t.pattern ??= ah),
			Y.init(e, t),
			(e._zod.check = (n) => {
				const r = n.value.split(`/`);
				try {
					if (r.length !== 2) throw Error();
					const [e, t] = r;
					if (!t) throw Error();
					const n = Number(t);
					if (`${n}` !== t || n < 0 || n > 128) throw Error();
					new URL(`http://[${e}]`);
				} catch {
					n.issues.push({ code: `invalid_format`, format: `cidrv6`, input: n.value, inst: e, continue: !t.abort });
				}
			});
	});
function Fg(e) {
	if (e === ``) return !0;
	if (e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
const Ig = V(`$ZodBase64`, (e, t) => {
	(t.pattern ??= oh),
		Y.init(e, t),
		(e._zod.bag.contentEncoding = `base64`),
		(e._zod.check = (n) => {
			Fg(n.value) ||
				n.issues.push({ code: `invalid_format`, format: `base64`, input: n.value, inst: e, continue: !t.abort });
		});
});
function Lg(e) {
	if (!sh.test(e)) return !1;
	const t = e.replace(/[-_]/g, (e) => (e === `-` ? `+` : `/`));
	return Fg(t.padEnd(Math.ceil(t.length / 4) * 4, `=`));
}
const Rg = V(`$ZodBase64URL`, (e, t) => {
		(t.pattern ??= sh),
			Y.init(e, t),
			(e._zod.bag.contentEncoding = `base64url`),
			(e._zod.check = (n) => {
				Lg(n.value) ||
					n.issues.push({ code: `invalid_format`, format: `base64url`, input: n.value, inst: e, continue: !t.abort });
			});
	}),
	zg = V(`$ZodE164`, (e, t) => {
		(t.pattern ??= uh), Y.init(e, t);
	});
function Bg(e, t = null) {
	try {
		const n = e.split(`.`);
		if (n.length !== 3) return !1;
		const [r] = n;
		if (!r) return !1;
		const i = JSON.parse(atob(r));
		return !((`typ` in i && i?.typ !== `JWT`) || !i.alg || (t && (!(`alg` in i) || i.alg !== t)));
	} catch {
		return !1;
	}
}
const Vg = V(`$ZodJWT`, (e, t) => {
		Y.init(e, t),
			(e._zod.check = (n) => {
				Bg(n.value, t.alg) ||
					n.issues.push({ code: `invalid_format`, format: `jwt`, input: n.value, inst: e, continue: !t.abort });
			});
	}),
	Hg = V(`$ZodCustomStringFormat`, (e, t) => {
		Y.init(e, t),
			(e._zod.check = (n) => {
				t.fn(n.value) ||
					n.issues.push({ code: `invalid_format`, format: t.format, input: n.value, inst: e, continue: !t.abort });
			});
	}),
	Ug = V(`$ZodNumber`, (e, t) => {
		J.init(e, t),
			(e._zod.pattern = e._zod.bag.pattern ?? yh),
			(e._zod.parse = (n, r) => {
				if (t.coerce)
					try {
						n.value = Number(n.value);
					} catch {}
				const i = n.value;
				if (typeof i == `number` && !Number.isNaN(i) && Number.isFinite(i)) return n;
				const a = typeof i == `number` ? (Number.isNaN(i) ? `NaN` : Number.isFinite(i) ? void 0 : `Infinity`) : void 0;
				return (
					n.issues.push({ expected: `number`, code: `invalid_type`, input: i, inst: e, ...(a ? { received: a } : {}) }),
					n
				);
			});
	}),
	Wg = V(`$ZodNumberFormat`, (e, t) => {
		qh.init(e, t), Ug.init(e, t);
	}),
	Gg = V(`$ZodBoolean`, (e, t) => {
		J.init(e, t),
			(e._zod.pattern = bh),
			(e._zod.parse = (n, r) => {
				if (t.coerce)
					try {
						n.value = !!n.value;
					} catch {}
				const i = n.value;
				return (
					typeof i == `boolean` || n.issues.push({ expected: `boolean`, code: `invalid_type`, input: i, inst: e }), n
				);
			});
	}),
	Kg = V(`$ZodBigInt`, (e, t) => {
		J.init(e, t),
			(e._zod.pattern = _h),
			(e._zod.parse = (n, r) => {
				if (t.coerce)
					try {
						n.value = BigInt(n.value);
					} catch {}
				return (
					typeof n.value == `bigint` ||
						n.issues.push({ expected: `bigint`, code: `invalid_type`, input: n.value, inst: e }),
					n
				);
			});
	}),
	qg = V(`$ZodBigIntFormat`, (e, t) => {
		Jh.init(e, t), Kg.init(e, t);
	}),
	Jg = V(`$ZodSymbol`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (t, n) => {
				const r = t.value;
				return (
					typeof r == `symbol` || t.issues.push({ expected: `symbol`, code: `invalid_type`, input: r, inst: e }), t
				);
			});
	}),
	Yg = V(`$ZodUndefined`, (e, t) => {
		J.init(e, t),
			(e._zod.pattern = Sh),
			(e._zod.values = new Set([void 0])),
			(e._zod.optin = `optional`),
			(e._zod.optout = `optional`),
			(e._zod.parse = (t, n) => {
				const r = t.value;
				return r === void 0 || t.issues.push({ expected: `undefined`, code: `invalid_type`, input: r, inst: e }), t;
			});
	}),
	Xg = V(`$ZodNull`, (e, t) => {
		J.init(e, t),
			(e._zod.pattern = xh),
			(e._zod.values = new Set([null])),
			(e._zod.parse = (t, n) => {
				const r = t.value;
				return r === null || t.issues.push({ expected: `null`, code: `invalid_type`, input: r, inst: e }), t;
			});
	}),
	Zg = V(`$ZodAny`, (e, t) => {
		J.init(e, t), (e._zod.parse = (e) => e);
	}),
	Qg = V(`$ZodUnknown`, (e, t) => {
		J.init(e, t), (e._zod.parse = (e) => e);
	}),
	$g = V(`$ZodNever`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (t, n) => (
				t.issues.push({ expected: `never`, code: `invalid_type`, input: t.value, inst: e }), t
			));
	}),
	e_ = V(`$ZodVoid`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (t, n) => {
				const r = t.value;
				return r === void 0 || t.issues.push({ expected: `void`, code: `invalid_type`, input: r, inst: e }), t;
			});
	}),
	t_ = V(`$ZodDate`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (n, r) => {
				if (t.coerce)
					try {
						n.value = new Date(n.value);
					} catch {}
				const i = n.value,
					a = i instanceof Date;
				return (
					(a && !Number.isNaN(i.getTime())) ||
						n.issues.push({
							expected: `date`,
							code: `invalid_type`,
							input: i,
							...(a ? { received: `Invalid Date` } : {}),
							inst: e,
						}),
					n
				);
			});
	});
function n_(e, t, n) {
	e.issues.length && t.issues.push(...Vp(n, e.issues)), (t.value[n] = e.value);
}
const r_ = V(`$ZodArray`, (e, t) => {
	J.init(e, t),
		(e._zod.parse = (n, r) => {
			const i = n.value;
			if (!Array.isArray(i)) return n.issues.push({ expected: `array`, code: `invalid_type`, input: i, inst: e }), n;
			n.value = Array(i.length);
			const a = [];
			for (let e = 0; e < i.length; e++) {
				const o = i[e],
					s = t.element._zod.run({ value: o, issues: [] }, r);
				s instanceof Promise ? a.push(s.then((t) => n_(t, n, e))) : n_(s, n, e);
			}
			return a.length ? Promise.all(a).then(() => n) : n;
		});
});
function i_(e, t, n, r, i) {
	if (e.issues.length) {
		if (i && !(n in r)) return;
		t.issues.push(...Vp(n, e.issues));
	}
	e.value === void 0 ? n in r && (t.value[n] = void 0) : (t.value[n] = e.value);
}
function a_(e) {
	const t = Object.keys(e.shape);
	for (const n of t)
		if (!e.shape?.[n]?._zod?.traits?.has(`$ZodType`))
			throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	const n = Ap(e.shape);
	return { ...e, keys: t, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(n) };
}
function o_(e, t, n, r, i, a) {
	const o = [],
		s = i.keySet,
		c = i.catchall._zod,
		l = c.def.type,
		u = c.optout === `optional`;
	for (const i in t) {
		if (s.has(i)) continue;
		if (l === `never`) {
			o.push(i);
			continue;
		}
		const a = c.run({ value: t[i], issues: [] }, r);
		a instanceof Promise ? e.push(a.then((e) => i_(e, n, i, t, u))) : i_(a, n, i, t, u);
	}
	return (
		o.length && n.issues.push({ code: `unrecognized_keys`, keys: o, input: t, inst: a }),
		e.length ? Promise.all(e).then(() => n) : n
	);
}
const s_ = V(`$ZodObject`, (e, t) => {
		if ((J.init(e, t), !Object.getOwnPropertyDescriptor(t, `shape`)?.get)) {
			const e = t.shape;
			Object.defineProperty(t, `shape`, {
				get: () => {
					const n = { ...e };
					return Object.defineProperty(t, `shape`, { value: n }), n;
				},
			});
		}
		const n = ip(() => a_(t));
		U(e._zod, `propValues`, () => {
			const e = t.shape,
				n = {};
			for (const t in e) {
				const r = e[t]._zod;
				if (r.values) {
					n[t] ?? (n[t] = new Set());
					for (const e of r.values) n[t].add(e);
				}
			}
			return n;
		});
		let r = yp,
			i = t.catchall,
			a;
		e._zod.parse = (t, o) => {
			a ??= n.value;
			const s = t.value;
			if (!r(s)) return t.issues.push({ expected: `object`, code: `invalid_type`, input: s, inst: e }), t;
			t.value = {};
			const c = [],
				l = a.shape;
			for (const e of a.keys) {
				const n = l[e],
					r = n._zod.optout === `optional`,
					i = n._zod.run({ value: s[e], issues: [] }, o);
				i instanceof Promise ? c.push(i.then((n) => i_(n, t, e, s, r))) : i_(i, t, e, s, r);
			}
			return i ? o_(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
		};
	}),
	c_ = V(`$ZodObjectJIT`, (e, t) => {
		s_.init(e, t);
		let n = e._zod.parse,
			r = ip(() => a_(t)),
			i = (e) => {
				const t = new fg([`shape`, `payload`, `ctx`]),
					n = r.value,
					i = (e) => {
						const t = gp(e);
						return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
					};
				t.write(`const input = payload.value;`);
				let a = Object.create(null),
					o = 0;
				for (const e of n.keys) a[e] = `key_${o++}`;
				t.write(`const newResult = {};`);
				for (const r of n.keys) {
					const n = a[r],
						o = gp(r),
						s = e[r]?._zod?.optout === `optional`;
					t.write(`const ${n} = ${i(r)};`),
						s
							? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `)
							: t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `);
				}
				t.write(`payload.value = newResult;`), t.write(`return payload;`);
				const s = t.compile();
				return (t, n) => s(e, t, n);
			},
			a,
			o = yp,
			s = !Jf.jitless,
			c = s && bp.value,
			l = t.catchall,
			u;
		e._zod.parse = (d, f) => {
			u ??= r.value;
			const p = d.value;
			return o(p)
				? s && c && f?.async === !1 && f.jitless !== !0
					? ((a ||= i(t.shape)), (d = a(d, f)), l ? o_([], p, d, f, u, e) : d)
					: n(d, f)
				: (d.issues.push({ expected: `object`, code: `invalid_type`, input: p, inst: e }), d);
		};
	});
function l_(e, t, n, r) {
	for (const n of e) if (n.issues.length === 0) return (t.value = n.value), t;
	const i = e.filter((e) => !Bp(e));
	return i.length === 1
		? ((t.value = i[0].value), i[0])
		: (t.issues.push({
				code: `invalid_union`,
				input: t.value,
				inst: n,
				errors: e.map((e) => e.issues.map((e) => Up(e, r, Yf()))),
			}),
			t);
}
const u_ = V(`$ZodUnion`, (e, t) => {
	J.init(e, t),
		U(e._zod, `optin`, () => (t.options.some((e) => e._zod.optin === `optional`) ? `optional` : void 0)),
		U(e._zod, `optout`, () => (t.options.some((e) => e._zod.optout === `optional`) ? `optional` : void 0)),
		U(e._zod, `values`, () => {
			if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
		}),
		U(e._zod, `pattern`, () => {
			if (t.options.every((e) => e._zod.pattern)) {
				const e = t.options.map((e) => e._zod.pattern);
				return RegExp(`^(${e.map((e) => op(e.source)).join(`|`)})$`);
			}
		});
	const n = t.options.length === 1,
		r = t.options[0]._zod.run;
	e._zod.parse = (i, a) => {
		if (n) return r(i, a);
		let o = !1,
			s = [];
		for (const e of t.options) {
			const t = e._zod.run({ value: i.value, issues: [] }, a);
			if (t instanceof Promise) s.push(t), (o = !0);
			else {
				if (t.issues.length === 0) return t;
				s.push(t);
			}
		}
		return o ? Promise.all(s).then((t) => l_(t, i, e, a)) : l_(s, i, e, a);
	};
});
function d_(e, t, n, r) {
	const i = e.filter((e) => e.issues.length === 0);
	return i.length === 1
		? ((t.value = i[0].value), t)
		: (i.length === 0
				? t.issues.push({
						code: `invalid_union`,
						input: t.value,
						inst: n,
						errors: e.map((e) => e.issues.map((e) => Up(e, r, Yf()))),
					})
				: t.issues.push({ code: `invalid_union`, input: t.value, inst: n, errors: [], inclusive: !1 }),
			t);
}
const f_ = V(`$ZodXor`, (e, t) => {
		u_.init(e, t), (t.inclusive = !1);
		const n = t.options.length === 1,
			r = t.options[0]._zod.run;
		e._zod.parse = (i, a) => {
			if (n) return r(i, a);
			let o = !1,
				s = [];
			for (const e of t.options) {
				const t = e._zod.run({ value: i.value, issues: [] }, a);
				t instanceof Promise ? (s.push(t), (o = !0)) : s.push(t);
			}
			return o ? Promise.all(s).then((t) => d_(t, i, e, a)) : d_(s, i, e, a);
		};
	}),
	p_ = V(`$ZodDiscriminatedUnion`, (e, t) => {
		(t.inclusive = !1), u_.init(e, t);
		const n = e._zod.parse;
		U(e._zod, `propValues`, () => {
			const e = {};
			for (const n of t.options) {
				const r = n._zod.propValues;
				if (!r || Object.keys(r).length === 0)
					throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
				for (const [t, n] of Object.entries(r)) {
					e[t] || (e[t] = new Set());
					for (const r of n) e[t].add(r);
				}
			}
			return e;
		});
		const r = ip(() => {
			const e = t.options,
				n = new Map();
			for (const r of e) {
				const e = r._zod.propValues?.[t.discriminator];
				if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
				for (const t of e) {
					if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
					n.set(t, r);
				}
			}
			return n;
		});
		e._zod.parse = (i, a) => {
			const o = i.value;
			if (!yp(o)) return i.issues.push({ code: `invalid_type`, expected: `object`, input: o, inst: e }), i;
			const s = r.value.get(o?.[t.discriminator]);
			return s
				? s._zod.run(i, a)
				: t.unionFallback
					? n(i, a)
					: (i.issues.push({
							code: `invalid_union`,
							errors: [],
							note: `No matching discriminator`,
							discriminator: t.discriminator,
							input: o,
							path: [t.discriminator],
							inst: e,
						}),
						i);
		};
	}),
	m_ = V(`$ZodIntersection`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (e, n) => {
				const r = e.value,
					i = t.left._zod.run({ value: r, issues: [] }, n),
					a = t.right._zod.run({ value: r, issues: [] }, n);
				return i instanceof Promise || a instanceof Promise
					? Promise.all([i, a]).then(([t, n]) => g_(e, t, n))
					: g_(e, i, a);
			});
	});
function h_(e, t) {
	if (e === t || (e instanceof Date && t instanceof Date && +e == +t)) return { valid: !0, data: e };
	if (xp(e) && xp(t)) {
		const n = Object.keys(t),
			r = Object.keys(e).filter((e) => n.indexOf(e) !== -1),
			i = { ...e, ...t };
		for (const n of r) {
			const r = h_(e[n], t[n]);
			if (!r.valid) return { valid: !1, mergeErrorPath: [n, ...r.mergeErrorPath] };
			i[n] = r.data;
		}
		return { valid: !0, data: i };
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
		const n = [];
		for (let r = 0; r < e.length; r++) {
			const i = e[r],
				a = t[r],
				o = h_(i, a);
			if (!o.valid) return { valid: !1, mergeErrorPath: [r, ...o.mergeErrorPath] };
			n.push(o.data);
		}
		return { valid: !0, data: n };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function g_(e, t, n) {
	let r = new Map(),
		i;
	for (const n of t.issues)
		if (n.code === `unrecognized_keys`) {
			i ??= n;
			for (const e of n.keys) r.has(e) || r.set(e, {}), (r.get(e).l = !0);
		} else e.issues.push(n);
	for (const t of n.issues)
		if (t.code === `unrecognized_keys`) for (const e of t.keys) r.has(e) || r.set(e, {}), (r.get(e).r = !0);
		else e.issues.push(t);
	const a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if ((a.length && i && e.issues.push({ ...i, keys: a }), Bp(e))) return e;
	const o = h_(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return (e.value = o.data), e;
}
const __ = V(`$ZodTuple`, (e, t) => {
	J.init(e, t);
	const n = t.items;
	e._zod.parse = (r, i) => {
		const a = r.value;
		if (!Array.isArray(a)) return r.issues.push({ input: a, inst: e, expected: `tuple`, code: `invalid_type` }), r;
		r.value = [];
		const o = [],
			s = [...n].reverse().findIndex((e) => e._zod.optin !== `optional`),
			c = s === -1 ? 0 : n.length - s;
		if (!t.rest) {
			const t = a.length > n.length,
				i = a.length < c - 1;
			if (t || i)
				return (
					r.issues.push({
						...(t ? { code: `too_big`, maximum: n.length, inclusive: !0 } : { code: `too_small`, minimum: n.length }),
						input: a,
						inst: e,
						origin: `array`,
					}),
					r
				);
		}
		let l = -1;
		for (const e of n) {
			if ((l++, l >= a.length && l >= c)) continue;
			const t = e._zod.run({ value: a[l], issues: [] }, i);
			t instanceof Promise ? o.push(t.then((e) => v_(e, r, l))) : v_(t, r, l);
		}
		if (t.rest) {
			const e = a.slice(n.length);
			for (const n of e) {
				l++;
				const e = t.rest._zod.run({ value: n, issues: [] }, i);
				e instanceof Promise ? o.push(e.then((e) => v_(e, r, l))) : v_(e, r, l);
			}
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function v_(e, t, n) {
	e.issues.length && t.issues.push(...Vp(n, e.issues)), (t.value[n] = e.value);
}
const y_ = V(`$ZodRecord`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (n, r) => {
				const i = n.value;
				if (!xp(i)) return n.issues.push({ expected: `record`, code: `invalid_type`, input: i, inst: e }), n;
				const a = [],
					o = t.keyType._zod.values;
				if (o) {
					n.value = {};
					const s = new Set();
					for (const e of o)
						if (typeof e == `string` || typeof e == `number` || typeof e == `symbol`) {
							s.add(typeof e == `number` ? e.toString() : e);
							const o = t.valueType._zod.run({ value: i[e], issues: [] }, r);
							o instanceof Promise
								? a.push(
										o.then((t) => {
											t.issues.length && n.issues.push(...Vp(e, t.issues)), (n.value[e] = t.value);
										}),
									)
								: (o.issues.length && n.issues.push(...Vp(e, o.issues)), (n.value[e] = o.value));
						}
					let c;
					for (const e in i) s.has(e) || ((c ??= []), c.push(e));
					c && c.length > 0 && n.issues.push({ code: `unrecognized_keys`, input: i, inst: e, keys: c });
				} else {
					n.value = {};
					for (const o of Reflect.ownKeys(i)) {
						if (o === `__proto__`) continue;
						let s = t.keyType._zod.run({ value: o, issues: [] }, r);
						if (s instanceof Promise) throw Error(`Async schemas not supported in object keys currently`);
						if (typeof o == `string` && yh.test(o) && s.issues.length) {
							const e = t.keyType._zod.run({ value: Number(o), issues: [] }, r);
							if (e instanceof Promise) throw Error(`Async schemas not supported in object keys currently`);
							e.issues.length === 0 && (s = e);
						}
						if (s.issues.length) {
							t.mode === `loose`
								? (n.value[o] = i[o])
								: n.issues.push({
										code: `invalid_key`,
										origin: `record`,
										issues: s.issues.map((e) => Up(e, r, Yf())),
										input: o,
										path: [o],
										inst: e,
									});
							continue;
						}
						const c = t.valueType._zod.run({ value: i[o], issues: [] }, r);
						c instanceof Promise
							? a.push(
									c.then((e) => {
										e.issues.length && n.issues.push(...Vp(o, e.issues)), (n.value[s.value] = e.value);
									}),
								)
							: (c.issues.length && n.issues.push(...Vp(o, c.issues)), (n.value[s.value] = c.value));
					}
				}
				return a.length ? Promise.all(a).then(() => n) : n;
			});
	}),
	b_ = V(`$ZodMap`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (n, r) => {
				const i = n.value;
				if (!(i instanceof Map)) return n.issues.push({ expected: `map`, code: `invalid_type`, input: i, inst: e }), n;
				const a = [];
				n.value = new Map();
				for (const [o, s] of i) {
					const c = t.keyType._zod.run({ value: o, issues: [] }, r),
						l = t.valueType._zod.run({ value: s, issues: [] }, r);
					c instanceof Promise || l instanceof Promise
						? a.push(
								Promise.all([c, l]).then(([t, a]) => {
									x_(t, a, n, o, i, e, r);
								}),
							)
						: x_(c, l, n, o, i, e, r);
				}
				return a.length ? Promise.all(a).then(() => n) : n;
			});
	});
function x_(e, t, n, r, i, a, o) {
	e.issues.length &&
		(Tp.has(typeof r)
			? n.issues.push(...Vp(r, e.issues))
			: n.issues.push({
					code: `invalid_key`,
					origin: `map`,
					input: i,
					inst: a,
					issues: e.issues.map((e) => Up(e, o, Yf())),
				})),
		t.issues.length &&
			(Tp.has(typeof r)
				? n.issues.push(...Vp(r, t.issues))
				: n.issues.push({
						origin: `map`,
						code: `invalid_element`,
						input: i,
						inst: a,
						key: r,
						issues: t.issues.map((e) => Up(e, o, Yf())),
					})),
		n.value.set(e.value, t.value);
}
const S_ = V(`$ZodSet`, (e, t) => {
	J.init(e, t),
		(e._zod.parse = (n, r) => {
			const i = n.value;
			if (!(i instanceof Set)) return n.issues.push({ input: i, inst: e, expected: `set`, code: `invalid_type` }), n;
			const a = [];
			n.value = new Set();
			for (const e of i) {
				const i = t.valueType._zod.run({ value: e, issues: [] }, r);
				i instanceof Promise ? a.push(i.then((e) => C_(e, n))) : C_(i, n);
			}
			return a.length ? Promise.all(a).then(() => n) : n;
		});
});
function C_(e, t) {
	e.issues.length && t.issues.push(...e.issues), t.value.add(e.value);
}
const w_ = V(`$ZodEnum`, (e, t) => {
		J.init(e, t);
		const n = np(t.entries),
			r = new Set(n);
		(e._zod.values = r),
			(e._zod.pattern = RegExp(
				`^(${n
					.filter((e) => Tp.has(typeof e))
					.map((e) => (typeof e == `string` ? Dp(e) : e.toString()))
					.join(`|`)})$`,
			)),
			(e._zod.parse = (t, i) => {
				const a = t.value;
				return r.has(a) || t.issues.push({ code: `invalid_value`, values: n, input: a, inst: e }), t;
			});
	}),
	T_ = V(`$ZodLiteral`, (e, t) => {
		if ((J.init(e, t), t.values.length === 0)) throw Error(`Cannot create literal schema with no valid values`);
		const n = new Set(t.values);
		(e._zod.values = n),
			(e._zod.pattern = RegExp(
				`^(${t.values.map((e) => (typeof e == `string` ? Dp(e) : e ? Dp(e.toString()) : String(e))).join(`|`)})$`,
			)),
			(e._zod.parse = (r, i) => {
				const a = r.value;
				return n.has(a) || r.issues.push({ code: `invalid_value`, values: t.values, input: a, inst: e }), r;
			});
	}),
	E_ = V(`$ZodFile`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (t, n) => {
				const r = t.value;
				return r instanceof File || t.issues.push({ expected: `file`, code: `invalid_type`, input: r, inst: e }), t;
			});
	}),
	D_ = V(`$ZodTransform`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (n, r) => {
				if (r.direction === `backward`) throw new qf(e.constructor.name);
				const i = t.transform(n.value, n);
				if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => ((n.value = e), n));
				if (i instanceof Promise) throw new Kf();
				return (n.value = i), n;
			});
	});
function O_(e, t) {
	return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const k_ = V(`$ZodOptional`, (e, t) => {
		J.init(e, t),
			(e._zod.optin = `optional`),
			(e._zod.optout = `optional`),
			U(e._zod, `values`, () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0)),
			U(e._zod, `pattern`, () => {
				const e = t.innerType._zod.pattern;
				return e ? RegExp(`^(${op(e.source)})?$`) : void 0;
			}),
			(e._zod.parse = (e, n) => {
				if (t.innerType._zod.optin === `optional`) {
					const r = t.innerType._zod.run(e, n);
					return r instanceof Promise ? r.then((t) => O_(t, e.value)) : O_(r, e.value);
				}
				return e.value === void 0 ? e : t.innerType._zod.run(e, n);
			});
	}),
	A_ = V(`$ZodExactOptional`, (e, t) => {
		k_.init(e, t),
			U(e._zod, `values`, () => t.innerType._zod.values),
			U(e._zod, `pattern`, () => t.innerType._zod.pattern),
			(e._zod.parse = (e, n) => t.innerType._zod.run(e, n));
	}),
	j_ = V(`$ZodNullable`, (e, t) => {
		J.init(e, t),
			U(e._zod, `optin`, () => t.innerType._zod.optin),
			U(e._zod, `optout`, () => t.innerType._zod.optout),
			U(e._zod, `pattern`, () => {
				const e = t.innerType._zod.pattern;
				return e ? RegExp(`^(${op(e.source)}|null)$`) : void 0;
			}),
			U(e._zod, `values`, () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (e, n) => (e.value === null ? e : t.innerType._zod.run(e, n)));
	}),
	M_ = V(`$ZodDefault`, (e, t) => {
		J.init(e, t),
			(e._zod.optin = `optional`),
			U(e._zod, `values`, () => t.innerType._zod.values),
			(e._zod.parse = (e, n) => {
				if (n.direction === `backward`) return t.innerType._zod.run(e, n);
				if (e.value === void 0) return (e.value = t.defaultValue), e;
				const r = t.innerType._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => N_(e, t)) : N_(r, t);
			});
	});
function N_(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
const P_ = V(`$ZodPrefault`, (e, t) => {
		J.init(e, t),
			(e._zod.optin = `optional`),
			U(e._zod, `values`, () => t.innerType._zod.values),
			(e._zod.parse = (e, n) => (
				n.direction === `backward` || (e.value === void 0 && (e.value = t.defaultValue)), t.innerType._zod.run(e, n)
			));
	}),
	F_ = V(`$ZodNonOptional`, (e, t) => {
		J.init(e, t),
			U(e._zod, `values`, () => {
				const e = t.innerType._zod.values;
				return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
			}),
			(e._zod.parse = (n, r) => {
				const i = t.innerType._zod.run(n, r);
				return i instanceof Promise ? i.then((t) => I_(t, e)) : I_(i, e);
			});
	});
function I_(e, t) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: `invalid_type`, expected: `nonoptional`, input: e.value, inst: t }),
		e
	);
}
const L_ = V(`$ZodSuccess`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (e, n) => {
				if (n.direction === `backward`) throw new qf(`ZodSuccess`);
				const r = t.innerType._zod.run(e, n);
				return r instanceof Promise
					? r.then((t) => ((e.value = t.issues.length === 0), e))
					: ((e.value = r.issues.length === 0), e);
			});
	}),
	R_ = V(`$ZodCatch`, (e, t) => {
		J.init(e, t),
			U(e._zod, `optin`, () => t.innerType._zod.optin),
			U(e._zod, `optout`, () => t.innerType._zod.optout),
			U(e._zod, `values`, () => t.innerType._zod.values),
			(e._zod.parse = (e, n) => {
				if (n.direction === `backward`) return t.innerType._zod.run(e, n);
				const r = t.innerType._zod.run(e, n);
				return r instanceof Promise
					? r.then(
							(r) => (
								(e.value = r.value),
								r.issues.length &&
									((e.value = t.catchValue({
										...e,
										error: { issues: r.issues.map((e) => Up(e, n, Yf())) },
										input: e.value,
									})),
									(e.issues = [])),
								e
							),
						)
					: ((e.value = r.value),
						r.issues.length &&
							((e.value = t.catchValue({
								...e,
								error: { issues: r.issues.map((e) => Up(e, n, Yf())) },
								input: e.value,
							})),
							(e.issues = [])),
						e);
			});
	}),
	z_ = V(`$ZodNaN`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (t, n) => (
				(typeof t.value != `number` || !Number.isNaN(t.value)) &&
					t.issues.push({ input: t.value, inst: e, expected: `nan`, code: `invalid_type` }),
				t
			));
	}),
	B_ = V(`$ZodPipe`, (e, t) => {
		J.init(e, t),
			U(e._zod, `values`, () => t.in._zod.values),
			U(e._zod, `optin`, () => t.in._zod.optin),
			U(e._zod, `optout`, () => t.out._zod.optout),
			U(e._zod, `propValues`, () => t.in._zod.propValues),
			(e._zod.parse = (e, n) => {
				if (n.direction === `backward`) {
					const r = t.out._zod.run(e, n);
					return r instanceof Promise ? r.then((e) => V_(e, t.in, n)) : V_(r, t.in, n);
				}
				const r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => V_(e, t.out, n)) : V_(r, t.out, n);
			});
	});
function V_(e, t, n) {
	return e.issues.length ? ((e.aborted = !0), e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const H_ = V(`$ZodCodec`, (e, t) => {
	J.init(e, t),
		U(e._zod, `values`, () => t.in._zod.values),
		U(e._zod, `optin`, () => t.in._zod.optin),
		U(e._zod, `optout`, () => t.out._zod.optout),
		U(e._zod, `propValues`, () => t.in._zod.propValues),
		(e._zod.parse = (e, n) => {
			if ((n.direction || `forward`) === `forward`) {
				const r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => U_(e, t, n)) : U_(r, t, n);
			} else {
				const r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => U_(e, t, n)) : U_(r, t, n);
			}
		});
});
function U_(e, t, n) {
	if (e.issues.length) return (e.aborted = !0), e;
	if ((n.direction || `forward`) === `forward`) {
		const r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => W_(e, r, t.out, n)) : W_(e, r, t.out, n);
	} else {
		const r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => W_(e, r, t.in, n)) : W_(e, r, t.in, n);
	}
}
function W_(e, t, n, r) {
	return e.issues.length ? ((e.aborted = !0), e) : n._zod.run({ value: t, issues: e.issues }, r);
}
const G_ = V(`$ZodReadonly`, (e, t) => {
	J.init(e, t),
		U(e._zod, `propValues`, () => t.innerType._zod.propValues),
		U(e._zod, `values`, () => t.innerType._zod.values),
		U(e._zod, `optin`, () => t.innerType?._zod?.optin),
		U(e._zod, `optout`, () => t.innerType?._zod?.optout),
		(e._zod.parse = (e, n) => {
			if (n.direction === `backward`) return t.innerType._zod.run(e, n);
			const r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(K_) : K_(r);
		});
});
function K_(e) {
	return (e.value = Object.freeze(e.value)), e;
}
const q_ = V(`$ZodTemplateLiteral`, (e, t) => {
		J.init(e, t);
		const n = [];
		for (const e of t.parts)
			if (typeof e == `object` && e) {
				if (!e._zod.pattern)
					throw Error(`Invalid template literal part, no pattern found: ${[...e._zod.traits].shift()}`);
				const t = e._zod.pattern instanceof RegExp ? e._zod.pattern.source : e._zod.pattern;
				if (!t) throw Error(`Invalid template literal part: ${e._zod.traits}`);
				const r = t.startsWith(`^`) ? 1 : 0,
					i = t.endsWith(`$`) ? t.length - 1 : t.length;
				n.push(t.slice(r, i));
			} else if (e === null || Ep.has(typeof e)) n.push(Dp(`${e}`));
			else throw Error(`Invalid template literal part: ${e}`);
		(e._zod.pattern = RegExp(`^${n.join(``)}$`)),
			(e._zod.parse = (n, r) =>
				typeof n.value == `string`
					? ((e._zod.pattern.lastIndex = 0),
						e._zod.pattern.test(n.value) ||
							n.issues.push({
								input: n.value,
								inst: e,
								code: `invalid_format`,
								format: t.format ?? `template_literal`,
								pattern: e._zod.pattern.source,
							}),
						n)
					: (n.issues.push({ input: n.value, inst: e, expected: `string`, code: `invalid_type` }), n));
	}),
	J_ = V(
		`$ZodFunction`,
		(e, t) => (
			J.init(e, t),
			(e._def = t),
			(e._zod.def = t),
			(e.implement = (t) => {
				if (typeof t != `function`) throw Error(`implement() must be called with a function`);
				return function (...n) {
					const r = e._def.input ? um(e._def.input, n) : n,
						i = Reflect.apply(t, this, r);
					return e._def.output ? um(e._def.output, i) : i;
				};
			}),
			(e.implementAsync = (t) => {
				if (typeof t != `function`) throw Error(`implementAsync() must be called with a function`);
				return async function (...n) {
					const r = e._def.input ? await fm(e._def.input, n) : n,
						i = await Reflect.apply(t, this, r);
					return e._def.output ? await fm(e._def.output, i) : i;
				};
			}),
			(e._zod.parse = (t, n) =>
				typeof t.value == `function`
					? (e._def.output && e._def.output._zod.def.type === `promise`
							? (t.value = e.implementAsync(t.value))
							: (t.value = e.implement(t.value)),
						t)
					: (t.issues.push({ code: `invalid_type`, expected: `function`, input: t.value, inst: e }), t)),
			(e.input = (...t) => {
				const n = e.constructor;
				return Array.isArray(t[0])
					? new n({
							type: `function`,
							input: new __({ type: `tuple`, items: t[0], rest: t[1] }),
							output: e._def.output,
						})
					: new n({ type: `function`, input: t[0], output: e._def.output });
			}),
			(e.output = (t) => {
				const n = e.constructor;
				return new n({ type: `function`, input: e._def.input, output: t });
			}),
			e
		),
	),
	Y_ = V(`$ZodPromise`, (e, t) => {
		J.init(e, t),
			(e._zod.parse = (e, n) =>
				Promise.resolve(e.value).then((e) => t.innerType._zod.run({ value: e, issues: [] }, n)));
	}),
	X_ = V(`$ZodLazy`, (e, t) => {
		J.init(e, t),
			U(e._zod, `innerType`, () => t.getter()),
			U(e._zod, `pattern`, () => e._zod.innerType?._zod?.pattern),
			U(e._zod, `propValues`, () => e._zod.innerType?._zod?.propValues),
			U(e._zod, `optin`, () => e._zod.innerType?._zod?.optin ?? void 0),
			U(e._zod, `optout`, () => e._zod.innerType?._zod?.optout ?? void 0),
			(e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n));
	}),
	Z_ = V(`$ZodCustom`, (e, t) => {
		q.init(e, t),
			J.init(e, t),
			(e._zod.parse = (e, t) => e),
			(e._zod.check = (n) => {
				const r = n.value,
					i = t.fn(r);
				if (i instanceof Promise) return i.then((t) => Q_(t, n, r, e));
				Q_(i, n, r, e);
			});
	});
function Q_(e, t, n, r) {
	if (!e) {
		const e = { code: `custom`, input: n, inst: r, path: [...(r._zod.def.path ?? [])], continue: !r._zod.def.abort };
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Kp(e));
	}
}
var $_ = () => {
	const e = {
		string: { unit: `حرف`, verb: `أن يحوي` },
		file: { unit: `بايت`, verb: `أن يحوي` },
		array: { unit: `عنصر`, verb: `أن يحوي` },
		set: { unit: `عنصر`, verb: `أن يحوي` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `مدخل`,
			email: `بريد إلكتروني`,
			url: `رابط`,
			emoji: `إيموجي`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `تاريخ ووقت بمعيار ISO`,
			date: `تاريخ بمعيار ISO`,
			time: `وقت بمعيار ISO`,
			duration: `مدة بمعيار ISO`,
			ipv4: `عنوان IPv4`,
			ipv6: `عنوان IPv6`,
			cidrv4: `مدى عناوين بصيغة IPv4`,
			cidrv6: `مدى عناوين بصيغة IPv6`,
			base64: `نَص بترميز base64-encoded`,
			base64url: `نَص بترميز base64url-encoded`,
			json_string: `نَص على هيئة JSON`,
			e164: `رقم هاتف بمعيار E.164`,
			jwt: `JWT`,
			template_literal: `مدخل`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `مدخلات غير مقبولة: يفترض إدخال instanceof ${e.expected}، ولكن تم إدخال ${i}`
					: `مدخلات غير مقبولة: يفترض إدخال ${t}، ولكن تم إدخال ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `مدخلات غير مقبولة: يفترض إدخال ${G(e.values[0])}`
					: `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? ` أكبر من اللازم: يفترض أن تكون ${e.origin ?? `القيمة`} ${n} ${e.maximum.toString()} ${r.unit ?? `عنصر`}`
					: `أكبر من اللازم: يفترض أن تكون ${e.origin ?? `القيمة`} ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `أصغر من اللازم: يفترض لـ ${e.origin} أن يكون ${n} ${e.minimum.toString()} ${r.unit}`
					: `أصغر من اللازم: يفترض لـ ${e.origin} أن يكون ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `نَص غير مقبول: يجب أن يبدأ بـ "${e.prefix}"`
					: t.format === `ends_with`
						? `نَص غير مقبول: يجب أن ينتهي بـ "${t.suffix}"`
						: t.format === `includes`
							? `نَص غير مقبول: يجب أن يتضمَّن "${t.includes}"`
							: t.format === `regex`
								? `نَص غير مقبول: يجب أن يطابق النمط ${t.pattern}`
								: `${n[t.format] ?? e.format} غير مقبول`;
			}
			case `not_multiple_of`:
				return `رقم غير مقبول: يجب أن يكون من مضاعفات ${e.divisor}`;
			case `unrecognized_keys`:
				return `معرف${e.keys.length > 1 ? `ات` : ``} غريب${e.keys.length > 1 ? `ة` : ``}: ${H(e.keys, `، `)}`;
			case `invalid_key`:
				return `معرف غير مقبول في ${e.origin}`;
			case `invalid_union`:
				return `مدخل غير مقبول`;
			case `invalid_element`:
				return `مدخل غير مقبول في ${e.origin}`;
			default:
				return `مدخل غير مقبول`;
		}
	};
};
function ev() {
	return { localeError: $_() };
}
var tv = () => {
	const e = {
		string: { unit: `simvol`, verb: `olmalıdır` },
		file: { unit: `bayt`, verb: `olmalıdır` },
		array: { unit: `element`, verb: `olmalıdır` },
		set: { unit: `element`, verb: `olmalıdır` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `email address`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO datetime`,
			date: `ISO date`,
			time: `ISO time`,
			duration: `ISO duration`,
			ipv4: `IPv4 address`,
			ipv6: `IPv6 address`,
			cidrv4: `IPv4 range`,
			cidrv6: `IPv6 range`,
			base64: `base64-encoded string`,
			base64url: `base64url-encoded string`,
			json_string: `JSON string`,
			e164: `E.164 number`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Yanlış dəyər: gözlənilən instanceof ${e.expected}, daxil olan ${i}`
					: `Yanlış dəyər: gözlənilən ${t}, daxil olan ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Yanlış dəyər: gözlənilən ${G(e.values[0])}`
					: `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Çox böyük: gözlənilən ${e.origin ?? `dəyər`} ${n}${e.maximum.toString()} ${r.unit ?? `element`}`
					: `Çox böyük: gözlənilən ${e.origin ?? `dəyər`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Çox kiçik: gözlənilən ${e.origin} ${n}${e.minimum.toString()} ${r.unit}`
					: `Çox kiçik: gözlənilən ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Yanlış mətn: "${t.prefix}" ilə başlamalıdır`
					: t.format === `ends_with`
						? `Yanlış mətn: "${t.suffix}" ilə bitməlidir`
						: t.format === `includes`
							? `Yanlış mətn: "${t.includes}" daxil olmalıdır`
							: t.format === `regex`
								? `Yanlış mətn: ${t.pattern} şablonuna uyğun olmalıdır`
								: `Yanlış ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Yanlış ədəd: ${e.divisor} ilə bölünə bilən olmalıdır`;
			case `unrecognized_keys`:
				return `Tanınmayan açar${e.keys.length > 1 ? `lar` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `${e.origin} daxilində yanlış açar`;
			case `invalid_union`:
				return `Yanlış dəyər`;
			case `invalid_element`:
				return `${e.origin} daxilində yanlış dəyər`;
			default:
				return `Yanlış dəyər`;
		}
	};
};
function nv() {
	return { localeError: tv() };
}
function rv(e, t, n, r) {
	const i = Math.abs(e),
		a = i % 10,
		o = i % 100;
	return o >= 11 && o <= 19 ? r : a === 1 ? t : a >= 2 && a <= 4 ? n : r;
}
var iv = () => {
	const e = {
		string: { unit: { one: `сімвал`, few: `сімвалы`, many: `сімвалаў` }, verb: `мець` },
		array: { unit: { one: `элемент`, few: `элементы`, many: `элементаў` }, verb: `мець` },
		set: { unit: { one: `элемент`, few: `элементы`, many: `элементаў` }, verb: `мець` },
		file: { unit: { one: `байт`, few: `байты`, many: `байтаў` }, verb: `мець` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `увод`,
			email: `email адрас`,
			url: `URL`,
			emoji: `эмодзі`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO дата і час`,
			date: `ISO дата`,
			time: `ISO час`,
			duration: `ISO працягласць`,
			ipv4: `IPv4 адрас`,
			ipv6: `IPv6 адрас`,
			cidrv4: `IPv4 дыяпазон`,
			cidrv6: `IPv6 дыяпазон`,
			base64: `радок у фармаце base64`,
			base64url: `радок у фармаце base64url`,
			json_string: `JSON радок`,
			e164: `нумар E.164`,
			jwt: `JWT`,
			template_literal: `увод`,
		},
		r = { nan: `NaN`, number: `лік`, array: `масіў` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Няправільны ўвод: чакаўся instanceof ${e.expected}, атрымана ${i}`
					: `Няправільны ўвод: чакаўся ${t}, атрымана ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Няправільны ўвод: чакалася ${G(e.values[0])}`
					: `Няправільны варыянт: чакаўся адзін з ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				if (r) {
					const t = rv(Number(e.maximum), r.unit.one, r.unit.few, r.unit.many);
					return `Занадта вялікі: чакалася, што ${e.origin ?? `значэнне`} павінна ${r.verb} ${n}${e.maximum.toString()} ${t}`;
				}
				return `Занадта вялікі: чакалася, што ${e.origin ?? `значэнне`} павінна быць ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				if (r) {
					const t = rv(Number(e.minimum), r.unit.one, r.unit.few, r.unit.many);
					return `Занадта малы: чакалася, што ${e.origin} павінна ${r.verb} ${n}${e.minimum.toString()} ${t}`;
				}
				return `Занадта малы: чакалася, што ${e.origin} павінна быць ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Няправільны радок: павінен пачынацца з "${t.prefix}"`
					: t.format === `ends_with`
						? `Няправільны радок: павінен заканчвацца на "${t.suffix}"`
						: t.format === `includes`
							? `Няправільны радок: павінен змяшчаць "${t.includes}"`
							: t.format === `regex`
								? `Няправільны радок: павінен адпавядаць шаблону ${t.pattern}`
								: `Няправільны ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Няправільны лік: павінен быць кратным ${e.divisor}`;
			case `unrecognized_keys`:
				return `Нераспазнаны ${e.keys.length > 1 ? `ключы` : `ключ`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Няправільны ключ у ${e.origin}`;
			case `invalid_union`:
				return `Няправільны ўвод`;
			case `invalid_element`:
				return `Няправільнае значэнне ў ${e.origin}`;
			default:
				return `Няправільны ўвод`;
		}
	};
};
function av() {
	return { localeError: iv() };
}
var ov = () => {
	const e = {
		string: { unit: `символа`, verb: `да съдържа` },
		file: { unit: `байта`, verb: `да съдържа` },
		array: { unit: `елемента`, verb: `да съдържа` },
		set: { unit: `елемента`, verb: `да съдържа` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `вход`,
			email: `имейл адрес`,
			url: `URL`,
			emoji: `емоджи`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO време`,
			date: `ISO дата`,
			time: `ISO време`,
			duration: `ISO продължителност`,
			ipv4: `IPv4 адрес`,
			ipv6: `IPv6 адрес`,
			cidrv4: `IPv4 диапазон`,
			cidrv6: `IPv6 диапазон`,
			base64: `base64-кодиран низ`,
			base64url: `base64url-кодиран низ`,
			json_string: `JSON низ`,
			e164: `E.164 номер`,
			jwt: `JWT`,
			template_literal: `вход`,
		},
		r = { nan: `NaN`, number: `число`, array: `масив` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Невалиден вход: очакван instanceof ${e.expected}, получен ${i}`
					: `Невалиден вход: очакван ${t}, получен ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Невалиден вход: очакван ${G(e.values[0])}`
					: `Невалидна опция: очаквано едно от ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Твърде голямо: очаква се ${e.origin ?? `стойност`} да съдържа ${n}${e.maximum.toString()} ${r.unit ?? `елемента`}`
					: `Твърде голямо: очаква се ${e.origin ?? `стойност`} да бъде ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Твърде малко: очаква се ${e.origin} да съдържа ${n}${e.minimum.toString()} ${r.unit}`
					: `Твърде малко: очаква се ${e.origin} да бъде ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				if (t.format === `starts_with`) return `Невалиден низ: трябва да започва с "${t.prefix}"`;
				if (t.format === `ends_with`) return `Невалиден низ: трябва да завършва с "${t.suffix}"`;
				if (t.format === `includes`) return `Невалиден низ: трябва да включва "${t.includes}"`;
				if (t.format === `regex`) return `Невалиден низ: трябва да съвпада с ${t.pattern}`;
				let r = `Невалиден`;
				return (
					t.format === `emoji` && (r = `Невалидно`),
					t.format === `datetime` && (r = `Невалидно`),
					t.format === `date` && (r = `Невалидна`),
					t.format === `time` && (r = `Невалидно`),
					t.format === `duration` && (r = `Невалидна`),
					`${r} ${n[t.format] ?? e.format}`
				);
			}
			case `not_multiple_of`:
				return `Невалидно число: трябва да бъде кратно на ${e.divisor}`;
			case `unrecognized_keys`:
				return `Неразпознат${e.keys.length > 1 ? `и` : ``} ключ${e.keys.length > 1 ? `ове` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Невалиден ключ в ${e.origin}`;
			case `invalid_union`:
				return `Невалиден вход`;
			case `invalid_element`:
				return `Невалидна стойност в ${e.origin}`;
			default:
				return `Невалиден вход`;
		}
	};
};
function sv() {
	return { localeError: ov() };
}
var cv = () => {
	const e = {
		string: { unit: `caràcters`, verb: `contenir` },
		file: { unit: `bytes`, verb: `contenir` },
		array: { unit: `elements`, verb: `contenir` },
		set: { unit: `elements`, verb: `contenir` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `entrada`,
			email: `adreça electrònica`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `data i hora ISO`,
			date: `data ISO`,
			time: `hora ISO`,
			duration: `durada ISO`,
			ipv4: `adreça IPv4`,
			ipv6: `adreça IPv6`,
			cidrv4: `rang IPv4`,
			cidrv6: `rang IPv6`,
			base64: `cadena codificada en base64`,
			base64url: `cadena codificada en base64url`,
			json_string: `cadena JSON`,
			e164: `número E.164`,
			jwt: `JWT`,
			template_literal: `entrada`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Tipus invàlid: s'esperava instanceof ${e.expected}, s'ha rebut ${i}`
					: `Tipus invàlid: s'esperava ${t}, s'ha rebut ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Valor invàlid: s'esperava ${G(e.values[0])}`
					: `Opció invàlida: s'esperava una de ${H(e.values, ` o `)}`;
			case `too_big`: {
				const n = e.inclusive ? `com a màxim` : `menys de`,
					r = t(e.origin);
				return r
					? `Massa gran: s'esperava que ${e.origin ?? `el valor`} contingués ${n} ${e.maximum.toString()} ${r.unit ?? `elements`}`
					: `Massa gran: s'esperava que ${e.origin ?? `el valor`} fos ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `com a mínim` : `més de`,
					r = t(e.origin);
				return r
					? `Massa petit: s'esperava que ${e.origin} contingués ${n} ${e.minimum.toString()} ${r.unit}`
					: `Massa petit: s'esperava que ${e.origin} fos ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Format invàlid: ha de començar amb "${t.prefix}"`
					: t.format === `ends_with`
						? `Format invàlid: ha d'acabar amb "${t.suffix}"`
						: t.format === `includes`
							? `Format invàlid: ha d'incloure "${t.includes}"`
							: t.format === `regex`
								? `Format invàlid: ha de coincidir amb el patró ${t.pattern}`
								: `Format invàlid per a ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Número invàlid: ha de ser múltiple de ${e.divisor}`;
			case `unrecognized_keys`:
				return `Clau${e.keys.length > 1 ? `s` : ``} no reconeguda${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Clau invàlida a ${e.origin}`;
			case `invalid_union`:
				return `Entrada invàlida`;
			case `invalid_element`:
				return `Element invàlid a ${e.origin}`;
			default:
				return `Entrada invàlida`;
		}
	};
};
function lv() {
	return { localeError: cv() };
}
var uv = () => {
	const e = {
		string: { unit: `znaků`, verb: `mít` },
		file: { unit: `bajtů`, verb: `mít` },
		array: { unit: `prvků`, verb: `mít` },
		set: { unit: `prvků`, verb: `mít` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `regulární výraz`,
			email: `e-mailová adresa`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `datum a čas ve formátu ISO`,
			date: `datum ve formátu ISO`,
			time: `čas ve formátu ISO`,
			duration: `doba trvání ISO`,
			ipv4: `IPv4 adresa`,
			ipv6: `IPv6 adresa`,
			cidrv4: `rozsah IPv4`,
			cidrv6: `rozsah IPv6`,
			base64: `řetězec zakódovaný ve formátu base64`,
			base64url: `řetězec zakódovaný ve formátu base64url`,
			json_string: `řetězec ve formátu JSON`,
			e164: `číslo E.164`,
			jwt: `JWT`,
			template_literal: `vstup`,
		},
		r = { nan: `NaN`, number: `číslo`, string: `řetězec`, function: `funkce`, array: `pole` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Neplatný vstup: očekáváno instanceof ${e.expected}, obdrženo ${i}`
					: `Neplatný vstup: očekáváno ${t}, obdrženo ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Neplatný vstup: očekáváno ${G(e.values[0])}`
					: `Neplatná možnost: očekávána jedna z hodnot ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Hodnota je příliš velká: ${e.origin ?? `hodnota`} musí mít ${n}${e.maximum.toString()} ${r.unit ?? `prvků`}`
					: `Hodnota je příliš velká: ${e.origin ?? `hodnota`} musí být ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Hodnota je příliš malá: ${e.origin ?? `hodnota`} musí mít ${n}${e.minimum.toString()} ${r.unit ?? `prvků`}`
					: `Hodnota je příliš malá: ${e.origin ?? `hodnota`} musí být ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Neplatný řetězec: musí začínat na "${t.prefix}"`
					: t.format === `ends_with`
						? `Neplatný řetězec: musí končit na "${t.suffix}"`
						: t.format === `includes`
							? `Neplatný řetězec: musí obsahovat "${t.includes}"`
							: t.format === `regex`
								? `Neplatný řetězec: musí odpovídat vzoru ${t.pattern}`
								: `Neplatný formát ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Neplatné číslo: musí být násobkem ${e.divisor}`;
			case `unrecognized_keys`:
				return `Neznámé klíče: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Neplatný klíč v ${e.origin}`;
			case `invalid_union`:
				return `Neplatný vstup`;
			case `invalid_element`:
				return `Neplatná hodnota v ${e.origin}`;
			default:
				return `Neplatný vstup`;
		}
	};
};
function dv() {
	return { localeError: uv() };
}
var fv = () => {
	const e = {
		string: { unit: `tegn`, verb: `havde` },
		file: { unit: `bytes`, verb: `havde` },
		array: { unit: `elementer`, verb: `indeholdt` },
		set: { unit: `elementer`, verb: `indeholdt` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `e-mailadresse`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO dato- og klokkeslæt`,
			date: `ISO-dato`,
			time: `ISO-klokkeslæt`,
			duration: `ISO-varighed`,
			ipv4: `IPv4-område`,
			ipv6: `IPv6-område`,
			cidrv4: `IPv4-spektrum`,
			cidrv6: `IPv6-spektrum`,
			base64: `base64-kodet streng`,
			base64url: `base64url-kodet streng`,
			json_string: `JSON-streng`,
			e164: `E.164-nummer`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = {
			nan: `NaN`,
			string: `streng`,
			number: `tal`,
			boolean: `boolean`,
			array: `liste`,
			object: `objekt`,
			set: `sæt`,
			file: `fil`,
		};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Ugyldigt input: forventede instanceof ${e.expected}, fik ${i}`
					: `Ugyldigt input: forventede ${t}, fik ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Ugyldig værdi: forventede ${G(e.values[0])}`
					: `Ugyldigt valg: forventede en af følgende ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					i = t(e.origin),
					a = r[e.origin] ?? e.origin;
				return i
					? `For stor: forventede ${a ?? `value`} ${i.verb} ${n} ${e.maximum.toString()} ${i.unit ?? `elementer`}`
					: `For stor: forventede ${a ?? `value`} havde ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					i = t(e.origin),
					a = r[e.origin] ?? e.origin;
				return i
					? `For lille: forventede ${a} ${i.verb} ${n} ${e.minimum.toString()} ${i.unit}`
					: `For lille: forventede ${a} havde ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ugyldig streng: skal starte med "${t.prefix}"`
					: t.format === `ends_with`
						? `Ugyldig streng: skal ende med "${t.suffix}"`
						: t.format === `includes`
							? `Ugyldig streng: skal indeholde "${t.includes}"`
							: t.format === `regex`
								? `Ugyldig streng: skal matche mønsteret ${t.pattern}`
								: `Ugyldig ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Ugyldigt tal: skal være deleligt med ${e.divisor}`;
			case `unrecognized_keys`:
				return `${e.keys.length > 1 ? `Ukendte nøgler` : `Ukendt nøgle`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Ugyldig nøgle i ${e.origin}`;
			case `invalid_union`:
				return `Ugyldigt input: matcher ingen af de tilladte typer`;
			case `invalid_element`:
				return `Ugyldig værdi i ${e.origin}`;
			default:
				return `Ugyldigt input`;
		}
	};
};
function pv() {
	return { localeError: fv() };
}
var mv = () => {
	const e = {
		string: { unit: `Zeichen`, verb: `zu haben` },
		file: { unit: `Bytes`, verb: `zu haben` },
		array: { unit: `Elemente`, verb: `zu haben` },
		set: { unit: `Elemente`, verb: `zu haben` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `Eingabe`,
			email: `E-Mail-Adresse`,
			url: `URL`,
			emoji: `Emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO-Datum und -Uhrzeit`,
			date: `ISO-Datum`,
			time: `ISO-Uhrzeit`,
			duration: `ISO-Dauer`,
			ipv4: `IPv4-Adresse`,
			ipv6: `IPv6-Adresse`,
			cidrv4: `IPv4-Bereich`,
			cidrv6: `IPv6-Bereich`,
			base64: `Base64-codierter String`,
			base64url: `Base64-URL-codierter String`,
			json_string: `JSON-String`,
			e164: `E.164-Nummer`,
			jwt: `JWT`,
			template_literal: `Eingabe`,
		},
		r = { nan: `NaN`, number: `Zahl`, array: `Array` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Ungültige Eingabe: erwartet instanceof ${e.expected}, erhalten ${i}`
					: `Ungültige Eingabe: erwartet ${t}, erhalten ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Ungültige Eingabe: erwartet ${G(e.values[0])}`
					: `Ungültige Option: erwartet eine von ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Zu groß: erwartet, dass ${e.origin ?? `Wert`} ${n}${e.maximum.toString()} ${r.unit ?? `Elemente`} hat`
					: `Zu groß: erwartet, dass ${e.origin ?? `Wert`} ${n}${e.maximum.toString()} ist`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Zu klein: erwartet, dass ${e.origin} ${n}${e.minimum.toString()} ${r.unit} hat`
					: `Zu klein: erwartet, dass ${e.origin} ${n}${e.minimum.toString()} ist`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ungültiger String: muss mit "${t.prefix}" beginnen`
					: t.format === `ends_with`
						? `Ungültiger String: muss mit "${t.suffix}" enden`
						: t.format === `includes`
							? `Ungültiger String: muss "${t.includes}" enthalten`
							: t.format === `regex`
								? `Ungültiger String: muss dem Muster ${t.pattern} entsprechen`
								: `Ungültig: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Ungültige Zahl: muss ein Vielfaches von ${e.divisor} sein`;
			case `unrecognized_keys`:
				return `${e.keys.length > 1 ? `Unbekannte Schlüssel` : `Unbekannter Schlüssel`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Ungültiger Schlüssel in ${e.origin}`;
			case `invalid_union`:
				return `Ungültige Eingabe`;
			case `invalid_element`:
				return `Ungültiger Wert in ${e.origin}`;
			default:
				return `Ungültige Eingabe`;
		}
	};
};
function hv() {
	return { localeError: mv() };
}
var gv = () => {
	const e = {
		string: { unit: `characters`, verb: `to have` },
		file: { unit: `bytes`, verb: `to have` },
		array: { unit: `items`, verb: `to have` },
		set: { unit: `items`, verb: `to have` },
		map: { unit: `entries`, verb: `to have` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `email address`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO datetime`,
			date: `ISO date`,
			time: `ISO time`,
			duration: `ISO duration`,
			ipv4: `IPv4 address`,
			ipv6: `IPv6 address`,
			mac: `MAC address`,
			cidrv4: `IPv4 range`,
			cidrv6: `IPv6 range`,
			base64: `base64-encoded string`,
			base64url: `base64url-encoded string`,
			json_string: `JSON string`,
			e164: `E.164 number`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input);
				return `Invalid input: expected ${t}, received ${r[n] ?? n}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Invalid input: expected ${G(e.values[0])}`
					: `Invalid option: expected one of ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Too big: expected ${e.origin ?? `value`} to have ${n}${e.maximum.toString()} ${r.unit ?? `elements`}`
					: `Too big: expected ${e.origin ?? `value`} to be ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}`
					: `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Invalid string: must start with "${t.prefix}"`
					: t.format === `ends_with`
						? `Invalid string: must end with "${t.suffix}"`
						: t.format === `includes`
							? `Invalid string: must include "${t.includes}"`
							: t.format === `regex`
								? `Invalid string: must match pattern ${t.pattern}`
								: `Invalid ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Invalid number: must be a multiple of ${e.divisor}`;
			case `unrecognized_keys`:
				return `Unrecognized key${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Invalid key in ${e.origin}`;
			case `invalid_union`:
				return `Invalid input`;
			case `invalid_element`:
				return `Invalid value in ${e.origin}`;
			default:
				return `Invalid input`;
		}
	};
};
function _v() {
	return { localeError: gv() };
}
var vv = () => {
	const e = {
		string: { unit: `karaktrojn`, verb: `havi` },
		file: { unit: `bajtojn`, verb: `havi` },
		array: { unit: `elementojn`, verb: `havi` },
		set: { unit: `elementojn`, verb: `havi` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `enigo`,
			email: `retadreso`,
			url: `URL`,
			emoji: `emoĝio`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO-datotempo`,
			date: `ISO-dato`,
			time: `ISO-tempo`,
			duration: `ISO-daŭro`,
			ipv4: `IPv4-adreso`,
			ipv6: `IPv6-adreso`,
			cidrv4: `IPv4-rango`,
			cidrv6: `IPv6-rango`,
			base64: `64-ume kodita karaktraro`,
			base64url: `URL-64-ume kodita karaktraro`,
			json_string: `JSON-karaktraro`,
			e164: `E.164-nombro`,
			jwt: `JWT`,
			template_literal: `enigo`,
		},
		r = { nan: `NaN`, number: `nombro`, array: `tabelo`, null: `senvalora` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Nevalida enigo: atendiĝis instanceof ${e.expected}, riceviĝis ${i}`
					: `Nevalida enigo: atendiĝis ${t}, riceviĝis ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Nevalida enigo: atendiĝis ${G(e.values[0])}`
					: `Nevalida opcio: atendiĝis unu el ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Tro granda: atendiĝis ke ${e.origin ?? `valoro`} havu ${n}${e.maximum.toString()} ${r.unit ?? `elementojn`}`
					: `Tro granda: atendiĝis ke ${e.origin ?? `valoro`} havu ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Tro malgranda: atendiĝis ke ${e.origin} havu ${n}${e.minimum.toString()} ${r.unit}`
					: `Tro malgranda: atendiĝis ke ${e.origin} estu ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Nevalida karaktraro: devas komenciĝi per "${t.prefix}"`
					: t.format === `ends_with`
						? `Nevalida karaktraro: devas finiĝi per "${t.suffix}"`
						: t.format === `includes`
							? `Nevalida karaktraro: devas inkluzivi "${t.includes}"`
							: t.format === `regex`
								? `Nevalida karaktraro: devas kongrui kun la modelo ${t.pattern}`
								: `Nevalida ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Nevalida nombro: devas esti oblo de ${e.divisor}`;
			case `unrecognized_keys`:
				return `Nekonata${e.keys.length > 1 ? `j` : ``} ŝlosilo${e.keys.length > 1 ? `j` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Nevalida ŝlosilo en ${e.origin}`;
			case `invalid_union`:
				return `Nevalida enigo`;
			case `invalid_element`:
				return `Nevalida valoro en ${e.origin}`;
			default:
				return `Nevalida enigo`;
		}
	};
};
function yv() {
	return { localeError: vv() };
}
var bv = () => {
	const e = {
		string: { unit: `caracteres`, verb: `tener` },
		file: { unit: `bytes`, verb: `tener` },
		array: { unit: `elementos`, verb: `tener` },
		set: { unit: `elementos`, verb: `tener` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `entrada`,
			email: `dirección de correo electrónico`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `fecha y hora ISO`,
			date: `fecha ISO`,
			time: `hora ISO`,
			duration: `duración ISO`,
			ipv4: `dirección IPv4`,
			ipv6: `dirección IPv6`,
			cidrv4: `rango IPv4`,
			cidrv6: `rango IPv6`,
			base64: `cadena codificada en base64`,
			base64url: `URL codificada en base64`,
			json_string: `cadena JSON`,
			e164: `número E.164`,
			jwt: `JWT`,
			template_literal: `entrada`,
		},
		r = {
			nan: `NaN`,
			string: `texto`,
			number: `número`,
			boolean: `booleano`,
			array: `arreglo`,
			object: `objeto`,
			set: `conjunto`,
			file: `archivo`,
			date: `fecha`,
			bigint: `número grande`,
			symbol: `símbolo`,
			undefined: `indefinido`,
			null: `nulo`,
			function: `función`,
			map: `mapa`,
			record: `registro`,
			tuple: `tupla`,
			enum: `enumeración`,
			union: `unión`,
			literal: `literal`,
			promise: `promesa`,
			void: `vacío`,
			never: `nunca`,
			unknown: `desconocido`,
			any: `cualquiera`,
		};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Entrada inválida: se esperaba instanceof ${e.expected}, recibido ${i}`
					: `Entrada inválida: se esperaba ${t}, recibido ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Entrada inválida: se esperaba ${G(e.values[0])}`
					: `Opción inválida: se esperaba una de ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					i = t(e.origin),
					a = r[e.origin] ?? e.origin;
				return i
					? `Demasiado grande: se esperaba que ${a ?? `valor`} tuviera ${n}${e.maximum.toString()} ${i.unit ?? `elementos`}`
					: `Demasiado grande: se esperaba que ${a ?? `valor`} fuera ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					i = t(e.origin),
					a = r[e.origin] ?? e.origin;
				return i
					? `Demasiado pequeño: se esperaba que ${a} tuviera ${n}${e.minimum.toString()} ${i.unit}`
					: `Demasiado pequeño: se esperaba que ${a} fuera ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Cadena inválida: debe comenzar con "${t.prefix}"`
					: t.format === `ends_with`
						? `Cadena inválida: debe terminar en "${t.suffix}"`
						: t.format === `includes`
							? `Cadena inválida: debe incluir "${t.includes}"`
							: t.format === `regex`
								? `Cadena inválida: debe coincidir con el patrón ${t.pattern}`
								: `Inválido ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Número inválido: debe ser múltiplo de ${e.divisor}`;
			case `unrecognized_keys`:
				return `Llave${e.keys.length > 1 ? `s` : ``} desconocida${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Llave inválida en ${r[e.origin] ?? e.origin}`;
			case `invalid_union`:
				return `Entrada inválida`;
			case `invalid_element`:
				return `Valor inválido en ${r[e.origin] ?? e.origin}`;
			default:
				return `Entrada inválida`;
		}
	};
};
function xv() {
	return { localeError: bv() };
}
var Sv = () => {
	const e = {
		string: { unit: `کاراکتر`, verb: `داشته باشد` },
		file: { unit: `بایت`, verb: `داشته باشد` },
		array: { unit: `آیتم`, verb: `داشته باشد` },
		set: { unit: `آیتم`, verb: `داشته باشد` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ورودی`,
			email: `آدرس ایمیل`,
			url: `URL`,
			emoji: `ایموجی`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `تاریخ و زمان ایزو`,
			date: `تاریخ ایزو`,
			time: `زمان ایزو`,
			duration: `مدت زمان ایزو`,
			ipv4: `IPv4 آدرس`,
			ipv6: `IPv6 آدرس`,
			cidrv4: `IPv4 دامنه`,
			cidrv6: `IPv6 دامنه`,
			base64: `base64-encoded رشته`,
			base64url: `base64url-encoded رشته`,
			json_string: `JSON رشته`,
			e164: `E.164 عدد`,
			jwt: `JWT`,
			template_literal: `ورودی`,
		},
		r = { nan: `NaN`, number: `عدد`, array: `آرایه` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `ورودی نامعتبر: می‌بایست instanceof ${e.expected} می‌بود، ${i} دریافت شد`
					: `ورودی نامعتبر: می‌بایست ${t} می‌بود، ${i} دریافت شد`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `ورودی نامعتبر: می‌بایست ${G(e.values[0])} می‌بود`
					: `گزینه نامعتبر: می‌بایست یکی از ${H(e.values, `|`)} می‌بود`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `خیلی بزرگ: ${e.origin ?? `مقدار`} باید ${n}${e.maximum.toString()} ${r.unit ?? `عنصر`} باشد`
					: `خیلی بزرگ: ${e.origin ?? `مقدار`} باید ${n}${e.maximum.toString()} باشد`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `خیلی کوچک: ${e.origin} باید ${n}${e.minimum.toString()} ${r.unit} باشد`
					: `خیلی کوچک: ${e.origin} باید ${n}${e.minimum.toString()} باشد`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `رشته نامعتبر: باید با "${t.prefix}" شروع شود`
					: t.format === `ends_with`
						? `رشته نامعتبر: باید با "${t.suffix}" تمام شود`
						: t.format === `includes`
							? `رشته نامعتبر: باید شامل "${t.includes}" باشد`
							: t.format === `regex`
								? `رشته نامعتبر: باید با الگوی ${t.pattern} مطابقت داشته باشد`
								: `${n[t.format] ?? e.format} نامعتبر`;
			}
			case `not_multiple_of`:
				return `عدد نامعتبر: باید مضرب ${e.divisor} باشد`;
			case `unrecognized_keys`:
				return `کلید${e.keys.length > 1 ? `های` : ``} ناشناس: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `کلید ناشناس در ${e.origin}`;
			case `invalid_union`:
				return `ورودی نامعتبر`;
			case `invalid_element`:
				return `مقدار نامعتبر در ${e.origin}`;
			default:
				return `ورودی نامعتبر`;
		}
	};
};
function Cv() {
	return { localeError: Sv() };
}
var wv = () => {
	const e = {
		string: { unit: `merkkiä`, subject: `merkkijonon` },
		file: { unit: `tavua`, subject: `tiedoston` },
		array: { unit: `alkiota`, subject: `listan` },
		set: { unit: `alkiota`, subject: `joukon` },
		number: { unit: ``, subject: `luvun` },
		bigint: { unit: ``, subject: `suuren kokonaisluvun` },
		int: { unit: ``, subject: `kokonaisluvun` },
		date: { unit: ``, subject: `päivämäärän` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `säännöllinen lauseke`,
			email: `sähköpostiosoite`,
			url: `URL-osoite`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO-aikaleima`,
			date: `ISO-päivämäärä`,
			time: `ISO-aika`,
			duration: `ISO-kesto`,
			ipv4: `IPv4-osoite`,
			ipv6: `IPv6-osoite`,
			cidrv4: `IPv4-alue`,
			cidrv6: `IPv6-alue`,
			base64: `base64-koodattu merkkijono`,
			base64url: `base64url-koodattu merkkijono`,
			json_string: `JSON-merkkijono`,
			e164: `E.164-luku`,
			jwt: `JWT`,
			template_literal: `templaattimerkkijono`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Virheellinen tyyppi: odotettiin instanceof ${e.expected}, oli ${i}`
					: `Virheellinen tyyppi: odotettiin ${t}, oli ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Virheellinen syöte: täytyy olla ${G(e.values[0])}`
					: `Virheellinen valinta: täytyy olla yksi seuraavista: ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Liian suuri: ${r.subject} täytyy olla ${n}${e.maximum.toString()} ${r.unit}`.trim()
					: `Liian suuri: arvon täytyy olla ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Liian pieni: ${r.subject} täytyy olla ${n}${e.minimum.toString()} ${r.unit}`.trim()
					: `Liian pieni: arvon täytyy olla ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Virheellinen syöte: täytyy alkaa "${t.prefix}"`
					: t.format === `ends_with`
						? `Virheellinen syöte: täytyy loppua "${t.suffix}"`
						: t.format === `includes`
							? `Virheellinen syöte: täytyy sisältää "${t.includes}"`
							: t.format === `regex`
								? `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${t.pattern}`
								: `Virheellinen ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Virheellinen luku: täytyy olla luvun ${e.divisor} monikerta`;
			case `unrecognized_keys`:
				return `${e.keys.length > 1 ? `Tuntemattomat avaimet` : `Tuntematon avain`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Virheellinen avain tietueessa`;
			case `invalid_union`:
				return `Virheellinen unioni`;
			case `invalid_element`:
				return `Virheellinen arvo joukossa`;
			default:
				return `Virheellinen syöte`;
		}
	};
};
function Tv() {
	return { localeError: wv() };
}
var Ev = () => {
	const e = {
		string: { unit: `caractères`, verb: `avoir` },
		file: { unit: `octets`, verb: `avoir` },
		array: { unit: `éléments`, verb: `avoir` },
		set: { unit: `éléments`, verb: `avoir` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `entrée`,
			email: `adresse e-mail`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `date et heure ISO`,
			date: `date ISO`,
			time: `heure ISO`,
			duration: `durée ISO`,
			ipv4: `adresse IPv4`,
			ipv6: `adresse IPv6`,
			cidrv4: `plage IPv4`,
			cidrv6: `plage IPv6`,
			base64: `chaîne encodée en base64`,
			base64url: `chaîne encodée en base64url`,
			json_string: `chaîne JSON`,
			e164: `numéro E.164`,
			jwt: `JWT`,
			template_literal: `entrée`,
		},
		r = { nan: `NaN`, number: `nombre`, array: `tableau` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Entrée invalide : instanceof ${e.expected} attendu, ${i} reçu`
					: `Entrée invalide : ${t} attendu, ${i} reçu`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Entrée invalide : ${G(e.values[0])} attendu`
					: `Option invalide : une valeur parmi ${H(e.values, `|`)} attendue`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Trop grand : ${e.origin ?? `valeur`} doit ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `élément(s)`}`
					: `Trop grand : ${e.origin ?? `valeur`} doit être ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Trop petit : ${e.origin} doit ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
					: `Trop petit : ${e.origin} doit être ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Chaîne invalide : doit commencer par "${t.prefix}"`
					: t.format === `ends_with`
						? `Chaîne invalide : doit se terminer par "${t.suffix}"`
						: t.format === `includes`
							? `Chaîne invalide : doit inclure "${t.includes}"`
							: t.format === `regex`
								? `Chaîne invalide : doit correspondre au modèle ${t.pattern}`
								: `${n[t.format] ?? e.format} invalide`;
			}
			case `not_multiple_of`:
				return `Nombre invalide : doit être un multiple de ${e.divisor}`;
			case `unrecognized_keys`:
				return `Clé${e.keys.length > 1 ? `s` : ``} non reconnue${e.keys.length > 1 ? `s` : ``} : ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Clé invalide dans ${e.origin}`;
			case `invalid_union`:
				return `Entrée invalide`;
			case `invalid_element`:
				return `Valeur invalide dans ${e.origin}`;
			default:
				return `Entrée invalide`;
		}
	};
};
function Dv() {
	return { localeError: Ev() };
}
var Ov = () => {
	const e = {
		string: { unit: `caractères`, verb: `avoir` },
		file: { unit: `octets`, verb: `avoir` },
		array: { unit: `éléments`, verb: `avoir` },
		set: { unit: `éléments`, verb: `avoir` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `entrée`,
			email: `adresse courriel`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `date-heure ISO`,
			date: `date ISO`,
			time: `heure ISO`,
			duration: `durée ISO`,
			ipv4: `adresse IPv4`,
			ipv6: `adresse IPv6`,
			cidrv4: `plage IPv4`,
			cidrv6: `plage IPv6`,
			base64: `chaîne encodée en base64`,
			base64url: `chaîne encodée en base64url`,
			json_string: `chaîne JSON`,
			e164: `numéro E.164`,
			jwt: `JWT`,
			template_literal: `entrée`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Entrée invalide : attendu instanceof ${e.expected}, reçu ${i}`
					: `Entrée invalide : attendu ${t}, reçu ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Entrée invalide : attendu ${G(e.values[0])}`
					: `Option invalide : attendu l'une des valeurs suivantes ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `≤` : `<`,
					r = t(e.origin);
				return r
					? `Trop grand : attendu que ${e.origin ?? `la valeur`} ait ${n}${e.maximum.toString()} ${r.unit}`
					: `Trop grand : attendu que ${e.origin ?? `la valeur`} soit ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `≥` : `>`,
					r = t(e.origin);
				return r
					? `Trop petit : attendu que ${e.origin} ait ${n}${e.minimum.toString()} ${r.unit}`
					: `Trop petit : attendu que ${e.origin} soit ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Chaîne invalide : doit commencer par "${t.prefix}"`
					: t.format === `ends_with`
						? `Chaîne invalide : doit se terminer par "${t.suffix}"`
						: t.format === `includes`
							? `Chaîne invalide : doit inclure "${t.includes}"`
							: t.format === `regex`
								? `Chaîne invalide : doit correspondre au motif ${t.pattern}`
								: `${n[t.format] ?? e.format} invalide`;
			}
			case `not_multiple_of`:
				return `Nombre invalide : doit être un multiple de ${e.divisor}`;
			case `unrecognized_keys`:
				return `Clé${e.keys.length > 1 ? `s` : ``} non reconnue${e.keys.length > 1 ? `s` : ``} : ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Clé invalide dans ${e.origin}`;
			case `invalid_union`:
				return `Entrée invalide`;
			case `invalid_element`:
				return `Valeur invalide dans ${e.origin}`;
			default:
				return `Entrée invalide`;
		}
	};
};
function kv() {
	return { localeError: Ov() };
}
var Av = () => {
	const e = {
			string: { label: `מחרוזת`, gender: `f` },
			number: { label: `מספר`, gender: `m` },
			boolean: { label: `ערך בוליאני`, gender: `m` },
			bigint: { label: `BigInt`, gender: `m` },
			date: { label: `תאריך`, gender: `m` },
			array: { label: `מערך`, gender: `m` },
			object: { label: `אובייקט`, gender: `m` },
			null: { label: `ערך ריק (null)`, gender: `m` },
			undefined: { label: `ערך לא מוגדר (undefined)`, gender: `m` },
			symbol: { label: `סימבול (Symbol)`, gender: `m` },
			function: { label: `פונקציה`, gender: `f` },
			map: { label: `מפה (Map)`, gender: `f` },
			set: { label: `קבוצה (Set)`, gender: `f` },
			file: { label: `קובץ`, gender: `m` },
			promise: { label: `Promise`, gender: `m` },
			NaN: { label: `NaN`, gender: `m` },
			unknown: { label: `ערך לא ידוע`, gender: `m` },
			value: { label: `ערך`, gender: `m` },
		},
		t = {
			string: { unit: `תווים`, shortLabel: `קצר`, longLabel: `ארוך` },
			file: { unit: `בייטים`, shortLabel: `קטן`, longLabel: `גדול` },
			array: { unit: `פריטים`, shortLabel: `קטן`, longLabel: `גדול` },
			set: { unit: `פריטים`, shortLabel: `קטן`, longLabel: `גדול` },
			number: { unit: ``, shortLabel: `קטן`, longLabel: `גדול` },
		},
		n = (t) => (t ? e[t] : void 0),
		r = (t) => {
			const r = n(t);
			return r ? r.label : (t ?? e.unknown.label);
		},
		i = (e) => `ה${r(e)}`,
		a = (e) => ((n(e)?.gender ?? `m`) === `f` ? `צריכה להיות` : `צריך להיות`),
		o = (e) => (e ? (t[e] ?? null) : null),
		s = {
			regex: { label: `קלט`, gender: `m` },
			email: { label: `כתובת אימייל`, gender: `f` },
			url: { label: `כתובת רשת`, gender: `f` },
			emoji: { label: `אימוג'י`, gender: `m` },
			uuid: { label: `UUID`, gender: `m` },
			nanoid: { label: `nanoid`, gender: `m` },
			guid: { label: `GUID`, gender: `m` },
			cuid: { label: `cuid`, gender: `m` },
			cuid2: { label: `cuid2`, gender: `m` },
			ulid: { label: `ULID`, gender: `m` },
			xid: { label: `XID`, gender: `m` },
			ksuid: { label: `KSUID`, gender: `m` },
			datetime: { label: `תאריך וזמן ISO`, gender: `m` },
			date: { label: `תאריך ISO`, gender: `m` },
			time: { label: `זמן ISO`, gender: `m` },
			duration: { label: `משך זמן ISO`, gender: `m` },
			ipv4: { label: `כתובת IPv4`, gender: `f` },
			ipv6: { label: `כתובת IPv6`, gender: `f` },
			cidrv4: { label: `טווח IPv4`, gender: `m` },
			cidrv6: { label: `טווח IPv6`, gender: `m` },
			base64: { label: `מחרוזת בבסיס 64`, gender: `f` },
			base64url: { label: `מחרוזת בבסיס 64 לכתובות רשת`, gender: `f` },
			json_string: { label: `מחרוזת JSON`, gender: `f` },
			e164: { label: `מספר E.164`, gender: `m` },
			jwt: { label: `JWT`, gender: `m` },
			ends_with: { label: `קלט`, gender: `m` },
			includes: { label: `קלט`, gender: `m` },
			lowercase: { label: `קלט`, gender: `m` },
			starts_with: { label: `קלט`, gender: `m` },
			uppercase: { label: `קלט`, gender: `m` },
		},
		c = { nan: `NaN` };
	return (t) => {
		switch (t.code) {
			case `invalid_type`: {
				const n = t.expected,
					i = c[n ?? ``] ?? r(n),
					a = K(t.input),
					o = c[a] ?? e[a]?.label ?? a;
				return /^[A-Z]/.test(t.expected)
					? `קלט לא תקין: צריך להיות instanceof ${t.expected}, התקבל ${o}`
					: `קלט לא תקין: צריך להיות ${i}, התקבל ${o}`;
			}
			case `invalid_value`: {
				if (t.values.length === 1) return `ערך לא תקין: הערך חייב להיות ${G(t.values[0])}`;
				const e = t.values.map((e) => G(e));
				if (t.values.length === 2) return `ערך לא תקין: האפשרויות המתאימות הן ${e[0]} או ${e[1]}`;
				const n = e[e.length - 1];
				return `ערך לא תקין: האפשרויות המתאימות הן ${e.slice(0, -1).join(`, `)} או ${n}`;
			}
			case `too_big`: {
				const e = o(t.origin),
					n = i(t.origin ?? `value`);
				if (t.origin === `string`)
					return `${e?.longLabel ?? `ארוך`} מדי: ${n} צריכה להכיל ${t.maximum.toString()} ${e?.unit ?? ``} ${t.inclusive ? `או פחות` : `לכל היותר`}`.trim();
				if (t.origin === `number`)
					return `גדול מדי: ${n} צריך להיות ${t.inclusive ? `קטן או שווה ל-${t.maximum}` : `קטן מ-${t.maximum}`}`;
				if (t.origin === `array` || t.origin === `set`)
					return `גדול מדי: ${n} ${t.origin === `set` ? `צריכה` : `צריך`} להכיל ${t.inclusive ? `${t.maximum} ${e?.unit ?? ``} או פחות` : `פחות מ-${t.maximum} ${e?.unit ?? ``}`}`.trim();
				const r = t.inclusive ? `<=` : `<`,
					s = a(t.origin ?? `value`);
				return e?.unit
					? `${e.longLabel} מדי: ${n} ${s} ${r}${t.maximum.toString()} ${e.unit}`
					: `${e?.longLabel ?? `גדול`} מדי: ${n} ${s} ${r}${t.maximum.toString()}`;
			}
			case `too_small`: {
				const e = o(t.origin),
					n = i(t.origin ?? `value`);
				if (t.origin === `string`)
					return `${e?.shortLabel ?? `קצר`} מדי: ${n} צריכה להכיל ${t.minimum.toString()} ${e?.unit ?? ``} ${t.inclusive ? `או יותר` : `לפחות`}`.trim();
				if (t.origin === `number`)
					return `קטן מדי: ${n} צריך להיות ${t.inclusive ? `גדול או שווה ל-${t.minimum}` : `גדול מ-${t.minimum}`}`;
				if (t.origin === `array` || t.origin === `set`) {
					const r = t.origin === `set` ? `צריכה` : `צריך`;
					return t.minimum === 1 && t.inclusive
						? `קטן מדי: ${n} ${r} להכיל ${(t.origin, `לפחות פריט אחד`)}`
						: `קטן מדי: ${n} ${r} להכיל ${t.inclusive ? `${t.minimum} ${e?.unit ?? ``} או יותר` : `יותר מ-${t.minimum} ${e?.unit ?? ``}`}`.trim();
				}
				const r = t.inclusive ? `>=` : `>`,
					s = a(t.origin ?? `value`);
				return e?.unit
					? `${e.shortLabel} מדי: ${n} ${s} ${r}${t.minimum.toString()} ${e.unit}`
					: `${e?.shortLabel ?? `קטן`} מדי: ${n} ${s} ${r}${t.minimum.toString()}`;
			}
			case `invalid_format`: {
				const e = t;
				if (e.format === `starts_with`) return `המחרוזת חייבת להתחיל ב "${e.prefix}"`;
				if (e.format === `ends_with`) return `המחרוזת חייבת להסתיים ב "${e.suffix}"`;
				if (e.format === `includes`) return `המחרוזת חייבת לכלול "${e.includes}"`;
				if (e.format === `regex`) return `המחרוזת חייבת להתאים לתבנית ${e.pattern}`;
				const n = s[e.format];
				return `${n?.label ?? e.format} לא ${(n?.gender ?? `m`) === `f` ? `תקינה` : `תקין`}`;
			}
			case `not_multiple_of`:
				return `מספר לא תקין: חייב להיות מכפלה של ${t.divisor}`;
			case `unrecognized_keys`:
				return `מפתח${t.keys.length > 1 ? `ות` : ``} לא מזוה${t.keys.length > 1 ? `ים` : `ה`}: ${H(t.keys, `, `)}`;
			case `invalid_key`:
				return `שדה לא תקין באובייקט`;
			case `invalid_union`:
				return `קלט לא תקין`;
			case `invalid_element`:
				return `ערך לא תקין ב${i(t.origin ?? `array`)}`;
			default:
				return `קלט לא תקין`;
		}
	};
};
function jv() {
	return { localeError: Av() };
}
var Mv = () => {
	const e = {
		string: { unit: `karakter`, verb: `legyen` },
		file: { unit: `byte`, verb: `legyen` },
		array: { unit: `elem`, verb: `legyen` },
		set: { unit: `elem`, verb: `legyen` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `bemenet`,
			email: `email cím`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO időbélyeg`,
			date: `ISO dátum`,
			time: `ISO idő`,
			duration: `ISO időintervallum`,
			ipv4: `IPv4 cím`,
			ipv6: `IPv6 cím`,
			cidrv4: `IPv4 tartomány`,
			cidrv6: `IPv6 tartomány`,
			base64: `base64-kódolt string`,
			base64url: `base64url-kódolt string`,
			json_string: `JSON string`,
			e164: `E.164 szám`,
			jwt: `JWT`,
			template_literal: `bemenet`,
		},
		r = { nan: `NaN`, number: `szám`, array: `tömb` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Érvénytelen bemenet: a várt érték instanceof ${e.expected}, a kapott érték ${i}`
					: `Érvénytelen bemenet: a várt érték ${t}, a kapott érték ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Érvénytelen bemenet: a várt érték ${G(e.values[0])}`
					: `Érvénytelen opció: valamelyik érték várt ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Túl nagy: ${e.origin ?? `érték`} mérete túl nagy ${n}${e.maximum.toString()} ${r.unit ?? `elem`}`
					: `Túl nagy: a bemeneti érték ${e.origin ?? `érték`} túl nagy: ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Túl kicsi: a bemeneti érték ${e.origin} mérete túl kicsi ${n}${e.minimum.toString()} ${r.unit}`
					: `Túl kicsi: a bemeneti érték ${e.origin} túl kicsi ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Érvénytelen string: "${t.prefix}" értékkel kell kezdődnie`
					: t.format === `ends_with`
						? `Érvénytelen string: "${t.suffix}" értékkel kell végződnie`
						: t.format === `includes`
							? `Érvénytelen string: "${t.includes}" értéket kell tartalmaznia`
							: t.format === `regex`
								? `Érvénytelen string: ${t.pattern} mintának kell megfelelnie`
								: `Érvénytelen ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Érvénytelen szám: ${e.divisor} többszörösének kell lennie`;
			case `unrecognized_keys`:
				return `Ismeretlen kulcs${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Érvénytelen kulcs ${e.origin}`;
			case `invalid_union`:
				return `Érvénytelen bemenet`;
			case `invalid_element`:
				return `Érvénytelen érték: ${e.origin}`;
			default:
				return `Érvénytelen bemenet`;
		}
	};
};
function Nv() {
	return { localeError: Mv() };
}
function Pv(e, t, n) {
	return Math.abs(e) === 1 ? t : n;
}
function Fv(e) {
	if (!e) return ``;
	const t = [`ա`, `ե`, `ը`, `ի`, `ո`, `ու`, `օ`],
		n = e[e.length - 1];
	return e + (t.includes(n) ? `ն` : `ը`);
}
var Iv = () => {
	const e = {
		string: { unit: { one: `նշան`, many: `նշաններ` }, verb: `ունենալ` },
		file: { unit: { one: `բայթ`, many: `բայթեր` }, verb: `ունենալ` },
		array: { unit: { one: `տարր`, many: `տարրեր` }, verb: `ունենալ` },
		set: { unit: { one: `տարր`, many: `տարրեր` }, verb: `ունենալ` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `մուտք`,
			email: `էլ. հասցե`,
			url: `URL`,
			emoji: `էմոջի`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO ամսաթիվ և ժամ`,
			date: `ISO ամսաթիվ`,
			time: `ISO ժամ`,
			duration: `ISO տևողություն`,
			ipv4: `IPv4 հասցե`,
			ipv6: `IPv6 հասցե`,
			cidrv4: `IPv4 միջակայք`,
			cidrv6: `IPv6 միջակայք`,
			base64: `base64 ձևաչափով տող`,
			base64url: `base64url ձևաչափով տող`,
			json_string: `JSON տող`,
			e164: `E.164 համար`,
			jwt: `JWT`,
			template_literal: `մուտք`,
		},
		r = { nan: `NaN`, number: `թիվ`, array: `զանգված` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Սխալ մուտքագրում․ սպասվում էր instanceof ${e.expected}, ստացվել է ${i}`
					: `Սխալ մուտքագրում․ սպասվում էր ${t}, ստացվել է ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Սխալ մուտքագրում․ սպասվում էր ${G(e.values[1])}`
					: `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				if (r) {
					const t = Pv(Number(e.maximum), r.unit.one, r.unit.many);
					return `Չափազանց մեծ արժեք․ սպասվում է, որ ${Fv(e.origin ?? `արժեք`)} կունենա ${n}${e.maximum.toString()} ${t}`;
				}
				return `Չափազանց մեծ արժեք․ սպասվում է, որ ${Fv(e.origin ?? `արժեք`)} լինի ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				if (r) {
					const t = Pv(Number(e.minimum), r.unit.one, r.unit.many);
					return `Չափազանց փոքր արժեք․ սպասվում է, որ ${Fv(e.origin)} կունենա ${n}${e.minimum.toString()} ${t}`;
				}
				return `Չափազանց փոքր արժեք․ սպասվում է, որ ${Fv(e.origin)} լինի ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Սխալ տող․ պետք է սկսվի "${t.prefix}"-ով`
					: t.format === `ends_with`
						? `Սխալ տող․ պետք է ավարտվի "${t.suffix}"-ով`
						: t.format === `includes`
							? `Սխալ տող․ պետք է պարունակի "${t.includes}"`
							: t.format === `regex`
								? `Սխալ տող․ պետք է համապատասխանի ${t.pattern} ձևաչափին`
								: `Սխալ ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${e.divisor}-ի`;
			case `unrecognized_keys`:
				return `Չճանաչված բանալի${e.keys.length > 1 ? `ներ` : ``}. ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Սխալ բանալի ${Fv(e.origin)}-ում`;
			case `invalid_union`:
				return `Սխալ մուտքագրում`;
			case `invalid_element`:
				return `Սխալ արժեք ${Fv(e.origin)}-ում`;
			default:
				return `Սխալ մուտքագրում`;
		}
	};
};
function Lv() {
	return { localeError: Iv() };
}
var Rv = () => {
	const e = {
		string: { unit: `karakter`, verb: `memiliki` },
		file: { unit: `byte`, verb: `memiliki` },
		array: { unit: `item`, verb: `memiliki` },
		set: { unit: `item`, verb: `memiliki` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `alamat email`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `tanggal dan waktu format ISO`,
			date: `tanggal format ISO`,
			time: `jam format ISO`,
			duration: `durasi format ISO`,
			ipv4: `alamat IPv4`,
			ipv6: `alamat IPv6`,
			cidrv4: `rentang alamat IPv4`,
			cidrv6: `rentang alamat IPv6`,
			base64: `string dengan enkode base64`,
			base64url: `string dengan enkode base64url`,
			json_string: `string JSON`,
			e164: `angka E.164`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Input tidak valid: diharapkan instanceof ${e.expected}, diterima ${i}`
					: `Input tidak valid: diharapkan ${t}, diterima ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Input tidak valid: diharapkan ${G(e.values[0])}`
					: `Pilihan tidak valid: diharapkan salah satu dari ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Terlalu besar: diharapkan ${e.origin ?? `value`} memiliki ${n}${e.maximum.toString()} ${r.unit ?? `elemen`}`
					: `Terlalu besar: diharapkan ${e.origin ?? `value`} menjadi ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Terlalu kecil: diharapkan ${e.origin} memiliki ${n}${e.minimum.toString()} ${r.unit}`
					: `Terlalu kecil: diharapkan ${e.origin} menjadi ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `String tidak valid: harus dimulai dengan "${t.prefix}"`
					: t.format === `ends_with`
						? `String tidak valid: harus berakhir dengan "${t.suffix}"`
						: t.format === `includes`
							? `String tidak valid: harus menyertakan "${t.includes}"`
							: t.format === `regex`
								? `String tidak valid: harus sesuai pola ${t.pattern}`
								: `${n[t.format] ?? e.format} tidak valid`;
			}
			case `not_multiple_of`:
				return `Angka tidak valid: harus kelipatan dari ${e.divisor}`;
			case `unrecognized_keys`:
				return `Kunci tidak dikenali ${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Kunci tidak valid di ${e.origin}`;
			case `invalid_union`:
				return `Input tidak valid`;
			case `invalid_element`:
				return `Nilai tidak valid di ${e.origin}`;
			default:
				return `Input tidak valid`;
		}
	};
};
function zv() {
	return { localeError: Rv() };
}
var Bv = () => {
	const e = {
		string: { unit: `stafi`, verb: `að hafa` },
		file: { unit: `bæti`, verb: `að hafa` },
		array: { unit: `hluti`, verb: `að hafa` },
		set: { unit: `hluti`, verb: `að hafa` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `gildi`,
			email: `netfang`,
			url: `vefslóð`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO dagsetning og tími`,
			date: `ISO dagsetning`,
			time: `ISO tími`,
			duration: `ISO tímalengd`,
			ipv4: `IPv4 address`,
			ipv6: `IPv6 address`,
			cidrv4: `IPv4 range`,
			cidrv6: `IPv6 range`,
			base64: `base64-encoded strengur`,
			base64url: `base64url-encoded strengur`,
			json_string: `JSON strengur`,
			e164: `E.164 tölugildi`,
			jwt: `JWT`,
			template_literal: `gildi`,
		},
		r = { nan: `NaN`, number: `númer`, array: `fylki` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Rangt gildi: Þú slóst inn ${i} þar sem á að vera instanceof ${e.expected}`
					: `Rangt gildi: Þú slóst inn ${i} þar sem á að vera ${t}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Rangt gildi: gert ráð fyrir ${G(e.values[0])}`
					: `Ógilt val: má vera eitt af eftirfarandi ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Of stórt: gert er ráð fyrir að ${e.origin ?? `gildi`} hafi ${n}${e.maximum.toString()} ${r.unit ?? `hluti`}`
					: `Of stórt: gert er ráð fyrir að ${e.origin ?? `gildi`} sé ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Of lítið: gert er ráð fyrir að ${e.origin} hafi ${n}${e.minimum.toString()} ${r.unit}`
					: `Of lítið: gert er ráð fyrir að ${e.origin} sé ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ógildur strengur: verður að byrja á "${t.prefix}"`
					: t.format === `ends_with`
						? `Ógildur strengur: verður að enda á "${t.suffix}"`
						: t.format === `includes`
							? `Ógildur strengur: verður að innihalda "${t.includes}"`
							: t.format === `regex`
								? `Ógildur strengur: verður að fylgja mynstri ${t.pattern}`
								: `Rangt ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Röng tala: verður að vera margfeldi af ${e.divisor}`;
			case `unrecognized_keys`:
				return `Óþekkt ${e.keys.length > 1 ? `ir lyklar` : `ur lykill`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Rangur lykill í ${e.origin}`;
			case `invalid_union`:
				return `Rangt gildi`;
			case `invalid_element`:
				return `Rangt gildi í ${e.origin}`;
			default:
				return `Rangt gildi`;
		}
	};
};
function Vv() {
	return { localeError: Bv() };
}
var Hv = () => {
	const e = {
		string: { unit: `caratteri`, verb: `avere` },
		file: { unit: `byte`, verb: `avere` },
		array: { unit: `elementi`, verb: `avere` },
		set: { unit: `elementi`, verb: `avere` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `indirizzo email`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `data e ora ISO`,
			date: `data ISO`,
			time: `ora ISO`,
			duration: `durata ISO`,
			ipv4: `indirizzo IPv4`,
			ipv6: `indirizzo IPv6`,
			cidrv4: `intervallo IPv4`,
			cidrv6: `intervallo IPv6`,
			base64: `stringa codificata in base64`,
			base64url: `URL codificata in base64`,
			json_string: `stringa JSON`,
			e164: `numero E.164`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN`, number: `numero`, array: `vettore` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Input non valido: atteso instanceof ${e.expected}, ricevuto ${i}`
					: `Input non valido: atteso ${t}, ricevuto ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Input non valido: atteso ${G(e.values[0])}`
					: `Opzione non valida: atteso uno tra ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Troppo grande: ${e.origin ?? `valore`} deve avere ${n}${e.maximum.toString()} ${r.unit ?? `elementi`}`
					: `Troppo grande: ${e.origin ?? `valore`} deve essere ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Troppo piccolo: ${e.origin} deve avere ${n}${e.minimum.toString()} ${r.unit}`
					: `Troppo piccolo: ${e.origin} deve essere ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Stringa non valida: deve iniziare con "${t.prefix}"`
					: t.format === `ends_with`
						? `Stringa non valida: deve terminare con "${t.suffix}"`
						: t.format === `includes`
							? `Stringa non valida: deve includere "${t.includes}"`
							: t.format === `regex`
								? `Stringa non valida: deve corrispondere al pattern ${t.pattern}`
								: `Invalid ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Numero non valido: deve essere un multiplo di ${e.divisor}`;
			case `unrecognized_keys`:
				return `Chiav${e.keys.length > 1 ? `i` : `e`} non riconosciut${e.keys.length > 1 ? `e` : `a`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Chiave non valida in ${e.origin}`;
			case `invalid_union`:
				return `Input non valido`;
			case `invalid_element`:
				return `Valore non valido in ${e.origin}`;
			default:
				return `Input non valido`;
		}
	};
};
function Uv() {
	return { localeError: Hv() };
}
var Wv = () => {
	const e = {
		string: { unit: `文字`, verb: `である` },
		file: { unit: `バイト`, verb: `である` },
		array: { unit: `要素`, verb: `である` },
		set: { unit: `要素`, verb: `である` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `入力値`,
			email: `メールアドレス`,
			url: `URL`,
			emoji: `絵文字`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO日時`,
			date: `ISO日付`,
			time: `ISO時刻`,
			duration: `ISO期間`,
			ipv4: `IPv4アドレス`,
			ipv6: `IPv6アドレス`,
			cidrv4: `IPv4範囲`,
			cidrv6: `IPv6範囲`,
			base64: `base64エンコード文字列`,
			base64url: `base64urlエンコード文字列`,
			json_string: `JSON文字列`,
			e164: `E.164番号`,
			jwt: `JWT`,
			template_literal: `入力値`,
		},
		r = { nan: `NaN`, number: `数値`, array: `配列` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `無効な入力: instanceof ${e.expected}が期待されましたが、${i}が入力されました`
					: `無効な入力: ${t}が期待されましたが、${i}が入力されました`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `無効な入力: ${G(e.values[0])}が期待されました`
					: `無効な選択: ${H(e.values, `、`)}のいずれかである必要があります`;
			case `too_big`: {
				const n = e.inclusive ? `以下である` : `より小さい`,
					r = t(e.origin);
				return r
					? `大きすぎる値: ${e.origin ?? `値`}は${e.maximum.toString()}${r.unit ?? `要素`}${n}必要があります`
					: `大きすぎる値: ${e.origin ?? `値`}は${e.maximum.toString()}${n}必要があります`;
			}
			case `too_small`: {
				const n = e.inclusive ? `以上である` : `より大きい`,
					r = t(e.origin);
				return r
					? `小さすぎる値: ${e.origin}は${e.minimum.toString()}${r.unit}${n}必要があります`
					: `小さすぎる値: ${e.origin}は${e.minimum.toString()}${n}必要があります`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `無効な文字列: "${t.prefix}"で始まる必要があります`
					: t.format === `ends_with`
						? `無効な文字列: "${t.suffix}"で終わる必要があります`
						: t.format === `includes`
							? `無効な文字列: "${t.includes}"を含む必要があります`
							: t.format === `regex`
								? `無効な文字列: パターン${t.pattern}に一致する必要があります`
								: `無効な${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `無効な数値: ${e.divisor}の倍数である必要があります`;
			case `unrecognized_keys`:
				return `認識されていないキー${e.keys.length > 1 ? `群` : ``}: ${H(e.keys, `、`)}`;
			case `invalid_key`:
				return `${e.origin}内の無効なキー`;
			case `invalid_union`:
				return `無効な入力`;
			case `invalid_element`:
				return `${e.origin}内の無効な値`;
			default:
				return `無効な入力`;
		}
	};
};
function Gv() {
	return { localeError: Wv() };
}
var Kv = () => {
	const e = {
		string: { unit: `სიმბოლო`, verb: `უნდა შეიცავდეს` },
		file: { unit: `ბაიტი`, verb: `უნდა შეიცავდეს` },
		array: { unit: `ელემენტი`, verb: `უნდა შეიცავდეს` },
		set: { unit: `ელემენტი`, verb: `უნდა შეიცავდეს` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `შეყვანა`,
			email: `ელ-ფოსტის მისამართი`,
			url: `URL`,
			emoji: `ემოჯი`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `თარიღი-დრო`,
			date: `თარიღი`,
			time: `დრო`,
			duration: `ხანგრძლივობა`,
			ipv4: `IPv4 მისამართი`,
			ipv6: `IPv6 მისამართი`,
			cidrv4: `IPv4 დიაპაზონი`,
			cidrv6: `IPv6 დიაპაზონი`,
			base64: `base64-კოდირებული სტრინგი`,
			base64url: `base64url-კოდირებული სტრინგი`,
			json_string: `JSON სტრინგი`,
			e164: `E.164 ნომერი`,
			jwt: `JWT`,
			template_literal: `შეყვანა`,
		},
		r = { nan: `NaN`, number: `რიცხვი`, string: `სტრინგი`, boolean: `ბულეანი`, function: `ფუნქცია`, array: `მასივი` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `არასწორი შეყვანა: მოსალოდნელი instanceof ${e.expected}, მიღებული ${i}`
					: `არასწორი შეყვანა: მოსალოდნელი ${t}, მიღებული ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `არასწორი შეყვანა: მოსალოდნელი ${G(e.values[0])}`
					: `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${H(e.values, `|`)}-დან`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `ზედმეტად დიდი: მოსალოდნელი ${e.origin ?? `მნიშვნელობა`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit}`
					: `ზედმეტად დიდი: მოსალოდნელი ${e.origin ?? `მნიშვნელობა`} იყოს ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `ზედმეტად პატარა: მოსალოდნელი ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
					: `ზედმეტად პატარა: მოსალოდნელი ${e.origin} იყოს ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `არასწორი სტრინგი: უნდა იწყებოდეს "${t.prefix}"-ით`
					: t.format === `ends_with`
						? `არასწორი სტრინგი: უნდა მთავრდებოდეს "${t.suffix}"-ით`
						: t.format === `includes`
							? `არასწორი სტრინგი: უნდა შეიცავდეს "${t.includes}"-ს`
							: t.format === `regex`
								? `არასწორი სტრინგი: უნდა შეესაბამებოდეს შაბლონს ${t.pattern}`
								: `არასწორი ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `არასწორი რიცხვი: უნდა იყოს ${e.divisor}-ის ჯერადი`;
			case `unrecognized_keys`:
				return `უცნობი გასაღებ${e.keys.length > 1 ? `ები` : `ი`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `არასწორი გასაღები ${e.origin}-ში`;
			case `invalid_union`:
				return `არასწორი შეყვანა`;
			case `invalid_element`:
				return `არასწორი მნიშვნელობა ${e.origin}-ში`;
			default:
				return `არასწორი შეყვანა`;
		}
	};
};
function qv() {
	return { localeError: Kv() };
}
var Jv = () => {
	const e = {
		string: { unit: `តួអក្សរ`, verb: `គួរមាន` },
		file: { unit: `បៃ`, verb: `គួរមាន` },
		array: { unit: `ធាតុ`, verb: `គួរមាន` },
		set: { unit: `ធាតុ`, verb: `គួរមាន` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ទិន្នន័យបញ្ចូល`,
			email: `អាសយដ្ឋានអ៊ីមែល`,
			url: `URL`,
			emoji: `សញ្ញាអារម្មណ៍`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `កាលបរិច្ឆេទ និងម៉ោង ISO`,
			date: `កាលបរិច្ឆេទ ISO`,
			time: `ម៉ោង ISO`,
			duration: `រយៈពេល ISO`,
			ipv4: `អាសយដ្ឋាន IPv4`,
			ipv6: `អាសយដ្ឋាន IPv6`,
			cidrv4: `ដែនអាសយដ្ឋាន IPv4`,
			cidrv6: `ដែនអាសយដ្ឋាន IPv6`,
			base64: `ខ្សែអក្សរអ៊ិកូដ base64`,
			base64url: `ខ្សែអក្សរអ៊ិកូដ base64url`,
			json_string: `ខ្សែអក្សរ JSON`,
			e164: `លេខ E.164`,
			jwt: `JWT`,
			template_literal: `ទិន្នន័យបញ្ចូល`,
		},
		r = { nan: `NaN`, number: `លេខ`, array: `អារេ (Array)`, null: `គ្មានតម្លៃ (null)` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${e.expected} ប៉ុន្តែទទួលបាន ${i}`
					: `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${t} ប៉ុន្តែទទួលបាន ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${G(e.values[0])}`
					: `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `ធំពេក៖ ត្រូវការ ${e.origin ?? `តម្លៃ`} ${n} ${e.maximum.toString()} ${r.unit ?? `ធាតុ`}`
					: `ធំពេក៖ ត្រូវការ ${e.origin ?? `តម្លៃ`} ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `តូចពេក៖ ត្រូវការ ${e.origin} ${n} ${e.minimum.toString()} ${r.unit}`
					: `តូចពេក៖ ត្រូវការ ${e.origin} ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${t.prefix}"`
					: t.format === `ends_with`
						? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${t.suffix}"`
						: t.format === `includes`
							? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${t.includes}"`
							: t.format === `regex`
								? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${t.pattern}`
								: `មិនត្រឹមត្រូវ៖ ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${e.divisor}`;
			case `unrecognized_keys`:
				return `រកឃើញសោមិនស្គាល់៖ ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `សោមិនត្រឹមត្រូវនៅក្នុង ${e.origin}`;
			case `invalid_union`:
				return `ទិន្នន័យមិនត្រឹមត្រូវ`;
			case `invalid_element`:
				return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${e.origin}`;
			default:
				return `ទិន្នន័យមិនត្រឹមត្រូវ`;
		}
	};
};
function Yv() {
	return { localeError: Jv() };
}
function Xv() {
	return Yv();
}
var Zv = () => {
	const e = {
		string: { unit: `문자`, verb: `to have` },
		file: { unit: `바이트`, verb: `to have` },
		array: { unit: `개`, verb: `to have` },
		set: { unit: `개`, verb: `to have` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `입력`,
			email: `이메일 주소`,
			url: `URL`,
			emoji: `이모지`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO 날짜시간`,
			date: `ISO 날짜`,
			time: `ISO 시간`,
			duration: `ISO 기간`,
			ipv4: `IPv4 주소`,
			ipv6: `IPv6 주소`,
			cidrv4: `IPv4 범위`,
			cidrv6: `IPv6 범위`,
			base64: `base64 인코딩 문자열`,
			base64url: `base64url 인코딩 문자열`,
			json_string: `JSON 문자열`,
			e164: `E.164 번호`,
			jwt: `JWT`,
			template_literal: `입력`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `잘못된 입력: 예상 타입은 instanceof ${e.expected}, 받은 타입은 ${i}입니다`
					: `잘못된 입력: 예상 타입은 ${t}, 받은 타입은 ${i}입니다`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `잘못된 입력: 값은 ${G(e.values[0])} 이어야 합니다`
					: `잘못된 옵션: ${H(e.values, `또는 `)} 중 하나여야 합니다`;
			case `too_big`: {
				const n = e.inclusive ? `이하` : `미만`,
					r = n === `미만` ? `이어야 합니다` : `여야 합니다`,
					i = t(e.origin),
					a = i?.unit ?? `요소`;
				return i
					? `${e.origin ?? `값`}이 너무 큽니다: ${e.maximum.toString()}${a} ${n}${r}`
					: `${e.origin ?? `값`}이 너무 큽니다: ${e.maximum.toString()} ${n}${r}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `이상` : `초과`,
					r = n === `이상` ? `이어야 합니다` : `여야 합니다`,
					i = t(e.origin),
					a = i?.unit ?? `요소`;
				return i
					? `${e.origin ?? `값`}이 너무 작습니다: ${e.minimum.toString()}${a} ${n}${r}`
					: `${e.origin ?? `값`}이 너무 작습니다: ${e.minimum.toString()} ${n}${r}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `잘못된 문자열: "${t.prefix}"(으)로 시작해야 합니다`
					: t.format === `ends_with`
						? `잘못된 문자열: "${t.suffix}"(으)로 끝나야 합니다`
						: t.format === `includes`
							? `잘못된 문자열: "${t.includes}"을(를) 포함해야 합니다`
							: t.format === `regex`
								? `잘못된 문자열: 정규식 ${t.pattern} 패턴과 일치해야 합니다`
								: `잘못된 ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `잘못된 숫자: ${e.divisor}의 배수여야 합니다`;
			case `unrecognized_keys`:
				return `인식할 수 없는 키: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `잘못된 키: ${e.origin}`;
			case `invalid_union`:
				return `잘못된 입력`;
			case `invalid_element`:
				return `잘못된 값: ${e.origin}`;
			default:
				return `잘못된 입력`;
		}
	};
};
function Qv() {
	return { localeError: Zv() };
}
var $v = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function ey(e) {
	const t = Math.abs(e),
		n = t % 10,
		r = t % 100;
	return (r >= 11 && r <= 19) || n === 0 ? `many` : n === 1 ? `one` : `few`;
}
var ty = () => {
	const e = {
		string: {
			unit: { one: `simbolis`, few: `simboliai`, many: `simbolių` },
			verb: {
				smaller: { inclusive: `turi būti ne ilgesnė kaip`, notInclusive: `turi būti trumpesnė kaip` },
				bigger: { inclusive: `turi būti ne trumpesnė kaip`, notInclusive: `turi būti ilgesnė kaip` },
			},
		},
		file: {
			unit: { one: `baitas`, few: `baitai`, many: `baitų` },
			verb: {
				smaller: { inclusive: `turi būti ne didesnis kaip`, notInclusive: `turi būti mažesnis kaip` },
				bigger: { inclusive: `turi būti ne mažesnis kaip`, notInclusive: `turi būti didesnis kaip` },
			},
		},
		array: {
			unit: { one: `elementą`, few: `elementus`, many: `elementų` },
			verb: {
				smaller: { inclusive: `turi turėti ne daugiau kaip`, notInclusive: `turi turėti mažiau kaip` },
				bigger: { inclusive: `turi turėti ne mažiau kaip`, notInclusive: `turi turėti daugiau kaip` },
			},
		},
		set: {
			unit: { one: `elementą`, few: `elementus`, many: `elementų` },
			verb: {
				smaller: { inclusive: `turi turėti ne daugiau kaip`, notInclusive: `turi turėti mažiau kaip` },
				bigger: { inclusive: `turi turėti ne mažiau kaip`, notInclusive: `turi turėti daugiau kaip` },
			},
		},
	};
	function t(t, n, r, i) {
		const a = e[t] ?? null;
		return a === null ? a : { unit: a.unit[n], verb: a.verb[i][r ? `inclusive` : `notInclusive`] };
	}
	const n = {
			regex: `įvestis`,
			email: `el. pašto adresas`,
			url: `URL`,
			emoji: `jaustukas`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO data ir laikas`,
			date: `ISO data`,
			time: `ISO laikas`,
			duration: `ISO trukmė`,
			ipv4: `IPv4 adresas`,
			ipv6: `IPv6 adresas`,
			cidrv4: `IPv4 tinklo prefiksas (CIDR)`,
			cidrv6: `IPv6 tinklo prefiksas (CIDR)`,
			base64: `base64 užkoduota eilutė`,
			base64url: `base64url užkoduota eilutė`,
			json_string: `JSON eilutė`,
			e164: `E.164 numeris`,
			jwt: `JWT`,
			template_literal: `įvestis`,
		},
		r = {
			nan: `NaN`,
			number: `skaičius`,
			bigint: `sveikasis skaičius`,
			string: `eilutė`,
			boolean: `loginė reikšmė`,
			undefined: `neapibrėžta reikšmė`,
			function: `funkcija`,
			symbol: `simbolis`,
			array: `masyvas`,
			object: `objektas`,
			null: `nulinė reikšmė`,
		};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Gautas tipas ${i}, o tikėtasi - instanceof ${e.expected}`
					: `Gautas tipas ${i}, o tikėtasi - ${t}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Privalo būti ${G(e.values[0])}`
					: `Privalo būti vienas iš ${H(e.values, `|`)} pasirinkimų`;
			case `too_big`: {
				const n = r[e.origin] ?? e.origin,
					i = t(e.origin, ey(Number(e.maximum)), e.inclusive ?? !1, `smaller`);
				if (i?.verb)
					return `${$v(n ?? e.origin ?? `reikšmė`)} ${i.verb} ${e.maximum.toString()} ${i.unit ?? `elementų`}`;
				const a = e.inclusive ? `ne didesnis kaip` : `mažesnis kaip`;
				return `${$v(n ?? e.origin ?? `reikšmė`)} turi būti ${a} ${e.maximum.toString()} ${i?.unit}`;
			}
			case `too_small`: {
				const n = r[e.origin] ?? e.origin,
					i = t(e.origin, ey(Number(e.minimum)), e.inclusive ?? !1, `bigger`);
				if (i?.verb)
					return `${$v(n ?? e.origin ?? `reikšmė`)} ${i.verb} ${e.minimum.toString()} ${i.unit ?? `elementų`}`;
				const a = e.inclusive ? `ne mažesnis kaip` : `didesnis kaip`;
				return `${$v(n ?? e.origin ?? `reikšmė`)} turi būti ${a} ${e.minimum.toString()} ${i?.unit}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Eilutė privalo prasidėti "${t.prefix}"`
					: t.format === `ends_with`
						? `Eilutė privalo pasibaigti "${t.suffix}"`
						: t.format === `includes`
							? `Eilutė privalo įtraukti "${t.includes}"`
							: t.format === `regex`
								? `Eilutė privalo atitikti ${t.pattern}`
								: `Neteisingas ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Skaičius privalo būti ${e.divisor} kartotinis.`;
			case `unrecognized_keys`:
				return `Neatpažint${e.keys.length > 1 ? `i` : `as`} rakt${e.keys.length > 1 ? `ai` : `as`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Rastas klaidingas raktas`;
			case `invalid_union`:
				return `Klaidinga įvestis`;
			case `invalid_element`:
				return `${$v(r[e.origin] ?? e.origin ?? e.origin ?? `reikšmė`)} turi klaidingą įvestį`;
			default:
				return `Klaidinga įvestis`;
		}
	};
};
function ny() {
	return { localeError: ty() };
}
var ry = () => {
	const e = {
		string: { unit: `знаци`, verb: `да имаат` },
		file: { unit: `бајти`, verb: `да имаат` },
		array: { unit: `ставки`, verb: `да имаат` },
		set: { unit: `ставки`, verb: `да имаат` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `внес`,
			email: `адреса на е-пошта`,
			url: `URL`,
			emoji: `емоџи`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO датум и време`,
			date: `ISO датум`,
			time: `ISO време`,
			duration: `ISO времетраење`,
			ipv4: `IPv4 адреса`,
			ipv6: `IPv6 адреса`,
			cidrv4: `IPv4 опсег`,
			cidrv6: `IPv6 опсег`,
			base64: `base64-енкодирана низа`,
			base64url: `base64url-енкодирана низа`,
			json_string: `JSON низа`,
			e164: `E.164 број`,
			jwt: `JWT`,
			template_literal: `внес`,
		},
		r = { nan: `NaN`, number: `број`, array: `низа` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Грешен внес: се очекува instanceof ${e.expected}, примено ${i}`
					: `Грешен внес: се очекува ${t}, примено ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Invalid input: expected ${G(e.values[0])}`
					: `Грешана опција: се очекува една ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Премногу голем: се очекува ${e.origin ?? `вредноста`} да има ${n}${e.maximum.toString()} ${r.unit ?? `елементи`}`
					: `Премногу голем: се очекува ${e.origin ?? `вредноста`} да биде ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Премногу мал: се очекува ${e.origin} да има ${n}${e.minimum.toString()} ${r.unit}`
					: `Премногу мал: се очекува ${e.origin} да биде ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Неважечка низа: мора да започнува со "${t.prefix}"`
					: t.format === `ends_with`
						? `Неважечка низа: мора да завршува со "${t.suffix}"`
						: t.format === `includes`
							? `Неважечка низа: мора да вклучува "${t.includes}"`
							: t.format === `regex`
								? `Неважечка низа: мора да одгоара на патернот ${t.pattern}`
								: `Invalid ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Грешен број: мора да биде делив со ${e.divisor}`;
			case `unrecognized_keys`:
				return `${e.keys.length > 1 ? `Непрепознаени клучеви` : `Непрепознаен клуч`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Грешен клуч во ${e.origin}`;
			case `invalid_union`:
				return `Грешен внес`;
			case `invalid_element`:
				return `Грешна вредност во ${e.origin}`;
			default:
				return `Грешен внес`;
		}
	};
};
function iy() {
	return { localeError: ry() };
}
var ay = () => {
	const e = {
		string: { unit: `aksara`, verb: `mempunyai` },
		file: { unit: `bait`, verb: `mempunyai` },
		array: { unit: `elemen`, verb: `mempunyai` },
		set: { unit: `elemen`, verb: `mempunyai` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `alamat e-mel`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `tarikh masa ISO`,
			date: `tarikh ISO`,
			time: `masa ISO`,
			duration: `tempoh ISO`,
			ipv4: `alamat IPv4`,
			ipv6: `alamat IPv6`,
			cidrv4: `julat IPv4`,
			cidrv6: `julat IPv6`,
			base64: `string dikodkan base64`,
			base64url: `string dikodkan base64url`,
			json_string: `string JSON`,
			e164: `nombor E.164`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN`, number: `nombor` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Input tidak sah: dijangka instanceof ${e.expected}, diterima ${i}`
					: `Input tidak sah: dijangka ${t}, diterima ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Input tidak sah: dijangka ${G(e.values[0])}`
					: `Pilihan tidak sah: dijangka salah satu daripada ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Terlalu besar: dijangka ${e.origin ?? `nilai`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `elemen`}`
					: `Terlalu besar: dijangka ${e.origin ?? `nilai`} adalah ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Terlalu kecil: dijangka ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
					: `Terlalu kecil: dijangka ${e.origin} adalah ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `String tidak sah: mesti bermula dengan "${t.prefix}"`
					: t.format === `ends_with`
						? `String tidak sah: mesti berakhir dengan "${t.suffix}"`
						: t.format === `includes`
							? `String tidak sah: mesti mengandungi "${t.includes}"`
							: t.format === `regex`
								? `String tidak sah: mesti sepadan dengan corak ${t.pattern}`
								: `${n[t.format] ?? e.format} tidak sah`;
			}
			case `not_multiple_of`:
				return `Nombor tidak sah: perlu gandaan ${e.divisor}`;
			case `unrecognized_keys`:
				return `Kunci tidak dikenali: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Kunci tidak sah dalam ${e.origin}`;
			case `invalid_union`:
				return `Input tidak sah`;
			case `invalid_element`:
				return `Nilai tidak sah dalam ${e.origin}`;
			default:
				return `Input tidak sah`;
		}
	};
};
function oy() {
	return { localeError: ay() };
}
var sy = () => {
	const e = {
		string: { unit: `tekens`, verb: `heeft` },
		file: { unit: `bytes`, verb: `heeft` },
		array: { unit: `elementen`, verb: `heeft` },
		set: { unit: `elementen`, verb: `heeft` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `invoer`,
			email: `emailadres`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO datum en tijd`,
			date: `ISO datum`,
			time: `ISO tijd`,
			duration: `ISO duur`,
			ipv4: `IPv4-adres`,
			ipv6: `IPv6-adres`,
			cidrv4: `IPv4-bereik`,
			cidrv6: `IPv6-bereik`,
			base64: `base64-gecodeerde tekst`,
			base64url: `base64 URL-gecodeerde tekst`,
			json_string: `JSON string`,
			e164: `E.164-nummer`,
			jwt: `JWT`,
			template_literal: `invoer`,
		},
		r = { nan: `NaN`, number: `getal` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Ongeldige invoer: verwacht instanceof ${e.expected}, ontving ${i}`
					: `Ongeldige invoer: verwacht ${t}, ontving ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Ongeldige invoer: verwacht ${G(e.values[0])}`
					: `Ongeldige optie: verwacht één van ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin),
					i = e.origin === `date` ? `laat` : e.origin === `string` ? `lang` : `groot`;
				return r
					? `Te ${i}: verwacht dat ${e.origin ?? `waarde`} ${n}${e.maximum.toString()} ${r.unit ?? `elementen`} ${r.verb}`
					: `Te ${i}: verwacht dat ${e.origin ?? `waarde`} ${n}${e.maximum.toString()} is`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin),
					i = e.origin === `date` ? `vroeg` : e.origin === `string` ? `kort` : `klein`;
				return r
					? `Te ${i}: verwacht dat ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ${r.verb}`
					: `Te ${i}: verwacht dat ${e.origin} ${n}${e.minimum.toString()} is`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ongeldige tekst: moet met "${t.prefix}" beginnen`
					: t.format === `ends_with`
						? `Ongeldige tekst: moet op "${t.suffix}" eindigen`
						: t.format === `includes`
							? `Ongeldige tekst: moet "${t.includes}" bevatten`
							: t.format === `regex`
								? `Ongeldige tekst: moet overeenkomen met patroon ${t.pattern}`
								: `Ongeldig: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Ongeldig getal: moet een veelvoud van ${e.divisor} zijn`;
			case `unrecognized_keys`:
				return `Onbekende key${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Ongeldige key in ${e.origin}`;
			case `invalid_union`:
				return `Ongeldige invoer`;
			case `invalid_element`:
				return `Ongeldige waarde in ${e.origin}`;
			default:
				return `Ongeldige invoer`;
		}
	};
};
function cy() {
	return { localeError: sy() };
}
var ly = () => {
	const e = {
		string: { unit: `tegn`, verb: `å ha` },
		file: { unit: `bytes`, verb: `å ha` },
		array: { unit: `elementer`, verb: `å inneholde` },
		set: { unit: `elementer`, verb: `å inneholde` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `input`,
			email: `e-postadresse`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO dato- og klokkeslett`,
			date: `ISO-dato`,
			time: `ISO-klokkeslett`,
			duration: `ISO-varighet`,
			ipv4: `IPv4-område`,
			ipv6: `IPv6-område`,
			cidrv4: `IPv4-spekter`,
			cidrv6: `IPv6-spekter`,
			base64: `base64-enkodet streng`,
			base64url: `base64url-enkodet streng`,
			json_string: `JSON-streng`,
			e164: `E.164-nummer`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN`, number: `tall`, array: `liste` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Ugyldig input: forventet instanceof ${e.expected}, fikk ${i}`
					: `Ugyldig input: forventet ${t}, fikk ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Ugyldig verdi: forventet ${G(e.values[0])}`
					: `Ugyldig valg: forventet en av ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `For stor(t): forventet ${e.origin ?? `value`} til å ha ${n}${e.maximum.toString()} ${r.unit ?? `elementer`}`
					: `For stor(t): forventet ${e.origin ?? `value`} til å ha ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `For lite(n): forventet ${e.origin} til å ha ${n}${e.minimum.toString()} ${r.unit}`
					: `For lite(n): forventet ${e.origin} til å ha ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ugyldig streng: må starte med "${t.prefix}"`
					: t.format === `ends_with`
						? `Ugyldig streng: må ende med "${t.suffix}"`
						: t.format === `includes`
							? `Ugyldig streng: må inneholde "${t.includes}"`
							: t.format === `regex`
								? `Ugyldig streng: må matche mønsteret ${t.pattern}`
								: `Ugyldig ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Ugyldig tall: må være et multiplum av ${e.divisor}`;
			case `unrecognized_keys`:
				return `${e.keys.length > 1 ? `Ukjente nøkler` : `Ukjent nøkkel`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Ugyldig nøkkel i ${e.origin}`;
			case `invalid_union`:
				return `Ugyldig input`;
			case `invalid_element`:
				return `Ugyldig verdi i ${e.origin}`;
			default:
				return `Ugyldig input`;
		}
	};
};
function uy() {
	return { localeError: ly() };
}
var dy = () => {
	const e = {
		string: { unit: `harf`, verb: `olmalıdır` },
		file: { unit: `bayt`, verb: `olmalıdır` },
		array: { unit: `unsur`, verb: `olmalıdır` },
		set: { unit: `unsur`, verb: `olmalıdır` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `giren`,
			email: `epostagâh`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO hengâmı`,
			date: `ISO tarihi`,
			time: `ISO zamanı`,
			duration: `ISO müddeti`,
			ipv4: `IPv4 nişânı`,
			ipv6: `IPv6 nişânı`,
			cidrv4: `IPv4 menzili`,
			cidrv6: `IPv6 menzili`,
			base64: `base64-şifreli metin`,
			base64url: `base64url-şifreli metin`,
			json_string: `JSON metin`,
			e164: `E.164 sayısı`,
			jwt: `JWT`,
			template_literal: `giren`,
		},
		r = { nan: `NaN`, number: `numara`, array: `saf`, null: `gayb` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Fâsit giren: umulan instanceof ${e.expected}, alınan ${i}`
					: `Fâsit giren: umulan ${t}, alınan ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Fâsit giren: umulan ${G(e.values[0])}`
					: `Fâsit tercih: mûteberler ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Fazla büyük: ${e.origin ?? `value`}, ${n}${e.maximum.toString()} ${r.unit ?? `elements`} sahip olmalıydı.`
					: `Fazla büyük: ${e.origin ?? `value`}, ${n}${e.maximum.toString()} olmalıydı.`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Fazla küçük: ${e.origin}, ${n}${e.minimum.toString()} ${r.unit} sahip olmalıydı.`
					: `Fazla küçük: ${e.origin}, ${n}${e.minimum.toString()} olmalıydı.`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Fâsit metin: "${t.prefix}" ile başlamalı.`
					: t.format === `ends_with`
						? `Fâsit metin: "${t.suffix}" ile bitmeli.`
						: t.format === `includes`
							? `Fâsit metin: "${t.includes}" ihtivâ etmeli.`
							: t.format === `regex`
								? `Fâsit metin: ${t.pattern} nakşına uymalı.`
								: `Fâsit ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Fâsit sayı: ${e.divisor} katı olmalıydı.`;
			case `unrecognized_keys`:
				return `Tanınmayan anahtar ${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `${e.origin} için tanınmayan anahtar var.`;
			case `invalid_union`:
				return `Giren tanınamadı.`;
			case `invalid_element`:
				return `${e.origin} için tanınmayan kıymet var.`;
			default:
				return `Kıymet tanınamadı.`;
		}
	};
};
function fy() {
	return { localeError: dy() };
}
var py = () => {
	const e = {
		string: { unit: `توکي`, verb: `ولري` },
		file: { unit: `بایټس`, verb: `ولري` },
		array: { unit: `توکي`, verb: `ولري` },
		set: { unit: `توکي`, verb: `ولري` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ورودي`,
			email: `بریښنالیک`,
			url: `یو آر ال`,
			emoji: `ایموجي`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `نیټه او وخت`,
			date: `نېټه`,
			time: `وخت`,
			duration: `موده`,
			ipv4: `د IPv4 پته`,
			ipv6: `د IPv6 پته`,
			cidrv4: `د IPv4 ساحه`,
			cidrv6: `د IPv6 ساحه`,
			base64: `base64-encoded متن`,
			base64url: `base64url-encoded متن`,
			json_string: `JSON متن`,
			e164: `د E.164 شمېره`,
			jwt: `JWT`,
			template_literal: `ورودي`,
		},
		r = { nan: `NaN`, number: `عدد`, array: `ارې` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `ناسم ورودي: باید instanceof ${e.expected} وای, مګر ${i} ترلاسه شو`
					: `ناسم ورودي: باید ${t} وای, مګر ${i} ترلاسه شو`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `ناسم ورودي: باید ${G(e.values[0])} وای`
					: `ناسم انتخاب: باید یو له ${H(e.values, `|`)} څخه وای`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `ډیر لوی: ${e.origin ?? `ارزښت`} باید ${n}${e.maximum.toString()} ${r.unit ?? `عنصرونه`} ولري`
					: `ډیر لوی: ${e.origin ?? `ارزښت`} باید ${n}${e.maximum.toString()} وي`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `ډیر کوچنی: ${e.origin} باید ${n}${e.minimum.toString()} ${r.unit} ولري`
					: `ډیر کوچنی: ${e.origin} باید ${n}${e.minimum.toString()} وي`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `ناسم متن: باید د "${t.prefix}" سره پیل شي`
					: t.format === `ends_with`
						? `ناسم متن: باید د "${t.suffix}" سره پای ته ورسيږي`
						: t.format === `includes`
							? `ناسم متن: باید "${t.includes}" ولري`
							: t.format === `regex`
								? `ناسم متن: باید د ${t.pattern} سره مطابقت ولري`
								: `${n[t.format] ?? e.format} ناسم دی`;
			}
			case `not_multiple_of`:
				return `ناسم عدد: باید د ${e.divisor} مضرب وي`;
			case `unrecognized_keys`:
				return `ناسم ${e.keys.length > 1 ? `کلیډونه` : `کلیډ`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `ناسم کلیډ په ${e.origin} کې`;
			case `invalid_union`:
				return `ناسمه ورودي`;
			case `invalid_element`:
				return `ناسم عنصر په ${e.origin} کې`;
			default:
				return `ناسمه ورودي`;
		}
	};
};
function my() {
	return { localeError: py() };
}
var hy = () => {
	const e = {
		string: { unit: `znaków`, verb: `mieć` },
		file: { unit: `bajtów`, verb: `mieć` },
		array: { unit: `elementów`, verb: `mieć` },
		set: { unit: `elementów`, verb: `mieć` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `wyrażenie`,
			email: `adres email`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `data i godzina w formacie ISO`,
			date: `data w formacie ISO`,
			time: `godzina w formacie ISO`,
			duration: `czas trwania ISO`,
			ipv4: `adres IPv4`,
			ipv6: `adres IPv6`,
			cidrv4: `zakres IPv4`,
			cidrv6: `zakres IPv6`,
			base64: `ciąg znaków zakodowany w formacie base64`,
			base64url: `ciąg znaków zakodowany w formacie base64url`,
			json_string: `ciąg znaków w formacie JSON`,
			e164: `liczba E.164`,
			jwt: `JWT`,
			template_literal: `wejście`,
		},
		r = { nan: `NaN`, number: `liczba`, array: `tablica` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${e.expected}, otrzymano ${i}`
					: `Nieprawidłowe dane wejściowe: oczekiwano ${t}, otrzymano ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Nieprawidłowe dane wejściowe: oczekiwano ${G(e.values[0])}`
					: `Nieprawidłowa opcja: oczekiwano jednej z wartości ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Za duża wartość: oczekiwano, że ${e.origin ?? `wartość`} będzie mieć ${n}${e.maximum.toString()} ${r.unit ?? `elementów`}`
					: `Zbyt duż(y/a/e): oczekiwano, że ${e.origin ?? `wartość`} będzie wynosić ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Za mała wartość: oczekiwano, że ${e.origin ?? `wartość`} będzie mieć ${n}${e.minimum.toString()} ${r.unit ?? `elementów`}`
					: `Zbyt mał(y/a/e): oczekiwano, że ${e.origin ?? `wartość`} będzie wynosić ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Nieprawidłowy ciąg znaków: musi zaczynać się od "${t.prefix}"`
					: t.format === `ends_with`
						? `Nieprawidłowy ciąg znaków: musi kończyć się na "${t.suffix}"`
						: t.format === `includes`
							? `Nieprawidłowy ciąg znaków: musi zawierać "${t.includes}"`
							: t.format === `regex`
								? `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${t.pattern}`
								: `Nieprawidłow(y/a/e) ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Nieprawidłowa liczba: musi być wielokrotnością ${e.divisor}`;
			case `unrecognized_keys`:
				return `Nierozpoznane klucze${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Nieprawidłowy klucz w ${e.origin}`;
			case `invalid_union`:
				return `Nieprawidłowe dane wejściowe`;
			case `invalid_element`:
				return `Nieprawidłowa wartość w ${e.origin}`;
			default:
				return `Nieprawidłowe dane wejściowe`;
		}
	};
};
function gy() {
	return { localeError: hy() };
}
var _y = () => {
	const e = {
		string: { unit: `caracteres`, verb: `ter` },
		file: { unit: `bytes`, verb: `ter` },
		array: { unit: `itens`, verb: `ter` },
		set: { unit: `itens`, verb: `ter` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `padrão`,
			email: `endereço de e-mail`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `data e hora ISO`,
			date: `data ISO`,
			time: `hora ISO`,
			duration: `duração ISO`,
			ipv4: `endereço IPv4`,
			ipv6: `endereço IPv6`,
			cidrv4: `faixa de IPv4`,
			cidrv6: `faixa de IPv6`,
			base64: `texto codificado em base64`,
			base64url: `URL codificada em base64`,
			json_string: `texto JSON`,
			e164: `número E.164`,
			jwt: `JWT`,
			template_literal: `entrada`,
		},
		r = { nan: `NaN`, number: `número`, null: `nulo` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Tipo inválido: esperado instanceof ${e.expected}, recebido ${i}`
					: `Tipo inválido: esperado ${t}, recebido ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Entrada inválida: esperado ${G(e.values[0])}`
					: `Opção inválida: esperada uma das ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Muito grande: esperado que ${e.origin ?? `valor`} tivesse ${n}${e.maximum.toString()} ${r.unit ?? `elementos`}`
					: `Muito grande: esperado que ${e.origin ?? `valor`} fosse ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Muito pequeno: esperado que ${e.origin} tivesse ${n}${e.minimum.toString()} ${r.unit}`
					: `Muito pequeno: esperado que ${e.origin} fosse ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Texto inválido: deve começar com "${t.prefix}"`
					: t.format === `ends_with`
						? `Texto inválido: deve terminar com "${t.suffix}"`
						: t.format === `includes`
							? `Texto inválido: deve incluir "${t.includes}"`
							: t.format === `regex`
								? `Texto inválido: deve corresponder ao padrão ${t.pattern}`
								: `${n[t.format] ?? e.format} inválido`;
			}
			case `not_multiple_of`:
				return `Número inválido: deve ser múltiplo de ${e.divisor}`;
			case `unrecognized_keys`:
				return `Chave${e.keys.length > 1 ? `s` : ``} desconhecida${e.keys.length > 1 ? `s` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Chave inválida em ${e.origin}`;
			case `invalid_union`:
				return `Entrada inválida`;
			case `invalid_element`:
				return `Valor inválido em ${e.origin}`;
			default:
				return `Campo inválido`;
		}
	};
};
function vy() {
	return { localeError: _y() };
}
function yy(e, t, n, r) {
	const i = Math.abs(e),
		a = i % 10,
		o = i % 100;
	return o >= 11 && o <= 19 ? r : a === 1 ? t : a >= 2 && a <= 4 ? n : r;
}
var by = () => {
	const e = {
		string: { unit: { one: `символ`, few: `символа`, many: `символов` }, verb: `иметь` },
		file: { unit: { one: `байт`, few: `байта`, many: `байт` }, verb: `иметь` },
		array: { unit: { one: `элемент`, few: `элемента`, many: `элементов` }, verb: `иметь` },
		set: { unit: { one: `элемент`, few: `элемента`, many: `элементов` }, verb: `иметь` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ввод`,
			email: `email адрес`,
			url: `URL`,
			emoji: `эмодзи`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO дата и время`,
			date: `ISO дата`,
			time: `ISO время`,
			duration: `ISO длительность`,
			ipv4: `IPv4 адрес`,
			ipv6: `IPv6 адрес`,
			cidrv4: `IPv4 диапазон`,
			cidrv6: `IPv6 диапазон`,
			base64: `строка в формате base64`,
			base64url: `строка в формате base64url`,
			json_string: `JSON строка`,
			e164: `номер E.164`,
			jwt: `JWT`,
			template_literal: `ввод`,
		},
		r = { nan: `NaN`, number: `число`, array: `массив` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Неверный ввод: ожидалось instanceof ${e.expected}, получено ${i}`
					: `Неверный ввод: ожидалось ${t}, получено ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Неверный ввод: ожидалось ${G(e.values[0])}`
					: `Неверный вариант: ожидалось одно из ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				if (r) {
					const t = yy(Number(e.maximum), r.unit.one, r.unit.few, r.unit.many);
					return `Слишком большое значение: ожидалось, что ${e.origin ?? `значение`} будет иметь ${n}${e.maximum.toString()} ${t}`;
				}
				return `Слишком большое значение: ожидалось, что ${e.origin ?? `значение`} будет ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				if (r) {
					const t = yy(Number(e.minimum), r.unit.one, r.unit.few, r.unit.many);
					return `Слишком маленькое значение: ожидалось, что ${e.origin} будет иметь ${n}${e.minimum.toString()} ${t}`;
				}
				return `Слишком маленькое значение: ожидалось, что ${e.origin} будет ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Неверная строка: должна начинаться с "${t.prefix}"`
					: t.format === `ends_with`
						? `Неверная строка: должна заканчиваться на "${t.suffix}"`
						: t.format === `includes`
							? `Неверная строка: должна содержать "${t.includes}"`
							: t.format === `regex`
								? `Неверная строка: должна соответствовать шаблону ${t.pattern}`
								: `Неверный ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Неверное число: должно быть кратным ${e.divisor}`;
			case `unrecognized_keys`:
				return `Нераспознанн${e.keys.length > 1 ? `ые` : `ый`} ключ${e.keys.length > 1 ? `и` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Неверный ключ в ${e.origin}`;
			case `invalid_union`:
				return `Неверные входные данные`;
			case `invalid_element`:
				return `Неверное значение в ${e.origin}`;
			default:
				return `Неверные входные данные`;
		}
	};
};
function xy() {
	return { localeError: by() };
}
var Sy = () => {
	const e = {
		string: { unit: `znakov`, verb: `imeti` },
		file: { unit: `bajtov`, verb: `imeti` },
		array: { unit: `elementov`, verb: `imeti` },
		set: { unit: `elementov`, verb: `imeti` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `vnos`,
			email: `e-poštni naslov`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO datum in čas`,
			date: `ISO datum`,
			time: `ISO čas`,
			duration: `ISO trajanje`,
			ipv4: `IPv4 naslov`,
			ipv6: `IPv6 naslov`,
			cidrv4: `obseg IPv4`,
			cidrv6: `obseg IPv6`,
			base64: `base64 kodiran niz`,
			base64url: `base64url kodiran niz`,
			json_string: `JSON niz`,
			e164: `E.164 številka`,
			jwt: `JWT`,
			template_literal: `vnos`,
		},
		r = { nan: `NaN`, number: `število`, array: `tabela` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Neveljaven vnos: pričakovano instanceof ${e.expected}, prejeto ${i}`
					: `Neveljaven vnos: pričakovano ${t}, prejeto ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Neveljaven vnos: pričakovano ${G(e.values[0])}`
					: `Neveljavna možnost: pričakovano eno izmed ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Preveliko: pričakovano, da bo ${e.origin ?? `vrednost`} imelo ${n}${e.maximum.toString()} ${r.unit ?? `elementov`}`
					: `Preveliko: pričakovano, da bo ${e.origin ?? `vrednost`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Premajhno: pričakovano, da bo ${e.origin} imelo ${n}${e.minimum.toString()} ${r.unit}`
					: `Premajhno: pričakovano, da bo ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Neveljaven niz: mora se začeti z "${t.prefix}"`
					: t.format === `ends_with`
						? `Neveljaven niz: mora se končati z "${t.suffix}"`
						: t.format === `includes`
							? `Neveljaven niz: mora vsebovati "${t.includes}"`
							: t.format === `regex`
								? `Neveljaven niz: mora ustrezati vzorcu ${t.pattern}`
								: `Neveljaven ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Neveljavno število: mora biti večkratnik ${e.divisor}`;
			case `unrecognized_keys`:
				return `Neprepoznan${e.keys.length > 1 ? `i ključi` : ` ključ`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Neveljaven ključ v ${e.origin}`;
			case `invalid_union`:
				return `Neveljaven vnos`;
			case `invalid_element`:
				return `Neveljavna vrednost v ${e.origin}`;
			default:
				return `Neveljaven vnos`;
		}
	};
};
function Cy() {
	return { localeError: Sy() };
}
var wy = () => {
	const e = {
		string: { unit: `tecken`, verb: `att ha` },
		file: { unit: `bytes`, verb: `att ha` },
		array: { unit: `objekt`, verb: `att innehålla` },
		set: { unit: `objekt`, verb: `att innehålla` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `reguljärt uttryck`,
			email: `e-postadress`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO-datum och tid`,
			date: `ISO-datum`,
			time: `ISO-tid`,
			duration: `ISO-varaktighet`,
			ipv4: `IPv4-intervall`,
			ipv6: `IPv6-intervall`,
			cidrv4: `IPv4-spektrum`,
			cidrv6: `IPv6-spektrum`,
			base64: `base64-kodad sträng`,
			base64url: `base64url-kodad sträng`,
			json_string: `JSON-sträng`,
			e164: `E.164-nummer`,
			jwt: `JWT`,
			template_literal: `mall-literal`,
		},
		r = { nan: `NaN`, number: `antal`, array: `lista` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Ogiltig inmatning: förväntat instanceof ${e.expected}, fick ${i}`
					: `Ogiltig inmatning: förväntat ${t}, fick ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Ogiltig inmatning: förväntat ${G(e.values[0])}`
					: `Ogiltigt val: förväntade en av ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `För stor(t): förväntade ${e.origin ?? `värdet`} att ha ${n}${e.maximum.toString()} ${r.unit ?? `element`}`
					: `För stor(t): förväntat ${e.origin ?? `värdet`} att ha ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `För lite(t): förväntade ${e.origin ?? `värdet`} att ha ${n}${e.minimum.toString()} ${r.unit}`
					: `För lite(t): förväntade ${e.origin ?? `värdet`} att ha ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ogiltig sträng: måste börja med "${t.prefix}"`
					: t.format === `ends_with`
						? `Ogiltig sträng: måste sluta med "${t.suffix}"`
						: t.format === `includes`
							? `Ogiltig sträng: måste innehålla "${t.includes}"`
							: t.format === `regex`
								? `Ogiltig sträng: måste matcha mönstret "${t.pattern}"`
								: `Ogiltig(t) ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Ogiltigt tal: måste vara en multipel av ${e.divisor}`;
			case `unrecognized_keys`:
				return `${e.keys.length > 1 ? `Okända nycklar` : `Okänd nyckel`}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Ogiltig nyckel i ${e.origin ?? `värdet`}`;
			case `invalid_union`:
				return `Ogiltig input`;
			case `invalid_element`:
				return `Ogiltigt värde i ${e.origin ?? `värdet`}`;
			default:
				return `Ogiltig input`;
		}
	};
};
function Ty() {
	return { localeError: wy() };
}
var Ey = () => {
	const e = {
		string: { unit: `எழுத்துக்கள்`, verb: `கொண்டிருக்க வேண்டும்` },
		file: { unit: `பைட்டுகள்`, verb: `கொண்டிருக்க வேண்டும்` },
		array: { unit: `உறுப்புகள்`, verb: `கொண்டிருக்க வேண்டும்` },
		set: { unit: `உறுப்புகள்`, verb: `கொண்டிருக்க வேண்டும்` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `உள்ளீடு`,
			email: `மின்னஞ்சல் முகவரி`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO தேதி நேரம்`,
			date: `ISO தேதி`,
			time: `ISO நேரம்`,
			duration: `ISO கால அளவு`,
			ipv4: `IPv4 முகவரி`,
			ipv6: `IPv6 முகவரி`,
			cidrv4: `IPv4 வரம்பு`,
			cidrv6: `IPv6 வரம்பு`,
			base64: `base64-encoded சரம்`,
			base64url: `base64url-encoded சரம்`,
			json_string: `JSON சரம்`,
			e164: `E.164 எண்`,
			jwt: `JWT`,
			template_literal: `input`,
		},
		r = { nan: `NaN`, number: `எண்`, array: `அணி`, null: `வெறுமை` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${e.expected}, பெறப்பட்டது ${i}`
					: `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${t}, பெறப்பட்டது ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${G(e.values[0])}`
					: `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${H(e.values, `|`)} இல் ஒன்று`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${e.origin ?? `மதிப்பு`} ${n}${e.maximum.toString()} ${r.unit ?? `உறுப்புகள்`} ஆக இருக்க வேண்டும்`
					: `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${e.origin ?? `மதிப்பு`} ${n}${e.maximum.toString()} ஆக இருக்க வேண்டும்`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ஆக இருக்க வேண்டும்`
					: `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${e.origin} ${n}${e.minimum.toString()} ஆக இருக்க வேண்டும்`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `தவறான சரம்: "${t.prefix}" இல் தொடங்க வேண்டும்`
					: t.format === `ends_with`
						? `தவறான சரம்: "${t.suffix}" இல் முடிவடைய வேண்டும்`
						: t.format === `includes`
							? `தவறான சரம்: "${t.includes}" ஐ உள்ளடக்க வேண்டும்`
							: t.format === `regex`
								? `தவறான சரம்: ${t.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`
								: `தவறான ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `தவறான எண்: ${e.divisor} இன் பலமாக இருக்க வேண்டும்`;
			case `unrecognized_keys`:
				return `அடையாளம் தெரியாத விசை${e.keys.length > 1 ? `கள்` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `${e.origin} இல் தவறான விசை`;
			case `invalid_union`:
				return `தவறான உள்ளீடு`;
			case `invalid_element`:
				return `${e.origin} இல் தவறான மதிப்பு`;
			default:
				return `தவறான உள்ளீடு`;
		}
	};
};
function Dy() {
	return { localeError: Ey() };
}
var Oy = () => {
	const e = {
		string: { unit: `ตัวอักษร`, verb: `ควรมี` },
		file: { unit: `ไบต์`, verb: `ควรมี` },
		array: { unit: `รายการ`, verb: `ควรมี` },
		set: { unit: `รายการ`, verb: `ควรมี` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ข้อมูลที่ป้อน`,
			email: `ที่อยู่อีเมล`,
			url: `URL`,
			emoji: `อิโมจิ`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `วันที่เวลาแบบ ISO`,
			date: `วันที่แบบ ISO`,
			time: `เวลาแบบ ISO`,
			duration: `ช่วงเวลาแบบ ISO`,
			ipv4: `ที่อยู่ IPv4`,
			ipv6: `ที่อยู่ IPv6`,
			cidrv4: `ช่วง IP แบบ IPv4`,
			cidrv6: `ช่วง IP แบบ IPv6`,
			base64: `ข้อความแบบ Base64`,
			base64url: `ข้อความแบบ Base64 สำหรับ URL`,
			json_string: `ข้อความแบบ JSON`,
			e164: `เบอร์โทรศัพท์ระหว่างประเทศ (E.164)`,
			jwt: `โทเคน JWT`,
			template_literal: `ข้อมูลที่ป้อน`,
		},
		r = { nan: `NaN`, number: `ตัวเลข`, array: `อาร์เรย์ (Array)`, null: `ไม่มีค่า (null)` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${e.expected} แต่ได้รับ ${i}`
					: `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${t} แต่ได้รับ ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `ค่าไม่ถูกต้อง: ควรเป็น ${G(e.values[0])}`
					: `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `ไม่เกิน` : `น้อยกว่า`,
					r = t(e.origin);
				return r
					? `เกินกำหนด: ${e.origin ?? `ค่า`} ควรมี${n} ${e.maximum.toString()} ${r.unit ?? `รายการ`}`
					: `เกินกำหนด: ${e.origin ?? `ค่า`} ควรมี${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `อย่างน้อย` : `มากกว่า`,
					r = t(e.origin);
				return r
					? `น้อยกว่ากำหนด: ${e.origin} ควรมี${n} ${e.minimum.toString()} ${r.unit}`
					: `น้อยกว่ากำหนด: ${e.origin} ควรมี${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${t.prefix}"`
					: t.format === `ends_with`
						? `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${t.suffix}"`
						: t.format === `includes`
							? `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${t.includes}" อยู่ในข้อความ`
							: t.format === `regex`
								? `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${t.pattern}`
								: `รูปแบบไม่ถูกต้อง: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${e.divisor} ได้ลงตัว`;
			case `unrecognized_keys`:
				return `พบคีย์ที่ไม่รู้จัก: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `คีย์ไม่ถูกต้องใน ${e.origin}`;
			case `invalid_union`:
				return `ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้`;
			case `invalid_element`:
				return `ข้อมูลไม่ถูกต้องใน ${e.origin}`;
			default:
				return `ข้อมูลไม่ถูกต้อง`;
		}
	};
};
function ky() {
	return { localeError: Oy() };
}
var Ay = () => {
	const e = {
		string: { unit: `karakter`, verb: `olmalı` },
		file: { unit: `bayt`, verb: `olmalı` },
		array: { unit: `öğe`, verb: `olmalı` },
		set: { unit: `öğe`, verb: `olmalı` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `girdi`,
			email: `e-posta adresi`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO tarih ve saat`,
			date: `ISO tarih`,
			time: `ISO saat`,
			duration: `ISO süre`,
			ipv4: `IPv4 adresi`,
			ipv6: `IPv6 adresi`,
			cidrv4: `IPv4 aralığı`,
			cidrv6: `IPv6 aralığı`,
			base64: `base64 ile şifrelenmiş metin`,
			base64url: `base64url ile şifrelenmiş metin`,
			json_string: `JSON dizesi`,
			e164: `E.164 sayısı`,
			jwt: `JWT`,
			template_literal: `Şablon dizesi`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Geçersiz değer: beklenen instanceof ${e.expected}, alınan ${i}`
					: `Geçersiz değer: beklenen ${t}, alınan ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Geçersiz değer: beklenen ${G(e.values[0])}`
					: `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Çok büyük: beklenen ${e.origin ?? `değer`} ${n}${e.maximum.toString()} ${r.unit ?? `öğe`}`
					: `Çok büyük: beklenen ${e.origin ?? `değer`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Çok küçük: beklenen ${e.origin} ${n}${e.minimum.toString()} ${r.unit}`
					: `Çok küçük: beklenen ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Geçersiz metin: "${t.prefix}" ile başlamalı`
					: t.format === `ends_with`
						? `Geçersiz metin: "${t.suffix}" ile bitmeli`
						: t.format === `includes`
							? `Geçersiz metin: "${t.includes}" içermeli`
							: t.format === `regex`
								? `Geçersiz metin: ${t.pattern} desenine uymalı`
								: `Geçersiz ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Geçersiz sayı: ${e.divisor} ile tam bölünebilmeli`;
			case `unrecognized_keys`:
				return `Tanınmayan anahtar${e.keys.length > 1 ? `lar` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `${e.origin} içinde geçersiz anahtar`;
			case `invalid_union`:
				return `Geçersiz değer`;
			case `invalid_element`:
				return `${e.origin} içinde geçersiz değer`;
			default:
				return `Geçersiz değer`;
		}
	};
};
function jy() {
	return { localeError: Ay() };
}
var My = () => {
	const e = {
		string: { unit: `символів`, verb: `матиме` },
		file: { unit: `байтів`, verb: `матиме` },
		array: { unit: `елементів`, verb: `матиме` },
		set: { unit: `елементів`, verb: `матиме` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `вхідні дані`,
			email: `адреса електронної пошти`,
			url: `URL`,
			emoji: `емодзі`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `дата та час ISO`,
			date: `дата ISO`,
			time: `час ISO`,
			duration: `тривалість ISO`,
			ipv4: `адреса IPv4`,
			ipv6: `адреса IPv6`,
			cidrv4: `діапазон IPv4`,
			cidrv6: `діапазон IPv6`,
			base64: `рядок у кодуванні base64`,
			base64url: `рядок у кодуванні base64url`,
			json_string: `рядок JSON`,
			e164: `номер E.164`,
			jwt: `JWT`,
			template_literal: `вхідні дані`,
		},
		r = { nan: `NaN`, number: `число`, array: `масив` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Неправильні вхідні дані: очікується instanceof ${e.expected}, отримано ${i}`
					: `Неправильні вхідні дані: очікується ${t}, отримано ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Неправильні вхідні дані: очікується ${G(e.values[0])}`
					: `Неправильна опція: очікується одне з ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Занадто велике: очікується, що ${e.origin ?? `значення`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `елементів`}`
					: `Занадто велике: очікується, що ${e.origin ?? `значення`} буде ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Занадто мале: очікується, що ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
					: `Занадто мале: очікується, що ${e.origin} буде ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Неправильний рядок: повинен починатися з "${t.prefix}"`
					: t.format === `ends_with`
						? `Неправильний рядок: повинен закінчуватися на "${t.suffix}"`
						: t.format === `includes`
							? `Неправильний рядок: повинен містити "${t.includes}"`
							: t.format === `regex`
								? `Неправильний рядок: повинен відповідати шаблону ${t.pattern}`
								: `Неправильний ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Неправильне число: повинно бути кратним ${e.divisor}`;
			case `unrecognized_keys`:
				return `Нерозпізнаний ключ${e.keys.length > 1 ? `і` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Неправильний ключ у ${e.origin}`;
			case `invalid_union`:
				return `Неправильні вхідні дані`;
			case `invalid_element`:
				return `Неправильне значення у ${e.origin}`;
			default:
				return `Неправильні вхідні дані`;
		}
	};
};
function Ny() {
	return { localeError: My() };
}
function Py() {
	return Ny();
}
var Fy = () => {
	const e = {
		string: { unit: `حروف`, verb: `ہونا` },
		file: { unit: `بائٹس`, verb: `ہونا` },
		array: { unit: `آئٹمز`, verb: `ہونا` },
		set: { unit: `آئٹمز`, verb: `ہونا` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ان پٹ`,
			email: `ای میل ایڈریس`,
			url: `یو آر ایل`,
			emoji: `ایموجی`,
			uuid: `یو یو آئی ڈی`,
			uuidv4: `یو یو آئی ڈی وی 4`,
			uuidv6: `یو یو آئی ڈی وی 6`,
			nanoid: `نینو آئی ڈی`,
			guid: `جی یو آئی ڈی`,
			cuid: `سی یو آئی ڈی`,
			cuid2: `سی یو آئی ڈی 2`,
			ulid: `یو ایل آئی ڈی`,
			xid: `ایکس آئی ڈی`,
			ksuid: `کے ایس یو آئی ڈی`,
			datetime: `آئی ایس او ڈیٹ ٹائم`,
			date: `آئی ایس او تاریخ`,
			time: `آئی ایس او وقت`,
			duration: `آئی ایس او مدت`,
			ipv4: `آئی پی وی 4 ایڈریس`,
			ipv6: `آئی پی وی 6 ایڈریس`,
			cidrv4: `آئی پی وی 4 رینج`,
			cidrv6: `آئی پی وی 6 رینج`,
			base64: `بیس 64 ان کوڈڈ سٹرنگ`,
			base64url: `بیس 64 یو آر ایل ان کوڈڈ سٹرنگ`,
			json_string: `جے ایس او این سٹرنگ`,
			e164: `ای 164 نمبر`,
			jwt: `جے ڈبلیو ٹی`,
			template_literal: `ان پٹ`,
		},
		r = { nan: `NaN`, number: `نمبر`, array: `آرے`, null: `نل` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `غلط ان پٹ: instanceof ${e.expected} متوقع تھا، ${i} موصول ہوا`
					: `غلط ان پٹ: ${t} متوقع تھا، ${i} موصول ہوا`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `غلط ان پٹ: ${G(e.values[0])} متوقع تھا`
					: `غلط آپشن: ${H(e.values, `|`)} میں سے ایک متوقع تھا`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `بہت بڑا: ${e.origin ?? `ویلیو`} کے ${n}${e.maximum.toString()} ${r.unit ?? `عناصر`} ہونے متوقع تھے`
					: `بہت بڑا: ${e.origin ?? `ویلیو`} کا ${n}${e.maximum.toString()} ہونا متوقع تھا`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `بہت چھوٹا: ${e.origin} کے ${n}${e.minimum.toString()} ${r.unit} ہونے متوقع تھے`
					: `بہت چھوٹا: ${e.origin} کا ${n}${e.minimum.toString()} ہونا متوقع تھا`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `غلط سٹرنگ: "${t.prefix}" سے شروع ہونا چاہیے`
					: t.format === `ends_with`
						? `غلط سٹرنگ: "${t.suffix}" پر ختم ہونا چاہیے`
						: t.format === `includes`
							? `غلط سٹرنگ: "${t.includes}" شامل ہونا چاہیے`
							: t.format === `regex`
								? `غلط سٹرنگ: پیٹرن ${t.pattern} سے میچ ہونا چاہیے`
								: `غلط ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `غلط نمبر: ${e.divisor} کا مضاعف ہونا چاہیے`;
			case `unrecognized_keys`:
				return `غیر تسلیم شدہ کی${e.keys.length > 1 ? `ز` : ``}: ${H(e.keys, `، `)}`;
			case `invalid_key`:
				return `${e.origin} میں غلط کی`;
			case `invalid_union`:
				return `غلط ان پٹ`;
			case `invalid_element`:
				return `${e.origin} میں غلط ویلیو`;
			default:
				return `غلط ان پٹ`;
		}
	};
};
function Iy() {
	return { localeError: Fy() };
}
var Ly = () => {
	const e = {
		string: { unit: `belgi`, verb: `bo‘lishi kerak` },
		file: { unit: `bayt`, verb: `bo‘lishi kerak` },
		array: { unit: `element`, verb: `bo‘lishi kerak` },
		set: { unit: `element`, verb: `bo‘lishi kerak` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `kirish`,
			email: `elektron pochta manzili`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO sana va vaqti`,
			date: `ISO sana`,
			time: `ISO vaqt`,
			duration: `ISO davomiylik`,
			ipv4: `IPv4 manzil`,
			ipv6: `IPv6 manzil`,
			mac: `MAC manzil`,
			cidrv4: `IPv4 diapazon`,
			cidrv6: `IPv6 diapazon`,
			base64: `base64 kodlangan satr`,
			base64url: `base64url kodlangan satr`,
			json_string: `JSON satr`,
			e164: `E.164 raqam`,
			jwt: `JWT`,
			template_literal: `kirish`,
		},
		r = { nan: `NaN`, number: `raqam`, array: `massiv` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Noto‘g‘ri kirish: kutilgan instanceof ${e.expected}, qabul qilingan ${i}`
					: `Noto‘g‘ri kirish: kutilgan ${t}, qabul qilingan ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Noto‘g‘ri kirish: kutilgan ${G(e.values[0])}`
					: `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Juda katta: kutilgan ${e.origin ?? `qiymat`} ${n}${e.maximum.toString()} ${r.unit} ${r.verb}`
					: `Juda katta: kutilgan ${e.origin ?? `qiymat`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Juda kichik: kutilgan ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ${r.verb}`
					: `Juda kichik: kutilgan ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Noto‘g‘ri satr: "${t.prefix}" bilan boshlanishi kerak`
					: t.format === `ends_with`
						? `Noto‘g‘ri satr: "${t.suffix}" bilan tugashi kerak`
						: t.format === `includes`
							? `Noto‘g‘ri satr: "${t.includes}" ni o‘z ichiga olishi kerak`
							: t.format === `regex`
								? `Noto‘g‘ri satr: ${t.pattern} shabloniga mos kelishi kerak`
								: `Noto‘g‘ri ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Noto‘g‘ri raqam: ${e.divisor} ning karralisi bo‘lishi kerak`;
			case `unrecognized_keys`:
				return `Noma’lum kalit${e.keys.length > 1 ? `lar` : ``}: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `${e.origin} dagi kalit noto‘g‘ri`;
			case `invalid_union`:
				return `Noto‘g‘ri kirish`;
			case `invalid_element`:
				return `${e.origin} da noto‘g‘ri qiymat`;
			default:
				return `Noto‘g‘ri kirish`;
		}
	};
};
function Ry() {
	return { localeError: Ly() };
}
var zy = () => {
	const e = {
		string: { unit: `ký tự`, verb: `có` },
		file: { unit: `byte`, verb: `có` },
		array: { unit: `phần tử`, verb: `có` },
		set: { unit: `phần tử`, verb: `có` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `đầu vào`,
			email: `địa chỉ email`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ngày giờ ISO`,
			date: `ngày ISO`,
			time: `giờ ISO`,
			duration: `khoảng thời gian ISO`,
			ipv4: `địa chỉ IPv4`,
			ipv6: `địa chỉ IPv6`,
			cidrv4: `dải IPv4`,
			cidrv6: `dải IPv6`,
			base64: `chuỗi mã hóa base64`,
			base64url: `chuỗi mã hóa base64url`,
			json_string: `chuỗi JSON`,
			e164: `số E.164`,
			jwt: `JWT`,
			template_literal: `đầu vào`,
		},
		r = { nan: `NaN`, number: `số`, array: `mảng` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Đầu vào không hợp lệ: mong đợi instanceof ${e.expected}, nhận được ${i}`
					: `Đầu vào không hợp lệ: mong đợi ${t}, nhận được ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Đầu vào không hợp lệ: mong đợi ${G(e.values[0])}`
					: `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Quá lớn: mong đợi ${e.origin ?? `giá trị`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `phần tử`}`
					: `Quá lớn: mong đợi ${e.origin ?? `giá trị`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Quá nhỏ: mong đợi ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
					: `Quá nhỏ: mong đợi ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Chuỗi không hợp lệ: phải bắt đầu bằng "${t.prefix}"`
					: t.format === `ends_with`
						? `Chuỗi không hợp lệ: phải kết thúc bằng "${t.suffix}"`
						: t.format === `includes`
							? `Chuỗi không hợp lệ: phải bao gồm "${t.includes}"`
							: t.format === `regex`
								? `Chuỗi không hợp lệ: phải khớp với mẫu ${t.pattern}`
								: `${n[t.format] ?? e.format} không hợp lệ`;
			}
			case `not_multiple_of`:
				return `Số không hợp lệ: phải là bội số của ${e.divisor}`;
			case `unrecognized_keys`:
				return `Khóa không được nhận dạng: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Khóa không hợp lệ trong ${e.origin}`;
			case `invalid_union`:
				return `Đầu vào không hợp lệ`;
			case `invalid_element`:
				return `Giá trị không hợp lệ trong ${e.origin}`;
			default:
				return `Đầu vào không hợp lệ`;
		}
	};
};
function By() {
	return { localeError: zy() };
}
var Vy = () => {
	const e = {
		string: { unit: `字符`, verb: `包含` },
		file: { unit: `字节`, verb: `包含` },
		array: { unit: `项`, verb: `包含` },
		set: { unit: `项`, verb: `包含` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `输入`,
			email: `电子邮件`,
			url: `URL`,
			emoji: `表情符号`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO日期时间`,
			date: `ISO日期`,
			time: `ISO时间`,
			duration: `ISO时长`,
			ipv4: `IPv4地址`,
			ipv6: `IPv6地址`,
			cidrv4: `IPv4网段`,
			cidrv6: `IPv6网段`,
			base64: `base64编码字符串`,
			base64url: `base64url编码字符串`,
			json_string: `JSON字符串`,
			e164: `E.164号码`,
			jwt: `JWT`,
			template_literal: `输入`,
		},
		r = { nan: `NaN`, number: `数字`, array: `数组`, null: `空值(null)` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `无效输入：期望 instanceof ${e.expected}，实际接收 ${i}`
					: `无效输入：期望 ${t}，实际接收 ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `无效输入：期望 ${G(e.values[0])}`
					: `无效选项：期望以下之一 ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `数值过大：期望 ${e.origin ?? `值`} ${n}${e.maximum.toString()} ${r.unit ?? `个元素`}`
					: `数值过大：期望 ${e.origin ?? `值`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `数值过小：期望 ${e.origin} ${n}${e.minimum.toString()} ${r.unit}`
					: `数值过小：期望 ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `无效字符串：必须以 "${t.prefix}" 开头`
					: t.format === `ends_with`
						? `无效字符串：必须以 "${t.suffix}" 结尾`
						: t.format === `includes`
							? `无效字符串：必须包含 "${t.includes}"`
							: t.format === `regex`
								? `无效字符串：必须满足正则表达式 ${t.pattern}`
								: `无效${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `无效数字：必须是 ${e.divisor} 的倍数`;
			case `unrecognized_keys`:
				return `出现未知的键(key): ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `${e.origin} 中的键(key)无效`;
			case `invalid_union`:
				return `无效输入`;
			case `invalid_element`:
				return `${e.origin} 中包含无效值(value)`;
			default:
				return `无效输入`;
		}
	};
};
function Hy() {
	return { localeError: Vy() };
}
var Uy = () => {
	const e = {
		string: { unit: `字元`, verb: `擁有` },
		file: { unit: `位元組`, verb: `擁有` },
		array: { unit: `項目`, verb: `擁有` },
		set: { unit: `項目`, verb: `擁有` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `輸入`,
			email: `郵件地址`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `ISO 日期時間`,
			date: `ISO 日期`,
			time: `ISO 時間`,
			duration: `ISO 期間`,
			ipv4: `IPv4 位址`,
			ipv6: `IPv6 位址`,
			cidrv4: `IPv4 範圍`,
			cidrv6: `IPv6 範圍`,
			base64: `base64 編碼字串`,
			base64url: `base64url 編碼字串`,
			json_string: `JSON 字串`,
			e164: `E.164 數值`,
			jwt: `JWT`,
			template_literal: `輸入`,
		},
		r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `無效的輸入值：預期為 instanceof ${e.expected}，但收到 ${i}`
					: `無效的輸入值：預期為 ${t}，但收到 ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `無效的輸入值：預期為 ${G(e.values[0])}`
					: `無效的選項：預期為以下其中之一 ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `數值過大：預期 ${e.origin ?? `值`} 應為 ${n}${e.maximum.toString()} ${r.unit ?? `個元素`}`
					: `數值過大：預期 ${e.origin ?? `值`} 應為 ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `數值過小：預期 ${e.origin} 應為 ${n}${e.minimum.toString()} ${r.unit}`
					: `數值過小：預期 ${e.origin} 應為 ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `無效的字串：必須以 "${t.prefix}" 開頭`
					: t.format === `ends_with`
						? `無效的字串：必須以 "${t.suffix}" 結尾`
						: t.format === `includes`
							? `無效的字串：必須包含 "${t.includes}"`
							: t.format === `regex`
								? `無效的字串：必須符合格式 ${t.pattern}`
								: `無效的 ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `無效的數字：必須為 ${e.divisor} 的倍數`;
			case `unrecognized_keys`:
				return `無法識別的鍵值${e.keys.length > 1 ? `們` : ``}：${H(e.keys, `、`)}`;
			case `invalid_key`:
				return `${e.origin} 中有無效的鍵值`;
			case `invalid_union`:
				return `無效的輸入值`;
			case `invalid_element`:
				return `${e.origin} 中有無效的值`;
			default:
				return `無效的輸入值`;
		}
	};
};
function Wy() {
	return { localeError: Uy() };
}
var Gy = () => {
	const e = {
		string: { unit: `àmi`, verb: `ní` },
		file: { unit: `bytes`, verb: `ní` },
		array: { unit: `nkan`, verb: `ní` },
		set: { unit: `nkan`, verb: `ní` },
	};
	function t(t) {
		return e[t] ?? null;
	}
	const n = {
			regex: `ẹ̀rọ ìbáwọlé`,
			email: `àdírẹ́sì ìmẹ́lì`,
			url: `URL`,
			emoji: `emoji`,
			uuid: `UUID`,
			uuidv4: `UUIDv4`,
			uuidv6: `UUIDv6`,
			nanoid: `nanoid`,
			guid: `GUID`,
			cuid: `cuid`,
			cuid2: `cuid2`,
			ulid: `ULID`,
			xid: `XID`,
			ksuid: `KSUID`,
			datetime: `àkókò ISO`,
			date: `ọjọ́ ISO`,
			time: `àkókò ISO`,
			duration: `àkókò tó pé ISO`,
			ipv4: `àdírẹ́sì IPv4`,
			ipv6: `àdírẹ́sì IPv6`,
			cidrv4: `àgbègbè IPv4`,
			cidrv6: `àgbègbè IPv6`,
			base64: `ọ̀rọ̀ tí a kọ́ ní base64`,
			base64url: `ọ̀rọ̀ base64url`,
			json_string: `ọ̀rọ̀ JSON`,
			e164: `nọ́mbà E.164`,
			jwt: `JWT`,
			template_literal: `ẹ̀rọ ìbáwọlé`,
		},
		r = { nan: `NaN`, number: `nọ́mbà`, array: `akopọ` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				const t = r[e.expected] ?? e.expected,
					n = K(e.input),
					i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected)
					? `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${e.expected}, àmọ̀ a rí ${i}`
					: `Ìbáwọlé aṣìṣe: a ní láti fi ${t}, àmọ̀ a rí ${i}`;
			}
			case `invalid_value`:
				return e.values.length === 1
					? `Ìbáwọlé aṣìṣe: a ní láti fi ${G(e.values[0])}`
					: `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${H(e.values, `|`)}`;
			case `too_big`: {
				const n = e.inclusive ? `<=` : `<`,
					r = t(e.origin);
				return r
					? `Tó pọ̀ jù: a ní láti jẹ́ pé ${e.origin ?? `iye`} ${r.verb} ${n}${e.maximum} ${r.unit}`
					: `Tó pọ̀ jù: a ní láti jẹ́ ${n}${e.maximum}`;
			}
			case `too_small`: {
				const n = e.inclusive ? `>=` : `>`,
					r = t(e.origin);
				return r
					? `Kéré ju: a ní láti jẹ́ pé ${e.origin} ${r.verb} ${n}${e.minimum} ${r.unit}`
					: `Kéré ju: a ní láti jẹ́ ${n}${e.minimum}`;
			}
			case `invalid_format`: {
				const t = e;
				return t.format === `starts_with`
					? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${t.prefix}"`
					: t.format === `ends_with`
						? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${t.suffix}"`
						: t.format === `includes`
							? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${t.includes}"`
							: t.format === `regex`
								? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${t.pattern}`
								: `Aṣìṣe: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`:
				return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${e.divisor}`;
			case `unrecognized_keys`:
				return `Bọtìnì àìmọ̀: ${H(e.keys, `, `)}`;
			case `invalid_key`:
				return `Bọtìnì aṣìṣe nínú ${e.origin}`;
			case `invalid_union`:
				return `Ìbáwọlé aṣìṣe`;
			case `invalid_element`:
				return `Iye aṣìṣe nínú ${e.origin}`;
			default:
				return `Ìbáwọlé aṣìṣe`;
		}
	};
};
function Ky() {
	return { localeError: Gy() };
}
var qy = t(
		{
			ar: () => ev,
			az: () => nv,
			be: () => av,
			bg: () => sv,
			ca: () => lv,
			cs: () => dv,
			da: () => pv,
			de: () => hv,
			en: () => _v,
			eo: () => yv,
			es: () => xv,
			fa: () => Cv,
			fi: () => Tv,
			fr: () => Dv,
			frCA: () => kv,
			he: () => jv,
			hu: () => Nv,
			hy: () => Lv,
			id: () => zv,
			is: () => Vv,
			it: () => Uv,
			ja: () => Gv,
			ka: () => qv,
			kh: () => Xv,
			km: () => Yv,
			ko: () => Qv,
			lt: () => ny,
			mk: () => iy,
			ms: () => oy,
			nl: () => cy,
			no: () => uy,
			ota: () => fy,
			pl: () => gy,
			ps: () => my,
			pt: () => vy,
			ru: () => xy,
			sl: () => Cy,
			sv: () => Ty,
			ta: () => Dy,
			th: () => ky,
			tr: () => jy,
			ua: () => Py,
			uk: () => Ny,
			ur: () => Iy,
			uz: () => Ry,
			vi: () => By,
			yo: () => Ky,
			zhCN: () => Hy,
			zhTW: () => Wy,
		},
		1,
	),
	Jy;
const Yy = Symbol(`ZodOutput`),
	Xy = Symbol(`ZodInput`);
var Zy = class {
	constructor() {
		(this._map = new WeakMap()), (this._idmap = new Map());
	}
	add(e, ...t) {
		const n = t[0];
		return this._map.set(e, n), n && typeof n == `object` && `id` in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return (this._map = new WeakMap()), (this._idmap = new Map()), this;
	}
	remove(e) {
		const t = this._map.get(e);
		return t && typeof t == `object` && `id` in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		const t = e._zod.parent;
		if (t) {
			const n = { ...(this.get(t) ?? {}) };
			delete n.id;
			const r = { ...n, ...this._map.get(e) };
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function Qy() {
	return new Zy();
}
(Jy = globalThis).__zod_globalRegistry ?? (Jy.__zod_globalRegistry = Qy());
const $y = globalThis.__zod_globalRegistry;
function eb(e, t) {
	return new e({ type: `string`, ...W(t) });
}
function tb(e, t) {
	return new e({ type: `string`, coerce: !0, ...W(t) });
}
function nb(e, t) {
	return new e({ type: `string`, format: `email`, check: `string_format`, abort: !1, ...W(t) });
}
function rb(e, t) {
	return new e({ type: `string`, format: `guid`, check: `string_format`, abort: !1, ...W(t) });
}
function ib(e, t) {
	return new e({ type: `string`, format: `uuid`, check: `string_format`, abort: !1, ...W(t) });
}
function ab(e, t) {
	return new e({ type: `string`, format: `uuid`, check: `string_format`, abort: !1, version: `v4`, ...W(t) });
}
function ob(e, t) {
	return new e({ type: `string`, format: `uuid`, check: `string_format`, abort: !1, version: `v6`, ...W(t) });
}
function sb(e, t) {
	return new e({ type: `string`, format: `uuid`, check: `string_format`, abort: !1, version: `v7`, ...W(t) });
}
function cb(e, t) {
	return new e({ type: `string`, format: `url`, check: `string_format`, abort: !1, ...W(t) });
}
function lb(e, t) {
	return new e({ type: `string`, format: `emoji`, check: `string_format`, abort: !1, ...W(t) });
}
function ub(e, t) {
	return new e({ type: `string`, format: `nanoid`, check: `string_format`, abort: !1, ...W(t) });
}
function db(e, t) {
	return new e({ type: `string`, format: `cuid`, check: `string_format`, abort: !1, ...W(t) });
}
function fb(e, t) {
	return new e({ type: `string`, format: `cuid2`, check: `string_format`, abort: !1, ...W(t) });
}
function pb(e, t) {
	return new e({ type: `string`, format: `ulid`, check: `string_format`, abort: !1, ...W(t) });
}
function mb(e, t) {
	return new e({ type: `string`, format: `xid`, check: `string_format`, abort: !1, ...W(t) });
}
function hb(e, t) {
	return new e({ type: `string`, format: `ksuid`, check: `string_format`, abort: !1, ...W(t) });
}
function gb(e, t) {
	return new e({ type: `string`, format: `ipv4`, check: `string_format`, abort: !1, ...W(t) });
}
function _b(e, t) {
	return new e({ type: `string`, format: `ipv6`, check: `string_format`, abort: !1, ...W(t) });
}
function vb(e, t) {
	return new e({ type: `string`, format: `mac`, check: `string_format`, abort: !1, ...W(t) });
}
function yb(e, t) {
	return new e({ type: `string`, format: `cidrv4`, check: `string_format`, abort: !1, ...W(t) });
}
function bb(e, t) {
	return new e({ type: `string`, format: `cidrv6`, check: `string_format`, abort: !1, ...W(t) });
}
function xb(e, t) {
	return new e({ type: `string`, format: `base64`, check: `string_format`, abort: !1, ...W(t) });
}
function Sb(e, t) {
	return new e({ type: `string`, format: `base64url`, check: `string_format`, abort: !1, ...W(t) });
}
function Cb(e, t) {
	return new e({ type: `string`, format: `e164`, check: `string_format`, abort: !1, ...W(t) });
}
function wb(e, t) {
	return new e({ type: `string`, format: `jwt`, check: `string_format`, abort: !1, ...W(t) });
}
const Tb = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
function Eb(e, t) {
	return new e({
		type: `string`,
		format: `datetime`,
		check: `string_format`,
		offset: !1,
		local: !1,
		precision: null,
		...W(t),
	});
}
function Db(e, t) {
	return new e({ type: `string`, format: `date`, check: `string_format`, ...W(t) });
}
function Ob(e, t) {
	return new e({ type: `string`, format: `time`, check: `string_format`, precision: null, ...W(t) });
}
function kb(e, t) {
	return new e({ type: `string`, format: `duration`, check: `string_format`, ...W(t) });
}
function Ab(e, t) {
	return new e({ type: `number`, checks: [], ...W(t) });
}
function jb(e, t) {
	return new e({ type: `number`, coerce: !0, checks: [], ...W(t) });
}
function Mb(e, t) {
	return new e({ type: `number`, check: `number_format`, abort: !1, format: `safeint`, ...W(t) });
}
function Nb(e, t) {
	return new e({ type: `number`, check: `number_format`, abort: !1, format: `float32`, ...W(t) });
}
function Pb(e, t) {
	return new e({ type: `number`, check: `number_format`, abort: !1, format: `float64`, ...W(t) });
}
function Fb(e, t) {
	return new e({ type: `number`, check: `number_format`, abort: !1, format: `int32`, ...W(t) });
}
function Ib(e, t) {
	return new e({ type: `number`, check: `number_format`, abort: !1, format: `uint32`, ...W(t) });
}
function Lb(e, t) {
	return new e({ type: `boolean`, ...W(t) });
}
function Rb(e, t) {
	return new e({ type: `boolean`, coerce: !0, ...W(t) });
}
function zb(e, t) {
	return new e({ type: `bigint`, ...W(t) });
}
function Bb(e, t) {
	return new e({ type: `bigint`, coerce: !0, ...W(t) });
}
function Vb(e, t) {
	return new e({ type: `bigint`, check: `bigint_format`, abort: !1, format: `int64`, ...W(t) });
}
function Hb(e, t) {
	return new e({ type: `bigint`, check: `bigint_format`, abort: !1, format: `uint64`, ...W(t) });
}
function Ub(e, t) {
	return new e({ type: `symbol`, ...W(t) });
}
function Wb(e, t) {
	return new e({ type: `undefined`, ...W(t) });
}
function Gb(e, t) {
	return new e({ type: `null`, ...W(t) });
}
function Kb(e) {
	return new e({ type: `any` });
}
function qb(e) {
	return new e({ type: `unknown` });
}
function Jb(e, t) {
	return new e({ type: `never`, ...W(t) });
}
function Yb(e, t) {
	return new e({ type: `void`, ...W(t) });
}
function Xb(e, t) {
	return new e({ type: `date`, ...W(t) });
}
function Zb(e, t) {
	return new e({ type: `date`, coerce: !0, ...W(t) });
}
function Qb(e, t) {
	return new e({ type: `nan`, ...W(t) });
}
function $b(e, t) {
	return new Wh({ check: `less_than`, ...W(t), value: e, inclusive: !1 });
}
function ex(e, t) {
	return new Wh({ check: `less_than`, ...W(t), value: e, inclusive: !0 });
}
function tx(e, t) {
	return new Gh({ check: `greater_than`, ...W(t), value: e, inclusive: !1 });
}
function nx(e, t) {
	return new Gh({ check: `greater_than`, ...W(t), value: e, inclusive: !0 });
}
function rx(e) {
	return tx(0, e);
}
function ix(e) {
	return $b(0, e);
}
function ax(e) {
	return ex(0, e);
}
function ox(e) {
	return nx(0, e);
}
function sx(e, t) {
	return new Kh({ check: `multiple_of`, ...W(t), value: e });
}
function cx(e, t) {
	return new Yh({ check: `max_size`, ...W(t), maximum: e });
}
function lx(e, t) {
	return new Xh({ check: `min_size`, ...W(t), minimum: e });
}
function ux(e, t) {
	return new Zh({ check: `size_equals`, ...W(t), size: e });
}
function dx(e, t) {
	return new Qh({ check: `max_length`, ...W(t), maximum: e });
}
function fx(e, t) {
	return new $h({ check: `min_length`, ...W(t), minimum: e });
}
function px(e, t) {
	return new eg({ check: `length_equals`, ...W(t), length: e });
}
function mx(e, t) {
	return new ng({ check: `string_format`, format: `regex`, ...W(t), pattern: e });
}
function hx(e) {
	return new rg({ check: `string_format`, format: `lowercase`, ...W(e) });
}
function gx(e) {
	return new ig({ check: `string_format`, format: `uppercase`, ...W(e) });
}
function _x(e, t) {
	return new ag({ check: `string_format`, format: `includes`, ...W(t), includes: e });
}
function vx(e, t) {
	return new og({ check: `string_format`, format: `starts_with`, ...W(t), prefix: e });
}
function yx(e, t) {
	return new sg({ check: `string_format`, format: `ends_with`, ...W(t), suffix: e });
}
function bx(e, t, n) {
	return new lg({ check: `property`, property: e, schema: t, ...W(n) });
}
function xx(e, t) {
	return new ug({ check: `mime_type`, mime: e, ...W(t) });
}
function Sx(e) {
	return new dg({ check: `overwrite`, tx: e });
}
function Cx(e) {
	return Sx((t) => t.normalize(e));
}
function wx() {
	return Sx((e) => e.trim());
}
function Tx() {
	return Sx((e) => e.toLowerCase());
}
function Ex() {
	return Sx((e) => e.toUpperCase());
}
function Dx() {
	return Sx((e) => _p(e));
}
function Ox(e, t, n) {
	return new e({ type: `array`, element: t, ...W(n) });
}
function kx(e, t, n) {
	return new e({ type: `union`, options: t, ...W(n) });
}
function Ax(e, t, n) {
	return new e({ type: `union`, options: t, inclusive: !1, ...W(n) });
}
function jx(e, t, n, r) {
	return new e({ type: `union`, options: n, discriminator: t, ...W(r) });
}
function Mx(e, t, n) {
	return new e({ type: `intersection`, left: t, right: n });
}
function Nx(e, t, n, r) {
	const i = n instanceof J;
	return new e({ type: `tuple`, items: t, rest: i ? n : null, ...W(i ? r : n) });
}
function Px(e, t, n, r) {
	return new e({ type: `record`, keyType: t, valueType: n, ...W(r) });
}
function Fx(e, t, n, r) {
	return new e({ type: `map`, keyType: t, valueType: n, ...W(r) });
}
function Ix(e, t, n) {
	return new e({ type: `set`, valueType: t, ...W(n) });
}
function Lx(e, t, n) {
	return new e({ type: `enum`, entries: Array.isArray(t) ? Object.fromEntries(t.map((e) => [e, e])) : t, ...W(n) });
}
function Rx(e, t, n) {
	return new e({ type: `enum`, entries: t, ...W(n) });
}
function zx(e, t, n) {
	return new e({ type: `literal`, values: Array.isArray(t) ? t : [t], ...W(n) });
}
function Bx(e, t) {
	return new e({ type: `file`, ...W(t) });
}
function Vx(e, t) {
	return new e({ type: `transform`, transform: t });
}
function Hx(e, t) {
	return new e({ type: `optional`, innerType: t });
}
function Ux(e, t) {
	return new e({ type: `nullable`, innerType: t });
}
function Wx(e, t, n) {
	return new e({
		type: `default`,
		innerType: t,
		get defaultValue() {
			return typeof n == `function` ? n() : Sp(n);
		},
	});
}
function Gx(e, t, n) {
	return new e({ type: `nonoptional`, innerType: t, ...W(n) });
}
function Kx(e, t) {
	return new e({ type: `success`, innerType: t });
}
function qx(e, t, n) {
	return new e({ type: `catch`, innerType: t, catchValue: typeof n == `function` ? n : () => n });
}
function Jx(e, t, n) {
	return new e({ type: `pipe`, in: t, out: n });
}
function Yx(e, t) {
	return new e({ type: `readonly`, innerType: t });
}
function Xx(e, t, n) {
	return new e({ type: `template_literal`, parts: t, ...W(n) });
}
function Zx(e, t) {
	return new e({ type: `lazy`, getter: t });
}
function Qx(e, t) {
	return new e({ type: `promise`, innerType: t });
}
function $x(e, t, n) {
	const r = W(n);
	return (r.abort ??= !0), new e({ type: `custom`, check: `custom`, fn: t, ...r });
}
function eS(e, t, n) {
	return new e({ type: `custom`, check: `custom`, fn: t, ...W(n) });
}
function tS(e) {
	const t = nS(
		(n) => (
			(n.addIssue = (e) => {
				if (typeof e == `string`) n.issues.push(Kp(e, n.value, t._zod.def));
				else {
					const r = e;
					r.fatal && (r.continue = !1),
						(r.code ??= `custom`),
						(r.input ??= n.value),
						(r.inst ??= t),
						(r.continue ??= !t._zod.def.abort),
						n.issues.push(Kp(r));
				}
			}),
			e(n.value, n)
		),
	);
	return t;
}
function nS(e, t) {
	const n = new q({ check: `custom`, ...W(t) });
	return (n._zod.check = e), n;
}
function rS(e) {
	const t = new q({ check: `describe` });
	return (
		(t._zod.onattach = [
			(t) => {
				const n = $y.get(t) ?? {};
				$y.add(t, { ...n, description: e });
			},
		]),
		(t._zod.check = () => {}),
		t
	);
}
function iS(e) {
	const t = new q({ check: `meta` });
	return (
		(t._zod.onattach = [
			(t) => {
				const n = $y.get(t) ?? {};
				$y.add(t, { ...n, ...e });
			},
		]),
		(t._zod.check = () => {}),
		t
	);
}
function aS(e, t) {
	let n = W(t),
		r = n.truthy ?? [`true`, `1`, `yes`, `on`, `y`, `enabled`],
		i = n.falsy ?? [`false`, `0`, `no`, `off`, `n`, `disabled`];
	n.case !== `sensitive` &&
		((r = r.map((e) => (typeof e == `string` ? e.toLowerCase() : e))),
		(i = i.map((e) => (typeof e == `string` ? e.toLowerCase() : e))));
	const a = new Set(r),
		o = new Set(i),
		s = e.Codec ?? H_,
		c = e.Boolean ?? Gg,
		l = new s({
			type: `pipe`,
			in: new (e.String ?? mg)({ type: `string`, error: n.error }),
			out: new c({ type: `boolean`, error: n.error }),
			transform: (e, t) => {
				let r = e;
				return (
					n.case !== `sensitive` && (r = r.toLowerCase()),
					a.has(r)
						? !0
						: o.has(r)
							? !1
							: (t.issues.push({
									code: `invalid_value`,
									expected: `stringbool`,
									values: [...a, ...o],
									input: t.value,
									inst: l,
									continue: !1,
								}),
								{})
				);
			},
			reverseTransform: (e, t) => (e === !0 ? r[0] || `true` : i[0] || `false`),
			error: n.error,
		});
	return l;
}
function oS(e, t, n, r = {}) {
	const i = W(r),
		a = {
			...W(r),
			check: `string_format`,
			type: `string`,
			format: t,
			fn: typeof n == `function` ? n : (e) => n.test(e),
			...i,
		};
	return n instanceof RegExp && (a.pattern = n), new e(a);
}
function sS(e) {
	let t = e?.target ?? `draft-2020-12`;
	return (
		t === `draft-4` && (t = `draft-04`),
		t === `draft-7` && (t = `draft-07`),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? $y,
			target: t,
			unrepresentable: e?.unrepresentable ?? `throw`,
			override: e?.override ?? (() => {}),
			io: e?.io ?? `output`,
			counter: 0,
			seen: new Map(),
			cycles: e?.cycles ?? `ref`,
			reused: e?.reused ?? `inline`,
			external: e?.external ?? void 0,
		}
	);
}
function X(e, t, n = { path: [], schemaPath: [] }) {
	var r;
	const i = e._zod.def,
		a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	const o = { schema: {}, count: 1, cycle: void 0, path: n.path };
	t.seen.set(e, o);
	const s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		const r = { ...n, schemaPath: [...n.schemaPath, e], path: n.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			const n = o.schema,
				a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		const a = e._zod.parent;
		a && ((o.ref ||= a), X(a, t, r), (t.seen.get(a).isParent = !0));
	}
	const c = t.metadataRegistry.get(e);
	return (
		c && Object.assign(o.schema, c),
		t.io === `input` && uS(e) && (delete o.schema.examples, delete o.schema.default),
		t.io === `input` && o.schema._prefault && ((r = o.schema).default ?? (r.default = o.schema._prefault)),
		delete o.schema._prefault,
		t.seen.get(e).schema
	);
}
function cS(e, t) {
	const n = e.seen.get(t);
	if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
	const r = new Map();
	for (const t of e.seen.entries()) {
		const n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			const e = r.get(n);
			if (e && e !== t[0])
				throw Error(
					`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
				);
			r.set(n, t[0]);
		}
	}
	const i = (t) => {
			const r = e.target === `draft-2020-12` ? `$defs` : `definitions`;
			if (e.external) {
				const n = e.external.registry.get(t[0])?.id,
					i = e.external.uri ?? ((e) => e);
				if (n) return { ref: i(n) };
				const a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
				return (t[1].defId = a), { defId: a, ref: `${i(`__shared`)}#/${r}/${a}` };
			}
			if (t[1] === n) return { ref: `#` };
			const i = `#/${r}/`,
				a = t[1].schema.id ?? `__schema${e.counter++}`;
			return { defId: a, ref: i + a };
		},
		a = (e) => {
			if (e[1].schema.$ref) return;
			const t = e[1],
				{ ref: n, defId: r } = i(e);
			(t.def = { ...t.schema }), r && (t.defId = r);
			const a = t.schema;
			for (const e in a) delete a[e];
			a.$ref = n;
		};
	if (e.cycles === `throw`)
		for (const t of e.seen.entries()) {
			const e = t[1];
			if (e.cycle)
				throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
	for (const n of e.seen.entries()) {
		const r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			const r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === `ref`) {
			a(n);
		}
	}
}
function lS(e, t) {
	const n = e.seen.get(t);
	if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
	const r = (t) => {
		const n = e.seen.get(t);
		if (n.ref === null) return;
		const i = n.def ?? n.schema,
			a = { ...i },
			o = n.ref;
		if (((n.ref = null), o)) {
			r(o);
			const n = e.seen.get(o),
				s = n.schema;
			if (
				(s.$ref && (e.target === `draft-07` || e.target === `draft-04` || e.target === `openapi-3.0`)
					? ((i.allOf = i.allOf ?? []), i.allOf.push(s))
					: Object.assign(i, s),
				Object.assign(i, a),
				t._zod.parent === o)
			)
				for (const e in i) e === `$ref` || e === `allOf` || e in a || delete i[e];
			if (s.$ref && n.def)
				for (const e in i)
					e === `$ref` ||
						e === `allOf` ||
						(e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e]);
		}
		const s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			const t = e.seen.get(s);
			if (t?.schema.$ref && ((i.$ref = t.schema.$ref), t.def))
				for (const e in i)
					e === `$ref` ||
						e === `allOf` ||
						(e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e]);
		}
		e.override({ zodSchema: t, jsonSchema: i, path: n.path ?? [] });
	};
	for (const t of [...e.seen.entries()].reverse()) r(t[0]);
	const i = {};
	if (
		(e.target === `draft-2020-12`
			? (i.$schema = `https://json-schema.org/draft/2020-12/schema`)
			: e.target === `draft-07`
				? (i.$schema = `http://json-schema.org/draft-07/schema#`)
				: e.target === `draft-04`
					? (i.$schema = `http://json-schema.org/draft-04/schema#`)
					: e.target,
		e.external?.uri)
	) {
		const n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	const a = e.external?.defs ?? {};
	for (const t of e.seen.entries()) {
		const e = t[1];
		e.def && e.defId && (a[e.defId] = e.def);
	}
	e.external || (Object.keys(a).length > 0 && (e.target === `draft-2020-12` ? (i.$defs = a) : (i.definitions = a)));
	try {
		const n = JSON.parse(JSON.stringify(i));
		return (
			Object.defineProperty(n, `~standard`, {
				value: {
					...t[`~standard`],
					jsonSchema: { input: fS(t, `input`, e.processors), output: fS(t, `output`, e.processors) },
				},
				enumerable: !1,
				writable: !1,
			}),
			n
		);
	} catch {
		throw Error(`Error converting schema to JSON.`);
	}
}
function uS(e, t) {
	const n = t ?? { seen: new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	const r = e._zod.def;
	if (r.type === `transform`) return !0;
	if (r.type === `array`) return uS(r.element, n);
	if (r.type === `set`) return uS(r.valueType, n);
	if (r.type === `lazy`) return uS(r.getter(), n);
	if (
		r.type === `promise` ||
		r.type === `optional` ||
		r.type === `nonoptional` ||
		r.type === `nullable` ||
		r.type === `readonly` ||
		r.type === `default` ||
		r.type === `prefault`
	)
		return uS(r.innerType, n);
	if (r.type === `intersection`) return uS(r.left, n) || uS(r.right, n);
	if (r.type === `record` || r.type === `map`) return uS(r.keyType, n) || uS(r.valueType, n);
	if (r.type === `pipe`) return uS(r.in, n) || uS(r.out, n);
	if (r.type === `object`) {
		for (const e in r.shape) if (uS(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === `union`) {
		for (const e of r.options) if (uS(e, n)) return !0;
		return !1;
	}
	if (r.type === `tuple`) {
		for (const e of r.items) if (uS(e, n)) return !0;
		return !!(r.rest && uS(r.rest, n));
	}
	return !1;
}
const dS =
		(e, t = {}) =>
		(n) => {
			const r = sS({ ...n, processors: t });
			return X(e, r), cS(r, e), lS(r, e);
		},
	fS =
		(e, t, n = {}) =>
		(r) => {
			const { libraryOptions: i, target: a } = r ?? {},
				o = sS({ ...(i ?? {}), target: a, io: t, processors: n });
			return X(e, o), cS(o, e), lS(o, e);
		};
var pS = { guid: `uuid`, url: `uri`, datetime: `date-time`, json_string: `json-string`, regex: `` };
const mS = (e, t, n, r) => {
		const i = n;
		i.type = `string`;
		const { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
		if (
			(typeof a == `number` && (i.minLength = a),
			typeof o == `number` && (i.maxLength = o),
			s && ((i.format = pS[s] ?? s), i.format === `` && delete i.format, s === `time` && delete i.format),
			l && (i.contentEncoding = l),
			c && c.size > 0)
		) {
			const e = [...c];
			e.length === 1
				? (i.pattern = e[0].source)
				: e.length > 1 &&
					(i.allOf = [
						...e.map((e) => ({
							...(t.target === `draft-07` || t.target === `draft-04` || t.target === `openapi-3.0`
								? { type: `string` }
								: {}),
							pattern: e.source,
						})),
					]);
		}
	},
	hS = (e, t, n, r) => {
		const i = n,
			{ minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
		typeof s == `string` && s.includes(`int`) ? (i.type = `integer`) : (i.type = `number`),
			typeof u == `number` &&
				(t.target === `draft-04` || t.target === `openapi-3.0`
					? ((i.minimum = u), (i.exclusiveMinimum = !0))
					: (i.exclusiveMinimum = u)),
			typeof a == `number` &&
				((i.minimum = a),
				typeof u == `number` && t.target !== `draft-04` && (u >= a ? delete i.minimum : delete i.exclusiveMinimum)),
			typeof l == `number` &&
				(t.target === `draft-04` || t.target === `openapi-3.0`
					? ((i.maximum = l), (i.exclusiveMaximum = !0))
					: (i.exclusiveMaximum = l)),
			typeof o == `number` &&
				((i.maximum = o),
				typeof l == `number` && t.target !== `draft-04` && (l <= o ? delete i.maximum : delete i.exclusiveMaximum)),
			typeof c == `number` && (i.multipleOf = c);
	},
	gS = (e, t, n, r) => {
		n.type = `boolean`;
	},
	_S = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`BigInt cannot be represented in JSON Schema`);
	},
	vS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Symbols cannot be represented in JSON Schema`);
	},
	yS = (e, t, n, r) => {
		t.target === `openapi-3.0` ? ((n.type = `string`), (n.nullable = !0), (n.enum = [null])) : (n.type = `null`);
	},
	bS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Undefined cannot be represented in JSON Schema`);
	},
	xS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Void cannot be represented in JSON Schema`);
	},
	SS = (e, t, n, r) => {
		n.not = {};
	},
	CS = (e, t, n, r) => {},
	wS = (e, t, n, r) => {},
	TS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Date cannot be represented in JSON Schema`);
	},
	ES = (e, t, n, r) => {
		const i = e._zod.def,
			a = np(i.entries);
		a.every((e) => typeof e == `number`) && (n.type = `number`),
			a.every((e) => typeof e == `string`) && (n.type = `string`),
			(n.enum = a);
	},
	DS = (e, t, n, r) => {
		const i = e._zod.def,
			a = [];
		for (const e of i.values)
			if (e === void 0) {
				if (t.unrepresentable === `throw`) throw Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof e == `bigint`) {
				if (t.unrepresentable === `throw`) throw Error(`BigInt literals cannot be represented in JSON Schema`);
				a.push(Number(e));
			} else a.push(e);
		if (a.length !== 0)
			if (a.length === 1) {
				const e = a[0];
				(n.type = e === null ? `null` : typeof e),
					t.target === `draft-04` || t.target === `openapi-3.0` ? (n.enum = [e]) : (n.const = e);
			} else
				a.every((e) => typeof e == `number`) && (n.type = `number`),
					a.every((e) => typeof e == `string`) && (n.type = `string`),
					a.every((e) => typeof e == `boolean`) && (n.type = `boolean`),
					a.every((e) => e === null) && (n.type = `null`),
					(n.enum = a);
	},
	OS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`NaN cannot be represented in JSON Schema`);
	},
	kS = (e, t, n, r) => {
		const i = n,
			a = e._zod.pattern;
		if (!a) throw Error(`Pattern not found in template literal`);
		(i.type = `string`), (i.pattern = a.source);
	},
	AS = (e, t, n, r) => {
		const i = n,
			a = { type: `string`, format: `binary`, contentEncoding: `binary` },
			{ minimum: o, maximum: s, mime: c } = e._zod.bag;
		o !== void 0 && (a.minLength = o),
			s !== void 0 && (a.maxLength = s),
			c
				? c.length === 1
					? ((a.contentMediaType = c[0]), Object.assign(i, a))
					: (Object.assign(i, a), (i.anyOf = c.map((e) => ({ contentMediaType: e }))))
				: Object.assign(i, a);
	},
	jS = (e, t, n, r) => {
		n.type = `boolean`;
	},
	MS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Custom types cannot be represented in JSON Schema`);
	},
	NS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Function types cannot be represented in JSON Schema`);
	},
	PS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Transforms cannot be represented in JSON Schema`);
	},
	FS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Map cannot be represented in JSON Schema`);
	},
	IS = (e, t, n, r) => {
		if (t.unrepresentable === `throw`) throw Error(`Set cannot be represented in JSON Schema`);
	},
	LS = (e, t, n, r) => {
		const i = n,
			a = e._zod.def,
			{ minimum: o, maximum: s } = e._zod.bag;
		typeof o == `number` && (i.minItems = o),
			typeof s == `number` && (i.maxItems = s),
			(i.type = `array`),
			(i.items = X(a.element, t, { ...r, path: [...r.path, `items`] }));
	},
	RS = (e, t, n, r) => {
		const i = n,
			a = e._zod.def;
		(i.type = `object`), (i.properties = {});
		const o = a.shape;
		for (const e in o) i.properties[e] = X(o[e], t, { ...r, path: [...r.path, `properties`, e] });
		const s = new Set(Object.keys(o)),
			c = new Set(
				[...s].filter((e) => {
					const n = a.shape[e]._zod;
					return t.io === `input` ? n.optin === void 0 : n.optout === void 0;
				}),
			);
		c.size > 0 && (i.required = Array.from(c)),
			a.catchall?._zod.def.type === `never`
				? (i.additionalProperties = !1)
				: a.catchall
					? a.catchall &&
						(i.additionalProperties = X(a.catchall, t, { ...r, path: [...r.path, `additionalProperties`] }))
					: t.io === `output` && (i.additionalProperties = !1);
	},
	zS = (e, t, n, r) => {
		const i = e._zod.def,
			a = i.inclusive === !1,
			o = i.options.map((e, n) => X(e, t, { ...r, path: [...r.path, a ? `oneOf` : `anyOf`, n] }));
		a ? (n.oneOf = o) : (n.anyOf = o);
	},
	BS = (e, t, n, r) => {
		const i = e._zod.def,
			a = X(i.left, t, { ...r, path: [...r.path, `allOf`, 0] }),
			o = X(i.right, t, { ...r, path: [...r.path, `allOf`, 1] }),
			s = (e) => `allOf` in e && Object.keys(e).length === 1;
		n.allOf = [...(s(a) ? a.allOf : [a]), ...(s(o) ? o.allOf : [o])];
	},
	VS = (e, t, n, r) => {
		const i = n,
			a = e._zod.def;
		i.type = `array`;
		const o = t.target === `draft-2020-12` ? `prefixItems` : `items`,
			s = t.target === `draft-2020-12` || t.target === `openapi-3.0` ? `items` : `additionalItems`,
			c = a.items.map((e, n) => X(e, t, { ...r, path: [...r.path, o, n] })),
			l = a.rest
				? X(a.rest, t, { ...r, path: [...r.path, s, ...(t.target === `openapi-3.0` ? [a.items.length] : [])] })
				: null;
		t.target === `draft-2020-12`
			? ((i.prefixItems = c), l && (i.items = l))
			: t.target === `openapi-3.0`
				? ((i.items = { anyOf: c }), l && i.items.anyOf.push(l), (i.minItems = c.length), l || (i.maxItems = c.length))
				: ((i.items = c), l && (i.additionalItems = l));
		const { minimum: u, maximum: d } = e._zod.bag;
		typeof u == `number` && (i.minItems = u), typeof d == `number` && (i.maxItems = d);
	},
	HS = (e, t, n, r) => {
		const i = n,
			a = e._zod.def;
		i.type = `object`;
		const o = a.keyType,
			s = o._zod.bag?.patterns;
		if (a.mode === `loose` && s && s.size > 0) {
			const e = X(a.valueType, t, { ...r, path: [...r.path, `patternProperties`, `*`] });
			i.patternProperties = {};
			for (const t of s) i.patternProperties[t.source] = e;
		} else
			(t.target === `draft-07` || t.target === `draft-2020-12`) &&
				(i.propertyNames = X(a.keyType, t, { ...r, path: [...r.path, `propertyNames`] })),
				(i.additionalProperties = X(a.valueType, t, { ...r, path: [...r.path, `additionalProperties`] }));
		const c = o._zod.values;
		if (c) {
			const e = [...c].filter((e) => typeof e == `string` || typeof e == `number`);
			e.length > 0 && (i.required = e);
		}
	},
	US = (e, t, n, r) => {
		const i = e._zod.def,
			a = X(i.innerType, t, r),
			o = t.seen.get(e);
		t.target === `openapi-3.0` ? ((o.ref = i.innerType), (n.nullable = !0)) : (n.anyOf = [a, { type: `null` }]);
	},
	WS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		a.ref = i.innerType;
	},
	GS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		(a.ref = i.innerType), (n.default = JSON.parse(JSON.stringify(i.defaultValue)));
	},
	KS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		(a.ref = i.innerType), t.io === `input` && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
	},
	qS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			throw Error(`Dynamic catch values are not supported in JSON Schema`);
		}
		n.default = o;
	},
	JS = (e, t, n, r) => {
		const i = e._zod.def,
			a = t.io === `input` ? (i.in._zod.def.type === `transform` ? i.out : i.in) : i.out;
		X(a, t, r);
		const o = t.seen.get(e);
		o.ref = a;
	},
	YS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		(a.ref = i.innerType), (n.readOnly = !0);
	},
	XS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		a.ref = i.innerType;
	},
	ZS = (e, t, n, r) => {
		const i = e._zod.def;
		X(i.innerType, t, r);
		const a = t.seen.get(e);
		a.ref = i.innerType;
	},
	QS = (e, t, n, r) => {
		const i = e._zod.innerType;
		X(i, t, r);
		const a = t.seen.get(e);
		a.ref = i;
	},
	$S = {
		string: mS,
		number: hS,
		boolean: gS,
		bigint: _S,
		symbol: vS,
		null: yS,
		undefined: bS,
		void: xS,
		never: SS,
		any: CS,
		unknown: wS,
		date: TS,
		enum: ES,
		literal: DS,
		nan: OS,
		template_literal: kS,
		file: AS,
		success: jS,
		custom: MS,
		function: NS,
		transform: PS,
		map: FS,
		set: IS,
		array: LS,
		object: RS,
		union: zS,
		intersection: BS,
		tuple: VS,
		record: HS,
		nullable: US,
		nonoptional: WS,
		default: GS,
		prefault: KS,
		catch: qS,
		pipe: JS,
		readonly: YS,
		promise: XS,
		optional: ZS,
		lazy: QS,
	};
function eC(e, t) {
	if (`_idmap` in e) {
		const n = e,
			r = sS({ ...t, processors: $S }),
			i = {};
		for (const e of n._idmap.entries()) {
			const [t, n] = e;
			X(n, r);
		}
		const a = {};
		r.external = { registry: n, uri: t?.uri, defs: i };
		for (const e of n._idmap.entries()) {
			const [t, n] = e;
			cS(r, n), (a[t] = lS(r, n));
		}
		return (
			Object.keys(i).length > 0 && (a.__shared = { [r.target === `draft-2020-12` ? `$defs` : `definitions`]: i }),
			{ schemas: a }
		);
	}
	const n = sS({ ...t, processors: $S });
	return X(e, n), cS(n, e), lS(n, e);
}
var tC = class {
		get metadataRegistry() {
			return this.ctx.metadataRegistry;
		}
		get target() {
			return this.ctx.target;
		}
		get unrepresentable() {
			return this.ctx.unrepresentable;
		}
		get override() {
			return this.ctx.override;
		}
		get io() {
			return this.ctx.io;
		}
		get counter() {
			return this.ctx.counter;
		}
		set counter(e) {
			this.ctx.counter = e;
		}
		get seen() {
			return this.ctx.seen;
		}
		constructor(e) {
			let t = e?.target ?? `draft-2020-12`;
			t === `draft-4` && (t = `draft-04`),
				t === `draft-7` && (t = `draft-07`),
				(this.ctx = sS({
					processors: $S,
					target: t,
					...(e?.metadata && { metadata: e.metadata }),
					...(e?.unrepresentable && { unrepresentable: e.unrepresentable }),
					...(e?.override && { override: e.override }),
					...(e?.io && { io: e.io }),
				}));
		}
		process(e, t = { path: [], schemaPath: [] }) {
			return X(e, this.ctx, t);
		}
		emit(e, t) {
			t &&
				(t.cycles && (this.ctx.cycles = t.cycles),
				t.reused && (this.ctx.reused = t.reused),
				t.external && (this.ctx.external = t.external)),
				cS(this.ctx, e);
			const { "~standard": n, ...r } = lS(this.ctx, e);
			return r;
		}
	},
	nC = {},
	rC = t(
		{
			$ZodAny: () => Zg,
			$ZodArray: () => r_,
			$ZodAsyncError: () => Kf,
			$ZodBase64: () => Ig,
			$ZodBase64URL: () => Rg,
			$ZodBigInt: () => Kg,
			$ZodBigIntFormat: () => qg,
			$ZodBoolean: () => Gg,
			$ZodCIDRv4: () => Ng,
			$ZodCIDRv6: () => Pg,
			$ZodCUID: () => xg,
			$ZodCUID2: () => Sg,
			$ZodCatch: () => R_,
			$ZodCheck: () => q,
			$ZodCheckBigIntFormat: () => Jh,
			$ZodCheckEndsWith: () => sg,
			$ZodCheckGreaterThan: () => Gh,
			$ZodCheckIncludes: () => ag,
			$ZodCheckLengthEquals: () => eg,
			$ZodCheckLessThan: () => Wh,
			$ZodCheckLowerCase: () => rg,
			$ZodCheckMaxLength: () => Qh,
			$ZodCheckMaxSize: () => Yh,
			$ZodCheckMimeType: () => ug,
			$ZodCheckMinLength: () => $h,
			$ZodCheckMinSize: () => Xh,
			$ZodCheckMultipleOf: () => Kh,
			$ZodCheckNumberFormat: () => qh,
			$ZodCheckOverwrite: () => dg,
			$ZodCheckProperty: () => lg,
			$ZodCheckRegex: () => ng,
			$ZodCheckSizeEquals: () => Zh,
			$ZodCheckStartsWith: () => og,
			$ZodCheckStringFormat: () => tg,
			$ZodCheckUpperCase: () => ig,
			$ZodCodec: () => H_,
			$ZodCustom: () => Z_,
			$ZodCustomStringFormat: () => Hg,
			$ZodDate: () => t_,
			$ZodDefault: () => M_,
			$ZodDiscriminatedUnion: () => p_,
			$ZodE164: () => zg,
			$ZodEmail: () => _g,
			$ZodEmoji: () => yg,
			$ZodEncodeError: () => qf,
			$ZodEnum: () => w_,
			$ZodError: () => nm,
			$ZodExactOptional: () => A_,
			$ZodFile: () => E_,
			$ZodFunction: () => J_,
			$ZodGUID: () => hg,
			$ZodIPv4: () => Ag,
			$ZodIPv6: () => jg,
			$ZodISODate: () => Dg,
			$ZodISODateTime: () => Eg,
			$ZodISODuration: () => kg,
			$ZodISOTime: () => Og,
			$ZodIntersection: () => m_,
			$ZodJWT: () => Vg,
			$ZodKSUID: () => Tg,
			$ZodLazy: () => X_,
			$ZodLiteral: () => T_,
			$ZodMAC: () => Mg,
			$ZodMap: () => b_,
			$ZodNaN: () => z_,
			$ZodNanoID: () => bg,
			$ZodNever: () => $g,
			$ZodNonOptional: () => F_,
			$ZodNull: () => Xg,
			$ZodNullable: () => j_,
			$ZodNumber: () => Ug,
			$ZodNumberFormat: () => Wg,
			$ZodObject: () => s_,
			$ZodObjectJIT: () => c_,
			$ZodOptional: () => k_,
			$ZodPipe: () => B_,
			$ZodPrefault: () => P_,
			$ZodPromise: () => Y_,
			$ZodReadonly: () => G_,
			$ZodRealError: () => rm,
			$ZodRecord: () => y_,
			$ZodRegistry: () => Zy,
			$ZodSet: () => S_,
			$ZodString: () => mg,
			$ZodStringFormat: () => Y,
			$ZodSuccess: () => L_,
			$ZodSymbol: () => Jg,
			$ZodTemplateLiteral: () => q_,
			$ZodTransform: () => D_,
			$ZodTuple: () => __,
			$ZodType: () => J,
			$ZodULID: () => Cg,
			$ZodURL: () => vg,
			$ZodUUID: () => gg,
			$ZodUndefined: () => Yg,
			$ZodUnion: () => u_,
			$ZodUnknown: () => Qg,
			$ZodVoid: () => e_,
			$ZodXID: () => wg,
			$ZodXor: () => f_,
			$brand: () => Gf,
			$constructor: () => V,
			$input: () => Xy,
			$output: () => Yy,
			Doc: () => fg,
			JSONSchema: () => nC,
			JSONSchemaGenerator: () => tC,
			NEVER: () => Wf,
			TimePrecision: () => Tb,
			_any: () => Kb,
			_array: () => Ox,
			_base64: () => xb,
			_base64url: () => Sb,
			_bigint: () => zb,
			_boolean: () => Lb,
			_catch: () => qx,
			_check: () => nS,
			_cidrv4: () => yb,
			_cidrv6: () => bb,
			_coercedBigint: () => Bb,
			_coercedBoolean: () => Rb,
			_coercedDate: () => Zb,
			_coercedNumber: () => jb,
			_coercedString: () => tb,
			_cuid: () => db,
			_cuid2: () => fb,
			_custom: () => $x,
			_date: () => Xb,
			_decode: () => ym,
			_decodeAsync: () => Cm,
			_default: () => Wx,
			_discriminatedUnion: () => jx,
			_e164: () => Cb,
			_email: () => nb,
			_emoji: () => lb,
			_encode: () => _m,
			_encodeAsync: () => xm,
			_endsWith: () => yx,
			_enum: () => Lx,
			_file: () => Bx,
			_float32: () => Nb,
			_float64: () => Pb,
			_gt: () => tx,
			_gte: () => nx,
			_guid: () => rb,
			_includes: () => _x,
			_int: () => Mb,
			_int32: () => Fb,
			_int64: () => Vb,
			_intersection: () => Mx,
			_ipv4: () => gb,
			_ipv6: () => _b,
			_isoDate: () => Db,
			_isoDateTime: () => Eb,
			_isoDuration: () => kb,
			_isoTime: () => Ob,
			_jwt: () => wb,
			_ksuid: () => hb,
			_lazy: () => Zx,
			_length: () => px,
			_literal: () => zx,
			_lowercase: () => hx,
			_lt: () => $b,
			_lte: () => ex,
			_mac: () => vb,
			_map: () => Fx,
			_max: () => ex,
			_maxLength: () => dx,
			_maxSize: () => cx,
			_mime: () => xx,
			_min: () => nx,
			_minLength: () => fx,
			_minSize: () => lx,
			_multipleOf: () => sx,
			_nan: () => Qb,
			_nanoid: () => ub,
			_nativeEnum: () => Rx,
			_negative: () => ix,
			_never: () => Jb,
			_nonnegative: () => ox,
			_nonoptional: () => Gx,
			_nonpositive: () => ax,
			_normalize: () => Cx,
			_null: () => Gb,
			_nullable: () => Ux,
			_number: () => Ab,
			_optional: () => Hx,
			_overwrite: () => Sx,
			_parse: () => lm,
			_parseAsync: () => dm,
			_pipe: () => Jx,
			_positive: () => rx,
			_promise: () => Qx,
			_property: () => bx,
			_readonly: () => Yx,
			_record: () => Px,
			_refine: () => eS,
			_regex: () => mx,
			_safeDecode: () => Dm,
			_safeDecodeAsync: () => jm,
			_safeEncode: () => Tm,
			_safeEncodeAsync: () => km,
			_safeParse: () => pm,
			_safeParseAsync: () => hm,
			_set: () => Ix,
			_size: () => ux,
			_slugify: () => Dx,
			_startsWith: () => vx,
			_string: () => eb,
			_stringFormat: () => oS,
			_stringbool: () => aS,
			_success: () => Kx,
			_superRefine: () => tS,
			_symbol: () => Ub,
			_templateLiteral: () => Xx,
			_toLowerCase: () => Tx,
			_toUpperCase: () => Ex,
			_transform: () => Vx,
			_trim: () => wx,
			_tuple: () => Nx,
			_uint32: () => Ib,
			_uint64: () => Hb,
			_ulid: () => pb,
			_undefined: () => Wb,
			_union: () => kx,
			_unknown: () => qb,
			_uppercase: () => gx,
			_url: () => cb,
			_uuid: () => ib,
			_uuidv4: () => ab,
			_uuidv6: () => ob,
			_uuidv7: () => sb,
			_void: () => Yb,
			_xid: () => mb,
			_xor: () => Ax,
			clone: () => Op,
			config: () => Yf,
			createStandardJSONSchemaMethod: () => fS,
			createToJSONSchemaMethod: () => dS,
			decode: () => bm,
			decodeAsync: () => wm,
			describe: () => rS,
			encode: () => vm,
			encodeAsync: () => Sm,
			extractDefs: () => cS,
			finalize: () => lS,
			flattenError: () => im,
			formatError: () => am,
			globalConfig: () => Jf,
			globalRegistry: () => $y,
			initializeContext: () => sS,
			isValidBase64: () => Fg,
			isValidBase64URL: () => Lg,
			isValidJWT: () => Bg,
			locales: () => qy,
			meta: () => iS,
			parse: () => um,
			parseAsync: () => fm,
			prettifyError: () => cm,
			process: () => X,
			regexes: () => Nm,
			registry: () => Qy,
			safeDecode: () => Om,
			safeDecodeAsync: () => Mm,
			safeEncode: () => Em,
			safeEncodeAsync: () => Am,
			safeParse: () => mm,
			safeParseAsync: () => gm,
			toDotPath: () => sm,
			toJSONSchema: () => eC,
			treeifyError: () => om,
			util: () => Xf,
			version: () => pg,
		},
		1,
	),
	iC = t(
		{
			endsWith: () => yx,
			gt: () => tx,
			gte: () => nx,
			includes: () => _x,
			length: () => px,
			lowercase: () => hx,
			lt: () => $b,
			lte: () => ex,
			maxLength: () => dx,
			maxSize: () => cx,
			mime: () => xx,
			minLength: () => fx,
			minSize: () => lx,
			multipleOf: () => sx,
			negative: () => ix,
			nonnegative: () => ox,
			nonpositive: () => ax,
			normalize: () => Cx,
			overwrite: () => Sx,
			positive: () => rx,
			property: () => bx,
			regex: () => mx,
			size: () => ux,
			slugify: () => Dx,
			startsWith: () => vx,
			toLowerCase: () => Tx,
			toUpperCase: () => Ex,
			trim: () => wx,
			uppercase: () => gx,
		},
		1,
	),
	aC = t(
		{
			ZodISODate: () => cC,
			ZodISODateTime: () => oC,
			ZodISODuration: () => fC,
			ZodISOTime: () => uC,
			date: () => lC,
			datetime: () => sC,
			duration: () => pC,
			time: () => dC,
		},
		1,
	);
const oC = V(`ZodISODateTime`, (e, t) => {
	Eg.init(e, t), Q.init(e, t);
});
function sC(e) {
	return Eb(oC, e);
}
const cC = V(`ZodISODate`, (e, t) => {
	Dg.init(e, t), Q.init(e, t);
});
function lC(e) {
	return Db(cC, e);
}
const uC = V(`ZodISOTime`, (e, t) => {
	Og.init(e, t), Q.init(e, t);
});
function dC(e) {
	return Ob(uC, e);
}
const fC = V(`ZodISODuration`, (e, t) => {
	kg.init(e, t), Q.init(e, t);
});
function pC(e) {
	return kb(fC, e);
}
var mC = (e, t) => {
	nm.init(e, t),
		(e.name = `ZodError`),
		Object.defineProperties(e, {
			format: { value: (t) => am(e, t) },
			flatten: { value: (t) => im(e, t) },
			addIssue: {
				value: (t) => {
					e.issues.push(t), (e.message = JSON.stringify(e.issues, rp, 2));
				},
			},
			addIssues: {
				value: (t) => {
					e.issues.push(...t), (e.message = JSON.stringify(e.issues, rp, 2));
				},
			},
			isEmpty: {
				get() {
					return e.issues.length === 0;
				},
			},
		});
};
const hC = V(`ZodError`, mC),
	gC = V(`ZodError`, mC, { Parent: Error }),
	_C = lm(gC),
	vC = dm(gC),
	yC = pm(gC),
	bC = hm(gC),
	xC = _m(gC),
	SC = ym(gC),
	CC = xm(gC),
	wC = Cm(gC),
	TC = Tm(gC),
	EC = Dm(gC),
	DC = km(gC),
	OC = jm(gC);
var kC = t(
	{
		ZodAny: () => Yw,
		ZodArray: () => aT,
		ZodBase64: () => hw,
		ZodBase64URL: () => _w,
		ZodBigInt: () => Rw,
		ZodBigIntFormat: () => Bw,
		ZodBoolean: () => Iw,
		ZodCIDRv4: () => dw,
		ZodCIDRv6: () => pw,
		ZodCUID: () => YC,
		ZodCUID2: () => ZC,
		ZodCatch: () => eE,
		ZodCodec: () => oE,
		ZodCustom: () => vE,
		ZodCustomStringFormat: () => Cw,
		ZodDate: () => rT,
		ZodDefault: () => KT,
		ZodDiscriminatedUnion: () => gT,
		ZodE164: () => yw,
		ZodEmail: () => NC,
		ZodEmoji: () => GC,
		ZodEnum: () => AT,
		ZodExactOptional: () => VT,
		ZodFile: () => FT,
		ZodFunction: () => gE,
		ZodGUID: () => FC,
		ZodIPv4: () => aw,
		ZodIPv6: () => lw,
		ZodIntersection: () => vT,
		ZodJWT: () => xw,
		ZodKSUID: () => rw,
		ZodLazy: () => fE,
		ZodLiteral: () => NT,
		ZodMAC: () => sw,
		ZodMap: () => ET,
		ZodNaN: () => nE,
		ZodNanoID: () => qC,
		ZodNever: () => $w,
		ZodNonOptional: () => XT,
		ZodNull: () => qw,
		ZodNullable: () => UT,
		ZodNumber: () => Ow,
		ZodNumberFormat: () => Aw,
		ZodObject: () => cT,
		ZodOptional: () => zT,
		ZodPipe: () => iE,
		ZodPrefault: () => JT,
		ZodPromise: () => mE,
		ZodReadonly: () => cE,
		ZodRecord: () => ST,
		ZodSet: () => OT,
		ZodString: () => jC,
		ZodStringFormat: () => Q,
		ZodSuccess: () => QT,
		ZodSymbol: () => Uw,
		ZodTemplateLiteral: () => uE,
		ZodTransform: () => LT,
		ZodTuple: () => bT,
		ZodType: () => Z,
		ZodULID: () => $C,
		ZodURL: () => HC,
		ZodUUID: () => LC,
		ZodUndefined: () => Gw,
		ZodUnion: () => fT,
		ZodUnknown: () => Zw,
		ZodVoid: () => tT,
		ZodXID: () => tw,
		ZodXor: () => mT,
		_ZodString: () => AC,
		_default: () => qT,
		_function: () => _E,
		any: () => Xw,
		array: () => oT,
		base64: () => gw,
		base64url: () => vw,
		bigint: () => zw,
		boolean: () => Lw,
		catch: () => tE,
		check: () => yE,
		cidrv4: () => fw,
		cidrv6: () => mw,
		codec: () => sE,
		cuid: () => XC,
		cuid2: () => QC,
		custom: () => bE,
		date: () => iT,
		describe: () => CE,
		discriminatedUnion: () => _T,
		e164: () => bw,
		email: () => PC,
		emoji: () => KC,
		enum: () => jT,
		exactOptional: () => HT,
		file: () => IT,
		float32: () => Mw,
		float64: () => Nw,
		function: () => _E,
		guid: () => IC,
		hash: () => Dw,
		hex: () => Ew,
		hostname: () => Tw,
		httpUrl: () => WC,
		instanceof: () => TE,
		int: () => jw,
		int32: () => Pw,
		int64: () => Vw,
		intersection: () => yT,
		ipv4: () => ow,
		ipv6: () => uw,
		json: () => DE,
		jwt: () => Sw,
		keyof: () => sT,
		ksuid: () => iw,
		lazy: () => pE,
		literal: () => PT,
		looseObject: () => dT,
		looseRecord: () => TT,
		mac: () => cw,
		map: () => DT,
		meta: () => wE,
		nan: () => rE,
		nanoid: () => JC,
		nativeEnum: () => MT,
		never: () => eT,
		nonoptional: () => ZT,
		null: () => Jw,
		nullable: () => WT,
		nullish: () => GT,
		number: () => kw,
		object: () => lT,
		optional: () => BT,
		partialRecord: () => wT,
		pipe: () => aE,
		prefault: () => YT,
		preprocess: () => OE,
		promise: () => hE,
		readonly: () => lE,
		record: () => CT,
		refine: () => xE,
		set: () => kT,
		strictObject: () => uT,
		string: () => MC,
		stringFormat: () => ww,
		stringbool: () => EE,
		success: () => $T,
		superRefine: () => SE,
		symbol: () => Ww,
		templateLiteral: () => dE,
		transform: () => RT,
		tuple: () => xT,
		uint32: () => Fw,
		uint64: () => Hw,
		ulid: () => ew,
		undefined: () => Kw,
		union: () => pT,
		unknown: () => Qw,
		url: () => UC,
		uuid: () => RC,
		uuidv4: () => zC,
		uuidv6: () => BC,
		uuidv7: () => VC,
		void: () => nT,
		xid: () => nw,
		xor: () => hT,
	},
	1,
);
const Z = V(
		`ZodType`,
		(e, t) => (
			J.init(e, t),
			Object.assign(e[`~standard`], { jsonSchema: { input: fS(e, `input`), output: fS(e, `output`) } }),
			(e.toJSONSchema = dS(e, {})),
			(e.def = t),
			(e.type = t.type),
			Object.defineProperty(e, `_def`, { value: t }),
			(e.check = (...n) =>
				e.clone(
					dp(t, {
						checks: [
							...(t.checks ?? []),
							...n.map((e) =>
								typeof e == `function` ? { _zod: { check: e, def: { check: `custom` }, onattach: [] } } : e,
							),
						],
					}),
					{ parent: !0 },
				)),
			(e.with = e.check),
			(e.clone = (t, n) => Op(e, t, n)),
			(e.brand = () => e),
			(e.register = (t, n) => (t.add(e, n), e)),
			(e.parse = (t, n) => _C(e, t, n, { callee: e.parse })),
			(e.safeParse = (t, n) => yC(e, t, n)),
			(e.parseAsync = async (t, n) => vC(e, t, n, { callee: e.parseAsync })),
			(e.safeParseAsync = async (t, n) => bC(e, t, n)),
			(e.spa = e.safeParseAsync),
			(e.encode = (t, n) => xC(e, t, n)),
			(e.decode = (t, n) => SC(e, t, n)),
			(e.encodeAsync = async (t, n) => CC(e, t, n)),
			(e.decodeAsync = async (t, n) => wC(e, t, n)),
			(e.safeEncode = (t, n) => TC(e, t, n)),
			(e.safeDecode = (t, n) => EC(e, t, n)),
			(e.safeEncodeAsync = async (t, n) => DC(e, t, n)),
			(e.safeDecodeAsync = async (t, n) => OC(e, t, n)),
			(e.refine = (t, n) => e.check(xE(t, n))),
			(e.superRefine = (t) => e.check(SE(t))),
			(e.overwrite = (t) => e.check(Sx(t))),
			(e.optional = () => BT(e)),
			(e.exactOptional = () => HT(e)),
			(e.nullable = () => WT(e)),
			(e.nullish = () => BT(WT(e))),
			(e.nonoptional = (t) => ZT(e, t)),
			(e.array = () => oT(e)),
			(e.or = (t) => pT([e, t])),
			(e.and = (t) => yT(e, t)),
			(e.transform = (t) => aE(e, RT(t))),
			(e.default = (t) => qT(e, t)),
			(e.prefault = (t) => YT(e, t)),
			(e.catch = (t) => tE(e, t)),
			(e.pipe = (t) => aE(e, t)),
			(e.readonly = () => lE(e)),
			(e.describe = (t) => {
				const n = e.clone();
				return $y.add(n, { description: t }), n;
			}),
			Object.defineProperty(e, `description`, {
				get() {
					return $y.get(e)?.description;
				},
				configurable: !0,
			}),
			(e.meta = (...t) => {
				if (t.length === 0) return $y.get(e);
				const n = e.clone();
				return $y.add(n, t[0]), n;
			}),
			(e.isOptional = () => e.safeParse(void 0).success),
			(e.isNullable = () => e.safeParse(null).success),
			(e.apply = (t) => t(e)),
			e
		),
	),
	AC = V(`_ZodString`, (e, t) => {
		mg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => mS(e, t, n, r));
		const n = e._zod.bag;
		(e.format = n.format ?? null),
			(e.minLength = n.minimum ?? null),
			(e.maxLength = n.maximum ?? null),
			(e.regex = (...t) => e.check(mx(...t))),
			(e.includes = (...t) => e.check(_x(...t))),
			(e.startsWith = (...t) => e.check(vx(...t))),
			(e.endsWith = (...t) => e.check(yx(...t))),
			(e.min = (...t) => e.check(fx(...t))),
			(e.max = (...t) => e.check(dx(...t))),
			(e.length = (...t) => e.check(px(...t))),
			(e.nonempty = (...t) => e.check(fx(1, ...t))),
			(e.lowercase = (t) => e.check(hx(t))),
			(e.uppercase = (t) => e.check(gx(t))),
			(e.trim = () => e.check(wx())),
			(e.normalize = (...t) => e.check(Cx(...t))),
			(e.toLowerCase = () => e.check(Tx())),
			(e.toUpperCase = () => e.check(Ex())),
			(e.slugify = () => e.check(Dx()));
	}),
	jC = V(`ZodString`, (e, t) => {
		mg.init(e, t),
			AC.init(e, t),
			(e.email = (t) => e.check(nb(NC, t))),
			(e.url = (t) => e.check(cb(HC, t))),
			(e.jwt = (t) => e.check(wb(xw, t))),
			(e.emoji = (t) => e.check(lb(GC, t))),
			(e.guid = (t) => e.check(rb(FC, t))),
			(e.uuid = (t) => e.check(ib(LC, t))),
			(e.uuidv4 = (t) => e.check(ab(LC, t))),
			(e.uuidv6 = (t) => e.check(ob(LC, t))),
			(e.uuidv7 = (t) => e.check(sb(LC, t))),
			(e.nanoid = (t) => e.check(ub(qC, t))),
			(e.guid = (t) => e.check(rb(FC, t))),
			(e.cuid = (t) => e.check(db(YC, t))),
			(e.cuid2 = (t) => e.check(fb(ZC, t))),
			(e.ulid = (t) => e.check(pb($C, t))),
			(e.base64 = (t) => e.check(xb(hw, t))),
			(e.base64url = (t) => e.check(Sb(_w, t))),
			(e.xid = (t) => e.check(mb(tw, t))),
			(e.ksuid = (t) => e.check(hb(rw, t))),
			(e.ipv4 = (t) => e.check(gb(aw, t))),
			(e.ipv6 = (t) => e.check(_b(lw, t))),
			(e.cidrv4 = (t) => e.check(yb(dw, t))),
			(e.cidrv6 = (t) => e.check(bb(pw, t))),
			(e.e164 = (t) => e.check(Cb(yw, t))),
			(e.datetime = (t) => e.check(sC(t))),
			(e.date = (t) => e.check(lC(t))),
			(e.time = (t) => e.check(dC(t))),
			(e.duration = (t) => e.check(pC(t)));
	});
function MC(e) {
	return eb(jC, e);
}
const Q = V(`ZodStringFormat`, (e, t) => {
		Y.init(e, t), AC.init(e, t);
	}),
	NC = V(`ZodEmail`, (e, t) => {
		_g.init(e, t), Q.init(e, t);
	});
function PC(e) {
	return nb(NC, e);
}
const FC = V(`ZodGUID`, (e, t) => {
	hg.init(e, t), Q.init(e, t);
});
function IC(e) {
	return rb(FC, e);
}
const LC = V(`ZodUUID`, (e, t) => {
	gg.init(e, t), Q.init(e, t);
});
function RC(e) {
	return ib(LC, e);
}
function zC(e) {
	return ab(LC, e);
}
function BC(e) {
	return ob(LC, e);
}
function VC(e) {
	return sb(LC, e);
}
const HC = V(`ZodURL`, (e, t) => {
	vg.init(e, t), Q.init(e, t);
});
function UC(e) {
	return cb(HC, e);
}
function WC(e) {
	return cb(HC, { protocol: /^https?$/, hostname: lh, ...W(e) });
}
const GC = V(`ZodEmoji`, (e, t) => {
	yg.init(e, t), Q.init(e, t);
});
function KC(e) {
	return lb(GC, e);
}
const qC = V(`ZodNanoID`, (e, t) => {
	bg.init(e, t), Q.init(e, t);
});
function JC(e) {
	return ub(qC, e);
}
const YC = V(`ZodCUID`, (e, t) => {
	xg.init(e, t), Q.init(e, t);
});
function XC(e) {
	return db(YC, e);
}
const ZC = V(`ZodCUID2`, (e, t) => {
	Sg.init(e, t), Q.init(e, t);
});
function QC(e) {
	return fb(ZC, e);
}
const $C = V(`ZodULID`, (e, t) => {
	Cg.init(e, t), Q.init(e, t);
});
function ew(e) {
	return pb($C, e);
}
const tw = V(`ZodXID`, (e, t) => {
	wg.init(e, t), Q.init(e, t);
});
function nw(e) {
	return mb(tw, e);
}
const rw = V(`ZodKSUID`, (e, t) => {
	Tg.init(e, t), Q.init(e, t);
});
function iw(e) {
	return hb(rw, e);
}
const aw = V(`ZodIPv4`, (e, t) => {
	Ag.init(e, t), Q.init(e, t);
});
function ow(e) {
	return gb(aw, e);
}
const sw = V(`ZodMAC`, (e, t) => {
	Mg.init(e, t), Q.init(e, t);
});
function cw(e) {
	return vb(sw, e);
}
const lw = V(`ZodIPv6`, (e, t) => {
	jg.init(e, t), Q.init(e, t);
});
function uw(e) {
	return _b(lw, e);
}
const dw = V(`ZodCIDRv4`, (e, t) => {
	Ng.init(e, t), Q.init(e, t);
});
function fw(e) {
	return yb(dw, e);
}
const pw = V(`ZodCIDRv6`, (e, t) => {
	Pg.init(e, t), Q.init(e, t);
});
function mw(e) {
	return bb(pw, e);
}
const hw = V(`ZodBase64`, (e, t) => {
	Ig.init(e, t), Q.init(e, t);
});
function gw(e) {
	return xb(hw, e);
}
const _w = V(`ZodBase64URL`, (e, t) => {
	Rg.init(e, t), Q.init(e, t);
});
function vw(e) {
	return Sb(_w, e);
}
const yw = V(`ZodE164`, (e, t) => {
	zg.init(e, t), Q.init(e, t);
});
function bw(e) {
	return Cb(yw, e);
}
const xw = V(`ZodJWT`, (e, t) => {
	Vg.init(e, t), Q.init(e, t);
});
function Sw(e) {
	return wb(xw, e);
}
const Cw = V(`ZodCustomStringFormat`, (e, t) => {
	Hg.init(e, t), Q.init(e, t);
});
function ww(e, t, n = {}) {
	return oS(Cw, e, t, n);
}
function Tw(e) {
	return oS(Cw, `hostname`, ch, e);
}
function Ew(e) {
	return oS(Cw, `hex`, Th, e);
}
function Dw(e, t) {
	const n = `${e}_${t?.enc ?? `hex`}`,
		r = Nm[n];
	if (!r) throw Error(`Unrecognized hash format: ${n}`);
	return oS(Cw, n, r, t);
}
const Ow = V(`ZodNumber`, (e, t) => {
	Ug.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => hS(e, t, n, r)),
		(e.gt = (t, n) => e.check(tx(t, n))),
		(e.gte = (t, n) => e.check(nx(t, n))),
		(e.min = (t, n) => e.check(nx(t, n))),
		(e.lt = (t, n) => e.check($b(t, n))),
		(e.lte = (t, n) => e.check(ex(t, n))),
		(e.max = (t, n) => e.check(ex(t, n))),
		(e.int = (t) => e.check(jw(t))),
		(e.safe = (t) => e.check(jw(t))),
		(e.positive = (t) => e.check(tx(0, t))),
		(e.nonnegative = (t) => e.check(nx(0, t))),
		(e.negative = (t) => e.check($b(0, t))),
		(e.nonpositive = (t) => e.check(ex(0, t))),
		(e.multipleOf = (t, n) => e.check(sx(t, n))),
		(e.step = (t, n) => e.check(sx(t, n))),
		(e.finite = () => e);
	const n = e._zod.bag;
	(e.minValue = Math.max(n.minimum ?? -1 / 0, n.exclusiveMinimum ?? -1 / 0) ?? null),
		(e.maxValue = Math.min(n.maximum ?? 1 / 0, n.exclusiveMaximum ?? 1 / 0) ?? null),
		(e.isInt = (n.format ?? ``).includes(`int`) || Number.isSafeInteger(n.multipleOf ?? 0.5)),
		(e.isFinite = !0),
		(e.format = n.format ?? null);
});
function kw(e) {
	return Ab(Ow, e);
}
const Aw = V(`ZodNumberFormat`, (e, t) => {
	Wg.init(e, t), Ow.init(e, t);
});
function jw(e) {
	return Mb(Aw, e);
}
function Mw(e) {
	return Nb(Aw, e);
}
function Nw(e) {
	return Pb(Aw, e);
}
function Pw(e) {
	return Fb(Aw, e);
}
function Fw(e) {
	return Ib(Aw, e);
}
const Iw = V(`ZodBoolean`, (e, t) => {
	Gg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => gS(e, t, n, r));
});
function Lw(e) {
	return Lb(Iw, e);
}
const Rw = V(`ZodBigInt`, (e, t) => {
	Kg.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => _S(e, t, n, r)),
		(e.gte = (t, n) => e.check(nx(t, n))),
		(e.min = (t, n) => e.check(nx(t, n))),
		(e.gt = (t, n) => e.check(tx(t, n))),
		(e.gte = (t, n) => e.check(nx(t, n))),
		(e.min = (t, n) => e.check(nx(t, n))),
		(e.lt = (t, n) => e.check($b(t, n))),
		(e.lte = (t, n) => e.check(ex(t, n))),
		(e.max = (t, n) => e.check(ex(t, n))),
		(e.positive = (t) => e.check(tx(BigInt(0), t))),
		(e.negative = (t) => e.check($b(BigInt(0), t))),
		(e.nonpositive = (t) => e.check(ex(BigInt(0), t))),
		(e.nonnegative = (t) => e.check(nx(BigInt(0), t))),
		(e.multipleOf = (t, n) => e.check(sx(t, n)));
	const n = e._zod.bag;
	(e.minValue = n.minimum ?? null), (e.maxValue = n.maximum ?? null), (e.format = n.format ?? null);
});
function zw(e) {
	return zb(Rw, e);
}
const Bw = V(`ZodBigIntFormat`, (e, t) => {
	qg.init(e, t), Rw.init(e, t);
});
function Vw(e) {
	return Vb(Bw, e);
}
function Hw(e) {
	return Hb(Bw, e);
}
const Uw = V(`ZodSymbol`, (e, t) => {
	Jg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => vS(e, t, n, r));
});
function Ww(e) {
	return Ub(Uw, e);
}
const Gw = V(`ZodUndefined`, (e, t) => {
	Yg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => bS(e, t, n, r));
});
function Kw(e) {
	return Wb(Gw, e);
}
const qw = V(`ZodNull`, (e, t) => {
	Xg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => yS(e, t, n, r));
});
function Jw(e) {
	return Gb(qw, e);
}
const Yw = V(`ZodAny`, (e, t) => {
	Zg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (e, t, n) => void 0);
});
function Xw() {
	return Kb(Yw);
}
const Zw = V(`ZodUnknown`, (e, t) => {
	Qg.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (e, t, n) => void 0);
});
function Qw() {
	return qb(Zw);
}
const $w = V(`ZodNever`, (e, t) => {
	$g.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => SS(e, t, n, r));
});
function eT(e) {
	return Jb($w, e);
}
const tT = V(`ZodVoid`, (e, t) => {
	e_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => xS(e, t, n, r));
});
function nT(e) {
	return Yb(tT, e);
}
const rT = V(`ZodDate`, (e, t) => {
	t_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => TS(e, t, n, r)),
		(e.min = (t, n) => e.check(nx(t, n))),
		(e.max = (t, n) => e.check(ex(t, n)));
	const n = e._zod.bag;
	(e.minDate = n.minimum ? new Date(n.minimum) : null), (e.maxDate = n.maximum ? new Date(n.maximum) : null);
});
function iT(e) {
	return Xb(rT, e);
}
const aT = V(`ZodArray`, (e, t) => {
	r_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => LS(e, t, n, r)),
		(e.element = t.element),
		(e.min = (t, n) => e.check(fx(t, n))),
		(e.nonempty = (t) => e.check(fx(1, t))),
		(e.max = (t, n) => e.check(dx(t, n))),
		(e.length = (t, n) => e.check(px(t, n))),
		(e.unwrap = () => e.element);
});
function oT(e, t) {
	return Ox(aT, e, t);
}
function sT(e) {
	const t = e._zod.def.shape;
	return jT(Object.keys(t));
}
const cT = V(`ZodObject`, (e, t) => {
	c_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => RS(e, t, n, r)),
		U(e, `shape`, () => t.shape),
		(e.keyof = () => jT(Object.keys(e._zod.def.shape))),
		(e.catchall = (t) => e.clone({ ...e._zod.def, catchall: t })),
		(e.passthrough = () => e.clone({ ...e._zod.def, catchall: Qw() })),
		(e.loose = () => e.clone({ ...e._zod.def, catchall: Qw() })),
		(e.strict = () => e.clone({ ...e._zod.def, catchall: eT() })),
		(e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 })),
		(e.extend = (t) => Fp(e, t)),
		(e.safeExtend = (t) => Ip(e, t)),
		(e.merge = (t) => Lp(e, t)),
		(e.pick = (t) => Np(e, t)),
		(e.omit = (t) => Pp(e, t)),
		(e.partial = (...t) => Rp(zT, e, t[0])),
		(e.required = (...t) => zp(XT, e, t[0]));
});
function lT(e, t) {
	return new cT({ type: `object`, shape: e ?? {}, ...W(t) });
}
function uT(e, t) {
	return new cT({ type: `object`, shape: e, catchall: eT(), ...W(t) });
}
function dT(e, t) {
	return new cT({ type: `object`, shape: e, catchall: Qw(), ...W(t) });
}
const fT = V(`ZodUnion`, (e, t) => {
	u_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => zS(e, t, n, r)), (e.options = t.options);
});
function pT(e, t) {
	return new fT({ type: `union`, options: e, ...W(t) });
}
const mT = V(`ZodXor`, (e, t) => {
	fT.init(e, t), f_.init(e, t), (e._zod.processJSONSchema = (t, n, r) => zS(e, t, n, r)), (e.options = t.options);
});
function hT(e, t) {
	return new mT({ type: `union`, options: e, inclusive: !1, ...W(t) });
}
const gT = V(`ZodDiscriminatedUnion`, (e, t) => {
	fT.init(e, t), p_.init(e, t);
});
function _T(e, t, n) {
	return new gT({ type: `union`, options: t, discriminator: e, ...W(n) });
}
const vT = V(`ZodIntersection`, (e, t) => {
	m_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => BS(e, t, n, r));
});
function yT(e, t) {
	return new vT({ type: `intersection`, left: e, right: t });
}
const bT = V(`ZodTuple`, (e, t) => {
	__.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => VS(e, t, n, r)),
		(e.rest = (t) => e.clone({ ...e._zod.def, rest: t }));
});
function xT(e, t, n) {
	const r = t instanceof J;
	return new bT({ type: `tuple`, items: e, rest: r ? t : null, ...W(r ? n : t) });
}
const ST = V(`ZodRecord`, (e, t) => {
	y_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => HS(e, t, n, r)),
		(e.keyType = t.keyType),
		(e.valueType = t.valueType);
});
function CT(e, t, n) {
	return new ST({ type: `record`, keyType: e, valueType: t, ...W(n) });
}
function wT(e, t, n) {
	const r = Op(e);
	return (r._zod.values = void 0), new ST({ type: `record`, keyType: r, valueType: t, ...W(n) });
}
function TT(e, t, n) {
	return new ST({ type: `record`, keyType: e, valueType: t, mode: `loose`, ...W(n) });
}
const ET = V(`ZodMap`, (e, t) => {
	b_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => FS(e, t, n, r)),
		(e.keyType = t.keyType),
		(e.valueType = t.valueType),
		(e.min = (...t) => e.check(lx(...t))),
		(e.nonempty = (t) => e.check(lx(1, t))),
		(e.max = (...t) => e.check(cx(...t))),
		(e.size = (...t) => e.check(ux(...t)));
});
function DT(e, t, n) {
	return new ET({ type: `map`, keyType: e, valueType: t, ...W(n) });
}
const OT = V(`ZodSet`, (e, t) => {
	S_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => IS(e, t, n, r)),
		(e.min = (...t) => e.check(lx(...t))),
		(e.nonempty = (t) => e.check(lx(1, t))),
		(e.max = (...t) => e.check(cx(...t))),
		(e.size = (...t) => e.check(ux(...t)));
});
function kT(e, t) {
	return new OT({ type: `set`, valueType: e, ...W(t) });
}
const AT = V(`ZodEnum`, (e, t) => {
	w_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => ES(e, t, n, r)),
		(e.enum = t.entries),
		(e.options = Object.values(t.entries));
	const n = new Set(Object.keys(t.entries));
	(e.extract = (e, r) => {
		const i = {};
		for (const r of e)
			if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
		return new AT({ ...t, checks: [], ...W(r), entries: i });
	}),
		(e.exclude = (e, r) => {
			const i = { ...t.entries };
			for (const t of e)
				if (n.has(t)) delete i[t];
				else throw Error(`Key ${t} not found in enum`);
			return new AT({ ...t, checks: [], ...W(r), entries: i });
		});
});
function jT(e, t) {
	return new AT({ type: `enum`, entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e, ...W(t) });
}
function MT(e, t) {
	return new AT({ type: `enum`, entries: e, ...W(t) });
}
const NT = V(`ZodLiteral`, (e, t) => {
	T_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => DS(e, t, n, r)),
		(e.values = new Set(t.values)),
		Object.defineProperty(e, `value`, {
			get() {
				if (t.values.length > 1)
					throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return t.values[0];
			},
		});
});
function PT(e, t) {
	return new NT({ type: `literal`, values: Array.isArray(e) ? e : [e], ...W(t) });
}
const FT = V(`ZodFile`, (e, t) => {
	E_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => AS(e, t, n, r)),
		(e.min = (t, n) => e.check(lx(t, n))),
		(e.max = (t, n) => e.check(cx(t, n))),
		(e.mime = (t, n) => e.check(xx(Array.isArray(t) ? t : [t], n)));
});
function IT(e) {
	return Bx(FT, e);
}
const LT = V(`ZodTransform`, (e, t) => {
	D_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => PS(e, t, n, r)),
		(e._zod.parse = (n, r) => {
			if (r.direction === `backward`) throw new qf(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == `string`) n.issues.push(Kp(r, n.value, t));
				else {
					const t = r;
					t.fatal && (t.continue = !1),
						(t.code ??= `custom`),
						(t.input ??= n.value),
						(t.inst ??= e),
						n.issues.push(Kp(t));
				}
			};
			const i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => ((n.value = e), n)) : ((n.value = i), n);
		});
});
function RT(e) {
	return new LT({ type: `transform`, transform: e });
}
const zT = V(`ZodOptional`, (e, t) => {
	k_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => ZS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function BT(e) {
	return new zT({ type: `optional`, innerType: e });
}
const VT = V(`ZodExactOptional`, (e, t) => {
	A_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => ZS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function HT(e) {
	return new VT({ type: `optional`, innerType: e });
}
const UT = V(`ZodNullable`, (e, t) => {
	j_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => US(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function WT(e) {
	return new UT({ type: `nullable`, innerType: e });
}
function GT(e) {
	return BT(WT(e));
}
const KT = V(`ZodDefault`, (e, t) => {
	M_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => GS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap);
});
function qT(e, t) {
	return new KT({
		type: `default`,
		innerType: e,
		get defaultValue() {
			return typeof t == `function` ? t() : Sp(t);
		},
	});
}
const JT = V(`ZodPrefault`, (e, t) => {
	P_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => KS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function YT(e, t) {
	return new JT({
		type: `prefault`,
		innerType: e,
		get defaultValue() {
			return typeof t == `function` ? t() : Sp(t);
		},
	});
}
const XT = V(`ZodNonOptional`, (e, t) => {
	F_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => WS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function ZT(e, t) {
	return new XT({ type: `nonoptional`, innerType: e, ...W(t) });
}
const QT = V(`ZodSuccess`, (e, t) => {
	L_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => jS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function $T(e) {
	return new QT({ type: `success`, innerType: e });
}
const eE = V(`ZodCatch`, (e, t) => {
	R_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => qS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap);
});
function tE(e, t) {
	return new eE({ type: `catch`, innerType: e, catchValue: typeof t == `function` ? t : () => t });
}
const nE = V(`ZodNaN`, (e, t) => {
	z_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => OS(e, t, n, r));
});
function rE(e) {
	return Qb(nE, e);
}
const iE = V(`ZodPipe`, (e, t) => {
	B_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => JS(e, t, n, r)), (e.in = t.in), (e.out = t.out);
});
function aE(e, t) {
	return new iE({ type: `pipe`, in: e, out: t });
}
const oE = V(`ZodCodec`, (e, t) => {
	iE.init(e, t), H_.init(e, t);
});
function sE(e, t, n) {
	return new oE({ type: `pipe`, in: e, out: t, transform: n.decode, reverseTransform: n.encode });
}
const cE = V(`ZodReadonly`, (e, t) => {
	G_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => YS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function lE(e) {
	return new cE({ type: `readonly`, innerType: e });
}
const uE = V(`ZodTemplateLiteral`, (e, t) => {
	q_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => kS(e, t, n, r));
});
function dE(e, t) {
	return new uE({ type: `template_literal`, parts: e, ...W(t) });
}
const fE = V(`ZodLazy`, (e, t) => {
	X_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => QS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.getter());
});
function pE(e) {
	return new fE({ type: `lazy`, getter: e });
}
const mE = V(`ZodPromise`, (e, t) => {
	Y_.init(e, t),
		Z.init(e, t),
		(e._zod.processJSONSchema = (t, n, r) => XS(e, t, n, r)),
		(e.unwrap = () => e._zod.def.innerType);
});
function hE(e) {
	return new mE({ type: `promise`, innerType: e });
}
const gE = V(`ZodFunction`, (e, t) => {
	J_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => NS(e, t, n, r));
});
function _E(e) {
	return new gE({
		type: `function`,
		input: Array.isArray(e?.input) ? xT(e?.input) : (e?.input ?? oT(Qw())),
		output: e?.output ?? Qw(),
	});
}
const vE = V(`ZodCustom`, (e, t) => {
	Z_.init(e, t), Z.init(e, t), (e._zod.processJSONSchema = (t, n, r) => MS(e, t, n, r));
});
function yE(e) {
	const t = new q({ check: `custom` });
	return (t._zod.check = e), t;
}
function bE(e, t) {
	return $x(vE, e ?? (() => !0), t);
}
function xE(e, t = {}) {
	return eS(vE, e, t);
}
function SE(e) {
	return tS(e);
}
const CE = rS,
	wE = iS;
function TE(e, t = {}) {
	const n = new vE({ type: `custom`, check: `custom`, fn: (t) => t instanceof e, abort: !0, ...W(t) });
	return (
		(n._zod.bag.Class = e),
		(n._zod.check = (t) => {
			t.value instanceof e ||
				t.issues.push({
					code: `invalid_type`,
					expected: e.name,
					input: t.value,
					inst: n,
					path: [...(n._zod.def.path ?? [])],
				});
		}),
		n
	);
}
const EE = (...e) => aS({ Codec: oE, Boolean: Iw, String: jC }, ...e);
function DE(e) {
	const t = pE(() => pT([MC(e), kw(), Lw(), Jw(), oT(t), CT(MC(), t)]));
	return t;
}
function OE(e, t) {
	return aE(RT(e), t);
}
const kE = {
	invalid_type: `invalid_type`,
	too_big: `too_big`,
	too_small: `too_small`,
	invalid_format: `invalid_format`,
	not_multiple_of: `not_multiple_of`,
	unrecognized_keys: `unrecognized_keys`,
	invalid_union: `invalid_union`,
	invalid_key: `invalid_key`,
	invalid_element: `invalid_element`,
	invalid_value: `invalid_value`,
	custom: `custom`,
};
function AE(e) {
	Yf({ customError: e });
}
function jE() {
	return Yf().customError;
}
var ME;
((e) => {})((ME ||= {}));
var $ = { ...kC, ...iC, iso: aC },
	NE = new Set(
		`$schema.$ref.$defs.definitions.$id.id.$comment.$anchor.$vocabulary.$dynamicRef.$dynamicAnchor.type.enum.const.anyOf.oneOf.allOf.not.properties.required.additionalProperties.patternProperties.propertyNames.minProperties.maxProperties.items.prefixItems.additionalItems.minItems.maxItems.uniqueItems.contains.minContains.maxContains.minLength.maxLength.pattern.format.minimum.maximum.exclusiveMinimum.exclusiveMaximum.multipleOf.description.default.contentEncoding.contentMediaType.contentSchema.unevaluatedItems.unevaluatedProperties.if.then.else.dependentSchemas.dependentRequired.nullable.readOnly`.split(
			`.`,
		),
	);
function PE(e, t) {
	const n = e.$schema;
	return n === `https://json-schema.org/draft/2020-12/schema`
		? `draft-2020-12`
		: n === `http://json-schema.org/draft-07/schema#`
			? `draft-7`
			: n === `http://json-schema.org/draft-04/schema#`
				? `draft-4`
				: (t ?? `draft-2020-12`);
}
function FE(e, t) {
	if (!e.startsWith(`#`)) throw Error(`External $ref is not supported, only local refs (#/...) are allowed`);
	const n = e.slice(1).split(`/`).filter(Boolean);
	if (n.length === 0) return t.rootSchema;
	const r = t.version === `draft-2020-12` ? `$defs` : `definitions`;
	if (n[0] === r) {
		const r = n[1];
		if (!r || !t.defs[r]) throw Error(`Reference not found: ${e}`);
		return t.defs[r];
	}
	throw Error(`Reference not found: ${e}`);
}
function IE(e, t) {
	if (e.not !== void 0) {
		if (typeof e.not == `object` && Object.keys(e.not).length === 0) return $.never();
		throw Error(`not is not supported in Zod (except { not: {} } for never)`);
	}
	if (e.unevaluatedItems !== void 0) throw Error(`unevaluatedItems is not supported`);
	if (e.unevaluatedProperties !== void 0) throw Error(`unevaluatedProperties is not supported`);
	if (e.if !== void 0 || e.then !== void 0 || e.else !== void 0)
		throw Error(`Conditional schemas (if/then/else) are not supported`);
	if (e.dependentSchemas !== void 0 || e.dependentRequired !== void 0)
		throw Error(`dependentSchemas and dependentRequired are not supported`);
	if (e.$ref) {
		const n = e.$ref;
		if (t.refs.has(n)) return t.refs.get(n);
		if (t.processing.has(n))
			return $.lazy(() => {
				if (!t.refs.has(n)) throw Error(`Circular reference not resolved: ${n}`);
				return t.refs.get(n);
			});
		t.processing.add(n);
		const r = LE(FE(n, t), t);
		return t.refs.set(n, r), t.processing.delete(n), r;
	}
	if (e.enum !== void 0) {
		const n = e.enum;
		if (t.version === `openapi-3.0` && e.nullable === !0 && n.length === 1 && n[0] === null) return $.null();
		if (n.length === 0) return $.never();
		if (n.length === 1) return $.literal(n[0]);
		if (n.every((e) => typeof e == `string`)) return $.enum(n);
		const r = n.map((e) => $.literal(e));
		return r.length < 2 ? r[0] : $.union([r[0], r[1], ...r.slice(2)]);
	}
	if (e.const !== void 0) return $.literal(e.const);
	const n = e.type;
	if (Array.isArray(n)) {
		const r = n.map((n) => IE({ ...e, type: n }, t));
		return r.length === 0 ? $.never() : r.length === 1 ? r[0] : $.union(r);
	}
	if (!n) return $.any();
	let r;
	switch (n) {
		case `string`: {
			let t = $.string();
			if (e.format) {
				const n = e.format;
				n === `email`
					? (t = t.check($.email()))
					: n === `uri` || n === `uri-reference`
						? (t = t.check($.url()))
						: n === `uuid` || n === `guid`
							? (t = t.check($.uuid()))
							: n === `date-time`
								? (t = t.check($.iso.datetime()))
								: n === `date`
									? (t = t.check($.iso.date()))
									: n === `time`
										? (t = t.check($.iso.time()))
										: n === `duration`
											? (t = t.check($.iso.duration()))
											: n === `ipv4`
												? (t = t.check($.ipv4()))
												: n === `ipv6`
													? (t = t.check($.ipv6()))
													: n === `mac`
														? (t = t.check($.mac()))
														: n === `cidr`
															? (t = t.check($.cidrv4()))
															: n === `cidr-v6`
																? (t = t.check($.cidrv6()))
																: n === `base64`
																	? (t = t.check($.base64()))
																	: n === `base64url`
																		? (t = t.check($.base64url()))
																		: n === `e164`
																			? (t = t.check($.e164()))
																			: n === `jwt`
																				? (t = t.check($.jwt()))
																				: n === `emoji`
																					? (t = t.check($.emoji()))
																					: n === `nanoid`
																						? (t = t.check($.nanoid()))
																						: n === `cuid`
																							? (t = t.check($.cuid()))
																							: n === `cuid2`
																								? (t = t.check($.cuid2()))
																								: n === `ulid`
																									? (t = t.check($.ulid()))
																									: n === `xid`
																										? (t = t.check($.xid()))
																										: n === `ksuid` && (t = t.check($.ksuid()));
			}
			typeof e.minLength == `number` && (t = t.min(e.minLength)),
				typeof e.maxLength == `number` && (t = t.max(e.maxLength)),
				e.pattern && (t = t.regex(new RegExp(e.pattern))),
				(r = t);
			break;
		}
		case `number`:
		case `integer`: {
			let t = n === `integer` ? $.number().int() : $.number();
			typeof e.minimum == `number` && (t = t.min(e.minimum)),
				typeof e.maximum == `number` && (t = t.max(e.maximum)),
				typeof e.exclusiveMinimum == `number`
					? (t = t.gt(e.exclusiveMinimum))
					: e.exclusiveMinimum === !0 && typeof e.minimum == `number` && (t = t.gt(e.minimum)),
				typeof e.exclusiveMaximum == `number`
					? (t = t.lt(e.exclusiveMaximum))
					: e.exclusiveMaximum === !0 && typeof e.maximum == `number` && (t = t.lt(e.maximum)),
				typeof e.multipleOf == `number` && (t = t.multipleOf(e.multipleOf)),
				(r = t);
			break;
		}
		case `boolean`:
			r = $.boolean();
			break;
		case `null`:
			r = $.null();
			break;
		case `object`: {
			const n = {},
				i = e.properties || {},
				a = new Set(e.required || []);
			for (const [e, r] of Object.entries(i)) {
				const i = LE(r, t);
				n[e] = a.has(e) ? i : i.optional();
			}
			if (e.propertyNames) {
				const i = LE(e.propertyNames, t),
					a =
						e.additionalProperties && typeof e.additionalProperties == `object`
							? LE(e.additionalProperties, t)
							: $.any();
				if (Object.keys(n).length === 0) {
					r = $.record(i, a);
					break;
				}
				const o = $.object(n).passthrough(),
					s = $.looseRecord(i, a);
				r = $.intersection(o, s);
				break;
			}
			if (e.patternProperties) {
				const i = e.patternProperties,
					a = Object.keys(i),
					o = [];
				for (const e of a) {
					const n = LE(i[e], t),
						r = $.string().regex(new RegExp(e));
					o.push($.looseRecord(r, n));
				}
				const s = [];
				if ((Object.keys(n).length > 0 && s.push($.object(n).passthrough()), s.push(...o), s.length === 0))
					r = $.object({}).passthrough();
				else if (s.length === 1) r = s[0];
				else {
					let e = $.intersection(s[0], s[1]);
					for (let t = 2; t < s.length; t++) e = $.intersection(e, s[t]);
					r = e;
				}
				break;
			}
			const o = $.object(n);
			r =
				e.additionalProperties === !1
					? o.strict()
					: typeof e.additionalProperties == `object`
						? o.catchall(LE(e.additionalProperties, t))
						: o.passthrough();
			break;
		}
		case `array`: {
			const n = e.prefixItems,
				i = e.items;
			if (n && Array.isArray(n)) {
				const a = n.map((e) => LE(e, t)),
					o = i && typeof i == `object` && !Array.isArray(i) ? LE(i, t) : void 0;
				(r = o ? $.tuple(a).rest(o) : $.tuple(a)),
					typeof e.minItems == `number` && (r = r.check($.minLength(e.minItems))),
					typeof e.maxItems == `number` && (r = r.check($.maxLength(e.maxItems)));
			} else if (Array.isArray(i)) {
				const n = i.map((e) => LE(e, t)),
					a = e.additionalItems && typeof e.additionalItems == `object` ? LE(e.additionalItems, t) : void 0;
				(r = a ? $.tuple(n).rest(a) : $.tuple(n)),
					typeof e.minItems == `number` && (r = r.check($.minLength(e.minItems))),
					typeof e.maxItems == `number` && (r = r.check($.maxLength(e.maxItems)));
			} else if (i !== void 0) {
				let n = LE(i, t),
					a = $.array(n);
				typeof e.minItems == `number` && (a = a.min(e.minItems)),
					typeof e.maxItems == `number` && (a = a.max(e.maxItems)),
					(r = a);
			} else r = $.array($.any());
			break;
		}
		default:
			throw Error(`Unsupported type: ${n}`);
	}
	return e.description && (r = r.describe(e.description)), e.default !== void 0 && (r = r.default(e.default)), r;
}
function LE(e, t) {
	if (typeof e == `boolean`) return e ? $.any() : $.never();
	let n = IE(e, t),
		r = e.type || e.enum !== void 0 || e.const !== void 0;
	if (e.anyOf && Array.isArray(e.anyOf)) {
		const i = e.anyOf.map((e) => LE(e, t)),
			a = $.union(i);
		n = r ? $.intersection(n, a) : a;
	}
	if (e.oneOf && Array.isArray(e.oneOf)) {
		const i = e.oneOf.map((e) => LE(e, t)),
			a = $.xor(i);
		n = r ? $.intersection(n, a) : a;
	}
	if (e.allOf && Array.isArray(e.allOf))
		if (e.allOf.length === 0) n = r ? n : $.any();
		else {
			let i = r ? n : LE(e.allOf[0], t),
				a = r ? 0 : 1;
			for (let n = a; n < e.allOf.length; n++) i = $.intersection(i, LE(e.allOf[n], t));
			n = i;
		}
	e.nullable === !0 && t.version === `openapi-3.0` && (n = $.nullable(n)), e.readOnly === !0 && (n = $.readonly(n));
	const i = {};
	for (const t of [`$id`, `id`, `$comment`, `$anchor`, `$vocabulary`, `$dynamicRef`, `$dynamicAnchor`])
		t in e && (i[t] = e[t]);
	for (const t of [`contentEncoding`, `contentMediaType`, `contentSchema`]) t in e && (i[t] = e[t]);
	for (const t of Object.keys(e)) NE.has(t) || (i[t] = e[t]);
	return Object.keys(i).length > 0 && t.registry.add(n, i), n;
}
function RE(e, t) {
	return typeof e == `boolean`
		? e
			? $.any()
			: $.never()
		: LE(e, {
				version: PE(e, t?.defaultTarget),
				defs: e.$defs || e.definitions || {},
				refs: new Map(),
				processing: new Set(),
				rootSchema: e,
				registry: t?.registry ?? $y,
			});
}
var zE = t({ bigint: () => UE, boolean: () => HE, date: () => WE, number: () => VE, string: () => BE }, 1);
function BE(e) {
	return tb(jC, e);
}
function VE(e) {
	return jb(Ow, e);
}
function HE(e) {
	return Rb(Iw, e);
}
function UE(e) {
	return Bb(Rw, e);
}
function WE(e) {
	return Zb(rT, e);
}
var GE = t(
	{
		$brand: () => Gf,
		$input: () => Xy,
		$output: () => Yy,
		NEVER: () => Wf,
		TimePrecision: () => Tb,
		ZodAny: () => Yw,
		ZodArray: () => aT,
		ZodBase64: () => hw,
		ZodBase64URL: () => _w,
		ZodBigInt: () => Rw,
		ZodBigIntFormat: () => Bw,
		ZodBoolean: () => Iw,
		ZodCIDRv4: () => dw,
		ZodCIDRv6: () => pw,
		ZodCUID: () => YC,
		ZodCUID2: () => ZC,
		ZodCatch: () => eE,
		ZodCodec: () => oE,
		ZodCustom: () => vE,
		ZodCustomStringFormat: () => Cw,
		ZodDate: () => rT,
		ZodDefault: () => KT,
		ZodDiscriminatedUnion: () => gT,
		ZodE164: () => yw,
		ZodEmail: () => NC,
		ZodEmoji: () => GC,
		ZodEnum: () => AT,
		ZodError: () => hC,
		ZodExactOptional: () => VT,
		ZodFile: () => FT,
		ZodFirstPartyTypeKind: () => ME,
		ZodFunction: () => gE,
		ZodGUID: () => FC,
		ZodIPv4: () => aw,
		ZodIPv6: () => lw,
		ZodISODate: () => cC,
		ZodISODateTime: () => oC,
		ZodISODuration: () => fC,
		ZodISOTime: () => uC,
		ZodIntersection: () => vT,
		ZodIssueCode: () => kE,
		ZodJWT: () => xw,
		ZodKSUID: () => rw,
		ZodLazy: () => fE,
		ZodLiteral: () => NT,
		ZodMAC: () => sw,
		ZodMap: () => ET,
		ZodNaN: () => nE,
		ZodNanoID: () => qC,
		ZodNever: () => $w,
		ZodNonOptional: () => XT,
		ZodNull: () => qw,
		ZodNullable: () => UT,
		ZodNumber: () => Ow,
		ZodNumberFormat: () => Aw,
		ZodObject: () => cT,
		ZodOptional: () => zT,
		ZodPipe: () => iE,
		ZodPrefault: () => JT,
		ZodPromise: () => mE,
		ZodReadonly: () => cE,
		ZodRealError: () => gC,
		ZodRecord: () => ST,
		ZodSet: () => OT,
		ZodString: () => jC,
		ZodStringFormat: () => Q,
		ZodSuccess: () => QT,
		ZodSymbol: () => Uw,
		ZodTemplateLiteral: () => uE,
		ZodTransform: () => LT,
		ZodTuple: () => bT,
		ZodType: () => Z,
		ZodULID: () => $C,
		ZodURL: () => HC,
		ZodUUID: () => LC,
		ZodUndefined: () => Gw,
		ZodUnion: () => fT,
		ZodUnknown: () => Zw,
		ZodVoid: () => tT,
		ZodXID: () => tw,
		ZodXor: () => mT,
		_ZodString: () => AC,
		_default: () => qT,
		_function: () => _E,
		any: () => Xw,
		array: () => oT,
		base64: () => gw,
		base64url: () => vw,
		bigint: () => zw,
		boolean: () => Lw,
		catch: () => tE,
		check: () => yE,
		cidrv4: () => fw,
		cidrv6: () => mw,
		clone: () => Op,
		codec: () => sE,
		coerce: () => zE,
		config: () => Yf,
		core: () => rC,
		cuid: () => XC,
		cuid2: () => QC,
		custom: () => bE,
		date: () => iT,
		decode: () => SC,
		decodeAsync: () => wC,
		describe: () => CE,
		discriminatedUnion: () => _T,
		e164: () => bw,
		email: () => PC,
		emoji: () => KC,
		encode: () => xC,
		encodeAsync: () => CC,
		endsWith: () => yx,
		enum: () => jT,
		exactOptional: () => HT,
		file: () => IT,
		flattenError: () => im,
		float32: () => Mw,
		float64: () => Nw,
		formatError: () => am,
		fromJSONSchema: () => RE,
		function: () => _E,
		getErrorMap: () => jE,
		globalRegistry: () => $y,
		gt: () => tx,
		gte: () => nx,
		guid: () => IC,
		hash: () => Dw,
		hex: () => Ew,
		hostname: () => Tw,
		httpUrl: () => WC,
		includes: () => _x,
		instanceof: () => TE,
		int: () => jw,
		int32: () => Pw,
		int64: () => Vw,
		intersection: () => yT,
		ipv4: () => ow,
		ipv6: () => uw,
		iso: () => aC,
		json: () => DE,
		jwt: () => Sw,
		keyof: () => sT,
		ksuid: () => iw,
		lazy: () => pE,
		length: () => px,
		literal: () => PT,
		locales: () => qy,
		looseObject: () => dT,
		looseRecord: () => TT,
		lowercase: () => hx,
		lt: () => $b,
		lte: () => ex,
		mac: () => cw,
		map: () => DT,
		maxLength: () => dx,
		maxSize: () => cx,
		meta: () => wE,
		mime: () => xx,
		minLength: () => fx,
		minSize: () => lx,
		multipleOf: () => sx,
		nan: () => rE,
		nanoid: () => JC,
		nativeEnum: () => MT,
		negative: () => ix,
		never: () => eT,
		nonnegative: () => ox,
		nonoptional: () => ZT,
		nonpositive: () => ax,
		normalize: () => Cx,
		null: () => Jw,
		nullable: () => WT,
		nullish: () => GT,
		number: () => kw,
		object: () => lT,
		optional: () => BT,
		overwrite: () => Sx,
		parse: () => _C,
		parseAsync: () => vC,
		partialRecord: () => wT,
		pipe: () => aE,
		positive: () => rx,
		prefault: () => YT,
		preprocess: () => OE,
		prettifyError: () => cm,
		promise: () => hE,
		property: () => bx,
		readonly: () => lE,
		record: () => CT,
		refine: () => xE,
		regex: () => mx,
		regexes: () => Nm,
		registry: () => Qy,
		safeDecode: () => EC,
		safeDecodeAsync: () => OC,
		safeEncode: () => TC,
		safeEncodeAsync: () => DC,
		safeParse: () => yC,
		safeParseAsync: () => bC,
		set: () => kT,
		setErrorMap: () => AE,
		size: () => ux,
		slugify: () => Dx,
		startsWith: () => vx,
		strictObject: () => uT,
		string: () => MC,
		stringFormat: () => ww,
		stringbool: () => EE,
		success: () => $T,
		superRefine: () => SE,
		symbol: () => Ww,
		templateLiteral: () => dE,
		toJSONSchema: () => eC,
		toLowerCase: () => Tx,
		toUpperCase: () => Ex,
		transform: () => RT,
		treeifyError: () => om,
		trim: () => wx,
		tuple: () => xT,
		uint32: () => Fw,
		uint64: () => Hw,
		ulid: () => ew,
		undefined: () => Kw,
		union: () => pT,
		unknown: () => Qw,
		uppercase: () => gx,
		url: () => UC,
		util: () => Xf,
		uuid: () => RC,
		uuidv4: () => zC,
		uuidv6: () => BC,
		uuidv7: () => VC,
		void: () => nT,
		xid: () => nw,
		xor: () => hT,
	},
	1,
);
Yf(_v());
var KE = GE,
	qE = r(c(), 1);
function JE(e) {
	if (!e || typeof document > `u`) return;
	const t = document.head || document.getElementsByTagName(`head`)[0],
		n = document.createElement(`style`);
	(n.type = `text/css`),
		t.appendChild(n),
		n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e));
}
var YE = (e) => {
		switch (e) {
			case `success`:
				return QE;
			case `info`:
				return eD;
			case `warning`:
				return $E;
			case `error`:
				return tD;
			default:
				return null;
		}
	},
	XE = Array(12).fill(0),
	ZE = ({ visible: e, className: t }) =>
		u.createElement(
			`div`,
			{ className: [`sonner-loading-wrapper`, t].filter(Boolean).join(` `), "data-visible": e },
			u.createElement(
				`div`,
				{ className: `sonner-spinner` },
				XE.map((e, t) => u.createElement(`div`, { className: `sonner-loading-bar`, key: `spinner-bar-${t}` })),
			),
		),
	QE = u.createElement(
		`svg`,
		{ xmlns: `http://www.w3.org/2000/svg`, viewBox: `0 0 20 20`, fill: `currentColor`, height: `20`, width: `20` },
		u.createElement(`path`, {
			fillRule: `evenodd`,
			d: `M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z`,
			clipRule: `evenodd`,
		}),
	),
	$E = u.createElement(
		`svg`,
		{ xmlns: `http://www.w3.org/2000/svg`, viewBox: `0 0 24 24`, fill: `currentColor`, height: `20`, width: `20` },
		u.createElement(`path`, {
			fillRule: `evenodd`,
			d: `M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z`,
			clipRule: `evenodd`,
		}),
	),
	eD = u.createElement(
		`svg`,
		{ xmlns: `http://www.w3.org/2000/svg`, viewBox: `0 0 20 20`, fill: `currentColor`, height: `20`, width: `20` },
		u.createElement(`path`, {
			fillRule: `evenodd`,
			d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z`,
			clipRule: `evenodd`,
		}),
	),
	tD = u.createElement(
		`svg`,
		{ xmlns: `http://www.w3.org/2000/svg`, viewBox: `0 0 20 20`, fill: `currentColor`, height: `20`, width: `20` },
		u.createElement(`path`, {
			fillRule: `evenodd`,
			d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z`,
			clipRule: `evenodd`,
		}),
	),
	nD = u.createElement(
		`svg`,
		{
			xmlns: `http://www.w3.org/2000/svg`,
			width: `12`,
			height: `12`,
			viewBox: `0 0 24 24`,
			fill: `none`,
			stroke: `currentColor`,
			strokeWidth: `1.5`,
			strokeLinecap: `round`,
			strokeLinejoin: `round`,
		},
		u.createElement(`line`, { x1: `18`, y1: `6`, x2: `6`, y2: `18` }),
		u.createElement(`line`, { x1: `6`, y1: `6`, x2: `18`, y2: `18` }),
	),
	rD = () => {
		const [e, t] = u.useState(document.hidden);
		return (
			u.useEffect(() => {
				const e = () => {
					t(document.hidden);
				};
				return (
					document.addEventListener(`visibilitychange`, e), () => window.removeEventListener(`visibilitychange`, e)
				);
			}, []),
			e
		);
	},
	iD = 1,
	aD = new (class {
		constructor() {
			(this.subscribe = (e) => (
				this.subscribers.push(e),
				() => {
					const t = this.subscribers.indexOf(e);
					this.subscribers.splice(t, 1);
				}
			)),
				(this.publish = (e) => {
					this.subscribers.forEach((t) => t(e));
				}),
				(this.addToast = (e) => {
					this.publish(e), (this.toasts = [...this.toasts, e]);
				}),
				(this.create = (e) => {
					const { message: t, ...n } = e,
						r = typeof e?.id == `number` || e.id?.length > 0 ? e.id : iD++,
						i = this.toasts.find((e) => e.id === r),
						a = e.dismissible === void 0 ? !0 : e.dismissible;
					return (
						this.dismissedToasts.has(r) && this.dismissedToasts.delete(r),
						i
							? (this.toasts = this.toasts.map((n) =>
									n.id === r
										? (this.publish({ ...n, ...e, id: r, title: t }), { ...n, ...e, id: r, dismissible: a, title: t })
										: n,
								))
							: this.addToast({ title: t, ...n, dismissible: a, id: r }),
						r
					);
				}),
				(this.dismiss = (e) => (
					e
						? (this.dismissedToasts.add(e),
							requestAnimationFrame(() => this.subscribers.forEach((t) => t({ id: e, dismiss: !0 }))))
						: this.toasts.forEach((e) => {
								this.subscribers.forEach((t) => t({ id: e.id, dismiss: !0 }));
							}),
					e
				)),
				(this.message = (e, t) => this.create({ ...t, message: e })),
				(this.error = (e, t) => this.create({ ...t, message: e, type: `error` })),
				(this.success = (e, t) => this.create({ ...t, type: `success`, message: e })),
				(this.info = (e, t) => this.create({ ...t, type: `info`, message: e })),
				(this.warning = (e, t) => this.create({ ...t, type: `warning`, message: e })),
				(this.loading = (e, t) => this.create({ ...t, type: `loading`, message: e })),
				(this.promise = (e, t) => {
					if (!t) return;
					let n;
					t.loading !== void 0 &&
						(n = this.create({
							...t,
							promise: e,
							type: `loading`,
							message: t.loading,
							description: typeof t.description == `function` ? void 0 : t.description,
						}));
					let r = Promise.resolve(e instanceof Function ? e() : e),
						i = n !== void 0,
						a,
						o = r
							.then(async (e) => {
								if (((a = [`resolve`, e]), u.isValidElement(e)))
									(i = !1), this.create({ id: n, type: `default`, message: e });
								else if (sD(e) && !e.ok) {
									i = !1;
									const r = typeof t.error == `function` ? await t.error(`HTTP error! status: ${e.status}`) : t.error,
										a =
											typeof t.description == `function`
												? await t.description(`HTTP error! status: ${e.status}`)
												: t.description,
										o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r };
									this.create({ id: n, type: `error`, description: a, ...o });
								} else if (e instanceof Error) {
									i = !1;
									const r = typeof t.error == `function` ? await t.error(e) : t.error,
										a = typeof t.description == `function` ? await t.description(e) : t.description,
										o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r };
									this.create({ id: n, type: `error`, description: a, ...o });
								} else if (t.success !== void 0) {
									i = !1;
									const r = typeof t.success == `function` ? await t.success(e) : t.success,
										a = typeof t.description == `function` ? await t.description(e) : t.description,
										o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r };
									this.create({ id: n, type: `success`, description: a, ...o });
								}
							})
							.catch(async (e) => {
								if (((a = [`reject`, e]), t.error !== void 0)) {
									i = !1;
									const r = typeof t.error == `function` ? await t.error(e) : t.error,
										a = typeof t.description == `function` ? await t.description(e) : t.description,
										o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r };
									this.create({ id: n, type: `error`, description: a, ...o });
								}
							})
							.finally(() => {
								i && (this.dismiss(n), (n = void 0)), t.finally == null || t.finally.call(t);
							}),
						s = () => new Promise((e, t) => o.then(() => (a[0] === `reject` ? t(a[1]) : e(a[1]))).catch(t));
					return typeof n != `string` && typeof n != `number` ? { unwrap: s } : Object.assign(n, { unwrap: s });
				}),
				(this.custom = (e, t) => {
					const n = t?.id || iD++;
					return this.create({ jsx: e(n), id: n, ...t }), n;
				}),
				(this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id))),
				(this.subscribers = []),
				(this.toasts = []),
				(this.dismissedToasts = new Set());
		}
	})(),
	oD = (e, t) => {
		const n = t?.id || iD++;
		return aD.addToast({ title: e, ...t, id: n }), n;
	},
	sD = (e) =>
		e && typeof e == `object` && `ok` in e && typeof e.ok == `boolean` && `status` in e && typeof e.status == `number`,
	cD = oD,
	lD = Object.assign(
		cD,
		{
			success: aD.success,
			info: aD.info,
			warning: aD.warning,
			error: aD.error,
			custom: aD.custom,
			message: aD.message,
			promise: aD.promise,
			dismiss: aD.dismiss,
			loading: aD.loading,
		},
		{ getHistory: () => aD.toasts, getToasts: () => aD.getActiveToasts() },
	);
JE(
	`[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`,
);
function uD(e) {
	return e.label !== void 0;
}
var dD = 3,
	fD = `24px`,
	pD = `16px`,
	mD = 4e3,
	hD = 356,
	gD = 14,
	_D = 45,
	vD = 200;
function yD(...e) {
	return e.filter(Boolean).join(` `);
}
function bD(e) {
	const [t, n] = e.split(`-`),
		r = [];
	return t && r.push(t), n && r.push(n), r;
}
var xD = (e) => {
	const {
			invert: t,
			toast: n,
			unstyled: r,
			interacting: i,
			setHeights: a,
			visibleToasts: o,
			heights: s,
			index: c,
			toasts: l,
			expanded: d,
			removeToast: f,
			defaultRichColors: p,
			closeButton: m,
			style: h,
			cancelButtonStyle: g,
			actionButtonStyle: _,
			className: v = ``,
			descriptionClassName: y = ``,
			duration: b,
			position: x,
			gap: S,
			expandByDefault: ee,
			classNames: C,
			icons: w,
			closeButtonAriaLabel: te = `Close toast`,
		} = e,
		[ne, re] = u.useState(null),
		[ie, ae] = u.useState(null),
		[oe, se] = u.useState(!1),
		[ce, T] = u.useState(!1),
		[le, E] = u.useState(!1),
		[ue, de] = u.useState(!1),
		[D, fe] = u.useState(!1),
		[pe, me] = u.useState(0),
		[O, he] = u.useState(0),
		ge = u.useRef(n.duration || b || mD),
		_e = u.useRef(null),
		ve = u.useRef(null),
		ye = c === 0,
		be = c + 1 <= o,
		xe = n.type,
		Se = n.dismissible !== !1,
		Ce = n.className || ``,
		we = n.descriptionClassName || ``,
		Te = u.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]),
		Ee = u.useMemo(() => n.closeButton ?? m, [n.closeButton, m]),
		De = u.useMemo(() => n.duration || b || mD, [n.duration, b]),
		Oe = u.useRef(0),
		ke = u.useRef(0),
		Ae = u.useRef(0),
		je = u.useRef(null),
		[Me, Ne] = x.split(`-`),
		Pe = u.useMemo(() => s.reduce((e, t, n) => (n >= Te ? e : e + t.height), 0), [s, Te]),
		Fe = rD(),
		Ie = n.invert || t,
		Le = xe === `loading`;
	(ke.current = u.useMemo(() => Te * S + Pe, [Te, Pe])),
		u.useEffect(() => {
			ge.current = De;
		}, [De]),
		u.useEffect(() => {
			se(!0);
		}, []),
		u.useEffect(() => {
			const e = ve.current;
			if (e) {
				const t = e.getBoundingClientRect().height;
				return (
					he(t),
					a((e) => [{ toastId: n.id, height: t, position: n.position }, ...e]),
					() => a((e) => e.filter((e) => e.toastId !== n.id))
				);
			}
		}, [a, n.id]),
		u.useLayoutEffect(() => {
			if (!oe) return;
			const e = ve.current,
				t = e.style.height;
			e.style.height = `auto`;
			const r = e.getBoundingClientRect().height;
			(e.style.height = t),
				he(r),
				a((e) =>
					e.find((e) => e.toastId === n.id)
						? e.map((e) => (e.toastId === n.id ? { ...e, height: r } : e))
						: [{ toastId: n.id, height: r, position: n.position }, ...e],
				);
		}, [oe, n.title, n.description, a, n.id, n.jsx, n.action, n.cancel]);
	const Re = u.useCallback(() => {
		T(!0),
			me(ke.current),
			a((e) => e.filter((e) => e.toastId !== n.id)),
			setTimeout(() => {
				f(n);
			}, vD);
	}, [n, f, a, ke]);
	u.useEffect(() => {
		if ((n.promise && xe === `loading`) || n.duration === 1 / 0 || n.type === `loading`) return;
		let e;
		return (
			d || i || Fe
				? (() => {
						if (Ae.current < Oe.current) {
							const e = new Date().getTime() - Oe.current;
							ge.current -= e;
						}
						Ae.current = new Date().getTime();
					})()
				: ge.current !== 1 / 0 &&
					((Oe.current = new Date().getTime()),
					(e = setTimeout(() => {
						n.onAutoClose == null || n.onAutoClose.call(n, n), Re();
					}, ge.current))),
			() => clearTimeout(e)
		);
	}, [d, i, n, xe, Fe, Re]),
		u.useEffect(() => {
			n.delete && (Re(), n.onDismiss == null || n.onDismiss.call(n, n));
		}, [Re, n.delete]);
	function ze() {
		return w?.loading
			? u.createElement(
					`div`,
					{ className: yD(C?.loader, n?.classNames?.loader, `sonner-loader`), "data-visible": xe === `loading` },
					w.loading,
				)
			: u.createElement(ZE, { className: yD(C?.loader, n?.classNames?.loader), visible: xe === `loading` });
	}
	const Be = n.icon || w?.[xe] || YE(xe);
	return u.createElement(
		`li`,
		{
			tabIndex: 0,
			ref: ve,
			className: yD(v, Ce, C?.toast, n?.classNames?.toast, C?.default, C?.[xe], n?.classNames?.[xe]),
			"data-sonner-toast": ``,
			"data-rich-colors": n.richColors ?? p,
			"data-styled": !(n.jsx || n.unstyled || r),
			"data-mounted": oe,
			"data-promise": !!n.promise,
			"data-swiped": D,
			"data-removed": ce,
			"data-visible": be,
			"data-y-position": Me,
			"data-x-position": Ne,
			"data-index": c,
			"data-front": ye,
			"data-swiping": le,
			"data-dismissible": Se,
			"data-type": xe,
			"data-invert": Ie,
			"data-swipe-out": ue,
			"data-swipe-direction": ie,
			"data-expanded": !!(d || (ee && oe)),
			"data-testid": n.testId,
			style: {
				"--index": c,
				"--toasts-before": c,
				"--z-index": l.length - c,
				"--offset": `${ce ? pe : ke.current}px`,
				"--initial-height": ee ? `auto` : `${O}px`,
				...h,
				...n.style,
			},
			onDragEnd: () => {
				E(!1), re(null), (je.current = null);
			},
			onPointerDown: (e) => {
				e.button !== 2 &&
					(Le ||
						!Se ||
						((_e.current = new Date()),
						me(ke.current),
						e.target.setPointerCapture(e.pointerId),
						e.target.tagName !== `BUTTON` && (E(!0), (je.current = { x: e.clientX, y: e.clientY }))));
			},
			onPointerUp: () => {
				if (ue || !Se) return;
				je.current = null;
				const e = Number(ve.current?.style.getPropertyValue(`--swipe-amount-x`).replace(`px`, ``) || 0),
					t = Number(ve.current?.style.getPropertyValue(`--swipe-amount-y`).replace(`px`, ``) || 0),
					r = new Date().getTime() - _e.current?.getTime(),
					i = ne === `x` ? e : t,
					a = Math.abs(i) / r;
				if (Math.abs(i) >= _D || a > 0.11) {
					me(ke.current),
						n.onDismiss == null || n.onDismiss.call(n, n),
						ae(ne === `x` ? (e > 0 ? `right` : `left`) : t > 0 ? `down` : `up`),
						Re(),
						de(!0);
					return;
				} else {
					var o, s;
					(o = ve.current) == null || o.style.setProperty(`--swipe-amount-x`, `0px`),
						(s = ve.current) == null || s.style.setProperty(`--swipe-amount-y`, `0px`);
				}
				fe(!1), E(!1), re(null);
			},
			onPointerMove: (t) => {
				var n, r;
				if (!je.current || !Se || window.getSelection()?.toString().length > 0) return;
				const i = t.clientY - je.current.y,
					a = t.clientX - je.current.x,
					o = e.swipeDirections ?? bD(x);
				!ne && (Math.abs(a) > 1 || Math.abs(i) > 1) && re(Math.abs(a) > Math.abs(i) ? `x` : `y`);
				const s = { x: 0, y: 0 },
					c = (e) => 1 / (1.5 + Math.abs(e) / 20);
				if (ne === `y`) {
					if (o.includes(`top`) || o.includes(`bottom`))
						if ((o.includes(`top`) && i < 0) || (o.includes(`bottom`) && i > 0)) s.y = i;
						else {
							const e = i * c(i);
							s.y = Math.abs(e) < Math.abs(i) ? e : i;
						}
				} else if (ne === `x` && (o.includes(`left`) || o.includes(`right`)))
					if ((o.includes(`left`) && a < 0) || (o.includes(`right`) && a > 0)) s.x = a;
					else {
						const e = a * c(a);
						s.x = Math.abs(e) < Math.abs(a) ? e : a;
					}
				(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && fe(!0),
					(n = ve.current) == null || n.style.setProperty(`--swipe-amount-x`, `${s.x}px`),
					(r = ve.current) == null || r.style.setProperty(`--swipe-amount-y`, `${s.y}px`);
			},
		},
		Ee && !n.jsx && xe !== `loading`
			? u.createElement(
					`button`,
					{
						"aria-label": te,
						"data-disabled": Le,
						"data-close-button": !0,
						onClick:
							Le || !Se
								? () => {}
								: () => {
										Re(), n.onDismiss == null || n.onDismiss.call(n, n);
									},
						className: yD(C?.closeButton, n?.classNames?.closeButton),
					},
					w?.close ?? nD,
				)
			: null,
		(xe || n.icon || n.promise) && n.icon !== null && (w?.[xe] !== null || n.icon)
			? u.createElement(
					`div`,
					{ "data-icon": ``, className: yD(C?.icon, n?.classNames?.icon) },
					n.promise || (n.type === `loading` && !n.icon) ? n.icon || ze() : null,
					n.type === `loading` ? null : Be,
				)
			: null,
		u.createElement(
			`div`,
			{ "data-content": ``, className: yD(C?.content, n?.classNames?.content) },
			u.createElement(
				`div`,
				{ "data-title": ``, className: yD(C?.title, n?.classNames?.title) },
				n.jsx ? n.jsx : typeof n.title == `function` ? n.title() : n.title,
			),
			n.description
				? u.createElement(
						`div`,
						{ "data-description": ``, className: yD(y, we, C?.description, n?.classNames?.description) },
						typeof n.description == `function` ? n.description() : n.description,
					)
				: null,
		),
		u.isValidElement(n.cancel)
			? n.cancel
			: n.cancel && uD(n.cancel)
				? u.createElement(
						`button`,
						{
							"data-button": !0,
							"data-cancel": !0,
							style: n.cancelButtonStyle || g,
							onClick: (e) => {
								uD(n.cancel) && Se && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Re());
							},
							className: yD(C?.cancelButton, n?.classNames?.cancelButton),
						},
						n.cancel.label,
					)
				: null,
		u.isValidElement(n.action)
			? n.action
			: n.action && uD(n.action)
				? u.createElement(
						`button`,
						{
							"data-button": !0,
							"data-action": !0,
							style: n.actionButtonStyle || _,
							onClick: (e) => {
								uD(n.action) &&
									(n.action.onClick == null || n.action.onClick.call(n.action, e), !e.defaultPrevented && Re());
							},
							className: yD(C?.actionButton, n?.classNames?.actionButton),
						},
						n.action.label,
					)
				: null,
	);
};
function SD() {
	if (typeof window > `u` || typeof document > `u`) return `ltr`;
	const e = document.documentElement.getAttribute(`dir`);
	return e === `auto` || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function CD(e, t) {
	const n = {};
	return (
		[e, t].forEach((e, t) => {
			const r = t === 1,
				i = r ? `--mobile-offset` : `--offset`,
				a = r ? pD : fD;
			function o(e) {
				[`top`, `right`, `bottom`, `left`].forEach((t) => {
					n[`${i}-${t}`] = typeof e == `number` ? `${e}px` : e;
				});
			}
			typeof e == `number` || typeof e == `string`
				? o(e)
				: typeof e == `object`
					? [`top`, `right`, `bottom`, `left`].forEach((t) => {
							e[t] === void 0 ? (n[`${i}-${t}`] = a) : (n[`${i}-${t}`] = typeof e[t] == `number` ? `${e[t]}px` : e[t]);
						})
					: o(a);
		}),
		n
	);
}
var wD = u.forwardRef((e, t) => {
		const {
				id: n,
				invert: r,
				position: i = `bottom-right`,
				hotkey: a = [`altKey`, `KeyT`],
				expand: o,
				closeButton: s,
				className: c,
				offset: l,
				mobileOffset: d,
				theme: f = `light`,
				richColors: p,
				duration: m,
				style: h,
				visibleToasts: g = dD,
				toastOptions: _,
				dir: v = SD(),
				gap: y = gD,
				icons: b,
				containerAriaLabel: x = `Notifications`,
			} = e,
			[S, ee] = u.useState([]),
			C = u.useMemo(() => (n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId)), [S, n]),
			w = u.useMemo(() => Array.from(new Set([i].concat(C.filter((e) => e.position).map((e) => e.position)))), [C, i]),
			[te, ne] = u.useState([]),
			[re, ie] = u.useState(!1),
			[ae, oe] = u.useState(!1),
			[se, ce] = u.useState(
				f === `system`
					? typeof window < `u` && window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches
						? `dark`
						: `light`
					: f,
			),
			T = u.useRef(null),
			le = a.join(`+`).replace(/Key/g, ``).replace(/Digit/g, ``),
			E = u.useRef(null),
			ue = u.useRef(!1),
			de = u.useCallback((e) => {
				ee((t) => (t.find((t) => t.id === e.id)?.delete || aD.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
			}, []);
		return (
			u.useEffect(
				() =>
					aD.subscribe((e) => {
						if (e.dismiss) {
							requestAnimationFrame(() => {
								ee((t) => t.map((t) => (t.id === e.id ? { ...t, delete: !0 } : t)));
							});
							return;
						}
						setTimeout(() => {
							qE.flushSync(() => {
								ee((t) => {
									const n = t.findIndex((t) => t.id === e.id);
									return n === -1 ? [e, ...t] : [...t.slice(0, n), { ...t[n], ...e }, ...t.slice(n + 1)];
								});
							});
						});
					}),
				[S],
			),
			u.useEffect(() => {
				if (f !== `system`) {
					ce(f);
					return;
				}
				if (
					(f === `system` &&
						(window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches ? ce(`dark`) : ce(`light`)),
					typeof window > `u`)
				)
					return;
				const e = window.matchMedia(`(prefers-color-scheme: dark)`);
				try {
					e.addEventListener(`change`, ({ matches: e }) => {
						ce(e ? `dark` : `light`);
					});
				} catch {
					e.addListener(({ matches: e }) => {
						try {
							ce(e ? `dark` : `light`);
						} catch (e) {
							console.error(e);
						}
					});
				}
			}, [f]),
			u.useEffect(() => {
				S.length <= 1 && ie(!1);
			}, [S]),
			u.useEffect(() => {
				const e = (e) => {
					if (a.every((t) => e[t] || e.code === t)) {
						var t;
						ie(!0), (t = T.current) == null || t.focus();
					}
					e.code === `Escape` &&
						(document.activeElement === T.current || T.current?.contains(document.activeElement)) &&
						ie(!1);
				};
				return document.addEventListener(`keydown`, e), () => document.removeEventListener(`keydown`, e);
			}, [a]),
			u.useEffect(() => {
				if (T.current)
					return () => {
						E.current && (E.current.focus({ preventScroll: !0 }), (E.current = null), (ue.current = !1));
					};
			}, [T.current]),
			u.createElement(
				`section`,
				{
					ref: t,
					"aria-label": `${x} ${le}`,
					tabIndex: -1,
					"aria-live": `polite`,
					"aria-relevant": `additions text`,
					"aria-atomic": `false`,
					suppressHydrationWarning: !0,
				},
				w.map((t, n) => {
					const [i, a] = t.split(`-`);
					return C.length
						? u.createElement(
								`ol`,
								{
									key: t,
									dir: v === `auto` ? SD() : v,
									tabIndex: -1,
									ref: T,
									className: c,
									"data-sonner-toaster": !0,
									"data-sonner-theme": se,
									"data-y-position": i,
									"data-x-position": a,
									style: {
										"--front-toast-height": `${te[0]?.height || 0}px`,
										"--width": `${hD}px`,
										"--gap": `${y}px`,
										...h,
										...CD(l, d),
									},
									onBlur: (e) => {
										ue.current &&
											!e.currentTarget.contains(e.relatedTarget) &&
											((ue.current = !1), (E.current &&= (E.current.focus({ preventScroll: !0 }), null)));
									},
									onFocus: (e) => {
										(e.target instanceof HTMLElement && e.target.dataset.dismissible === `false`) ||
											ue.current ||
											((ue.current = !0), (E.current = e.relatedTarget));
									},
									onMouseEnter: () => ie(!0),
									onMouseMove: () => ie(!0),
									onMouseLeave: () => {
										ae || ie(!1);
									},
									onDragEnd: () => ie(!1),
									onPointerDown: (e) => {
										(e.target instanceof HTMLElement && e.target.dataset.dismissible === `false`) || oe(!0);
									},
									onPointerUp: () => oe(!1),
								},
								C.filter((e) => (!e.position && n === 0) || e.position === t).map((n, i) =>
									u.createElement(xD, {
										key: n.id,
										icons: b,
										index: i,
										toast: n,
										defaultRichColors: p,
										duration: _?.duration ?? m,
										className: _?.className,
										descriptionClassName: _?.descriptionClassName,
										invert: r,
										visibleToasts: g,
										closeButton: _?.closeButton ?? s,
										interacting: ae,
										position: t,
										style: _?.style,
										unstyled: _?.unstyled,
										classNames: _?.classNames,
										cancelButtonStyle: _?.cancelButtonStyle,
										actionButtonStyle: _?.actionButtonStyle,
										closeButtonAriaLabel: _?.closeButtonAriaLabel,
										removeToast: de,
										toasts: C.filter((e) => e.position == n.position),
										heights: te.filter((e) => e.position == n.position),
										setHeights: ne,
										expandByDefault: o,
										gap: y,
										expanded: re,
										swipeDirections: e.swipeDirections,
									}),
								),
							)
						: null;
				}),
			)
		);
	}),
	TD = `modulepreload`,
	ED = (e) => `/` + e,
	DD = {};
const OD = (e, t, n) => {
	let r = Promise.resolve();
	if (t && t.length > 0) {
		const e = document.getElementsByTagName(`link`),
			i = document.querySelector(`meta[property=csp-nonce]`),
			a = i?.nonce || i?.getAttribute(`nonce`);
		function o(e) {
			return Promise.all(
				e.map((e) =>
					Promise.resolve(e).then(
						(e) => ({ status: `fulfilled`, value: e }),
						(e) => ({ status: `rejected`, reason: e }),
					),
				),
			);
		}
		r = o(
			t.map((t) => {
				if (((t = ED(t, n)), t in DD)) return;
				DD[t] = !0;
				const r = t.endsWith(`.css`),
					i = r ? `[rel="stylesheet"]` : ``;
				if (n)
					for (let n = e.length - 1; n >= 0; n--) {
						const i = e[n];
						if (i.href === t && (!r || i.rel === `stylesheet`)) return;
					}
				else if (document.querySelector(`link[href="${t}"]${i}`)) return;
				const o = document.createElement(`link`);
				if (
					((o.rel = r ? `stylesheet` : TD),
					r || (o.as = `script`),
					(o.crossOrigin = ``),
					(o.href = t),
					a && o.setAttribute(`nonce`, a),
					document.head.appendChild(o),
					r)
				)
					return new Promise((e, n) => {
						o.addEventListener(`load`, e),
							o.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`)));
					});
			}),
		);
	}
	function i(e) {
		const t = new Event(`vite:preloadError`, { cancelable: !0 });
		if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e;
	}
	return r.then((t) => {
		for (const e of t || []) e.status === `rejected` && i(e.reason);
		return e().catch(i);
	});
};
export {
	c as $,
	$c as A,
	N as B,
	Lf as C,
	tf as D,
	kf as E,
	oi as F,
	oe as G,
	k as H,
	ci as I,
	w as J,
	ie as K,
	Xr as L,
	kc as M,
	Ui as N,
	Iu as O,
	F as P,
	x as Q,
	Ln as R,
	Nf as S,
	Mf as T,
	ue as U,
	Ye as V,
	le as W,
	S as X,
	C as Y,
	ee as Z,
	nm as _,
	VE as a,
	Uf as b,
	PC as c,
	OE as d,
	MC as f,
	fm as g,
	um as h,
	KE as i,
	Bc as j,
	bl as k,
	dT as l,
	hC as m,
	wD as n,
	oT as o,
	UC as p,
	ne as q,
	lD as r,
	Lw as s,
	OD as t,
	lT as u,
	im as v,
	jf as w,
	Pf as x,
	Hf as y,
	Tn as z,
};
