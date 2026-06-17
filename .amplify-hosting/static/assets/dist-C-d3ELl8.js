import { D as a } from "./get-strict-context-DJn2x5wH.js";
import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { T as i, S as r } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";

var o = e(n(), 1),
	s = e(t(), 1);
function c(e) {
	const t = e + `CollectionProvider`,
		[n, c] = a(t),
		[l, u] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
		d = (e) => {
			const { scope: t, children: n } = e,
				r = o.useRef(null),
				i = o.useRef(new Map()).current;
			return (0, s.jsx)(l, { scope: t, itemMap: i, collectionRef: r, children: n });
		};
	d.displayName = t;
	const f = e + `CollectionSlot`,
		p = r(f),
		m = o.forwardRef((e, t) => {
			const { scope: n, children: r } = e;
			return (0, s.jsx)(p, { ref: i(t, u(f, n).collectionRef), children: r });
		});
	m.displayName = f;
	const h = e + `CollectionItemSlot`,
		g = `data-radix-collection-item`,
		_ = r(h),
		v = o.forwardRef((e, t) => {
			const { scope: n, children: r, ...a } = e,
				c = o.useRef(null),
				l = i(t, c),
				d = u(h, n);
			return (
				o.useEffect(() => (d.itemMap.set(c, { ref: c, ...a }), () => void d.itemMap.delete(c))),
				(0, s.jsx)(_, { [g]: ``, ref: l, children: r })
			);
		});
	v.displayName = h;
	function y(t) {
		const n = u(e + `CollectionConsumer`, t);
		return o.useCallback(() => {
			const e = n.collectionRef.current;
			if (!e) return [];
			const t = Array.from(e.querySelectorAll(`[${g}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return [{ Provider: d, Slot: m, ItemSlot: v }, y, c];
}
var l = o.createContext(void 0);
function u(e) {
	const t = o.useContext(l);
	return e || t || `ltr`;
}
export { c as n, u as t };
