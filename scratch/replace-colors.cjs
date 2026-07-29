const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/routes/dashboard/admin/mixpanel.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  'bg-[#0A0A0A]': 'bg-background',
  'bg-[#121212]': 'bg-muted/30',
  'bg-[#171717]': 'bg-muted/50',
  'bg-[#1A1A1A]': 'bg-muted',
  'bg-[#262626]': 'bg-border',
  'border-[#262626]': 'border-border',
  'border-gray-800': 'border-border',
  'border-gray-700': 'border-border',
  'text-white': 'text-foreground',
  'text-gray-200': 'text-foreground/90',
  'text-gray-300': 'text-foreground/80',
  'text-gray-400': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground/80',
  'text-gray-600': 'text-muted-foreground/60',
  'stroke-[#1A1A1A]': 'stroke-muted',
};

for (const [search, replace] of Object.entries(replacements)) {
  content = content.split(search).join(replace);
}

// Special case for Card background to match theme better:
// In the original, Card had bg-[#0A0A0A] which became bg-background. We'll change Card to bg-card.
content = content.replace(/bg-background p-5 shadow-sm/g, 'bg-card p-5 shadow-sm');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced colors successfully');
