const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'types.ts');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const templateClass = `.template-${path.basename(file, '.tsx')}`;

    // Replace the grid container for skills
    const skillsGridRegex = new RegExp(`(\\/\\* Skills as grid \\*\\/\\s*${templateClass} \\.page-section-skills \\.section-content \\{)[\\s\\S]*?(\\})`);
    
    const skillsFlexReplacement = `/* Skills as dynamic wrapping flex */
				${templateClass} .page-section-skills .section-content {
					display: flex !important;
					flex-wrap: wrap !important;
					gap: 1rem 0.75rem !important;
				}`;

    content = content.replace(skillsGridRegex, skillsFlexReplacement);

    // Replace the skills item layout
    const skillsItemRegex = new RegExp(`(\\/\\* Skills item \\*\\/\\s*${templateClass} \\.skills-item \\{)[\\s\\S]*?(\\})`);
    const skillsItemReplacement = `/* Skills item */
				${templateClass} .skills-item {
					display: flex !important;
					flex-direction: column !important;
					align-items: flex-start !important;
					flex: 1 1 max-content !important;
					min-width: calc(50% - 0.75rem) !important;
					max-width: 100% !important;
					row-gap: 0.25rem !important;
				}`;

    content = content.replace(skillsItemRegex, skillsItemReplacement);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
