const { ipcMain } = require('electron')
const { getFolderSize } = require('./fileStorage')

function setupIpc(login, main, socket, systemVariable) {
  /*
  visible function
  */
  //main
  ipcMain.on('show-main', (event, arg) => {
    main.show()
    event.reply('show-res', 'ok')
  })
  ipcMain.on('hide-main', (event, arg) => {
    main.hide()
    event.reply('hide-res', 'ok')
  })
  //login
  ipcMain.on('show-login', (event, arg) => {
    login.show()
    event.reply('show-res', 'ok')
  })
  ipcMain.on('hide-login', (event, arg) => {
    login.hide()
    event.reply('hide-res', 'ok')
  })
  /*
  data
  */
  ipcMain.on('fetch-main', async (event, arg) => {
    let res = new Object()
    const size = await getFolderSize(systemVariable.dir)
    systemVariable.usage = size
    res.usage = size
    res.total = systemVariable.total
    event.reply('fetch-main-res', res)
  })
  /*
  test function
  */
  ipcMain.on('hello', (event, arg) => {
    console.log("login's message")
    socket.emit('hello', { name: '123' })
  })
  ipcMain.on('connect-socket', (event, arg) => {
    console.log('clicked connect btn')
    socket.emit('pong')
  })
  ipcMain.on('test', (event, arg) => {
    // getFolderSize()
  })

  /*
  sync async example
  */
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
}
module.exports = { setupIpc }
