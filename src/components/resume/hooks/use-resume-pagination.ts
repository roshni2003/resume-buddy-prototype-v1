import { useMemo } from "react";
import { pageDimensionsAsPixels } from "@/schema/page";
import type { PageLayout } from "@/schema/resume/data";
import { useResumeStore } from "../store/resume";

export type PaginatedLayout = {
	pages: PageLayout[];
	itemDistribution: Record<string, string[][]>; // sectionId -> pageIndex -> itemIds
	isOverflowing: boolean;
};

export const useResumePagination = (measurements: Record<string, number>): PaginatedLayout => {
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	const sections = useResumeStore((state) => state.resume.data.sections);
	const customSections = useResumeStore((state) => state.resume.data.customSections);
	const summary = useResumeStore((state) => state.resume.data.summary);

	// Get dimensions
	const pageHeight = pageDimensionsAsPixels[metadata.page.format].height;
	const marginY = metadata.page.marginY;
	const gapY = metadata.page.gapY;
	// We subtract a small safety buffer (16px) to ensure items don't sit exactly on the bottom edge
	const contentHeight = pageHeight - marginY * 2 - 16;

	return useMemo(() => {
		// If no measurements yet, return original layout
		if (Object.keys(measurements).length === 0) {
			return {
				pages: metadata.layout.pages,
				itemDistribution: {},
				isOverflowing: false,
			};
		}

		const pages: PageLayout[] = [];
		const MAX_PAGES = 2;
		const itemDistribution: Record<string, string[][]> = {};
		let isOverflowing = false;

		// Get header height for the first page
		const headerHeight = measurements.header || 0;

		// Initialize distribution map
		const allSectionIds = [
			...metadata.layout.pages.flatMap((p) => p.main),
			...metadata.layout.pages.flatMap((p) => p.sidebar),
		];
		for (const id of allSectionIds) {
			itemDistribution[id] = Array(MAX_PAGES).fill([]);
		}

		// Helper to get items for a section
		const getSectionItems = (sectionId: string) => {
			if (sectionId === "summary") {
				return [summary];
			}
			if (sectionId in sections) {
				// @ts-expect-error
				return sections[sectionId].items.filter((i: any) => !i.hidden);
			}
			const custom = customSections.find((s) => s.id === sectionId);
			if (custom) {
				return custom.items.filter((i) => !i.hidden);
			}
			return [];
		};

		const fillColumn = (
			columnSections: string[],
			pageIndexStart: number,
			initialHeight: number,
			columnName: "main" | "sidebar",
		) => {
			let currentPageIndex = pageIndexStart;
			let currentHeight = initialHeight;

			for (const sectionId of columnSections) {
				if (currentPageIndex >= MAX_PAGES) {
					isOverflowing = true;
					break;
				}

				// Ensure page exists
				if (!pages[currentPageIndex]) {
					pages[currentPageIndex] = {
						fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
						main: [],
						sidebar: [],
					};
				}

				const items = getSectionItems(sectionId);
				if (items.length === 0) continue;

				const itemIds = items.map((i: any) => i.id);
				const totalMeasuredHeight = measurements[sectionId] || 0;
				// Estimate header height (section header)
				const sectionHeaderHeight = measurements[`${sectionId}_header`] || 0;

				// Does header fit?
				if (currentHeight + sectionHeaderHeight > contentHeight) {
					// Header doesn't fit, move to next page
					currentPageIndex++;
					currentHeight = 0;
					if (currentPageIndex >= MAX_PAGES) {
						isOverflowing = true;
						break;
					}
				}

				// Add section to page
				if (!pages[currentPageIndex]) {
					pages[currentPageIndex] = {
						fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
						main: [],
						sidebar: [],
					};
				}
				if (!pages[currentPageIndex][columnName].includes(sectionId)) {
					pages[currentPageIndex][columnName].push(sectionId);
				}
				currentHeight += sectionHeaderHeight;

				const sectionHeight = measurements[sectionId];
				if (sectionHeight && currentHeight + sectionHeight <= contentHeight) {
					// The entire section (including wrapped flex items) fits perfectly!
					itemDistribution[sectionId][currentPageIndex] = items.map((i: any) => i.id);
					currentHeight += sectionHeight + gapY;
					continue;
				}

				// If it's a grid/chip section, prefer shifting the whole section to the next page rather than splitting
				const preventSplit = ["skills", "languages", "interests", "certifications", "awards"].includes(sectionId);
				if (preventSplit && sectionHeight && sectionHeight <= contentHeight) {
					// It can fit on one page, but not the current page. Move it entirely to next page.
					currentPageIndex++;
					currentHeight = 0;

					if (currentPageIndex >= MAX_PAGES) {
						isOverflowing = true;
						break;
					}

					if (!pages[currentPageIndex]) {
						pages[currentPageIndex] = {
							fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
							main: [],
							sidebar: [],
						};
					}

					pages[currentPageIndex][columnName].push(sectionId);
					itemDistribution[sectionId][currentPageIndex] = items.map((i: any) => i.id);
					currentHeight += sectionHeight + gapY;
					continue;
				}

				// Otherwise, fallback to fitting individual items
				let previousItemOffset = sectionHeaderHeight;

				for (let i = 0; i < items.length; i++) {
					const itemId = items[i].id;
					const itemHeight = measurements[itemId] || 50;
					const itemOffset = measurements[`${itemId}_offset`];

					let heightContribution = 0;
					const isFirstOnPage = !itemDistribution[sectionId][currentPageIndex] || itemDistribution[sectionId][currentPageIndex].length === 0;
					
					if (isFirstOnPage) {
						if (i === 0 && itemOffset !== undefined) {
							// First item of the section on the first page: use exact offset from header
							heightContribution = Math.max(0, itemOffset - previousItemOffset);
						} else {
							// First item on a NEW page: just its height (no header or previous gaps)
							heightContribution = itemHeight;
						}
					} else if (itemOffset !== undefined) {
						heightContribution = Math.max(0, itemOffset - previousItemOffset);
					} else {
						heightContribution = itemHeight + gapY;
					}

					if (currentHeight + heightContribution <= contentHeight) {
						// Item fits
						const currentDist = itemDistribution[sectionId][currentPageIndex] || [];
						itemDistribution[sectionId][currentPageIndex] = [...currentDist, itemId];
						currentHeight += heightContribution;
					} else {
						// Item doesn't fit, move to next page
						currentPageIndex++;
						currentHeight = 0;

						if (currentPageIndex >= MAX_PAGES) {
							isOverflowing = true;
							break;
						}

						// Ensure new page exists
						if (!pages[currentPageIndex]) {
							pages[currentPageIndex] = {
								fullWidth: metadata.layout.pages[0]?.fullWidth ?? false,
								main: [],
								sidebar: [],
							};
						}

						// Add section to new page if not already there
						if (!pages[currentPageIndex][columnName].includes(sectionId)) {
							pages[currentPageIndex][columnName].push(sectionId);
						}

						const currentDist = itemDistribution[sectionId][currentPageIndex] || [];
						itemDistribution[sectionId][currentPageIndex] = [...currentDist, itemId];
						currentHeight += itemHeight; // First item on new page
					}

					if (itemOffset !== undefined) {
						previousItemOffset = itemOffset;
					} else {
						previousItemOffset += itemHeight + gapY;
					}
				}

				// Add section gap after section is done (only on the page it ended)
				if (currentPageIndex < MAX_PAGES) {
					currentHeight += gapY;
				}
			}
		};

		// Extract sections intended for Main and Sidebar
		// We use the first page of metadata as the "template" for which sections go where,
		// but we flatten all pages to get the full list of sections.
		// Actually, simpler: just take all unique sections from metadata and put them in
		// the column they first appear in.

		const mainSections = new Set<string>();
		const sidebarSections = new Set<string>();

		metadata.layout.pages.forEach((p) => {
			p.main.forEach((s) => mainSections.add(s));
			p.sidebar.forEach((s) => sidebarSections.add(s));
		});

		const headerInMain = ["chikorita", "pikachu"].includes(metadata.template);
		const headerInSidebar = ["ditgar", "gengar", "glalie", "ditto"].includes(metadata.template);
		
		const mainInitialHeight = headerInSidebar ? 0 : headerHeight;
		const sidebarInitialHeight = headerInMain ? 0 : headerHeight;

		// Pass initial height to the first page (index 0)
		fillColumn(Array.from(mainSections), 0, mainInitialHeight, "main");
		if (!metadata.layout.pages[0]?.fullWidth) {
			fillColumn(Array.from(sidebarSections), 0, sidebarInitialHeight, "sidebar");
		}

		return {
			pages,
			itemDistribution,
			isOverflowing,
		};
	}, [metadata, measurements, contentHeight, summary, sections, customSections, gapY]);
};
