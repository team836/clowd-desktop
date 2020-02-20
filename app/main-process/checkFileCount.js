const fs = require('fs');

function fileCount(dir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files.length); // return GB
    });
  });
}

module.exports = fileCount;
