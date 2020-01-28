const getSize = require('get-folder-size')

getSize('C:\\Users\\chea1\\AppData\\Local\\atom', (err, size) => {
  if (err) {
    throw err
  }
  console.log(size + ' bytes')
  console.log((size / 1024 / 1024).toFixed(2) + ' MB')
})
