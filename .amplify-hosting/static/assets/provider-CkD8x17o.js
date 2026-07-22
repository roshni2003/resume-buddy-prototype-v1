import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { s } from "./locale-xmC6h3Uu.js";
import { i as r } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";
import { s as a, o as i } from "./string-_Z1c2EAS.js";
import { i as o } from "./useStore-KX9e-E04.js";
var c = r.union([r.literal(`light`), r.literal(`dark`)]),
	l = `theme`,
	u = `dark`;
function d(e) {
	return c.safeParse(e).success;
}
const f = () => {
		const e = s.get(l);
		return !e || !d(e) ? u : e;
	},
	p = i({ method: `POST` }).handler(a(`71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9`));
var m = e(n(), 1),
	h = e(t(), 1),
	g = (0, m.createContext)(null);
function _({ children: e, theme: t }) {
	const n = o();
	(0, m.useEffect)(() => {
		document.documentElement.classList.remove(`dark`);
	}, []);
	async function r(e, t = {}) {
		const { playSound: r = !0 } = t;
		if ((document.documentElement.classList.remove(`dark`), await p({ data: `light` }), n.invalidate(), r))
			try {
				const t = e === `dark` ? `/sounds/switch-off.mp3` : `/sounds/switch-on.mp3`;
				await new Audio(t).play();
			} catch {}
	}
	function i(e = {}) {
		r(`light`, e);
	}
	return (0, h.jsx)(g, { value: { theme: `light`, setTheme: r, toggleTheme: i }, children: e });
}
function v() {
	const e = (0, m.use)(g);
	if (!e) throw Error(`useTheme must be used within a ThemeProvider`);
	return e;
}
export { d as i, v as n, f as r, _ as t };
