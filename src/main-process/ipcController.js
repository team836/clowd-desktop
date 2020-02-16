const { ipcMain } = require('electron')
const { LOCALDIR } = require('./pathfile')
const checkFolderSize = require('./folderspace')
const checkDiskSpace = require('check-disk-space')
const checkNetwork = require('./network')
const checkfileCount = require('./filesCount')

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
    let [ntw, use, disk, fileCount] = await Promise.all([
      checkNetwork(),
      checkFolderSize(LOCALDIR),
      checkDiskSpace(LOCALDIR),
      checkfileCount(LOCALDIR)
    ])
    systemVariable.folderUsage = use
    systemVariable.diskFree = (disk.free / 1024 ** 3).toFixed(2)
    systemVariable.diskSize = (disk.size / 1024 ** 3).toFixed(2)
    systemVariable.fileCount = fileCount
    systemVariable.bandwidth = ntw.bandwidth
    systemVariable.capacity = Math.min(
      systemVariable.diskFree,
      systemVariable.settingSize - systemVariable.folderUsage
    )
    systemVariable.print()
    let temp = {
      folderUsage: systemVariable.folderUsage,
      settingSize: systemVariable.settingSize,
      fileCount: systemVariable.fileCount,
      folderPercent:
        (systemVariable.folderUsage / systemVariable.settingSize) * 100,
      settingPercent: parseInt(
        (systemVariable.settingSize /
          (systemVariable.maxSettingSize - systemVariable.minSettingSize)) *
          100
      )
    }
    event.returnValue = temp
  })

  ipcMain.on('data-settingSize', (event, arg) => {
    systemVariable.settingSize = arg
    event.returnValue = true
  })
}
module.exports = { setupIpc }
