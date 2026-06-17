import {
	m as ae,
	D as d,
	C as ee,
	S as f,
	x as g,
	t as h,
	h as ie,
	n as m,
	_ as ne,
	v as oe,
	T as p,
	g as re,
	y as se,
	E as te,
} from "./get-strict-context-DJn2x5wH.js";
import { r as u } from "./input-DIek8tFf.js";
import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { O as a, j as c, D as i, y as l, S as o, C as r, T as s } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";

var _ = e(n(), 1),
	v = e(t(), 1),
	y = `Dialog`,
	[b, x] = d(y),
	[ce, S] = b(y),
	C = (e) => {
		const { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e,
			s = _.useRef(null),
			c = _.useRef(null),
			[l, u] = ee({ prop: r, defaultProp: i ?? !1, onChange: a, caller: y });
		return (0, v.jsx)(ce, {
			scope: t,
			triggerRef: s,
			contentRef: c,
			contentId: g(),
			titleId: g(),
			descriptionId: g(),
			open: l,
			onOpenChange: u,
			onOpenToggle: _.useCallback(() => u((e) => !e), [u]),
			modal: o,
			children: n,
		});
	};
C.displayName = y;
var w = `DialogTrigger`,
	le = _.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			i = S(w, n),
			a = s(t, i.triggerRef);
		return (0, v.jsx)(l.button, {
			type: `button`,
			"aria-haspopup": `dialog`,
			"aria-expanded": i.open,
			"aria-controls": i.contentId,
			"data-state": z(i.open),
			...r,
			ref: a,
			onClick: p(e.onClick, i.onOpenToggle),
		});
	});
le.displayName = w;
var T = `DialogPortal`,
	[ue, E] = b(T, { forceMount: void 0 }),
	D = (e) => {
		const { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
			a = S(T, t);
		return (0, v.jsx)(ue, {
			scope: t,
			forceMount: n,
			children: _.Children.map(r, (e) =>
				(0, v.jsx)(f, { present: n || a.open, children: (0, v.jsx)(ne, { asChild: !0, container: i, children: e }) }),
			),
		});
	};
D.displayName = T;
var O = `DialogOverlay`,
	k = _.forwardRef((e, t) => {
		const n = E(O, e.__scopeDialog),
			{ forceMount: r = n.forceMount, ...i } = e,
			a = S(O, e.__scopeDialog);
		return a.modal ? (0, v.jsx)(f, { present: r || a.open, children: (0, v.jsx)(fe, { ...i, ref: t }) }) : null;
	});
k.displayName = O;
var de = o(`DialogOverlay.RemoveScroll`),
	fe = _.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			i = S(O, n);
		return (0, v.jsx)(ie, {
			as: de,
			allowPinchZoom: !0,
			shards: [i.contentRef],
			children: (0, v.jsx)(l.div, {
				"data-state": z(i.open),
				...r,
				ref: t,
				style: { pointerEvents: `auto`, ...r.style },
			}),
		});
	}),
	A = `DialogContent`,
	j = _.forwardRef((e, t) => {
		const n = E(A, e.__scopeDialog),
			{ forceMount: r = n.forceMount, ...i } = e,
			a = S(A, e.__scopeDialog);
		return (0, v.jsx)(f, {
			present: r || a.open,
			children: a.modal ? (0, v.jsx)(pe, { ...i, ref: t }) : (0, v.jsx)(me, { ...i, ref: t }),
		});
	});
