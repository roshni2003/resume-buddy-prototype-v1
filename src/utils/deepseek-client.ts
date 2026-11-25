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
Each item should be a short phrase (2 to 5 words, e.g. "Responsive dashboard UI", "Authentication flow", "API performance optimization").
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

export type ExperienceLevel = "junior" | "mid" | "senior" | "lead";

/**
 * Detect experience level based on title, target role, and description
 */
export function detectExperienceLevel(
	experienceTitle: string,
	targetRole?: string,
	description?: string
): ExperienceLevel {
	const tLower = (experienceTitle || "").toLowerCase();
	const rLower = (targetRole || "").toLowerCase();
	const dLower = (description || "").toLowerCase();

	const hasJuniorKeyword =
		/\b(junior|jr\.?|intern|internship|trainee|apprentice|entry[- ]level|fresher|graduate|student|beginner)\b/i.test(tLower) ||
		(/\b(junior|jr\.?|intern|internship|trainee|fresher|entry[- ]level)\b/i.test(rLower) &&
			!/\b(senior|lead|principal|staff|architect|manager)\b/i.test(tLower));

	if (hasJuniorKeyword) {
		return "junior";
	}

	if (
		/\b(lead|principal|staff|architect|director|head of|manager|engineering manager|tech lead|vp)\b/i.test(tLower) ||
		/\b(lead|principal|staff|architect|director|head of|manager|engineering manager|tech lead|vp)\b/i.test(rLower)
	) {
		return "lead";
	}

	if (/\b(senior|sr\.?|veteran|specialist)\b/i.test(tLower) || /\b(senior|sr\.?)\b/i.test(rLower)) {
		return "senior";
	}

	return "mid";
}

/**
 * Generate a follow-up probe question for a specific extracted topic,
 * strictly calibrated to the candidate's actual role and experience level.
 */
export async function generateFollowUpQuestionForTopic(
	topic: string,
	experienceTitle: string,
	organization?: string,
	targetRole?: string
): Promise<string> {
	const level = detectExperienceLevel(experienceTitle, targetRole || "");
	const orgContext = organization ? ` at "${organization}"` : "";

	const apiKey = getDeepSeekApiKey();
	if (apiKey) {
		try {
			const prompt = `You are Zoe, an expert interview coach helping candidates craft high-impact resume bullet points.
Candidate Context:
- Target Role: "${targetRole || experienceTitle}"
- Current Role / Project: "${experienceTitle}"${orgContext}
- Experience Level: ${level.toUpperCase()}
- Topic Candidate Worked On: "${topic}"

Task:
Generate ONE concise, conversational follow-up interview question about "${topic}".

STRICT GUIDELINES:
1. Relevance to Role & Experience Level:
${
	level === "junior"
		? `- The candidate is JUNIOR / ENTRY-LEVEL. NEVER ask how they mentored juniors, guided teammates, managed people, or designed enterprise architecture. Ask about their specific hands-on tasks, tools used, components or code written, challenges they solved, or what they learned.`
		: ""
}
${
	level === "senior" || level === "lead"
		? `- The candidate is SENIOR / LEAD. Ask about technical leadership, architecture choices, mentoring, code standards, or scaling challenges.`
		: ""
}
${
	level === "mid"
		? `- The candidate is MID-LEVEL. Focus on feature ownership, technical complexity, performance optimization, and measurable results.`
		: ""
}
2. Tone & Length: Friendly, conversational, professional. Under 25 words.
3. Output format: Return ONLY the question text without quotes, explanation, or prefix.`;

			const raw = await callDeepSeekChat(prompt, {
				temperature: 0.4,
				maxTokens: 100,
			});
			if (raw.trim()) {
				return raw.trim().replace(/^["']|["']$/g, "");
			}
		} catch (err) {
			console.warn("Failed to generate follow-up question with AI:", err);
		}
	}

	// Smart fallback calibrated strictly to actual role and experience level
	if (level === "junior") {
		return `What specific tasks or components did you implement for "${topic}", and what technologies did you use?`;
	}
	if (level === "lead") {
		return `How did you architect and lead the implementation of "${topic}"?`;
	}
	if (level === "senior") {
		return `What key architectural decisions or scaling challenges did you tackle regarding "${topic}"?`;
	}
	return `What was your specific role and key contribution in "${topic}"?`;
}


