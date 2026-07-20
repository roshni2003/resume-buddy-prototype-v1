import { EnvelopeIcon, GlobeIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react";
import { cn } from "@/utils/style";
import { Section } from "../shared/get-section-component";
import { InlineEditableText } from "../shared/inline-editable-text";
import { PageIcon } from "../shared/page-icon";
import { PageLink } from "../shared/page-link";
import { PagePicture } from "../shared/page-picture";
import { useResumeStore } from "../store/resume";
import type { TemplateProps } from "./types";

const sectionClassName = cn(
	// Section Heading
	"[&>h6]:border-(--page-primary-color) [&>h6]:border-b",

	// Section Heading in Sidebar Layout
	"group-data-[layout=sidebar]:[&>h6]:text-(--page-background-color)",
	"group-data-[layout=sidebar]:[&>h6]:border-(--page-background-color)",

	// Icon Colors in Sidebar Layout
	"group-data-[layout=sidebar]:[&_.section-item_i]:text-(--page-background-color)!",

	// Level Display in Sidebar Layout
	"group-data-[layout=sidebar]:[&_.section-item-level_div]:border-(--page-background-color)",
	"group-data-[layout=sidebar]:[&_.section-item-level_div[data-active=true]]:bg-(--page-background-color)",
	"group-data-[layout=sidebar]:[&_.section-item-level_i[data-active=true]]:text-(--page-background-color)!",
	"group-data-[layout=sidebar]:[&_.section-item-level_i[data-active=false]]:opacity-40",

	// Section Item Header in Sidebar Layout
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",
);

/**
 * Template: Chikorita
 */
export function ChikoritaTemplate({ pageIndex, pageLayout }: TemplateProps) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;

	return (
		<div className="template-chikorita page-content">
			<style>{`
				/* Skills as grid */
				.template-chikorita .page-section-skills .section-content {
					display: grid !important;
					grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
					column-gap: 0.75rem !important;
					row-gap: 1rem !important;
				}

				/* Interests & Languages as chips container */
				.template-chikorita .page-section-interests .section-content,
				.template-chikorita .page-section-languages .section-content {
					display: flex !important;
					flex-wrap: wrap !important;
					gap: 0.5rem !important;
				}

				/* Skills item */
				.template-chikorita .skills-item {
					display: flex !important;
					flex-direction: column !important;
					align-items: flex-start !important;
					row-gap: 0.25rem !important;
					width: 100% !important;
				}

				/* Interests & Languages chips styling */
				.template-chikorita .interests-item,
				.template-chikorita .languages-item {
					display: flex !important;
					flex-direction: row !important;
					align-items: center !important;
					width: auto !important;
					background-color: color-mix(in srgb, var(--page-primary-color) 10%, transparent) !important;
					border: 1px solid color-mix(in srgb, var(--page-primary-color) 20%, transparent) !important;
					border-radius: 9999px !important;
					padding: 0.35rem 0.75rem !important;
				}

				.template-chikorita .skills-item .section-item-header {
					margin-bottom: 0 !important;
				}
				.template-chikorita .interests-item .section-item-header,
				.template-chikorita .languages-item .section-item-header {
					margin-bottom: 0 !important;
					display: flex !important;
					align-items: center !important;
					column-gap: 0.35rem !important;
				}

				.template-chikorita .interests-item .section-item-title,
				.template-chikorita .languages-item .section-item-title {
					font-size: 1em !important;
					font-weight: 500 !important;
					color: var(--page-primary-color) !important;
				}
				
				.template-chikorita .interests-item .section-item-icon,
				.template-chikorita .languages-item .section-item-icon {
					color: var(--page-primary-color) !important;
				}

				.template-chikorita .skills-item .section-item-keywords,
				.template-chikorita .interests-item .section-item-keywords,
				.template-chikorita .languages-item .section-item-keywords {
					display: none !important;
				}
			
				/* Chikorita Sidebar Contrast for Chips */
				.template-chikorita [data-layout="sidebar"] .interests-item,
				.template-chikorita [data-layout="sidebar"] .languages-item {
					background-color: color-mix(in srgb, var(--page-background-color) 10%, transparent) !important;
					border: 1px solid color-mix(in srgb, var(--page-background-color) 20%, transparent) !important;
				}
				.template-chikorita [data-layout="sidebar"] .interests-item .section-item-title,
				.template-chikorita [data-layout="sidebar"] .languages-item .section-item-title,
				.template-chikorita [data-layout="sidebar"] .interests-item .section-item-icon,
				.template-chikorita [data-layout="sidebar"] .languages-item .section-item-icon {
					color: var(--page-background-color) !important;
				}
			`}</style>
			{/* Sidebar Background */}
			{!fullWidth && (
				<div className="page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color) ltr:end-0 rtl:start-0" />
			)}

			<div className="flex">
				<main
					data-layout="main"
					className="group page-main z-10 flex-1 space-y-4 px-(--page-margin-x) pt-(--page-margin-y)"
				>
					{isFirstPage && <Header />}
					{main.map((section) => (
						<Section key={section} type={section} id={section} sectionClassName={sectionClassName} />
					))}
				</main>

				{!fullWidth && (
					<aside
						data-layout="sidebar"
						className="group page-sidebar z-10 w-(--page-sidebar-width) shrink-0 space-y-4 overflow-x-hidden px-(--page-margin-x) pt-(--page-margin-y) text-(--page-background-color)"
					>
						{sidebar.map((section) => (
							<Section key={section} type={section} id={section} sectionClassName={sectionClassName} />
						))}
					</aside>
				)}
			</div>
		</div>
	);
}

