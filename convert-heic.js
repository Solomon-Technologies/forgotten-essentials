import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import convert from 'heic-convert';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

async function convertHeicToJpeg() {
  const publicDir = './public';
  const files = await readdir(publicDir);
  const heicFiles = files.filter(file => file.toLowerCase().endsWith('.heic'));

  console.log(`Found ${heicFiles.length} HEIC files to convert...`);

  let converted = 0;
  for (const file of heicFiles) {
    try {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace(/\.HEIC$/i, '.jpg'));

      const inputBuffer = await readFile(inputPath);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.9
      });

      await writeFile(outputPath, outputBuffer);
      converted++;
      console.log(`✓ Converted ${file} (${converted}/${heicFiles.length})`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  }

  console.log(`\nConversion complete! ${converted} files converted.`);
}

convertHeicToJpeg().catch(console.error);
