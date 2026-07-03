import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "@phosphor-icons/react";

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
		"2.1": string; // Role applying for
	};
	education: Array<{
		"3.1": string; // Degree
		"3.2": string; // Institution
		"3.3": DateRange;
		"3.4": boolean; // Projects?
	}>;
	projects: Array<{
		"4.1": string;
		"4.2": string;
		"4.3": string;
		"4.4": string;
		"4.5": string;
		"4.6": string[];
		"4.7": string;
	}>;
	experience: Array<{
		"5.1": string; // Yes/No
		"5.2"?: string;
		"5.3"?: string;
		"5.4"?: string;
		"5.5"?: DateRange;
		"5.6"?: string;
		"5.7"?: string[];
		"5.8"?: string[];
		"5.9"?: string; // Yes/No
		"5.10"?: string;
		"5.11"?: string;
	}>;
}

interface Props {
	jobRole: string;
	onComplete: (answers: OnboardingAnswers) => void;
}

export const onboardingQuestions = {
	basic_details: [
		{ id: "1.1", question: "What is your full name?" },
		{ id: "1.2", question: "What is your phone number?" },
		{ id: "1.3", question: "What is your email ID?" },
		{ id: "1.4", question: "Where are you currently located?" },
		{ id: "1.5", question: "Do you have a LinkedIn profile?" },
		{ id: "1.6", question: "Do you have a portfolio or GitHub link?" },
		{ id: "2.1", question: "What role are you applying for?" },
	],
	education: [
		{ id: "3.1", question: "What did you study?" },
		{ id: "3.2", question: "Where did you study?" },
		{ id: "3.3", question: "When did you study here?" },
		{ id: "3.4", question: "Did you work on any projects as part of this course?" },
	],
	projects: [
		{ id: "4.1", question: "What is the name of the project?" },
		{ id: "4.2", question: "What type of project was this?" },
		{ id: "4.3", question: "Was this an individual or team project?" },
		{ id: "4.4", question: "What problem was this project trying to solve?" },
		{ id: "4.5", question: "What did you work on in this project?" },
		{ id: "4.6", question: "What tools or technologies did you use?" },
		{ id: "4.7", question: "What was the outcome of this project?" },
	],
	experience: [
		{ id: "5.1", question: "Have you worked anywhere before (internship, job, volunteer)?" },
		{ id: "5.2", question: "Where did you work?" },
		{ id: "5.3", question: "What was your role there?" },
		{ id: "5.4", question: "What type of work was this?" },
		{ id: "5.5", question: "When did you work here?" },
		{ id: "5.6", question: "What were you mainly responsible for?" },
		{ id: "5.7", question: "What tasks did you do regularly?" },
		{ id: "5.8", question: "What tools or technologies did you use here?" },
		{ id: "5.9", question: "Did anything improve because of your work?" },
		{ id: "5.10", question: "What improved?" },
		{ id: "5.11", question: "Can you describe the change in simple words?" },
	],
};

