const { app, ipcMain } = require('electron')
const { createWindow } = require('../src/main-process/mainWindow')
const { createLoginWindow } = require('../src/main-process/loginWindow')
const { setupSocket } = require('../src/main-process/socketHelper')
const { setupIpc } = require('../src/main-process/ipcMainHelper')

let mainWindow
let loginWindow
let socket
let server = 'wss://dev.clowd.xyz/v1/test'
let local = 'http://localhost:8081'
app.on('ready', (info) => {
  loginWindow = createLoginWindow(loginWindow)
  socket = setupSocket(local)
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
ipcMain.on('google-signIn', (event, arg) => {
  mainWindow = createWindow(mainWindow)
  loginWindow.hide()
  setupIpc(loginWindow, mainWindow, socket)
  event.reply('google-signIn-reply', 'ok')
})
/***************** menu bar disable *****************/
// app.on('browser-window-created', function (e, window) {
//   window.setMenu(null);
// });
/****************************************************/
