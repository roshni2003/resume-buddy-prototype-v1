import { o as e } from "./jsx-runtime-D7jARjhZ.js";
import { t } from "./react-BZSX5Bs9.js";
import { n as i } from "./route-YyFGB8Ug.js";
import { c as n, z as r } from "./useStore-KX9e-E04.js";
function a(e) {
	return new o(e, { silent: !0 }).createRoute;
}
var o = class {
		constructor(e, t) {
			(this.path = e),
				(this.createRoute = (e) => {
					const t = i(e);
					return (t.isRoot = !1), t;
				}),
				(this.silent = t?.silent);
		}
	},
	s = e(t(), 1);
function c(e, t) {
	let i,
		a,
		o,
		c,
		l = () => (
			(i ||= e()
				.then((e) => {
					(i = void 0), (a = e[t ?? `default`]);
				})
				.catch((e) => {
					if (((o = e), r(o) && o instanceof Error && typeof window < `u` && typeof sessionStorage < `u`)) {
						const e = `tanstack_router_reload:${o.message}`;
						sessionStorage.getItem(e) || (sessionStorage.setItem(e, `1`), (c = !0));
					}
				})),
			i
		),
		u = (e) => {
			if (c) throw (window.location.reload(), new Promise(() => {}));
			if (o) throw o;
			if (!a)
				if (n) n(l());
				else throw l();
			return s.createElement(a, e);
		};
	return (u.preload = l), u;
}
export { a as n, c as t };
