import { t as cn } from "./style-BVXxCckg.js";
import { t as Input } from "./input-C4lW-WI7.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D16KSnDL.js";
import { t as api } from "./api-CLpzZUWU.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { toast } from "sonner";
import { debounce } from "es-toolkit";
import isDeepEqual from "fast-deep-equal";
import { current } from "immer";
import { temporal } from "zundo";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStoreWithEqualityFn } from "zustand/traditional";
var PromptContext = React.createContext(null);
function PromptDialogProvider({ children }) {
	const inputRef = React.useRef(null);
	const [state, setState] = React.useState({
		open: false,
		resolve: null,
		title: "",
		value: "",
		description: void 0,
		defaultValue: void 0,
		confirmText: void 0,
		cancelText: void 0,
		inputProps: void 0
	});
	const cancelText = state.cancelText ?? i18n._({ id: "dEgA5A" });
	const confirmText = state.confirmText ?? i18n._({ id: "7VpPHA" });
	React.useEffect(() => {
		if (!state.open) return;
		setTimeout(() => {
			if (!inputRef.current) return;
			inputRef.current.focus();
		}, 0);
	}, [state.open]);
	const prompt = React.useCallback(async (title, options) => {
		return new Promise((resolve) => {
			setState({
				open: true,
				resolve,
				title,
				value: options?.defaultValue ?? "",
				description: options?.description,
				defaultValue: options?.defaultValue,
				confirmText: options?.confirmText,
				cancelText: options?.cancelText,
				inputProps: options?.inputProps
			});
		});
	}, []);
	const handleConfirm = React.useCallback(() => {
		if (state.resolve) state.resolve(state.value);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null
		}));
	}, [state.resolve, state.value]);
	const handleCancel = React.useCallback(() => {
		if (state.resolve) state.resolve(null);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null
		}));
	}, [state.resolve]);
	const handleValueChange = React.useCallback((e) => {
		setState((prev) => ({
			...prev,
			value: e.target.value
		}));
	}, []);
	const handleKeyDown = React.useCallback((e) => {
		if (e.key === "Enter") handleConfirm();
	}, [handleConfirm]);
	return /* @__PURE__ */ jsxs(PromptContext.Provider, {
		value: { prompt },
		children: [children, /* @__PURE__ */ jsx(AlertDialog, {
			open: state.open,
			onOpenChange: (open) => !open && handleCancel(),
			children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
				/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: state.title }), /* @__PURE__ */ jsx(AlertDialogDescription, {
					className: cn(!state.description && "sr-only"),
					children: state.description
				})] }),
				/* @__PURE__ */ jsx(Input, {
					ref: inputRef,
					value: state.value,
					onKeyDown: handleKeyDown,
					onChange: handleValueChange,
					...state.inputProps
				}),
				/* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, {
					onClick: handleCancel,
					children: cancelText
				}), /* @__PURE__ */ jsx(AlertDialogAction, {
					onClick: handleConfirm,
					children: confirmText
				})] })
			] })
		})]
	});
}
function usePrompt() {
	const context = React.useContext(PromptContext);
	if (!context) throw new Error("usePrompt must be used within a <PromptDialogProvider />.");
	return context.prompt;
}
var t = (strings, ...args) => strings.map((s, i) => s + (args[i] ?? "")).join("");
var _syncResume = (resume) => {
	const dataToSync = JSON.parse(JSON.stringify(resume.data));
	if (dataToSync.sections?.experience?.items) dataToSync.sections.experience.items = dataToSync.sections.experience.items.map((item) => ({
		...item,
		startDate: item.startDate || "",
		endDate: item.endDate || ""
	}));
	if (dataToSync.sections?.education?.items) dataToSync.sections.education.items = dataToSync.sections.education.items.map((item) => ({
		...item,
		startDate: item.startDate || "",
		endDate: item.endDate || ""
	}));
	api.updateResume(resume.id, { data: dataToSync });
};
var syncResume = debounce(_syncResume, 500);
var errorToastId;
const useResumeStore = create()(temporal(persist(immer((set) => ({
	resume: null,
	isReady: false,
	summaryAIRoundsUsed: 0,
	experienceAIRoundsUsed: {},
	projectAIRoundsUsed: {},
	isReviewing: false,
	reviewResult: null,
	showReviewDrawer: false,
	reviewAttempts: 0,
	initialize: (resume) => {
		set((state) => {
			if (!resume) {
				state.resume = null;
				state.isReady = false;
				return;
			}
			if (resume.createdAt && typeof resume.createdAt === "string") resume.createdAt = new Date(resume.createdAt);
			if (resume.updatedAt && typeof resume.updatedAt === "string") resume.updatedAt = new Date(resume.updatedAt);
			const isDifferentResume = state.resume && state.resume.id !== resume.id;
			state.resume = resume;
			state.isReady = true;
			if (isDifferentResume) {
				state.summaryAIRoundsUsed = 0;
				state.experienceAIRoundsUsed = {};
				state.projectAIRoundsUsed = {};
			}
			if (typeof window !== "undefined") {
				const savedReviewData = localStorage.getItem(`resume-review-${resume.id}`);
				if (savedReviewData) try {
					const parsed = JSON.parse(savedReviewData);
					state.reviewResult = parsed.reviewResult || null;
					state.showReviewDrawer = parsed.showReviewDrawer || false;
				} catch (e) {
					console.error("Failed to load saved review data:", e);
				}
				else {
					state.reviewResult = null;
					state.showReviewDrawer = false;
				}
				const attemptsKey = `resume-review-attempts-${resume.id}`;
				const resetKey = `resume-review-reset-date-${resume.id}`;
				const savedAttempts = localStorage.getItem(attemptsKey);
				const savedResetDate = localStorage.getItem(resetKey);
				const today = (/* @__PURE__ */ new Date()).toDateString();
				if (savedResetDate !== today) {
					state.reviewAttempts = 0;
					localStorage.setItem(attemptsKey, JSON.stringify(0));
					localStorage.setItem(resetKey, today);
				} else state.reviewAttempts = savedAttempts ? JSON.parse(savedAttempts) : 0;
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
			if (state.summaryAIRoundsUsed < 2) state.summaryAIRoundsUsed += 1;
		});
	},
	resetSummaryRounds: () => {
		set((state) => {
			state.summaryAIRoundsUsed = 0;
		});
	},
	incrementExperienceRounds: (id) => {
		set((state) => {
			const current$1 = state.experienceAIRoundsUsed[id] ?? 0;
			if (current$1 < 2) state.experienceAIRoundsUsed[id] = current$1 + 1;
		});
	},
	resetExperienceRounds: (id) => {
		set((state) => {
			state.experienceAIRoundsUsed[id] = 0;
		});
	},
	incrementProjectRounds: (id) => {
		set((state) => {
			const current$1 = state.projectAIRoundsUsed[id] ?? 0;
			if (current$1 < 2) state.projectAIRoundsUsed[id] = current$1 + 1;
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
			if (typeof window !== "undefined" && state.resume?.id) {
				const dataToSave = {
					reviewResult: result,
					showReviewDrawer: state.showReviewDrawer
				};
				localStorage.setItem(`resume-review-${state.resume.id}`, JSON.stringify(dataToSave));
			}
		});
	},
	setShowReviewDrawer: (show) => {
		set((state) => {
			state.showReviewDrawer = show;
			if (typeof window !== "undefined" && state.resume?.id) {
				const dataToSave = {
					reviewResult: state.reviewResult,
					showReviewDrawer: show
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
					const today = (/* @__PURE__ */ new Date()).toDateString();
					localStorage.setItem(`resume-review-reset-date-${state.resume.id}`, today);
				}
			}
		});
	}
})), {
	name: "resume-store",
	storage: createJSONStorage(() => {
		if (typeof window !== "undefined" && window.self !== window.top) return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	}),
	partialize: (state) => ({
		summaryAIRoundsUsed: state.summaryAIRoundsUsed,
		experienceAIRoundsUsed: state.experienceAIRoundsUsed,
		projectAIRoundsUsed: state.projectAIRoundsUsed
	})
}), {
	limit: 100,
	equality: (pastState, currentState) => isDeepEqual(pastState, currentState)
}));
function useTemporalStore(selector) {
	return useStoreWithEqualityFn(useResumeStore.temporal, selector);
}
export { usePrompt as i, useTemporalStore as n, PromptDialogProvider as r, useResumeStore as t };
