import { BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

export function createLoginWindow(browser: BrowserWindow) {
  browser = new BrowserWindow({
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

  browser.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html/login')}`
  )

  // browser.on('closed', () => (browser = null))

  return browser
}
