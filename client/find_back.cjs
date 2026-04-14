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

      // Check if file has "navigate(-1)" and "Back"
      if (content.includes('navigate(-1)') && content.includes('Back')) {
        // Need to replace the Back button with the standard Notification screen back button
        // Looking for patterns like:
        /*
            <button
              onClick={() => navigate(-1)}
              className="..."
            >
              Back
            </button>
        */
        // Or in one line.
        // We will just do a manual inspection or we can replace it carefully.
        console.log(`Found candidate in: ${fullPath}`);
      }
    }
  }
}

replaceBackButtons(path.join(__dirname, 'src'));
