const { app, ipcMain } = require('electron')
const { setupIpc } = require('../src/main-process/ipcController')

const { setupSocket } = require('../src/main-process/wsSocket')
const { createWindow } = require('../src/main-process/mainWindow')
const { createAuthWindow } = require('../src/main-process/authWindow')
const { SystemVariable } = require('../src/main-process/systemVariable')
const { createLoginWindow } = require('../src/main-process/loginWindow')

let systemVariable = new SystemVariable()
let mainWindow
let loginWindow
let authWindow
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
  authWindow = createAuthWindow(authWindow)
  // mainWindow = createWindow(mainWindow)
  // socket = setupSocket(systemVariable, mainWindow)
  // setupIpc(loginWindow, mainWindow, socket, systemVariable)
  // loginWindow.close()
  // event.reply('google-signIn-reply', 'ok')
})

/***************** menu bar disable *****************/
// app.on('browser-window-created', function(e, window) {
//   window.setMenu(null)
// })
/****************************************************/

if (!app.isDefaultProtocolClient('clowd')) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient('clowd')
}
