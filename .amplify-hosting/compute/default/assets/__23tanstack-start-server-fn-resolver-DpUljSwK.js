var manifest = {
	"4cf8a2dd9971804ed852b0e8800e0801d53148f92b5cde984ecc2402a068ba3c": {
		functionName: "setBuilderLayoutServerFn_createServerFn_handler",
		importer: () => import("./route-BaCO0mPN.js"),
	},
	"87b9e274e18165348265760f0c6066b95da714ecd2e1a1b30427498be3225e01": {
		functionName: "getBuilderLayoutServerFn_createServerFn_handler",
		importer: () => import("./route-BaCO0mPN.js"),
	},
	"71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9": {
		functionName: "setThemeServerFn_createServerFn_handler",
		importer: () => import("./theme-BFE62aGt.js"),
	},
	"14080f89ae495ac5a5d573b2a10df3d783b0f8d025c02f37771c42e9f7e4faa7": {
		functionName: "setLocaleServerFn_createServerFn_handler",
		importer: () => import("./locale-BJir1nOA.js"),
	},
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? (await serverFnInfo.importer());
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
export { getServerFnById as t };