j.displayName = A;
var pe = _.forwardRef((e, t) => {
		const n = S(A, e.__scopeDialog),
			r = _.useRef(null),
			i = s(t, n.contentRef, r);
		return (
			_.useEffect(() => {
				const e = r.current;
				if (e) return ae(e);
			}, []),
			(0, v.jsx)(M, {
				...e,
				ref: i,
				trapFocus: n.open,
				disableOutsidePointerEvents: !0,
				onCloseAutoFocus: p(e.onCloseAutoFocus, (e) => {
					e.preventDefault(), n.triggerRef.current?.focus();
				}),
				onPointerDownOutside: p(e.onPointerDownOutside, (e) => {
					const t = e.detail.originalEvent,
						n = t.button === 0 && t.ctrlKey === !0;
					(t.button === 2 || n) && e.preventDefault();
				}),
				onFocusOutside: p(e.onFocusOutside, (e) => e.preventDefault()),
			})
		);
	}),
	me = _.forwardRef((e, t) => {
		const n = S(A, e.__scopeDialog),
			r = _.useRef(!1),
			i = _.useRef(!1);
		return (0, v.jsx)(M, {
			...e,
			ref: t,
			trapFocus: !1,
			disableOutsidePointerEvents: !1,
			onCloseAutoFocus: (t) => {
				e.onCloseAutoFocus?.(t),
					t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()),
					(r.current = !1),
					(i.current = !1);
			},
			onInteractOutside: (t) => {
				e.onInteractOutside?.(t),
					t.defaultPrevented || ((r.current = !0), t.detail.originalEvent.type === `pointerdown` && (i.current = !0));
				const a = t.target;
				n.triggerRef.current?.contains(a) && t.preventDefault(),
					t.detail.originalEvent.type === `focusin` && i.current && t.preventDefault();
			},
		});
	}),
	M = _.forwardRef((e, t) => {
		const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e,
			c = S(A, n),
			l = _.useRef(null),
			u = s(t, l);
		return (
			re(),
			(0, v.jsxs)(v.Fragment, {
				children: [
					(0, v.jsx)(oe, {
						asChild: !0,
						loop: !0,
						trapped: r,
						onMountAutoFocus: i,
						onUnmountAutoFocus: a,
						children: (0, v.jsx)(se, {
							role: `dialog`,
							id: c.contentId,
							"aria-describedby": c.descriptionId,
							"aria-labelledby": c.titleId,
							"data-state": z(c.open),
							...o,
							ref: u,
							onDismiss: () => c.onOpenChange(!1),
						}),
					}),
					(0, v.jsxs)(v.Fragment, {
						children: [
							(0, v.jsx)(ge, { titleId: c.titleId }),
							(0, v.jsx)(ve, { contentRef: l, descriptionId: c.descriptionId }),
						],
					}),
				],
			})
		);
	}),
	N = `DialogTitle`,
	P = _.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			i = S(N, n);
		return (0, v.jsx)(l.h2, { id: i.titleId, ...r, ref: t });
	});
P.displayName = N;
var F = `DialogDescription`,
	I = _.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			i = S(F, n);
		return (0, v.jsx)(l.p, { id: i.descriptionId, ...r, ref: t });
	});
I.displayName = F;
var L = `DialogClose`,
	R = _.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			i = S(L, n);
		return (0, v.jsx)(l.button, { type: `button`, ...r, ref: t, onClick: p(e.onClick, () => i.onOpenChange(!1)) });
	});
