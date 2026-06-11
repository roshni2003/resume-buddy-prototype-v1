import "./get-strict-context-CE5mktmJ.js";
import { t as cn } from "./style-BVXxCckg.js";
import "./input-C4lW-WI7.js";
import { t as Badge, n as Combobox, l as useConfirm, u as useDialogStore } from "./badge-C7BDNxcP.js";
import "./alert-dialog-D16KSnDL.js";
import { i18n } from "@lingui/core";
import { Trans, useLingui } from "@lingui/react";
import {
	CircleNotchIcon,
	CopySimpleIcon,
	LockSimpleIcon,
	PencilSimpleLineIcon,
	PlusIcon,
	SortAscendingIcon,
	TagIcon,
	TrashSimpleIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { useResizeObserver } from "usehooks-ts";
import { t as api } from "./api-CLpzZUWU.js";
import {
	t as DropdownMenu,
	n as DropdownMenuContent,
	i as DropdownMenuItem,
	s as DropdownMenuSeparator,
	d as DropdownMenuTrigger,
} from "./dropdown-menu-CLnJO2T5.js";
import { t as MultipleCombobox } from "./multiple-combobox-DQb9dFeD.js";
import { n as CometCard, t as Route } from "./resumes-CljkxTrT.js";
import { t as Separator } from "./separator-CVomJmmh.js";

function BaseCard({ title, description, tags, className, children, ...props }) {
	return /* @__PURE__ */ jsx(CometCard, {
		translateDepth: 3,
		rotateDepth: 6,
		children: /* @__PURE__ */ jsxs("div", {
			...props,
			className: cn(
				"group relative flex aspect-page size-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-xl active:scale-[0.98] sm:active:scale-100",
				className,
			),
			children: [
				children,
				/* @__PURE__ */ jsxs("div", {
					className:
						"absolute inset-x-0 bottom-0 w-full border-gray-200 border-t bg-gradient-to-t from-white via-white to-transparent p-3 antialiased sm:p-4",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-1 truncate font-semibold text-base text-gray-900 sm:mb-1.5 sm:text-lg",
							children: title,
						}),
						/* @__PURE__ */ jsx("p", {
							className: "truncate text-gray-600 text-xs sm:text-sm",
							children: description,
						}),
					],
				}),
			],
		}),
	});
}
function CreateResumeCard() {
	const { openDialog } = useDialogStore();
	return /* @__PURE__ */ jsx(BaseCard, {
		title: i18n._({ id: "VrBnBN" }),
		description: i18n._({ id: "/38hFE" }),
		onClick: () => openDialog("resume.create", void 0),
		className: "border-2 border-gray-400 border-dashed bg-transparent shadow-none hover:border-gray-600",
		children: /* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ jsx(PlusIcon, {
					weight: "bold",
					className: "mb-2 size-10 text-gray-500",
				}),
				/* @__PURE__ */ jsx("span", {
					className: "font-medium text-base text-gray-500",
					children: "Create Resume",
				}),
			],
		}),
	});
}
function ResumeDropdownMenu({ resume, children, ...props }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const queryClient = useQueryClient();
	const { mutate: deleteResume } = useMutation({
		mutationFn: (id) => api.deleteResume(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		},
	});
	const handleUpdate = () => {
		openDialog("resume.update", resume);
	};
	const handleDuplicate = () => {
		openDialog("resume.duplicate", resume);
	};
	const handleDelete = async () => {
		if (!(await confirm(i18n._({ id: "phpS3e" }), { description: i18n._({ id: "2xOCJW" }) }))) return;
		const toastId = toast.loading(i18n._({ id: "X8fXNy" }));
		deleteResume(resume.id, {
			onSuccess: () => {
				toast.success(i18n._({ id: "mW+9mo" }), { id: toastId });
			},
			onError: (error) => {
				toast.error(error.message, { id: toastId });
			},
		});
	};
	return /* @__PURE__ */ jsxs(DropdownMenu, {
		children: [
			/* @__PURE__ */ jsx(DropdownMenuTrigger, {
				asChild: true,
				children,
			}),
			/* @__PURE__ */ jsxs(DropdownMenuContent, {
				...props,
				children: [
					/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						disabled: resume.isLocked,
						onSelect: handleUpdate,
						children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "2wxgft" })],
					}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: handleDuplicate,
						children: [/* @__PURE__ */ jsx(CopySimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "euc6Ns" })],
					}),
					/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						variant: "destructive",
						disabled: resume.isLocked,
						onSelect: handleDelete,
						children: [/* @__PURE__ */ jsx(TrashSimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "cnGeoo" })],
					}),
				],
			}),
		],
	});
}
dayjs.extend(relativeTime);
function ResumeCard({ resume }) {
	const containerRef = useRef(null);
	const { width: containerWidth = 0 } = useResizeObserver({ ref: containerRef });
	const updatedAt = useMemo(() => {
		return dayjs(resume.updatedAt).format("YYYY-MM-DD HH:mm:ss");
	}, [resume.updatedAt]);
	const scale = useMemo(() => {
		if (containerWidth === 0) return 0;
		return Math.round((containerWidth / 794) * 1e3) / 1e3;
	}, [containerWidth]);
	const [isIframeReady, setIsIframeReady] = useState(false);
	useEffect(() => {
		const handleMessage = (event) => {
			if (event.data?.type === "RESUME_READY") {
				console.log(`[ResumeCard] Received RESUME_READY for id=${event.data.resumeId}, expected id=${resume.id}`);
				if (event.data.resumeId === resume.id) {
					console.log(`[ResumeCard] Match found for ${resume.id}, setting ready.`);
					setIsIframeReady(true);
				}
			}
			if (event.data?.type === "PRINTER_ERROR") {
				console.error(`[ResumeCard] Received PRINTER_ERROR for id=${event.data.resumeId}:`, event.data.message);
				if (event.data.resumeId === resume.id) setIsIframeReady(true);
			}
		};
		const timeoutId = setTimeout(() => {
			if (!isIframeReady) {
				console.warn(`[ResumeCard] Preview timeout for ${resume.id}, forcing visibility.`);
				setIsIframeReady(true);
			}
		}, 1e4);
		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
			clearTimeout(timeoutId);
		};
	}, [resume.id, isIframeReady]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ jsx(Link, {
				to: "/builder/$resumeId",
				params: { resumeId: resume.id },
				className: "cursor-default",
				children: /* @__PURE__ */ jsxs(BaseCard, {
					title: resume.name,
					description: i18n._({
						id: "lYnXt3",
						values: { updatedAt },
					}),
					children: [
						/* @__PURE__ */ jsxs("div", {
							ref: containerRef,
							className: "absolute inset-x-0 top-0 bottom-[80px] overflow-hidden bg-white sm:bottom-[88px]",
							style: { isolation: "isolate" },
							children: [
								/* @__PURE__ */ jsx(AnimatePresence, {
									children:
										!isIframeReady &&
										/* @__PURE__ */ jsx(
											motion.div,
											{
												initial: { opacity: 1 },
												exit: { opacity: 0 },
												className: "absolute inset-0 z-10 flex items-center justify-center bg-white",
												children: /* @__PURE__ */ jsx(CircleNotchIcon, {
													weight: "thin",
													className: "size-12 animate-spin",
												}),
											},
											"loader",
										),
								}),
								/* @__PURE__ */ jsx("div", {
									className: cn(
										"absolute inset-0 flex items-start justify-center overflow-hidden transition-opacity duration-500",
										!isIframeReady && "opacity-0",
									),
									children: /* @__PURE__ */ jsx("div", {
										style: {
											width: "794px",
											height: "1123px",
											flexShrink: 0,
											transform: `scale(${scale || 0.3}) translateZ(0)`,
											transformOrigin: "top center",
											backgroundColor: "white",
										},
										children: /* @__PURE__ */ jsx("iframe", {
											scrolling: "no",
											src: `/printer/${resume.id}?token=preview`,
											title: resume.name,
											loading: "lazy",
											className: "pointer-events-none size-full border-0",
											style: {
												backgroundColor: "white",
												imageRendering: "-webkit-optimize-contrast",
											},
										}),
									}),
								}),
							],
						}),
						/* @__PURE__ */ jsx(ResumeLockOverlay, { isLocked: resume.isLocked }),
					],
				}),
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute top-3 right-3 z-10",
				children: /* @__PURE__ */ jsx(ResumeDropdownMenu, {
					resume,
					children: /* @__PURE__ */ jsx("button", {
						className:
							"flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none",
						"aria-label": "Open menu",
						tabIndex: 0,
						children: /* @__PURE__ */ jsxs("svg", {
							width: "20",
							height: "20",
							fill: "currentColor",
							viewBox: "0 0 20 20",
							children: [
								/* @__PURE__ */ jsx("circle", {
									cx: "10",
									cy: "4",
									r: "1.5",
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "10",
									cy: "10",
									r: "1.5",
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "10",
									cy: "16",
									r: "1.5",
								}),
							],
						}),
					}),
				}),
			}),
		],
	});
}
function ResumeLockOverlay({ isLocked }) {
	return /* @__PURE__ */ jsx(AnimatePresence, {
		children:
			isLocked &&
			/* @__PURE__ */ jsx(
				motion.div,
				{
					initial: { opacity: 0 },
					animate: { opacity: 0.6 },
					exit: { opacity: 0 },
					className: "absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-center rounded-full bg-popover p-6",
						children: /* @__PURE__ */ jsx(LockSimpleIcon, {
							weight: "thin",
							className: "size-12 opacity-60",
						}),
					}),
				},
				"resume-lock-overlay",
			),
	});
}
function GridView({ resumes }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid 3xl:grid-cols-6 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					x: -50,
				},
				animate: {
					opacity: 1,
					x: 0,
				},
				exit: {
					opacity: 0,
					x: -50,
				},
				children: /* @__PURE__ */ jsx(CreateResumeCard, {}),
			}),
			/* @__PURE__ */ jsx(AnimatePresence, {
				children: resumes?.map((resume, index) =>
					/* @__PURE__ */ jsx(
						motion.div,
						{
							layout: true,
							initial: {
								opacity: 0,
								x: -50,
							},
							animate: {
								opacity: 1,
								x: 0,
							},
							exit: {
								opacity: 0,
								y: -50,
								filter: "blur(12px)",
							},
							transition: { delay: (index + 2) * 0.05 },
							children: /* @__PURE__ */ jsx(ResumeCard, { resume }),
						},
						resume.id,
					),
				),
			}),
		],
	});
}
function RouteComponent() {
	const { i18n: i18n$1 } = useLingui();
	const { tags, sort } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { openDialog } = useDialogStore();
	const queryClient = useQueryClient();
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["statistics"] });
		queryClient.invalidateQueries({ queryKey: ["resumes"] });
	}, [queryClient]);
	const { data: resumes } = useQuery({
		queryKey: [
			"resumes",
			{
				tags,
				sort,
			},
		],
		queryFn: () =>
			api.fetchResumes({
				tags,
				sort,
			}),
	});
	const { data: statistics } = useQuery({
		queryKey: ["statistics"],
		queryFn: api.fetchStatistics,
	});
	const allTags = useMemo(() => {
		if (!resumes) return [];
		const tags$1 = /* @__PURE__ */ new Set();
		for (const resume of resumes) for (const tag of resume.tags || []) tags$1.add(tag);
		return Array.from(tags$1);
	}, [resumes]);
	useEffect(() => {
		if (resumes && resumes.length === 0) openDialog("resume.create", void 0);
	}, [resumes, openDialog]);
	const tagOptions = useMemo(() => {
		if (!allTags) return [];
		return allTags.map((tag) => ({
			value: tag,
			label: tag,
		}));
	}, [allTags]);
	const sortOptions = useMemo(() => {
		return [
			{
				value: "lastUpdatedAt",
				label: i18n$1.t("Last Updated"),
			},
			{
				value: "createdAt",
				label: i18n$1.t("Created"),
			},
			{
				value: "name",
				label: i18n$1.t("Name"),
			},
		];
	}, [i18n$1]);
	const lastUpdateText = useMemo(() => {
		if (!statistics?.lastUpdated) return "Never";
		const now = /* @__PURE__ */ new Date();
		const last = new Date(statistics.lastUpdated);
		const diff = now.getTime() - last.getTime();
		const minutes = Math.floor(diff / 6e4);
		const hours = Math.floor(diff / 36e5);
		const days = Math.floor(diff / 864e5);
		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		return `${days} day${days > 1 ? "s" : ""} ago`;
	}, [statistics]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-start justify-between",
							children: [
								/* @__PURE__ */ jsxs("div", {
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-2 text-gray-600 text-xs sm:text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "Eexbu/" }),
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-bold text-emerald-600 text-sm sm:text-base",
											children: statistics?.totalResumes ?? 0,
										}),
									],
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex size-10 items-center justify-center rounded-lg bg-emerald-50",
									children: /* @__PURE__ */ jsx("svg", {
										className: "size-5 text-emerald-600",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
										}),
									}),
								}),
							],
						}),
					}),
					/* @__PURE__ */ jsx("div", {
						className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-start justify-between",
							children: [
								/* @__PURE__ */ jsxs("div", {
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-2 text-gray-600 text-xs sm:text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "JPhe0q" }),
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-emerald-600 text-sm sm:text-base",
											children: lastUpdateText,
										}),
									],
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex size-10 items-center justify-center rounded-lg bg-emerald-50",
									children: /* @__PURE__ */ jsx("svg", {
										className: "size-5 text-emerald-600",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
										}),
									}),
								}),
							],
						}),
					}),
					/* @__PURE__ */ jsx("div", {
						className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-start justify-between",
							children: [
								/* @__PURE__ */ jsxs("div", {
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-1 text-gray-600 text-xs sm:text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "LGsORC" }),
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mb-2 text-gray-500 text-xs",
											children: /* @__PURE__ */ jsx(Trans, { id: "oW3yYY" }),
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-bold text-emerald-600 text-sm sm:text-base",
											children: statistics?.totalDownloads ?? 0,
										}),
									],
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex size-10 items-center justify-center rounded-lg bg-emerald-50",
									children: /* @__PURE__ */ jsx("svg", {
										className: "size-5 text-emerald-600",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
										}),
									}),
								}),
							],
						}),
					}),
					/* @__PURE__ */ jsx("div", {
						className: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-start justify-between",
							children: [
								/* @__PURE__ */ jsxs("div", {
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-2 text-gray-600 text-xs sm:text-sm",
											children: /* @__PURE__ */ jsx(Trans, { id: "kueSiQ" }),
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-amber-600 text-sm sm:text-base",
											children: /* @__PURE__ */ jsx(Trans, { id: "XrMrNE" }),
										}),
									],
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex size-10 items-center justify-center rounded-lg bg-gray-200",
									children: /* @__PURE__ */ jsx("svg", {
										className: "size-5 text-gray-500",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M4 6h16M4 10h16M4 14h16M4 18h16",
										}),
									}),
								}),
							],
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx(Separator, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-x-4",
				children: [
					/* @__PURE__ */ jsx(Combobox, {
						value: sort,
						options: sortOptions,
						onValueChange: (value) => {
							if (!value) return;
							navigate({
								search: {
									tags,
									sort: value,
								},
							});
						},
						buttonProps: {
							title: i18n._({ id: "/HgF9q" }),
							variant: "ghost",
							children: (_, option) =>
								/* @__PURE__ */ jsxs(Fragment$1, {
									children: [/* @__PURE__ */ jsx(SortAscendingIcon, {}), option?.label],
								}),
						},
					}),
					/* @__PURE__ */ jsx(MultipleCombobox, {
						value: tags,
						options: tagOptions,
						onValueChange: (value) => {
							navigate({
								search: {
									tags: value,
									sort,
								},
							});
						},
						buttonProps: {
							variant: "ghost",
							title: i18n._({ id: "0cVgUw" }),
							className: cn({ hidden: tagOptions.length === 0 }),
							children: (_, options) =>
								/* @__PURE__ */ jsxs(Fragment$1, {
									children: [
										/* @__PURE__ */ jsx(TagIcon, {}),
										options.map((option) =>
											/* @__PURE__ */ jsx(
												Badge,
												{
													variant: "outline",
													children: option.label,
												},
												option.value,
											),
										),
									],
								}),
						},
					}),
				],
			}),
			/* @__PURE__ */ jsx(GridView, { resumes: resumes ?? [] }),
		],
	});
}
export { RouteComponent as component };
