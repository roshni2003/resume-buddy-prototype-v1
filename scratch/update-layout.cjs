const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const targetTemplates = ['bronzor.tsx', 'ditto.tsx', 'kakuna.tsx', 'lapras.tsx', 'onyx.tsx', 'rhyhorn.tsx'];

targetTemplates.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const templateClass = `.template-${path.basename(file, '.tsx')}`;

    // Replace the flex container with a grid container for interests and languages
    const flexRegex = new RegExp(`\\/\\* Interests & Languages as chips container \\*\\/\\s*${templateClass} \\.page-section-interests \\.section-content,\\s*${templateClass} \\.page-section-languages \\.section-content \\{\\s*display: flex !important;\\s*flex-wrap: wrap !important;\\s*gap: 0\\.5rem !important;\\s*\\}`);
    
    const gridReplacement = `/* Interests & Languages as chips container */
				${templateClass} .page-section-interests .section-content,
				${templateClass} .page-section-languages .section-content {
					display: grid !important;
					grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
					gap: 0.75rem 0.5rem !important;
				}`;

    content = content.replace(flexRegex, gridReplacement);

    // Replace width: auto with width: max-content
    // We only want to replace it inside the chips styling block
    const chipStylingRegex = new RegExp(`(\\/\\* Interests & Languages chips styling \\*\\/\\s*${templateClass} \\.interests-item,\\s*${templateClass} \\.languages-item \\{[\\s\\S]*?display: flex !important;\\s*flex-direction: row !important;\\s*align-items: center !important;\\s*)width: auto !important;`);
    
    const chipStylingReplacement = `$1width: max-content !important;\n\t\t\t\t\tmax-width: 100% !important;\n\t\t\t\t\toverflow: hidden !important;`;
    
    content = content.replace(chipStylingRegex, chipStylingReplacement);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
