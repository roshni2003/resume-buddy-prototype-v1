import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand/react";
import { leftSidebarSections, rightSidebarSections, type SidebarSection } from "@/utils/resume/section";

type SectionCollapseState = {
	[id in SidebarSection]?: { collapsed: boolean };
};

type SectionStoreState = {
	sections: SectionCollapseState;
};

type SectionStoreActions = {
	setCollapsed: (id: SidebarSection, collapsed: boolean) => void;
	toggleCollapsed: (id: SidebarSection) => void;
	toggleAll: () => void;
	navigateToSection: (id: string, targetField?: string) => void;
};

type SectionStore = SectionStoreState & SectionStoreActions;

export const useSectionStore = create<SectionStore>()(
	persist(
		immer((set) => ({
			sections: {},
			setCollapsed: (id, collapsed) => {
				set((state) => {
					state.sections[id] = { collapsed };
				});
			},
			toggleCollapsed: (id) => {
				set((state) => {
					const current = state.sections[id]?.collapsed ?? false;
					state.sections[id] = { collapsed: !current };
				});
			},
			toggleAll: () => {
				set((state) => {
					[...leftSidebarSections, ...rightSidebarSections].forEach((id) => {
						const current = state.sections[id]?.collapsed ?? false;
						state.sections[id] = { collapsed: !current };
					});
				});
			},
			navigateToSection: (id: string, targetField?: string) => {
				// "header" is used on the template header area; it maps to "basics" in the sidebar.
				// Custom sections have UUIDs as their id; map them to the "custom" sidebar key.
				const normalizedId = id === "header" ? "basics" : id;
				const sidebarKey = (leftSidebarSections as readonly string[]).includes(normalizedId) ? normalizedId : "custom";
				// Expand the section in the sidebar (set collapsed = false)
				set((state) => {
					state.sections[sidebarKey as SidebarSection] = { collapsed: false };
				});
				
				// Wait for the accordion CSS transition to fully expand (approx 300ms)
				setTimeout(() => {
					const el = document.getElementById(`sidebar-${sidebarKey}`);
					if (!el) return;
					
					// ALWAYS scroll the section to the top. Use 'auto' so it doesn't conflict with subsequent scrolls.
					el.scrollIntoView({ behavior: "auto", block: "start" });

					if (targetField) {
						// Small delay to allow the layout to settle after the section scroll
						setTimeout(() => {
							// Find the input within the expanded section based on the target field name
							// Split target path (e.g. sections.education.items[0].period) to get the field keyword
							const parts = targetField.split(".");
							const keyword = parts[parts.length - 1].replace(/\[\d+\]/g, '').toLowerCase();

							// Try to find the closest matching input by looking at preceding labels
							let targetInput: HTMLElement | null = null;
							const inputs = el.querySelectorAll("input, textarea, select");
							
							for (const input of Array.from(inputs)) {
								// Check if input itself has the name
								if (input.getAttribute("name")?.toLowerCase().includes(keyword)) {
									targetInput = input as HTMLElement;
									break;
								}
								
								// Walk up and find the nearest preceding label
								const container = input.closest("div");
								if (container) {
									const label = container.querySelector("label");
									if (label && label.textContent?.toLowerCase().includes(keyword)) {
										targetInput = input as HTMLElement;
										break;
									}
								}
							}

							if (targetInput) {
								// Scroll the input into view and center it, so it's clearly visible
								targetInput.scrollIntoView({ behavior: "smooth", block: "center" });
								targetInput.focus({ preventScroll: true });
								targetInput.classList.add("animate-field-focus");
								
								// Remove the class after animation completes so it can trigger again later
								setTimeout(() => {
									targetInput?.classList.remove("animate-field-focus");
								}, 4000);
							}
						}, 100); 
					}
				}, 350); // wait for accordion to expand completely
			},
		})),
		{
			name: "section-store",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				sections: state.sections,
			}),
		},
	),
);
