import "@fontsource-variable/ibm-plex-sans";
import "@phosphor-icons/web/regular/style.css";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { IconContext } from "@phosphor-icons/react";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { CommandPalette } from "@/components/command-palette";
import { BreakpointIndicator } from "@/components/layout/breakpoint-indicator";
import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/sonner";
import { DialogManager } from "@/dialogs/manager";
import { ConfirmDialogProvider } from "@/hooks/use-confirm";
import { PromptDialogProvider } from "@/hooks/use-prompt";
import { getSession } from "@/integrations/auth/functions";
import type { AuthSession } from "@/integrations/auth/types";
import { client, type orpc } from "@/integrations/orpc/client";
import type { FeatureFlags } from "@/integrations/orpc/services/flags";
import { persistAuthToken } from "@/utils/auth-token";
import { getLocale, isRTL, type Locale, loadLocale } from "@/utils/locale";
import { mixpanelService } from "@/utils/mixpanel";
import { getTheme, type Theme } from "@/utils/theme";
import appCss from "../styles/globals.css?url";

type RouterContext = {
	theme: Theme;
	locale: Locale;
	orpc: typeof orpc;
	queryClient: QueryClient;
	session: AuthSession | null;
	flags: FeatureFlags;
};

const appName = "Resume Buddy";
const tagline = "Build your professional resume with AI assistance";
const title = `${appName} — ${tagline}`;
const description =
	"Resume Buddy is a free resume builder with AI assistance that simplifies the process of creating, updating, and sharing your resume.";

await loadLocale(await getLocale());

export const Route = createRootRouteWithContext<RouterContext>()({
	shellComponent: RootDocument,
	head: () => {
		const appUrl = "https://api-testing.d3s88q50fgekpa.amplifyapp.com";
		return {
			links: [
				{ rel: "stylesheet", href: appCss },
				// Icons - Zoe Resume Builder
				{ rel: "icon", href: "/zoe-icon.png", type: "image/png", sizes: "128x128" },
				{ rel: "icon", href: "/zoe-icon.png", type: "image/png", sizes: "256x256 any" },
				{ rel: "apple-touch-icon", href: "/zoe-icon.png", type: "image/png", sizes: "180x180 any" },
				// Manifest
				{ rel: "manifest", href: "/manifest.webmanifest", crossOrigin: "use-credentials" },
			],
			meta: [
				{ title },
				{ charSet: "UTF-8" },
				{ name: "description", content: description },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				// Twitter Tags
				{ property: "twitter:image", content: `${appUrl}/opengraph/banner.jpg` },
				{ property: "twitter:card", content: "summary_large_image" },
				{ property: "twitter:title", content: title },
				{ property: "twitter:description", content: description },
				// OpenGraph Tags
				{ property: "og:image", content: `${appUrl}/opengraph/banner.jpg` },
				{ property: "og:site_name", content: appName },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: appUrl },
			],
			// Register service worker via script tag
			scripts: [
				{
					children: `
						if('serviceWorker' in navigator) {
							window.addEventListener('load', () => {
								navigator.serviceWorker.register('/sw.js', { scope: '/' })
							})
						}
						if (window.location.search.includes('token=preview')) {
							document.documentElement.classList.remove('dark');
						}

						// Early Auth Token Extraction (Before Router Initializes).
						// Write to every available store synchronously so devices that drop
						// localStorage writes (iOS Safari private, in-app WebViews) can still
						// pick up the token via sessionStorage or the first-party cookie.
						// Diagnostic logs are prefixed with "[auth-debug] inline:" — filter the
						// console for "[auth-debug]" to trace the full token flow.
						try {
							var url = new URL(window.location.href);
							var extracted = url.searchParams.get('token');
							if (!extracted && url.hash.includes('token=')) {
								extracted = new URLSearchParams(url.hash.replace(/^#\\/?/, '')).get('token');
							}
							var tail = extracted ? ('…' + extracted.slice(-8) + ' (len=' + extracted.length + ')') : String(extracted);
							if (extracted && extracted !== 'preview') {
								try {
									localStorage.setItem('authToken', extracted);
									var lsBack = localStorage.getItem('authToken');
								} catch(e) {}
								try {
									sessionStorage.setItem('authToken', extracted);
									var ssBack = sessionStorage.getItem('authToken');
								} catch(e) {}
								try {
									var isHttps = window.location.protocol === 'https:';
									document.cookie = 'authToken=' + encodeURIComponent(extracted)
										+ '; Path=/; Max-Age=604800; SameSite=Lax'
										+ (isHttps ? '; Secure' : '');
									var cookieOk = document.cookie.indexOf('authToken=') !== -1;
								} catch(e) {}
							}
						} catch(e) {}
					`,
				},
			],
		};
	},
	beforeLoad: async () => {
		// Extract token from URL *here* — before any child route (/_home/) can redirect and strip ?token=.
		// Use awaited persistAuthToken (retries + sessionStorage fallback) so devices where the
		// localStorage write doesn't commit immediately (iOS Safari, in-app WebViews) still see
		// the token on the next read.
		if (typeof window !== "undefined") {
			try {
				const url = new URL(window.location.href);
				let token = url.searchParams.get("token");
				if (!token && url.hash.includes("token=")) {
					token = new URLSearchParams(url.hash.replace(/^#/, "")).get("token");
				}
				if (token && token !== "preview") {
					await persistAuthToken(token);
				}
			} catch {
				// ignore
			}
		}
		const [theme, locale, session, flags] = await Promise.all([
			getTheme(),
			getLocale(),
			getSession().catch(() => null),
			client.flags.get().catch(() => ({ disableSignups: false, disableEmailAuth: false })),
		]);

		// Always identify the user in mixpanel when we have a valid session
		if (session?.user?.id) {
			mixpanelService.identify(session.user.id, session.user);
		}

		return { theme, locale, session, flags };
	},
});

type Props = {
	children: React.ReactNode;
};

function RootDocument({ children }: Props) {
	const { theme, locale } = Route.useRouteContext();
	const dir = isRTL(locale) ? "rtl" : "ltr";

	const isPreview = typeof window !== "undefined" && window.location.search.includes("token=preview");
	const effectiveTheme = isPreview ? "light" : theme;

	return (
		<html suppressHydrationWarning dir={dir} lang={locale} className={effectiveTheme}>
			<head>
				<HeadContent />
			</head>

			<body>
				<MotionConfig reducedMotion="user">
					<I18nProvider i18n={i18n}>
						<IconContext.Provider value={{ size: 16, weight: "regular" }}>
							<ThemeProvider theme={theme}>
								<ConfirmDialogProvider>
									<PromptDialogProvider>
										{children}

										<DialogManager />
										<CommandPalette />
										<Toaster richColors position="bottom-right" />

										{import.meta.env.DEV && <BreakpointIndicator />}
									</PromptDialogProvider>
								</ConfirmDialogProvider>
							</ThemeProvider>
						</IconContext.Provider>
					</I18nProvider>
				</MotionConfig>

				<Scripts />
			</body>
		</html>
	);
}
