'use strict'

const { exec } = require('child_process')

function checkDiskSpace() {
  return new Promise((resolve, reject) => {
    exec(
      'wmic logicaldisk get size,freespace,caption',
      (error, stdout, stderr) => {
        if (error) {
          reject(err)
        }
        resolve(stdout ? mapOutput(stdout) : stderr)
      }
    )
  })
}

function mapOutput(stdout) {
  let parsed = stdout
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      return line.trim().split(/\s+(?=[\d/])/)
    })
  parsed = parsed[0]
  return {
    free: parseInt(parsed[1]) / Math.pow(1024, 1),
    size: parseInt(parsed[2]) / Math.pow(1024, 1)
  }
}
module.exports = checkDiskSpace
