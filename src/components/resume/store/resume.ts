// Local stub for the `t` template tag (used for simple string passthrough)
// This avoids a hard dependency on @lingui/macro when its types/module aren't available.
const t = (strings: TemplateStringsArray, ...args: any[]) => strings.map((s, i) => s + (args[i] ?? "")).join("");

import { debounce } from "es-toolkit";
import isDeepEqual from "fast-deep-equal";
import type { WritableDraft } from "immer";
import { current } from "immer";
import { toast } from "sonner";
import type { TemporalState } from "zundo";
import { temporal } from "zundo";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStoreWithEqualityFn } from "zustand/traditional";
import type { ResumeData } from "@/schema/resume/data";
import { api } from "@/utils/api";

type Resume = {
	id: string;
	name: string;
	slug: string;
	tags: string[];
	data: ResumeData;
	isLocked: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
};

export type FinalReviewResult = {
	overall_score: number;
	critical: string[];
	important: string[];
	suggestions: string[];
	strengths: string[];
	detailed_checks: {
		photo_verdict: string;
		link_status: string;
		grammar_tense: string;
	};
	final_verdict: "READY" | "NEEDS_MINOR_FIXES" | "NEEDS_MAJOR_WORK";
};

type ResumeStoreState = {
	resume: Resume;
	isReady: boolean;
	summaryAIRoundsUsed: number;
	experienceAIRoundsUsed: Record<string, number>;
	projectAIRoundsUsed: Record<string, number>;
	isReviewing: boolean;
	reviewResult: FinalReviewResult | null;
	showReviewDrawer: boolean;
	reviewAttempts: number;
};

type ResumeStoreActions = {
	initialize: (resume: Resume | null) => void;
	updateResumeData: (fn: (draft: WritableDraft<ResumeData>) => void) => void;
	incrementSummaryRounds: () => void;
	resetSummaryRounds: () => void;
	incrementExperienceRounds: (id: string) => void;
	resetExperienceRounds: (id: string) => void;

	incrementProjectRounds: (id: string) => void;
	resetProjectRounds: (id: string) => void;

	setReviewing: (value: boolean) => void;
	setReviewResult: (result: FinalReviewResult | null) => void;
	setShowReviewDrawer: (show: boolean) => void;
	incrementReviewAttempts: () => void;
};

export type ResumeStore = ResumeStoreState & ResumeStoreActions;

const _syncResume = (resume: Resume) => {
	// Deep clone the data to avoid mutating the original
	const dataToSync = JSON.parse(JSON.stringify(resume.data));

	// Ensure all date fields are properly serialized
	if (dataToSync.sections?.experience?.items) {
		dataToSync.sections.experience.items = dataToSync.sections.experience.items.map(
			(item: Record<string, unknown>) => ({
				...item,
				startDate: item.startDate || "",
				endDate: item.endDate || "",
			}),
		);
	}

	if (dataToSync.sections?.education?.items) {
		dataToSync.sections.education.items = dataToSync.sections.education.items.map((item: Record<string, unknown>) => {
			const {
				schoolName_school,
				board_school,
				percentage_school,
				collegeName_college,
				degree_college,
				specialization_college,
				cgpa_college,
				...rest
			} = item;

			const modeData = {
				schoolName_school,
				board_school,
				percentage_school,
				collegeName_college,
				degree_college,
				specialization_college,
				cgpa_college,
			};

			const comment = `<!-- modeData: ${encodeURIComponent(JSON.stringify(modeData))} -->`;
			let description = typeof rest.description === "string" ? rest.description : "";
			description = description.replace(/<!-- modeData: (.*?) -->/g, "").trim();

			return {
				...rest,
				startDate: rest.startDate || "",
				endDate: rest.endDate || "",
				school: typeof rest.school === "string" && rest.school.trim() === "" ? " " : rest.school,
				description: description ? `${description}\n${comment}` : comment,
			};
		});
	}

	if (dataToSync.sections?.projects?.items) {
		dataToSync.sections.projects.items = dataToSync.sections.projects.items.map((item: Record<string, unknown>) => {
			const { role, ...rest } = item;
			if (typeof role === "string" && role.trim()) {
				const comment = `<!-- role: ${encodeURIComponent(role)} -->`;
				const description = typeof rest.description === "string" ? rest.description : "";
				return {
					...rest,
					description: description ? `${description}\n${comment}` : comment,
				};
			}
			return rest;
		});
	}

	api.updateResume(resume.id, { data: dataToSync });
};

const syncResume = debounce(_syncResume, 500);

let errorToastId: string | number | undefined;

type PartializedState = { resume: Resume | null };

