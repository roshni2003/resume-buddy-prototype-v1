const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"assets/resumes-DJqQXz0n.js",
			"assets/preload-helper-DwC0sqXt.js",
			"assets/jsx-runtime-D7jARjhZ.js",
			"assets/react-BZSX5Bs9.js",
			"assets/get-strict-context-DJn2x5wH.js",
			"assets/dropdown-menu-BDYKGr0V.js",
			"assets/dist-DKdYDXPR.js",
			"assets/dist-C-d3ELl8.js",
			"assets/badge-BlEOZEch.js",
			"assets/Check.es-BCVTpq-8.js",
			"assets/alert-dialog-B7DDo-NI.js",
			"assets/input-DIek8tFf.js",
			"assets/useMutation-CUlWnMMx.js",
			"assets/multiple-combobox-H_LL6Cck.js",
			"assets/separator-E8i2irOi.js",
			"assets/route-YyFGB8Ug.js",
			"assets/useStore-KX9e-E04.js",
			"assets/with-selector-DTFISeXP.js",
			"assets/dist-Dj3RpNtB.js",
			"assets/api-BDc_pfcq.js",
		]),
) => i.map((i) => d[i]);
import { q as g, K as h, G as m } from "./badge-BlEOZEch.js";
import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { n as f, t as p } from "./lazyRouteComponent-DBGst3ji.js";
import { M as a, R as c, H as i, i as l, O as o, D as r, P as s, t as u } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";
import { P as d } from "./useStore-KX9e-E04.js";
function _(e) {
	return ({ search: t, next: n }) => {
		if (e === !0) return {};
		const r = { ...n(t) };
		return (
			Array.isArray(e)
				? e.forEach((e) => {
						delete r[e];
					})
				: Object.entries(e).forEach(([e, t]) => {
						d(r[e], t) && delete r[e];
					}),
			r
		);
	};
}
function v(e, t, n = {}) {
	let r = e.get(),
		a = null,
		o = r,
		l,
		u = typeof r == `string` ? r.replace(/[\d.-]/g, ``) : void 0,
		d = () => {
			a &&= (a.stop(), null);
		},
		f = () => {
			d();
			const t = b(e.get()),
				r = b(o);
			t !== r &&
				(a = new c({
					keyframes: [t, r],
					velocity: e.getVelocity(),
					type: `spring`,
					restDelta: 0.001,
					restSpeed: 0.01,
					...n,
					onUpdate: l,
				}));
		};
	if (
		(e.attach((t, n) => {
			(o = t),
				(l = (e) => n(y(e, u))),
				i.postRender(() => {
					f(),
						e.events.animationStart?.notify(),
						a?.then(() => {
							e.events.animationComplete?.notify();
						});
				});
		}, d),
		s(t))
	) {
		const n = t.on(`change`, (t) => e.set(y(t, u))),
			r = e.on(`destroy`, n);
		return () => {
			n(), r();
		};
	}
	return d;
}
function y(e, t) {
	return t ? e + t : e;
}
function b(e) {
	return typeof e == `number` ? e : parseFloat(e);
}
function x(e, ...t) {
	const n = e.length;
	function r() {
		let r = ``;
		for (let i = 0; i < n; i++) {
			r += e[i];
			const n = t[i];
			n && (r += s(n) ? n.get() : n);
		}
		return r;
	}
	return h(t.filter(s), r);
}
var S = e(n(), 1);
function C(e, t = {}) {
	const { isStatic: n } = (0, S.useContext)(a),
		r = () => (s(e) ? e.get() : e);
	if (n) return m(r);
	const i = g(r());
	return (0, S.useInsertionEffect)(() => v(i, e, t), [i, JSON.stringify(t)]), i;
}
function w(e, t = {}) {
	return C(e, { type: `spring`, ...t });
}
var T = e(t(), 1);
const E = ({
	rotateDepth: e = 17.5,
	translateDepth: t = 20,
	glareOpacity: n = 0.4,
	scaleFactor: i = 1.05,
	className: a,
	children: s,
}) => {
	const c = (0, S.useRef)(null),
		l = typeof window < `u` && window.innerWidth < 640,
		u = g(0),
		d = g(0),
		f = w(u),
		p = w(d),
		h = m(p, [-0.5, 0.5], [`-${e}deg`, `${e}deg`]),
		_ = m(f, [-0.5, 0.5], [`${e}deg`, `-${e}deg`]),
		v = m(f, [-0.5, 0.5], [`-${t}px`, `${t}px`]),
		y = m(p, [-0.5, 0.5], [`${t}px`, `-${t}px`]),
		b = x`radial-gradient(circle at ${m(f, [-0.5, 0.5], [0, 100])}% ${m(p, [-0.5, 0.5], [0, 100])}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;
	return (0, T.jsx)(`div`, {
		className: r(`perspective-distant transform-3d`, a),
		children: (0, T.jsxs)(o.div, {
			ref: c,
			initial: { scale: 1, z: 0 },
			className: `relative rounded-md`,
			style: { rotateX: h, rotateY: _, translateX: v, translateY: y, transformStyle: `preserve-3d` },
			whileHover: l ? {} : { z: 50, scale: i, transition: { duration: 0.2 } },
			onMouseMove: (e) => {
				if (!c.current) return;
				const t = c.current.getBoundingClientRect(),
					n = t.width,
					r = t.height,
					i = e.clientX - t.left,
					a = e.clientY - t.top,
					o = i / n - 0.5,
					s = a / r - 0.5;
				u.set(o), d.set(s);
			},
			onMouseLeave: () => {
				u.set(0), d.set(0);
			},
			children: [
				s,
				(0, T.jsx)(o.div, {
					transition: { duration: 0.2 },
					style: { background: b, opacity: n },
					className: `pointer-events-none absolute inset-0 z-50 h-full w-full rounded-md mix-blend-overlay`,
				}),
			],
		}),
	});
};
var D = (e) => {
		const t = `input` in e ? e.input : `input`,
			n = `output` in e ? e.output : `output`,
			r = `schema` in e ? e.schema._input : e._input,
			i = `schema` in e ? e.schema._output : e._output;
		return {
			types: { input: t === `output` ? i : r, output: n === `input` ? r : i },
			parse: (t) => (`schema` in e ? e.schema.parse(t) : e.parse(t)),
		};
	},
	O = () =>
		u(
			() => import(`./resumes-DJqQXz0n.js`),
			__vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
		),
	k = l.object({
		tags: l.array(l.string()).default([]),
		sort: l.enum([`lastUpdatedAt`, `createdAt`, `name`]).default(`lastUpdatedAt`),
	});
const A = f(`/dashboard/resumes/`)({
	component: p(O, `component`),
	validateSearch: D(k),
	search: { middlewares: [_({ tags: [], sort: `lastUpdatedAt` })] },
});
export { D as n, E as r, A as t };
