import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyModel() {
  try {
    // Create dist/d directory if it doesn't exist
    const distDir = join(__dirname, '../dist/d');
    await fs.mkdir(distDir, { recursive: true });

    // Copy the model file
    await fs.copyFile(
      join(__dirname, '../public/suitcase-texture.glb'),
      join(distDir, 'suitcase-texture.glb')
    );

    console.log('Model file copied successfully');
  } catch (error) {
    console.error('Error copying model file:', error);
    process.exit(1);
  }
}

copyModel(); 