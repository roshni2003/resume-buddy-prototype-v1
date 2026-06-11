import { createFileRoute, lazyRouteComponent, stripSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import z from "zod";
import { t as cn } from "./style-BVXxCckg.js";

const CometCard = ({
	rotateDepth = 17.5,
	translateDepth = 20,
	glareOpacity = 0.4,
	scaleFactor = 1.05,
	className,
	children,
}) => {
	const ref = useRef(null);
	const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
	const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
	const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);
	const glareBackground = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseXSpring, [-0.5, 0.5], [0, 100])}% ${useTransform(mouseYSpring, [-0.5, 0.5], [0, 100])}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;
	const handleMouseMove = (e) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;
		x.set(xPct);
		y.set(yPct);
	};
	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("perspective-distant transform-3d", className),
		children: /* @__PURE__ */ jsxs(motion.div, {
			ref,
			initial: {
				scale: 1,
				z: 0,
			},
			className: "relative rounded-md",
			style: {
				rotateX,
				rotateY,
				translateX,
				translateY,
				transformStyle: "preserve-3d",
			},
			whileHover: isMobile
				? {}
				: {
						z: 50,
						scale: scaleFactor,
						transition: { duration: 0.2 },
					},
			onMouseMove: handleMouseMove,
			onMouseLeave: handleMouseLeave,
			children: [
				children,
				/* @__PURE__ */ jsx(motion.div, {
					transition: { duration: 0.2 },
					style: {
						background: glareBackground,
						opacity: glareOpacity,
					},
					className: "pointer-events-none absolute inset-0 z-50 h-full w-full rounded-md mix-blend-overlay",
				}),
			],
		}),
	});
};
var $$splitComponentImporter = () => import("./resumes-BX-7OnkC.js");
var searchSchema = z.object({
	tags: z.array(z.string()).default([]),
	sort: z.enum(["lastUpdatedAt", "createdAt", "name"]).default("lastUpdatedAt"),
});
const Route = createFileRoute("/dashboard/resumes/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: zodValidator(searchSchema),
	search: {
		middlewares: [
			stripSearchParams({
				tags: [],
				sort: "lastUpdatedAt",
			}),
		],
	},
});
export { CometCard as n, Route as t };
