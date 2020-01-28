const { ipcMain } = require('electron')

module.exports = {
  setIpc(browser) {
    ipcMain.on('hide', (event, arg) => {
      browser.hide()
      event.reply('hide-res', 'ok')
    })
    ipcMain.on('show', (event, arg) => {
      browser.show()
      event.reply('show-res', 'ok')
    })
    ipcMain.on('test', (event, arg) => {
      console.log('test')
    })
  }
}
