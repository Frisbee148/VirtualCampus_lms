const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const OLD_ACCENT = '#6F7782'; 
const NEW_ACCENT = '#4E545C';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js') || fullPath.endsWith('.cjs')) {
      if (fullPath === __filename || fullPath.endsWith('unifyTheme.js')) continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      content = content.replace(/#6F7782/gi, NEW_ACCENT);
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log("Accent Update (#4E545C) complete.");
