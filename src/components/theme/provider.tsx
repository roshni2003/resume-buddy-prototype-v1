import { useRouter } from "@tanstack/react-router";
import { createContext, type PropsWithChildren, use, useEffect } from "react";
import { setThemeServerFn, type Theme } from "@/utils/theme";
import { useSettingsStore } from "@/stores/settings";

type ThemeContextValue = {
	theme: Theme;
	setTheme: (value: Theme, options?: { playSound?: boolean }) => void;
	toggleTheme: (options?: { playSound?: boolean }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type Props = PropsWithChildren<{ theme: Theme }>;

export function ThemeProvider({ children, theme: defaultTheme }: Props) {
	const router = useRouter();
	const { colorMode, backgroundTheme, uiDensity } = useSettingsStore();

	useEffect(() => {
		const root = document.documentElement;
		
		// Color Mode
		if (colorMode === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		
		// Background Theme
		root.setAttribute("data-theme", backgroundTheme);
		
		// UI Density
		const densityMap = {
			compact: "14px",
			comfortable: "16px",
			spacious: "18px"
		};
		root.style.fontSize = densityMap[uiDensity];
		
	}, [colorMode, backgroundTheme, uiDensity]);

	async function setTheme(value: Theme, options: { playSound?: boolean } = {}) {
		const { playSound = true } = options;

		useSettingsStore.getState().setColorMode(value);
		await setThemeServerFn({ data: value });
		router.invalidate();

		if (!playSound) return;

		try {
			const soundClip = value === "dark" ? "/sounds/switch-off.mp3" : "/sounds/switch-on.mp3";
			const audio = new Audio(soundClip);
			await audio.play();
		} catch {
			// ignore errors
		}
	}

	function toggleTheme(options: { playSound?: boolean } = {}) {
		const current = useSettingsStore.getState().colorMode;
		setTheme(current === "dark" ? "light" : "dark", options);
	}

	return <ThemeContext value={{ theme: colorMode, setTheme, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
	const value = use(ThemeContext);

	if (!value) throw new Error("useTheme must be used within a ThemeProvider");

	return value;
}
