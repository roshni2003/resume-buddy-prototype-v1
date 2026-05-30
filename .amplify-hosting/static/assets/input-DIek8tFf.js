import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { k as a, O as i, q as o, D as r } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";
var s = (e) => (typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e);
const c = o,
	l = (e, t) => (n) => {
		if (t?.variants == null) return c(e, n?.class, n?.className);
		const { variants: r, defaultVariants: i } = t,
			a = Object.keys(r).map((e) => {
				const t = n?.[e],
					a = i?.[e];
				if (t === null) return null;
				const o = s(t) || s(a);
				return r[e][o];
			}),
			o =
				n &&
				Object.entries(n).reduce((e, t) => {
					const [n, r] = t;
					return r === void 0 || (e[n] = r), e;
				}, {});
		return c(
			e,
			a,
			t?.compoundVariants?.reduce((e, t) => {
				const { class: n, className: r, ...a } = t;
				return Object.entries(a).every((e) => {
					const [t, n] = e;
					return Array.isArray(n) ? n.includes({ ...i, ...o }[t]) : { ...i, ...o }[t] === n;
				})
					? [...e, n, r]
					: e;
			}, []),
			n?.class,
			n?.className,
		);
	};
function u(e) {
	return typeof e == `object` && !!e && a in e;
}
var d = e(n(), 1),
	f = e(t(), 1);
function p(...e) {
	return (t) => {
		e.forEach((e) => {
			e && (typeof e == `function` ? e(t) : (e.current = t));
		});
	};
}
function m(e, t) {
	const n = { ...e, ...t };
	return (
		(e.className || t.className) && (n.className = r(e.className, t.className)),
		(e.style || t.style) && (n.style = { ...e.style, ...t.style }),
		n
	);
}
function h({ children: e, ref: t, ...n }) {
	const r = e && typeof e.type == `object` && e.type !== null && u(e.type),
		a = d.useMemo(() => (r ? e.type : i.create(e?.type)), [r, e]);
	if (!d.isValidElement(e)) return null;
	const { ref: o, ...s } = e.props;
	return (0, f.jsx)(a, { ...m(s, n), ref: p(o, t) });
}
function g({ hoverScale: e = 1, tapScale: t = 0.95, asChild: n = !1, ...r }) {
	return (0, f.jsx)(n ? h : i.button, { whileTap: { scale: t }, whileHover: { scale: e }, ...r });
}
var _ = l(
	`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[box-shadow,color,background-color,border-color,outline-color,text-decoration-color,fill,stroke] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
	{
		variants: {
			variant: {
				default: `bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`,
				accent: `bg-accent text-accent-foreground shadow-xs hover:bg-accent/90`,
				destructive: `bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40`,
				outline: `border bg-background shadow-xs hover:bg-secondary/40 hover:text-secondary-foreground`,
				secondary: `bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80`,
				ghost: `hover:bg-secondary/40 hover:text-secondary-foreground`,
				link: `text-primary underline-offset-4 hover:underline`,
			},
			size: {
				default: `h-9 px-4 py-2 has-[>svg]:px-3`,
				sm: `h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5`,
				lg: `h-10 rounded-md px-6 has-[>svg]:px-4`,
				icon: `size-9`,
				"icon-sm": `size-8 rounded-md`,
				"icon-lg": `size-10 rounded-md`,
			},
		},
		defaultVariants: { variant: `default`, size: `default` },
	},
);
function v({ className: e, variant: t, size: n, type: i = `button`, ...a }) {
	return (0, f.jsx)(g, { type: i, className: r(_({ variant: t, size: n, className: e })), ...a });
}
function y({ className: e, type: t, ...n }) {
	return (0, f.jsx)(`input`, {
		type: t,
		"data-slot": `input`,
		className: r(
			`h-9 w-full min-w-0 rounded-md border border-input bg-gray-50 px-2.5 py-1 shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-gray-50 focus:bg-gray-50 focus-visible:border-ring focus-visible:bg-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
			e,
		),
		...n,
	});
}
export { l as i, v as n, _ as r, y as t };
