import { slugify } from "./string";

function getReadableTimestamp(now: Date) {
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, "0");
	const d = String(now.getDate()).padStart(2, "0");
	const h = String(now.getHours()).padStart(2, "0");
	const min = String(now.getMinutes()).padStart(2, "0");

	return `${y}${m}${d}_${h}${min}`;
}

export function generateFilename(prefix: string, extension?: string) {
	const now = new Date();
	const name = slugify(prefix);
	const timestamp = getReadableTimestamp(now);

	return `${name}_${timestamp}${extension ? `.${extension}` : ""}`;
}

export function downloadWithAnchor(blob: Blob, filename: string) {
	const a = document.createElement("a");
	const url = URL.createObjectURL(blob);

	a.href = url;
	a.rel = "noopener";
	a.download = filename;

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	setTimeout(() => URL.revokeObjectURL(url), 500);
}

export async function downloadFromUrl(url: string, filename: string) {
	let downloadUrl = url;

	// If the URL is a direct S3 URL pointing to an internal upload,
	// try to use the local proxy to bypass CORS entirely and force download headers.
	if (url.includes(".amazonaws.com") && url.includes("/uploads/")) {
		try {
			const urlObj = new URL(url);
			// We use the server-side fetch feature of our proxy by passing ?url=
			downloadUrl = `/uploads/proxy${urlObj.pathname}?url=${encodeURIComponent(url)}`;
		} catch {
			// Fallback to original URL if URL parsing fails
		}
	}

	try {
		// Attempt to download using fetch (allows for custom filename via Blob)
		const response = await fetch(downloadUrl);
		if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);

		const blob = await response.blob();
		downloadWithAnchor(blob, filename);
	} catch (error) {
		console.warn("CORS or network error, falling back to direct download link:", error);

		// Fallback: Direct download link via a hidden anchor
		const a = document.createElement("a");
		a.href = downloadUrl;
		a.download = filename;
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
}
