const fs = require('fs');
let content = fs.readFileSync('src/schema/resume/data.ts', 'utf8');

// replace the enum with a string
content = content.replace(/college: z\.enum\(\["School", "College"\]\),/, 'college: z.string().optional(),');

// remove the school specific fields
content = content.replace(/\/\/ Dedicated fields for School to prevent data overlap with College[\s\S]*?schoolCurrentlyStudyingHere: z\.boolean\(\)\.optional\(\),/, '');

fs.writeFileSync('src/schema/resume/data.ts', content);
