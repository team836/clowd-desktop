const { BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createLoginWindow(browser) {
  browser = new BrowserWindow({
    title: 'login',
    width: 327,
    height: 424,
    minWidth: 327,
    minHeight: 424,
    maxWidth: 327,
    maxHeight: 424,
    webPreferences: {
      nodeIntegration: true
    }
  })

  browser.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html/login')}`
  )

  browser.on('closed', () => (browser = null))
  browser.setMenuBarVisibility(false)

  return browser
}

module.exports = { createLoginWindow }
