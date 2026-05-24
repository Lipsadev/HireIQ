const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\554ac099-0f18-4965-86ba-7fc6e1a277da\\media__1779620687969.jpg';
const destPublicDir = 'c:\\Users\\dell\\Desktop\\HireIQ\\public';
const destPublicFavicon = path.join(destPublicDir, 'favicon.ico');
const destAppFavicon = 'c:\\Users\\dell\\Desktop\\HireIQ\\app\\favicon.ico';

try {
  if (!fs.existsSync(destPublicDir)) {
    fs.mkdirSync(destPublicDir, { recursive: true });
    console.log('Created public directory');
  }
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destPublicFavicon);
    console.log('Copied favicon.ico to public/');
    
    fs.copyFileSync(src, destAppFavicon);
    console.log('Copied favicon.ico to app/');
  } else {
    console.error('Source file does not exist:', src);
  }
} catch (err) {
  console.error('Error copying favicon:', err);
}
