import { i18n } from "@lingui/core";
import { CaretUpDownIcon, CheckIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { Command } from "cmdk";
import { Popover, Slot } from "radix-ui";
import * as React from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import z from "zod";
import { create } from "zustand/react";
import {
	t as AlertDialog$1,
	n as AlertDialogAction,
	r as AlertDialogCancel,
	i as AlertDialogContent,
	a as AlertDialogDescription,
	o as AlertDialogFooter,
	s as AlertDialogHeader,
	c as AlertDialogTitle,
} from "./alert-dialog-D16KSnDL.js";
import { r as __esmMin, n as useControlledState } from "./get-strict-context-CE5mktmJ.js";
import { n as Button, t as Input } from "./input-C4lW-WI7.js";
import { t as cn } from "./style-BVXxCckg.js";

var templateSchema;
var init_templates = __esmMin(() => {
	templateSchema = z.enum([
		"azurill",
		"bronzor",
		"chikorita",
		"ditgar",
		"ditto",
		"gengar",
		"glalie",
		"kakuna",
		"lapras",
		"leafish",
		"onyx",
		"pikachu",
		"rhyhorn",
	]);
});
var iconSchema,
	itemOptionsSchema,
	urlSchema,
	pictureSchema,
	customFieldSchema,
	basicsSchema,
	summarySchema,
	baseItemSchema,
	summaryItemSchema,
	awardItemSchema,
	certificationItemSchema,
	educationItemSchema,
	experienceItemSchema,
	interestItemSchema,
	languageItemSchema,
	profileItemSchema,
	projectItemSchema,
	publicationItemSchema,
	referenceItemSchema,
	skillItemSchema,
	volunteerItemSchema,
	coverLetterItemSchema,
	baseSectionSchema,
	awardsSectionSchema,
	certificationsSectionSchema,
	educationSectionSchema,
	experienceSectionSchema,
	interestsSectionSchema,
	languagesSectionSchema,
	profilesSectionSchema,
	projectsSectionSchema,
	publicationsSectionSchema,
	referencesSectionSchema,
	skillsSectionSchema,
	volunteerSectionSchema,
	sectionsSchema,
	sectionTypeSchema,
	customSectionItemSchema,
	customSectionSchema,
	customSectionsSchema,
	fontWeightSchema,
	typographyItemSchema,
	pageLayoutSchema,
	layoutSchema,
	cssSchema,
	pageSchema,
	levelDesignSchema,
	colorDesignSchema,
	designSchema,
	typographySchema,
	metadataSchema,
	resumeDataSchema,
	defaultResumeData;
var init_data = __esmMin(() => {
	init_templates();
	iconSchema = z
		.string()
		.describe(
			"The icon to display for the custom field. Must be a valid icon name from @phosphor-icons/web icon set, or an empty string to hide. Default to '' (empty string) when unsure which icons are available.",
		);
	itemOptionsSchema = z
		.object({
			showLinkInTitle: z
				.boolean()
				.catch(false)
				.describe(
					"If true, the website URL is rendered as a hyperlink on the title instead of a separate link at the bottom.",
				),
		})
		.catch({ showLinkInTitle: false });
	urlSchema = z.object({
		url: z.string().describe("The URL to show as a link. Must be a valid URL with a protocol (http:// or https://)."),
		label: z.string().describe("The label to display for the URL. Leave blank to display the URL as-is."),
	});
	pictureSchema = z.object({
		hidden: z.boolean().describe("Whether to hide the picture from the resume."),
		url: z
			.string()
			.describe(
				"The URL to the picture to display on the resume. Must be a valid URL with a protocol (http:// or https://).",
			),
		size: z
			.number()
			.min(32)
			.max(512)
			.describe("The size of the picture to display on the resume, defined in points (pt)."),
		rotation: z
			.number()
			.min(0)
			.max(360)
			.describe("The rotation of the picture to display on the resume, defined in degrees (°)."),
		aspectRatio: z
			.number()
			.min(0.5)
			.max(2.5)
			.describe(
				"The aspect ratio of the picture to display on the resume, defined as width / height (e.g. 1.5 for 1.5:1 or 0.5 for 1:2).",
			),
		borderRadius: z
			.number()
			.min(0)
			.max(100)
			.describe("The border radius of the picture to display on the resume, defined in points (pt)."),
		borderColor: z
			.string()
			.describe("The color of the border of the picture to display on the resume, defined as rgba(r, g, b, a)."),
		borderWidth: z
			.number()
			.min(0)
			.describe("The width of the border of the picture to display on the resume, defined in points (pt)."),
		shadowColor: z
			.string()
			.describe("The color of the shadow of the picture to display on the resume, defined as rgba(r, g, b, a)."),
		shadowWidth: z
			.number()
			.min(0)
			.describe("The width of the shadow of the picture to display on the resume, defined in points (pt)."),
	});
	customFieldSchema = z.object({
		id: z.string().describe("The unique identifier for the custom field. Usually generated as a UUID."),
		icon: iconSchema,
		text: z.string().describe("The text to display for the custom field."),
		link: z.string().describe("If the custom field should be a link, the URL to link to.").catch(""),
	});
	basicsSchema = z.object({
		name: z
			.string()
			.regex(/^[^0-9]*$/, "Name cannot contain numbers")
			.describe("The full name of the author of the resume."),
		headline: z
			.string()
			.regex(/^[^0-9]*$/, "Headline cannot contain numbers")
			.describe("The headline of the author of the resume."),
		email: z.string().describe("The email address of the author of the resume."),
		phone: z.string().describe("The phone number of the author of the resume."),
		location: z.string().describe("The location of the author of the resume."),
		website: urlSchema.describe("The website of the author of the resume."),
		customFields: z.array(customFieldSchema).describe("The custom fields to display on the resume."),
	});
	summarySchema = z.object({
		title: z.string().describe("The title of the summary of the resume."),
		columns: z.number().describe("The number of columns the summary should span across."),
		hidden: z.boolean().describe("Whether to hide the summary from the resume."),
		content: z.string().describe("The content of the summary of the resume. This should be a HTML-formatted string."),
	});
	baseItemSchema = z.object({
		id: z.string().describe("The unique identifier for the item. Usually generated as a UUID."),
		hidden: z.boolean().describe("Whether to hide the item from the resume."),
		options: itemOptionsSchema.optional().describe("Display options for this item."),
	});
	summaryItemSchema = baseItemSchema.extend({
		content: z.string().describe("The rich text content of the summary item. This should be a HTML-formatted string."),
	});
	awardItemSchema = baseItemSchema.extend({
		title: z.string().min(1).describe("The title of the award."),
		awarder: z.string().describe("The awarder of the award."),
		date: z.string().describe("The date when the award was received."),
		website: urlSchema.describe("The website of the award, if any."),
		description: z.string().describe("The description of the award. This should be a HTML-formatted string."),
	});
	certificationItemSchema = baseItemSchema.extend({
		title: z.string().min(1).describe("The title of the certification."),
		issuer: z.string().describe("The issuer of the certification."),
		date: z.string().describe("The date when the certification was received."),
		website: urlSchema.describe("The website of the certification, if any."),
		description: z.string().describe("The description of the certification. This should be a HTML-formatted string."),
	});
	educationItemSchema = baseItemSchema.extend({
		school: z.string().min(1).describe("The name of the school or institution."),
		degree: z.string().describe("The degree or qualification obtained."),
		area: z.string().describe("The area of study or specialization."),
		grade: z.string().describe("The grade or score achieved."),
		location: z.string().describe("The location of the school or institution."),
		period: z.string().describe("The period of time the education was obtained over."),
		website: urlSchema.describe("The website of the school or institution, if any."),
		description: z.string().describe("The description of the education. This should be a HTML-formatted string."),
		currentlyStudyingHere: z.boolean().describe("Indicates if the user is currently studying at this institution."),
	});
	experienceItemSchema = baseItemSchema.extend({
		company: z.string().min(1).describe("The name of the company or organization."),
		position: z.string().describe("The position held at the company or organization."),
		location: z.string().describe("The location of the company or organization."),
		startDate: z.string().optional().describe("The start date of the experience."),
		endDate: z.string().optional().describe("The end date of the experience."),
		currentlyWorkingHere: z.boolean().optional().describe("Whether the user is currently working here."),
		description: z.string().describe("The description of the experience. This should be a HTML-formatted string."),
		period: z.string().describe("The period of time the experience was obtained over."),
		website: urlSchema.describe("The website of the company or organization, if any."),
	});
	interestItemSchema = baseItemSchema.extend({
		icon: iconSchema,
		name: z.string().min(1).describe("The name of the interest/hobby."),
		keywords: z
			.array(z.string())
			.catch([])
			.describe("The keywords associated with the interest/hobby, if any. These are displayed as tags below the name."),
	});
	languageItemSchema = baseItemSchema.extend({
		language: z.string().min(1).describe("The name of the language the author knows."),
		fluency: z
			.string()
			.describe(
				"The fluency level of the language. Can be any text, such as 'Native', 'Fluent', 'Conversational', etc. or can also be a CEFR level (A1, A2, B1, B2, C1, C2).",
			),
		level: z
			.number()
			.min(0)
			.max(5)
			.catch(0)
			.describe(
				"The proficiency level of the language, defined as a number between 0 and 5. If set to 0, the icons displaying the level will be hidden.",
			),
	});
	profileItemSchema = baseItemSchema.extend({
		icon: iconSchema,
		network: z.string().min(1).describe("The name of the network or platform."),
		username: z.string().describe("The username of the author on the network or platform."),
		website: urlSchema.describe("The link to the profile of the author on the network or platform, if any."),
	});
	projectItemSchema = baseItemSchema.extend({
		name: z.string().min(1).describe("The name of the project."),
		period: z.string().describe("The period of time the project was worked on."),
		website: urlSchema.describe("The link to the project, if any."),
		description: z.string().describe("The description of the project. This should be a HTML-formatted string."),
	});
	publicationItemSchema = baseItemSchema.extend({
		title: z.string().min(1).describe("The title of the publication."),
		publisher: z.string().describe("The publisher of the publication."),
		date: z.string().describe("The date when the publication was published."),
		website: urlSchema.describe("The link to the publication, if any."),
		description: z.string().describe("The description of the publication. This should be a HTML-formatted string."),
	});
	referenceItemSchema = baseItemSchema.extend({
		name: z.string().min(1).describe("The name of the reference, or a note such as 'Available upon request'."),
		position: z.string().describe("The position or job title of the reference."),
		website: urlSchema.describe("The website or LinkedIn profile of the reference, if any."),
		phone: z.string().describe("The phone number of the reference."),
		description: z
			.string()
			.describe(
				"The description of the reference. Can be used to display a quote, a testimonial, etc. This should be a HTML-formatted string.",
			),
	});
	skillItemSchema = baseItemSchema.extend({
		icon: iconSchema,
		name: z.string().min(1).describe("The name of the skill."),
		proficiency: z
			.string()
			.describe(
				"The proficiency level of the skill. Can be any text, such as 'Beginner', 'Intermediate', 'Advanced', etc.",
			),
		level: z
			.number()
			.min(0)
			.max(5)
			.catch(0)
			.describe(
				"The proficiency level of the skill, defined as a number between 0 and 5. If set to 0, the icons displaying the level will be hidden.",
			),
		keywords: z
			.array(z.string())
			.catch([])
			.describe("The keywords associated with the skill, if any. These are displayed as tags below the name."),
	});
	volunteerItemSchema = baseItemSchema.extend({
		organization: z.string().min(1).describe("The name of the organization or company."),
		location: z.string().describe("The location of the organization or company."),
		period: z.string().describe("The period of time the author was volunteered at the organization or company."),
		website: urlSchema.describe("The link to the organization or company, if any."),
		description: z
			.string()
			.describe("The description of the volunteer experience. This should be a HTML-formatted string."),
	});
	coverLetterItemSchema = baseItemSchema.extend({
		recipient: z.string().describe("The recipient's address block as HTML (name, title, company, address, email)."),
		content: z.string().describe("The cover letter body as HTML (salutation, paragraphs, closing, signature)."),
	});
	baseSectionSchema = z.object({
		title: z.string().describe("The title of the section."),
		columns: z.number().describe("The number of columns the section should span across."),
		hidden: z.boolean().describe("Whether to hide the section from the resume."),
	});
	awardsSectionSchema = baseSectionSchema.extend({
		items: z.array(awardItemSchema).describe("The items to display in the awards section."),
	});
	certificationsSectionSchema = baseSectionSchema.extend({
		items: z.array(certificationItemSchema).describe("The items to display in the certifications section."),
	});
	educationSectionSchema = baseSectionSchema.extend({
		items: z.array(educationItemSchema).describe("The items to display in the education section."),
	});
	experienceSectionSchema = baseSectionSchema.extend({
		items: z.array(experienceItemSchema).describe("The items to display in the experience section."),
	});
	interestsSectionSchema = baseSectionSchema.extend({
		items: z.array(interestItemSchema).describe("The items to display in the interests section."),
	});
	languagesSectionSchema = baseSectionSchema.extend({
		items: z.array(languageItemSchema).describe("The items to display in the languages section."),
	});
	profilesSectionSchema = baseSectionSchema.extend({
		items: z.array(profileItemSchema).describe("The items to display in the profiles section."),
	});
	projectsSectionSchema = baseSectionSchema.extend({
		items: z.array(projectItemSchema).describe("The items to display in the projects section."),
	});
	publicationsSectionSchema = baseSectionSchema.extend({
		items: z.array(publicationItemSchema).describe("The items to display in the publications section."),
	});
	referencesSectionSchema = baseSectionSchema.extend({
		items: z.array(referenceItemSchema).describe("The items to display in the references section."),
	});
	skillsSectionSchema = baseSectionSchema.extend({
		items: z.array(skillItemSchema).describe("The items to display in the skills section."),
	});
	volunteerSectionSchema = baseSectionSchema.extend({
		items: z.array(volunteerItemSchema).describe("The items to display in the volunteer section."),
	});
	sectionsSchema = z.object({
		profiles: profilesSectionSchema.describe("The section to display the profiles of the author."),
		experience: experienceSectionSchema.describe("The section to display the experience of the author."),
		education: educationSectionSchema.describe("The section to display the education of the author."),
		projects: projectsSectionSchema.describe("The section to display the projects of the author."),
		skills: skillsSectionSchema.describe("The section to display the skills of the author."),
		languages: languagesSectionSchema.describe("The section to display the languages of the author."),
		interests: interestsSectionSchema.describe("The section to display the interests of the author."),
		awards: awardsSectionSchema.describe("The section to display the awards of the author."),
		certifications: certificationsSectionSchema.describe("The section to display the certifications of the author."),
		publications: publicationsSectionSchema.describe("The section to display the publications of the author."),
		volunteer: volunteerSectionSchema.describe("The section to display the volunteer experience of the author."),
		references: referencesSectionSchema.describe("The section to display the references of the author."),
	});
	sectionTypeSchema = z.enum([
		"summary",
		"profiles",
		"experience",
		"education",
		"projects",
		"skills",
		"languages",
		"interests",
		"awards",
		"certifications",
		"publications",
		"volunteer",
		"references",
		"cover-letter",
	]);
	customSectionItemSchema = z.union([
		coverLetterItemSchema,
		summaryItemSchema,
		profileItemSchema,
		experienceItemSchema,
		educationItemSchema,
		projectItemSchema,
		skillItemSchema,
		languageItemSchema,
		interestItemSchema,
		awardItemSchema,
		certificationItemSchema,
		publicationItemSchema,
		volunteerItemSchema,
		referenceItemSchema,
	]);
	customSectionSchema = baseSectionSchema.extend({
		id: z.string().describe("The unique identifier for the custom section. Usually generated as a UUID."),
		type: sectionTypeSchema.describe(
			"The type of items this custom section contains. Determines which item schema and form fields to use.",
		),
		items: z
			.array(customSectionItemSchema)
			.describe("The items to display in the custom section. Items follow the schema of the section type."),
	});
	customSectionsSchema = z.array(customSectionSchema);
	fontWeightSchema = z.enum(["100", "200", "300", "400", "500", "600", "700", "800", "900"]);
	typographyItemSchema = z.object({
		fontFamily: z.string().describe("The family of the font to use. Must be a font that is available on Google Fonts."),
		fontWeights: z
			.array(fontWeightSchema)
			.catch(["400"])
			.describe(
				"The weight of the font, defined as a number between 100 and 900. Default to 400 when unsure if the weight is available in the font.",
			),
		fontSize: z.number().min(6).max(24).catch(11).describe("The size of the font to use, defined in points (pt)."),
		lineHeight: z
			.number()
			.min(0.5)
			.max(4)
			.catch(1.5)
			.describe("The line height of the font to use, defined as a multiplier of the font size (e.g. 1.5 for 1.5x)."),
	});
	pageLayoutSchema = z.object({
		fullWidth: z
			.boolean()
			.describe(
				"Whether the layout of the page should be full width. If true, the main column will span the entire width of the page. This means that there should be no items in the sidebar column.",
			),
		main: z
			.array(z.string())
			.describe(
				"The items to display in the main column of the page. A string array of section IDs (experience, education, projects, skills, languages, interests, awards, certifications, publications, volunteer, references, profiles, summary or UUIDs for custom sections).",
			),
		sidebar: z
			.array(z.string())
			.describe(
				"The items to display in the sidebar column of the page. A string array of section IDs (experience, education, projects, skills, languages, interests, awards, certifications, publications, volunteer, references, profiles, summary or UUIDs for custom sections).",
			),
	});
	layoutSchema = z.object({
		sidebarWidth: z
			.number()
			.min(10)
			.max(50)
			.catch(35)
			.describe("The width of the sidebar column, defined as a percentage of the page width."),
		pages: z.array(pageLayoutSchema).describe("The pages to display in the layout."),
	});
	cssSchema = z.object({
		enabled: z.boolean().describe("Whether to enable custom CSS for the resume."),
		value: z.string().describe("The custom CSS to apply to the resume. This should be a valid CSS string."),
	});
	pageSchema = z.object({
		gapX: z.number().min(0).describe("The horizontal gap between the sections of the page, defined in points (pt)."),
		gapY: z.number().min(0).describe("The vertical gap between the sections of the page, defined in points (pt)."),
		marginX: z.number().min(0).describe("The horizontal margin of the page, defined in points (pt)."),
		marginY: z.number().min(0).describe("The vertical margin of the page, defined in points (pt)."),
		format: z
			.enum(["a4", "letter", "free-form"])
			.describe("The format of the page. Can be 'a4', 'letter' or 'free-form'.")
			.catch("a4"),
		locale: z
			.string()
			.describe("The locale of the page. Used for displaying pre-translated section headings, if not overridden.")
			.catch("en-US"),
		hideIcons: z.boolean().describe("Whether to hide the icons of the sections.").catch(false),
	});
	levelDesignSchema = z.object({
		icon: iconSchema,
		type: z
			.enum(["hidden", "circle", "square", "rectangle", "rectangle-full", "progress-bar", "icon"])
			.describe(
				"The type of the level design. 'hidden' will hide the level design, 'circle' will display a circle, 'square' will display a square, 'rectangle' will display a rectangle, 'rectangle-full' will display a full rectangle, 'progress-bar' will display a progress bar, and 'icon' will display an icon. If 'icon' is selected, the icon to display should be specified in the 'icon' field.",
			),
	});
	colorDesignSchema = z.object({
		primary: z.string().describe("The primary color of the design, defined as rgba(r, g, b, a)."),
		text: z
			.string()
			.describe("The text color of the design, defined as rgba(r, g, b, a). Usually set to black: rgba(0, 0, 0, 1)."),
		background: z
			.string()
			.describe(
				"The background color of the design, defined as rgba(r, g, b, a). Usually set to white: rgba(255, 255, 255, 1).",
			),
	});
	designSchema = z.object({
		level: levelDesignSchema,
		colors: colorDesignSchema,
	});
	typographySchema = z.object({
		body: typographyItemSchema.describe("The typography for the body of the resume."),
		heading: typographyItemSchema.describe("The typography for the headings of the resume."),
	});
	metadataSchema = z.object({
		template: templateSchema
			.catch("onyx")
			.describe("The template to use for the resume. Determines the overall design and appearance of the resume."),
		layout: layoutSchema.describe(
			"The layout of the resume. Determines the structure and arrangement of the sections on the resume.",
		),
		css: cssSchema.describe(
			"Custom CSS to apply to the resume. Can be used to override the default styles of the template.",
		),
		page: pageSchema.describe(
			"The page settings of the resume. Determines the margins, format, and locale of the resume.",
		),
		design: designSchema.describe(
			"The design settings of the resume. Determines the colors, level designs, and typography of the resume.",
		),
		typography: typographySchema.describe(
			"The typography settings of the resume. Determines the fonts and sizes of the body and headings of the resume.",
		),
		notes: z
			.string()
			.describe(
				"Personal notes for the resume. Can be used to add any additional information or instructions for the resume. These notes are not displayed on the resume, they are only visible to the author of the resume when editing the resume. This should be a HTML-formatted string.",
			),
		coverLetter: z
			.string()
			.optional()
			.describe(
				"Cover letter accompanying the resume. This will be included when exporting the resume. Supports rich text formatting.",
			),
	});
	resumeDataSchema = z.object({
		picture: pictureSchema.describe("Configuration for photograph displayed on the resume"),
		basics: basicsSchema.describe(
			"Basic information about the author, such as name, email, phone, location, and website",
		),
		summary: summarySchema.describe("Summary section of the resume, useful for a short bio or introduction"),
		sections: sectionsSchema.describe("Various sections of the resume, such as experience, education, projects, etc."),
		customSections: customSectionsSchema.describe(
			"Custom sections of the resume, such as a custom section for notes, etc.",
		),
		metadata: metadataSchema.describe(
			"Metadata for the resume, such as template, layout, typography, etc. This section describes the overall design and appearance of the resume.",
		),
	});
	defaultResumeData = {
		picture: {
			hidden: false,
			url: "",
			size: 80,
			rotation: 0,
			aspectRatio: 1,
			borderRadius: 0,
			borderColor: "rgba(0, 0, 0, 0.5)",
			borderWidth: 0,
			shadowColor: "rgba(0, 0, 0, 0.5)",
			shadowWidth: 0,
		},
		basics: {
			name: "",
			headline: "",
			email: "",
			phone: "",
			location: "",
			website: {
				url: "",
				label: "",
			},
			customFields: [],
		},
		summary: {
			title: "",
			columns: 1,
			hidden: false,
			content: "",
		},
		sections: {
			profiles: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			experience: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			education: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			projects: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			skills: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			languages: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			interests: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			awards: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			certifications: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			publications: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			volunteer: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
			references: {
				title: "",
				columns: 1,
				hidden: false,
				items: [],
			},
		},
		customSections: [],
		metadata: {
			template: "onyx",
			layout: {
				sidebarWidth: 35,
				pages: [
					{
						fullWidth: false,
						main: ["profiles", "summary", "education", "experience", "projects", "volunteer", "references"],
						sidebar: ["skills", "certifications", "awards", "languages", "interests", "publications"],
					},
				],
			},
			css: {
				enabled: false,
				value: "",
			},
			page: {
				gapX: 4,
				gapY: 6,
				marginX: 14,
				marginY: 12,
				format: "a4",
				locale: "en-US",
				hideIcons: false,
			},
			design: {
				colors: {
					primary: "rgba(220, 38, 38, 1)",
					text: "rgba(0, 0, 0, 1)",
					background: "rgba(255, 255, 255, 1)",
				},
				level: {
					icon: "star",
					type: "circle",
				},
			},
			typography: {
				body: {
					fontFamily: "IBM Plex Serif",
					fontWeights: ["400"],
					fontSize: 10,
					lineHeight: 1.5,
				},
				heading: {
					fontFamily: "IBM Plex Serif",
					fontWeights: ["600"],
					fontSize: 14,
					lineHeight: 1.5,
				},
			},
			notes: "",
			coverLetter: "",
		},
	};
});
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn(
			"group/input-group relative flex h-9 w-full min-w-0 items-center rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] in-data-[slot=combobox-content]:focus-within:border-ring has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3",
			className,
		),
		...props,
	});
}
var inputGroupAddonVariants = cva(
	"flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 font-medium text-muted-foreground text-sm group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
	{
		variants: {
			align: {
				"inline-start": "order-first ps-2 has-[>button]:-ms-1 has-[>kbd]:ms-[-0.15rem]",
				"inline-end": "order-last pe-2 has-[>button]:-me-1 has-[>kbd]:me-[-0.15rem]",
				"block-start":
					"order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
				"block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
			},
		},
		defaultVariants: { align: "inline-start" },
	},
);
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props,
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: {
		size: {
			xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
			sm: "",
			"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
			"icon-sm": "size-8 p-0 has-[>svg]:p-0",
		},
	},
	defaultVariants: { size: "xs" },
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		...props,
		type,
		asChild: false,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
	});
}
function InputGroupText({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn(
			"flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
			className,
		),
		...props,
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		"data-slot": "input-group-control",
		className: cn(
			"flex-1 rounded-none border-0 bg-transparent shadow-none hover:bg-secondary/40 focus-visible:bg-secondary/40 aria-invalid:ring-0",
			className,
		),
		...props,
	});
}
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command, {
		"data-slot": "command",
		className: cn(
			"flex size-full flex-col gap-y-1 overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
			className,
		),
		...props,
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "command-input-wrapper",
		className: "p-1 pb-0",
		children: /* @__PURE__ */ jsxs(InputGroup, {
			className: "h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:ps-2!",
			children: [
				/* @__PURE__ */ jsx(Command.Input, {
					"data-slot": "command-input",
					className: cn("w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className),
					...props,
				}),
				/* @__PURE__ */ jsx(InputGroupAddon, {
					children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "size-4 shrink-0 opacity-50" }),
				}),
			],
		}),
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.List, {
		"data-slot": "command-list",
		className: cn("no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden outline-none", className),
		...props,
	});
}
function CommandEmpty({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Empty, {
		"data-slot": "command-empty",
		className: cn("py-6 text-center text-sm", className),
		...props,
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Group, {
		"data-slot": "command-group",
		className: cn(
			"overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs",
			className,
		),
		...props,
	});
}
function CommandSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Separator, {
		"data-slot": "command-separator",
		className: cn("-mx-1 h-px w-auto bg-border", className),
		...props,
	});
}
function CommandItem({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Command.Item, {
		"data-slot": "command-item",
		className: cn(
			"group/command-item relative flex cursor-default select-none items-center gap-2 in-data-[slot=dialog-content]:rounded-lg! rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-selected:bg-muted data-selected:text-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-selected:**:[svg]:text-foreground",
			className,
		),
		...props,
		children: [
			children,
			/* @__PURE__ */ jsx(CheckIcon, {
				className:
					"ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100",
			}),
		],
	});
}
function CommandShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "command-shortcut",
		className: cn(
			"ml-auto text-muted-foreground text-xs tracking-widest group-data-selected/command-item:text-foreground",
			className,
		),
		...props,
	});
}
init_data();
z.discriminatedUnion("type", [
	z.object({
		type: z.literal("resume.create"),
		data: z.undefined(),
	}),
	z.object({
		type: z.literal("resume.update"),
		data: z.object({
			id: z.string(),
			name: z.string(),
			slug: z.string(),
			tags: z.array(z.string()),
		}),
	}),
	z.object({
		type: z.literal("resume.import"),
		data: z.undefined(),
	}),
	z.object({
		type: z.literal("resume.duplicate"),
		data: z.object({
			id: z.string(),
			name: z.string(),
			slug: z.string(),
			tags: z.array(z.string()),
			shouldRedirect: z.boolean().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.template.gallery"),
		data: z.undefined(),
	}),
	z.object({
		type: z.literal("resume.sections.profiles.create"),
		data: z
			.object({
				item: profileItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.profiles.update"),
		data: z.object({
			item: profileItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.experience.create"),
		data: z
			.object({
				item: experienceItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.experience.update"),
		data: z.object({
			item: experienceItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.education.create"),
		data: z
			.object({
				item: educationItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.education.update"),
		data: z.object({
			item: educationItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.projects.create"),
		data: z
			.object({
				item: projectItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.projects.update"),
		data: z.object({
			item: projectItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.skills.create"),
		data: z
			.object({
				item: skillItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.skills.update"),
		data: z.object({
			item: skillItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.languages.create"),
		data: z
			.object({
				item: languageItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.languages.update"),
		data: z.object({
			item: languageItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.awards.create"),
		data: z
			.object({
				item: awardItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.awards.update"),
		data: z.object({
			item: awardItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.certifications.create"),
		data: z
			.object({
				item: certificationItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.certifications.update"),
		data: z.object({
			item: certificationItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.publications.create"),
		data: z
			.object({
				item: publicationItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.publications.update"),
		data: z.object({
			item: publicationItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.interests.create"),
		data: z
			.object({
				item: interestItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.interests.update"),
		data: z.object({
			item: interestItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.volunteer.create"),
		data: z
			.object({
				item: volunteerItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.volunteer.update"),
		data: z.object({
			item: volunteerItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.references.create"),
		data: z
			.object({
				item: referenceItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.references.update"),
		data: z.object({
			item: referenceItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.summary.create"),
		data: z
			.object({
				item: summaryItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.summary.update"),
		data: z.object({
			item: summaryItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.cover-letter.create"),
		data: z
			.object({
				item: coverLetterItemSchema.optional(),
				customSectionId: z.string().optional(),
			})
			.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.cover-letter.update"),
		data: z.object({
			item: coverLetterItemSchema,
			customSectionId: z.string().optional(),
		}),
	}),
	z.object({
		type: z.literal("resume.sections.custom.create"),
		data: customSectionSchema.optional(),
	}),
	z.object({
		type: z.literal("resume.sections.custom.update"),
		data: customSectionSchema,
	}),
]);
const useDialogStore = create((set) => ({
	open: false,
	activeDialog: null,
	onOpenChange: (open) => {
		set({ open });
		if (!open)
			setTimeout(() => {
				set({ activeDialog: null });
			}, 300);
	},
	openDialog: (type, data) =>
		set({
			open: true,
			activeDialog: {
				type,
				data,
			},
		}),
	closeDialog: () => {
		set({ open: false });
		setTimeout(() => {
			set({ activeDialog: null });
		}, 300);
	},
}));
var ConfirmContext = React.createContext(null);
function ConfirmDialogProvider({ children }) {
	const [state, setState] = React.useState({
		open: false,
		resolve: null,
		title: "",
		description: void 0,
		confirmText: void 0,
		cancelText: void 0,
	});
	const confirm = React.useCallback(async (title, options) => {
		return new Promise((resolve) => {
			setState({
				open: true,
				resolve,
				title,
				description: options?.description,
				confirmText: options?.confirmText,
				cancelText: options?.cancelText,
			});
		});
	}, []);
	const handleConfirm = React.useCallback(() => {
		if (state.resolve) state.resolve(true);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null,
		}));
	}, [state.resolve]);
	const handleCancel = React.useCallback(() => {
		if (state.resolve) state.resolve(false);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null,
		}));
	}, [state.resolve]);
	return /* @__PURE__ */ jsxs(ConfirmContext.Provider, {
		value: { confirm },
		children: [
			children,
			/* @__PURE__ */ jsx(AlertDialog$1, {
				open: state.open,
				onOpenChange: (open) => !open && handleCancel(),
				children: /* @__PURE__ */ jsxs(AlertDialogContent, {
					children: [
						/* @__PURE__ */ jsxs(AlertDialogHeader, {
							children: [
								/* @__PURE__ */ jsx(AlertDialogTitle, { children: state.title }),
								/* @__PURE__ */ jsx(AlertDialogDescription, {
									className: cn(!state.description && "sr-only"),
									children: state.description,
								}),
							],
						}),
						/* @__PURE__ */ jsxs(AlertDialogFooter, {
							children: [
								/* @__PURE__ */ jsx(AlertDialogCancel, {
									onClick: handleCancel,
									children: state.cancelText ?? "Cancel",
								}),
								/* @__PURE__ */ jsx(AlertDialogAction, {
									onClick: handleConfirm,
									children: state.confirmText ?? "Confirm",
								}),
							],
						}),
					],
				}),
			}),
		],
	});
}
function useConfirm() {
	const context = React.useContext(ConfirmContext);
	if (!context) throw new Error("useConfirm must be used within a <ConfirmDialogProvider />.");
	return context.confirm;
}
function Popover$1({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Root, {
		"data-slot": "popover",
		...props,
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Trigger, {
		"data-slot": "popover-trigger",
		...props,
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(Popover.Portal, {
		children: /* @__PURE__ */ jsx(Popover.Content, {
			"data-slot": "popover-content",
			align,
			sideOffset,
			className: cn(
				"data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex min-w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-popover-foreground text-sm shadow-md outline-hidden ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in",
				className,
			),
			...props,
		}),
	});
}
function PopoverHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "popover-header",
		className: cn("flex flex-col gap-1 text-sm", className),
		...props,
	});
}
function PopoverTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "popover-title",
		className: cn("font-medium", className),
		...props,
	});
}
function Combobox({
	disabled = false,
	clearable = true,
	options,
	value,
	defaultValue = null,
	placeholder = i18n._({ id: "O/7I0o" }),
	searchPlaceholder = i18n._({ id: "YIix5Y" }),
	emptyMessage = i18n._({ id: "MZbQHL" }),
	className,
	buttonProps,
	onValueChange,
	...props
}) {
	const { className: buttonClassName, children: buttonChildren, ...buttonRestProps } = buttonProps ?? {};
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = useControlledState({
		value,
		defaultValue,
		onChange: (next) => onValueChange?.(next, options.find((o) => o.value === next) ?? null),
	});
	const selectedOption = React.useMemo(() => {
		return options.find((option) => option.value === selectedValue) ?? null;
	}, [options, selectedValue]);
	const selectedLabel = selectedOption?.label;
	const onSelect = React.useCallback(
		(current) => {
			const next = current ?? null;
			if (!clearable && selectedValue === next) {
				setOpen(false);
				return;
			}
			setSelectedValue(selectedValue === next ? null : next);
			setOpen(false);
		},
		[clearable, selectedValue, setSelectedValue],
	);
	return /* @__PURE__ */ jsxs(Popover$1, {
		open,
		onOpenChange: React.useCallback(
			(nextOpen) => {
				if (disabled) return;
				setOpen(nextOpen);
			},
			[disabled],
		),
		children: [
			/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Button, {
					role: "combobox",
					variant: "outline",
					"aria-expanded": open,
					disabled,
					"aria-disabled": disabled,
					tapScale: 1,
					className: cn(
						"min-w-0 font-normal active:scale-100",
						typeof buttonChildren === "function" ? "" : "justify-between",
						disabled && "pointer-events-none opacity-60",
						buttonClassName,
					),
					...buttonRestProps,
					children:
						typeof buttonChildren === "function"
							? buttonChildren(selectedValue, selectedOption)
							: /* @__PURE__ */ jsxs(Fragment$1, {
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "flex-1 truncate text-left",
											children: selectedLabel ?? placeholder,
										}),
										/* @__PURE__ */ jsx(CaretUpDownIcon, { className: "ms-2 shrink-0 opacity-50" }),
									],
								}),
				}),
			}),
			/* @__PURE__ */ jsx(PopoverContent, {
				align: "start",
				"aria-disabled": disabled,
				tabIndex: disabled ? -1 : void 0,
				className: cn("min-w-[200px] p-0", className, disabled && "pointer-events-none select-none opacity-60"),
				...props,
				children: /* @__PURE__ */ jsxs(Command$1, {
					children: [
						/* @__PURE__ */ jsx(CommandInput, {
							placeholder: searchPlaceholder,
							disabled,
						}),
						/* @__PURE__ */ jsxs(CommandList, {
							children: [
								/* @__PURE__ */ jsx(CommandEmpty, { children: emptyMessage }),
								/* @__PURE__ */ jsx(CommandGroup, {
									children: options.map((option) => {
										const isSelected = selectedValue === option.value;
										const isDisabled = option.disabled ?? disabled;
										return /* @__PURE__ */ jsxs(
											CommandItem,
											{
												value: String(option.value),
												keywords: option.keywords,
												disabled: isDisabled,
												onSelect: isDisabled ? void 0 : onSelect,
												"aria-disabled": isDisabled,
												className: cn(isDisabled && "pointer-events-none opacity-60"),
												children: [
													/* @__PURE__ */ jsx(CheckIcon, {
														"aria-hidden": true,
														className: cn(
															"size-4 shrink-0 transition-opacity",
															isSelected ? "opacity-100" : "opacity-0",
														),
													}),
													/* @__PURE__ */ jsx("span", {
														className: cn("truncate", isDisabled && "opacity-60"),
														children: option.label,
													}),
												],
											},
											String(option.value),
										);
									}),
								}),
							],
						}),
					],
				}),
			}),
		],
	});
}
var badgeVariants = cva(
	"group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-4xl border border-transparent px-2 py-0.5 font-medium text-xs transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
				secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
				destructive:
					"bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
				outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
				ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
		},
		defaultVariants: { variant: "default" },
	},
);
function Badge({ className, variant = "default", asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot.Root : "span", {
		"data-slot": "badge",
		"data-variant": variant,
		className: cn(badgeVariants({ variant }), className),
		...props,
	});
}
export {
	educationItemSchema as A,
	resumeDataSchema as B,
	InputGroupText as C,
	coverLetterItemSchema as D,
	certificationItemSchema as E,
	pictureSchema as F,
	templateSchema as G,
	summaryItemSchema as H,
	profileItemSchema as I,
	projectItemSchema as L,
	init_data as M,
	interestItemSchema as N,
	customSectionSchema as O,
	languageItemSchema as P,
	publicationItemSchema as R,
	InputGroupInput as S,
	basicsSchema as T,
	volunteerItemSchema as U,
	skillItemSchema as V,
	init_templates as W,
	CommandSeparator as _,
	PopoverHeader as a,
	InputGroupAddon as b,
	ConfirmDialogProvider as c,
	Command$1 as d,
	CommandEmpty as f,
	CommandList as g,
	CommandItem as h,
	PopoverContent as i,
	experienceItemSchema as j,
	defaultResumeData as k,
	useConfirm as l,
	CommandInput as m,
	Combobox as n,
	PopoverTitle as o,
	CommandGroup as p,
	Popover$1 as r,
	PopoverTrigger as s,
	Badge as t,
	useDialogStore as u,
	CommandShortcut as v,
	awardItemSchema as w,
	InputGroupButton as x,
	InputGroup as y,
	referenceItemSchema as z,
};
