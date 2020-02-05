'use strict'

const { exec } = require('child_process')

function checkNetwork() {
  return new Promise((resolve, reject) => {
    exec('netsh wlan show interfaces', (error, stdout, stderr) => {
      if (error) {
        reject(err)
      }
      resolve(stdout ? mapOutput(stdout) : stderr)
    })
  })
}

/**
 * @param {string} stdout
 */
function mapOutput(stdout) {
  let parsed = stdout
    .trim()
    .split('\r\n')
    .filter((line) => {
      return line.includes('Mbps')
    })
  parsed = parsed[0]
  parsed = parsed.split(':')[1].trim()
  return { bandwidth: parsed }
}
module.exports = checkNetwork