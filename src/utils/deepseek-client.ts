/**
 * DeepSeek AI Service Client
 * Provides integration with DeepSeek API (deepseek-chat / deepseek-reasoner).
 * Automatically reads API key from localStorage ('resume_buddy_deepseek_api_key')
 * or falls back to VITE_DEEPSEEK_API_KEY if configured.
 * Also provides robust, high-quality heuristic fallback when no API key is set.
 */

const STORAGE_KEY = "resume_buddy_deepseek_api_key";

export function getDeepSeekApiKey(): string {
	if (typeof window === "undefined") return "";
	try {
		return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_DEEPSEEK_API_KEY || "";
	} catch {
		return "";
	}
}

export function setDeepSeekApiKey(key: string): void {
	if (typeof window === "undefined") return;
	try {
		if (key.trim()) {
			localStorage.setItem(STORAGE_KEY, key.trim());
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
		window.dispatchEvent(new CustomEvent("deepseek_api_key_changed", { detail: { key: key.trim() } }));
	} catch {}
}

export interface DeepSeekChatOptions {
	systemPrompt?: string;
	temperature?: number;
	maxTokens?: number;
}

/**
 * Call DeepSeek chat completions API (https://api.deepseek.com/chat/completions)
 */
export async function callDeepSeekChat(
	userPrompt: string,
	options: DeepSeekChatOptions = {}
): Promise<string> {
	const apiKey = getDeepSeekApiKey();

	if (!apiKey) {
		throw new Error("NO_API_KEY");
	}

	const response = await fetch("https://api.deepseek.com/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: "deepseek-chat",
			messages: [
				{
					role: "system",
					content:
						options.systemPrompt ||
						"You are Zoe, an expert executive resume writer and ATS specialist. Write concise, powerful, metric-driven resume statements adhering strictly to true facts without inventing details.",
				},
				{
					role: "user",
					content: userPrompt,
				},
			],
			temperature: options.temperature ?? 0.6,
			max_tokens: options.maxTokens ?? 1024,
			stream: false,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`DeepSeek API Error (${response.status}): ${errorText}`);
	}

	const data = await response.json();
	return data.choices?.[0]?.message?.content?.trim() || "";
}

/**
 * Generate focused experience resume bullets using DeepSeek with intelligent heuristic fallback.
 */
export async function generateBulletsWithDeepSeek(
	experienceTitle: string,
	organization: string | undefined,
	userAnswer: string,
	existingContext: string = ""
): Promise<string[]> {
	const apiKey = getDeepSeekApiKey();

	if (apiKey) {
		try {
			const prompt = `Convert the following user answer into 1 to 2 professional, concise, and non-repetitive resume bullet points for the role/project: "${experienceTitle}"${organization ? ` at "${organization}"` : ""}.

Context: ${existingContext}
User's description of work done: "${userAnswer}"

Rules:
1. Output at most 2 high-impact bullet points. Do not create repetitive variations or restatements.
2. Start each bullet with a strong action verb (e.g., Architected, Engineered, Developed, Optimized, Spearheaded, Mentored).
3. Never invent numbers, metrics, or technologies not mentioned or implied by the user.
4. Keep each bullet concise, ATS-friendly, and professional (1 to 2 lines max).
5. Output ONLY the bullet points, each on its own line beginning with "• ". Do not output any conversational preamble or markdown headers.`;

			const raw = await callDeepSeekChat(prompt, {
				temperature: 0.3,
				maxTokens: 300,
			});

			const bullets = raw
				.split("\n")
				.map((line) => line.replace(/^[•\-\*\d\.\s]+/, "").trim())
				.filter((line) => line.length > 10)
				.slice(0, 2); // strictly max 2 per answer

			if (bullets.length > 0) {
				return bullets;
			}
		} catch (err) {
			console.warn("DeepSeek API failed, falling back to local extractor:", err);
		}
	}

	// High quality local heuristic fallback: produce at most 1-2 distinct bullet points
	const rawClean = userAnswer.replace(/^[•\-\*\d\.\s]+/, "").replace(/[.,;]+$/, "").trim();
	const bullet = rawClean.charAt(0).toUpperCase() + rawClean.slice(1);
	return [bullet];
}

