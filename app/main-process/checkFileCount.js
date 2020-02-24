import fs from 'fs';
import path from 'path';

function fileCount(dir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      const clowdFiles = files.filter(file => {
        return path.extname(file).toLowerCase() === '.clowd';
      });
      resolve(clowdFiles.length); // number of files
    });
  });
}

export default fileCount;
