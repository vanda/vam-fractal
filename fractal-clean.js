const fs = require('fs');

try {
  const buildDirs = ['www', 'build/scripts', 'build/styles'];

  for (const dir of buildDirs) {
    if (fs.existsSync(dir)) {
      console.log(`Deleting directory: /${dir}`);
      fs.rmSync(`${dir}`, { recursive: true, force: true });
    } else {
      console.log(`Directory: /${dir} does not exist.`);
    }
  }
} catch (error) {
  console.error('Error in deleting directories.', error);
}
