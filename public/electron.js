const { app, ipcMain } = require('electron')
const { createWindow } = require('../src/main-process/mainWindow')
const { createLoginWindow } = require('../src/main-process/loginWindow')
const { setupSocket } = require('../src/main-process/wsSocket')
const { setupIpc } = require('../src/main-process/ipcController')
const { SystemVariable } = require('../src/main-process/systemVariable')

let systemVariable = new SystemVariable()
let mainWindow
let loginWindow
let socket

app.on('ready', (info) => {
  loginWindow = createLoginWindow(loginWindow)
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
  socket = setupSocket(systemVariable)
  setupIpc(loginWindow, mainWindow, socket, systemVariable)
  loginWindow.hide()
  event.reply('google-signIn-reply', 'ok')
})

/***************** menu bar disable *****************/
// app.on('browser-window-created', function (e, window) {
//   window.setMenu(null);
// });
/****************************************************/
