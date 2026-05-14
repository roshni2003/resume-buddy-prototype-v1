import { t as getCookie } from "./server-Ck__86By.js";
import { t as createServerFn } from "./createServerFn-Ch6eBU8Y.js";
import { t as createSsrRpc } from "./createSsrRpc-9mmrq80i.js";
import { createContext, use, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import z from "zod";
var themeSchema = z.union([z.literal("light"), z.literal("dark")]);
var storageKey = "theme";
var defaultTheme = "dark";
function isTheme(theme) {
	return themeSchema.safeParse(theme).success;
}
const getTheme = async () => {
	const cookieTheme = getCookie(storageKey);
	if (!cookieTheme || !isTheme(cookieTheme)) return defaultTheme;
	return cookieTheme;
};
const setThemeServerFn = createServerFn({ method: "POST" }).inputValidator(themeSchema).handler(createSsrRpc("71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9"));
var ThemeContext = createContext(null);
function ThemeProvider({ children, theme }) {
	const router = useRouter();
	useEffect(() => {
		document.documentElement.classList.remove("dark");
	}, []);
	async function setTheme(value, options = {}) {
		const { playSound = true } = options;
		document.documentElement.classList.remove("dark");
		await setThemeServerFn({ data: "light" });
		router.invalidate();
		if (!playSound) return;
		try {
			const soundClip = value === "dark" ? "/sounds/switch-off.mp3" : "/sounds/switch-on.mp3";
			await new Audio(soundClip).play();
		} catch {}
	}
	function toggleTheme(options = {}) {
		setTheme("light", options);
	}
	return /* @__PURE__ */ jsx(ThemeContext, {
		value: {
			theme: "light",
			setTheme,
			toggleTheme
		},
		children
	});
}
function useTheme() {
	const value = use(ThemeContext);
	if (!value) throw new Error("useTheme must be used within a ThemeProvider");
	return value;
}
export { isTheme as i, useTheme as n, getTheme as r, ThemeProvider as t };
