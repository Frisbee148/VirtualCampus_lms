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
    if (!filePath.endsWith('TopHeader.jsx') && !filePath.endsWith('TopHeader.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Check if it has a red dot without rounded-full
    // e.g. w-2 h-2 bg-red-500 ring-2
    // but not w-2 h-2 bg-red-500 rounded-full ring-2
    
    if (content.includes('bg-red-500 ring-2') && !content.includes('bg-red-500 rounded-full ring-2')) {
        content = content.replace(/bg-red-500 ring-2/g, 'bg-red-500 rounded-full ring-2');
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed notification icon in: ${filePath}`);
        modifiedFiles++;
    }
});

console.log(`Fix complete. modified ${modifiedFiles} files.`);
