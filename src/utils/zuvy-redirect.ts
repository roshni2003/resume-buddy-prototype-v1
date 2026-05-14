/**
 * Returns the base URL for this application.
 * In local dev this reads VITE_APP_URL (e.g. http://localhost:3000).
 * In production it defaults to "zoe.zuvy.org".
 */
const getAppBaseUrl = (): string => {
	const viteUrl = import.meta.env.VITE_APP_URL as string | undefined;
	return viteUrl ? viteUrl.replace(/\/$/, "") : "https://zoe.zuvy.org";
};

export const buildZuvyLoginUrl = (returnUrl: string) => {
	const appBaseUrl = getAppBaseUrl();
	// Strip the origin from returnUrl so only the path+search is passed.
	// Zuvy will prepend the app URL itself when redirecting back.
	let relativeReturnUrl = returnUrl;
	try {
		const parsed = new URL(returnUrl);
		relativeReturnUrl = parsed.pathname + parsed.search + parsed.hash;
	} catch {
		// keep as-is if not a full URL
	}
	const fullReturnUrl = `${appBaseUrl}${relativeReturnUrl}`;
	const encoded = encodeURIComponent(fullReturnUrl);
	return `https://app.zuvy.org/?zoeRedirectUrl=${encodeURIComponent(`${appBaseUrl}?returnUrl=${encoded}`)}`;
};

export const redirectToZuvyLogin = (returnUrl?: string) => {
	if (typeof window === "undefined") return;
	window.location.href = buildZuvyLoginUrl(returnUrl ?? window.location.href);
};
