const { BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createLoginWindow(browser) {
  browser = new BrowserWindow({
    title: 'login',
    width: 370,
    height: 490,
    minWidth: 370,
    minHeight: 490,
    maxWidth: 600,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })

  browser.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html/login')}`
  )

  browser.on('closed', () => (browser = null))
  browser.setMenuBarVisibility(false)

  console.log(browser.webContents.id)
  return browser
}

module.exports = { createLoginWindow }
