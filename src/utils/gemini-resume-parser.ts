/**
 * Gemini Resume Parser
 * -------------------
 * Uses the Gemini REST API (via fetch) to parse an uploaded PDF resume
 * directly in the browser without any backend server.
 *
 * Uses inline_data (base64) with generateContent so it executes in a single
 * CORS-safe JSON request without needing multipart resumable uploads.
 *
 * Requires VITE_AI_API_KEY to be set in .env.
 */

export interface ParsedContact {
	fullName: string;
	professionalTitle: string;
	email: string;
	phone: string;
	location: string;
	links: string; // comma-separated URLs
	summary: string;
}

export interface ParsedExperience {
	company: string;
	role: string;
	duration: string;
	description: string;
}

export interface ParsedEducation {
	institution: string;
	degree: string;
	year: string;
}

export interface ParsedEntry {
	id: string;
	title: string;
	organization: string;
	dates: string;
	category: "work" | "projects" | "education" | "volunteer";
	description: string;
	points: string[];
}

export interface GeminiParsedResume {
	contact: ParsedContact;
	skills: string[];
	entries: ParsedEntry[];
}

function getGeminiApiKey(): string {
	if (typeof window !== "undefined") {
		try {
			const stored = localStorage.getItem("resume_buddy_gemini_api_key");
			if (stored) return stored;
		} catch {}
	}
	return (import.meta.env.VITE_AI_API_KEY as string) || "";
}

function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			// Strip "data:<mime>;base64," prefix
			const base64 = result.includes(",") ? result.split(",")[1] : result;
			resolve(base64);
		};
		reader.onerror = () => reject(new Error("Failed to read file as base64"));
		reader.readAsDataURL(file);
	});
}

const EXTRACTION_PROMPT = `You are an expert resume parser. Extract ALL information from this resume document and return it as valid JSON.

IMPORTANT RULES:
- Extract ONLY information that is EXPLICITLY present in the resume. Do NOT invent, infer, or hallucinate any data.
- If a field is not present in the resume, return an empty string "" or empty array [].
- For descriptions/bullet points, extract the exact text as written in the resume.
- For skills, extract individual skill names (not category headers like "Programming Languages").
- For links, extract full URLs or profile handles (LinkedIn, GitHub, portfolio, etc.) present in the resume.
- Classify work/internships/jobs under "experience", academic projects/personal projects under "projects", degrees/schools under "education", and clubs/leadership/volunteering under "volunteer".

Return ONLY a JSON object matching this exact schema:
{
  "fullName": "string",
  "professionalTitle": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "links": "string (comma-separated URLs or handles)",
  "summary": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string (e.g. Jan 2023 – Present)",
      "points": ["string (each bullet point)"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "year": "string"
    }
  ],
  "projects": [
    {
      "name": "string",
      "organization": "string (URL or tech stack / subtitle if present, else empty string)",
      "duration": "string",
      "points": ["string (each bullet point)"]
    }
  ],
  "volunteer": [
    {
      "title": "string",
      "organization": "string",
      "duration": "string",
      "description": "string"
    }
  ]
}

Parse the resume document now and return only the JSON:`;

const GEMINI_MODELS = [
	import.meta.env.VITE_AI_MODEL as string | undefined,
	"gemini-2.0-flash",
	"gemini-2.5-flash",
	"gemini-1.5-flash",
].filter((m, idx, arr): m is string => Boolean(m) && arr.indexOf(m) === idx);

async function callGeminiWithInlineFile(
	base64Data: string,
	mimeType: string,
	apiKey: string
): Promise<string> {
	let lastError: Error | null = null;

	for (const rawModel of GEMINI_MODELS) {
		const model = rawModel.replace(/^models\//, "");
		const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{ text: EXTRACTION_PROMPT },
							{ inline_data: { mime_type: mimeType, data: base64Data } },
						],
					},
				],
				generationConfig: {
					temperature: 0.1,
					maxOutputTokens: 8192,
					responseMimeType: "application/json",
				},
			}),
		});

		if (res.ok) {
			const data = await res.json();
			const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
			if (text) return text;
		}

		const errBody = await res.json().catch(() => ({}));
		const errMsg = errBody?.error?.message || res.statusText;
		lastError = new Error(`Gemini API error (${model}, ${res.status}): ${errMsg}`);

		// Only retry with another model on 404 (model not found)
		if (res.status !== 404) {
			throw lastError;
		}
	}

	throw lastError || new Error("Failed to parse resume with Gemini.");
}

