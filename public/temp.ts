import { app, ipcMain, BrowserWindow } from 'electron'
import { createWindow } from '../src/main-process/mainWindow'
import { createLoginWindow } from '../src/main-process/loginWindow'
import { setupSocket } from '../src/main-process/socketHelper'
import { setupIpc } from '../src/main-process/ipcMainHelper'
import io from 'socket.io'

let mainWindow: BrowserWindow
let loginWindow: BrowserWindow
let socket: io.Server
let server: string = 'wss://dev.clowd.xyz/v1/test'
let local: string = 'http://localhost:8081'

app.on('ready', () => {
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
    createWindow(mainWindow)
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
