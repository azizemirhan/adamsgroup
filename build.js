#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dist = 'dist';
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// Klasörleri kopyala: assets
['assets'].forEach(dir => {
  if (fs.existsSync(dir)) {
    copyDir(dir, path.join(dist, dir));
  }
});

// HTML dosyalarını kopyala
fs.readdirSync('.').filter(f => f.endsWith('.html')).forEach(f => {
  fs.copyFileSync(f, path.join(dist, f));
});

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach(e => {
    const srcPath = path.join(src, e.name);
    const destPath = path.join(dest, e.name);
    e.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  });
}

console.log('Build complete: dist/');
