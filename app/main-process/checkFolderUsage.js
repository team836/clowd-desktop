const getSize = require('get-folder-size');
const fs = require('fs');

function checkFolderSize(dir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    getSize(dir, (err, size) => {
      if (err) {
        reject(err);
      }
      // console.log((size / 1024).toFixed(2) + ' KB')
      resolve(size); // return GB
    });
  });
}

module.exports = checkFolderSize;
