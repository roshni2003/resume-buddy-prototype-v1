import http from "node:http";
import handler from "./app.js";

process.on("uncaughtException", (err) => {
	console.error("[uncaughtException]", err);
});
process.on("unhandledRejection", (err) => {
	console.error("[unhandledRejection]", err);
});

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

const server = http.createServer(async (req, res) => {
	try {
		const url = `http://${req.headers.host || "localhost"}${req.url}`;

		const headers = new Headers();
		for (const [key, value] of Object.entries(req.headers)) {
			if (Array.isArray(value)) {
				for (const v of value) headers.append(key, v);
			} else if (value !== undefined) {
				headers.set(key, value);
			}
		}

		let body;
		if (req.method !== "GET" && req.method !== "HEAD") {
			const chunks = [];
			for await (const chunk of req) chunks.push(chunk);
			body = Buffer.concat(chunks);
		}

		const request = new Request(url, {
			method: req.method,
			headers,
			body,
			duplex: "half",
		});

		const response = await handler.fetch(request);

		res.statusCode = response.status;
		response.headers.forEach((value, key) => {
			res.setHeader(key, value);
		});

		if (response.body) {
			const reader = response.body.getReader();
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				res.write(value);
			}
		}
		res.end();
	} catch (err) {
		console.error("[request error]", err);
		if (!res.headersSent) {
			res.statusCode = 500;
			res.setHeader("content-type", "text/plain");
		}
		res.end(`Internal Server Error: ${err?.message || "unknown"}`);
	}
});

server.listen(port, host, () => {
	console.log(`Server listening on http://${host}:${port}`);
});
