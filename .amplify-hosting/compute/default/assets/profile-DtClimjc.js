import { n as Button, t as Input } from "./input-C4lW-WI7.js";
import { t as cn } from "./style-BVXxCckg.js";
import "./error-codes-COt8c5aQ.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";
import { CheckIcon, UserCircleIcon, WarningIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { match } from "ts-pattern";
import z from "zod";
import { t as authClient } from "./client-BdCoahVx.js";
import {
	t as Form,
	n as FormControl,
	i as FormField,
	a as FormItem,
	o as FormLabel,
	s as FormMessage,
} from "./form-DrLEBR9G.js";
import { t as Route } from "./profile-Ca-57092.js";
import { t as Separator } from "./separator-CVomJmmh.js";

function DashboardHeader({ title, icon: IconComponent, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex items-center gap-x-2.5", className),
		children: [
			/* @__PURE__ */ jsx(IconComponent, {
				weight: "light",
				className: "size-5",
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-medium text-xl tracking-tight",
				children: title,
			}),
		],
	});
}
var formSchema = z.object({
	name: z.string().trim().min(1).max(64),
	username: z
		.string()
		.trim()
		.min(1)
		.max(64)
		.regex(/^[a-z0-9._-]+$/, {
			message: "Username can only contain lowercase letters, numbers, dots, hyphens and underscores.",
		}),
	email: z.email().trim(),
});
function RouteComponent() {
	const router = useRouter();
	const { session } = Route.useRouteContext();
	const defaultValues = useMemo(() => {
		return {
			name: session?.user?.name ?? "",
			username: session?.user?.username ?? "",
			email: session?.user?.email ?? "",
		};
	}, [session?.user]);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues,
	});
	const onCancel = () => {
		form.reset(defaultValues);
	};
	const onSubmit = async (data) => {
		const { error } = await authClient.updateUser({
			name: data.name,
			username: data.username,
			displayUsername: data.username,
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(i18n._({ id: "R+Yx9f" }));
		form.reset({
			name: data.name,
			username: data.username,
			email: session.user.email,
		});
		router.invalidate();
		if (data.email !== session.user.email) {
			const { error: error$1 } = await authClient.changeEmail({
				newEmail: data.email,
				callbackURL: "/dashboard/settings/profile",
			});
			if (error$1) {
				toast.error(error$1.message);
				return;
			}
			toast.success(i18n._({ id: "H9l09X" }));
			form.reset({
				name: data.name,
				username: data.username,
				email: session.user.email,
			});
			router.invalidate();
		}
	};
	const handleResendVerificationEmail = async () => {
		const toastId = toast.loading(i18n._({ id: "deDz65" }));
		const { error } = await authClient.sendVerificationEmail({
			email: session.user.email,
			callbackURL: "/dashboard/settings/profile",
		});
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		toast.success(i18n._({ id: "hYxMTR" }), { id: toastId });
		router.invalidate();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx(DashboardHeader, {
				icon: UserCircleIcon,
				title: i18n._({ id: "vERlcd" }),
			}),
			/* @__PURE__ */ jsx(Separator, {}),
			/* @__PURE__ */ jsx(Form, {
				...form,
				children: /* @__PURE__ */ jsxs(motion.form, {
					initial: {
						opacity: 0,
						y: -20,
					},
					animate: {
						opacity: 1,
						y: 0,
					},
					transition: { duration: 0.3 },
					className: "grid max-w-xl gap-6",
					onSubmit: form.handleSubmit(onSubmit),
					children: [
						/* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "name",
							render: ({ field }) =>
								/* @__PURE__ */ jsxs(FormItem, {
									children: [
										/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
										/* @__PURE__ */ jsx(FormControl, {
											children: /* @__PURE__ */ jsx(Input, {
												min: 3,
												max: 64,
												autoComplete: "name",
												placeholder: "John Doe",
												...field,
											}),
										}),
										/* @__PURE__ */ jsx(FormMessage, {}),
									],
								}),
						}),
						/* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "username",
							render: ({ field }) =>
								/* @__PURE__ */ jsxs(FormItem, {
									children: [
										/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "7sNhEz" }) }),
										/* @__PURE__ */ jsx(FormControl, {
											children: /* @__PURE__ */ jsx(Input, {
												min: 3,
												max: 64,
												autoComplete: "username",
												placeholder: "john.doe",
												className: "lowercase",
												...field,
											}),
										}),
										/* @__PURE__ */ jsx(FormMessage, {}),
									],
								}),
						}),
						/* @__PURE__ */ jsx(FormField, {
							control: form.control,
							name: "email",
							render: ({ field }) =>
								/* @__PURE__ */ jsxs(FormItem, {
									children: [
										/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "hzKQCy" }) }),
										/* @__PURE__ */ jsx(FormControl, {
											children: /* @__PURE__ */ jsx(Input, {
												type: "email",
												autoComplete: "email",
												placeholder: "john.doe@example.com",
												className: "lowercase",
												...field,
											}),
										}),
										/* @__PURE__ */ jsx(FormMessage, {}),
										match(session.user.emailVerified)
											.with(true, () =>
												/* @__PURE__ */ jsxs("p", {
													className: "flex items-center gap-x-1.5 text-green-700 text-xs",
													children: [/* @__PURE__ */ jsx(CheckIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "QDEWii" })],
												}),
											)
											.with(false, () =>
												/* @__PURE__ */ jsxs("p", {
													className: "flex items-center gap-x-1.5 text-amber-600 text-xs",
													children: [
														/* @__PURE__ */ jsx(WarningIcon, { className: "size-3.5" }),
														/* @__PURE__ */ jsx(Trans, { id: "VBTGXl" }),
														/* @__PURE__ */ jsx("span", { children: "|" }),
														/* @__PURE__ */ jsx(Button, {
															variant: "link",
															className: "h-auto gap-x-1.5 p-0! text-inherit text-xs",
															onClick: handleResendVerificationEmail,
															children: /* @__PURE__ */ jsx(Trans, { id: "TvnDiq" }),
														}),
													],
												}),
											)
											.exhaustive(),
									],
								}),
						}),
						/* @__PURE__ */ jsx(AnimatePresence, {
							children:
								form.formState.isDirty &&
								/* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										x: -20,
									},
									animate: {
										opacity: 1,
										x: 0,
									},
									exit: {
										opacity: 0,
										x: -20,
									},
									className: "flex items-center gap-x-4 justify-self-end",
									children: [
										/* @__PURE__ */ jsx(Button, {
											type: "reset",
											variant: "ghost",
											onClick: onCancel,
											children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" }),
										}),
										/* @__PURE__ */ jsx(Button, {
											type: "submit",
											children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" }),
										}),
									],
								}),
						}),
					],
				}),
			}),
		],
	});
}
export { RouteComponent as component };
