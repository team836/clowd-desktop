const { ipcMain } = require('electron')

function setupIpc(login, main, socket) {
  ipcMain.on('hide-main', (event, arg) => {
    main.hide()
    event.reply('hide-res', 'ok')
  })
  ipcMain.on('hide-login', (event, arg) => {
    login.hide()
    event.reply('hide-res', 'ok')
  })
  ipcMain.on('show-main', (event, arg) => {
    main.show()
    event.reply('show-res', 'ok')
  })
  ipcMain.on('show-login', (event, arg) => {
    login.show()
    event.reply('show-res', 'ok')
  })
  ipcMain.on('test', (event, arg) => {
    console.log('test')
  })
  ipcMain.on('google-signIn', (event, arg) => {
    main.show()
    login.hide()
    event.reply('google-signIn-reply', 'ok')
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
