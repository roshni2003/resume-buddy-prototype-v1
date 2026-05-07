import "./get-strict-context-CE5mktmJ.js";
import "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import "./style-BVXxCckg.js";
import "./input-C4lW-WI7.js";
import "./rich-input-Coij_gNW.js";
import "./spinner-D8fbffbw.js";
import { t as LoadingScreen } from "./loading-screen-CHUPzkEh.js";
import "./locale-BPZR263U.js";
import "./alert-dialog-D16KSnDL.js";
import { t as useResumeStore } from "./resume-BHY1IvQp.js";
import "./section-lTXHolph.js";
import { t as ResumePreview } from "./preview-DuwnsKqF.js";
import { useEffect, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
var routeApi = getRouteApi("/printer/$resumeId");
function RouteComponent() {
	const loaderData = routeApi.useLoaderData();
	const { token: searchToken } = routeApi.useSearch();
	const { resumeId } = routeApi.useParams();
	const isReady = useResumeStore((state) => state.isReady);
	const initialize = useResumeStore((state) => state.initialize);
	const [clientResume, setClientResume] = useState(loaderData?.resume ?? null);
	const token = loaderData?.token ?? searchToken;
	useEffect(() => {
		if (clientResume) return;
		if (token !== "preview" && searchToken !== "preview") return;
		const fetchResume = async () => {
			try {
				const { api } = await import("./api-uJy1v23g.js");
				setClientResume(await api.fetchResume(resumeId));
			} catch (error) {
				console.error(`[Printer] Client-side fetch failed for ${resumeId}:`, error);
				window.parent.postMessage({
					type: "PRINTER_ERROR",
					resumeId,
					message: String(error)
				}, "*");
			}
		};
		fetchResume();
	}, [
		clientResume,
		token,
		searchToken,
		resumeId
	]);
	useEffect(() => {
		if (!clientResume) return;
		initialize(clientResume);
	}, [clientResume, initialize]);
	useEffect(() => {
		if (isReady) document.body.setAttribute("data-wf-loaded", "true");
		else document.body.removeAttribute("data-wf-loaded");
	}, [isReady]);
	useEffect(() => {
		if (isReady && (token === "preview" || searchToken === "preview")) window.parent.postMessage({
			type: "RESUME_READY",
			resumeId: clientResume?.id ?? resumeId
		}, "*");
	}, [
		isReady,
		token,
		searchToken,
		clientResume?.id,
		resumeId
	]);
	if (!isReady) {
		if (token === "preview" || searchToken === "preview") return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-white" });
		return /* @__PURE__ */ jsx(LoadingScreen, {});
	}
	return /* @__PURE__ */ jsx(ResumePreview, { pageClassName: "print:w-full!" });
}
export { RouteComponent as component };
