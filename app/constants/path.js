import os from 'os';
import path from 'path';

const SOCKETSERVER = 'wss://clowd.xyz/v1/node';
const FOLDERPATH =
  process.platform === 'win32'
    ? path.join(os.userInfo().homedir, 'AppData/Local/clowd/')
    : path.join(os.userInfo().homedir, 'Documents/clowd');
const AUTHPATH = 'https://api.clowd.xyz/v1/auth/clowder/login';
// add linux path

export { SOCKETSERVER, FOLDERPATH, AUTHPATH };
