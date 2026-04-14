const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

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
      
      // We need to swap #000000 (currently buttons/primary) with #242424 (currently sidebars/neutral)
      // Using a temporary token to avoid double replacement
      content = content.replace(/#000000/g, 'TEMP_SWAP_TOKEN');
      content = content.replace(/#242424/g, '#000000');
      content = content.replace(/TEMP_SWAP_TOKEN/g, '#242424');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log("Greyscale Swap (Black Sidebar, Grey Buttons) complete.");