export const OnboardingWizard: React.FC<Props> = ({ jobRole, onComplete }) => {
	const [step, setStep] = useState<number>(1);
	
	const [answers, setAnswers] = useState<OnboardingAnswers>({
		basic_details: {
			"1.1": "", "1.2": "", "1.3": "", "1.4": "", "1.5": "", "1.6": "", "2.1": jobRole,
		},
		education: [{ "3.1": "", "3.2": "", "3.3": { from: "", to: "" }, "3.4": false }],
		projects: [],
		experience: [{ "5.1": "No", "5.2": "", "5.3": "", "5.4": "", "5.5": { from: "", to: "" }, "5.6": "", "5.7": [], "5.8": [], "5.9": "No", "5.10": "", "5.11": "" }]
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
				setAnswers(prev => ({ ...prev, projects: [{ "4.1": "", "4.2": "", "4.3": "", "4.4": "", "4.5": "", "4.6": [], "4.7": "" }] }));
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
			return !!(b["1.1"].trim() && b["1.2"].trim() && b["1.3"].trim() && b["1.4"].trim() && b["2.1"].trim());
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
				exp["5.2"]?.trim() && exp["5.3"]?.trim() && exp["5.5"]?.from.trim() && exp["5.5"]?.to.trim() && exp["5.6"]?.trim() && exp["5.7"] && exp["5.7"].length > 0
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
					<Input placeholder="Full Name *" value={answers.basic_details["1.1"]} onChange={e => handleBasicChange("1.1", e.target.value)} />
					<Input placeholder="Mobile No *" value={answers.basic_details["1.2"]} onChange={e => handleBasicChange("1.2", e.target.value)} />
					<Input placeholder="Email ID *" type="email" value={answers.basic_details["1.3"]} onChange={e => handleBasicChange("1.3", e.target.value)} />
					<Input placeholder="Location *" value={answers.basic_details["1.4"]} onChange={e => handleBasicChange("1.4", e.target.value)} />
					<Input placeholder="LinkedIn Profile" value={answers.basic_details["1.5"]} onChange={e => handleBasicChange("1.5", e.target.value)} />
					<Input placeholder="GitHub Link" value={answers.basic_details["1.6"]} onChange={e => handleBasicChange("1.6", e.target.value)} />
					<Input placeholder="Role Applying For *" value={answers.basic_details["2.1"]} onChange={e => handleBasicChange("2.1", e.target.value)} />
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
							<Input placeholder="What did you study? *" value={edu["3.1"]} onChange={e => handleEduChange(idx, "3.1", e.target.value)} />
							<Input placeholder="Institution *" value={edu["3.2"]} onChange={e => handleEduChange(idx, "3.2", e.target.value)} />
							<div className="flex gap-2">
								<Input type="month" placeholder="From (YYYY-MM) *" value={edu["3.3"].from} onChange={e => handleEduChange(idx, "3.3", { ...edu["3.3"], from: e.target.value })} />
								<Input type="month" placeholder="To (YYYY-MM) *" value={edu["3.3"].to} onChange={e => handleEduChange(idx, "3.3", { ...edu["3.3"], to: e.target.value })} />
							</div>
							<div className="flex items-center gap-2">
								<label className="text-sm">Did you work on any projects as part of this course? *</label>
								<select className="border border-input rounded p-1 bg-background text-foreground" value={edu["3.4"] ? "Yes" : "No"} onChange={e => handleEduChange(idx, "3.4", e.target.value === "Yes")}>
									<option value="No">No</option>
									<option value="Yes">Yes</option>
								</select>
							</div>
						</div>
					))}
					<Button variant="outline" onClick={() => setAnswers(prev => ({ ...prev, education: [...prev.education, { "3.1": "", "3.2": "", "3.3": { from: "", to: "" }, "3.4": false }] }))}>Add another education</Button>
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
							<Input placeholder="Project Name *" value={proj["4.1"]} onChange={e => handleProjChange(idx, "4.1", e.target.value)} />
							<Input placeholder="Project Type" value={proj["4.2"]} onChange={e => handleProjChange(idx, "4.2", e.target.value)} />
							<select className="border border-input rounded p-1 w-full bg-background text-foreground" value={proj["4.3"]} onChange={e => handleProjChange(idx, "4.3", e.target.value)}>
								<option value="">Individual or Team? *</option>
								<option value="Individual">Individual</option>
								<option value="Team">Team</option>
							</select>
							<Textarea placeholder="Describe the project (What problem was it solving?) *" value={proj["4.4"]} onChange={e => handleProjChange(idx, "4.4", e.target.value)} />
							<Textarea placeholder="What did you work on?" value={proj["4.5"]} onChange={e => handleProjChange(idx, "4.5", e.target.value)} />
								<Input placeholder="Tools/Technologies (comma separated)" value={proj["4.6"].join(", ")} onChange={e => handleProjChange(idx, "4.6", e.target.value.split(",").map(s => s.trim()))} />
								<Input placeholder="What was the outcome?" value={proj["4.7"]} onChange={e => handleProjChange(idx, "4.7", e.target.value)} />
						</div>
					))}
					<Button variant="outline" onClick={() => setAnswers(prev => ({ ...prev, projects: [...prev.projects, { "4.1": "", "4.2": "", "4.3": "", "4.4": "", "4.5": "", "4.6": [], "4.7": "" }] }))}>Add another project</Button>
				</div>
			)}

			{/* Step 4: Experience Check */}
			{step === 4 && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold">4. Work Experience</h3>
					<div className="p-4 border rounded-md space-y-3">
						<label className="text-sm block mb-2">Have you worked anywhere before (internship, job, volunteer)?</label>
						<div className="flex gap-4">
							<Button variant={hasExperience ? "default" : "outline"} onClick={() => { setHasExperience(true); handleExpChange(0, "5.1", "Yes"); }}>Yes</Button>
							<Button variant={!hasExperience ? "default" : "outline"} onClick={() => { setHasExperience(false); handleExpChange(0, "5.1", "No"); }}>No</Button>
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
							<Input placeholder="Company Name *" value={exp["5.2"] || ""} onChange={e => handleExpChange(idx, "5.2", e.target.value)} />
							<Input placeholder="Role / Designation *" value={exp["5.3"] || ""} onChange={e => handleExpChange(idx, "5.3", e.target.value)} />
							<Input placeholder="Work Type (e.g. Full-time)" value={exp["5.4"] || ""} onChange={e => handleExpChange(idx, "5.4", e.target.value)} />
							<div className="flex gap-2">
								<Input type="month" placeholder="From (YYYY-MM) *" value={exp["5.5"]?.from || ""} onChange={e => handleExpChange(idx, "5.5", { ...exp["5.5"], from: e.target.value })} />
								<Input type="month" placeholder="To (YYYY-MM) *" value={exp["5.5"]?.to || ""} onChange={e => handleExpChange(idx, "5.5", { ...exp["5.5"], to: e.target.value })} />
							</div>
							<Textarea placeholder="Describe your role *" value={exp["5.6"] || ""} onChange={e => handleExpChange(idx, "5.6", e.target.value)} />
							<Input placeholder="Tasks done regularly (comma separated) *" value={exp["5.7"]?.join(", ") || ""} onChange={e => handleExpChange(idx, "5.7", e.target.value.split(",").filter(Boolean).map(s => s.trim()))} />
							<Input placeholder="Tools/Technologies (comma separated)" value={exp["5.8"]?.join(", ") || ""} onChange={e => handleExpChange(idx, "5.8", e.target.value.split(",").filter(Boolean).map(s => s.trim()))} />
							
							<div className="mt-4">
								<label className="text-sm mb-2 block">Did anything improve because of your work?</label>
								<select className="border border-input rounded p-1 w-full mb-2 bg-background text-foreground" value={exp["5.9"] || "No"} onChange={e => handleExpChange(idx, "5.9", e.target.value)}>
									<option value="No">No</option>
									<option value="Yes">Yes</option>
								</select>
								{exp["5.9"] === "Yes" && (
									<>
										<Input className="mb-2" placeholder="What improved?" value={exp["5.10"] || ""} onChange={e => handleExpChange(idx, "5.10", e.target.value)} />
										<Textarea placeholder="Describe the change in simple words" value={exp["5.11"] || ""} onChange={e => handleExpChange(idx, "5.11", e.target.value)} />
									</>
								)}
							</div>
						</div>
					))}
					<Button variant="outline" onClick={() => setAnswers(prev => ({ ...prev, experience: [...prev.experience, { "5.1": "Yes", "5.2": "", "5.3": "", "5.4": "", "5.5": { from: "", to: "" }, "5.6": "", "5.7": [], "5.8": [], "5.9": "No", "5.10": "", "5.11": "" }] }))}>Add another experience</Button>
				</div>
			)}

			<div className="flex justify-between pt-4">
				<Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
				<Button onClick={handleNext} disabled={!isStepValid()}>{step === 5 || (step === 4 && !hasExperience) ? "Finish" : "Next"}</Button>
			</div>
		</div>
	);
};
