import { p as TSS_SERVER_FUNCTION } from "./createServerFn-Ch6eBU8Y.js";

var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true,
	});
};
export { createServerRpc as t };
