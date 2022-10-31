const fs = require('fs');

try {
  const buildDirs = ['www', 'build/scripts', 'build/styles'];
  const buildFile = 'src/components/_preview-layouts/_preview.html';

  for (const dir of buildDirs) {
    if (fs.existsSync(dir)) {
      console.log(`Deleting directory: /${dir}`);
      fs.rmSync(`${dir}`, { recursive: true, force: true });
    } else {
      console.log(`Directory: /${dir} does not exist.`);
    }
  }

  if (fs.existsSync(buildFile)) {
    console.log(`Deleting file: ${buildFile}`);
    fs.rmSync(`${buildFile}`);
  } else {
    console.log(`File: /${buildFile} does not exist.`);
  }

} catch (error) {
  console.error('Error in deleting directories/files.', error);
}
