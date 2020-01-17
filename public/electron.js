const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow
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
  // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))

  // console.log("12312313")
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

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
