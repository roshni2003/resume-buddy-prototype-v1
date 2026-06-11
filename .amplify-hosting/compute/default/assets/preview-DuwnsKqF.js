import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";
import {
	ArrowRightIcon,
	EnvelopeIcon,
	GlobeIcon,
	IconContext,
	MapPinIcon,
	PhoneIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import { debounce } from "es-toolkit";
import {
	createContext,
	forwardRef,
	use,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { match } from "ts-pattern";
import { useIsMounted } from "usehooks-ts";
import { a as init_string, s as stripHtml } from "./createSsrRpc-9mmrq80i.js";
import { t as useResumeStore } from "./resume-BHY1IvQp.js";
import {
	i as Alert,
	a as AlertDescription,
	o as AlertTitle,
	r as sanitizeCss,
	n as TiptapContent,
} from "./rich-input-Coij_gNW.js";
import {
	n as getSectionTitle,
	s as pageDimensionsAsPixels,
	o as useCSSVariables,
	a as webfontlist_default,
} from "./section-lTXHolph.js";
import { t as cn } from "./style-BVXxCckg.js";

const useResumePagination = (measurements) => {
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	const sections = useResumeStore((state) => state.resume.data.sections);
	const customSections = useResumeStore((state) => state.resume.data.customSections);
	const summary = useResumeStore((state) => state.resume.data.summary);
	const pageHeight = pageDimensionsAsPixels[metadata.page.format].height;
	const marginY = metadata.page.marginY;
	const gapY = metadata.page.gapY;
	const contentHeight = pageHeight - marginY * 2;
	return useMemo(() => {
		if (Object.keys(measurements).length === 0)
			return {
				pages: metadata.layout.pages,
				itemDistribution: {},
				isOverflowing: false,
			};
		const pages = [];
		const MAX_PAGES = 2;
		const itemDistribution = {};
		let isOverflowing = false;
		const headerHeight = measurements.header || 0;
		const allSectionIds = [
			...metadata.layout.pages.flatMap((p) => p.main),
			...metadata.layout.pages.flatMap((p) => p.sidebar),
		];
		for (const id of allSectionIds) itemDistribution[id] = Array(MAX_PAGES).fill([]);
		const getSectionItems = (sectionId) => {
			if (sectionId === "summary") return [summary];
			if (sectionId in sections) return sections[sectionId].items.filter((i) => !i.hidden);
			const custom = customSections.find((s) => s.id === sectionId);
			if (custom) return custom.items.filter((i) => !i.hidden);
			return [];
		};
		const fillColumn = (columnSections, pageIndexStart, initialHeight, columnName) => {
			let currentPageIndex = pageIndexStart;
			let currentHeight = initialHeight;
			for (const sectionId of columnSections) {
				if (currentPageIndex >= MAX_PAGES) {
					isOverflowing = true;
					break;
				}
				if (!pages[currentPageIndex])
					pages[currentPageIndex] = {
						fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
						main: [],
						sidebar: [],
					};
				const items = getSectionItems(sectionId);
				if (items.length === 0) continue;
				const itemHeights = items.map((i) => i.id).map((id) => measurements[id] || 50);
				const totalMeasuredHeight = measurements[sectionId] || 0;
				const totalItemHeight = itemHeights.reduce((a, b) => a + b, 0);
				const sectionHeaderHeight = Math.max(0, totalMeasuredHeight - totalItemHeight);
				if (currentHeight + sectionHeaderHeight > contentHeight) {
					currentPageIndex++;
					currentHeight = 0;
					if (currentPageIndex >= MAX_PAGES) {
						isOverflowing = true;
						break;
					}
				}
				if (!pages[currentPageIndex])
					pages[currentPageIndex] = {
						fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
						main: [],
						sidebar: [],
					};
				if (!pages[currentPageIndex][columnName].includes(sectionId))
					pages[currentPageIndex][columnName].push(sectionId);
				currentHeight += sectionHeaderHeight;
				for (let i = 0; i < items.length; i++) {
					const itemId = items[i].id;
					const itemHeight = measurements[itemId] || 50;
					if (currentHeight + itemHeight <= contentHeight) {
						const currentDist = itemDistribution[sectionId][currentPageIndex] || [];
						itemDistribution[sectionId][currentPageIndex] = [...currentDist, itemId];
						currentHeight += itemHeight + gapY;
					} else {
						currentPageIndex++;
						currentHeight = 0;
						if (currentPageIndex >= MAX_PAGES) {
							isOverflowing = true;
							break;
						}
						if (!pages[currentPageIndex])
							pages[currentPageIndex] = {
								fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
								main: [],
								sidebar: [],
							};
						if (!pages[currentPageIndex][columnName].includes(sectionId))
							pages[currentPageIndex][columnName].push(sectionId);
						const currentDist = itemDistribution[sectionId][currentPageIndex] || [];
						itemDistribution[sectionId][currentPageIndex] = [...currentDist, itemId];
						currentHeight += itemHeight + gapY;
					}
				}
				if (currentPageIndex < MAX_PAGES) currentHeight += gapY;
			}
		};
		const mainSections = /* @__PURE__ */ new Set();
		const sidebarSections = /* @__PURE__ */ new Set();
		metadata.layout.pages.forEach((p) => {
			p.main.forEach((s) => mainSections.add(s));
			p.sidebar.forEach((s) => sidebarSections.add(s));
		});
		fillColumn(Array.from(mainSections), 0, headerHeight, "main");
		if (!metadata.layout.pages[0]?.fullWidth) fillColumn(Array.from(sidebarSections), 0, headerHeight, "sidebar");
		return {
			pages,
			itemDistribution,
			isOverflowing,
		};
	}, [metadata, measurements, contentHeight, summary, sections, customSections, gapY]);
};
function useWebfonts(typography) {
	const isMounted = useIsMounted();
	useEffect(() => {
		if (!isMounted()) return;
		const body = document.body;
		if (body) body.setAttribute("data-wf-loaded", "false");
		async function loadFont(family, weights) {
			const font = webfontlist_default.find((font$1) => font$1.family === family);
			if (!font) return;
			const fontUrls = [];
			for (const weight of weights)
				for (const [fileWeight, url] of Object.entries(font.files)) {
					if (weight === fileWeight)
						fontUrls.push({
							url,
							weight,
							style: "normal",
						});
					if (fileWeight === `${weight}italic`)
						fontUrls.push({
							url,
							weight,
							style: "italic",
						});
				}
			for (const { url, weight, style } of fontUrls) {
				const fontFace = new FontFace(family, `url("${url}")`, {
					style,
					weight,
					display: "swap",
				});
				if (!document.fonts.has(fontFace)) document.fonts.add(await fontFace.load());
			}
		}
		const bodyTypography = typography.body;
		const headingTypography = typography.heading;
		Promise.all([
			loadFont(bodyTypography.fontFamily, bodyTypography.fontWeights),
			loadFont(headingTypography.fontFamily, headingTypography.fontWeights),
		]).then(() => {
			if (isMounted() && body) body.setAttribute("data-wf-loaded", "true");
		});
		return () => {
			if (isMounted()) {
				if (body) body.removeAttribute("data-wf-loaded");
			}
		};
	}, [isMounted, typography]);
}
const ResumePageContext = createContext({ pageIndex: 0 });
function InlineEditableText({ value, onChange, placeholder, className, as = "span", href, ...props }) {
	const ref = useRef(null);
	const [isFocused, setIsFocused] = useState(false);
	const isEmpty = value.trim().length === 0;
	const Comp = as;
	useEffect(() => {
		if (!ref.current) return;
		if (isFocused) return;
		ref.current.textContent = value;
	}, [value, isFocused]);
	const debouncedOnChange = useMemo(() => debounce(onChange, 100), [onChange]);
	return /* @__PURE__ */ jsx(Comp, {
		ref,
		href: as === "a" ? href : void 0,
		contentEditable: true,
		suppressContentEditableWarning: true,
		"data-placeholder": placeholder,
		onFocus: () => setIsFocused(true),
		onBlur: () => setIsFocused(false),
		onClick: (event) => {
			if (as === "a" && href)
				if (event.ctrlKey || event.metaKey) window.open(href, "_blank", "noopener,noreferrer");
				else event.preventDefault();
		},
		onInput: (event) => {
			debouncedOnChange(event.currentTarget.textContent ?? "");
		},
		className: cn(
			"break-anywhere inline-block min-w-[4ch] max-w-full cursor-text rounded-sm outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
			isEmpty && "before:pointer-events-none before:text-muted-foreground before:content-[attr(data-placeholder)]",
			className,
		),
		...props,
	});
}
const handleContentEditableLinkClick = (e) => {
	const anchor = e.target.closest("a");
	if (anchor?.href) {
		const url = anchor.href;
		const targetAttr = anchor.getAttribute("target") || "_blank";
		window.open(url, targetAttr, "noopener,noreferrer");
		e.preventDefault();
		e.stopPropagation();
	}
};
function PageLink({ url, label, className }) {
	if (!url) return null;
	return /* @__PURE__ */ jsx("a", {
		href: url,
		target: "_blank",
		rel: "noopener",
		className: cn("inline-block text-wrap break-all", className),
		children: label || url,
	});
}
init_string();
function AwardsItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description)
			descriptionRef.current.innerHTML = item.description;
	}, [item.description]);
	const handleTitleChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.awards.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.title = value;
		});
	};
	const handleDateChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.awards.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.date = value;
		});
	};
	const handleAwarderChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.awards.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.awarder = value;
		});
	};
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description)
			updateResumeData((draft) => {
				const sectionItem = draft.sections.awards.items.find((i) => i.id === item.id);
				if (sectionItem) sectionItem.description = newValue;
			});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("awards-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header awards-item-header",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("strong", {
								className: "section-item-title awards-item-title",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.title,
									placeholder: "Award Title",
									onChange: handleTitleChange,
								}),
							}),
							/* @__PURE__ */ jsx("span", {
								className: "section-item-metadata awards-item-date shrink-0 text-end",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.date,
									placeholder: "Date",
									onChange: handleDateChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between gap-x-2",
						children: /* @__PURE__ */ jsx("span", {
							className: "section-item-metadata awards-item-awarder",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: item.awarder,
								placeholder: "Awarder",
								onChange: handleAwarderChange,
							}),
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onBlur: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className: cn(
					"section-item-description awards-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				),
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website awards-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
init_string();
function CertificationsItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description)
			descriptionRef.current.innerHTML = item.description;
	}, [item.description]);
	const handleTitleChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.title = value;
		});
	};
	const handleDateChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.date = value;
		});
	};
	const handleIssuerChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.issuer = value;
		});
	};
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description)
			updateResumeData((draft) => {
				const sectionItem = draft.sections.certifications.items.find((i) => i.id === item.id);
				if (sectionItem) sectionItem.description = newValue;
			});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("certifications-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header certifications-item-header",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("strong", {
								className: "section-item-title certifications-item-title",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.title,
									placeholder: "Certification Title",
									onChange: handleTitleChange,
								}),
							}),
							/* @__PURE__ */ jsx("span", {
								className: "section-item-metadata certifications-item-date shrink-0 text-end",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.date,
									placeholder: "Date",
									onChange: handleDateChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between gap-x-2",
						children: /* @__PURE__ */ jsx("span", {
							className: "section-item-metadata certifications-item-issuer",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: item.issuer,
								placeholder: "Issuer",
								onChange: handleIssuerChange,
							}),
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onBlur: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className: cn(
					"section-item-description certifications-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				),
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website certifications-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
init_string();
function CoverLetterItem({ className, ...item }) {
	if (!stripHtml(item.recipient) && !stripHtml(item.content)) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("cover-letter-item", className),
		children: [
			stripHtml(item.recipient) &&
				/* @__PURE__ */ jsx("div", {
					className: "cover-letter-item-recipient mb-4",
					children: /* @__PURE__ */ jsx(TiptapContent, { content: item.recipient }),
				}),
			stripHtml(item.content) &&
				/* @__PURE__ */ jsx("div", {
					className: "cover-letter-item-content",
					children: /* @__PURE__ */ jsx(TiptapContent, { content: item.content }),
				}),
		],
	});
}
init_string();
function EducationItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description)
			descriptionRef.current.innerHTML = item.description;
	}, [item.description]);
	const handleSchoolChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.school)
			updateResumeData((draft) => {
				const edu = draft.sections.education.items.find((e$1) => e$1.id === item.id);
				if (edu) edu.school = newValue;
			});
	};
	const handleDegreeChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.degree)
			updateResumeData((draft) => {
				const edu = draft.sections.education.items.find((e$1) => e$1.id === item.id);
				if (edu) edu.degree = newValue;
			});
	};
	const handleAreaChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.area)
			updateResumeData((draft) => {
				const edu = draft.sections.education.items.find((e$1) => e$1.id === item.id);
				if (edu) edu.area = newValue;
			});
	};
	const handlePeriodChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.period)
			updateResumeData((draft) => {
				const edu = draft.sections.education.items.find((e$1) => e$1.id === item.id);
				if (edu) edu.period = newValue;
			});
	};
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description)
			updateResumeData((draft) => {
				const edu = draft.sections.education.items.find((e$1) => e$1.id === item.id);
				if (edu) edu.description = newValue;
			});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("education-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header education-item-header mb-2",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handleSchoolChange,
								className:
									"section-item-title education-item-title cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.school,
							}),
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handleDegreeChange,
								className:
									"section-item-metadata education-item-degree-grade shrink-0 cursor-text text-end outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.degree,
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handleAreaChange,
								className:
									"section-item-metadata education-item-area cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.area,
							}),
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handlePeriodChange,
								className:
									"section-item-metadata education-item-location-period shrink-0 cursor-text text-end outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.period,
							}),
						],
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onBlur: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className: cn(
					"section-item-description education-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				),
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website education-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
function formatExperienceDate(dateString) {
	if (!dateString) return "";
	try {
		const date = new Date(dateString);
		return `${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
	} catch {
		return dateString;
	}
}
function ExperienceItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description) {
			if (document.activeElement !== descriptionRef.current) descriptionRef.current.innerHTML = item.description;
		}
	}, [item.description]);
	const debouncedUpdate = useMemo(
		() =>
			debounce((newValue) => {
				updateResumeData((draft) => {
					const exp = draft.sections.experience.items.find((exp$1) => exp$1.id === item.id);
					if (exp) exp.description = newValue;
				});
			}, 100),
		[updateResumeData, item.id],
	);
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description) debouncedUpdate(newValue);
	};
	const handleCompanyChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.company)
			updateResumeData((draft) => {
				const exp = draft.sections.experience.items.find((exp$1) => exp$1.id === item.id);
				if (exp) exp.company = newValue;
			});
	};
	const handlePositionChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.position)
			updateResumeData((draft) => {
				const exp = draft.sections.experience.items.find((exp$1) => exp$1.id === item.id);
				if (exp) exp.position = newValue;
			});
	};
	const handleLocationChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.location)
			updateResumeData((draft) => {
				const exp = draft.sections.experience.items.find((exp$1) => exp$1.id === item.id);
				if (exp) exp.location = newValue;
			});
	};
	const renderDescription = () => {
		if (!item.description) return null;
		const text = item.description;
		if (
			text.includes("<p>") ||
			text.includes("<ul>") ||
			text.includes("<li>") ||
			text.includes("<strong>") ||
			text.includes("<b>")
		)
			return /* @__PURE__ */ jsx("div", {
				className: "section-item-description tiptap-content",
				dangerouslySetInnerHTML: { __html: text },
			});
		const lines = text.split("\n").filter((line) => line.trim() !== "");
		if (lines.some((line) => line.trim().match(/^[*\-•]\s+/)))
			return /* @__PURE__ */ jsx("ul", {
				className: "list-disc pl-5",
				children: lines
					.map((line) => line.replace(/^[*\-•]\s+/, "").trim())
					.map((item$1, index) => /* @__PURE__ */ jsx("li", { children: item$1 }, index)),
			});
		return /* @__PURE__ */ jsx("div", {
			className: "section-item-description whitespace-pre-wrap",
			children: lines.map((paragraph, index) =>
				/* @__PURE__ */ jsx(
					"p",
					{
						className: "mb-2 last:mb-0",
						children: paragraph,
					},
					index,
				),
			),
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("experience-item group/item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header experience-item-header",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handleCompanyChange,
								className:
									"section-item-title experience-item-title cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.company,
							}),
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handleLocationChange,
								className:
									"section-item-metadata experience-item-location shrink-0 cursor-text text-end outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.location,
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								contentEditable: true,
								suppressContentEditableWarning: true,
								onBlur: handlePositionChange,
								className:
									"section-item-metadata experience-item-position cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								children: item.position,
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "section-item-metadata experience-item-period shrink-0 text-end",
								children: [
									formatExperienceDate(item.startDate),
									item.startDate && " - ",
									item.currentlyWorkingHere ? "Present" : formatExperienceDate(item.endDate),
								],
							}),
						],
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onInput: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className:
					"tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
				children: renderDescription(),
			}),
			item.website?.label &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website experience-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
function PageIcon({ icon, className, ...props }) {
	const iconContext = use(IconContext);
	if (!icon || iconContext.hidden) return null;
	const logoSuffixIcons = [
		"github",
		"linkedin",
		"facebook",
		"twitter",
		"instagram",
		"youtube",
		"whatsapp",
		"messenger",
		"telegram",
		"discord",
		"slack",
		"twitch",
		"tiktok",
		"snapchat",
		"pinterest",
		"reddit",
		"behance",
		"dribbble",
		"medium",
		"spotify",
		"google",
		"apple",
		"x",
		"threads",
		"mastodon",
	];
	const lowerIcon = (
		{
			"💼": "linkedin",
			"💻": "github",
			"🐦": "twitter",
			"🌐": "globe",
			"🔗": "link",
			"📱": "phone",
			"✉️": "envelope",
		}[icon] || icon
	).toLowerCase();
	return /* @__PURE__ */ jsx("i", {
		className: cn(
			"ph shrink-0",
			`ph-${logoSuffixIcons.includes(lowerIcon) ? `${lowerIcon}-logo` : lowerIcon}`,
			className,
		),
		style: {
			fontSize: `${iconContext.size}px`,
			color: iconContext.color,
		},
		...props,
	});
}
function InterestsItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.interests.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.name = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("interests-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header interests-item-header flex items-center gap-x-1.5",
				children: [
					/* @__PURE__ */ jsx(PageIcon, {
						icon: item.icon,
						className: "section-item-icon interests-item-icon",
					}),
					/* @__PURE__ */ jsx("strong", {
						className: "section-item-title interests-item-name",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: item.name,
							placeholder: "Interest",
							onChange: handleNameChange,
						}),
					}),
				],
			}),
			item.keywords.length > 0 &&
				/* @__PURE__ */ jsx("span", {
					className: "section-item-keywords interests-item-keywords inline-block opacity-80",
					children: item.keywords.join(", "),
				}),
		],
	});
}
function LevelDisplay({ icon, type, level, className, ...props }) {
	if (level === 0) return null;
	if (type === "hidden" || icon === "") return null;
	return /* @__PURE__ */ jsx("div", {
		role: "presentation",
		"aria-label": i18n._({
			id: "X+Tbwt",
			values: { level },
		}),
		className: cn(
			"flex items-center gap-x-1.5",
			type === "progress-bar" && "gap-x-0",
			type === "rectangle-full" && "gap-x-2",
			className,
		),
		...props,
		children: Array.from({ length: 5 }).map((_, index) => {
			const isActive = index < level;
			if (type === "progress-bar")
				return /* @__PURE__ */ jsx(
					"div",
					{
						"data-active": isActive,
						className: cn(
							"h-2.5 flex-1 border border-(--page-primary-color) border-x-0 first:border-l last:border-r",
							isActive && "bg-(--page-primary-color)",
						),
					},
					index,
				);
			if (type === "icon")
				return /* @__PURE__ */ jsx(
					PageIcon,
					{
						"data-active": isActive,
						icon,
						className: cn("h-3 overflow-visible text-(--page-primary-color)", !isActive && "opacity-40"),
					},
					index,
				);
			return /* @__PURE__ */ jsx(
				"div",
				{
					"data-active": isActive,
					className: cn(
						"size-2.5 border border-(--page-primary-color)",
						isActive && "bg-(--page-primary-color)",
						type === "circle" && "rounded-full",
						type === "rectangle" && "w-7",
						type === "rectangle-full" && "w-auto flex-1",
					),
				},
				index,
			);
		}),
	});
}
function PageLevel({ level, className, ...props }) {
	const { icon, type } = useResumeStore((state) => state.resume.data.metadata.design.level);
	return /* @__PURE__ */ jsx(LevelDisplay, {
		icon,
		type,
		level,
		className: cn("h-6", className),
		...props,
	});
}
function LanguagesItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleLanguageChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.languages.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.language = value;
		});
	};
	const handleFluencyChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.languages.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.fluency = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("languages-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header languages-item-header flex flex-col",
				children: [
					/* @__PURE__ */ jsx("strong", {
						className: "section-item-title languages-item-name",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: item.language,
							placeholder: "Language",
							onChange: handleLanguageChange,
						}),
					}),
					/* @__PURE__ */ jsx("span", {
						className: "section-item-metadata languages-item-fluency opacity-80",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: item.fluency,
							placeholder: "Fluency",
							onChange: handleFluencyChange,
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx(PageLevel, {
				level: item.level,
				className: "section-item-level languages-item-level",
			}),
		],
	});
}
function ProfilesItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleNetworkChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.profiles.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.network = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("profiles-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header profiles-item-header flex items-center gap-x-1.5",
				children: [
					/* @__PURE__ */ jsx(PageIcon, {
						icon: item.icon,
						className: "section-item-icon profiles-item-icon",
					}),
					/* @__PURE__ */ jsx("strong", {
						className: "section-item-title profiles-item-network",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: item.network,
							placeholder: "Network",
							onChange: handleNetworkChange,
						}),
					}),
				],
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx(PageLink, {
					...item.website,
					label: item.website.label || item.username,
					className: "section-item-website profiles-item-website",
				}),
		],
	});
}
function ProjectsItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description) {
			if (document.activeElement !== descriptionRef.current) descriptionRef.current.innerHTML = item.description;
		}
	}, [item.description]);
	const debouncedUpdate = useMemo(
		() =>
			debounce((newValue) => {
				updateResumeData((draft) => {
					const project = draft.sections.projects.items.find((p) => p.id === item.id);
					if (project) project.description = newValue;
				});
			}, 100),
		[updateResumeData, item.id],
	);
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description) debouncedUpdate(newValue);
	};
	const handleNameChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.name)
			updateResumeData((draft) => {
				const project = draft.sections.projects.items.find((p) => p.id === item.id);
				if (project) project.name = newValue;
			});
	};
	const handlePeriodChange = (e) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue !== item.period)
			updateResumeData((draft) => {
				const project = draft.sections.projects.items.find((p) => p.id === item.id);
				if (project) project.period = newValue;
			});
	};
	const renderDescription = () => {
		if (!item.description) return null;
		const text = item.description;
		if (
			text.includes("<p>") ||
			text.includes("<ul>") ||
			text.includes("<li>") ||
			text.includes("<strong>") ||
			text.includes("<b>")
		)
			return /* @__PURE__ */ jsx("div", {
				className: "section-item-description tiptap-content",
				dangerouslySetInnerHTML: { __html: text },
			});
		const lines = text.split("\n").filter((line) => line.trim() !== "");
		if (lines.some((line) => line.trim().match(/^[*\-•]\s+/)))
			return /* @__PURE__ */ jsx("ul", {
				className: "list-disc pl-5",
				children: lines
					.map((line) => line.replace(/^[*\-•]\s+/, "").trim())
					.map((item$1, index) => /* @__PURE__ */ jsx("li", { children: item$1 }, index)),
			});
		return /* @__PURE__ */ jsx("div", {
			className: "section-item-description whitespace-pre-wrap",
			children: lines.map((paragraph, index) =>
				/* @__PURE__ */ jsx(
					"p",
					{
						className: "mb-2 last:mb-0",
						children: paragraph,
					},
					index,
				),
			),
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("projects-item", className),
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "section-item-header projects-item-header",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							contentEditable: true,
							suppressContentEditableWarning: true,
							onBlur: handleNameChange,
							className:
								"section-item-title projects-item-title cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
							children: item.name,
						}),
						/* @__PURE__ */ jsx("span", {
							contentEditable: true,
							suppressContentEditableWarning: true,
							onBlur: handlePeriodChange,
							className:
								"section-item-metadata projects-item-period shrink-0 cursor-text text-end outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
							children: item.period,
						}),
					],
				}),
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onInput: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className:
					"tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
				children: renderDescription(),
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website projects-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
init_string();
function PublicationsItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description)
			descriptionRef.current.innerHTML = item.description;
	}, [item.description]);
	const handleTitleChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.publications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.title = value;
		});
	};
	const handleDateChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.publications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.date = value;
		});
	};
	const handlePublisherChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.publications.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.publisher = value;
		});
	};
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description)
			updateResumeData((draft) => {
				const sectionItem = draft.sections.publications.items.find((i) => i.id === item.id);
				if (sectionItem) sectionItem.description = newValue;
			});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("publications-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header publications-item-header",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("strong", {
								className: "section-item-title publications-item-title",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.title,
									placeholder: "Publication Title",
									onChange: handleTitleChange,
								}),
							}),
							/* @__PURE__ */ jsx("span", {
								className: "section-item-metadata publications-item-date shrink-0 text-end",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.date,
									placeholder: "Date",
									onChange: handleDateChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between gap-x-2",
						children: /* @__PURE__ */ jsx("span", {
							className: "section-item-metadata publications-item-publisher",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: item.publisher,
								placeholder: "Publisher",
								onChange: handlePublisherChange,
							}),
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onBlur: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className: cn(
					"section-item-description publications-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				),
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website publications-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
init_string();
function ReferencesItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description)
			descriptionRef.current.innerHTML = item.description;
	}, [item.description]);
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.references.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.name = value;
		});
	};
	const handlePositionChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.references.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.position = value;
		});
	};
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description)
			updateResumeData((draft) => {
				const sectionItem = draft.sections.references.items.find((i) => i.id === item.id);
				if (sectionItem) sectionItem.description = newValue;
			});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("references-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header references-item-header",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between gap-x-2",
						children: /* @__PURE__ */ jsx("strong", {
							className: "section-item-title references-item-name",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: item.name,
								placeholder: "Name",
								onChange: handleNameChange,
							}),
						}),
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between gap-x-2",
						children: /* @__PURE__ */ jsx("span", {
							className: "section-item-metadata references-item-position",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: item.position,
								placeholder: "Position",
								onChange: handlePositionChange,
							}),
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onBlur: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className: cn(
					"section-item-description references-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				),
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-footer references-item-footer flex flex-col",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "section-item-metadata references-item-phone inline-block",
						children: item.phone,
					}),
					!item.options?.showLinkInTitle &&
						/* @__PURE__ */ jsx(PageLink, {
							...item.website,
							label: item.website.label,
							className: "section-item-website references-item-website",
						}),
				],
			}),
		],
	});
}
function SkillsItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.skills.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.name = value;
		});
	};
	const handleProficiencyChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.skills.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.proficiency = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("skills-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header flex items-center gap-x-1.5",
				children: [
					/* @__PURE__ */ jsx(PageIcon, {
						icon: item.icon,
						className: "section-item-icon skills-item-icon",
					}),
					/* @__PURE__ */ jsx("strong", {
						className: "section-item-title skills-item-name",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: item.name,
							placeholder: "Skill Name",
							onChange: handleNameChange,
						}),
					}),
				],
			}),
			item.proficiency &&
				/* @__PURE__ */ jsx("span", {
					className: "section-item-metadata skills-item-proficiency inline-block",
					children: /* @__PURE__ */ jsx(InlineEditableText, {
						value: item.proficiency,
						placeholder: "Proficiency",
						onChange: handleProficiencyChange,
					}),
				}),
			item.keywords.length > 0 &&
				/* @__PURE__ */ jsx("span", {
					className: "section-item-keywords skills-item-keywords inline-block opacity-80",
					children: item.keywords.join(", "),
				}),
			/* @__PURE__ */ jsx(PageLevel, {
				level: item.level,
				className: "section-item-level skills-item-level",
			}),
		],
	});
}
init_string();
function SummaryItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const contentRef = useRef(null);
	useEffect(() => {
		if (contentRef.current && contentRef.current.innerHTML !== item.content) {
			if (document.activeElement !== contentRef.current) contentRef.current.innerHTML = item.content;
		}
	}, [item.content]);
	const debouncedUpdate = useMemo(
		() =>
			debounce((newValue) => {
				updateResumeData((draft) => {
					draft.summary.content = newValue;
				});
			}, 100),
		[updateResumeData],
	);
	const handleContentChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.content) debouncedUpdate(newValue);
	};
	if (!stripHtml(item.content)) return null;
	return /* @__PURE__ */ jsx("div", {
		ref: contentRef,
		className: cn(
			"summary-item tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
			className,
		),
		contentEditable: true,
		suppressContentEditableWarning: true,
		onInput: handleContentChange,
		onClick: handleContentEditableLinkClick,
	});
}
init_string();
function VolunteerItem({ className, ...item }) {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const descriptionRef = useRef(null);
	useEffect(() => {
		if (descriptionRef.current && descriptionRef.current.innerHTML !== item.description)
			descriptionRef.current.innerHTML = item.description;
	}, [item.description]);
	const handleOrganizationChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.organization = value;
		});
	};
	const handlePeriodChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.period = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
			if (sectionItem) sectionItem.location = value;
		});
	};
	const handleDescriptionChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== item.description)
			updateResumeData((draft) => {
				const sectionItem = draft.sections.volunteer.items.find((i) => i.id === item.id);
				if (sectionItem) sectionItem.description = newValue;
			});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("volunteer-item", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-item-header volunteer-item-header",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-x-2",
						children: [
							/* @__PURE__ */ jsx("strong", {
								className: "section-item-title volunteer-item-title",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.organization,
									placeholder: "Organization",
									onChange: handleOrganizationChange,
								}),
							}),
							/* @__PURE__ */ jsx("span", {
								className: "section-item-metadata volunteer-item-period shrink-0 text-end",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: item.period,
									placeholder: "Period",
									onChange: handlePeriodChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between gap-x-2",
						children: /* @__PURE__ */ jsx("span", {
							className: "section-item-metadata volunteer-item-location",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: item.location,
								placeholder: "Location",
								onChange: handleLocationChange,
							}),
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				ref: descriptionRef,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onBlur: handleDescriptionChange,
				onClick: handleContentEditableLinkClick,
				className: cn(
					"section-item-description volunteer-item-description tiptap-content cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					!stripHtml(item.description) && "hidden",
				),
			}),
			!item.options?.showLinkInTitle &&
				/* @__PURE__ */ jsx("div", {
					className: "section-item-website volunteer-item-website",
					children: /* @__PURE__ */ jsx(PageLink, {
						...item.website,
						label: item.website.label,
					}),
				}),
		],
	});
}
function PageSection({ type, className, children, visibleItemIds }) {
	const section = useResumeStore((state) => state.resume.data.sections[type]);
	const items = section.items.filter((item) => {
		if (item.hidden) return false;
		if (visibleItemIds && !visibleItemIds.includes(item.id)) return false;
		return true;
	});
	if (section.hidden) return null;
	if (items.length === 0) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: cn(`page-section page-section-${type}`, className),
		children: [
			/* @__PURE__ */ jsx("h6", {
				className: "mb-1.5 text-(--page-primary-color)",
				children: section.title || getSectionTitle(type),
			}),
			/* @__PURE__ */ jsx("div", {
				className: "section-content grid gap-x-(--page-gap-x) gap-y-(--page-gap-y)",
				style: { gridTemplateColumns: `repeat(${section.columns}, 1fr)` },
				children: items.map((item) =>
					/* @__PURE__ */ jsx(
						"div",
						{
							"data-item-id": item.id,
							className: cn(`section-item section-item-${type} print:break-inside-avoid`),
							children: children(item),
						},
						item.id,
					),
				),
			}),
		],
	});
}
init_string();
function PageSummary({ className }) {
	const section = useResumeStore((state) => state.resume.data.summary);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const contentRef = useRef(null);
	useEffect(() => {
		if (contentRef.current && contentRef.current.innerHTML !== section.content) {
			if (document.activeElement !== contentRef.current) contentRef.current.innerHTML = section.content;
		}
	}, [section.content]);
	const debouncedUpdate = useMemo(
		() =>
			debounce((newValue) => {
				updateResumeData((draft) => {
					draft.summary.content = newValue;
				});
			}, 100),
		[updateResumeData],
	);
	const handleContentChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== section.content) debouncedUpdate(newValue);
	};
	return /* @__PURE__ */ jsxs("section", {
		className: cn(
			"page-section page-section-summary",
			section.hidden && "hidden",
			!stripHtml(section.content) && "hidden",
			className,
		),
		children: [
			/* @__PURE__ */ jsx("h6", {
				className: "mb-1.5 text-(--page-primary-color)",
				children: section.title || getSectionTitle("summary"),
			}),
			/* @__PURE__ */ jsx("div", {
				className: "section-content",
				children: /* @__PURE__ */ jsx("div", {
					ref: contentRef,
					contentEditable: true,
					suppressContentEditableWarning: true,
					onInput: handleContentChange,
					onClick: handleContentEditableLinkClick,
					className: "cursor-text outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
					style: { columnCount: section.columns },
				}),
			}),
		],
	});
}
function renderItemByType(type, item, itemClassName) {
	return match(type)
		.with("summary", () =>
			/* @__PURE__ */ jsx(SummaryItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("profiles", () =>
			/* @__PURE__ */ jsx(ProfilesItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("experience", () =>
			/* @__PURE__ */ jsx(ExperienceItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("education", () =>
			/* @__PURE__ */ jsx(EducationItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("projects", () =>
			/* @__PURE__ */ jsx(ProjectsItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("skills", () =>
			/* @__PURE__ */ jsx(SkillsItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("languages", () =>
			/* @__PURE__ */ jsx(LanguagesItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("interests", () =>
			/* @__PURE__ */ jsx(InterestsItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("awards", () =>
			/* @__PURE__ */ jsx(AwardsItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("certifications", () =>
			/* @__PURE__ */ jsx(CertificationsItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("publications", () =>
			/* @__PURE__ */ jsx(PublicationsItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("volunteer", () =>
			/* @__PURE__ */ jsx(VolunteerItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("references", () =>
			/* @__PURE__ */ jsx(ReferencesItem, {
				...item,
				className: itemClassName,
			}),
		)
		.with("cover-letter", () =>
			/* @__PURE__ */ jsx(CoverLetterItem, {
				...item,
				className: itemClassName,
			}),
		)
		.exhaustive();
}
const SummarySection = ({ sectionClassName: sectionClassName$13 }) =>
	/* @__PURE__ */ jsx(PageSummary, { className: sectionClassName$13 });
const ProfilesSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "profiles",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(ProfilesItem, {
				...item,
				className: itemClassName,
			}),
	});
const ExperienceSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "experience",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(ExperienceItem, {
				...item,
				className: itemClassName,
			}),
	});
const EducationSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "education",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(EducationItem, {
				...item,
				className: itemClassName,
			}),
	});
const ProjectsSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "projects",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(ProjectsItem, {
				...item,
				className: itemClassName,
			}),
	});
const SkillsSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "skills",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(SkillsItem, {
				...item,
				className: itemClassName,
			}),
	});
const LanguagesSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "languages",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(LanguagesItem, {
				...item,
				className: itemClassName,
			}),
	});
const InterestsSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "interests",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(InterestsItem, {
				...item,
				className: itemClassName,
			}),
	});
const AwardsSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "awards",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(AwardsItem, {
				...item,
				className: itemClassName,
			}),
	});
const CertificationsSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "certifications",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(CertificationsItem, {
				...item,
				className: itemClassName,
			}),
	});
const PublicationsSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "publications",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(PublicationsItem, {
				...item,
				className: itemClassName,
			}),
	});
const VolunteerSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "volunteer",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(VolunteerItem, {
				...item,
				className: itemClassName,
			}),
	});
const ReferencesSection = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) =>
	/* @__PURE__ */ jsx(PageSection, {
		type: "references",
		className: sectionClassName$13,
		visibleItemIds,
		children: (item) =>
			/* @__PURE__ */ jsx(ReferencesItem, {
				...item,
				className: itemClassName,
			}),
	});
const CustomSectionComponent = ({ id, sectionClassName: sectionClassName$13, itemClassName, visibleItemIds }) => {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const customSection = useResumeStore((state) => state.resume.data.customSections.find((s) => s.id === id));
	if (!customSection) return null;
	if (customSection.hidden) return null;
	if (customSection.items.length === 0) return null;
	const visibleItems = customSection.items.filter((item) => {
		if (item.hidden) return false;
		if (visibleItemIds && !visibleItemIds.includes(item.id)) return false;
		return true;
	});
	if (visibleItems.length === 0) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: cn(`page-section page-section-custom page-section-${id}`, sectionClassName$13),
		children: [
			customSection.type !== "summary" &&
				customSection.type !== "cover-letter" &&
				/* @__PURE__ */ jsx("h6", {
					className: "mb-1.5 text-(--page-primary-color)",
					children: /* @__PURE__ */ jsx(InlineEditableText, {
						value: customSection.title,
						placeholder: "Section Title",
						onChange: (value) => {
							updateResumeData((draft) => {
								const section = draft.customSections.find((s) => s.id === id);
								if (section) section.title = value;
							});
						},
					}),
				}),
			/* @__PURE__ */ jsx("div", {
				className: "section-content grid gap-x-(--page-gap-x) gap-y-(--page-gap-y)",
				style: { gridTemplateColumns: `repeat(${customSection.columns}, 1fr)` },
				children: visibleItems.map((item) =>
					/* @__PURE__ */ jsx(
						"div",
						{
							className: cn(`section-item section-item-${customSection.type} print:break-inside-avoid`),
							children: renderItemByType(customSection.type, item, itemClassName),
						},
						item.id,
					),
				),
			}),
		],
	});
};
const Section = ({
	type,
	id,
	sectionClassName: sectionClassName$13,
	itemClassName,
	visibleItemIds: explicitVisibleItemIds,
}) => {
	const Component = getSectionComponent(type);
	const { pageIndex, itemDistribution } = useContext(ResumePageContext);
	return /* @__PURE__ */ jsx(Component, {
		id,
		sectionClassName: sectionClassName$13,
		itemClassName,
		visibleItemIds: explicitVisibleItemIds || (itemDistribution ? itemDistribution[id]?.[pageIndex] : void 0),
	});
};
function getSectionComponent(section) {
	return match(section)
		.with("summary", () => SummarySection)
		.with("profiles", () => ProfilesSection)
		.with("experience", () => ExperienceSection)
		.with("education", () => EducationSection)
		.with("projects", () => ProjectsSection)
		.with("skills", () => SkillsSection)
		.with("languages", () => LanguagesSection)
		.with("interests", () => InterestsSection)
		.with("awards", () => AwardsSection)
		.with("certifications", () => CertificationsSection)
		.with("publications", () => PublicationsSection)
		.with("volunteer", () => VolunteerSection)
		.with("references", () => ReferencesSection)
		.otherwise(() => CustomSectionComponent);
}
function PagePicture({ className, style }) {
	const name = useResumeStore((state) => state.resume.data.basics.name);
	const picture = useResumeStore((state) => state.resume.data.picture);
	if (picture.url === "") return null;
	return /* @__PURE__ */ jsx("div", {
		className: cn("page-picture shrink-0 overflow-hidden", picture.hidden && "hidden", className),
		style: {
			maxWidth: `${picture.size}pt`,
			maxHeight: `${picture.size}pt`,
			aspectRatio: picture.aspectRatio,
			borderRadius: `${picture.borderRadius}%`,
			border: picture.borderWidth > 0 ? `${picture.borderWidth}pt solid ${picture.borderColor}` : "none",
			boxShadow: picture.shadowWidth > 0 ? `0 0 ${picture.shadowWidth}pt 0 ${picture.shadowColor}` : "none",
			...style,
		},
		children: /* @__PURE__ */ jsx("img", {
			alt: name,
			src: picture.url,
			className: "size-full object-cover",
			style: { transform: `rotate(${picture.rotation}deg)` },
		}),
	});
}
var sectionClassName$12 = cn(
	"group-data-[layout=sidebar]:[&>h6]:px-4",
	"group-data-[layout=sidebar]:[&>h6]:relative",
	"group-data-[layout=sidebar]:[&>h6]:inline-flex",
	"group-data-[layout=sidebar]:[&>h6]:items-center",
	"group-data-[layout=sidebar]:[&>h6]:before:content-['']",
	"group-data-[layout=sidebar]:[&>h6]:before:absolute",
	"group-data-[layout=sidebar]:[&>h6]:before:left-0",
	"group-data-[layout=sidebar]:[&>h6]:before:rounded-full",
	"group-data-[layout=sidebar]:[&>h6]:before:size-2",
	"group-data-[layout=sidebar]:[&>h6]:before:border",
	"group-data-[layout=sidebar]:[&>h6]:before:border-(--page-primary-color)",
	"group-data-[layout=sidebar]:[&>h6]:after:content-['']",
	"group-data-[layout=sidebar]:[&>h6]:after:absolute",
	"group-data-[layout=sidebar]:[&>h6]:after:right-0",
	"group-data-[layout=sidebar]:[&>h6]:after:rounded-full",
	"group-data-[layout=sidebar]:[&>h6]:after:size-2",
	"group-data-[layout=sidebar]:[&>h6]:after:border",
	"group-data-[layout=sidebar]:[&>h6]:after:border-(--page-primary-color)",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
	"group-data-[layout=main]:[&>.section-content]:relative",
	"group-data-[layout=main]:[&>.section-content]:ml-4",
	"group-data-[layout=main]:[&>.section-content]:pl-4",
	"group-data-[layout=main]:[&>.section-content]:border-l",
	"group-data-[layout=main]:[&>.section-content]:border-(--page-primary-color)",
	"group-data-[layout=main]:[&>.section-content]:after:content-['']",
	"group-data-[layout=main]:[&>.section-content]:after:absolute",
	"group-data-[layout=main]:[&>.section-content]:after:top-5",
	"group-data-[layout=main]:[&>.section-content]:after:left-0",
	"group-data-[layout=main]:[&>.section-content]:after:size-2.5",
	"group-data-[layout=main]:[&>.section-content]:after:translate-x-[-50%]",
	"group-data-[layout=main]:[&>.section-content]:after:translate-y-[-50%]",
	"group-data-[layout=main]:[&>.section-content]:after:rounded-full",
	"group-data-[layout=main]:[&>.section-content]:after:border",
	"group-data-[layout=main]:[&>.section-content]:after:border-(--page-primary-color)",
	"group-data-[layout=main]:[&>.section-content]:after:bg-(--page-background-color)",
);
function AzurillTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-azurill page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y)",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$12, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-x-(--page-gap-x)",
				children: [
					!fullWidth &&
						/* @__PURE__ */ jsx("aside", {
							"data-layout": "sidebar",
							className:
								"group page-sidebar w-(--page-sidebar-width) shrink-0 space-y-(--page-gap-y) overflow-x-hidden",
							children: sidebar.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$12,
									},
									section,
								),
							),
						}),
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: "group page-main grow space-y-(--page-gap-y)",
						children: main.map((section) =>
							/* @__PURE__ */ jsx(
								Section,
								{
									type: section,
									id: section,
									sectionClassName: sectionClassName$12,
								},
								section,
							),
						),
					}),
				],
			}),
		],
	});
}
function Header$12() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: "page-header flex flex-col items-center gap-y-(--page-gap-y)",
		children: [
			/* @__PURE__ */ jsx(PagePicture, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-basics space-y-(--page-gap-y) text-center",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "basics-header",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "basics-name",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.name,
									placeholder: "Your Name",
									onChange: handleNameChange,
								}),
							}),
							/* @__PURE__ */ jsx("p", {
								className: "basics-headline",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.headline,
									placeholder: "Your Professional Title",
									onChange: handleHeadlineChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-items flex flex-wrap justify-center gap-x-3 gap-y-1 *:flex *:items-center *:gap-x-1.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email break-anywhere min-w-0",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
		],
	});
}
var sectionClassName$11 = cn(
	"grid grid-cols-5 border-(--page-primary-color) border-t pt-1",
	"[&>.section-content]:col-span-4",
);
function BronzorTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-bronzor page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y)",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$11, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-(--page-gap-y)",
				children: [
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: "group page-main space-y-(--page-gap-y)",
						children: main.map((section) =>
							/* @__PURE__ */ jsx(
								Section,
								{
									type: section,
									id: section,
									sectionClassName: sectionClassName$11,
								},
								section,
							),
						),
					}),
					!fullWidth &&
						/* @__PURE__ */ jsx("aside", {
							"data-layout": "sidebar",
							className: "group page-sidebar space-y-(--page-gap-y)",
							children: sidebar.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$11,
									},
									section,
								),
							),
						}),
				],
			}),
		],
	});
}
function Header$11() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: "page-header flex flex-col items-center gap-y-2",
		children: [
			/* @__PURE__ */ jsx(PagePicture, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-basics space-y-2 text-center",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "basics-header",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "basics-name",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.name,
									placeholder: "Your Name",
									onChange: handleNameChange,
								}),
							}),
							/* @__PURE__ */ jsx("p", {
								className: "basics-headline",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.headline,
									placeholder: "Your Professional Title",
									onChange: handleHeadlineChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className:
							"basics-items flex flex-wrap justify-center gap-x-3 gap-y-1 text-center *:flex *:items-center *:gap-x-1.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email break-anywhere min-w-0",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
		],
	});
}
var sectionClassName$10 = cn(
	"[&>h6]:border-(--page-primary-color) [&>h6]:border-b",
	"group-data-[layout=sidebar]:[&>h6]:text-(--page-background-color)",
	"group-data-[layout=sidebar]:[&>h6]:border-(--page-background-color)",
	"group-data-[layout=sidebar]:[&_.section-item_i]:text-(--page-background-color)!",
	"group-data-[layout=sidebar]:[&_.section-item-level_div]:border-(--page-background-color)",
	"group-data-[layout=sidebar]:[&_.section-item-level_div[data-active=true]]:bg-(--page-background-color)",
	"group-data-[layout=sidebar]:[&_.section-item-level_i[data-active=true]]:text-(--page-background-color)!",
	"group-data-[layout=sidebar]:[&_.section-item-level_i[data-active=false]]:opacity-40",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
);
function ChikoritaTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-chikorita page-content",
		children: [
			!fullWidth &&
				/* @__PURE__ */ jsx("div", {
					className:
						"page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color) ltr:end-0 rtl:start-0",
				}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [
					/* @__PURE__ */ jsxs("main", {
						"data-layout": "main",
						className: "group page-main z-10 flex-1 space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
						children: [
							isFirstPage && /* @__PURE__ */ jsx(Header$10, {}),
							main.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$10,
									},
									section,
								),
							),
						],
					}),
					!fullWidth &&
						/* @__PURE__ */ jsx("aside", {
							"data-layout": "sidebar",
							className:
								"group page-sidebar z-10 w-(--page-sidebar-width) shrink-0 space-y-4 overflow-x-hidden px-(--page-margin-x) pt-(--page-margin-y) text-(--page-background-color)",
							children: sidebar.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$10,
									},
									section,
								),
							),
						}),
				],
			}),
		],
	});
}
function Header$10() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsx("div", {
		"data-section-id": "header",
		className: "page-header relative flex",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 items-start",
			children: [
				/* @__PURE__ */ jsx(PagePicture, {}),
				/* @__PURE__ */ jsxs("div", {
					className: "page-basics space-y-2 ps-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "basics-name",
									children: /* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.name,
										placeholder: "Your Name",
										onChange: handleNameChange,
									}),
								}),
								/* @__PURE__ */ jsx("p", {
									className: "basics-headline",
									children: /* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.headline,
										placeholder: "Your Professional Title",
										onChange: handleHeadlineChange,
									}),
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-email break-anywhere min-w-0",
									children: [
										/* @__PURE__ */ jsx(EnvelopeIcon, {}),
										/* @__PURE__ */ jsx(InlineEditableText, {
											as: "a",
											href: basics.email ? `mailto:${basics.email}` : void 0,
											value: basics.email,
											placeholder: "email@domain.com",
											onChange: handleEmailChange,
										}),
									],
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-phone",
									children: [
										/* @__PURE__ */ jsx(PhoneIcon, {}),
										/* @__PURE__ */ jsx(InlineEditableText, {
											as: "a",
											href: basics.phone ? `tel:${basics.phone}` : void 0,
											value: basics.phone,
											placeholder: "+91 98765 43210",
											onChange: handlePhoneChange,
										}),
									],
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-location",
									children: [
										/* @__PURE__ */ jsx(MapPinIcon, {}),
										/* @__PURE__ */ jsx(InlineEditableText, {
											value: basics.location,
											placeholder: "City, Country",
											onChange: handleLocationChange,
										}),
									],
								}),
								basics.website.url &&
									/* @__PURE__ */ jsxs("div", {
										className: "basics-item-website",
										children: [
											/* @__PURE__ */ jsx(GlobeIcon, {}),
											/* @__PURE__ */ jsx(PageLink, { ...basics.website }),
										],
									}),
								basics.customFields.map((field) =>
									/* @__PURE__ */ jsxs(
										"div",
										{
											className: "basics-item-custom",
											children: [
												/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
												field.link
													? /* @__PURE__ */ jsx(PageLink, {
															url: field.link,
															label: field.text,
														})
													: /* @__PURE__ */ jsx("span", { children: field.text }),
											],
										},
										field.id,
									),
								),
							],
						}),
					],
				}),
			],
		}),
	});
}
var sectionClassName$9 = cn(
	"[&>h6]:border-(--page-primary-color) [&>h6]:border-b",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
	"group-data-[layout=main]:[&_.section-item-header]:ps-2",
	"group-data-[layout=main]:[&_.section-item-header]:py-0.5",
	"group-data-[layout=main]:[&_.section-item-header]:-ms-2.5",
	"group-data-[layout=main]:[&_.section-item-header]:border-s-2",
	"group-data-[layout=main]:[&_.section-item-header]:border-(--page-primary-color)",
);
function DitgarTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-ditgar page-content",
		children: [
			(!fullWidth || isFirstPage) &&
				/* @__PURE__ */ jsx("div", {
					className:
						"page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0",
				}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [
					(!fullWidth || isFirstPage) &&
						/* @__PURE__ */ jsxs("aside", {
							"data-layout": "sidebar",
							className: "sidebar group z-10 flex w-(--page-sidebar-width) shrink-0 flex-col",
							children: [
								isFirstPage && /* @__PURE__ */ jsx(Header$9, {}),
								/* @__PURE__ */ jsx("div", {
									className: "flex-1 space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
									children: sidebar.map((section) =>
										/* @__PURE__ */ jsx(
											Section,
											{
												type: section,
												id: section,
												sectionClassName: sectionClassName$9,
											},
											section,
										),
									),
								}),
							],
						}),
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: cn("main group z-10", !fullWidth ? "col-span-2" : "col-span-3"),
						children: /* @__PURE__ */ jsx("div", {
							className: "space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
							children: main.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$9,
									},
									section,
								),
							),
						}),
					}),
				],
			}),
		],
	});
}
function Header$9() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className:
			"page-header space-y-4 bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)",
		children: [
			/* @__PURE__ */ jsx(PagePicture, {}),
			/* @__PURE__ */ jsxs("div", {
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-bold text-2xl",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: basics.name,
							placeholder: "Your Name",
							onChange: handleNameChange,
						}),
					}),
					/* @__PURE__ */ jsx("p", {
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: basics.headline,
							placeholder: "Your Professional Title",
							onChange: handleHeadlineChange,
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-start gap-y-2 text-sm [&>div>i]:text-(--page-background-color)!",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "basics-item-location flex items-center gap-x-1.5",
						children: [
							/* @__PURE__ */ jsx(PageIcon, {
								icon: "map-pin",
								className: "ph-bold",
							}),
							/* @__PURE__ */ jsx(InlineEditableText, {
								value: basics.location,
								placeholder: "City, Country",
								onChange: handleLocationChange,
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-item-phone flex items-center gap-x-1.5",
						children: [
							/* @__PURE__ */ jsx(PageIcon, {
								icon: "phone",
								className: "ph-bold",
							}),
							/* @__PURE__ */ jsx(InlineEditableText, {
								as: "a",
								href: basics.phone ? `tel:${basics.phone}` : void 0,
								value: basics.phone,
								placeholder: "+91 98765 43210",
								onChange: handlePhoneChange,
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-item-email break-anywhere flex min-w-0 items-center gap-x-1.5",
						children: [
							/* @__PURE__ */ jsx(PageIcon, {
								icon: "envelope",
								className: "ph-bold",
							}),
							/* @__PURE__ */ jsx(InlineEditableText, {
								as: "a",
								href: basics.email ? `mailto:${basics.email}` : void 0,
								value: basics.email,
								placeholder: "email@domain.com",
								onChange: handleEmailChange,
							}),
						],
					}),
					basics.website.url &&
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-website flex items-center gap-x-1.5",
							children: [
								/* @__PURE__ */ jsx(PageIcon, {
									icon: "globe",
									className: "ph-bold",
								}),
								/* @__PURE__ */ jsx(PageLink, { ...basics.website }),
							],
						}),
					basics.customFields.map((field) =>
						/* @__PURE__ */ jsxs(
							"div",
							{
								className: "basics-item-custom flex items-center gap-x-1.5",
								children: [
									/* @__PURE__ */ jsx(PageIcon, {
										icon: field.icon,
										className: "ph-bold",
									}),
									field.link
										? /* @__PURE__ */ jsx(PageLink, {
												url: field.link,
												label: field.text,
											})
										: /* @__PURE__ */ jsx("span", { children: field.text }),
								],
							},
							field.id,
						),
					),
				],
			}),
		],
	});
}
var sectionClassName$8 = cn(
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
);
function DittoTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-ditto page-content",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$8, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex pt-(--page-margin-y)",
				children: [
					!fullWidth &&
						/* @__PURE__ */ jsx("aside", {
							"data-layout": "sidebar",
							className:
								"group page-sidebar w-(--page-sidebar-width) shrink-0 space-y-4 overflow-x-hidden ps-(--page-margin-x)",
							children: sidebar.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$8,
									},
									section,
								),
							),
						}),
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: "group page-main space-y-4 px-(--page-margin-x)",
						children: main.map((section) =>
							/* @__PURE__ */ jsx(
								Section,
								{
									type: section,
									id: section,
									sectionClassName: sectionClassName$8,
								},
								section,
							),
						),
					}),
				],
			}),
		],
	});
}
function Header$8() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "page-header relative",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "page-basics bg-(--page-primary-color) text-(--page-background-color)",
				children: /* @__PURE__ */ jsxs("div", {
					"data-section-id": "header",
					className: "basics-header flex items-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex w-(--page-sidebar-width) shrink-0 justify-center ps-(--page-margin-x)",
							children: /* @__PURE__ */ jsx(PagePicture, { className: "absolute top-8" }),
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-(--page-margin-x) py-(--page-margin-y)",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "basics-name",
									children: /* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.name,
										placeholder: "Your Name",
										onChange: handleNameChange,
									}),
								}),
								/* @__PURE__ */ jsx("p", {
									className: "basics-headline",
									children: /* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.headline,
										placeholder: "Your Professional Title",
										onChange: handleHeadlineChange,
									}),
								}),
							],
						}),
					],
				}),
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center",
				children: [
					/* @__PURE__ */ jsx("div", { className: "w-(--page-sidebar-width) shrink-0" }),
					/* @__PURE__ */ jsxs("div", {
						className:
							"basics-items flex flex-wrap gap-x-3 gap-y-1 px-(--page-margin-x) pt-3 *:flex *:items-center *:gap-x-1.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
		],
	});
}
var sectionClassName$7 = cn(
	"[&>h6]:border-(--page-primary-color) [&>h6]:border-b",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
);
function GengarTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-gengar page-content",
		children: [
			(!fullWidth || isFirstPage) &&
				/* @__PURE__ */ jsx("div", {
					className:
						"page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0",
				}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [
					(!fullWidth || isFirstPage) &&
						/* @__PURE__ */ jsxs("aside", {
							"data-layout": "sidebar",
							className: "group page-sidebar z-10 flex w-(--page-sidebar-width) shrink-0 flex-col",
							children: [
								isFirstPage && /* @__PURE__ */ jsx(Header$7, {}),
								!fullWidth &&
									/* @__PURE__ */ jsx("div", {
										className: "shrink-0 space-y-4 overflow-x-hidden px-(--page-margin-x) pt-(--page-margin-y)",
										children: sidebar.map((section) =>
											/* @__PURE__ */ jsx(
												Section,
												{
													type: section,
													id: section,
													sectionClassName: sectionClassName$7,
												},
												section,
											),
										),
									}),
							],
						}),
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: "group page-main z-10",
						children: /* @__PURE__ */ jsx("div", {
							className: "space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
							children: main.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$7,
									},
									section,
								),
							),
						}),
					}),
				],
			}),
		],
	});
}
function Header$7() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: "page-header relative flex",
		children: /* @__PURE__ */ jsxs("div", {
			"data-section-id": "header",
			className:
				"flex w-full shrink-0 flex-col justify-center gap-y-2 bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)",
			children: [
				/* @__PURE__ */ jsx(PagePicture, {}),
				/* @__PURE__ */ jsxs("div", {
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "basics-name",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: basics.name,
								placeholder: "Your Name",
								onChange: handleNameChange,
							}),
						}),
						/* @__PURE__ */ jsx("p", {
							className: "basics-headline",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: basics.headline,
								placeholder: "Your Professional Title",
								onChange: handleHeadlineChange,
							}),
						}),
					],
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "basics-items flex flex-col gap-y-1 *:flex *:items-center *:gap-x-1.5",
					style: { "--page-primary-color": "var(--page-background-color)" },
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-email break-anywhere min-w-0",
							children: [
								/* @__PURE__ */ jsx(PageIcon, { icon: "envelope" }),
								/* @__PURE__ */ jsx(InlineEditableText, {
									as: "a",
									href: basics.email ? `mailto:${basics.email}` : void 0,
									value: basics.email,
									placeholder: "email@domain.com",
									onChange: handleEmailChange,
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-phone",
							children: [
								/* @__PURE__ */ jsx(PageIcon, { icon: "phone" }),
								/* @__PURE__ */ jsx(InlineEditableText, {
									as: "a",
									href: basics.phone ? `tel:${basics.phone}` : void 0,
									value: basics.phone,
									placeholder: "+91 98765 43210",
									onChange: handlePhoneChange,
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-location",
							children: [
								/* @__PURE__ */ jsx(PageIcon, { icon: "map-pin" }),
								/* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.location,
									placeholder: "City, Country",
									onChange: handleLocationChange,
								}),
							],
						}),
						basics.website.url &&
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-website",
								children: [
									/* @__PURE__ */ jsx(PageIcon, { icon: "globe" }),
									/* @__PURE__ */ jsx(PageLink, { ...basics.website }),
								],
							}),
						basics.customFields.map((field) =>
							/* @__PURE__ */ jsxs(
								"div",
								{
									className: "basics-item-custom",
									children: [
										/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
										field.link
											? /* @__PURE__ */ jsx(PageLink, {
													url: field.link,
													label: field.text,
												})
											: /* @__PURE__ */ jsx("span", { children: field.text }),
									],
								},
								field.id,
							),
						),
					],
				}),
			],
		}),
	});
}
var sectionClassName$6 = cn(
	"[&>h6]:border-(--page-primary-color) [&>h6]:border-b",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
);
function GlalieTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-glalie page-content",
		children: [
			(!fullWidth || isFirstPage) &&
				/* @__PURE__ */ jsx("div", {
					className:
						"page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0",
				}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [
					(!fullWidth || isFirstPage) &&
						/* @__PURE__ */ jsxs("aside", {
							"data-layout": "sidebar",
							className:
								"group page-sidebar z-10 flex w-(--page-sidebar-width) shrink-0 flex-col space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
							children: [
								isFirstPage && /* @__PURE__ */ jsx(Header$6, {}),
								!fullWidth &&
									/* @__PURE__ */ jsx("div", {
										className: "shrink-0 space-y-4 overflow-x-hidden",
										children: sidebar.map((section) =>
											/* @__PURE__ */ jsx(
												Section,
												{
													type: section,
													id: section,
													sectionClassName: sectionClassName$6,
												},
												section,
											),
										),
									}),
							],
						}),
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: "group page-main z-10",
						children: /* @__PURE__ */ jsx("div", {
							className: "space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
							children: main.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$6,
									},
									section,
								),
							),
						}),
					}),
				],
			}),
		],
	});
}
function Header$6() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsx("div", {
		"data-section-id": "header",
		className: "page-header relative flex",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex w-full shrink-0 flex-col items-center justify-center gap-y-3",
			children: [
				/* @__PURE__ */ jsx(PagePicture, {}),
				/* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "basics-name",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: basics.name,
								placeholder: "Your Name",
								onChange: handleNameChange,
							}),
						}),
						/* @__PURE__ */ jsx("p", {
							className: "basics-headline",
							children: /* @__PURE__ */ jsx(InlineEditableText, {
								value: basics.headline,
								placeholder: "Your Professional Title",
								onChange: handleHeadlineChange,
							}),
						}),
					],
				}),
				/* @__PURE__ */ jsxs("div", {
					style: { "--box-radius": "calc(var(--picture-border-radius) / 4)" },
					className:
						"basics-items flex w-full flex-col gap-y-1 rounded-(--box-radius) border border-(--page-primary-color) p-3 *:flex *:items-center *:gap-x-1.5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-email break-anywhere min-w-0",
							children: [
								/* @__PURE__ */ jsx(EnvelopeIcon, {}),
								/* @__PURE__ */ jsx(InlineEditableText, {
									as: "a",
									href: basics.email ? `mailto:${basics.email}` : void 0,
									value: basics.email,
									placeholder: "email@domain.com",
									onChange: handleEmailChange,
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-phone",
							children: [
								/* @__PURE__ */ jsx(PhoneIcon, {}),
								/* @__PURE__ */ jsx(InlineEditableText, {
									as: "a",
									href: basics.phone ? `tel:${basics.phone}` : void 0,
									value: basics.phone,
									placeholder: "+91 98765 43210",
									onChange: handlePhoneChange,
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-location",
							children: [
								/* @__PURE__ */ jsx(MapPinIcon, {}),
								/* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.location,
									placeholder: "City, Country",
									onChange: handleLocationChange,
								}),
							],
						}),
						basics.website.url &&
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-website",
								children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
							}),
						basics.customFields.map((field) =>
							/* @__PURE__ */ jsxs(
								"div",
								{
									className: "basics-item-custom",
									children: [
										/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
										field.link
											? /* @__PURE__ */ jsx(PageLink, {
													url: field.link,
													label: field.text,
												})
											: /* @__PURE__ */ jsx("span", { children: field.text }),
									],
								},
								field.id,
							),
						),
					],
				}),
			],
		}),
	});
}
var sectionClassName$5 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b [&>h6]:pb-0.5 [&>h6]:text-center");
function KakunaTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-kakuna page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y)",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$5, {}),
			/* @__PURE__ */ jsx("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) =>
					/* @__PURE__ */ jsx(
						Section,
						{
							type: section,
							id: section,
							sectionClassName: sectionClassName$5,
						},
						section,
					),
				),
			}),
			!fullWidth &&
				/* @__PURE__ */ jsx("aside", {
					"data-layout": "sidebar",
					className: "group page-sidebar space-y-(--page-gap-y)",
					children: sidebar.map((section) =>
						/* @__PURE__ */ jsx(
							Section,
							{
								type: section,
								id: section,
								sectionClassName: sectionClassName$5,
							},
							section,
						),
					),
				}),
		],
	});
}
function Header$5() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: "page-header flex flex-col items-center gap-y-(--page-gap-y)",
		children: [
			/* @__PURE__ */ jsx(PagePicture, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-basics space-y-(--page-gap-y) text-center",
				children: [
					/* @__PURE__ */ jsxs("div", {
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "basics-name",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.name,
									placeholder: "Your Name",
									onChange: handleNameChange,
								}),
							}),
							/* @__PURE__ */ jsx("p", {
								className: "basics-headline",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.headline,
									placeholder: "Your Professional Title",
									onChange: handleHeadlineChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-items flex flex-wrap justify-center gap-x-3 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email break-anywhere min-w-0",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
		],
	});
}
var sectionClassName$4 = cn(
	"rounded-(--container-border-radius) border border-(--page-text-color)/10 bg-(--page-background-color) p-4",
	"[&>h6]:-mt-(--heading-negative-margin) [&>h6]:max-w-fit [&>h6]:bg-(--page-background-color) [&>h6]:px-4",
);
function LaprasTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	const containerBorderRadius = useResumeStore((state) => Math.min(state.resume.data.picture.borderRadius, 30));
	const headingNegativeMargin = useResumeStore((state) => state.resume.data.metadata.typography.heading.fontSize + 6);
	return /* @__PURE__ */ jsxs("div", {
		style: useMemo(() => {
			return {
				"--container-border-radius": `${containerBorderRadius}pt`,
				"--heading-negative-margin": `${headingNegativeMargin}pt`,
			};
		}, [containerBorderRadius, headingNegativeMargin]),
		className: "template-lapras page-content space-y-6 px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$4, {}),
			/* @__PURE__ */ jsx("main", {
				"data-layout": "main",
				className: "group page-main space-y-6",
				children: main.map((section) =>
					/* @__PURE__ */ jsx(
						Section,
						{
							type: section,
							id: section,
							sectionClassName: sectionClassName$4,
						},
						section,
					),
				),
			}),
			!fullWidth &&
				/* @__PURE__ */ jsx("aside", {
					"data-layout": "sidebar",
					className: "group page-sidebar space-y-6",
					children: sidebar.map((section) =>
						/* @__PURE__ */ jsx(
							Section,
							{
								type: section,
								id: section,
								sectionClassName: sectionClassName$4,
							},
							section,
						),
					),
				}),
		],
	});
}
function Header$4() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: cn(
			"page-header flex items-center gap-x-(--page-gap-x)",
			"rounded-(--picture-border-radius) border border-(--page-text-color)/10 bg-(--page-background-color) p-4",
		),
		children: [
			/* @__PURE__ */ jsx(PagePicture, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-basics space-y-(--page-gap-y)",
				children: [
					/* @__PURE__ */ jsxs("div", {
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "basics-name",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.name,
									placeholder: "Your Name",
									onChange: handleNameChange,
								}),
							}),
							/* @__PURE__ */ jsx("p", {
								className: "basics-headline",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.headline,
									placeholder: "Your Professional Title",
									onChange: handleHeadlineChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className:
							"basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5 *:border-(--page-primary-color) *:border-e *:py-0.5 *:pe-2 *:last:border-e-0",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email break-anywhere min-w-0",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
		],
	});
}
init_string();
var sectionClassName$3 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b");
function LeafishTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-leafish page-content",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$3, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-x-(--page-margin-x) px-(--page-margin-x) pt-(--page-margin-y)",
				children: [
					/* @__PURE__ */ jsx("main", {
						"data-layout": "main",
						className: "group page-main space-y-(--page-gap-y)",
						children: main
							.filter((section) => section !== "summary")
							.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$3,
									},
									section,
								),
							),
					}),
					!fullWidth &&
						/* @__PURE__ */ jsx("aside", {
							"data-layout": "sidebar",
							className: "group page-sidebar w-(--page-sidebar-width) shrink-0 space-y-(--page-gap-y)",
							children: sidebar
								.filter((section) => section !== "summary")
								.map((section) =>
									/* @__PURE__ */ jsx(
										Section,
										{
											type: section,
											id: section,
											sectionClassName: sectionClassName$3,
										},
										section,
									),
								),
						}),
				],
			}),
		],
	});
}
function Header$3() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const summary = useResumeStore((state) => state.resume.data.summary);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const contentRef = useRef(null);
	useEffect(() => {
		if (contentRef.current && contentRef.current.innerHTML !== summary.content)
			contentRef.current.innerHTML = summary.content;
	}, [summary.content]);
	const handleContentChange = (e) => {
		const newValue = e.currentTarget.innerHTML || "";
		if (newValue !== summary.content)
			updateResumeData((draft) => {
				draft.summary.content = newValue;
			});
	};
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: "page-header bg-(--page-primary-color)/10",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-x-(--page-margin-x) px-(--page-margin-x) py-(--page-margin-y)",
				children: [
					/* @__PURE__ */ jsx(PagePicture, {}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-(--page-gap-y)",
						children: [
							/* @__PURE__ */ jsxs("div", {
								children: [
									/* @__PURE__ */ jsx("h2", {
										className: "basics-name",
										children: /* @__PURE__ */ jsx(InlineEditableText, {
											value: basics.name,
											placeholder: "Your Name",
											onChange: handleNameChange,
										}),
									}),
									/* @__PURE__ */ jsx("p", {
										className: "basics-headline",
										children: /* @__PURE__ */ jsx(InlineEditableText, {
											value: basics.headline,
											placeholder: "Your Professional Title",
											onChange: handleHeadlineChange,
										}),
									}),
								],
							}),
							!summary.hidden &&
								!!stripHtml(summary.content) &&
								/* @__PURE__ */ jsx("div", {
									ref: contentRef,
									contentEditable: true,
									suppressContentEditableWarning: true,
									onBlur: handleContentChange,
									className:
										"basics-summary cursor-text text-sm outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
								}),
						],
					}),
				],
			}),
			/* @__PURE__ */ jsx("div", {
				className: "page-basics bg-(--page-primary-color)/10 px-(--page-margin-x) py-(--page-margin-y)",
				children: /* @__PURE__ */ jsxs("div", {
					className: "basics-items flex flex-wrap gap-x-4 gap-y-1 *:flex *:items-center *:gap-x-1.5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-email break-anywhere min-w-0",
							children: [
								/* @__PURE__ */ jsx(EnvelopeIcon, {}),
								/* @__PURE__ */ jsx(InlineEditableText, {
									as: "a",
									href: basics.email ? `mailto:${basics.email}` : void 0,
									value: basics.email,
									placeholder: "email@domain.com",
									onChange: handleEmailChange,
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-phone",
							children: [
								/* @__PURE__ */ jsx(PhoneIcon, {}),
								/* @__PURE__ */ jsx(InlineEditableText, {
									as: "a",
									href: basics.phone ? `tel:${basics.phone}` : void 0,
									value: basics.phone,
									placeholder: "+91 98765 43210",
									onChange: handlePhoneChange,
								}),
							],
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-location",
							children: [
								/* @__PURE__ */ jsx(MapPinIcon, {}),
								/* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.location,
									placeholder: "City, Country",
									onChange: handleLocationChange,
								}),
							],
						}),
						basics.website.url &&
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-website",
								children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
							}),
						basics.customFields.map((field) =>
							/* @__PURE__ */ jsxs(
								"div",
								{
									className: "basics-item-custom",
									children: [
										/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
										field.link
											? /* @__PURE__ */ jsx(PageLink, {
													url: field.link,
													label: field.text,
												})
											: /* @__PURE__ */ jsx("span", { children: field.text }),
									],
								},
								field.id,
							),
						),
					],
				}),
			}),
		],
	});
}
var sectionClassName$2 = cn();
function OnyxTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-onyx page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y)",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header$2, {}),
			/* @__PURE__ */ jsx("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) =>
					/* @__PURE__ */ jsx(
						Section,
						{
							type: section,
							id: section,
							sectionClassName: sectionClassName$2,
						},
						section,
					),
				),
			}),
			!fullWidth &&
				/* @__PURE__ */ jsx("aside", {
					"data-layout": "sidebar",
					className: "group page-sidebar space-y-(--page-gap-y)",
					children: sidebar.map((section) =>
						/* @__PURE__ */ jsx(
							Section,
							{
								type: section,
								id: section,
								sectionClassName: sectionClassName$2,
							},
							section,
						),
					),
				}),
		],
	});
}
function Header$2() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: "page-header flex items-start gap-x-6",
		children: [
			/* @__PURE__ */ jsx(PagePicture, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-basics min-w-0 flex-1 space-y-(--page-gap-y)",
				children: [
					/* @__PURE__ */ jsxs("div", {
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "basics-name",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.name,
									placeholder: "Your Name",
									onChange: handleNameChange,
								}),
							}),
							/* @__PURE__ */ jsx("p", {
								className: "basics-headline",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.headline,
									placeholder: "Your Professional Title",
									onChange: handleHeadlineChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-items flex flex-wrap gap-x-3 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email break-anywhere min-w-0",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
		],
	});
}
var sectionClassName$1 = cn(
	"[&>h6]:border-(--page-primary-color) [&>h6]:border-b",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
);
function PikachuTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsx("div", {
		className: "template-pikachu page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y)",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex gap-x-(--page-margin-x)",
			children: [
				!fullWidth &&
					/* @__PURE__ */ jsxs("aside", {
						"data-layout": "sidebar",
						className: "group page-sidebar flex w-(--page-sidebar-width) shrink-0 flex-col space-y-(--page-gap-y)",
						children: [
							isFirstPage &&
								/* @__PURE__ */ jsx("div", {
									className: "flex max-w-(--page-sidebar-width) items-center justify-start",
									children: /* @__PURE__ */ jsx(PagePicture, {}),
								}),
							!fullWidth &&
								/* @__PURE__ */ jsx("div", {
									className: "shrink-0 space-y-(--page-gap-y) overflow-x-hidden",
									children: sidebar.map((section) =>
										/* @__PURE__ */ jsx(
											Section,
											{
												type: section,
												id: section,
												sectionClassName: sectionClassName$1,
											},
											section,
										),
									),
								}),
						],
					}),
				/* @__PURE__ */ jsxs("main", {
					"data-layout": "main",
					className: "group page-main flex-1 space-y-(--page-gap-y)",
					children: [
						isFirstPage &&
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-x-6",
								children: [fullWidth && /* @__PURE__ */ jsx(PagePicture, {}), /* @__PURE__ */ jsx(Header$1, {})],
							}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-(--page-gap-y)",
							children: main.map((section) =>
								/* @__PURE__ */ jsx(
									Section,
									{
										type: section,
										id: section,
										sectionClassName: sectionClassName$1,
									},
									section,
								),
							),
						}),
					],
				}),
			],
		}),
	});
}
function Header$1() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className:
			"page-header w-full space-y-(--page-gap-y) rounded-(--picture-border-radius) bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "border-(--page-background-color)/50 border-b pb-2",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "basics-name",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: basics.name,
							placeholder: "Your Name",
							onChange: handleNameChange,
						}),
					}),
					/* @__PURE__ */ jsx("p", {
						className: "basics-headline",
						children: /* @__PURE__ */ jsx(InlineEditableText, {
							value: basics.headline,
							placeholder: "Your Professional Title",
							onChange: handleHeadlineChange,
						}),
					}),
				],
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "basics-items flex flex-wrap gap-x-3 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
				style: { "--page-primary-color": "var(--page-background-color)" },
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "basics-item-email",
						children: [
							/* @__PURE__ */ jsx(EnvelopeIcon, {}),
							/* @__PURE__ */ jsx(InlineEditableText, {
								as: "a",
								href: basics.email ? `mailto:${basics.email}` : void 0,
								value: basics.email,
								placeholder: "email@domain.com",
								onChange: handleEmailChange,
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-item-phone",
						children: [
							/* @__PURE__ */ jsx(PhoneIcon, {}),
							/* @__PURE__ */ jsx(InlineEditableText, {
								as: "a",
								href: basics.phone ? `tel:${basics.phone}` : void 0,
								value: basics.phone,
								placeholder: "+91 98765 43210",
								onChange: handlePhoneChange,
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basics-item-location",
						children: [
							/* @__PURE__ */ jsx(MapPinIcon, {}),
							/* @__PURE__ */ jsx(InlineEditableText, {
								value: basics.location,
								placeholder: "City, Country",
								onChange: handleLocationChange,
							}),
						],
					}),
					basics.website.url &&
						/* @__PURE__ */ jsxs("div", {
							className: "basics-item-website",
							children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
						}),
					basics.customFields.map((field) =>
						/* @__PURE__ */ jsxs(
							"div",
							{
								className: "basics-item-custom",
								children: [
									/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
									field.link
										? /* @__PURE__ */ jsx(PageLink, {
												url: field.link,
												label: field.text,
											})
										: /* @__PURE__ */ jsx("span", { children: field.text }),
								],
							},
							field.id,
						),
					),
				],
			}),
		],
	});
}
var sectionClassName = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b");
function RhyhornTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ jsxs("div", {
		className: "template-rhyhorn page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y)",
		children: [
			isFirstPage && /* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) =>
					/* @__PURE__ */ jsx(
						Section,
						{
							type: section,
							id: section,
							sectionClassName,
						},
						section,
					),
				),
			}),
			!fullWidth &&
				/* @__PURE__ */ jsx("aside", {
					"data-layout": "sidebar",
					className: "group page-sidebar space-y-(--page-gap-y)",
					children: sidebar.map((section) =>
						/* @__PURE__ */ jsx(
							Section,
							{
								type: section,
								id: section,
								sectionClassName,
							},
							section,
						),
					),
				}),
		],
	});
}
function Header() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const handleEmailChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};
	const handlePhoneChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};
	const handleLocationChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};
	const handleNameChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};
	const handleHeadlineChange = (value) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		"data-section-id": "header",
		className: "page-header flex items-start gap-x-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "page-basics min-w-0 flex-1 space-y-(--page-gap-y)",
				children: [
					/* @__PURE__ */ jsxs("div", {
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "basics-name",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.name,
									placeholder: "Your Name",
									onChange: handleNameChange,
								}),
							}),
							/* @__PURE__ */ jsx("p", {
								className: "basics-headline",
								children: /* @__PURE__ */ jsx(InlineEditableText, {
									value: basics.headline,
									placeholder: "Your Professional Title",
									onChange: handleHeadlineChange,
								}),
							}),
						],
					}),
					/* @__PURE__ */ jsxs("div", {
						className:
							"basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5 *:border-(--page-primary-color) *:border-e *:py-0.5 *:pe-2 *:last:border-e-0",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-email break-anywhere min-w-0",
								children: [
									/* @__PURE__ */ jsx(EnvelopeIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.email ? `mailto:${basics.email}` : void 0,
										value: basics.email,
										placeholder: "email@domain.com",
										onChange: handleEmailChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-phone",
								children: [
									/* @__PURE__ */ jsx(PhoneIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										as: "a",
										href: basics.phone ? `tel:${basics.phone}` : void 0,
										value: basics.phone,
										placeholder: "+91 98765 43210",
										onChange: handlePhoneChange,
									}),
								],
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "basics-item-location",
								children: [
									/* @__PURE__ */ jsx(MapPinIcon, {}),
									/* @__PURE__ */ jsx(InlineEditableText, {
										value: basics.location,
										placeholder: "City, Country",
										onChange: handleLocationChange,
									}),
								],
							}),
							basics.website.url &&
								/* @__PURE__ */ jsxs("div", {
									className: "basics-item-website",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {}), /* @__PURE__ */ jsx(PageLink, { ...basics.website })],
								}),
							basics.customFields.map((field) =>
								/* @__PURE__ */ jsxs(
									"div",
									{
										className: "basics-item-custom",
										children: [
											/* @__PURE__ */ jsx(PageIcon, { icon: field.icon }),
											field.link
												? /* @__PURE__ */ jsx(PageLink, {
														url: field.link,
														label: field.text,
													})
												: /* @__PURE__ */ jsx("span", { children: field.text }),
										],
									},
									field.id,
								),
							),
						],
					}),
				],
			}),
			/* @__PURE__ */ jsx(PagePicture, {}),
		],
	});
}
const ResumeMeasurer = ({ onMeasure }) => {
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	const sections = useResumeStore((state) => state.resume.data.sections);
	const customSections = useResumeStore((state) => state.resume.data.customSections);
	const [measurementRef, setMeasurementRef] = useState(null);
	const allSectionIds = useMemo(() => {
		const ids = [];
		for (const page$1 of metadata.layout.pages) {
			ids.push(...page$1.main);
			ids.push(...page$1.sidebar);
		}
		return [...new Set(ids)];
	}, [metadata.layout.pages]);
	useLayoutEffect(() => {
		if (!measurementRef) return;
		const measurements = {};
		measurementRef.querySelectorAll("[data-section-id]").forEach((node) => {
			const id = node.getAttribute("data-section-id");
			if (id) measurements[id] = node.getBoundingClientRect().height;
		});
		measurementRef.querySelectorAll("[data-item-id]").forEach((node) => {
			const id = node.getAttribute("data-item-id");
			if (id) measurements[id] = node.getBoundingClientRect().height;
		});
		onMeasure(measurements);
	}, [measurementRef, onMeasure, metadata, sections, customSections]);
	return /* @__PURE__ */ jsxs("div", {
		ref: setMeasurementRef,
		className: "resume-measurer pointer-events-none absolute top-0 left-0 -z-50 opacity-0",
		style: {
			width: pageDimensionsAsPixels[metadata.page.format].width,
			height: 0,
			overflow: "hidden",
		},
		children: [
			/* @__PURE__ */ jsx("style", {
				children: `
        .resume-measurer .page-section {
          margin-bottom: var(--page-gap-y);
        }
      `,
			}),
			/* @__PURE__ */ jsx("div", {
				"data-section-id": "header",
				children: /* @__PURE__ */ jsx(TemplateHeader, {}),
			}),
			allSectionIds.map((sectionId) => /* @__PURE__ */ jsx(MeasurableSection, { sectionId }, sectionId)),
		],
	});
};
var TemplateHeader = () => {
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	return /* @__PURE__ */ jsx("div", {
		className: "page",
		style: {
			height: "auto",
			minHeight: "0",
		},
		children: /* @__PURE__ */ jsx(
			useMemo(() => getTemplateComponent$1(metadata.template), [metadata.template]),
			{
				pageIndex: 0,
				pageLayout: {
					fullWidth: true,
					main: [],
					sidebar: [],
				},
			},
		),
	});
};
function getTemplateComponent$1(template) {
	return match(template)
		.with("azurill", () => AzurillTemplate)
		.with("bronzor", () => BronzorTemplate)
		.with("chikorita", () => ChikoritaTemplate)
		.with("ditto", () => DittoTemplate)
		.with("ditgar", () => DitgarTemplate)
		.with("gengar", () => GengarTemplate)
		.with("glalie", () => GlalieTemplate)
		.with("kakuna", () => KakunaTemplate)
		.with("lapras", () => LaprasTemplate)
		.with("leafish", () => LeafishTemplate)
		.with("onyx", () => OnyxTemplate)
		.with("pikachu", () => PikachuTemplate)
		.with("rhyhorn", () => RhyhornTemplate)
		.exhaustive();
}
var MeasurableSection = ({ sectionId }) => {
	return /* @__PURE__ */ jsx("div", {
		"data-section-id": sectionId,
		children: /* @__PURE__ */ jsx(Section, {
			type: sectionId,
			id: sectionId,
		}),
	});
};
var preview_module_default = {
	page: "_page_li0bd_1",
	scanner: "_scanner_li0bd_249",
	scan: "_scan_li0bd_249",
};
var CSS_RULE_SPLIT_PATTERN = /\n(?=\s*[.#a-zA-Z])/;
var CSS_SELECTOR_PATTERN = /^([^{]+)(\{)/;
function getTemplateComponent(template) {
	return match(template)
		.with("azurill", () => AzurillTemplate)
		.with("bronzor", () => BronzorTemplate)
		.with("chikorita", () => ChikoritaTemplate)
		.with("ditto", () => DittoTemplate)
		.with("ditgar", () => DitgarTemplate)
		.with("gengar", () => GengarTemplate)
		.with("glalie", () => GlalieTemplate)
		.with("kakuna", () => KakunaTemplate)
		.with("lapras", () => LaprasTemplate)
		.with("leafish", () => LeafishTemplate)
		.with("onyx", () => OnyxTemplate)
		.with("pikachu", () => PikachuTemplate)
		.with("rhyhorn", () => RhyhornTemplate)
		.exhaustive();
}
const ResumePreview = forwardRef(({ showPageNumbers = false, pageClassName, className, ...props }, ref) => {
	const picture = useResumeStore((state) => state.resume.data.picture);
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	const [measurements, setMeasurements] = useState({});
	useWebfonts(metadata.typography);
	const style = useCSSVariables({
		picture,
		metadata,
	});
	const { pages, itemDistribution, isOverflowing } = useResumePagination(measurements);
	const iconProps = useMemo(() => {
		return {
			weight: "regular",
			hidden: metadata.page.hideIcons,
			color: "var(--page-primary-color)",
			size: metadata.typography.body.fontSize * 1.5,
		};
	}, [metadata.typography.body.fontSize, metadata.page.hideIcons]);
	const scopedCSS = useMemo(() => {
		if (!metadata.css.enabled || !metadata.css.value.trim()) return null;
		return sanitizeCss(metadata.css.value)
			.split(CSS_RULE_SPLIT_PATTERN)
			.map((rule) => {
				const trimmed = rule.trim();
				if (!trimmed || trimmed.startsWith("@")) return trimmed;
				return trimmed.replace(CSS_SELECTOR_PATTERN, (_match, selectors, brace) => {
					return `${selectors
						.split(",")
						.map((selector) => `.resume-preview-container ${selector.trim()} `)
						.join(", ")}${brace}`;
				});
			})
			.join("\n");
	}, [metadata.css.enabled, metadata.css.value]);
	return /* @__PURE__ */ jsxs(IconContext.Provider, {
		value: iconProps,
		children: [
			/* @__PURE__ */ jsx(ResumeMeasurer, { onMeasure: setMeasurements }),
			scopedCSS && /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: scopedCSS } }),
			/* @__PURE__ */ jsx("div", {
				ref,
				...props,
				style: {
					...style,
					...props.style,
				},
				className: cn("resume-preview-container", className),
				children: pages.map((pageLayout, pageIndex) =>
					/* @__PURE__ */ jsx(
						PageContainer,
						{
							pageIndex,
							pageLayout,
							pageClassName,
							showPageNumbers,
							itemDistribution,
							isOverflowing,
							totalNumberOfPages: pages.length,
						},
						pageIndex,
					),
				),
			}),
		],
	});
});
function PageContainer({
	pageIndex,
	pageLayout,
	pageClassName,
	showPageNumbers = false,
	itemDistribution,
	isOverflowing,
	totalNumberOfPages,
}) {
	const pageRef = useRef(null);
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	const isReviewing = useResumeStore((state) => state.isReviewing);
	const pageNumber = useMemo(() => pageIndex + 1, [pageIndex]);
	const TemplateComponent = useMemo(() => getTemplateComponent(metadata.template), [metadata.template]);
	return /* @__PURE__ */ jsxs("div", {
		"data-page-index": pageIndex,
		className: "relative",
		children: [
			showPageNumbers &&
				totalNumberOfPages > 1 &&
				/* @__PURE__ */ jsx("div", {
					className: "absolute start-0 -top-6 print:hidden",
					children: /* @__PURE__ */ jsx("span", {
						className: "font-medium text-foreground text-xs",
						children: /* @__PURE__ */ jsx(Trans, {
							id: "cnJfOz",
							values: {
								pageNumber,
								totalNumberOfPages,
							},
						}),
					}),
				}),
			/* @__PURE__ */ jsxs("div", {
				ref: pageRef,
				className: cn(`page page-${pageIndex}`, preview_module_default.page, pageClassName),
				children: [
					isReviewing && /* @__PURE__ */ jsx("div", { className: preview_module_default.scanner }),
					/* @__PURE__ */ jsx(ResumePageContext.Provider, {
						value: {
							pageIndex,
							itemDistribution,
						},
						children: /* @__PURE__ */ jsx(TemplateComponent, {
							pageIndex,
							pageLayout,
						}),
					}),
				],
			}),
			metadata.page.format !== "free-form" &&
				isOverflowing &&
				pageIndex === 1 &&
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 print:hidden",
					children: /* @__PURE__ */ jsx("a", {
						rel: "noopener",
						target: "_blank",
						className: "group/link",
						href: "https://docs.rxresu.me/guides/fitting-content-on-a-page",
						children: /* @__PURE__ */ jsxs(Alert, {
							className: "max-w-[calc(var(--page-width)*0.65)] text-yellow-600 sm:max-w-sm",
							children: [
								/* @__PURE__ */ jsx(WarningIcon, { color: "currentColor" }),
								/* @__PURE__ */ jsx(AlertTitle, { children: /* @__PURE__ */ jsx(Trans, { id: "9y0oTl" }) }),
								/* @__PURE__ */ jsxs(AlertDescription, {
									className: "text-xs underline-offset-2 group-hover/link:underline",
									children: [
										/* @__PURE__ */ jsx(Trans, { id: "DiDD1p" }),
										/* @__PURE__ */ jsx(ArrowRightIcon, {
											color: "currentColor",
											className: "ms-1 inline size-3",
										}),
									],
								}),
							],
						}),
					}),
				}),
		],
	});
}
export { ResumePreview as t };
