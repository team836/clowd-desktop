import fs from 'fs';

function fileCount(dir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files.length); // number of files
    });
  });
}

export default fileCount;
