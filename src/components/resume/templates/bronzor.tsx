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
	// Section Layout
	"grid grid-cols-5 border-(--page-primary-color) border-t pt-1",

	// Section Content
	"[&>.section-content]:col-span-4 [&>.section-content]:col-start-2",
);

/**
 * Template: Bronzor
 */
export function BronzorTemplate({ pageIndex, pageLayout }: TemplateProps) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;

	return (
		<div className="template-bronzor page-content space-y-(--page-gap-y) px-(--page-margin-x) py-(--page-margin-y)">
			<style>{`
				
				
				/* Profiles as grid */
				.template-bronzor .page-section-profiles .section-content {
					display: grid !important;
					grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
					gap: 0.75rem !important;
				}
				/* Skills as grid */
				.template-bronzor .page-section-skills .section-content {
					display: grid !important;
					grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
					column-gap: 0.75rem !important;
					row-gap: 1rem !important;
				}

				/* Interests & Languages as chips container */
				.template-bronzor .page-section-interests .section-content,
				.template-bronzor .page-section-languages .section-content {
					display: grid !important;
					grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
					gap: 0.75rem 0.5rem !important;
				}

				/* Skills item */
				.template-bronzor .skills-item {
					display: flex !important;
					flex-direction: column !important;
					align-items: flex-start !important;
					row-gap: 0.25rem !important;
					width: 100% !important;
				}

				/* Interests & Languages chips styling */
				.template-bronzor .interests-item,
				.template-bronzor .languages-item {
					display: flex !important;
					flex-direction: row !important;
					align-items: center !important;
					justify-content: center !important;
					width: fit-content !important;
					max-width: 100% !important;
					overflow: hidden !important;
					background-color: color-mix(in srgb, var(--page-primary-color) 10%, transparent) !important;
					border: 1px solid color-mix(in srgb, var(--page-primary-color) 20%, transparent) !important;
					border-radius: 1rem !important;
					padding: 0.35rem 0.75rem !important;
				}

				.template-bronzor .skills-item .section-item-header {
					margin-bottom: 0 !important;
				}
				.template-bronzor .interests-item .section-item-header,
				.template-bronzor .languages-item .section-item-header {
					margin-bottom: 0 !important;
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
					column-gap: 0.35rem !important;
				}

				.template-bronzor .interests-item .section-item-title,
				.template-bronzor .languages-item .section-item-title {
					font-size: 1em !important;
					font-weight: 500 !important;
					color: var(--page-primary-color) !important;
					word-break: break-word !important;
					text-align: center !important;
					text-wrap: balance !important;
				}
				
				.template-bronzor .interests-item .section-item-icon,
				.template-bronzor .languages-item .section-item-icon {
					color: var(--page-primary-color) !important;
				}

				.template-bronzor .skills-item .section-item-keywords,
				.template-bronzor .interests-item .section-item-keywords,
				.template-bronzor .languages-item .section-item-keywords {
					display: none !important;
				}
			`}</style>
			{isFirstPage && <Header />}

			<div className="space-y-(--page-gap-y)">
				<main data-layout="main" className="group page-main space-y-(--page-gap-y)">
					{main.map((section) => (
						<Section key={section} type={section} id={section} sectionClassName={sectionClassName} />
					))}
				</main>

				{!fullWidth && (
					<aside data-layout="sidebar" className="group page-sidebar space-y-(--page-gap-y)">
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
		<div data-section-id="header" className="page-header flex flex-col items-center gap-y-2">
			<PagePicture />

			<div className="page-basics space-y-2 text-center">
				<div className="basics-header">
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

				<div className="basics-items flex flex-wrap justify-center gap-x-3 gap-y-1 text-center *:flex *:items-center *:gap-x-1.5">
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
	);
}
