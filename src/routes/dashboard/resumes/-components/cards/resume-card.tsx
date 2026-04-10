import { t } from "@lingui/macro";
import { CircleNotchIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "motion/react";
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
		return dayjs(resume.updatedAt).format("YYYY-MM-DD HH:mm:ss");
	}, [resume.updatedAt]);

	const scale = useMemo(() => {
		if (containerWidth === 0) return 0;
		return Math.round((containerWidth / 794) * 1000) / 1000;
	}, [containerWidth]);

	const [isIframeReady, setIsIframeReady] = useState(false);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === "RESUME_READY") {
				console.log(`[ResumeCard] Received RESUME_READY for id=${event.data.resumeId}, expected id=${resume.id}`);
				if (event.data.resumeId === resume.id) {
					console.log(`[ResumeCard] Match found for ${resume.id}, setting ready.`);
					setIsIframeReady(true);
				}
			}

			if (event.data?.type === "PRINTER_ERROR") {
				console.error(`[ResumeCard] Received PRINTER_ERROR for id=${event.data.resumeId}:`, event.data.message);
				if (event.data.resumeId === resume.id) {
					// Even on error, maybe we show it to see what failed
					setIsIframeReady(true);
				}
			}
		};

		// Safety timeout: if iframe doesn't signal in 10s, show it anyway
		const timeoutId = setTimeout(() => {
			if (!isIframeReady) {
				console.warn(`[ResumeCard] Preview timeout for ${resume.id}, forcing visibility.`);
				setIsIframeReady(true);
			}
		}, 10000);

		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
			clearTimeout(timeoutId);
		};
	}, [resume.id, isIframeReady]);

	return (
		<div className="relative">
			<Link to="/builder/$resumeId" params={{ resumeId: resume.id }} className="cursor-default">
				<BaseCard title={resume.name} description={t`Last updated on ${updatedAt}`}>
					<div
						ref={containerRef}
						className="absolute inset-x-0 top-0 bottom-[80px] overflow-hidden bg-white sm:bottom-[88px]"
						style={{ isolation: "isolate" }}
					>
						<AnimatePresence>
							{!isIframeReady && (
								<motion.div
									key="loader"
									initial={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 z-10 flex items-center justify-center bg-white"
								>
									<CircleNotchIcon weight="thin" className="size-12 animate-spin" />
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
									transform: `scale(${scale || 0.3}) translateZ(0)`,
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
						</div>
					</div>

					<ResumeLockOverlay isLocked={resume.isLocked} />
				</BaseCard>
			</Link>
			{/* 3-dots menu at top right */}
			<div className="absolute top-3 right-3 z-10">
				<ResumeDropdownMenu resume={resume}>
					<button
						className="flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
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
