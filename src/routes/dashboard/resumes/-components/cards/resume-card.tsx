import { CircleNotchIcon, LockSimpleIcon, XIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import type { ResumeSummary } from "@/utils/api";
import { cn } from "@/utils/style";
import { ResumeDropdownMenu } from "../menus/dropdown-menu";
import { BaseCard } from "./base-card";

dayjs.extend(relativeTime);

type ResumeCardProps = {
	resume: ResumeSummary;
};

export function ResumeCard({ resume }: ResumeCardProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { width: containerWidth = 0 } = useResizeObserver({
		ref: containerRef as React.RefObject<HTMLElement>,
	});

	const updatedAt = useMemo(() => {
		const isToday = dayjs(resume.updatedAt).isSame(dayjs(), "day");
		return isToday
			? `Today, ${dayjs(resume.updatedAt).format("h:mm A")}`
			: dayjs(resume.updatedAt).format("MMM D, YYYY [at] h:mm A");
	}, [resume.updatedAt]);

	const scale = useMemo(() => {
		if (containerWidth === 0) return 0;
		return Math.round((containerWidth / 794) * 1000) / 1000;
	}, [containerWidth]);

	const [isIframeReady, setIsIframeReady] = useState(false);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === "RESUME_READY") {
				if (event.data.resumeId === resume.id) {
					setIsIframeReady(true);
				}
			}
			if (event.data?.type === "PRINTER_ERROR") {
				if (event.data.resumeId === resume.id) {
					setIsIframeReady(true);
				}
			}
		};

		const timeoutId = setTimeout(() => {
			if (!isIframeReady) {
				setIsIframeReady(true);
			}
		}, 10000);

		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
			clearTimeout(timeoutId);
		};
	}, [resume.id, isIframeReady]);

	const [previewOpen, setPreviewOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			{/* Preview Modal — rendered in a portal so it's completely outside the card DOM hierarchy */}
			{previewOpen && createPortal(
				<div
					className="fixed inset-0 z-[9999] flex items-center justify-center"
					style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
					onClick={() => setPreviewOpen(false)}
				>
					<div className="relative flex items-start gap-4">
						{/* White resume card — scaled to fit 500px width without scrollbars */}
						<div
							className="relative bg-white rounded-xl shadow-2xl flex flex-col items-center overflow-hidden"
							style={{ width: "500px", height: "70vh" }}
							onClick={(e) => e.stopPropagation()}
						>
							<div 
								style={{
									width: "794px",
									height: "1123px",
									transform: `scale(${500 / 794})`,
									transformOrigin: "top center",
									flexShrink: 0
								}}
							>
								<iframe
									src={`/printer/${resume.id}?token=preview`}
									className="w-full h-full border-0"
									scrolling="no"
									title={`Preview — ${resume.name}`}
								/>
							</div>
						</div>

						{/* X close button — moved OUTSIDE to the right */}
						<button
							type="button"
							className="flex cursor-pointer items-center justify-center rounded-full bg-white/10 p-2.5 text-white shadow-sm backdrop-blur-sm hover:bg-white/20 transition-colors"
							onClick={() => setPreviewOpen(false)}
							aria-label="Close preview"
						>
							<XIcon size={20} weight="bold" />
						</button>
					</div>
				</div>,
				document.body,
			)}

			<div className="relative block h-full">
				<BaseCard 
					title={resume.name} 
					description={updatedAt}
					hoverOverlay={
						<div 
							className="absolute inset-x-0 top-0 bottom-[60px] sm:bottom-[68px] z-20 flex flex-row items-center justify-center gap-3 bg-[#0f172a]/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/card:opacity-100 rounded-t-xl"
							style={{ transform: "translateZ(30px)", pointerEvents: "auto" }}
						>
							<button
								type="button"
								className="cursor-pointer rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors hover:bg-emerald-600"
								onClick={(e) => {
									e.stopPropagation();
									navigate({ to: "/builder/$resumeId", params: { resumeId: resume.id } });
								}}
							>
								Open Editor
							</button>
							<button
								type="button"
								className="cursor-pointer rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 border border-white/20"
								onClick={(e) => {
									e.stopPropagation();
									setPreviewOpen(true);
								}}
							>
								Preview
							</button>
						</div>
					}
				>
					<div
						ref={containerRef}
						className="absolute inset-x-0 top-0 bottom-[60px] overflow-hidden bg-white sm:bottom-[68px]"
						style={{ isolation: "isolate", opacity: 0.99 }}
					>
						<AnimatePresence>
							{!isIframeReady && (
								<motion.div
									key="loader"
									initial={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 z-10 flex items-center justify-center bg-white"
								>
									<CircleNotchIcon weight="thin" className="size-12 animate-spin text-emerald-500" />
								</motion.div>
							)}
						</AnimatePresence>

						<div
							className={cn(
								"absolute inset-0 flex items-start justify-center overflow-hidden transition-opacity duration-500",
								!isIframeReady && "opacity-0",
							)}
						>
							<div
								style={{
									width: "794px",
									height: "1123px",
									flexShrink: 0,
									transform: `scale(${scale || 0.3}) translateZ(-1px)`,
									transformOrigin: "top center",
									backgroundColor: "white",
								}}
							>
								<iframe
									scrolling="no"
									src={`/printer/${resume.id}?token=preview`}
									title={resume.name}
									loading="lazy"
									className="pointer-events-none size-full border-0"
									style={{
										backgroundColor: "white",
										imageRendering: "-webkit-optimize-contrast",
									}}
								/>
							</div>
							{/* Invisible shield to strictly block the iframe from stealing any pointer events */}
							<div className="absolute inset-0 z-10" />
						</div>
					</div>

					<ResumeLockOverlay isLocked={resume.isLocked} />
				</BaseCard>

				{/* 3-dots menu at bottom right */}
				<div className="absolute bottom-2 right-2 z-30">
					<ResumeDropdownMenu resume={resume}>
						<button
							type="button"
							className="flex cursor-pointer items-center justify-center rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
							aria-label="Open menu"
							tabIndex={0}
						>
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
								<circle cx="10" cy="4" r="1.5" />
								<circle cx="10" cy="10" r="1.5" />
								<circle cx="10" cy="16" r="1.5" />
							</svg>
						</button>
					</ResumeDropdownMenu>
				</div>
			</div>
		</>


	);
}

function ResumeLockOverlay({ isLocked }: { isLocked: boolean }) {
	return (
		<AnimatePresence>
			{isLocked && (
				<motion.div
					key="resume-lock-overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.6 }}
					exit={{ opacity: 0 }}
					className="absolute inset-0 flex items-center justify-center"
				>
					<div className="flex items-center justify-center rounded-full bg-popover p-6">
						<LockSimpleIcon weight="thin" className="size-12 opacity-60" />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
