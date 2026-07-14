const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/resume/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'types.ts');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Simply remove the margin-top line from the style block
    const updatedContent = content.replace(/\s*margin-top:\s*0\.75rem\s*!important;/g, '');
    
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Removed margin-top from ${file}`);
    }
});
