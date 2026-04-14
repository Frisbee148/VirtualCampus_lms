const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixImports(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      if (content.includes('<ArrowLeft')) {
        let modified = false;

        // Check if there is an import of ArrowLeft from lucide-react
        const importRegex = /import\s+\{([^}]*)\}\s+from\s+['"]lucide-react['"]/;
        const match = content.match(importRegex);

        if (match) {
          if (!match[1].includes('ArrowLeft')) {
            // Modify existing import
            content = content.replace(importRegex, `import { ${match[1].trim()}, ArrowLeft } from 'lucide-react'`);
            modified = true;
          }
        } else {
          // Add new import
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
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Fixed imports in: ${fullPath}`);
        }
      }
    }
  }
}

fixImports(path.join(__dirname, 'src'));
console.log("Done");
