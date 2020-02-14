const { BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createWindow(browser) {
  browser = new BrowserWindow({
    title: 'Clowd Desktop',
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    // maxWidth: 1000,
    // maxHeight: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  browser.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    // browser.webContents.openDevTools()
  }
  browser.on('closed', () => (browser = null))

  browser.setMenuBarVisibility(false)
  return browser
}

module.exports = { createWindow }
