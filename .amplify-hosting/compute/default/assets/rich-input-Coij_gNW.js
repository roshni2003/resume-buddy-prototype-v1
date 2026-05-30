import { i18n } from "@lingui/core";
import { useLingui } from "@lingui/react";
import { LinkIcon, TextBolderIcon, TextItalicIcon, TextUnderlineIcon } from "@phosphor-icons/react";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, EditorContext, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cva } from "class-variance-authority";
import DOMPurify from "dompurify";
import { Toggle, VisuallyHidden } from "radix-ui";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import z from "zod";
import {
	l as Dialog$1,
	u as DialogContent,
	d as DialogDescription,
	m as DialogTitle,
} from "./alert-dialog-D16KSnDL.js";
import { r as isRTL } from "./locale-BPZR263U.js";
import { i as usePrompt } from "./resume-BHY1IvQp.js";
import { t as cn } from "./style-BVXxCckg.js";

var alertVariants = cva(
	"group/alert relative grid w-full gap-1 rounded-lg border px-4 py-3 text-start text-sm has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 has-data-[slot=alert-action]:pe-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-1 *:[svg]:text-current",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				destructive:
					"bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
			},
		},
		defaultVariants: { variant: "default" },
	},
);
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props,
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-title",
		className: cn(
			"font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
			className,
		),
		...props,
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-description",
		className: cn(
			"text-muted-foreground text-sm md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
			className,
		),
		...props,
	});
}
var RICH_TEXT_CONFIG = {
	ALLOWED_TAGS: [
		"p",
		"br",
		"hr",
		"span",
		"div",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"strong",
		"b",
		"em",
		"i",
		"u",
		"s",
		"strike",
		"mark",
		"code",
		"pre",
		"ul",
		"ol",
		"li",
		"table",
		"thead",
		"tbody",
		"tfoot",
		"tr",
		"th",
		"td",
		"colgroup",
		"col",
		"a",
		"blockquote",
	],
	ALLOWED_ATTR: ["class", "style", "href", "target", "rel", "colspan", "rowspan", "data-type", "data-label"],
	ALLOWED_URI_REGEXP: /^(?:(?:https?):\/\/|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
	ADD_ATTR: ["target", "rel"],
	ALLOW_DATA_ATTR: false,
};
function sanitizeHtml(html) {
	if (!html) return "";
	return DOMPurify.sanitize(html, {
		...RICH_TEXT_CONFIG,
		RETURN_TRUSTED_TYPE: false,
	});
}
function sanitizeCss(css) {
	if (!css) return "";
	let sanitized = css
		.replace(/javascript\s*:/gi, "")
		.replace(/expression\s*\(/gi, "")
		.replace(/url\s*\(\s*["']?\s*(?:javascript|data):/gi, "url(")
		.replace(/behavior\s*:/gi, "")
		.replace(/-moz-binding\s*:/gi, "")
		.replace(/@import\s+(?:url\s*\()?["']?\s*(?:javascript|data):/gi, "");
	sanitized = DOMPurify.sanitize(sanitized, {
		ALLOWED_TAGS: [],
		ALLOWED_ATTR: [],
		KEEP_CONTENT: true,
		RETURN_TRUSTED_TYPE: false,
	});
	return sanitized;
}
var toggleVariants = cva(
	"group/toggle inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-muted aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border border-input bg-transparent shadow-xs hover:bg-muted",
			},
			size: {
				default: "h-9 min-w-9 px-2",
				sm: "h-8 min-w-8 px-1.5",
				lg: "h-10 min-w-10 px-2.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
function Toggle$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Toggle.Root, {
		"data-slot": "toggle",
		className: cn(
			toggleVariants({
				variant,
				size,
				className,
			}),
		),
		...props,
	});
}
var rich_input_module_default = {
	tiptap_content: "_tiptap_content_10n8w_1",
	editor_content: "_editor_content_10n8w_239",
};
var extensions = [
	StarterKit.configure({
		heading: { levels: [1, 2, 3, 4, 5, 6] },
		codeBlock: { enableTabIndentation: true },
		link: {
			openOnClick: false,
			enableClickSelection: true,
			defaultProtocol: "https",
			protocols: ["http", "https"],
		},
	}),
	Highlight.configure({ HTMLAttributes: { class: "rounded-md px-0.5 py-px" } }),
	TextAlign.configure({ types: ["heading", "paragraph", "listItem"] }),
	TableKit.configure(),
];
function RichInput({ value, onChange, style, className, editorClassName, ...options }) {
	const { i18n: i18n$1 } = useLingui();
	const textDirection = isRTL(i18n$1.locale) ? "rtl" : void 0;
	const [isFullscreen, setIsFullscreen] = useState(false);
	const editor = useEditor({
		...options,
		extensions,
		textDirection,
		content: value,
		immediatelyRender: false,
		shouldRerenderOnTransaction: false,
		editorProps: {
			attributes: {
				spellcheck: "false",
				"data-editor": "true",
				"data-fullscreen": isFullscreen ? "true" : "false",
				class: cn(
					"group/editor overflow-y-auto p-3 pb-4",
					"rounded-md rounded-t-none border outline-none focus-visible:border-ring",
					"[td:has(.selectedCell)]:bg-primary",
					"data-[fullscreen=false]:max-h-[400px] data-[fullscreen=false]:min-h-[100px]",
					"data-[fullscreen=true]:max-h-none data-[fullscreen=true]:min-h-full",
					rich_input_module_default.tiptap_content,
					rich_input_module_default.editor_content,
					editorClassName,
				),
			},
		},
		onUpdate: ({ editor: editor$1 }) => {
			onChange(editor$1.getHTML());
		},
	});
	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			if (!editor.isFocused) editor.commands.setContent(value);
		}
	}, [editor, value]);
	const providerValue = useMemo(() => ({ editor }), [editor]);
	if (!editor) return null;
	const editorElement = /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ jsx(EditorToolbar, {
				editor,
				isFullscreen,
			}),
			/* @__PURE__ */ jsx(EditorContent, { editor }),
		],
	});
	if (isFullscreen)
		return /* @__PURE__ */ jsxs(EditorContext, {
			value: providerValue,
			children: [
				/* @__PURE__ */ jsx("div", {
					className: cn("rounded-md", className),
					style,
					children: /* @__PURE__ */ jsx("div", { className: "h-[200px] rounded-md border border-dashed" }),
				}),
				/* @__PURE__ */ jsx(Dialog$1, {
					open: isFullscreen,
					onOpenChange: setIsFullscreen,
					children: /* @__PURE__ */ jsxs(DialogContent, {
						className: "flex h-[95svh] max-h-none! w-[95svw] max-w-none! flex-col p-4 sm:max-w-none! 2xl:max-w-none!",
						children: [
							/* @__PURE__ */ jsxs(VisuallyHidden.Root, {
								children: [
									/* @__PURE__ */ jsx(DialogTitle, { children: "Fullscreen Editor" }),
									/* @__PURE__ */ jsx(DialogDescription, { children: "Edit content in fullscreen mode" }),
								],
							}),
							editorElement,
						],
					}),
				}),
			],
		});
	return /* @__PURE__ */ jsx(EditorContext, {
		value: providerValue,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("rounded-md", className),
			style,
			children: editorElement,
		}),
	});
}
function EditorToolbar({ editor, isFullscreen }) {
	const prompt = usePrompt();
	const state = useEditorState({
		editor,
		selector: (ctx) => {
			return {
				isBold: ctx.editor.isActive("bold") ?? false,
				canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
				toggleBold: () => ctx.editor.chain().focus().toggleBold().run(),
				isItalic: ctx.editor.isActive("italic") ?? false,
				canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
				toggleItalic: () => ctx.editor.chain().focus().toggleItalic().run(),
				isUnderline: ctx.editor.isActive("underline") ?? false,
				canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
				toggleUnderline: () => ctx.editor.chain().focus().toggleUnderline().run(),
				isStrike: ctx.editor.isActive("strike") ?? false,
				canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
				toggleStrike: () => ctx.editor.chain().focus().toggleStrike().run(),
				isHighlight: ctx.editor.isActive("highlight") ?? false,
				canHighlight: ctx.editor.can().chain().toggleHighlight().run() ?? false,
				toggleHighlight: () => ctx.editor.chain().focus().toggleHighlight().run(),
				isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
				canHeading1: ctx.editor.can().chain().toggleHeading({ level: 1 }).run() ?? false,
				toggleHeading1: () => ctx.editor.chain().focus().toggleHeading({ level: 1 }).run(),
				isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
				canHeading2: ctx.editor.can().chain().toggleHeading({ level: 2 }).run() ?? false,
				toggleHeading2: () => ctx.editor.chain().focus().toggleHeading({ level: 2 }).run(),
				isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
				canHeading3: ctx.editor.can().chain().toggleHeading({ level: 3 }).run() ?? false,
				toggleHeading3: () => ctx.editor.chain().focus().toggleHeading({ level: 3 }).run(),
				isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
				canHeading4: ctx.editor.can().chain().toggleHeading({ level: 4 }).run() ?? false,
				toggleHeading4: () => ctx.editor.chain().focus().toggleHeading({ level: 4 }).run(),
				isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
				canHeading5: ctx.editor.can().chain().toggleHeading({ level: 5 }).run() ?? false,
				toggleHeading5: () => ctx.editor.chain().focus().toggleHeading({ level: 5 }).run(),
				isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
				canHeading6: ctx.editor.can().chain().toggleHeading({ level: 6 }).run() ?? false,
				toggleHeading6: () => ctx.editor.chain().focus().toggleHeading({ level: 6 }).run(),
				isParagraph: ctx.editor.isActive("paragraph") ?? false,
				canParagraph: ctx.editor.can().chain().setParagraph().run() ?? false,
				setParagraph: () => ctx.editor.chain().focus().setParagraph().run(),
				isLeftAlign: ctx.editor.isActive({ textAlign: "left" }) ?? false,
				canLeftAlign: ctx.editor.can().chain().toggleTextAlign("left").run() ?? false,
				toggleLeftAlign: () => ctx.editor.chain().focus().toggleTextAlign("left").run(),
				isCenterAlign: ctx.editor.isActive({ textAlign: "center" }) ?? false,
				canCenterAlign: ctx.editor.can().chain().toggleTextAlign("center").run() ?? false,
				toggleCenterAlign: () => ctx.editor.chain().focus().toggleTextAlign("center").run(),
				isRightAlign: ctx.editor.isActive({ textAlign: "right" }) ?? false,
				canRightAlign: ctx.editor.can().chain().toggleTextAlign("right").run() ?? false,
				toggleRightAlign: () => ctx.editor.chain().focus().toggleTextAlign("right").run(),
				isJustifyAlign: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
				canJustifyAlign: ctx.editor.can().chain().toggleTextAlign("justify").run() ?? false,
				toggleJustifyAlign: () => ctx.editor.chain().focus().toggleTextAlign("justify").run(),
				isBulletList: ctx.editor.isActive("bulletList") ?? false,
				canBulletList: ctx.editor.can().chain().toggleBulletList().run() ?? false,
				toggleBulletList: () => ctx.editor.chain().focus().toggleBulletList().run(),
				isOrderedList: ctx.editor.isActive("orderedList") ?? false,
				canOrderedList: ctx.editor.can().chain().toggleOrderedList().run() ?? false,
				toggleOrderedList: () => ctx.editor.chain().focus().toggleOrderedList().run(),
				canLiftListItem: ctx.editor.can().chain().liftListItem("listItem").run() ?? false,
				liftListItem: () => ctx.editor.chain().focus().liftListItem("listItem").run(),
				canSinkListItem: ctx.editor.can().chain().sinkListItem("listItem").run() ?? false,
				sinkListItem: () => ctx.editor.chain().focus().sinkListItem("listItem").run(),
				isLink: ctx.editor.isActive("link") ?? false,
				toggleLink: async () => {
					if (ctx.editor.isActive("link")) ctx.editor.chain().focus().unsetLink().run();
					else {
						const url = await prompt(i18n._({ id: "SfRBHV" }), { defaultValue: "https://" });
						if (!url || url.trim() === "") return;
						if (!z.url({ protocol: /^https?$/ }).safeParse(url).success) {
							toast.error(i18n._({ id: "qsxoyW" }), { description: i18n._({ id: "cDPBeJ" }) });
							return;
						}
						ctx.editor
							.chain()
							.focus()
							.setLink({
								href: url,
								target: "_blank",
							})
							.run();
					}
				},
				unsetLink: () => ctx.editor.chain().focus().unsetLink().run(),
				isInlineCode: ctx.editor.isActive("code") ?? false,
				canInlineCode: ctx.editor.can().chain().toggleCode().run() ?? false,
				toggleInlineCode: () => ctx.editor.chain().focus().toggleCode().run(),
				isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
				canCodeBlock: ctx.editor.can().chain().toggleCodeBlock().run() ?? false,
				toggleCodeBlock: () => ctx.editor.chain().focus().toggleCodeBlock().run(),
				insertTable: () =>
					ctx.editor
						.chain()
						.focus()
						.insertTable({
							rows: 3,
							cols: 3,
							withHeaderRow: true,
						})
						.run(),
				canInsertTable: ctx.editor.can().chain().insertTable().run() ?? false,
				addColumnBefore: () => ctx.editor.chain().focus().addColumnBefore().run(),
				canAddColumnBefore: ctx.editor.can().chain().addColumnBefore().run() ?? false,
				addColumnAfter: () => ctx.editor.chain().focus().addColumnAfter().run(),
				canAddColumnAfter: ctx.editor.can().chain().addColumnAfter().run() ?? false,
				addRowBefore: () => ctx.editor.chain().focus().addRowBefore().run(),
				canAddRowBefore: ctx.editor.can().chain().addRowBefore().run() ?? false,
				addRowAfter: () => ctx.editor.chain().focus().addRowAfter().run(),
				canAddRowAfter: ctx.editor.can().chain().addRowAfter().run() ?? false,
				deleteColumn: () => ctx.editor.chain().focus().deleteColumn().run(),
				canDeleteColumn: ctx.editor.can().chain().deleteColumn().run() ?? false,
				deleteRow: () => ctx.editor.chain().focus().deleteRow().run(),
				canDeleteRow: ctx.editor.can().chain().deleteRow().run() ?? false,
				deleteTable: () => ctx.editor.chain().focus().deleteTable().run(),
				canDeleteTable: ctx.editor.can().chain().deleteTable().run() ?? false,
				setHardBreak: () => ctx.editor.chain().focus().setHardBreak().run(),
				setHorizontalRule: () => ctx.editor.chain().focus().setHorizontalRule().run(),
			};
		},
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center gap-y-0.5 rounded-md rounded-b-none border border-b-0",
		children: [
			/* @__PURE__ */ jsx(Toggle$1, {
				size: isFullscreen ? "lg" : "sm",
				tabIndex: -1,
				className: "rounded-none data-[state=on]:bg-muted-foreground/20",
				title: i18n._({ id: "KmydK6" }),
				pressed: state.isBold,
				disabled: !state.canBold,
				onPressedChange: state.toggleBold,
				children: /* @__PURE__ */ jsx(TextBolderIcon, { className: "size-3.5" }),
			}),
			/* @__PURE__ */ jsx(Toggle$1, {
				size: isFullscreen ? "lg" : "sm",
				tabIndex: -1,
				className: "rounded-none data-[state=on]:bg-muted-foreground/20",
				title: i18n._({ id: "pzutoc" }),
				pressed: state.isItalic,
				disabled: !state.canItalic,
				onPressedChange: state.toggleItalic,
				children: /* @__PURE__ */ jsx(TextItalicIcon, { className: "size-3.5" }),
			}),
			/* @__PURE__ */ jsx(Toggle$1, {
				size: isFullscreen ? "lg" : "sm",
				tabIndex: -1,
				className: "rounded-none data-[state=on]:bg-muted-foreground/20",
				title: i18n._({ id: "YyXtnN" }),
				pressed: state.isUnderline,
				disabled: !state.canUnderline,
				onPressedChange: state.toggleUnderline,
				children: /* @__PURE__ */ jsx(TextUnderlineIcon, { className: "size-3.5" }),
			}),
			/* @__PURE__ */ jsx(Toggle$1, {
				size: isFullscreen ? "lg" : "sm",
				tabIndex: -1,
				className: "rounded-none data-[state=on]:bg-muted-foreground/20",
				title: i18n._({ id: "ySL+Jo" }),
				pressed: state.isLink,
				onPressedChange: state.toggleLink,
				children: /* @__PURE__ */ jsx(LinkIcon, { className: "size-3.5" }),
			}),
		],
	});
}
function TiptapContent({ content, className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		dangerouslySetInnerHTML: { __html: useMemo(() => sanitizeHtml(content), [content]) },
		className: cn("tiptap-content", className),
		...props,
	});
}
export { AlertDescription as a, Alert as i, TiptapContent as n, AlertTitle as o, sanitizeCss as r, RichInput as t };
