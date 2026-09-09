const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage/Home.jsx', 'utf8');

// 1. Remove the old ohi-difference section
const ohiStart = content.indexOf('<section id="ohi-difference"');
if (ohiStart !== -1) {
    const ohiEnd = content.indexOf('</section>', ohiStart) + '</section>'.length;
    content = content.substring(0, ohiStart) + content.substring(ohiEnd);
    console.log('Removed ohi-difference');
}

// 2. Ensure ValueProposition is imported
if (!content.includes('import ValueProposition')) {
    const importStr = 'import ValueProposition from "../../components/LandingPage/ValueProposition/ValueProposition";\n';
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
    content = content.substring(0, endOfLastImport) + importStr + content.substring(endOfLastImport);
    console.log('Added ValueProposition import');
}

// 3. Remove any existing <ValueProposition />
content = content.replace(/\s*<ValueProposition \/>\s*/g, '\n\n');

// 4. Insert <ValueProposition /> right above <section id="client-voices"
const cvIndex = content.indexOf('<section id="client-voices"');
if (cvIndex !== -1) {
    content = content.substring(0, cvIndex) + '<ValueProposition />\n\n      ' + content.substring(cvIndex);
    console.log('Inserted ValueProposition above client-voices');
} else {
    console.log('Could not find client-voices section!');
}

fs.writeFileSync('src/pages/LandingPage/Home.jsx', content);
console.log('Done!');