export const useResumeStore = create<ResumeStore>()(
	temporal(
		persist(
			immer((set) => ({
				// --- STATE ---
				resume: null as unknown as Resume,
				isReady: false,
				summaryAIRoundsUsed: 0,
				experienceAIRoundsUsed: {},
				projectAIRoundsUsed: {},
				isReviewing: false,
				reviewResult: null,
				showReviewDrawer: false,
				reviewAttempts: 0,

				// --- ACTIONS ---
				initialize: (resume) => {
					set((state) => {
						if (!resume) {
							state.resume = null as unknown as Resume;
							state.isReady = false;
							return;
						}

						// Hydrate dates if they are strings (common after SSR serialization)
						if (resume.createdAt && typeof resume.createdAt === "string") {
							resume.createdAt = new Date(resume.createdAt);
						}
						if (resume.updatedAt && typeof resume.updatedAt === "string") {
							resume.updatedAt = new Date(resume.updatedAt);
						}

						const isDifferentResume = state.resume && state.resume.id !== resume.id;

						state.resume = resume as Resume;
						state.isReady = true;

						// ✅ Only reset if switching to a completely different resume
						if (isDifferentResume) {
							state.summaryAIRoundsUsed = 0;
							state.experienceAIRoundsUsed = {};
							state.projectAIRoundsUsed = {};
						}

						// ✅ Load persisted review state for this specific resume
						if (typeof window !== "undefined") {
							const savedReviewData = localStorage.getItem(`resume-review-${resume.id}`);
							if (savedReviewData) {
								try {
									const parsed = JSON.parse(savedReviewData);
									state.reviewResult = parsed.reviewResult || null;
									state.showReviewDrawer = parsed.showReviewDrawer || false;
								} catch (e) {
									console.error("Failed to load saved review data:", e);
								}
							} else {
								// No saved data for this resume
								state.reviewResult = null;
								state.showReviewDrawer = false;
							}
							// ✅ Daily Review Attempts Logic
							const attemptsKey = `resume-review-attempts-${resume.id}`;
							const resetKey = `resume-review-reset-date-${resume.id}`;

							const savedAttempts = localStorage.getItem(attemptsKey);
							const savedResetDate = localStorage.getItem(resetKey);
							const today = new Date().toDateString();

							if (savedResetDate !== today) {
								// New day → reset attempts
								state.reviewAttempts = 0;
								localStorage.setItem(attemptsKey, JSON.stringify(0));
								localStorage.setItem(resetKey, today);
							} else {
								// Same day → load attempts
								state.reviewAttempts = savedAttempts ? JSON.parse(savedAttempts) : 0;
							}

							if (savedResetDate !== today) {
								state.reviewAttempts = 0;
								localStorage.setItem(`resume-review-attempts-${resume.id}`, JSON.stringify(0));
								localStorage.setItem(resetKey, today);
							}
						}
					});
				},
				updateResumeData: (fn) => {
					set((state) => {
						if (!state.resume) return;

						if (state.resume.isLocked) {
							errorToastId = toast.error(t`This resume is locked and cannot be updated.`, { id: errorToastId });
							return;
						}

						fn(state.resume.data);
						syncResume(current(state.resume));
					});
				},

				incrementSummaryRounds: () => {
					set((state) => {
						if (state.summaryAIRoundsUsed < 2) {
							state.summaryAIRoundsUsed += 1;
						}
					});
				},

				resetSummaryRounds: () => {
					set((state) => {
						state.summaryAIRoundsUsed = 0;
					});
				},

				incrementExperienceRounds: (id) => {
					set((state) => {
						const current = state.experienceAIRoundsUsed[id] ?? 0;
						if (current < 2) {
							state.experienceAIRoundsUsed[id] = current + 1;
						}
					});
				},

				resetExperienceRounds: (id) => {
					set((state) => {
						state.experienceAIRoundsUsed[id] = 0;
					});
				},

				incrementProjectRounds: (id) => {
					set((state) => {
						const current = state.projectAIRoundsUsed[id] ?? 0;
						if (current < 2) {
							state.projectAIRoundsUsed[id] = current + 1;
						}
					});
				},

				resetProjectRounds: (id) => {
					set((state) => {
						state.projectAIRoundsUsed[id] = 0;
					});
				},

				setReviewing: (value) => {
					set((state) => {
						state.isReviewing = value;
					});
				},

				setReviewResult: (result) => {
					set((state) => {
						state.reviewResult = result;
						// ✅ Persist review result per resume
						if (typeof window !== "undefined" && state.resume?.id) {
							const dataToSave = {
								reviewResult: result,
								showReviewDrawer: state.showReviewDrawer,
							};
							localStorage.setItem(`resume-review-${state.resume.id}`, JSON.stringify(dataToSave));
						}
					});
				},

				setShowReviewDrawer: (show) => {
					set((state) => {
						state.showReviewDrawer = show;
						// ✅ Persist drawer state per resume
						if (typeof window !== "undefined" && state.resume?.id) {
							const dataToSave = {
								reviewResult: state.reviewResult,
								showReviewDrawer: show,
							};
							localStorage.setItem(`resume-review-${state.resume.id}`, JSON.stringify(dataToSave));
						}
					});
				},
				incrementReviewAttempts: () => {
					set((state) => {
						if (state.reviewAttempts < 2) {
							state.reviewAttempts += 1;

							if (typeof window !== "undefined" && state.resume?.id) {
								localStorage.setItem(`resume-review-attempts-${state.resume.id}`, JSON.stringify(state.reviewAttempts));

								const today = new Date().toDateString();
								localStorage.setItem(`resume-review-reset-date-${state.resume.id}`, today);
							}
						}
					});
				},
			})),
			{
				name: "resume-store", // ✅ belongs to persist
				storage: createJSONStorage(() => {
					// Disable persistence in iframes to avoid cross-preview interference
					if (typeof window !== "undefined" && window.self !== window.top) {
						return {
							getItem: () => null,
							setItem: () => {},
							removeItem: () => {},
						};
					}
					return localStorage;
				}),
				partialize: (state) => ({
					// Don't persist resume data — always fetched fresh from API on page load.
					// Persisting it caused stale localStorage to overwrite fresh API data,
					// which stripped startDate/endDate/currentlyWorkingHere after refresh.
					summaryAIRoundsUsed: state.summaryAIRoundsUsed,
					experienceAIRoundsUsed: state.experienceAIRoundsUsed,
					projectAIRoundsUsed: state.projectAIRoundsUsed,
				}),
			},
		),
		{
			limit: 100, // ✅ belongs to temporal
			equality: (pastState, currentState) => isDeepEqual(pastState, currentState),
		},
	),
);

export function useTemporalStore<T>(selector: (state: TemporalState<PartializedState>) => T): T {
	return useStoreWithEqualityFn(useResumeStore.temporal, selector);
}
