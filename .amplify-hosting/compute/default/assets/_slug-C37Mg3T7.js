import "./get-strict-context-CE5mktmJ.js";
import "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import { n as Button } from "./input-C4lW-WI7.js";
import { t as cn } from "./style-BVXxCckg.js";
import "./rich-input-Dxvyx_Hq.js";
import { t as Spinner } from "./spinner-D8fbffbw.js";
import "./locale-BPZR263U.js";
import "./alert-dialog-D16KSnDL.js";
import { t as api } from "./api-CLpzZUWU.js";
import "./resume-BHY1IvQp.js";
import { t as Route } from "./_slug-DYLf7XVf.js";
import "./section-lTXHolph.js";
import { Trans } from "@lingui/react";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { t as downloadFromUrl } from "./file-x-fFSVdS.js";
import { t as ResumePreview } from "./preview-BAUdtGCW.js";

function PublicResumePage() {
	const { resume } = Route.useLoaderData();
	const { mutateAsync: exportResume, isPending: isPrinting } = useMutation({
		mutationFn: (data) => api.exportResume(data.id, data.format),
	});
	const handleDownload = useCallback(async () => {
		if (!resume) return;
		const { url } = await exportResume({
			id: resume.id,
			format: "pdf",
		});
		downloadFromUrl(url, `resume-${resume.name}.pdf`);
	}, [resume, exportResume]);
	return /* @__PURE__ */ jsxs(Fragment$1, {
		children: [
			/* @__PURE__ */ jsx("div", {
				className: cn("mx-auto max-w-[210mm]", "print:m-0 print:block print:max-w-full print:px-0", "md:my-4 md:px-4"),
				children: /* @__PURE__ */ jsx(ResumePreview, { pageClassName: "print:w-full! w-full max-w-full" }),
			}),
			/* @__PURE__ */ jsxs(Button, {
				size: "lg",
				variant: "secondary",
				disabled: isPrinting,
				className: "fixed end-4 bottom-4 z-50 hidden rounded-full px-4 md:inline-flex print:hidden",
				onClick: handleDownload,
				children: [
					isPrinting ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsx(DownloadSimpleIcon, {}),
					isPrinting ? /* @__PURE__ */ jsx(Trans, { id: "cCfxH1" }) : /* @__PURE__ */ jsx(Trans, { id: "mzI/c+" }),
				],
			}),
		],
	});
}
export { PublicResumePage as component };
