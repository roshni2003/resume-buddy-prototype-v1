import { createFileRoute, getRouteApi, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { ResumePreview } from "@/components/resume/preview";
import { useResumeStore } from "@/components/resume/store/resume";
import { env } from "@/utils/env";
import { isStandaloneMode } from "@/utils/local-resumes";
import { verifyPrinterToken } from "@/utils/printer-token";

const searchSchema = z.object({
	token: z.string().catch(""),
	print: z.string().optional().catch(""),
});

export const Route = createFileRoute("/printer/$resumeId")({
	component: RouteComponent,
	validateSearch: zodValidator(searchSchema),
	head: ({ loaderData }) => {
		if (loaderData?.token === "preview" || loaderData?.token === "print") {
			return {
				styles: [
					{
						children:
							"html, body { background-color: white !important; color-scheme: light !important; } .dark { background-color: white !important; } @media print { @page { margin: 0; size: auto; } html, body { background: white !important; margin: 0 !important; padding: 0 !important; } .page { content-visibility: visible !important; } }",
					},
				],
			};
		}
		return {};
	},
	// @ts-expect-error - types mis-match
	beforeLoad: ({ params, search }) => {
		if (env.VITE_FLAG_DEBUG_PRINTER || isStandaloneMode()) return {};

		// Allow preview or print token for direct/client-side printing and dashboard cards
		if (search?.token === "preview" || search?.token === "print") return {};

		try {
			// Verify the token and ensure it matches the resume ID
			const tokenResumeId = verifyPrinterToken(search?.token || "");
			if (tokenResumeId !== params.resumeId) throw new Error();
		} catch {
			// Invalid or missing token - throw error to be caught by error handler
			throw redirect({ to: "/", search: {}, throw: true });
		}
	},
	loader: async ({ params, search }: any) => {
		try {
			if (search?.token === "preview" || search?.token === "print") {
				// Preview or direct print mode: load client-side or fallback if server-side
				if (typeof window === "undefined") {
					return {
						resume: { description: "Graduated with honors. Major in Computer Science.", currentlyStudyingHere: false },
						token: search?.token,
						print: search?.print,
					};
				}
				const { api } = await import("@/utils/api");
				const previewResume = await api.fetchResume(params.resumeId);
				return { resume: previewResume, token: search?.token, print: search?.print };
			}

			const { api } = await import("@/utils/api");
			const resume = await api.fetchResume(params.resumeId);
			return { resume, token: search?.token, print: search?.print };
		} catch (error) {
			console.error(`[Printer] Failed to load resume ${params.resumeId}:`, error);
			if (typeof window !== "undefined") {
				window.parent.postMessage({ type: "PRINTER_ERROR", resumeId: params.resumeId, message: String(error) }, "*");
			}
			return { resume: null, token: search?.token, print: search?.print };
		}
	},
});

const routeApi = getRouteApi("/printer/$resumeId");

function RouteComponent() {
	const loaderData = routeApi.useLoaderData() as { resume: any; token: string; print?: string } | undefined;
	const { token: searchToken, print: searchPrint } = routeApi.useSearch();
	const { resumeId } = routeApi.useParams();

	const isReady = useResumeStore((state) => state.isReady);
	const initialize = useResumeStore((state) => state.initialize);

	const [clientResume, setClientResume] = useState<any>(loaderData?.resume ?? null);
	const token = loaderData?.token ?? searchToken;
	const shouldAutoPrint = (loaderData?.print ?? searchPrint) === "1" || token === "print";

	// Client-side fetch for preview mode when server returned null
	useEffect(() => {
		if (clientResume) return;
		if (token !== "preview" && searchToken !== "preview" && token !== "print" && searchToken !== "print") return;

		const fetchResume = async () => {
			try {
				const { api } = await import("@/utils/api");
				const resume = await api.fetchResume(resumeId);
				setClientResume(resume);
			} catch (error) {
				console.error(`[Printer] Client-side fetch failed for ${resumeId}:`, error);
				window.parent.postMessage({ type: "PRINTER_ERROR", resumeId, message: String(error) }, "*");
			}
		};

		fetchResume();
	}, [clientResume, token, searchToken, resumeId]);

	useEffect(() => {
		if (!clientResume) return;
		initialize(clientResume);
	}, [clientResume, initialize]);

	useEffect(() => {
		if (isReady) {
			document.body.setAttribute("data-wf-loaded", "true");
		} else {
			document.body.removeAttribute("data-wf-loaded");
		}
	}, [isReady]);

	// Signal to parent window (dashboard card) that the resume is ready
	useEffect(() => {
		if (isReady && (token === "preview" || searchToken === "preview")) {
			window.parent.postMessage({ type: "RESUME_READY", resumeId: clientResume?.id ?? resumeId }, "*");
		}
	}, [isReady, token, searchToken, clientResume?.id, resumeId]);

	// Auto-trigger native print dialog when opened in standalone print window
	useEffect(() => {
		if (isReady && shouldAutoPrint) {
			// If inside an iframe, let the parent controller call iframe.contentWindow.print()
			// to avoid conflicting before rendering finishes
			const isIframe = window.self !== window.top;
			if (isIframe) {
				window.parent.postMessage({ type: "PRINTER_READY", resumeId }, "*");
				return;
			}

			const timer = setTimeout(() => {
				window.print();
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [isReady, shouldAutoPrint, resumeId]);

	if (!isReady) {
		if (token === "preview" || searchToken === "preview" || token === "print" || searchToken === "print") {
			return <div className="fixed inset-0 bg-white" />;
		}
		return <LoadingScreen />;
	}

	return <ResumePreview pageClassName="print:w-full!" />;
}
