import WebSocket from 'ws';
import { saveFiles, sendFiles, deleteFiles } from './fileAction';
import { SOCKETSERVER, FOLDERPATH } from '../constants/path';

async function setupSocket(systemVariable, localVariable, mainWindow) {
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
    switch (res.type) {
      case 'save': {
        mainWindow.webContents.send('send-signal');
        saveFiles(res, FOLDERPATH);
        const obj = await localVariable.checkLocalVariable(FOLDERPATH);
        mainWindow.webContents.send('file-update', obj);
        console.log('save done');
        break;
      }
      case 'down': {
        const files = sendFiles(res, FOLDERPATH);
        mainWindow.webContents.send('send-signal');
        ws.send(JSON.stringify(files));
        console.log('down done');
        break;
      }
      case 'delete': {
        mainWindow.webContents.send('send-signal');
        deleteFiles(res, FOLDERPATH);
        const obj = await localVariable.checkLocalVariable(FOLDERPATH);
        mainWindow.webContents.send('file-update', obj);
        console.log('delete done');
        break;
      }
      default: {
        console.log('case error');
      }
    }
  });
  ws.on('ping', function ping(data) {
    console.log(`ping data: ${data}`);
    const obj = {
      capacity: localVariable.capacity, // byte
      bandwidth: localVariable.bandwidth
    };
    ws.send(JSON.stringify(obj)); // 정보 실어 보내기
  });

  ws.on('close', code => {
    console.log(`close code: ${code}`);
    // mainWindow.close();
  });
  return ws;
}

export default setupSocket;
