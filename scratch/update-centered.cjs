const fs = require('fs');
const path = require('path');

const targetTemplates = ['bronzor.tsx', 'ditto.tsx', 'kakuna.tsx', 'lapras.tsx', 'onyx.tsx', 'rhyhorn.tsx'];
const dir = path.join(__dirname, '../src/components/resume/templates');

targetTemplates.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const templateName = path.basename(file, '.tsx');
    const templateClass = `.template-${templateName}`;

    const oldContainerStyle = `
				/* Interests & Languages as chips grid */
				${templateClass} .page-section-interests .section-content,
				${templateClass} .page-section-languages .section-content {
					display: grid !important;
					grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
					gap: 0.5rem !important;
				}
				
				/* Ensure chips don't stretch to fill the grid cell */
				${templateClass} .interests-item,
				${templateClass} .languages-item {
					justify-self: start !important;
				}`;

    const newContainerStyle = `
				/* Interests & Languages as chips centered flex */
				${templateClass} .page-section-interests .section-content,
				${templateClass} .page-section-languages .section-content {
					display: flex !important;
					flex-wrap: wrap !important;
					justify-content: center !important;
					gap: 0.5rem !important;
				}`;

    if (content.includes(oldContainerStyle.trim())) {
        content = content.replace(oldContainerStyle.trim(), newContainerStyle.trim());
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Could not find target style in ${file}`);
    }
});
