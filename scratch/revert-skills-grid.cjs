const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'types.ts');

const cols2 = ['chikorita.tsx', 'ditgar.tsx', 'ditto.tsx', 'gengar.tsx', 'glalie.tsx', 'leafish.tsx', 'pikachu.tsx'];
const cols3 = ['kakuna.tsx', 'lapras.tsx', 'onyx.tsx', 'rhyhorn.tsx', 'bronzor.tsx', 'azurill.tsx'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const templateClass = `.template-${path.basename(file, '.tsx')}`;

    let cols = 1;
    if (cols2.includes(file)) cols = 2;
    if (cols3.includes(file)) cols = 3;

    // Replace the flex container for skills back to grid
    const flexRegex = new RegExp(`(\\/\\* Skills as dynamic wrapping flex \\*\\/\\s*${templateClass} \\.page-section-skills \\.section-content \\{)[\\s\\S]*?(\\})`);
    
    const gridReplacement = `/* Skills as grid */
				${templateClass} .page-section-skills .section-content {
					display: grid !important;
					grid-template-columns: repeat(${cols}, minmax(0, 1fr)) !important;
					column-gap: 0.75rem !important;
					row-gap: 1rem !important;
				}`;

    content = content.replace(flexRegex, gridReplacement);

    // Replace the skills item layout
    const flexItemRegex = new RegExp(`(\\/\\* Skills item \\*\\/\\s*${templateClass} \\.skills-item \\{)[\\s\\S]*?(\\})`);
    const gridItemReplacement = `/* Skills item */
				${templateClass} .skills-item {
					display: flex !important;
					flex-direction: column !important;
					align-items: flex-start !important;
					row-gap: 0.25rem !important;
					width: 100% !important;
				}`;

    content = content.replace(flexItemRegex, gridItemReplacement);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file} to ${cols} columns`);
});
