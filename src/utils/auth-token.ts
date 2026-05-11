const AUTH_TOKEN_KEY = "authToken";
// Cookies are written first-party for 7 days. They survive in-app browsers and
// iOS Safari private mode in cases where localStorage silently drops writes.
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// Diagnostic logging — left enabled while we debug devices where storage writes
// silently drop. Search the console for "[auth-debug]" to trace token flow.
const DEBUG = true;
const tokenTail = (token: string | null | undefined) =>
	token ? `…${token.slice(-8)} (len=${token.length})` : String(token);
const log = (...args: unknown[]) => {
	if (DEBUG && typeof console !== "undefined") {
		// eslint-disable-next-line no-console
		console.log("[auth-debug]", ...args);
	}
};

type JwtPayload = {
	exp?: number;
};

const safeDecodeJwtPayload = (token: string): JwtPayload | null => {
	try {
		const base64Url = token.split(".")[1];
		if (!base64Url) return null;
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join(""),
		);
		return JSON.parse(jsonPayload) as JwtPayload;
	} catch {
		return null;
	}
};

export const isValidToken = (token: string | null): boolean => {
	if (!token) return false;
	const payload = safeDecodeJwtPayload(token);
	if (!payload) return false;
	if (typeof payload.exp !== "number") return true;
	return payload.exp > Math.floor(Date.now() / 1000);
};

const getCookie = (name: string): string | null => {
	if (typeof document === "undefined") return null;
	try {
		const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
		return match ? decodeURIComponent(match[1]) : null;
	} catch {
		return null;
	}
};

const setCookie = (name: string, value: string, maxAgeSeconds: number): boolean => {
	if (typeof document === "undefined") return false;
	try {
		const isHttps = window.location.protocol === "https:";
		const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", `Max-Age=${maxAgeSeconds}`, "SameSite=Lax"];
		if (isHttps) parts.push("Secure");
		document.cookie = parts.join("; ");
		return getCookie(name) === value;
	} catch {
		return false;
	}
};

const deleteCookie = (name: string): void => {
	if (typeof document === "undefined") return;
	try {
		const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
		document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${isHttps ? "; Secure" : ""}`;
	} catch {
		// ignore
	}
};

/**
 * Read the auth token from any available client store. Order matters:
 * localStorage (primary) → sessionStorage (per-tab fallback) → cookie (cross-store fallback).
 * Every consumer should call this rather than touching localStorage directly so that the
 * sessionStorage/cookie fallbacks actually authenticate downstream requests.
 */
export const getAuthToken = (): string | null => {
	if (typeof window === "undefined") return null;

	const fromLocal = (() => {
		try {
			return localStorage.getItem(AUTH_TOKEN_KEY);
		} catch (e) {
			log("getAuthToken: localStorage.getItem threw", e);
			return null;
		}
	})();
	if (fromLocal) {
		log("getAuthToken: found in localStorage", tokenTail(fromLocal));
		return fromLocal;
	}

	const fromSession = (() => {
		try {
			return sessionStorage.getItem(AUTH_TOKEN_KEY);
		} catch (e) {
			log("getAuthToken: sessionStorage.getItem threw", e);
			return null;
		}
	})();
	if (fromSession) {
		log("getAuthToken: found in sessionStorage", tokenTail(fromSession));
		return fromSession;
	}

	const fromCookie = getCookie(AUTH_TOKEN_KEY);
	log("getAuthToken: cookie =", tokenTail(fromCookie));
	return fromCookie;
};

/** Wipe the auth token from every store. Used by logout and the 401 handler. */
export const clearAuthToken = (): void => {
	if (typeof window === "undefined") return;
	// Capture a stack trace so we can see *who* wiped the token (401 handler? logout?
	// dashboard's stale-token cleanup?). This is critical for debugging the "token
	// disappears from storage" symptom on broken devices.
	log("clearAuthToken: CALLED — wiping all three stores", new Error("clearAuthToken stack").stack);
	try {
		localStorage.removeItem(AUTH_TOKEN_KEY);
	} catch {
		// ignore
	}
	try {
		sessionStorage.removeItem(AUTH_TOKEN_KEY);
	} catch {
		// ignore
	}
	deleteCookie(AUTH_TOKEN_KEY);
};

const yieldTick = (ms = 50): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Persist the token to every available store. Tries localStorage first (with retries +
 * yield ticks so iOS Safari has a chance to commit), then always also writes to
 * sessionStorage and a first-party cookie as fallbacks. Returns true if at least one
 * store verified the write.
 */
export const persistAuthToken = async (token: string, maxAttempts = 3): Promise<boolean> => {
	if (typeof window === "undefined") return false;

	log("persistAuthToken: start", tokenTail(token));
	let storedSomewhere = false;

	// 1. localStorage with retries + yield ticks (handles deferred-commit devices)
	let localOk = false;
	for (let i = 0; i < maxAttempts; i++) {
		try {
			localStorage.setItem(AUTH_TOKEN_KEY, token);
			await yieldTick(50);
			const readback = localStorage.getItem(AUTH_TOKEN_KEY);
			if (readback === token) {
				localOk = true;
				storedSomewhere = true;
				break;
			}
			log("persistAuthToken: localStorage attempt", i + 1, "readback mismatch", tokenTail(readback));
		} catch (e) {
			log("persistAuthToken: localStorage.setItem threw on attempt", i + 1, e);
			await yieldTick(50);
		}
	}
	log("persistAuthToken: localStorage result", localOk ? "OK" : "FAILED");

	// 2. sessionStorage — always attempt as a parallel store, not just on localStorage failure.
	let sessionOk = false;
	try {
		sessionStorage.setItem(AUTH_TOKEN_KEY, token);
		await yieldTick(50);
		if (sessionStorage.getItem(AUTH_TOKEN_KEY) === token) {
			sessionOk = true;
			storedSomewhere = true;
		}
	} catch (e) {
		log("persistAuthToken: sessionStorage.setItem threw", e);
	}
	log("persistAuthToken: sessionStorage result", sessionOk ? "OK" : "FAILED");

	// 3. First-party cookie — survives some in-app browsers and Safari private mode
	//    where Web Storage is silently broken. Always attempted as a third fallback.
	const cookieOk = setCookie(AUTH_TOKEN_KEY, token, AUTH_COOKIE_MAX_AGE_SECONDS);
	if (cookieOk) storedSomewhere = true;
	log("persistAuthToken: cookie result", cookieOk ? "OK" : "FAILED");

	log("persistAuthToken: done — storedSomewhere =", storedSomewhere);
	return storedSomewhere;
};

/**
 * Extract raw token from URL without triggering side effects (no storage writes, no URL cleanup).
 * Used by beforeLoad to decide whether to allow rendering before useEffect persists the token.
 */
export const getUrlToken = (): string | null => {
	if (typeof window === "undefined") return null;
	try {
		const url = new URL(window.location.href);
		let extractedToken = url.searchParams.get("token");
		if (!extractedToken && url.hash.includes("token=")) {
			extractedToken = new URLSearchParams(url.hash.replace(/^#/, "")).get("token");
		}
		if (extractedToken && extractedToken !== "preview") {
			log("getUrlToken: extracted from URL", tokenTail(extractedToken));
			return extractedToken;
		}
		log("getUrlToken: no token in URL (search or hash)");
	} catch (e) {
		log("getUrlToken: threw", e);
	}
	return null;
};
