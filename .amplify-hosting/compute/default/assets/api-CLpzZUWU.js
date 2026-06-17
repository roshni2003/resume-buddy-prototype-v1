var AUTH_TOKEN_KEY = "authToken";
var safeDecodeJwtPayload = (token) => {
	try {
		const base64Url = token.split(".")[1];
		if (!base64Url) return null;
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join(""),
		);
		return JSON.parse(jsonPayload);
	} catch {
		return null;
	}
};
const isValidToken = (token) => {
	if (!token) return false;
	const payload = safeDecodeJwtPayload(token);
	if (!payload) return false;
	if (typeof payload.exp !== "number") return true;
	return payload.exp > Math.floor(Date.now() / 1e3);
};
const getAuthToken = () => {
	if (typeof window === "undefined") return null;
	try {
		const url = new URL(window.location.href);
		let extractedToken = url.searchParams.get("token");
		if (!extractedToken && url.hash.includes("token="))
			extractedToken = new URLSearchParams(url.hash.replace(/^#/, "")).get("token");
		if (extractedToken && extractedToken !== "preview") {
			const oldToken = localStorage.getItem(AUTH_TOKEN_KEY);
			url.searchParams.delete("token");
			if (window.history.replaceState) window.history.replaceState({}, "", url.toString());
			if (oldToken && oldToken !== extractedToken) window.location.reload();
			localStorage.setItem(AUTH_TOKEN_KEY, extractedToken);
		}
	} catch {}
	return localStorage.getItem(AUTH_TOKEN_KEY);
};
var getAppBaseUrl = () => {
	return "https://zoe.zuvy.org";
};
const buildZuvyLoginUrl = (returnUrl) => {
	const appBaseUrl = getAppBaseUrl();
	let relativeReturnUrl = returnUrl;
	try {
		const parsed = new URL(returnUrl);
		relativeReturnUrl = parsed.pathname + parsed.search + parsed.hash;
	} catch {}
	const fullReturnUrl = `${appBaseUrl}${relativeReturnUrl}`;
	const encoded = encodeURIComponent(fullReturnUrl);
	return `https://app.zuvy.org/?zoeRedirectUrl=${encodeURIComponent(`${appBaseUrl}?returnUrl=${encoded}`)}`;
};
const redirectToZuvyLogin = (returnUrl) => {
	if (typeof window === "undefined") return;
	window.location.href = buildZuvyLoginUrl(returnUrl ?? window.location.href);
};
var VITE_AI_BASE_URL_DEV = "https://api.resume-builder.zuvy.org/api/openapi";
async function request(path, options = {}) {
	const url = path.startsWith("http") ? path : `${VITE_AI_BASE_URL_DEV}${path}`;
	const token = getAuthToken();
	const response = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers,
		},
	});
	if (response.status === 401) {
		if (typeof window !== "undefined") localStorage.removeItem("authToken");
		redirectToZuvyLogin();
		throw new Error("Unauthorized");
	}
	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.message || `Request failed with status ${response.status}`);
	}
	if (response.status === 204) return;
	return response.json();
}
var mapResume = (resume) => {
	const sections = resume.data?.sections ?? {};
	const experience = sections.experience ?? { items: [] };
	return {
		...resume,
		tags: resume.tags ?? [],
		isPublic: resume.isPublic ?? false,
		isLocked: resume.isLocked ?? false,
		createdAt: new Date(resume.createdAt),
		updatedAt: new Date(resume.updatedAt),
		data: {
			...resume.data,
			sections: {
				...sections,
				experience: {
					...experience,
					items: (experience.items || []).map((item) => {
						return {
							...item,
							startDate: typeof item.startDate === "string" ? item.startDate : "",
							endDate: typeof item.endDate === "string" ? item.endDate : "",
							currentlyWorkingHere: typeof item.currentlyWorkingHere === "boolean" ? item.currentlyWorkingHere : false,
						};
					}),
				},
			},
		},
	};
};
const api = {
	fetchResumes: async (options = {}) => {
		const searchParams = new URLSearchParams();
		if (options.tags?.length) for (const tag of options.tags) searchParams.append("tags", tag);
		if (options.sort) searchParams.append("sort", options.sort);
		const queryString = searchParams.toString();
		return (await request(`/resumes/user${queryString ? `?${queryString}` : ""}`)).map(mapResume);
	},
	fetchResume: async (id) => {
		return mapResume(await request(`/resumes/${id}`));
	},
	updateResume: (id, data) =>
		request(`/resumes/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	deleteResume: (id) => request(`/resumes/${id}`, { method: "DELETE" }),
	createResume: (data) =>
		request("/resumes", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	duplicateResume: (id, overrides = {}) =>
		request(`/resumes/${id}/duplicate`, {
			method: "POST",
			body: JSON.stringify(overrides),
		}),
	fetchStatistics: () => request("/resumes/statistics"),
	fetchResumeStatistics: async (id) => {
		try {
			const stats = await request(`/resume/statistics/${id}`);
			return {
				...stats,
				lastViewedAt: stats.lastViewedAt ? new Date(stats.lastViewedAt) : null,
				lastDownloadedAt: stats.lastDownloadedAt ? new Date(stats.lastDownloadedAt) : null,
			};
		} catch (error) {
			console.warn(`Failed to fetch statistics for resume ${id}, returning mock data.`, error);
			return {
				isPublic: false,
				views: 0,
				downloads: 0,
				lastViewedAt: null,
				lastDownloadedAt: null,
			};
		}
	},
	setPassword: (id, password) =>
		request(`/resumes/${id}/set-password`, {
			method: "POST",
			body: JSON.stringify({ password }),
		}),
	removePassword: (id) => request(`/resumes/${id}/remove-password`, { method: "POST" }),
	setLocked: (id, isLocked) =>
		request(`/resumes/${id}/set-locked`, {
			method: "POST",
			body: JSON.stringify({ isLocked }),
		}),
	exportResume: (id, format, _data) => request(`/resumes/${id}/export?format=${format}`, { method: "GET" }),
	generateAIContent: (payload) =>
		request(`/ai/generate-summary/${payload.resume_id}`, {
			method: "POST",
			body: JSON.stringify({
				type: payload.type,
				value: payload.value,
			}),
		}),
};
export { isValidToken as i, buildZuvyLoginUrl as n, getAuthToken as r, api as t };
