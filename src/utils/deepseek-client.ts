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

/**
 * Extract distinct items/topics mentioned in user's story to display in "Here's what I heard" checklist
 */
export async function extractTopicsFromStory(
	experienceTitle: string,
	organization: string | undefined,
	storyAnswer: string
): Promise<string[]> {
	const apiKey = getDeepSeekApiKey();

	if (apiKey) {
		try {
			const prompt = `The user described their experience as "${experienceTitle}"${organization ? ` at "${organization}"` : ""}:
"${storyAnswer}"

Extract 2 to 4 distinct key projects, responsibilities, features, or work items mentioned in their response.
Each item should be a short phrase (2 to 5 words, e.g. "AI resume builder", "English app placement feature", "Mentoring juniors").
Output ONLY the short items, one per line, with no bullets, numbering, or conversational filler.`;

			const raw = await callDeepSeekChat(prompt, {
				temperature: 0.3,
				maxTokens: 200,
			});

			const items = raw
				.split("\n")
				.map((line) => line.replace(/^[•\-\*\d\.\s]+/, "").trim())
				.filter((line) => line.length > 2 && line.length < 60);

			if (items.length > 0) {
				return items;
			}
		} catch (err) {
			console.warn("DeepSeek topic extraction error:", err);
		}
	}

	// Heuristic extraction fallback
	const parts = storyAnswer
		.split(/(?:\r?\n)+|(?<=[.!?])\s+|;\s*|(?:\s+and\s+(?:also|additionally)?\s+)|,\s*(?:and\s+)?/i)
		.map((p) => p.trim())
		.filter((p) => p.length > 4 && !/^(i|we|my|the|in|at|on|for|with)$/i.test(p))
		.map((p) => {
			const clean = p.replace(/^(i\s+(?:worked\s+on|built|created|developed|helped\s+with|led|handled|managed)\s+)/i, "").trim();
			return clean.charAt(0).toUpperCase() + clean.slice(1);
		});

	return parts.length > 0 ? parts.slice(0, 4) : [experienceTitle];
}

/**
 * Generate a follow-up probe question for a specific extracted topic
 */
export async function generateFollowUpQuestionForTopic(
	topic: string,
	experienceTitle: string,
	organization?: string
): Promise<string> {
	const apiKey = getDeepSeekApiKey();
	if (apiKey) {
		try {
			const prompt = `You are Zoe, an expert interview coach for resumes.
For a role as "${experienceTitle}"${organization ? ` at "${organization}"` : ""}, the candidate mentioned working on: "${topic}".
Generate ONE concise, conversational question asking about their specific technical role, challenge solved, or measurable outcome regarding "${topic}".
Keep it friendly and under 25 words. Return ONLY the question.`;
			const raw = await callDeepSeekChat(prompt, {
				temperature: 0.4,
				maxTokens: 100,
			});
			if (raw.trim()) {
				return raw.trim();
			}
		} catch (err) {
			console.warn("Failed to generate follow-up question with AI:", err);
		}
	}

	return `What was your specific role and key contribution in "${topic}"?`;
}


