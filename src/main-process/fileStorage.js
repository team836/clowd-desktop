const getSize = require('get-folder-size')
const fs = require('fs')
const dir = 'C:\\Users\\chea1\\AppData\\Local\\clowd'

function getFolderSize() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  getSize(dir, (err, size) => {
    if (err) {
      throw err
    }
    console.log(size + ' bytes')
    console.log((size / 1024 / 1024).toFixed(2) + ' MB')
  })
}

module.exports = { getFolderSize }
