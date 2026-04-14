import { debounce } from "es-toolkit";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/style";

type InlineEditableTextProps = Omit<React.ComponentProps<"span">, "onChange"> & {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	as?: "span" | "a";
	href?: string;
};

export function InlineEditableText({
	value,
	onChange,
	placeholder,
	className,
	as = "span",
	href,
	...props
}: InlineEditableTextProps) {
	const ref = useRef<HTMLElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const isEmpty = value.trim().length === 0;
	const Comp = as;

	useEffect(() => {
		if (!ref.current) return;
		if (isFocused) return;
		ref.current.textContent = value;
	}, [value, isFocused]);

	const debouncedOnChange = useMemo(() => debounce(onChange, 100), [onChange]);

	return (
		<Comp
			// biome-ignore lint/suspicious/noExplicitAny: ref needs to be any for dynamic component support between span and a
			ref={ref as any}
			href={as === "a" ? href : undefined}
			contentEditable
			suppressContentEditableWarning
			data-placeholder={placeholder}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			onClick={(event) => {
				if (as === "a" && href) {
					if (event.ctrlKey || event.metaKey) {
						window.open(href, "_blank", "noopener,noreferrer");
					} else {
						// Prevent default navigation to allow editing on simple click.
						// Browsers normally handle contentEditable caret placement
						// but preventing default on the 'a' tag ensures no unwanted
						// side effects like mail/dialer app triggers.
						event.preventDefault();
					}
				}
			}}
			onInput={(event) => {
				debouncedOnChange((event.currentTarget as HTMLElement).textContent ?? "");
			}}
			className={cn(
				"break-anywhere inline-block min-w-[4ch] max-w-full cursor-text rounded-sm outline-none hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500",
				isEmpty && "before:pointer-events-none before:text-muted-foreground before:content-[attr(data-placeholder)]",
				className,
			)}
			{...props}
		/>
	);
}
