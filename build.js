/**
 * Static site build script - copies all HTML and assets to dist/
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

// Clean and create dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
ensureDir(DIST);

// Copy all HTML files from root
const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
for (const file of htmlFiles) {
  fs.copyFileSync(path.join(ROOT, file), path.join(DIST, file));
}

// Copy assets folder
copyRecursive(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));

console.log('Build complete: dist/');
