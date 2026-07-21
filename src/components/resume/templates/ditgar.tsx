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

	// Section Item Header in Sidebar Layout
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col",
	"group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start",

	// Decoration Line in Section Item Header
	"group-data-[layout=main]:[&_.section-item-header]:ps-2",
	"group-data-[layout=main]:[&_.section-item-header]:py-0.5",
	"group-data-[layout=main]:[&_.section-item-header]:-ms-2.5",
	"group-data-[layout=main]:[&_.section-item-header]:border-s-2",
	"group-data-[layout=main]:[&_.section-item-header]:border-(--page-primary-color)",
);

/**
 * Template: Ditgar
 */
export function DitgarTemplate({ pageIndex, pageLayout }: TemplateProps) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;

	return (
		<div className="template-ditgar page-content">
			<style>{`
				/* Skills as grid */
				.template-ditgar .page-section-skills .section-content {
					display: grid !important;
					grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
					column-gap: 0.75rem !important;
					row-gap: 1rem !important;
				}

				/* Interests & Languages as chips container */
				.template-ditgar .page-section-interests .section-content,
				.template-ditgar .page-section-languages .section-content {
					display: flex !important;
					flex-wrap: wrap !important;
					gap: 0.5rem !important;
				}

				/* Skills item */
				.template-ditgar .skills-item {
					display: flex !important;
					flex-direction: column !important;
					align-items: flex-start !important;
					row-gap: 0.25rem !important;
					width: 100% !important;
				}

				/* Interests & Languages chips styling */
				.template-ditgar .interests-item,
				.template-ditgar .languages-item {
					display: flex !important;
					flex-direction: row !important;
					align-items: center !important;
					width: auto !important;
					background-color: color-mix(in srgb, var(--page-primary-color) 10%, transparent) !important;
					border: 1px solid color-mix(in srgb, var(--page-primary-color) 20%, transparent) !important;
					border-radius: 9999px !important;
					padding: 0.35rem 0.75rem !important;
				}

				.template-ditgar .skills-item .section-item-header {
					margin-bottom: 0 !important;
				}
				.template-ditgar .interests-item .section-item-header,
				.template-ditgar .languages-item .section-item-header {
					margin-bottom: 0 !important;
					display: flex !important;
					align-items: center !important;
					column-gap: 0.35rem !important;
				}

				.template-ditgar .interests-item .section-item-title,
				.template-ditgar .languages-item .section-item-title {
					font-size: 1em !important;
					font-weight: 500 !important;
					color: var(--page-primary-color) !important;
				}
				
				.template-ditgar .interests-item .section-item-icon,
				.template-ditgar .languages-item .section-item-icon {
					color: var(--page-primary-color) !important;
				}

				.template-ditgar .skills-item .section-item-keywords,
				.template-ditgar .interests-item .section-item-keywords,
				.template-ditgar .languages-item .section-item-keywords {
					display: none !important;
				}
			`}</style>
			{/* Sidebar Background */}
			{(!fullWidth || isFirstPage) && (
				<div className="page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0" />
			)}

			<div className="flex">
				{(!fullWidth || isFirstPage) && (
					<aside data-layout="sidebar" className="sidebar group z-10 flex w-(--page-sidebar-width) shrink-0 flex-col">
						{isFirstPage && <Header />}

						<div className="flex-1 space-y-(--page-gap-y) px-(--page-margin-x) py-(--page-margin-y)">
							{sidebar.map((section) => (
								<Section key={section} type={section} id={section} sectionClassName={sectionClassName} />
							))}
						</div>
					</aside>
				)}

				<main data-layout="main" className={cn("main group z-10", !fullWidth ? "col-span-2" : "col-span-3")}>
					<div className="space-y-(--page-gap-y) px-(--page-margin-x) py-(--page-margin-y)">
						{main.map((section) => (
							<Section key={section} type={section} id={section} sectionClassName={sectionClassName} />
						))}
					</div>
				</main>
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
		<div
			data-section-id="header"
			className="page-header space-y-4 bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)"
		>
			<PagePicture />

			<div>
				<h2 className="font-bold text-2xl">
					<InlineEditableText value={basics.name} placeholder="Your Name" onChange={handleNameChange} />
				</h2>
				<p>
					<InlineEditableText
						value={basics.headline}
						placeholder="Your Professional Title"
						onChange={handleHeadlineChange}
					/>
				</p>
			</div>

			<div className="flex flex-col items-start gap-y-2 text-sm [&>div>i]:text-(--page-background-color)!">
				<div className="basics-item-location flex items-center gap-x-1.5">
					<PageIcon icon="map-pin" className="ph-bold" />
					<InlineEditableText value={basics.location} placeholder="City, Country" onChange={handleLocationChange} />
				</div>

				<div className="basics-item-phone flex items-center gap-x-1.5">
					<PageIcon icon="phone" className="ph-bold" />
					<InlineEditableText
						as="a"
						href={basics.phone ? `tel:${basics.phone}` : undefined}
						value={basics.phone}
						placeholder="+91 98765 43210"
						onChange={handlePhoneChange}
					/>
				</div>

				<div className="basics-item-email break-anywhere flex min-w-0 items-center gap-x-1.5">
					<PageIcon icon="envelope" className="ph-bold" />
					<InlineEditableText
						as="a"
						href={basics.email ? `mailto:${basics.email}` : undefined}
						value={basics.email}
						placeholder="email@domain.com"
						onChange={handleEmailChange}
					/>
				</div>

				{basics.website.url && (
					<div className="basics-item-website flex items-center gap-x-1.5">
						<PageIcon icon="globe" className="ph-bold" />
						<PageLink {...basics.website} />
					</div>
				)}

				{basics.customFields.map((field) => (
					<div key={field.id} className="basics-item-custom flex items-center gap-x-1.5">
						<PageIcon icon={field.icon} className="ph-bold" />
						{field.link ? <PageLink url={field.link} label={field.text} /> : <span>{field.text}</span>}
					</div>
				))}
			</div>
		</div>
	);
}
