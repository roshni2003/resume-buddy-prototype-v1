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
	// We always pass a full absolute URL back to Zuvy.
	// Keep the original returnUrl's path/search/hash, but force our own origin.
	let relativeReturnUrl = returnUrl;
	try {
		const parsed = new URL(returnUrl);
		relativeReturnUrl = parsed.pathname + parsed.search + parsed.hash;
	} catch {
		// keep as-is if not a full URL
	}
	if (!relativeReturnUrl.startsWith("/")) {
		relativeReturnUrl = `/${relativeReturnUrl}`;
	}
	const fullReturnUrl = `${appBaseUrl}${relativeReturnUrl}`;

	// Zuvy expects the callback URL in `zoeRedirectUrl`. Avoid double-encoding.
	return `https://app.zuvy.org/?zoeRedirectUrl=${encodeURIComponent(fullReturnUrl)}`;
};

export const redirectToZuvyLogin = (returnUrl?: string) => {
	if (typeof window === "undefined") return;
	window.location.href = buildZuvyLoginUrl(returnUrl ?? window.location.href);
};
