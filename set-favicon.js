const fs = require('fs');
const path = require('path');

const src = path.join('C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\554ac099-0f18-4965-86ba-7fc6e1a277da\\hireiq_favicon_1779806676939.png');
const appDir = path.join(__dirname, 'app');
const publicDir = path.join(__dirname, 'public');

// Copy to app/ as icon.png and icon.jpg
fs.copyFileSync(src, path.join(appDir, 'icon.png'));
fs.copyFileSync(src, path.join(appDir, 'icon.jpg'));
console.log('✅ Copied icon.png and icon.jpg to app/');

// Copy to public as favicon.png
fs.copyFileSync(src, path.join(publicDir, 'favicon.png'));
console.log('✅ Copied favicon.png to public/');

// Delete conflicting public/favicon.ico if it exists
const publicFavicon = path.join(publicDir, 'favicon.ico');
if (fs.existsSync(publicFavicon)) {
  fs.unlinkSync(publicFavicon);
  console.log('✅ Deleted conflicting public/favicon.ico');
}

// Delete app/favicon.ico and replace with the PNG (browsers accept PNG as favicon.ico)
const appFavicon = path.join(appDir, 'favicon.ico');
fs.copyFileSync(src, appFavicon);
console.log('✅ Replaced app/favicon.ico with new icon');

console.log('\n🎉 All done! Restart the dev server to see the new favicon.');