/**
 * Main function: parse a resume PDF using Gemini and return structured data
 */
export async function parseResumeWithGemini(file: File): Promise<GeminiParsedResume> {
	const apiKey = getGeminiApiKey();
	if (!apiKey) {
		throw new Error("GEMINI_NO_API_KEY: Please set VITE_AI_API_KEY in your .env file to enable resume parsing.");
	}

	const mimeType =
		file.type ||
		(file.name.toLowerCase().endsWith(".pdf")
			? "application/pdf"
			: "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

	const base64Data = await fileToBase64(file);
	const rawText = await callGeminiWithInlineFile(base64Data, mimeType, apiKey);

	let parsed: any;
	try {
		const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
		parsed = JSON.parse(cleaned);
	} catch {
		throw new Error("Gemini returned invalid JSON. Please try again or use a different PDF.");
	}

	const entries: ParsedEntry[] = [];

	// Work experience
	for (const [idx, exp] of (parsed.experience || []).entries()) {
		const pts: string[] = Array.isArray(exp.points)
			? exp.points.filter(Boolean)
			: exp.description
			? [exp.description]
			: [];
		if (!exp.company && !exp.role) continue;
		entries.push({
			id: `work_${Date.now()}_${idx}`,
			title: exp.role || exp.company || `Experience ${idx + 1}`,
			organization: exp.company || "",
			dates: exp.duration || "",
			category: "work",
			description: pts.join("\n"),
			points: pts,
		});
	}

	// Projects
	for (const [idx, proj] of (parsed.projects || []).entries()) {
		if (!proj.name) continue;
		const pts: string[] = Array.isArray(proj.points)
			? proj.points.filter(Boolean)
			: proj.description
			? [proj.description]
			: [];
		entries.push({
			id: `proj_${Date.now()}_${idx}`,
			title: proj.name,
			organization: proj.organization || "",
			dates: proj.duration || "",
			category: "projects",
			description: pts.join("\n"),
			points: pts,
		});
	}

	// Volunteer / Leadership
	for (const [idx, vol] of (parsed.volunteer || []).entries()) {
		if (!vol.title && !vol.organization) continue;
		entries.push({
			id: `vol_${Date.now()}_${idx}`,
			title: vol.title || vol.organization || `Activity ${idx + 1}`,
			organization: vol.organization || "",
			dates: vol.duration || "",
			category: "volunteer",
			description: vol.description || "",
			points: vol.description ? [vol.description] : [],
		});
	}

	// Education
	for (const [idx, edu] of (parsed.education || []).entries()) {
		if (!edu.institution && !edu.degree) continue;
		const title = [edu.degree, edu.field || ""].filter(Boolean).join(" ").trim() || `Education ${idx + 1}`;
		entries.push({
			id: `edu_${Date.now()}_${idx}`,
			title,
			organization: edu.institution || "",
			dates: edu.year || "",
			category: "education",
			description: edu.institution ? `${title} at ${edu.institution}` : title,
			points: [],
		});
	}

	const contact: ParsedContact = {
		fullName: parsed.fullName || "",
		professionalTitle: parsed.professionalTitle || "",
		email: parsed.email || "",
		phone: parsed.phone || "",
		location: parsed.location || "",
		links: parsed.links || "",
		summary: parsed.summary || "",
	};

	const skills: string[] = Array.isArray(parsed.skills)
		? parsed.skills.filter((s: any) => typeof s === "string" && s.trim())
		: [];

	return { contact, skills, entries };
}