function Header() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const handleEmailChange = (value: string) => {
		updateResumeData((draft) => {
			draft.basics.email = value;
		});
	};

	const handlePhoneChange = (value: string) => {
		updateResumeData((draft) => {
			draft.basics.phone = value;
		});
	};

	const handleLocationChange = (value: string) => {
		updateResumeData((draft) => {
			draft.basics.location = value;
		});
	};

	const handleNameChange = (value: string) => {
		updateResumeData((draft) => {
			draft.basics.name = value;
		});
	};

	const handleHeadlineChange = (value: string) => {
		updateResumeData((draft) => {
			draft.basics.headline = value;
		});
	};

	return (
		<div data-section-id="header" className="page-header relative flex">
			<div className="flex flex-1 items-start">
				<PagePicture />

				<div className="page-basics space-y-2 ps-4">
					<div>
						<h2 className="basics-name">
							<InlineEditableText value={basics.name} placeholder="Your Name" onChange={handleNameChange} />
						</h2>
						<p className="basics-headline">
							<InlineEditableText
								value={basics.headline}
								placeholder="Your Professional Title"
								onChange={handleHeadlineChange}
							/>
						</p>
					</div>

					<div className="basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5">
						<div className="basics-item-email break-anywhere min-w-0">
							<EnvelopeIcon />
							<InlineEditableText
								as="a"
								href={basics.email ? `mailto:${basics.email}` : undefined}
								value={basics.email}
								placeholder="email@domain.com"
								onChange={handleEmailChange}
							/>
						</div>

						<div className="basics-item-phone">
							<PhoneIcon />
							<InlineEditableText
								as="a"
								href={basics.phone ? `tel:${basics.phone}` : undefined}
								value={basics.phone}
								placeholder="+91 98765 43210"
								onChange={handlePhoneChange}
							/>
						</div>

						<div className="basics-item-location">
							<MapPinIcon />
							<InlineEditableText value={basics.location} placeholder="City, Country" onChange={handleLocationChange} />
						</div>

						{basics.website.url && (
							<div className="basics-item-website">
								<GlobeIcon />
								<PageLink {...basics.website} />
							</div>
						)}

						{basics.customFields.map((field) => (
							<div key={field.id} className="basics-item-custom">
								<PageIcon icon={field.icon} />
								{field.link ? <PageLink url={field.link} label={field.text} /> : <span>{field.text}</span>}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
