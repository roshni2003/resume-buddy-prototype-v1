const MIXPANEL_TOKEN = "071926001d0ae550dfb32c46e1c9cfbd";

// Initialize mixpanel
if (typeof window !== "undefined") {
	mixpanel.init(MIXPANEL_TOKEN, {
		debug: import.meta.env.DEV,
		track_pageview: true,
		persistence: "localStorage",
		ignore_dnt: true,
		api_host: "https://api-js.mixpanel.com",
	});
}

export const mixpanelService = {
	identify: (userId: string, user?: { user_metadata?: { full_name?: string }; email?: string }) => {
		if (!userId) return;
		mixpanel.identify(userId);
		mixpanel.people.set({
			$user_id: userId,
			$name: user?.user_metadata?.full_name,
			$email: user?.email,
		});
	},
	track: (name: string, props?: object) => {
		console.log(`[Mixpanel] Tracking: ${name}`, props);
		mixpanel.track(name, props);
	},
};
