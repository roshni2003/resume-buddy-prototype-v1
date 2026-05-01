const AUTH_TOKEN_KEY = "authToken";

type JwtPayload = {
	exp?: number;
};

const safeDecodeJwtPayload = (token: string): JwtPayload | null => {
	try {
		console.log("Safe Decode Start. Token parts:", token.split(".").length);
		const base64Url = token.split(".")[1];
		if (!base64Url) return null;
		let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const padLength = (4 - (base64.length % 4)) % 4;
		base64 += "=".repeat(padLength);
		console.log("Base64 string padded length:", base64.length);
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join(""),
		);
		console.log("JSON Payload Decoded:", jsonPayload);
		const parsed = JSON.parse(jsonPayload) as JwtPayload;
		console.log("Parsed JWT successfully:", parsed);
		return parsed;
	} catch (e: unknown) {
		console.error("JWT Decode Error:", e instanceof Error ? e.message : e);
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
	return localStorage.getItem(AUTH_TOKEN_KEY);
};
