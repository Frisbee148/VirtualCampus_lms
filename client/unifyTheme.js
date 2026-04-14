const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const PRIMARY = '#8A4B3F';
const HOVER = '#A56D50';
const NEUTRAL = '#1c1917';

const replacements = [
  // Global Hex string replacements (case insensitive)
  { pattern: /#9f1239/gi, replacement: PRIMARY },     // Maroon -> Sandalwood
  { pattern: /#1a7a7a/gi, replacement: PRIMARY },     // Teal -> Sandalwood
  { pattern: /#0e445b/gi, replacement: HOVER },       // Dark Blue -> Sandalwood Hover
  { pattern: /#18181b/gi, replacement: NEUTRAL },     // Zinc 900 -> Stone 900
  { pattern: /#05250B/gi, replacement: NEUTRAL },     // Eliminate dark green

  // Overriding black backgrounds on primary action buttons but preserving overlay opacity
  { pattern: /bg-black(?!\/)/g, replacement: `bg-[${PRIMARY}]` },

  // Tailwind Named Classes used previously
  { pattern: /bg-rose-800/g, replacement: `bg-[${PRIMARY}]` },
  { pattern: /hover:bg-rose-950/g, replacement: `hover:bg-[${HOVER}]` },
  { pattern: /text-rose-800/g, replacement: `text-[${PRIMARY}]` },
  { pattern: /shadow-rose-800\/20/g, replacement: `shadow-[${PRIMARY}]/20` },
  
  // Teal class remnants
  { pattern: /bg-teal-[78]00/g, replacement: `bg-[${PRIMARY}]` },
  
  // Blue class remnants (User wants definitely NO BLUE)
  { pattern: /text-blue-[5678]00/g, replacement: `text-[${PRIMARY}]` },
  { pattern: /bg-blue-[5678]00/g, replacement: `bg-[${PRIMARY}]` },
  { pattern: /hover:bg-blue-[5678]00/g, replacement: `hover:bg-[${HOVER}]` },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const rx of replacements) {
        content = content.replace(rx.pattern, rx.replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log("Sandalwood Theme injection complete.");
