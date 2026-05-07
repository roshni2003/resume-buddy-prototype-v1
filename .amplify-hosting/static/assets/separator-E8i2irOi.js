import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { y as i, D as r } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";
var a = e(n(), 1),
	o = e(t(), 1),
	s = `Separator`,
	c = `horizontal`,
	l = [`horizontal`, `vertical`],
	u = a.forwardRef((e, t) => {
		const { decorative: n, orientation: r = c, ...a } = e,
			s = d(r) ? r : c,
			l = s === `vertical` ? s : void 0,
			u = n ? { role: `none` } : { "aria-orientation": l, role: `separator` };
		return (0, o.jsx)(i.div, { "data-orientation": s, ...u, ...a, ref: t });
	});
u.displayName = s;
function d(e) {
	return l.includes(e);
}
var f = u;
function p({ className: e, orientation: t = `horizontal`, decorative: n = !0, ...i }) {
	return (0, o.jsx)(f, {
		"data-slot": `separator`,
		decorative: n,
		orientation: t,
		className: r(
			`shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch`,
			e,
		),
		...i,
	});
}
export { p as t };
