let mixpanelInstance: any = null;

// const MIXPANEL_TOKEN = "071926001d0ae550dfb32c46e1c9cfbd";
const MIXPANEL_TOKEN = "a4250231f24e572c9a8e8f50217d59ac";

// Initialize mixpanel only on the client side
if (typeof window !== 'undefined') {
	import("mixpanel-browser").then((mp) => {
		mixpanelInstance = mp.default || mp;
		mixpanelInstance.init(MIXPANEL_TOKEN, {
			debug: false,
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
	setProfileProperties: (properties: object) => {
		if (typeof window === 'undefined' || !mixpanelInstance) return;

		mixpanelInstance.people.set(properties);
	},
	track: (name: string, props?: object) => {
		if (typeof window === 'undefined' || !mixpanelInstance) return;
		mixpanelInstance.track(name, props);
	},
};
