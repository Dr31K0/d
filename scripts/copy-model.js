const fs = require('fs');
const path = require('path');

// Create dist/d directory if it doesn't exist
const distDir = path.join(__dirname, '../dist/d');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy the model file
fs.copyFileSync(
  path.join(__dirname, '../public/suitcase-texture.glb'),
  path.join(distDir, 'suitcase-texture.glb')
); 