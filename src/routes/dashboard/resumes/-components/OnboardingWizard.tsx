import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { XIcon, WarningCircleIcon } from "@phosphor-icons/react";

interface DateRange {
	from: string;
	to: string;
}

export interface OnboardingAnswers {
	basic_details: {
		"1.1": string;
		"1.2": string;
		"1.3": string;
		"1.4": string;
		"1.5": string;
		"1.6": string;
	};
	education: Array<{
		"3.1": string; // Degree
		"3.2": string; // Institution
		"3.3": DateRange;
		"3.4": boolean; // Projects?
	}>;
	projects: Array<{
		"4.1": string;
		"4.3": string;
		"4.4": string;
		"4.5": string;
		"4.6": string;
		"4.7": string;
	}>;
	experience: Array<{
		"5.1": string; // Yes/No
		"5.2"?: string;
		"5.3"?: string;
		"5.5"?: DateRange;
		"5.6"?: string;
		"5.7"?: string;
		"5.8"?: string;
		"5.11"?: string;
	}>;
}

interface Props {
	jobRole: string;
	onComplete: (answers: OnboardingAnswers) => void;
	error?: string | null;
}

export const onboardingQuestions = {
	basic_details: [
		{ id: "1.1", question: "Name*" },
		{ id: "1.2", question: "Mobile No.*" },
		{ id: "1.3", question: "Email ID*" },
		{ id: "1.4", question: "Location*" },
		{ id: "1.5", question: "Linkedin profile" },
		{ id: "1.6", question: "Github link" },
	],
	education: [
		{ id: "3.1", question: "What did you study?*" },
		{ id: "3.2", question: "Institution*" },
		{ id: "3.3", question: "From - To *" },
		{ id: "3.4", question: "Did you work on any projects as part of this course?*" },
	],
	projects: [
		{ id: "4.1", question: "What is the name of the project?*" },
		{ id: "4.3", question: "Was this an individual or team project?*" },
		{ id: "4.4", question: "Describe the project*" },
		{ id: "4.5", question: "What did you work on in this project?" },
		{ id: "4.6", question: "What tools or technologies did you use?" },
		{ id: "4.7", question: "What was the outcome of this project?" },
	],
	experience: [
		{ id: "5.1", question: "Have you worked anywhere before (internship, job, volunteer)?*" },
		{ id: "5.2", question: "Company Name*" },
		{ id: "5.3", question: "Role/ Designation*" },
		{ id: "5.5", question: "From - To*" },
		{ id: "5.6", question: "Describe your role*" },
		{ id: "5.7", question: "What tasks did you do regularly?*" },
		{ id: "5.8", question: "What tools or technologies did you use here?" },
		{ id: "5.11", question: "What impact did your role make for the organisation?" },
	],
};

