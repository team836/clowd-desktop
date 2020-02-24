import path from 'path';
import fs from 'fs';

function saveFiles(res, FOLDERPATH) {
  const len = res.contents.length;
  const { contents } = res;
  for (let i = 0; i < len; i += 1) {
    fs.writeFileSync(
      path.join(FOLDERPATH, `${contents[i].name}.clowd`),
      contents[i].data,
      { encoding: 'base64' },
      () => {
        // console.log('File created');
      }
    );
  }
}

function sendFiles(res, FOLDERPATH) {
  const len = res.contents.length;
  const { contents } = res;
  const files = [];
  for (let i = 0; i < len; i += 1) {
    try {
      const file = fs.readFileSync(
        path.join(FOLDERPATH, `${contents[i].name}.clowd`),
        'base64'
      );
      files.push({ name: contents[i].name, data: file });
    } catch (err) {
      files.push({ name: contents[i].name, data: '' });
    }
  }
  return files;
}

function deleteFiles(res, FOLDERPATH) {
  const len = res.contents.length;
  const { contents } = res;
  for (let i = 0; i < len; i += 1) {
    try {
      fs.unlinkSync(path.join(FOLDERPATH, `${contents[i].name}.clowd`));
    } catch (err) {
      console.error(err);
    }
  }
}
export { saveFiles, sendFiles, deleteFiles };
