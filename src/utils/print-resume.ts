/**
 * Trigger client-side printing for a resume in a clean, isolated iframe or fallback window.
 * This provides a guaranteed PDF generation and save option when the remote server printer is unavailable.
 */
export function printResumeClientSide(resumeId: string): void {
	if (typeof window === "undefined") return;

	const printUrl = `/printer/${resumeId}?token=print&print=1`;

	try {
		const existingIframe = document.getElementById("print-resume-iframe");
		if (existingIframe) {
			existingIframe.remove();
		}

		const iframe = document.createElement("iframe");
		iframe.id = "print-resume-iframe";
		// Must not be display: none or 0x0 or some browsers will skip rendering layout/styles before print
		iframe.style.position = "fixed";
		iframe.style.right = "0";
		iframe.style.bottom = "0";
		iframe.style.width = "1024px";
		iframe.style.height = "1024px";
		iframe.style.opacity = "0";
		iframe.style.pointerEvents = "none";
		iframe.style.border = "none";
		iframe.style.zIndex = "-9999";
		iframe.src = printUrl;

		let printed = false;
		const triggerPrint = () => {
			if (printed) return;
			printed = true;
			try {
				const iframeWin = iframe.contentWindow;
				if (!iframeWin) throw new Error("No iframe window");
				iframeWin.focus();
				iframeWin.print();
			} catch (err) {
				console.warn("Iframe print invocation failed, falling back to new window:", err);
				window.open(printUrl, "_blank", "noopener,noreferrer");
			}
		};

		// Listen for PRINTER_READY message from the printer component
		const onMessage = (event: MessageEvent) => {
			if (event.data?.type === "PRINTER_READY" && event.data?.resumeId === resumeId) {
				window.removeEventListener("message", onMessage);
				setTimeout(triggerPrint, 300);
			}
		};
		window.addEventListener("message", onMessage);

		iframe.onload = () => {
			// Fallback trigger if PRINTER_READY message doesn't fire
			setTimeout(() => {
				if (!printed) {
					triggerPrint();
				}
			}, 1500);
		};

		document.body.appendChild(iframe);

		// Safety timeout fallback
		setTimeout(() => {
			if (!printed) {
				window.removeEventListener("message", onMessage);
				triggerPrint();
			}
		}, 4000);
	} catch (e) {
		console.warn("Error creating print iframe, opening print window directly:", e);
		window.open(printUrl, "_blank", "noopener,noreferrer");
	}
}
