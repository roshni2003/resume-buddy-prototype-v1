import type * as React from "react";
import { cn } from "@/utils/style";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"h-10 w-full min-w-0 rounded-xl border border-gray-200 dark:border-border bg-gray-50 dark:bg-muted/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:bg-white dark:hover:bg-muted focus:bg-white dark:focus:bg-background focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
