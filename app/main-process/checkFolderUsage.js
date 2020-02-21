import fs from 'fs';
import getSize from 'get-folder-size';

function checkFolderSize(dir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    getSize(dir, (err, size) => {
      if (err) {
        reject(err);
      }
      resolve(parseInt(size, 10)); // return Byte
    });
  });
}

export default checkFolderSize;
