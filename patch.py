import re
import os

files = ['list-page-final.html', 'list-page.html']
for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            t = file.read()
        
        # Replace the HTML block
        new_t = re.sub(
            r"(</svg>\s*\d+\s*</span>\s*)(</div>)",
            r"\1<div class='property-overlay'>\n                            <button class='property-view-btn'>Detayları Gör</button>\n                        </div>\n                    \2",
            t
        )
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_t)
            
print("Done writing modifications!")
