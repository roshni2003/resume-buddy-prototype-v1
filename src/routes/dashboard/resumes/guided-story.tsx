import { toast } from "sonner";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	CheckCircle,
	Circle,
	Compass,
	Edit3,
	FileText,
	Mic,
	MicOff,
	RefreshCw,
	Sparkles,
	Layers,
	Target,
	HelpCircle,
	Lightbulb,
	Send,
	Flame,
	Plus,
	Trash2,
	Camera,
	Upload,
	User,
	Palette,
	Download,
	ChevronDown,
	ChevronRight,
	Briefcase,
	FolderGit2,
	GraduationCap,
	HeartHandshake,
	X,
	ExternalLink,
	LogOut,
	Volume2,
	VolumeX,
	Key,
	Pencil,
	Undo2,
	RotateCcw,
} from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState, useEffect, useRef } from "react";
import z from "zod";
import { localResumeStore } from "@/utils/local-resumes";
import { templates } from "@/dialogs/resume/template/data";
import { defaultResumeData, type ResumeData } from "@/schema/resume/data";
import { cn } from "@/utils/style";
import {
	isValidEmail,
	isValidOptionalPhone,
	getEmailValidationError,
	getPhoneValidationError,
	getTextValidationError,
	getNameValidationError,
	getCharacterOnlyValidationError,
	sanitizeToCharactersOnly,
	getDatePeriodValidationError,
} from "@/utils/validation";
import { voiceAssistant, formatAchievementBullet } from "@/utils/voice-assistant";
import {
	generateBulletsWithDeepSeek,
	extractTopicsFromStory,
	generateFollowUpQuestionForTopic,
	getDeepSeekApiKey,
} from "@/utils/deepseek-client";
import { getStoredUserProfile } from "@/utils/auth-token";

const searchSchema = z.object({
	step: z.enum(["direction", "outline", "plan"]).optional(),
	resumeId: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/resumes/guided-story")({
	component: GuidedStoryRoute,
	validateSearch: zodValidator(searchSchema),
});

type WorkspaceTab = "plan" | "stories" | "details" | "export";
type OutlineCategory = "work" | "projects" | "education" | "volunteer";

interface OutlineEntry {
	id: string;
	category: OutlineCategory;
	title: string;
	organization?: string;
	dates?: string;
	description?: string;
	points?: string[];
	answers?: string[];
	priorityScore?: number;
}

interface PlanItem {
	id: string;
	title: string;
	description: string;
	status: "Completed" | "In progress" | "Not started" | "Needs review";
	tab: WorkspaceTab;
}

interface StoryItem {
	id: string;
	companyOrProject: string;
	type: "project" | "work" | "internship" | "education";
	role: string;
	contribution: string;
	problem: string;
	approach: string;
	evidenceResult: string;
	finalBullets: string[];
	status: "draft" | "approved";
}

