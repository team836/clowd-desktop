const { BrowserWindow } = require('electron')

function createAuthWindow(browser) {
  browser = new BrowserWindow({
    title: 'auth',
    width: 370,
    height: 490,
    minWidth: 370,
    minHeight: 490,
    maxWidth: 600,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      webSecurity: false
    }
  })

  browser.loadURL('https://dev.api.clowd.xyz/v1/auth/clowder/login')

  browser.on('closed', () => (browser = null))
  browser.setMenuBarVisibility(false)
  browser.webContents.on('will-navigate', function(event, newUrl) {
    handleCallback(newUrl)
    // More complex code to handle tokens goes here
  })

  function handleCallback(url) {
    console.log(url)
    var raw_code = /code=([^&]*)/.exec(url) || null
    var code = raw_code && raw_code.length > 1 ? raw_code[1] : null
    var error = /\?error=(.+)$/.exec(url)
    console.log(code)
  }
  browser.webContents
    .executeJavaScript(`document.querySelector('pre').innerText`, true)
    .then((result) => {
      console.log(result) // Will be the JSON object from the fetch call
      browser.close()
    })

  return browser
}

module.exports = { createAuthWindow }
