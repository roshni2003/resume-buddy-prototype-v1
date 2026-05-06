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
			const oldToken = localStorage.getItem(AUTH_TOKEN_KEY);

			// Store the token immediately before doing any history modification or reloads
			localStorage.setItem(AUTH_TOKEN_KEY, extractedToken);

			// Clean the URL so the token is not visible or accidentally shared
			url.searchParams.delete("token");
			if (window.history.replaceState) {
				window.history.replaceState({}, "", url.toString());
			}

			if (oldToken && oldToken !== extractedToken) {
				// Wipe React Query cache manually on new token insertion to prevent rendering old cached resumes!
				window.location.reload();
			}
		}
	} catch {
		// ignore
	}

	return localStorage.getItem(AUTH_TOKEN_KEY);
};
