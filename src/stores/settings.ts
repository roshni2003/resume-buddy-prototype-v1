import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorMode = "light" | "dark";
export type BackgroundTheme = "navy" | "purple" | "forest";
export type UIDensity = "compact" | "comfortable" | "spacious";

type SettingsState = {
	colorMode: ColorMode;
	backgroundTheme: BackgroundTheme;
	uiDensity: UIDensity;
	setColorMode: (mode: ColorMode) => void;
	setBackgroundTheme: (theme: BackgroundTheme) => void;
	setUIDensity: (density: UIDensity) => void;
};

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			colorMode: "dark",
			backgroundTheme: "navy",
			uiDensity: "comfortable",
			setColorMode: (mode) => set({ colorMode: mode }),
			setBackgroundTheme: (theme) => set({ backgroundTheme: theme }),
			setUIDensity: (density) => set({ uiDensity: density }),
		}),
		{
			name: "zoe-settings",
		}
	)
);
