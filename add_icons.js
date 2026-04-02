const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

const replacements = [
    {
        // 1. İlan Ver Button
        regex: /(<nav class="nav-left" aria-label="Sol menü">\s*)<ul role="menubar">/g,
        replace: "$1<a href=\"ilan-ver.html\" class=\"nav-btn-post\" aria-label=\"İlan Ver\">\n                    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n                        <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n                    </svg>\n                    İLAN VER\n                </a>\n                <ul role=\"menubar\">"
    },
    {
        // 2. Satılık Icon
        regex: /(class="nav-link"[^>]*>\s*)Satılık(\s*<span class="arrow">)/g,
        replace: "$1<svg class=\"nav-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg> Satılık$2"
    },
    {
        // 3. Kiralık Icon
        regex: /(class="nav-link"[^>]*>\s*)Kiralık(\s*<span class="arrow">)/g,
        replace: "$1<svg class=\"nav-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4\"/></svg> Kiralık$2"
    },
    {
        // 4. Kurumsal Icon
        regex: /(class="nav-link"[^>]*>\s*)Kurumsal(\s*<span class="arrow">)/g,
        replace: "$1<svg class=\"nav-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\"/><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"/></svg> Kurumsal$2"
    },
    {
        // 5. Araç Kiralama Icon
        regex: /(class="nav-link"[^>]*>\s*)Araç Kiralama(\s*<\/a>)/g,
        replace: "$1<svg class=\"nav-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4\"/><circle cx=\"7\" cy=\"19\" r=\"2\"/><circle cx=\"17\" cy=\"19\" r=\"2\"/></svg> Araç Kiralama$2"
    },
    {
        // 6. Blog Icon
        regex: /(class="nav-link"[^>]*>\s*)Blog(\s*<\/a>)/g,
        replace: "$1<svg class=\"nav-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg> Blog$2"
    },
    {
        // 7. İletişim Icon
        regex: /(class="nav-link"[^>]*>\s*)İletişim(\s*<\/a>)/g,
        replace: "$1<svg class=\"nav-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/></svg> İletişim$2"
    }
];

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(__dirname, file);
    let originalText = fs.readFileSync(filePath, 'utf8');
    let text = originalText;

    for (const rep of replacements) {
        text = text.replace(rep.regex, rep.replace);
    }

    if (text !== originalText) {
        fs.writeFileSync(filePath, text, 'utf8');
        console.log("Updated " + file);
        updatedCount++;
    }
}

console.log("Finished process. Updated " + updatedCount + " files.");
