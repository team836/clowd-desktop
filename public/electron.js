const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const io = require('socket.io-client')
// ...
var socket = io('http://localhost:8081')

socket.on('welcome', () => {
  console.log('welcome received') // displayed
  socket.emit('test')
})
socket.on('error', (e) => {
  console.log(e) // not displayed
})
socket.on('ok', () => {
  console.log('OK received') // not displayed
})
socket.on('connect', () => {
  console.log('connected') // displayed
  socket.emit('test')
})

let mainWindow
let loginWindow

const { dialog } = require('electron')

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Clowd Desktop',
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    maxWidth: 1000,
    maxHeight: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    // mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => (mainWindow = null))
}

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    title: 'login',
    width: 300,
    height: 400,
    minWidth: 300,
    minHeight: 400,
    maxWidth: 300,
    maxHeight: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  loginWindow.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html/login')}`
  )

  loginWindow.on('closed', () => (loginWindow = null))
}

app.on('ready', createLoginWindow)

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

// //menu bar disable
// app.on('browser-window-created', function (e, window) {
//   window.setMenu(null);
// });

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('async ' + arg) // "ping" 출력
  createLoginWindow()
  mainWindow.hide()
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log('sync ' + arg) // "ping" 출력
  event.returnValue = 'pong'
})

ipcMain.on('google-signIn', (event, arg) => {
  // console.log(arg) // "ping" 출력
  createWindow()
  loginWindow.hide()
  event.reply('google-signIn-reply', 'ok')
})

ipcMain.on('connect-socket', (event, arg) => {
  socket.emit('test')
  event.reply('connect-socket-reply', 'ok')
})
