import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { aiService } from "@/integrations/orpc/services/ai";

const requestSchema = z.object({
	provider: z.enum(["ollama", "openai", "gemini", "anthropic", "vercel-ai-gateway"]),
	model: z.string(),
	apiKey: z.string(),
	baseURL: z.string().optional(),
	resume: z.record(z.string(), z.unknown()),
	photo: z
		.object({
			url: z.string().optional(),
			visible: z.boolean().optional(),
		})
		.optional(),
});

async function handler({ request }: { request: Request }) {
	try {
		// Only allow POST requests
		if (request.method !== "POST") {
			return new Response(JSON.stringify({ error: "Method not allowed" }), {
				status: 405,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Parse request body
		const body = await request.json();

		// Validate input
		const validatedInput = requestSchema.parse(body);

		// Prepare input with required baseURL
		const finalReviewInput = {
			...validatedInput,
			baseURL: validatedInput.baseURL || "",
		};

		// Call the AI service
		const result = await aiService.finalReview(finalReviewInput);

		// Return success response
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Final Review API Error:", error);

		// Handle validation errors
		if (error instanceof z.ZodError) {
			return new Response(
				JSON.stringify({
					error: "Validation failed",
					details: error.issues,
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Handle other errors
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Internal server error",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}

export const Route = createFileRoute("/api/ai/final-review")({
	server: {
		handlers: {
			POST: handler,
		},
	},
});
