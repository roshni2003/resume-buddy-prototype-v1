var e = `authToken`,
	t = (e) => {
		try {
			const t = e.split(`.`)[1];
			if (!t) return null;
			const n = t.replace(/-/g, `+`).replace(/_/g, `/`),
				r = decodeURIComponent(
					atob(n)
						.split(``)
						.map((e) => `%` + (`00` + e.charCodeAt(0).toString(16)).slice(-2))
						.join(``),
				);
			return JSON.parse(r);
		} catch {
			return null;
		}
	};
const n = (e) => {
		if (!e) return !1;
		const n = t(e);
		return n ? (typeof n.exp == `number` ? n.exp > Math.floor(Date.now() / 1e3) : !0) : !1;
	},
	r = () => {
		if (typeof window > `u`) return null;
		try {
			let t = new URL(window.location.href),
				n = t.searchParams.get(`token`);
			if (
				(!n && t.hash.includes(`token=`) && (n = new URLSearchParams(t.hash.replace(/^#/, ``)).get(`token`)),
				n && n !== `preview`)
			) {
				const r = localStorage.getItem(e);
				t.searchParams.delete(`token`),
					window.history.replaceState && window.history.replaceState({}, ``, t.toString()),
					r && r !== n && window.location.reload(),
					localStorage.setItem(e, n);
			}
		} catch {}
		return localStorage.getItem(e);
	};
var i = () => `https://zoe.zuvy.org`;
const a = (e) => {
		let t = i(),
			n = e;
		try {
			const t = new URL(e);
			n = t.pathname + t.search + t.hash;
		} catch {}
		const r = `${t}${n}`,
			a = encodeURIComponent(r);
		return `https://app.zuvy.org/?zoeRedirectUrl=${encodeURIComponent(`${t}?returnUrl=${a}`)}`;
	},
	o = (e) => {
		typeof window > `u` || (window.location.href = a(e ?? window.location.href));
	};
var s = `https://api.resume-builder.zuvy.org/api/openapi`;
async function c(e, t = {}) {
	const n = e.startsWith(`http`) ? e : `${s}${e}`,
		i = r(),
		a = await fetch(n, {
			...t,
			headers: { "Content-Type": `application/json`, ...(i ? { Authorization: `Bearer ${i}` } : {}), ...t.headers },
		});
	if (a.status === 401) throw (typeof window < `u` && localStorage.removeItem(`authToken`), o(), Error(`Unauthorized`));
	if (!a.ok) {
		const e = await a.json().catch(() => ({}));
		throw Error(e.message || `Request failed with status ${a.status}`);
	}
	if (a.status !== 204) return a.json();
}
var l = (e) => {
	const t = e.data?.sections ?? {},
		n = t.experience ?? { items: [] };
	return {
		...e,
		tags: e.tags ?? [],
		isPublic: e.isPublic ?? !1,
		isLocked: e.isLocked ?? !1,
		createdAt: new Date(e.createdAt),
		updatedAt: new Date(e.updatedAt),
		data: {
			...e.data,
			sections: {
				...t,
				experience: {
					...n,
					items: (n.items || []).map((e) => ({
						...e,
						startDate: typeof e.startDate == `string` ? e.startDate : ``,
						endDate: typeof e.endDate == `string` ? e.endDate : ``,
						currentlyWorkingHere: typeof e.currentlyWorkingHere == `boolean` ? e.currentlyWorkingHere : !1,
					})),
				},
			},
		},
	};
};
const u = {
	fetchResumes: async (e = {}) => {
		const t = new URLSearchParams();
		if (e.tags?.length) for (const n of e.tags) t.append(`tags`, n);
		e.sort && t.append(`sort`, e.sort);
		const n = t.toString();
		return (await c(`/resumes/user${n ? `?${n}` : ``}`)).map(l);
	},
	fetchResume: async (e) => l(await c(`/resumes/${e}`)),
	updateResume: (e, t) => c(`/resumes/${e}`, { method: `PUT`, body: JSON.stringify(t) }),
	deleteResume: (e) => c(`/resumes/${e}`, { method: `DELETE` }),
	createResume: (e) => c(`/resumes`, { method: `POST`, body: JSON.stringify(e) }),
	duplicateResume: (e, t = {}) => c(`/resumes/${e}/duplicate`, { method: `POST`, body: JSON.stringify(t) }),
	fetchStatistics: () => c(`/resumes/statistics`),
	fetchResumeStatistics: async (e) => {
		try {
			const t = await c(`/resume/statistics/${e}`);
			return {
				...t,
				lastViewedAt: t.lastViewedAt ? new Date(t.lastViewedAt) : null,
				lastDownloadedAt: t.lastDownloadedAt ? new Date(t.lastDownloadedAt) : null,
			};
		} catch (t) {
			return (
				console.warn(`Failed to fetch statistics for resume ${e}, returning mock data.`, t),
				{ isPublic: !1, views: 0, downloads: 0, lastViewedAt: null, lastDownloadedAt: null }
			);
		}
	},
	setPassword: (e, t) => c(`/resumes/${e}/set-password`, { method: `POST`, body: JSON.stringify({ password: t }) }),
	removePassword: (e) => c(`/resumes/${e}/remove-password`, { method: `POST` }),
	setLocked: (e, t) => c(`/resumes/${e}/set-locked`, { method: `POST`, body: JSON.stringify({ isLocked: t }) }),
	exportResume: (e, t, n) => c(`/resumes/${e}/export?format=${t}`, { method: `GET` }),
	generateAIContent: (e) =>
		c(`/ai/generate-summary/${e.resume_id}`, {
			method: `POST`,
			body: JSON.stringify({ type: e.type, value: e.value }),
		}),
};
export { n as i, a as n, r, u as t };
