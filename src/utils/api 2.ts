import type { ResumeData } from "@/schema/resume/data";
import { getAuthToken } from "@/utils/auth-token";
import { defaultResumeData } from "@/schema/resume/data";

const VITE_AI_BASE_URL_DEV = import.meta.env.VITE_AI_BASE_URL_DEV as string;

export const UNAUTHORIZED_EVENT = "app:unauthorized";
export const UNAUTHORIZED_FLAG_KEY = "app:unauthorized:pending";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const url = path.startsWith("http") ? path : `${VITE_AI_BASE_URL_DEV}${path}`;
	const token = getAuthToken();

	console.log("[auth-debug] api.request: sending", {
		method: options.method ?? "GET",
		url,
		hasAuthHeader: Boolean(token),
		tokenTail: token ? `…${token.slice(-8)}` : null,
	});

	const isGet = !options.method || options.method.toUpperCase() === "GET";
	const response = await fetch(url, {
		...options,
		headers: {
			...(!isGet ? { "Content-Type": "application/json" } : {}),
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
		const bodyText = await response
			.clone()
			.text()
			.catch(() => "<unreadable>");
		console.log("[auth-debug] api.request: 401 — backend rejected token. Body:", bodyText);

		// ONLY show the user-friendly dialog if we actually sent a token that was rejected.
		// If no token was sent (token is null/empty), it's a silent failure that should
		// be handled by the route's redirect logic, not a popup.
		if (typeof window !== "undefined" && token) {
			// Sticky marker so we don't miss the dialog if the event fires before the UI mounts.
			try {
				window.sessionStorage.setItem(UNAUTHORIZED_FLAG_KEY, "1");
			} catch {
				// ignore
			}

			window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT, { detail: { url, bodyText } }));
		}

		throw new Error("Unauthorized");
	}

	if (!response.ok) {
		const errorBodyText = await response.clone().text().catch(() => "");
		let errorBody: any = {};
		try {
			errorBody = JSON.parse(errorBodyText);
		} catch (e) {
			// ignore
		}

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

export interface PaginationInfo {
	page: number;
	limit: number;
	totalUsers: number;
	totalPages: number;
}

export interface ResumeAIUsage {
	resumeId: string;
	requestsCount: number;
	tokensUsed: number;
	costUsd: number;
}

export interface AIStats {
	totalCalls: number;
	failedCalls: number;
	failureRatePercent: number;
	totalTokens: number;
	totalCostUsd: number;
	perResumeUsage: ResumeAIUsage[];
}

export interface DownloadStats {
	total: number;
	pdf: number;
	docx: number;
	hasAtLeastOneDownload: boolean;
	downloadsPerUser: number;
}

export interface UserAnalyticsItem {
	userId: string | number;
	hasAtLeastOneResume: boolean;
	totalLiveResumes: number;
	lastResumeUpdatedAt: string;
	downloads: DownloadStats;
	ai: AIStats;
}

export interface UserAnalyticsResponse {
	pagination: PaginationInfo;
	users: UserAnalyticsItem[];
}

// AI Invocation Specifics
export interface AIInvocationItem {
	id: string;
	resumeId: string;
	keyName: string;
	userInput: string;
	response: string;
	status: "success" | "failure" | "timeout" | string;
	errorCode: string | null;
	errorMessage: string | null;
	inputTokens: number;
	outputTokens: number;
	createdAt: string;
}

export interface AIInvocationSummary {
	totalInvocations: number;
	successCount: number;
	errorCount: number;
	timeoutCount: number;
	failedCalls: number;
	failureRatePercent: number;
	totalTokens: number;
	totalCostUsd: number;
	averageLatencyMs: number;
}

export interface AIInvocationsResponse {
	pagination: PaginationInfo & { totalInvocations: number };
	summary: AIInvocationSummary;
	invocations: AIInvocationItem[];
}

// JD Match
export interface JDMatchResult {
	match_score: number;
	verdict: string;
	matched_keywords: string[];
	missing_keywords: string[];
	missing_skills: string[];
	suggestions: string[];
	summary: string;
}

export interface JDMatchResponse {
	success: boolean;
	jdMatch: JDMatchResult;
}

// ----- Helpers -----

/** Safely parse any date-like value into a valid Date. Handles the backend bug where hour=24 is returned. */
export const safeParseDate = (value: unknown): Date => {
	let parsedDate = new Date("invalid");

	if (value instanceof Date) {
		parsedDate = value;
	} else if (typeof value === "string" && value.length > 0) {
		let str = value;
		// Fix backend bug: hour 24 is invalid ISO — normalize T24:xx:xx to T00:xx:xx
		const h24Match = str.match(/^(\d{4}-\d{2}-\d{2})T24:(.*)$/);
		if (h24Match) {
			str = `${h24Match[1]}T00:${h24Match[2]}`;
		}
		const d = new Date(str);
		if (!isNaN(d.getTime())) {
			parsedDate = d;
		} else {
			// Try numeric string (unix ms)
			const num = Number(str);
			if (!isNaN(num)) {
				const d2 = new Date(num);
				if (!isNaN(d2.getTime())) parsedDate = d2;
			}
		}
	} else if (typeof value === "number") {
		const d = new Date(value);
		if (!isNaN(d.getTime())) parsedDate = d;
	}

	// Fix backend bug: Backend mixes IST Date with UTC Time between midnight and 5:30 AM IST,
	// which creates a timestamp exactly 24 hours in the future.
	if (!isNaN(parsedDate.getTime())) {
		const now = Date.now();
		// If the date is more than 5 minutes in the future, it's definitely the +24hr bug
		if (parsedDate.getTime() > now + 5 * 60 * 1000) {
			parsedDate = new Date(parsedDate.getTime() - 24 * 60 * 60 * 1000);
		}
	}

	return parsedDate;
};

/** Normalize various date formats (e.g., MM/YYYY) into YYYY-MM-DD for HTML date inputs */
export const normalizeDateForInput = (dateStr: string | undefined | null): string => {
	if (!dateStr) return "";
	
	// Already YYYY-MM-DD
	if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
	
	// Try MM/YYYY or MM-YYYY
	const mmYyyyMatch = dateStr.match(/^(\d{1,2})[\/\-](\d{4})$/);
	if (mmYyyyMatch) {
		return `${mmYyyyMatch[2]}-${mmYyyyMatch[1].padStart(2, "0")}-02`; // Use 02 to avoid timezone underflow
	}
	
	// Try parsing with Date
	const d = new Date(dateStr);
	if (!isNaN(d.getTime())) {
		return d.toISOString().split("T")[0];
	}
	
	return dateStr;
};

const scrubMockStrings = (obj: any): any => {
	if (Array.isArray(obj)) {
		return obj.map(scrubMockStrings);
	}
	if (obj !== null && typeof obj === "object") {
		const result: any = {};
		let hasDummyString = false;
		for (const key of Object.keys(obj)) {
			if (typeof obj[key] === "string" && obj[key] === "string") {
				hasDummyString = true;
			}
			result[key] = scrubMockStrings(obj[key]);
		}

		// If this object had dummy strings, it's likely a mocked object.
		// Reset its 'hidden' property to false so it doesn't appear dim.
		if (hasDummyString && "hidden" in result) {
			result.hidden = false;
		}

		return result;
	}
	if (typeof obj === "string" && obj === "string") {
		return "";
	}
	return obj;
};

const mapResume = (resume: ResumeSummary): ResumeSummary => {
	const data = scrubMockStrings(resume.data ?? {});
	const sections = data.sections ?? {};
	const experience = sections.experience ?? { items: [] };
	const education = sections.education ?? { items: [] };

	return {
		...resume,
		tags: resume.tags ?? [],
		isPublic: resume.isPublic ?? false,
		isLocked: resume.isLocked ?? false,
		createdAt: safeParseDate(resume.createdAt),
		updatedAt: safeParseDate(resume.updatedAt),
		data: {
			...defaultResumeData,
			...data,
			picture: {
				...defaultResumeData.picture,
				...(data.picture || {}),
			},
			basics: {
				...defaultResumeData.basics,
				...(data.basics || {}),
			},
			summary: {
				...defaultResumeData.summary,
				...(data.summary || {}),
			},
			metadata: {
				...defaultResumeData.metadata,
				...(data.metadata || {}),
				typography: {
					...defaultResumeData.metadata.typography,
					...(data.metadata?.typography || {}),
				},
				page: {
					...defaultResumeData.metadata.page,
					...(data.metadata?.page || {}),
				},
				design: {
					...defaultResumeData.metadata.design,
					...(data.metadata?.design || {}),
				},
			},
			sections: {
				...defaultResumeData.sections,
				...sections,
				education: {
					...education,
					items: (education.items || []).map((item: Record<string, any>) => {
						let description = typeof item.description === "string" ? item.description : "";
						let modeData: any = {};

						const commentMatch = description.match(/<!-- modeData: (.*?) -->/);
						if (commentMatch) {
							try {
								modeData = JSON.parse(decodeURIComponent(commentMatch[1]));
							} catch (e) {
								// ignore
							}
							description = description.replace(commentMatch[0], "").trim();
						}

						// If modeData is empty (e.g. older data), populate it from current real fields based on college mode
						if (Object.keys(modeData).length === 0) {
							if (item.college === "School") {
								modeData.schoolName_school = item.school || "";
								modeData.board_school = item.degree || "";
								modeData.percentage_school = item.grade || "";
							} else {
								modeData.collegeName_college = item.school || "";
								modeData.degree_college = item.degree || "";
								modeData.specialization_college = item.area || "";
								modeData.cgpa_college = item.grade || "";
							}
						}

						return {
							...item,
							...modeData,
							description,
							startDate: normalizeDateForInput(item.startDate),
							endDate: normalizeDateForInput(item.endDate),
							school: item.school === " " ? "" : (item.school || ""),
						};
					}) as any[],
				},
				projects: {
					...(sections.projects ?? { items: [] }),
					items: ((sections.projects?.items as Record<string, any>[]) || []).map((item) => {
						let description = typeof item.description === "string" ? item.description : "";
						let role = typeof item.role === "string" ? item.role : "";

						if (!role && description) {
							const commentMatch = description.match(/<!-- role: (.*?) -->/);
							if (commentMatch) {
								try {
									role = decodeURIComponent(commentMatch[1]);
								} catch (e) {
									role = commentMatch[1];
								}
								description = description.replace(commentMatch[0], "").trim();
							}
						}

						return {
							...item,
							description,
							role,
						};
					}) as any[],
				},
				experience: {
					...experience,
					items: (experience.items || []).map((item: Record<string, any>) => {
						let expData: any = {};
						let description = typeof item.description === "string" ? item.description : "";
						const commentMatch = description.match(/<!-- expData: (.*?) -->/);
						if (commentMatch) {
							try {
								expData = JSON.parse(decodeURIComponent(commentMatch[1]));
								description = description.replace(commentMatch[0], "").trim();
							} catch (e) {}
						}
						
						return {
							...item,
							description,
							startDate: normalizeDateForInput(expData.startDate || item.startDate || ""),
							endDate: normalizeDateForInput(expData.endDate || item.endDate || ""),
							currentlyWorkingHere: expData.currentlyWorkingHere ?? item.currentlyWorkingHere ?? false,
						};
					}) as any[],
				},
				languages: {
					...(sections.languages || { items: [] }),
					items: ((sections.languages || {}).items || []).map((item: Record<string, any>) => {
						let icon = item.icon || "translate";
						try {
							if (item.fluency) {
								const parsed = JSON.parse(item.fluency);
								if (parsed.icon) {
									icon = parsed.icon;
								}
							}
						} catch (e) {}
						return {
							...item,
							icon,
						};
					}) as any[],
				},
				interests: {
					...(sections.interests || { items: [] }),
					items: ((sections.interests || {}).items || []).map((item: Record<string, any>) => {
						let name = item.name || "";
						let icon = item.icon;
						const match = name.match(/<!-- icon: (.*?) -->/);
						if (match) {
							icon = match[1];
							name = name.replace(match[0], "").trim();
						}
						return {
							...item,
							name,
							icon: icon === "heart" || icon === "football" ? "star" : (icon || "star"),
						};
					}) as any[],
				},
			},
		},
	};
};

// ----- API -----

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
		if (resumes?.[0]) {
			console.log("[date-debug] raw resume dates:", { createdAt: resumes[0].createdAt, updatedAt: resumes[0].updatedAt, type_created: typeof resumes[0].createdAt, type_updated: typeof resumes[0].updatedAt });
		}
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
	fetchStatistics: async () => {
		const stats = await request<ResumeStatistics>("/resumes/statistics");
		console.log("[date-debug] raw statistics:", JSON.stringify(stats));
		return stats;
	},

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

	// 13. GET: /analytics/users
	fetchUserAnalytics: (page: number, limit: number) =>
		request<UserAnalyticsResponse>(`/analytics/users?page=${page}&limit=${limit}`),

	// 14. GET: /analytics/users/{user_id}/ai-invocations
	fetchUserAIInvocations: (userId: string | number, page: number, limit: number) =>
		request<AIInvocationsResponse>(`/analytics/users/${userId}/ai-invocations?page=${page}&limit=${limit}`),

	// 15. GET: /auth/me (Current user profile)
	fetchProfile: async () => {
		return request<{ id: string; email: string; name?: string }>("/auth/me");
	},

	// 16. POST: /ai/jd-match
	// NOTE: VITE_AI_BASE_URL_DEV ends with /openapi but jd-match lives at /api/ai/jd-match.
	// We derive the correct base by removing the trailing /openapi segment.
	jdMatch: (payload: { resume_id: string; jd_text: string }) => {
		const baseUrl = VITE_AI_BASE_URL_DEV.replace(/\/openapi$/, "");
		const token = getAuthToken();
		return fetch(`${baseUrl}/ai/jd-match`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(payload),
		}).then(async (res) => {
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || `Request failed with status ${res.status}`);
			}
			return res.json() as Promise<JDMatchResponse>;
		});
	},
	// 17. POST: /ai/jd-match-upload
	jdMatchUpload: (payload: { resume_upload: File; jd_text: string }) => {
		const baseUrl = VITE_AI_BASE_URL_DEV.replace(/\/openapi$/, "");
		const token = getAuthToken();

		const formData = new FormData();
		formData.append("resume_upload", payload.resume_upload);
		formData.append("jd_text", payload.jd_text);

		return fetch(`${baseUrl}/ai/jd-match-upload`, {
			method: "POST",
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: formData,
		}).then(async (res) => {
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || `Request failed with status ${res.status}`);
			}
			return res.json() as Promise<JDMatchResponse>;
		});
	},

	// 18. POST: /ai/resume-upload
	resumeUpload: (payload: { resume_upload: File }) => {
		const baseUrl = VITE_AI_BASE_URL_DEV.replace(/\/openapi$/, "");
		const token = getAuthToken();

		const formData = new FormData();
		formData.append("resume_upload", payload.resume_upload);

		return fetch(`${baseUrl}/ai/resume-upload`, {
			method: "POST",
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: formData,
		}).then(async (res) => {
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || `Request failed with status ${res.status}`);
			}
			return res.json() as Promise<any>;
		});
	},

	// 19. POST: /ai/onboarding-jd-match
	onboardingJdMatch: (payload: { jd_text: string; onboarding_questions: any; onboarding_answers: any }) => {
		const baseUrl = VITE_AI_BASE_URL_DEV.replace(/\/openapi$/, "");
		const token = getAuthToken();
		return fetch(`${baseUrl}/ai/onboarding-jd-match`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(payload),
		}).then(async (res) => {
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || `Request failed with status ${res.status}`);
			}
			return res.json() as Promise<any>; // Should return jd_match_id and report
		});
	},

	// 20. POST: /ai/tailor-resume
	tailorResume: (payload: { jd_match_id: string; template?: string }) => {
		const baseUrl = VITE_AI_BASE_URL_DEV.replace(/\/openapi$/, "");
		const token = getAuthToken();
		return fetch(`${baseUrl}/ai/tailor-resume`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(payload),
		}).then(async (res) => {
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || `Request failed with status ${res.status}`);
			}
			return res.json() as Promise<any>; // Should return the generated resume payload
		});
	},
};
