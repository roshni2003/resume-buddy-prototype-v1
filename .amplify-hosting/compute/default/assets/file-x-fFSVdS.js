import { a as init_string, o as slugify } from "./createSsrRpc-9mmrq80i.js";

init_string();
function getReadableTimestamp(now) {
	return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
}
function generateFilename(prefix, extension) {
	const now = /* @__PURE__ */ new Date();
	return `${slugify(prefix)}_${getReadableTimestamp(now)}${extension ? `.${extension}` : ""}`;
}
function downloadWithAnchor(blob, filename) {
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
async function downloadFromUrl(url, filename) {
	let downloadUrl = url;
	if (url.includes(".amazonaws.com") && url.includes("/uploads/"))
		try {
			downloadUrl = `/uploads/proxy${new URL(url).pathname}?url=${encodeURIComponent(url)}`;
		} catch {}
	try {
		const response = await fetch(downloadUrl);
		if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
		downloadWithAnchor(await response.blob(), filename);
	} catch (error) {
		console.warn("CORS or network error, falling back to direct download link:", error);
		const a = document.createElement("a");
		a.href = downloadUrl;
		a.download = filename;
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
}
export { generateFilename as n, downloadFromUrl as t };
