const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'types.ts');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const templateName = path.basename(file, '.tsx');
    const templateClass = `.template-${templateName}`;

    const gridMatch = content.match(new RegExp(`${templateClass} \\.page-section-skills \\.section-content[\\s\\S]*?grid-template-columns:\\s*(.*?)\\s*!important;`));
    let gridCols = 'repeat(auto-fit, minmax(120px, 1fr))';
    if (gridMatch) {
        gridCols = gridMatch[1];
    } else {
        const fallbackMatch = content.match(/grid-template-columns:\s*(.*?)\s*!important;/);
        if (fallbackMatch) gridCols = fallbackMatch[1];
    }

    const newStyle = `<style>{\`
				/* Skills as grid */
				${templateClass} .page-section-skills .section-content {
					display: grid !important;
					grid-template-columns: ${gridCols} !important;
					column-gap: 0.75rem !important;
					row-gap: 1rem !important;
				}

				/* Interests & Languages as chips container */
				${templateClass} .page-section-interests .section-content,
				${templateClass} .page-section-languages .section-content {
					display: flex !important;
					flex-wrap: wrap !important;
					gap: 0.5rem !important;
					margin-top: 0.75rem !important;
				}

				/* Skills item */
				${templateClass} .skills-item {
					display: flex !important;
					flex-direction: column !important;
					align-items: flex-start !important;
					row-gap: 0.25rem !important;
					width: 100% !important;
				}

				/* Interests & Languages chips styling */
				${templateClass} .interests-item,
				${templateClass} .languages-item {
					display: flex !important;
					flex-direction: row !important;
					align-items: center !important;
					width: auto !important;
					background-color: color-mix(in srgb, currentColor 5%, transparent) !important;
					border: 1px solid color-mix(in srgb, currentColor 20%, transparent) !important;
					border-radius: 9999px !important;
					padding: 0.35rem 0.75rem !important;
				}

				${templateClass} .skills-item .section-item-header {
					margin-bottom: 0 !important;
				}
				${templateClass} .interests-item .section-item-header,
				${templateClass} .languages-item .section-item-header {
					margin-bottom: 0 !important;
					display: flex !important;
					align-items: center !important;
					column-gap: 0.35rem !important;
				}

				${templateClass} .interests-item .section-item-title,
				${templateClass} .languages-item .section-item-title {
					font-size: 1em !important;
					font-weight: 500 !important;
					color: currentColor !important;
				}
				
				${templateClass} .interests-item .section-item-icon,
				${templateClass} .languages-item .section-item-icon {
					color: currentColor !important;
				}

				${templateClass} .skills-item .section-item-keywords,
				${templateClass} .interests-item .section-item-keywords,
				${templateClass} .languages-item .section-item-keywords {
					display: none !important;
				}
			\`}</style>`;

    const styleRegex = /<style>\{`[\s\S]*?`\}<\/style>/;
    if (styleRegex.test(content)) {
        content = content.replace(styleRegex, newStyle);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Could not find <style> block in ${file}`);
    }
});
