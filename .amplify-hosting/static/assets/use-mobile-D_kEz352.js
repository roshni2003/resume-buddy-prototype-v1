import { o as e } from "./jsx-runtime-D7jARjhZ.js";
import { t } from "./react-BZSX5Bs9.js";

var n = e(t(), 1),
	r = `(max-width: 767px)`;
function i() {
	const [e, t] = (0, n.useState)(void 0);
	return (
		(0, n.useEffect)(() => {
			const e = window.matchMedia(r),
				n = (e) => {
					t(e.matches);
				};
			return e.addEventListener(`change`, n), t(e.matches), () => e.removeEventListener(`change`, n);
		}, []),
		!!e
	);
}
export { i as t };
