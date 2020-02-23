import WebSocket from 'ws';
import path from 'path';
import fs from 'fs';

import { SOCKETSERVER, FOLDERPATH } from '../constants/path';

async function setupSocket(systemVariable, localVariable, mainWindow) {
  console.log(systemVariable.accessToken);
  const ws = new WebSocket(`${SOCKETSERVER}?mid=${systemVariable.mid}`, {
    headers: {
      Authorization: `Bearer ${systemVariable.accessToken}`
    }
  });
  ws.on('open', function open() {
    // ws.send(JSON.stringify({ accessToken: systemVariable.accessToken }));
  });
  ws.on('message', async function incoming(data) {
    const res = JSON.parse(data);
    if (res.type === 'save') {
      console.log('save');
      const len = res.contents.length;
      const { contents } = res;
      for (let i = 0; i < len; i += 1) {
        fs.writeFile(
          path.join(FOLDERPATH, contents[i].name),
          contents[i].data,
          { encoding: 'base64' },
          () => {
            // console.log('File created');
          }
        );
      }
      const obj = await localVariable.checkLocalVariable(FOLDERPATH);
      mainWindow.webContents.send('file-update', obj);
      console.log('done');
    } else if (res.type === 'down') {
      console.log('down');
      const len = res.contents.length;
      const { contents } = res;
      const files = [];
      for (let i = 0; i < len; i += 1) {
        try {
          const file = fs.readFileSync(
            path.join(FOLDERPATH, contents[i].name),
            'base64'
          );
          files.push({ name: contents[i].name, data: file });
        } catch (err) {
          files.push({ name: contents[i].name, data: '' });
        }
      }
      ws.send(JSON.stringify(files));
      console.log('done');
    }
  });
  ws.on('ping', function ping(data) {
    console.log(`ping data: ${data}`);
    const obj = {
      capacity: parseInt(localVariable.capacity * 1024 ** 3, 10), // byte
      bandwidth: localVariable.bandwidth
    };
    ws.send(JSON.stringify(obj)); // 정보 실어 보내기
  });

  ws.on('close', code => {
    console.log(`close code: ${code}`);
  });
  return ws;
}

export default setupSocket;
