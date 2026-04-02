import os
import re

# Set target items to remove
items_to_remove = [
    r'<li><a href="#">Kayıtlı Aramalarım</a></li>',
    r'<li><a href="#">Mesajlarım</a></li>',
    r'<li><a href="#">Değerlemelerim / Mülklerim</a></li>'
]

# Get all HTML files in current directory
files = [f for f in os.listdir('.') if f.endswith('.html')]

print(f"Processing {len(files)} files...")

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for item in items_to_remove:
        # Regex to handle potential whitespace variations
        pattern = re.escape(item)
        content = re.sub(pattern, '', content)
    
    if content != original_content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"No changes for {filename}")

print("Done!")
