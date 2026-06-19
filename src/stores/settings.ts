import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorMode = "light" | "dark";
export type BackgroundTheme = "navy" | "purple" | "forest";

type SettingsState = {
	colorMode: ColorMode;
	backgroundTheme: BackgroundTheme;
	setColorMode: (mode: ColorMode) => void;
	setBackgroundTheme: (theme: BackgroundTheme) => void;
};

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			colorMode: "dark",
			backgroundTheme: "navy",
			setColorMode: (mode) => set({ colorMode: mode }),
			setBackgroundTheme: (theme) => set({ backgroundTheme: theme }),
		}),
		{
			name: "zoe-settings",
		}
	)
);
