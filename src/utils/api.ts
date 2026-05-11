import type { ResumeData } from "@/schema/resume/data";
import { getAuthToken } from "@/utils/auth-token";

const VITE_AI_BASE_URL_DEV = import.meta.env.VITE_AI_BASE_URL_DEV as string;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const url = path.startsWith("http") ? path : `${VITE_AI_BASE_URL_DEV}${path}`;
	const token = getAuthToken();

	console.log("[auth-debug] api.request: sending", {
		method: options.method ?? "GET",
		url,
		hasAuthHeader: Boolean(token),
		tokenTail: token ? `…${token.slice(-8)}` : null,
	});

	const response = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers,
		},
	});

	console.log("[auth-debug] api.request: response", {
		url,
		status: response.status,
		ok: response.ok,
	});

	if (response.status === 401) {
		// Don't wipe the token here. The 401 means the backend rejected this token,
		// but that doesn't tell us *why* — it could be a backend misconfiguration
		// (wrong signing secret, wrong audience, missing user) and the token may still
		// be valid for other purposes. Clearing the storage destroys the only evidence
		// the user successfully authenticated and makes the failure mode look like
		// "storage is broken" when it isn't.
		//
		// Log the response body so the cause is visible in the console, then surface
		// the error to the caller (React Query). The token stays put.
		const bodyText = await response
			.clone()
			.text()
			.catch(() => "<unreadable>");
		console.log("[auth-debug] api.request: 401 — backend rejected token. Body:", bodyText);
		throw new Error("Unauthorized");
	}

	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.message || `Request failed with status ${response.status}`);
	}

	if (response.status === 204) {
		return undefined as unknown as T;
	}

	return response.json();
}

export interface ResumeSummary {
	id: string;
	name: string;
	slug: string;
	tags: string[];
	isPublic: boolean;
	isLocked: boolean;
	hasPassword?: boolean;
	createdAt: Date;
	updatedAt: Date;
	data: ResumeData;
}

export interface ResumeStatistics {
	totalResumes: number;
	totalDownloads: number;
	lastUpdated: string | null;
}

// ----- Helpers -----

const mapResume = (resume: ResumeSummary): ResumeSummary => {
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
					items: (experience.items || []).map((item: Record<string, any>) => {
						return {
							...item,
							startDate: typeof item.startDate === "string" ? item.startDate : "",
							endDate: typeof item.endDate === "string" ? item.endDate : "",
							currentlyWorkingHere: typeof item.currentlyWorkingHere === "boolean" ? item.currentlyWorkingHere : false,
						};
					}) as any[],
				},
			},
		},
	};
}; // ----- API -----

export const api = {
	// 1. GET: /resumes/user
	fetchResumes: async (options: { tags?: string[]; sort?: string } = {}) => {
		const searchParams = new URLSearchParams();
		if (options.tags?.length) {
			for (const tag of options.tags) {
				searchParams.append("tags", tag);
			}
		}
		if (options.sort) {
			searchParams.append("sort", options.sort);
		}
		const queryString = searchParams.toString();
		const resumes = await request<ResumeSummary[]>(`/resumes/user${queryString ? `?${queryString}` : ""}`);
		return resumes.map(mapResume);
	},

	// 2. GET: /resumes/{id}
	fetchResume: async (id: string) => {
		const resume = await request<ResumeSummary>(`/resumes/${id}`);
		return mapResume(resume);
	},

	// 3. PUT: /resumes/{id}
	updateResume: (id: string, data: Partial<Omit<ResumeSummary, "id" | "createdAt" | "updatedAt">>) =>
		request<void>(`/resumes/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	// 4. DELETE: /resumes/{id}
	deleteResume: (id: string) =>
		request<void>(`/resumes/${id}`, {
			method: "DELETE",
		}),

	// 5. POST: /resumes
	createResume: (data: {
		name: string;
		slug: string;
		tags?: string[];
		data?: ResumeData;
		isPublic?: boolean;
		withSampleData?: boolean;
	}) =>
		request<{ id: string }>("/resumes", {
			method: "POST",
			body: JSON.stringify(data),
		}),

	// 6. POST: /resumes/{id}/duplicate
	duplicateResume: (id: string, overrides: { name?: string; slug?: string; tags?: string[] } = {}) =>
		request<{ id: string }>(`/resumes/${id}/duplicate`, {
			method: "POST",
			body: JSON.stringify(overrides),
		}),

	// 7. GET: /resumes/statistics (Dashboard summary)
	fetchStatistics: () => request<ResumeStatistics>("/resumes/statistics"),

	// 7a. GET: /resume/statistics/{id} (Individual resume statistics)
	fetchResumeStatistics: async (id: string) => {
		try {
			const stats = await request<any>(`/resume/statistics/${id}`);
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

	// 8. POST: /resumes/{id}/set-password
	setPassword: (id: string, password: string) =>
		request<void>(`/resumes/${id}/set-password`, {
			method: "POST",
			body: JSON.stringify({ password }),
		}),

	// 9. POST: /resumes/{id}/remove-password
	removePassword: (id: string) =>
		request<void>(`/resumes/${id}/remove-password`, {
			method: "POST",
		}),

	// 10. POST: /resumes/{id}/set-locked
	setLocked: (id: string, isLocked: boolean) =>
		request<void>(`/resumes/${id}/set-locked`, {
			method: "POST",
			body: JSON.stringify({ isLocked }),
		}),

	// 11. GET: /resumes/{id}/export
	exportResume: (id: string, format: "pdf" | "docx", _data?: ResumeData) =>
		request<{ url: string }>(`/resumes/${id}/export?format=${format}`, {
			method: "GET",
		}),

	// 12. POST: /ai/generate-summary
	// This endpoint handles summary, experience, projects, and final review depending on the keys provided.
	generateAIContent: (payload: {
		resume_id: string;
		type: "summary" | "ExperienceDescription" | "ProjectsDescription" | "FinalReview";
		value: string;
	}) =>
		request<Record<string, string>>(`/ai/generate-summary/${payload.resume_id}`, {
			method: "POST",
			body: JSON.stringify({
				type: payload.type,
				value: payload.value,
			}),
		}),
};
