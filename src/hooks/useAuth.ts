import { useEffect, useState } from "react";
import { clearAuthToken, getAuthToken } from "@/utils/auth-token";

export interface User {
	id: string;
	email: string;
	name?: string;
	image?: string;
	role?: string;
	rolesList?: string[];
}

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadAuth = () => {
			const storedToken = getAuthToken();
			setToken(storedToken);

			if (storedToken) {
				try {
					const payload = JSON.parse(atob(storedToken.split(".")[1]));
					setUser({
						id: payload.sub,
						email: payload.email,
						name: payload.name,
						role: payload.role,
						rolesList: payload.rolesList,
					});
				} catch (error) {
					console.error("Failed to decode token", error);
				}
			}
			setIsLoading(false);
		};

		loadAuth();

		// Listen for storage changes (e.g. from the test panel)
		window.addEventListener("storage", loadAuth);
		return () => window.removeEventListener("storage", loadAuth);
	}, []);

	const logout = () => {
		clearAuthToken();
		setUser(null);
		setToken(null);
		const isDev = typeof window !== "undefined" && window.location.hostname.includes("amplifyapp.com");
		const zuvyBase = isDev ? "https://dev.app.zuvy.org" : "https://app.zuvy.org";
		window.location.href = `${zuvyBase}/?zoeRedirectUrl=zoe.zuvy.org%3FreturnUrl%3D${encodeURIComponent(window.location.origin)}`;
	};

	return { user, token, isLoading, logout };
};
