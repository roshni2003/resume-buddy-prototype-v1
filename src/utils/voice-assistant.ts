/**
 * Standalone Client-Side AI & Speech Engine for Resume Buddy V1
 * Supports native Web Speech API (speech-to-text) and smart heuristic bullet formulation.
 */

// 1. Web Speech API Speech-to-Text Recognition
export interface SpeechRecognitionResult {
	transcript: string;
	isFinal: boolean;
}

export class VoiceAssistant {
	private recognition: any = null;
	private isSupported: boolean = false;

	constructor() {
		if (typeof window !== "undefined") {
			const SpeechRecognition =
				(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
			if (SpeechRecognition) {
				this.recognition = new SpeechRecognition();
				this.recognition.continuous = false;
				this.recognition.interimResults = true;
				this.recognition.lang = "en-US";
				this.isSupported = true;
			}
		}
	}

	public getSupported(): boolean {
		return this.isSupported;
	}

	public start(
		onResult: (text: string, isFinal: boolean) => void,
		onError?: (error: string) => void,
		onEnd?: () => void
	): boolean {
		if (!this.recognition) {
			if (onError) onError("Web Speech Recognition is not supported in this browser.");
			return false;
		}

		try {
			this.recognition.onresult = (event: any) => {
				let interimTranscript = "";
				let finalTranscript = "";

				for (let i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						finalTranscript += event.results[i][0].transcript;
					} else {
						interimTranscript += event.results[i][0].transcript;
					}
				}

				const currentText = finalTranscript || interimTranscript;
				onResult(currentText.trim(), Boolean(finalTranscript));
			};

			this.recognition.onerror = (event: any) => {
				console.warn("[VoiceAssistant] Speech error:", event.error);
				if (onError) onError(event.error);
			};

			this.recognition.onend = () => {
				if (onEnd) onEnd();
			};

			this.recognition.start();
			return true;
		} catch (err: any) {
			console.warn("[VoiceAssistant] Failed to start recognition:", err);
			if (onError) onError(err.message || "Failed to access microphone.");
			return false;
		}
	}

	public stop() {
		if (this.recognition) {
			try {
				this.recognition.stop();
			} catch (e) {
				// ignore
			}
		}
	}
}

export const voiceAssistant = new VoiceAssistant();

// 2. Client-side AI Bullet Point Formulator & Enhancer
export function formatAchievementBullet(input: {
	role?: string;
	contribution: string;
	problem?: string;
	evidenceResult?: string;
}): string {
	const contribution = (input.contribution || "").trim();
	const evidence = (input.evidenceResult || "").trim();
	const problem = (input.problem || "").trim();

	if (!contribution && !evidence) {
		return "Contributed to project development and collaborated across cross-functional requirements.";
	}

	// Action verb standardizer
	const cleanContribution = contribution
		.replace(/^i\s+(built|developed|made|created|worked\s+on)/i, "")
		.replace(/^built\s+/i, "")
		.replace(/^developed\s+/i, "")
		.trim();

	const actionVerbs = ["Architected", "Engineered", "Developed", "Spearheaded", "Implemented", "Designed"];
	const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];

	const basePart = cleanContribution
		? `${randomVerb} ${cleanContribution.charAt(0).toLowerCase() + cleanContribution.slice(1)}`
		: "Implemented core project features";

	let bullet = basePart.replace(/\.+$/, "");

	if (problem && !bullet.toLowerCase().includes(problem.toLowerCase())) {
		bullet += `, resolving ${problem.toLowerCase()}`;
	}

	if (evidence) {
		const cleanEvidence = evidence.replace(/^(the|resulting\s+in|which)\s+/i, "");
		bullet += `, ensuring ${cleanEvidence.charAt(0).toLowerCase() + cleanEvidence.slice(1)}`;
	}

	return bullet.endsWith(".") ? bullet : `${bullet}.`;
}

// 3. Client-side Professional Summary Generator
export function generateSmartSummary(input: {
	name?: string;
	targetRole?: string;
	skills?: string[];
	experienceBullets?: string[];
}): string {
	const role = input.targetRole || "Software Professional";
	const skillsList = (input.skills && input.skills.length > 0)
		? input.skills.slice(0, 4).join(", ")
		: "React, TypeScript, and modern web architectures";

	return `Results-oriented ${role} with proven hands-on experience developing high-performance applications. Proficient in ${skillsList}, with a strong commitment to clean code quality, responsive design, and user-centered solutions. Adept at translating complex product requirements into robust, scalable production deliverables.`;
}
