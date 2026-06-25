import { Trans } from "@lingui/react/macro";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useCallback } from "react";
import { ResumePreview } from "@/components/resume/preview";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/utils/api";
import { downloadFromUrl } from "@/utils/file";

import { cn } from "@/utils/style";

export const Route = createFileRoute("/$username/$slug")({
	component: PublicResumePage,
	loader: async ({ params: { username, slug } }) => {
		try {
			// Ignore .well-known requests
			if (username === ".well-known") throw notFound();

			const resumes = await api.fetchResumes();
			const resume = resumes.find((resume) => resume.slug === slug);

			if (!resume) throw notFound();

			return { resume };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title:
					loaderData && "resume" in loaderData && loaderData.resume
						? `${loaderData.resume.name} - Resume Buddy`
						: "Resume Buddy",
			},
		],
	}),
	// Authentication and password-protected resumes are not supported in this build.
});
function PublicResumePage() {
	const { resume } = Route.useLoaderData();

	const { mutateAsync: exportResume, isPending: isPrinting } = useMutation({
		mutationFn: (data: { id: string; format: "pdf" | "docx" }) => api.exportResume(data.id, data.format),
	});

	const handleDownload = useCallback(async () => {
		if (!resume) return;
		const { url } = await exportResume({ id: resume.id, format: "pdf" });
		downloadFromUrl(url, `resume-${resume.name}.pdf`);
	}, [resume, exportResume]);

	return (
		<>
			<div
				className={cn("mx-auto max-w-[210mm]", "print:m-0 print:block print:max-w-full print:px-0", "md:my-4 md:px-4")}
			>
				<ResumePreview pageClassName="print:w-full! w-full max-w-full" />
			</div>

			<Button
				size="lg"
				variant="secondary"
				disabled={isPrinting}
				className="fixed end-4 bottom-4 z-50 hidden rounded-full px-4 md:inline-flex print:hidden"
				onClick={handleDownload}
			>
				{isPrinting ? <Spinner /> : <DownloadSimpleIcon />}
				{isPrinting ? <Trans>Downloading...</Trans> : <Trans>Download</Trans>}
			</Button>
		</>
	);
}
