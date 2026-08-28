const fs = require('fs');
let c = fs.readFileSync('config.json', 'utf16le');
if (!c || c.trim() === '') {
    c = fs.readFileSync('config.json', 'utf8');
}
try {
    const d = JSON.parse(c);
    console.log("HERO VIDEO URL:", d.hero?.videoUrl);
    console.log("HOMEPAGE VIDEO URL:", d.homePage?.videoSection?.videoUrl);
} catch (e) {
    console.error("Parse error:", e.message);
}
