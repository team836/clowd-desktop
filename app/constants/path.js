import os from 'os';
import path from 'path';

const SOCKETSERVER = 'wss://clowd.xyz/v1/node';
const FOLDERPATH =
  process.platform === 'win32'
    ? path.join(os.userInfo().homedir, 'AppData/Local/clowd/')
    : '~/Documents/clowd/';

// add linux path

export { SOCKETSERVER, FOLDERPATH };
