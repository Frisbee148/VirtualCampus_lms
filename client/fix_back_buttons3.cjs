const fs = require('fs');
const path = require('path');

function replaceBackButtons(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      replaceBackButtons(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Check if file has navigate(-1) and the exact word "Back" inside the button.
      // E.g.
      // <button
      //    onClick={() => navigate(-1)}
      //    className="..."
      // >
      //    Back
      // </button>
      
      const buttonRegex = /(<button[^>]*onClick=\{\(\) \=\> navigate\(-1\)\}[^>]*>)\s*Back\s*(<\/button>)/g;
      
      if (buttonRegex.test(content)) {
        console.log(`Replacing in: ${fullPath}`);
        content = content.replace(buttonRegex, `$1\n  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />\n$2`);
        modified = true;
        
        // Ensure ArrowLeft is imported
        if (!content.includes('ArrowLeft')) {
           // We need to add import { ArrowLeft } from 'lucide-react';
           // Find if there's already an import from 'lucide-react'
           if (content.includes("'lucide-react'") || content.includes('"lucide-react"')) {
              // Add ArrowLeft to existing import
              content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/, (match, p1) => {
                 return `import { ${p1.trim()}, ArrowLeft } from 'lucide-react'`;
              });
           } else {
              // Add new import after the last import statement
              const lines = content.split('\n');
              let lastImportIdx = -1;
              for (let i = 0; i < lines.length; i++) {
                 if (lines[i].startsWith('import ')) {
                    lastImportIdx = i;
                 }
              }
              if (lastImportIdx !== -1) {
                 lines.splice(lastImportIdx + 1, 0, "import { ArrowLeft } from 'lucide-react';");
                 content = lines.join('\n');
              } else {
                 content = "import { ArrowLeft } from 'lucide-react';\n" + content;
              }
           }
        }
      }
      
      if (modified) {
        // Also update classes on the button if needed, although user just says "fix this".
        // Notice in NotificationsScreen.jsx, they use:
        // className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors"
        // so let's adjust the className slightly for consistency if it's "px-2 py-1 text-xs" because the icon is better with p-1.5
        content = content.replace(/className="[^"]*text-xs[^"]*hover:bg-gray-100[^"]*"/g, (match) => {
           if(match.includes("px-2") || match.includes("text-gray-500") || match.includes("text-gray-400")) {
              return 'className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors"';
           }
           return match;
        });

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

replaceBackButtons(path.join(__dirname, 'src'));
console.log("Done");
