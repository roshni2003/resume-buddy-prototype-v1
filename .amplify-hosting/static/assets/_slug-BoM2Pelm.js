const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"assets/_slug-C9AXRa5J.js",
			"assets/locale-xmC6h3Uu.js",
			"assets/preload-helper-DwC0sqXt.js",
			"assets/jsx-runtime-D7jARjhZ.js",
			"assets/react-BZSX5Bs9.js",
			"assets/string-_Z1c2EAS.js",
			"assets/with-selector-DTFISeXP.js",
			"assets/qss-BbplFIp1.js",
			"assets/get-strict-context-DJn2x5wH.js",
			"assets/rich-input-BFCfY3FI.js",
			"assets/resume-Cd2sSNAf.js",
			"assets/alert-dialog-B7DDo-NI.js",
			"assets/input-DIek8tFf.js",
			"assets/api-BDc_pfcq.js",
			"assets/rich-input-Bw3LjGZI.css",
			"assets/section-BpLUrMt_.js",
			"assets/Translate.es-i6iYNQQy.js",
			"assets/dist-C4MU2sKv.js",
			"assets/DownloadSimple.es-BbsaHSey.js",
			"assets/preview-eoaOyFC-.js",
			"assets/Warning.es-uAi4GnyT.js",
			"assets/dist-Dj3RpNtB.js",
			"assets/preview-BY0c-pn_.css",
			"assets/spinner-BNUJLa4B.js",
			"assets/useMutation-CUlWnMMx.js",
			"assets/file-Ccm957YT.js",
		]),
) => i.map((i) => d[i]);
import { t as i } from "./api-BDc_pfcq.js";
import { n, t as r } from "./lazyRouteComponent-DBGst3ji.js";
import { t as e } from "./preload-helper-DwC0sqXt.js";
import { s as t } from "./with-selector-DTFISeXP.js";
const a = n(`/$username/$slug`)({
	component: r(
		() =>
			e(
				() => import(`./_slug-C9AXRa5J.js`),
				__vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]),
			),
		`component`,
	),
	loader: async ({ params: { username: e, slug: n } }) => {
		try {
			if (e === `.well-known`) throw t();
			const r = (await i.fetchResumes()).find((e) => e.slug === n);
			if (!r) throw t();
			return { resume: r };
		} catch {
			throw t();
		}
	},
	head: ({ loaderData: e }) => ({
		meta: [{ title: e && `resume` in e && e.resume ? `${e.resume.name} - Zoe Resume Builder` : `Zoe Resume Builder` }],
	}),
});
export { a as t };
