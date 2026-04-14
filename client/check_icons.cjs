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

walkDir(srcDir, function(filePath) {
    if (!filePath.endsWith('Sidebar.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Quick regex to find all menu items definitions
    if(content.includes('menuItems')) {
        console.log("----- " + filePath + " -----");
        let matches = content.match(/id:\s*['"][^'"]+['"],[\s\S]*?(?:path|label)/g);
        if(matches) {
            matches.forEach(m => {
                let hasIcon = m.includes('icon:');
                let idMatch = m.match(/id:\s*['"]([^'"]+)['"]/);
                let id = idMatch ? idMatch[1] : 'unknown';
                console.log(`  ${id} - Has icon: ${hasIcon}`);
            });
        }
    }
});
