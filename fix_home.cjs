const fs = require('fs');

const content = fs.readFileSync('src/pages/LandingPage/Home.jsx', 'utf8');

// We need to extract:
// 1. ValueProposition
// 2. client-voices
// and we need the original ohi-difference from original_home.jsx

const orig = fs.readFileSync('original_home.jsx', 'utf8');
const ohiDiffMatch = orig.match(/(<section id="ohi-difference"[\s\S]*?<\/section>\s*)/);
const ohiDiff = ohiDiffMatch ? ohiDiffMatch[1] : '';

// Remove ValueProposition from current
let newContent = content.replace(/\s*<ValueProposition \/>\s*/, '\n\n');

// Extract client-voices
const cvMatch = newContent.match(/(<section id="client-voices"[\s\S]*?<\/section>\s*)/);
const cv = cvMatch ? cvMatch[1] : '';
newContent = newContent.replace(/(<section id="client-voices"[\s\S]*?<\/section>\s*)/, '');

// Now we need to assemble.
// Let's find <section id="about" ... </section>
const aboutRegex = /(<section id="about"[\s\S]*?<\/section>\s*)/;

// We want to insert ohiDiff, then cv (Client Voices), then track-record, then ValueProposition.
// Wait, track-record is already after about in newContent.
// So let's replace about with about + ohiDiff + cv
newContent = newContent.replace(aboutRegex, `$1\n\n${ohiDiff}\n\n${cv}\n\n`);

// And insert ValueProposition after track-record
const trRegex = /(<section id="track-record"[\s\S]*?<\/section>\s*)/;
newContent = newContent.replace(trRegex, `$1\n\n      <ValueProposition />\n\n`);

fs.writeFileSync('src/pages/LandingPage/Home.jsx', newContent);
console.log('Done');