export const OnboardingWizard: React.FC<Props> = ({ jobRole, onComplete, error }) => {
	const [step, setStep] = useState<number>(1);
	
	const [answers, setAnswers] = useState<OnboardingAnswers>({
		basic_details: {
			"1.1": "", "1.2": "", "1.3": "", "1.4": "", "1.5": "", "1.6": ""
		},
		education: [{ "3.1": "", "3.2": "", "3.3": { from: "", to: "" }, "3.4": false }],
		projects: [],
		experience: [{ "5.1": "No", "5.2": "", "5.3": "", "5.5": { from: "", to: "" }, "5.6": "", "5.7": "", "5.8": "", "5.11": "" }]
	});
	
	const [hasProjects, setHasProjects] = useState(false);
	const [hasExperience, setHasExperience] = useState(false);

	const handleBasicChange = (id: keyof OnboardingAnswers["basic_details"], val: string) => {
		setAnswers(prev => ({ ...prev, basic_details: { ...prev.basic_details, [id]: val } }));
	};

	const handleEduChange = (index: number, field: string, val: any) => {
		const newEdu = [...answers.education];
		newEdu[index] = { ...newEdu[index], [field]: val };
		setAnswers(prev => ({ ...prev, education: newEdu }));
		if (field === "3.4" && val === true) setHasProjects(true);
	};

	const handleProjChange = (index: number, field: string, val: any) => {
		const newProj = [...answers.projects];
		newProj[index] = { ...newProj[index], [field]: val };
		setAnswers(prev => ({ ...prev, projects: newProj }));
	};

	const handleExpChange = (index: number, field: string, val: any) => {
		const newExp = [...answers.experience];
		newExp[index] = { ...newExp[index], [field]: val };
		setAnswers(prev => ({ ...prev, experience: newExp }));
		if (field === "5.1") setHasExperience(val === "Yes");
	};

	const removeEdu = (index: number) => {
		setAnswers(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
	};

	const removeProj = (index: number) => {
		setAnswers(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
	};

	const removeExp = (index: number) => {
		setAnswers(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
	};

	const handleNext = () => {
		if (step === 1) setStep(2);
		else if (step === 2) {
			if (hasProjects && answers.projects.length === 0) {
				setAnswers(prev => ({ ...prev, projects: [{ "4.1": "", "4.3": "", "4.4": "", "4.5": "", "4.6": "", "4.7": "" }] }));
				setStep(3);
			} else if (hasProjects) {
				setStep(3);
			} else {
				setStep(4);
			}
		} else if (step === 3) setStep(4);
		else if (step === 4) {
			if (hasExperience) setStep(5);
			else onComplete(answers);
		} else if (step === 5) {
			onComplete(answers);
		}
	};

	const handleBack = () => {
		if (step === 2) setStep(1);
		else if (step === 3) setStep(2);
		else if (step === 4) setStep(hasProjects ? 3 : 2);
		else if (step === 5) setStep(4);
	};

	const isStepValid = () => {
		if (step === 1) {
			const b = answers.basic_details;
			const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b["1.3"].trim());
			const isValidMobile = /^[6-9]\d{9}$/.test(b["1.2"].trim());
			const isValidLocation = b["1.4"].trim().length >= 2;
			
			const linkedinVal = b["1.5"].trim();
			const githubVal = b["1.6"].trim();
			
			const isValidLinkedin = linkedinVal.length === 0 || linkedinVal.length >= 5;
			const isValidGithub = githubVal.length === 0 || githubVal.length >= 3;

			return !!(b["1.1"].trim().length >= 2 && isValidMobile && isValidEmail && isValidLocation && isValidLinkedin && isValidGithub);
		}
		if (step === 2) {
			return answers.education.every(edu => 
				edu["3.1"].trim() && edu["3.2"].trim() && edu["3.3"].from.trim() && edu["3.3"].to.trim()
			);
		}
		if (step === 3) {
			return answers.projects.every(proj => 
				proj["4.1"].trim() && proj["4.3"].trim() && proj["4.4"].trim()
			);
		}
		if (step === 5) {
			return answers.experience.every(exp => 
				exp["5.2"]?.trim() && exp["5.3"]?.trim() && exp["5.5"]?.from.trim() && exp["5.5"]?.to.trim() && exp["5.6"]?.trim() && exp["5.7"]?.trim()
			);
		}
		return true;
	};

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			{/* Step 1: Basic Details */}
			{step === 1 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">1. Basic Details</h3>
					<Input placeholder="Name*" value={answers.basic_details["1.1"]} onChange={e => handleBasicChange("1.1", e.target.value)} />
					{answers.basic_details["1.1"].trim().length === 1 && (
							<p className="text-xs text-rose-500 mt-1">Please enter a valid name (at least 2 characters).</p>
						)}
					<div>
						<Input placeholder="Mobile No.*" type="tel" maxLength={10} value={answers.basic_details["1.2"]} onChange={e => handleBasicChange("1.2", e.target.value.replace(/[^\d]/g, ''))} />
						{answers.basic_details["1.2"].length > 0 && !/^[6-9]\d{9}$/.test(answers.basic_details["1.2"].trim()) && (
							<p className="text-xs text-rose-500 mt-1">Mobile number must be 10 digits starting with 6, 7, 8, or 9.</p>
						)}
					</div>
					
					<div>
						<Input placeholder="Email ID*" type="email" value={answers.basic_details["1.3"]} onChange={e => handleBasicChange("1.3", e.target.value)} />
						{answers.basic_details["1.3"].length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.basic_details["1.3"].trim()) && (
							<p className="text-xs text-rose-500 mt-1">Please enter a valid email address.</p>
						)}
					</div>

					<div>
						<Input placeholder="Location*" value={answers.basic_details["1.4"]} onChange={e => handleBasicChange("1.4", e.target.value)} />
						{answers.basic_details["1.4"].trim().length === 1 && (
							<p className="text-xs text-rose-500 mt-1">Please enter a valid location (at least 2 characters).</p>
						)}
					</div>
					<div>
						<Input placeholder="Linkedin profile" value={answers.basic_details["1.5"]} onChange={e => handleBasicChange("1.5", e.target.value)} />
						{answers.basic_details["1.5"].trim().length > 0 && answers.basic_details["1.5"].trim().length < 5 && (
							<p className="text-xs text-rose-500 mt-1">Please enter a valid LinkedIn URL or username.</p>
						)}
					</div>
					<div>
						<Input placeholder="Github link" value={answers.basic_details["1.6"]} onChange={e => handleBasicChange("1.6", e.target.value)} />
						{answers.basic_details["1.6"].trim().length > 0 && answers.basic_details["1.6"].trim().length < 3 && (
							<p className="text-xs text-rose-500 mt-1">Please enter a valid GitHub URL or username.</p>
						)}
					</div>
				</div>
			)}

			{/* Step 2: Education */}
			{step === 2 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">2. Education</h3>
					{answers.education.map((edu, idx) => (
						<div key={idx} className="p-4 border rounded-md space-y-3">
							<div className="flex justify-between items-center">
								<h4 className="font-semibold text-sm text-muted-foreground">Education {idx + 1}</h4>
								{idx > 0 && (
									<button className="text-muted-foreground hover:text-destructive p-1 hover:bg-muted/50 rounded-md transition-colors" onClick={() => removeEdu(idx)} title="Remove Education">
										<XIcon className="w-5 h-5" />
									</button>
								)}
							</div>
							<Input placeholder="What did you study?*" value={edu["3.1"]} onChange={e => handleEduChange(idx, "3.1", e.target.value)} />
							<Input placeholder="Institution*" value={edu["3.2"]} onChange={e => handleEduChange(idx, "3.2", e.target.value)} />
							<div className="flex gap-2">
								<Input type="date" placeholder="From" value={edu["3.3"].from} onChange={e => handleEduChange(idx, "3.3", { ...edu["3.3"], from: e.target.value })} />
								<Input type="date" placeholder="To" value={edu["3.3"].to} onChange={e => handleEduChange(idx, "3.3", { ...edu["3.3"], to: e.target.value })} />
							</div>
							<div className="flex items-center gap-2">
								<label className="text-sm">Did you work on any projects as part of this course?*</label>
								<select className="border border-input rounded p-1 bg-background text-foreground" value={edu["3.4"] ? "Yes" : "No"} onChange={e => handleEduChange(idx, "3.4", e.target.value === "Yes")}>
									<option value="No">No</option>
									<option value="Yes">Yes</option>
								</select>
							</div>
						</div>
					))}
					<Button variant="outline" className="cursor-pointer" onClick={() => setAnswers(prev => ({ ...prev, education: [...prev.education, { "3.1": "", "3.2": "", "3.3": { from: "", to: "" }, "3.4": false }] }))}>Add another education</Button>
				</div>
			)}

			{/* Step 3: Projects */}
			{step === 3 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">3. Projects</h3>
					{answers.projects.map((proj, idx) => (
						<div key={idx} className="p-4 border rounded-md space-y-3">
							<div className="flex justify-between items-center">
								<h4 className="font-semibold text-sm text-muted-foreground">Project {idx + 1}</h4>
								{idx > 0 && (
									<button className="text-muted-foreground hover:text-destructive p-1 hover:bg-muted/50 rounded-md transition-colors" onClick={() => removeProj(idx)} title="Remove Project">
										<XIcon className="w-5 h-5" />
									</button>
								)}
							</div>
							<Input placeholder="What is the name of the project?*" value={proj["4.1"]} onChange={e => handleProjChange(idx, "4.1", e.target.value)} />
							<select className="border border-input rounded p-1 w-full bg-background text-foreground" value={proj["4.3"]} onChange={e => handleProjChange(idx, "4.3", e.target.value)}>
								<option value="">Was this an individual or team project?*</option>
								<option value="Individual">Individual</option>
								<option value="Team">Team</option>
							</select>
							<Textarea placeholder="Describe the project*" value={proj["4.4"]} onChange={e => handleProjChange(idx, "4.4", e.target.value)} />
							<Textarea placeholder="What did you work on in this project?" value={proj["4.5"]} onChange={e => handleProjChange(idx, "4.5", e.target.value)} />
							<Input placeholder="What tools or technologies did you use?" value={proj["4.6"]} onChange={e => handleProjChange(idx, "4.6", e.target.value)} />
							<Input placeholder="What was the outcome of this project?" value={proj["4.7"]} onChange={e => handleProjChange(idx, "4.7", e.target.value)} />
						</div>
					))}
					<Button variant="outline" className="cursor-pointer" onClick={() => setAnswers(prev => ({ ...prev, projects: [...prev.projects, { "4.1": "", "4.3": "", "4.4": "", "4.5": "", "4.6": "", "4.7": "" }] }))}>Add another project</Button>
				</div>
			)}

			{/* Step 4: Experience Check */}
			{step === 4 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">4. Work Experience</h3>
					<div className="p-4 border rounded-md space-y-3">
						<label className="text-sm block mb-2">Have you worked anywhere before (internship, job, volunteer)?*</label>
						<div className="flex gap-4">
							<Button variant={hasExperience ? "default" : "outline"} className="cursor-pointer" onClick={() => { setHasExperience(true); handleExpChange(0, "5.1", "Yes"); }}>Yes</Button>
							<Button variant={!hasExperience ? "default" : "outline"} className="cursor-pointer" onClick={() => { setHasExperience(false); handleExpChange(0, "5.1", "No"); }}>No</Button>
						</div>
					</div>
				</div>
			)}

			{/* Step 5: Work Experience Details */}
			{step === 5 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">5. Experience Details</h3>
					{answers.experience.map((exp, idx) => (
						<div key={idx} className="p-4 border rounded-md space-y-3">
							<div className="flex justify-between items-center">
								<h4 className="font-semibold text-sm text-muted-foreground">Experience {idx + 1}</h4>
								{idx > 0 && (
									<button className="text-muted-foreground hover:text-destructive p-1 hover:bg-muted/50 rounded-md transition-colors" onClick={() => removeExp(idx)} title="Remove Experience">
										<XIcon className="w-5 h-5" />
									</button>
								)}
							</div>
							<Input placeholder="Company Name*" value={exp["5.2"] || ""} onChange={e => handleExpChange(idx, "5.2", e.target.value)} />
							<Input placeholder="Role/ Designation*" value={exp["5.3"] || ""} onChange={e => handleExpChange(idx, "5.3", e.target.value)} />
							<div className="flex gap-2">
								<Input type="date" placeholder="From" value={exp["5.5"]?.from || ""} onChange={e => handleExpChange(idx, "5.5", { ...exp["5.5"], from: e.target.value })} />
								<Input type="date" placeholder="To" value={exp["5.5"]?.to || ""} onChange={e => handleExpChange(idx, "5.5", { ...exp["5.5"], to: e.target.value })} />
							</div>
							<Textarea placeholder="Describe your role*" value={exp["5.6"] || ""} onChange={e => handleExpChange(idx, "5.6", e.target.value)} />
							<Input placeholder="What tasks did you do regularly?*" value={exp["5.7"] || ""} onChange={e => handleExpChange(idx, "5.7", e.target.value)} />
							<Input placeholder="What tools or technologies did you use here?" value={exp["5.8"] || ""} onChange={e => handleExpChange(idx, "5.8", e.target.value)} />
							<Input placeholder="What impact did your role make for the organisation?" value={exp["5.11"] || ""} onChange={e => handleExpChange(idx, "5.11", e.target.value)} />
						</div>
					))}
					<Button variant="outline" className="cursor-pointer" onClick={() => setAnswers(prev => ({ ...prev, experience: [...prev.experience, { "5.1": "Yes", "5.2": "", "5.3": "", "5.5": { from: "", to: "" }, "5.6": "", "5.7": "", "5.8": "", "5.11": "" }] }))}>Add another experience</Button>
				</div>
			)}

			{error && (
				<div className="p-4 rounded-xl border border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center gap-3">
					<WarningCircleIcon className="size-5 shrink-0" weight="fill" />
					<p className="text-sm font-medium">{error}</p>
				</div>
			)}
			<div className="flex justify-between pt-4">
				<Button variant="outline" className="cursor-pointer" onClick={handleBack} disabled={step === 1}>Back</Button>
				<Button className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleNext} disabled={!isStepValid()}>{step === 5 || (step === 4 && !hasExperience) ? "Finish" : "Next"}</Button>
			</div>
		</div>
	);
};
