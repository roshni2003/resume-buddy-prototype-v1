const fs = require('fs');
let content = fs.readFileSync('src/schema/resume/sample.ts', 'utf8');
content = content.replace(/website:\s*{\s*url:\s*"",\s*label:\s*"",\s*},/g, '');
// For projects, they have website but lack role. They start around line 123.
content = content.replace(/name: "Echoes of the Void \(Indie Game\)",/g, 'name: "Echoes of the Void (Indie Game)",\n\t\t\t\t\trole: "Creator",');
content = content.replace(/name: "Open Source: Unity Dialogue Framework",/g, 'name: "Open Source: Unity Dialogue Framework",\n\t\t\t\t\trole: "Maintainer",');
content = content.replace(/name: "Game Jam Participation",/g, 'name: "Game Jam Participation",\n\t\t\t\t\trole: "Participant",');
content = content.replace(/degree: "Bachelor of Science",/g, 'educationType: "College",\n\t\t\t\t\tdegree: "Bachelor of Science",');
fs.writeFileSync('src/schema/resume/sample.ts', content);
