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

/**
 * Persist a token with multiple attempts and a sessionStorage fallback.
 * Returns true if the token was successfully verified as stored.
 */
export const persistAuthToken = (token: string, maxAttempts = 3): boolean => {
	if (typeof window === "undefined") return false;

	// Try localStorage with verification (Shivansh's suggestion: multiple attempts)
	for (let i = 0; i < maxAttempts; i++) {
		try {
			localStorage.setItem(AUTH_TOKEN_KEY, token);
			if (localStorage.getItem(AUTH_TOKEN_KEY) === token) {
				return true;
			}
		} catch {
			// localStorage may be blocked — try next attempt or fall through
		}
	}

	// Fallback: sessionStorage (survives page load but not tab close)
	try {
		sessionStorage.setItem(AUTH_TOKEN_KEY, token);
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

	// Just-in-time extraction to catch soft navigations or pre-hydration queries natively
	try {
		const url = new URL(window.location.href);
		let extractedToken = url.searchParams.get("token");
		if (!extractedToken && url.hash.includes("token=")) {
			extractedToken = new URLSearchParams(url.hash.replace(/^#/, "")).get("token");
		}
		if (extractedToken && extractedToken !== "preview") {
			// Persist using multi-attempt logic
			persistAuthToken(extractedToken);

			// Clean the URL so the token is not visible or accidentally shared
			url.searchParams.delete("token");
			const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
			if (hashParams.has("token")) {
				hashParams.delete("token");
				url.hash = hashParams.toString();
			}
			if (window.history.replaceState) {
				window.history.replaceState({}, "", url.toString());
			}
		}
	} catch {
		// ignore
	}

	// Check localStorage first, then sessionStorage as fallback
	return localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Extract raw token from URL without triggering side effects (no localStorage writes, no URL cleanup).
 * Used to decide whether to allow rendering before useEffect can persist the token.
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
