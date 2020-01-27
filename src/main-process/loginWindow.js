const { BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createLoginWindow() {
  const loginWindow = new BrowserWindow({
    title: 'login',
    width: 300,
    height: 400,
    minWidth: 300,
    minHeight: 400,
    maxWidth: 300,
    maxHeight: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  loginWindow.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html/login')}`
  )

  loginWindow.on('closed', () => (loginWindow = null))

  return loginWindow
}

module.exports = { createLoginWindow }
