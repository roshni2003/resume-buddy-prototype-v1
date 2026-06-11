const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f || (m.f = ["assets/api-BqFyX6lO.js", "assets/api-BDc_pfcq.js"]),
) => i.map((i) => d[i]);

import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { t as r } from "./preload-helper-DwC0sqXt.js";
import { t as n } from "./react-BZSX5Bs9.js";
import "./string-_Z1c2EAS.js";
import "./with-selector-DTFISeXP.js";
import { r as i } from "./route-YyFGB8Ug.js";
import "./rich-input-CFiOV_cF.js";
import "./section-BpLUrMt_.js";
import { t as a } from "./preview-BLets8yr.js";
import { t as o } from "./resume-Cd2sSNAf.js";
import "./spinner-BNUJLa4B.js";
import "./input-DIek8tFf.js";
import { t as s } from "./loading-screen-M1mL3n-i.js";
import "./get-strict-context-DJn2x5wH.js";
import "./alert-dialog-B7DDo-NI.js";
import "./locale-xmC6h3Uu.js";
import "./dist-Dj3RpNtB.js";
var c = e(n()),
	l = e(t()),
	u = i(`/printer/$resumeId`);
function d() {
	const e = u.useLoaderData(),
		{ token: t } = u.useSearch(),
		{ resumeId: n } = u.useParams(),
		i = o((e) => e.isReady),
		d = o((e) => e.initialize),
		[f, p] = (0, c.useState)(e?.resume ?? null),
		m = e?.token ?? t;
	return (
		(0, c.useEffect)(() => {
			f ||
				(m !== `preview` && t !== `preview`) ||
				(async () => {
					try {
						const { api: e } = await r(
							async () => {
								const { api: e } = await import(`./api-BqFyX6lO.js`);
								return { api: e };
							},
							__vite__mapDeps([0, 1]),
						);
						p(await e.fetchResume(n));
					} catch (e) {
						console.error(`[Printer] Client-side fetch failed for ${n}:`, e),
							window.parent.postMessage({ type: `PRINTER_ERROR`, resumeId: n, message: String(e) }, `*`);
					}
				})();
		}, [f, m, t, n]),
		(0, c.useEffect)(() => {
			f && d(f);
		}, [f, d]),
		(0, c.useEffect)(() => {
			i ? document.body.setAttribute(`data-wf-loaded`, `true`) : document.body.removeAttribute(`data-wf-loaded`);
		}, [i]),
		(0, c.useEffect)(() => {
			i &&
				(m === `preview` || t === `preview`) &&
				window.parent.postMessage({ type: `RESUME_READY`, resumeId: f?.id ?? n }, `*`);
		}, [i, m, t, f?.id, n]),
		i
			? (0, l.jsx)(a, { pageClassName: `print:w-full!` })
			: m === `preview` || t === `preview`
				? (0, l.jsx)(`div`, { className: `fixed inset-0 bg-white` })
				: (0, l.jsx)(s, {})
	);
}
export { d as component };
