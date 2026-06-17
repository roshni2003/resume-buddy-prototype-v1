import { n as e, o as t } from "./jsx-runtime-D7jARjhZ.js";
import { t as n } from "./react-BZSX5Bs9.js";

var r = e((e, t) => {
		var n = `Expected a function`,
			r = NaN,
			i = `[object Symbol]`,
			a = /^\s+|\s+$/g,
			o = /^[-+]0x[0-9a-f]+$/i,
			s = /^0b[01]+$/i,
			c = /^0o[0-7]+$/i,
			l = parseInt,
			u = typeof global == `object` && global && global.Object === Object && global,
			d = typeof self == `object` && self && self.Object === Object && self,
			f = u || d || Function(`return this`)(),
			p = Object.prototype.toString,
			m = Math.max,
			h = Math.min,
			g = () => f.Date.now();
		function _(e, t, r) {
			var i,
				a,
				o,
				s,
				c,
				l,
				u = 0,
				d = !1,
				f = !1,
				p = !0;
			if (typeof e != `function`) throw TypeError(n);
			(t = x(t) || 0),
				v(r) &&
					((d = !!r.leading),
					(f = `maxWait` in r),
					(o = f ? m(x(r.maxWait) || 0, t) : o),
					(p = `trailing` in r ? !!r.trailing : p));
			function _(t) {
				var n = i,
					r = a;
				return (i = a = void 0), (u = t), (s = e.apply(r, n)), s;
			}
			function y(e) {
				return (u = e), (c = setTimeout(C, t)), d ? _(e) : s;
			}
			function b(e) {
				var n = e - l,
					r = e - u,
					i = t - n;
				return f ? h(i, o - r) : i;
			}
			function S(e) {
				var n = e - l,
					r = e - u;
				return l === void 0 || n >= t || n < 0 || (f && r >= o);
			}
			function C() {
				var e = g();
				if (S(e)) return w(e);
				c = setTimeout(C, b(e));
			}
			function w(e) {
				return (c = void 0), p && i ? _(e) : ((i = a = void 0), s);
			}
			function T() {
				c !== void 0 && clearTimeout(c), (u = 0), (i = l = a = c = void 0);
			}
			function E() {
				return c === void 0 ? s : w(g());
			}
			function D() {
				var e = g(),
					n = S(e);
				if (((i = arguments), (a = this), (l = e), n)) {
					if (c === void 0) return y(l);
					if (f) return (c = setTimeout(C, t)), _(l);
				}
				return c === void 0 && (c = setTimeout(C, t)), s;
			}
			return (D.cancel = T), (D.flush = E), D;
		}
		function v(e) {
			var t = typeof e;
			return !!e && (t == `object` || t == `function`);
		}
		function y(e) {
			return !!e && typeof e == `object`;
		}
		function b(e) {
			return typeof e == `symbol` || (y(e) && p.call(e) == i);
		}
		function x(e) {
			if (typeof e == `number`) return e;
			if (b(e)) return r;
			if (v(e)) {
				var t = typeof e.valueOf == `function` ? e.valueOf() : e;
				e = v(t) ? t + `` : t;
			}
			if (typeof e != `string`) return e === 0 ? e : +e;
			e = e.replace(a, ``);
			var n = s.test(e);
			return n || c.test(e) ? l(e.slice(2), n ? 2 : 8) : o.test(e) ? r : +e;
		}
		t.exports = _;
	}),
	i = t(n(), 1),
	a = t(r(), 1),
	o = typeof window < `u` ? i.useLayoutEffect : i.useEffect;
function s(e, t, n, r) {
	const a = (0, i.useRef)(t);
	o(() => {
		a.current = t;
	}, [t]),
		(0, i.useEffect)(() => {
			const t = n?.current ?? window;
			if (!(t && t.addEventListener)) return;
			const i = (e) => {
				a.current(e);
			};
			return (
				t.addEventListener(e, i, r),
				() => {
					t.removeEventListener(e, i, r);
				}
			);
		}, [e, n, r]);
}
function c(e) {
	const t = (0, i.useRef)(e);
	(t.current = e),
		(0, i.useEffect)(
			() => () => {
				t.current();
			},
			[],
		);
}
function l(e, t = 500, n) {
	const r = (0, i.useRef)();
	c(() => {
		r.current && r.current.cancel();
	});
	const o = (0, i.useMemo)(() => {
		const i = (0, a.default)(e, t, n),
			o = (...e) => i(...e);
		return (
			(o.cancel = () => {
				i.cancel();
			}),
			(o.isPending = () => !!r.current),
			(o.flush = () => i.flush()),
			o
		);
	}, [e, t, n]);
	return (
		(0, i.useEffect)(() => {
			r.current = (0, a.default)(e, t, n);
		}, [e, t, n]),
		o
	);
}
function u() {
	const e = (0, i.useRef)(!1);
	return (
		(0, i.useEffect)(
			() => (
				(e.current = !0),
				() => {
					e.current = !1;
				}
			),
			[],
		),
		(0, i.useCallback)(() => e.current, [])
	);
}
var d = { width: void 0, height: void 0 };
function f(e) {
	const { ref: t, box: n = `content-box` } = e,
		[{ width: r, height: a }, o] = (0, i.useState)(d),
		s = u(),
		c = (0, i.useRef)({ ...d }),
		l = (0, i.useRef)(void 0);
	return (
		(l.current = e.onResize),
		(0, i.useEffect)(() => {
			if (!t.current || typeof window > `u` || !(`ResizeObserver` in window)) return;
			const e = new ResizeObserver(([e]) => {
				const t =
						n === `border-box`
							? `borderBoxSize`
							: n === `device-pixel-content-box`
								? `devicePixelContentBoxSize`
								: `contentBoxSize`,
					r = p(e, t, `inlineSize`),
					i = p(e, t, `blockSize`);
				if (c.current.width !== r || c.current.height !== i) {
					const e = { width: r, height: i };
					(c.current.width = r), (c.current.height = i), l.current ? l.current(e) : s() && o(e);
				}
			});
			return (
				e.observe(t.current, { box: n }),
				() => {
					e.disconnect();
				}
			);
		}, [n, t, s]),
		{ width: r, height: a }
	);
}
function p(e, t, n) {
	return e[t]
		? Array.isArray(e[t])
			? e[t][0][n]
			: e[t][n]
		: t === `contentBoxSize`
			? e.contentRect[n === `inlineSize` ? `width` : `height`]
			: void 0;
}
var m = typeof window > `u`;
function h(e = {}) {
	let { initializeWithValue: t = !0 } = e;
	m && (t = !1);
	const [n, r] = (0, i.useState)(() =>
			t ? { width: window.innerWidth, height: window.innerHeight } : { width: void 0, height: void 0 },
		),
		a = l(r, e.debounceDelay);
	function c() {
		(e.debounceDelay ? a : r)({ width: window.innerWidth, height: window.innerHeight });
	}
	return (
		s(`resize`, c),
		o(() => {
			c();
		}, []),
		n
	);
}
export { h as i, u as n, f as r, l as t };
