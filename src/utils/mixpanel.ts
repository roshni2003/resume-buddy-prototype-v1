const MIXPANEL_TOKEN = "071926001d0ae550dfb32c46e1c9cfbd";

let mixpanelInstance: any = null;

// Initialize mixpanel only on the client side
if (typeof window !== 'undefined') {
	import("mixpanel-browser").then((mp) => {
		mixpanelInstance = mp.default || mp;
		mixpanelInstance.init(MIXPANEL_TOKEN, {
			debug: import.meta.env.DEV,
			track_pageview: true,
			persistence: "localStorage",
			ignore_dnt: true,
			api_host: "https://api-js.mixpanel.com",
		});
	}).catch((err) => {
		console.error("Failed to load mixpanel-browser", err);
	});
}

export const mixpanelService = {
	identify: (userId: string, user?: { user_metadata?: { full_name?: string }; email?: string }) => {
		if (typeof window === 'undefined' || !mixpanelInstance || !userId) return;
		mixpanelInstance.identify(userId);
		mixpanelInstance.people.set({
			$user_id: userId,
			$name: user?.user_metadata?.full_name,
			$email: user?.email,
		});
	},
	track: (name: string, props?: object) => {
		if (typeof window === 'undefined' || !mixpanelInstance) return;
		console.log(`[Mixpanel] Tracking: ${name}`, props);
		mixpanelInstance.track(name, props);
	},
};