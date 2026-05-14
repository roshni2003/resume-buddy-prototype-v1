import { createHash } from "node:crypto";
import { basename, extname, normalize } from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { getStorageService, inferContentType } from "@/integrations/orpc/services/storage";
import { env } from "@/utils/env";

const storageService = getStorageService();

export const Route = createFileRoute("/uploads/$userId/$")({
	server: { handlers: { GET: handler } },
});

/**
 * Handler for GET requests to serve uploaded files, supporting ETags, content security, and path validation.
 * Handles nested paths like:
 * - /uploads/{userId}/pictures/{timestamp}.webp
 * - /uploads/{userId}/screenshots/{resumeId}/{timestamp}.webp
 * - /uploads/{userId}/pdfs/{resumeId}/{timestamp}.pdf
 */
async function handler({ request }: { request: Request }) {
	try {
		const searchParams = new URL(request.url).searchParams;
		const remoteUrl = searchParams.get("url");

		const { userId, filePath } = parseRouteParams(request.url);

		if (!userId || !filePath) return new Response("Bad Request", { status: 400 });

		if (!isValidPath(userId) || !isValidPathSegments(filePath)) return new Response("Forbidden", { status: 403 });

		let data: Uint8Array | undefined;
		let contentType: string | undefined;
		let size: number | undefined;
		let etag: string | undefined;

		// 1. Try to fetch from remote URL if provided (Server-side proxy mode)
		// This bypasses CORS and handles missing local S3 credentials
		if (remoteUrl) {
			try {
				// Security: Only allow trusted domains if necessary, or just proceed if it's our S3
				const response = await fetch(remoteUrl);
				if (response.ok) {
					const buffer = await response.arrayBuffer();
					data = new Uint8Array(buffer);
					contentType = response.headers.get("Content-Type") ?? undefined;
					size = data.length;
					etag = createEtag({ data, size, etag: response.headers.get("ETag") ?? undefined });
				}
			} catch (error) {
				console.error("[UploadProxy] Failed to fetch remote URL:", error);
			}
		}

		// 2. Fallback to local storageService if remote fetch failed or wasn't requested
		if (!data) {
			// Build the full storage key.
			// If the filePath already starts with a prefix (detected by containing 'uploads/'),
			// use it as is, otherwise construct the standard uploads/{userId}/{filePath} key.
			const key = filePath.includes("uploads/") ? filePath : `uploads/${userId}/${filePath}`;
			const storedFile = await storageService.read(key);

			if (!storedFile) return new Response(`Not Found: ${key}`, { status: 404 });

			data = storedFile.data;
			contentType = storedFile.contentType;
			size = storedFile.size;
			etag = storedFile.etag;
		}

		const filename = filePath.split("/").pop() ?? filePath;
		const ext = extname(filename).toLowerCase();
		contentType = contentType ?? inferContentType(filename);
		const finalEtag = etag ?? `"${size}-${Date.now()}"`;

		if (isNotModified(request.headers, finalEtag)) return makeNotModifiedResponse(finalEtag);

		const shouldForceDownload = [".pdf"].includes(ext);
		const headers = buildResponseHeaders({
			filename,
			storedFile: { size: size ?? 0 },
			contentType,
			etag: finalEtag,
			shouldForceDownload,
		});

		const buffer = toArrayBuffer(data);

		return new Response(buffer, { headers });
	} catch (error) {
		console.error("[UploadProxy] Error serving file:", error);
		return new Response(
			JSON.stringify({
				message: error instanceof Error ? error.message : "Internal Server Error",
				stack: error instanceof Error ? error.stack : undefined,
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}

/**
 * Extracts userId and the remaining file path from the request URL.
 */
function parseRouteParams(url: string): { userId: string | undefined; filePath: string | undefined } {
	const pathname = new URL(url).pathname;
	const pathAfterUploads = pathname.replace("/uploads/", "");
	const firstSlashIndex = pathAfterUploads.indexOf("/");

	if (firstSlashIndex === -1) {
		return { userId: pathAfterUploads, filePath: undefined };
	}

	const userId = pathAfterUploads.slice(0, firstSlashIndex);
	const filePath = pathAfterUploads.slice(firstSlashIndex + 1);

	return { userId, filePath: filePath || undefined };
}

/**
 * Validates that a path segment does not contain directory traversal attempts.
 */
function isValidPath(segment: string): boolean {
	const normalized = normalize(segment).replace(/^(\.\.(\/|\\|$))+/, "");

	return normalized === segment;
}

/**
 * Validates all segments in a path for directory traversal attempts.
 */
function isValidPathSegments(path: string): boolean {
	const segments = path.split("/");

	return segments.every((segment) => isValidPath(segment));
}

/**
 * Checks for ETag match for conditional GET requests.
 */
function isNotModified(headers: Headers, etag: string): boolean {
	const ifNoneMatch = headers.get("If-None-Match");
	const candidates = ifNoneMatch?.split(",").map((s) => s.trim()) ?? [];

	return candidates.includes(etag);
}

/**
 * Returns a 304 Not Modified response with caching headers.
 */
function makeNotModifiedResponse(etag: string): Response {
	return new Response(null, {
		status: 304,
		headers: { ETag: etag, "Cache-Control": "public, max-age=31536000, immutable" },
	});
}

type BuildResponseHeaderArgs = {
	filename: string;
	storedFile: { size: number };
	contentType: string;
	etag: string;
	shouldForceDownload: boolean;
};

/**
 * Builds all headers for serving the file, including caching, security, and download headers.
 */
function buildResponseHeaders({
	filename,
	storedFile,
	contentType,
	etag,
	shouldForceDownload,
}: BuildResponseHeaderArgs): Headers {
	const headers = new Headers();

	headers.set("Content-Type", shouldForceDownload ? "application/octet-stream" : contentType);
	headers.set("Content-Length", storedFile.size.toString());

	if (shouldForceDownload) {
		headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(basename(filename))}"`);
	}

	headers.set("Cache-Control", "public, max-age=31536000, immutable");
	headers.set("ETag", etag);

	// Security Headers
	headers.set("X-Content-Type-Options", "nosniff");
	headers.set("X-Robots-Tag", "noindex, nofollow");
	headers.set("Cross-Origin-Resource-Policy", "same-site");
	headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox;");
	headers.set("X-Frame-Options", "DENY");
	headers.set("X-Download-Options", "noopen");
	headers.set("Access-Control-Allow-Origin", env.APP_URL);

	return headers;
}

/**
 * Converts a Uint8Array to ArrayBuffer efficiently.
 */
function toArrayBuffer(data: Uint8Array): ArrayBuffer {
	return data.byteOffset === 0 && data.byteLength === data.buffer.byteLength
		? (data.buffer as ArrayBuffer)
		: (data.slice().buffer as ArrayBuffer);
}

/**
 * Generates or returns the ETag for a stored file.
 */
function createEtag(storedFile: { data: Uint8Array; size: number; etag?: string }): string {
	if (storedFile.etag) {
		const tag = storedFile.etag.trim();

		if (tag.startsWith("W/") || tag.startsWith('"')) {
			return tag;
		}
		return `"${tag}"`;
	}

	const hash = createHash("sha256").update(storedFile.data).digest("hex");

	return `"${storedFile.size}-${hash}"`;
}
