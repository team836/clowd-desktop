const { ipcMain } = require('electron')
const { LOCALDIR } = require('./pathfile')
const checkDiskSpace = require('./diskspace')
const checkFolderSize = require('./folderspace')
const checkNetwork = require('./network')
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
  ipcMain.on('main-update-data', async (event, arg) => {
    const disk = await checkDiskSpace()
    const ntw = await checkNetwork()
    const use = await checkFolderSize(LOCALDIR)
    systemVariable.folderUsage = use
    systemVariable.diskFree = disk.free
    systemVariable.diskSize = disk.size
    systemVariable.bandwidth = ntw.bandwidth
    systemVariable.capacity = Math.min(
      systemVariable.diskFree,
      systemVariable.settingSize - systemVariable.folderUsage
    )
    systemVariable.print()
    event.reply('main-update-data-res', {
      folderUsage: systemVariable.folderUsage,
      settingSize: systemVariable.settingSize
    })
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
