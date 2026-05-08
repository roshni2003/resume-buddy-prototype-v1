const AUTH_TOKEN_KEY = "authToken";

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

/** Small promise-based yield so the browser can commit a storage write before we read back. */
const yieldTick = (ms = 50): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Persist a token with multiple awaited attempts and a sessionStorage fallback.
 * Returns true if the token was successfully verified as stored.
 * MUST be awaited so the caller waits for the write to be committed.
 */
export const persistAuthToken = async (token: string, maxAttempts = 3): Promise<boolean> => {
	if (typeof window === "undefined") return false;

	for (let i = 0; i < maxAttempts; i++) {
		try {
			localStorage.setItem(AUTH_TOKEN_KEY, token);
			// Yield to the browser event loop so the write can be committed
			await yieldTick(50);
			if (localStorage.getItem(AUTH_TOKEN_KEY) === token) {
				return true;
			}
		} catch {
			// localStorage may be blocked — wait and retry
			await yieldTick(50);
		}
	}

	// Fallback: sessionStorage (survives page load but not tab close)
	try {
		sessionStorage.setItem(AUTH_TOKEN_KEY, token);
		await yieldTick(50);
		if (sessionStorage.getItem(AUTH_TOKEN_KEY) === token) {
			return true;
		}
	} catch {
		// ignore
	}

	return false;
};

export const getAuthToken = (): string | null => {
	if (typeof window === "undefined") return null;

	// Read stored token from localStorage, with sessionStorage as fallback
	return localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Extract raw token from URL without triggering side effects (no storage writes, no URL cleanup).
 * Used by beforeLoad to decide whether to allow rendering before useEffect persists the token.
 */
export const getUrlToken = (): string | null => {
	if (typeof window === "undefined") return null;
	try {
		const url = new URL(window.location.href);
		const token = url.searchParams.get("token");
		if (token && token !== "preview") return token;
		if (url.hash.includes("token=")) {
			const t = new URLSearchParams(url.hash.replace(/^#/, "")).get("token");
			if (t && t !== "preview") return t;
		}
	} catch {
		// ignore
	}
	return null;
};
