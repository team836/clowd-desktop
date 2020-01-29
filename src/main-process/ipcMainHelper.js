const { ipcMain } = require('electron')
const { getFolderSize } = require('./fileStorage')

function setupIpc(login, main, socket) {
  ipcMain.on('hide-main', (event, arg) => {
    main.hide()
    console.log(arg)
    event.reply('hide-res', 'ok')
  })
  ipcMain.on('hide-login', (event, arg) => {
    login.hide()
    console.log(arg)
    event.reply('hide-res', 'ok')
  })
  ipcMain.on('show-main', (event, arg) => {
    main.show()
    console.log(arg)
    event.reply('show-res', 'ok')
  })
  ipcMain.on('show-login', (event, arg) => {
    login.show()
    console.log(arg)
    event.reply('show-res', 'ok')
  })
  ipcMain.on('get-size', (event, arg) => {
    console.log('get-size')
    getFolderSize().then((res) => {
      event.reply('get-size-res', res)
    })
  })
  ipcMain.on('hello', (event, arg) => {
    console.log("login's message")
    socket.emit('hello', { name: '123' })
  })

  ipcMain.on('connect-socket', (event, arg) => {
    console.log('clicked connect btn')
    socket.emit('check')
  })
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
}
module.exports = { setupIpc }
