const { app } = require('electron')
const { createWindow } = require('../src/main-process/mainWindow')
const { createLoginWindow } = require('../src/main-process/loginWindow')
const { setupSocket } = require('../src/main-process/socketHelper')
const { setupIpc } = require('../src/main-process/ipcMainHelper')

let mainWindow
let loginWindow
let socket

app.on('ready', (info) => {
  loginWindow = createLoginWindow(loginWindow)
  mainWindow = createWindow(mainWindow)
  socket = setupSocket('http://localhost:8081')
  setupIpc(loginWindow, mainWindow, socket)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/***************** menu bar disable *****************/
// app.on('browser-window-created', function (e, window) {
//   window.setMenu(null);
// });
/****************************************************/
