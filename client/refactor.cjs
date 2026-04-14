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
    
    // 1. Remove non-student-ui and role-monochrome from Layouts
    if (content.includes('non-student-ui role-monochrome ')) {
        content = content.replace(/non-student-ui role-monochrome /g, '');
        hasChanges = true;
    }
    
    if (content.includes('non-student-ui')) {
        content = content.replace(/non-student-ui /g, '');
        hasChanges = true;
    }
    
    if (content.includes('role-monochrome')) {
        content = content.replace(/role-monochrome /g, '');
        hasChanges = true;
    }

    // 2. Replace bg-[#0f1117] with the new ERP sidebar class (we'll just use bg-[#0f172a])
    if (content.includes('bg-[#0f1117]')) {
        content = content.replace(/bg-\[#0f1117\]/g, 'bg-[#0f172a]');
        hasChanges = true;
    }
    
    // 3. Replace active link shadow state from shadow-black/20 to shadow-blue-600/20
    if (content.includes('shadow-black/20')) {
        content = content.replace(/shadow-black\/20/g, 'shadow-blue-600/20');
        hasChanges = true;
    }
    
    // 4. Replace pure bg-black in sidebars with a modern blue
    // Specifically looking for the active link style in Sidebars: "bg-black text-white shadow-md"
    if (content.includes('bg-black text-white shadow-md')) {
        content = content.replace(/bg-black text-white shadow-md/g, 'bg-blue-600 text-white shadow-md');
        hasChanges = true;
    }
    
    // 5. Let's globally replace some `bg-black` elements with `bg-blue-700` in layout and screen files
    // But be careful not to override components that explicitly need black (like maybe a footer?).
    // A safer search is `bg-black py-6 sm:py-10` which was in the DashboardHome.jsx
    if (content.includes('bg-black py-6 sm:py-10')) {
        content = content.replace(/bg-black py-6 sm:py-10/g, 'bg-blue-700 py-6 sm:py-10');
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
        modifiedFiles++;
    }
});

console.log(`Refactor complete. modified ${modifiedFiles} files.`);
