import "./get-strict-context-CE5mktmJ.js";
import "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import { t as cn } from "./style-BVXxCckg.js";
import "./error-codes-COt8c5aQ.js";
import { t as authClient } from "./client-BdCoahVx.js";
import { a as init_string, i as getInitials } from "./createSsrRpc-9mmrq80i.js";
import { a as localeMap, i as loadLocale, n as isLocale, o as setLocaleServerFn } from "./locale-BPZR263U.js";
import { i as isTheme, n as useTheme } from "./provider-CRuhYiLs.js";
import { a as DropdownMenuRadioGroup, c as DropdownMenuSub, d as DropdownMenuTrigger, i as DropdownMenuItem, l as DropdownMenuSubContent, n as DropdownMenuContent, o as DropdownMenuRadioItem, r as DropdownMenuGroup, s as DropdownMenuSeparator, t as DropdownMenu$1, u as DropdownMenuSubTrigger } from "./dropdown-menu-CLnJO2T5.js";
import { Outlet, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Trans, useLingui } from "@lingui/react";
import { PaletteIcon, SignOutIcon, TranslateIcon } from "@phosphor-icons/react";
import { i18n } from "@lingui/core";
import { Avatar } from "radix-ui";
import { toast } from "sonner";
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Root, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 select-none rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Image, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Fallback, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
function UserDropdownMenu({ children }) {
	const router = useRouter();
	const { i18n: i18n$1 } = useLingui();
	const { theme, setTheme } = useTheme();
	const { data: session } = authClient.useSession();
	function handleThemeChange(value) {
		if (!isTheme(value)) return;
		setTheme(value);
	}
	async function handleLocaleChange(value) {
		if (!isLocale(value)) return;
		await Promise.all([loadLocale(value), setLocaleServerFn({ data: value })]);
		window.location.reload();
	}
	function handleLogout() {
		const toastId = toast.loading(i18n._({ id: "DZe/N+" }));
		authClient.signOut({ fetchOptions: {
			onSuccess: () => {
				toast.dismiss(toastId);
				router.invalidate();
			},
			onError: ({ error }) => {
				toast.error(error.message, { id: toastId });
			}
		} });
	}
	if (!session?.user) return null;
	return /* @__PURE__ */ jsxs(DropdownMenu$1, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: children({ session })
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "start",
		side: "top",
		children: [
			/* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [/* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ jsx(TranslateIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "vXIe7J" })] }), /* @__PURE__ */ jsx(DropdownMenuSubContent, {
				className: "max-h-[400px] overflow-y-auto",
				children: /* @__PURE__ */ jsx(DropdownMenuRadioGroup, {
					value: i18n$1.locale,
					onValueChange: handleLocaleChange,
					children: Object.entries(localeMap).map(([value, label]) => /* @__PURE__ */ jsx(DropdownMenuRadioItem, {
						value,
						children: i18n$1.t(label)
					}, value))
				})
			})] }), /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ jsx(PaletteIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "FEr96N" })] }), /* @__PURE__ */ jsx(DropdownMenuSubContent, { children: /* @__PURE__ */ jsxs(DropdownMenuRadioGroup, {
				value: theme,
				onValueChange: handleThemeChange,
				children: [/* @__PURE__ */ jsx(DropdownMenuRadioItem, {
					value: "light",
					children: /* @__PURE__ */ jsx(Trans, { id: "1njn7W" })
				}), /* @__PURE__ */ jsx(DropdownMenuRadioItem, {
					value: "dark",
					children: /* @__PURE__ */ jsx(Trans, { id: "pvnfJD" })
				})]
			}) })] })] }),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsxs(DropdownMenuItem, {
				onSelect: handleLogout,
				children: [/* @__PURE__ */ jsx(SignOutIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "nOhz3x" })]
			})
		]
	})] });
}
init_string();
function RouteComponent() {
	useLingui();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col bg-gray-50",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-gray-200 border-b bg-white shadow-sm",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 sm:gap-3",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/zoe-talking.png",
							alt: "Zoe AI",
							className: "h-8 w-6 rounded-full sm:h-10 sm:w-8"
						}), /* @__PURE__ */ jsx("h1", {
							className: "font-bold text-base text-gray-900 sm:text-lg md:text-xl",
							children: "Zoe Resume Builder"
						})]
					}),
					" ",
					/* @__PURE__ */ jsx(UserDropdownMenu, { children: ({ session }) => /* @__PURE__ */ jsxs("button", {
						className: "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100",
						children: [/* @__PURE__ */ jsxs(Avatar$1, {
							className: "size-8",
							children: [/* @__PURE__ */ jsx(AvatarImage, { src: session.user.image ?? void 0 }), /* @__PURE__ */ jsx(AvatarFallback, {
								className: "text-xs",
								children: getInitials(session.user.name)
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "hidden text-left md:block",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium text-sm",
								children: session.user.name
							}), /* @__PURE__ */ jsx("p", {
								className: "text-gray-500 text-xs",
								children: session.user.email
							})]
						})]
					}) })
				]
			})
		}), /* @__PURE__ */ jsx("main", {
			className: "@container mx-auto w-full max-w-7xl flex-1 p-6",
			children: /* @__PURE__ */ jsx(Outlet, {})
		})]
	});
}
export { RouteComponent as component };
