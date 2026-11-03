import type { ResumeData } from "@/schema/resume/data";
import { defaultResumeData } from "@/schema/resume/data";
import { sampleResumeData } from "@/schema/resume/sample";
import type { ResumeSummary } from "@/utils/api";

const LOCAL_STORAGE_KEY = "resume_buddy_v1_resumes";

export const isStandaloneMode = (): boolean => {
	if (typeof window === "undefined") {
		return process.env.VITE_STANDALONE_MODE !== "false";
	}
	// Check localStorage override first
	const localOverride = localStorage.getItem("VITE_STANDALONE_MODE");
	if (localOverride !== null) {
		return localOverride !== "false";
	}
	// In resume-buddy-v1, standalone mode is enabled by default unless explicitly disabled
	if (import.meta.env.VITE_STANDALONE_MODE === "false" || import.meta.env.VITE_STANDALONE_MODE === false) {
		return false;
	}
	return true;
};

export const getInitialSampleResume = (): ResumeSummary => {
	const now = new Date();
	return {
		id: "sample-resume-v1",
		name: "Sample Resume (Prototype)",
		slug: "sample-resume-v1",
		tags: ["Sample", "Software"],
		data: sampleResumeData,
		isPublic: false,
		isLocked: false,
		createdAt: now,
		updatedAt: now,
	};
};

export const localResumeStore = {
	getAll(): ResumeSummary[] {
		if (typeof window === "undefined") return [getInitialSampleResume()];
		try {
			const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (!raw) {
				const initial = [getInitialSampleResume()];
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
				return initial;
			}
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? parsed : [getInitialSampleResume()];
		} catch (e) {
			console.warn("Failed to load local resumes from localStorage", e);
			return [getInitialSampleResume()];
		}
	},

	getById(id: string): ResumeSummary | null {
		const all = this.getAll();
		const found = all.find((r) => r.id === id);
		if (found) return found;

		// If looking for sample resume or not found, fall back to initial sample
		if (id === "sample-resume-v1" || id === "sample") {
			return getInitialSampleResume();
		}
		return null;
	},

	save(resume: ResumeSummary): void {
		if (typeof window === "undefined") return;
		try {
			const all = this.getAll();
			const index = all.findIndex((r) => r.id === resume.id);
			const updatedResume = {
				...resume,
				updatedAt: new Date(),
			};
			if (index >= 0) {
				all[index] = updatedResume;
			} else {
				all.unshift(updatedResume);
			}
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
		} catch (e) {
			console.warn("Failed to save resume locally", e);
		}
	},

	create(data: {
		name: string;
		slug?: string;
		tags?: string[];
		data?: ResumeData;
		withSampleData?: boolean;
	}): { id: string } {
		const id = `resume_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
		const now = new Date();
		const newResume: ResumeSummary = {
			id,
			name: data.name || "Untitled Resume",
			slug: data.slug || `resume-${Date.now()}`,
			tags: data.tags || [],
			data: data.data || (data.withSampleData ? sampleResumeData : defaultResumeData),
			isPublic: false,
			isLocked: false,
			createdAt: now,
			updatedAt: now,
		};

		this.save(newResume);
		return { id };
	},

	delete(id: string): void {
		if (typeof window === "undefined") return;
		try {
			const all = this.getAll().filter((r) => r.id !== id);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
		} catch (e) {
			console.warn("Failed to delete local resume", e);
		}
	},

	duplicate(id: string, overrides: { name?: string; slug?: string; tags?: string[] } = {}): { id: string } {
		const target = this.getById(id) || getInitialSampleResume();
		const newId = `resume_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
		const now = new Date();
		const duplicated: ResumeSummary = {
			...target,
			id: newId,
			name: overrides.name || `${target.name} (Copy)`,
			slug: overrides.slug || `${target.slug}-copy`,
			tags: overrides.tags || [...target.tags],
			createdAt: now,
			updatedAt: now,
		};
		this.save(duplicated);
		return { id: newId };
	},

	getStatistics() {
		const all = this.getAll();
		return {
			totalResumes: all.length,
			totalDownloads: 0,
			totalViews: 0,
			lastUpdated: all[0]?.updatedAt ? new Date(all[0].updatedAt).toISOString() : new Date().toISOString(),
		};
	},
};
