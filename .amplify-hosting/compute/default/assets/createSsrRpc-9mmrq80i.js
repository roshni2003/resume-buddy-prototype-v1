import _slugify from "@sindresorhus/slugify";
import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { v7 } from "uuid";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import { p as TSS_SERVER_FUNCTION } from "./createServerFn-Ch6eBU8Y.js";
import { r as __esmMin } from "./get-strict-context-CE5mktmJ.js";

function generateId() {
	return v7();
}
function slugify(value) {
	return _slugify(value, { decamelize: false });
}
function getInitials(name) {
	return name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}
function toUsername(value) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9._-]/g, "")
		.slice(0, 64);
}
function generateRandomName() {
	return uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		style: "capital",
		separator: " ",
		length: 3,
	});
}
function stripHtml(html) {
	if (!html) return "";
	return html.replace(/<[^>]*>/g, "").trim();
}
var init_string = __esmMin(() => {});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true,
	});
};
export {
	init_string as a,
	toUsername as c,
	getInitials as i,
	generateId as n,
	slugify as o,
	generateRandomName as r,
	stripHtml as s,
	createSsrRpc as t,
};
