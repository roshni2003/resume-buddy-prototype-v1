import { useEffect, useState } from "react";
import {
	clearAuthToken,
	createPrototypeToken,
	getAuthToken,
	getStoredUserProfile,
	isValidToken,
	persistAuthToken,
	safeDecodeJwtPayload,
	setStoredUserProfile,
} from "@/utils/auth-token";

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

			if (storedToken && isValidToken(storedToken)) {
				const profile = getStoredUserProfile();
				const payload = safeDecodeJwtPayload(storedToken) as any;

				if (payload || profile) {
					setUser({
						id: payload?.sub || "prototype_user",
						email: profile?.email || payload?.email || "user@example.com",
						name: profile?.name || payload?.name || profile?.email?.split("@")[0] || "User",
						role: payload?.role || "user",
						rolesList: payload?.rolesList,
					});
					setIsLoading(false);
					return;
				}
			}

			setUser(null);
			setIsLoading(false);
		};

		loadAuth();

		// Listen for storage changes
		window.addEventListener("storage", loadAuth);
		window.addEventListener("auth_changed", loadAuth);
		return () => {
			window.removeEventListener("storage", loadAuth);
			window.removeEventListener("auth_changed", loadAuth);
		};
	}, []);

	const loginPrototype = async (email: string, name?: string) => {
		const newToken = createPrototypeToken(email, name);
		await persistAuthToken(newToken);
		setStoredUserProfile({ email: email.trim().toLowerCase(), name: name?.trim() });
		setToken(newToken);
		setUser({
			id: `user_${Date.now()}`,
			email: email.trim().toLowerCase(),
			name: name?.trim() || email.split("@")[0],
			role: "user",
		});
		window.dispatchEvent(new Event("storage"));
		window.dispatchEvent(new Event("auth_changed"));
	};

	const logout = () => {
		clearAuthToken();
		setUser(null);
		setToken(null);
		window.dispatchEvent(new Event("storage"));
		window.dispatchEvent(new Event("auth_changed"));
		if (typeof window !== "undefined") {
			window.location.href = "/";
		}
	};

	return {
		user,
		token,
		isLoading,
		isAuthenticated: Boolean(user && token),
		logout,
		loginPrototype,
	};
};
