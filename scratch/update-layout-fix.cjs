const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const targetTemplates = ['bronzor.tsx', 'ditto.tsx', 'kakuna.tsx', 'lapras.tsx', 'onyx.tsx', 'rhyhorn.tsx'];

targetTemplates.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const templateClass = `.template-${path.basename(file, '.tsx')}`;

    // Replace the container
    const flexRegex = new RegExp(`(\\/\\* Interests & Languages as chips.*?\\*\\/\\s*${templateClass} \\.page-section-interests \\.section-content,\\s*${templateClass} \\.page-section-languages \\.section-content \\{)[\\s\\S]*?(\\})`);
    
    const gridReplacement = `/* Interests & Languages as chips container */
				${templateClass} .page-section-interests .section-content,
				${templateClass} .page-section-languages .section-content {
					display: grid !important;
					grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
					gap: 0.75rem 0.5rem !important;
				}`;

    content = content.replace(flexRegex, gridReplacement);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
