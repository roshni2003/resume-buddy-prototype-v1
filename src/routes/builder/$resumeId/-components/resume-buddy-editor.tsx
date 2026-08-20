import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
	ArrowLeft,
	Briefcase,
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Circle,
	Code,
	Download,
	FileText,
	Globe,
	GraduationCap,
	History,
	Image as ImageIcon,
	Link as LinkIcon,
	Plus,
	Search,
	Sparkles,
	Trash2,
	Type,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RichInput } from "@/components/input/rich-input";
import { useResumeStore } from "@/components/resume/store/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { educationItemSchema, experienceItemSchema, profileItemSchema, projectItemSchema } from "@/schema/resume/data";
import { api } from "@/utils/api";
import { downloadFromUrl, generateFilename } from "@/utils/file";
import { stripHtml } from "@/utils/string";
import { BasicsSectionForm } from "../-sidebar/left/sections/basics";
import { PictureSectionForm } from "../-sidebar/left/sections/picture";
import { useBuilderSidebarStore } from "../-store/sidebar";

export function ResumeBuddyEditor() {
	const resume = useResumeStore((state) => state.resume);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	// Zustand Sidebar UI States
	const activeSection = useBuilderSidebarStore((state) => state.activeSection);
	const setActiveSection = useBuilderSidebarStore((state) => state.setActiveSection);
	const expandedSections = useBuilderSidebarStore((state) => state.expandedSections);
	const toggleSectionExpanded = useBuilderSidebarStore((state) => state.toggleSectionExpanded);

	// Local active sub-item state (for multi-item sections: profiles, education, experience, projects)
	const [activeSubItem, setActiveSubItem] = useState<{
		type: "profiles" | "education" | "experience" | "projects";
		id?: string; // Empty id means creating a new item
	} | null>(null);

	// Search/Quick jump state
	const [searchQuery, setSearchQuery] = useState("");

	// AI mutation & state
	const { mutateAsync: exportResume } = useMutation({
		mutationFn: (data: { id: string; format: "pdf" | "docx" }) => api.exportResume(data.id, data.format),
	});

	const { mutateAsync: runFinalReview, isPending: isReviewing } = useMutation({
		mutationFn: api.generateAIContent,
	});

	const incrementReviewAttempts = useResumeStore((state) => state.incrementReviewAttempts);
	const setReviewing = useResumeStore((state) => state.setReviewing);
	const setReviewResult = useResumeStore((state) => state.setReviewResult);
	const setShowReviewDrawer = useResumeStore((state) => state.setShowReviewDrawer);
	const reviewAttempts = useResumeStore((state) => state.reviewAttempts);

	// Trigger final AI review
	const handleFinalReview = async () => {
		if (!resume) return;

		if (reviewAttempts >= 3) {
			toast.error("Review limit reached for today.");
			return;
		}

		incrementReviewAttempts();
		setReviewing(true);

		const toastId = toast.loading("AI is reviewing your resume...", {
			description: "Analyzing layout, format, and grammar.",
		});

		try {
			const response = await runFinalReview({
				resume_id: resume.id,
				type: "FinalReview",
				value: "string",
			});

			const reviewRaw = response.FinalReview || Object.values(response)[0];
			let result;
			if (typeof reviewRaw === "string") {
				result = JSON.parse(reviewRaw);
			} else {
				result = reviewRaw;
			}

			setReviewing(false);
			setReviewResult(result);
			setShowReviewDrawer(true);

			toast.success("AI Review complete!", {
				id: toastId,
				description: `Overall Score: ${result.overall_score}/100`,
			});
		} catch (error) {
			setReviewing(false);
			toast.error("AI review failed. Please try again.", { id: toastId });
		}
	};

	// PDF Export
	const handleExportPDF = async () => {
		if (!resume) return;
		const filename = generateFilename(resume.data.basics.name, "pdf");
		const toastId = toast.loading("Generating PDF, please wait...");
		try {
			const { url } = await exportResume({ id: resume.id, format: "pdf" });
			downloadFromUrl(url, filename);
			toast.success("PDF downloaded!");
		} catch (err) {
			toast.error("Failed to generate PDF.");
		} finally {
			toast.dismiss(toastId);
		}
	};

	// Check section completion
	const isSectionComplete = (type: string) => {
		if (!resume?.data) return false;
		switch (type) {
			case "picture":
				return !!resume.data.picture?.url && !resume.data.picture?.hidden;
			case "basics":
				return !!resume.data.basics?.name && !!resume.data.basics?.email;
			case "profiles":
				return (resume.data.sections?.profiles?.items?.length ?? 0) > 0;
			case "summary":
				return !!resume.data.summary?.content && resume.data.summary?.content !== "<p></p>";
			case "education":
				return (resume.data.sections?.education?.items?.length ?? 0) > 0;
			case "experience":
				return (resume.data.sections?.experience?.items?.length ?? 0) > 0;
			case "projects":
				return (resume.data.sections?.projects?.items?.length ?? 0) > 0;
			default:
				return false;
		}
	};

	const sectionsConfig = [
		{
			id: "picture",
			title: "Picture",
			icon: ImageIcon,
			color: "pink",
			colorClass: "text-pink-500 bg-pink-50 border-pink-500",
			activeBorder: "border-l-4 border-pink-500",
		},
		{
			id: "basics",
			title: "Basics",
			icon: User,
			color: "sky",
			colorClass: "text-sky-500 bg-sky-50 border-sky-500",
			activeBorder: "border-l-4 border-sky-500",
		},
		{
			id: "profiles",
			title: "Profiles",
			icon: LinkIcon,
			color: "purple",
			colorClass: "text-purple-500 bg-purple-50 border-purple-500",
			activeBorder: "border-l-4 border-purple-500",
		},
		{
			id: "summary",
			title: "Summary",
			icon: FileText,
			color: "amber",
			colorClass: "text-amber-500 bg-amber-50 border-amber-500",
			activeBorder: "border-l-4 border-amber-500",
		},
		{
			id: "education",
			title: "Education",
			icon: GraduationCap,
			color: "emerald",
			colorClass: "text-emerald-500 bg-emerald-50 border-emerald-500",
			activeBorder: "border-l-4 border-emerald-500",
		},
		{
			id: "experience",
			title: "Experience",
			icon: Briefcase,
			color: "indigo",
			colorClass: "text-indigo-600 bg-indigo-50 border-indigo-600",
			activeBorder: "border-l-4 border-indigo-600",
		},
		{
			id: "projects",
			title: "Projects",
			icon: Code,
			color: "rose",
			colorClass: "text-rose-500 bg-rose-50 border-rose-500",
			activeBorder: "border-l-4 border-rose-500",
		},
	];

	// Helper to delete an item
	const handleDeleteItem = (sectionType: "profiles" | "education" | "experience" | "projects", id: string) => {
		updateResumeData((draft) => {
			if (sectionType === "profiles") {
				draft.sections.profiles.items = draft.sections.profiles.items.filter((item) => item.id !== id) as any;
			} else if (sectionType === "education") {
				draft.sections.education.items = draft.sections.education.items.filter((item) => item.id !== id) as any;
			} else if (sectionType === "experience") {
				draft.sections.experience.items = draft.sections.experience.items.filter((item) => item.id !== id) as any;
			} else if (sectionType === "projects") {
				draft.sections.projects.items = draft.sections.projects.items.filter((item) => item.id !== id) as any;
			}
		});
		if (activeSubItem?.id === id) {
			setActiveSubItem(null);
		}
		toast.success("Item deleted successfully");
	};

	return (
		<div className="flex h-screen w-screen flex-col bg-gradient-to-br from-slate-50 to-gray-50">
			{" "}
			{/* Header Redesign */}
			<header className="z-10 flex h-16 shrink-0 items-center justify-between border-gray-200 border-b bg-white px-6">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
						<Sparkles className="h-5 w-5" />
					</div>
					<div>
						<h1 className="font-bold text-base text-gray-900 leading-tight">Resume Buddy</h1>
						<p className="text-gray-400 text-xs">{resume?.name || "Untitled"} · auto-saved</p>
					</div>
				</div>

				{/* Header Right */}
				<div className="flex items-center gap-4">
					{/* Quick Jump Search Input */}
					<div className="relative hidden w-64 md:block">
						<Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
						<input
							type="text"
							placeholder="Quick jump... ⌘K"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-full border-0 bg-gray-100 py-2 pr-4 pl-10 text-gray-700 text-sm placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
						/>
					</div>

					{/* Quick Utility Icon Buttons */}
					<div className="flex items-center gap-1">
						<button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Language">
							<Globe className="h-5 w-5" />
						</button>
						<button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Typography">
							<Type className="h-5 w-5" />
						</button>
						<button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="History">
							<History className="h-5 w-5" />
						</button>
					</div>

					{/* AI final review button */}
					<button
						onClick={handleFinalReview}
						disabled={isReviewing}
						className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 font-medium text-sm text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg focus:outline-none"
					>
						<Sparkles className="h-4 w-4" />
						<span>AI</span>
					</button>

					{/* Export PDF Button */}
					<button
						onClick={handleExportPDF}
						className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-medium text-sm text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg focus:outline-none"
					>
						<Download className="h-4 w-4" />
						<span>Export</span>
					</button>
				</div>
			</header>
			{/* Main Body Layout */}
			<div className="flex flex-1 overflow-hidden">
				{/* Left Sidebar */}
				<aside className="w-[380px] shrink-0 space-y-3 overflow-y-auto border-gray-200 border-r bg-white/80 p-4 backdrop-blur-sm">
					{" "}
					{sectionsConfig.map((sec) => {
						const IconComponent = sec.icon;
						const isSelected = activeSection === sec.id;
						const isExpanded = expandedSections[sec.id] ?? false;
						const complete = isSectionComplete(sec.id);

						// Fetch count badge details
						let badgeCount = 0;
						if (sec.id === "profiles") badgeCount = resume?.data?.sections?.profiles?.items?.length ?? 0;
						if (sec.id === "summary") badgeCount = resume?.data?.summary?.content ? 1 : 0;

						return (
							<div
								key={sec.id}
								className={`flex flex-col rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-300 ${isSelected ? `${sec.activeBorder} shadow-md` : "hover:border-gray-200 hover:shadow-sm"
									}`}
							>
								{/* Header of Section Card */}
								<div
									onClick={() => {
										setActiveSection(sec.id);
										setActiveSubItem(null);
										if (!isExpanded) {
											toggleSectionExpanded(sec.id);
										}
									}}
									className="flex cursor-pointer items-center justify-between p-4"
								>
									<div className="flex items-center gap-3">
										<div className={`flex h-10 w-10 items-center justify-center rounded-xl ${sec.colorClass}`}>
											<IconComponent className="h-5 w-5" />
										</div>
										<div>
											<span className="font-semibold text-gray-900 text-sm">{sec.title}</span>
											{badgeCount > 0 && (
												<span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 font-bold text-gray-500 text-xs">
													{badgeCount}
												</span>
											)}
										</div>
									</div>

									<div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
										{/* Status Indicator */}
										{complete ? (
											<CheckCircle className="h-5 w-5 text-emerald-500" />
										) : (
											<Circle
												className={`h-2 w-2 fill-current ${sec.id === "profiles" ? "text-amber-500" : "text-gray-300"}`}
											/>
										)}

										{/* Chevron expand */}
										<button
											onClick={() => toggleSectionExpanded(sec.id)}
											className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
										>
											{isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
										</button>
									</div>
								</div>

								{/* Expanded content under Card */}
								{isExpanded && (
									<div className="border-gray-50 border-t bg-gray-50/50 p-4">
										{/* Details rendering depending on section type */}
										{sec.id === "picture" && (
											<p className="text-gray-500 text-xs">
												{resume?.data?.picture?.url ? "Profile image uploaded" : "No image selected"}
											</p>
										)}

										{sec.id === "basics" && (
											<div className="space-y-1 text-gray-600 text-xs">
												<p className="font-semibold text-gray-900">{resume?.data?.basics?.name || "No name added"}</p>
												<p>{resume?.data?.basics?.headline}</p>
											</div>
										)}

										{sec.id === "profiles" && (
											<div className="space-y-2">
												{resume?.data?.sections?.profiles?.items?.map((item) => (
													<div
														key={item.id}
														onClick={() => {
															setActiveSection("profiles");
															setActiveSubItem({ type: "profiles", id: item.id });
														}}
														className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-2 hover:border-purple-300"
													>
														<span className="font-medium text-gray-800 text-xs">{item.network}</span>
														<span className="max-w-[150px] truncate text-gray-500 text-xs">{item.username}</span>
													</div>
												))}
												<button
													onClick={() => {
														setActiveSection("profiles");
														setActiveSubItem({ type: "profiles" });
													}}
													className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-purple-200 border-dashed bg-white py-2 font-semibold text-purple-600 text-xs transition-all hover:bg-purple-50"
												>
													<Plus className="h-3.5 w-3.5" />
													Add Profile
												</button>
											</div>
										)}

										{sec.id === "summary" && (
											<div
												onClick={() => {
													setActiveSection("summary");
													setActiveSubItem(null);
												}}
												className="cursor-pointer rounded-lg border-amber-500 border-l-2 bg-white p-3 shadow-xs transition-shadow hover:shadow-md"
											>
												<div className="mb-1 flex items-center justify-between">
													<span className="font-semibold text-gray-800 text-xs">Professional Summary</span>
													<span className="text-[10px] text-gray-500">
														{resume?.data?.summary?.content
															? `${stripHtml(resume.data.summary.content).split(/\s+/).filter(Boolean).length} words`
															: "0 words"}
													</span>
												</div>
												<p className="line-clamp-2 text-[11px] text-gray-600 leading-relaxed">
													{resume?.data?.summary?.content
														? stripHtml(resume.data.summary.content)
														: "Click to edit professional summary"}
												</p>
											</div>
										)}

										{sec.id === "education" && (
											<div className="space-y-2">
												{resume?.data?.sections?.education?.items?.map((item) => (
													<div
														key={item.id}
														onClick={() => {
															setActiveSection("education");
															setActiveSubItem({ type: "education", id: item.id });
														}}
														className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-2.5 hover:border-emerald-300"
													>
														<div className="truncate pr-2">
															<p className="truncate font-semibold text-gray-800 text-xs">{item.school}</p>
															<p className="truncate text-[10px] text-gray-500">{item.degree}</p>
														</div>
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																handleDeleteItem("education", item.id);
															}}
															className="p-1 text-gray-400 hover:text-red-500"
														>
															<Trash2 className="h-3.5 w-3.5" />
														</button>
													</div>
												))}
												<button
													onClick={() => {
														setActiveSection("education");
														setActiveSubItem({ type: "education" });
													}}
													className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-emerald-200 border-dashed bg-white py-2 font-semibold text-emerald-600 text-xs transition-all hover:bg-emerald-50"
												>
													<Plus className="h-3.5 w-3.5" />
													Add Education
												</button>
											</div>
										)}

										{sec.id === "experience" && (
											<div className="space-y-2">
												{resume?.data?.sections?.experience?.items?.map((item) => (
													<div
														key={item.id}
														onClick={() => {
															setActiveSection("experience");
															setActiveSubItem({ type: "experience", id: item.id });
														}}
														className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-2.5 hover:border-indigo-300"
													>
														<div className="truncate pr-2">
															<p className="truncate font-semibold text-gray-800 text-xs">{item.position}</p>
															<p className="truncate text-[10px] text-gray-500">{item.company}</p>
														</div>
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																handleDeleteItem("experience", item.id);
															}}
															className="p-1 text-gray-400 hover:text-red-500"
														>
															<Trash2 className="h-3.5 w-3.5" />
														</button>
													</div>
												))}
												<button
													onClick={() => {
														setActiveSection("experience");
														setActiveSubItem({ type: "experience" });
													}}
													className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-indigo-200 border-dashed bg-white py-2 font-semibold text-indigo-600 text-xs transition-all hover:bg-indigo-50"
												>
													<Plus className="h-3.5 w-3.5" />
													Add Experience
												</button>
											</div>
										)}

										{sec.id === "projects" && (
											<div className="space-y-2">
												{resume?.data?.sections?.projects?.items?.map((item) => (
													<div
														key={item.id}
														onClick={() => {
															setActiveSection("projects");
															setActiveSubItem({ type: "projects", id: item.id });
														}}
														className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-2.5 hover:border-rose-300"
													>
														<div className="truncate pr-2">
															<p className="truncate font-semibold text-gray-800 text-xs">{item.name}</p>
															<p className="truncate text-[10px] text-gray-500">{item.period}</p>
														</div>
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																handleDeleteItem("projects", item.id);
															}}
															className="p-1 text-gray-400 hover:text-red-500"
														>
															<Trash2 className="h-3.5 w-3.5" />
														</button>
													</div>
												))}
												<button
													onClick={() => {
														setActiveSection("projects");
														setActiveSubItem({ type: "projects" });
													}}
													className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-200 border-dashed bg-white py-2 font-semibold text-rose-600 text-xs transition-all hover:bg-rose-50"
												>
													<Plus className="h-3.5 w-3.5" />
													Add Project
												</button>
											</div>
										)}
									</div>
								)}
							</div>
						);
					})}
				</aside>

				{/* Right Main Editor Content Canvas */}
				<main className="flex flex-1 justify-center overflow-y-auto p-8 bg-slate-50/50">
					<div className="w-full max-w-[800px] rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl shadow-indigo-100/50 backdrop-blur-xl ring-1 ring-black/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
						{/* Conditional form rendering */}
						{activeSection === "basics" && (
							<div className="animate-in fade-in duration-300">
								<div className="mb-8 rounded-2xl bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent p-6 border-l-4 border-sky-500 shadow-sm">
									<h2 className="font-bold text-sky-950 text-2xl flex items-center gap-3">
										<User className="h-6 w-6 text-sky-500" />
										Basics Information
									</h2>
									<p className="text-sky-700/80 mt-1.5 text-sm">Update your personal details and contact information.</p>
								</div>
								<BasicsSectionForm />
							</div>
						)}

						{activeSection === "picture" && (
							<div className="animate-in fade-in duration-300">
								<div className="mb-8 rounded-2xl bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-transparent p-6 border-l-4 border-pink-500 shadow-sm">
									<h2 className="font-bold text-pink-950 text-2xl flex items-center gap-3">
										<ImageIcon className="h-6 w-6 text-pink-500" />
										Profile Photo
									</h2>
									<p className="text-pink-700/80 mt-1.5 text-sm">Upload a professional headshot for your resume.</p>
								</div>
								<PictureSectionForm />
							</div>
						)}

						{activeSection === "summary" && (
							<div className="animate-in fade-in duration-300">
								<SummaryInlineForm />
							</div>
						)}

						{activeSection === "profiles" && (
							<div className="animate-in fade-in duration-300">
								<ProfilesInlineForm activeSubItem={activeSubItem} setActiveSubItem={setActiveSubItem} />
							</div>
						)}

						{activeSection === "education" && (
							<div className="animate-in fade-in duration-300">
								<EducationInlineForm
									activeSubItem={activeSubItem}
									setActiveSubItem={setActiveSubItem}
									handleDeleteItem={handleDeleteItem}
								/>
							</div>
						)}

						{activeSection === "experience" && (
							<div className="animate-in fade-in duration-300">
								<ExperienceInlineForm
									activeSubItem={activeSubItem}
									setActiveSubItem={setActiveSubItem}
									handleDeleteItem={handleDeleteItem}
								/>
							</div>
						)}

						{activeSection === "projects" && (
							<div className="animate-in fade-in duration-300">
								<ProjectsInlineForm
									activeSubItem={activeSubItem}
									setActiveSubItem={setActiveSubItem}
									handleDeleteItem={handleDeleteItem}
								/>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}

function SummaryInlineForm() {
	const summary = useResumeStore((state) => state.resume.data.summary);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm({
		defaultValues: {
			content: summary.content ?? "",
		},
	});

	const onSubmit = (data: { content: string }) => {
		updateResumeData((draft) => {
			draft.summary.content = data.content;
		});
	};

	const [aiGenerating, setAiGenerating] = useState(false);

	const handleAskZoeInline = async () => {
		setAiGenerating(true);
		const toastId = toast.loading("Zoe is writing summary...");

		try {
			const resume = useResumeStore.getState().resume;
			const response = await api.generateAIContent({
				resume_id: resume.id,
				type: "summary",
				value: stripHtml(`Name: ${resume.data.basics.name}, Headline: ${resume.data.basics.headline}`),
			});

			const aiDescription = Object.values(response)[0];
			form.setValue("content", aiDescription as string);
			onSubmit({ content: aiDescription as string });
			toast.success("AI summary generated!", { id: toastId });
		} catch (err) {
			toast.error("AI generation failed.", { id: toastId });
		} finally {
			setAiGenerating(false);
		}
	};

	return (
		<div>
			<div className="mb-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 border-l-4 border-amber-500 shadow-sm">
				<h2 className="font-bold text-amber-950 text-2xl flex items-center gap-3">
					<FileText className="h-6 w-6 text-amber-500" />
					Professional Summary
				</h2>
				<p className="text-amber-700/80 mt-1.5 text-sm">Write a brief overview of your background and achievements.</p>
			</div>
			<FormProvider {...form}>
				<form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<div className="mb-2 flex items-center justify-between">
							<label className="font-semibold text-gray-700 text-xs">Summary Content</label>
							<button
								type="button"
								onClick={handleAskZoeInline}
								disabled={aiGenerating}
								className="group relative flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 font-semibold text-amber-600 text-xs transition-all hover:bg-amber-100 hover:shadow-md"
							>
								{/* Blinking AI icon */}
								<div className="relative">
									<Sparkles className="h-4 w-4 text-amber-500 ai-blink" />
									{/* Subtle pulse ring */}
									<div className="absolute inset-0 -m-1 rounded-full border border-amber-400 opacity-0 transition-opacity group-hover:opacity-100 ai-pulse" />
								</div>
								<span>Ask Zoe AI</span>
								{/* Small dot indicator */}
								<span className="absolute -top-1 -right-1 flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
									<span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
								</span>
							</button>
						</div>
						<RichInput
							value={form.watch("content")}
							onChange={(val) => {
								form.setValue("content", val);
								onSubmit({ content: val });
							}}
						/>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

// Profiles Inline Form
function ProfilesInlineForm({
	activeSubItem,
	setActiveSubItem,
}: {
	activeSubItem: any;
	setActiveSubItem: (val: any) => void;
}) {
	const section = useResumeStore((state) => state.resume.data.sections.profiles);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const isEditing = activeSubItem?.type === "profiles";
	const editId = activeSubItem?.id;

	const currentItem = editId ? section.items.find((p) => p.id === editId) : null;

	const form = useForm({
		resolver: zodResolver(profileItemSchema),
		defaultValues: {
			id: editId || crypto.randomUUID(),
			hidden: currentItem?.hidden ?? false,
			network: currentItem?.network ?? "LinkedIn",
			username: currentItem?.username ?? "",
			icon: currentItem?.icon ?? "🔗",
			website: currentItem?.website ?? { url: "", label: "" },
		},
	});

	useEffect(() => {
		if (currentItem) {
			form.reset({
				id: currentItem.id,
				hidden: currentItem.hidden,
				network: currentItem.network,
				username: currentItem.username,
				icon: currentItem.icon,
				website: currentItem.website,
			});
		} else {
			form.reset({
				id: crypto.randomUUID(),
				hidden: false,
				network: "LinkedIn",
				username: "",
				icon: "🔗",
				website: { url: "", label: "" },
			});
		}
	}, [editId, currentItem]);

	const onSubmit = (formData: any) => {
		updateResumeData((draft) => {
			const idx = draft.sections.profiles.items.findIndex((p) => p.id === formData.id);
			if (idx !== -1) {
				draft.sections.profiles.items[idx] = formData;
			} else {
				draft.sections.profiles.items.push(formData);
			}
		});
		setActiveSubItem(null);
		toast.success("Profile saved");
	};

	if (!isEditing) {
		return (
			<div>
				<div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent p-6 border-l-4 border-purple-500 shadow-sm">
					<h2 className="font-bold text-purple-950 text-2xl flex items-center gap-3">
						<LinkIcon className="h-6 w-6 text-purple-500" />
						Social & Professional Profiles
					</h2>
					<p className="text-purple-700/80 mt-1.5 text-sm">Add links to GitHub, LinkedIn, or your portfolio website.</p>
				</div>

				<div className="space-y-3">
					{section.items.map((item) => (
						<div key={item.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">
							<div>
								<span className="font-bold text-gray-900 text-sm">{item.network}</span>
								<p className="text-gray-500 text-xs">{item.username}</p>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm" onClick={() => setActiveSubItem({ type: "profiles", id: item.id })}>
									Edit
								</Button>
							</div>
						</div>
					))}
					<Button onClick={() => setActiveSubItem({ type: "profiles" })} className="w-full">
						Add Profile
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent p-6 border-l-4 border-purple-500 shadow-sm">
				<button onClick={() => setActiveSubItem(null)} className="rounded-full bg-white/50 p-2 text-purple-600 hover:bg-white/80 transition-colors shadow-sm">
					<ArrowLeft className="h-5 w-5" />
				</button>
				<div>
					<h2 className="font-bold text-purple-950 text-2xl flex items-center gap-3">
						{editId ? "Edit Profile" : "Add Profile"}
					</h2>
					<p className="text-purple-700/80 mt-1 text-sm">Fill in the details for your social or professional profile.</p>
				</div>
			</div>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Platform Network</label>
						<select
							{...form.register("network")}
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
						>
							<option value="LinkedIn">LinkedIn</option>
							<option value="GitHub">GitHub</option>
							<option value="Twitter">Twitter</option>
							<option value="Portfolio">Portfolio</option>
						</select>
					</div>

					<div>
						<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Username</label>
						<Input {...form.register("username")} placeholder="e.g. johndoe" />
					</div>

					<div>
						<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Profile URL</label>
						<Input {...form.register("website.url")} placeholder="https://..." />
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button variant="ghost" onClick={() => setActiveSubItem(null)}>
							Cancel
						</Button>
						<Button type="submit">Save Profile</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

// Education Inline Form
function EducationInlineForm({
	activeSubItem,
	setActiveSubItem,
	handleDeleteItem,
}: {
	activeSubItem: any;
	setActiveSubItem: (val: any) => void;
	handleDeleteItem: (sectionType: "profiles" | "education" | "experience" | "projects", id: string) => void;
}) {
	const section = useResumeStore((state) => state.resume.data.sections.education);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const isEditing = activeSubItem?.type === "education";
	const editId = activeSubItem?.id;

	const currentItem = editId ? section.items.find((edu) => edu.id === editId) : null;

	const form = useForm({
		resolver: zodResolver(educationItemSchema),
		defaultValues: {
			id: editId || crypto.randomUUID(),
			hidden: currentItem?.hidden ?? false,
			options: currentItem?.options ?? { showLinkInTitle: false },
			school: currentItem?.school ?? "",
			degree: currentItem?.degree ?? "",
			area: currentItem?.area ?? "",
			grade: currentItem?.grade ?? "",
			location: currentItem?.location ?? "",
			period: currentItem?.period ?? "",
			description: currentItem?.description ?? "",
			currentlyStudyingHere: currentItem?.currentlyStudyingHere ?? false,
			website: currentItem?.website ?? { url: "", label: "" },
		},
	});

	useEffect(() => {
		if (currentItem) {
			form.reset({
				id: currentItem.id,
				hidden: currentItem.hidden,
				options: currentItem.options ?? { showLinkInTitle: false },
				school: currentItem.school,
				degree: currentItem.degree,
				area: currentItem.area,
				grade: currentItem.grade,
				location: currentItem.location,
				period: currentItem.period,
				description: currentItem.description,
				currentlyStudyingHere: currentItem.currentlyStudyingHere,
				website: currentItem.website ?? { url: "", label: "" },
			});
		} else {
			form.reset({
				id: crypto.randomUUID(),
				hidden: false,
				options: { showLinkInTitle: false },
				school: "",
				degree: "",
				area: "",
				grade: "",
				location: "",
				period: "",
				description: "",
				currentlyStudyingHere: false,
				website: { url: "", label: "" },
			});
		}
	}, [editId, currentItem]);

	const onSubmit = (formData: any) => {
		updateResumeData((draft) => {
			const idx = draft.sections.education.items.findIndex((edu) => edu.id === formData.id);
			if (idx !== -1) {
				draft.sections.education.items[idx] = formData;
			} else {
				draft.sections.education.items.push(formData);
			}
		});
		setActiveSubItem(null);
		toast.success("Education saved");
	};

	if (!isEditing) {
		return (
			<div>
				<div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 border-l-4 border-emerald-500 shadow-sm">
					<h2 className="font-bold text-emerald-950 text-2xl flex items-center gap-3">
						<GraduationCap className="h-6 w-6 text-emerald-500" />
						Education
					</h2>
					<p className="text-emerald-700/80 mt-1.5 text-sm">Add details of your degrees and academic history.</p>
				</div>

				<div className="space-y-3">
					{section.items.map((item) => (
						<div key={item.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">
							<div>
								<span className="font-bold text-gray-900 text-sm">{item.school}</span>
								<p className="text-gray-500 text-xs">
									{item.degree} in {item.area}
								</p>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setActiveSubItem({ type: "education", id: item.id })}
								>
									Edit
								</Button>
								<Button variant="outline" size="sm" onClick={() => handleDeleteItem("education", item.id)}>
									Delete
								</Button>
							</div>
						</div>
					))}
					<Button onClick={() => setActiveSubItem({ type: "education" })} className="w-full">
						Add Education
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 border-l-4 border-emerald-500 shadow-sm">
				<button onClick={() => setActiveSubItem(null)} className="rounded-full bg-white/50 p-2 text-emerald-600 hover:bg-white/80 transition-colors shadow-sm">
					<ArrowLeft className="h-5 w-5" />
				</button>
				<div>
					<h2 className="font-bold text-emerald-950 text-2xl flex items-center gap-3">
						{editId ? "Edit Education" : "Add Education"}
					</h2>
					<p className="text-emerald-700/80 mt-1 text-sm">Fill in the details for your education entry.</p>
				</div>
			</div>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">School / Institution</label>
							<Input {...form.register("school")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Degree</label>
							<Input {...form.register("degree")} />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Area of Study</label>
							<Input {...form.register("area")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Grade / GPA</label>
							<Input {...form.register("grade")} />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Location</label>
							<Input {...form.register("location")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Period (e.g. 2020 - 2024)</label>
							<Input {...form.register("period")} />
						</div>
					</div>

					<div className="flex items-center gap-3 py-2">
						<Switch
							checked={form.watch("currentlyStudyingHere")}
							onCheckedChange={(val) => form.setValue("currentlyStudyingHere", val)}
						/>
						<label className="font-semibold text-gray-700 text-xs">I am currently studying here</label>
					</div>

					<div>
						<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Description / Key Coursework</label>
						<RichInput value={form.watch("description")} onChange={(val) => form.setValue("description", val)} />
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button variant="ghost" onClick={() => setActiveSubItem(null)}>
							Cancel
						</Button>
						<Button type="submit">Save Education</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

// Experience Inline Form
function ExperienceInlineForm({
	activeSubItem,
	setActiveSubItem,
	handleDeleteItem,
}: {
	activeSubItem: any;
	setActiveSubItem: (val: any) => void;
	handleDeleteItem: (sectionType: "profiles" | "education" | "experience" | "projects", id: string) => void;
}) {
	const section = useResumeStore((state) => state.resume.data.sections.experience);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const isEditing = activeSubItem?.type === "experience";
	const editId = activeSubItem?.id;

	const currentItem = editId ? section.items.find((exp) => exp.id === editId) : null;

	const form = useForm({
		resolver: zodResolver(experienceItemSchema),
		defaultValues: {
			id: editId || crypto.randomUUID(),
			hidden: currentItem?.hidden ?? false,
			options: currentItem?.options ?? { showLinkInTitle: false },
			company: currentItem?.company ?? "",
			position: currentItem?.position ?? "",
			location: currentItem?.location ?? "",
			startDate: currentItem?.startDate ?? "",
			endDate: currentItem?.endDate ?? "",
			currentlyWorkingHere: currentItem?.currentlyWorkingHere ?? false,
			description: currentItem?.description ?? "",
			period: currentItem?.period ?? "",
		},
	});

	useEffect(() => {
		if (currentItem) {
			form.reset({
				id: currentItem.id,
				hidden: currentItem.hidden,
				options: currentItem.options ?? { showLinkInTitle: false },
				company: currentItem.company,
				position: currentItem.position,
				location: currentItem.location,
				startDate: currentItem.startDate,
				endDate: currentItem.endDate,
				currentlyWorkingHere: currentItem.currentlyWorkingHere,
				description: currentItem.description,
				period: currentItem.period,
			});
		} else {
			form.reset({
				id: crypto.randomUUID(),
				hidden: false,
				options: { showLinkInTitle: false },
				company: "",
				position: "",
				location: "",
				startDate: "",
				endDate: "",
				currentlyWorkingHere: false,
				description: "",
				period: "",
			});
		}
	}, [editId, currentItem]);

	const onSubmit = (formData: any) => {
		updateResumeData((draft) => {
			const idx = draft.sections.experience.items.findIndex((exp) => exp.id === formData.id);
			if (idx !== -1) {
				draft.sections.experience.items[idx] = formData;
			} else {
				draft.sections.experience.items.push(formData);
			}
		});
		setActiveSubItem(null);
		toast.success("Experience saved");
	};

	const [aiGenerating, setAiGenerating] = useState(false);

	const handleAskZoeInline = async () => {
		const position = form.getValues("position");
		const company = form.getValues("company");
		if (!position || !company) {
			toast.error("Please enter position and company first.");
			return;
		}

		setAiGenerating(true);
		const toastId = toast.loading("Zoe is writing description...");

		try {
			const response = await api.generateAIContent({
				resume_id: useResumeStore.getState().resume.id,
				type: "ExperienceDescription",
				value: stripHtml(form.getValues("description") || `${position} at ${company}`),
			});

			const aiDescription = Object.values(response)[0];
			form.setValue("description", aiDescription);
			toast.success("AI description generated!", { id: toastId });
		} catch (err) {
			toast.error("AI generation failed.", { id: toastId });
		} finally {
			setAiGenerating(false);
		}
	};

	if (!isEditing) {
		return (
			<div>
				<div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent p-6 border-l-4 border-indigo-600 shadow-sm">
					<h2 className="font-bold text-indigo-950 text-2xl flex items-center gap-3">
						<Briefcase className="h-6 w-6 text-indigo-600" />
						Experience
					</h2>
					<p className="text-indigo-700/80 mt-1.5 text-sm">Add details of your current and past work experience.</p>
				</div>

				<div className="space-y-3">
					{section.items.map((item) => (
						<div key={item.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">
							<div>
								<span className="font-bold text-gray-900 text-sm">{item.position}</span>
								<p className="text-gray-500 text-xs">
									{item.company} · {item.period}
								</p>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setActiveSubItem({ type: "experience", id: item.id })}
								>
									Edit
								</Button>
								<Button variant="outline" size="sm" onClick={() => handleDeleteItem("experience", item.id)}>
									Delete
								</Button>
							</div>
						</div>
					))}
					<Button onClick={() => setActiveSubItem({ type: "experience" })} className="w-full">
						Add Experience
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent p-6 border-l-4 border-indigo-600 shadow-sm">
				<button onClick={() => setActiveSubItem(null)} className="rounded-full bg-white/50 p-2 text-indigo-600 hover:bg-white/80 transition-colors shadow-sm">
					<ArrowLeft className="h-5 w-5" />
				</button>
				<div>
					<h2 className="font-bold text-indigo-950 text-2xl flex items-center gap-3">
						{editId ? "Edit Experience" : "Add Experience"}
					</h2>
					<p className="text-indigo-700/80 mt-1 text-sm">Fill in the details for your work experience.</p>
				</div>
			</div>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Position / Title</label>
							<Input {...form.register("position")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Company</label>
							<Input {...form.register("company")} />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Location</label>
							<Input {...form.register("location")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">
								Period (e.g. Jan 2022 - Present)
							</label>
							<Input {...form.register("period")} />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Start Date</label>
							<Input type="date" {...form.register("startDate")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">End Date</label>
							<Input type="date" {...form.register("endDate")} />
						</div>
					</div>

					<div className="flex items-center gap-3 py-2">
						<Switch
							checked={form.watch("currentlyWorkingHere")}
							onCheckedChange={(val) => form.setValue("currentlyWorkingHere", val)}
						/>
						<label className="font-semibold text-gray-700 text-xs">I am currently working here</label>
					</div>

					<div>
						<div className="mb-2 flex items-center justify-between">
							<label className="font-semibold text-gray-700 text-xs">Description / Key Achievements</label>
							<button
								type="button"
								onClick={handleAskZoeInline}
								disabled={aiGenerating}
								className="group relative flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 font-semibold text-indigo-600 text-xs transition-all hover:bg-indigo-100 hover:shadow-md"
							>
								{/* Blinking AI icon */}
								<div className="relative">
									<Sparkles className="h-4 w-4 text-indigo-500 ai-blink" />
									{/* Subtle pulse ring */}
									<div className="absolute inset-0 -m-1 rounded-full border border-indigo-400 opacity-0 transition-opacity group-hover:opacity-100 ai-pulse" />
								</div>
								<span>Ask Zoe AI</span>
								{/* Small dot indicator */}
								<span className="absolute -top-1 -right-1 flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
									<span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
								</span>
							</button>
						</div>
						<RichInput value={form.watch("description")} onChange={(val) => form.setValue("description", val)} />
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button variant="ghost" onClick={() => setActiveSubItem(null)}>
							Cancel
						</Button>
						<Button type="submit">Save Experience</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

// Projects Inline Form
function ProjectsInlineForm({
	activeSubItem,
	setActiveSubItem,
	handleDeleteItem,
}: {
	activeSubItem: any;
	setActiveSubItem: (val: any) => void;
	handleDeleteItem: (sectionType: "profiles" | "education" | "experience" | "projects", id: string) => void;
}) {
	const section = useResumeStore((state) => state.resume.data.sections.projects);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const isEditing = activeSubItem?.type === "projects";
	const editId = activeSubItem?.id;

	const currentItem = editId ? section.items.find((proj) => proj.id === editId) : null;

	const form = useForm({
		resolver: zodResolver(projectItemSchema),
		defaultValues: {
			id: editId || crypto.randomUUID(),
			hidden: currentItem?.hidden ?? false,
			name: currentItem?.name ?? "",
			period: currentItem?.period ?? "",
			description: currentItem?.description ?? "",
			website: currentItem?.website ?? { url: "", label: "" },
		},
	});

	useEffect(() => {
		if (currentItem) {
			form.reset({
				id: currentItem.id,
				hidden: currentItem.hidden,
				name: currentItem.name,
				period: currentItem.period,
				description: currentItem.description,
				website: currentItem.website ?? { url: "", label: "" },
			});
		} else {
			form.reset({
				id: crypto.randomUUID(),
				hidden: false,
				name: "",
				period: "",
				description: "",
				website: { url: "", label: "" },
			});
		}
	}, [editId, currentItem]);

	const onSubmit = (formData: any) => {
		updateResumeData((draft) => {
			const idx = draft.sections.projects.items.findIndex((proj) => proj.id === formData.id);
			if (idx !== -1) {
				draft.sections.projects.items[idx] = formData;
			} else {
				draft.sections.projects.items.push(formData);
			}
		});
		setActiveSubItem(null);
		toast.success("Project saved");
	};

	const [aiGenerating, setAiGenerating] = useState(false);

	const handleAskZoeInline = async () => {
		const name = form.getValues("name");
		if (!name) {
			toast.error("Please enter project name first.");
			return;
		}

		setAiGenerating(true);
		const toastId = toast.loading("Zoe is writing description...");

		try {
			const response = await api.generateAIContent({
				resume_id: useResumeStore.getState().resume.id,
				type: "ProjectsDescription",
				value: stripHtml(form.getValues("description") || `${name}`),
			});

			const aiDescription = Object.values(response)[0];
			form.setValue("description", aiDescription as string);
			toast.success("AI description generated!", { id: toastId });
		} catch (err) {
			toast.error("AI generation failed.", { id: toastId });
		} finally {
			setAiGenerating(false);
		}
	};

	if (!isEditing) {
		return (
			<div>
				<div className="mb-8 rounded-2xl bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent p-6 border-l-4 border-rose-500 shadow-sm">
					<h2 className="font-bold text-rose-950 text-2xl flex items-center gap-3">
						<Code className="h-6 w-6 text-rose-500" />
						Projects
					</h2>
					<p className="text-rose-700/80 mt-1.5 text-sm">Add details of personal or academic projects.</p>
				</div>

				<div className="space-y-3">
					{section.items.map((item) => (
						<div key={item.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">
							<div>
								<span className="font-bold text-gray-900 text-sm">{item.name}</span>
								<p className="text-gray-500 text-xs">{item.period}</p>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm" onClick={() => setActiveSubItem({ type: "projects", id: item.id })}>
									Edit
								</Button>
								<Button variant="outline" size="sm" onClick={() => handleDeleteItem("projects", item.id)}>
									Delete
								</Button>
							</div>
						</div>
					))}
					<Button onClick={() => setActiveSubItem({ type: "projects" })} className="w-full">
						Add Project
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent p-6 border-l-4 border-rose-500 shadow-sm">
				<button onClick={() => setActiveSubItem(null)} className="rounded-full bg-white/50 p-2 text-rose-600 hover:bg-white/80 transition-colors shadow-sm">
					<ArrowLeft className="h-5 w-5" />
				</button>
				<div>
					<h2 className="font-bold text-rose-950 text-2xl flex items-center gap-3">
						{editId ? "Edit Project" : "Add Project"}
					</h2>
					<p className="text-rose-700/80 mt-1 text-sm">Fill in the details for your project.</p>
				</div>
			</div>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Project Name</label>
							<Input {...form.register("name")} />
						</div>
						<div>
							<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Period / Date</label>
							<Input {...form.register("period")} />
						</div>
					</div>

					<div>
						<label className="mb-1.5 block font-semibold text-gray-700 text-xs">Project Link / Website</label>
						<Input {...form.register("website.url")} placeholder="https://..." />
					</div>

					<div>
						<div className="mb-2 flex items-center justify-between">
							<label className="font-semibold text-gray-700 text-xs">Description</label>
							<button
								type="button"
								onClick={handleAskZoeInline}
								disabled={aiGenerating}
								className="group relative flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 font-semibold text-rose-600 text-xs transition-all hover:bg-rose-100 hover:shadow-md"
							>
								{/* Blinking AI icon */}
								<div className="relative">
									<Sparkles className="h-4 w-4 text-rose-500 ai-blink" />
									{/* Subtle pulse ring */}
									<div className="absolute inset-0 -m-1 rounded-full border border-rose-400 opacity-0 transition-opacity group-hover:opacity-100 ai-pulse" />
								</div>
								<span>Ask Zoe AI</span>
								{/* Small dot indicator */}
								<span className="absolute -top-1 -right-1 flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
									<span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
								</span>
							</button>
						</div>
						<RichInput value={form.watch("description")} onChange={(val) => form.setValue("description", val)} />
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button variant="ghost" onClick={() => setActiveSubItem(null)}>
							Cancel
						</Button>
						<Button type="submit">Save Project</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
