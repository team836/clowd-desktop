'use strict'

const { exec } = require('child_process')

function checkDiskSpace() {
  const diskspace = exec(
    'wmic logicaldisk get size,freespace,caption',
    function(error, stdout, stderr) {
      if (error) {
        console.log('error')
      }
      console.log('Child Process STDOUT: ' + stdout)
      console.log('Child Process STDERR: ' + stderr)
    }
  )
}

module.exports = checkDiskSpace