export function GuidedStoryRoute() {
	const navigate = useNavigate();
	const search = Route.useSearch();

	// Wizard Stages: direction (Step 1) -> outline (Step 2) -> plan (Step 3 / Editor)
	const [wizardStep, setWizardStep] = useState<"direction" | "outline" | "plan">(() => {
		if (search?.step) return search.step;
		return "direction";
	});

	useEffect(() => {
		if (search?.step) {
			setWizardStep(search.step);
		}
	}, [search?.step]);

	// Listen for template changes across the app
	useEffect(() => {
		const handleTemplateChange = () => {
			try {
				const draft = localStorage.getItem("resume_buddy_guided_story_draft");
				if (draft) {
					const parsed = JSON.parse(draft);
					if (parsed.selectedTemplate) {
						setSelectedTemplate(parsed.selectedTemplate);
					}
				}
			} catch {
				// ignore
			}
		};

		window.addEventListener("resume_template_changed", handleTemplateChange);
		return () => {
			window.removeEventListener("resume_template_changed", handleTemplateChange);
		};
	}, []);

	// Load specific resume when resumeId search parameter is provided
	useEffect(() => {
		if (search?.resumeId) {
			const targetId = search.resumeId;
			setCreatedResumeId(targetId);

			try {
				const resumeItem = localResumeStore.get(targetId);
				if (resumeItem && resumeItem.data) {
					const data = resumeItem.data;
					if (data.basics?.name) setFullName(data.basics.name);
					if (data.basics?.headline) setTargetRole(data.basics.headline);
					if (data.metadata?.template) setSelectedTemplate(data.metadata.template);

					// Parse sections into outline entries
					const loadedEntries: OutlineEntry[] = [];

					// 1. Experience (Work)
					if (data.sections?.experience?.items) {
						data.sections.experience.items.forEach((exp: any, idx: number) => {
							const bullets: string[] = [];
							if (exp.description) {
								const clean = exp.description.replace(/<[^>]*>/g, "\n");
								clean.split("\n").map((b: string) => b.trim()).filter(Boolean).forEach((b: string) => bullets.push(b));
							}
							loadedEntries.push({
								id: exp.id || `work_${idx}`,
								category: "work",
								title: exp.position || "Role",
								organization: exp.company || "",
								dates: exp.period || "",
								points: bullets,
							});
						});
					}

					// 2. Projects
					if (data.sections?.projects?.items) {
						data.sections.projects.items.forEach((proj: any, idx: number) => {
							const bullets: string[] = [];
							if (proj.description) {
								const clean = proj.description.replace(/<[^>]*>/g, "\n");
								clean.split("\n").map((b: string) => b.trim()).filter(Boolean).forEach((b: string) => bullets.push(b));
							}
							loadedEntries.push({
								id: proj.id || `proj_${idx}`,
								category: "projects",
								title: proj.name || "Project",
								organization: "",
								dates: proj.period || "",
								points: bullets,
							});
						});
					}

					// 3. Education
					if (data.sections?.education?.items) {
						data.sections.education.items.forEach((edu: any, idx: number) => {
							loadedEntries.push({
								id: edu.id || `edu_${idx}`,
								category: "education",
								title: edu.degree || edu.area || "Degree",
								organization: edu.school || "",
								dates: edu.period || "",
								points: [],
							});
						});
					}

					// 4. Volunteer
					if (data.sections?.volunteer?.items) {
						data.sections.volunteer.items.forEach((vol: any, idx: number) => {
							loadedEntries.push({
								id: vol.id || `vol_${idx}`,
								category: "volunteer",
								title: vol.position || "Volunteer",
								organization: vol.organization || "",
								dates: vol.period || "",
								points: [],
							});
						});
					}

					if (loadedEntries.length > 0) {
						setOutlineEntries(loadedEntries);
					}
				}
			} catch (err) {
				console.warn("Failed to load specific resume by ID:", err);
			}
		}
	}, [search?.resumeId]);

	// Navigation Tabs inside Workspace (Step 3)
	const [activeTab, setActiveTab] = useState<WorkspaceTab>("plan");

	// Step 1: Direction State
	const [targetRole, setTargetRole] = useState(() => {
		if (typeof window === "undefined") return "";
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (p.targetRole) return p.targetRole;
			}
		} catch { }
		return "";
	});
	const [jobDescription, setJobDescription] = useState("");
	const [showJobDescription, setShowJobDescription] = useState(false);
	const [isAudioMuted, setIsAudioMuted] = useState(false);

	// Global Text-to-Speech voice synthesis helper
	const speakText = (text: string) => {
		if (isAudioMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
		try {
			window.speechSynthesis.cancel();
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 1.0;
			utterance.pitch = 1.0;
			utterance.lang = "en-US";
			window.speechSynthesis.speak(utterance);
		} catch (e) {
			console.warn("Speech synthesis error:", e);
		}
	};

	// Auto-speak questions when entering a step or changing active question
	useEffect(() => {
		if (wizardStep === "direction") {
			const timer = setTimeout(() => {
				speakText("What role are you targeting? Tell Zoe the role you are aiming for.");
			}, 400);
			return () => clearTimeout(timer);
		} else if (wizardStep === "outline") {
			const timer = setTimeout(() => {
				speakText("What can we draw from? Tell me about yourself and the work you have done so far.");
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [wizardStep]);

	// Step 2: Story Collection State
	const [rawStoryText, setRawStoryText] = useState("");
	const [isAnalyzingStory, setIsAnalyzingStory] = useState(false);
	const [activeInputMode, setActiveInputMode] = useState<"natural_story" | "manual_tabs">("natural_story");
	const [zoeFeedbackMessage, setZoeFeedbackMessage] = useState<string | null>(null);

	// Step 2 Manual Outline State
	const [outlineCategory, setOutlineCategory] = useState<OutlineCategory>("work");
	const [workTitle, setWorkTitle] = useState("");
	const [workCompany, setWorkCompany] = useState("");
	const [workDates, setWorkDates] = useState("");

	const [projectTitle, setProjectTitle] = useState("");
	const [projectTech, setProjectTech] = useState("");
	const [projectDates, setProjectDates] = useState("");

	const [eduDegree, setEduDegree] = useState("");
	const [eduSchool, setEduSchool] = useState("");
	const [eduDates, setEduDates] = useState("");

	const [volRole, setVolRole] = useState("");
	const [volOrg, setVolOrg] = useState("");
	const [volDates, setVolDates] = useState("");

	const [outlineEntries, setOutlineEntries] = useState<OutlineEntry[]>(() => {
		if (typeof window === "undefined") return [];
		try {
			const saved = localStorage.getItem("resume_buddy_outline_entries");
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) return parsed;
			}
		} catch { }
		return [];
	});

	// History stack for Undo in Step 2: "What can we draw from?"
	const [outlineHistory, setOutlineHistory] = useState<OutlineEntry[][]>([]);

	const pushOutlineSnapshot = (entries: OutlineEntry[]) => {
		setOutlineHistory((prev) => [...prev.slice(-20), entries]);
	};

	const handleUndoOutline = () => {
		if (outlineHistory.length === 0) {
			toast.info("Nothing to undo");
			return;
		}
		const previousState = outlineHistory[outlineHistory.length - 1];
		setOutlineHistory((prev) => prev.slice(0, -1));
		setOutlineEntries(previousState);
		toast.success("Changes undone");
	};

	// Keyboard shortcut for Undo (Ctrl+Z / Cmd+Z) during Step 2
	useEffect(() => {
		if (wizardStep !== "outline") return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
				const activeTag = (document.activeElement?.tagName || "").toLowerCase();
				if (activeTag === "input" || activeTag === "textarea") {
					return; // Allow standard input undo when focused inside an input field
				}
				e.preventDefault();
				handleUndoOutline();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [wizardStep, outlineHistory]);

	const [showVoiceOption, setShowVoiceOption] = useState(false);
	const [isSpeakingOutline, setIsSpeakingOutline] = useState(false);

	// Experience confirmation screen states
	const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
	const [isAddingManual, setIsAddingManual] = useState(false);
	const [newManualTitle, setNewManualTitle] = useState("");
	const [newManualCategory, setNewManualCategory] = useState<OutlineCategory>("work");
	const [newManualOrg, setNewManualOrg] = useState("");
	const [newManualDesc, setNewManualDesc] = useState("");

	// Resume editor states
	const [fullName, setFullName] = useState(() => {
		if (typeof window === "undefined") return "";
		try {
			const savedProfile = getStoredUserProfile();
			if (savedProfile?.name) return savedProfile.name;
			const localRaw = localStorage.getItem("resume_buddy_user_profile");
			if (localRaw) {
				const p = JSON.parse(localRaw);
				if (p.name) return p.name;
			}
		} catch { }
		return "";
	});
	const [createdResumeId, setCreatedResumeId] = useState<string | null>(null);
	const [pictureUrl, setPictureUrl] = useState("");
	const [showPicture, setShowPicture] = useState(true);
	const [pictureShape, setPictureShape] = useState<"circle" | "rounded" | "square">("circle");
	const [selectedTemplate, setSelectedTemplate] = useState(() => {
		if (typeof window === "undefined") return "Azurill";
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (p.selectedTemplate) return p.selectedTemplate;
			}
		} catch { }
		return "Azurill";
	});
	const [showTemplateModal, setShowTemplateModal] = useState(false);
	const [savedToLibrary, setSavedToLibrary] = useState(false);

	// Stories & Interactive Chat State
	const [stories, setStories] = useState<StoryItem[]>([]);
	const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
	const [experienceAnswers, setExperienceAnswers] = useState<Record<string, string[]>>({});
	const [experienceInputText, setExperienceInputText] = useState("");
	const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
	const [isSpeakingAnswer, setIsSpeakingAnswer] = useState(false);

	// Final summary and confirmation review modal state (Section 10, 11, 12)
	const [showFinalSummaryModal, setShowFinalSummaryModal] = useState(false);
	const [editingPointKey, setEditingPointKey] = useState<string | null>(null);
	const [editingPointText, setEditingPointText] = useState("");
	const [addingPointEntryId, setAddingPointEntryId] = useState<string | null>(null);
	const [newPointInputText, setNewPointInputText] = useState("");

	// UI Toggle: hide resume preview
	const [hideResumePreview, setHideResumePreview] = useState(false);
	const [storyCategoryFilter, setStoryCategoryFilter] = useState<"all" | "work" | "projects">("all");
	const [activeExplorationQuestionIndex, setActiveExplorationQuestionIndex] = useState<Record<string, number>>({});
	const [editingDetailEntryId, setEditingDetailEntryId] = useState<string | null>(null);
	const [showHowZoeHelpsModal, setShowHowZoeHelpsModal] = useState(false);
	const [professionalSummary, setProfessionalSummary] = useState("");
	const [isEditingSummary, setIsEditingSummary] = useState(false);

	// Stories view mode: "overview" | "interview" (active question-answer) | "checklist" ("Here's what I heard") | "topic_drilldown" (asking about each topic one by one)
	const [storiesViewMode, setStoriesViewMode] = useState<"overview" | "interview" | "checklist" | "topic_drilldown">("overview");
	const [interviewActiveEntryId, setInterviewActiveEntryId] = useState<string | null>(null);

	// "Here's what I heard" extracted points checklist state
	const [extractedTopics, setExtractedTopics] = useState<Array<{ id: string; text: string; selected: boolean }>>([]);
	const [customTopicInput, setCustomTopicInput] = useState("");
	const [isAddingCustomTopic, setIsAddingCustomTopic] = useState(false);
	const [isExtractingTopics, setIsExtractingTopics] = useState(false);

	// Topic Drilldown state (asking questions for each checked topic one by one)
	const [drilldownTopicIndex, setDrilldownTopicIndex] = useState(0);
	const [currentTopicQuestion, setCurrentTopicQuestion] = useState("");
	const [isLoadingTopicQuestion, setIsLoadingTopicQuestion] = useState(false);

	// Quick Add Dialog for Projects / Volunteering / Education from Stories Overview
	const [quickAddSectionModalOpen, setQuickAddSectionModalOpen] = useState(false);
	const [quickAddCategory, setQuickAddCategory] = useState<OutlineCategory>("projects");
	const [quickAddTitle, setQuickAddTitle] = useState("");
	const [quickAddOrg, setQuickAddOrg] = useState("");
	const [quickAddDates, setQuickAddDates] = useState("");
	const [quickAddDescription, setQuickAddDescription] = useState("");

	// Auto-speak question when user opens an interview for an experience
	useEffect(() => {
		if (activeTab === "stories" && storiesViewMode === "interview" && interviewActiveEntryId) {
			const entry = outlineEntries.find((e) => e.id === interviewActiveEntryId) || outlineEntries[0];
			if (entry) {
				const q = getFocusedQuestionForExperience(entry);
				if (q?.question) {
					speakText(q.question);
				}
			}
		}
	}, [activeTab, storiesViewMode, interviewActiveEntryId]);
	const [showZoeSectionPrompt, setShowZoeSectionPrompt] = useState(true);
	const [activeSectionPromptType, setActiveSectionPromptType] = useState<"projects" | "education" | "volunteer">("projects");
	const [dismissedPlanSectionPrompt, setDismissedPlanSectionPrompt] = useState(false);
	const [isEditingResumeTitle, setIsEditingResumeTitle] = useState(false);
	const [tempResumeTitle, setTempResumeTitle] = useState("");
	// Tab 03: Supporting Details state (matching screenshot media_1795019454591_659f3f35.jpg)
	const [detailsSubTab, setDetailsSubTab] = useState<"contact" | "skills" | "summary">("contact");
	const [contactEmail, setContactEmail] = useState(() => {
		if (typeof window === "undefined") return "";
		try {
			const savedProfile = getStoredUserProfile();
			if (savedProfile?.email) return savedProfile.email;
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (p.contactEmail) return p.contactEmail;
			}
		} catch { }
		return "";
	});
	const [contactPhone, setContactPhone] = useState(() => {
		if (typeof window === "undefined") return "";
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (p.contactPhone) return p.contactPhone;
			}
		} catch { }
		return "";
	});
	const [contactLocation, setContactLocation] = useState(() => {
		if (typeof window === "undefined") return "";
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (p.contactLocation) return p.contactLocation;
			}
		} catch { }
		return "";
	});
	const [contactLinks, setContactLinks] = useState(() => {
		if (typeof window === "undefined") return "";
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (p.contactLinks) return p.contactLinks;
			}
		} catch { }
		return "";
	});
	const [skillsList, setSkillsList] = useState<string[]>(() => {
		if (typeof window === "undefined") return [];
		try {
			const saved = localStorage.getItem("resume_buddy_guided_story_draft");
			if (saved) {
				const p = JSON.parse(saved);
				if (Array.isArray(p.skillsList)) return p.skillsList;
			}
		} catch { }
		return [];
	});
	const [newSkillInput, setNewSkillInput] = useState("");

	const [currentStep, setCurrentStep] = useState<
		"role_setup" | "pick_topic" | "describe_work" | "clarify_impact" | "generate_bullet" | "review_approve" | "success"
	>("pick_topic");
	const [activeStoryType, setActiveStoryType] = useState<"project" | "work" | "internship" | "education">("work");
	const [activeProjectName, setActiveProjectName] = useState("");
	const [activeContribution, setActiveContribution] = useState("");
	const [activeProblem, setActiveProblem] = useState("");
	const [activeEvidence, setActiveEvidence] = useState("");
	const [generatedBullet, setGeneratedBullet] = useState("");
	const [editedBullet, setEditedBullet] = useState("");
	const [isRecording, setIsRecording] = useState(false);
	const [chatInput, setChatInput] = useState("");

	// Calculate priority score for an experience based on target role relevance and strength
	const computeExperiencePriority = (entry: OutlineEntry, roleTarget = targetRole): number => {
		let score = 50; // base score
		const targetWords = (roleTarget || "Developer").toLowerCase().split(/\s+/).filter(Boolean);
		const titleLower = entry.title.toLowerCase();
		const descLower = (entry.description || "").toLowerCase();
		const orgLower = (entry.organization || "").toLowerCase();
		const combined = `${titleLower} ${descLower} ${orgLower}`;

		// Target role alignment (+30 to +50 points)
		for (const word of targetWords) {
			if (word.length > 2 && combined.includes(word)) {
				score += 25;
			}
		}

		// High-impact leadership and technical keywords (+15 to +30 points)
		if (combined.includes("lead") || combined.includes("senior") || combined.includes("architect")) score += 20;
		if (combined.includes("mentor") || combined.includes("guided") || combined.includes("coached")) score += 25; // Mentorship strongly strengthens resume
		if (combined.includes("ai") || combined.includes("llm") || combined.includes("speech") || combined.includes("real-time")) score += 20;
		if (combined.includes("built") || combined.includes("engineered") || combined.includes("shipped") || combined.includes("launched")) score += 15;

		// Category weighting
		if (entry.category === "work") score += 15;
		if (entry.category === "projects") score += 10;

		// Extra points if already has verified bullets
		if (entry.points && entry.points.length > 0) {
			score += entry.points.length * 10;
		}

		return score;
	};

	// Helper to insert or sort an entry in the priority list without disrupting order
	const insertWithPriority = (list: OutlineEntry[], newEntry: OutlineEntry): OutlineEntry[] => {
		const newScore = newEntry.priorityScore ?? computeExperiencePriority(newEntry);
		const entryWithScore = { ...newEntry, priorityScore: newScore };

		// If the list is empty, return with new item
		if (list.length === 0) return [entryWithScore];

		// Find the first index where existing entry has a strictly lower priority score
		const insertIdx = list.findIndex(
			(existing) => (existing.priorityScore ?? computeExperiencePriority(existing)) < newScore
		);

		if (insertIdx === -1) {
			// Append at the end if lower than all
			return [...list, entryWithScore];
		}

		const updated = [...list];
		updated.splice(insertIdx, 0, entryWithScore);
		return updated;
	};

	// Sort outline entries by priority
	const sortEntriesByPriority = (entries: OutlineEntry[]): OutlineEntry[] => {
		return [...entries].sort((a, b) => {
			const scoreA = a.priorityScore ?? computeExperiencePriority(a);
			const scoreB = b.priorityScore ?? computeExperiencePriority(b);
			return scoreB - scoreA;
		});
	};

	// Handlers for Step 2: Add Entry
	const handleAddWorkEntry = () => {
		const titleErr = getTextValidationError(workTitle, "Job title", 2, true);
		if (titleErr) {
			toast.error(titleErr);
			return;
		}
		const datesErr = getDatePeriodValidationError(workDates, false);
		if (datesErr) {
			toast.error(datesErr);
			return;
		}
		const newEntry: OutlineEntry = {
			id: `work_${Date.now()}`,
			category: "work",
			title: workTitle.trim(),
			organization: workCompany.trim() || undefined,
			dates: workDates.trim() || undefined,
		};
		pushOutlineSnapshot(outlineEntries);
		setOutlineEntries((prev) => insertWithPriority(prev, newEntry));
		setWorkTitle("");
		setWorkCompany("");
		setWorkDates("");
		toast.success("Work experience prioritized and added to outline!");
	};

	const handleAddProjectEntry = () => {
		const titleErr = getTextValidationError(projectTitle, "Project title", 2, true);
		if (titleErr) {
			toast.error(titleErr);
			return;
		}
		const datesErr = getDatePeriodValidationError(projectDates, false);
		if (datesErr) {
			toast.error(datesErr);
			return;
		}
		const newEntry: OutlineEntry = {
			id: `proj_${Date.now()}`,
			category: "projects",
			title: projectTitle.trim(),
			organization: projectTech.trim() || undefined,
			dates: projectDates.trim() || undefined,
		};
		pushOutlineSnapshot(outlineEntries);
		setOutlineEntries((prev) => insertWithPriority(prev, newEntry));
		setProjectTitle("");
		setProjectTech("");
		setProjectDates("");
		toast.success("Project prioritized and added to outline!");
	};

	const handleAddEducationEntry = () => {
		const degreeErr = getTextValidationError(eduDegree, "Degree or qualification", 2, true);
		if (degreeErr) {
			toast.error(degreeErr);
			return;
		}
		const datesErr = getDatePeriodValidationError(eduDates, false);
		if (datesErr) {
			toast.error(datesErr);
			return;
		}
		const newEntry: OutlineEntry = {
			id: `edu_${Date.now()}`,
			category: "education",
			title: eduDegree.trim(),
			organization: eduSchool.trim() || undefined,
			dates: eduDates.trim() || undefined,
		};
		pushOutlineSnapshot(outlineEntries);
		setOutlineEntries((prev) => [...prev, newEntry]);
		setEduDegree("");
		setEduSchool("");
		setEduDates("");
		toast.success("Education added to outline!");
	};

	const handleAddVolunteerEntry = () => {
		const roleErr = getTextValidationError(volRole, "Role or activity", 2, true);
		if (roleErr) {
			toast.error(roleErr);
			return;
		}
		const datesErr = getDatePeriodValidationError(volDates, false);
		if (datesErr) {
			toast.error(datesErr);
			return;
		}
		const newEntry: OutlineEntry = {
			id: `vol_${Date.now()}`,
			category: "volunteer",
			title: volRole.trim(),
			organization: volOrg.trim() || undefined,
			dates: volDates.trim() || undefined,
		};
		pushOutlineSnapshot(outlineEntries);
		setOutlineEntries((prev) => insertWithPriority(prev, newEntry));
		setVolRole("");
		setVolOrg("");
		setVolDates("");
		toast.success("Activity prioritized and added to outline!");
	};

	const handleRemoveEntry = (id: string) => {
		pushOutlineSnapshot(outlineEntries);
		setOutlineEntries((prev) => prev.filter((item) => item.id !== id));
		toast.info("Experience removed");
	};

	const handleUpdateEntry = (id: string, updates: Partial<OutlineEntry>) => {
		pushOutlineSnapshot(outlineEntries);
		setOutlineEntries((prev) =>
			prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
		);
	};

	const handleSaveQuickAddSection = (startStoryInterview: boolean = true) => {
		const titleLabel =
			quickAddCategory === "work"
				? "Job title"
				: quickAddCategory === "projects"
					? "Project title"
					: quickAddCategory === "education"
						? "Degree or qualification"
						: "Role or activity";
		const titleErr = getCharacterOnlyValidationError(quickAddTitle, titleLabel, 2, true) || getTextValidationError(quickAddTitle, titleLabel, 2, true);
		if (titleErr) {
			toast.error(titleErr);
			return;
		}

		if (quickAddOrg.trim()) {
			const orgErr = getCharacterOnlyValidationError(quickAddOrg, "Organization / School", 2, false);
			if (orgErr) {
				toast.error(orgErr);
				return;
			}
		}

		const datesErr = getDatePeriodValidationError(quickAddDates, false);
		if (datesErr) {
			toast.error(datesErr);
			return;
		}

		const newEntry: OutlineEntry = {
			id: `entry_${quickAddCategory}_${Date.now()}`,
			category: quickAddCategory,
			title: quickAddTitle.trim(),
			organization: quickAddOrg.trim() || undefined,
			dates: quickAddDates.trim() || undefined,
			description: quickAddDescription.trim() || undefined,
			points: [],
		};

		setOutlineEntries((prev) => insertWithPriority(prev, newEntry));
		setQuickAddSectionModalOpen(false);
		setQuickAddTitle("");
		setQuickAddOrg("");
		setQuickAddDates("");
		setQuickAddDescription("");

		if (startStoryInterview) {
			setInterviewActiveEntryId(newEntry.id);
			setSelectedExperienceId(newEntry.id);
			setStoriesViewMode("interview");
			toast.success(`Added ${newEntry.title}! Zoe is ready for your story.`);
		} else {
			toast.success(`Added ${newEntry.title} to your outline.`);
		}
	};

	const handleAddManualExperience = () => {
		if (!newManualTitle.trim()) {
			toast.error("Please provide a title");
			return;
		}
		const newEntry: OutlineEntry = {
			id: `entry_manual_${Date.now()}`,
			category: newManualCategory,
			title: newManualTitle.trim(),
			organization: newManualOrg.trim() || undefined,
			description: newManualDesc.trim() || undefined,
			dates: "Recent",
		};
		// Zoe decides where it belongs in the priority order without disrupting existing order
		setOutlineEntries((prev) => insertWithPriority(prev, newEntry));
		setNewManualTitle("");
		setNewManualOrg("");
		setNewManualDesc("");
		setIsAddingManual(false);
		toast.success("Experience placed in priority order!");
	};

	const generateProfessionalSummary = (entries: OutlineEntry[], roleName: string) => {
		const topExperiences = entries.filter((e) => e.category === "work" || e.category === "projects");
		const expTitles = topExperiences.slice(0, 3).map((e) => e.title);
		const bulletSample = topExperiences.flatMap((e) => e.points || []).filter(Boolean);

		// The summary must remain strictly EMPTY until the user has filled in their details and completed actual story points/bullets
		if (entries.length === 0 || topExperiences.length === 0 || bulletSample.length === 0) {
			return "";
		}

		const role = roleName || "Professional";
		let autoSummary = `${role} with demonstrated experience in modern software engineering`;
		if (expTitles.length > 0) {
			autoSummary += `, having contributed across ${expTitles.join(", ")}`;
		}
		autoSummary += `. Proven track record in ${bulletSample[0].charAt(0).toLowerCase() + bulletSample[0].slice(1).replace(/\.$/, "")}`;
		if (bulletSample[1]) {
			autoSummary += `, while actively ${bulletSample[1].charAt(0).toLowerCase() + bulletSample[1].slice(1).replace(/\.$/, "")}`;
		}
		autoSummary += ".";
		return autoSummary;
	};

	const handleSaveProgress = () => {
		try {
			localStorage.setItem(
				"resume_buddy_guided_story_draft",
				JSON.stringify({
					targetRole,
					fullName,
					contactEmail,
					contactPhone,
					contactLocation,
					contactLinks,
					skillsList,
					selectedTemplate,
					createdResumeId,
					updatedAt: new Date().toISOString(),
				})
			);
		} catch { }

		if (createdResumeId) {
			const existing = localResumeStore.get(createdResumeId);
			if (existing) {
				localResumeStore.update(createdResumeId, {
					data: {
						...existing.data,
						basics: {
							...existing.data.basics,
							name: fullName || existing.data.basics.name,
							headline: targetRole || existing.data.basics.headline,
							email: contactEmail || existing.data.basics.email,
							phone: contactPhone || existing.data.basics.phone,
							location: contactLocation || existing.data.basics.location,
							website: { url: contactLinks || existing.data.basics.website?.url || "", label: "" },
						},
						summary: {
							...existing.data.summary,
							content: professionalSummary ? `<p>${professionalSummary}</p>` : "",
						},
						sections: {
							...existing.data.sections,
							skills: {
								title: "Skills",
								columns: 1,
								hidden: skillsList.length === 0,
								items: skillsList.map((skill, idx) => ({
									id: `skill_${idx}`,
									hidden: false,
									icon: "",
									name: skill,
									proficiency: "",
									description: "",
									level: 0,
									keywords: [],
								})),
							},
						},
					},
				});
			}
		}
	};

	// Automatically generate and update professional summary using verified experiences and target role
	useEffect(() => {
		if (isEditingSummary && professionalSummary) return; // don't override manual edits in progress

		const autoSummary = generateProfessionalSummary(outlineEntries, targetRole);
		setProfessionalSummary(autoSummary);
	}, [outlineEntries, targetRole, isEditingSummary]);

	// Save outline entries to localStorage
	useEffect(() => {
		try {
			localStorage.setItem("resume_buddy_outline_entries", JSON.stringify(outlineEntries));
		} catch { }
	}, [outlineEntries]);

	// Create or update resume when user clicks "See my plan →"
	const handleSeeMyPlan = () => {
		// Include any un-submitted field currently in inputs
		let currentEntries = [...outlineEntries];
		if (workTitle.trim()) {
			currentEntries.push({
				id: `work_${Date.now()}`,
				category: "work",
				title: workTitle.trim(),
				organization: workCompany.trim() || undefined,
				dates: workDates.trim() || undefined,
			});
			setWorkTitle("");
			setWorkCompany("");
			setWorkDates("");
		}
		if (projectTitle.trim()) {
			currentEntries.push({
				id: `proj_${Date.now()}`,
				category: "projects",
				title: projectTitle.trim(),
				organization: projectTech.trim() || undefined,
				dates: projectDates.trim() || undefined,
			});
			setProjectTitle("");
			setProjectTech("");
			setProjectDates("");
		}
		if (eduDegree.trim()) {
			currentEntries.push({
				id: `edu_${Date.now()}`,
				category: "education",
				title: eduDegree.trim(),
				organization: eduSchool.trim() || undefined,
				dates: eduDates.trim() || undefined,
			});
			setEduDegree("");
			setEduSchool("");
			setEduDates("");
		}

		setOutlineEntries(currentEntries);

		const workList = currentEntries.filter((e) => e.category === "work");
		const projList = currentEntries.filter((e) => e.category === "projects");
		const eduList = currentEntries.filter((e) => e.category === "education");
		const volList = currentEntries.filter((e) => e.category === "volunteer");

		// Construct populated ResumeData strictly complying with Reactive Resume v4 schema
		const newResumeData: ResumeData = {
			...defaultResumeData,
			basics: {
				...defaultResumeData.basics,
				name: fullName || "",
				headline: targetRole || "",
				email: contactEmail || "",
				phone: contactPhone || "",
				location: contactLocation || "",
				website: { url: contactLinks || "", label: "" },
			},
			summary: {
				...defaultResumeData.summary,
				hidden: !professionalSummary,
				content: professionalSummary ? `<p>${professionalSummary}</p>` : "",
			},
			sections: {
				...defaultResumeData.sections,
				experience: {
					title: "Experience",
					columns: 1,
					hidden: workList.length === 0,
					items: workList.map((w) => ({
						id: w.id,
						hidden: false,
						company: w.organization || "",
						position: w.title,
						location: "",
						period: w.dates || "",
						website: { url: "", label: "" },
						description: w.description ? `<p>${w.description}</p>` : "",
					})),
				},
				projects: {
					title: "Projects",
					columns: 1,
					hidden: projList.length === 0,
					items: projList.map((p) => ({
						id: p.id,
						hidden: false,
						name: p.title,
						role: p.organization || "",
						period: p.dates || "",
						website: { url: "", label: "" },
						description: p.description ? `<p>${p.description}</p>` : "",
					})),
				},
				education: {
					title: "Education",
					columns: 1,
					hidden: eduList.length === 0,
					items: eduList.map((e) => ({
						id: e.id,
						hidden: false,
						school: e.organization || "",
						degree: e.title || "",
						area: "",
						grade: "",
						location: "",
						period: e.dates || "",
						website: { url: "", label: "" },
						description: e.description ? `<p>${e.description}</p>` : "",
						currentlyStudyingHere: false,
					})),
				},
				skills: {
					title: "Skills",
					columns: 1,
					hidden: skillsList.length === 0,
					items: skillsList.map((skill, idx) => ({
						id: `skill_${idx}`,
						hidden: false,
						icon: "",
						name: skill,
						proficiency: "",
						description: "",
						level: 0,
						keywords: [],
					})),
				},
				volunteer: {
					title: "Volunteering & Activities",
					columns: 1,
					hidden: volList.length === 0,
					items: volList.map((v) => ({
						id: v.id,
						hidden: false,
						organization: v.organization || "",
						position: v.title || "",
						location: "",
						period: v.dates || "",
						website: { url: "", label: "" },
						description: v.description ? `<p>${v.description}</p>` : "",
					})),
				},
			},
		};

		// Create in store
		const created = localResumeStore.create({
			name: targetRole ? `${targetRole} Resume` : (fullName ? `${fullName}'s Resume` : "My Resume"),
			data: newResumeData,
		});
		setCreatedResumeId(created.id);

		// Initialize stories for Achievement Studio
		const initialStories: StoryItem[] = workList.map((w, idx) => ({
			id: `story_${idx}`,
			companyOrProject: w.organization ? `${w.title} at ${w.organization}` : w.title,
			type: "work",
			role: w.title,
			contribution: w.description || `Work as ${w.title}`,
			problem: "",
			approach: "",
			evidenceResult: "",
			finalBullets: w.points && w.points.length > 0
				? w.points
				: (w.description ? [w.description] : []),
			status: "approved",
		}));

		setStories(initialStories);
		setActiveProjectName(workList[0]?.organization || targetRole || "");
		setActiveContribution(workList[0]?.title || "");

		// Save state payload and update last worked
		try {
			localStorage.setItem(
				"resume_buddy_guided_story_draft",
				JSON.stringify({
					targetRole,
					fullName,
					contactEmail,
					contactPhone,
					contactLocation,
					contactLinks,
					skillsList,
					stories: initialStories,
					selectedTemplate,
					createdResumeId: created.id,
					updatedAt: new Date().toISOString(),
				})
			);
			localStorage.setItem(
				"resume_buddy_last_worked",
				JSON.stringify({
					resumeId: created.id,
					resumeName: targetRole ? `${targetRole} Resume` : "My Resume",
					type: "guided-story",
					title: `Continue editing ${targetRole ? `${targetRole} Resume` : "resume"}`,
					path: "/dashboard/resumes/guided-story",
					search: { step: "plan" },
					updatedAt: new Date().toISOString(),
				})
			);
		} catch { }

		setWizardStep("plan");
		setActiveTab("plan");
		toast.success("Your plan is ready!");
		navigate({
			to: "/dashboard/resumes/guided-story",
			search: { step: "plan" },
		});
	};

	// Start with these experiences: transition straight into Achievement Studio
	const handleStartWithTheseExperiences = () => {
		handleSeeMyPlan();
		if (outlineEntries.length > 0) {
			setSelectedExperienceId(outlineEntries[0].id);
		}
		setActiveTab("stories");
		toast.success("Experiences confirmed! Let's craft your achievement statements.");
	};

	// Plan Items for Step 3
	const planItems: PlanItem[] = [
		{
			id: "target_role",
			title: "Target Role & Profile",
			description: targetRole || "Frontend Developer",
			status: targetRole ? "Completed" : "In progress",
			tab: "details",
		},
		{
			id: "experience",
			title: "Work Experience & Stories",
			description: `${outlineEntries.filter((e) => e.category === "work").length} role(s) outlined`,
			status: outlineEntries.filter((e) => e.category === "work").length > 0 ? "Completed" : "In progress",
			tab: "stories",
		},
		{
			id: "projects",
			title: "Projects & Technical Evidence",
			description: `${outlineEntries.filter((e) => e.category === "projects").length} project(s) outlined`,
			status: outlineEntries.filter((e) => e.category === "projects").length > 0 ? "Completed" : "Not started",
			tab: "stories",
		},
		{
			id: "education",
			title: "Education & Qualifications",
			description: `${outlineEntries.filter((e) => e.category === "education").length} education entry added`,
			status: outlineEntries.filter((e) => e.category === "education").length > 0 ? "Completed" : "Not started",
			tab: "details",
		},
	];

	const handleWorkOnPlanItem = (itemId: string) => {
		if (itemId === "target_role") {
			setActiveTab("details");
			toast.info("Update your target role and full name here.");
		} else if (itemId === "experience") {
			setStoryCategoryFilter("work");
			const firstWork = outlineEntries.find((e) => e.category === "work");
			if (firstWork) {
				setSelectedExperienceId(firstWork.id);
			} else {
				// If no work entry exists yet, add a starter one
				const newEntry: OutlineEntry = {
					id: `work_${Date.now()}`,
					category: "work",
					title: targetRole ? `Software Engineer (${targetRole})` : "Software Engineer",
					organization: "Tech Company",
					dates: "2023 – Present",
					description: "Working on modern web applications and features",
					points: [],
				};
				setOutlineEntries((prev) => [...prev, newEntry]);
				setSelectedExperienceId(newEntry.id);
			}
			setActiveTab("stories");
			toast.success("Ready to explore your work experience and achievements.");
		} else if (itemId === "projects") {
			setStoryCategoryFilter("projects");
			const firstProject = outlineEntries.find((e) => e.category === "projects");
			if (firstProject) {
				setSelectedExperienceId(firstProject.id);
			} else {
				// If no project entry exists yet, add a starter one
				const newProj: OutlineEntry = {
					id: `proj_${Date.now()}`,
					category: "projects",
					title: "AI Resume Builder & Web Application",
					organization: "React, TypeScript, Vite, Tailwind CSS",
					dates: "2024",
					description: "Interactive real-time resume editor with AI guidance",
					points: [],
				};
				setOutlineEntries((prev) => [...prev, newProj]);
				setSelectedExperienceId(newProj.id);
			}
			setActiveTab("stories");
			toast.success("Ready to explore your technical projects.");
		} else if (itemId === "education") {
			setActiveTab("details");
			toast.info("Manage your education degrees and qualifications below.");
		}
	};

	// Generate focused, contextual questions tailored to each experience (one by one)
	const getFocusedQuestionsForExperience = (entry: OutlineEntry) => {
		const lowerTitle = entry.title.toLowerCase();
		const lowerDesc = (entry.description || "").toLowerCase();
		const org = entry.organization ? ` at ${entry.organization}` : "";

		// AI Resume Builder
		if (lowerTitle.includes("resume builder") || lowerDesc.includes("resume builder") || (lowerTitle.includes("resume") && lowerTitle.includes("ai"))) {
			return [
				{
					question: `For the ${entry.title}, what parts did you personally build?`,
					placeholder: "e.g. Built the real-time resume preview, interactive editor, and instant template rendering...",
					hint: "Implementation details, specific components, or real-time preview features you built.",
					stepLabel: "Your contribution",
				},
				{
					question: `For the resume preview feature, did you get any feedback or see it used once shipped?`,
					placeholder: "e.g. Enabled instant sub-second feedback for job seekers and reduced resume crafting time by 40%...",
					hint: "Results, evidence, user feedback, or speed improvements once live.",
					stepLabel: "Results & evidence",
				},
			];
		}

		// English Learning App / Placement feature
		if (lowerTitle.includes("english") || lowerDesc.includes("english") || lowerTitle.includes("placement") || lowerDesc.includes("placement")) {
			return [
				{
					question: `What did you work on in the placement feature for ${entry.organization || "the application"}?`,
					placeholder: "e.g. Ensured speech-to-speech accuracy, eliminated transcription issues, missing words, and duplicate content...",
					hint: "Feature mechanics, speech-to-speech system, transcription accuracy, or edge case handling.",
					stepLabel: "The work & challenge",
				},
				{
					question: `How did the placement feature impact learners or the evaluation workflow?`,
					placeholder: "e.g. Successfully assessed over 2,000 learners with 98% transcription reliability and faster student onboarding...",
					hint: "Scale, evaluation turnaround time, student numbers, or error reduction.",
					stepLabel: "Results & evidence",
				},
			];
		}

		// Mentoring / Guiding Juniors
		if (lowerTitle.includes("mentor") || lowerDesc.includes("mentor") || lowerTitle.includes("junior") || lowerDesc.includes("junior") || lowerTitle.includes("guide")) {
			return [
				{
					question: `What were the juniors working on, and how did you guide them?`,
					placeholder: "e.g. Guided juniors building the resume builder UI, helped them get past initial struggles with AI tools like Claude and Codex...",
					hint: "Key topics, UI patterns, AI tooling adoption, or code review practices.",
					stepLabel: "Your contribution",
				},
				{
					question: `What was the outcome of your mentoring for the team's velocity and independence?`,
					placeholder: "e.g. Enabled 3 junior developers to ship production features independently within their first sprint...",
					hint: "Confidence, velocity improvements, PR turnaround, or quality benchmarks.",
					stepLabel: "Results & evidence",
				},
			];
		}

		// General projects
		if (entry.category === "projects" || lowerTitle.includes("app") || lowerTitle.includes("system") || lowerTitle.includes("feature")) {
			return [
				{
					question: `What parts of ${entry.title} did you specifically build or architect?`,
					placeholder: "e.g. Built responsive UI components, integrated APIs, and handled real-time state...",
					hint: "Key modules you owned, stack used, and core technical contributions.",
					stepLabel: "The work & challenge",
				},
				{
					question: `What was the measured performance or user outcome of ${entry.title}?`,
					placeholder: "e.g. Improved page load time by 35% and supported 5,000+ active monthly users...",
					hint: "Performance metrics, reliability, user adoption, or benchmarks.",
					stepLabel: "Results & evidence",
				},
			];
		}

		// General work / internship
		if (entry.category === "work") {
			return [
				{
					question: `What were your main contributions and responsibilities as ${entry.title}${org}?`,
					placeholder: "e.g. Led feature development, engineered responsive interfaces, and collaborated across product sprints...",
					hint: "Key responsibilities, features delivered, and technical decisions made.",
					stepLabel: "Your contribution",
				},
				{
					question: `What was a key challenge or measurable impact achieved in this role?`,
					placeholder: "e.g. Reduced release cycles by 25% and eliminated critical frontend rendering bottlenecks...",
					hint: "Measurable metrics, latency, efficiency, or team impact.",
					stepLabel: "Results & evidence",
				},
			];
		}

		// Volunteer / Activities
		if (entry.category === "volunteer") {
			return [
				{
					question: `What initiatives did you lead or support during ${entry.title}${org}?`,
					placeholder: "e.g. Organized workshops, assisted members, and built community documentation...",
					hint: "Specific activities, workshops, and coaching you provided.",
					stepLabel: "Your contribution",
				},
				{
					question: `What impact did this activity have on the participants or community?`,
					placeholder: "e.g. Trained 50+ aspiring developers and fostered inclusive peer learning...",
					hint: "Attendance, participant outcomes, or community feedback.",
					stepLabel: "Results & evidence",
				},
			];
		}

		// Education
		return [
			{
				question: `What key projects, coursework, or achievements did you complete for ${entry.title}?`,
				placeholder: "e.g. Capstone software engineering project, data structures honors coursework...",
				hint: "Academic highlights, major projects, or notable awards.",
				stepLabel: "Academic highlights",
			},
		];
	};

	const getFocusedQuestionForExperience = (entry: OutlineEntry) => {
		const questions = getFocusedQuestionsForExperience(entry);
		const currentIdx = activeExplorationQuestionIndex[entry.id] || 0;
		return questions[Math.min(currentIdx, questions.length - 1)];
	};

	// Handler when user submits their initial answer to the experience question:
	// Extracts key points / topics and transitions to the "Here's what I heard" checklist screen
	const handleInitialStorySubmit = async (entryId: string, answerText: string) => {
		// Stop microphone recording if still running
		if (isSpeakingAnswer) {
			setIsSpeakingAnswer(false);
			voiceAssistant.stop();
		}

		const trimmed = answerText.trim();
		if (!trimmed) return;

		setIsExtractingTopics(true);
		const targetEntry = outlineEntries.find((e) => e.id === entryId) || outlineEntries[0];

		try {
			// Extract 2 to 4 distinct topics/items from the answer
			const extracted = await extractTopicsFromStory(
				targetEntry.title,
				targetEntry.organization,
				trimmed
			);

			const topicItems = extracted.map((txt, idx) => ({
				id: `topic_${Date.now()}_${idx}`,
				text: txt,
				selected: true,
			}));

			setExtractedTopics(topicItems);

			// Also update outlineEntry answers
			setExperienceAnswers((prev) => ({
				...prev,
				[entryId]: [...(prev[entryId] || []), trimmed],
			}));

			// Transition to checklist view mode
			setStoriesViewMode("checklist");
			setExperienceInputText("");

			const orgName = targetEntry.organization || targetEntry.title;
			speakText(`Here's what I heard. ${topicItems.length} things from ${orgName}. Each one can become a bullet.`);
		} catch (err) {
			console.warn("Failed to extract topics:", err);
			// Fallback: create basic items
			setExtractedTopics([
				{ id: "1", text: trimmed.slice(0, 30), selected: true }
			]);
			setStoriesViewMode("checklist");
		} finally {
			setIsExtractingTopics(false);
		}
	};

	// Start drilling down into each selected topic one by one
	const handleStartWithSelectedTopics = async () => {
		const selected = extractedTopics.filter((t) => t.selected);
		if (selected.length === 0) {
			toast.info("Please select at least one item to proceed.");
			return;
		}

		setDrilldownTopicIndex(0);
		setIsLoadingTopicQuestion(true);
		setStoriesViewMode("topic_drilldown");

		const targetEntry = outlineEntries.find((e) => e.id === interviewActiveEntryId) || outlineEntries[0];
		const firstTopic = selected[0];

		const q = await generateFollowUpQuestionForTopic(
			firstTopic.text,
			targetEntry.title,
			targetEntry.organization
		);

		setCurrentTopicQuestion(q);
		setIsLoadingTopicQuestion(false);
		speakText(q);
	};

	// Save answer for a specific topic in the drilldown sequence
	const handleSaveTopicDrilldownAnswer = async (answerText: string) => {
		// Stop microphone recording if still running
		if (isSpeakingAnswer) {
			setIsSpeakingAnswer(false);
			voiceAssistant.stop();
		}

		const trimmed = answerText.trim();
		if (!trimmed) return;

		setIsSubmittingAnswer(true);
		const targetEntry = outlineEntries.find((e) => e.id === interviewActiveEntryId) || outlineEntries[0];
		const selected = extractedTopics.filter((t) => t.selected);
		const currentTopic = selected[drilldownTopicIndex];

		let bullet = "";
		try {
			const bullets = await generateBulletsWithDeepSeek(
				currentTopic ? currentTopic.text : targetEntry.title,
				targetEntry.organization,
				trimmed,
				targetEntry.title
			);
			bullet = bullets[0] || trimmed;
		} catch {
			bullet = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
		}

		// Add bullet to the outline entry
		setOutlineEntries((prev) =>
			prev.map((e) => {
				if (e.id === targetEntry.id) {
					const existing = e.points || [];
					return {
						...e,
						points: Array.from(new Set([...existing, bullet])),
					};
				}
				return e;
			})
		);

		// Also update live stories preview
		setStories((prev) => {
			const title = targetEntry.title;
			const existingIndex = prev.findIndex(
				(s) => s.id === `story_${targetEntry.id}` || s.companyOrProject.toLowerCase().includes(title.toLowerCase())
			);
			if (existingIndex >= 0) {
				const existing = prev[existingIndex];
				const updatedList = [...prev];
				updatedList[existingIndex] = {
					...existing,
					finalBullets: Array.from(new Set([...existing.finalBullets, bullet])),
				};
				return updatedList;
			} else {
				return [
					{
						id: `story_${targetEntry.id}`,
						companyOrProject: targetEntry.organization ? `${title} at ${targetEntry.organization}` : title,
						type: targetEntry.category === "projects" ? "project" : "work",
						role: title,
						contribution: trimmed,
						problem: "",
						approach: "",
						evidenceResult: "",
						finalBullets: [bullet],
						status: "approved",
					},
					...prev,
				];
			}
		});

		setExperienceInputText("");
		setIsSubmittingAnswer(false);
		toast.success(`Bullet added to ${targetEntry.title}!`);

		// Move to next topic if available
		const nextIdx = drilldownTopicIndex + 1;
		if (nextIdx < selected.length) {
			setDrilldownTopicIndex(nextIdx);
			setIsLoadingTopicQuestion(true);
			const nextTopic = selected[nextIdx];
			const nextQ = await generateFollowUpQuestionForTopic(
				nextTopic.text,
				targetEntry.title,
				targetEntry.organization
			);
			setCurrentTopicQuestion(nextQ);
			setIsLoadingTopicQuestion(false);
			speakText(nextQ);
		} else {
			// All topics explored for this entry
			toast.success("All points explored! Returning to overview.");
			setStoriesViewMode("overview");
		}
	};

	// Convert user answer into refined, bulleted experience points dynamically
	const handleSaveExperienceAnswer = async (entryId: string, answerText: string) => {
		const trimmed = answerText.trim();
		if (!trimmed) return;

		setIsSubmittingAnswer(true);

		const targetEntry = outlineEntries.find((e) => e.id === entryId);
		let newPoints: string[] = [];

		try {
			// Leverage DeepSeek API if configured, with graceful local heuristic fallback
			newPoints = await generateBulletsWithDeepSeek(
				targetEntry?.title || "Role",
				targetEntry?.organization,
				trimmed,
				targetEntry?.description || ""
			);
		} catch (err) {
			console.warn("AI generation failed, using local point parser:", err);
			const pointsFromAnswer = trimmed
				.split(/(?:\r?\n)+|(?<=[.!?])\s+|;\s*|(?:\s+and\s+(?:also|additionally|helped|supported)\s+)/i)
				.map((s) => s.trim())
				.filter((s) => s.length > 5)
				.map((pt) => {
					const clean = pt.replace(/[.,;]+$/, "").trim();
					return clean.charAt(0).toUpperCase() + clean.slice(1);
				});
			newPoints = pointsFromAnswer.length > 0 ? pointsFromAnswer : [trimmed.charAt(0).toUpperCase() + trimmed.slice(1)];
		}

		// Update outline entry dynamically (cap at at most 3-4 concise, non-repetitive points total per experience)
		setOutlineEntries((prev) =>
			prev.map((item) => {
				if (item.id === entryId) {
					const existingPoints = item.points || [];
					const existingAnswers = item.answers || [];
					// Deduplicate and filter out near-identical variations
					const combined = [...existingPoints, ...newPoints];
					const uniquePoints: string[] = [];
					for (const pt of combined) {
						const lower = pt.toLowerCase();
						const isDuplicate = uniquePoints.some((existing) => {
							const existingLower = existing.toLowerCase();
							return (
								existingLower === lower ||
								(existingLower.includes(lower.slice(0, 30)) && Math.abs(existing.length - pt.length) < 20)
							);
						});
						if (!isDuplicate) {
							uniquePoints.push(pt);
						}
					}
					// Strictly cap at max 3 polished points per experience
					const cappedPoints = uniquePoints.slice(0, 3);
					const mergedAnswers = [...existingAnswers, trimmed];
					return {
						...item,
						points: cappedPoints,
						answers: mergedAnswers,
					};
				}
				return item;
			})
		);

		// Record in local answer state
		setExperienceAnswers((prev) => ({
			...prev,
			[entryId]: [...(prev[entryId] || []), trimmed],
		}));

		// Also update or add to stories for the Live Resume Document preview
		setStories((prev) => {
			const title = targetEntry?.title || "Key Experience";
			const existingIndex = prev.findIndex(
				(s) => s.id === `story_${entryId}` || s.companyOrProject.toLowerCase().includes(title.toLowerCase())
			);

			if (existingIndex >= 0) {
				const existing = prev[existingIndex];
				const updatedBullets = Array.from(new Set([...existing.finalBullets, ...newPoints]));
				const updatedList = [...prev];
				updatedList[existingIndex] = {
					...existing,
					finalBullets: updatedBullets,
					status: "approved",
				};
				return updatedList;
			} else {
				const newStoryItem: StoryItem = {
					id: `story_${entryId}`,
					companyOrProject: targetEntry?.organization ? `${title} at ${targetEntry.organization}` : title,
					type: targetEntry?.category === "projects" ? "project" : "work",
					role: targetEntry?.title || "Contributor",
					contribution: trimmed,
					problem: "",
					approach: "",
					evidenceResult: "",
					finalBullets: newPoints,
					status: "approved",
				};
				return [newStoryItem, ...prev];
			}
		});

		setExperienceInputText("");
		setIsSubmittingAnswer(false);

		// Advance question index for this experience or move to next experience
		const allQs = getFocusedQuestionsForExperience(targetEntry || outlineEntries[0]);
		const currentIdx = activeExplorationQuestionIndex[entryId] || 0;
		if (currentIdx + 1 < allQs.length) {
			setActiveExplorationQuestionIndex((prev) => ({
				...prev,
				[entryId]: currentIdx + 1,
			}));
			toast.success("Live draft updated! Moving to the next question.");
		} else {
			// Find next experience in the outline
			const currentEntryIdx = outlineEntries.findIndex((e) => e.id === entryId);
			const nextEntry = outlineEntries[currentEntryIdx + 1];
			if (nextEntry) {
				setSelectedExperienceId(nextEntry.id);
				toast.success(`Completed! Moving to next experience: ${nextEntry.title}`);
			} else {
				toast.success("All experiences explored! Review your final summary.");
			}
		}
	};

	// Handlers for Final Summary Point Editing, Removing, and Adding (Sections 10, 11, 12)
	const handleEditPoint = (entryId: string, index: number, updatedText: string) => {
		if (!updatedText.trim()) return;
		setOutlineEntries((prev) =>
			prev.map((e) => {
				if (e.id === entryId && e.points) {
					const pts = [...e.points];
					pts[index] = updatedText.trim();
					return { ...e, points: pts };
				}
				return e;
			})
		);
		setEditingPointKey(null);
		setEditingPointText("");
		toast.success("Point updated");
	};

	const handleRemovePoint = (entryId: string, index: number) => {
		setOutlineEntries((prev) =>
			prev.map((e) => {
				if (e.id === entryId && e.points) {
					const pts = e.points.filter((_, i) => i !== index);
					return { ...e, points: pts };
				}
				return e;
			})
		);
		toast.info("Point removed");
	};

	const handleAddPointToEntry = (entryId: string, pointText: string) => {
		if (!pointText.trim()) return;
		const clean = pointText.trim().replace(/^[•\-\*\s]+/, "");
		setOutlineEntries((prev) =>
			prev.map((e) => {
				if (e.id === entryId) {
					const pts = e.points ? [...e.points, clean] : [clean];
					return { ...e, points: pts };
				}
				return e;
			})
		);
		setAddingPointEntryId(null);
		setNewPointInputText("");
		toast.success("New point added");
	};

	// Final Confirmation & Content Generation (Section 11 & 12)
	const handleConfirmAndGenerateFinal = () => {
		setShowFinalSummaryModal(false);

		// Commit all verified points into structured stories and localResumeStore
		const workList = outlineEntries.filter((e) => e.category === "work");
		const projList = outlineEntries.filter((e) => e.category === "projects");
		const eduList = outlineEntries.filter((e) => e.category === "education");
		const volList = outlineEntries.filter((e) => e.category === "volunteer");

		const updatedStories: StoryItem[] = outlineEntries.map((e, idx) => {
			const bulletList =
				e.points && e.points.length > 0
					? e.points
					: [e.description || `Built responsive solutions and key features as ${e.title}.`];

			return {
				id: `final_story_${e.id || idx}`,
				companyOrProject: e.organization ? `${e.title} at ${e.organization}` : e.title,
				type: e.category === "projects" ? "project" : "work",
				role: e.title,
				contribution: e.description || bulletList[0] || e.title,
				problem: "",
				approach: "",
				evidenceResult: "",
				finalBullets: bulletList,
				status: "approved",
			};
		});

		setStories(updatedStories);

		// Update resume in store
		if (createdResumeId) {
			const existing = localResumeStore.get(createdResumeId);
			if (existing) {
				const updatedData: ResumeData = {
					...existing.data,
					sections: {
						...existing.data.sections,
						experience: {
							title: "Experience",
							columns: 1,
							hidden: workList.length === 0,
							items: workList.map((w) => ({
								id: w.id,
								hidden: false,
								company: w.organization || "",
								position: w.title,
								location: "",
								period: w.dates || "",
								website: { url: "", label: "" },
								description: (w.points && w.points.length > 0 ? w.points : (w.description ? [w.description] : []))
									.map((p) => `<p>• ${p}</p>`)
									.join(""),
							})),
						},
						projects: {
							title: "Projects",
							columns: 1,
							hidden: projList.length === 0,
							items: projList.map((p) => ({
								id: p.id,
								hidden: false,
								name: p.title,
								role: p.organization || "",
								period: p.dates || "",
								website: { url: "", label: "" },
								description: (p.points && p.points.length > 0 ? p.points : (p.description ? [p.description] : []))
									.map((p) => `<p>• ${p}</p>`)
									.join(""),
							})),
						},
					},
				};
				localResumeStore.update(createdResumeId, { data: updatedData });
			}
		}

		toast.success("Final experience content confirmed and saved!");
	};

	// Toggle voice assistant for answering experience question
	const handleToggleVoiceExperience = (entryId: string) => {
		if (isSpeakingAnswer) {
			setIsSpeakingAnswer(false);
			voiceAssistant.stop();
			toast.info("Voice recording stopped");
		} else {
			const baseText = experienceInputText ? experienceInputText.trim() : "";
			setIsSpeakingAnswer(true);
			toast.info("Listening... Click mic or stop when you're done speaking");

			const started = voiceAssistant.start(
				(transcript) => {
					const combined = baseText ? `${baseText} ${transcript}` : transcript;
					setExperienceInputText(combined);
				},
				(err) => {
					console.warn("Speech error:", err);
					setIsSpeakingAnswer(false);
				},
				() => {
					setIsSpeakingAnswer(false);
				}
			);

			if (!started) {
				setIsSpeakingAnswer(false);
			}
		}
	};

	// Voice recording state for Step 3 Story Prompt
	const [isSpeakingPlanStory, setIsSpeakingPlanStory] = useState(false);

	// Toggle voice assistant in Step 3 Story Prompt
	const handleToggleVoicePlanStory = () => {
		if (isSpeakingPlanStory) {
			setIsSpeakingPlanStory(false);
			voiceAssistant.stop();
			toast.info("Voice recording stopped");
		} else {
			const baseText = rawStoryText ? rawStoryText.trim() : "";
			setIsSpeakingPlanStory(true);
			toast.info("Listening... Click mic again when you're done speaking");

			const started = voiceAssistant.start(
				(transcript) => {
					const combined = baseText ? `${baseText} ${transcript}` : transcript;
					setRawStoryText(combined);
				},
				(err) => {
					console.warn("Speech recognition error:", err);
					setIsSpeakingPlanStory(false);
				},
				() => {
					setIsSpeakingPlanStory(false);
				}
			);

			if (!started) {
				setIsSpeakingPlanStory(false);
			}
		}
	};

	// Parse and extract separate stories naturally without inventing details
	const handleAnalyzeNaturalStory = (textToParse?: string) => {
		const text = (textToParse !== undefined ? textToParse : rawStoryText).trim();
		if (!text) {
			toast.error("Please type or speak about your work experience first.");
			return;
		}

		setIsAnalyzingStory(true);

		// Break response into distinct sentences and clauses
		const segments = text
			.split(/(?:\r?\n)+|(?<=[.!?])\s+|;\s*|(?:\s+and\s+(?:also|additionally|then)\s+)/i)
			.map((s) => s.trim())
			.filter((s) => s.length > 8);

		const newEntries: OutlineEntry[] = [];

		for (let i = 0; i < segments.length; i++) {
			const seg = segments[i];
			// Clean leading filler words
			const clean = seg
				.replace(/^(i've\s+done|i've\s+been|i\s+worked\s+on|i\s+have\s+worked\s+on|worked\s+on|i\s+built|built|i\s+created|created|i\s+developed|developed|i\s+helped|helped|i\s+was\s+responsible\s+for|responsible\s+for|i\s+am|my\s+work\s+was)\s+/i, "")
				.trim();

			const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);
			const lower = seg.toLowerCase();

			let category: OutlineCategory = "work";
			if (lower.includes("degree") || lower.includes("bachelor") || lower.includes("master") || lower.includes("university") || lower.includes("college") || lower.includes("graduated")) {
				category = "education";
			} else if (lower.includes("volunteer") || lower.includes("community") || lower.includes("mentor") || lower.includes("taught") || lower.includes("hackathon") || lower.includes("club")) {
				category = "volunteer";
			} else if (lower.includes("app") || lower.includes("project") || lower.includes("builder") || lower.includes("feature") || lower.includes("website") || lower.includes("tool") || lower.includes("system") || lower.includes("platform")) {
				category = "projects";
			}

			newEntries.push({
				id: `entry_${Date.now()}_${i}`,
				category,
				title: titleCase.replace(/[.,;]+$/, ""),
				organization: lower.includes("for ") ? seg.split(/for /i)[1]?.split(/[,.]/)[0]?.trim() : undefined,
				dates: "Recent",
				description: seg,
			});
		}

		if (newEntries.length === 0) {
			const lower = text.toLowerCase();
			let fallbackCategory: OutlineCategory = "work";
			if (lower.includes("degree") || lower.includes("bachelor") || lower.includes("university") || lower.includes("college")) {
				fallbackCategory = "education";
			} else if (lower.includes("volunteer") || lower.includes("community") || lower.includes("mentor")) {
				fallbackCategory = "volunteer";
			} else if (lower.includes("project") || lower.includes("app") || lower.includes("website")) {
				fallbackCategory = "projects";
			}
			newEntries.push({
				id: `entry_${Date.now()}`,
				category: fallbackCategory,
				title: text.replace(/[.,;]+$/, ""),
				dates: "Recent",
				description: text,
			});
		}

		setOutlineEntries((prev) => {
			// Merge while avoiding exact duplicates and preserving priority order
			const existingTitles = new Set(prev.map((p) => p.title.toLowerCase()));
			const filtered = newEntries.filter((n) => !existingTitles.has(n.title.toLowerCase()));
			// Zoe arranges all collected experiences in priority order based on relevance & strength
			let merged = [...prev];
			for (const item of filtered) {
				merged = insertWithPriority(merged, item);
			}
			return sortEntriesByPriority(merged);
		});

		setIsAnalyzingStory(false);
		setZoeFeedbackMessage(
			`I identified ${newEntries.length} distinct experience${newEntries.length > 1 ? "s" : ""} from what you shared! You can refine each one below or add more details.`
		);
		toast.success(`Zoe recognized ${newEntries.length} separate experiences!`);
	};

	// Voice Simulation with natural speech recognition
	const handleToggleVoiceOutline = () => {
		if (isSpeakingOutline) {
			setIsSpeakingOutline(false);
			voiceAssistant.stop();
			toast.info("Voice recording stopped");
		} else {
			const baseText = rawStoryText ? rawStoryText.trim() : "";
			setIsSpeakingOutline(true);
			toast.info("Listening... Tell Zoe about yourself and your work (click mic when done)");

			const started = voiceAssistant.start(
				(transcript) => {
					const combined = baseText ? `${baseText} ${transcript}` : transcript;
					setRawStoryText(combined);
				},
				(err) => {
					console.warn("Speech recognition error:", err);
					setIsSpeakingOutline(false);
				},
				() => {
					setIsSpeakingOutline(false);
				}
			);

			if (!started) {
				setIsSpeakingOutline(false);
			}
		}
	};

	// Photo file upload
	// Template change handler with localStorage & store synchronization
	const handleSelectTemplate = (templateName: string) => {
		setSelectedTemplate(templateName);
		try {
			const savedDraft = localStorage.getItem("resume_buddy_guided_story_draft");
			const parsedDraft = savedDraft ? JSON.parse(savedDraft) : {};
			parsedDraft.selectedTemplate = templateName;
			parsedDraft.updatedAt = new Date().toISOString();
			localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(parsedDraft));

			const manualDraft = localStorage.getItem("resume_buddy_manual_draft");
			const parsedManual = manualDraft ? JSON.parse(manualDraft) : {};
			parsedManual.selectedTemplate = templateName;
			localStorage.setItem("resume_buddy_manual_draft", JSON.stringify(parsedManual));

			if (createdResumeId) {
				const existing = localResumeStore.get(createdResumeId);
				if (existing) {
					const tmplKey = templateName.toLowerCase();
					const templateMeta = (templates as any)[tmplKey];
					const isNoSidebar = templateMeta ? templateMeta.sidebarPosition === "none" : false;
					const sidebarSections = ["skills", "certifications", "awards", "languages", "interests", "publications"];
					const allSecs = [
						...new Set([...(existing.data.metadata.layout.pages || []).flatMap((p: any) => [...p.main, ...p.sidebar])]),
					];

					const updatedPages = (existing.data.metadata.layout.pages || []).map((page: any, idx: number) => {
						if (idx === 0) {
							return {
								...page,
								fullWidth: isNoSidebar,
								main: isNoSidebar ? allSecs : allSecs.filter((s: string) => !sidebarSections.includes(s)),
								sidebar: isNoSidebar ? [] : allSecs.filter((s: string) => sidebarSections.includes(s)),
							};
						}
						return {
							...page,
							fullWidth: isNoSidebar,
							main: [],
							sidebar: [],
						};
					});

					const updatedData = {
						...existing.data,
						metadata: {
							...existing.data.metadata,
							template: tmplKey as any,
							layout: {
								...existing.data.metadata.layout,
								pages: updatedPages.length > 0 ? updatedPages : [{ fullWidth: isNoSidebar, main: allSecs, sidebar: [] }],
							},
						},
					};
					localResumeStore.update(createdResumeId, { data: updatedData });
				}
			}

			window.dispatchEvent(new Event("resume_template_changed"));
		} catch (e) {
			console.error("Failed to save selected template", e);
		}
	};

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				setPictureUrl(reader.result);
				setShowPicture(true);
				toast.success("Profile photo updated!");
			}
		};
		reader.readAsDataURL(file);
	};

	// ── STEP 1: DIRECTION (MATCHING IMAGE 1) ──────────────────────────────────
	if (wizardStep === "direction") {
		return (
			<div
				className="min-h-screen text-slate-100 flex flex-col justify-between p-4 sm:p-8 lg:p-12 font-sans selection:bg-emerald-500/30 selection:text-white"
				style={{ background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)" }}
			>
				<div className="w-full max-w-4xl mx-auto space-y-10">
					{/* Header Top Bar */}
					<div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard/resumes" as any })}
							className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
						>
							<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
							<span>Home</span>
						</button>

						{/* Stepper / Breadcrumbs */}
						<div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider">
							<span className="text-emerald-400 font-bold">1 · Direction</span>
							<span className="text-slate-600">—</span>
							<span className="text-slate-500">2 · Outline</span>
							<span className="text-slate-600">—</span>
							<span className="text-slate-500">3 · Your plan</span>
						</div>
					</div>

					{/* Question Title Block */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
								START WITH A DIRECTION
							</span>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => speakText("What role are you targeting? Tell Zoe the role you're aiming for.")}
									className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60"
								>
									<Volume2 className="size-3.5 text-emerald-400" />
									<span>Hear again</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setIsAudioMuted((prev) => {
											const next = !prev;
											if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
												window.speechSynthesis.cancel();
											}
											toast.info(next ? "Zoe muted" : "Zoe unmuted");
											return next;
										});
									}}
									className={cn(
										"inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer",
										isAudioMuted
											? "bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
											: "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:text-white"
									)}
									title={isAudioMuted ? "Unmute Zoe" : "Mute Zoe"}
								>
									{isAudioMuted ? (
										<>
											<VolumeX className="size-3.5 text-rose-400" />
											<span>Unmute</span>
										</>
									) : (
										<>
											<Volume2 className="size-3.5 text-emerald-400" />
											<span>Mute</span>
										</>
									)}
								</button>
							</div>
						</div>
						<h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
							What role are you targeting?
						</h1>
						<p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
							Tell Zoe the role you're aiming for. You can change it later.
						</p>
					</div>

					{/* Card Container (Image 1) */}
					<div className="rounded-2xl border border-slate-800/80 bg-[#09101d] p-6 sm:p-8 shadow-2xl space-y-6">
						{/* Target role field */}
						<div className="space-y-3">
							<label htmlFor="target-role" className="block text-xs font-semibold text-slate-300">
								What role are you targeting?
							</label>
							<input
								id="target-role"
								type="text"
								value={targetRole}
								onChange={(e) => setTargetRole(e.target.value)}
								placeholder="e.g. Frontend Developer, Product Manager..."
								autoFocus
								className="w-full rounded-xl bg-[#0b1322] border-2 border-emerald-500/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white placeholder:text-slate-500 px-4 py-3.5 text-base font-semibold transition-all outline-none"
							/>

							{/* Suggested Role Pills */}
							<div className="space-y-1.5 pt-1">
								<span className="text-[11px] font-medium text-slate-400">
									Suggestions (or type your own above):
								</span>
								<div className="flex flex-wrap gap-2 mt-3">
									{[
										"Frontend Developer",
										"Backend Developer",
										"Full Stack Developer",
										"UI/UX Designer",
										"Product Manager",
										"Data Analyst",
									].map((role) => (
										<button
											key={role}
											type="button"
											onClick={() => setTargetRole(role)}
											className={cn(
												"px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border",
												targetRole.toLowerCase() === role.toLowerCase()
													? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
													: "bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white"
											)}
										>
											{role}
										</button>
									))}
								</div>
							</div>

							<p className="text-xs text-slate-400 pt-1">
								Not sure of the title? A broad area or level is enough to get started.
							</p>
						</div>

						{/* Optional Job Description Accordion */}
						<div className="pt-1">
							<button
								type="button"
								onClick={() => setShowJobDescription(!showJobDescription)}
								className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
							>
								{showJobDescription ? (
									<ChevronDown className="size-3.5 text-emerald-400" />
								) : (
									<ChevronRight className="size-3.5 text-slate-400" />
								)}
								<span>I have a job description · Optional</span>
							</button>

							{showJobDescription && (
								<div className="mt-3 animate-in fade-in duration-200">
									<textarea
										rows={4}
										value={jobDescription}
										onChange={(e) => setJobDescription(e.target.value)}
										placeholder="Paste requirements, key skills, or job posting text here to tailor your statements..."
										className="w-full rounded-xl bg-[#0b1322] border border-slate-800 p-3.5 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
									/>
								</div>
							)}
						</div>

						{/* Bottom Actions */}
						<div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
							<button
								type="button"
								onClick={() => setWizardStep("outline")}
								className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
							>
								Decide later
							</button>

							<button
								type="button"
								onClick={() => setWizardStep("outline")}
								className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
							>
								<span>Build my outline</span>
								<ArrowRight className="size-4" />
							</button>
						</div>
					</div>
				</div>

				<div className="text-center text-xs text-slate-500 pt-8">
					Step 1 of 3 · Your progress is saved automatically
				</div>
			</div>
		);
	}

	// ── STEP 2: OUTLINE (MATCHING IMAGE 2) ────────────────────────────────────
	if (wizardStep === "outline") {
		return (
			<div
				className="min-h-screen text-slate-100 flex flex-col justify-between p-4 sm:p-8 lg:p-12 font-sans selection:bg-emerald-500/30 selection:text-white"
				style={{ background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)" }}
			>
				<div className="w-full max-w-4xl mx-auto space-y-10">
					{/* Header Top Bar */}
					<div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => setWizardStep("direction")}
								className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
								title="Back to Direction (Step 1)"
							>
								<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
								<span>Back to Direction</span>
							</button>

							<button
								type="button"
								onClick={() => navigate({ to: "/dashboard/resumes" as any })}
								className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer px-2 py-1"
							>
								Dashboard
							</button>
						</div>

						{/* Undo button + Stepper / Breadcrumbs */}
						<div className="flex items-center gap-4">
							<button
								type="button"
								disabled={outlineHistory.length === 0}
								onClick={handleUndoOutline}
								className={cn(
									"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
									outlineHistory.length > 0
										? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 active:scale-95 shadow-sm"
										: "border-slate-800 bg-slate-900/60 text-slate-600 cursor-not-allowed opacity-50"
								)}
								title={outlineHistory.length > 0 ? "Undo last outline action (Ctrl+Z)" : "No changes to undo"}
							>
								<Undo2 className="size-3.5" />
								<span>Undo</span>
								{outlineHistory.length > 0 && (
									<span className="size-1.5 rounded-full bg-amber-400" />
								)}
							</button>

							<div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider">
								<button
									type="button"
									onClick={() => setWizardStep("direction")}
									className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
								>
									1 · Direction
								</button>
								<span className="text-slate-600">—</span>
								<span className="text-emerald-400 font-bold">2 · Outline</span>
								<span className="text-slate-600">—</span>
								<span className="text-slate-500">3 · Your plan</span>
							</div>
						</div>
					</div>

					{/* Question Title Block */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
								A BRIEF OUTLINE
							</span>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => speakText("What can we draw from? Add a role, project, activity, or qualification.")}
									className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60"
								>
									<Volume2 className="size-3.5 text-emerald-400" />
									<span>Hear again</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setIsAudioMuted((prev) => {
											const next = !prev;
											if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
												window.speechSynthesis.cancel();
											}
											toast.info(next ? "Zoe muted" : "Zoe unmuted");
											return next;
										});
									}}
									className={cn(
										"inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer",
										isAudioMuted
											? "bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
											: "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:text-white"
									)}
									title={isAudioMuted ? "Unmute Zoe" : "Mute Zoe"}
								>
									{isAudioMuted ? (
										<>
											<VolumeX className="size-3.5 text-rose-400" />
											<span>Unmute</span>
										</>
									) : (
										<>
											<Volume2 className="size-3.5 text-emerald-400" />
											<span>Mute</span>
										</>
									)}
								</button>
							</div>
						</div>
						<h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
							What can we draw from?
						</h1>
						<p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
							Add a role, project, activity, or qualification. Start with your most recent or relevant entry—you can add more later.
						</p>
					</div>

					{/* ── STRUCTURED OUTLINE (IMAGE 2) ── */}
					<div className="rounded-2xl border border-slate-800/80 bg-[#09101d] p-6 sm:p-8 shadow-2xl space-y-6">
						{/* Tabs Row */}
						<div className="flex flex-wrap items-center gap-2 pb-2">
							<button
								type="button"
								onClick={() => setOutlineCategory("work")}
								className={cn(
									"px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
									outlineCategory === "work"
										? "bg-[#0b1f1a] text-emerald-300 border-emerald-500/40 shadow-sm"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								Work & internships
							</button>

							<button
								type="button"
								onClick={() => setOutlineCategory("projects")}
								className={cn(
									"px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
									outlineCategory === "projects"
										? "bg-[#0b1f1a] text-emerald-300 border-emerald-500/40 shadow-sm"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								Projects
							</button>

							<button
								type="button"
								onClick={() => setOutlineCategory("education")}
								className={cn(
									"px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
									outlineCategory === "education"
										? "bg-[#0b1f1a] text-emerald-300 border-emerald-500/40 shadow-sm"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								Education
							</button>

							<button
								type="button"
								onClick={() => setOutlineCategory("volunteer")}
								className={cn(
									"px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
									outlineCategory === "volunteer"
										? "bg-[#0b1f1a] text-emerald-300 border-emerald-500/40 shadow-sm"
										: "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white"
								)}
							>
								Volunteering & activities
							</button>
						</div>

						{/* Form Fields: Work & Internships */}
						{outlineCategory === "work" && (
							<div className="space-y-4 pt-1">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Job title <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={workTitle}
											onChange={(e) => setWorkTitle(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="e.g. Frontend Developer"
											autoFocus
											className={`w-full rounded-xl bg-[#0b1322] border ${workTitle && (getCharacterOnlyValidationError(workTitle, "Job title", 2, true) || getTextValidationError(workTitle, "Job title", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-400"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
										/>
										{workTitle && (getCharacterOnlyValidationError(workTitle, "Job title", 2, true) || getTextValidationError(workTitle, "Job title", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(workTitle, "Job title", 2, true) || getTextValidationError(workTitle, "Job title", 2, true)}</p>
										)}
									</div>
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Company or organization · Optional
										</label>
										<input
											type="text"
											value={workCompany}
											onChange={(e) => setWorkCompany(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="Organization or context"
											className="w-full rounded-xl bg-[#0b1322] border border-slate-800 focus:border-slate-700 text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors"
										/>
									</div>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Dates · Can confirm later
									</label>
									<input
										type="text"
										value={workDates}
										onChange={(e) => setWorkDates(e.target.value)}
										placeholder="e.g. Jul 2023 – Present"
										className={`w-full rounded-xl bg-[#0b1322] border ${workDates && getDatePeriodValidationError(workDates, false) ? "border-rose-500" : "border-slate-800 focus:border-slate-700"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
									/>
									{workDates && getDatePeriodValidationError(workDates, false) && (
										<p className="text-xs text-rose-400 mt-1">{getDatePeriodValidationError(workDates, false)}</p>
									)}
								</div>

								<div className="flex items-center justify-between pt-2">
									<span className="text-xs text-slate-400">
										We'll develop the description together.
									</span>
									<button
										type="button"
										onClick={handleAddWorkEntry}
										className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
									>
										<Plus className="size-3.5 text-emerald-400" />
										<span>Add work experience</span>
									</button>
								</div>
							</div>
						)}

						{/* Form Fields: Projects */}
						{outlineCategory === "projects" && (
							<div className="space-y-4 pt-1">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Project title <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={projectTitle}
											onChange={(e) => setProjectTitle(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="e.g. E-Commerce Dashboard"
											autoFocus
											className={`w-full rounded-xl bg-[#0b1322] border ${projectTitle && (getCharacterOnlyValidationError(projectTitle, "Project title", 2, true) || getTextValidationError(projectTitle, "Project title", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-400"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
										/>
										{projectTitle && (getCharacterOnlyValidationError(projectTitle, "Project title", 2, true) || getTextValidationError(projectTitle, "Project title", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(projectTitle, "Project title", 2, true) || getTextValidationError(projectTitle, "Project title", 2, true)}</p>
										)}
									</div>
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Technologies or role · Optional
										</label>
										<input
											type="text"
											value={projectTech}
											onChange={(e) => setProjectTech(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="e.g. React, Next.js, Stripe"
											className="w-full rounded-xl bg-[#0b1322] border border-slate-800 focus:border-slate-700 text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors"
										/>
									</div>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Dates · Can confirm later
									</label>
									<input
										type="text"
										value={projectDates}
										onChange={(e) => setProjectDates(e.target.value)}
										placeholder="e.g. Jan 2024 – May 2024"
										className={`w-full rounded-xl bg-[#0b1322] border ${projectDates && getDatePeriodValidationError(projectDates, false) ? "border-rose-500" : "border-slate-800 focus:border-slate-700"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
									/>
									{projectDates && getDatePeriodValidationError(projectDates, false) && (
										<p className="text-xs text-rose-400 mt-1">{getDatePeriodValidationError(projectDates, false)}</p>
									)}
								</div>

								<div className="flex items-center justify-between pt-2">
									<span className="text-xs text-slate-400">
										We'll develop the description together.
									</span>
									<button
										type="button"
										onClick={handleAddProjectEntry}
										className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
									>
										<Plus className="size-3.5 text-emerald-400" />
										<span>Add project</span>
									</button>
								</div>
							</div>
						)}

						{/* Form Fields: Education */}
						{outlineCategory === "education" && (
							<div className="space-y-4 pt-1">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Degree or qualification <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={eduDegree}
											onChange={(e) => setEduDegree(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="e.g. B.Tech Computer Science"
											autoFocus
											className={`w-full rounded-xl bg-[#0b1322] border ${eduDegree && (getCharacterOnlyValidationError(eduDegree, "Degree or qualification", 2, true) || getTextValidationError(eduDegree, "Degree or qualification", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-400"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
										/>
										{eduDegree && (getCharacterOnlyValidationError(eduDegree, "Degree or qualification", 2, true) || getTextValidationError(eduDegree, "Degree or qualification", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(eduDegree, "Degree or qualification", 2, true) || getTextValidationError(eduDegree, "Degree or qualification", 2, true)}</p>
										)}
									</div>
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											School or university
										</label>
										<input
											type="text"
											value={eduSchool}
											onChange={(e) => setEduSchool(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="e.g. State University"
											className="w-full rounded-xl bg-[#0b1322] border border-slate-800 focus:border-slate-700 text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors"
										/>
									</div>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Dates · Can confirm later
									</label>
									<input
										type="text"
										value={eduDates}
										onChange={(e) => setEduDates(e.target.value)}
										placeholder="e.g. 2020 – 2024"
										className={`w-full rounded-xl bg-[#0b1322] border ${eduDates && getDatePeriodValidationError(eduDates, false) ? "border-rose-500" : "border-slate-800 focus:border-slate-700"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
									/>
									{eduDates && getDatePeriodValidationError(eduDates, false) && (
										<p className="text-xs text-rose-400 mt-1">{getDatePeriodValidationError(eduDates, false)}</p>
									)}
								</div>

								<div className="flex items-center justify-between pt-2">
									<span className="text-xs text-slate-400">
										Academic details and certifications.
									</span>
									<button
										type="button"
										onClick={handleAddEducationEntry}
										className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
									>
										<Plus className="size-3.5 text-emerald-400" />
										<span>Add education</span>
									</button>
								</div>
							</div>
						)}

						{/* Form Fields: Volunteering */}
						{outlineCategory === "volunteer" && (
							<div className="space-y-4 pt-1">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Role or activity <span className="text-emerald-400 font-bold">*</span>
										</label>
										<input
											type="text"
											value={volRole}
											onChange={(e) => setVolRole(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="e.g. Open Source Contributor"
											autoFocus
											className={`w-full rounded-xl bg-[#0b1322] border ${volRole && (getCharacterOnlyValidationError(volRole, "Role or activity", 2, true) || getTextValidationError(volRole, "Role or activity", 2, true)) ? "border-rose-500" : "border-slate-800 focus:border-emerald-400"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
										/>
										{volRole && (getCharacterOnlyValidationError(volRole, "Role or activity", 2, true) || getTextValidationError(volRole, "Role or activity", 2, true)) && (
											<p className="text-xs text-rose-400 mt-1">{getCharacterOnlyValidationError(volRole, "Role or activity", 2, true) || getTextValidationError(volRole, "Role or activity", 2, true)}</p>
										)}
									</div>
									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Organization · Optional
										</label>
										<input
											type="text"
											value={volOrg}
											onChange={(e) => setVolOrg(sanitizeToCharactersOnly(e.target.value, true))}
											placeholder="Organization or community"
											className="w-full rounded-xl bg-[#0b1322] border border-slate-800 focus:border-slate-700 text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors"
										/>
									</div>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1.5">
										Dates · Can confirm later
									</label>
									<input
										type="text"
										value={volDates}
										onChange={(e) => setVolDates(e.target.value)}
										placeholder="e.g. 2023"
										className={`w-full rounded-xl bg-[#0b1322] border ${volDates && getDatePeriodValidationError(volDates, false) ? "border-rose-500" : "border-slate-800 focus:border-slate-700"} text-white placeholder:text-slate-600 px-4 py-3 text-sm outline-none transition-colors`}
									/>
									{volDates && getDatePeriodValidationError(volDates, false) && (
										<p className="text-xs text-rose-400 mt-1">{getDatePeriodValidationError(volDates, false)}</p>
									)}
								</div>

								<div className="flex items-center justify-between pt-2">
									<span className="text-xs text-slate-400">
										Extracurriculars, leadership, and community roles.
									</span>
									<button
										type="button"
										onClick={handleAddVolunteerEntry}
										className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
									>
										<Plus className="size-3.5 text-emerald-400" />
										<span>Add activity</span>
									</button>
								</div>
							</div>
						)}

						{/* List of Captured Outline Entries */}
						{outlineEntries.length > 0 && (
							<div className="pt-4 border-t border-slate-800/80 space-y-2">
								<span className="text-xs font-semibold text-slate-300 block">
									Captured in your outline ({outlineEntries.length})
								</span>
								<div className="flex flex-wrap gap-2">
									{outlineEntries.map((entry) => (
										<div
											key={entry.id}
											className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900/80 text-xs text-slate-200 shadow-sm"
										>
											<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
												{entry.category}
											</span>
											<span className="font-semibold text-white">{entry.title}</span>
											{entry.organization && <span className="text-slate-400">· {entry.organization}</span>}
											<button
												type="button"
												onClick={() => handleRemoveEntry(entry.id)}
												className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer ml-1"
											>
												<X className="size-3.5" />
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Voice Recording Accordion */}
					<div className="space-y-3">
						<button
							type="button"
							onClick={() => setShowVoiceOption(!showVoiceOption)}
							className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
						>
							{showVoiceOption ? (
								<ChevronDown className="size-3.5 text-emerald-400" />
							) : (
								<ChevronRight className="size-3.5 text-slate-400" />
							)}
							<span>Prefer to speak your outline?</span>
						</button>

						{showVoiceOption && (
							<div className="rounded-2xl border border-emerald-500/30 bg-[#081b22]/90 p-5 flex items-center justify-between gap-4 animate-in fade-in duration-200">
								<div className="space-y-1">
									<div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
										<Mic className="size-3.5" />
										<span>Voice Outline Assistant</span>
									</div>
									<p className="text-xs text-slate-300">
										Speak freely about your recent experiences. Zoe will extract roles, tools, and timelines.
									</p>
								</div>
								<button
									type="button"
									onClick={handleToggleVoiceOutline}
									className={cn(
										"inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm",
										isSpeakingOutline
											? "bg-rose-500 text-white animate-pulse"
											: "bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950"
									)}
								>
									<Mic className="size-4" />
									<span>{isSpeakingOutline ? "Stop Recording" : "Start Speaking"}</span>
								</button>
							</div>
						)}

						{/* Bottom Actions Bar (Image 2) */}
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
							<div className="space-y-1">
								<div className="flex items-center gap-4">
									<button
										type="button"
										onClick={() => setWizardStep("direction")}
										className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
									>
										<ArrowLeft className="size-3.5" />
										<span>Back to direction</span>
									</button>

									{outlineHistory.length > 0 && (
										<button
											type="button"
											onClick={handleUndoOutline}
											className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
											title="Undo last change"
										>
											<Undo2 className="size-3" />
											<span>Undo last entry</span>
										</button>
									)}
								</div>
								<p className="text-xs text-slate-500">
									Start with one item if you like. There is no need to list everything before seeing your draft.
								</p>
							</div>

							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() => setWizardStep("direction")}
									className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
								>
									Back
								</button>

								<button
									type="button"
									onClick={handleSeeMyPlan}
									className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
								>
									<span>See my plan</span>
									<ArrowRight className="size-4" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center text-xs text-slate-500 pt-8">
					Step 2 of 3 · Your progress is saved automatically
				</div>
			</div>
		);
	}

	// ── STEP 3: YOUR PLAN / THE EDITOR WORKSPACE ──────────────────────────────
	return (
		<div className="flex flex-col min-h-screen w-full flex-1 text-slate-100 font-sans bg-[#060b11]">
			{/* Brand Header matching media_1795108245275_5bc0accd.png */}
			<div className="w-full border-b border-slate-800/90 bg-[#040810] px-6 sm:px-8 py-3 flex items-center justify-between gap-4">
				{/* Left: Zoe Green circle icon + Resume Buddy + Prototype v1 - simulated AI badge (Clickable to go to dashboard) */}
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard/resumes" as any })}
						className="flex items-center gap-2.5 hover:opacity-90 active:scale-98 transition-all cursor-pointer group"
						title="Go to dashboard"
					>
						<div className="size-8 rounded-full bg-[#00d084] flex items-center justify-center text-slate-950 font-black text-sm tracking-tighter shadow-sm group-hover:ring-2 group-hover:ring-emerald-400/50 transition-all">
							Z
						</div>
						<span className="font-extrabold text-white text-base sm:text-lg tracking-tight group-hover:text-emerald-300 transition-colors">
							Resume Buddy
						</span>
					</button>
					<span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201805] border border-[#f59e0b]/40 text-[#f59e0b] text-[11px] font-semibold">
						<span className="size-1.5 rounded-full bg-[#f59e0b]" />
						<span>Prototype v1 - simulated AI</span>
					</span>
				</div>

				{/* Right: Mute toggle + User pill + Logout button */}
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => {
							setIsAudioMuted((prev) => {
								const next = !prev;
								if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
									window.speechSynthesis.cancel();
								}
								toast.info(next ? "Zoe voice muted" : "Zoe voice unmuted");
								return next;
							});
						}}
						className={cn(
							"inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-all cursor-pointer",
							isAudioMuted
								? "border-rose-500/40 bg-rose-950/50 text-rose-300 hover:bg-rose-900/60"
								: "border-emerald-500/40 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/60"
						)}
						title={isAudioMuted ? "Click to unmute Zoe voice" : "Click to mute Zoe voice"}
					>
						{isAudioMuted ? (
							<>
								<VolumeX className="size-3.5 text-rose-400" />
								<span>Zoe Muted</span>
							</>
						) : (
							<>
								<Volume2 className="size-3.5 text-emerald-400" />
								<span>Voice On</span>
							</>
						)}
					</button>

					<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-200 text-xs font-semibold">
						<span className="size-2 rounded-full bg-emerald-400" />
						<span>{fullName || "User"}</span>
					</div>

					<button
						type="button"
						onClick={() => {
							toast.info("Logged out");
							navigate({ to: "/dashboard/resumes" as any });
						}}
						className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
					>
						<LogOut className="size-3 text-slate-400" />
						<span>Log out</span>
					</button>
				</div>
			</div>

			{/* Top Navigation Header: 01 Your plan, 02 Your stories, 03 Details, 04 Review & export */}
			<header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#070d14]/95 backdrop-blur-md px-6 sm:px-8 py-3.5">
				<div className="flex items-center justify-between gap-4 w-full">
					{/* Left: 01 Your plan, 02 Your stories, 03 Details, 04 Review & export */}
					<nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold tracking-wide">
						<button
							type="button"
							onClick={() => setActiveTab("plan")}
							className={cn(
								"pb-3 -mb-3.5 transition-all cursor-pointer flex items-center gap-1.5",
								activeTab === "plan"
									? "text-[#ccf873] border-b-2 border-[#ccf873] font-bold"
									: "text-slate-400 hover:text-slate-200"
							)}
						>
							<span className={cn(
								"text-[11px] font-mono",
								activeTab === "plan" ? "text-[#ccf873]" : "text-slate-500"
							)}>01</span>
							<span>Your plan</span>
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("stories")}
							className={cn(
								"pb-3 -mb-3.5 transition-all cursor-pointer flex items-center gap-1.5",
								activeTab === "stories"
									? "text-[#ccf873] border-b-2 border-[#ccf873] font-bold"
									: "text-slate-400 hover:text-slate-200"
							)}
						>
							<span className={cn(
								"text-[11px] font-mono",
								activeTab === "stories" ? "text-[#ccf873]" : "text-slate-500"
							)}>02</span>
							<span>Your stories</span>
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("details")}
							className={cn(
								"pb-3 -mb-3.5 transition-all cursor-pointer flex items-center gap-1.5",
								activeTab === "details"
									? "text-[#ccf873] border-b-2 border-[#ccf873] font-bold"
									: "text-slate-400 hover:text-slate-200"
							)}
						>
							<span className={cn(
								"text-[11px] font-mono",
								activeTab === "details" ? "text-[#ccf873]" : "text-slate-500"
							)}>03</span>
							<span>Details</span>
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("export")}
							className={cn(
								"pb-3 -mb-3.5 transition-all cursor-pointer flex items-center gap-1.5",
								activeTab === "export"
									? "text-[#ccf873] border-b-2 border-[#ccf873] font-bold"
									: "text-slate-400 hover:text-slate-200"
							)}
						>
							<span className={cn(
								"text-[11px] font-mono",
								activeTab === "export" ? "text-[#ccf873]" : "text-slate-500"
							)}>04</span>
							<span>Review & export</span>
						</button>
					</nav>

					{/* Right: Direction, Save & leave (matching screenshot) */}
					<div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-300">
						<button
							type="button"
							onClick={() => setWizardStep("direction")}
							className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
						>
							<Compass className="size-4 text-slate-400" />
							<span>Direction</span>
						</button>

						<button
							type="button"
							onClick={() => {
								toast.success("Progress saved! Returning to dashboard.");
								navigate({ to: "/dashboard/resumes" as any });
							}}
							className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
						>
							<LogOut className="size-4 text-slate-400" />
							<span>Save & leave</span>
						</button>
					</div>
				</div>
			</header>

			{/* Main Workspace Body: Split Left Plan & Right Live Preview */}
			<div className="flex flex-col lg:flex-row flex-1 w-full min-h-0">
				{/* Left Column: Interactive Plan & Editor Tools */}
				<main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 overflow-y-auto">

					{/* TAB 1: PLAN VIEW */}
					{activeTab === "plan" && (
						<div className="space-y-6">
							{/* Sub-header meta row: Target Role (Editable), Saved on this device, Hide resume toggle */}
							<div className="flex items-center justify-between text-xs text-slate-400 pt-1">
								{isEditingResumeTitle ? (
									<div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
										<input
											type="text"
											value={tempResumeTitle}
											onChange={(e) => setTempResumeTitle(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													const trimmed = tempResumeTitle.trim();
													if (trimmed) {
														setTargetRole(trimmed);
														if (createdResumeId) {
															localResumeStore.update(createdResumeId, { name: `${trimmed} Resume` });
														}
														try {
															const saved = localStorage.getItem("resume_buddy_guided_story_draft");
															if (saved) {
																const p = JSON.parse(saved);
																p.targetRole = trimmed;
																localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(p));
															}
														} catch { }
														toast.success("Resume title updated");
													}
													setIsEditingResumeTitle(false);
												} else if (e.key === "Escape") {
													setIsEditingResumeTitle(false);
												}
											}}
											autoFocus
											className="text-xs font-semibold text-white bg-slate-900 border border-emerald-500 rounded px-2 py-0.5 focus:outline-none"
											placeholder="Resume role/title..."
										/>
										<button
											type="button"
											onClick={() => {
												const trimmed = tempResumeTitle.trim();
												if (trimmed) {
													setTargetRole(trimmed);
													if (createdResumeId) {
														localResumeStore.update(createdResumeId, { name: `${trimmed} Resume` });
													}
													try {
														const saved = localStorage.getItem("resume_buddy_guided_story_draft");
														if (saved) {
															const p = JSON.parse(saved);
															p.targetRole = trimmed;
															localStorage.setItem("resume_buddy_guided_story_draft", JSON.stringify(p));
														}
													} catch { }
													toast.success("Resume title updated");
												}
												setIsEditingResumeTitle(false);
											}}
											className="p-1 rounded bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
										>
											<Check className="size-3 stroke-[3]" />
										</button>
										<button
											type="button"
											onClick={() => setIsEditingResumeTitle(false)}
											className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
										>
											<X className="size-3" />
										</button>
									</div>
								) : (
									<div className="flex items-center gap-1.5 group/editname">
										<span className="font-semibold text-slate-300">
											{targetRole || "Frontend Developer"}
										</span>
										<button
											type="button"
											onClick={() => {
												setTempResumeTitle(targetRole || "Frontend Developer");
												setIsEditingResumeTitle(true);
											}}
											className="p-1 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer rounded"
											title="Edit resume role / title"
										>
											<Pencil className="size-3" />
										</button>
									</div>
								)}

								<div className="flex items-center gap-4">
									<span className="flex items-center gap-1.5 text-[11px] text-slate-400">
										<span className="size-1.5 rounded-full bg-emerald-400" />
										<span>Saved on this device</span>
									</span>

									<button
										type="button"
										onClick={() => setHideResumePreview(!hideResumePreview)}
										className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
									>
										<span>{hideResumePreview ? "👁 Show resume" : "👁 Hide resume"}</span>
									</button>
								</div>
							</div>

							{/* Hero Header matching screenshot */}
							<div className="space-y-1.5 pt-1">
								<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
									A ROUTE, AT YOUR PACE
								</span>
								<h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
									Let's bring your story out.
								</h1>
								<p className="text-xs sm:text-sm text-slate-400 max-w-xl">
									One useful step at a time. Zoe puts the most useful step first; you can choose anything.
								</p>
							</div>

							{/* DYNAMIC TOP CARD:
						    - If the user has completed at least 1 story (e.g. work experience has bullets),
						      or all stories are finished, show the next section prompt (Image 1: "ZOE / YOUR NEXT SECTION - What about projects?")
						      unless dismissed.
						    - When an entry is pending and no story is completed yet:
						      Show Image 2: "ZOE / YOUR NEXT STEP - Zoe suggests <Role> - Talk through this"
						*/}
							{(() => {
								const sorted = sortEntriesByPriority(outlineEntries);
								const pendingEntry = sorted.find((e) => !e.points || e.points.length === 0);
								const hasCompletedStory = sorted.some((e) => e.points && e.points.length > 0);

								// Determine which section to suggest next based on what's in the outline
								const hasProjects = outlineEntries.some((e) => e.category === "projects");
								const hasEducation = outlineEntries.some((e) => e.category === "education");
								const nextSuggestedCategory: "projects" | "education" | "volunteer" = !hasProjects
									? "projects"
									: !hasEducation
										? "education"
										: "volunteer";

								// If user has completed a story, promote the next section prompt (matching user request and screenshot 1)
								if (hasCompletedStory && !dismissedPlanSectionPrompt) {
									return (
										<div className="rounded-2xl border border-indigo-500/30 bg-[#0e1124] p-6 sm:p-7 shadow-xl relative overflow-hidden space-y-4">
											<div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-indigo-300">
												<div className="flex items-center gap-2">
													<span className="size-2 rounded-full bg-indigo-400" />
													<span>ZOE / YOUR NEXT SECTION</span>
												</div>
												<button
													type="button"
													onClick={() => {
														setQuickAddCategory(nextSuggestedCategory);
														setQuickAddSectionModalOpen(true);
													}}
													className="p-1 rounded text-indigo-400/70 hover:text-indigo-300 transition-colors cursor-pointer"
													title={`Add ${nextSuggestedCategory}`}
												>
													<ExternalLink className="size-3.5" />
												</button>
											</div>

											<div className="space-y-1">
												<h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
													{nextSuggestedCategory === "projects" && "What about projects?"}
													{nextSuggestedCategory === "education" && "What about education?"}
													{nextSuggestedCategory === "volunteer" && "What about volunteering & activities?"}
												</h2>
												<p className="text-xs sm:text-sm text-slate-300 pt-0.5">
													{nextSuggestedCategory === "projects" && "Have you built something through coursework, personal practice, freelance work, or volunteering that you would like to include?"}
													{nextSuggestedCategory === "education" && "Degrees, bootcamps, certifications, or coursework you'd like highlighted on your resume."}
													{nextSuggestedCategory === "volunteer" && "Community leadership, mentoring, clubs, or extracurricular initiatives."}
												</p>
											</div>

											<div className="pt-2 flex flex-wrap items-center gap-3">
												<button
													type="button"
													onClick={() => {
														setQuickAddCategory(nextSuggestedCategory);
														setQuickAddSectionModalOpen(true);
													}}
													className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
												>
													<span>+ Add a {nextSuggestedCategory === "projects" ? "project" : nextSuggestedCategory === "education" ? "degree" : "activity"}</span>
												</button>
												<button
													type="button"
													onClick={() => {
														toast.info(`Noted! We'll proceed without ${nextSuggestedCategory} for now.`);
														setDismissedPlanSectionPrompt(true);
													}}
													className="px-5 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm transition-all cursor-pointer"
												>
													Nothing to add here
												</button>
												<button
													type="button"
													onClick={() => {
														toast.info(`You can return to add ${nextSuggestedCategory} whenever you're ready.`);
														setDismissedPlanSectionPrompt(true);
													}}
													className="text-xs text-slate-400 hover:text-slate-200 font-semibold px-2 py-1 transition-colors cursor-pointer"
												>
													Decide later
												</button>
											</div>
										</div>
									);
								}

								// If there is an unfinished entry, show IMAGE 2 (Featured Next Step)
								if (pendingEntry) {
									return (
										<div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0c2217] via-[#081912] to-[#050f0b] p-6 sm:p-7 shadow-xl relative overflow-hidden space-y-5">
											<div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-emerald-300">
												<div className="flex items-center gap-2">
													<span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
													<span>ZOE / YOUR NEXT STEP</span>
												</div>
												<button
													type="button"
													onClick={() => {
														setActiveTab("stories");
														setSelectedExperienceId(pendingEntry.id);
														setInterviewActiveEntryId(pendingEntry.id);
														setStoriesViewMode("interview");
													}}
													className="p-1 rounded text-emerald-400/70 hover:text-emerald-300 transition-colors cursor-pointer"
													title={`Explore ${pendingEntry.title}`}
												>
													<ExternalLink className="size-3.5" />
												</button>
											</div>

											<div className="space-y-1.5">
												<span className="text-xs text-emerald-400/90 font-medium block">
													Zoe suggests
												</span>
												<h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
													{pendingEntry.title}
												</h2>
												<p className="text-xs sm:text-sm text-slate-300">
													Talk through the main things you did here. Zoe drafts a statement for each.
												</p>
												<div className="text-xs text-slate-400 pt-1 flex items-center gap-1.5">
													<span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">WHY THIS FIRST</span>
													<span>It's your most recent role and close to your target role.</span>
												</div>
											</div>

											<div className="pt-2 flex flex-wrap items-center gap-4">
												<button
													type="button"
													onClick={() => {
														setActiveTab("stories");
														setSelectedExperienceId(pendingEntry.id);
														setInterviewActiveEntryId(pendingEntry.id);
														setStoriesViewMode("interview");
													}}
													className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
												>
													<Mic className="size-4 text-slate-950" />
													<span>Talk through this</span>
												</button>

												<span className="text-xs text-emerald-300/60">
													You can choose a different step below.
												</span>
											</div>

											<div className="flex items-center justify-between pt-4 border-t border-emerald-500/10 text-[10px] font-mono text-emerald-400/60">
												<span>{hasCompletedStory ? "2 OF 10 PLAN ITEMS FINISHED" : "0 OF 10 PLAN ITEMS FINISHED"}</span>
												<div className="flex items-center gap-1">
													<span className="size-1 rounded-full bg-emerald-500/40" />
													<span className="size-1 rounded-full bg-emerald-500/40" />
													<span className="size-1 rounded-full bg-emerald-500/40" />
												</div>
											</div>
										</div>
									);
								}

								// If all current experiences have statements and section prompt was dismissed, show standard next section:
								return (
									<div className="rounded-2xl border border-indigo-500/30 bg-[#0e1124] p-6 sm:p-7 shadow-xl relative overflow-hidden space-y-4">
										<div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-indigo-300">
											<div className="flex items-center gap-2">
												<span className="size-2 rounded-full bg-indigo-400" />
												<span>ZOE / YOUR NEXT SECTION</span>
											</div>
											<ExternalLink className="size-3.5 text-indigo-400/60" />
										</div>

										<div className="space-y-1">
											<h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
												{nextSuggestedCategory === "projects" && "What about projects?"}
												{nextSuggestedCategory === "education" && "What about education?"}
												{nextSuggestedCategory === "volunteer" && "What about volunteering & activities?"}
											</h2>
											<p className="text-xs sm:text-sm text-slate-300 pt-0.5">
												{nextSuggestedCategory === "projects" && "Have you built something through coursework, personal practice, freelance work, or volunteering that you would like to include?"}
												{nextSuggestedCategory === "education" && "Degrees, bootcamps, certifications, or coursework you'd like highlighted on your resume."}
												{nextSuggestedCategory === "volunteer" && "Community leadership, mentoring, clubs, or extracurricular initiatives."}
											</p>
										</div>

										<div className="pt-2 flex flex-wrap items-center gap-3">
											<button
												type="button"
												onClick={() => {
													setQuickAddCategory(nextSuggestedCategory);
													setQuickAddSectionModalOpen(true);
												}}
												className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
											>
												<span>+ Add a {nextSuggestedCategory === "projects" ? "project" : nextSuggestedCategory === "education" ? "degree" : "activity"}</span>
											</button>
											<button
												type="button"
												onClick={() => toast.info(`Noted! We'll proceed without ${nextSuggestedCategory} for now.`)}
												className="px-5 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm transition-all cursor-pointer"
											>
												Nothing to add here
											</button>
											<button
												type="button"
												onClick={() => toast.info(`You can return to add ${nextSuggestedCategory} whenever you're ready.`)}
												className="text-xs text-slate-400 hover:text-slate-200 font-semibold px-2 py-1 transition-colors cursor-pointer"
											>
												Decide later
											</button>
										</div>
									</div>
								);
							})()}

							{/* SECTION 1: Your experience (Ordered by what will strengthen the resume most) */}
							<div className="space-y-4 pt-3">
								<div className="flex items-center justify-between">
									<h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
										Your experience
									</h3>
									<span className="text-xs text-slate-400">
										Ordered by what will strengthen the resume most.
									</span>
								</div>

								<div className="space-y-3">
									{sortEntriesByPriority(outlineEntries).map((entry) => {
										const isFinished = (entry.points && entry.points.length > 0);
										const subtitle = isFinished
											? "You're finished with this entry for now. Reopen it whenever you like."
											: "Talk through the main things you did here. Zoe drafts a statement for each.";

										return (
											<div
												key={entry.id}
												className="rounded-xl border border-slate-800/90 bg-[#070e18] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
											>
												<div className="space-y-1.5 flex-1 min-w-0">
													<div className="flex items-center gap-2">
														{isFinished ? (
															<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
																Done
															</span>
														) : (
															<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
																To do
															</span>
														)}
														<h4 className="text-sm font-bold text-white truncate">
															{entry.title}
														</h4>
													</div>
													<p className="text-xs text-slate-400 leading-relaxed">
														{subtitle}
													</p>
												</div>

												<div className="flex items-center gap-2 shrink-0">
													<button
														type="button"
														onClick={() => {
															setActiveTab("stories");
															setSelectedExperienceId(entry.id);
															setInterviewActiveEntryId(entry.id);
															if (isFinished) {
																setStoriesViewMode("overview");
															} else {
																setStoriesViewMode("interview");
															}
														}}
														className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
													>
														Open
													</button>
													{!isFinished && (
														<button
															type="button"
															onClick={() => {
																toast.info(`Saved ${entry.title} for later.`);
															}}
															className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
														>
															Later
														</button>
													)}
												</div>
											</div>
										);
									})}
								</div>
							</div>

							{/* SECTION 2: Final checks (Quick steps before you export) */}
							<div className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
										Final checks
									</h3>
									<span className="text-xs text-slate-400">
										Quick steps before you export.
									</span>
								</div>

								<div className="space-y-3">
									{/* Card 1: Anything else to include? */}
									<div className="rounded-xl border border-slate-800/90 bg-[#070e18] p-4 sm:p-5 space-y-3 hover:border-slate-700 transition-all">
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
													1 of 4 checked
												</span>
											</div>
											<h4 className="text-sm font-bold text-white">Anything else to include?</h4>
											<p className="text-xs text-slate-400">
												Still to check: Projects, Volunteering & activities, Education. Nothing to add is fine.
											</p>
										</div>
										<div className="pt-1">
											<button
												type="button"
												onClick={() => {
													setActiveTab("stories");
													setStoriesViewMode("overview");
												}}
												className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
											>
												<span>► Check each section</span>
											</button>
										</div>
									</div>

									{/* Card 2: Confirm contact details */}
									<div className="rounded-xl border border-slate-800/90 bg-[#070e18] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
										<div className="space-y-1.5 flex-1 min-w-0">
											<div className="flex items-center gap-2">
												<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
													To do
												</span>
												<h4 className="text-sm font-bold text-white">Confirm contact details</h4>
											</div>
											<p className="text-xs text-slate-400 leading-relaxed">
												Add your name and a way for employers to contact you.
											</p>
										</div>
										<div className="flex items-center gap-2 shrink-0">
											<button
												type="button"
												onClick={() => {
													setActiveTab("details");
													setDetailsSubTab("contact");
												}}
												className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
											>
												Open
											</button>
											<button
												type="button"
												onClick={() => toast.info("Contact details check saved for later.")}
												className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
											>
												Later
											</button>
										</div>
									</div>

									{/* Card 3: Confirm entry dates */}
									<div className="rounded-xl border border-slate-800/90 bg-[#070e18] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
										<div className="space-y-1.5 flex-1 min-w-0">
											<div className="flex items-center gap-2">
												<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
													To do
												</span>
												<h4 className="text-sm font-bold text-white">Confirm entry dates</h4>
											</div>
											<p className="text-xs text-slate-400 leading-relaxed">
												Some entries still have dates to confirm before applying.
											</p>
										</div>
										<div className="flex items-center gap-2 shrink-0">
											<button
												type="button"
												onClick={() => {
													setActiveTab("details");
													setDetailsSubTab("summary");
												}}
												className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
											>
												Open
											</button>
											<button
												type="button"
												onClick={() => toast.info("Entry dates check saved for later.")}
												className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
											>
												Later
											</button>
										</div>
									</div>

									{/* Card 4: Review skills */}
									<div className="rounded-xl border border-slate-800/90 bg-[#070e18] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
										<div className="space-y-1.5 flex-1 min-w-0">
											<div className="flex items-center gap-2">
												<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
													To do
												</span>
												<h4 className="text-sm font-bold text-white">Review skills</h4>
											</div>
											<p className="text-xs text-slate-400 leading-relaxed">
												Only include skills you can use and explain. Suggestions need your confirmation.
											</p>
										</div>
										<div className="flex items-center gap-2 shrink-0">
											<button
												type="button"
												onClick={() => {
													setActiveTab("details");
													setDetailsSubTab("skills");
												}}
												className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
											>
												Open
											</button>
											<button
												type="button"
												onClick={() => toast.info("Skills review saved for later.")}
												className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
											>
												Later
											</button>
										</div>
									</div>

									{/* Card 5: Review layout and export */}
									<div className="rounded-xl border border-slate-800/90 bg-[#070e18] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
										<div className="space-y-1.5 flex-1 min-w-0">
											<div className="flex items-center gap-2">
												<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
													To do
												</span>
												<h4 className="text-sm font-bold text-white">Review layout and export</h4>
											</div>
											<p className="text-xs text-slate-400 leading-relaxed">
												Check facts, wording, spacing, and page breaks in the final document.
											</p>
										</div>
										<div className="flex items-center gap-2 shrink-0">
											<button
												type="button"
												onClick={() => setActiveTab("export")}
												className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
											>
												Open
											</button>
											<button
												type="button"
												onClick={() => toast.info("Review & export saved for later.")}
												className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
											>
												Later
											</button>
										</div>
									</div>
								</div>

								{/* Optional opportunities accordion */}
								<div className="pt-2">
									<button
										type="button"
										onClick={() => {
											setActiveTab("stories");
											setStoryCategoryFilter("projects");
										}}
										className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 font-medium transition-colors"
									>
										<span>►</span>
										<span>Optional opportunities</span>
									</button>
								</div>
							</div>
						</div>
					)}

					{/* TAB 2: STORIES (YOUR STORIES SECTION OVERVIEW & EXPLORATION) */}
					{activeTab === "stories" && (
						<div className="space-y-6">
							{/* Sub-header meta row: Target Role, Saved on this device, Hide resume toggle (ONLY in overview mode) */}
							{storiesViewMode === "overview" && (
								<div className="flex items-center justify-between text-xs text-slate-400 pt-1">
									<span className="font-semibold text-slate-300">
										{targetRole || "Frontend Developer"}
									</span>

									<div className="flex items-center gap-4">
										<span className="flex items-center gap-1.5 text-[11px] text-slate-400">
											<span className="size-1.5 rounded-full bg-emerald-400" />
											<span>Saved on this device</span>
										</span>

										<button
											type="button"
											onClick={() => setHideResumePreview(!hideResumePreview)}
											className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
										>
											<span>{hideResumePreview ? "👁 Show resume" : "👁 Hide resume"}</span>
										</button>
									</div>
								</div>
							)}

							{/* Hero Header: ONLY in overview mode, NOT when telling story or in checklist/drilldown */}
							{storiesViewMode === "overview" && (
								<div className="space-y-2 pt-1">
									<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
										YOUR STORIES
									</span>
									<h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
										Your experience.<br />All the useful parts.
									</h1>
									<p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
										Work, projects, activities, and education. Open any entry, add something new, or return to your plan. Zoe asks about a few pieces of work in each entry, then drafts a statement for each.
									</p>
								</div>
							)}

							{/* If user clicked to interview an entry directly, show the Interview Studio mode */}
							{storiesViewMode === "interview" && interviewActiveEntryId ? (
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<button
											type="button"
											onClick={() => setStoriesViewMode("overview")}
											className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#070e19] text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
										>
											<ArrowLeft className="size-3.5" />
											<span>Back to all stories overview</span>
										</button>

										<button
											type="button"
											onClick={() => setHideResumePreview(!hideResumePreview)}
											className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
										>
											<span>{hideResumePreview ? "👁 Show resume" : "👁 Hide resume"}</span>
										</button>
									</div>

									{(() => {
										const activeEntry = outlineEntries.find((e) => e.id === interviewActiveEntryId) || outlineEntries[0];
										if (!activeEntry) return null;
										const focusedQ = getFocusedQuestionForExperience(activeEntry);

										return (
											<div className="rounded-2xl border-2 border-emerald-500/40 bg-[#091524] p-6 sm:p-7 shadow-2xl space-y-5">
												{/* Header Controls: Zoe pill, Hear again, Choose voice */}
												<div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
													<div className="flex items-center gap-3">
														<span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 uppercase border border-emerald-500/30">
															Zoe
														</span>
														<button
															type="button"
															onClick={() => {
																speakText(focusedQ.question);
															}}
															className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
														>
															<Volume2 className="size-3.5 text-emerald-400" />
															<span>Hear again</span>
														</button>
														<button
															type="button"
															onClick={() => {
																setIsAudioMuted((prev) => {
																	const next = !prev;
																	if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
																		window.speechSynthesis.cancel();
																	}
																	toast.info(next ? "Zoe voice muted" : "Zoe voice unmuted");
																	return next;
																});
															}}
															className={cn(
																"inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer",
																isAudioMuted
																	? "border-rose-500/40 bg-rose-950/40 text-rose-300"
																	: "border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
															)}
															title={isAudioMuted ? "Unmute Zoe voice" : "Mute Zoe voice"}
														>
															{isAudioMuted ? <VolumeX className="size-3 text-rose-400" /> : <Volume2 className="size-3 text-emerald-400" />}
															<span>{isAudioMuted ? "Muted" : "Mute voice"}</span>
														</button>
													</div>

													<div className="flex items-center gap-2">
														<span className="text-xs text-slate-400 font-medium">Choose voice</span>
														<span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
															Kokoro AI
														</span>
													</div>
												</div>

												{/* About Tag */}
												<div>
													<span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
														About: {activeEntry.title}
													</span>
												</div>

												{/* Targeted Question */}
												<div className="space-y-1.5">
													<h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
														{focusedQ.question}
													</h3>
													<p className="text-xs text-slate-400">
														You can describe it in your own words. Zoe will help with the wording.
													</p>
												</div>

												{/* Voice recording button */}
												<div className="flex items-center gap-3">
													<button
														type="button"
														onClick={() => {
															if (isSpeakingAnswer) {
																setIsSpeakingAnswer(false);
																voiceAssistant.stop();
															} else {
																const baseText = experienceInputText ? experienceInputText.trim() : "";
																setIsSpeakingAnswer(true);
																const started = voiceAssistant.start(
																	(transcript) => {
																		const combined = baseText ? `${baseText} ${transcript}` : transcript;
																		setExperienceInputText(combined);
																	},
																	(err) => {
																		console.warn("Speech error:", err);
																		setIsSpeakingAnswer(false);
																	},
																	() => {
																		setIsSpeakingAnswer(false);
																	}
																);
																if (!started) {
																	setIsSpeakingAnswer(false);
																}
															}
														}}
														className={cn(
															"px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer",
															isSpeakingAnswer
																? "bg-rose-500/20 border-2 border-rose-500 text-rose-300 animate-pulse"
																: "bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
														)}
													>
														<Mic className="size-4 text-emerald-400" />
														<span>{isSpeakingAnswer ? "Stop recording..." : "Speak your answer"}</span>
													</button>
													<span className="text-[11px] text-slate-500">
														{isSpeakingAnswer ? "Listening... Speak naturally" : "Your voice, in your words. Review before sending."}
													</span>
												</div>

												{/* Direct Answer Textarea */}
												<div className="space-y-3">
													<textarea
														rows={4}
														value={experienceInputText}
														onChange={(e) => setExperienceInputText(e.target.value)}
														placeholder="Your words go here. Speak or type..."
														className="w-full rounded-2xl border border-slate-700 bg-[#060c14] p-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none resize-none transition-colors"
													/>

													<div className="flex items-center justify-between pt-1">
														<button
															type="button"
															onClick={() => setStoriesViewMode("overview")}
															className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
														>
															Skip question
														</button>

														<button
															type="button"
															disabled={isExtractingTopics || !experienceInputText.trim()}
															onClick={() => {
																if (isSpeakingAnswer) {
																	setIsSpeakingAnswer(false);
																	voiceAssistant.stop();
																}
																handleInitialStorySubmit(activeEntry.id, experienceInputText);
															}}
															className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
														>
															<span>{isExtractingTopics ? "Listening & analyzing..." : "Send answer"}</span>
															<ArrowRight className="size-4" />
														</button>
													</div>
												</div>
											</div>
										);
									})()}
								</div>
							) : storiesViewMode === "checklist" ? (
								/* ── CHECKLIST MODE: "Here's what I heard" matching user screenshots 1 & 2 ── */
								(() => {
									const activeEntry = outlineEntries.find((e) => e.id === interviewActiveEntryId) || outlineEntries[0];
									const orgName = activeEntry?.organization || activeEntry?.title || "your experience";
									const selectedCount = extractedTopics.filter((t) => t.selected).length;

									return (
										<div className="space-y-4">
											{/* Breadcrumb Top Bar */}
											<div className="flex items-center justify-between text-xs text-slate-400">
												<div>
													<span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold block">
														Check the list
													</span>
													<div className="mt-1">
														<span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
															{activeEntry?.category === "work" ? "WORK EXPERIENCE" : activeEntry?.category.toUpperCase()}
														</span>
														<h2 className="text-xl font-extrabold text-white">
															{activeEntry?.title}
														</h2>
														<p className="text-xs text-slate-400">
															{activeEntry?.organization} {activeEntry?.dates ? `· ${activeEntry.dates}` : ""}
														</p>
													</div>
												</div>

												<div className="text-right">
													<span className="text-[11px] text-slate-400 block">
														One conversation · a statement for each piece of work
													</span>
													<button
														type="button"
														onClick={() => setStoriesViewMode("overview")}
														className="text-xs text-slate-400 hover:text-white mt-2 cursor-pointer font-semibold"
													>
														Pause
													</button>
												</div>
											</div>

											{/* Main Card */}
											<div className="rounded-2xl border border-slate-800 bg-[#070e17] p-6 sm:p-8 shadow-2xl space-y-6">
												{/* "Here's what I heard" Badge */}
												<div className="inline-flex items-center px-2.5 py-1 rounded bg-[#102219] border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-300">
													Here's what I heard
												</div>

												<div className="space-y-1">
													<h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
														{extractedTopics.length} things from {orgName}.
													</h3>
													<p className="text-xs sm:text-sm text-slate-400">
														Each one can become a bullet. Rename, set aside, or add anything that's missing.
													</p>
												</div>

												{/* Checkbox Items List */}
												<div className="space-y-2.5">
													{extractedTopics.map((topic, idx) => (
														<div
															key={topic.id}
															onClick={() => {
																setExtractedTopics((prev) =>
																	prev.map((t) =>
																		t.id === topic.id ? { ...t, selected: !t.selected } : t
																	)
																);
															}}
															className={cn(
																"flex items-center gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer",
																topic.selected
																	? "border-emerald-500/50 bg-[#09181d] text-white"
																	: "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700"
															)}
														>
															<div
																className={cn(
																	"size-5 rounded flex items-center justify-center transition-colors shrink-0",
																	topic.selected
																		? "bg-emerald-500 text-slate-950 font-bold"
																		: "border border-slate-600 bg-slate-800"
																)}
															>
																{topic.selected && <Check className="size-3.5 stroke-[3]" />}
															</div>
															<span className="text-sm font-semibold flex-1">
																{topic.text}
															</span>
														</div>
													))}
												</div>

												{/* "Anything else from ... worth adding?" */}
												<div className="pt-2 space-y-3">
													<h4 className="text-sm font-bold text-white">
														Anything else from {orgName} worth adding?
													</h4>

													{/* Speak your answer button */}
													<div className="flex items-center gap-3">
														<button
															type="button"
															onClick={() => {
																if (isSpeakingAnswer) {
																	setIsSpeakingAnswer(false);
																	voiceAssistant.stop();
																} else {
																	const baseText = customTopicInput ? customTopicInput.trim() : "";
																	setIsSpeakingAnswer(true);
																	const started = voiceAssistant.start(
																		(transcript) => {
																			const combined = baseText ? `${baseText} ${transcript}` : transcript;
																			setCustomTopicInput(combined);
																		},
																		(err) => {
																			console.warn("Speech error:", err);
																			setIsSpeakingAnswer(false);
																		},
																		() => {
																			setIsSpeakingAnswer(false);
																		}
																	);
																	if (!started) {
																		setIsSpeakingAnswer(false);
																	}
																}
															}}
															className={cn(
																"px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all cursor-pointer border",
																isSpeakingAnswer
																	? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
																	: "bg-[#112419] border-emerald-500/40 text-emerald-300 hover:bg-[#152e20]"
															)}
														>
															<Mic className="size-4 text-emerald-400" />
															<span>{isSpeakingAnswer ? "Stop recording..." : "Speak your answer"}</span>
														</button>
														<span className="text-[11px] text-slate-500">
															{isSpeakingAnswer ? "Listening... Speak naturally" : "Your voice, in your words. Review before sending."}
														</span>
													</div>

													{/* Optional add input */}
													<div className="space-y-2">
														<textarea
															rows={2}
															value={customTopicInput}
															onChange={(e) => setCustomTopicInput(e.target.value)}
															placeholder="Optional. Speak or type anything else from this role."
															className="w-full rounded-xl border border-slate-800 bg-[#060b13] p-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 outline-none resize-none"
														/>

														{customTopicInput.trim() && (
															<button
																type="button"
																onClick={() => {
																	if (!customTopicInput.trim()) return;
																	setExtractedTopics((prev) => [
																		...prev,
																		{ id: `custom_${Date.now()}`, text: customTopicInput.trim(), selected: true },
																	]);
																	setCustomTopicInput("");
																	toast.success("Added to checklist!");
																}}
																className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
															>
																+ Add to the list
															</button>
														)}
													</div>
												</div>

												{/* Bottom Action: Start with these N -> */}
												<div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
													<button
														type="button"
														onClick={() => setStoriesViewMode("overview")}
														className="text-xs text-slate-400 hover:text-white cursor-pointer font-semibold"
													>
														Decide later
													</button>

													<button
														type="button"
														onClick={handleStartWithSelectedTopics}
														className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
													>
														<span>Start with these {selectedCount} →</span>
													</button>
												</div>
											</div>
										</div>
									);
								})()
							) : storiesViewMode === "topic_drilldown" ? (
								/* ── TOPIC DRILLDOWN MODE: Asking questions for extracted points one by one ── */
								(() => {
									const activeEntry = outlineEntries.find((e) => e.id === interviewActiveEntryId) || outlineEntries[0];
									const selected = extractedTopics.filter((t) => t.selected);
									const currentTopic = selected[drilldownTopicIndex];
									const totalTopics = selected.length;

									return (
										<div className="space-y-4">
											{/* Top breadcrumb */}
											<div className="flex items-center justify-between text-xs text-slate-400">
												<div className="flex items-center gap-2">
													<button
														type="button"
														onClick={() => setStoriesViewMode("checklist")}
														className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer font-semibold"
													>
														<ArrowLeft className="size-3.5" />
														<span>Back to list</span>
													</button>
													<span className="text-slate-600">/</span>
													<span className="text-emerald-400 font-mono font-bold">
														Point {drilldownTopicIndex + 1} of {totalTopics}
													</span>
												</div>

												<span className="text-[11px] text-slate-500 font-mono">
													{activeEntry.title}
												</span>
											</div>

											<div className="rounded-2xl border-2 border-emerald-500/40 bg-[#091524] p-6 sm:p-7 shadow-2xl space-y-5">
												{/* Zoe badge & audio controls */}
												<div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
													<div className="flex items-center gap-3">
														<span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 uppercase border border-emerald-500/30">
															Zoe
														</span>
														<button
															type="button"
															onClick={() => {
																if (currentTopicQuestion) speakText(currentTopicQuestion);
															}}
															className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
														>
															<Volume2 className="size-3.5 text-emerald-400" />
															<span>Hear again</span>
														</button>
														<button
															type="button"
															onClick={() => {
																setIsAudioMuted((prev) => {
																	const next = !prev;
																	if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
																		window.speechSynthesis.cancel();
																	}
																	toast.info(next ? "Zoe voice muted" : "Zoe voice unmuted");
																	return next;
																});
															}}
															className={cn(
																"inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer",
																isAudioMuted
																	? "border-rose-500/40 bg-rose-950/40 text-rose-300"
																	: "border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
															)}
															title={isAudioMuted ? "Unmute Zoe voice" : "Mute Zoe voice"}
														>
															{isAudioMuted ? <VolumeX className="size-3 text-rose-400" /> : <Volume2 className="size-3 text-emerald-400" />}
															<span>{isAudioMuted ? "Muted" : "Mute voice"}</span>
														</button>
													</div>

													<div className="flex items-center gap-2">
														<span className="text-xs text-slate-400 font-medium">Topic:</span>
														<span className="text-xs font-bold text-white px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
															{currentTopic ? currentTopic.text : "Role contribution"}
														</span>
													</div>
												</div>

												{/* Focused Question for this specific extracted point */}
												<div className="space-y-1.5">
													<h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
														{isLoadingTopicQuestion ? "Zoe is crafting a question..." : currentTopicQuestion}
													</h3>
													<p className="text-xs text-slate-400">
														Focus on your specific role, challenge, tools used, or outcome. Zoe will draft the resume bullet.
													</p>
												</div>

												{/* Speak voice recorder */}
												<div className="flex items-center gap-3">
													<button
														type="button"
														onClick={() => {
															if (isSpeakingAnswer) {
																setIsSpeakingAnswer(false);
																voiceAssistant.stop();
															} else {
																const baseText = experienceInputText ? experienceInputText.trim() : "";
																setIsSpeakingAnswer(true);
																const started = voiceAssistant.start(
																	(transcript) => {
																		const combined = baseText ? `${baseText} ${transcript}` : transcript;
																		setExperienceInputText(combined);
																	},
																	(err) => {
																		console.warn("Speech error:", err);
																		setIsSpeakingAnswer(false);
																	},
																	() => {
																		setIsSpeakingAnswer(false);
																	}
																);
																if (!started) {
																	setIsSpeakingAnswer(false);
																}
															}
														}}
														className={cn(
															"px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer",
															isSpeakingAnswer
																? "bg-rose-500/20 border-2 border-rose-500 text-rose-300 animate-pulse"
																: "bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
														)}
													>
														<Mic className="size-4 text-emerald-400" />
														<span>{isSpeakingAnswer ? "Stop recording..." : "Speak your answer"}</span>
													</button>
													<span className="text-[11px] text-slate-500">
														{isSpeakingAnswer ? "Listening... Speak naturally" : "Your voice, in your words."}
													</span>
												</div>

												{/* Direct Answer Textarea */}
												<div className="space-y-3">
													<textarea
														rows={4}
														value={experienceInputText}
														onChange={(e) => setExperienceInputText(e.target.value)}
														placeholder={`e.g. For ${currentTopic?.text || "this item"}, I designed the frontend architecture and...`}
														className="w-full rounded-2xl border border-slate-700 bg-[#060c14] p-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none resize-none transition-colors"
													/>

													<div className="flex items-center justify-between pt-1">
														<button
															type="button"
															onClick={() => {
																// Skip to next topic
																const nextIdx = drilldownTopicIndex + 1;
																if (nextIdx < selected.length) {
																	setDrilldownTopicIndex(nextIdx);
																	handleStartWithSelectedTopics();
																} else {
																	setStoriesViewMode("overview");
																}
															}}
															className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
														>
															Skip this point
														</button>

														<button
															type="button"
															disabled={isSubmittingAnswer || !experienceInputText.trim()}
															onClick={() => {
																if (isSpeakingAnswer) {
																	setIsSpeakingAnswer(false);
																	voiceAssistant.stop();
																}
																handleSaveTopicDrilldownAnswer(experienceInputText);
															}}
															className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
														>
															<span>{isSubmittingAnswer ? "Drafting bullet..." : "Send answer"}</span>
															<ArrowRight className="size-4" />
														</button>
													</div>
												</div>
											</div>
										</div>
									);
								})()
							) : (
								/* Overview Mode: Exactly matching screenshots 1, 2, and 3 */
								<div className="space-y-7">
									{/* Zoe / Your Next Section Card (Purple/Navy gradient callout box) */}
									{showZoeSectionPrompt && (
										<div className="rounded-2xl border border-indigo-900/60 bg-gradient-to-b from-[#131226] via-[#0f0e20] to-[#0a0917] p-6 sm:p-7 shadow-xl relative space-y-4">
											<div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-indigo-300/80">
												<div className="flex items-center gap-2">
													<span className="size-2 rounded-full bg-indigo-400 animate-pulse" />
													<span>ZOE / YOUR NEXT SECTION</span>
												</div>
												<ExternalLink className="size-3.5 text-indigo-400/60" />
											</div>

											<div className="space-y-1.5">
												<h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
													{activeSectionPromptType === "projects" && "What about projects?"}
													{activeSectionPromptType === "education" && "What about education?"}
													{activeSectionPromptType === "volunteer" && "What about volunteering & activities?"}
												</h3>
												<p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
													{activeSectionPromptType === "projects" && "Have you built something through coursework, personal practice, freelance work, or volunteering that you would like to include?"}
													{activeSectionPromptType === "education" && "Degrees, bootcamps, certifications, or coursework you'd like highlighted on your resume."}
													{activeSectionPromptType === "volunteer" && "Community leadership, mentoring, clubs, or extracurricular initiatives."}
												</p>
											</div>

											<div className="flex flex-wrap items-center gap-3 pt-2">
												<button
													type="button"
													onClick={() => {
														const category = activeSectionPromptType === "projects" ? "projects" : activeSectionPromptType === "education" ? "education" : "volunteer";
														setQuickAddCategory(category);
														setQuickAddSectionModalOpen(true);
													}}
													className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
												>
													<Plus className="size-4" />
													<span>Add a {activeSectionPromptType === "projects" ? "project" : activeSectionPromptType === "education" ? "degree" : "activity"}</span>
												</button>

												<button
													type="button"
													onClick={() => {
														if (activeSectionPromptType === "projects") {
															setActiveSectionPromptType("education");
														} else if (activeSectionPromptType === "education") {
															setActiveSectionPromptType("volunteer");
														} else {
															setShowZoeSectionPrompt(false);
														}
													}}
													className="px-4 py-2.5 rounded-xl border border-slate-800 bg-[#0b0a1a] hover:bg-[#121028] text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
												>
													Nothing to add here
												</button>

												<button
													type="button"
													onClick={() => setShowZoeSectionPrompt(false)}
													className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white font-medium text-xs transition-colors cursor-pointer"
												>
													Decide later
												</button>
											</div>
										</div>
									)}

									{/* SECTION 1: Work & internships */}
									<div className="space-y-3.5">
										<div className="flex items-center justify-between pb-1">
											<div className="flex items-center gap-2.5">
												<h3 className="text-base sm:text-lg font-bold text-white">Work & internships</h3>
												<span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
													{outlineEntries.filter((e) => e.category === "work").length}
												</span>
											</div>

											<button
												type="button"
												onClick={() => {
													setQuickAddCategory("work");
													setQuickAddTitle("");
													setQuickAddOrg("");
													setQuickAddDates("");
													setQuickAddDescription("");
													setQuickAddSectionModalOpen(true);
												}}
												className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
											>
												<Plus className="size-3.5" />
												<span>Add</span>
											</button>
										</div>

										{/* Work Entry Cards */}
										<div className="space-y-4">
											{outlineEntries.filter((e) => e.category === "work").map((entry) => {
												const points = entry.points || [];
												return (
													<div
														key={entry.id}
														className="rounded-2xl border border-emerald-500/20 bg-[#07110c] p-6 space-y-5 shadow-lg relative"
													>
														<div className="flex items-start justify-between gap-4">
															<div>
																<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block mb-1">
																	WORK EXPERIENCE
																</span>
																<h4 className="text-lg font-bold text-white tracking-tight">
																	{entry.title}
																</h4>
																{(entry.organization || entry.dates) && (
																	<p className="text-xs text-slate-400 mt-0.5">
																		{[entry.organization, entry.dates].filter(Boolean).join(" · ")}
																	</p>
																)}
															</div>

															<div className="flex items-center gap-2">
																<span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
																	Finished for now
																</span>
																<button
																	type="button"
																	onClick={() => {
																		setInterviewActiveEntryId(entry.id);
																		setStoriesViewMode("interview");
																	}}
																	className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
																	title="Edit experience"
																>
																	<Edit3 className="size-4" />
																</button>
															</div>
														</div>

														{/* Generated bullets with Edit annotations matching user's exact design */}
														<div className="space-y-4 pt-1">
															{points.length > 0 ? (
																points.map((pt, pIdx) => (
																	<div key={pIdx} className="space-y-1.5 pb-3 border-b border-slate-800/60 last:border-0 last:pb-0">
																		<p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
																			{pt}
																		</p>
																		<div className="flex items-center gap-2 text-[11px]">
																			<button
																				type="button"
																				onClick={() => {
																					setEditingPointKey(`${entry.id}_${pIdx}`);
																					setEditingPointText(pt);
																					setShowFinalSummaryModal(true);
																				}}
																				className="text-slate-400 hover:text-white font-medium cursor-pointer"
																			>
																				Edit
																			</button>
																			<span className="text-slate-400">
																				{pIdx === 0 && "Feedback or usage once testing is done"}
																				{pIdx === 1 && "Whether accuracy issues were fixed or improved"}
																				{pIdx >= 2 && "Exact tools or outcome (transcription was unclear)"}
																			</span>
																		</div>
																	</div>
																))
															) : (
																<div className="space-y-1">
																	<p className="text-xs text-slate-400 italic">
																		{entry.description || "Talk with Zoe or write directly to draft resume points."}
																	</p>
																</div>
															)}
														</div>

														{/* Card Footer: Bullets count and actions */}
														<div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
															<span className="text-[11px] font-mono text-slate-400">
																BULLETS {points.length} of up to 5
															</span>

															<div className="flex items-center gap-2">
																<button
																	type="button"
																	onClick={() => {
																		setInterviewActiveEntryId(entry.id);
																		setStoriesViewMode("interview");
																	}}
																	className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
																>
																	Reopen entry
																</button>

																<button
																	type="button"
																	onClick={() => {
																		setInterviewActiveEntryId(entry.id);
																		setStoriesViewMode("interview");
																	}}
																	className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs transition-colors cursor-pointer"
																>
																	<Mic className="size-3.5" />
																	<span>Add another story</span>
																</button>

																<button
																	type="button"
																	onClick={() => {
																		setShowFinalSummaryModal(true);
																	}}
																	className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
																>
																	Write directly
																</button>
															</div>
														</div>
													</div>
												);
											})}

											{outlineEntries.filter((e) => e.category === "work").length === 0 && (
												<div className="p-5 rounded-2xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
													No work experiences added yet. Click "+ Add" above to add your employment.
												</div>
											)}
										</div>
									</div>

									{/* SECTION 2: Projects */}
									<div className="space-y-3.5">
										<div className="flex items-center justify-between pb-1">
											<div className="flex items-center gap-2.5">
												<h3 className="text-base sm:text-lg font-bold text-white">Projects</h3>
												<span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
													{outlineEntries.filter((e) => e.category === "projects").length}
												</span>
											</div>

											<button
												type="button"
												onClick={() => {
													setQuickAddCategory("projects");
													setQuickAddTitle("");
													setQuickAddOrg("");
													setQuickAddDates("");
													setQuickAddDescription("");
													setQuickAddSectionModalOpen(true);
												}}
												className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
											>
												<Plus className="size-3.5" />
												<span>Add</span>
											</button>
										</div>

										{outlineEntries.filter((e) => e.category === "projects").length > 0 ? (
											<div className="space-y-4">
												{outlineEntries.filter((e) => e.category === "projects").map((entry) => {
													const points = entry.points || [];
													return (
														<div
															key={entry.id}
															className="rounded-2xl border border-emerald-500/20 bg-[#07110c] p-6 space-y-4 shadow-lg"
														>
															<div className="flex items-start justify-between gap-4">
																<div>
																	<span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block mb-1">
																		PROJECT
																	</span>
																	<h4 className="text-lg font-bold text-white tracking-tight">
																		{entry.title}
																	</h4>
																	<p className="text-xs text-slate-400 mt-0.5">
																		{entry.organization || "Independent Project"} {entry.dates ? `· ${entry.dates}` : ""}
																	</p>
																</div>

																<div className="flex items-center gap-2">
																	<button
																		type="button"
																		onClick={() => {
																			setInterviewActiveEntryId(entry.id);
																			setStoriesViewMode("interview");
																		}}
																		className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
																		title="Edit project"
																	>
																		<Edit3 className="size-4" />
																	</button>
																</div>
															</div>

															{/* Generated bullets with Edit annotations */}
															<div className="space-y-4 pt-1">
																{points.length > 0 ? (
																	points.map((pt, pIdx) => (
																		<div key={pIdx} className="space-y-1.5 pb-3 border-b border-slate-800/60 last:border-0 last:pb-0">
																			<p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
																				{pt}
																			</p>
																			<div className="flex items-center gap-2 text-[11px]">
																				<button
																					type="button"
																					onClick={() => {
																						setEditingPointKey(`${entry.id}_${pIdx}`);
																						setEditingPointText(pt);
																						setShowFinalSummaryModal(true);
																					}}
																					className="text-slate-400 hover:text-white font-medium cursor-pointer"
																				>
																					Edit
																				</button>
																				<span className="text-slate-400">
																					{pIdx === 0 && "Key technical contribution and outcome"}
																					{pIdx === 1 && "Feedback or usage once testing is done"}
																					{pIdx >= 2 && "Exact tools or outcome"}
																				</span>
																			</div>
																		</div>
																	))
																) : (
																	<div className="space-y-1">
																		<p className="text-xs text-slate-400 italic">
																			{entry.description || "A class project, personal project, or something you built."}
																		</p>
																	</div>
																)}
															</div>

															<div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
																<span className="text-[11px] font-mono text-slate-400">
																	BULLETS {points.length} of up to 3
																</span>
																<div className="flex items-center gap-2">
																	<button
																		type="button"
																		onClick={() => {
																			setInterviewActiveEntryId(entry.id);
																			setStoriesViewMode("interview");
																		}}
																		className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
																	>
																		Reopen entry
																	</button>
																	<button
																		type="button"
																		onClick={() => {
																			setInterviewActiveEntryId(entry.id);
																			setStoriesViewMode("interview");
																		}}
																		className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs cursor-pointer"
																	>
																		<Mic className="size-3.5" />
																		<span>Add another story</span>
																	</button>
																</div>
															</div>
														</div>
													);
												})}
											</div>
										) : (
											<div className="p-4 rounded-xl border border-dashed border-slate-800 text-xs text-slate-400">
												A class project, personal project, or something you built.
											</div>
										)}
									</div>

									{/* SECTION 3: Volunteering & activities */}
									<div className="space-y-3.5">
										<div className="flex items-center justify-between pb-1">
											<div className="flex items-center gap-2.5">
												<h3 className="text-base sm:text-lg font-bold text-white">Volunteering & activities</h3>
												<span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
													{outlineEntries.filter((e) => e.category === "volunteer").length}
												</span>
											</div>

											<button
												type="button"
												onClick={() => {
													setQuickAddCategory("volunteer");
													setQuickAddTitle("");
													setQuickAddOrg("");
													setQuickAddDates("");
													setQuickAddDescription("");
													setQuickAddSectionModalOpen(true);
												}}
												className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
											>
												<Plus className="size-3.5" />
												<span>Add</span>
											</button>
										</div>

										{outlineEntries.filter((e) => e.category === "volunteer").length > 0 ? (
											<div className="space-y-4">
												{outlineEntries.filter((e) => e.category === "volunteer").map((entry) => {
													const points = entry.points || [];
													return (
														<div
															key={entry.id}
															className="rounded-2xl border border-slate-800 bg-[#070e19] p-6 space-y-4 shadow-lg relative"
														>
															<div className="flex items-start justify-between gap-4">
																<div>
																	<span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold block mb-1">
																		ACTIVITY
																	</span>
																	<h4 className="text-lg font-bold text-white tracking-tight">
																		{entry.title}
																	</h4>
																	{(entry.organization || entry.dates) && (
																		<p className="text-xs text-slate-400 mt-0.5">
																			{[entry.organization, entry.dates].filter(Boolean).join(" · ")}
																		</p>
																	)}
																</div>

																<div className="flex items-center gap-2">
																	<span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
																		Ready to explore
																	</span>
																	<button
																		onClick={() => {
																			setInterviewActiveEntryId(entry.id);
																			setStoriesViewMode("interview");
																		}}
																		className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
																		title="Edit activity"
																	>
																		<Edit3 className="size-4" />
																	</button>
																</div>
															</div>

															{/* Generated bullets with Edit annotations matching exact format */}
															<div className="space-y-4 pt-1">
																{points.length > 0 ? (
																	points.map((pt, pIdx) => (
																		<div key={pIdx} className="space-y-1.5 pb-3 border-b border-slate-800/60 last:border-0 last:pb-0">
																			<p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
																				{pt}
																			</p>
																			<div className="flex items-center gap-2 text-[11px]">
																				<button
																					type="button"
																					onClick={() => {
																						setEditingPointKey(`${entry.id}_${pIdx}`);
																						setEditingPointText(pt);
																						setShowFinalSummaryModal(true);
																					}}
																					className="text-slate-400 hover:text-white font-medium cursor-pointer"
																				>
																					Edit
																				</button>
																				<span className="text-slate-400">
																					{pIdx === 0 && "Key contribution and community outcome"}
																					{pIdx === 1 && "Feedback or participant growth"}
																					{pIdx >= 2 && "Exact tools or outcome"}
																				</span>
																			</div>
																		</div>
																	))
																) : (
																	<p className="text-xs text-slate-400 italic">
																		{entry.description || "Mentoring, volunteering, leadership, or community activities."}
																	</p>
																)}
															</div>

															<div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
																<span className="text-[11px] font-mono text-slate-400">
																	BULLETS {points.length} of up to 3
																</span>
																<div className="flex items-center gap-2">
																	<button
																		type="button"
																		onClick={() => {
																			setInterviewActiveEntryId(entry.id);
																			setStoriesViewMode("interview");
																		}}
																		className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
																	>
																		Reopen entry
																	</button>
																	<button
																		type="button"
																		onClick={() => {
																			setInterviewActiveEntryId(entry.id);
																			setStoriesViewMode("interview");
																		}}
																		className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs cursor-pointer"
																	>
																		<Mic className="size-3.5" />
																		<span>Add another story</span>
																	</button>
																</div>
															</div>
														</div>
													);
												})}
											</div>
										) : (
											<div className="p-4 rounded-xl border border-dashed border-slate-800 text-xs text-slate-400">
												Mentoring, volunteering, leadership, or community activities.
											</div>
										)}
									</div>

									{/* SECTION 4: Education */}
									<div className="space-y-3.5">
										<div className="flex items-center justify-between pb-1">
											<div className="flex items-center gap-2.5">
												<h3 className="text-base sm:text-lg font-bold text-white">Education</h3>
												<span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
													{outlineEntries.filter((e) => e.category === "education").length}
												</span>
											</div>

											<button
												type="button"
												onClick={() => {
													setQuickAddCategory("education");
													setQuickAddSectionModalOpen(true);
												}}
												className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
											>
												<Plus className="size-3.5" />
												<span>Add</span>
											</button>
										</div>

										{outlineEntries.filter((e) => e.category === "education").length > 0 ? (
											<div className="space-y-4">
												{outlineEntries.filter((e) => e.category === "education").map((edu) => {
													const points = edu.points || [];
													return (
														<div
															key={edu.id}
															className="rounded-2xl border border-slate-800 bg-[#070e19] p-6 space-y-4 shadow-lg relative"
														>
															<div className="flex items-start justify-between gap-4">
																<div>
																	<span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold block mb-1">
																		EDUCATION
																	</span>
																	<h4 className="text-lg font-bold text-white tracking-tight">
																		{edu.title}
																	</h4>
																	<p className="text-xs text-slate-400 mt-0.5">
																		{edu.organization || "University / College"} {edu.dates ? `· ${edu.dates}` : ""}
																	</p>
																</div>

																<div className="flex items-center gap-2">
																	<button
																		type="button"
																		onClick={() => {
																			setOutlineEntries((prev) => prev.filter((e) => e.id !== edu.id));
																			toast.success("Education entry removed");
																		}}
																		className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
																		title="Remove education"
																	>
																		<Trash2 className="size-4" />
																	</button>
																</div>
															</div>

															{/* Generated bullets with Edit annotations */}
															<div className="space-y-4 pt-1">
																{points.length > 0 ? (
																	points.map((pt, pIdx) => (
																		<div key={pIdx} className="space-y-1.5 pb-3 border-b border-slate-800/60 last:border-0 last:pb-0">
																			<p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
																				{pt}
																			</p>
																			<div className="flex items-center gap-2 text-[11px]">
																				<button
																					type="button"
																					onClick={() => {
																						setEditingPointKey(`${edu.id}_${pIdx}`);
																						setEditingPointText(pt);
																						setShowFinalSummaryModal(true);
																					}}
																					className="text-slate-400 hover:text-white font-medium cursor-pointer"
																				>
																					Edit
																				</button>
																				<span className="text-slate-400">
																					{pIdx === 0 && "Core coursework, honors, or capstone"}
																					{pIdx >= 1 && "Academic achievement or awards"}
																				</span>
																			</div>
																		</div>
																	))
																) : (
																	<p className="text-xs text-slate-400 italic">
																		{edu.description || "Academic highlights, major projects, certifications, or notable awards."}
																	</p>
																)}
															</div>

															<div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
																<span className="text-[11px] font-mono text-slate-400">
																	BULLETS {points.length} of up to 3
																</span>
																<div className="flex items-center gap-2">
																	<button
																		type="button"
																		onClick={() => {
																			setInterviewActiveEntryId(edu.id);
																			setStoriesViewMode("interview");
																		}}
																		className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs cursor-pointer"
																	>
																		<Mic className="size-3.5" />
																		<span>Add a story</span>
																	</button>
																</div>
															</div>
														</div>
													);
												})}
											</div>
										) : (
											<div className="p-4 rounded-xl border border-dashed border-slate-800 text-xs text-slate-400">
												Qualifications, training, coursework, and learning achievements. Stories are optional.
											</div>
										)}
									</div>

									{/* Bottom Navigation Buttons matching screenshot 3 */}
									<div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
										<button
											type="button"
											onClick={() => setActiveTab("plan")}
											className="text-xs text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer"
										>
											View my plan
										</button>

										<button
											type="button"
											onClick={() => setActiveTab("details")}
											className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
										>
											<span>Continue to details</span>
											<ArrowRight className="size-3.5" />
										</button>
									</div>
								</div>
							)}
						</div>
					)}

					{/* TAB 3: DETAILS EDIT (Matching exact layout from user screenshot) */}
					{activeTab === "details" && (
						<div className="space-y-6">
							{/* Supporting Details Header */}
							<div>
								<div className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 mb-1.5">
									SUPPORTING DETAILS
								</div>
								<h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
									Make the draft yours.
								</h1>
								<p className="text-sm text-slate-400">
									Add exact details and confirm what belongs in your resume.
								</p>
							</div>

							{/* Sub-tab pills: Contact, Skills, Summary */}
							<div className="flex items-center justify-between gap-2 pt-1">
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => setDetailsSubTab("contact")}
										className={cn(
											"px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
											detailsSubTab === "contact"
												? "border border-emerald-500/80 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-950"
												: "border border-slate-800 bg-[#070e19] text-slate-400 hover:text-white hover:border-slate-700"
										)}
									>
										Contact
									</button>
									<button
										type="button"
										onClick={() => setDetailsSubTab("skills")}
										className={cn(
											"px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
											detailsSubTab === "skills"
												? "border border-emerald-500/80 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-950"
												: "border border-slate-800 bg-[#070e19] text-slate-400 hover:text-white hover:border-slate-700"
										)}
									>
										Skills
									</button>
									<button
										type="button"
										onClick={() => setDetailsSubTab("summary")}
										className={cn(
											"px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
											detailsSubTab === "summary"
												? "border border-emerald-500/80 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-950"
												: "border border-slate-800 bg-[#070e19] text-slate-400 hover:text-white hover:border-slate-700"
										)}
									>
										Summary
									</button>
								</div>

								<button
									type="button"
									onClick={() => setShowTemplateModal(true)}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#070e19] hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
								>
									<Palette className="size-3.5 text-emerald-400" />
									<span>Change Template</span>
								</button>
							</div>

							{/* Sub-tab 1: Contact & professional links card (Exact replica of screenshot) */}
							{detailsSubTab === "contact" && (
								<div className="rounded-2xl border border-slate-800/80 bg-[#070e19] p-6 sm:p-7 space-y-6">
									<div className="space-y-1">
										<h2 className="text-base sm:text-lg font-bold text-white">
											Contact & professional links
										</h2>
										<p className="text-xs text-slate-400">
											Typing is best for names, addresses, and exact URLs.
										</p>
									</div>

									{/* 2-column input fields */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
										{/* Full name */}
										<div className="space-y-1.5">
											<label className="block text-xs font-medium text-slate-300">
												Full name
											</label>
											<input
												type="text"
												value={fullName}
												onChange={(e) => {
													// Only allow characters (letters), spaces, hyphens, apostrophes, and dots
													const filtered = e.target.value.replace(/[^\p{L}\s'.-]/gu, "");
													setFullName(filtered);
												}}
												placeholder="Your name"
												className={`w-full rounded-xl border ${fullName && getNameValidationError(fullName) ? "border-rose-500 focus:border-rose-500" : "border-slate-800/90 focus:border-emerald-500"} bg-[#040810] px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
											/>
											{fullName && getNameValidationError(fullName) && (
												<p className="text-xs text-rose-400 mt-1">{getNameValidationError(fullName)}</p>
											)}
										</div>

										{/* Professional headline Optional */}
										<div className="space-y-1.5">
											<label className="block text-xs font-medium text-slate-300">
												Professional headline <span className="text-slate-500 text-[11px] font-normal">· Optional</span>
											</label>
											<input
												type="text"
												value={targetRole}
												onChange={(e) => setTargetRole(sanitizeToCharactersOnly(e.target.value, true))}
												placeholder="Frontend Developer"
												className="w-full rounded-xl border border-slate-800/90 bg-[#040810] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
											/>
										</div>

										{/* Email */}
										<div className="space-y-1.5">
											<label className="block text-xs font-medium text-slate-300">
												Email <span className="text-emerald-400 font-bold">*</span>
											</label>
											<input
												type="email"
												value={contactEmail}
												onChange={(e) => setContactEmail(e.target.value)}
												placeholder="you@example.com"
												className={`w-full rounded-xl border ${contactEmail && getEmailValidationError(contactEmail) ? "border-rose-500 focus:border-rose-500" : "border-slate-800/90 focus:border-emerald-500"} bg-[#040810] px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
											/>
											{contactEmail && getEmailValidationError(contactEmail) && (
												<p className="text-xs text-rose-400 mt-1">{getEmailValidationError(contactEmail)}</p>
											)}
										</div>

										{/* Phone Optional */}
										<div className="space-y-1.5">
											<label className="block text-xs font-medium text-slate-300">
												Phone <span className="text-slate-500 text-[11px] font-normal">· Optional</span>
											</label>
											<input
												type="tel"
												value={contactPhone}
												onChange={(e) => setContactPhone(e.target.value)}
												placeholder="e.g. +91 98765 43210"
												className={`w-full rounded-xl border ${contactPhone && getPhoneValidationError(contactPhone) ? "border-rose-500 focus:border-rose-500" : "border-slate-800/90 focus:border-emerald-500"} bg-[#040810] px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
											/>
											{contactPhone && getPhoneValidationError(contactPhone) && (
												<p className="text-xs text-rose-400 mt-1">{getPhoneValidationError(contactPhone)}</p>
											)}
										</div>

										{/* Location Optional */}
										<div className="space-y-1.5">
											<label className="block text-xs font-medium text-slate-300">
												Location <span className="text-slate-500 text-[11px] font-normal">· Optional</span>
											</label>
											<input
												type="text"
												value={contactLocation}
												onChange={(e) => setContactLocation(e.target.value)}
												placeholder="City, country"
												className="w-full rounded-xl border border-slate-800/90 bg-[#040810] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
											/>
										</div>

										{/* Professional links Optional */}
										<div className="space-y-1.5">
											<label className="block text-xs font-medium text-slate-300">
												Professional links <span className="text-slate-500 text-[11px] font-normal">· Optional</span>
											</label>
											<input
												type="text"
												value={contactLinks}
												onChange={(e) => setContactLinks(e.target.value)}
												placeholder="Portfolio, LinkedIn, GitHub"
												className="w-full rounded-xl border border-slate-800/90 bg-[#040810] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
											/>
										</div>
									</div>

									{/* Primary Action Button (Light Lime/Emerald rounded pill button as in screenshot) */}
									<div className="pt-2">
										<button
											type="button"
											onClick={() => {
												if (contactEmail && !isValidEmail(contactEmail)) {
													toast.error("Please enter a valid email address.");
													return;
												}
												if (contactPhone && !isValidOptionalPhone(contactPhone)) {
													toast.error("Please enter a valid phone number.");
													return;
												}
												handleSaveProgress();
												toast.success("Contact details saved!");
											}}
											className="px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs tracking-tight shadow-md transition-all cursor-pointer"
										>
											Save details
										</button>
									</div>
								</div>
							)}

							{/* Sub-tab 2: Skills */}
							{detailsSubTab === "skills" && (
								<div className="rounded-2xl border border-slate-800/80 bg-[#070e19] p-6 sm:p-7 space-y-6">
									<div className="space-y-1">
										<h2 className="text-base sm:text-lg font-bold text-white">
											Technical & Professional Skills
										</h2>
										<p className="text-xs text-slate-400">
											Highlight the core technologies, tools, and methodologies you use.
										</p>
									</div>

									{/* Skills Pills */}
									<div className="flex flex-wrap gap-2 pt-1">
										{skillsList.map((skill) => (
											<span
												key={skill}
												className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-emerald-300 font-medium"
											>
												<span>{skill}</span>
												<button
													type="button"
													onClick={() => setSkillsList((prev) => prev.filter((s) => s !== skill))}
													className="text-slate-500 hover:text-rose-400 transition-colors p-0.5"
													title={`Remove ${skill}`}
												>
													<X className="size-3" />
												</button>
											</span>
										))}
									</div>

									{/* Add new skill inline input */}
									<div className="flex items-center gap-3 pt-2 max-w-md">
										<input
											type="text"
											value={newSkillInput}
											onChange={(e) => setNewSkillInput(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter" && newSkillInput.trim()) {
													e.preventDefault();
													if (!skillsList.includes(newSkillInput.trim())) {
														setSkillsList((prev) => [...prev, newSkillInput.trim()]);
													}
													setNewSkillInput("");
												}
											}}
											placeholder="Add a skill (e.g. Next.js, Redux, Docker)"
											className="flex-1 rounded-xl border border-slate-800/90 bg-[#040810] px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
										/>
										<button
											type="button"
											onClick={() => {
												if (newSkillInput.trim()) {
													if (!skillsList.includes(newSkillInput.trim())) {
														setSkillsList((prev) => [...prev, newSkillInput.trim()]);
													}
													setNewSkillInput("");
												}
											}}
											className="px-4 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs cursor-pointer"
										>
											Add
										</button>
									</div>

									{/* Save button */}
									<div className="pt-2">
										<button
											type="button"
											onClick={() => {
												handleSaveProgress();
												toast.success("Skills saved!");
											}}
											className="px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs tracking-tight shadow-md transition-all cursor-pointer"
										>
											Save details
										</button>
									</div>
								</div>
							)}

							{/* Sub-tab 3: Summary */}
							{detailsSubTab === "summary" && (
								<div className="rounded-2xl border border-slate-800/80 bg-[#070e19] p-6 sm:p-7 space-y-6">
									<div className="space-y-1">
										<h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
											<Sparkles className="size-4 text-emerald-400" />
											<span>Professional Summary</span>
										</h2>
										<p className="text-xs text-slate-400">
											Zoe automatically generates this summary from your verified experiences. Edit it freely anytime.
										</p>
									</div>

									<div className="space-y-3">
										<textarea
											rows={5}
											value={professionalSummary}
											onChange={(e) => setProfessionalSummary(e.target.value)}
											placeholder="A brief 2–3 sentence overview highlighting your core strengths and domain experience..."
											className="w-full rounded-xl border border-slate-800/90 bg-[#040810] p-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
										/>
										<div className="flex items-center justify-between">
											<button
												type="button"
												onClick={() => {
													// Trigger re-generation
													const generated = generateProfessionalSummary(outlineEntries, targetRole);
													setProfessionalSummary(generated);
													toast.success("Summary regenerated from experiences!");
												}}
												className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
											>
												<Sparkles className="size-3.5" />
												<span>Regenerate with Zoe</span>
											</button>
											<button
												type="button"
												onClick={() => {
													handleSaveProgress();
													toast.success("Professional summary saved!");
												}}
												className="px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs tracking-tight shadow-md transition-all cursor-pointer"
											>
												Save details
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Education & Qualifications Section (Retained underneath for complete profile editing) */}

						</div>
					)}

					{/* TAB 4: REVIEW & EXPORT */}
					{activeTab === "export" && (
						<div className="space-y-6">
							<div>
								<div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
									REVIEW & EXPORT
								</div>
								<h2 className="text-2xl font-bold text-white mb-1">Finalize and Download</h2>
								<p className="text-sm text-slate-400">Review your full prioritized resume, choose styling, and export as PDF or JSON.</p>
							</div>

							{/* Full Resume Complete Review Card */}
							<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-6 space-y-5">
								<div className="flex items-center justify-between border-b border-slate-800 pb-4">
									<div>
										<h3 className="text-base font-bold text-white">Full Resume Overview</h3>
										<p className="text-xs text-slate-400 mt-0.5">
											Arranged in priority order based on strength and target role relevance.
										</p>
									</div>
									<button
										type="button"
										onClick={() => setShowFinalSummaryModal(true)}
										className="px-3.5 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5"
									>
										<Edit3 className="size-3.5" />
										<span>Edit All Bullet Points</span>
									</button>
								</div>

								{/* Professional Summary Section at the End / Review */}
								<div className="p-4 rounded-xl border border-emerald-500/30 bg-[#071616] space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Sparkles className="size-4 text-emerald-400" />
											<span className="text-xs font-bold text-white uppercase tracking-wider">
												Professional Summary (Synthesized from All Resume Data)
											</span>
										</div>
										<button
											type="button"
											onClick={() => {
												const freshSummary = generateProfessionalSummary(outlineEntries, targetRole);
												setProfessionalSummary(freshSummary);
												handleSaveProgress();
												toast.success("Summary generated from all resume details!");
											}}
											className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white font-semibold cursor-pointer"
										>
											<Sparkles className="size-3" />
											<span>Regenerate Summary</span>
										</button>
									</div>
									<p className="text-xs text-slate-200 leading-relaxed italic">
										{professionalSummary
											? `"${professionalSummary}"`
											: "Summary will be generated once you have detailed your stories & experiences."}
									</p>
								</div>

								{/* Summary of Prioritized Experiences */}
								<div className="space-y-4">
									{outlineEntries.map((entry, idx) => (
										<div key={entry.id} className="p-4 rounded-xl border border-slate-800/80 bg-[#070e1a] space-y-2">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase border border-emerald-500/30">
														Priority #{idx + 1} · {entry.category}
													</span>
													<span className="text-sm font-bold text-white">{entry.title}</span>
												</div>
												<span className="text-xs text-slate-400">
													{entry.organization ? `${entry.organization} · ` : ""}{entry.dates || "Recent"}
												</span>
											</div>

											{entry.points && entry.points.length > 0 ? (
												<ul className="space-y-1.5 pt-1 pl-1">
													{entry.points.map((pt, pIdx) => (
														<li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
															<span className="text-emerald-400 font-bold">•</span>
															<span>{pt}</span>
														</li>
													))}
												</ul>
											) : (
												<p className="text-xs text-slate-400 italic">
													{entry.description || "No specific bullet points generated yet."}
												</p>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Template Choice */}
							<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-5 space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-xs font-bold text-slate-300">Choose Template</span>
									<button
										type="button"
										onClick={() => setShowTemplateModal(true)}
										className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
									>
										Browse all 13 templates →
									</button>
								</div>
								<div className="flex flex-wrap gap-2">
									{[
										"Azurill", "Bronzor", "Chikorita", "Ditgar", "Ditto", "Gengar",
										"Glalie", "Kakuna", "Lapras", "Leafish", "Onyx", "Pikachu", "Rhyhorn"
									].map((tmpl) => (
										<button
											key={tmpl}
											type="button"
											onClick={() => handleSelectTemplate(tmpl)}
											className={cn(
												"px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border",
												selectedTemplate.toLowerCase() === tmpl.toLowerCase()
													? "bg-emerald-500 text-slate-950 border-emerald-500 font-bold"
													: "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
											)}
										>
											{tmpl}
										</button>
									))}
								</div>
							</div>

							{/* Photo upload */}
							<div className="rounded-2xl border border-slate-800 bg-[#09101d] p-5 space-y-3">
								<span className="text-xs font-bold text-slate-300">Profile Photo</span>
								<div className="flex items-center gap-4">
									<input
										type="file"
										accept="image/*"
										onChange={handlePhotoUpload}
										className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
									/>
								</div>
							</div>

							{/* Job-Specific Tailoring Banner / Option (Requirement 17) */}
							<div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-[#091b24] to-[#0d2830] p-6 space-y-4">
								<div className="flex items-start justify-between">
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<Target className="size-4 text-emerald-400" />
											<span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
												JOB-SPECIFIC TAILORING
											</span>
										</div>
										<h3 className="text-lg font-bold text-white">
											Tailor this resume for a specific job opening
										</h3>
										<p className="text-xs text-slate-300 leading-relaxed max-w-xl">
											Connect this completed resume to a specific job description. Zoe will match required skills, analyze keyword gaps, and shape a targeted version for the opportunity.
										</p>
									</div>
									<span className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
										Recommended Next
									</span>
								</div>

								<div className="flex items-center gap-3 pt-1">
									<button
										type="button"
										onClick={() => {
											// Save current state and redirect to job match flow
											if (createdResumeId) {
												navigate({
													to: "/dashboard/resumes/match" as any,
													search: { resumeId: createdResumeId } as any,
												});
											} else {
												handleSeeMyPlan();
												navigate({ to: "/dashboard/resumes/match" as any });
											}
											toast.success("Opening Job Match & Tailoring!");
										}}
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
									>
										<Sparkles className="size-4" />
										<span>Tailor for a Specific Job</span>
										<ArrowRight className="size-4" />
									</button>
								</div>
							</div>

							{/* Export Actions */}
							<div className="p-5 rounded-2xl border border-emerald-500/30 bg-[#081820]/90 flex flex-wrap items-center justify-between gap-4">
								<div className="space-y-0.5">
									<h4 className="text-sm font-bold text-white">Download & Share</h4>
									<p className="text-xs text-slate-400">Export high-resolution PDF print or raw JSON data.</p>
								</div>

								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={() => {
											const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(outlineEntries, null, 2));
											const downloadAnchor = document.createElement("a");
											downloadAnchor.setAttribute("href", dataStr);
											downloadAnchor.setAttribute("download", `${fullName || "resume"}_data.json`);
											document.body.appendChild(downloadAnchor);
											downloadAnchor.click();
											downloadAnchor.remove();
											toast.success("Resume JSON exported!");
										}}
										className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all cursor-pointer"
									>
										<FileText className="size-4 text-emerald-400" />
										<span>Export JSON</span>
									</button>

									<button
										type="button"
										onClick={async () => {
											const toastId = toast.loading("Preparing your resume PDF...");
											try {
												// 1. Compile up-to-date resume data from current state
												const workList = outlineEntries.filter((e) => e.category === "work");
												const projList = outlineEntries.filter((e) => e.category === "projects");
												const eduList = outlineEntries.filter((e) => e.category === "education");
												const volList = outlineEntries.filter((e) => e.category === "volunteer");

												const updatedData: ResumeData = {
													...defaultResumeData,
													basics: {
														...defaultResumeData.basics,
														name: fullName || "",
														headline: targetRole || "",
														email: contactEmail || "",
														phone: contactPhone || "",
														location: contactLocation || "",
														website: { url: contactLinks || "", label: "" },
													},
													summary: {
														...defaultResumeData.summary,
														hidden: !professionalSummary,
														content: professionalSummary ? `<p>${professionalSummary}</p>` : "",
													},
													sections: {
														...defaultResumeData.sections,
														experience: {
															title: "Experience",
															columns: 1,
															hidden: workList.length === 0,
															items: workList.map((w) => ({
																id: w.id,
																hidden: false,
																company: w.organization || "",
																position: w.title,
																location: "",
																period: w.dates || "",
																website: { url: "", label: "" },
																description: w.points && w.points.length > 0
																	? w.points.map((pt) => `<p>• ${pt}</p>`).join("")
																	: (w.description ? `<p>${w.description}</p>` : ""),
															})),
														},
														projects: {
															title: "Projects",
															columns: 1,
															hidden: projList.length === 0,
															items: projList.map((p) => ({
																id: p.id,
																hidden: false,
																name: p.title,
																role: p.organization || "",
																period: p.dates || "",
																website: { url: "", label: "" },
																description: p.description ? `<p>${p.description}</p>` : "",
															})),
														},
														education: {
															title: "Education",
															columns: 1,
															hidden: eduList.length === 0,
															items: eduList.map((e) => ({
																id: e.id,
																hidden: false,
																school: e.organization || "",
																degree: e.title || "",
																area: "",
																grade: "",
																location: "",
																period: e.dates || "",
																website: { url: "", label: "" },
																description: e.description ? `<p>${e.description}</p>` : "",
																currentlyStudyingHere: false,
															})),
														},
														skills: {
															title: "Skills",
															columns: 1,
															hidden: skillsList.length === 0,
															items: skillsList.map((skill, idx) => ({
																id: `skill_${idx}`,
																hidden: false,
																icon: "",
																name: skill,
																proficiency: "",
																description: "",
																level: 0,
																keywords: [],
															})),
														},
														volunteer: {
															title: "Volunteering & Activities",
															columns: 1,
															hidden: volList.length === 0,
															items: volList.map((v) => ({
																id: v.id,
																hidden: false,
																organization: v.organization || "",
																position: v.title || "",
																location: "",
																period: v.dates || "",
																website: { url: "", label: "" },
																description: v.description ? `<p>${v.description}</p>` : "",
															})),
														},
													},
													metadata: {
														...defaultResumeData.metadata,
														template: (selectedTemplate?.toLowerCase() || "onyx") as any,
														layout: {
															sidebarWidth: 30,
															pages: [
																{
																	fullWidth: ["bronzor", "kakuna", "lapras", "onyx", "rhyhorn"].includes((selectedTemplate || "onyx").toLowerCase()),
																	main: ["bronzor", "kakuna", "lapras", "onyx", "rhyhorn"].includes((selectedTemplate || "onyx").toLowerCase())
																		? ["summary", "experience", "education", "projects", "skills", "volunteer"]
																		: ["summary", "experience", "education", "projects"],
																	sidebar: ["bronzor", "kakuna", "lapras", "onyx", "rhyhorn"].includes((selectedTemplate || "onyx").toLowerCase())
																		? []
																		: ["profiles", "skills", "volunteer"],
																},
															],
														},
													},
												};

												// 2. Ensure resume exists in localResumeStore
												let targetResumeId = createdResumeId;
												if (targetResumeId) {
													localResumeStore.update(targetResumeId, {
														name: targetRole ? `${targetRole} Resume` : (fullName ? `${fullName}'s Resume` : "My Resume"),
														data: updatedData,
													});
												} else {
													const created = localResumeStore.create({
														name: targetRole ? `${targetRole} Resume` : (fullName ? `${fullName}'s Resume` : "My Resume"),
														data: updatedData,
													});
													targetResumeId = created.id;
													setCreatedResumeId(created.id);
												}

												// 3. Trigger clean resume PDF print
												// First try triggering print on the active window which is now protected with @media print isolation
												window.print();
												toast.success("Print dialog opened for your resume!");
											} catch (err) {
												console.error("PDF Export error:", err);
												toast.error("Failed to prepare PDF. Please try again.");
											} finally {
												toast.dismiss(toastId);
											}
										}}
										className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
									>
										<Download className="size-4" />
										<span>Download / Print PDF</span>
									</button>
								</div>
							</div>
						</div>
					)}
				</main>

				{/* Right Column: Live Resume Document Preview (matches screenshot) */}
				{!hideResumePreview && (
					<aside className="guided-story-preview-aside w-full lg:w-[460px] xl:w-[500px] border-t lg:border-t-0 lg:border-l border-slate-900 bg-[#070d14] p-6 shrink-0 flex flex-col justify-between overflow-y-auto relative">
						<div className="space-y-4 w-full">
							{/* Header row in screenshot: THE OUTPUT & Live draft badge */}
							<div className="flex items-center justify-between print:hidden">
								<div>
									<span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block">
										THE OUTPUT
									</span>
									<h3 className="text-base font-bold text-white mt-0.5">Your resume</h3>
								</div>

								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => setShowTemplateModal(true)}
										className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
										title="Choose template"
									>
										<Palette className="size-3 text-emerald-400" />
										<span>{selectedTemplate}</span>
									</button>

									<span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">
										Live draft
									</span>
								</div>
							</div>

							{/* Document Sheet Canvas with Dynamic Template Styles (Azurill, Bronzor, Chikorita, Gengar, Lapras, Onyx, Pikachu, Leafish, etc.) */}
							{(() => {
								const tmplKey = (selectedTemplate || "azurill").toLowerCase();
								const isLeftSidebar = ["azurill", "ditgar", "ditto"].includes(tmplKey);
								const isRightSidebar = ["chikorita", "leafish", "pikachu"].includes(tmplKey);
								const isBannerHeader = ["lapras", "glalie"].includes(tmplKey);
								const isHighContrast = ["gengar", "kakuna"].includes(tmplKey);
								const isMinimalist = ["bronzor", "onyx", "rhyhorn"].includes(tmplKey);

								// Template Accent Palette Configuration
								const palette = (() => {
									switch (tmplKey) {
										case "azurill":
											return {
												borderTop: "border-t-[6px] border-t-blue-600",
												primaryText: "text-blue-600",
												primaryBg: "bg-blue-600",
												badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
												sidebarBg: "bg-blue-50/50",
												sidebarBorder: "border-r border-blue-100",
												headerFont: "font-serif",
												sectionHeader: "text-blue-700 tracking-wider font-bold",
												bulletDot: "text-blue-500",
											};
										case "bronzor":
											return {
												borderTop: "border-t-[6px] border-t-slate-700",
												primaryText: "text-slate-800",
												primaryBg: "bg-slate-700",
												badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
												sidebarBg: "bg-slate-50/60",
												sidebarBorder: "border-slate-200",
												headerFont: "font-serif",
												sectionHeader: "text-slate-800 tracking-wider font-bold",
												bulletDot: "text-slate-600",
											};
										case "chikorita":
											return {
												borderTop: "border-t-[6px] border-t-emerald-600",
												primaryText: "text-emerald-700",
												primaryBg: "bg-emerald-600",
												badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
												sidebarBg: "bg-emerald-50/40",
												sidebarBorder: "border-l border-emerald-100",
												headerFont: "font-sans",
												sectionHeader: "text-emerald-700 tracking-wider font-bold",
												bulletDot: "text-emerald-600",
											};
										case "gengar":
											return {
												borderTop: "border-t-[6px] border-t-purple-700",
												primaryText: "text-purple-700",
												primaryBg: "bg-purple-700",
												badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
												sidebarBg: "bg-purple-50/50",
												sidebarBorder: "border-r border-purple-200",
												headerFont: "font-mono",
												sectionHeader: "text-purple-800 tracking-widest font-black",
												bulletDot: "text-purple-600",
											};
										case "lapras":
											return {
												borderTop: "border-t-[6px] border-t-indigo-800",
												primaryText: "text-indigo-800",
												primaryBg: "bg-indigo-900",
												badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
												sidebarBg: "bg-indigo-50/30",
												sidebarBorder: "border-indigo-100",
												headerFont: "font-serif",
												sectionHeader: "text-indigo-900 tracking-widest font-bold",
												bulletDot: "text-indigo-700",
											};
										case "onyx":
											return {
												borderTop: "border-t-[6px] border-t-rose-600",
												primaryText: "text-rose-700",
												primaryBg: "bg-rose-600",
												badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
												sidebarBg: "bg-stone-50",
												sidebarBorder: "border-stone-200",
												headerFont: "font-serif",
												sectionHeader: "text-rose-700 tracking-wider font-bold",
												bulletDot: "text-rose-600",
											};
										case "pikachu":
											return {
												borderTop: "border-t-[6px] border-t-amber-500",
												primaryText: "text-amber-700",
												primaryBg: "bg-amber-500",
												badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
												sidebarBg: "bg-amber-50/40",
												sidebarBorder: "border-l border-amber-200",
												headerFont: "font-sans",
												sectionHeader: "text-amber-700 tracking-wider font-bold",
												bulletDot: "text-amber-500",
											};
										case "leafish":
											return {
												borderTop: "border-t-[6px] border-t-lime-600",
												primaryText: "text-lime-700",
												primaryBg: "bg-lime-600",
												badgeBg: "bg-lime-50 text-lime-800 border-lime-200",
												sidebarBg: "bg-lime-50/30",
												sidebarBorder: "border-l border-lime-200",
												headerFont: "font-serif",
												sectionHeader: "text-lime-700 tracking-wider font-bold",
												bulletDot: "text-lime-600",
											};
										case "ditgar":
											return {
												borderTop: "border-t-[6px] border-t-sky-600",
												primaryText: "text-sky-700",
												primaryBg: "bg-sky-600",
												badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
												sidebarBg: "bg-sky-50/50",
												sidebarBorder: "border-r border-sky-200",
												headerFont: "font-sans",
												sectionHeader: "text-sky-700 tracking-wider font-bold",
												bulletDot: "text-sky-500",
											};
										case "ditto":
											return {
												borderTop: "border-t-[6px] border-t-pink-600",
												primaryText: "text-pink-700",
												primaryBg: "bg-pink-600",
												badgeBg: "bg-pink-50 text-pink-800 border-pink-200",
												sidebarBg: "bg-pink-50/40",
												sidebarBorder: "border-r border-pink-200",
												headerFont: "font-serif",
												sectionHeader: "text-pink-700 tracking-wider font-bold",
												bulletDot: "text-pink-500",
											};
										case "glalie":
											return {
												borderTop: "border-t-[6px] border-t-slate-600",
												primaryText: "text-slate-700",
												primaryBg: "bg-slate-800",
												badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
												sidebarBg: "bg-slate-50",
												sidebarBorder: "border-slate-200",
												headerFont: "font-sans",
												sectionHeader: "text-slate-700 tracking-wider font-bold",
												bulletDot: "text-slate-500",
											};
										case "kakuna":
											return {
												borderTop: "border-t-[6px] border-t-yellow-600",
												primaryText: "text-yellow-700",
												primaryBg: "bg-yellow-600",
												badgeBg: "bg-yellow-50 text-yellow-800 border-yellow-200",
												sidebarBg: "bg-yellow-50/40",
												sidebarBorder: "border-yellow-200",
												headerFont: "font-sans",
												sectionHeader: "text-yellow-700 tracking-wider font-bold",
												bulletDot: "text-yellow-600",
											};
										case "rhyhorn":
											return {
												borderTop: "border-t-[6px] border-t-cyan-700",
												primaryText: "text-cyan-800",
												primaryBg: "bg-cyan-800",
												badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
												sidebarBg: "bg-stone-50",
												sidebarBorder: "border-stone-200",
												headerFont: "font-serif",
												sectionHeader: "text-cyan-800 tracking-wider font-bold",
												bulletDot: "text-cyan-600",
											};
										default:
											return {
												borderTop: "border-t-[6px] border-t-blue-500",
												primaryText: "text-blue-600",
												primaryBg: "bg-blue-600",
												badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
												sidebarBg: "bg-slate-50",
												sidebarBorder: "border-slate-200",
												headerFont: "font-sans",
												sectionHeader: "text-slate-700 tracking-wider font-bold",
												bulletDot: "text-blue-500",
											};
									}
								})();

								// Shared Sub-renderers
								const renderExperienceBlock = () => {
									const works = outlineEntries.filter((e) => e.category === "work");
									if (works.length === 0) return null;
									return (
										<div className="space-y-2.5">
											<div className="flex items-center justify-between border-b border-slate-200 pb-1">
												<span className={cn("text-[10px] font-mono tracking-widest uppercase", palette.sectionHeader)}>
													EXPERIENCE
												</span>
											</div>
											{works.map((w) => (
												<div key={w.id} className="space-y-1">
													<div className="flex items-baseline justify-between gap-2">
														<div className="text-xs font-bold text-slate-950">
															{w.title}
														</div>
														{w.dates && (
															<div className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
																{w.dates}
															</div>
														)}
													</div>
													{w.organization && (
														<div className={cn("text-[11px] font-semibold", palette.primaryText)}>
															{w.organization}
														</div>
													)}
													{w.points && w.points.length > 0 && (
														<ul className="space-y-1 pt-0.5">
															{w.points.map((pt, pIdx) => (
																<li key={pIdx} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1.5">
																	<span className={cn("text-xs leading-none shrink-0", palette.bulletDot)}>•</span>
																	<span>{pt}</span>
																</li>
															))}
														</ul>
													)}
												</div>
											))}
										</div>
									);
								};

								const renderProjectsBlock = () => {
									const projs = outlineEntries.filter((e) => e.category === "projects" || e.category === "volunteer");
									if (projs.length === 0) return null;
									return (
										<div className="space-y-2.5">
											<div className="flex items-center justify-between border-b border-slate-200 pb-1">
												<span className={cn("text-[10px] font-mono tracking-widest uppercase", palette.sectionHeader)}>
													PROJECTS & ACTIVITIES
												</span>
											</div>
											{projs.map((p) => (
												<div key={p.id} className="space-y-1">
													<div className="flex items-baseline justify-between gap-2">
														<div className="text-xs font-bold text-slate-950">
															{p.title}
														</div>
														{p.dates && (
															<div className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
																{p.dates}
															</div>
														)}
													</div>
													{p.organization && (
														<div className="text-[10px] text-slate-500 font-medium">
															{p.organization}
														</div>
													)}
													{p.points && p.points.length > 0 && (
														<ul className="space-y-1 pt-0.5">
															{p.points.map((pt, pIdx) => (
																<li key={pIdx} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1.5">
																	<span className={cn("text-xs leading-none shrink-0", palette.bulletDot)}>•</span>
																	<span>{pt}</span>
																</li>
															))}
														</ul>
													)}
												</div>
											))}
										</div>
									);
								};

								const renderEducationBlock = () => {
									const edus = outlineEntries.filter((e) => e.category === "education");
									if (edus.length === 0) return null;
									return (
										<div className="space-y-2">
											<div className="flex items-center justify-between border-b border-slate-200 pb-1">
												<span className={cn("text-[10px] font-mono tracking-widest uppercase", palette.sectionHeader)}>
													EDUCATION
												</span>
											</div>
											<div className="space-y-2">
												{edus.map((edu) => (
													<div key={edu.id} className="space-y-0.5">
														<div className="text-xs font-bold text-slate-950">
															{edu.title}
														</div>
														{(edu.organization || edu.dates) && (
															<div className="text-[10px] text-slate-500 font-medium">
																{[edu.organization, edu.dates].filter(Boolean).join(" · ")}
															</div>
														)}
													</div>
												))}
											</div>
										</div>
									);
								};

								const renderSkillsBlock = () => {
									if (!skillsList || skillsList.length === 0) return null;
									return (
										<div className="space-y-2">
											<div className="flex items-center justify-between border-b border-slate-200 pb-1">
												<span className={cn("text-[10px] font-mono tracking-widest uppercase", palette.sectionHeader)}>
													SKILLS
												</span>
											</div>
											<div className="flex flex-wrap gap-1.5 pt-0.5">
												{skillsList.map((skill, sIdx) => (
													<span
														key={sIdx}
														className={cn("px-2 py-0.5 rounded text-[10px] font-medium border", palette.badgeBg)}
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									);
								};

								const renderContactItems = () => {
									if (!contactEmail && !contactPhone && !contactLocation && !contactLinks) {
										return null;
									}
									return (
										<div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-slate-600 font-medium pt-0.5">
											{contactEmail && <span>{contactEmail}</span>}
											{contactPhone && (
												<>
													{contactEmail && <span className="text-slate-300">·</span>}
													<span>{contactPhone}</span>
												</>
											)}
											{contactLocation && (
												<>
													{(contactEmail || contactPhone) && <span className="text-slate-300">·</span>}
													<span>{contactLocation}</span>
												</>
											)}
											{contactLinks && (
												<>
													{(contactEmail || contactPhone || contactLocation) && <span className="text-slate-300">·</span>}
													<span>{contactLinks}</span>
												</>
											)}
										</div>
									);
								};

								return (
									<div
										id="guided-story-printable-resume"
										className={cn(
											"rounded-xl border border-slate-300 bg-[#faf8f5] text-slate-900 shadow-2xl min-h-[560px] text-xs w-full relative transition-all overflow-hidden",
											palette.borderTop
										)}
									>
										{/* Next button circular floating pill (as seen in screenshot right edge) */}
										<button
											type="button"
											onClick={() => setActiveTab("stories")}
											className="absolute -right-3.5 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-slate-300 shadow-xl flex items-center justify-center text-slate-900 hover:scale-105 transition-transform cursor-pointer z-10 print:hidden"
											title="Next: Your stories"
										>
											<ArrowRight className="size-4" />
										</button>

										{/* 1. BANNER HEADER LAYOUT (Lapras / Glalie) */}
										{isBannerHeader && (
											<div className="space-y-4">
												<div className={cn("p-6 text-white", palette.primaryBg)}>
													<div className="flex items-start justify-between gap-4">
														<div className="space-y-1">
															{fullName && (
																<h2 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight", palette.headerFont)}>
																	{fullName}
																</h2>
															)}
															{targetRole && (
																<p className="text-xs font-semibold text-white/90">
																	{targetRole}
																</p>
															)}
															<div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-white/80 pt-1">
																{contactEmail && <span>{contactEmail}</span>}
																{contactPhone && (
																	<>
																		{contactEmail && <span className="text-white/40">·</span>}
																		<span>{contactPhone}</span>
																	</>
																)}
																{contactLocation && (
																	<>
																		{(contactEmail || contactPhone) && <span className="text-white/40">·</span>}
																		<span>{contactLocation}</span>
																	</>
																)}
																{contactLinks && (
																	<>
																		{(contactEmail || contactPhone || contactLocation) && <span className="text-white/40">·</span>}
																		<span>{contactLinks}</span>
																	</>
																)}
															</div>
														</div>
														{showPicture && pictureUrl && (
															<img
																src={pictureUrl}
																alt="Profile"
																className={cn(
																	"size-14 object-cover border-2 border-white/40 shrink-0",
																	pictureShape === "circle" ? "rounded-full" : pictureShape === "rounded" ? "rounded-xl" : "rounded-none"
																)}
															/>
														)}
													</div>
												</div>
												<div className="p-6 pt-0 space-y-4">
													{professionalSummary && (
														<p className="text-[11px] text-slate-700 leading-relaxed italic border-l-2 border-slate-300 pl-3">
															"{professionalSummary}"
														</p>
													)}
													{renderExperienceBlock()}
													{renderProjectsBlock()}
													{renderEducationBlock()}
													{renderSkillsBlock()}
												</div>
											</div>
										)}

										{/* 2. TWO-COLUMN LEFT SIDEBAR LAYOUT (Azurill / Ditgar / Ditto) */}
										{isLeftSidebar && (
											<div className="flex flex-col sm:flex-row min-h-[560px]">
												{/* Left Sidebar */}
												<div className={cn("sm:w-[36%] p-5 space-y-4", palette.sidebarBg, palette.sidebarBorder)}>
													{showPicture && pictureUrl && (
														<div className="flex justify-center pb-1">
															<img
																src={pictureUrl}
																alt="Profile"
																className={cn(
																	"size-16 object-cover border-2 border-slate-300 shadow-sm",
																	pictureShape === "circle" ? "rounded-full" : pictureShape === "rounded" ? "rounded-xl" : "rounded-none"
																)}
															/>
														</div>
													)}
													{(contactEmail || contactPhone || contactLocation || contactLinks) && (
														<div className="space-y-1">
															<span className={cn("text-[10px] font-mono tracking-widest uppercase block", palette.sectionHeader)}>
																CONTACT
															</span>
															<div className="space-y-1 text-[11px] text-slate-700">
																{contactEmail && <div className="break-all">{contactEmail}</div>}
																{contactPhone && <div>{contactPhone}</div>}
																{contactLocation && <div>{contactLocation}</div>}
																{contactLinks && <div className="break-all">{contactLinks}</div>}
															</div>
														</div>
													)}
													{renderSkillsBlock()}
													{renderEducationBlock()}
												</div>

												{/* Main Body */}
												<div className="sm:w-[64%] p-5 sm:p-6 space-y-4">
													{(fullName || targetRole || professionalSummary) && (
														<div className="space-y-1 pb-2 border-b border-slate-200">
															{fullName && (
																<h2 className={cn("text-2xl font-extrabold tracking-tight text-slate-950", palette.headerFont)}>
																	{fullName}
																</h2>
															)}
															{targetRole && (
																<p className={cn("text-xs font-semibold", palette.primaryText)}>
																	{targetRole}
																</p>
															)}
															{professionalSummary && (
																<p className="text-[11px] text-slate-700 pt-1.5 leading-relaxed">
																	{professionalSummary}
																</p>
															)}
														</div>
													)}
													{renderExperienceBlock()}
													{renderProjectsBlock()}
												</div>
											</div>
										)}

										{/* 3. TWO-COLUMN RIGHT SIDEBAR LAYOUT (Chikorita / Leafish / Pikachu) */}
										{isRightSidebar && (
											<div className="p-5 sm:p-6 space-y-4">
												{(fullName || targetRole || contactEmail || contactPhone || contactLocation || contactLinks || (showPicture && pictureUrl)) && (
													<div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-200">
														<div className="space-y-1">
															{fullName && (
																<h2 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950", palette.headerFont)}>
																	{fullName}
																</h2>
															)}
															{targetRole && (
																<p className={cn("text-xs font-bold", palette.primaryText)}>
																	{targetRole}
																</p>
															)}
															{renderContactItems()}
														</div>
														{showPicture && pictureUrl && (
															<img
																src={pictureUrl}
																alt="Profile"
																className={cn(
																	"size-14 object-cover border-2 border-slate-300 shadow-sm shrink-0",
																	pictureShape === "circle" ? "rounded-full" : pictureShape === "rounded" ? "rounded-xl" : "rounded-none"
																)}
															/>
														)}
													</div>
												)}

												{professionalSummary && (
													<p className="text-[11px] text-slate-700 leading-relaxed italic">
														{professionalSummary}
													</p>
												)}

												<div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
													<div className="sm:col-span-8 space-y-4">
														{renderExperienceBlock()}
														{renderProjectsBlock()}
													</div>
													<div className={cn("sm:col-span-4 p-4 rounded-lg space-y-4", palette.sidebarBg, palette.sidebarBorder)}>
														{renderSkillsBlock()}
														{renderEducationBlock()}
													</div>
												</div>
											</div>
										)}

										{/* 4. CLASSIC SINGLE COLUMN MINIMALIST (Bronzor / Onyx / Gengar / Rhyhorn / Kakuna) */}
										{(isMinimalist || isHighContrast) && (
											<div className="p-6 sm:p-7 space-y-5">
												{/* Header */}
												{(fullName || targetRole || (showPicture && pictureUrl) || professionalSummary || contactEmail || contactPhone || contactLocation || contactLinks) && (
													<div className={cn("space-y-1.5 pb-3 border-b-2", palette.sidebarBorder || "border-slate-300")}>
														<div className="flex items-start justify-between gap-4">
															<div className="space-y-1">
																{fullName && (
																	<h2 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950", palette.headerFont)}>
																		{fullName}
																	</h2>
																)}
																{targetRole && (
																	<p className={cn("text-xs font-bold", palette.primaryText)}>
																		{targetRole}
																	</p>
																)}
															</div>
															{showPicture && pictureUrl && (
																<img
																	src={pictureUrl}
																	alt="Profile"
																	className={cn(
																		"size-14 object-cover border border-slate-300 shadow-sm shrink-0",
																		pictureShape === "circle" ? "rounded-full" : pictureShape === "rounded" ? "rounded-xl" : "rounded-none"
																	)}
																/>
															)}
														</div>
														{renderContactItems()}
														{professionalSummary && (
															<p className="text-[11px] text-slate-700 pt-1 leading-relaxed border-t border-slate-100">
																{professionalSummary}
															</p>
														)}
													</div>
												)}

												{renderExperienceBlock()}
												{renderProjectsBlock()}
												{renderSkillsBlock()}
												{renderEducationBlock()}
											</div>
										)}
									</div>
								);
							})()}

							{/* Footer under live draft: Draft wording appears as you talk & Read full resume */}
							<div className="space-y-2 pt-1 text-xs print:hidden">
								<div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
									<span className="size-1.5 rounded-full bg-emerald-400" />
									<span>Draft wording appears as you talk. You choose what makes it into your resume.</span>
								</div>

								<button
									type="button"
									onClick={() => setActiveTab("export")}
									className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
								>
									<span>👁 Read full resume</span>
								</button>
							</div>

							{/* WHAT ZOE IS EXPLORING Section directly below the live resume preview */}
							{(() => {
								const activeEntry = outlineEntries.find((e) => e.id === (selectedExperienceId || outlineEntries[0]?.id)) || outlineEntries[0];
								const activeIdx = activeEntry ? outlineEntries.findIndex((e) => e.id === activeEntry.id) : 0;
								const totalBullets = outlineEntries.reduce((sum, e) => sum + (e.points?.length || 0), 0);
								const currentQIndex = activeEntry ? (activeExplorationQuestionIndex[activeEntry.id] || 0) : 0;

								return (
									<div className="pt-4 border-t border-slate-800/90 space-y-3.5 print:hidden">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="text-sm font-bold text-white tracking-tight">
													What Zoe is exploring
												</h4>
												<p className="text-[11px] text-slate-400">
													{activeEntry ? `${activeEntry.title} · ${Math.max(1, activeIdx + 1)} of up to 5 bullets` : "Role overview"}
												</p>
											</div>
											<span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
												{Math.max(1, activeIdx + 1)}/{Math.max(1, outlineEntries.length)}
											</span>
										</div>

										{/* List of identified experiences with statuses */}
										<div className="rounded-xl border border-slate-800/80 bg-[#09121e] divide-y divide-slate-800/80 overflow-hidden text-xs">
											{/* Role overview item */}
											<div className="p-3 space-y-0.5 bg-slate-900/40">
												<div className="text-xs font-semibold text-slate-200">Role overview</div>
												<div className="text-[11px] text-slate-400">
													{targetRole || "Frontend Developer"}{fullName ? ` · ${fullName}` : ""}
												</div>
											</div>

											{/* Each experience row */}
											{outlineEntries.map((entry) => {
												const isCurrent = activeEntry?.id === entry.id;
												const hasPoints = entry.points && entry.points.length > 0;

												return (
													<div
														key={entry.id}
														onClick={() => {
															setSelectedExperienceId(entry.id);
															setActiveTab("stories");
														}}
														className={cn(
															"p-3 flex items-center justify-between cursor-pointer transition-colors",
															isCurrent ? "bg-emerald-500/10" : "hover:bg-slate-800/40"
														)}
													>
														<div className="space-y-0.5">
															<div className={cn("text-xs font-semibold", isCurrent ? "text-emerald-300 font-bold" : "text-white")}>
																{entry.title}
															</div>
															<div className="text-[11px] text-slate-400">
																{isCurrent ? "Asking now" : hasPoints ? `${entry.points?.length} bullet(s) drafted` : "In progress"}
															</div>
														</div>

														<div className="flex items-center gap-1.5">
															{isCurrent ? (
																<span className="flex items-center gap-1">
																	<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
																	<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse delay-75" />
																	<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse delay-150" />
																</span>
															) : hasPoints ? (
																<CheckCircle className="size-3.5 text-emerald-400" />
															) : (
																<span className="text-slate-600 font-mono">···</span>
															)}
														</div>
													</div>
												);
											})}
										</div>

										{/* Current Topic Breakdown & Checklist matching screenshot */}
										{activeEntry && (
											<div className="rounded-xl border border-slate-800/90 bg-[#060c14] p-3.5 space-y-2.5 text-xs">
												<div className="flex items-center justify-between border-b border-slate-800 pb-2">
													<div>
														<span className="text-xs font-bold text-white block">
															{activeEntry.title}
														</span>
														<span className="text-[10px] text-slate-400">
															Ready to draft · Zoe will ask about the result once
														</span>
													</div>
												</div>

												{/* Checklist items */}
												<div className="space-y-2 pt-1 text-[11px]">
													<div className="flex items-start gap-2 text-slate-200">
														<Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
														<div>
															<span className="font-semibold text-white">The work & challenge</span>
															<span className="text-[10px] text-emerald-400/90 font-mono ml-2">REQUIRED</span>
															<p className="text-slate-400 text-[10px] mt-0.5">
																{activeEntry.description || "Identified from your story"}
															</p>
														</div>
													</div>

													<div className="flex items-start gap-2 text-slate-200">
														<Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
														<div>
															<span className="font-semibold text-white">Your contribution</span>
															<span className="text-[10px] text-emerald-400/90 font-mono ml-2">REQUIRED</span>
															<p className="text-slate-400 text-[10px] mt-0.5">
																{activeEntry.points && activeEntry.points.length > 0
																	? activeEntry.points[0]
																	: "Specific modules, preview rendering, and UI engineered"}
															</p>
														</div>
													</div>

													<div className={cn(
														"p-2 rounded-lg border flex items-start gap-2",
														currentQIndex >= 1
															? "border-emerald-500/30 bg-emerald-950/20 text-slate-200"
															: "border-emerald-500/40 bg-emerald-950/30 text-white"
													)}>
														<span className="size-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
														<div>
															<div className="flex items-center gap-2">
																<span className="font-bold text-white">Results & evidence</span>
																<span className="text-[9px] font-mono text-emerald-300 px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/30">
																	{currentQIndex >= 1 ? "CAPTURED" : "ZOE IS ASKING NOW"}
																</span>
															</div>
															<p className="text-slate-300 text-[10px] mt-0.5">
																{currentQIndex >= 1 && activeEntry.points && activeEntry.points.length > 1
																	? activeEntry.points[1]
																	: "Impact, latency, user feedback, or measured outcomes"}
															</p>
														</div>
													</div>

													<div className="flex items-start gap-2 text-slate-400">
														<Check className="size-3 text-slate-500 shrink-0 mt-0.5" />
														<div>
															<span className="font-semibold text-slate-300">Scale & complexity</span>
															<span className="text-[9px] text-slate-500 font-mono ml-2">OPTIONAL</span>
															<p className="text-slate-500 text-[10px] mt-0.5">
																{activeEntry.organization ? `${activeEntry.organization} · ` : ""}Frontend preview rendering
															</p>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})()}
						</div>
					</aside>
				)}

				{/* FINAL SUMMARY & CONFIRMATION MODAL (Sections 10, 11, 12) */}
				{showFinalSummaryModal && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
						onClick={() => setShowFinalSummaryModal(false)}
					>
						<div
							className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-emerald-500/40 bg-[#08121f] text-slate-100 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-start justify-between border-b border-slate-800 px-6 py-5 bg-[#091526]">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
											FINAL EXPERIENCE SUMMARY & CONFIRMATION
										</span>
										<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
											{outlineEntries.length} Experiences
										</span>
									</div>
									<h2 className="text-xl font-bold text-white leading-snug">
										"Here's what we can add from your experience{outlineEntries[0]?.organization ? ` at ${outlineEntries[0].organization}` : ""}."
									</h2>
									<p className="text-xs text-slate-300">
										Review your collected points across all experiences. Edit points, remove incorrect items, or add missing details before finalizing.
									</p>
								</div>

								<button
									type="button"
									onClick={() => setShowFinalSummaryModal(false)}
									className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
								>
									✕
								</button>
							</div>

							{/* Scrollable Experiences Review List */}
							<div className="flex-1 overflow-y-auto p-6 space-y-5">
								{outlineEntries.map((entry, eIdx) => {
									const bulletList = entry.points && entry.points.length > 0
										? entry.points
										: [entry.description || `Built responsive solutions and key features as ${entry.title}.`];

									return (
										<div
											key={entry.id}
											className="rounded-2xl border border-slate-800 bg-[#09111e] p-5 space-y-3.5 shadow-md"
										>
											{/* Experience Header */}
											<div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
												<div className="flex items-center gap-2">
													<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase border border-emerald-500/30">
														#{eIdx + 1} · {entry.category}
													</span>
													<h3 className="text-sm font-bold text-white">
														{entry.title}
													</h3>
													{entry.organization && (
														<span className="text-xs text-slate-400 font-medium">
															at {entry.organization}
														</span>
													)}
												</div>

												<button
													type="button"
													onClick={() => {
														setAddingPointEntryId(addingPointEntryId === entry.id ? null : entry.id);
														setNewPointInputText("");
													}}
													className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors cursor-pointer"
												>
													<Plus className="size-3 text-emerald-400" />
													<span>Add bullet point</span>
												</button>
											</div>

											{/* Inline New Point Input Form */}
											{addingPointEntryId === entry.id && (
												<div className="rounded-xl border border-emerald-500/40 bg-[#0b1728] p-3 space-y-2 animate-in fade-in duration-150">
													<label className="text-[11px] font-semibold text-emerald-400">Add missing detail or point:</label>
													<input
														type="text"
														value={newPointInputText}
														onChange={(e) => setNewPointInputText(e.target.value)}
														placeholder="e.g. Optimized real-time data sync reducing load times by 30%..."
														className="w-full rounded-lg bg-[#07101c] border border-slate-700 px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
														autoFocus
													/>
													<div className="flex items-center justify-end gap-2">
														<button
															type="button"
															onClick={() => setAddingPointEntryId(null)}
															className="text-xs text-slate-400 hover:text-white px-2 py-1"
														>
															Cancel
														</button>
														<button
															type="button"
															onClick={() => handleAddPointToEntry(entry.id, newPointInputText)}
															className="px-3 py-1 rounded-lg bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs"
														>
															Add point
														</button>
													</div>
												</div>
											)}

											{/* Bullet Points List */}
											<div className="space-y-2">
												{bulletList.map((bullet, bIdx) => {
													const pointKey = `${entry.id}_${bIdx}`;
													const isEditing = editingPointKey === pointKey;

													return (
														<div
															key={pointKey}
															className="rounded-xl border border-slate-800/90 bg-[#070e18] p-3 flex items-start justify-between gap-3 group hover:border-slate-700 transition-colors"
														>
															{isEditing ? (
																<div className="flex-1 space-y-2">
																	<textarea
																		rows={2}
																		value={editingPointText}
																		onChange={(e) => setEditingPointText(e.target.value)}
																		className="w-full rounded-lg bg-[#0b1424] border border-emerald-500/60 p-2 text-xs text-white outline-none resize-none"
																		autoFocus
																	/>
																	<div className="flex items-center justify-end gap-2">
																		<button
																			type="button"
																			onClick={() => setEditingPointKey(null)}
																			className="text-xs text-slate-400 hover:text-white px-2 py-1"
																		>
																			Cancel
																		</button>
																		<button
																			type="button"
																			onClick={() => handleEditPoint(entry.id, bIdx, editingPointText)}
																			className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
																		>
																			Save
																		</button>
																	</div>
																</div>
															) : (
																<>
																	<div className="flex items-start gap-2 flex-1">
																		<span className="text-emerald-400 font-bold text-sm leading-none mt-0.5">•</span>
																		<p className="text-xs text-slate-200 leading-relaxed">
																			{bullet}
																		</p>
																	</div>
																	<div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
																		<button
																			type="button"
																			onClick={() => {
																				setEditingPointKey(pointKey);
																				setEditingPointText(bullet);
																			}}
																			className="p-1 rounded text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors"
																			title="Edit point"
																		>
																			<Edit3 className="size-3.5" />
																		</button>
																		<button
																			type="button"
																			onClick={() => handleRemovePoint(entry.id, bIdx)}
																			className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
																			title="Remove point"
																		>
																			<Trash2 className="size-3.5" />
																		</button>
																	</div>
																</>
															)}
														</div>
													);
												})}
											</div>
										</div>
									);
								})}
							</div>

							{/* Footer Actions: Ask for Final Confirmation */}
							<div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 px-6 py-4 bg-[#091526]">
								<span className="text-xs text-slate-300">
									Does anything else need to be changed or added?
								</span>

								<div className="flex items-center gap-2.5 w-full sm:w-auto">
									<button
										type="button"
										onClick={() => setShowFinalSummaryModal(false)}
										className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
									>
										Continue editing
									</button>
									<button
										type="button"
										onClick={handleConfirmAndGenerateFinal}
										className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
									>
										<Check className="size-4" />
										<span>Confirm & Save Experiences</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* HOW ZOE HELPS EXPLANATION MODAL (Requirement 19) */}
				{showHowZoeHelpsModal && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
						onClick={() => setShowHowZoeHelpsModal(false)}
					>
						<div
							className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl border border-emerald-500/40 bg-[#08121f] text-slate-100 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-start justify-between border-b border-slate-800 px-6 py-5 bg-[#091526]">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<Sparkles className="size-4 text-emerald-400" />
										<span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
											TRANSPARENCY & METHODOLOGY
										</span>
									</div>
									<h2 className="text-xl font-bold text-white leading-snug">
										How Zoe Helps You Craft Your Resume
									</h2>
									<p className="text-xs text-slate-300">
										Understanding how Zoe analyzes your story, extracts verified experiences, and constructs achievement statements.
									</p>
								</div>

								<button
									type="button"
									onClick={() => setShowHowZoeHelpsModal(false)}
									className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
								>
									<X className="size-5" />
								</button>
							</div>

							{/* Content Body */}
							<div className="overflow-y-auto p-6 space-y-5 text-xs text-slate-300 leading-relaxed">
								{/* Section 1 */}
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c14] space-y-2">
									<h3 className="text-sm font-bold text-white flex items-center gap-2">
										<span className="size-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">1</span>
										<span>Multi-Experience Identification</span>
									</h3>
									<p className="text-slate-300">
										When you describe your work, Zoe parses your sentence structure, technologies, and achievements. Instead of blending everything into one generic summary, Zoe separates each project, feature, and mentoring contribution into standalone outline items.
									</p>
									<div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-emerald-300">
										Prompt rule: Never invent technologies, statistics, or responsibilities not mentioned by the candidate.
									</div>
								</div>

								{/* Section 2 */}
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c14] space-y-2">
									<h3 className="text-sm font-bold text-white flex items-center gap-2">
										<span className="size-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">2</span>
										<span>Single-Focus Contextual Exploration</span>
									</h3>
									<p className="text-slate-300">
										Instead of bombarding you with 4–5 repetitive questions per item, Zoe synthesizes what you already said and poses <strong>one specific question</strong> targeting only missing information (such as personal architecture contribution or user outcomes).
									</p>
									<div className="space-y-1 pt-1 text-[11px]">
										<div className="text-slate-400 font-semibold">Achievement Interview Template:</div>
										<div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 italic">
											"For [Experience Title], what parts did you personally build or lead, and what was the outcome once shipped?"
										</div>
									</div>
								</div>

								{/* Section 3 */}
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c14] space-y-2">
									<h3 className="text-sm font-bold text-white flex items-center gap-2">
										<span className="size-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">3</span>
										<span>Smart Priority Ordering</span>
									</h3>
									<p className="text-slate-300">
										Zoe automatically calculates a strength and relevance score based on your target role (<strong className="text-white">{targetRole}</strong>). Leadership, mentoring, and technical architecture are prioritized at the top to give hiring managers maximum signal.
									</p>
								</div>

								{/* Section 4 */}
								<div className="p-4 rounded-xl border border-slate-800 bg-[#060c14] space-y-2">
									<h3 className="text-sm font-bold text-white flex items-center gap-2">
										<span className="size-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">4</span>
										<span>Live Summary & Workspace Outline</span>
									</h3>
									<p className="text-slate-300">
										Your professional summary updates automatically as new experiences are verified. You maintain 100% control to review, edit, or remove any wording at any time.
									</p>
								</div>
							</div>

							{/* Footer */}
							<div className="flex items-center justify-end border-t border-slate-800 px-6 py-4 bg-[#091526]">
								<button
									type="button"
									onClick={() => setShowHowZoeHelpsModal(false)}
									className="px-5 py-2 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs cursor-pointer"
								>
									Got it
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Template Gallery Modal */}
				{showTemplateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
						<div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-[#08121f] text-slate-100 shadow-2xl overflow-hidden">
							{/* Modal Header */}
							<div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-[#091526]">
								<div className="flex items-center gap-3">
									<div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
										<Palette className="size-4" />
									</div>
									<div>
										<h2 className="text-lg font-bold text-white flex items-center gap-2">
											<span>Choose a Template</span>
											<span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
												Current: {selectedTemplate}
											</span>
										</h2>
										<p className="text-xs text-slate-400">
											Select a visual layout for your resume. Changes reflect live on your resume sheet.
										</p>
									</div>
								</div>

								<button
									type="button"
									onClick={() => setShowTemplateModal(false)}
									className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
								>
									<X className="size-5" />
								</button>
							</div>

							{/* Template Grid Body */}
							<div className="overflow-y-auto p-6">
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
									{[
										{ id: "Azurill", name: "Azurill", desc: "Two-column with bold sidebar", color: "bg-blue-500", img: "/templates/jpg/azurill.jpg" },
										{ id: "Bronzor", name: "Bronzor", desc: "Corporate & conservative header", color: "bg-slate-700", img: "/templates/jpg/bronzor.jpg" },
										{ id: "Chikorita", name: "Chikorita", desc: "Modern fresh two-column", color: "bg-emerald-600", img: "/templates/jpg/chikorita.jpg" },
										{ id: "Gengar", name: "Gengar", desc: "High-contrast technical layout", color: "bg-purple-600", img: "/templates/jpg/gengar.jpg" },
										{ id: "Lapras", name: "Lapras", desc: "Deep blue professional header", color: "bg-indigo-700", img: "/templates/jpg/lapras.jpg" },
										{ id: "Onyx", name: "Onyx", desc: "Sharp minimalist structure", color: "bg-rose-600", img: "/templates/jpg/onyx.jpg" },
										{ id: "Pikachu", name: "Pikachu", desc: "Dynamic accented layout", color: "bg-amber-500", img: "/templates/jpg/pikachu.jpg" },
										{ id: "Leafish", name: "Leafish", desc: "Clean nature-inspired green", color: "bg-lime-600", img: "/templates/jpg/leafish.jpg" },
										{ id: "Ditgar", name: "Ditgar", desc: "Grid-based modular layout", color: "bg-sky-600", img: "/templates/jpg/ditgar.jpg" },
										{ id: "Ditto", name: "Ditto", desc: "Compact single-page design", color: "bg-pink-600", img: "/templates/jpg/ditto.jpg" },
										{ id: "Glalie", name: "Glalie", desc: "Clean executive layout", color: "bg-slate-600", img: "/templates/jpg/glalie.jpg" },
										{ id: "Kakuna", name: "Kakuna", desc: "Warm contrast traditional", color: "bg-yellow-600", img: "/templates/jpg/kakuna.jpg" },
										{ id: "Rhyhorn", name: "Rhyhorn", desc: "Robust structured engineer layout", color: "bg-cyan-600", img: "/templates/jpg/rhyhorn.jpg" },
									].map((tmpl) => {
										const isSelected = selectedTemplate.toLowerCase() === tmpl.id.toLowerCase();
										return (
											<div
												key={tmpl.id}
												onClick={() => {
													handleSelectTemplate(tmpl.id);
													toast.success(`Template switched to ${tmpl.name}!`);
												}}
												className={cn(
													"group relative rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all bg-[#091524]",
													isSelected
														? "border-emerald-500 ring-2 ring-emerald-500/40 bg-[#091c28]"
														: "border-slate-800 hover:border-slate-700 hover:bg-[#0c1a2d]"
												)}
											>
												{/* Template Thumbnail Preview */}
												<div className="relative aspect-[3/4] w-full rounded-lg bg-slate-900 overflow-hidden mb-2.5 border border-slate-800/80">
													<img
														src={tmpl.img}
														alt={tmpl.name}
														className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
														onError={(e) => {
															// Fallback placeholder if image not rendered
															(e.target as HTMLElement).style.display = "none";
														}}
													/>
													<div className={cn("absolute top-2 left-2 size-3 rounded-full shadow-sm", tmpl.color)} />
													{isSelected && (
														<div className="absolute top-2 right-2 size-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
															<Check className="size-3 stroke-[3]" />
														</div>
													)}
												</div>

												{/* Info */}
												<div className="space-y-0.5">
													<div className="flex items-center justify-between">
														<span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
															{tmpl.name}
														</span>
														{isSelected && (
															<span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
																Active
															</span>
														)}
													</div>
													<p className="text-[11px] text-slate-400 line-clamp-1">
														{tmpl.desc}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							{/* Footer */}
							<div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-[#091526]">
								<span className="text-xs text-slate-400">
									Selected: <strong className="text-white">{selectedTemplate}</strong>
								</span>
								<button
									type="button"
									onClick={() => setShowTemplateModal(false)}
									className="px-5 py-2 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs cursor-pointer shadow-md"
								>
									Done
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Quick Add Project / Activity / Education Modal */}
				{quickAddSectionModalOpen && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
						onClick={() => setQuickAddSectionModalOpen(false)}
					>
						<div
							className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#09121f] text-slate-100 shadow-2xl p-6 sm:p-7 space-y-5"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between pb-2 border-b border-slate-800">
								<div>
									<span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold block">
										ADD TO YOUR RESUME
									</span>
									<h3 className="text-lg font-bold text-white">
										{quickAddCategory === "work" && "Add work experience / internship"}
										{quickAddCategory === "projects" && "Add a project"}
										{quickAddCategory === "education" && "Add education / degree"}
										{quickAddCategory === "volunteer" && "Add volunteering & activity"}
									</h3>
								</div>
								<button
									type="button"
									onClick={() => setQuickAddSectionModalOpen(false)}
									className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
									title="Close"
								>
									✕
								</button>
							</div>

							<div className="space-y-4 text-xs">
								<div className="space-y-1.5">
									<label className="font-semibold text-slate-300">
										{quickAddCategory === "work" && "Job title"}
										{quickAddCategory === "projects" && "Project title"}
										{quickAddCategory === "education" && "Degree / Qualification"}
										{quickAddCategory === "volunteer" && "Role / Activity"}
										<span className="text-emerald-400 font-bold ml-1">*</span>
									</label>
									<input
										type="text"
										value={quickAddTitle}
										onChange={(e) => {
											setQuickAddTitle(sanitizeToCharactersOnly(e.target.value, true));
										}}
										placeholder={
											quickAddCategory === "work"
												? "e.g. Frontend Developer, Software Engineer Intern"
												: quickAddCategory === "projects"
													? "e.g. AI Resume Builder, E-commerce App"
													: quickAddCategory === "education"
														? "e.g. B.Tech Computer Science, Web Development Certificate"
														: "e.g. Open Source Contributor, Mentor"
										}
										autoFocus
										className={`w-full rounded-xl bg-[#0b1424] border ${quickAddTitle && (getCharacterOnlyValidationError(quickAddTitle, "Title", 2, true) || getTextValidationError(quickAddTitle, "Title", 2, true)) ? "border-rose-500" : "border-slate-700 focus:border-emerald-500"} px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors`}
									/>
									{quickAddTitle && (getCharacterOnlyValidationError(quickAddTitle, "Title", 2, true) || getTextValidationError(quickAddTitle, "Title", 2, true)) && (
										<p className="text-[11px] text-rose-400 mt-1">{getCharacterOnlyValidationError(quickAddTitle, "Title", 2, true) || getTextValidationError(quickAddTitle, "Title", 2, true)}</p>
									)}
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="space-y-1.5">
										<label className="font-semibold text-slate-300">
											{quickAddCategory === "work" && "Company / Organization"}
											{quickAddCategory === "projects" && "Tech stack / tools"}
											{quickAddCategory === "education" && "School / University"}
											{quickAddCategory === "volunteer" && "Organization / Community"}
										</label>
										<input
											type="text"
											value={quickAddOrg}
											onChange={(e) => {
												setQuickAddOrg(sanitizeToCharactersOnly(e.target.value, true));
											}}
											placeholder={
												quickAddCategory === "work"
													? "e.g. Google, Acme Corp, Startup"
													: quickAddCategory === "projects"
														? "e.g. React, Next.js, Node.js"
														: quickAddCategory === "education"
															? "e.g. Stanford University, NavGurukul"
															: "e.g. Local Community Center, Open Source"
											}
											className="w-full rounded-xl bg-[#0b1424] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="font-semibold text-slate-300">Dates (Optional)</label>
										<input
											type="text"
											value={quickAddDates}
											onChange={(e) => setQuickAddDates(e.target.value)}
											placeholder="e.g. 2023 – 2024"
											className={`w-full rounded-xl bg-[#0b1424] border ${quickAddDates && getDatePeriodValidationError(quickAddDates, false) ? "border-rose-500" : "border-slate-700 focus:border-emerald-500"} px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-colors`}
										/>
										{quickAddDates && getDatePeriodValidationError(quickAddDates, false) && (
											<p className="text-[11px] text-rose-400 mt-1">{getDatePeriodValidationError(quickAddDates, false)}</p>
										)}
									</div>
								</div>

								<div className="space-y-1.5">
									<label className="font-semibold text-slate-300">Quick description / key note (Optional)</label>
									<textarea
										rows={2}
										value={quickAddDescription}
										onChange={(e) => setQuickAddDescription(e.target.value)}
										placeholder="Brief summary of what you did or built..."
										className="w-full rounded-xl border border-slate-700 bg-[#0b1424] p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none resize-none"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between pt-2 border-t border-slate-800">
								<button
									type="button"
									onClick={() => setQuickAddSectionModalOpen(false)}
									className="text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
								>
									Cancel
								</button>

								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => handleSaveQuickAddSection(false)}
										className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
									>
										Add to outline
									</button>
									<button
										type="button"
										onClick={() => handleSaveQuickAddSection(true)}
										className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ccf873] hover:bg-[#bdf35a] text-slate-950 font-bold text-xs cursor-pointer shadow-md"
									>
										<Mic className="size-3.5" />
										<span>Start story with Zoe →</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}