const fs = require('fs');
let file = 'list-page-final.html';

let content = fs.readFileSync(file, 'utf8');

let regex = /(<\/svg>\s*\d+\s*<\/span>\s*)(<\/div>)/g;
let newContent = content.replace(regex, $1<div class="property-overlay">
                            <button class="property-view-btn">Detayları Gör</button>
                        </div>
                    );

fs.writeFileSync(file, newContent, 'utf8');
console.log('Replaced ' + (content.match(regex) || []).length + ' instances in list-page-final.html');

file = 'list-page.html';
if (fs.existsSync(file)) {
    content = fs.readFileSync(file, 'utf8');
    newContent = content.replace(regex, $1<div class="property-overlay">
                            <button class="property-view-btn">Detayları Gör</button>
                        </div>
                    );
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Replaced ' + (content.match(regex) || []).length + ' instances in list-page.html');
}
