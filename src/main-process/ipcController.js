const { ipcMain } = require('electron')
const { LOCALDIR } = require('./pathfile')

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
  ipcMain.on('update-data', async (event, arg) => {
    let obj = await systemVariable.checkSystemVariable(LOCALDIR)
    event.returnValue = obj
  })

  ipcMain.on('data-settingSize', async (event, arg) => {
    systemVariable.settingSize = arg
    let obj = await systemVariable.checkSystemVariable(LOCALDIR)
    event.returnValue = obj
  })
}
module.exports = { setupIpc }
