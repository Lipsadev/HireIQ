const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\554ac099-0f18-4965-86ba-7fc6e1a277da\\media__1779779738388.png';
const destPublicDir = 'c:\\Users\\dell\\Desktop\\HireIQ\\public';

const destinations = [
  path.join(destPublicDir, 'favicon.ico'),
  path.join(destPublicDir, 'favicon-16x16.png'),
  path.join(destPublicDir, 'favicon-32x32.png'),
  path.join(destPublicDir, 'apple-touch-icon.png'),
  'c:\\Users\\dell\\Desktop\\HireIQ\\app\\favicon.ico',
  'c:\\Users\\dell\\Desktop\\HireIQ\\app\\icon.png'
];

try {
  if (!fs.existsSync(destPublicDir)) {
    fs.mkdirSync(destPublicDir, { recursive: true });
    console.log('Created public directory');
  }
  
  if (fs.existsSync(src)) {
    destinations.forEach(dest => {
      fs.copyFileSync(src, dest);
      console.log(`Copied logo to: ${dest}`);
    });
    console.log('All custom favicon files copied successfully!');
  } else {
    console.error('Source file does not exist:', src);
  }
} catch (err) {
  console.error('Error copying favicon:', err);
}
