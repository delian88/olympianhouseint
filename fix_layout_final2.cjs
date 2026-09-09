const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage/Home.jsx', 'utf8');

// Ensure ValueProposition is imported
if (!content.includes('import ValueProposition')) {
    const importStr = 'import ValueProposition from "../../components/LandingPage/ValueProposition/ValueProposition";\n';
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
    content = content.substring(0, endOfLastImport) + importStr + content.substring(endOfLastImport);
}

// Remove any existing ValueProposition
content = content.replace(/\s*<ValueProposition \/>\s*/g, '\n\n');

// Remove ohi-difference if it exists
const ohiStart = content.indexOf('<section id="ohi-difference"');
if (ohiStart !== -1) {
    const ohiEnd = content.indexOf('</section>', ohiStart) + '</section>'.length;
    content = content.substring(0, ohiStart) + content.substring(ohiEnd);
}

// Put ValueProposition above track-record
const trIndex = content.indexOf('<section id="track-record"');
if (trIndex !== -1) {
    content = content.substring(0, trIndex) + '<ValueProposition />\n\n      ' + content.substring(trIndex);
}

fs.writeFileSync('src/pages/LandingPage/Home.jsx', content);