R.displayName = L;
function z(e) {
	return e ? `open` : `closed`;
}
var B = `DialogTitleWarning`,
	[he, V] = te(B, { contentName: A, titleName: N, docsSlug: `dialog` }),
	ge = ({ titleId: e }) => {
		const t = V(B),
			n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
		return (
			_.useEffect(() => {
				e && (document.getElementById(e) || console.error(n));
			}, [n, e]),
			null
		);
	},
	_e = `DialogDescriptionWarning`,
	ve = ({ contentRef: e, descriptionId: t }) => {
		const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${V(_e).contentName}}.`;
		return (
			_.useEffect(() => {
				const r = e.current?.getAttribute(`aria-describedby`);
				t && r && (document.getElementById(t) || console.warn(n));
			}, [n, e, t]),
			null
		);
	},
	H = C,
	ye = le,
	U = D,
	W = k,
	G = j,
	K = P,
	q = I,
	J = R,
	Y = `AlertDialog`,
	[be, xe] = d(Y, [x]),
	X = x(),
	Z = (e) => {
		const { __scopeAlertDialog: t, ...n } = e,
			r = X(t);
		return (0, v.jsx)(H, { ...r, ...n, modal: !0 });
	};
Z.displayName = Y;
var Se = `AlertDialogTrigger`,
	Ce = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, ...r } = e,
			i = X(n);
		return (0, v.jsx)(ye, { ...i, ...r, ref: t });
	});
Ce.displayName = Se;
var we = `AlertDialogPortal`,
	Te = (e) => {
		const { __scopeAlertDialog: t, ...n } = e,
			r = X(t);
		return (0, v.jsx)(U, { ...r, ...n });
	};
Te.displayName = we;
var Ee = `AlertDialogOverlay`,
	De = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, ...r } = e,
			i = X(n);
		return (0, v.jsx)(W, { ...i, ...r, ref: t });
	});
De.displayName = Ee;
var Q = `AlertDialogContent`,
	[Oe, ke] = be(Q),
	Ae = r(`AlertDialogContent`),
	je = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, children: r, ...i } = e,
			a = X(n),
			o = _.useRef(null),
			c = s(t, o),
			l = _.useRef(null);
		return (0, v.jsx)(he, {
			contentName: Q,
			titleName: Me,
			docsSlug: `alert-dialog`,
			children: (0, v.jsx)(Oe, {
				scope: n,
				cancelRef: l,
				children: (0, v.jsxs)(G, {
					role: `alertdialog`,
					...a,
					...i,
					ref: c,
					onOpenAutoFocus: p(i.onOpenAutoFocus, (e) => {
						e.preventDefault(), l.current?.focus({ preventScroll: !0 });
					}),
					onPointerDownOutside: (e) => e.preventDefault(),
					onInteractOutside: (e) => e.preventDefault(),
					children: [(0, v.jsx)(Ae, { children: r }), (0, v.jsx)(Be, { contentRef: o })],
				}),
			}),
		});
	});
je.displayName = Q;
var Me = `AlertDialogTitle`,
	Ne = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, ...r } = e,
			i = X(n);
		return (0, v.jsx)(K, { ...i, ...r, ref: t });
	});
Ne.displayName = Me;
var Pe = `AlertDialogDescription`,
	Fe = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, ...r } = e,
			i = X(n);
		return (0, v.jsx)(q, { ...i, ...r, ref: t });
	});
Fe.displayName = Pe;
var Ie = `AlertDialogAction`,
	Le = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, ...r } = e,
			i = X(n);
		return (0, v.jsx)(J, { ...i, ...r, ref: t });
	});
Le.displayName = Ie;
var Re = `AlertDialogCancel`,
	ze = _.forwardRef((e, t) => {
		const { __scopeAlertDialog: n, ...r } = e,
			{ cancelRef: i } = ke(Re, n),
			a = X(n),
			o = s(t, i);
		return (0, v.jsx)(J, { ...a, ...r, ref: o });
	});
ze.displayName = Re;
var Be = ({ contentRef: e }) => {
		const t = `\`${Q}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${Q}\` by passing a \`${Pe}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${Q}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
		return (
			_.useEffect(() => {
				document.getElementById(e.current?.getAttribute(`aria-describedby`)) || console.warn(t);
			}, [t, e]),
			null
		);
	},
	Ve = Z,
	He = Te,
	Ue = De,
	We = je,
	Ge = Le,
	Ke = ze,
	qe = Ne,
	Je = Fe,
	[Ye, Xe] = h(`DialogContext`);
function Ze(e) {
	const [t, n] = m({ value: e?.open, defaultValue: e?.defaultOpen, onChange: e?.onOpenChange });
	return (0, v.jsx)(Ye, {
		value: { isOpen: t, setIsOpen: n },
		children: (0, v.jsx)(H, { "data-slot": `dialog`, ...e, onOpenChange: n }),
	});
}
function Qe(e) {
	const { isOpen: t } = Xe();
	return (0, v.jsx)(c, { children: t && (0, v.jsx)(U, { "data-slot": `dialog-portal`, forceMount: !0, ...e }) });
}
function $e({ transition: e = { duration: 0.2, ease: `easeInOut` }, ...t }) {
	return (0, v.jsx)(W, {
		"data-slot": `dialog-overlay`,
		asChild: !0,
		forceMount: !0,
		children: (0, v.jsx)(
			a.div,
			{
				initial: { opacity: 0, filter: `blur(4px)` },
				animate: { opacity: 1, filter: `blur(0px)` },
				exit: { opacity: 0, filter: `blur(4px)` },
				transition: e,
				...t,
			},
			`dialog-overlay`,
		),
	});
}
function et({
	from: e = `top`,
	onOpenAutoFocus: t,
	onCloseAutoFocus: n,
	onEscapeKeyDown: r,
	onPointerDownOutside: i,
	onInteractOutside: o,
	transition: s = { type: `spring`, stiffness: 250, damping: 25 },
	...c
}) {
	const l = e === `bottom` || e === `left` ? `20deg` : `-20deg`,
		u = e === `top` || e === `bottom` ? `rotateX` : `rotateY`;
	return (0, v.jsx)(G, {
		asChild: !0,
		forceMount: !0,
		onOpenAutoFocus: t,
		onCloseAutoFocus: n,
		onEscapeKeyDown: r,
		onPointerDownOutside: i,
		onInteractOutside: o,
		children: (0, v.jsx)(
			a.div,
			{
				"data-slot": `dialog-content`,
				transition: s,
				initial: { opacity: 0, filter: `blur(4px)`, transform: `perspective(500px) ${u}(${l}) scale(0.8)` },
				animate: { opacity: 1, filter: `blur(0px)`, transform: `perspective(500px) ${u}(0deg) scale(1)` },
				exit: { opacity: 0, filter: `blur(4px)`, transform: `perspective(500px) ${u}(${l}) scale(0.8)` },
				...c,
			},
			`dialog-content`,
		),
	});
}
function tt(e) {
	return (0, v.jsx)(`div`, { "data-slot": `dialog-header`, ...e });
}
function nt(e) {
	return (0, v.jsx)(`div`, { "data-slot": `dialog-footer`, ...e });
}
function rt(e) {
	return (0, v.jsx)(K, { "data-slot": `dialog-title`, ...e });
}
function it(e) {
	return (0, v.jsx)(q, { "data-slot": `dialog-description`, ...e });
}
function at(e) {
	return (0, v.jsx)(Ze, { ...e });
}
function ot({ className: e, ...t }) {
	return (0, v.jsx)($e, { className: i(`fixed inset-0 z-50 bg-black/50`, e), ...t });
}
function st({ className: e, children: t, ...n }) {
	return (0, v.jsxs)(Qe, {
		children: [
			(0, v.jsx)(ot, {}),
			(0, v.jsx)(et, {
				className: i(
					`fixed top-[50%] left-[50%] z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-lg border bg-background p-6 shadow-lg sm:max-w-2xl 2xl:max-w-4xl`,
					e,
				),
				...n,
				children: t,
			}),
		],
	});
}
function ct({ className: e, ...t }) {
	return (0, v.jsx)(tt, { className: i(`flex flex-col gap-2 text-center sm:text-start`, e), ...t });
}
function lt({ className: e, ...t }) {
	return (0, v.jsx)(nt, { className: i(`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`, e), ...t });
}
function ut({ className: e, ...t }) {
	return (0, v.jsx)(rt, { className: i(`font-semibold text-lg leading-none`, e), ...t });
}
function dt({ className: e, ...t }) {
	return (0, v.jsx)(it, { className: i(`text-muted-foreground text-sm`, e), ...t });
}
var ft = (e) => {
		let t,
			n = new Set(),
			r = (e, r) => {
				const i = typeof e == `function` ? e(t) : e;
				if (!Object.is(i, t)) {
					const e = t;
					(t = (r ?? (typeof i != `object` || !i)) ? i : Object.assign({}, t, i)), n.forEach((n) => n(t, e));
				}
			},
			i = () => t,
			a = { setState: r, getState: i, getInitialState: () => o, subscribe: (e) => (n.add(e), () => n.delete(e)) },
			o = (t = e(r, i, a));
		return a;
	},
	pt = (e) => (e ? ft(e) : ft),
	mt = (e) => e;
function ht(e, t = mt) {
	const n = _.useSyncExternalStore(
		e.subscribe,
		_.useCallback(() => t(e.getState()), [e, t]),
		_.useCallback(() => t(e.getInitialState()), [e, t]),
	);
	return _.useDebugValue(n), n;
}
var $ = (e) => {
		const t = pt(e),
			n = (e) => ht(t, e);
		return Object.assign(n, t), n;
	},
	gt = (e) => (e ? $(e) : $),
	[_t, vt] = h(`AlertDialogContext`);
function yt(e) {
	const [t, n] = m({ value: e?.open, defaultValue: e?.defaultOpen, onChange: e?.onOpenChange });
	return (0, v.jsx)(_t, {
		value: { isOpen: t, setIsOpen: n },
		children: (0, v.jsx)(Ve, { "data-slot": `alert-dialog`, ...e, onOpenChange: n }),
	});
}
function bt(e) {
	const { isOpen: t } = vt();
	return (0, v.jsx)(c, { children: t && (0, v.jsx)(He, { "data-slot": `alert-dialog-portal`, forceMount: !0, ...e }) });
}
function xt({ transition: e = { duration: 0.2, ease: `easeInOut` }, ...t }) {
	return (0, v.jsx)(Ue, {
		"data-slot": `alert-dialog-overlay`,
		asChild: !0,
		forceMount: !0,
		children: (0, v.jsx)(
			a.div,
			{
				initial: { opacity: 0, filter: `blur(4px)` },
				animate: { opacity: 1, filter: `blur(0px)` },
				exit: { opacity: 0, filter: `blur(4px)` },
				transition: e,
				...t,
			},
			`alert-dialog-overlay`,
		),
	});
}
function St({
	from: e = `top`,
	onOpenAutoFocus: t,
	onCloseAutoFocus: n,
	onEscapeKeyDown: r,
	transition: i = { type: `spring`, stiffness: 250, damping: 25 },
	...o
}) {
	const s = e === `bottom` || e === `left` ? `20deg` : `-20deg`,
		c = e === `top` || e === `bottom` ? `rotateX` : `rotateY`;
	return (0, v.jsx)(We, {
		asChild: !0,
		forceMount: !0,
		onOpenAutoFocus: t,
		onCloseAutoFocus: n,
		onEscapeKeyDown: r,
		children: (0, v.jsx)(
			a.div,
			{
				"data-slot": `alert-dialog-content`,
				transition: i,
				initial: { opacity: 0, filter: `blur(4px)`, transform: `perspective(500px) ${c}(${s}) scale(0.8)` },
				animate: { opacity: 1, filter: `blur(0px)`, transform: `perspective(500px) ${c}(0deg) scale(1)` },
				exit: { opacity: 0, filter: `blur(4px)`, transform: `perspective(500px) ${c}(${s}) scale(0.8)` },
				...o,
			},
			`alert-dialog-content`,
		),
	});
}
function Ct(e) {
	return (0, v.jsx)(Ke, { "data-slot": `alert-dialog-cancel`, ...e });
}
function wt(e) {
	return (0, v.jsx)(Ge, { "data-slot": `alert-dialog-action`, ...e });
}
function Tt(e) {
	return (0, v.jsx)(`div`, { "data-slot": `alert-dialog-header`, ...e });
}
function Et(e) {
	return (0, v.jsx)(`div`, { "data-slot": `alert-dialog-footer`, ...e });
}
function Dt(e) {
	return (0, v.jsx)(qe, { "data-slot": `alert-dialog-title`, ...e });
}
function Ot(e) {
	return (0, v.jsx)(Je, { "data-slot": `alert-dialog-description`, ...e });
}
function kt(e) {
	return (0, v.jsx)(yt, { ...e });
}
function At({ className: e, ...t }) {
	return (0, v.jsx)(xt, { className: i(`fixed inset-0 z-50 bg-black/50`, e), ...t });
}
function jt({ className: e, ...t }) {
	return (0, v.jsxs)(bt, {
		children: [
			(0, v.jsx)(At, {}),
			(0, v.jsx)(St, {
				className: i(
					`fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg`,
					e,
				),
				...t,
			}),
		],
	});
}
function Mt({ className: e, ...t }) {
	return (0, v.jsx)(Tt, { className: i(`flex flex-col gap-2 text-center sm:text-start`, e), ...t });
}
function Nt({ className: e, ...t }) {
	return (0, v.jsx)(Et, { className: i(`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`, e), ...t });
}
function Pt({ className: e, ...t }) {
	return (0, v.jsx)(Dt, { className: i(`font-semibold text-lg`, e), ...t });
}
function Ft({ className: e, ...t }) {
	return (0, v.jsx)(Ot, { className: i(`text-muted-foreground text-sm`, e), ...t });
}
function It({ className: e, ...t }) {
	return (0, v.jsx)(wt, { className: i(u(), e), ...t });
}
function Lt({ className: e, ...t }) {
	return (0, v.jsx)(Ct, { className: i(u({ variant: `outline` }), e), ...t });
}
export {
	G as _,
	Ft as a,
	H as b,
	Pt as c,
	at as d,
	st as f,
	ut as g,
	ct as h,
	jt as i,
	gt as l,
	lt as m,
	It as n,
	Nt as o,
	dt as p,
	Lt as r,
	Mt as s,
	kt as t,
	pt as u,
	W as v,
	U as y,
};
