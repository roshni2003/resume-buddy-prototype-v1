import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { URLInput } from "@/components/input/url-input";
import { useResumeStore } from "@/components/resume/store/resume";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { basicsSchema } from "@/schema/resume/data";
import { SectionBase } from "../shared/section-base";
import { CustomFieldsSection } from "./custom-fields";

/* ─── Types ─────────────────────────────────────────────── */
const formSchema = basicsSchema;
type FormValues = z.infer<typeof formSchema>;

/* ─── Styled label ───────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
	return (
		<label className="block text-[10.5px] font-semibold tracking-widest text-gray-500 uppercase mb-1.5">
			{children}
		</label>
	);
}

/* ─── Styled input ───────────────────────────────────────── */
function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className={[
				"w-full rounded-xl border border-gray-200 bg-gray-50",
				"px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400",
				"focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400",
				"transition-all duration-150",
				props.className ?? "",
			].join(" ")}
		/>
	);
}

/* ─── Main exported component ────────────────────────────── */
export function BasicsSectionBuilder() {
	return (
		<SectionBase type="basics">
			<BasicsSectionForm />
		</SectionBase>
	);
}

export function BasicsSectionForm() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: basics,
		mode: "onChange",
	});

	const basicsRef = useRef(basics);
	useEffect(() => {
		if (basics !== basicsRef.current) {
			form.reset(basics);
			basicsRef.current = basics;
		}
	}, [basics, form]);

	const onSubmit = (data: FormValues) => {
		updateResumeData((draft) => {
			draft.basics = data;
		});
	};

	return (
		<Form {...form}>
			<form onChange={form.handleSubmit(onSubmit)}>
				{/* 2-column grid */}
				<div className="grid grid-cols-2 gap-x-6 gap-y-5">

					{/* FULL NAME */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="space-y-0">
								<FieldLabel>
									<Trans>Full Name</Trans>
								</FieldLabel>
								<FormControl>
									<StyledInput
										{...field}
										placeholder="Your full name"
										onChange={(e) => {
											const value = e.target.value.replace(/[0-9]/g, "");
											field.onChange(value);
										}}
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-500 mt-1" />
							</FormItem>
						)}
					/>

					{/* HEADLINE */}
					<FormField
						control={form.control}
						name="headline"
						render={({ field }) => (
							<FormItem className="space-y-0">
								<FieldLabel>
									<Trans>Headline</Trans>
								</FieldLabel>
								<FormControl>
									<StyledInput
										{...field}
										placeholder="e.g. Android Developer"
										onChange={(e) => {
											const value = e.target.value.replace(/[0-9]/g, "");
											field.onChange(value);
										}}
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-500 mt-1" />
							</FormItem>
						)}
					/>

					{/* EMAIL */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="space-y-0">
								<FieldLabel>
									<Trans>Email</Trans>
								</FieldLabel>
								<FormControl>
									<StyledInput
										{...field}
										type="email"
										placeholder="you@example.com"
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-500 mt-1" />
							</FormItem>
						)}
					/>

					{/* PHONE */}
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="space-y-0">
								<FieldLabel>
									<Trans>Phone</Trans>
								</FieldLabel>
								<FormControl>
									<StyledInput
										{...field}
										placeholder="e.g. 9849320412"
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-500 mt-1" />
							</FormItem>
						)}
					/>

					{/* LOCATION */}
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="space-y-0">
								<FieldLabel>
									<Trans>Location</Trans>
								</FieldLabel>
								<FormControl>
									<StyledInput
										{...field}
										placeholder="City, State"
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-500 mt-1" />
							</FormItem>
						)}
					/>

					{/* WEBSITE */}
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem className="space-y-0">
								<FieldLabel>
									<Trans>Website</Trans>
								</FieldLabel>
								<FormControl>
									{/* URLInput kept as-is but wrapped to inherit styling */}
									<div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-gray-200 [&_input]:bg-gray-50 [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-sm [&_input]:text-gray-900 [&_input]:placeholder-gray-400 [&_input]:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-teal-300 [&_input]:focus:border-teal-400 [&_input]:transition-all">
										<URLInput
											{...field}
											value={field.value}
											onChange={field.onChange}
										/>
									</div>
								</FormControl>
								<FormMessage className="text-xs text-red-500 mt-1" />
							</FormItem>
						)}
					/>
				</div>

				{/* Custom fields below the grid */}
				<div className="mt-6">
					<CustomFieldsSection onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
}