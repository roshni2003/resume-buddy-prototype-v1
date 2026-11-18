import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

export function LoginPage() {
	const navigate = useNavigate();
	const { isAuthenticated, loginPrototype } = useAuth();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// If already authenticated, redirect to the dashboard
	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: "/dashboard/resumes" as any });
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedEmail = email.trim();

		if (!trimmedEmail) {
			toast.error("Please enter your email address.");
			return;
		}

		if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
			toast.error("Please enter a valid email address.");
			return;
		}

		try {
			setIsSubmitting(true);
			await loginPrototype(trimmedEmail, name);
			toast.success(`Welcome${name ? `, ${name}` : ""}!`);
			navigate({ to: "/dashboard/resumes" as any, search: { start: "true" } as any });
		} catch (err) {
			console.error("Login failed:", err);
			toast.error("Failed to sign in. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className="min-h-screen text-white flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 selection:bg-emerald-500/30 selection:text-white"
			style={{
				background: "linear-gradient(145deg, #050b14 0%, #0f172a 100%)",
				fontFamily: "'Plus Jakarta Sans', sans-serif",
			}}
		>
			<div className="w-full max-w-md mx-auto">
				{/* Back button */}
				<button
					type="button"
					onClick={() => navigate({ to: "/" as any })}
					className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors mb-8 cursor-pointer"
				>
					<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
					<span>Back</span>
				</button>

				{/* Header Section */}
				<div className="mb-6">
					<span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
						YOUR ACCOUNT
					</span>
					<h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
						Log in or create an
						<br />
						account.
					</h1>
					<p className="text-slate-400 text-sm sm:text-base leading-relaxed">
						Your resumes and your next step will be waiting here when you come back.
					</p>
				</div>

				{/* Card Container */}
				<div className="rounded-2xl border border-slate-800/80 bg-[#0b1322]/90 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Email Field */}
						<div>
							<label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
								Email
							</label>
							<input
								id="email"
								type="email"
								required
								autoFocus
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="w-full rounded-xl bg-[#060b13] border-2 border-emerald-500/60 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white placeholder:text-slate-600 px-4 py-3 text-sm transition-all outline-none font-mono"
							/>
						</div>

						{/* Name / Zoe call you Field */}
						<div>
							<label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-1.5">
								What should Zoe call you? · Optional
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="e.g. Priya"
								className="w-full rounded-xl bg-[#060b13] border border-slate-800 focus:border-slate-700 focus:ring-0 text-white placeholder:text-slate-600 px-4 py-3 text-sm transition-all outline-none"
							/>
						</div>

						{/* Submit Button */}
						<div className="pt-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="size-4 animate-spin" />
										<span>Signing in...</span>
									</>
								) : (
									<>
										<span>Continue</span>
										<ArrowRight className="size-4" />
									</>
								)}
							</button>
						</div>

						{/* Prototype Note */}
						<p className="text-xs text-slate-400 pt-3 leading-relaxed border-t border-slate-800/80 mt-4">
							This is a prototype sign-in. There's no password, and your resumes stay in this browser.
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
