const { app, ipcMain } = require('electron')
const io = require('socket.io-client')
const getSize = require('get-folder-size')
const { createWindow } = require('../src/main-process/mainWindow')
const { createLoginWindow } = require('../src/main-process/loginWindow')

let mainWindow
let loginWindow

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

/***************** menu bar disable *****************/
// app.on('browser-window-created', function (e, window) {
//   window.setMenu(null);
// });
/****************************************************/

/**************** ipc main listener ****************/
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log('async ' + arg) // "ping" 출력
//   createLoginWindow()
//   mainWindow.hide()
//   event.reply('asynchronous-reply', 'pong')
// })

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log('sync ' + arg) // "ping" 출력
//   event.returnValue = 'pong'
// })

ipcMain.on('google-signIn', (event, arg) => {
  mainWindow = createWindow(mainWindow)
  loginWindow.hide()
  event.reply('google-signIn-reply', 'ok')
})

ipcMain.on('connect-socket', (event, arg) => {
  console.log('clicked connect btn')
  socket.emit('check')
})
/*****************************************************/

/******************** socket io **********************/

const socket = io('http://localhost:8081')

socket.on('success-connect', () => {
  console.log('connected') // displayed
})

socket.on('check1', () => {
  console.log('receive pong') // displayed
})
/*****************************************************/

/******************* file storage  *******************/

getSize('C:\\Users\\chea1\\AppData\\Local\\a11', (err, size) => {
  if (err) {
    throw err
  }

  console.log(size + ' bytes')
  console.log((size / 1024 / 1024).toFixed(2) + ' MB')
})
/*****************************************************/
