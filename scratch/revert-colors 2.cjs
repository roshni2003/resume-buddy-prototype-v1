const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'types.ts');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const templateName = path.basename(file, '.tsx');
    const templateClass = `.template-${templateName}`;

    // Replace background and border color
    content = content.replace(/background-color: color-mix\(in srgb, currentColor 5%, transparent\) !important;/g, 
        'background-color: color-mix(in srgb, var(--page-primary-color) 10%, transparent) !important;');
    
    content = content.replace(/border: 1px solid color-mix\(in srgb, currentColor 20%, transparent\) !important;/g, 
        'border: 1px solid color-mix(in srgb, var(--page-primary-color) 20%, transparent) !important;');

    // Replace text color
    content = content.replace(/color: currentColor !important;/g, 'color: var(--page-primary-color) !important;');

    // Specifically for Chikorita, add the sidebar overrides before the closing style tag
    if (file === 'chikorita.tsx' && !content.includes('[data-layout="sidebar"] .interests-item')) {
        const sidebarOverride = `
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
			\`}</style>`;
        content = content.replace(/`\}<\/style>/, sidebarOverride);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated colors for ${file}`);
});
