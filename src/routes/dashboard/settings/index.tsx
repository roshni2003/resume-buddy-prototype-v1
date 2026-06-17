import { createFileRoute } from "@tanstack/react-router";
import { useSettingsStore } from "@/stores/settings";
import { useTheme } from "@/components/theme/provider";

export const Route = createFileRoute("/dashboard/settings/")({
	component: SettingsRouteComponent,
});

function SettingsRouteComponent() {
	const { backgroundTheme, uiDensity, setBackgroundTheme, setUIDensity } = useSettingsStore();
	const { theme: colorMode, setTheme: setColorMode } = useTheme();

	return (
		<div className="max-w-4xl mx-auto py-8 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-500">
			<h1 className="text-2xl font-bold mb-8 text-foreground">Settings</h1>

			<div className="space-y-8">
				{/* Color Mode */}
				<section>
					<h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Color Mode</h2>
					<div className="flex gap-4">
						<button
							onClick={() => setColorMode("light")}
							className={`cursor-pointer flex flex-1 items-center gap-4 rounded-xl border p-4 transition-all ${
								colorMode === "light"
									? "border-emerald-500 bg-emerald-500/10"
									: "border-border bg-muted/40 hover:bg-muted"
							}`}
						>
							<div className="size-8 rounded-md bg-white border border-border"></div>
							<div className="text-left">
								<div className="font-semibold text-foreground">Light Mode</div>
								<div className="text-xs text-muted-foreground">Bright & airy</div>
							</div>
						</button>

						<button
							onClick={() => setColorMode("dark")}
							className={`cursor-pointer flex flex-1 items-center gap-4 rounded-xl border p-4 transition-all ${
								colorMode === "dark"
									? "border-emerald-500 bg-emerald-500/10"
									: "border-border bg-muted/40 hover:bg-muted"
							}`}
						>
							<div className="size-8 rounded-md bg-slate-900 border border-slate-700"></div>
							<div className="text-left">
								<div className="font-semibold text-foreground">Dark Mode</div>
								<div className="text-xs text-muted-foreground">Easier on the eyes</div>
							</div>
						</button>
					</div>
				</section>

				{/* Background Theme */}
				<section>
					<div className="mb-3 flex items-baseline justify-between">
						<h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Background Theme</h2>
						{colorMode === "light" && (
							<span className="text-[10px] font-medium text-red-500">Available in Dark Mode only</span>
						)}
					</div>
					<div className={`grid grid-cols-3 gap-4 ${colorMode === "light" ? "opacity-50 grayscale transition-all duration-300" : "transition-all duration-300"}`}>
						<button
							disabled={colorMode === "light"}
							onClick={() => setBackgroundTheme("navy")}
							className={`cursor-pointer disabled:cursor-not-allowed overflow-hidden rounded-xl border text-left transition-all ${
								backgroundTheme === "navy"
									? "border-emerald-500 ring-1 ring-emerald-500"
									: "border-border hover:border-foreground/20"
							}`}
						>
							<div className="h-16 bg-gradient-to-tr from-[#0b1120] to-[#1a2333]"></div>
							<div className="bg-muted p-3 text-xs font-medium text-foreground">Deep Navy</div>
						</button>

						<button
							disabled={colorMode === "light"}
							onClick={() => setBackgroundTheme("purple")}
							className={`cursor-pointer disabled:cursor-not-allowed overflow-hidden rounded-xl border text-left transition-all ${
								backgroundTheme === "purple"
									? "border-emerald-500 ring-1 ring-emerald-500"
									: "border-border hover:border-foreground/20"
							}`}
						>
							<div className="h-16 bg-gradient-to-tr from-[#130b20] to-[#25183b]"></div>
							<div className="bg-muted p-3 text-xs font-medium text-foreground">Midnight Purple</div>
						</button>

						<button
							disabled={colorMode === "light"}
							onClick={() => setBackgroundTheme("forest")}
							className={`cursor-pointer disabled:cursor-not-allowed overflow-hidden rounded-xl border text-left transition-all ${
								backgroundTheme === "forest"
									? "border-emerald-500 ring-1 ring-emerald-500"
									: "border-border hover:border-foreground/20"
							}`}
						>
							<div className="h-16 bg-gradient-to-tr from-[#0b1a11] to-[#163321]"></div>
							<div className="bg-muted p-3 text-xs font-medium text-foreground">Forest Dark</div>
						</button>
					</div>
				</section>

				{/* UI Density */}
				<section>
					<h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">UI Density</h2>
					<div className="flex rounded-xl bg-muted p-1 border border-border">
						{(["compact", "comfortable", "spacious"] as const).map((density) => (
							<button
								key={density}
								onClick={() => setUIDensity(density)}
								className={`cursor-pointer flex-1 rounded-lg py-2.5 text-sm font-medium transition-all capitalize ${
									uiDensity === density
										? "bg-emerald-500 text-white shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{density}
							</button>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
