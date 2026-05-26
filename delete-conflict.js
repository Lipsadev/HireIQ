const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'favicon.ico');
if (fs.existsSync(file)) {
  fs.unlinkSync(file);
  console.log('✅ Deleted public/favicon.ico — conflict resolved!');
} else {
  console.log('ℹ️  public/favicon.ico does not exist, nothing to delete.');
}
