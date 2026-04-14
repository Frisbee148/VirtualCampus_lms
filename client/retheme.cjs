const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;

walkDir(srcDir, function(filePath) {
    if (!filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Remove slate (which has a blue undertone) and replace with Zinc (neutral dark grey)
    if (content.includes('bg-[#0f172a]')) {
        content = content.replace(/bg-\[#0f172a\]/g, 'bg-[#18181b]');
        hasChanges = true;
    }
    
    // Replace all blue-600 active links with rose-800 (Maroon)
    if (content.includes('bg-blue-600')) {
        content = content.replace(/bg-blue-600/g, 'bg-rose-800');
        hasChanges = true;
    }
    if (content.includes('shadow-blue-600/20')) {
        content = content.replace(/shadow-blue-600\/20/g, 'shadow-rose-800/20');
        hasChanges = true;
    }
    
    // Replace blue-700 backgrounds with rose-900 (Deep Maroon)
    if (content.includes('bg-blue-700')) {
        content = content.replace(/bg-blue-700/g, 'bg-rose-900');
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated theme in: ${filePath}`);
        modifiedFiles++;
    }
});

console.log(`Retheme complete. modified ${modifiedFiles} files.`);
